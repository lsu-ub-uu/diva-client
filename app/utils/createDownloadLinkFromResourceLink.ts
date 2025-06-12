import { href } from 'react-router';
import { withBaseName } from './withBasename';

export const createDownloadLinkFromResourceLink = (resourceLink: {
  id: string;
  name: string;
}) => {
  return withBaseName(
    href('/binary/:id/:name', {
      id: resourceLink.id,
      name: resourceLink.name,
    }),
  );
};
