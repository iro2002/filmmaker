import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { blogData } from "../data/journalData";

export default function Article() {
    const { slug } = useParams();

    const article = blogData.find(post => post.slug === slug);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [slug]);

    if (!article) {
        return (
            <div className="min-h-screen bg-[#050505] flex items-center justify-center text-white">
                <div className="text-center">
                    <h1 className="text-4xl font-serif mb-4">Article Not Found</h1>
                    <Link to="/journal" className="text-zinc-500 hover:text-white border-b border-zinc-500 pb-1">Return to Journal</Link>
                </div>
            </div>
        );
    }

    return (
        <article className="min-h-screen bg-[#050505] text-white pt-32 pb-32">
            {/* Banner Image */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
                className="w-full h-[50vh] md:h-[70vh] relative mb-16 md:mb-24"
            >
                <img
                    src={article.imageSrc}
                    alt={article.title}
                    className="w-full h-full object-cover grayscale-[30%]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-black/40 to-transparent" />
            </motion.div>

            <div className="max-w-4xl mx-auto px-6 md:px-12 relative z-10 -mt-32 md:-mt-48">

                {/* Meta */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="flex items-center gap-4 text-[10px] md:text-sm font-bold tracking-widest uppercase text-zinc-400 mb-8"
                >
                    <span className="text-white">{article.category}</span>
                    <span>&mdash;</span>
                    <span>{article.date}</span>
                    <span className="hidden sm:inline">&mdash;</span>
                    <span className="hidden sm:inline">{article.readTime}</span>
                </motion.div>

                {/* Title */}
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="text-4xl md:text-6xl lg:text-7xl font-serif tracking-tighter leading-tight mb-12"
                >
                    {article.title}
                </motion.h1>

                {/* Content Segment */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    className="prose prose-invert prose-lg md:prose-xl max-w-none text-zinc-300 font-light leading-relaxed"
                >
                    <p className="text-xl md:text-2xl text-white font-medium mb-12 opacity-90 leading-relaxed">
                        {article.excerpt}
                    </p>
                    <p>
                        {article.content}
                    </p>

                    {/* Back to journal */}
                    <div className="mt-24 pt-12 border-t border-zinc-800">
                        <Link to="/journal" className="inline-flex items-center gap-3 text-sm font-bold tracking-widest uppercase text-zinc-500 hover:text-white transition-colors group">
                            <span className="group-hover:-translate-x-2 transition-transform">&larr;</span>
                            <span className="border-b border-transparent group-hover:border-white pb-1 transition-all">Back to Journal</span>
                        </Link>
                    </div>
                </motion.div>

            </div>
        </article>
    );
}
