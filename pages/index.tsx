import React from 'react';
import { usePageContext } from '../utils/usePageContext';
import Link from 'next/link';

const Index = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen gap-4">
      <div className="text-3xl mb-10 text-[#0a3366]">Select an experience:</div>
      <Link href="/harrypotter">
        <div className="border rounded-lg py-3 w-96 text-center text-xl shadow text-[#0a3366] hover:bg-[#0a3366] hover:text-white transition ease-linear cursor-pointer">
          {' '}
          Harry Potter
        </div>
      </Link>
      <Link href="/hitchhikers">
        <div className="border rounded-lg py-3 w-96 text-center text-xl shadow text-[#0a3366] hover:bg-[#0a3366] hover:text-white transition ease-linear cursor-pointer">
          {' '}
          Hitchhikers
        </div>
      </Link>

      <Link href="/motive">
        <div className="border rounded-lg py-3 w-96 text-center text-xl shadow text-[#0a3366] hover:bg-[#0a3366] hover:text-white transition ease-linear cursor-pointer">
          {' '}
          Motive
        </div>
      </Link>
    </div>
  );
};

export default Index;
