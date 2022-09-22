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

cp -R $CONTRACTSDIR ./contracts # the contracts need to be copied into this base directory
cp -R ./node_modules/@openzeppelin ./@openzeppelin # newer versions of solcjs allow specifying a import path and avoiding this copy

yarn solcjs --bin --abi --optimize -o $BUILDDIR --base-path . contracts/*.sol contracts/**/*.sol

rm -R ./contracts
rm -R ./@openzeppelin
