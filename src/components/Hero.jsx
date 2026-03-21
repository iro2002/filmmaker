import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

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
  
  // Stretched the rotation over a longer scroll period so it levels out slower
  const statementRotate = useTransform(scrollYProgress, [0.60, 0.90], [3, 0]);

  // Pushed the avatars further down the page so the text has time to finish
  const avatarsOpacity = useTransform(scrollYProgress, [0.92, 0.98], [0, 1]);
  const avatarsScale = useTransform(scrollYProgress, [0.92, 0.98], [0.8, 1]);

  // --- THE TEXT DATA ---
  const statementText = "With decades of combined experience and an eye for cutting-edge aesthetics, our team delivers films rooted in narrative precision and an unwavering dedication to cinematic excellence.";
  const words = statementText.split(/( |\n)/).filter(word => word !== " "); 

  return (
    <div ref={targetRef} className="h-[400vh] bg-black relative font-sans">
      
      {/* --- FIXED NAVIGATION --- */}
      <nav className="fixed top-0 w-full z-50 flex justify-between items-center p-6 md:px-12 pointer-events-none text-white">
        <div className="flex items-center gap-4 pointer-events-auto cursor-pointer drop-shadow-md">
          <svg width="30" height="15" viewBox="0 0 40 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className="md:w-10 md:h-5">
            <path d="M20 20C8.954 20 0 11.046 0 0h2c0 9.941 8.059 18 18 18s18-8.059 18-18h2c0 11.046-8.954 20-20 20z" />
          </svg>
          <span className="text-xs md:text-sm font-medium tracking-wide">Studio V.</span>
        </div>
        
        <div className="hidden md:flex gap-8 text-sm pointer-events-auto drop-shadow-md">
          <button className="hover:text-zinc-400 transition-colors">Menu ≡</button>
          <button className="hover:text-zinc-400 transition-colors">Services ∨</button>
        </div>

        <div className="flex items-center gap-4 md:gap-6 pointer-events-auto">
          <a href="#" className="hidden md:block text-sm hover:text-zinc-400 transition-colors drop-shadow-md">Project Form ↗</a>
          <button className="px-4 py-2 md:px-6 md:py-2 bg-white text-black rounded-full text-xs md:text-sm font-semibold flex items-center gap-2 hover:bg-zinc-300 transition-colors">
            Book <span className="hidden md:inline">A Call</span> <span>+</span>
          </button>
        </div>
      </nav>

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
                // CHANGED MATH: Starts slightly earlier (0.60), 
                // larger stagger between words (0.008), 
                // and much longer individual blur duration (0.12).
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
          <div className="w-full border-t border-zinc-900 overflow-hidden bg-[#050505] py-8 md:py-12 relative z-20">
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
  );
}