import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const servicesData = [
  {
    title: "Esthetic Dentistry",
    description: "From teeth whitening and veneers to complete smile makeovers, we use the latest techniques to create natural, stunning results.",
    mainImg: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=1200",
    smallImg: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&q=80&w=600",
    links: ["Smile Makeovers", "Esthetic Bonding", "Teeth Whitening", "Porcelain Veneers"]
  },
  {
    title: "Restorative Dentistry",
    description: "Expert restorative treatments to rebuild, protect, and restore your teeth, giving you confidence in both function and appearance.",
    mainImg: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&q=80&w=1200",
    smallImg: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=600",
    links: ["Implant Restoration", "Crowns and Bridges", "Full Mouth Rehabilitation", "Tooth-Colored Fillings"]
  },
  {
    title: "Preventive Care",
    description: "Routine exams, cleanings, and screenings designed to maintain oral health and prevent issues before they arise.",
    mainImg: "https://images.unsplash.com/photo-1609840114035-3c981b782dfe?auto=format&fit=crop&q=80&w=1200",
    smallImg: "https://images.unsplash.com/photo-1532938911079-1b06ac7ce122?auto=format&fit=crop&q=80&w=600",
    links: ["Oral Cancer Screenings", "Comprehensive Exams", "Deep Cleanings", "Fluoride Treatments"]
  }
];

export default function ServicesSection() {
  const containerRef = useRef(null);

  // 400vh gives us plenty of scroll distance to slide through the 3 panels
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Moves the inner track horizontally based on scroll progress
  // -66.66% because there are 3 panels (100vw each). To show the last one, we move left by 2 panels.
  const xTransform = useTransform(scrollYProgress, [0, 1], ["0%", "-66.666%"]);

  return (
    <section ref={containerRef} className="h-[400vh] relative bg-[#111] text-white">
      
      {/* Sticky container that stays on screen while scrolling */}
      <div className="sticky top-0 h-screen overflow-hidden flex items-center">
        
        {/* --- DESKTOP SIDEBAR MENU --- */}
        <div className="hidden md:block absolute bottom-12 left-12 z-50">
          <p className="text-xs text-gray-400 font-bold mb-4 uppercase tracking-widest">Services:</p>
          <ul className="flex flex-col gap-2 text-sm font-medium text-gray-500">
             <li>Esthetic Dentistry</li>
             <li>Restorative Dentistry</li>
             <li>Preventive Care</li>
          </ul>
        </div>

        {/* --- THE HORIZONTAL SCROLLING TRACK --- */}
        <motion.div 
          style={{ x: xTransform }} 
          className="flex h-full w-[300vw]"
        >
          {servicesData.map((service, index) => (
            
            // INDIVIDUAL SLIDE (100vw wide)
            <div key={index} className="w-screen h-full flex flex-col md:flex-row flex-shrink-0">
              
              {/* LEFT SIDE (Main Image & Giant Text) */}
              {/* Mobile: takes top 50vh. Desktop: takes full height */}
              <div className="w-full md:w-1/2 h-[50vh] md:h-full relative overflow-hidden">
                <img 
                  src={service.mainImg} 
                  alt={service.title} 
                  className="absolute inset-0 w-full h-full object-cover grayscale opacity-60"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                
                <h2 className="absolute bottom-6 left-6 md:bottom-12 md:left-48 text-[12vw] md:text-[8vw] font-serif leading-none tracking-tighter">
                  {service.title.split(' ')[0]} <br />
                  <span className="italic font-light">{service.title.split(' ')[1]}</span>
                </h2>
              </div>

              {/* RIGHT SIDE (Description & Links) */}
              {/* Mobile: takes bottom 50vh. Desktop: takes full height */}
              <div className="w-full md:w-1/2 h-[50vh] md:h-full bg-[#161616] flex flex-col justify-center p-8 md:p-24 relative">
                
                <div className="max-w-md">
                  <p className="text-lg md:text-xl font-medium leading-snug mb-8">
                    {service.description}
                  </p>

                  <div className="flex gap-8 items-start">
                    {/* Small Image */}
                    <div className="hidden md:block w-32 h-40 bg-gray-800 flex-shrink-0 overflow-hidden rounded-sm">
                       <img src={service.smallImg} alt="Detail" className="w-full h-full object-cover" />
                    </div>

                    {/* List of Links */}
                    <ul className="w-full flex flex-col gap-4">
                      {service.links.map((link, i) => (
                        <li key={i} className="flex justify-between items-center border-b border-gray-700 pb-2 text-sm md:text-base hover:text-gray-400 cursor-pointer transition-colors">
                          {link} <span>↗</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

              </div>

            </div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}