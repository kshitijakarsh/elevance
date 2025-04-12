import React, { useState } from "react";
import { Home, Briefcase, Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.svg";

const Header = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="w-full bg-black shadow-md px-8 py-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-3">
          <img src={logo} alt="Logo" className="h-8 w-8 object-contain" />
          <span className="text-xl font-special text-white">Elevance</span>
        </Link>

        <ul className="hidden md:flex items-center space-x-10">
          <li>
            <Link
              to="/"
              className="flex items-center text-[#EBEBBA] hover:text-white transition-colors duration-200 space-x-2"
            >
              <Home size={20} />
              <span className="text-sm font-special">Home</span>
            </Link>
          </li>

          <li>
            <Link
              to="/jobs"
              className="flex items-center text-[#EBEBBA] hover:text-white transition-colors duration-200 space-x-2"
            >
              <Briefcase size={20} />
              <span className="text-sm font-special">Jobs</span>
            </Link>
          </li>
        </ul>

        <div className="md:hidden">
          <button onClick={() => setOpen(!open)} className="text-white">
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden mt-4 px-4 space-y-3 bg-black">
          <Link
            to="/"
            className="block text-[#EBEBBA] hover:text-white transition-colors duration-200"
            onClick={() => setOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/jobs"
            className="block text-[#EBEBBA] hover:text-white transition-colors duration-200"
            onClick={() => setOpen(false)}
          >
            Jobs
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Header;
