import type {
  BFFMetadataChildReference,
  BFFMetadataTextVariable,
} from '@/cora/transform/bffTypes.server';
import { Element } from './Element';

export function TextVariableDoc({
  metadata,
  childRef,
}: {
  metadata: BFFMetadataTextVariable;
  childRef: BFFMetadataChildReference;
}) {
  return (
    <Element metadata={metadata} childRef={childRef}>
      <span
        style={{
          color: 'Aquamarine',
        }}
      >{`/${metadata.regEx}/`}</span>
    </Element>
  );
}
