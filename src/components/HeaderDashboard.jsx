import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const HeaderDashboard = ({ menuOpen, toggleMenu }) => {
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header 
        className={`fixed top-0 left-0 right-0 w-full z-50 transition-all duration-300 backdrop-blur-sm
          bg-white
          ${hasScrolled ? 'shadow-md bg-opacity-95' : ''}`}
      >
        <div className="flex justify-between items-center px-4 py-2 md:py-3 md:px-6 max-w-7xl mx-auto">
          <div className="flex items-center gap-2">
            {/* Hamburger Menu - Only visible on small screens */}
            <button 
              className="md:hidden flex items-center justify-center p-2 text-gray-700 hover:text-[#0e6631] focus:outline-none"
              onClick={toggleMenu}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={menuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
              </svg>
            </button>
            
            <Link to="/" className="flex items-center">
              <img src="/img/Mesa2.png" alt="Logo" className="w-32 md:w-39" />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="flex items-center">
            <Link
              to="/dashboard/new-procedure"
              className="bg-[#0e6631] text-white hover:bg-[#0a4f25] px-5 py-2 rounded-full text-sm font-medium transition-colors flex items-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              New Procedure
            </Link>
          </nav>
        </div>
      </header>

      {/* Spacer to prevent content from hiding behind fixed header */}
      <div className="h-[60px] md:h-[72px]"></div>
    </>
  );
};

export default HeaderDashboard;