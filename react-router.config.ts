import type { Config } from '@react-router/dev/config';

const { BASE_PATH } = process.env;

export default {
  ssr: true,
  buildDirectory: 'dist',
  basename: BASE_PATH,
} satisfies Config;
