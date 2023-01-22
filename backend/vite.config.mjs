// eslint-disable-next-line import/no-extraneous-dependencies
import { defineConfig } from 'vite';
// Configure Vitest (https://vitest.dev/config/)
export default defineConfig({
  test: {
    /* for example, use global to avoid globals imports (describe, test, expect): */
    // globals: true,
  },
});

// eslint-disable-next-line no-unused-vars
const config = {
  verbose: true,
  transform: {},
  testEnvironment: 'node',
  testMatch: [
    '<rootDir>/__test__/**/*.(test).{js,mjs,jsx,ts,tsx}',
    '<rootDir>/__test__/**/?(*.)(spec|test).{js,mjs,jsx,ts,tsx}',
  ],
};
