import { href } from 'react-router';
import { withBaseName } from './withBasename';
import type { BFFDataResourceLink } from '@/types/record';

export const createDownloadLinkFromResourceLink = ({
  id,
  name,
}: BFFDataResourceLink) => {
  return withBaseName(href('/binary/:id/:name', { id, name }));
};
