import { useEffect, useState } from 'react';
import { BookOpenIcon, DocumentTextIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { BsWifi } from 'react-icons/bs';
import { cn } from '../utils/cn';

export default function Layout({ children }) {
  const experiences = [
    {
      name: 'Harry Potter',
      link: '/harrypotter',
      icon: BookOpenIcon,
    },
    {
      name: 'Hitchhikers',
      link: '/hitchhikers',
      icon: DocumentTextIcon,
    },
    // {
    //   name: 'Telus',
    //   link: '/telus',
    //   icon: BsWifi,
    // },
    {
      name: 'Motive',
      link: '/motive',
      icon: DocumentTextIcon,
    },
  ];
  const [selectedExperience, setSelectedExperience] = useState('');
  useEffect(() => {
    if (window.location.pathname === '/harrypotter') {
      setSelectedExperience('Harry Potter');
    }
    if (window.location.pathname === '/hitchhikers') {
      setSelectedExperience('Hitchhikers');
    }
    if (window.location.pathname === '/motive') {
      setSelectedExperience('Motive');
    }
    if (window.location.pathname === '/telus') {
      setSelectedExperience('Telus');
    }
  }, []);

  return (
    <>
      <div>
        {/* Static sidebar for desktop */}
        <div className="lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-80 lg:flex-col">
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-gray-900 p-6">
            <h1 className="text-white font-semibold text-lg">
              Conversational Search Demo
            </h1>
            <nav className="flex flex-1 flex-col">
              <ul role="list" className="flex flex-1 flex-col gap-y-7">
                <li>
                  <ul role="list" className="-mx-2 space-y-1">
                    {experiences.map((experience, i) => {
                      return (
                        <li key={i}>
                          <Link href={experience.link}>
                            <div
                              className={cn(
                                selectedExperience === experience.name
                                  ? 'bg-gray-800 text-white'
                                  : 'text-gray-400 hover:text-white hover:bg-gray-800',
                                'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold cursor-pointer'
                              )}
                              onClick={() =>
                                setSelectedExperience(experience.name)
                              }
                            >
                              <experience.icon
                                className="h-6 w-6 shrink-0"
                                aria-hidden="true"
                              />
                              {experience.name}
                            </div>
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </li>
              </ul>
            </nav>
          </div>
        </div>

        <main className="lg:pl-72">
          <div className="lg:pl-8">{children}</div>
        </main>
      </div>
    </>
  );
}
