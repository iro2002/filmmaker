import React from "react";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <nav className="fixed top-0 w-full z-50 flex justify-between items-center p-4 md:p-6 md:px-12 pointer-events-none text-white">
      
      {/* Left: Logo (Scales down on mobile to prevent squishing) */}
      <div className="flex items-center pointer-events-auto cursor-pointer drop-shadow-md truncate pr-2">
        <span className="text-[11px] sm:text-xs md:text-sm font-medium tracking-wide truncate">
          ManthilaBalasuriya.com
        </span>
      </div>
      
      {/* Middle: Desktop Menu (Hidden on Mobile) */}
      <div className="hidden md:flex gap-8 text-sm pointer-events-auto drop-shadow-md">
        <button className="hover:text-zinc-400 transition-colors">Menu ≡</button>
        <Link to="/commercial-producing" className="hover:text-zinc-400 transition-colors">
          Commercial Producing
        </Link>
        <button className="hover:text-zinc-400 transition-colors">Services ∨</button>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-2 md:gap-6 pointer-events-auto shrink-0">
        
        {/* Mobile-Only Highlighted "Commercial" Badge */}
        {/* Uses a glassy, semi-transparent background to make it pop without looking heavy */}
        <Link 
          to="/commercial-producing" 
          className="md:hidden px-3 py-1.5 bg-white/15 border border-white/30 backdrop-blur-md rounded-full text-[10px] font-semibold tracking-wide hover:bg-white/25 transition-colors whitespace-nowrap shadow-sm"
        >
          Commercial <span className="hidden sm:inline">Producing</span>
        </Link>

        {/* Desktop-Only Project Form Link */}
        <a href="#" className="hidden md:block text-sm hover:text-zinc-400 transition-colors drop-shadow-md">
          Project Form ↗
        </a>
        
        {/* Book Button */}
        <button className="px-3 py-1.5 md:px-6 md:py-2 bg-white text-black rounded-full text-[11px] md:text-sm font-bold flex items-center gap-1 hover:bg-zinc-300 transition-colors whitespace-nowrap">
          Book <span className="hidden md:inline">A Call</span> <span>+</span>
        </button>
      </div>
      
    </nav>
  );
}