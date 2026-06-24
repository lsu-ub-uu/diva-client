import { defineConfig } from 'vitest/config';
import { reactRouter } from '@react-router/dev/vite';
import svgr from 'vite-plugin-svgr';
import babelPlugin from 'vite-plugin-babel';

export default defineConfig({
  base: process.env.BASE_PATH ? `${process.env.BASE_PATH}/` : undefined,
  css: {
    devSourcemap: true,
  },
  plugins: [
    !process.env.VITEST && reactRouter(),
    !process.env.VITEST &&
      babelPlugin({
        filter: /\.tsx?$/,
        babelConfig: {
          presets: ['@babel/preset-typescript'],
          plugins: ['babel-plugin-react-compiler'],
          sourceMaps: true,
        },
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
  ssr: {
    noExternal: ['@react-router/express', 'remix-hook-form'],
  },
  resolve: {
    conditions: ['module-sync'],
    tsconfigPaths: true,
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
        rolldownOptions: {
          input: './server/app.ts',
        },
      },
    },
  },
  build: {
    outDir: './dist',
  },
});
