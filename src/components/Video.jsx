import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";

const Video = () => {
  return (
    <section 
      id="films" 
      className="relative w-full py-24 px-6 md:px-12 lg:px-24 bg-white border-t border-gray-100 font-sans overflow-hidden"
    >
      <div className="max-w-[85rem] mx-auto relative z-10">
        
        {/* --- HEADER SECTION --- */}
        <header className="mb-16 md:mb-20 text-center">
          <motion.span 
            initial={{ opacity: 0, y: 20 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5 }}
            className="text-xs uppercase tracking-[0.4em] text-gray-400 font-semibold mb-4 block"
          >
            Cinematography
          </motion.span>
          
          <motion.h2 
            initial={{ opacity: 0, y: 30 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-6xl font-light text-gray-900 mb-6 tracking-tight"
          >
            Motion Pictures
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-2xl mx-auto text-gray-500 text-base leading-relaxed"
          >
            Every wedding is a story in motion. From the fleeting glances to the final dance, we capture the rhythm, sound, and raw emotion of your day.
          </motion.p>
        </header>

        {/* --- NATIVE VIDEO CONTAINER --- */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative w-full aspect-[4/5] md:aspect-video rounded-sm overflow-hidden bg-gray-100 shadow-sm border border-gray-100 group"
        >
          {/* Subtle overlay for styling */}
          <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors duration-700 z-10 pointer-events-none" />

          {/* HTML5 VIDEO TAG 
              Using autoPlay, loop, muted, and playsInline guarantees it plays automatically 
              on all browsers and mobile devices.
          */}
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-105"
          >
            {/* Replace this src with your actual video file link (e.g., from your hosting or AWS) */}
            <source src="https://cdn.pixabay.com/video/2020/05/21/40047-424619478_large.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>

          {/* Floating Badge */}
          <div className="absolute bottom-6 left-6 z-20 flex items-center gap-3">
            <div className="w-10 h-10 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center text-gray-900 shadow-lg">
               <Play size={14} className="ml-0.5" />
            </div>
            <span className="bg-white/90 backdrop-blur-md text-gray-900 px-4 py-2.5 rounded-full text-[9px] font-bold uppercase tracking-[0.2em] shadow-sm">
              Featured Reel
            </span>
          </div>
        </motion.div>

        {/* --- CALL TO ACTION BUTTON --- */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 flex justify-center"
        >
          <button className="flex items-center gap-3 px-10 py-5 bg-gray-900 text-white rounded-full text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-gray-800 transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5">
            Watch More Films <ArrowRight size={14} />
          </button>
        </motion.div>

      </div>
    </section>
  );
};

export default Video;