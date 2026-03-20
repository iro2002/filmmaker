import React, { useRef, useState } from "react";
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Import Project 1 Images
import p1_1 from "../images/project1/1.png";
import p1_2 from "../images/project1/2.png";
import p1_3 from "../images/project1/3.png";
import p1_4 from "../images/project1/4.png";
import p1_5 from "../images/project1/5.png";

// Import Project 2 Images
import p2_1 from "../images/project2/1.png";
import p2_2 from "../images/project2/2.png";
import p2_3 from "../images/project2/3.png";
import p2_4 from "../images/project2/4.png";
import p2_5 from "../images/project2/5.png";

// Import Project 3 Images
import p3_1 from "../images/project3/1.png";
import p3_2 from "../images/project3/2.png";
import p3_3 from "../images/project3/3.png";
import p3_4 from "../images/project3/4.png";
import p3_5 from "../images/project3/5.png";

const ALL_PROJECTS = [
  {
    id: 1,
    title: "www.craftgrapher.com",
    description: "Craftgrapher.com is a dynamic e-commerce platform designed to showcase products in a visually engaging and user-friendly manner.",
    images: [p1_1, p1_2, p1_3, p1_4, p1_5],
  },
  {
    id: 2,
    title: "www.tropicalweldlock.com",
    description: "A visually immersive photography website, created to elegantly present photo albums and capture the essence of each moment.",
    images: [p2_1, p2_2, p2_3, p2_4, p2_5],
  },
  {
    id: 3,
    title: "www.thamindugamagephotography.me",
    description: "A professional portfolio website crafted for photographers, providing a refined platform to showcase albums and highlight creative work.",
    images: [p3_1, p3_2, p3_3, p3_4, p3_5],
  },
];

const Projects = () => {
  const [visibleCount, setVisibleCount] = useState(4);
  const [activeIndices, setActiveIndices] = useState({}); 
  const containerRef = useRef(null);
  
  const currentProjects = ALL_PROJECTS.slice(0, visibleCount);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 25,
  });

  const rotateX = useTransform(smoothProgress, [0, 1], [8, -8]);

  const handleSlide = (projectId, direction, max) => {
    setActiveIndices(prev => {
      const current = prev[projectId] || 0;
      if (direction === "next") return { ...prev, [projectId]: (current + 1) % max };
      return { ...prev, [projectId]: (current - 1 + max) % max };
    });
  };

  return (
    <section id="works"
      ref={containerRef} 
      className="relative bg-[#F9FAFB] w-full"
      style={{ minHeight: `${currentProjects.length * 100}vh` }}
    >
      {/* WHITE LIQUID GLASS BACKGROUND */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="sticky top-0 w-full h-screen">
          {/* Liquid Blobs */}
          <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] rounded-full bg-blue-50/60 blur-[120px]" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-indigo-50/50 blur-[100px]" />
          
          {/* Glass Texture Overlay */}
          <div className="absolute inset-0 bg-white/30 backdrop-blur-[1px]" />
          <div className="absolute inset-0 opacity-[0.03]" 
               style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3Base%3B%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}>
          </div>
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="pt-24 md:pt-32 pb-8">
          <p className="text-[10px] font-bold tracking-[0.4em] uppercase text-[#1C0770] mb-2">Our Portfolio</p>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-[#1C0770]">
            Selected <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1C0770] to-blue-500">Works</span>
          </h2>
        </div>

        <div className="flex flex-col lg:flex-row relative">
          {/* STICKY MOCKUP */}
          <div className="sticky top-28 lg:top-0 h-[35vh] lg:h-screen w-full lg:w-1/2 flex items-center justify-center z-[40] pointer-events-none lg:order-2">
            <motion.div style={{ rotateX, perspective: 1200 }} className="relative w-full max-w-[300px] sm:max-w-[420px] lg:max-w-[580px] pointer-events-auto">
              <div className="relative bg-[#0F0F12] rounded-lg p-1.5 lg:p-3 border-[3px] lg:border-[4px] border-[#2A2A2E] shadow-2xl">
                <div className="relative aspect-[16/10] bg-slate-900 rounded-sm overflow-hidden">
                  
                  {currentProjects.map((project, i) => {
                    const step = 1 / currentProjects.length;
                    const start = i * step;
                    const end = (i + 1) * step;
                    
                    const opacity = useTransform(smoothProgress, [start, start + 0.05, end - 0.05, end], [0, 1, 1, 0]);
                    const currentIndex = activeIndices[project.id] || 0;

                    return (
                      <motion.div key={project.id} style={{ opacity }} className="absolute inset-0">
                        <AnimatePresence mode="wait">
                          <motion.img
                            key={currentIndex}
                            src={project.images[currentIndex]}
                            initial={{ x: 40, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            exit={{ x: -40, opacity: 0 }}
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            className="absolute inset-0 w-full h-full object-cover"
                            alt={project.title}
                          />
                        </AnimatePresence>

                        <div className="absolute inset-0 flex items-center justify-between px-2 z-50">
                          <button 
                            onClick={(e) => { e.stopPropagation(); handleSlide(project.id, "prev", project.images.length); }}
                            className="p-1 rounded-full bg-black/40 text-white backdrop-blur-md hover:bg-black/60 transition-colors pointer-events-auto"
                          >
                            <ChevronLeft size={20} />
                          </button>
                          <button 
                            onClick={(e) => { e.stopPropagation(); handleSlide(project.id, "next", project.images.length); }}
                            className="p-1 rounded-full bg-black/40 text-white backdrop-blur-md hover:bg-black/60 transition-colors pointer-events-auto"
                          >
                            <ChevronRight size={20} />
                          </button>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
              <div className="relative w-[104%] h-2 bg-[#1A1A1E] left-[-2%] rounded-b-md border-t border-white/10" />
            </motion.div>
          </div>

          {/* SCROLLING TEXT */}
          <div className="w-full lg:w-1/2 flex flex-col z-10 lg:order-1 mt-[5vh] lg:mt-0">
            {currentProjects.map((project, i) => (
              <div key={project.id} className="min-h-[70vh] lg:min-h-screen flex flex-col justify-end lg:justify-center pb-24 lg:pb-0">
                <motion.div 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ margin: "-15%" }}
                  className="bg-white/80 lg:bg-transparent backdrop-blur-xl lg:backdrop-blur-none p-8 lg:p-0 rounded-xl border border-white/60 lg:border-none shadow-xl lg:shadow-none"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <span className="w-8 h-[2px] bg-gradient-to-r from-[#1C0770] to-blue-500"></span>
                    <span className="text-[#1C0770] font-bold text-xs uppercase tracking-widest">Project 0{i + 1}</span>
                  </div>
                  <h3 className="text-1xl lg:text-2xl font-bold text-[#1A1A1E] mb-4 tracking-tighter">
                    {project.title}
                  </h3>
                  <p className="text-gray-600 text-base lg:text-lg max-w-md mb-8 leading-relaxed font-medium">
                    {project.description}
                  </p>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};



export default Projects;