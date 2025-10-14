//  @ts-check

/** @type {import('prettier').Config} */
const config = {
  printWidth: 120,
  semi: true,
  singleQuote: true,
  trailingComma: 'all',
  plugins: ['prettier-plugin-tailwindcss'],
  tailwindStylesheet: './src/styles.css',
};

export default config;
