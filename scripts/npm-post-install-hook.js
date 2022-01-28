const { resolve } = require('path');
const shell = require('shelljs');
const chalk = require('chalk');

const rootPath = resolve(__dirname, '..');
const gitHooksPath = resolve(rootPath, '.git/hooks');
const { info, error } = console;
const blankLine = () => info();

blankLine();
info(chalk.blue('⚙️  postinstall hook'));

if (!shell.test('-d', gitHooksPath)) {
  info(chalk.yellow('Cannot install hooks because .git/hooks doesn\'t exist. Perhaps running inside pipeline.'));
  blankLine();
  shell.exit(0);
}

function installHookOrThrow(path, name) {
  info(`=> Installing: ${name}`);

  const hookPath = resolve(path, name);
  const hookScriptPath = resolve(__dirname, `git-${name}-hook.js`);

  let { code } = shell.exec(`echo 'node ${hookScriptPath} "$@"'> ${hookPath}`);

  if (code !== 0) {
    throw new Error(`Couldn't add ${name} hook`);
  }

  code = shell.chmod('+x', hookPath).code;

  if (code !== 0) {
    throw new Error(`Couldn't make ${name} hook executable`);
  }

  info(`✅ ${name}`);
}

// Get hooks that have a script
const hooks = shell
  .ls(resolve(rootPath, 'scripts'))
  .filter((filename) => /^git-[\w-.]+\.js$/.test(filename))
  // Extract hook name -> git-<name>-hook.js
  .map((hook) => hook.slice(4, -8));

info('=> Checking, whether git hooks are already installed');
const installedHooks = shell.ls(gitHooksPath);
const toBeInstalledHooks = hooks.reduce((acc, hook) => {
  if (installedHooks.includes(hook)) {
    info(`✅ ${hook}`);
    return acc;
  }

  info(`❌ ${hook}`);
  return [...acc, hook];
}, []);

blankLine();

toBeInstalledHooks.forEach((hook) => {
  try {
    installHookOrThrow(gitHooksPath, hook);
  } catch (err) {
    error(chalk.red(`Error: ${err.message}`));
    blankLine();

    error(chalk.red(`Couldn't install ${hook} hook, please run scripts/npm-post-install-hook.js manually and make sure that it runs through.`));
    info('To execute run: node scripts/npm-post-install-hook.js');

    shell.exit(1);
  }
});

if (toBeInstalledHooks.length > 0) blankLine();

info(chalk.green('✅ Done!'));
