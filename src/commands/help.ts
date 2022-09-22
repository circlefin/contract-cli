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

export default class Help extends Command {
  static description = "Help command for the contractcli";

  static examples = ["$ contractcli help"];

  static flags = {};

  static args = [];

  async run(): Promise<void> {
    const helpMessage = `contract-cli: your configurable smart-contract build system

To begin, run 'contract-cli init' from the root directory of your contracts and/or tests.
If you would like to specify build steps, you can use the '--steps' flag e.g. 'contract-cli init --steps ganache --steps truffle'.

These commands will create your config file, and one directory per step specified.

For further customization, you may want to adjust the 'config.json' contractsRoot and testsRoot.
You can also adjust the 'install.sh' and 'execute.sh' scripts for each step.

Once you've reviewed the configuration, you can execute the cli which will run your build steps inside a container using 'contract-cli execute'`;
    this.log(helpMessage);
  }
}
