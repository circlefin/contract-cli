[Truffle](https://github.com/trufflesuite/truffle) is a framework for automated contract testing.

The provided `install.sh` script will install truffle based on the `package.json` and `yarn.lock`. The provided `execute.sh` script will run `truffle test` using tests spcified in the `config.json testsRoot`.

To configure:

1. You may control the version of truffle and other dependencies used by changing the `package.json` and `yarn.lock` to suit your needs. If your version change modifies the solidity compiler version, you must also update the `truffle-config.js` to reflect this.
2. You may also want to specify your migration locations by changing the field in the `truffle-config.js` (contract locations come from the `config.json contractsRoot`).
