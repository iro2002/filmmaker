import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { blogData } from "../data/journalData";

export default function JournalSection() {
  const [hoveredPost, setHoveredPost] = useState(null);
  const [visibleCount, setVisibleCount] = useState(2);
  const navigate = useNavigate();

  return (
    <section className="relative w-full bg-[#050505] text-white pt-24 pb-12 md:pt-32 md:pb-16 select-none z-20">
      <div className="max-w-7xl mx-auto px-4 md:px-8">

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-16 md:mb-24 flex flex-col md:flex-row md:items-end justify-between gap-6"
        >
          <div>
            <h2 onClick={() => navigate('/journal')} className="text-5xl md:text-8xl font-serif tracking-tighter cursor-pointer hover:text-zinc-300 transition-colors">
              Journal
            </h2>
            <p className="mt-4 text-zinc-400 max-w-md text-sm md:text-base leading-relaxed">
              Industry insights, creative reflections, and detailed breakdowns of our most ambitious projects.
            </p>
          </div>

          <div className="flex gap-4 text-xs font-bold tracking-widest uppercase text-zinc-500">
            <Link to="/journal" className="text-white border-b border-white pb-1 cursor-pointer hover:text-white transition-colors">
              All
            </Link>
            <span className="hover:text-white transition-colors cursor-pointer">Insights</span>
            <span className="hover:text-white transition-colors cursor-pointer">Projects</span>
          </div>
        </motion.div>

        {/* Blog Post List */}
        <div className="flex flex-col border-t border-zinc-800">
          {blogData.slice(0, visibleCount).map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
              onMouseEnter={() => setHoveredPost(post.id)}
              onMouseLeave={() => setHoveredPost(null)}
              onClick={() => navigate(`/journal/${post.slug}`)}
              className="group relative grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-12 items-center py-10 md:py-16 border-b border-zinc-800 cursor-pointer"
            >

              {/* Image Column */}
              <div className="md:col-span-4 overflow-hidden aspect-[4/3] relative rounded-sm">
                <img
                  src={post.imageSrc}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105 saturate-50 group-hover:saturate-100"
                />
                <div className="absolute inset-0 bg-black/20 transition-opacity duration-500 group-hover:opacity-0" />
              </div>

              {/* Content Column */}
              <div className="md:col-span-8 flex flex-col justify-center">
                <div className="flex items-center gap-4 mb-4 text-[10px] md:text-xs font-bold tracking-widest uppercase text-zinc-500">
                  <span className="text-white">{post.category}</span>
                  <span>&mdash;</span>
                  <span>{post.date}</span>
                  <span className="hidden sm:inline">&mdash;</span>
                  <span className="hidden sm:inline">{post.readTime}</span>
                </div>

                <h3 className="text-3xl md:text-5xl lg:text-6xl font-serif tracking-tighter mb-4 md:mb-6 transition-colors duration-300 group-hover:text-zinc-300">
                  {post.title}
                </h3>

                <p className="text-zinc-400 text-sm md:text-base max-w-2xl leading-relaxed mb-6 md:mb-8 opacity-80 group-hover:opacity-100 transition-opacity">
                  {post.excerpt}
                </p>

                <div className="flex items-center gap-3 text-xs font-bold tracking-widest uppercase mt-auto">
                  <span className="border-b border-transparent group-hover:border-white pb-1 transition-all duration-300">
                    Read Article
                  </span>
                  <svg className="w-4 h-4 transition-transform duration-500 group-hover:translate-x-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth="2" d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </div>
              </div>

            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
