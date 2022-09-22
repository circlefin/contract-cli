# Adding a new Step to the contract-cli

The contract-cli has a variety of built in steps it knows how to handle. These provide sensible defaults and a place for end users to get started. Adding additional known steps makes it easier for other end users to pick up and start using the module.

The process for adding a new step is as follows:

1. Add a new step_name directory at /src/resources/steps
2. Add whatever files are required to install and execute the step

   - for a NPM module, you might add a package.json, yarn.lock, install.sh, and execute.sh. The install.sh could run `yarn install` and the execute.sh whatever command is required to execute the step
   - for a non-NPM module, you can again use install.sh and execute.sh where the contents are whatever is required to install and execute the step
   - Suggested to also add a readme for the step to help end users understand what configuration is available

3. Register the step at /src/models/knownSteps.ts with the step name, installation script, execution script, and timeout (or -1 if it should wait for completion)
4. Build and test your changes. Follow directions in the [README](../README.md) for how to test changes locally.
