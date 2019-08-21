module.exports = {
  "extends": ["./node_modules/sanctuary-style/eslint-es6.json"],
  "parserOptions": {
    "sourceType": "module",
    "ecmaVersion": 2018
  },
  "rules": {
    "semi": ["error", "never"],
    "eqeqeq": ["error", "always"],
  },
  "env": {
    "node": true,
    "es6": true,
  }
}
