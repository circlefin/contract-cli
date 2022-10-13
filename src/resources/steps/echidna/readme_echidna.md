[Echidna](https://github.com/crytic/echidna) is a smart contract fuzzer.

The provided `install.sh` script will install echidna and its dependencies. The provided `execute.sh` script will start run the fuzzer against the specified smart contracts. Echidna can be futher configured using the `config.yaml` file.

To configure:

1. You may control the version of solidity used by changing the `solidity_version` in the `install.sh` script
2. In `execute.sh` you should control which contracts are tested by setting the `targets` variable
3. Additional configurations for echidna can be specified in the `config.yaml
