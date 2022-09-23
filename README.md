# contract-cli

## Introduction

Contract-cli is your configurable build tool for smart contracts. It makes management of your smart contracts, including compiling and testing easier and more consistent. With the contract-cli, you can:

- configure a series of steps to execute against your smart contracts
- create your own steps, or use provided defaults for common operations
- execute your steps serially in a docker container and have the outputs available locally

## Prerequisites

Before installing the contract-cli, the following requirements should be installed:

- Docker Engine > version 20.10.8
- NodeJS > version 16.16.0

Earlier versions may work but have not been tested and are not considered officially supported.

## Installation

```
$ npm i -g @circle-fin/contract-cli
```

Note: We use the `-g` flag for global installation here to enable operation from the command line.

## Quick Usage

In the root directory of your contracts and/or contract tests, run:

```
$ contract-cli init
```

If there are specific build steps you would like to include, you can specify those with the `--steps` flag. For example:

```
$ contract-cli init –steps ganache –steps truffle
```

This will create your config file, and directories for each step you’ve created.

Your directory may now look something like the following:

```
$ root_directory
├── contracts
├── tests
├── ganache
│   ├── package.json
│   ├── install.sh
│   └── execute.sh
├── truffle
│   ├── package.json
│   ├── yarn.lock
│   ├── truffle-config.js
│   ├── install.sh
│   └── execute.sh
└── config.json
```

At this time, you should read through and edit where necessary the `config.json` file. In particular, you may want to update the `contractsRoot` and `testsRoot` to locate your contracts and tests.

You may also want to look at the `install.sh` and `execute.sh` files in each step directory. Those specify how the step will be installed and/or executed.

If the step is known to the contract-cli, it will come with some defaults that you can review. If the step is unknown, you must provide custom installation and execution scripts.

Once you’ve reviewed the configuration, you can execute the cli which will run your build steps inside a container.

```
$ contract-cli execute
```

---

## Development

We welcome pull requests adding new functionality to the CLI, or adding additional modules as steps. To get started, fork the repo, clone it locally and follow the directions below.

If you are interested in adding a new module as a known step for the contract-cli, additional information is available in [ADD_STEP_README](./docs/ADD_STEP_README.md)

### Getting started

1. Make sure [nvm](https://github.com/nvm-sh/nvm) is installed: `nvm ls` and you are using the correct version: `nvm use`.
   - Please see [here](https://github.com/nvm-sh/nvm#installing-and-updating) for installation instructions.
2. Install dependencies `yarn install`
3. Build the project `yarn build`

### Manual testing of the CLI

- Rebuild the project to pick up any changes with `yarn build`
- Run the CLI using `./bin/run <cmd_name>` e.g. `./bin/run help`
- If the cmd_name is omitted, information will be displayed about commands the CLI understands

### Automated Testing

- To run tests: `yarn test`
- With coverage output: `yarn test:cov`
- Run a specific test: `yarn test {testFileName}`

### Code Linting and Formatting

The project uses eslint for code linting and prettier for formatting. To easily work with these tools in VSCode, please install
the recommended extensions for the project.

- To view/install these extensions, press `CMD+SHIFT+P` and type: `Extensions: Show Recommended Extensions`.
- This will enable code error/warning highlighting and format on saves.
- The linter can be run manually with `yarn lint` and can auto-fix problems with `yarn lint:fix`.
- The linter will be automatically run on `git push` commands. This can be bypassed with the `no-verify` flag.

## License

[Apache-2.0](./LICENSE)
