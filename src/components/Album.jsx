import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

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

export default function SocialProof() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-10%" });

  return (
    <section ref={containerRef} className="w-full bg-[#050505] text-white py-24 md:py-32 overflow-hidden border-t border-zinc-900">
      
      {/* ==========================================
          PART 1: THE BRANDS (INFINITE MARQUEE)
      ========================================== */}
      <div className="w-full flex flex-col items-center mb-32">
        <p className="text-zinc-500 text-xs tracking-[0.2em] uppercase mb-8">Trusted by industry leaders</p>
        
        {/* Marquee Container */}
        <div className="w-full flex overflow-hidden relative">
          {/* Left/Right Fade Masks so it blends into the black background */}
          <div className="absolute inset-y-0 left-0 w-1/6 bg-gradient-to-r from-[#050505] to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-1/6 bg-gradient-to-l from-[#050505] to-transparent z-10 pointer-events-none" />
          
          <motion.div 
            className="flex whitespace-nowrap items-center gap-16 md:gap-32 pr-16 md:pr-32"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ repeat: Infinity, ease: "linear", duration: 30 }}
          >
            {/* Render the list twice to create a seamless loop */}
            {[...BRANDS, ...BRANDS].map((brand, i) => (
              <span key={i} className="text-4xl md:text-7xl font-serif tracking-tighter text-zinc-700 hover:text-white transition-colors duration-500 cursor-default select-none">
                {brand}
              </span>
            ))}
          </motion.div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 gap-24">
        
        {/* ==========================================
            PART 2: PRODUCTION HOUSES (HOVER LIST)
        ========================================== */}
        <motion.div 
          className="flex flex-col"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h3 className="text-zinc-500 text-xs tracking-[0.2em] uppercase mb-8 border-b border-zinc-900 pb-4">Collaborators</h3>
          
          {/* Group hover handles dimming all items except the hovered one */}
          <div className="flex flex-col group">
            {PROD_HOUSES.map((house, i) => (
              <div 
                key={i} 
                className="flex justify-between items-end py-6 border-b border-zinc-900/50 text-zinc-400 transition-all duration-300 hover:!text-white hover:!opacity-100 group-hover:opacity-30 cursor-pointer"
              >
                <span className="text-2xl md:text-3xl font-serif tracking-tight">{house.name}</span>
                <span className="text-xs md:text-sm font-light tracking-widest uppercase">{house.location}</span>
              </div>
            ))}
          </div>
        </motion.div>


        {/* ==========================================
            PART 3: AWARDS & FESTIVALS (LAURELS)
        ========================================== */}
        <motion.div 
          className="flex flex-col"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        >
          <h3 className="text-zinc-500 text-xs tracking-[0.2em] uppercase mb-8 border-b border-zinc-900 pb-4">Accolades</h3>
          
          <div className="flex flex-col gap-8">
            {AWARDS.map((award, i) => (
              <div key={i} className="flex items-center gap-6 group cursor-default">
                
                {/* SVG Laurel Graphic */}
                <Laurel className="w-16 h-16 md:w-20 md:h-20 text-zinc-700 group-hover:text-[#D4AF37] transition-colors duration-500" />
                
                <div className="flex flex-col">
                  <span className="text-xl md:text-2xl font-serif text-white">{award.title}</span>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-sm text-zinc-400 italic font-light">{award.festival}</span>
                    <span className="text-xs text-zinc-600">— {award.year}</span>
                  </div>
                </div>

              </div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
}