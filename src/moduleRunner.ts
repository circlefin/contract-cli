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

import { spawn } from "child_process";
import { readFileSync } from "fs-extra";
import { exit } from "process";

import { Step } from "./models/step";

const file = readFileSync("/usr/contracts/config.json");

const json = JSON.parse(file.toString());

const steps: Step[] = json.steps;

(async () => {
  for (const step of steps) {
    console.log(`Starting to process ${step.name}`);

    process.chdir(`/usr/contracts/${step.name}`);

    const installationResult = spawn("bash", [step.installationCommand]);

    installationResult.stdout.on("data", (data) => {
      console.log(`${step.name}: ${data}`);
    });

    installationResult.stderr.on("data", (data) => {
      console.error(`${step.name}: ${data}`);
    });

    installationResult.on("error", (error) => {
      console.error(`${step.name}: ${error.message}`);
    });

    const installationCode = await new Promise((resolve) => {
      installationResult.on("close", (code) => {
        console.log(`${step.name}: installation compleded with code ${code}`);
        resolve(code);
      });
    });

    if (installationCode != 0) {
      console.log(
        `Error installing ${step.name}, will not proceed with step execution`
      );
      continue;
    }

    const executionResult = spawn("bash", [step.executionCommand]);

    executionResult.stdout.on("data", (data) => {
      console.log(`${step.name}: ${data}`);
    });

    executionResult.stderr.on("data", (data) => {
      console.error(`${step.name}: ${data}`);
    });

    executionResult.on("error", (error) => {
      console.error(`${step.name}: ${error.message}`);
    });

    if (step.executionWaitTime < 0) {
      await new Promise<void>((resolve) => {
        executionResult.on("close", (code) => {
          console.log(`${step.name}: execution compleded with code ${code}`);
          resolve();
        });
      });

      console.log(`Done processing ${step.name}`);
    } else {
      await new Promise<void>((resolve) =>
        setTimeout(resolve, step.executionWaitTime * 1000)
      );
      console.log(
        `After waiting, detached execution of long running step, ${step.name}`
      );
    }
  }
  exit();
})();
