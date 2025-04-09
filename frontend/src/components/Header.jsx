import React from 'react';
import { Home, User } from 'lucide-react';

const Header = () => {
  return (
    <nav className="w-full bg-white shadow-md px-8 py-4">
      <ul className="flex justify-center items-center space-x-10">
        <li>
          <a href="/" className="flex items-center text-gray-700 hover:text-black transition-colors space-x-2">
            <Home size={20} />
            <span className="text-sm font-medium">Jobs</span>
          </a>
        </li>
        <li>
          <a href="/interview" className="flex items-center text-gray-700 hover:text-black transition-colors space-x-2">
            <User size={20} />
            <span className="text-sm font-medium">Interview</span>
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Header;
