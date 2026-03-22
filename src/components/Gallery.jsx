import React, { useState, useRef, useCallback } from "react";
import { motion, useSpring, useMotionValue, AnimatePresence } from "framer-motion";

// Vimeo Embed Links with autoplay=1 for full cinematic playback with sound and controls
const hospitalityData = [
  {
    id: "bars",
    category: "Bars",
    title: "Bars",
    imageSrc: "https://ik.imagekit.io/cvygf2xse/beefeatergin/wp-content/uploads/2022/09/beefeater-london-dry-gin-bat-berry-sour-cocktail.jpg?tr=q-80,w-735",
    projects: [
      {
        id: "bar1",
        title: "Night Lounge",
        videoSrc: "https://player.vimeo.com/video/1169808419?h=e709793bf5&autoplay=1",
        thumbnail: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=1000&auto=format&fit=crop"
      },
      {
        id: "bar2",
        title: "Food",
        videoSrc: "https://player.vimeo.com/video/1163610565?h=78a0efd031&autoplay=1",
        thumbnail: "https://images.unsplash.com/photo-1520207588543-5b8fef1e6d4a?q=80&w=1000&auto=format&fit=crop"
      }
    ]
  },
  {
    id: "food",
    category: "Food",
    title: "Food",
    imageSrc: "https://restaurantindia.s3.ap-south-1.amazonaws.com/s3fs-public/2022-07/Food%20Menu.jpg",
    projects: [
      {
        id: "food1",
        title: "Gourmet",
        videoSrc: "https://player.vimeo.com/video/1150841154?h=5e2c23db42&autoplay=1",
        thumbnail: "https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=1000&auto=format&fit=crop"
      },
      {
        id: "food2",
        title: "Chef’s Special",
        videoSrc: "https://player.vimeo.com/video/1139642147?h=18c1965fe7&autoplay=1",
        thumbnail: "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?q=80&w=1000&auto=format&fit=crop"
      }
    ]
  },
  {
    id: "promotions",
    category: "Promotions",
    title: "Promotions",
    imageSrc: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/641151494.jpg?k=74ea667970853565b0503bd675936738d08f067267387672c2f6bd32d1a5f0e7&o=",
    projects: [
      {
        id: "promo1",
        title: "Holiday Special",
        videoSrc: "https://player.vimeo.com/video/1146476528?h=b421ca19f3&autoplay=1",
        thumbnail: "https://images.unsplash.com/photo-1560624052-449f5ddf0c31?q=80&w=1000&auto=format&fit=crop"
      }
    ]
  }
];

export default function HospitalitySection() {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [activeCategory, setActiveCategory] = useState(null);
  const [activeProject, setActiveProject] = useState(null);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const containerRef = useRef(null);

  // Smooth mouse tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const springConfig = { damping: 20, stiffness: 100, mass: 0.5 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  const handleMouseMove = useCallback((e) => {
    if (!containerRef.current || activeCategory || activeProject) return; 
    const rect = containerRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  }, [activeCategory, activeProject, mouseX, mouseY]);

  return (
    <section 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setHoveredIndex(null)}
      className="relative w-full min-h-[80vh] bg-[#050505] text-white overflow-hidden pt-24 pb-24 md:pb-48 flex flex-col justify-center select-none"
    >
      {/* Background Layer */}
      <motion.div 
        animate={{ opacity: activeCategory || activeProject ? 0 : 1 }} 
        transition={{ duration: 0.5 }}
        className="absolute inset-0 z-0 flex flex-col justify-center"
      >
        <div className="relative z-10 w-full flex flex-col gap-4 md:gap-10 mt-1 md:mt-0">
          {hospitalityData.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, ease: "easeOut", delay: index * 0.15 }}
              onMouseEnter={() => setHoveredIndex(index)}
              onClick={() => setActiveCategory(item)}
              className="group relative flex flex-row items-center justify-between border-b-0 md:border-b border-zinc-800/60 py-12 md:py-0 md:pb-8 cursor-pointer overflow-hidden md:overflow-visible"
            >
              <div className="absolute inset-0 z-0 block md:hidden pointer-events-none">
                <img
                  src={item.imageSrc}
                  alt={item.title}
                  className="w-full h-full object-cover opacity-60 transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/80" />
              </div>

              <h2 className="relative z-10 text-4xl sm:text-6xl md:text-7xl lg:text-[7rem] font-serif tracking-tighter text-white md:text-zinc-500 transition-all duration-500 ease-out group-hover:text-white group-hover:translate-x-2 md:group-hover:translate-x-6">
                {item.title}
              </h2>

              <div className="relative z-10 flex flex-col items-end opacity-100 md:opacity-0 md:-translate-x-4 transition-all duration-500 ease-out md:group-hover:opacity-100 md:group-hover:translate-x-0">
                <span className="text-[10px] md:text-xs font-bold tracking-widest uppercase text-white/80 md:text-white/70 group-hover:text-white border-b border-transparent group-hover:border-white pb-1 flex items-center gap-2 transition-colors">
                  <span className="hidden sm:inline">View Showreel</span>
                  <span className="sm:hidden">View</span>
                  <svg className="w-3 h-3 transition-transform group-hover:translate-x-1" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Floating Image Portal (Desktop Only) */}
        <motion.div
          style={{
            x: cursorX,
            y: cursorY,
            translateX: "-50%",
            translateY: "-50%",
            rotate: hoveredIndex !== null ? -2 : 0,
          }}
          className="pointer-events-none absolute top-0 left-0 z-0 hidden md:block w-[380px] aspect-[4/5] overflow-hidden shadow-2xl shadow-black/80"
        >
          <motion.div
            animate={{
              opacity: hoveredIndex !== null ? 1 : 0,
              scale: hoveredIndex !== null ? 1 : 0.85,
            }}
            transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
            className="w-full h-full relative bg-zinc-900"
          >
            {hospitalityData.map((item, index) => (
              <img
                key={`portal-${item.id}`}
                src={item.imageSrc}
                alt={item.title}
                decoding="async"
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
                  hoveredIndex === index ? "opacity-100" : "opacity-0"
                }`}
              />
            ))}
            <div className="absolute inset-0 bg-black/20" />
          </motion.div>
        </motion.div>
      </motion.div>

      {/* --- CATEGORY PROJECT LIST --- */}
      <AnimatePresence>
        {activeCategory && !activeProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black flex flex-col h-screen overflow-hidden pt-24"
          >
            <div className="absolute top-0 left-0 w-full z-20 flex justify-between items-center p-6 md:p-12 pointer-events-none text-white mt-24 md:mt-12 bg-gradient-to-b from-black/80 to-transparent">
              <h2 className="text-3xl md:text-5xl lg:text-7xl font-serif tracking-tighter drop-shadow-lg">
                {activeCategory.title}
              </h2>
              <button
                onClick={() => setActiveCategory(null)}
                className="pointer-events-auto group flex items-center gap-4 text-xs font-bold tracking-widest uppercase hover:text-white/70 transition-colors"
              >
                <span className="hidden sm:block">Close</span>
                <div className="w-10 h-10 md:w-12 md:h-12 border border-white flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all duration-300 bg-black/40">
                  <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </div>
              </button>
            </div>

            <div className={`group flex flex-col md:flex-row w-full h-full`}>
              {activeCategory.projects.map((proj) => (
                <motion.div
                  key={proj.id}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  onClick={() => { setActiveProject(proj); setIsVideoLoaded(false); }}
                  className="relative flex-1 cursor-pointer overflow-hidden border-b border-zinc-900 md:border-b-0 md:border-r last:border-0 hover:!opacity-100 group-hover:opacity-30 transition-all duration-500 ease-out"
                >
                  <img
                    src={proj.thumbnail}
                    alt={proj.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 ease-out hover:scale-105 saturate-50 hover:saturate-100"
                  />
                  <div className="absolute inset-0 bg-black/40 hover:bg-black/10 transition-colors duration-500" />
                  
                  <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-12">
                    <h3 className="text-4xl md:text-6xl lg:text-8xl font-serif tracking-tighter translate-y-4 hover:translate-y-0 transition-transform duration-500">
                      {proj.title}
                    </h3>
                    <div className="mt-6 w-12 h-12 border border-white/50 flex items-center justify-center backdrop-blur-sm opacity-0 hover:opacity-100 transition-all duration-500 translate-y-4 hover:translate-y-0">
                      <svg className="w-4 h-4 ml-1 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- CLEAN FULL SCREEN VIDEO MODAL --- */}
      <AnimatePresence>
        {activeProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[60] bg-black/95 backdrop-blur-md flex items-center justify-center p-4 md:p-10"
            onClick={() => setActiveProject(null)} // Clicking background closes modal
          >
            {/* Simple Close Button */}
            <button
              onClick={() => setActiveProject(null)}
              className="absolute top-6 right-6 md:top-10 md:right-10 z-[70] w-12 h-12 rounded-full border border-white/20 bg-black/50 hover:bg-white text-white hover:text-black flex items-center justify-center transition-all duration-300 backdrop-blur-md"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* VIMEO IFRAME */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ opacity: isVideoLoaded ? 1 : 0, scale: isVideoLoaded ? 1 : 0.95 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="relative w-full max-w-7xl aspect-video rounded-lg overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.8)] bg-black"
              onClick={(e) => e.stopPropagation()} // Prevents clicking the video from closing the modal
            >
              <iframe
                src={activeProject.videoSrc}
                onLoad={() => setIsVideoLoaded(true)}
                allow="autoplay; fullscreen; picture-in-picture"
                className="absolute inset-0 w-full h-full border-0"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}