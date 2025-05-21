import React from 'react';
import { BellIcon } from '@heroicons/react/24/outline';

const Header = ({ name }) => {
  const initials = name
    .split(' ')
    .map((word) => word[0])
    .join('')
    .toUpperCase();

  return (
    <header className="flex items-center justify-between px-6 py-4 w-full shadow-md bg-white/80 backdrop-blur-md">
      <h1 className="text-2xl font-bold text-indigo-600">EduVerse | Teacher Dashboard</h1>
      <div className="flex items-center space-x-4">
        <BellIcon className="h-6 w-6 text-gray-600" />
        <span className="text-gray-800 font-medium">{name}</span>
        <div className="bg-amber-900 text-white w-10 h-10 flex items-center justify-center rounded-full font-semibold">
          {initials}
        </div>
      </div>
    </header>
  );
};

export default Header;
