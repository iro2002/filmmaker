import React from "react";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <nav className="fixed top-0 w-full z-50 flex justify-between items-center p-4 md:p-6 md:px-12 text-white">
      
      {/* Left: Name leading to Home page */}
      <div className="flex-1 flex justify-start items-center">
        <Link 
          to="/" 
          className="text-sm md:text-base font-medium hover:text-zinc-300 transition-colors whitespace-nowrap"
        >
          Manthila Balasuriya
        </Link>
      </div>

      {/* Center: Directing & Producing pages */}
      <div className="flex-1 flex justify-center gap-6 md:gap-12 items-center text-sm md:text-base">
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

      {/* Right: Leads to Contact Section */}
      <div className="flex-1 flex justify-end items-center">
        <a 
          href="#contact" 
          className="px-4 py-2 md:px-6 md:py-2 bg-white text-black rounded-full text-xs md:text-sm font-bold hover:bg-zinc-200 transition-colors whitespace-nowrap"
        >
          Book a call
        </a>
      </div>

    </nav>
  );
}