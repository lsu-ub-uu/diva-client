import { index, route, type RouteConfig } from '@react-router/dev/routes';

export default [
  index('routes/index.tsx'),

  /* Generic record pages */
  route(':recordType', 'routes/record/recordType.tsx', [
    index('routes/record/recordSearch.tsx'),
    route('create', 'routes/record/recordCreate.tsx'),
    route(':recordId', 'routes/record/record.tsx', [
      index('routes/record/recordView.tsx'),
      route('update', 'routes/record/recordUpdate.tsx'),
      route('delete', 'routes/record/recordDelete.tsx'),
    ]),
  ]),

  route('diva-output', 'routes/divaOutput/divaOutputSearch.tsx'),
  route('diva-output/:recordId', 'routes/divaOutput/divaOutputView.tsx'),

  /* Auth */
  route('login', 'routes/auth/login.tsx'),
  route('logout', 'routes/auth/logout.tsx'),

  /* Resource routes */
  route('record/:recordType/:recordId', 'routes/resourceRoutes/getRecord.tsx'),
  route('refreshDefinitions', 'routes/resourceRoutes/refreshDefinitions.tsx'),
  route(
    'autocompleteSearch/:searchType',
    'routes/resourceRoutes/autocompleteSearch.tsx',
  ),
  route('translations/:lang', 'routes/resourceRoutes/translations.tsx'),
  route('binaryRecord', 'routes/resourceRoutes/binaryRecord.ts'),
  route('binary/:id/:name', 'routes/resourceRoutes/binary.ts'),

  route('design-system', 'routes/docs/designSystem.tsx'),
] satisfies RouteConfig;
