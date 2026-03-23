import React, { useEffect } from "react";
import { motion } from "framer-motion";

const team = [
  {
    name: "Sarah Jenkins",
    role: "Director of Photography",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&h=1000",
    description: "Award-winning cinematographer with a keen eye for dramatic lighting and dynamic composition.",
  },
  {
    name: "David Chen",
    role: "Production Designer",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&h=1000",
    description: "Creating immersive worlds that ground every narrative in rich, tactile reality.",
  },
  {
    name: "Elena Rodriguez",
    role: "Editor",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=800&h=1000",
    description: "Master of pacing and rhythm, weaving raw footage into compelling stories.",
  },
  {
    name: "Marcus Thorne",
    role: "Sound Designer",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&h=1000",
    description: "Building sonic landscapes that elevate the emotional resonance of every scene.",
  }
];

export default function Collaborators() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-white selection:text-black pt-32 pb-24 flex flex-col overflow-hidden">
      <div className="flex-1 w-full max-w-7xl mx-auto px-4 md:px-12"> {/* Reduced mobile px slightly */}

        {/* --- HERO SECTION --- */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="mb-24 md:mb-40 flex flex-col md:flex-row md:items-end justify-between gap-8"
        >
          <h1 className="text-5xl md:text-8xl lg:text-[9rem] font-serif tracking-tighter leading-[0.9]">
            The <br />
            <span className="italic font-light text-zinc-500">Roster</span>
          </h1>
          <p className="text-lg md:text-xl text-zinc-400 max-w-md font-light leading-relaxed mb-2 md:text-right">
            Every visionary piece is brought to life through a symphony of talents. Meet the brilliant minds driving cinematic excellence.
          </p>
        </motion.div>

        {/* --- STAGGERED EDITORIAL GRID --- */}
        {/* CHANGED: grid-cols-1 to grid-cols-2 and gap-6 to gap-3 md:gap-12 */}
        <div className="grid grid-cols-2 gap-3 md:gap-12 mb-40">
          {team.map((person, index) => {
            const isEven = index % 2 !== 0;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 100 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                // CHANGED: Added mt-12 for mobile stagger
                className={`group relative w-full aspect-[3/4] rounded-sm overflow-hidden bg-zinc-900 cursor-pointer ${isEven ? 'mt-8 md:mt-32' : ''}`}
              >
                {/* Background Image */}
                <img
                  src={person.image}
                  alt={person.name}
                  className="absolute inset-0 w-full h-full object-cover grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000 scale-100 group-hover:scale-105"
                />

                {/* Cinematic Vignette Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500" />

                {/* Text Content */}
                {/* CHANGED: p-8 to p-4 md:p-8 so it fits on mobile */}
                <div className="absolute inset-0 p-4 md:p-8 flex flex-col justify-end z-10">
                  <div className="overflow-hidden">
                    <motion.p
                      initial={{ y: 20, opacity: 0 }}
                      whileInView={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.2 }}
                      // CHANGED: text-xs to text-[10px] md:text-xs to fit two columns
                      className="text-[10px] md:text-sm text-zinc-400 uppercase tracking-[0.2em] md:tracking-[0.3em] font-bold mb-1 md:mb-2"
                    >
                      {person.role}
                    </motion.p>
                  </div>
                  {/* CHANGED: text-3xl to text-xl md:text-5xl */}
                  <h3 className="text-xl md:text-5xl font-serif tracking-tight text-white mb-2 md:mb-4 leading-tight">
                    {person.name}
                  </h3>

                  {/* Hidden Description that slides up on hover */}
                  {/* Note: On mobile touch devices, hover effects trigger on tap */}
                  <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-[grid-template-rows] duration-500 ease-[0.16,1,0.3,1]">
                    <div className="overflow-hidden">
                      <p className="text-zinc-300 font-light leading-relaxed text-xs md:text-base pt-2 border-t border-zinc-800 hidden md:block">
                        {person.description}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* --- SPLIT "SCRIPT STYLE" FORM SECTION --- */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative bg-zinc-900/20 p-8 md:p-16 lg:p-24 rounded-3xl border border-zinc-800/50 backdrop-blur-2xl overflow-hidden"
        >
          {/* Cinematic lighting gels (background blurs) */}
          <div className="absolute top-0 right-0 -mr-32 -mt-32 w-96 h-96 rounded-full bg-blue-900/20 blur-[120px] pointer-events-none" />
          <div className="absolute bottom-0 left-0 -ml-32 -mb-32 w-96 h-96 rounded-full bg-orange-900/10 blur-[120px] pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
            {/* Left side: Typography & Prompt */}
            <div className="flex flex-col justify-center">
              <h2 className="text-4xl md:text-6xl font-serif tracking-tight mb-6 leading-tight">
                Let's craft <br />
                <span className="italic text-zinc-500 font-light">something timeless.</span>
              </h2>
              <p className="text-zinc-400 font-light text-lg leading-relaxed max-w-md">
                Whether you have a fully boarded concept or just a spark of an idea, drop the details here. Let's build the right team for your brief.
              </p>
            </div>

            {/* Right side: Script-style minimalist form */}
            <form className="space-y-10" onSubmit={(e) => { e.preventDefault(); alert('Form submitted! (Demo)'); }}>
              <div className="relative group">
                <input type="text" id="name" placeholder="Your Name" required className="w-full bg-transparent border-b border-zinc-700 py-3 text-white placeholder-zinc-600 focus:outline-none focus:border-white transition-colors font-light text-lg peer" />
              </div>
              <div className="relative group">
                <input type="email" id="email" placeholder="Email Address" required className="w-full bg-transparent border-b border-zinc-700 py-3 text-white placeholder-zinc-600 focus:outline-none focus:border-white transition-colors font-light text-lg" />
              </div>
              <div className="relative group">
                <input type="text" id="role" placeholder="Project Type (e.g., Commercial, Music Video)" className="w-full bg-transparent border-b border-zinc-700 py-3 text-white placeholder-zinc-600 focus:outline-none focus:border-white transition-colors font-light text-lg" />
              </div>
              <div className="relative group">
                <textarea id="message" rows="3" placeholder="The Vision..." required className="w-full bg-transparent border-b border-zinc-700 py-3 text-white placeholder-zinc-600 focus:outline-none focus:border-white transition-colors font-light text-lg resize-none"></textarea>
              </div>
              <button type="submit" className="group relative overflow-hidden inline-flex items-center justify-center px-8 py-4 bg-white text-black font-medium rounded-full hover:bg-zinc-200 transition-colors duration-300 mt-4 active:scale-[0.98]">
                <span className="relative z-10 tracking-wide uppercase text-sm">Send Proposal</span>
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
}