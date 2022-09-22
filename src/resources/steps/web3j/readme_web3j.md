[Web3j](https://docs.web3j.io/4.8.7/) is a Java and Android library for working with EVM smart contracts.

The provided `execute.sh` and `utils.sh` scripts will convert `.bin` and `.abi` compiled files into Java wrappers.

To configure:

1. In `execute.sh`, include the smart contracts of interest under `targets`
   - Smart contracts listed here should have `.abi` and `.bin` files located within the `buildOutputDirectory` specified in the overall `config.json`
   - The `.abi` and `.bin` files may be created by a prior step (e.g. a solidity step creates these files for web3j to use)
2. In `execute.sh`, specify the Java package name in the `generate` command (replace `package.name.here`)
