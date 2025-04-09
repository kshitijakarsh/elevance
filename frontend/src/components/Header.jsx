import React from 'react';
import { Home, User } from 'lucide-react';
import logo from "../assets/logo.svg";

const Header = () => {
  return (
    <nav className="w-full bg-black shadow-md px-8 py-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        
        <div className="flex items-center space-x-3">
          <img src={logo} alt="Logo" className="h-8 w-8 object-contain" />
          <span className="text-xl font-semibold text-white">Elevance</span>
        </div>

        <ul className="flex items-center space-x-10">
          <li>
            <a
              href="/"
              className="flex items-center text-gray-300 hover:text-purple-400 transition-colors duration-200 space-x-2"
            >
              <Home size={20} />
              <span className="text-sm font-medium">Jobs</span>
            </a>
          </li>
          <li>
            <a
              href="/interview"
              className="flex items-center text-gray-300 hover:text-purple-400 transition-colors duration-200 space-x-2"
            >
              <User size={20} />
              <span className="text-sm font-medium">Interview</span>
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Header;
