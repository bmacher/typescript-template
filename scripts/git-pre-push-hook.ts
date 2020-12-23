/**
 * @author Benjamin Macher
 * @description Script is executed before 'git push' and prevents:
 *   - pushing to master branch
 *   - pushing with ESLint errors
 *   - pushing with failing jest tests
 *
 * @license MIT
 * @copyright by Benjamin Macher 2020
 */

import { resolve } from 'path';
import { readFileSync } from 'fs';
import * as shell from 'shelljs';
import chalk from 'chalk';
// Ignore: Could not find a declaration file for module 'eslint'.
// To avoid extra devDependvies for scripts.
// @ts-expect-error
import * as eslint from 'eslint';
import * as jest from 'jest';

const { info, error } = console;
const blankLine = () => info();

blankLine();
info('>> pre-push hook');

const rootPath = resolve(__dirname, '..');

// Need to wrap whole hook into function to get async/await
async function gitPrePushHook() {
  // #region Prevent pushing to master
  info('Checking for current branch');

  // Can not use 'git branch --show-current' as it prints to stdout
  const gitHeadContent = readFileSync(resolve(rootPath, '.git/HEAD'));
  const branch = gitHeadContent
    .toString()
    .trim()
    .replace('ref: refs/heads/', '');

  if (branch === 'master') {
    blankLine();
    error(chalk.red('You are not allowed to push directly into master!'));
    info('Please use Pull Requests to update master branch.');
    blankLine();

    shell.exit(1);
  }

  info('✅ Branch is not master');
  blankLine();
  // #endregion

  // Only run ESLint and Jest when last commit is none wip
  const wipCommitRE = /^(revert: )?wip/;

  info('Last commit message');
  const msgOfLastCommit = shell
    .exec('git log -1  --pretty=%s')
    .toString()
    .trim();
  blankLine();

  if (!wipCommitRE.test(msgOfLastCommit)) {
    // #region Prevent pushing with ESLint errors
    info('Linting the code');
    const linter = new eslint.ESLint({});

    const lintResult = await linter
      .lintFiles(rootPath)
      .catch((err: Error) => {
        error(err);
        blankLine();
        error(chalk.red('Executing eslint failed. Make sure that it runs properly!'));
        info('To execute run: npm run lint OR npx eslint');
        blankLine();

        shell.exit(1);
      });

    const filesWithError = lintResult
      .filter(({ errorCount }: { errorCount: number }) => errorCount > 0)
      .length;

    if (filesWithError > 0) {
      error(chalk.red('Failed...'));
      blankLine();
      error(chalk.red(`You are not allowed to push with ${filesWithError} file${filesWithError > 1 ? 's' : ''} having ESLint errors!`));
      info('To see the errors run: npm run lint OR npx eslint .');
      blankLine();

      shell.exit(1);
    }

    info('✅ ESLint succeeded');
    blankLine();
    // #endregion

    // #region Prevent pushing with jest failing tests
    info('Running tests');
    await jest.run(['--silent']).catch((err) => {
      error(err);
      blankLine();
      error(chalk.red('Executing jest failed. Make sure that it runs properly!'));
      info('To execute run: npm run test OR npx jest');
      blankLine();

      shell.exit(1);
    });

    info('✅ All tests succeeded');
    blankLine();
    // #endregion
  } else {
    // We got work in progress commit
    const warnMsg = 'Warning! You are pushing a work in progress commit!\n'
      + 'Neither ESLint nor Jest are executed and therefore\n'
      + 'the current codebase may be corrupted.';

    console.warn(chalk.keyword('orange')(warnMsg));
    blankLine();
  }
}

gitPrePushHook()
  // Exit if unkown error occurs
  .catch((err) => {
    error(err);
    shell.exit(1);
  });
