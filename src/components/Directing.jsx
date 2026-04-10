import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

// Local assets map perfectly to the hospitality section logic!
import foodVideo from '../images/food.mp4';
import barVideo from '../images/bar.mp4';
import promotionVideo from '../images/promotion.mp4';

// Extremely reliable fallback video 
const fallbackVideo = "https://www.w3schools.com/html/mov_bbb.mp4";
import { hospitalityVideos } from '../data/hospitalityData';
import { corporateVideos } from '../data/corporateData';

export const categories = [
    { id: 'hospitality', name: 'Hospitality' },
    { id: 'commercial', name: 'Commercial' },
  
    { id: 'corporate', name: 'Corporate' },
    { id: 'events', name: 'Events' },
    { id: 'music-videos', name: 'Music Videos' },
    { id: 'personal-films', name: 'Personal Films' },
];

export const allVideos = {
    'commercial': [
        { id: 'c1', title: 'Ad Campaign A', src: fallbackVideo, details: 'A wide-reaching commercial broadcast focused on conveying the brand message elegantly.', projectType: 'Commercial', date: 'October 2023', role: 'Director', client: 'Brand X', productionHouse: 'Studio Y' },
        { id: 'c2', title: 'Ad Campaign B', src: fallbackVideo, details: 'Dynamic product showcase emphasizing high production value and seamless transitions.', projectType: 'TV Commercial', date: 'August 2023', role: 'Director / Editor', client: 'Global Tech', productionHouse: 'Oasis Films' },
        { id: 'c3', title: 'Brand Story', src: fallbackVideo, details: 'Story-driven brand commercial that touches on emotional connections and authentic moments.', projectType: 'Digital Ad', date: 'January 2024', role: 'Director', client: 'Lifestyle Co.', productionHouse: 'Nomad Studios' },
    ],
    'hospitality': hospitalityVideos,
    'corporate': corporateVideos,
    'events': [
        { id: 'e1', title: 'Live Concert 2025', src: fallbackVideo, details: 'Multi-cam setup for a grand live event capturing the energy and scale of the performance.', projectType: 'Event Coverage', date: 'New Year 2024', role: 'Live Director', client: 'Music Festival', productionHouse: 'LiveStream Pro' },
        { id: 'e2', title: 'Fashion Week', src: fallbackVideo, details: 'Runway coverage and backstage highlights showcasing fashion in motion and lighting design.', projectType: 'Event Recap', date: 'Fall 2023', role: 'Camera Operator', client: 'Vogue Variations', productionHouse: 'Style Films' }
    ],
    'music-videos': [
        { id: 'm1', title: 'Neon Dreams', src: fallbackVideo, details: 'Music video featuring vibrant neon aesthetics and a narrative deeply woven into the lyrical themes.', projectType: 'Music Video', date: 'July 2023', role: 'Director', client: 'Indie Record Label', productionHouse: 'Neon Studios' },
        { id: 'm2', title: 'Acoustic Sessions', src: fallbackVideo, details: 'Intimate, close-up performance capture prioritizing raw audio quality and minimal distraction.', projectType: 'Live Session', date: 'May 2023', role: 'Director / Colorist', client: 'Acoustic Artist', productionHouse: 'Sound Stage' }
    ],
    'personal-films': [
        { id: 'p1', title: 'The Journey', src: fallbackVideo, details: 'A short documentary exploring human connections across different cultures and environments.', projectType: 'Short Documentary', date: '2022', role: 'Director / Producer', client: 'Independent', productionHouse: 'Self-Funded' },
        { id: 'p2', title: 'Quiet Mornings', src: fallbackVideo, details: 'A study on stillness and early morning routines through soft natural light cinematography.', projectType: 'Art Film', date: '2024', role: 'Cinematographer', client: 'Personal Project', productionHouse: 'N/A' }
    ]
};

export default function Directing() {
    const location = useLocation();
    const navigate = useNavigate();

    // Default to commercial, or read hash
    const [activeCategory, setActiveCategory] = useState('commercial');

    // Sync state from URL hash and reset scroll position
    useEffect(() => {
        // Reset scroll position to top whenever landing on this page
        window.scrollTo(0, 0);

        if (location.hash) {
            const hashId = location.hash.substring(1); // remove '#'
            if (categories.some(c => c.id === hashId)) {
                setActiveCategory(hashId);
            }
        }
    }, [location.pathname, location.hash]);

    // Handle Category change & update URL
    const handleCategoryClick = (id) => {
        setActiveCategory(id);
        navigate(`/directing#${id}`, { replace: true });
    };

    const currentVideos = allVideos[activeCategory] || [];

    return (
        <div className="bg-[#050505] min-h-screen pt-32 pb-32 text-white font-sans relative">

            {/* Top Navigation Matches User Image Reference Perfectly */}
            <nav className="max-w-7xl mx-auto px-4 flex flex-wrap justify-center gap-x-8 gap-y-4 md:gap-x-12 mb-20 z-10 relative">
                {categories.map(cat => {
                    const isActive = activeCategory === cat.id;
                    return (
                        <button
                            key={cat.id}
                            onClick={() => handleCategoryClick(cat.id)}
                            className={`text-[10px] md:text-xs uppercase tracking-[0.2em] transition-all duration-300 relative py-2 ${isActive ? 'text-white' : 'text-zinc-500 hover:text-zinc-300'}`}
                        >
                            {cat.name}
                            {/* Animated Underline for active state */}
                            {isActive && (
                                <motion.div
                                    layoutId="nav-underline"
                                    className="absolute bottom-0 left-0 right-0 h-[1px] bg-white opacity-80"
                                />
                            )}
                        </button>
                    )
                })}
            </nav>

            {/* Large Category Title Section - Centers dynamically */}
            <div className="text-center mb-16 md:mb-24 h-24 flex items-center justify-center relative overflow-hidden">
                <AnimatePresence mode="wait">
                    <motion.h1
                        key={activeCategory}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -30 }}
                        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                        className="text-4xl sm:text-5xl md:text-7xl lg:text-[5rem] font-serif tracking-tight absolute text-zinc-100"
                    >
                        {categories.find(c => c.id === activeCategory)?.name}
                    </motion.h1>
                </AnimatePresence>
            </div>

            {/* Video Gallery Grid - Horizontal aspect-ratio boxes that play instantly */}
            <div className="w-full px-4 md:px-8 mx-auto max-w-[1800px]">
                <motion.div
                    layout
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-0.5 bg-zinc-900 border border-zinc-900"
                >
                    <AnimatePresence mode="popLayout">
                        {currentVideos.map((video) => (
                            <motion.div
                                key={video.id}
                                layout
                                initial={{ opacity: 0, scale: 0.98 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.98 }}
                                transition={{ duration: 0.6 }}
                                className="group relative aspect-video cursor-pointer overflow-hidden bg-black"
                                onClick={() => navigate(`/project/${video.id}`)}
                            >
                                {video.vimeoId ? (
                                    <img
                                        src={video.thumbnail || "https://images.unsplash.com/photo-1542204165-65bf26472b9b?auto=format&fit=crop&q=80"}
                                        alt={video.title}
                                        className="w-full h-full object-cover grayscale-[30%] transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0 opacity-80 group-hover:opacity-100"
                                    />
                                ) : (
                                    <video
                                        src={video.src}
                                        autoPlay
                                        loop
                                        muted
                                        playsInline
                                        className="w-full h-full object-cover grayscale-[30%] transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0 opacity-80 group-hover:opacity-100"
                                    />
                                )}
                                {/* Dark overlay that fades on hover */}
                                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/10 transition-colors duration-500" />

                                {/* Play icon overlay */}
                                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 scale-90 group-hover:scale-100 transform z-10">
                                    <div className="w-16 h-16 rounded-full border border-white/50 flex items-center justify-center bg-black/30 backdrop-blur-sm shadow-2xl">
                                        <svg className="w-6 h-6 ml-1 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                                    </div>
                                </div>

                                {/* Title Tag */}
                                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/90 via-black/40 to-transparent">
                                    <h3 className="text-white font-serif text-xl md:text-2xl tracking-wide drop-shadow-lg">{video.title}</h3>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>
            </div>



        </div>
    );
}