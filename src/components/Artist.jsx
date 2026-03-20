import React from "react";

const Feedback = () => {
  const feedbackList = [
    {
      id: 1,
      client: "Sarah Jenkins",
      role: "Director, Starlight Studios",
      quote: "An absolute masterclass in pacing and visual storytelling. The edit transformed our raw footage into a visceral experience that left the audience speechless.",
      rating: 5,
      highlight: true // Makes this card larger/stand out
    },
    {
      id: 2,
      client: "Marcus Chen",
      role: "Creative Lead, Synthwave Records",
      quote: "The color grading was phenomenal. They didn't just balance the image; they gave our music video a distinct, neon-drenched soul.",
      rating: 5,
      highlight: false
    },
    {
      id: 3,
      client: "Elena Rodriguez",
      role: "Producer, Oceanic Docs",
      quote: "Incredible attention to detail in the sound design. The auditory landscape they built grounded our documentary and elevated the emotional stakes.",
      rating: 5,
      highlight: false
    },
    {
      id: 4,
      client: "David Thorne",
      role: "CEO, Apex Automotive",
      quote: "Fast, dynamic, and aggressively stylish. They perfectly captured the adrenaline and velocity of our brand in a 60-second spot.",
      rating: 5,
      highlight: false
    }
  ];

  // Helper function to render stars
  const renderStars = (count) => {
    return (
      <div className="flex gap-1 mb-6">
        {[...Array(count)].map((_, i) => (
          <svg key={i} className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
    );
  };

  return (
    <section id="feedback" className="relative w-full bg-black text-white py-16 md:py-32 font-['Inter'] overflow-hidden">
      
      {/* Background Glow Effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-white/5 blur-[120px] rounded-[100%] pointer-events-none"></div>

      <div className="relative z-10 px-6 max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16 md:mb-24">
          <h2 className="text-sm tracking-widest text-gray-500 uppercase mb-4 font-mono flex items-center gap-3">
            <span className="w-8 h-[1px] bg-gray-500"></span>
            Critical Acclaim
            <span className="w-8 h-[1px] bg-gray-500"></span>
          </h2>
          <h3 className="text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight tracking-tight max-w-2xl">
            Trusted by directors, <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-400 to-gray-600">
              agencies, and brands.
            </span>
          </h3>
        </div>

        {/* Feedback Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {feedbackList.map((item, index) => (
            <div 
              key={item.id}
              className={`relative group p-8 md:p-10 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md hover:bg-white/10 transition-all duration-500 flex flex-col justify-between ${
                item.highlight 
                  ? "md:col-span-2 lg:col-span-2 bg-gradient-to-br from-white/10 to-transparent" 
                  : "col-span-1"
              }`}
            >
              {/* Massive subtle quote mark in background */}
              <div className="absolute top-6 right-8 text-8xl font-serif text-white opacity-5 pointer-events-none transition-opacity duration-500 group-hover:opacity-10">
                "
              </div>

              <div>
                {renderStars(item.rating)}
                <p className={`text-gray-300 font-light leading-relaxed mb-8 relative z-10 ${
                  item.highlight ? "text-xl md:text-2xl lg:text-3xl" : "text-base md:text-lg"
                }`}>
                  "{item.quote}"
                </p>
              </div>

              <div className="relative z-10 flex items-center gap-4 border-t border-white/10 pt-6 mt-auto">
                {/* Minimalist Avatar Placeholder */}
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-gray-700 to-gray-500 flex items-center justify-center text-xs font-semibold uppercase text-white">
                  {item.client.charAt(0)}
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white tracking-wide">{item.client}</h4>
                  <p className="text-xs text-gray-500 font-mono uppercase tracking-wider mt-0.5">{item.role}</p>
                </div>
              </div>

            </div>
          ))}

        </div>

      </div>
    </section>
  );
};

export default Feedback;