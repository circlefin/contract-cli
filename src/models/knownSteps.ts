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

import { Step } from "./step";

const KnownSteps = new Map<string, Step>([
  ["ganache", new Step("ganache", "install.sh", "execute.sh", 10)],
  ["truffle", new Step("truffle", "install.sh", "execute.sh", -1)],
  ["solcjs", new Step("solcjs", "install.sh", "execute.sh", -1)],
  ["web3j", new Step("web3j", "install.sh", "execute.sh", -1)],
]);

export { KnownSteps };
