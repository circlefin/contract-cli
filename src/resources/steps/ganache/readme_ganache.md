[Ganache](https://github.com/trufflesuite/ganache) is an Ethereum simulator that allows you to run your own portable blockchain.

The provided `install.sh` script will install ganache based on the `package.json`. The provided `execute.sh` script will start up ganache and generate 10 addresses at the start.

To configure:

1. You may control the version of ganache and other dependencies used by changing the `package.json` and/or adding a `yarn.lock` to suit your needs.
2. You may control how ganache is run by changing the `execute.sh` script. See the ganache documentation to understand what options are available.
