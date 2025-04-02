import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

// Resolve __dirname and __filename for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Initialize FlatCompat with the current directory
const compat = new FlatCompat({
  baseDirectory: __dirname,
});

// Define ESLint config and disable specific rules
const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      // Disable unused variable warnings
      "@typescript-eslint/no-unused-vars": "off",
      // Disable unescaped entity warnings
      "react/no-unescaped-entities": "off",
      // Disable non-null assertions in optional chains
      "@typescript-eslint/no-non-null-asserted-optional-chain": "off",
      // Disable explicit 'any' warnings
      "@typescript-eslint/no-explicit-any": "off",
    },
  },
];

export default eslintConfig;
