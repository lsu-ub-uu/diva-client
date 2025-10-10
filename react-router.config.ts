import type { Config } from '@react-router/dev/config';

export default {
  ssr: true,
  buildDirectory: 'dist',
  basename: process.env.BASE_PATH ?? undefined,
  future: {
    v8_middleware: true,
  },
} satisfies Config;
