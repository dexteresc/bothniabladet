module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ["plugin:react/recommended", "airbnb", "prettier"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["react", "@typescript-eslint"],
  globals: {
    React: true,
    JSX: true,
    shallow: true,
  },
  rules: {
    "react/require-default-props": "off",
    "react/jsx-filename-extension": [
      2,
      { extensions: [".js", ".jsx", ".ts", ".tsx"] },
    ],
    "import/no-unresolved": [
      2,
      {
        ignore: ["^@?/", "^\\.?"],
      },
    ],
    "import/extensions": "off",
    "import/no-cycle": [
      2,
      {
        maxDepth: 1,
      },
    ],
    "jsx-a11y/click-events-have-key-events": "off",
    "jsx-a11y/no-noninteractive-element-interactions": "off",
    "jsx-a11y/label-has-associated-control": "off",
  },
};
