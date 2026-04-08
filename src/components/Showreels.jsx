import React, { useState, useRef } from 'react';
import introVideo from '../images/intro.mp4';

const Showreels = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const videoRef = useRef(null);

    const handlePlay = () => {
        if (videoRef.current) {
            videoRef.current.play();
            setIsPlaying(true);
        }
    };

    return (
        <div className="w-full h-screen bg-black relative flex items-center justify-center overflow-hidden z-50">
            <video
                ref={videoRef}
                src={introVideo}
                controls={isPlaying} 
                playsInline
                className="w-full h-full object-cover"
                onPause={() => setIsPlaying(false)} 
            />

            {/* Overlay and Circular Play Button CTA */}
            {!isPlaying && (
                <div 
                    className="absolute inset-0 flex items-center justify-center bg-black/40 cursor-pointer transition-opacity duration-500 z-10"
                    onClick={handlePlay}
                >
                    <button 
                        className="group flex items-center justify-center w-20 h-20 md:w-24 md:h-24 rounded-full border border-white/50 bg-black/20 backdrop-blur-sm hover:bg-white hover:scale-105 transition-all duration-300 shadow-[0_0_15px_rgba(255,255,255,0.1)]"
                        onClick={(e) => {
                            e.stopPropagation(); 
                            handlePlay();
                        }}
                    >
                        {/* Play Icon SVG - ml-1 offsets the triangle so it looks perfectly centered */}
                        <svg 
                            className="w-8 h-8 md:w-10 md:h-10 text-white group-hover:text-black ml-1 transition-colors duration-300" 
                            viewBox="0 0 24 24" 
                            fill="currentColor"
                        >
                            <path d="M8 5v14l11-7z" />
                        </svg>
                    </button>
                </div>
            )}
        </div>
    );
};

export default Showreels;