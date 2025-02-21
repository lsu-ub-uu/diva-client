import { defineConfig } from 'vite';
import { reactRouter } from '@react-router/dev/vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import svgr from 'vite-plugin-svgr';

export default defineConfig(({ isSsrBuild }) => {
  const { BASE_PATH } = process.env;

  return {
    base: BASE_PATH ? `${BASE_PATH}/` : undefined,
    plugins: [
      !process.env.VITEST && reactRouter(),
      tsconfigPaths(),
      svgr({
        svgrOptions: {
          icon: true,
          replaceAttrValues: {
            '#e8eaed': 'currentColor',
          },
        },
      }),
    ],
    test: {
      environment: 'jsdom',
      globals: true,
      include: ['**/*.{test,spec}.{ts,mts,cts,tsx}'],
      exclude: [
        '**/node_modules/**',
        '**/target/**',
        '**/*.{test,spec}.{js,mjs,cjs,jsx}',
      ],
      setupFiles: './setupTest.ts',
    },
    build: {
      rollupOptions: isSsrBuild
        ? {
            input: './server/app.ts',
          }
        : undefined,
      outDir: './dist',
    },
  };
});
