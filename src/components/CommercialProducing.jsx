import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

// --- THE NEW, BULLETPROOF STACK CARD ---
const StackCard = ({ item, i, progress, range, targetScale }) => {
  const cardRef = useRef(null);

  // Parallax for the image inside the card
  const { scrollYProgress: cardScroll } = useScroll({
    target: cardRef,
    offset: ["start end", "start start"],
  });
  const imageScale = useTransform(cardScroll, [0, 1], [1.4, 1]);

  // The dynamic scale that shrinks the card as you scroll past it
  const scale = useTransform(progress, range, [1, targetScale]);

  return (
    // 1. Each card gets a full screen height (h-screen)
    // 2. We make THIS wrapper sticky, so it pins to the top while the user keeps scrolling
    <div className="h-screen flex items-center justify-center sticky top-0">
      <motion.div
        ref={cardRef}
        style={{
          scale,
          // This top offset pushes each subsequent card down slightly so they look like a deck of cards
          top: `calc(5vh + ${i * 30}px)`, 
        }}
        // CHANGED: Increased width/height significantly and removed all rounded corner classes
        className="relative w-[95vw] max-w-[1600px] h-[85vh] bg-zinc-900 rounded-none overflow-hidden shadow-2xl origin-top border border-zinc-800 group"
      >
        <motion.div className="absolute inset-0 w-full h-full overflow-hidden">
          <motion.img
            src={item.img}
            alt={item.title}
            style={{ scale: imageScale }}
            className="w-full h-full object-cover grayscale opacity-60 group-hover:opacity-100 group-hover:scale-105 group-hover:grayscale-0 transition-all duration-1000 ease-[0.25,1,0.5,1] rounded-none"
          />
        </motion.div>
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent pointer-events-none group-hover:bg-black/40 transition-colors duration-700" />

        <div className="absolute bottom-10 left-8 md:bottom-16 md:left-16 pointer-events-none">
          <div className="overflow-hidden mb-2">
            <span className="block text-zinc-400 font-serif text-3xl md:text-4xl">
              0{i + 1}
            </span>
          </div>
          <div className="overflow-hidden">
            <h3 className="text-4xl md:text-7xl font-medium tracking-tight leading-tight text-white">
              {item.title}
            </h3>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default function CommercialProducing() {
  const containerRef = useRef(null);
  
  // Ref for the entire stacked section to track overall progress
  const stackContainerRef = useRef(null); 

  const { scrollYProgress: mainScroll } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const introImageScale = useTransform(mainScroll, [0, 0.2], [1.2, 1]);
  const introImageOpacity = useTransform(mainScroll, [0, 0.15, 0.2], [1, 1, 0]);
  const introTextY = useTransform(mainScroll, [0, 0.2], ["0%", "-50%"]);

  // Track the scroll of the stack section
  const { scrollYProgress: stackProgress } = useScroll({
    target: stackContainerRef,
    offset: ["start start", "end end"],
  });

  const approaches = [
    { title: "Project understanding", img: "https://images.unsplash.com/photo-1601506521937-0121a7fc2a6b?q=80&w=1000&auto=format&fit=crop" },
    { title: "Director selection", img: "https://images.unsplash.com/photo-1534330207526-8e81f10ece37?q=80&w=1000&auto=format&fit=crop" },
    { title: "Crew & resource", img: "https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?q=80&w=1000&auto=format&fit=crop" },
    { title: "Production execution", img: "https://images.unsplash.com/photo-1526715494490-6761bd9e6615?q=80&w=1000&auto=format&fit=crop" },
    { title: "Final delivery", img: "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?q=80&w=1000&auto=format&fit=crop" }
  ];

  const responsibilities = [
    "Understanding the brief and project requirements",
    "Creating production plans and scalable budgets",
    "Organizing and managing teams, equipment, and locations",
    "Coordinating pre-production and preparing PPM decks",
    "Managing timelines with ADs and key crew",
    "Maintaining budget control while ensuring production quality",
    "Overseeing post-production, revisions, and final delivery"
  ];

  return (
        <div 
        id="commercial"
        ref={containerRef} 
        className="relative bg-[#050505] text-white font-sans scroll-mt-24"
        >
            
      {/* --- SCENE 1: THE CINEMATIC INTRO --- */}
      <div className="h-[150vh] relative">
        <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
          <motion.div 
            style={{ scale: introImageScale, opacity: introImageOpacity }}
            className="absolute inset-0 w-full h-full"
          >
            <div className="absolute inset-0 bg-black/40 z-10" />
            <img 
              src="https://images.unsplash.com/photo-1594122230689-45899d9e6f69?q=80&w=2000&auto=format&fit=crop" 
              alt="Set" 
              className="w-full h-full object-cover grayscale opacity-60"
            />
          </motion.div>

          <motion.div 
            style={{ y: introTextY }}
            className="relative z-20 mix-blend-difference px-4 text-center pointer-events-none"
          >
            <h1 className="text-[12vw] font-serif uppercase tracking-tighter leading-[0.85] text-white">
              Commercial
              <br />
              <span className="italic font-light lowercase text-[14vw] text-zinc-300">Producing.</span>
            </h1>
          </motion.div>
        </div>
      </div>

      {/* --- SCENE 2: THE APPROACH (BULLETPROOF SCROLL STACK) --- */}
      <div className="relative z-30 bg-[#050505] px-4 md:px-10">
        <div className="max-w-[1600px] mx-auto pt-32 pb-10">
          <h2 className="text-5xl md:text-8xl font-serif tracking-tighter">The Approach</h2>
        </div>

        {/* This container tracks the overall stack progress */}
        <div ref={stackContainerRef} className="relative w-full pb-[10vh]">
          {approaches.map((item, i) => {
            // Math to calculate when each card should start scaling down
            const targetScale = 1 - ((approaches.length - i) * 0.05);
            return (
              <StackCard 
                key={i} 
                item={item} 
                i={i} 
                progress={stackProgress}
                // Range determines when this specific card starts shrinking
                range={[i * (1 / approaches.length), 1]}
                targetScale={targetScale}
              />
            );
          })}
        </div>
      </div>

      {/* --- SCENE 3: WHAT MAKES IT DIFFERENT --- */}
      {/* We add a solid background and high z-index so it scrolls OVER the sticky stack */}
      <div className="py-32 md:py-64 px-6 md:px-20 relative bg-[#050505] z-40">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
          <div className="relative h-[60vh] w-full overflow-hidden rounded-none">
            <motion.img 
              initial={{ y: -50, scale: 1.1 }}
              whileInView={{ y: 0, scale: 1 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              viewport={{ once: true, margin: "-100px" }}
              src="https://images.unsplash.com/photo-1518134346374-184f9d21cea2?q=80&w=1000&auto=format&fit=crop"
              className="w-full h-full object-cover grayscale rounded-none"
            />
          </div>
          <div>
            <h2 className="text-4xl md:text-6xl font-serif mb-8">What Makes My Approach <span className="italic text-zinc-500">Different.</span></h2>
            <p className="text-xl md:text-2xl text-zinc-300 font-light leading-relaxed">
              I bring together the right director, team, and resources based on what the project actually needs—ensuring the final output aligns with both creative and commercial goals.
            </p>
          </div>
        </div>
      </div>

      {/* --- SCENE 4: WHAT I HANDLE --- */}
      <div className="py-32 bg-[#111] px-6 md:px-20 border-t border-zinc-900 z-40 relative">
        <h2 className="text-5xl md:text-8xl font-serif text-center mb-24 tracking-tighter">
          What I <span className="italic text-zinc-500">Handle</span>
        </h2>
        <div className="max-w-5xl mx-auto flex flex-col relative z-10">
          {responsibilities.map((item, i) => (
            <div key={i} className="group relative border-b border-zinc-800 py-8 flex flex-col md:flex-row md:items-center gap-6 cursor-crosshair hover:border-zinc-400 transition-colors">
              <span className="text-zinc-600 font-serif text-xl md:text-2xl w-12">0{i + 1}</span>
              <p className="text-2xl md:text-4xl font-light text-zinc-400 group-hover:text-white transition-colors duration-300">
                {item}
              </p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}