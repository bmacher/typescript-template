[![Node CI](https://github.com/bmacher/typescript-template/workflows/Node%20CI/badge.svg)](https://github.com/bmacher/typescript-template/actions?query=workflow%3A%22Node+CI%22)
[![GitHub release](https://img.shields.io/github/release/bmacher/typescript-template.svg)](https://GitHub.com/bmacher/typescript-template/releases/)
[![GitHub license](https://img.shields.io/github/license/bmacher/typescript-template.svg)](https://github.com/bmacher/typescript-template/blob/master/LICENSE)
[![Dependabot Enabled](https://api.dependabot.com/badges/status?host=github&repo=bmacher/typescript-template)](https://github.com/bmacher/typescript-template/network/updates)

(&uarr; Adapt path to your repository!)

# Typescript Template

This is a template for TypeScript related projects. It is already delivered with some features, which are listed below. There will also be a short description how to remove single features from the repository.

Found some stuff to fix or improve? Please fork and create a pull request or simply create an issue.

## Features

  - [Yarn](#yarn)
  - [ESLint](#eslint)
  - [Jest](#jest)
  - [Commit message proposal](#commit-message-proposal)
  - [Local workflow control with git hooks](#local-workflow-control-with-git-hooks)
  - [Remote workflow control with github actions](#remote-workflow-control-with-github-actions)
  - [Dependabot](#dependabot)
  - [VS Code settings](#vs-code-settings)

### Yarn

This repository uses [yarn](https://yarnpkg.com/) as its package manager. It is just a personal flavour.

How to remove:

  - delete `yarn.lock`
  - run `npm install`
  - (**Caution!** There is a npm post install hook, that may only work with `yarn` or `npm`. Other package manager haven't been tested.)

### ESLint

[ESLint](https://eslint.org/) is used as the linting tool to keep a good code style. It extends the rule set of AirBnB (`airbnb-typescript/base`) with some own rules.

How to remove:

 - delete `.eslintrc.js` and `.eslintignore`
 - delete `"lint"` and `"lint:fix"` in scripts section in `package.json`
 - delete dependencies:

```sh
yarn remove \
  eslint \
  @typescript-eslint/eslint-plugin \
  @typescript-eslint/parser \
  eslint-config-airbnb-typescript \
  eslint-import-resolver-typescript \
  eslint-plugin-import \
  eslint-plugin-prettier \
  prettier
```

### Jest

[Jest](https://jestjs.io/) is used as the test runner. It is not integrated via `@types/jest` so that TypeScript magically knows `describe`, `it`, etc. but it uses [@jest/globals](https://jestjs.io/docs/en/api) and imports the needed utilities from there.

How to remove:

  - delete `jest.config.js`
  - delete `"test"`, `"test:verbose"` and `"test:coverage"` in scripts section in `package.json`
  - delete dependencies:

```sh
yarn remove jest @jest/globals ts-jest
```

### Commit message proposal

There is a good commit convention created by Vue ([Link](https://github.com/vuejs/vue-next/blob/master/.github/commit-convention.md)), that has been adapted for this repository (see [commit-convention.md](.github/commit-convention.md)).

### Local workflow control with git hooks

There are two git hooks in place to control the local workflow. Both are installed with a [npm post install hook](scripts/npm-post-install-hook.ts). One just verifies the commit message to match the pattern from the [Commit Convention](.github/commit-convention.md). The other one runs before `git push` and avoids pushing directly to `master`. It also runs ESLint and Jest on none `wip` commits (work in progress). To know how it works in general, see [bmacher/ts-git-hooks](https://github.com/bmacher/ts-git-hooks).

How to remove:

  - delete hook in scripts (`git-commit-msg-hook.ts`, `git-pre-push-hook.ts`)
  - if you don't need any hook
    - delete `npm-post-install-hook.ts` 
    - delete `"postinstall"` in scripts section in `package.json`
    - delete dependencies: 
    
```sh
yarn remove shelljs @types/shelljs chalk
```

### Remote workflow control with github actions

There is a github workflow in place that runs ESLint and Jest on pull requests (see [node-ci-yml](.github/workflows/node-ci.yml)). To make the master save from commits that fail on ESLint or/and Jest, go to: Settings (Repo) &rarr; Branch &rarr; Add rule and 
  
  - add "master" in *Branch name pattern*
  - activate *Require status checks to pass before merging*
    - Activate *lint-and-test* (The action must have been executed once)
  - (activate *Include administrators* to be extra save)

There is also a badge that shows the status for the worklow (see line 1).

How to remove:
  - delete `.github/workflows/node-ci-yml`

### Dependabot

[Dependabot](https://docs.github.com/en/free-pro-team@latest/github/administering-a-repository/keeping-your-dependencies-updated-automatically) is used to keep dependencies automatically up to date. It creates a pull request for each bump and (should) resolve conflicts by itself. You could also add a workflow that comments with "@dependedabot merge" when the PR has no conflicts and can be merged.

How to remove:

  - delete `.github/dependabot.yml`

### VS Code settings

There are some settings and recommendations of extensions to setup your [VS Code](https://code.visualstudio.com/) properly for this repository. 

How to remove:

  - delete `.vscode`
