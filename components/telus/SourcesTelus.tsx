import React from 'react';
import { FaFilePdf } from 'react-icons/fa6';

const SourcesTelus = ({ sources }) => {
  const uniqueSources = sources.reduce((accumulator, current) => {
    if (!accumulator.find((item) => item.id == current.id)) {
      accumulator.push(current);
    }
    return accumulator;
  }, []);
  return (
    <section className="flex gap-2 flex-wrap">
      {uniqueSources.map((source, i) => {
        return (
          <a
            key={i}
            href={source.rawData?.c_file?.url || source.rawData?.landingPageUrl}
            target="_blank"
          >
            <div
              key={i}
              className="bg-white rounded-md p-2 w-48 flex gap-2 hover:bg-[#0a3366] hover:text-white hover:cursor-pointer text-[#0a3366] transition ease-linear"
            >
              <FaFilePdf className="w-8 h-8" />
              <p className="text-sm text-semibold line-clamp-2">
                {source.rawData.name}
              </p>
            </div>
          </a>
        );
      })}
    </section>
  );
};

export default SourcesTelus;
