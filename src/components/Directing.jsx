import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const data = [
    {
        title: "Commercial / Ads",
        image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1200&q=80",
    },
    {
        title: "Hospitality / Lifestyle",
        image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80",
    },
    {
        title: "Corporate",
        image: "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=1200&q=80",
    },
    {
        title: "Events",
        image: "https://images.unsplash.com/photo-1505761671935-60b3a7427bad?auto=format&fit=crop&w=1200&q=80",
    },
    {
        title: "Personal Films",
        image: "https://images.unsplash.com/photo-1519985176271-adb1088fa94c?auto=format&fit=crop&w=1200&q=80",
    },
];

export default function Directing() {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    const step = 1 / (data.length - 1);

    return (
        // Changed to #050505 to match the portfolio background
        <section className="bg-[#050505] text-white font-sans selection:bg-white/30">

            <div ref={containerRef} className="relative h-[500vh]">

                {/* STICKY WRAPPER */}
                <div className="sticky top-0 h-screen w-full overflow-hidden">

                    {/* =====================
                        MOBILE & TABLET VIEW
                    ===================== */}
                    <div className="md:hidden absolute inset-0 w-full h-full flex flex-col justify-end">

                        {/* Mobile Background Images */}
                        <div className="absolute inset-0 z-0">
                            {data.map((item, i) => {
                                const peak = i * step;
                                const start = peak - step;
                                const end = peak + step;

                                const opacity = useTransform(scrollYProgress, [start, peak, end], [0, 1, 0]);
                                const scale = useTransform(scrollYProgress, [start, peak, end], [1.1, 1, 1]);

                                return (
                                    <motion.div
                                        key={i}
                                        style={{ opacity, scale }}
                                        className="absolute inset-0 w-full h-full bg-[#111]"
                                    >
                                        <img
                                            src={item.image}
                                            alt={item.title}
                                            className="w-full h-full object-cover grayscale opacity-80 mix-blend-luminosity"
                                        />
                                        {/* Adjusted gradient to use #050505 for a seamless blend */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/80 to-transparent"></div>
                                    </motion.div>
                                );
                            })}
                        </div>

                        {/* Mobile Text Overlay */}
                        <div className="relative z-10 p-8 pb-16 pointer-events-none">
                            {/* Portfolio Header Style */}
                            <h2 className="text-4xl font-serif mb-8 tracking-tighter text-white drop-shadow-[0_10px_30px_rgba(0,0,0,0.8)] border-b border-zinc-800 pb-4 inline-block">
                                Directing
                            </h2>
                            <div className="space-y-6">
                                {data.map((item, i) => {
                                    const peak = i * step;
                                    const start = peak - step;
                                    const end = peak + step;

                                    const opacity = useTransform(scrollYProgress, [start, peak, end], [0.3, 1, 0.3]);
                                    const x = useTransform(scrollYProgress, [start, peak, end], [10, 0, 10]);
                                    // Make the active item slightly larger and lighter
                                    const color = useTransform(scrollYProgress, [start, peak, end], ["#71717a", "#ffffff", "#71717a"]); // zinc-500 to white

                                    return (
                                        <motion.div key={i} style={{ opacity, x, color }} className="origin-left">
                                            {/* Portfolio List Style */}
                                            <h3 className="text-2xl font-serif tracking-tight">{item.title}</h3>
                                        </motion.div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    {/* =====================
                        DESKTOP VIEW
                    ===================== */}
                    <div className="hidden md:flex absolute inset-0 w-full h-full items-center px-12 lg:px-24">

                        {/* LEFT: Images */}
                        <div className="w-7/12 h-full flex items-center justify-center relative z-0">
                            {data.map((item, i) => {
                                const peak = i * step;
                                const start = peak - step;
                                const end = peak + step;

                                const opacity = useTransform(scrollYProgress, [start, peak, end], [0, 1, 0]);
                                const scale = useTransform(scrollYProgress, [start, peak, end], [1.05, 1, 0.95]);

                                return (
                                    <motion.div
                                        key={i}
                                        style={{ opacity, scale }}
                                        className="absolute inset-0 w-full h-full overflow-hidden bg-[#111]"
                                    >
                                        {/* Added grayscale and opacity to match the portfolio's moody vibe */}
                                        <img
                                            src={item.image}
                                            alt={item.title}
                                            className="w-full h-full object-cover grayscale opacity-80 mix-blend-luminosity"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#050505]"></div>
                                    </motion.div>
                                );
                            })}
                        </div>

                        {/* RIGHT: Titles */}
                        <div className="w-5/12 pl-16 z-10 flex flex-col justify-center">
                            {/* Portfolio Header Style */}
                            <h2 className="text-5xl lg:text-7xl font-serif mb-16 tracking-tighter text-white drop-shadow-[0_10px_30px_rgba(0,0,0,0.8)] border-b border-zinc-800 pb-6 inline-block self-start">
                                Directing
                            </h2>
                            <div className="space-y-8 lg:space-y-12">
                                {data.map((item, i) => {
                                    const peak = i * step;
                                    const start = peak - step;
                                    const end = peak + step;

                                    const opacity = useTransform(scrollYProgress, [start, peak, end], [0.2, 1, 0.2]);
                                    const x = useTransform(scrollYProgress, [start, peak, end], [20, 0, 20]);
                                    const color = useTransform(scrollYProgress, [start, peak, end], ["#71717a", "#ffffff", "#71717a"]); // zinc-500 to white

                                    return (
                                        <motion.div key={i} style={{ opacity, x, color }} className="origin-left">
                                            {/* Portfolio List Style */}
                                            <h3 className="text-3xl lg:text-5xl font-serif tracking-tight leading-none">
                                                {item.title}
                                            </h3>
                                        </motion.div>
                                    );
                                })}
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
}