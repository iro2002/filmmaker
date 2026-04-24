import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

// Import the local image from your src folder
import manthilaImg from '../images/manthila.png';

const Abouth = () => {
    return (
        <section id="about" className="w-full bg-[#050505] py-24 md:py-32 px-4 md:px-8 relative z-10 overflow-hidden">
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-16 md:gap-20">

                {/* --- CREATIVE IMAGE SECTION --- */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="w-full md:w-1/2 relative flex justify-center"
                >
                    <div className="relative w-full max-w-sm md:max-w-md aspect-[4/5] group">

                        {/* 1. Background Ambient Glow - Hidden on mobile to prevent GPU lag */}
                        <div className="hidden md:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-zinc-600/20 blur-[80px] -z-20 transition-all duration-700 group-hover:bg-zinc-500/30"></div>

                        {/* 2. Offset Wireframe Border (Shifts on hover) - Sharp corners */}
                        <div className="absolute top-6 left-6 w-full h-full border-2 border-zinc-800 z-0 transition-all duration-500 group-hover:top-8 group-hover:left-8 group-hover:border-zinc-700"></div>

                        {/* 3. Floating Image Container */}
                        <motion.div
                            animate={{ y: [0, -12, 0] }}
                            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                            className="relative w-full h-full z-10 will-change-transform"
                        >
                            {/* Full Color Image - Sharp corners */}
                            <img
                                src={manthilaImg}
                                alt="Portrait of Manthila"
                                className="w-full h-full object-cover shadow-2xl md:shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-zinc-800/50"
                            />

                            {/* Bottom Gradient for depth - Sharp corners */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80 pointer-events-none"></div>
                        </motion.div>

                        {/* 4. Decorative cinematic corner accents */}
                        <div className="absolute -top-4 -left-4 w-12 h-12 border-t-2 border-l-2 border-white/20 z-20 transition-all duration-500 group-hover:-top-6 group-hover:-left-6"></div>
                        <div className="absolute -bottom-4 -right-4 w-12 h-12 border-b-2 border-r-2 border-white/20 z-20 transition-all duration-500 group-hover:-bottom-6 group-hover:-right-6"></div>

                    </div>
                </motion.div>

                {/* --- TEXT CONTENT SECTION --- */}
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                    className="w-full md:w-1/2 flex flex-col justify-center mt-12 md:mt-0"
                >
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="text-zinc-500 tracking-[0.3em] text-sm uppercase mb-4"
                    >
                        About Manthila
                    </motion.p>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        className="text-4xl md:text-5xl lg:text-6xl font-serif text-white mb-6 leading-tight"
                    >
                        Visionary <span className="italic font-light text-zinc-400">director</span> & storyteller.
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.5 }}
                        className="text-zinc-400 text-lg md:text-xl font-light leading-relaxed mb-8"
                    >
                        Hi, I'm Manthila. I am a director and visual storyteller dedicated to merging profound aesthetics with compelling human experiences. Whether it's high-energy promotions, atmospheric bar scenes, or vibrant food videography, every frame I craft is meticulously designed to evoke emotion and deliver an unforgettable visual journey.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.6 }}
                    >
                        <Link
                            to="/directing"
                            className="inline-flex items-center gap-3 text-white border-b border-zinc-700 pb-1 hover:border-white transition-colors group"
                        >
                            <span className="font-serif tracking-wide text-lg">Explore my work</span>
                            <span className="group-hover:translate-x-2 transition-transform">&rarr;</span>
                        </Link>
                    </motion.div>
                </motion.div>

            </div>
        </section>
    );
};

export default Abouth;