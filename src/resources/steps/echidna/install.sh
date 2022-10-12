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

solidity_version="0.8.3"

pip3 install crytic-compile
pip3 install slither-analyzer

pip3 install solc-select
solc-select install $solidity_version
solc-select use $solidity_version

if [ ! -f  echidna-test-2.0.2-Ubuntu-18.04.tar.gz ]; then
    wget -np --cut-dirs -r https://github.com/crytic/echidna/releases/download/v2.0.2/echidna-test-2.0.2-Ubuntu-18.04.tar.gz
    tar -xvf echidna-test-2.0.2-Ubuntu-18.04.tar.gz 
fi
