import { index, route, type RouteConfig } from '@react-router/dev/routes';

export default [
  index('routes/index.tsx'),

  /* Generic record pages */
  route(':recordType', 'routes/recordType.tsx', [
    index('routes/home.tsx'),
    route('create', 'routes/recordCreate.tsx'),
    route(':recordId', 'routes/record.tsx', [
      index('routes/recordView.tsx'),
      route('update', 'routes/recordUpdate.tsx'),
      route('delete', 'routes/recordDelete.tsx'),
    ]),
  ]),

  /* Overrides */
  //  route('diva-output', 'routes/divaOutputHome.tsx'),

  /* Auth */
  route('login', 'routes/login.tsx'),
  route('logout', 'routes/logout.tsx'),

  /* Resource routes */
  route('record/:recordType/:recordId', 'routes/getRecord.tsx'),
  route('refreshDefinitions', 'routes/refreshDefinitions.tsx'),
  route('autocompleteSearch', 'routes/autocompleteSearch.tsx'),
  route('translations/:lang', 'routes/translations.tsx'),

  route('design-system', 'routes/designSystem.tsx'),
] satisfies RouteConfig;
