// eslint-disable-next-line import/no-extraneous-dependencies
import { defineConfig } from 'vite';
// Configure Vitest (https://vitest.dev/config/)
// https://vitejs.dev/config/
export default defineConfig({
  test: {
    globals: true,
    testEnvironment: 'node',
    environment: 'node',
    include: ['./test/**/*.{test,spec}.{js,mjs}'],
  },
});
