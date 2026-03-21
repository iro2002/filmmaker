import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

// IMPORT YOUR LOCAL VIDEO HERE
import introVideo from "../images/intro.mp4";

export default function FilmmakerPortfolio() {
  const targetRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"]
  });

  // --- PHASE 1: The Reveal ---
  const leftPanelX = useTransform(scrollYProgress, [0, 0.25], ["0%", "-100%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  
  const heroTextTopY = useTransform(scrollYProgress, [0, 0.2], ["0%", "-100%"]);
  const heroTextBottomY = useTransform(scrollYProgress, [0, 0.2], ["0%", "-50%"]);

  // --- PHASE 2: Horizontal Scrolling Text ---
  const horizontalTextX = useTransform(scrollYProgress, [0.25, 0.6], ["100%", "-100%"]);
  const horizontalTextOpacity = useTransform(scrollYProgress, [0.2, 0.25, 0.55, 0.6], [0, 1, 1, 0]);

  // --- PHASE 3: Page 2 Slides Up ---
  const page2Y = useTransform(scrollYProgress, [0.6, 0.85], ["100%", "0%"]);

  // --- PHASE 3: Staggered Scroll Animations ---
  const imageScale = useTransform(scrollYProgress, [0.7, 0.95], [1.3, 1]);
  
  const aboutTextY = useTransform(scrollYProgress, [0.75, 0.85], [40, 0]);
  const aboutTextOpacity = useTransform(scrollYProgress, [0.75, 0.85], [0, 1]);
  
  const team1Y = useTransform(scrollYProgress, [0.78, 0.88], [40, 0]);
  const team1Opacity = useTransform(scrollYProgress, [0.78, 0.88], [0, 1]);
  
  const team2Y = useTransform(scrollYProgress, [0.80, 0.90], [40, 0]);
  const team2Opacity = useTransform(scrollYProgress, [0.80, 0.90], [0, 1]);
  
  const team3Y = useTransform(scrollYProgress, [0.82, 0.92], [40, 0]);
  const team3Opacity = useTransform(scrollYProgress, [0.82, 0.92], [0, 1]);

  // --- IMPROVED MARQUEE ANIMATIONS ---
  // Increased the negative percentage to ensure the whole string scrolls past
  const bottomMarqueeX = useTransform(scrollYProgress, [0.65, 1], ["20%", "-120%"]);
  const bottomMarqueeScale = useTransform(scrollYProgress, [0.7, 1], [0.85, 1]);
  // Added Y-axis movement and opacity for a more dramatic entrance
  const bottomMarqueeY = useTransform(scrollYProgress, [0.65, 0.9], [100, 0]);
  const bottomMarqueeOpacity = useTransform(scrollYProgress, [0.65, 0.8], [0, 1]);

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
        
        {/* BACKGROUND LAYER: Full Screen Video */}
        <div className="absolute inset-0 w-full h-full">
          <video
            src={introVideo}
            autoPlay
            loop
            muted
            playsInline // CRUCIAL for mobile auto-play
            className="object-cover w-full h-full"
          />
        </div>

        {/* PHASE 2: HORIZONTAL SCROLLING TEXT */}
        <motion.div 
          style={{ x: horizontalTextX, opacity: horizontalTextOpacity }}
          className="absolute top-1/2 -translate-y-1/2 w-full z-10 flex items-center px-4 drop-shadow-2xl pointer-events-none"
        >
          <h2 className="text-[18vw] md:text-[9vw] font-serif text-white whitespace-nowrap tracking-tight leading-none drop-shadow-[0_5px_15px_rgba(0,0,0,0.8)]">
            Your vision, <span className="italic font-light">effortlessly captured</span>.
          </h2>
        </motion.div>

        {/* PHASE 1: DESKTOP LEFT COVER PANEL (Hidden on Mobile) */}
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

        {/* PHASE 1: MAIN HERO TITLE (Parallax Text) */}
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
          
          <div className="absolute bottom-8 md:bottom-12 right-6 md:right-12 text-right max-w-[150px] md:max-w-[200px]">
            <p className="text-white text-xs md:text-sm font-medium leading-tight drop-shadow-lg">
              We combine advanced science with an artist's touch.
            </p>
          </div>
        </motion.div>

        {/* --- PHASE 3: DARK THEME ABOUT SECTION SLIDES UP --- */}
        <motion.div
          style={{ y: page2Y }}
          className="absolute inset-0 w-full h-full bg-[#0a0a0a] z-40 flex flex-col pt-24 md:pt-32 pb-8 px-6 md:px-16 overflow-y-auto"
        >
          <div className="w-full max-w-7xl mx-auto flex flex-col md:flex-row items-center md:items-start justify-center gap-8 md:gap-24 flex-grow">
            
            {/* Left Image with Parallax Scroll Effect */}
            <div className="w-[50vw] md:w-full max-w-[200px] md:max-w-[300px] aspect-[4/5] bg-zinc-900 overflow-hidden shadow-2xl rounded-sm shrink-0">
              <motion.img 
                style={{ scale: imageScale }}
                src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=800" 
                alt="Director" 
                className="w-full h-full object-cover grayscale opacity-90"
              />
            </div>

            {/* Right Text & Staggered Team circles */}
            <div className="w-full max-w-md md:pt-12 text-center md:text-left flex flex-col items-center md:items-start">
              <motion.p 
                style={{ y: aboutTextY, opacity: aboutTextOpacity }}
                className="text-sm md:text-base text-zinc-400 leading-relaxed font-sans mb-8"
              >
                With decades of combined experience and an eye for cutting-edge aesthetics, our team delivers films rooted in narrative precision and an unwavering dedication to cinematic excellence.
              </motion.p>
              
              <div className="flex items-center justify-center md:justify-start">
                <motion.img style={{ y: team1Y, opacity: team1Opacity }} src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&h=150" alt="Team 1" className="w-12 h-12 md:w-14 md:h-14 rounded-full border-2 border-[#0a0a0a] object-cover grayscale" />
                <motion.img style={{ y: team2Y, opacity: team2Opacity }} src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150" alt="Team 2" className="w-12 h-12 md:w-14 md:h-14 rounded-full border-2 border-[#0a0a0a] object-cover grayscale -ml-4" />
                <motion.img style={{ y: team3Y, opacity: team3Opacity }} src="https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=150&h=150" alt="Team 3" className="w-12 h-12 md:w-14 md:h-14 rounded-full border-2 border-[#0a0a0a] object-cover grayscale -ml-4" />
                <motion.div style={{ y: team3Y, opacity: team3Opacity }} className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-zinc-800 border-2 border-[#0a0a0a] -ml-4 flex items-center justify-center text-zinc-300 font-serif text-xs md:text-sm z-10">
                  +20
                </motion.div>
              </div>
            </div>
          </div>

          {/* Bottom Giant Marquee - IMPROVED */}
          <div className="w-full mt-auto overflow-hidden whitespace-nowrap pt-8 pb-4">
             <motion.h2 
               style={{ 
                 x: bottomMarqueeX, 
                 scale: bottomMarqueeScale,
                 y: bottomMarqueeY,
                 opacity: bottomMarqueeOpacity
               }}
               className="text-[20vw] md:text-[12vw] font-serif text-white tracking-tighter leading-none"
             >
               Our goal is <span className="text-zinc-600 italic transition-colors duration-700 hover:text-white cursor-default">to deliver cinematic perfection</span>
             </motion.h2>
          </div>
        </motion.div>

      </div>
    </div>
  );
}