import { index, route, type RouteConfig } from '@react-router/dev/routes';

export default [
  index('routes/index.tsx'),

  /* Generic record pages */
  route(':recordType', 'routes/record/recordType.tsx', [
    // Sidan kunde inte hittas
    index('routes/record/recordSearch.tsx'),
    route('create', 'routes/record/recordCreate.tsx'),
    route(':recordId', 'routes/record/record.tsx', [
      // Posten kunde inte hittas
      index('routes/record/recordView.tsx'),
      route('update', 'routes/record/recordUpdate.tsx'),
      route('delete', 'routes/record/recordDelete.tsx'),
    ]),
  ]),

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
  route('fileUpload', 'routes/resourceRoutes/fileUpload.tsx'),

  route('output-prototype', 'routes/outputPrototype.tsx'),

  route('design-system', 'routes/docs/designSystem.tsx'),
  route('api-docs', 'routes/docs/apiDocs.tsx', [
    route(':recordType', 'routes/docs/apiDocsRecordType.tsx', [
      route(':validationType', 'routes/docs/apiDocsValidationType.tsx', [
        route(':method', 'routes/docs/apiDocsMethod.tsx'),
      ]),
    ]),
  ]),
] satisfies RouteConfig;
