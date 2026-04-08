import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

import foodVideo from '../images/food.mp4';
import barVideo from '../images/bar.mp4';
import promotionVideo from '../images/promotion.mp4';
import viewAllImage from '../images/viewall.jpg';

const categoriesData = [
    {
        id: 1,
        name: 'Bars & Nightlife',
        video: barVideo,
        path: '/directing#hospitality'
    },
    {
        id: 2,
        name: 'Food & Dining',
        video: foodVideo,
        path: '/directing#hospitality'
    },
    {
        id: 3,
        name: 'Campaigns',
        video: promotionVideo,
        path: '/directing#hospitality'
    },
    {
        id: 4,
        name: 'Discover All',
        isViewAll: true,
        image: viewAllImage,
        video: promotionVideo,
        path: '/directing'
    }
];

const Category = () => {
    const [hoveredIndex, setHoveredIndex] = useState(null);
    const navigate = useNavigate();

    return (
        <div className="relative w-full bg-[#050505] py-16 md:py-12 flex flex-col items-center justify-center px-2 md:px-8 overflow-hidden z-50">

            {/* Subtle background glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-96 bg-zinc-800/20 rounded-full blur-[100px] pointer-events-none" />

            {/* Header Section */}
            <div className="text-center mb-12 md:mb-10 z-10 px-4">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-white text-5xl md:text-8xl font-serif tracking-tighter mb-3"
                >
                    Featured products
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                    className="text-zinc-400 text-sm md:text-base max-w-lg mx-auto"
                >
                    Discover a curated selection of cinematic stories.
                </motion.p>
            </div>

            {/* Container mapping the cards */}
            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
                variants={{
                    visible: { transition: { staggerChildren: 0.15 } },
                    hidden: {}
                }}
                className="flex w-full max-w-[1400px] gap-2 md:gap-5 items-center justify-center cursor-pointer"
                onMouseLeave={() => setHoveredIndex(null)}
            >
                {categoriesData.map((category, i) => {
                    const isHovered = hoveredIndex === i;
                    const isSomethingHovered = hoveredIndex !== null;

                    // Stagger effect for mobile primarily
                    const staggerY = i % 2 === 0 ? 20 : -20;

                    return (
                        <motion.div
                            key={category.id}
                            onClick={() => navigate(category.path)}
                            onMouseEnter={() => setHoveredIndex(i)}
                            variants={{
                                hidden: { opacity: 0, y: 50 },
                                visible: { opacity: 1, y: staggerY, transition: { duration: 0.8, ease: "easeOut" } }
                            }}
                            animate={{
                                y: isHovered ? staggerY - 10 : staggerY,
                                filter: isHovered || !isSomethingHovered
                                    ? "grayscale(0%) brightness(100%)"
                                    : "grayscale(100%) brightness(30%)"
                            }}
                            transition={{ duration: 0.4 }}
                            // NEW DESKTOP LAYOUT: Expanding Accordion Flex Effect
                            className="relative overflow-hidden bg-[#111] border border-zinc-800/80 group rounded-none shadow-2xl flex-1 h-[550px] md:h-[60vh] md:min-h-[400px] md:max-h-[600px] md:transition-all md:duration-700 md:ease-out md:hover:[flex:2_2_0%]"
                        >

                            {/* Media Wrapper */}
                            <div className="absolute inset-0 overflow-hidden">
                                {category.isViewAll ? (
                                    <img
                                        src={category.image}
                                        alt="View All"
                                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                                    />
                                ) : (
                                    <video
                                        src={category.video}
                                        autoPlay
                                        loop
                                        muted
                                        playsInline
                                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                                    />
                                )}
                                {/* Gradient Overlay - darker at the bottom to ensure text pops */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
                            </div>

                            {/* ============================================== */}
                            {/* MOBILE TEXT */}
                            {/* ============================================== */}
                            <div className="absolute inset-0 flex items-center justify-center md:hidden pointer-events-none px-2">
                                <p className="text-white font-serif text-lg sm:text-xl tracking-[0.15em] drop-shadow-2xl whitespace-nowrap [writing-mode:vertical-rl] rotate-180">
                                    {category.name}
                                </p>
                            </div>

                            {/* ============================================== */}
                            {/* DESKTOP TEXT (Fixed Wrapping & Sizing) */}
                            {/* ============================================== */}
                            <div className="hidden md:flex absolute inset-0 flex-col justify-end p-6 lg:p-10 pointer-events-none z-10">
                                <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 ease-out">

                                    {/* Number indicator */}
                                    <span className="block text-zinc-400 font-sans text-xs lg:text-sm tracking-[0.2em] mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                                        0{category.id}
                                    </span>

                                    {/* Main Title - Removed whitespace-nowrap, adjusted sizes */}
                                    <h3 className="text-white/70 group-hover:text-white font-serif text-2xl lg:text-3xl xl:text-4xl tracking-wider lg:tracking-widest drop-shadow-2xl transition-all duration-500 leading-tight">
                                        {category.name}
                                    </h3>

                                    {/* Animated Underline */}
                                    <div className="w-0 group-hover:w-16 h-[2px] bg-white mt-4 transition-all duration-700 delay-150 ease-out" />
                                </div>
                            </div>

                        </motion.div>
                    );
                })}
            </motion.div>
        </div>
    );
};

export default Category;