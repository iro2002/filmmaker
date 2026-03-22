import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

// USE ONLINE IMAGES INSTEAD OF VIDEOS
const data = [
    {
        title: "Commercial",
        image: "https://images.unsplash.com/photo-1492724441997-5dc865305da7?auto=format&fit=crop&w=1400&q=80",
    },
    {
        title: "Hospitality",
        image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1400&q=80",
    },
    {
        title: "Corporate",
        image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1400&q=80",
    },
    {
        title: "Events",
        image: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1400&q=80",
    },
    {
        title: "Personal Films",
        image: "https://images.unsplash.com/photo-1497032205916-ac775f0649ae?auto=format&fit=crop&w=1400&q=80",
    },
];

export default function Director() {
    const containerRef = useRef(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    return (
        <section ref={containerRef} className="h-[600vh] bg-[#050505] text-white relative">
            <div className="sticky top-0 h-screen flex overflow-hidden">

                {/* LEFT SIDE (STATIC LIST) */}
                <div className="w-1/2 flex flex-col justify-center px-8 md:px-16 z-20">
                    <h2 className="text-4xl sm:text-6xl md:text-7xl lg:text-[7rem] font-serif tracking-tighter mb-16 text-white/90 underline decoration-1 underline-offset-8 decoration-white/40">
                        Directing
                    </h2>

                    <div className="space-y-8 md:space-y-12">
                        {data.map((item, i) => {
                            const step = 1 / data.length;
                            const start = i * step;
                            const end = (i + 1) * step;

                            const opacity = useTransform(scrollYProgress, [start, start + step / 2, end], [0.2, 1, 0.2]);
                            const x = useTransform(scrollYProgress, [start, start + step / 2], [-20, 0]);

                            return (
                                <motion.div key={i} style={{ opacity, x }}>
                                    <h3 className="text-3xl md:text-5xl lg:text-6xl font-serif tracking-tighter border-l-2 border-white pl-6">
                                        {item.title}
                                    </h3>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>

                {/* RIGHT SIDE (SCROLL REVEAL IMAGES) */}
                <div className="w-1/2 relative h-full bg-black">
                    {data.map((item, i) => {
                        const step = 1 / data.length;
                        const start = i * step;
                        const next = (i + 1) * step;

                        const x = useTransform(scrollYProgress, [start, start + step * 0.5], ["100%", "0%"]);
                        const opacity = useTransform(scrollYProgress, [start, start + step * 0.1, next - step * 0.1, next], [0, 1, 1, 0]);
                        const zIndex = useTransform(scrollYProgress, [start, next], [i + 10, i + 10]);

                        return (
                            <motion.div
                                key={i}
                                style={{ x, opacity, zIndex }}
                                className="absolute inset-0 flex items-center justify-center p-0"
                            >
                                <div className="w-full h-full relative overflow-hidden shadow-2xl">
                                    <img
                                        src={item.image}
                                        alt={item.title}
                                        className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                                    />

                                    {/* TITLE ONLY (NO DESCRIPTION) */}
                                    <div className="absolute bottom-12 left-12 max-w-sm bg-black/60 p-8 backdrop-blur-sm border-t border-white/20">
                                        <h4 className="text-3xl md:text-4xl font-serif tracking-tighter text-white">
                                            {item.title}
                                        </h4>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}