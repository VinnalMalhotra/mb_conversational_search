import { ArrowUpIcon } from '@heroicons/react/24/outline';
import React, { useState, useEffect } from 'react';
import { usePageContext } from '../utils/usePageContext';

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { setSelectedCitation } = usePageContext();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
    setSelectedCitation(null);
  };

  return (
    <div
      className={`fixed bottom-4 right-4 transition-opacity duration-300 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <button
        className="border rounded-full p-2 focus:outline-none hover:shadow-md focus:shadow-outline"
        onClick={scrollToTop}
      >
        <ArrowUpIcon className="w-5 h-5" />
      </button>
    </div>
  );
};

export default ScrollToTopButton;
