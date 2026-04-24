import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Header from "./Header"; // Adjust import path as needed
import Category from "./Category"; // Embedded inside Hero

// IMPORT YOUR LOCAL VIDEO HERE
import introVideo from "../images/Intro.mp4";



export default function FilmmakerPortfolio() {
  const targetRef = useRef(null);
  const navigate = useNavigate();

  // --- LOADING STATE ---
  const [isLoading, setIsLoading] = useState(true);
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    // Lock scrolling while loading
    document.body.style.overflow = isLoading ? "hidden" : "auto";

    // Simulate cinematic loading progress
    if (isLoading) {
      const interval = setInterval(() => {
        setCounter((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setTimeout(() => setIsLoading(false), 600); // Slight pause at 100% before fade out
            return 100;
          }
          return prev + Math.floor(Math.random() * 5) + 1; // Random jumps for a more organic feel
        });
      }, 40);
      return () => clearInterval(interval);
    }
  }, [isLoading]);

  // --- SCROLL ANIMATIONS ---
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"]
  });

  // --- PHASE 1 & 2: Existing Animations ---
  const leftPanelX = useTransform(scrollYProgress, [0, 0.25], ["0%", "-100%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  const heroTextTopY = useTransform(scrollYProgress, [0, 0.2], ["0%", "-100%"]);
  const heroTextBottomY = useTransform(scrollYProgress, [0, 0.2], ["0%", "-50%"]);
  const horizontalTextX = useTransform(scrollYProgress, [0.25, 0.6], ["100%", "-100%"]);
  const horizontalTextOpacity = useTransform(scrollYProgress, [0.2, 0.25, 0.55, 0.6], [0, 1, 1, 0]);

  // --- PHASE 3: Container Animation ---
  const page2Y = useTransform(scrollYProgress, [0.6, 0.85], ["100%", "0%"]);

  // Text removed as per user request

  return (
    <>
      {/* --- CREATIVE LOADER --- */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            key="loader"
            initial={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }} // Cinematic swift upward wipe
            className="fixed inset-0 z-[100] bg-[#050505] flex flex-col items-center justify-center pointer-events-auto"
          >
            <div className="overflow-hidden">
              <motion.h1
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
                className="text-4xl md:text-6xl text-white font-serif tracking-tighter"
              >
                manthilabalasuriya.com
              </motion.h1>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- MAIN PORTFOLIO CONTENT --- */}
      <div ref={targetRef} className="h-[400vh] bg-black relative font-sans">

        {/* IMPORTED HEADER */}
        <Header />

        {/* --- STICKY VIEWPORT --- */}
        <div className="sticky top-0 h-screen overflow-hidden bg-black">

          {/* BACKGROUND LAYER */}
          <div className="absolute inset-0 w-full h-full">
            <video
              src={introVideo}
              autoPlay loop muted playsInline
              className="object-cover w-full h-full"
            />
          </div>

          {/* PHASE 2: HORIZONTAL TEXT */}
          <motion.div
            style={{ x: horizontalTextX, opacity: horizontalTextOpacity }}
            className="absolute top-1/2 -translate-y-1/2 w-full z-10 flex items-center px-4 drop-shadow-2xl pointer-events-none"
          >
            <h2 className="text-[18vw] md:text-[9vw] font-serif text-white whitespace-nowrap tracking-tight leading-none drop-shadow-[0_5px_15px_rgba(0,0,0,0.8)]">
              Your vision, <span className="italic font-light">effortlessly captured</span>.
            </h2>
          </motion.div>

          {/* PHASE 1: LEFT COVER PANEL */}
          <motion.div
            style={{ x: leftPanelX }}
            className="hidden md:flex absolute top-0 left-0 w-1/2 h-full bg-[#111] z-20 flex-col justify-end p-12"
          >
            <motion.div style={{ opacity: heroOpacity }} className="text-xs text-white mt-auto">
              <p className="text-zinc-500 mb-2">Based in:</p>
              <p className="font-bold tracking-wide">Sri Lanka</p>
            </motion.div>
          </motion.div>

          {/* PHASE 1: MAIN HERO TITLE */}
          <motion.div
            style={{ opacity: heroOpacity }}
            className="absolute inset-0 flex flex-col items-center justify-center z-30 pointer-events-none px-4"
          >
            <h1 className="flex flex-col items-center font-serif text-white text-center tracking-tighter drop-shadow-[0_10px_30px_rgba(0,0,0,0.8)]">
              <motion.span style={{ y: heroTextTopY }} className="text-[20vw] md:text-[11vw] leading-[0.85]">
                Premium
              </motion.span>
              <motion.span style={{ y: heroTextBottomY }} className="text-[16vw] md:text-[11vw] leading-[0.85] italic font-light text-zinc-300">
                Cinematic Arts
              </motion.span>
            </h1>
          </motion.div>

          {/* --- PHASE 3: BLUR/ROTATE REDESIGN --- */}
          <motion.div
            style={{ y: page2Y }}
            className="absolute inset-0 w-full h-full bg-[#050505] z-40 flex flex-col justify-between overflow-hidden"
          >
            {/* --- CATEGORY REELS INTEGRATED AS FULL REPLACEMENT --- */}
            <div className="flex-1 w-full relative z-20 flex items-center justify-center pt-24 md:pt-32 pb-12">
              <div className="w-full max-w-[1400px]">
                <Category />
              </div>
            </div>

          </motion.div>
        </div>
      </div>
    </>
  );
}