import { useId, type ReactNode } from 'react';
import { Link } from 'react-router';

interface SearchLinkListProps {
  heading: string;
  searchTerm: string;
  items: { href?: string; label: ReactNode }[];
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
  return (
    <div>
      <h2 id={id}>{heading}</h2>
      <ul className='pill-container' aria-labelledby={id} lang={language}>
        {items.map((item) => (
          <li key={item.href} className={pill ? 'pill' : ''}>
            {item.href ? (
              <Link
                to={`/diva-output?search.include.includePart.${searchTerm}.value=${item.href}&search.rows.value=10`}
              >
                {item.label}
              </Link>
            ) : (
              item.label
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};
