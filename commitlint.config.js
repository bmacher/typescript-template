module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'body-max-line-length': [2, 'always', Infinity],
    'type-enum': [2, 'always', ['feat', 'fix', 'docs', 'refactor', 'test', 'chore', 'wip', 'style', 'tooling', 'revert']],
  },

  defaultIgnores: false,
  ignores: [
    // Ignore dependabot commits with large bodies.
    (commit) => /^chore\(deps(-dev)?\): bump/.test(commit),
  ],
};
