import type {
  BFFMetadata,
  BFFMetadataChildReference,
} from '@/cora/transform/bffTypes.server';
import { useState, type ReactNode } from 'react';
import { AttributesDoc } from './AttributesDoc';
import {
  CloseButton,
  Popover,
  PopoverButton,
  PopoverPanel,
} from '@headlessui/react';
import { useTranslation } from 'react-i18next';
import { CloseIcon } from '@/icons';

interface ElementProps {
  children?: ReactNode;
  metadata: BFFMetadata;
  childRef: BFFMetadataChildReference;
}

export const Element = ({ children, metadata, childRef }: ElementProps) => {
  const [expanded, setExpanded] = useState(true);
  const { t } = useTranslation();

  const finalValue = 'finalValue' in metadata ? metadata.finalValue : undefined;

  if (!expanded) {
    return (
      <div className='element'>
        <button
          onClick={() => setExpanded(true)}
          className='element-expand-button'
        >
          +
        </button>
        &lt;{metadata.nameInData} ... /&gt;&nbsp;
        <span style={{ color: 'hotpink' }}>
          ({childRef.repeatMin} - {childRef.repeatMax})
        </span>
      </div>
    );
  }

  return (
    <div className='element'>
      <div>
        <button
          onClick={() => setExpanded(false)}
          className='element-expand-button'
        >
          -
        </button>
        &lt;
        <Popover style={{ display: 'inline-block' }}>
          <PopoverButton className='element-popover-button'>
            {metadata.nameInData}
          </PopoverButton>
          <PopoverPanel
            anchor='top'
            role='definition'
            className='element-popover-panel'
          >
            <h4>{t(metadata.textId)}</h4>
            <p>{t(metadata.defTextId)}</p>
          </PopoverPanel>
        </Popover>
        {'attributeReferences' in metadata && (
          <AttributesDoc attributeReferences={metadata.attributeReferences} />
        )}
        &gt;&nbsp;
        <span style={{ color: 'hotpink' }}>
          ({childRef.repeatMin} - {childRef.repeatMax})
        </span>
      </div>
      <div style={{ paddingLeft: '1rem' }}>
        {finalValue ? (
          <span style={{ color: 'darkorange' }}>{finalValue}</span>
        ) : (
          children
        )}
      </div>
      <div>&lt;/{metadata.nameInData}&gt;</div>
    </div>
  );
};
