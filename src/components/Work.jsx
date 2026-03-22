import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

// Note: I've added placeholder cinematic Unsplash images for each category.
// You can replace these URLs with your actual video thumbnails or project images.
const works = [
  { 
    id: "01", 
    title: "Commercial / Ads", 
    image: "https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?q=80&w=1600&auto=format&fit=crop", 
    link: "/commercial-producing" // Linking to the page we just made!
  },
  { 
    id: "02", 
    title: "Hospitality / Lifestyle", 
    image: "https://images.unsplash.com/photo-1542314831-c6a4d14b8fc4?q=80&w=1600&auto=format&fit=crop", 
    link: "/" 
  },
  { 
    id: "03", 
    title: "Corporate", 
    image: "https://images.unsplash.com/photo-1664575602276-faa070058e41?q=80&w=1600&auto=format&fit=crop", 
    link: "/" 
  },
  { 
    id: "04", 
    title: "Events", 
    image: "https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=1600&auto=format&fit=crop", 
    link: "/" 
  },
  { 
    id: "05", 
    title: "Personal Films", 
    image: "https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=1600&auto=format&fit=crop", 
    link: "/" 
  }
];

export default function WorkSections() {
  // State to track which item is currently being hovered
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="relative bg-[#050505] min-h-screen py-32 md:py-48 px-4 md:px-12 flex items-center border-t border-zinc-900">
      
      {/* BACKGROUND IMAGE PREVIEW (Desktop Only) */}
      <div className="hidden md:block absolute top-1/2 left-[55%] -translate-y-1/2 w-[35vw] h-[60vh] pointer-events-none z-0 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.img
            key={activeIndex}
            initial={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
            animate={{ opacity: 0.6, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
            src={works[activeIndex].image}
            alt={works[activeIndex].title}
            className="w-full h-full object-cover grayscale"
          />
        </AnimatePresence>
        {/* Gradient overlay to blend the image into the background */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-transparent to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent" />
      </div>

      {/* FOREGROUND LIST */}
      <div className="relative z-10 w-full max-w-7xl mx-auto">
        
        <div className="mb-16 md:mb-24">
          <h2 className="text-sm tracking-widest uppercase text-zinc-500 font-sans mb-4">
            Selected Work
          </h2>
          <p className="text-3xl md:text-5xl font-serif text-white max-w-2xl leading-tight">
            A diverse portfolio spanning <span className="italic text-zinc-400 font-light">multiple disciplines</span>.
          </p>
        </div>

        <div className="flex flex-col w-full md:w-1/2">
          {works.map((item, index) => (
            <Link 
              to={item.link} 
              key={item.id}
              onMouseEnter={() => setActiveIndex(index)}
              className="group relative flex flex-col md:flex-row md:items-baseline gap-2 md:gap-8 py-8 md:py-10 border-b border-zinc-800 hover:border-zinc-400 transition-colors duration-500"
            >
              {/* Number */}
              <span className="text-zinc-600 font-serif text-lg md:text-2xl transition-colors duration-500 group-hover:text-white">
                {item.id}
              </span>
              
              {/* Title */}
              <h3 className="text-4xl md:text-6xl font-serif text-zinc-400 transition-all duration-500 group-hover:text-white group-hover:translate-x-4">
                {item.title}
              </h3>

              {/* Mobile Image (Shows only on small screens) */}
              <div className="md:hidden mt-4 w-full h-48 overflow-hidden">
                <img 
                  src={item.image} 
                  alt={item.title}
                  className="w-full h-full object-cover grayscale opacity-50 group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-700"
                />
              </div>
            </Link>
          ))}
        </div>

      </div>
    </div>
  );
}