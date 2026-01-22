import type { ActiveFilter } from './ActiveFilters';

interface SearchHiddenInputsProps {
  query?: string;
  rows?: number;
  start?: number;
  activeFilters?: ActiveFilter[];
}

export const SearchHiddenInputs = ({
  query,
  rows,
  start,
  activeFilters,
}: SearchHiddenInputsProps) => {
  return (
    <>
      {query && <input type='hidden' name='q' value={query} />}
      {start && <input type='hidden' name='start' value={start} />}
      {rows && <input type='hidden' name='rows' value={rows} />}
      {activeFilters?.map((filter) => (
        <input
          key={filter.name}
          type='hidden'
          name={filter.name}
          value={filter.value}
        />
      ))}
    </>
  );
};
