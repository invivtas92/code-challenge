import { defineConfig } from 'vitest/config';
import tsconfigPaths from 'vite-tsconfig-paths';
import react from '@vitejs/plugin-react-swc';

export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths({
      projects: ['tsconfig.test.json']
    })],
  test: {
    include: ['src/**/*.test.[jt]s?(x)'],
    typecheck: {
      enabled: true,
      checker: 'tsc',
      tsconfig: './tsconfig.test.json',
      include: ['src/**/*.test.[jt]s?(x)'],
    },
    setupFiles: 'src/tests/setup.ts',
    environment: 'jsdom'
  },
})