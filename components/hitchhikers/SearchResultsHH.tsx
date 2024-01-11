import React from 'react';
import SearchResultHH from './SearchResultHH';

const SearchResultsHH = ({ results }) => {
  return (
    <section className="flex flex-col">
      {results.map((result) => {
        return (
          <SearchResultHH
            key={`${result.id}-${result.index}`}
            result={result}
          />
        );
      })}
    </section>
  );
};

export default SearchResultsHH;
