// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parserOptions: {
    parser: "babel-eslint",
    ecmaVersion: 2017,
    sourceType: "module"
  },
  env: {
    browser: true
  },
  // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
  // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
  extends: ["plugin:vue/essential"],
  // required to lint *.vue files
  plugins: ["vue"],
  // add your custom rules here
  rules: {
    "func-names": 0,
    "no-bitwise": 0,
    "no-console": 0,
    "no-underscore-dangle": 0,
    "max-len": [2, 200, 4, { ignoreUrls: true }],
    // allow assign to params
    "no-param-reassign": 0,
    // allow debugger during development
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off"
  }
};
