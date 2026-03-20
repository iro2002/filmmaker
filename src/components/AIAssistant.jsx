import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Instagram, Facebook, MessageCircle, X } from "lucide-react";

const socials = [
  { 
    icon: MessageCircle, 
    url: "https://wa.me/94722006206", 
    label: "WhatsApp"
  },
  { 
    icon: Instagram, 
    url: "https://www.instagram.com/tropicalwedlock_lk?igsh=MXRoeTExMnRqYjk5bA==", 
    label: "Instagram"
  },
  { 
    icon: Facebook, 
    url: "https://www.facebook.com/TropicalWedlock", 
    label: "Facebook"
  },
];

const LiquidMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Using the same smooth ease as your AboutUs section
  const customEase = [0.22, 1, 0.36, 1];

  return (
    <div className="fixed bottom-6 right-6 flex flex-col items-end gap-3 z-[100]" style={{ fontFamily: "'Inter', sans-serif" }}>
      
      {/* Social Buttons */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="flex flex-col gap-3 mb-2 items-end"
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.8 }}
            transition={{ duration: 0.4, ease: customEase, staggerChildren: 0.1, staggerDirection: -1 }}
          >
            {socials.map((social, idx) => (
              <motion.a
                key={social.label}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 group"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3, ease: customEase }}
              >
                {/* Label (Tooltip) */}
                <span className="bg-[#1C0770] text-white text-[10px] font-bold uppercase tracking-[0.15em] px-3 py-1.5 rounded-md shadow-[0_4px_15px_rgba(28,7,112,0.2)] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                  {social.label}
                </span>

                {/* Icon Circle - Clean, colorless icons */}
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-white/90 backdrop-blur-md shadow-[0_8px_20px_rgb(0,0,0,0.08)] border border-black/5 hover:scale-110 transition-transform duration-300">
                  <social.icon className="w-5 h-5 text-[#1C0770]" strokeWidth={2} />
                </div>
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Toggle Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className={`relative flex items-center justify-center w-14 h-14 rounded-full text-white transition-all duration-300 z-50 ${
            isOpen 
              ? "bg-[#1C0770] shadow-[0_10px_25px_rgba(28,7,112,0.3)]" 
              : "bg-gradient-to-r from-[#1C0770] via-[#2b0bb5] to-[#3b82f6] shadow-[0_10px_25px_rgba(28,7,112,0.3)] hover:shadow-[0_15px_30px_rgba(28,7,112,0.4)]"
        }`}
        whileTap={{ scale: 0.9 }}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X size={24} strokeWidth={2.5} />
            </motion.div>
          ) : (
            <motion.div
              key="open"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <MessageCircle size={24} strokeWidth={2} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
};

export default LiquidMenu;