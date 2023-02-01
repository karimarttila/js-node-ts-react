// eslint-disable-next-line import/no-extraneous-dependencies
import { defineConfig } from 'vite';

// NOTE: Unit tests using vitest.
// Integration tests using pactum (see directory: test-integration).
export default defineConfig({
  test: {
    globals: true,
    testEnvironment: 'node',
    environment: 'node',
    include: ['./test/**/*.{test,spec}.{js,mjs}'],
  },
});
