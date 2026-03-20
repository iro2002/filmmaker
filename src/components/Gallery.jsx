import React, { useState, useEffect } from "react";

const Projects = () => {
  // --- STATE MANAGEMENT ---
  const [showDesktopArchive, setShowDesktopArchive] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);

  // Expanded Data Array (Need more items to show off pagination and categories)
  const projectsList = [
    { id: "01", title: "Celestial", category: "VFX", image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop" },
    { id: "02", title: "Neon Nights", category: "Color Grading", image: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2670&auto=format&fit=crop" },
    { id: "03", title: "Velocity", category: "Editing", image: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=2832&auto=format&fit=crop" },
    { id: "04", title: "The Deep", category: "Sound Design", image: "https://images.unsplash.com/photo-1518182170546-076616fd61fd?q=80&w=2670&auto=format&fit=crop" },
    { id: "05", title: "Urban Pulse", category: "Commercial", image: "https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=2832&auto=format&fit=crop" },
    { id: "06", title: "Echoes", category: "VFX", image: "https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=2659&auto=format&fit=crop" },
    { id: "07", title: "Horizon", category: "Color Grading", image: "https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=2694&auto=format&fit=crop" },
    { id: "08", title: "Apex", category: "Editing", image: "https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?q=80&w=2670&auto=format&fit=crop" },
  ];

  // --- LOGIC ---
  const categories = ["All", ...new Set(projectsList.map((item) => item.category))];
  const featuredProjects = projectsList.slice(0, 3); // Top 3 for Desktop Showcase

  // Filter & Pagination Logic
  const filteredProjects = activeCategory === "All" 
    ? projectsList 
    : projectsList.filter(p => p.category === activeCategory);

  const itemsPerPage = 4; // Shows 2 rows of 2 on mobile
  const totalPages = Math.ceil(filteredProjects.length / itemsPerPage);
  
  const currentProjects = filteredProjects.slice(
    (currentPage - 1) * itemsPerPage, 
    currentPage * itemsPerPage
  );

  // Reset to page 1 when category changes
  useEffect(() => {
    setCurrentPage(1);
  }, [activeCategory]);

  return (
    <section id="projects" className="relative w-full bg-black text-white py-12 md:py-32 font-['Inter'] min-h-screen">
      
      {/* --- HEADER --- */}
      <div className="relative z-10 px-4 sm:px-6 max-w-7xl mx-auto mb-10 md:mb-20">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div>
            <h2 className="text-xs md:text-sm tracking-widest text-gray-400 uppercase mb-2 md:mb-3">Portfolio</h2>
            <h3 className="text-3xl md:text-5xl lg:text-6xl font-semibold leading-tight">
              Selected <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">
                cinematic works.
              </span>
            </h3>
          </div>
          
          {/* Desktop "Back to Featured" Button (Only visible in Archive mode) */}
          {showDesktopArchive && (
            <button 
              onClick={() => setShowDesktopArchive(false)}
              className="hidden md:flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
            >
              ← Back to Featured
            </button>
          )}
        </div>
      </div>

      <div className="relative z-10 px-4 sm:px-6 max-w-7xl mx-auto">

        {/* =========================================
            DESKTOP VIEW 1: FEATURED STACKING CARDS 
            (Hidden on Mobile. Hidden if Archive is open)
        ========================================= */}
        {!showDesktopArchive && (
          <div className="hidden md:flex flex-col w-full pb-20">
            {featuredProjects.map((project, index) => (
              <div 
                key={project.id}
                className="sticky w-full flex flex-col justify-end overflow-hidden rounded-3xl bg-gray-900 group cursor-pointer border border-white/10 h-[500px] lg:h-[600px] shadow-2xl shadow-black"
                style={{ top: `calc(100px + ${index * 40}px)` }}
              >
                <img src={project.image} alt={project.title} className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-[1.5s]" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
                <div className="relative z-20 w-full p-10 flex flex-col justify-end h-full">
                  <p className="text-gray-300 text-xs font-mono uppercase tracking-widest mb-2">{project.category}</p>
                  <h4 className="text-4xl lg:text-5xl font-semibold text-white group-hover:text-gray-200">{project.title}</h4>
                </div>
              </div>
            ))}
            
            {/* Desktop "View All" Trigger */}
            <div className="w-full flex justify-center mt-32 relative z-50">
              <button 
                onClick={() => {
                  setShowDesktopArchive(true);
                  window.scrollTo({ top: document.getElementById('projects').offsetTop, behavior: 'smooth' });
                }}
                className="px-8 py-4 bg-white text-black rounded-full font-medium hover:bg-gray-200 transition-colors"
              >
                View Full Archive ({projectsList.length} Projects)
              </button>
            </div>
          </div>
        )}

        {/* =========================================
            DESKTOP VIEW 2: FULL ARCHIVE GRID
            (Hidden on Mobile. Visible when Archive is open)
        ========================================= */}
        {showDesktopArchive && (
          <div className="hidden md:block animate-fade-in">
            {/* Desktop Category Filters */}
            <div className="flex flex-wrap gap-3 mb-10">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-5 py-2 rounded-full text-sm transition-all ${activeCategory === cat ? "bg-white text-black" : "bg-white/10 text-gray-400 hover:bg-white/20 hover:text-white"}`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Desktop Grid (3 columns) */}
            <div className="grid grid-cols-3 gap-6">
              {filteredProjects.map((project) => (
                <div key={project.id} className="group cursor-pointer">
                  <div className="w-full aspect-video rounded-xl overflow-hidden mb-4 border border-white/10">
                    <img src={project.image} alt={project.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <h4 className="text-xl font-semibold text-white">{project.title}</h4>
                  <p className="text-sm text-gray-500">{project.category}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* =========================================
            MOBILE VIEW: 2-COLUMN PAGINATED GRID
            (Always visible on Mobile. Hidden on Desktop)
        ========================================= */}
        <div className="block md:hidden">
          
          {/* Mobile Category Filters (Scrollable Row) */}
          <div className="flex gap-2 overflow-x-auto pb-4 mb-6 -mx-4 px-4 custom-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-xs whitespace-nowrap transition-all border ${activeCategory === cat ? "bg-white text-black border-white" : "bg-transparent text-gray-400 border-gray-700"}`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Mobile 2-Column Grid */}
          <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-8">
            {currentProjects.map((project) => (
              <div key={project.id} className="flex flex-col cursor-pointer group">
                {/* 4:5 Aspect Ratio for slightly taller mobile cards */}
                <div className="w-full aspect-[4/5] rounded-lg overflow-hidden mb-3 border border-white/10 relative">
                  <img src={project.image} alt={project.title} className="w-full h-full object-cover group-active:scale-105 transition-transform duration-300" />
                  <div className="absolute inset-0 bg-black/20 group-active:bg-transparent transition-colors"></div>
                </div>
                <div className="px-1">
                  <h4 className="text-sm font-semibold text-gray-100 truncate">{project.title}</h4>
                  <p className="text-[10px] text-gray-500 uppercase tracking-wider mt-0.5">{project.category}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-4 mt-8 pt-6 border-t border-white/10">
              <button 
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="w-10 h-10 rounded-full flex items-center justify-center bg-white/5 border border-white/10 disabled:opacity-30 disabled:cursor-not-allowed text-white"
              >
                ←
              </button>
              
              <span className="text-sm text-gray-400 font-mono">
                {currentPage} / {totalPages}
              </span>

              <button 
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="w-10 h-10 rounded-full flex items-center justify-center bg-white/5 border border-white/10 disabled:opacity-30 disabled:cursor-not-allowed text-white"
              >
                →
              </button>
            </div>
          )}

        </div>

      </div>

      {/* Embedded CSS for Mobile Scrollbar Hiding */}
      <style>{`
        .custom-scrollbar::-webkit-scrollbar { display: none; }
        .custom-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        .animate-fade-in { animation: fadeIn 0.5s ease-in forwards; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>

    </section>
  );
};

export default Projects;