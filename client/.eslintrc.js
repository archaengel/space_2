module.exports = {
  "extends": ["plugin:react/recommended", "../.eslintrc.js"],
  "parser": "babel-eslint",
  "parserOptions": {
    "sourceType": "module",
    "ecmaVersion": 2018,
    "ecmaFeatures": {
      "jsx": true
    }
  },
  "env": {
    "es6": true,
    "browser": true,
  },
  "settings": {
    "react": {
      "version": "detect"
    }
  }
}
