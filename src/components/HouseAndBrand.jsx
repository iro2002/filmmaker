import React from "react";
import { motion } from "framer-motion";

// --- BRAND IMAGES ---
import b1 from "../images/Brands/l-1.jpeg";
import b2 from "../images/Brands/l-2.jpeg";
import b3 from "../images/Brands/l-3.jpeg";
import b4 from "../images/Brands/l-4.jpeg";
import b6 from "../images/Brands/l-6.png";
import b8 from "../images/Brands/l-8.png";
import b9 from "../images/Brands/l-9.png";
import b10 from "../images/Brands/l-10.png";

import b12 from "../images/Brands/l-12.png";
import b13 from "../images/Brands/l-13.png";
import b14 from "../images/Brands/l-14.png";
import b15 from "../images/Brands/l-15.png";

// --- PRODUCTION HOUSE IMAGES ---
import p0 from "../images/ProductionHouse/p-0.png";
import p1 from "../images/ProductionHouse/p-1.png";
import p2 from "../images/ProductionHouse/p-2.png";
import p3 from "../images/ProductionHouse/p-3.jpeg";
import p4 from "../images/ProductionHouse/p-4.png";

const HouseAndBrand = () => {
  const brands = [b1, b2, b3, b4, b6, b8, b9, b10, b12, b13, b14, b15];
  const productionHouses = [p0, p2, p3, p4];

  return (
    <section className="w-full bg-[#050505] py-20 flex flex-col items-center justify-center overflow-hidden relative z-10">
      <div className="flex flex-col gap-16 md:gap-24 w-full">
        {/* --- SECTION 1: AGENCIES --- */}
        <div>
          {/* Header Section */}
          <div className="text-center mb-8 md:mb-12 z-10 px-4">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-zinc-400 text-sm md:text-base mb-2"
            >
              Working For
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-white text-5xl md:text-7xl font-serif tracking-tighter"
            >
              Agencies & Production Houses
            </motion.h2>
          </div>

          {/* --- PRODUCTION HOUSES MARQUEE --- */}
          <div className="relative w-full flex overflow-hidden group py-4">
            <div className="absolute top-0 left-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-[#050505] to-transparent z-10 pointer-events-none" />
            <div className="absolute top-0 right-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-[#050505] to-transparent z-10 pointer-events-none" />

            <motion.div
              className="flex whitespace-nowrap items-center gap-12 md:gap-24 pr-12 md:pr-24"
              animate={{ x: ["-50%", "0%"] }}
              transition={{ repeat: Infinity, ease: "linear", duration: 35 }}
            >
              {[
                ...productionHouses,
                ...productionHouses,
                ...productionHouses,
                ...productionHouses,
              ].map((logo, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 w-32 md:w-48 h-20 md:h-28 flex items-center justify-center transition-transform duration-500 cursor-pointer hover:scale-110"
                >
                  <img
                    src={logo}
                    alt={`Production House ${index}`}
                    className="max-w-full max-h-full object-contain drop-shadow-lg"
                  />
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* --- SECTION 2: BRANDS --- */}
        <div>
          {/* Header Section */}
          <div className="text-center mb-8 md:mb-12 z-10 px-4">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-white text-5xl md:text-7xl font-serif tracking-tighter mb-2"
            >
              Brands
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-zinc-400 text-sm md:text-base mx-auto"
            >
              Directed for these brands in collaboration with agencies and
              production partners.
            </motion.p>
          </div>

          {/* --- BRANDS MARQUEE --- */}
          <div className="relative w-full flex overflow-hidden group py-4">
            <div className="absolute top-0 left-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-[#050505] to-transparent z-10 pointer-events-none" />
            <div className="absolute top-0 right-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-[#050505] to-transparent z-10 pointer-events-none" />

            <motion.div
              className="flex whitespace-nowrap items-center gap-12 md:gap-24 pl-12 md:pl-24"
              animate={{ x: ["0%", "-50%"] }}
              transition={{ repeat: Infinity, ease: "linear", duration: 35 }}
            >
              {[...brands, ...brands, ...brands, ...brands].map(
                (logo, index) => (
                  <div
                    key={index}
                    className="flex-shrink-0 w-32 md:w-48 h-20 md:h-28 flex items-center justify-center transition-transform duration-500 cursor-pointer hover:scale-110"
                  >
                    <img
                      src={logo}
                      alt={`Brand ${index}`}
                      className="max-w-full max-h-full object-contain drop-shadow-lg"
                    />
                  </div>
                ),
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HouseAndBrand;
