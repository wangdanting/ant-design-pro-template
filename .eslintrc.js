module.exports = {
  parser: "babel-eslint",
  extends: ["airbnb", "eslint:recommended"],
  env: {
    browser: true,
    node: true,
    commonjs: true,
    es6: true
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 2018,
    sourceType: "module"
  },
  plugins: ["react"],
  rules: {
    indent: ["error", 2],
    "linebreak-style": ["error", "unix"],
    quotes: ["error", "single"],
    semi: ["error", "always"],
    "import/no-unresolved": [2, { ignore: ["^@/", "^umi/"] }],
    "react/prop-types": 0,
    "react/jsx-filename-extension": [1, { extensions: [".js"] }],
    "react/jsx-wrap-multilines": 0,
    "jsx-a11y/no-static-element-interactions": 0
  }
};
