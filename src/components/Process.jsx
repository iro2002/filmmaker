import React from 'react';
import { motion } from 'framer-motion';

const steps = [
    { title: "Brief", desc: "Understanding\nthe project\nand requirements" },
    { title: "Quote", desc: "Scope, budget,\nand approvals" },
    { title: "Pre-Production", desc: "Creative and production\nplanning with\nthe client" },
    { title: "Production", desc: "Executing\nthe shoot with\nthe right team" },
    { title: "Delivery", desc: "Post-production\nand final delivery" }
];

const Process = () => {
    return (
        <section className="w-full bg-[#050505] py-2 md:py-2 flex flex-col items-center z-10 relative overflow-hidden">
            {/* Title */}
            <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-5xl md:text-8xl font-serif text-white mb-24 md:mb-40 tracking-tighter text-center"
            >
                Process
            </motion.h2>

            <div className="w-full max-w-[1400px] mx-auto px-6 md:px-12">
                <div className="flex flex-col md:flex-row justify-between items-start w-full gap-20 md:gap-4">
                    {steps.map((step, index) => (
                        <div key={index} className="flex flex-col items-center text-center flex-1 relative w-full">



                            {/* Title */}
                            <motion.h3 className="text-xl md:text-2xl font-serif text-white mb-6 md:mb-10 z-10">
                                {step.title}
                            </motion.h3>

                            {/* --- DESKTOP CONTINUOUS ARROW --- */}
                            <div className="hidden md:flex w-full items-center justify-center relative mb-10 h-6">
                                {index < steps.length - 1 && (
                                    <div className="absolute left-[50%] w-full h-[1px] bg-zinc-800/80">
                                        <motion.div
                                            className="absolute top-1/2 left-0 -translate-y-1/2"
                                            animate={{
                                                x: ["0%", "100%"],
                                                opacity: [0, 1, 1, 0]
                                            }}
                                            transition={{
                                                duration: 3,
                                                repeat: Infinity,
                                                ease: "linear",
                                                delay: index * 0.5
                                            }}
                                        >
                                            <div className="relative flex items-center justify-center">
                                                {/* The Arrow Head */}
                                                <svg className="w-6 h-6 text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                                                </svg>
                                                {/* Trailing Glow Effect */}
                                                <div className="absolute right-full w-12 h-[2px] bg-gradient-to-r from-transparent to-white/50" />
                                            </div>
                                        </motion.div>
                                    </div>
                                )}
                            </div>

                            {/* --- MOBILE CONTINUOUS ARROW --- */}
                            <div className="md:hidden w-full flex justify-center mb-8 h-20 relative">
                                {index < steps.length - 1 && (
                                    <div className="w-[1px] h-full bg-zinc-800/80 relative">
                                        <motion.div
                                            className="absolute left-1/2 -translate-x-1/2"
                                            animate={{
                                                y: ["0%", "100%"],
                                                opacity: [0, 1, 1, 0]
                                            }}
                                            transition={{
                                                duration: 2.5,
                                                repeat: Infinity,
                                                ease: "linear",
                                                delay: index * 0.4
                                            }}
                                        >
                                            <svg className="w-6 h-6 text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                                            </svg>
                                        </motion.div>
                                    </div>
                                )}
                            </div>

                            {/* Description */}
                            <motion.p className="text-zinc-400 text-sm md:text-base leading-relaxed max-w-[180px] whitespace-pre-line px-2">
                                {step.desc}
                            </motion.p>
                        </div>
                    ))}
                </div>
            </div>

            {/* CTA */}
            <motion.a
                href="#contact"
                className="mt-24 md:mt-40 px-8 py-3 border border-white/20 text-white hover:bg-white hover:text-black transition-all duration-300 font-serif tracking-widest text-sm uppercase"
            >
                Get in touch
            </motion.a>
        </section>
    );
};

export default Process;