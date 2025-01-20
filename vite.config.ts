import { defineConfig } from 'vite';
import { vitePlugin as remix } from '@remix-run/dev';
import tsconfigPaths from 'vite-tsconfig-paths';

declare module '@remix-run/server-runtime' {
  interface Future {
    v3_singleFetch: true;
  }
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const { BASE_PATH } = process.env;

  return {
    base: BASE_PATH ? `${BASE_PATH}/` : undefined,
    plugins: [
      !process.env.VITEST &&
        remix({
          buildDirectory: 'dist',
          basename: BASE_PATH,
          future: {
            v3_fetcherPersist: true,
            v3_relativeSplatPath: true,
            v3_throwAbortReason: true,
            v3_singleFetch: true,
            v3_lazyRouteDiscovery: true,
            v3_routeConfig: true,
          },
        }),
      tsconfigPaths(),
    ],
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
