import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

export default defineConfig([
  ...nextVitals,
  ...nextTs,

  {
    rules: {
      // ===== JavaScript =====
      eqeqeq: ["error", "always"],
      curly: ["error", "all"],
      "no-var": "error",
      "prefer-const": "error",
      "no-console":
        process.env.NODE_ENV === "production"
          ? ["warn", { allow: ["warn", "error"] }]
          : "off",

      // ===== TypeScript =====
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          ignoreRestSiblings: true,
        },
      ],
      "@typescript-eslint/consistent-type-imports": [
        "error",
        {
          prefer: "type-imports",
          fixStyle: "inline-type-imports",
        },
      ],
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/no-non-null-assertion": "warn",

      // ===== Import =====
      "sort-imports": [
        "warn",
        {
          ignoreDeclarationSort: true,
          ignoreCase: true,
        },
      ],

      // ===== React =====
      "react/jsx-key": "error",
      "react/self-closing-comp": "warn",

      // ===== Next =====
      "@next/next/no-img-element": "warn",
    },
  },

  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    "coverage/**",
    "dist/**",
    "*.config.js",
    "*.config.cjs",
    "*.config.mjs",
  ]),
]);