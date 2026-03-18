import { useId, type ReactNode } from 'react';
import { Link } from 'react-router';

interface SearchLinkListProps {
  heading?: string;
  searchTerm: string;
  items?: { href?: string; label?: ReactNode }[];
  language?: string;
  pill?: boolean;
}

export const SearchLinkList = ({
  heading,
  searchTerm,
  items,
  language,
  pill,
}: SearchLinkListProps) => {
  const id = useId();
  if (!items || items.length === 0) {
    return null;
  }
  return (
    <section>
      {heading && <h2 id={id}>{heading}</h2>}
      <ul className='pill-container' aria-labelledby={id} lang={language}>
        {items
          .filter((item) => item.label !== undefined && item.href !== undefined)
          .map((item) => (
            <li key={item.href} className={pill ? 'pill' : ''}>
              {item.href ? (
                <Link
                  to={`/diva-output?${searchTerm}=${item.href}`}
                  rel='nofollow'
                >
                  {item.label}
                </Link>
              ) : (
                item.label
              )}
            </li>
          ))}
      </ul>
    </section>
  );
};
