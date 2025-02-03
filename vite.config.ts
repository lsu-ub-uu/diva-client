import { defineConfig } from 'vite';
import { reactRouter } from '@react-router/dev/vite';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const { BASE_PATH } = process.env;

  return {
    base: BASE_PATH ? `${BASE_PATH}/` : undefined,
    plugins: [!process.env.VITEST && reactRouter(), tsconfigPaths()],
    test: {
      environment: 'jsdom',
      globals: true,
      include: ['**/*.{test,spec}.{ts,mts,cts,tsx}'],
      exclude: [
        '**/__integration__/**',
        '**/node_modules/**',
        '**/target/**',
        '**/*.{test,spec}.{js,mjs,cjs,jsx}',
      ],
      setupFiles: './setupTest.ts',
    },
    build: {
      outDir: './dist',
    },
    ssr: {
      noExternal: ['@mui/icons-material', 'notistack'],
    },
    resolve:
      mode === 'production'
        ? {
            // Fix mui cjs imports when building for production
            alias: {
              '@mui/material/utils': '@mui/material',
              '@mui/material/styles': '@mui/material',
            },
          }
        : {},
  };
});
