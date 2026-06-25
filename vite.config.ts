import { defineConfig } from 'vitest/config';
import { reactRouter } from '@react-router/dev/vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import svgr from 'vite-plugin-svgr';
import { reactCompilerPreset } from '@vitejs/plugin-react';
import babel from '@rolldown/plugin-babel';

export default defineConfig({
  base: process.env.BASE_PATH ? `${process.env.BASE_PATH}/` : undefined,
  css: {
    devSourcemap: true,
  },
  plugins: [
    !process.env.VITEST && reactRouter(),
    !process.env.VITEST &&
      babel({
        include: /\.[jt]sx?$/,
        presets: [reactCompilerPreset()],
      }),

    tsconfigPaths(),
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

  /**
   * Fix for issue with Vitest + remix-hook-form on Node 20.19+
   * https://github.com/remix-run/react-router/issues/12785#issuecomment-2731496414
   * */
  resolve: {
    conditions: ['module-sync'],
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
