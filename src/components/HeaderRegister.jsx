import React from 'react';
import { Link } from 'react-router-dom';

const HeaderRegister = () => {
  return (
    <>
      <header 
        className="fixed top-0 left-0 right-0 w-full z-50 transition-all duration-300 bg-white"
      >
        <div className="flex justify-between items-center px-4 py-2 md:py-3 md:px-6 max-w-7xl mx-auto">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <img src="/img/Mesa2.png" alt="Logo" className="w-32 md:w-39" />
            </Link>
          </div>

          {/* Desktop Navigation - Only Register and Login buttons */}
          <nav className="hidden md:flex items-center gap-4">
            <Link
              to="/Register"
              className="text-[#157a3c] hover:text-[#0e6631] text-sm font-medium"
            >
              Registrarse
            </Link>
            <Link
              to="/Login"
              className="border border-[#157a3c] text-[#157a3c] hover:bg-[#157a3c] hover:text-white px-5 py-2 rounded-full text-sm font-medium transition-colors"
            >
              Ingresar
            </Link>
          </nav>

          {/* Mobile Navigation - Simplified for register/login pages */}
          <nav className="md:hidden flex items-center gap-4">
            <Link
              to="/Register"
              className="text-[#157a3c] hover:text-[#0e6631] text-sm font-medium"
            >
              Registrarse
            </Link>
            <Link
              to="/Login"
              className="border border-[#157a3c] text-[#157a3c] hover:bg-[#157a3c] hover:text-white px-4 py-1.5 rounded-full text-sm font-medium transition-colors"
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

export default HeaderRegister;