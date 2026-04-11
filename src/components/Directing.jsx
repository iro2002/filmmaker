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
import { fashionFilmsVideos } from '../data/fashionFilmsData';
import { musicVideos } from '../data/musicVideoData';

export const categories = [
    { id: 'hospitality', name: 'Hospitality' },
    { id: 'fashion-films', name: 'Fashion Films' },
  
    { id: 'corporate', name: 'Corporate' },
    { id: 'events', name: 'Events' },
    { id: 'music-videos', name: 'Music Videos' },
    { id: 'personal-films', name: 'Personal Films' },
];

export const allVideos = {
    'fashion-films': fashionFilmsVideos,
    'hospitality': hospitalityVideos,
    'corporate': corporateVideos,
    'events': [
        { id: 'e1', title: 'Live Concert 2025', src: fallbackVideo, details: 'Multi-cam setup for a grand live event capturing the energy and scale of the performance.', projectType: 'Event Coverage', date: 'New Year 2024', role: 'Live Director', client: 'Music Festival', productionHouse: 'LiveStream Pro' },
        { id: 'e2', title: 'Fashion Week', src: fallbackVideo, details: 'Runway coverage and backstage highlights showcasing fashion in motion and lighting design.', projectType: 'Event Recap', date: 'Fall 2023', role: 'Camera Operator', client: 'Vogue Variations', productionHouse: 'Style Films' }
    ],
    'music-videos': musicVideos,
    'personal-films': [
        { 
            id: 'how-could-i-be-myself', 
            title: 'How Could I Be Myself?', 
            gdriveId: '1tdegHBMRmkUn98pSyP1jGv_lVpsQy49s', 
            thumbnail: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=1200&q=80', 
            details: (
                <div className="space-y-6">
                    <p>
                        “How Could I Be Myself?” started from a question I didn’t fully understand at the time. I was interested in the idea of identity, how we come to recognize ourselves, and how much of that recognition is shaped by memory, expectation, and the people around us. The film became a way of exploring that uncertainty. Not to give answers, but to sit within it.
                    </p>
                    <p>
                        Tharindu’s journey is not just about remembering who he was, but confronting the parts of himself that don’t fit easily into the world around him. That tension between what we feel and what we are expected to be is something I wanted to approach with honesty.
                    </p>
                    <p>
                        This film was made with people who believed in it, often before it fully made sense. What you see is not just the result of an idea, but of trust, collaboration, and the willingness to explore something personal together.
                    </p>
                    
                    <div className="border border-zinc-800 p-6 rounded-sm bg-[#0a0a0a] my-8">
                        <h3 className="text-white font-serif text-2xl mb-4">Awards & Recognitions</h3>
                        <p className="text-zinc-400 mb-2">NSBM Youth Film Festival 2023 (Intra-University Category):</p>
                        <ul className="list-disc list-inside text-zinc-300 space-y-1 mb-4">
                            <li>Best Film — How Could I Be Myself</li>
                            <li>Best Direction — Manthila Balasuriya</li>
                            <li>Best Cinematography — Shihara Osha</li>
                            <li>Best Editing — Kalindu Kariyawasam</li>
                            <li>Best Sound Design — Isuru Wikramanayake</li>
                            <li>Best Actor — Deshan Senarathne</li>
                        </ul>
                        <p className="text-zinc-400">Official Selection — Jaffna International Cinema Festival 2023</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm">
                        <div>
                            <h4 className="text-white font-bold mb-2">Crew</h4>
                            <ul className="space-y-1 text-zinc-400">
                                <li><span className="text-zinc-500">Director:</span> Manthila Balasuriya</li>
                                <li><span className="text-zinc-500">Producer:</span> Pasindu Gunawardhana</li>
                                <li><span className="text-zinc-500">Director of Photography:</span> Shihara Osha</li>
                                <li><span className="text-zinc-500">Editor & Colorist:</span> Kalindu Kariyawasam</li>
                                <li><span className="text-zinc-500">Music:</span> Isuru Wikramanayake</li>
                                <li><span className="text-zinc-500">Art Direction:</span> Sukitha Maheepala</li>
                                <li><span className="text-zinc-500">Assistant Director:</span> Ravindu Sampath Wickramasekara</li>
                                <li><span className="text-zinc-500">Visual Effects:</span> Akila Wanigarathna</li>
                                <li><span className="text-zinc-500">Sound Recordist:</span> Ranjith Rupasinghe</li>
                                <li><span className="text-zinc-500">Boom Operator:</span> Pasindu Ekanayake</li>
                                <li><span className="text-zinc-500">Make-up:</span> Randika Tishan</li>
                                <li><span className="text-zinc-500">Production Manager:</span> Kasun Gammana Liyanage</li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-white font-bold mb-2">Cast</h4>
                            <p className="text-zinc-400 leading-relaxed">
                                Deshan Senarathne, Jeewanthi Perera, Gamini Jayakodi, Dhanu Samarasinghe, Hirushan Hettiarachchi
                            </p>

                            <h4 className="text-white font-bold mt-8 mb-2">Galleries</h4>
                            <div className="flex flex-col space-y-2">
                                <a href="https://drive.google.com/drive/folders/1Zq_DDhvJZR2e51LcLZ4xMrNj3-doBJxm?usp=sharing" target="_blank" rel="noreferrer" className="text-zinc-400 hover:text-white underline transition-colors">
                                    Behind the Scenes ↗
                                </a>
                                <a href="https://drive.google.com/drive/folders/1Zgum29BOQL_HZqjyREDnND38L19-GcDN?usp=sharing" target="_blank" rel="noreferrer" className="text-zinc-400 hover:text-white underline transition-colors">
                                    Pictures of the Awards ↗
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            ),
            projectType: 'Short Film', 
            date: '2023', 
            role: 'Director', 
            client: 'N/A', 
            productionHouse: 'KADMAS Productions' 
        }
    ]
};

export default function Directing() {
    const location = useLocation();
    const navigate = useNavigate();

    // Default to fashion-films, or read hash
    const [activeCategory, setActiveCategory] = useState('fashion-films');

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
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-0.5 bg-black border border-black"
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
                                {video.vimeoId || video.youtubeId || video.gdriveId ? (
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