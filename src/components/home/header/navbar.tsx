import React, { useState } from 'react';
import { NavLink } from 'react-router';

const Navbar = () => {
  const [openMobileMenu, setOpenMobileMenu] = useState(false);

  const toggleMobileMenu = () => {
    setOpenMobileMenu(!openMobileMenu);
  };

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Domain', path: '/domain' },
    { label: 'Hosting', path: '/hosting' },
    { label: 'Pricing', path: '/pricing' },
    { label: 'Contacts', path: '/contacts' },
  ];

  return (
    <nav className="bg-white shadow-md font-sans sticky top-0 z-10">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center max-w-screen-lg">

        {/* Mobile Menu Toggle */}
        <button type='submit' onClick={toggleMobileMenu} className="md:hidden p-2 rounded text-gray-600">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6H20M4 10H20M4 14H20M4 18H20" />
          </svg>menu
        </button>

        {/* Mobile Navigation */}
        <div className={`md:hidden transition-all duration-300 ease-in-out ${openMobileMenu ? 'absolute top-full' : 'hidden'}`}>
          <div className="mt-4 backdrop-blur-3xl bg-sky-100 rounded-xl flex flex-col gap-4 p-6">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  isActive ? "text-blue-900" : ""
                }
              >
                {link.label}
              </NavLink>
            ))}
          </div>
        </div>

        {/* Logo */}
        <a href="#/" className="text-2xl font-semibold text-gray-800">
          PaaS <span className='max-sm:hidden align-sub text-sm'>Deployment Simplified</span>
        </a>

        {/* Login button for mobile view */}
        <a href='/login' className='md:hidden block px-3 h-fit w-fit border-2 border-slate-200 shadow-slate-500 text-white rounded-2xl bg-gradient-to-tr from-red-500 to-orange-400 justify-self-center'>Login</a>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-6">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                isActive ? "text-blue-900" : ""
              }
            >
              {link.label}
            </NavLink>
          ))}

          {/* Login button for desktop view */}
          <a href='/login' className='mx-auto block px-3 h-fit w-fit shadow-lg shadow-slate-500 text-white rounded-2xl bg-gradient-to-tr from-red-500 to-orange-400 justify-self-center'>Login</a>

        </div>

      </div>
    </nav>
  );
};

export default Navbar;