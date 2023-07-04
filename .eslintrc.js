module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    "plugin:@typescript-eslint/recommended",
    "plugin:vue/vue3-essential",
    "prettier",
    "eslint:recommended",
    "plugin:prettier/recommended",
    "plugin:vue/vue3-recommended"
  ],
  overrides: [
    {
      env: {
        node: true
      },
      files: [".eslintrc.{js,cjs}"],
      parserOptions: {
        sourceType: "script"
      }
    },
    {
      files: ["*.vue"],
      rules: {
        "no-undef": "off",
        "vue/component-name-in-template-casing": [2, "kebab-case"],
        "vue/require-default-prop": 0,
        "vue/multi-word-component-names": 0,
        "vue/no-reserved-props": 0,
        "vue/no-v-html": 0,
        "vue-scoped-css/enforce-style-type": ["error", { allows: ["scoped"] }]
      }
    }
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module"
  },
  plugins: ["vue", "@typescript-eslint", "prettier"],
  rules: {
    "no-debugger": "warn",
    "vue/no-v-html": "off",
    "multiline-ternary": ["error", "never"],
    "max-len": ["error", { code: 130, tabWidth: 4 }],
    "vue/require-default-prop": "off",
    "vue/require-explicit-emits": "off",
    "vue/multi-word-component-names": "off",
    "@typescript-eslint/no-explicit-any": "off", // any
    "@typescript-eslint/explicit-module-boundary-types": "off", // setup()
    "@typescript-eslint/ban-types": "off",
    "@typescript-eslint/ban-ts-comment": "off",
    "@typescript-eslint/no-empty-function": "off",
    "@typescript-eslint/no-non-null-assertion": "off",
    "arrow-spacing": ["error", { before: true, after: true }],
    "vue/html-closing-bracket-spacing": [
      "error",
      {
        startTag: "never",
        endTag: "never",
        selfClosingTag: "always"
      }
    ],
    "no-useless-catch": "off",
    "vue/html-self-closing": [
      "error",
      {
        html: {
          void: "always",
          normal: "always",
          component: "always"
        },
        svg: "always",
        math: "always"
      }
    ],
    "@typescript-eslint/no-unused-vars": [
      "error",
      {
        argsIgnorePattern: "^_",
        varsIgnorePattern: "^_"
      }
    ],
    "prettier/prettier": [
      "error",
      {
        endOfLine: "auto"
      }
    ]
  }
};
