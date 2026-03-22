import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';

// --- DATA ---
const BRANDS = ["HBO", "PORSCHE", "VOGUE", "NIKE", "A24", "SONY", "NETFLIX", "RED BULL"];
const PROD_HOUSES = [
  { name: "Smuggler", location: "Los Angeles / NY" },
  { name: "Iconoclast", location: "Paris / London" },
  { name: "Anonymous Content", location: "Global" },
  { name: "Somesuch", location: "London / LA" }
];
const AWARDS = [
  { title: "Best Cinematography", festival: "Cannes Film Festival", year: "2023" },
  { title: "Official Selection", festival: "Sundance Film Festival", year: "2022" },
  { title: "Grand Jury Prize", festival: "SXSW", year: "2021" }
];

// --- REUSABLE LAUREL SVG ---
const Laurel = ({ className }) => (
  <svg viewBox="0 0 100 100" className={className} fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M47.5,88.9c-8.8-3.1-16.7-8.6-22.9-15.8c-1.3-1.5-2.6-3.1-3.7-4.8c0.7,0.1,1.3,0.1,2,0.1c4.5-0.1,8.7-1.9,12-5 c-4.6,0.3-9-1.3-12.4-4.4c-0.8-0.7-1.5-1.5-2.1-2.4c1.1,0.5,2.3,0.8,3.5,1c4,0.5,8-0.7,11.2-3.3c-4.4-0.1-8.3-2.3-10.7-6 c-0.6-1-1-2.1-1.3-3.2c1.2,0.7,2.5,1.2,3.8,1.4c3.8,0.7,7.6-0.6,10.2-3.4c-4.1-0.6-7.5-3.4-9.2-7.2c-0.4-1-0.7-2.1-0.8-3.2 c1.1,0.8,2.4,1.4,3.7,1.8c3.5,1.1,7.2,0.3,10-2.1c-3.1-1.6-5.4-4.5-6.3-7.9c-0.2-0.8-0.3-1.7-0.3-2.5c0.8,0.9,1.8,1.6,2.9,2.1 c2.8,1.3,6.1,1.1,8.7-0.5c-1.7-2.5-2.2-5.7-1.2-8.6c0.3-0.8,0.7-1.5,1.2-2.2C43.5,23.1,38.8,32.4,38,43c-0.4,5.4,0.9,10.7,3.6,15.2 c3.2,5.3,8,9.4,13.7,11.6V88.9z"/>
    <path d="M52.5,88.9c8.8-3.1,16.7-8.6,22.9-15.8c1.3-1.5,2.6-3.1,3.7-4.8c-0.7,0.1-1.3,0.1-2,0.1c-4.5-0.1-8.7-1.9-12-5 c4.6,0.3,9-1.3,12.4-4.4c0.8-0.7,1.5-1.5,2.1-2.4c-1.1,0.5-2.3,0.8-3.5,1c-4,0.5-8-0.7-11.2-3.3c4.4-0.1,8.3-2.3,10.7-6 c0.6-1,1-2.1,1.3-3.2c-1.2,0.7-2.5,1.2-3.8,1.4c-3.8,0.7-7.6-0.6-10.2-3.4c4.1-0.6,7.5-3.4,9.2-7.2c0.4-1,0.7-2.1,0.8-3.2 c-1.1,0.8-2.4,1.4-3.7,1.8c-3.5,1.1-7.2,0.3-10-2.1c3.1-1.6,5.4-4.5,6.3-7.9c0.2-0.8,0.3-1.7,0.3-2.5c-0.8,0.9-1.8,1.6-2.9,2.1 c-2.8,1.3-6.1,1.1-8.7-0.5c1.7-2.5,2.2-5.7,1.2-8.6c-0.3-0.8-0.7-1.5-1.2-2.2C56.5,23.1,61.2,32.4,62,43c0.4,5.4-0.9,10.7-3.6,15.2 c-3.2,5.3-8,9.4-13.7,11.6V88.9z"/>
  </svg>
);

// --- ANIMATION VARIANTS ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { y: 30, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: 'spring', stiffness: 100, damping: 20 },
  },
};

const brandVariants = {
    hover: {
        scale: 1.1,
        color: "#ffffff",
        transition: { duration: 0.4, ease: "easeOut" }
    }
};

const houseVariants = {
  hidden: itemVariants.hidden,
  visible: itemVariants.visible,
  hover: {
    backgroundColor: "rgba(39, 39, 42, 0.3)", // zinc-800/30
    transition: { duration: 0.3 },
  },
};

const awardVariants = {
    hidden: itemVariants.hidden,
    visible: itemVariants.visible,
    hover: {
        x: 10,
        transition: { duration: 0.3, ease: "easeOut"}
    }
}

const laurelVariants = {
    hover: {
        scale: 1.15,
        rotate: [0, -5, 5, 0],
        color: "#D4AF37", // gold
        transition: { duration: 0.6, ease: "easeInOut" }
    }
}


export default function SocialProof() {
  const mainRef = useRef(null);
  const isInView = useInView(mainRef, { once: true, margin: "-15%" });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  return (
    <section ref={mainRef} className="w-full bg-[#050505] text-white py-24 md:py-32 overflow-hidden border-t border-zinc-900">
      
      {/* ==========================================
          PART 1: THE BRANDS (INTERACTIVE SLIDER)
      ========================================== */}
      <motion.div 
        className="w-full flex flex-col items-center mb-32"
        initial="hidden"
        animate={controls}
        variants={containerVariants}
      >
        <motion.p variants={itemVariants} className="text-zinc-500 text-xs tracking-[0.2em] uppercase mb-10">Trusted by industry leaders</motion.p>
        
        {/* Interactive Slider Container */}
        <div className="w-full flex overflow-hidden relative group cursor-grab active:cursor-grabbing">
          {/* Fades */}
          <div className="absolute inset-y-0 left-0 w-1/5 bg-gradient-to-r from-[#050505] to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-1/5 bg-gradient-to-l from-[#050505] to-transparent z-10 pointer-events-none" />
          
          <motion.div 
            className="flex whitespace-nowrap items-center gap-16 md:gap-24 px-[10vw]"
            drag="x"
            dragConstraints={{ left: -1500, right: 0 }} // Adjust based on content width
            variants={itemVariants}
          >
            {BRANDS.map((brand, i) => (
              <motion.span 
                key={i} 
                className="text-5xl md:text-8xl font-serif tracking-tighter text-zinc-700 select-none"
                variants={brandVariants}
                whileHover="hover"
              >
                {brand}
              </motion.span>
            ))}
          </motion.div>
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-[1.2fr,1fr] gap-24 lg:gap-32">
        
        {/* ==========================================
            PART 2: PRODUCTION HOUSES (INTERACTIVE LIST)
        ========================================== */}
        <motion.div 
          className="flex flex-col"
          initial="hidden"
          animate={controls}
          variants={containerVariants}
        >
          <motion.h3 variants={itemVariants} className="text-zinc-500 text-xs tracking-[0.2em] uppercase mb-10 border-b border-zinc-900 pb-5">Collaborators</motion.h3>
          
          <div className="flex flex-col group/list">
            {PROD_HOUSES.map((house, i) => (
              <motion.div 
                key={i} 
                className="flex justify-between items-center p-6 md:p-8 border-b border-zinc-900/70 text-zinc-400 transition-opacity duration-300 group-hover/list:opacity-50 hover:!opacity-100 cursor-pointer rounded-xl"
                variants={houseVariants}
                whileHover="hover"
              >
                <div className="flex flex-col gap-1">
                    <motion.span 
                        className="text-3xl md:text-4xl lg:text-5xl font-serif tracking-tight text-white"
                        whileHover={{ x: 5, transition: {duration: 0.2}}}
                    >
                        {house.name}
                    </motion.span>
                    <span className="text-xs md:text-sm font-light tracking-widest uppercase text-zinc-500">{house.location}</span>
                </div>
                
                {/* Visual Cue on Hover */}
                <motion.span 
                    className="text-xl text-zinc-700 opacity-0 group-hover:opacity-100 transition-opacity"
                    initial={{ x: -10 }}
                    whileHover={{ x: 0, opacity: 1}}
                >
                    →
                </motion.span>

              </motion.div>
            ))}
          </div>
        </motion.div>


        {/* ==========================================
            PART 3: AWARDS & FESTIVALS (INTERACTIVE LAURELS)
        ========================================== */}
        <motion.div 
          className="flex flex-col"
          initial="hidden"
          animate={controls}
          variants={containerVariants}
        >
          <motion.h3 variants={itemVariants} className="text-zinc-500 text-xs tracking-[0.2em] uppercase mb-10 border-b border-zinc-900 pb-5">Accolades</motion.h3>
          
          <div className="flex flex-col gap-10 md:gap-12">
            {AWARDS.map((award, i) => (
              <motion.div 
                key={i} 
                className="flex items-start gap-6 md:gap-8 group/award cursor-default"
                variants={awardVariants}
                whileHover="hover"
              >
                
                {/* SVG Laurel Graphic with Animation */}
                <motion.div
                    className="flex-shrink-0 pt-1"
                    variants={laurelVariants}
                >
                    <Laurel className="w-16 h-16 md:w-20 md:h-20 text-zinc-800 transition-colors duration-300 group-hover/award:text-[#D4AF37]" />
                </motion.div>
                
                <div className="flex flex-col gap-2">
                  <motion.span 
                    className="text-2xl md:text-3xl font-serif text-white leading-tight"
                    whileHover={{ color: "#D4AF37", transition: { duration: 0.3 } }}
                  >
                    {award.title}
                  </motion.span>
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1 text-sm md:text-base">
                    <span className="text-zinc-400 italic font-light">{award.festival}</span>
                    <span className="text-zinc-600">— {award.year}</span>
                  </div>
                </div>

              </motion.div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
}