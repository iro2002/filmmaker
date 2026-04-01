import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="fixed top-0 w-full z-50 text-white bg-transparent">
      {/* Main Nav Container: 
        Handles the padding and the flex layout for desktop, 
        and acts as the top bar for mobile. 
      */}
      <div className="flex justify-between items-center p-4 md:p-6 md:px-12 w-full bg-black/80 md:bg-transparent backdrop-blur-sm md:backdrop-blur-none transition-all">

        {/* Left: Name leading to Home page */}
        <div className="flex-1 flex justify-start items-center">
          <Link
            to="/"
            className="text-base font-medium hover:text-zinc-300 transition-colors whitespace-nowrap"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Manthila Balasuriya
          </Link>
        </div>

        {/* Mobile Hamburger Button (Visible only on mobile) */}
        <div className="md:hidden flex items-center">
          <button
            onClick={toggleMenu}
            className="focus:outline-none p-2 hover:text-zinc-300 transition-colors"
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {isMobileMenuOpen ? (
                // "X" Close icon
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                // Hamburger icon
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Center: Directing & Producing pages (Hidden on Mobile, Visible on Desktop) */}
        <div className="hidden md:flex flex-1 justify-center gap-12 items-center text-base">
          <Link
            to="/directing"
            className="hover:text-zinc-300 transition-colors"
          >
            Directing
          </Link>
          <Link
            to="/commercial-producing"
            className="hover:text-zinc-300 transition-colors"
          >
            Producing
          </Link>
        </div>

        {/* Right: Leads to Contact Section (Hidden on Mobile, Visible on Desktop) */}
        <div className="hidden md:flex flex-1 justify-end items-center">
          <a
            href="#contact"
            className="px-6 py-2 bg-white text-black rounded-full text-sm font-bold hover:bg-zinc-200 transition-colors whitespace-nowrap"
          >
            Book a call
          </a>
        </div>
      </div>

      {/* Mobile Menu Dropdown (Visible only when open on Mobile) */}
      <div
        className={`md:hidden flex flex-col items-center justify-center bg-black/95 backdrop-blur-md w-full overflow-hidden transition-all duration-300 ease-in-out ${isMobileMenuOpen ? "max-h-64 py-6 border-b border-zinc-800" : "max-h-0"
          }`}
      >
        <Link
          to="/directing"
          className="py-3 hover:text-zinc-300 transition-colors text-lg"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          Directing
        </Link>
        <Link
          to="/commercial-producing"
          className="py-3 hover:text-zinc-300 transition-colors text-lg"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          Producing
        </Link>
        <a
          href="#contact"
          className="mt-4 px-8 py-3 bg-white text-black rounded-full text-sm font-bold hover:bg-zinc-200 transition-colors"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          Book a call
        </a>
      </div>
    </nav>
  );
}