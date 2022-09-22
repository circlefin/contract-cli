[solc-js](https://github.com/ethereum/solc-js) is a set of Javascript bindings for the Solidity compiler.

The provided `install.sh` script will install solc-js based on the `package.json`. The provided `execute.sh` script will compile the contracts specified in your `config.json contractsRoot` and report the output in the `buildOutputDirectory`.

To configure:

1. You may control the version of solc-js and other dependencies used by changing the `package.json` and/or adding a `yarn.lock` to suit your needs.
2. You may control how your contracts are compiled by changing the `execute.sh` script. See the solc-js documentation to understand what options are available.
