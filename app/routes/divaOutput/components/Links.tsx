import type { DivaOutputGroup } from '@/generatedTypes/divaTypes';
import { Location } from './Location';
import { ExternalLinkIcon, ShoppingCartIcon } from '@/icons/icons';
import { Term } from './Term';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '@/i18n/useLanguage';

interface LinkProps {
  output: DivaOutputGroup;
}

export const Links = ({ output }: LinkProps) => {
  const { t } = useTranslation();
  const language = useLanguage();

  const orderLinks = output.location_displayLabel_orderLink;
  const otherLinks = output.location;

  if ((orderLinks?.length ?? 0) === 0 && (otherLinks?.length ?? 0) === 0) {
    return null;
  }

  return (
    <>
      <h2>{t('divaClient_outputLinksText')}</h2>
      <dl>
        {orderLinks && (
          <Term
            label={orderLinks?.[0]?.__text?.[language]}
            value={orderLinks?.map((location, index) => (
              <Location
                key={index}
                location={location}
                icon={<ShoppingCartIcon />}
              />
            ))}
            variant='block'
          />
        )}
        {otherLinks && (
          <Term
            label={otherLinks?.[0]?.__text?.[language]}
            value={otherLinks?.map((location, index) => (
              <Location
                key={index}
                location={location}
                icon={<ExternalLinkIcon />}
              />
            ))}
            variant='block'
          />
        )}
      </dl>
    </>
  );
};
