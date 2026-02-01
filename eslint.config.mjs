import nextConfig from "eslint-config-next/core-web-vitals";
import tseslint from "typescript-eslint";
import prettierConfig from "eslint-config-prettier";

export default [
  {
    ignores: [
      "**/node_modules/**",
      "**/.next/**",
      "**/out/**",
      "**/*.config.js",
      "**/*.config.ts",
      "**/*.config.mjs",
    ],
  },
  ...nextConfig,
  ...tseslint.configs.recommended,
  prettierConfig,
  {
    rules: {
      "no-console": [
        "warn",
        {
          allow: ["warn", "error"],
        },
      ],
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
        },
      ],
      "@typescript-eslint/explicit-function-return-type": "off",
      "react/no-unescaped-entities": "off",
    },
  },
];
