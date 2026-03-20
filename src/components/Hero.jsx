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

      {/* --- 1. HERO SHOWREEL --- */}
      <section className="relative h-screen w-full overflow-hidden">
        {/* Real cinematic test video from Mixkit */}
        <video
          autoPlay loop muted playsInline preload="auto"
          className="absolute inset-0 w-full h-full object-cover scale-105 opacity-60"
        >
          <source src="https://assets.mixkit.co/videos/preview/mixkit-set-of-plateaus-seen-from-the-sky-in-a-sunset-26070-large.mp4" type="video/mp4" />
        </video>

        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-[#030303]" />

        <motion.div 
          style={{ y: heroY, opacity: heroOpacity }}
          className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-10"
        >
          <h1 className="text-[10vw] leading-none font-black tracking-tighter uppercase text-white drop-shadow-2xl">
            Cinematic
          </h1>
          <h1 className="text-[10vw] leading-none font-black tracking-tighter uppercase text-transparent stroke-text"
              style={{ WebkitTextStroke: '2px rgba(255,255,255,0.8)' }}>
            Vision
          </h1>
        </motion.div>
      </section>

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
          marqueeBgColor="#9d00ff"
          marqueeTextColor="#ffffff"
          borderColor="rgba(255, 255, 255, 0.1)"
        />
      </div>

      {/* --- 4. LATEST INSIGHTS (Blog SEO Teaser) --- */}
      <section className="py-24 md:py-32 bg-[#030303] container mx-auto px-6 md:px-12 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 md:mb-16 gap-6">
          <div>
            <p className="text-[#9d00ff] tracking-[0.3em] text-xs md:text-sm mb-4 uppercase">Knowledge Base</p>
            <h2 className="text-3xl md:text-5xl font-light text-white">Latest <span className="font-bold">Insights</span></h2>
          </div>
          <a href="/blog" className="text-white/50 hover:text-white tracking-widest uppercase text-xs md:text-sm transition-colors border-b border-white/20 pb-1">
            Read All
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {[
            { tag: "Project Breakdown", title: "Lighting the Neon Protocol: Behind the Scenes", date: "Oct 24" },
            { tag: "Industry", title: "Why Brands Are Moving Towards Documentary-Style Ads", date: "Oct 12" },
            { tag: "Thoughts", title: "The Gear Doesn't Matter (Until It Does)", date: "Sep 30" }
          ].map((post, i) => (
            <motion.a 
              href={`/blog/post-${i}`} 
              key={i}
              whileHover={{ y: -10 }}
              className="group block p-6 md:p-8 bg-white/5 border border-white/10 hover:border-[#9d00ff]/50 transition-all duration-300"
            >
              <p className="text-[10px] md:text-xs text-[#9d00ff] uppercase tracking-widest mb-6">{post.tag}</p>
              <h3 className="text-xl md:text-2xl font-medium text-white mb-8 md:mb-12 group-hover:text-[#9d00ff] transition-colors leading-tight">
                {post.title}
              </h3>
              <p className="text-xs md:text-sm text-white/40 tracking-widest uppercase">{post.date}</p>
            </motion.a>
          ))}
        </div>
      </section>

    </div>
  );
};

export default Home;