import React, { useState, useRef } from "react";

const Showreels = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const iframeRef = useRef(null);

  const handlePlay = () => {
    if (iframeRef.current && iframeRef.current.contentWindow) {
      // Use Vimeo's native postMessage API to trigger play without reloading the iframe
      iframeRef.current.contentWindow.postMessage(JSON.stringify({ method: "play" }), "*");
      setIsPlaying(true);
    }
  };

  return (
    <div className="w-[100vw] h-screen bg-black relative flex items-center justify-center overflow-hidden z-50">
      <iframe
        ref={iframeRef}
        src="https://player.vimeo.com/video/1150841154?h=5e2c23db42&title=0&byline=0&portrait=0"
        className="w-full h-full"
        frameBorder="0"
        allow="autoplay; fullscreen; picture-in-picture"
        allowFullScreen
        title="Showreel"
      ></iframe>

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
            {/* Play Icon SVG */}
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

      {/* Showreel Credits */}
      <div className="absolute bottom-6 md:bottom-10 w-full text-center text-white/60 text-[10px] md:text-xs tracking-[0.3em] uppercase font-light z-20 pointer-events-none drop-shadow-md">
        Directed by Manthila Balasuriya · Produced by Viral Media LK
      </div>
    </div>
  );
};

export default Showreels;
