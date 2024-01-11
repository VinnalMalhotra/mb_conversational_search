import React from 'react';
import { usePageContext } from '../../utils/usePageContext';
import { cn } from '../../utils/cn';
import { motion } from 'framer-motion';

const SearchResult = ({ result }) => {
  const { selectedCitation } = usePageContext();

  return (
    <div
      className="border-b border-gray-300 py-8 text-stone-900 flex scroll-mt-6"
      id={result.index}
    >
      {selectedCitation === `${result.index}` && (
        <motion.div
          initial={{ padding: '0px' }}
          animate={{ padding: '2px' }}
          exit={{ padding: '0px' }}
          className={cn('h-full bg-[#0a3366] mr-4 rounded-sm p-[2px]')}
        ></motion.div>
      )}
      <motion.div layout>
        <p className="mb-2 font-light italic">
          <span className="font-semibold not-italic">Segment: </span>
          {result.segment.text}
        </p>
        <div className="flex gap-1">
          <p className="font-semibold">Source:</p>
          <a
            className="hover:cursor-pointer hover:underline w-fit text-blue-600"
            href={result.rawData.c_file.url}
          >
            <div>{result.rawData.name}</div>
          </a>
        </div>
        <div className="flex gap-1">
          <p className="font-semibold">Relevance Score:</p>
          <p className="font-light">{result.segment.score}</p>
        </div>
      </motion.div>
    </div>
  );
};

export default SearchResult;
