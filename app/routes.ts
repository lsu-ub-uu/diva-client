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
  route('delete/:recordType/:recordId', 'routes/recordDelete.tsx'),

  /* Search */
  route('search', 'routes/home.tsx', { id: 'search' }),

  /* Resource routes */
  route('record/:recordType/:recordId', 'routes/getRecord.tsx'),
  route('refreshDefinitions', 'routes/refreshDefinitions.tsx'),
  route('autocompleteSearch', 'routes/autocompleteSearch.tsx'),
  route('translations/:lang', 'routes/translations.tsx'),

  route('design-system', 'routes/designSystem.tsx'),
] satisfies RouteConfig;
