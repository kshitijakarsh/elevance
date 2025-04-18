import React, { useState, useEffect } from "react";
import { Home, Briefcase, Menu, X } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import logo from "../assets/logo.svg";

const Header = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path) => location.pathname === path;

  const handleInterviewClick = () => {
    const resume = localStorage.getItem("resumeText");

    if (!resume) {
      toast.error("Please upload your resume first!", {
        style: {
          background: "#000000",
          color: "white",
          borderRadius: "10px",
          border: "1px solid #374151",
        },
      });
      return;
    }

    navigate("/interview");
    setOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
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
          <img src={logo} alt="Logo" className="h-10 w-10 object-contain relative z-10" />
          <span className="text-xl font-special text-[#EBEBBA]">Elevance</span>
        </Link>

        {/* Desktop Nav */}
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

          <li>
            <button
              onClick={handleInterviewClick}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                isActive("/interviews")
                  ? "text-black bg-[#EBEBBA]/90 shadow-lg"
                  : "text-[#EBEBBA] hover:bg-white/10 backdrop-filter hover:backdrop-blur-lg"
              }`}
            >
              <Briefcase size={18} />
              <span className="text-sm font-special">Interviews</span>
            </button>
          </li>
        </ul>

        {/* Mobile Toggle */}
        <div className="md:hidden">
          <button
            onClick={() => setOpen(!open)}
            className={`p-2 rounded-full transition-all duration-300 ${
              open ? "bg-[#EBEBBA]/20 backdrop-blur-sm" : "text-[#EBEBBA]"
            }`}
          >
            {open ? (
              <X size={24} className="text-[#EBEBBA]" />
            ) : (
              <Menu size={24} />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
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

            <button
              onClick={handleInterviewClick}
              className={`flex items-center space-x-2 px-4 py-3 rounded-lg transition-all duration-300 ${
                isActive("/interview")
                  ? "text-black bg-[#EBEBBA]/90"
                  : "text-[#EBEBBA] hover:bg-white/10"
              }`}
            >
              <Briefcase size={18} />
              <span className="font-special">Interview</span>
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Header;
