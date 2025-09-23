import { useId, type ReactNode } from 'react';
import { Link } from 'react-router';

interface SearchLinkListProps {
  heading: string;
  searchTerm: string;
  links: { value: string; label: ReactNode }[];
  language?: string;
  pill?: boolean;
}

export const SearchLinkList = ({
  heading,
  searchTerm,
  links,
  language,
  pill,
}: SearchLinkListProps) => {
  const id = useId();
  return (
    <div>
      <h2 id={id}>{heading}</h2>
      <ul className='pill-container' aria-labelledby={id} lang={language}>
        {links.map((link) => (
          <li key={link.value} className={pill ? 'pill' : ''}>
            <Link
              to={`/diva-output?search.include.includePart.${searchTerm}.value=${link.value}&search.rows.value=10`}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
