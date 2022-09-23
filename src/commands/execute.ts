/**
 *   Copyright 2022 Circle Internet Financial, Inc.
 *
 *   Licensed under the Apache License, Version 2.0 (the "License");
 *   you may not use this file except in compliance with the License.
 *   You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 *   Unless required by applicable law or agreed to in writing, software
 *   distributed under the License is distributed on an "AS IS" BASIS,
 *   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *   See the License for the specific language governing permissions and
 *   limitations under the License.
 *
 */

import { Command } from "@oclif/core";
import { spawn, spawnSync } from "child_process";
import { existsSync, readFileSync } from "fs-extra";
import path from "path";

export default class Execute extends Command {
  static description = "Execute the contract-cli steps";

  static examples = ["$ contract-cli execute"];

  static flags = {};

  static args = [];

  public async run(): Promise<void> {
    this.log("Executing the contract-cli...");

    if (!existsSync("./config.json")) {
      this.log(
        "Config file ./config.json does not exist. Begin by running `contract-cli init ` to create it."
      );
      return;
    }

    // Mount the contractCliDir as a volume to make sure the same version is in use inside and outside the container
    // Also allows for easier local development since we don't need to install a module in the container
    const contractCliDir = `${__dirname}/../..`;
    const containerContractCliDir = "/usr/source/contractcli";

    // Mount the workingDir as a volume to access the configs, steps, source, and tests
    const workingDir = `${process.cwd()}`;
    const containerWorkingDir = "/usr/contracts";

    // Read the config to get the contracts, tests, and build paths to pass them as env vars
    const configFile = readFileSync(`${process.cwd()}/config.json`);
    const json = JSON.parse(configFile.toString());
    const contractsDir = path.join(containerWorkingDir, json.contractsRoot);
    const testDirectory = path.join(containerWorkingDir, json.testsRoot);
    const buildDirectory = path.join(
      containerWorkingDir,
      json.buildOutputDirectory
    );

    this.log("Building docker image for contract-cli to use...");
    spawnSync("docker", [
      "build",
      "-t",
      "contractcli:latest",
      `${contractCliDir}`,
    ]);

    this.log("Starting docker container for contract-cli.");

    const result = spawn("docker", [
      "run",
      "-e",
      `CONTRACTSDIR=${contractsDir}`,
      "-e",
      `TESTSDIR=${testDirectory}`,
      "-e",
      `BUILDDIR=${buildDirectory}`,
      "--rm",
      "--name",
      "contractcli",
      "-v",
      `${workingDir}:${containerWorkingDir}`,
      "contractcli:latest",
      "node",
      `${containerContractCliDir}/dist/moduleRunner.js`,
    ]);

    result.stdout.on("data", (data) => {
      this.log(`contract-cli: ${data}`);
    });

    result.stderr.on("data", (data) => {
      this.logToStderr(`contract-cli: ${data}`);
    });

    result.on("error", (error) => {
      this.logToStderr(`contract-cli: ${error.message}`);
    });

    result.on("close", () => {
      this.log("Done executing the contract-cli.");
    });
  }
}
