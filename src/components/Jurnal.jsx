import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { blogData } from '../data/journalData';

const categories = [
  { id: 'all', name: 'All' },
  { id: 'Project Breakdowns', name: 'Project Breakdowns' },
  { id: 'Industry Insights', name: 'Industry Insights' },
  { id: 'Thoughts', name: 'Thoughts' },
  { id: 'Cinematography', name: 'Cinematography' },
  { id: 'Producing', name: 'Producing' }
];

export default function Jurnal() {
  const location = useLocation();
  const navigate = useNavigate();

  const [activeCategory, setActiveCategory] = useState('all');
  const [visibleCount, setVisibleCount] = useState(6);

  // Sync state from URL hash and reset scroll position
  useEffect(() => {
    window.scrollTo(0, 0);

    if (location.hash) {
      const hashId = location.hash.substring(1).replace(/-/g, ' ');
      // Attempt to match hash roughly to category
      const match = categories.find(c => c.id.toLowerCase() === hashId.toLowerCase());
      if (match) {
        setActiveCategory(match.id);
      }
    }
  }, [location.pathname, location.hash]);

  // Handle Category change
  const handleCategoryClick = (id) => {
    setActiveCategory(id);
    setVisibleCount(6); // Reset pagination on category change
    navigate(`/journal#${id.replace(/\s+/g, '-').toLowerCase()}`, { replace: true });
  };

  // Filter logic
  const currentArticles = activeCategory === 'all'
    ? blogData
    : blogData.filter(post => post.category === activeCategory);

  return (
    <div className="bg-[#050505] min-h-screen pt-32 pb-32 text-white font-sans relative">

      {/* Top Navigation Matches Directing.jsx Pattern Perfectly */}
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
                  layoutId="journal-nav-underline"
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
            {activeCategory === 'all' ? 'The Journal.' : categories.find(c => c.id === activeCategory)?.name}
          </motion.h1>
        </AnimatePresence>
      </div>

      {/* Gallery Grid - Replicating Directing.jsx styling perfectly */}
      <div className="w-full px-4 md:px-8 mx-auto max-w-[1800px]">
        {currentArticles.length === 0 && (
          <div className="text-center py-32 text-zinc-500 font-serif italic text-xl">
            No writings found in this category yet.
          </div>
        )}

        {currentArticles.length > 0 && (
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-0.5 bg-zinc-900 border border-zinc-900"
          >
            <AnimatePresence mode="popLayout">
              {currentArticles.slice(0, visibleCount).map((post) => (
                <motion.div
                  key={post.id}
                  layout
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.6 }}
                  className="group relative aspect-video cursor-pointer overflow-hidden bg-black"
                  onClick={() => navigate(`/journal/${post.slug}`)}
                >
                  <img
                    src={post.imageSrc}
                    alt={post.title}
                    className="w-full h-full object-cover grayscale-[40%] transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0 opacity-80 group-hover:opacity-100"
                  />
                  {/* Dark overlay that fades on hover */}
                  <div className="absolute inset-0 bg-black/50 group-hover:bg-black/20 transition-colors duration-500" />

                  {/* Read icon overlay */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 scale-90 group-hover:scale-100 transform z-10">
                    <div className="w-40 h-16 rounded-full border border-white/50 flex items-center justify-center bg-black/40 backdrop-blur-md shadow-2xl">
                      <span className="text-white font-serif tracking-widest text-sm uppercase">Read Article</span>
                    </div>
                  </div>

                  {/* Metadata Tag */}
                  <div className="absolute top-0 left-0 p-6 flex gap-4 text-[10px] font-bold tracking-widest uppercase text-white/70">
                    <span>{post.category}</span>
                    <span className="w-1 h-1 rounded-full bg-white/40 self-center"></span>
                    <span>{post.readTime}</span>
                  </div>

                  {/* Title Tag */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/95 via-black/60 to-transparent pt-12">
                    <h3 className="text-white font-serif text-xl xl:text-3xl tracking-wide drop-shadow-2xl leading-tight">
                      {post.title}
                    </h3>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>

      {/* Load More Button matching generic simple style */}
      {visibleCount < currentArticles.length && (
        <div className="mt-20 flex justify-center w-full relative z-10 px-4">
          <button
            onClick={() => setVisibleCount(prev => prev + 6)}
            className="px-8 py-3 border border-white/20 text-white hover:bg-white hover:text-black transition-all duration-300 font-serif tracking-widest text-sm uppercase"
          >
            Load More
          </button>
        </div>
      )}

    </div>
  );
}