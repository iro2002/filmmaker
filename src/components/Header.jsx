import React from "react";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <nav className="fixed top-0 w-full z-50 flex justify-between items-center p-4 md:p-6 md:px-12 pointer-events-none text-white">

      {/* Left: Logo */}
      <div className="flex items-center pointer-events-auto cursor-pointer drop-shadow-md pr-2 shrink-0">
        <Link to="/">
          <span className="text-[11px] sm:text-xs md:text-sm font-medium tracking-wide truncate">
            MB
          </span>
        </Link>
      </div>

      {/* Middle: Desktop Menu (Hidden on Mobile) */}
      <div className="hidden md:flex items-center gap-8 text-sm pointer-events-auto drop-shadow-md">
        <Link to="/directing" className="hover:text-zinc-400 transition-colors">
          Directing
        </Link>
        <Link to="/commercial-producing" className="hover:text-zinc-400 transition-colors">
          Producing
        </Link>
        <a href="mailto:manthilaproduces@gmail.com" className="hover:text-zinc-400 transition-colors">
          manthilaproduces@gmail.com
        </a>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-2 md:gap-6 pointer-events-auto shrink-0">

        {/* CREATIVE FIX: Mobile-Only Split Glassy Pill for both links */}
        <div className="md:hidden flex items-center bg-white/10 border border-white/20 backdrop-blur-md rounded-full text-[9px] sm:text-[10px] font-semibold tracking-wide shadow-sm">
          <Link
            to="/directing"
            className="px-2.5 py-1.5 hover:bg-white/20 transition-colors rounded-l-full border-r border-white/10 uppercase"
          >
            Directing
          </Link>
          <Link
            to="/commercial-producing"
            className="px-2.5 py-1.5 hover:bg-white/20 transition-colors rounded-r-full uppercase"
          >
            Producing
          </Link>
        </div>

        {/* Primary Contact Button */}
        <a
          href="https://wa.me/94705189977"
          target="_blank"
          rel="noreferrer"
          className="px-3 py-1.5 md:px-6 md:py-2 bg-white text-black rounded-full text-[11px] md:text-sm font-bold flex items-center gap-1 hover:bg-zinc-300 transition-colors whitespace-nowrap shrink-0"
        >
          Book call <span className="hidden lg:inline">+94 70 518 9977</span>
        </a>

      </div>

    </nav>
  );
}