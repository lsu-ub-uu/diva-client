import { defineConfig } from 'vite';
import { reactRouter } from '@react-router/dev/vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import svgr from 'vite-plugin-svgr';
import babelPlugin from 'vite-plugin-babel';

export default defineConfig(({ isSsrBuild }) => {
  const { BASE_PATH } = process.env;

  return {
    base: BASE_PATH ? `${BASE_PATH}/` : undefined,
    plugins: [
      !process.env.VITEST && reactRouter(),
      !process.env.VITEST &&
        babelPlugin({
          filter: /\.tsx?$/,
          babelConfig: {
            presets: ['@babel/preset-typescript'],
            plugins: ['babel-plugin-react-compiler'],
            retainLines: true,
          },
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
