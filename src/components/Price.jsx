import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ChevronLeft, ChevronRight } from "lucide-react";

const PLANS = [
  {
    name: "Starter",
    price: "9,900",
    description:
      "Perfect for individuals and small businesses who need a clean, professional online presence.",
    features: [
      "Single Page Website",
      "Modern & Clean UI Design",
      "Mobile & Tablet Responsive",
      "Social Media Integration",
      "Basic On-Page SEO Setup",
      "Fast Loading & Optimized Images",
      "Free Domain & SSL",
      "Web Hosting (Free for 1 Year)",
      "1 Month Support",
    ],
    popular: false,
  },
  {
    name: "E-Commerce Startup",
    price: "14,900",
    description:
      "Ideal for startups that want to showcase products and launch their brand online quickly.",
    features: [
      "Up to 3 Pages Website",
      "Product Showcase Sections",
      "Homepage for Offers & Featured Products",
      "Modern E-Commerce Style UI",
      "Mobile Responsive Design",
      "Call-to-Action & Enquiry Buttons",
      "Basic On-Page SEO Setup",
      "Performance Optimization",
      "Free Domain & SSL",
      "Web Hosting (Optional – LKR 3,000)",
      "2 Months Support",
    ],
    popular: false,
  },
  {
    name: "Professional",
    price: "24,900",
    description:
      "Best for growing brands, hotels and tourism businesses that need strong design and visibility.",
    features: [
      "Up to 5 Pages Website",
      "Smooth Animations & Interactions",
      "Gallery / Portfolio / Package Sections",
      "Speed & Performance Optimization",
      "On-Page SEO for All Pages",
      "Google Map & Contact Form",
      "Free Domain & SSL Setup",
      "Web Hosting (Optional – LKR 3,000)",
      "3 Months Support",
    ],
    popular: true,
  },
];

const PremiumButton = () => (
  <motion.button
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.96 }}
    className="relative w-full group py-3.5 rounded-full overflow-hidden text-[9px] font-bold tracking-[0.2em] uppercase mt-auto"
  >
    <div className="absolute inset-0 bg-gradient-to-r from-[#1C0770] via-[#2b0bb5] to-[#3b82f6]" />
    <div className="absolute inset-0 backdrop-blur-md bg-white/10 opacity-0 group-hover:opacity-100 transition duration-500" />
    <div className="absolute -left-40 top-0 h-full w-40 bg-white/20 rotate-12 group-hover:left-full transition-all duration-700 ease-in-out" />
    <span className="relative z-10 text-white font-black">Hire Us</span>
  </motion.button>
);

const PriceCard = ({ plan }) => (
  <div
    className={`relative flex flex-col h-full p-7 rounded-[2rem] border transition-all duration-300 bg-white
      ${
        plan.popular
          ? "border-[#1C0770] border-2 lg:-translate-y-2"
          : "border-gray-200 border"
      }`}
  >
    {plan.popular && (
      <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#1C0770] text-white text-[8px] font-black uppercase tracking-[0.2em] px-5 py-1.5 rounded-full whitespace-nowrap z-30">
        Most Popular
      </div>
    )}

    <h3 className="text-xl font-black text-[#1A1A1E] mb-1.5 tracking-tight uppercase">
      {plan.name}
    </h3>

    <p className="text-gray-500 text-[12px] mb-6 min-h-[36px] leading-relaxed font-medium">
      {plan.description}
    </p>

    <div className="mb-8 flex items-baseline gap-1">
      <span className="text-lg font-bold text-[#1A1A1E]">LKR</span>
      <span className="text-4xl font-black text-[#1A1A1E] tracking-tighter">
        {plan.price}
      </span>
      <span className="text-gray-400 font-bold text-[9px] uppercase tracking-widest ml-1.5">
        / project
      </span>
    </div>

    <ul className="space-y-4 mb-10 flex-grow">
      {plan.features.map((feature) => (
        <li
          key={feature}
          className="flex items-center gap-2.5 text-[12px] text-gray-700 font-semibold"
        >
          <div className="p-1 rounded-full flex-shrink-0 bg-gray-50">
            <Check className="w-3 h-3 text-[#1C0770] stroke-[4px]" />
          </div>
          {feature}
        </li>
      ))}
    </ul>

    <PremiumButton />
  </div>
);

const PricePlan = () => {

  // ✅ FIX: start from lowest price plan (Starter)
  const [mobileIndex, setMobileIndex] = useState(0);

  const handleNext = () =>
    setMobileIndex((prev) => (prev + 1) % PLANS.length);

  const handlePrev = () =>
    setMobileIndex((prev) => (prev - 1 + PLANS.length) % PLANS.length);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 100 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 70,
        damping: 15,
        duration: 1,
      },
    },
  };

  const headerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  return (
    <section className="relative py-20 bg-white overflow-hidden min-h-screen flex flex-col justify-center">
      <div className="relative z-10 max-w-6xl mx-auto px-4 md:px-12 w-full">

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-14 md:mb-20 flex flex-col items-center"
        >
          <motion.span
            variants={headerVariants}
            className="inline-block text-[9px] font-bold tracking-[0.4em] uppercase mb-2.5 text-[#1C0770]"
          >
            Pricing Strategy
          </motion.span>

          <motion.h2
            variants={headerVariants}
            className="text-4xl md:text-6xl font-bold tracking-tight text-[#1C0770]"
          >
            Pricing{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1C0770] to-blue-500">
              strategy
            </span>
          </motion.h2>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="hidden lg:grid grid-cols-3 gap-8 items-stretch"
        >
          {PLANS.map((plan) => (
            <motion.div key={plan.name} variants={cardVariants}>
              <PriceCard plan={plan} />
            </motion.div>
          ))}
        </motion.div>

        {/* Mobile slider */}
        <div className="block lg:hidden relative max-w-[360px] mx-auto">
          <button
            onClick={handlePrev}
            className="absolute -left-4 top-1/2 -translate-y-1/2 z-30 p-3 bg-white rounded-full border border-gray-200 text-[#1C0770] active:scale-90 transition-all"
          >
            <ChevronLeft className="w-5 h-5 stroke-[3px]" />
          </button>

          <button
            onClick={handleNext}
            className="absolute -right-4 top-1/2 -translate-y-1/2 z-30 p-3 bg-white rounded-full border border-gray-200 text-[#1C0770] active:scale-90 transition-all"
          >
            <ChevronRight className="w-5 h-5 stroke-[3px]" />
          </button>

          <div className="overflow-hidden py-8 px-2">
            <AnimatePresence mode="wait">
              <motion.div
                key={mobileIndex}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                <PriceCard plan={PLANS[mobileIndex]} />
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex justify-center gap-2.5 mt-4">
            {PLANS.map((_, idx) => (
              <div
                key={idx}
                className={`h-1 rounded-full transition-all duration-500 ${
                  idx === mobileIndex
                    ? "w-6 bg-[#1C0770]"
                    : "w-1.5 bg-gray-300"
                }`}
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default PricePlan;