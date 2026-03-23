import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
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

// --- DUMMY DATA FOR THE HOVER ROSTER ---
const rosterData = [
  { id: 1, name: "Elena Rostova", role: "Director", image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&h=800" },
  { id: 2, name: "Marcus Chen", role: "Cinematographer", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&h=800" },
  { id: 3, name: "Sarah Jenkins", role: "Creative Director", image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=600&h=800" },
  { id: 4, name: "David Kim", role: "VFX Supervisor", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&h=800" },
  { id: 5, name: "View All", role: "Collaborators", image: "https://images.unsplash.com/photo-1604079628040-94301bb21b91?auto=format&fit=crop&w=600&h=800" }
];

export default function FilmmakerPortfolio() {
  const targetRef = useRef(null);
  const navigate = useNavigate();

  // --- LOADING STATE ---
  const [isLoading, setIsLoading] = useState(true);
  const [counter, setCounter] = useState(0);

  // --- HOVER STATE FOR AVATAR ACCORDION ---
  const [hoveredIndex, setHoveredIndex] = useState(null);

  useEffect(() => {
    // Lock scrolling while loading
    document.body.style.overflow = isLoading ? "hidden" : "auto";

    // Simulate cinematic loading progress
    if (isLoading) {
      const interval = setInterval(() => {
        setCounter((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setTimeout(() => setIsLoading(false), 600);
            return 100;
          }
          return prev + Math.floor(Math.random() * 5) + 1;
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

  const statementText = "Producing and directing commercial films by building the right team for each brief, driven by cutting-edge aesthetics and cinematic excellence.";
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
            transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
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

          {/* --- PHASE 3: BLUR/ROTATE & ROSTER ACCORDION --- */}
          <motion.div
            style={{ y: page2Y }}
            className="absolute inset-0 w-full h-full bg-[#050505] z-40 flex flex-col justify-center overflow-hidden"
          >
            <div className="flex flex-col items-center justify-center px-4 md:px-12 w-full max-w-7xl mx-auto relative z-10 gap-16 md:gap-24">

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

              {/* --- ONE-BY-ONE HOVER ACCORDION WITH STAGGERED ENTRANCE --- */}
              <div
                className="flex w-full max-w-4xl h-[250px] md:h-[400px] gap-2 md:gap-4 items-center justify-center cursor-pointer"
                onMouseLeave={() => setHoveredIndex(null)}
                onClick={() => navigate('/collaborators')}
              >
                {rosterData.map((person, i) => {
                  // Determine the dynamic width of each card based on hover state
                  const isActive = hoveredIndex === i;
                  const isSomethingHovered = hoveredIndex !== null;

                  const cardWidth = isActive
                    ? "calc(50% + 100px)" // Expanded size
                    : isSomethingHovered
                      ? "calc(10% - 10px)" // Shrunk size
                      : "20%"; // Default equal size

                  // Create the staggered layout look (alternating up and down)
                  const staggerY = i % 2 === 0 ? 24 : -24;

                  return (
                    <motion.div
                      key={person.id}
                      onMouseEnter={() => setHoveredIndex(i)}
                      // 1. Initial hidden state (pushed down)
                      initial={{ opacity: 0, y: 150 }}
                      // 2. Trigger one-by-one when scrolled into view
                      whileInView={{ opacity: 1, y: staggerY }}
                      viewport={{ once: true, amount: 0.2 }}
                      // 3. Handle the dynamic hover accordion state
                      animate={{
                        width: cardWidth,
                        filter: isActive || !isSomethingHovered
                          ? "grayscale(0%) brightness(100%)"
                          : "grayscale(100%) brightness(40%)"
                      }}
                      // 4. Split transitions: slow delayed entrance vs. snappy hover
                      transition={{
                        y: { duration: 0.8, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] },
                        opacity: { duration: 0.8, delay: i * 0.15 },
                        width: { type: "spring", stiffness: 200, damping: 25 },
                        filter: { duration: 0.3 }
                      }}
                      className="relative h-full overflow-hidden bg-zinc-900 border border-zinc-800 group rounded-sm"
                    >
                      {/* Background Image */}
                      <img
                        src={person.image}
                        alt={person.name}
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />

                      {/* Dark Gradient Overlay for text readability */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-100 transition-opacity duration-500" />

                      {/* Text Reveal Logic */}
                      <motion.div
                        className="absolute bottom-4 left-4 right-4 flex flex-col"
                        animate={{ opacity: isActive || !isSomethingHovered ? 1 : 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="overflow-hidden whitespace-nowrap">
                          <p className="text-white font-serif text-lg md:text-2xl leading-none">{person.name}</p>
                          <motion.p
                            animate={{
                              height: isActive ? "auto" : 0,
                              opacity: isActive ? 1 : 0,
                              marginTop: isActive ? "4px" : "0px"
                            }}
                            className="text-zinc-400 text-xs md:text-sm tracking-widest uppercase font-bold"
                          >
                            {person.role}
                          </motion.p>
                        </div>
                      </motion.div>
                    </motion.div>
                  );
                })}
              </div>
              {/* --- END HOVER ACCORDION --- */}

            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
}