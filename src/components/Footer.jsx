import React, { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function Footer() {
  const footerRef = useRef(null);
  const navigate = useNavigate();

  // Triggers the drawing animation of the glowing line
  const isInView = useInView(footerRef, { once: true, margin: "-10%" });

  // Creates the smooth parallax slide-up effect for the giant bottom text
  const { scrollYProgress } = useScroll({
    target: footerRef,
    offset: ["start end", "end end"],
  });

  const giantTextY = useTransform(scrollYProgress, [0, 1], ["50%", "0%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["20%", "0%"]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer
      ref={footerRef}
      className="relative w-full bg-[#020202] text-white pt-48 md:pt-64 pb-6 overflow-hidden flex flex-col items-center"
    >
      {/* ==========================================
          THE MASSIVE GRADIENT CURVE 
      ========================================== */}
      <div className="absolute top-0 left-0 w-full leading-none z-0">
        <svg
          viewBox="0 0 1440 300"
          className="w-full h-[150px] md:h-[300px] block"
          preserveAspectRatio="none"
        >
          {/* Custom Black and White Gradient Definition */}
          <defs>
            <linearGradient id="bwGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#000000" />
              <stop offset="50%" stopColor="#ffffff" />
              <stop offset="100%" stopColor="#000000" />
            </linearGradient>
          </defs>

          {/* Solid fill to blend seamlessly with the section above */}
          <path d="M0,0 L1440,0 L1440,300 Q720,0 0,300 Z" fill="#050505" />

          {/* The animated, gradient-filled glowing line */}
          <motion.path
            d="M0,300 Q720,0 1440,300"
            fill="none"
            stroke="url(#bwGradient)"
            strokeWidth="4"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={
              isInView
                ? { pathLength: 1, opacity: 1 }
                : { pathLength: 0, opacity: 0 }
            }
            transition={{ duration: 2.5, ease: "easeInOut", delay: 0.2 }}
          />
        </svg>
      </div>

      {/* ==========================================
          MIDDLE CONTENT
      ========================================== */}
      <motion.div
        style={{ y: contentY }}
        className="w-full max-w-7xl px-6 md:px-12 flex flex-col md:flex-row justify-between items-center md:items-start relative z-10 gap-16 md:gap-0"
      >
        {/* Left Column: CTA */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <h2 className="text-4xl md:text-6xl font-serif tracking-tight leading-tight mb-6">
            Ready to frame <br />
            <span className="italic text-zinc-500 font-light">
              the extraordinary?
            </span>
          </h2>

          <div className="flex flex-col gap-3 mb-8 items-center md:items-start">
            <a
              href="mailto:manthilaproduces@gmail.com"
              className="group relative text-lg font-light tracking-wide inline-block"
            >
              manthilaproduces@gmail.com
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-white transition-all duration-500 group-hover:w-full"></span>
            </a>
            <a
              href="https://wa.me/94705189977"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative text-lg font-light tracking-wide inline-block text-zinc-300"
            >
              +94 70 518 9977
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-white transition-all duration-500 group-hover:w-full"></span>
            </a>
          </div>

          {/* NEW: Book a Call Button */}
          <a
            href="https://wa.me/94705189977"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-3 rounded-full border border-white text-sm uppercase tracking-widest hover:bg-white hover:text-black transition-all duration-300"
          >
            Book a Call
          </a>
        </div>

        {/* Right Column: Always-Active Rotating Badge */}
        {/* UPDATED: Increased gap-24 to gap-40 and lg:gap-56 to push the circle to the left */}
        <div className="flex flex-col md:flex-row items-center gap-12 md:gap-40 lg:gap-56">
          {/* START CIRCLE UPDATES: 
            - Always white border and text so it stands out immediately 
            - Always spinning 
            - Added an infinite pulse animation to the outer border
          */}
          <motion.a
            href="/start-project"
            onClick={(e) => {
              e.preventDefault();
              navigate("/start-project");
            }}
            animate={{
              boxShadow: [
                "0px 0px 0px 0px rgba(255,255,255,0.2)",
                "0px 0px 0px 15px rgba(255,255,255,0)",
              ],
            }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="cursor-pointer relative flex items-center justify-center w-32 h-32 md:w-40 md:h-40 rounded-full border border-white hover:bg-white hover:text-black transition-colors duration-500 group"
          >
            <span className="absolute font-serif text-lg tracking-widest uppercase">
              Start
            </span>

            <motion.svg
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
              // Text is pure white by default so it's easily readable before hover
              className="w-full h-full p-2 text-white group-hover:text-black transition-colors duration-500"
              viewBox="0 0 100 100"
            >
              <path
                id="curve"
                d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
                fill="transparent"
              />
              <text fontSize="11" letterSpacing="4" fill="currentColor">
                <textPath href="#curve" startOffset="0%">
                  LET'S CREATE TOGETHER • LET'S CREATE TOGETHER •
                </textPath>
              </text>
            </motion.svg>
          </motion.a>

          {/* Minimal Links */}
          <div className="flex gap-12 text-sm tracking-widest uppercase text-zinc-400">
            <div className="flex flex-col gap-4 items-center md:items-start">
              <a
                href="#work"
                className="hover:text-white transition-colors duration-300"
              >
                Work
              </a>
              <a
                href="#roster"
                className="hover:text-white transition-colors duration-300"
              >
                Roster
              </a>
              <a
                href="#about"
                className="hover:text-white transition-colors duration-300"
              >
                About
              </a>
            </div>
            <div className="flex flex-col gap-4 items-center md:items-start">
              <a
                href="#vimeo"
                className="hover:text-white transition-colors duration-300"
              >
                Vimeo
              </a>
              <a
                href="#ig"
                className="hover:text-white transition-colors duration-300"
              >
                Instagram
              </a>
              <a
                href="#x"
                className="hover:text-white transition-colors duration-300"
              >
                X (Twitter)
              </a>
            </div>
          </div>
        </div>
      </motion.div>

      {/* ==========================================
          GIANT PARALLAX TEXT
      ========================================== */}
      <div className="w-full overflow-hidden mt-24 md:mt-32 relative z-0 flex justify-center border-b border-zinc-900 pb-8">
        <motion.h1
          style={{ y: giantTextY }}
          className="text-[13vw] font-serif leading-none tracking-tighter text-zinc-900 select-none pointer-events-none"
        >
          CINEMATIC
        </motion.h1>
      </div>

      {/* ==========================================
          BOTTOM ROW
      ========================================== */}
      <div className="w-full max-w-7xl px-6 md:px-12 flex flex-col md:flex-row justify-between items-center pt-6 text-xs text-zinc-600 relative z-10">
        <p>© {new Date().getFullYear()} Cinematic Arts Studio.</p>

        <button
          onClick={scrollToTop}
          className="mt-4 md:mt-0 hover:text-white transition-colors duration-300 uppercase tracking-widest flex items-center gap-2 group"
        >
          Back to Top
          <span className="group-hover:-translate-y-1 transition-transform duration-300">
            ↑
          </span>
        </button>
      </div>
    </footer>
  );
}
