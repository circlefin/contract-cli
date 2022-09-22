#   Copyright 2022 Circle Internet Financial, Inc.
#
#   Licensed under the Apache License, Version 2.0 (the "License");
#   you may not use this file except in compliance with the License.
#   You may obtain a copy of the License at
#
#   http://www.apache.org/licenses/LICENSE-2.0
#
#   Unless required by applicable law or agreed to in writing, software
#   distributed under the License is distributed on an "AS IS" BASIS,
#   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
#   See the License for the specific language governing permissions and
#   limitations under the License.

set -e

source $HOME/.web3j/source.sh

. ./utils.sh

# targets should correspond the names of the .abi and .bin files
# .abi & .bin files should be in the buildOutputDirectory specified in the contract-cli config.json
targets="
ContractNameHere
AdditionalContractNameHere
"
generate "$targets" "package.name.here"

# repeat targets & generate as needed to generate different packages
