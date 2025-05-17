import type { BFFMetadata } from '@/cora/transform/bffTypes.server';
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react';
import { useTranslation } from 'react-i18next';

interface NameInDataProps {
  metadata: BFFMetadata;
}

export const NameInData = ({ metadata }: NameInDataProps) => {
  const { t } = useTranslation();
  return (
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
  );
};
