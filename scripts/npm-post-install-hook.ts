/**
 * @author Benjamin Macher
 * @description This script forces the use of yarn as package manager.
 *
 * @license MIT
 * @copyright by Benjamin Macher 2020
 */

import { resolve } from 'path';
import * as shell from 'shelljs';
import chalk from 'chalk';

const { info, error } = console;
const blankLine = () => info();

blankLine();
info('>> post-install hook');

function installHookOrThrow(path: string, name: string) {
  info(`Installing: ${name}`);

  const hookPath = resolve(path, name);
  const hookScriptPath = resolve(__dirname, `git-${name}-hook.ts`);

  let { code } = shell.exec(`echo 'npx ts-node ${hookScriptPath} "$@"'> ${hookPath}`);

  if (code !== 0) {
    throw new Error(`Couldn't add ${name} hook`);
  }

  code = shell.exec(`chmod +x ${hookPath}`).code;

  if (code !== 0) {
    throw new Error(`Couldn't make ${name} hook executable`);
  }
}

const rootPath = resolve(__dirname, '..');
const gitHooksPath = resolve(rootPath, '.git/hooks');

// Get hooks that have a script
const hooks = shell
  .ls(resolve(rootPath, 'scripts'))
  // Prevent '.d.ts' to be treated as hooks
  .filter((filename) => /^git-[\w-.]+(?<!\.d)\.ts$/.test(filename))
  // Extract hook name -> git-<name>-hook.ts
  .map((hook) => hook.slice(4, -8));

info('Checking, whether git hooks are already installed');
const installedHooks = shell.ls(gitHooksPath);
const toBeInstalledHooks: string[] = [];

for (const hook of hooks) {
  if (installedHooks.includes(hook)) {
    info(`  ✅ ${hook}`);
  } else {
    info(`  ❌ ${hook}`);
    toBeInstalledHooks.push(hook);
  }
}

blankLine();

if (toBeInstalledHooks.length > 0) {
  for (const hook of toBeInstalledHooks) {
    try {
      installHookOrThrow(gitHooksPath, hook);
    } catch (err) {
      error(chalk.red(`Error: ${(<Error>err).message}`));
      blankLine();

      error(chalk.red(`Coundn't install ${hook} hook, please run scripts/npm-post-install-hook.ts manually and make sure that it runs through.`));
      info('To execute run: npx ts-node scripts/npm-post-install-hook.ts');

      shell.exit(1);
    }
  }

  blankLine();
}

info('✅ Done!');
