import React from 'react';
import { type Book } from '../types/vector-books';
import { type CardComponent, type CardProps } from '@yext/search-ui-react';

const SegmentCard: CardComponent<Book> = ({ result }: CardProps<Book>) => {
  return (
    <div
      key={result.rawData.uid}
      className="mb-4 justify-between rounded-lg border bg-zinc-100 p-4 text-stone-900 shadow-sm flex flex-col gap-4"
    >
      <div>{result.index}</div>
      <div className="font-bold">{result.rawData.name}</div>
      <div>{result.segment.text}</div>
      <div className="italic self-end">Score: {result.segment.score}</div>
    </div>
  );
};

export default SegmentCard;
