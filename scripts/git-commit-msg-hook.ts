/**
 * @author Benjamin Macher
 * @description Script verifies commit messages.
 *
 * @license MIT
 * @copyright by Benjamin Macher 2020
 */

import { readFileSync } from 'fs';
import { resolve } from 'path';
import chalk from 'chalk';

const { info, error } = console;
const blankLine = () => info();

blankLine();
info('>> commit-msg hook');

const rootPath = resolve(__dirname, '..');
const maxMsgLength = 50;
const commitRE = new RegExp(`^(revert: )?(feat|fix|docs|refactor|test|chore|wip|style|tooling)(\\(.+\\))?: .{1,${maxMsgLength}}`);

// First two arguments are path to ts-node and path to script
const [,,msgPath] = process.argv;
const msg = readFileSync(resolve(rootPath, msgPath))
  .toString()
  .trim();

info('Verifying commit message');

if (!commitRE.test(msg)) {
  const errorMsg = 'Error: Invalid commit message format.\n\n'
    + '    A proper commit message would look like this:\n\n'
    + '    feat(package-a): add a feature\n'
    + '    fix(package-b): error (close: #123)\n\n'
    + `    For further information see ${chalk.underline('commit-convention.md')}.\n`;

  blankLine();
  error(chalk.red(errorMsg));

  process.exit(1);
}

info('✅ Valid message format');
blankLine();
