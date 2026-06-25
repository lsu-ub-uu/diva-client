import { defineConfig } from 'vitest/config';
import { reactRouter } from '@react-router/dev/vite';
import svgr from 'vite-plugin-svgr';
import { reactCompilerPreset } from '@vitejs/plugin-react';
import babel from '@rolldown/plugin-babel';

const { VITEST, BASE_PATH } = process.env;

export default defineConfig({
  base: BASE_PATH ? `${BASE_PATH}/` : undefined,
  css: {
    devSourcemap: true,
  },
  plugins: [
    !VITEST && reactRouter(),
    !VITEST &&
      babel({
        include: /\.[jt]sx?$/,
        presets: [reactCompilerPreset()],
      }),
    svgr({
      include: 'app/icons/**/*.svg?react',
      svgrOptions: {
        icon: true,
        replaceAttrValues: {
          '#e8eaed': 'currentColor',
        },
      },
    }),
    svgr({
      exclude: 'app/icons/**/*.svg?react',
    }),
  ],

  resolve: {
    tsconfigPaths: true,
    /**
     * Fix for issue with Vitest + remix-hook-form on Node 20.19+
     * https://github.com/remix-run/react-router/issues/12785#issuecomment-2731496414
     * */
    conditions: VITEST ? ['module-sync'] : undefined,
  },
  test: {
    environment: 'jsdom',
    include: ['**/*.{test,spec}.{js,ts,mts,cts,tsx}'],
    exclude: ['**/node_modules/**', '**/target/**'],
    setupFiles: './setupTest.ts',
  },
  environments: {
    ssr: {
      build: {
        rollupOptions: {
          input: './server/app.ts',
        },
      },
    },
  },
  build: {
    outDir: './dist',
  },
});
