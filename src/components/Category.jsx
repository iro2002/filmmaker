import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

import foodVideo from '../images/food.mp4';
import barVideo from '../images/bar.mp4';
import promotionVideo from '../images/promotion.mp4';
// Import your "View All" image here
import viewAllImage from '../images/viewall.jpg';

const categoriesData = [
    {
        id: 1,
        name: 'Bars',
        video: barVideo,
        path: '/directing#hospitality'
    },
    {
        id: 2,
        name: 'Food',
        video: foodVideo,
        path: '/directing#hospitality'
    },
    {
        id: 3,
        name: 'Promotions',
        video: promotionVideo,
        path: '/directing#hospitality'
    },
    {
        id: 4,
        name: 'View All',
        isViewAll: true,
        image: viewAllImage, // Added image property
        path: '/directing'
    }
];

const Category = () => {
    const [hoveredIndex, setHoveredIndex] = useState(null);
    const navigate = useNavigate();

    return (
        <div className="w-full bg-[#050505] py-8 md:py-12 flex flex-col items-center justify-center px-4 md:px-8 -mt-6 md:-mt-12 relative z-50">
            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
                variants={{
                    visible: {
                        transition: {
                            staggerChildren: 0.1,
                            delayChildren: 0.2
                        }
                    },
                    hidden: {}
                }}
                className="flex w-full max-w-6xl h-[300px] md:h-[500px] gap-2 md:gap-4 items-center justify-center cursor-pointer"
                onMouseLeave={() => setHoveredIndex(null)}
            >
                {categoriesData.map((category, i) => {
                    const isActive = hoveredIndex === i;
                    const isSomethingHovered = hoveredIndex !== null;

                    const cardWidth = isActive
                        ? "calc(40% + 100px)"
                        : isSomethingHovered
                            ? "calc(15% - 10px)"
                            : "20%";

                    const staggerY = i % 2 === 0 ? 16 : -16;

                    return (
                        <motion.div
                            key={category.id}
                            onClick={() => navigate(category.path)}
                            onMouseEnter={() => setHoveredIndex(i)}
                            variants={{
                                hidden: { opacity: 0, y: 100 },
                                visible: { opacity: 1, y: staggerY, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
                            }}
                            animate={{
                                width: cardWidth,
                                filter: isActive || !isSomethingHovered
                                    ? "grayscale(0%) brightness(100%)"
                                    : "grayscale(100%) brightness(30%)"
                            }}
                            transition={{
                                width: { type: "spring", stiffness: 200, damping: 25 },
                                filter: { duration: 0.3 }
                            }}
                            // Removed rounded-lg and added rounded-none
                            className="relative h-full overflow-hidden bg-[#111] border border-zinc-800 group rounded-none shadow-2xl"
                        >
                            {category.isViewAll ? (
                                /* View All Card - Now with Image */
                                <img
                                    src={category.image}
                                    alt="View All"
                                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-60 group-hover:opacity-100"
                                />
                            ) : (
                                /* Vertical Showreels */
                                <video
                                    src={category.video}
                                    autoPlay
                                    loop
                                    muted
                                    playsInline
                                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                            )}

                            {/* Dark Gradient Overlay for text readability */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-100 transition-opacity duration-500" />

                            {/* Text Reveal Logic */}
                            <motion.div
                                className="absolute bottom-6 left-4 right-4 flex flex-col"
                                animate={{ opacity: isActive || !isSomethingHovered ? 1 : 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                <div className="overflow-hidden whitespace-nowrap flex items-center justify-between">
                                    <p className="text-white font-serif text-xl md:text-3xl tracking-wide drop-shadow-md">
                                        {category.name}
                                    </p>

                                    {category.isViewAll && (
                                        <span className="text-zinc-400 text-2xl ml-2 group-hover:text-white transition-colors duration-300">
                                            &rarr;
                                        </span>
                                    )}
                                </div>
                            </motion.div>
                        </motion.div>
                    );
                })}
            </motion.div>
        </div>
    );
};

export default Category;