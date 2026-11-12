import type { Config } from '@react-router/dev/config';

export default {
  ssr: true,
  buildDirectory: 'dist',
  basename: process.env.BASE_PATH ?? undefined,
  // Lazy discovery breaks ties between diva-output/:recordId and :recordType/create
  routeDiscovery: { mode: 'initial' },
} satisfies Config;
