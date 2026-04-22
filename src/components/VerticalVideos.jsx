import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const verticalVideos = [
  {
    id: 1,
    title: "Portrait 01",
    vimeoId: "1036649095",
    hashParam: "9c6dd4d1ce",
  },
  {
    id: 2,
    title: "Portrait 02",
    vimeoId: "1150276825",
    hashParam: "e4490caaac",
  },
  {
    id: 3,
    title: "Portrait 03",
    vimeoId: "1032579146",
    hashParam: "cbb841c9e2",
  },
  {
    id: 4,
    title: "Portrait 04",
    vimeoId: "1181109821",
    hashParam: null,
  },
];

function getPlayerUrl(video) {
  // Hash MUST be passed as ?h= query param (not path) for private/unlisted Vimeo videos
  let url = `https://player.vimeo.com/video/${video.vimeoId}?autoplay=1&loop=0&title=0&byline=0&portrait=0`;
  if (video.hashParam) url += `&h=${video.hashParam}`;
  return url;
}

function getOembedUrl(video) {
  const vimeoPageUrl = video.hashParam
    ? `https://vimeo.com/${video.vimeoId}/${video.hashParam}`
    : `https://vimeo.com/${video.vimeoId}`;
  return `https://vimeo.com/api/oembed.json?url=${encodeURIComponent(vimeoPageUrl)}&width=400`;
}

export default function VerticalVideos() {
  const [selectedVideo, setSelectedVideo] = useState(null);
  // thumbnails keyed by vimeoId
  const [thumbnails, setThumbnails] = useState({});

  // Fetch Vimeo oEmbed thumbnails on mount
  useEffect(() => {
    verticalVideos.forEach((video) => {
      fetch(getOembedUrl(video))
        .then((r) => r.json())
        .then((data) => {
          if (data.thumbnail_url) {
            // request a bigger version by replacing the size in the URL
            const big = data.thumbnail_url.replace(/_\d+x\d+(\.\w+)$/, "_640x1136$1");
            setThumbnails((prev) => ({ ...prev, [video.vimeoId]: big }));
          }
        })
        .catch(() => {}); // silently ignore; fallback handles it
    });
  }, []);

  // Lock body scroll when modal open
  useEffect(() => {
    document.body.style.overflow = selectedVideo ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [selectedVideo]);

  // Escape key closes modal
  useEffect(() => {
    const handler = (e) => { if (e.key === "Escape") setSelectedVideo(null); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  return (
    <section className="w-full bg-[#050505] py-24 px-4 md:px-8 overflow-hidden">
      {/* Section Header */}
      <div className="text-center mb-16 max-w-xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-white text-5xl md:text-7xl font-serif tracking-tighter mb-3"
        >
          Reels
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-zinc-500 text-sm md:text-base"
        >
          Short-form vertical storytelling.
        </motion.p>
      </div>

      {/* 4-column grid of 9:16 cards */}
      <div className="w-full max-w-[1400px] mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {verticalVideos.map((video, index) => {
            const thumb = thumbnails[video.vimeoId];
            return (
              <motion.div
                key={video.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onClick={() => setSelectedVideo(video)}
                className="group relative cursor-pointer overflow-hidden rounded-lg bg-[#111] border border-white/5 hover:border-white/20 transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,255,255,0.05)]"
                style={{ aspectRatio: "9/16" }}
              >
                {/* Thumbnail */}
                {thumb ? (
                  <img
                    src={thumb}
                    alt={video.title}
                    className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 grayscale-[20%] group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                  />
                ) : (
                  // Skeleton while loading
                  <div className="absolute inset-0 w-full h-full bg-gradient-to-b from-zinc-900 to-zinc-800 animate-pulse" />
                )}

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />

                {/* Play button */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-90 group-hover:scale-100">
                  <div className="w-14 h-14 rounded-full border border-white/60 flex items-center justify-center bg-black/50 backdrop-blur-md shadow-2xl">
                    <svg className="w-5 h-5 ml-1 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>

                {/* Title at bottom */}
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <p className="text-white text-sm font-serif tracking-wide opacity-80 group-hover:opacity-100 transition-opacity">
                    {video.title}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* ── MODAL ── */}
      <AnimatePresence>
        {selectedVideo && (
          <>
            {/* Backdrop — click to close */}
            <motion.div
              key="backdrop"
              className="fixed inset-0 z-[200] bg-black/92 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedVideo(null)}
            />

            {/* Content layer */}
            <motion.div
              key="modal"
              className="fixed inset-0 z-[210] flex flex-col items-center justify-center pointer-events-none"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ type: "spring", stiffness: 350, damping: 30 }}
            >
              {/* Close button */}
              <button
                className="pointer-events-auto absolute top-6 right-6 md:top-10 md:right-10 text-white/50 hover:text-white transition-colors z-[220] w-10 h-10 flex items-center justify-center text-3xl font-light rounded-full border border-white/10 hover:border-white/40 hover:bg-white/10"
                onClick={() => setSelectedVideo(null)}
              >
                &times;
              </button>

              {/* Title above */}
              <p className="pointer-events-none text-zinc-400 text-xs uppercase tracking-widest mb-4 font-light">
                {selectedVideo.title}
              </p>

              {/* Video — fixed height, width from 9:16 ratio */}
              <div
                className="pointer-events-auto relative bg-black rounded-2xl overflow-hidden shadow-[0_0_80px_rgba(0,0,0,0.9)] border border-white/10"
                style={{
                  height: "min(88vh, 720px)",
                  width: "calc(min(88vh, 720px) * 9 / 16)",
                }}
              >
                <iframe
                  key={selectedVideo.vimeoId}
                  src={getPlayerUrl(selectedVideo)}
                  frameBorder="0"
                  allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full"
                  title={selectedVideo.title}
                />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}
