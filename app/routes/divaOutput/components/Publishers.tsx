import type { NameOrganisationPublisherGroup } from '@/generatedTypes/divaTypes';
import { DataText } from './DataText';
import { Publisher } from './Publisher';

interface PublishersProps {
  publishers?: NameOrganisationPublisherGroup[];
}

export const Publishers = ({ publishers }: PublishersProps) => {
  if (!publishers || publishers.length === 0) {
    return null;
  }

  return (
    <>
      <dt>
        <DataText data={publishers} />
      </dt>
      {publishers.map((publisher, index) => (
        <dd key={index} className='block'>
          <Publisher publisher={publisher} />
        </dd>
      ))}
    </>
  );
};
