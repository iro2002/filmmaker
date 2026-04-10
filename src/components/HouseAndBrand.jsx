import React from 'react';
import { motion } from 'framer-motion';

// --- BRAND IMAGES ---
import b1 from '../images/Brands/l-1.jpeg';
import b2 from '../images/Brands/l-2.jpeg';
import b3 from '../images/Brands/l-3.jpeg';
import b4 from '../images/Brands/l-4.jpeg';
import b6 from '../images/Brands/l-6.png';
import b8 from '../images/Brands/l-8.png';
import b9 from '../images/Brands/l-9.png';

// --- PRODUCTION HOUSE IMAGES ---
import p11 from '../images/ProductionHouse/p-1-1.png';
import p1 from '../images/ProductionHouse/p-1.png';
import p2 from '../images/ProductionHouse/p-2.png';
import p3 from '../images/ProductionHouse/p-3.jpeg';
import p4 from '../images/ProductionHouse/p-4.png';
import p5 from '../images/ProductionHouse/p-5.png';
import p6 from '../images/ProductionHouse/p-6.png';
import p7 from '../images/ProductionHouse/p-7.png';


const HouseAndBrand = () => {
  const brands = [b1, b2, b3, b4, b6, b8, b9];
  const productionHouses = [p11, p1, p2, p3, p4, p5, p6, p7];

  return (
    <section className="w-full bg-[#050505] py-20 md:py-32 overflow-hidden relative z-10">

      {/* SECTION HEADER */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 mb-16 text-center">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-zinc-500 tracking-[0.3em] text-sm uppercase mb-4"
        >
          Trusted By
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-5xl md:text-8xl font-serif text-white tracking-tighter"
        >
          Brands & Production Houses
        </motion.h2>
      </div>

      <div className="flex flex-col gap-12 md:gap-16">

        {/* --- BRANDS MARQUEE (Moving Left) --- */}
        <div className="relative w-full flex overflow-hidden group py-4">
          {/* Edge Gradients for Smooth In/Out Fade */}
          <div className="absolute top-0 left-0 bottom-0 w-16 md:w-48 bg-gradient-to-r from-[#050505] to-transparent z-10 pointer-events-none" />
          <div className="absolute top-0 right-0 bottom-0 w-16 md:w-48 bg-gradient-to-l from-[#050505] to-transparent z-10 pointer-events-none" />

          <motion.div
            className="flex whitespace-nowrap items-center gap-12 md:gap-24 pl-12 md:pl-24"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ repeat: Infinity, ease: "linear", duration: 35 }}
          >
            {[...brands, ...brands, ...brands, ...brands].map((logo, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-32 md:w-48 h-20 md:h-28 flex items-center justify-center transition-transform duration-500 cursor-pointer hover:scale-110"
              >
                <img src={logo} alt={`Brand ${index}`} className="max-w-full max-h-full object-contain drop-shadow-lg" />
              </div>
            ))}
          </motion.div>
        </div>

        {/* --- PRODUCTION HOUSES MARQUEE (Moving Right) --- */}
        <div className="relative w-full flex overflow-hidden group py-4">
          {/* Edge Gradients for Smooth In/Out Fade */}
          <div className="absolute top-0 left-0 bottom-0 w-16 md:w-48 bg-gradient-to-r from-[#050505] to-transparent z-10 pointer-events-none" />
          <div className="absolute top-0 right-0 bottom-0 w-16 md:w-48 bg-gradient-to-l from-[#050505] to-transparent z-10 pointer-events-none" />

          <motion.div
            className="flex whitespace-nowrap items-center gap-12 md:gap-24 pr-12 md:pr-24"
            animate={{ x: ["-50%", "0%"] }}
            transition={{ repeat: Infinity, ease: "linear", duration: 35 }}
          >
            {[...productionHouses, ...productionHouses, ...productionHouses, ...productionHouses, ...productionHouses, ...productionHouses].map((logo, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-32 md:w-48 h-20 md:h-28 flex items-center justify-center transition-transform duration-500 cursor-pointer hover:scale-110"
              >
                <img src={logo} alt={`Production House ${index}`} className="max-w-full max-h-full object-contain drop-shadow-lg" />
              </div>
            ))}
          </motion.div>
        </div>

      </div>
    </section>
  );
};

export default HouseAndBrand;