/** @type {import("prettier").Config} */
const config = {
    semi: true,
    singleQuote: false,
    jsxSingleQuote: false,
    trailingComma: "all",
    tabWidth: 2,
    useTabs: false,
    printWidth: 80,
    bracketSpacing: true,
    bracketSameLine: false,
    arrowParens: "always",
    endOfLine: "lf",
  
    plugins: ["prettier-plugin-tailwindcss"],
  };
  
  export default config;