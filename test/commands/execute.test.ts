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
import { ChildProcess } from "child_process";
import { EventEmitter, Readable } from "stream";

afterEach(() => {
  jest.resetModules();
  jest.resetAllMocks();
});

describe("execute without existing config file", () => {
  beforeAll(() => {
    // Must mock the file system this way otherwise its mocks are hoisted and affect the oclif setup
    jest.doMock("fs-extra", () => {
      return {
        __esModule: true,
        existsSync: jest.fn(() => false),
      };
    });
  });
  test
    .stdout()
    .command(["execute"])
    .it(
      "given no existing config file when running execute, it exits",
      (ctx) => {
        return import("fs-extra").then(() => {
          expect(ctx.stdout).toContain("Executing the contract-cli...");
          expect(ctx.stdout).toContain(
            "Config file ./config.json does not exist. Begin by running `contract-cli init ` to create it."
          );
        });
      }
    );
});

describe("execute with config file, launch process", () => {
  const childProcess: ChildProcess = new ChildProcess();
  childProcess.stdout = <Readable>new EventEmitter();
  childProcess.stdout.emit("data", "contents");
  childProcess.stderr = <Readable>new EventEmitter();
  childProcess.stderr.emit("data", "contents");
  beforeAll(() => {
    jest.doMock("fs-extra", () => {
      return {
        __esModule: true,
        existsSync: jest.fn(() => true),
        readFileSync: jest.fn(() =>
          JSON.stringify({
            contractsRoot: "./contracts/",
            testsRoot: "./tests/",
            buildOutputDirectory: "./build/",
          })
        ),
      };
    });
    jest.doMock("child_process", () => {
      return {
        __esModule: true,
        spawn: jest.fn(() => childProcess),
        spawnSync: jest.fn(),
      };
    });
  });
  test
    .stdout()
    .command(["execute"])
    .it(
      "given existing config file when running execute, it launches child process",
      (ctx) => {
        return import("fs-extra").then(() => {
          return import("child_process").then((cp) => {
            expect(ctx.stdout).toContain("Executing the contract-cli...");
            childProcess.emit("close", 0);
            expect(ctx.stdout).toContain("Done executing the contract-cli.");
            expect(cp.spawn).toBeCalledTimes(1);
          });
        });
      }
    );
});
