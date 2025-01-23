import '@remix-run/server-runtime';
import type { Dependencies } from '@/data/formDefinition/formDefinitionsDep.server';
import type { i18n } from 'i18next';

declare module 'react-router' {
  export interface AppLoadContext {
    dependencies: Dependencies;
    refreshDependencies: () => Promise<void>;
    i18n: i18n;
  }

  // TODO: remove this once we've migrated to `Route.LoaderArgs` instead for our loaders
  interface LoaderFunctionArgs {
    context: AppLoadContext;
  }

  // TODO: remove this once we've migrated to `Route.ActionArgs` instead for our actions
  interface ActionFunctionArgs {
    context: AppLoadContext;
  }
}
