import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Prevent scrolling when menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isMobileMenuOpen]);

  const toggleMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="fixed top-0 w-full z-50 text-white bg-transparent">
      {/* Main Nav Container: 
          - Mobile: bg-transparent (No background)
          - Desktop: md:bg-transparent (Remains unchanged as per your request)
      */}
      <div className="relative z-[70] flex justify-between items-center p-6 md:p-6 md:px-12 w-full bg-transparent transition-all">
        {/* Left: Name */}
        <div className="flex-1 flex justify-start items-center">
          <Link
            to="/"
            className="text-base font-medium hover:text-zinc-300 transition-colors whitespace-nowrap tracking-tight"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Manthila Balasuriya
          </Link>
        </div>

        {/* Mobile Hamburger Button (No background box, just the icon) */}
        <div className="md:hidden flex items-center">
          <button
            onClick={toggleMenu}
            className="focus:outline-none p-2"
            aria-label="Toggle menu"
          >
            <div className="w-6 h-4 flex flex-col justify-between items-end">
              <span
                className={`h-[1.5px] bg-white transition-all duration-300 ${isMobileMenuOpen ? "w-6 rotate-45 translate-y-[7px]" : "w-6"}`}
              />
              <span
                className={`h-[1.5px] bg-white transition-all duration-300 ${isMobileMenuOpen ? "opacity-0" : "w-4"}`}
              />
              <span
                className={`h-[1.5px] bg-white transition-all duration-300 ${isMobileMenuOpen ? "w-6 -rotate-45 -translate-y-[7px]" : "w-2"}`}
              />
            </div>
          </button>
        </div>

        {/* Center: Desktop Pages (Unchanged) */}
        <div className="hidden md:flex flex-1 justify-center gap-12 items-center text-base">
          <Link
            to="/directing"
            className="hover:text-zinc-300 transition-colors"
          >
            Directing Portfolio
          </Link>
        </div>

        {/* Right: Desktop CTA (Unchanged) */}
        <div className="hidden md:flex flex-1 justify-end items-center">
          <a
            href="https://wa.me/94705189977"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-2 bg-white text-black rounded-full text-sm font-bold hover:bg-zinc-200 transition-colors whitespace-nowrap"
          >
            Book a call
          </a>
        </div>
      </div>

      {/* Creative Full-Screen Mobile Menu 
          This only appears when triggered, otherwise the header is just floating text.
      */}
      <div
        className={`fixed inset-0 bg-black transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] md:hidden ${isMobileMenuOpen
          ? "translate-y-0 opacity-100"
          : "-translate-y-full opacity-0"
          }`}
      >
        <div className="flex flex-col h-full justify-center px-10 gap-6">
          <p className="text-zinc-500 text-xs uppercase tracking-widest mb-4">
            Navigation
          </p>

          <Link
            to="/directing"
            className={`text-4xl font-light tracking-tight transition-all duration-700 delay-100 ${isMobileMenuOpen ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Directing Portfolio
          </Link>

          <div
            className={`mt-6 transition-all duration-700 delay-300 ${isMobileMenuOpen ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}
          >
            <a
              href="https://wa.me/94705189977"
              target="_blank"
              rel="noopener noreferrer"
              className="text-lg border-b border-white pb-1 inline-block"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Book a call
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
