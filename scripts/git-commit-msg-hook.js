/* eslint-disable @typescript-eslint/no-var-requires */
const chalk = require('chalk');
const { readFileSync } = require('fs');
const { resolve } = require('path');

const { info, error } = console;
const blankLine = () => info();

blankLine();
info(chalk.blue('>> commit-msg hook'));

const rootPath = resolve(__dirname, '..');
const maxMsgLength = 50;
const commitRE = new RegExp(`^(revert: )?(feat|fix|docs|refactor|test|chore|wip|style|tooling)(\\(.+\\))?: .{1,${maxMsgLength}}`);

// First two arguments are path to node and path to script
const [,, msgPath] = process.argv;
const msg = readFileSync(resolve(rootPath, msgPath))
  .toString()
  .trim();

info('Verifying commit message');

if (!commitRE.test(msg)) {
  const errorMsg = 'Error: Invalid commit message format.\n\n'
    + '    A proper commit message would look like this:\n\n'
    + '    feat(package-a): add a feature\n'
    + '    fix(package-b): error (close: #123)\n\n'
    + `    For further information see ${chalk.underline('COMMIT_CONVENTION.md')}.\n`;

  blankLine();
  error(chalk.red(errorMsg));

  process.exit(1);
}

info('✅ Valid message format');
blankLine();
