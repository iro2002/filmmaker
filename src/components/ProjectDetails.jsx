import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { allVideos } from './Directing'; 
import Header from './Header';
import Footer from './Footer';

export default function ProjectDetails() {
    const { id } = useParams();
    const navigate = useNavigate();

    // Find the video by id in allVideos
    let selectedVideo = null;
    let categoryFound = '';
    
    // Iterate through all categories to find the video
    for (const [category, videos] of Object.entries(allVideos)) {
        const video = videos.find(v => v.id === id);
        if (video) {
            selectedVideo = video;
            categoryFound = category;
            break;
        }
    }

    // Always scroll to top when mounting
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [id]);

    if (!selectedVideo) {
        return (
            <div className="bg-[#050505] min-h-screen pt-32 text-white font-sans flex flex-col items-center justify-center">
                <Header />
                <h1 className="text-4xl font-serif">Project not found</h1>
                <button onClick={() => navigate('/directing')} className="mt-8 text-zinc-500 hover:text-white underline">
                    Back to Directing
                </button>
            </div>
        );
    }

    return (
        <div className="bg-[#050505] min-h-screen text-white font-sans flex flex-col relative pt-16 md:pt-24">
            <Header />
            
            <div className="flex-1 w-full max-w-7xl mx-auto px-4 md:px-8 py-12 flex flex-col items-center">
                
                {/* Back Button */}
                <div className="w-full mb-8">
                    <button 
                        onClick={() => navigate(`/directing#${categoryFound}`)}
                        className="text-zinc-400 hover:text-white transition-colors flex items-center tracking-widest text-xs uppercase"
                    >
                        &larr; Back to Projects
                    </button>
                </div>

                {/* Video Player */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="w-full aspect-video bg-black rounded-sm overflow-hidden mb-12 shadow-[0_0_40px_rgba(0,0,0,0.8)] border border-white/5"
                >
                    {selectedVideo.vimeoId ? (
                        <iframe
                            src={`https://player.vimeo.com/video/${selectedVideo.vimeoId}?h=${selectedVideo.vimeoHash}&autoplay=1&title=0&byline=0&portrait=0`}
                            className="w-full h-full"
                            frameBorder="0"
                            allow="autoplay; fullscreen; picture-in-picture"
                            allowFullScreen
                            title={selectedVideo.title}
                        ></iframe>
                    ) : (
                        <video
                            src={selectedVideo.src}
                            controls
                            autoPlay
                            className="w-full h-full object-contain"
                        />
                    )}
                </motion.div>

                {/* Details Section */}
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="w-full grid grid-cols-1 lg:grid-cols-12 gap-12"
                >
                    {/* Left Column: Title and Metadata */}
                    <div className="lg:col-span-6 xl:col-span-5 flex flex-col">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif mb-8 text-white tracking-tight leading-snug drop-shadow-md">
                            {selectedVideo.title}
                        </h1>

                        <div className="space-y-6 text-zinc-400 font-sans tracking-wide">
                            {/* Metadata boxes */}
                            <div className="border border-zinc-800 p-6 space-y-4 rounded-sm bg-[#0a0a0a]">
                                <p><span className="text-zinc-500 font-bold">Project type:</span> <span className="text-zinc-200">{selectedVideo.projectType}</span></p>
                                <p><span className="text-zinc-500 font-bold">Date:</span> <span className="text-zinc-200">{selectedVideo.date}</span></p>
                                <p><span className="text-zinc-500 font-bold">Role:</span> <span className="text-zinc-200">{selectedVideo.role}</span></p>
                            </div>

                            <div className="border border-zinc-800 p-6 space-y-4 rounded-sm bg-[#0a0a0a]">
                                <p><span className="text-zinc-500 font-bold">Client/Agency:</span> <span className="text-zinc-200">{selectedVideo.client}</span></p>
                                <p><span className="text-zinc-500 font-bold">Production House:</span> <span className="text-zinc-200">{selectedVideo.productionHouse}</span></p>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Brief/Description */}
                    <div className="lg:col-span-6 xl:col-span-7 pt-2 lg:pt-4">
                        <p className="text-zinc-300 text-lg md:text-xl leading-relaxed font-light">
                            {selectedVideo.details}
                        </p>
                    </div>
                </motion.div>

            </div>

            <Footer />
        </div>
    );
}
