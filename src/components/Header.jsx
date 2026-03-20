import React, { useState } from "react";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: "Work", href: "#work" },
    { name: "Services", href: "#services" },
    { name: "About", href: "#about" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <>
      {/* Floating Notch Header */}
      <header className="fixed top-4 md:top-6 left-1/2 -translate-x-1/2 z-50 w-[92%] md:w-auto font-['Inter']">
        <div className="flex items-center justify-between gap-8 px-4 py-2 md:px-6 md:py-3 bg-black/40 backdrop-blur-xl border border-white/15 rounded-full shadow-[0_8px_32px_rgba(0,0,0,0.6)]">
          
          {/* Logo */}
          <div className="flex items-center gap-2 cursor-pointer pl-2">
            <div className="w-7 h-7 bg-white text-black flex items-center justify-center rounded-full font-bold text-sm">
              V
            </div>
            <span className="text-white font-semibold tracking-widest text-sm hidden sm:block">
              VISION
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-xs font-medium text-gray-300 hover:text-white transition-colors duration-300"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Desktop CTA & Mobile Toggle */}
          <div className="flex items-center gap-4">
            <button className="hidden md:block px-5 py-2 text-xs font-medium rounded-full bg-white text-black hover:bg-gray-200 transition-all duration-300">
              Let's Talk
            </button>

            {/* Mobile Hamburger (Inside the notch) */}
            <button
              className="md:hidden text-white p-2 focus:outline-none pr-1"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <div className="w-5 h-4 flex flex-col justify-between items-end">
                <span className={`h-[2px] bg-white transition-all duration-300 ${isMobileMenuOpen ? "w-5 rotate-45 translate-y-1.5" : "w-5"}`}></span>
                <span className={`h-[2px] bg-white transition-all duration-300 ${isMobileMenuOpen ? "opacity-0" : "w-3"}`}></span>
                <span className={`h-[2px] bg-white transition-all duration-300 ${isMobileMenuOpen ? "w-5 -rotate-45 -translate-y-2" : "w-4"}`}></span>
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 bg-black/95 backdrop-blur-2xl z-40 flex flex-col items-center justify-center transition-all duration-500 md:hidden ${
          isMobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
        }`}
      >
        <nav className="flex flex-col items-center gap-8 text-center mt-16">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-3xl font-light tracking-wide text-gray-400 hover:text-white transition-colors duration-300"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.name}
            </a>
          ))}
          <button className="mt-8 px-8 py-3 text-sm tracking-wide font-medium rounded-full bg-white text-black hover:bg-gray-200 transition-all duration-300">
            Start a Project
          </button>
        </nav>
      </div>
    </>
  );
};

export default Header;