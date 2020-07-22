module.exports = {
  env: {
    node: true,
    browser: true,
    es6: true
  },
  extends: ['google', 'prettier'],
  plugins: ['prettier'],
  parserOptions: {
    ecmaVersion: 11,
    sourceType: 'module'
  },
  rules: {}
};
