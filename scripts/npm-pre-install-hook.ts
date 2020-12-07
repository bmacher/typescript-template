/**
 * @author Benjamin Macher
 * @description This script forces the use of yarn as package manager.
 *
 * @license MIT
 * @copyright by Benjamin Macher 2020
 */

import chalk from 'chalk';

const { info, error } = console;
const blankLine = () => info();

const execPath = process.env.npm_execpath;

if (!execPath || !execPath.includes('yarn')) {
  blankLine();
  const errorMsg = 'This repository uses yarn as its package manager!\n'
    + 'To install dependencies run: yarn OR yarn install';

  error(chalk.red(errorMsg));
  blankLine();

  process.exit(1);
}
