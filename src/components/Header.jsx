import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);

  const navItems = [
    { to: '/', text: 'Inicio' },
    { to: '/servicios', text: 'Servicios disponibles' },
    { to: '/como-funciona', text: 'Cómo funciona?' },
    { to: '/contactenos', text: 'Contáctenos' },
    { to: '/Register', text: 'Registrarse' },
  ];

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
          bg-[#157a3c]
          ${hasScrolled ? 'shadow-md bg-opacity-95' : ''}`}
      >
        <div className="flex justify-between items-center px-4 py-2 md:py-3 md:px-6 max-w-7xl mx-auto">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <img src="/img/Mesa.png" alt="Logo" className="w-32 md:w-39" />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item, index) => (
              <Link
                key={index}
                to={item.to}
                className="text-white hover:text-gray-200 text-sm font-medium"
              >
                {item.text}
              </Link>
            ))}
            <Link
              to="/Login"
              className="border border-white text-white hover:bg-white hover:text-[#157a3c] px-5 py-2 rounded-full text-sm font-medium transition-colors"
            >
              Ingresar
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden focus:outline-none p-2 text-white"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden ${isMobileMenuOpen ? '' : 'hidden'}`}>
          <nav className="flex flex-col py-4 px-4 bg-[#0e6631] border-t border-[#2a8951]">
            {navItems.map((item, index) => (
              <Link
                key={index}
                to={item.to}
                className="text-white hover:text-gray-200 font-medium py-3 px-2 border-b border-[#2a8951] text-center last:border-none"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.text}
              </Link>
            ))}
            <Link
              to="/ingresar"
              className="text-white hover:text-gray-200 font-medium py-3 px-2 text-center"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Ingresar
            </Link>
          </nav>
        </div>
      </header>

      {/* Spacer to prevent content from hiding behind fixed header */}
      <div className="h-[60px] md:h-[72px]"></div>
    </>
  );
};

export default Header;