import { index, route, type RouteConfig } from '@react-router/dev/routes';

export default [
  index('routes/index.tsx'),

  /* Generic record pages */
  route(':recordType', 'routes/recordType.tsx', [
    // Sidan kunde inte hittas
    index('routes/recordSearch.tsx'),
    route('create', 'routes/recordCreate.tsx'),
    route(':recordId', 'routes/record.tsx', [
      // Posten kunde inte hittas
      index('routes/recordView.tsx'),
      route('update', 'routes/recordUpdate.tsx'),
      route('delete', 'routes/recordDelete.tsx'),
    ]),
  ]),

  /* Auth */
  route('login', 'routes/login.tsx'),
  route('logout', 'routes/logout.tsx'),

  /* Resource routes */
  route('record/:recordType/:recordId', 'routes/getRecord.tsx'),
  route('refreshDefinitions', 'routes/refreshDefinitions.tsx'),
  route('autocompleteSearch/:searchType', 'routes/autocompleteSearch.tsx'),
  route('translations/:lang', 'routes/translations.tsx'),
  route('fileUpload', 'routes/fileUpload.tsx'),

  route('design-system', 'routes/designSystem.tsx'),
  route('api-docs', 'routes/api-docs/apiDocs.tsx', [
    route(':recordType', 'routes/api-docs/apiDocsRecordType.tsx', [
      route(':validationType', 'routes/api-docs/apiDocsValidationType.tsx'),
    ]),
  ]),
] satisfies RouteConfig;
