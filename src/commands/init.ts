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

import { Command, Flags } from "@oclif/core";
import { copySync, existsSync, writeFileSync } from "fs-extra";

import { KnownSteps } from "../models/knownSteps";
import { Step } from "../models/step";

export default class Init extends Command {
  static description = "Initialize the contract-cli";

  static examples = ["$ contract-cli init --steps ganache --steps truffle"];

  static flags = {
    steps: Flags.string({ multiple: true }),
  };

  static args = [];

  public async run(): Promise<void> {
    this.log("Initializing the contract-cli...");

    if (existsSync("./config.json")) {
      this.log("Config file ./config.json already exists. Exiting.");
      return;
    }

    // Figure out what steps we need and construct them
    const { flags } = await this.parse(Init);
    const steps: Step[] = [];

    if (!flags.steps) {
      // Default to 2 steps, ganache & truffle
      steps.push(KnownSteps.get("ganache") as Step);
      steps.push(KnownSteps.get("truffle") as Step);
    } else {
      flags.steps.forEach((step) => {
        if (KnownSteps.has(step)) {
          steps.push(KnownSteps.get(step) as Step);
        } else {
          steps.push(new Step(step, "install.sh", "execute.sh", -1));
        }
      });
    }

    // Construct & write the config file from the steps
    this.log("Creating your config file, ./config.json");
    const configContents = {
      contractsRoot: "./contracts/",
      testsRoot: "./test/",
      buildOutputDirectory: "./build/",
      steps: steps,
    };
    writeFileSync("./config.json", JSON.stringify(configContents, null, 2));

    // Create the other directories & files needed for config
    this.log("Creating your step directories...");
    steps.forEach((step) => {
      // if there's a knownStep with that name, copy its folder
      // otherwise, copy and rename the default folder with install.sh and execute.sh
      let sourceDirectory = `${__dirname}/../resources/steps/${step.name}`;
      if (!existsSync(sourceDirectory)) {
        sourceDirectory = `${__dirname}/../resources/steps/default`;
      }
      const targetDirectory = `${process.cwd()}/${step.name}`;

      if (!existsSync(targetDirectory)) {
        this.log(
          `Creating directory for step ${step.name} at ${targetDirectory}`
        );
        copySync(sourceDirectory, targetDirectory);
      } else {
        this.log(
          `Skipping step ${step.name} because directory already exists ${targetDirectory}`
        );
      }
    });

    this.log(
      `Done initializing the contract-cli!
      You may want to validate the configurations before proceeding.
      In particular, check the config.json to ensure the contractsRoot and testsRoot are correct.
      To check how each step will be run, look at the install.sh and execute.sh scripts in each step directory.`
    );
  }
}
