import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from './ui';

/**
 * HeaderProcedure - Reusable header component for procedure pages
 * Based on the same styling as HeaderRegister but with dashboard button
 * 
 * @param {Object} props - Component props
 * @param {string} [props.title] - Optional title to display (e.g. "License Renewal")
 * @param {string} [props.dashboardLink="/dashboard"] - Link target for the dashboard button
 */
const HeaderProcedure = ({ title, dashboardLink = "/dashboard" }) => {
  return (
    <>
      <header 
        className="fixed top-0 left-0 right-0 w-full z-50 transition-all duration-300 bg-white shadow-sm"
      >
        <div className="flex justify-between items-center px-4 py-2 md:py-3 md:px-6 max-w-7xl mx-auto">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <img src="/img/Mesa2.png" alt="Logo" className="w-32 md:w-39" />
            </Link>
            
            {title && (
              <div className="ml-4 md:ml-6 pl-4 md:pl-6 border-l border-gray-300">
                <h1 className="text-sm md:text-base font-medium text-gray-700">{title}</h1>
              </div>
            )}
          </div>

          {/* Desktop Navigation - Dashboard button */}
          <nav className="hidden md:flex items-center">
            <Link
              to={dashboardLink}
              className="border border-[#157a3c] text-[#157a3c] hover:bg-[#157a3c] hover:text-white px-5 py-2 rounded-full text-sm font-medium transition-colors"
            >
              Mi panel
            </Link>
          </nav>

          {/* Mobile Navigation */}
          <nav className="md:hidden flex items-center">
            <Link
              to={dashboardLink}
              className="border border-[#157a3c] text-[#157a3c] hover:bg-[#157a3c] hover:text-white px-4 py-1.5 rounded-full text-sm font-medium transition-colors"
            >
              Mi panel
            </Link>
          </nav>
        </div>
      </header>

      {/* Spacer to prevent content from hiding behind fixed header */}
      <div className="h-[60px] md:h-[72px]"></div>
    </>
  );
};

export default HeaderProcedure; 