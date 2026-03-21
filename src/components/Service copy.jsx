import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import FlowingMenu from '../components/FlowingMenu'; 

const Home = () => {
  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const brands = ["NIKE", "RED BULL", "SONY MUSIC", "VOGUE", "PORSCHE", "VICE", "HBO"];

  // Using real high-quality Unsplash placeholders for immediate testing
  const workItems = [
    {text: 'Commercial', image: 'https://images.unsplash.com/photo-1600861194942-f883de0dfe96?auto=format&fit=crop&q=80&w=600&h=400' },
    {text: 'Hospitality', image: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&q=80&w=600&h=400' },
    {text: 'Corporate', image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=600&h=400' },
    {text: 'Events', image: 'https://images.unsplash.com/photo-1511556532299-8f662fc26c06?auto=format&fit=crop&q=80&w=600&h=400' },
    {text: 'Personal Films', image: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&q=80&w=600&h=400' }
  ];

  return (
    <div className="bg-[#030303] min-h-screen text-white font-sans selection:bg-[#9d00ff] selection:text-white overflow-x-hidden">

      

      {/* --- 2. SOCIAL PROOF (Infinite Marquee) --- */}
      <section className="py-12 bg-[#030303] overflow-hidden flex relative z-20">
        <div className="absolute left-0 w-32 h-full bg-gradient-to-r from-[#030303] to-transparent z-10" />
        <div className="absolute right-0 w-32 h-full bg-gradient-to-l from-[#030303] to-transparent z-10" />
        
        <motion.div 
          animate={{ x: [0, -1000] }}
          transition={{ repeat: Infinity, ease: "linear", duration: 20 }}
          className="flex whitespace-nowrap items-center gap-24 px-12"
        >
          {[...brands, ...brands].map((brand, i) => (
            <span key={i} className="text-2xl md:text-4xl font-black tracking-widest text-white/20 uppercase">
              {brand}
            </span>
          ))}
        </motion.div>
      </section>

      {/* --- 3. WORK CATEGORIES (Responsive Flowing Menu) --- */}
      {/* Container is shorter on mobile, 600px on desktop */}
      <div className="relative w-full h-[60vh] min-h-[400px] md:h-[600px] border-y border-white/10">
        <FlowingMenu 
          items={workItems}
          speed={15}
          textColor="#ffffff"
          bgColor="#030303"
          marqueeBgColor="#000000"
          marqueeTextColor="#ffffff"
          borderColor="rgba(255, 255, 255, 0.1)"
        />
      </div>

      

    </div>
  );
};

export default Home;