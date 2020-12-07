# Git Commit Message Convention

> This is adapted from [Vue's commit convention](https://github.com/vuejs/vue-next/blob/master/.github/commit-convention.md).

#### TL;DR:

Messages must be matched by the following regex:

``` js
/^(revert: )?(feat|fix|docs|refactor|test|chore|wip|style|tooling)(\\(.+\\))?: .{1,50}/
```

#### Examples

Adding a feature

```
feat(infrastructure): add pipeline
```

Adding feature that closes a ticket

```
feat(infrastructure): add pipeline

close DPP-1234
```

Revert a commit

```
revert: feat(infrastructure): add pipeline

This reverts commit 667ecc1654a317a13331b17617d973392f415f02.
```

### Full Message Format

A commit message consists of a **header**, **body** and **footer**. The header has a **type**, **scope** and **subject**:

```
<type>(<scope>): <subject>
<BLANK LINE>
<body>
<BLANK LINE>
<footer>
```

The **header** is mandatory and the **scope** of the header is optional.

### Revert

If the commit reverts a previous commit, it should begin with `revert: `, followed by the header of the reverted commit. In the body, it should say: `This reverts commit <hash>.`, where the hash is the SHA of the commit being reverted.

### Type

Use the following types:

Type | Description
---- | -----------
feat | Adding a new feature
fix | Fixing an error
docs | Adding documentation
refactor | Refactoring the code
test | Adding / Updating a test
wip | Adding something that isn't finished yed
style | Doing some code styling
tooling | Changeing the tooling like eslint, jest, etc.
chore | Doing something

### Scope

The scope could be anything specifying the place of the commit change. For example `core`, `rvs-storage`, `talaria`, etc...

### Subject

The subject contains a succinct description of the change:

* use the imperative, present tense: "change" not "changed" nor "changes"
* don't capitalize the first letter
* no dot (.) at the end

### Body

Just as in the **subject**, use the imperative, present tense: "change" not "changed" nor "changes".
The body should include the motivation for the change and contrast this with previous behavior.

### Footer

The footer should contain any information about the referenced Jira ticket that this commit **Closes**.