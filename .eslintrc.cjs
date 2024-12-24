/** @type {import("eslint").Linter.Config} */
const config = {
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "project": true
  },
  "plugins": [
    "@typescript-eslint"
  ],
  "extends": [
    "next/core-web-vitals",
    "plugin:@typescript-eslint/recommended-type-checked",
    "plugin:@typescript-eslint/stylistic-type-checked"
  ],
  "rules": {
    'no-console': 'off',      
    'react/prop-types': 'off', 
    '@typescript-eslint/no-base-to-string': 'off',
    '@typescript-eslint/no-explicit-any': 'off', // Disable the rule globally
    'no-unused-vars': 'warn',  
    '@typescript-eslint/no-unsafe-assignment': 'off',
    "@typescript-eslint/array-type": "off",
    '@typescript-eslint/no-unsafe-argument': 'off', // Disable the rule globally
    '@typescript-eslint/no-unsafe-return': 'off', // Disable the rule globally
    "@typescript-eslint/no-unsafe-member-access": "off", // Disable the rule globally
    '@typescript-eslint/consistent-indexed-object-style': 'off', // Disable the rule globally
    '@typescript-eslint/prefer-nullish-coalescing': 'off', // Disable the rule globally
    "@typescript-eslint/consistent-type-definitions": "off",
    "@typescript-eslint/consistent-type-imports": [
      "warn",
      {
        "prefer": "type-imports",
        "fixStyle": "inline-type-imports"
      }
    ],
    "@typescript-eslint/no-unused-vars": [
      "warn",
      {
        "argsIgnorePattern": "^_"
      }
    ],
    "@typescript-eslint/require-await": "off",
    "@typescript-eslint/no-misused-promises": [
      "error",
      {
        "checksVoidReturn": {
          "attributes": false
        }
      }
    ]
  }
}
module.exports = config;