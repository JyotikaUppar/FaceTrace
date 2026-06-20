import React, { useState } from 'react';
import applogo from "./applogo.png";
import { Link, NavLink as RouterNavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

// Custom NavLink with active state and hover effects
const NavLink = ({ to, href, children }) => {
  const baseClass = "relative text-[26px] font-bold transition-all duration-200 px-3 py-1";
  
  if (href) {
    return (
      <motion.a 
        href={href}
        whileHover={{ y: -1 }}
        className={`${baseClass} text-slate-500 hover:text-indigo-600`}
      >
        {children}
      </motion.a>
    );
  }

  return (
    <RouterNavLink 
      to={to}
      className={({ isActive }) => 
        `${baseClass} ${isActive ? "text-indigo-600 font-extrabold" : "text-slate-500 hover:text-indigo-600"}`
      }
    >
      {({ isActive }) => (
        <span className="relative">
          {children}
          {isActive && (
            <motion.div 
              layoutId="nav-underline"
              className="absolute -bottom-2.5 left-0 right-0 h-1 bg-indigo-600 rounded-full"
            />
          )}
        </span>
      )}
    </RouterNavLink>
  );
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 w-full glass border-b border-slate-200/50">
      <div className="w-full px-10 lg:px-20 h-32 flex items-center justify-between">
        
        {/* LOGO */}
        <Link to="/" className="flex items-center gap-5 group">
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="w-14 h-14 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-xl shadow-indigo-100"
          >
            <img src={applogo} alt="FaceTrace Logo" className="w-8 h-8 invert brightness-0" />
          </motion.div>
          <span className="text-4xl font-black tracking-tighter text-slate-900">
            FaceTrace
          </span>
        </Link>

        {/* DESKTOP NAV */}
        <div className="hidden lg:flex items-center gap-16">
          <div className="flex items-center gap-14 mr-10">
            <NavLink to="/">Home</NavLink>
            <NavLink href="http://localhost:8501/">Surveillance</NavLink>
            <NavLink to="/Missingpeople">Missing List</NavLink>
            <NavLink to="/locations">Locations</NavLink>
          </div>
          
          <Link to="/Formmissing">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-10 py-5 bg-indigo-600 text-white text-[22px] font-black rounded-2xl shadow-2xl hover:bg-indigo-700 transition-all border-b-4 border-indigo-800 active:border-b-0"
            >
              Report Case
            </motion.button>
          </Link>
        </div>

        {/* MOBILE TOGGLE */}
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden p-3 text-slate-500 hover:text-indigo-600 transition-colors"
        >
          {isOpen ? (
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
          ) : (
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" /></svg>
          )}
        </button>
      </div>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="lg:hidden absolute top-32 left-0 w-full bg-white border-b border-slate-100 shadow-2xl overflow-hidden"
          >
            <div className="px-12 py-16 flex flex-col gap-10 text-center">
              <Link to="/" onClick={() => setIsOpen(false)} className="text-3xl font-black text-slate-700">Home</Link>
              <a href="http://localhost:8501/" onClick={() => setIsOpen(false)} className="text-3xl font-black text-slate-700">Surveillance</a>
              <Link to="/Missingpeople" onClick={() => setIsOpen(false)} className="text-3xl font-black text-slate-700">Missing List</Link>
              <Link to="/locations" onClick={() => setIsOpen(false)} className="text-3xl font-black text-slate-700">Locations</Link>
              <Link to="/Formmissing" onClick={() => setIsOpen(false)} className="pt-8">
                <button className="w-full py-7 bg-indigo-600 text-white font-black rounded-2xl text-2xl shadow-xl">
                  Report Case
                </button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;