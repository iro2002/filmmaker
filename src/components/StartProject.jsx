import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const StartProject = () => {
  const [selectedPath, setSelectedPath] = useState(null); // 'director' | 'creative' | null

  // Scroll to top when page mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleBack = () => {
    setSelectedPath(null);
  };

  return (
    <div className="w-full min-h-screen bg-[#050505] text-white pt-32 pb-20 px-4 md:px-8 font-sans relative z-10 flex flex-col items-center">
      {/* HEADER SECTION */}
      <div className="text-center max-w-2xl mx-auto mb-20">
        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-5xl md:text-7xl font-serif tracking-tighter mb-6"
        >
          Start a Project
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.6, ease: "easeOut" }}
          className="text-zinc-400 text-sm md:text-base leading-relaxed max-w-md mx-auto"
        >
          Tell me about your project. I’ll get back with the best way to approach it.
        </motion.p>
      </div>

      <div className="w-full max-w-4xl mx-auto relative min-h-[450px]">
        <AnimatePresence mode="wait">
          {/* PATH SELECTION */}
          {!selectedPath && (
            <motion.div
              key="selection"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              {/* Option A - Directing */}
              <div className="bg-[#0a0a0a] border border-white/10 p-10 md:p-14 flex flex-col items-start hover:bg-[#111] hover:border-white/30 transition-all duration-500 group">
                <h2 className="text-3xl font-serif mb-4 group-hover:text-white text-zinc-100 transition-colors">Directing</h2>
                <p className="text-lg font-medium text-white mb-3">I’m looking for a director</p>
                <p className="text-zinc-500 text-sm mb-12 flex-1 leading-relaxed">For agency-led or production-backed projects</p>
                <button
                  onClick={() => setSelectedPath("director")}
                  className="w-full py-4 bg-white text-black font-bold text-xs uppercase tracking-widest hover:bg-zinc-300 transition-colors duration-300"
                >
                  Proceed as Director
                </button>
              </div>

              {/* Option B - Creative Production */}
              <div className="bg-[#0a0a0a] border border-white/10 p-10 md:p-14 flex flex-col items-start hover:bg-[#111] hover:border-white/30 transition-all duration-500 group">
                <h2 className="text-3xl font-serif mb-4 group-hover:text-white text-zinc-100 transition-colors">Creative Production</h2>
                <p className="text-lg font-medium text-white mb-3">I have a project and need creative + execution</p>
                <p className="text-zinc-500 text-sm mb-12 flex-1 leading-relaxed">For select concept-driven films and campaigns</p>
                <button
                  onClick={() => setSelectedPath("creative")}
                  className="w-full py-4 bg-white text-black font-bold text-xs uppercase tracking-widest hover:bg-zinc-300 transition-colors duration-300"
                >
                  Proceed with Details
                </button>
              </div>
            </motion.div>
          )}

          {/* FORM SECTION */}
          {selectedPath && (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="w-full max-w-2xl mx-auto bg-[#0a0a0a] border border-white/10 p-8 md:p-12"
            >
              <button
                onClick={handleBack}
                className="text-zinc-500 text-xs uppercase tracking-widest font-semibold flex items-center gap-3 hover:text-white transition-colors duration-300 mb-10"
              >
                <span className="text-lg leading-none mb-[2px]">←</span> Back to selection
              </button>

              <h2 className="text-3xl font-serif mb-8 text-white pb-6 border-b border-white/10">
                {selectedPath === "director" ? "Director Inquiry" : "Creative Production Inquiry"}
              </h2>

              <form className="flex flex-col gap-6">
                <div className="flex flex-col md:flex-row gap-6">
                  <input
                    type="text"
                    placeholder="Name"
                    required
                    className="w-full bg-[#0f0f0f] border border-white/10 px-5 py-4 text-white text-sm placeholder:text-zinc-600 focus:outline-none focus:border-white focus:ring-1 focus:ring-white transition-all duration-300"
                  />
                  <input
                    type="text"
                    placeholder={selectedPath === "director" ? "Company / Agency" : "Brand / Company"}
                    required
                    className="w-full bg-[#0f0f0f] border border-white/10 px-5 py-4 text-white text-sm placeholder:text-zinc-600 focus:outline-none focus:border-white focus:ring-1 focus:ring-white transition-all duration-300"
                  />
                </div>

                <input
                  type="text"
                  placeholder={selectedPath === "director" ? "Project type" : "Project goal"}
                  required
                  className="w-full bg-[#0f0f0f] border border-white/10 px-5 py-4 text-white text-sm placeholder:text-zinc-600 focus:outline-none focus:border-white focus:ring-1 focus:ring-white transition-all duration-300"
                />

                {selectedPath === "creative" && (
                  <input
                    type="text"
                    placeholder="Deliverables"
                    required
                    className="w-full bg-[#0f0f0f] border border-white/10 px-5 py-4 text-white text-sm placeholder:text-zinc-600 focus:outline-none focus:border-white focus:ring-1 focus:ring-white transition-all duration-300"
                  />
                )}

                <div className="flex flex-col md:flex-row gap-6">
                  <input
                    type="text"
                    placeholder="Timeline"
                    required
                    className="w-full bg-[#0f0f0f] border border-white/10 px-5 py-4 text-white text-sm placeholder:text-zinc-600 focus:outline-none focus:border-white focus:ring-1 focus:ring-white transition-all duration-300"
                  />
                  <input
                    type="text"
                    placeholder={selectedPath === "director" ? "Budget range (optional)" : "Budget range"}
                    required={selectedPath === "creative"}
                    className="w-full bg-[#0f0f0f] border border-white/10 px-5 py-4 text-white text-sm placeholder:text-zinc-600 focus:outline-none focus:border-white focus:ring-1 focus:ring-white transition-all duration-300"
                  />
                </div>

                <textarea
                  placeholder="Message"
                  required
                  rows={5}
                  className="w-full bg-[#0f0f0f] border border-white/10 px-5 py-4 text-white text-sm placeholder:text-zinc-600 focus:outline-none focus:border-white focus:ring-1 focus:ring-white transition-all duration-300 resize-y min-h-[140px]"
                ></textarea>

                <button
                  type="button"
                  className="w-full bg-white text-black font-bold text-xs uppercase tracking-widest py-5 mt-4 hover:bg-zinc-300 hover:shadow-[0_0_20px_rgba(255,255,255,0.1)] transition-all duration-300"
                >
                  Submit Project Details
                </button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* FOOTER NOTE */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="text-zinc-600 text-xs md:text-sm text-center max-w-lg mt-20 px-4 leading-relaxed"
      >
        Projects are developed in collaboration with trusted production partners and teams, depending on the scope and requirements.
      </motion.p>
    </div>
  );
};

export default StartProject;