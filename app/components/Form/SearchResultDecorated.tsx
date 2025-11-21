import type { BFFDataRecord } from '@/types/record';

interface SearchResultDecoratedProps {
  searchResult: BFFDataRecord;
}
export const SearchResultDecorated = ({
  searchResult,
}: SearchResultDecoratedProps) => {
  const data = searchResult.data.output;
  return (
    <div>
      <p>{data.titleInfo.title.value}</p>
      <p>{data.originInfo.dateIssued.year.value}</p>
      {JSON.stringify(data, null, 2)}
    </div>
  );
};
