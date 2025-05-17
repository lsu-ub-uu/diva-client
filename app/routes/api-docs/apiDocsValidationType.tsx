import type {
  BFFMetadata,
  BFFMetadataChildReference,
  BFFMetadataCollectionVariable,
  BFFMetadataGroup,
  BFFMetadataItemCollection,
  BFFMetadataRecordLink,
  BFFMetadataTextVariable,
} from '@/cora/transform/bffTypes.server';
import type { Route } from './+types/apiDocsValidationType';
import { ValidationType } from './components/ValidationTypeDoc';
import { useRouteLoaderData } from 'react-router';

export async function loader({ params, context }: Route.LoaderArgs) {
  const dependencies = await context.dependencies;
  const validationType = dependencies.validationTypePool.get(
    params.validationType,
  );

  return {
    validationType,
    breadcrumb: validationType.id,
  };
}

export default function ValidationTypeRoute({
  loaderData,
}: Route.ComponentProps) {
  const { validationType } = loaderData;

  return <ValidationType validationType={validationType} />;
}
