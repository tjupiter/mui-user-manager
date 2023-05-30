export default [
  {
    plugins: ["prettier", "@typescript-eslint"],
    parser: "@typescript-eslint/parser",
    // files: ["**/*.ts", "**/*.tsx"],
    rules: {
      semi: "error",
      "prefer-const": "error",
      "react/jsx-key": 2,
      "arrow-body-style": 1,
      "import/no-duplicates": 1,
      "react/self-closing-comp:": 1,
      "@typescript-eslint/no-explicit-any": "error",
      "react/jsx-uses-react": "error",
      "no-console": ["error", { allow: ["warn", "error"] }],
      "prefer-destructuring": [
        1,
        { array: false, object: false },
        { enforceForRenamedProperties: false },
      ],
    },
    languageOptions: {
      parserOptions: {
        project: ["**/tsconfig.json"],
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
  },
];
