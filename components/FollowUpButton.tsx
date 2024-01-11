import { BsArrowReturnRight } from 'react-icons/bs';
import React from 'react';
import { usePageContext } from '../utils/usePageContext';

const FollowUpButton = () => {
  const { setChatMode } = usePageContext();
  return (
    <button
      onClick={() => setChatMode(true)}
      className="flex items-center gap-2 bg-[#0a3366] text-white rounded-full px-4 py-2 w-fit hover:bg-[#a6bfde] hover:shadow-lg hover:text-[#0a3366] transition ease-in hover:cursor-pointer] mt-2"
    >
      <BsArrowReturnRight className="w-5 h-5" strokeWidth={0.3} />
      <span>Ask a follow up</span>
    </button>
  );
};

export default FollowUpButton;
