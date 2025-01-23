import { index, route, type RouteConfig } from '@react-router/dev/routes';

export default [
  index('routes/home.tsx'),

  /* Auth */
  route('login', 'routes/login.tsx'),
  route('logout', 'routes/logout.tsx'),

  /* Record CRUD */
  route('create', 'routes/recordCreate.tsx'),
  route('view/:recordType/:recordId', 'routes/recordView.tsx'),
  route('update/:recordType/:recordId', 'routes/recordUpdate.tsx'),
  route('delete/:recordType/:recordId.tsx', 'routes/recordDelete.tsx'),

  /* Search */
  route('search/:searchType', 'routes/search.tsx'),

  /* Resource routes */
  route('record/:recordType/:recordId.tsx', 'routes/getRecord.tsx'),
  route('refreshDefinitions', 'routes/refreshDefinitions.tsx'),
  route('autocompleteSearch', 'routes/autocompleteSearch.tsx'),
  route('translations/:lang', 'routes/translations.tsx'),
] satisfies RouteConfig;
