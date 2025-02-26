import React, { useState } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom'; // ✅ Import useNavigate
import { useAuth } from '../../../hooks/auth.hook';

const Navbar = () => {
  const [openMobileMenu, setOpenMobileMenu] = useState(false);
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate(); // ✅ Initialize navigate

  const toggleMobileMenu = () => {
    setOpenMobileMenu(!openMobileMenu);
  };

  const handleLogout = () => {
    logout(); // ✅ Call logout function
    navigate('/'); // ✅ Redirect to home after logout
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
        <button type='button' onClick={toggleMobileMenu} className="md:hidden p-2 rounded text-gray-600">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6H20M4 10H20M4 14H20M4 18H20" />
          </svg> menu
        </button>

        {/* Mobile Navigation */}
        <div className={`md:hidden transition-all duration-300 ease-in-out ${openMobileMenu ? 'absolute top-full' : 'hidden'}`}>
          <div className="mt-4 backdrop-blur-3xl bg-sky-100 rounded-xl flex flex-col gap-4 p-6">
            {navLinks.map((link) => (
              <NavLink key={link.path} to={link.path} className={({ isActive }) => isActive ? "text-blue-900" : ""}>
                {link.label}
              </NavLink>
            ))}
            {/* Mobile Auth Links */}
            {isAuthenticated ? (<NavLink key={'/dashboard'} to={'/dashboard'} className={({ isActive }) => isActive ? "text-blue-900" : ""}>
                {'dashboard'}
              </NavLink>) : null
            }
            {isAuthenticated ? (
              <button onClick={handleLogout} className="text-red-500">Logout</button>
            ) : (
              <>
                <Link to="/login" className="text-blue-600">Login</Link>
                <Link to="/register" className="text-blue-600">Register</Link>
              </>
            )}
          </div>
        </div>

        {/* Logo */}
        <a href="#/" className="text-2xl font-semibold text-gray-800">
          PaaS <span className='max-sm:hidden align-sub text-sm'>Deployment Simplified</span>
        </a>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-6">
          {navLinks.map((link) => (
            <NavLink key={link.path} to={link.path} className={({ isActive }) => isActive ? "text-blue-900" : ""}>
              {link.label}
            </NavLink>
          ))}

          {isAuthenticated ? (<NavLink key={'/dashboard'} to={'/dashboard'} className={({ isActive }) => isActive ? "text-blue-900" : ""}>
                {'Dashboard'}
              </NavLink>) : null
            }

          {/* Desktop Auth Links */}
          {isAuthenticated ? (
            <button onClick={handleLogout} className='px-3 h-fit w-fit shadow-lg shadow-slate-500 text-white rounded-2xl bg-gradient-to-tr from-red-500 to-orange-400'>
              Logout
            </button>
          ) : (
            <>
              <Link to="/login" className='px-3 h-fit w-fit shadow-lg shadow-slate-500 text-white rounded-2xl bg-gradient-to-tr from-red-500 to-orange-400'>
                Login
              </Link>
              <Link to="/register" className='px-3 h-fit w-fit shadow-lg shadow-slate-500 text-white rounded-2xl bg-gradient-to-tr from-blue-500 to-teal-400'>
                Register
              </Link>
            </>
          )}
        </div>

      </div>
    </nav>
  );
};

export default Navbar;
