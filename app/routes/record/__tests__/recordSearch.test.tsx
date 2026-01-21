import { createRoutesStub } from 'react-router';
import { describe, it } from 'vitest';
import RecordSearch from '../recordSearch/recordSearch';
import type { Route } from './+types/recordSearch';

describe('recordSearch route', () => {
  it('renders search page correctly', () => {
    const mockLoaderData: Route.LoaderData = {};
    const RoutesStub = createRoutesStub([
      {
        path: '/',
        Component: () => {
          <RecordSearch loaderData={mockLoaderData} matches={} />;
        },
      },
    ]);
  });
});
