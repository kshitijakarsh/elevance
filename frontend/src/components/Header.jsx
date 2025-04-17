import React, { useState, useEffect } from "react";
import { Home, Briefcase, Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import logo from "../assets/logo.svg";

const Header = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path;
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? "backdrop-blur-lg bg-black/70 border-b border-white/10" 
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 lg:px-8 py-4">
        <Link to="/" className="flex items-center space-x-3 group">
          <div className="relative">
            <div></div>
            <img src={logo} alt="Logo" className="h-10 w-10 object-contain relative z-10" />
          </div>
          <span className="text-xl font-special text-[#EBEBBA]">Elevance</span>
        </Link>

        <ul className="hidden md:flex items-center space-x-8">
          <li>
            <Link
              to="/"
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                isActive("/") 
                  ? "text-black bg-[#EBEBBA]/90 shadow-lg" 
                  : "text-[#EBEBBA] hover:bg-white/10 backdrop-filter hover:backdrop-blur-lg"
              }`}
            >
              <Home size={18} />
              <span className="text-sm font-special">Home</span>
            </Link>
          </li>

          <li>
            <Link
              to="/jobs"
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                isActive("/jobs") 
                  ? "text-black bg-[#EBEBBA]/90 shadow-lg" 
                  : "text-[#EBEBBA] hover:bg-white/10 backdrop-filter hover:backdrop-blur-lg"
              }`}
            >
              <Briefcase size={18} />
              <span className="text-sm font-special">Jobs</span>
            </Link>
          </li>
        </ul>

        <div className="md:hidden">
          <button 
            onClick={() => setOpen(!open)} 
            className={`p-2 rounded-full transition-all duration-300 ${
              open ? "bg-[#EBEBBA]/20 backdrop-blur-sm" : "text-[#EBEBBA]"
            }`}
          >
            {open ? <X size={24} className="text-[#EBEBBA]" /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden backdrop-filter backdrop-blur-lg bg-black/70 border-t border-white/10 animate-fadeIn">
          <div className="max-w-7xl mx-auto py-4 px-6 space-y-3">
            <Link
              to="/"
              className={`flex items-center space-x-2 px-4 py-3 rounded-lg transition-all duration-300 ${
                isActive("/") 
                  ? "text-black bg-[#EBEBBA]/90" 
                  : "text-[#EBEBBA] hover:bg-white/10"
              }`}
              onClick={() => setOpen(false)}
            >
              <Home size={18} />
              <span className="font-special">Home</span>
            </Link>
            
            <Link
              to="/jobs"
              className={`flex items-center space-x-2 px-4 py-3 rounded-lg transition-all duration-300 ${
                isActive("/jobs") 
                  ? "text-black bg-[#EBEBBA]/90" 
                  : "text-[#EBEBBA] hover:bg-white/10"
              }`}
              onClick={() => setOpen(false)}
            >
              <Briefcase size={18} />
              <span className="font-special">Jobs</span>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Header;