import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

import foodVideo from '../images/food.mp4';
import barVideo from '../images/bar.mp4';
import fashionVideo from '../images/Fashion.mp4';
import corporateVideo from '../images/coparate.mp4';
import promotionVideo from '../images/Promotion.mp4';
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
        name: 'Fashion',
        video: fashionVideo,
        path: '/directing#fashion-films'
    },
    {
        id: 4,
        name: 'Corporate',
        video: corporateVideo,
        path: '/directing#corporate'
    }
];

const Category = () => {
    const [hoveredIndex, setHoveredIndex] = useState(null);
    const navigate = useNavigate();

    return (
        <div className="relative w-full bg-[#050505] py-10 md:py-8 flex flex-col items-center justify-center px-0 md:px-0 overflow-hidden z-50">

            {/* Subtle background glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-96 bg-zinc-800/20 rounded-full blur-[100px] pointer-events-none" />

            {/* Header Section */}
            <div className="text-center mb-8 md:mb-6 z-10 px-4">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-white text-5xl md:text-7xl font-serif tracking-tighter mb-2"
                >
                    Featured Work
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
                className="flex w-full gap-2 md:gap-5 items-center justify-center cursor-pointer"
                onMouseLeave={() => setHoveredIndex(null)}
            >
                {categoriesData.map((category, i) => {
                    const isHovered = hoveredIndex === i;
                    const isSomethingHovered = hoveredIndex !== null;

                    const staggerY = i % 2 === 0 ? 15 : -15;

                    return (
                        <motion.div
                            key={category.id}
                            onClick={() => navigate(category.path)}
                            onMouseEnter={() => setHoveredIndex(i)}
                            variants={{
                                hidden: { opacity: 0, y: 30 },
                                visible: { opacity: 1, y: staggerY, transition: { duration: 0.8, ease: "easeOut" } }
                            }}
                            animate={{
                                y: isHovered ? staggerY - 10 : staggerY,
                                filter: isHovered || !isSomethingHovered
                                    ? "grayscale(0%) brightness(100%)"
                                    : "grayscale(100%) brightness(30%)"
                            }}
                            transition={{ duration: 0.4 }}
                            className="relative overflow-hidden bg-[#111] border border-zinc-800/80 group rounded-none shadow-2xl flex-1 h-[450px] md:h-[50vh] md:min-h-[320px] md:max-h-[500px] md:transition-all md:duration-700 md:ease-out md:hover:[flex:2_2_0%]"
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
                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
                            </div>

                            {/* UNIFIED TEXT (Shows vertical on Mobile, horizontal on Desktop) */}
                            <div className="absolute inset-0 flex flex-col justify-center md:justify-end items-center md:items-start p-0 md:p-6 lg:p-10 pointer-events-none z-10">
                                <div className="transform md:translate-y-4 group-hover:translate-y-0 transition-transform duration-500 ease-out flex flex-row md:flex-col items-center md:items-start -rotate-90 md:rotate-0 origin-center">



                                    <h3 className="text-white/90 group-hover:text-white font-serif text-lg md:text-2xl lg:text-3xl tracking-widest drop-shadow-2xl whitespace-nowrap md:whitespace-normal break-words leading-tight transition-colors duration-500">
                                        {category.name}
                                    </h3>

                                    {/* Line hidden on mobile to preserve vertical design */}
                                    <div className="hidden md:block w-0 group-hover:w-16 h-[2px] bg-white mt-3 md:mt-4 transition-all duration-700 delay-150 ease-out" />
                                </div>
                            </div>

                        </motion.div>
                    );
                })}
            </motion.div>

            {/* Discover All Link */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "0px 0px -50px 0px" }}
                transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
                className="w-full max-w-[1400px] mt-8 md:mt-12 flex justify-center md:justify-end px-4 md:px-8 z-10"
            >
                <div
                    onClick={() => navigate('/directing')}
                    className="group cursor-pointer flex items-center gap-3 md:gap-4 relative"
                >
                    <span className="font-serif text-2xl md:text-4xl text-zinc-400 group-hover:text-white transition-colors duration-500 tracking-wide italic font-light drop-shadow-2xl">
                        Discover all
                    </span>

                    <div className="relative w-12 h-12 md:w-16 md:h-16 rounded-full border border-white/20 group-hover:border-white/60 bg-black/40 backdrop-blur-md flex items-center justify-center overflow-hidden transition-colors duration-500">
                        <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[0.22,1,0.36,1]" />

                        <svg
                            className="absolute w-5 h-5 md:w-6 md:h-6 text-white group-hover:text-black group-hover:translate-x-[150%] group-hover:-translate-y-[150%] transition-transform duration-500 ease-[0.22,1,0.36,1] rotate-[-45deg]"
                            fill="none" viewBox="0 0 24 24" stroke="currentColor"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 12h14M12 5l7 7-7 7" />
                        </svg>

                        <svg
                            className="absolute w-5 h-5 md:w-6 md:h-6 text-black -translate-x-[150%] translate-y-[150%] group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-500 ease-[0.22,1,0.36,1] rotate-[-45deg]"
                            fill="none" viewBox="0 0 24 24" stroke="currentColor"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                    </div>

                    {/* Adjusted calculations to properly size underline based on mobile gap + circle sizing */}
                    <div className="absolute -bottom-1 md:bottom-2 left-0 w-[calc(100%-60px)] md:w-[calc(100%-80px)] h-[1px] bg-white/20 pointer-events-none">
                        <div className="absolute left-0 top-0 h-full bg-white w-0 group-hover:w-full transition-all duration-700 ease-[0.22,1,0.36,1]" />
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default Category;