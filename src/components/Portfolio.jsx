import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

const Portfolio = () => {
    const location = useLocation();

    useEffect(() => {
        if (location.hash) {
            const element = document.getElementById(location.hash.substring(1));
            if (element) {
                // adding a slight delay ensures page renders before scrolling
                setTimeout(() => {
                    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }, 100);
            }
        } else {
            window.scrollTo(0, 0);
        }
    }, [location]);

    return (
        <div className="bg-[#050505] min-h-screen text-white pt-32 pb-20 px-4 md:px-8">
            {/* Hero / Intro */}
            <section className="max-w-7xl mx-auto mb-32 text-center">
                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="text-5xl md:text-8xl font-serif mb-6 tracking-tighter underline decoration-1 underline-offset-8 decoration-white/20"
                >
                    Portfolio
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.8 }}
                    className="text-zinc-400 max-w-2xl mx-auto text-lg md:text-xl font-light"
                >
                    A curated selection of our finest works across multiple disciplines. Dive into the visual stories we've crafted.
                </motion.p>
            </section>

            {/* Hospitality Section */}
            <section id="hospitality" className="max-w-7xl mx-auto mb-32 pt-20 scroll-mt-24">
                <div className="border-t border-white/20 pt-12 mb-16 flex flex-col md:flex-row justify-between items-start md:items-end">
                    <h2 className="text-4xl md:text-7xl font-serif tracking-tighter">Hospitality</h2>
                    <p className="text-zinc-400 mt-4 md:mt-0 max-w-md md:text-right font-light">
                        Crafting atmospheric visual experiences for the world's most luxurious bars, culinary concepts, and promotional campaigns.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Bars */}
                    <div className="group cursor-pointer">
                        <div className="overflow-hidden mb-6 aspect-[3/4] bg-zinc-900 border border-zinc-800 shadow-xl relative">
                            <img 
                                src="https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=800&q=80" 
                                alt="Bars" 
                                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 opacity-90 group-hover:opacity-100 grayscale-[30%] group-hover:grayscale-0" 
                            />
                            <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
                        </div>
                        <h3 className="text-3xl font-serif mb-2 tracking-wide">Bars</h3>
                        <p className="text-zinc-500 text-sm tracking-wide">Atmospheric and intimate spaces.</p>
                    </div>

                    {/* Food */}
                    <div className="group cursor-pointer md:mt-16">
                        <div className="overflow-hidden mb-6 aspect-[3/4] bg-zinc-900 border border-zinc-800 shadow-xl relative">
                            <img 
                                src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=800&q=80" 
                                alt="Food" 
                                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 opacity-90 group-hover:opacity-100 grayscale-[30%] group-hover:grayscale-0" 
                            />
                            <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
                        </div>
                        <h3 className="text-3xl font-serif mb-2 tracking-wide">Food</h3>
                        <p className="text-zinc-500 text-sm tracking-wide">Culinary artistry in motion.</p>
                    </div>

                    {/* Promotions */}
                    <div className="group cursor-pointer md:mt-32">
                        <div className="overflow-hidden mb-6 aspect-[3/4] bg-zinc-900 border border-zinc-800 shadow-xl relative">
                            <img 
                                src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80" 
                                alt="Promotions" 
                                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 opacity-90 group-hover:opacity-100 grayscale-[30%] group-hover:grayscale-0" 
                            />
                            <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
                        </div>
                        <h3 className="text-3xl font-serif mb-2 tracking-wide">Promotions</h3>
                        <p className="text-zinc-500 text-sm tracking-wide">Engaging events and vibrant campaigns.</p>
                    </div>
                </div>
            </section>

        </div>
    );
};

export default Portfolio;
