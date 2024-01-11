import React from 'react';
import SearchResultMotive from './SearchResultMotive';

const SearchResultsMotive = ({ results }) => {
  return (
    <section className="flex flex-col">
      {results.map((result) => {
        return (
          <SearchResultMotive
            key={`${result.id}-${result.index}`}
            result={result}
          />
        );
      })}
    </section>
  );
};

export default SearchResultsMotive;
