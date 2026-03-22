import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import Header from "./Header"; // Adjust import path as needed

// IMPORT YOUR LOCAL VIDEO HERE
import introVideo from "../images/intro.mp4";

const BlurWord = ({ children, progress, range, className }) => {
  const opacity = useTransform(progress, range, [0.1, 1]);
  const blurValue = useTransform(progress, range, [4, 0]);
  const filter = useTransform(blurValue, (v) => `blur(${v}px)`);

  return (
    <motion.span 
      style={{ opacity, filter, willChange: "opacity, filter" }} 
      className={`inline-block mr-[0.25em] ${className}`}
    >
      {children}
    </motion.span>
  );
};

export default function FilmmakerPortfolio() {
  const targetRef = useRef(null);
  
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
  const statementRotate = useTransform(scrollYProgress, [0.60, 0.90], [3, 0]);
  const avatarsOpacity = useTransform(scrollYProgress, [0.92, 0.98], [0, 1]);
  const avatarsScale = useTransform(scrollYProgress, [0.92, 0.98], [0.8, 1]);

  const statementText = "With decades of combined experience and an eye for cutting-edge aesthetics, our team delivers films rooted in narrative precision and an unwavering dedication to cinematic excellence.";
  const words = statementText.split(/( |\n)/).filter(word => word !== " "); 

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
              ManthilaBalasuriya.com
              </motion.h1>
            </div>
            
            <div className="absolute bottom-12 md:bottom-16 w-full px-12 flex justify-between items-end text-zinc-500 font-sans text-xs tracking-widest uppercase">
              <span>Loading Vision</span>
              <span className="text-white text-lg font-medium">{counter}%</span>
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
              <p className="font-bold tracking-wide">Los Angeles</p>
              <p className="font-bold tracking-wide">New York</p>
              <p className="font-bold tracking-wide">London</p>
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
            <div className="h-24 md:h-32"></div>

            <div className="flex-1 flex flex-col items-center justify-center px-6 md:px-12 w-full max-w-6xl mx-auto relative z-10">
              
              {/* THE BOLD STATEMENT */}
              <motion.h2 
                style={{ 
                  rotate: statementRotate, 
                  transformOrigin: "0% 50%" 
                }}
                className="text-3xl md:text-5xl lg:text-6xl text-white font-serif leading-[1.2] md:leading-[1.1] tracking-tight text-center flex flex-wrap justify-center max-w-5xl"
              >
                {words.map((word, i) => {
                  const start = 0.60 + (i * 0.008); 
                  const end = start + 0.30;

                  let customClass = "";
                  if (word.includes("cutting-edge") || word.includes("aesthetics,")) {
                    customClass = "italic text-zinc-500 font-light";
                  } else if (word.includes("narrative") || word.includes("precision")) {
                    customClass = "underline decoration-1 underline-offset-[10px] decoration-zinc-800";
                  }

                  return (
                    <BlurWord 
                      key={i} 
                      progress={scrollYProgress} 
                      range={[start, end]}
                      className={customClass}
                    >
                      {word}
                    </BlurWord>
                  );
                })}
              </motion.h2>

              {/* The Avatar Module */}
              <motion.div 
                style={{ opacity: avatarsOpacity, scale: avatarsScale }}
                className="mt-12 md:mt-16 flex items-center gap-5 bg-zinc-900/30 p-2 pr-8 rounded-full border border-zinc-800 backdrop-blur-md hover:bg-zinc-900/50 transition-colors cursor-pointer"
              >
                <div className="flex -space-x-4">
                  <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&h=150" alt="Director 1" className="w-12 h-12 md:w-14 md:h-14 rounded-full border-2 border-[#050505] object-cover grayscale" />
                  <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150" alt="Director 2" className="w-12 h-12 md:w-14 md:h-14 rounded-full border-2 border-[#050505] object-cover grayscale" />
                  <img src="https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=150&h=150" alt="Director 3" className="w-12 h-12 md:w-14 md:h-14 rounded-full border-2 border-[#050505] object-cover grayscale" />
                  <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-white border-2 border-[#050505] flex items-center justify-center text-black font-serif text-sm font-bold z-10">
                    +20
                  </div>
                </div>
              </motion.div>
            </div>

            {/* INFINITE AUTOPLAY MARQUEE */}
            <div className="w-full border-t border-zinc-900 overflow-hidden bg-[#050505] py-2 md:py-12 relative z-20">
              <motion.div 
                className="flex w-max items-center"
                animate={{ x: ["0%", "-50%"] }}
                transition={{ repeat: Infinity, ease: "linear", duration: 20 }}
              >
              </motion.div>
            </div>
            
          </motion.div>
        </div>
      </div>
    </>
  );
}