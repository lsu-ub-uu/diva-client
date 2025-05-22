import type {
  BFFMetadataChildReference,
  BFFMetadataRecordLink,
} from '@/cora/transform/bffTypes.server';
import { Element } from './Element';

export function RecordLinkDoc({
  metadata,
  childRef,
}: {
  metadata: BFFMetadataRecordLink;
  childRef: BFFMetadataChildReference;
}) {
  return (
    <Element metadata={metadata} childRef={childRef}>
      <div>
        &lt;linkedRecordType&gt;
        <span className='final-value'>{metadata.linkedRecordType}</span>
        &lt;/linkedRecordType&gt;
      </div>
      <div>
        &lt;linkedRecordId&gt;
        <span className='final-value'>{metadata.finalValue ?? ''}</span>
        &lt;/linkedRecordId&gt;
      </div>
    </Element>
  );
}
