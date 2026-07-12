import globals from "globals";

export default [
  {
    files: ["**/*.js"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        // ...globals.browser,   // adds window, document, console, fetch, etc.
        ...globals.node       // adds require, module, process, __dirname, etc.
      }
    },
    rules: {
      "no-unused-vars": "warn",
      "no-undef": "error",
      "eqeqeq": "warn",
      "no-var": "warn"
    }
  }
];