module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: ["plugin:vue/essential", "@vue/airbnb", "@vue/prettier"],
  parserOptions: {
    parser: "@babel/eslint-parser",
  },
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    "import/no-extraneous-dependencies": ["error", { devDependencies: true }],
    "prettier/prettier": [
      "warn",
      {
        singleQuote: true,
        semi: true,
      },
    ],
  },
};
