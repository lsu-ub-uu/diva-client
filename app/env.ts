import '@remix-run/server-runtime';
import type { Dependencies } from '@/data/formDefinition/formDefinitionsDep.server';
import type { i18n } from 'i18next';

declare module 'react-router' {
  export interface AppLoadContext {
    dependencies: Dependencies;
    refreshDependencies: () => Promise<void>;
    i18n: i18n;
  }
}
