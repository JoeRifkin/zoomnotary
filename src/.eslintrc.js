module.exports = {
  root: true,
  extends: ["@react-native-community", "plugin:sonarjs/recommended"],
  plugins: ["sonarjs"],
  rules: {
    camelcase: [2, { properties: "never" }],
    PascalCase: [2, { properties: "never" }],
  },
  parser: "@babel/eslint-parser",
  parserOptions: {
    requireConfigFile: false,
    ecmaVersion: 2018,
    sourceType: "module",
    babelOptions: {
      presets: ["@babel/preset-react"],
    },
  },
};
