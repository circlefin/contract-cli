#!/usr/bin/env sh
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

BUILD_DIR=$BUILDDIR
RESOURCES_DIR="$(pwd)/../resources"
TARGET_DIR="$(pwd)/../target"

# Usage: generate targets package
# compiles solidity files specified by `targets` and generates java wrappers that get placed in `package`
generate() {
    targets=$1
    package=$2

    cd "${BUILD_DIR}" || exit

  for target in $targets; do
    fileName=$(basename "$target")

    # Generate the Java wrapper
    web3j generate solidity \
    -b "${fileName}".bin \
    -a "${fileName}".abi \
    -p "$package" \
    -o "${TARGET_DIR}" > /dev/null

    # Copy the ABI json as well so that clients can parse it directly if needed.  There might be multiple contracts
    # with the same name, so to disambiguate them we put them in a folder structure mimicking the package name
    # (ie, if the package is "foo.bar.baz", then the ABI will be placed in resources/foo/bar/baz).  This has the nice
    # side effect of putting them in the same folder in the JAR as the Java wrapper generated above.
    resourcePath="${RESOURCES_DIR}/${package//.//}"
    mkdir -p $resourcePath
    cp "${fileName}.abi" "${resourcePath}/${fileName}.abi"

    echo "Complete" "${fileName}"
  done
}
