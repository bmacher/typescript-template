const chalk = require('chalk');
const shell = require('shelljs');

const { info, error } = console;
const blankLine = () => info();

blankLine();
info(chalk.blue('⚙️  commit-msg hook'));
info('=> Verifying commit message');

shell.config.silent = true;
if (shell.exec('yarn commitlint --edit').code !== 0) {
  const errorMsg = 'Error: Invalid commit message format.\n\n'
    + '    A proper commit message would look like this:\n\n'
    + '    feat(package-a): add a feature\n'
    + '    fix(package-b): error (close: #123)\n\n'
    + `    For further information see ${chalk.underline('COMMIT_CONVENTION.md')}.\n`;

  blankLine();
  error(chalk.red(errorMsg));

  shell.exit(1);
}

info(chalk.green('✅ Valid message format'));
blankLine();
