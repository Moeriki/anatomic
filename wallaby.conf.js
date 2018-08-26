module.exports = (wallaby) => ({
  compilers: {
    'modules/**/*.js': wallaby.compilers.babel(),
  },

  env: {
    type: 'node',
  },

  files: [
    'modules/**/*.js',
    '!modules/demo/**.js',
    '!modules/*/test/**.js',
    '!modules/*/node_modules/**',
  ],

  testFramework: 'jest',

  tests: ['modules/*/test/**.test.js'],
});
