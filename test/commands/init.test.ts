/**
 *   Copyright 2022 Circle Internet Financial, Inc.
 *
 *   Licensed under the Apache License, Version 2.0 (the "License");
 *   you may not use this file except in compliance with the License.
 *   You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 *   Unless required by applicable law or agreed to in writing, software
 *   distributed under the License is distributed on an "AS IS" BASIS,
 *   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *   See the License for the specific language governing permissions and
 *   limitations under the License.
 *
 */

import { test } from "@oclif/test";

afterEach(() => {
  jest.resetModules();
  jest.resetAllMocks();
});

describe("init with existing config file", () => {
  beforeAll(() => {
    // Must mock the file system this way otherwise its mocks are hoisted and affect the oclif setup
    jest.doMock("fs-extra", () => {
      return {
        __esModule: true,
        existsSync: jest.fn(() => true),
      };
    });
  });
  test
    .stdout()
    .command(["init"])
    .it(
      "given existing config file when running init, it makes no updates",
      (ctx) => {
        return import("fs-extra").then(() => {
          expect(ctx.stdout).toContain("Initializing the contract-cli...");
          expect(ctx.stdout).toContain(
            "Config file ./config.json already exists. Exiting."
          );
        });
      }
    );
});

describe("init with no arguments", () => {
  beforeAll(() => {
    jest.doMock("fs-extra", () => {
      return {
        __esModule: true,
        existsSync: jest.fn(() => false),
        writeFileSync: jest.fn(() => undefined),
        copySync: jest.fn(),
      };
    });
  });

  test
    .stdout()
    .command(["init"])
    .it(
      "given no arguments when running init, it creates the ganache & truffle steps",
      (ctx) => {
        return import("fs-extra").then((fs) => {
          expect(ctx.stdout).toContain("Initializing the contract-cli...");
          expect(ctx.stdout).toContain(
            "Creating your config file, ./config.json"
          );
          expect(ctx.stdout).toContain("Creating directory for step ganache");
          expect(ctx.stdout).toContain("Creating directory for step truffle");
          expect(fs.writeFileSync).toBeCalledTimes(1);
          expect(fs.copySync).toBeCalledTimes(2);
        });
      }
    );
});

describe("init with arguments", () => {
  beforeAll(() => {
    jest.doMock("fs-extra", () => {
      return {
        __esModule: true,
        existsSync: jest.fn(() => false),
        writeFileSync: jest.fn(() => undefined),
        copySync: jest.fn(),
      };
    });
  });

  test
    .stdout()
    .command(["init", "--steps=truffle", "--steps=web3j"])
    .it(
      "given arguments when running init, it creates the correct steps",
      (ctx) => {
        return import("fs-extra").then((fs) => {
          expect(ctx.stdout).toContain("Initializing the contract-cli...");
          expect(ctx.stdout).toContain(
            "Creating your config file, ./config.json"
          );
          expect(ctx.stdout).toContain("Creating directory for step truffle");
          expect(ctx.stdout).toContain("Creating directory for step web3j");
          expect(fs.writeFileSync).toBeCalledTimes(1);
          expect(fs.copySync).toBeCalledTimes(2);
        });
      }
    );
});
