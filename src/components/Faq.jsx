import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

const FAQS = [
  {
    question: "What is your typical project timeline?",
    answer:
      "For our Starter package, we typically launch within 1-2 weeks. Professional and Enterprise projects generally take 2-4 weeks, depending on your project requirements.",
  },
  {
    question: "Do you offer ongoing support after launch?",
    answer:
      "Absolutely. Every plan includes an initial support period. After that, we offer dedicated monthly maintenance.",
  },
  {
    question: "Can we upgrade our plan later?",
    answer:
      "Yes! Many of our clients start with the Professional package and upgrade to Enterprise as their user base and technical requirements grow. We build everything with scalability in mind, making upgrades seamless.",
  },
 
];

const FAQItem = ({ faq, isOpen, onClick, isLast }) => {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { type: "spring", stiffness: 70, damping: 15 },
        },
      }}
      className={`overflow-hidden border-b ${
        isLast ? "border-transparent" : "border-gray-200"
      }`}
    >
      <button
        onClick={onClick}
        className="w-full flex items-center justify-between py-6 md:py-8 text-left focus:outline-none group"
      >
        <h4
          className={`text-lg md:text-2xl tracking-tight pr-6 transition-colors duration-300 font-normal ${
            isOpen
              ? "text-[#1C0770]"
              : "text-[#1A1A1E] group-hover:text-[#1C0770]/70"
          }`}
        >
          {faq.question}
        </h4>

        <div
          className={`flex-shrink-0 transition-colors duration-300 ${
            isOpen
              ? "text-[#1C0770]"
              : "text-gray-400 group-hover:text-[#1C0770]"
          }`}
        >
          <motion.div
            initial={false}
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            {isOpen ? (
              <Minus className="w-5 h-5 stroke-[2px]" />
            ) : (
              <Plus className="w-5 h-5 stroke-[2px]" />
            )}
          </motion.div>
        </div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div className="pb-8 pt-0 text-gray-500 text-sm md:text-base font-normal leading-relaxed md:pr-12">
              {faq.answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
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
    <section className="relative py-24 bg-white overflow-hidden min-h-screen flex flex-col justify-center">
      <div className="relative z-10 max-w-6xl mx-auto px-4 md:px-12 w-full">

        {/* ✅ FIXED HEADER (no nested h2) */}
        <motion.h2
          variants={headerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-4xl md:text-6xl font-bold tracking-tight text-[#1C0770] mb-12 text-center"
        >
          Most Ask{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1C0770] to-blue-500">
            Questions
          </span>
        </motion.h2>

        {/* FAQ List Area */}
        <div className="max-w-3xl mx-auto">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="flex flex-col"
          >
            {FAQS.map((faq, index) => (
              <FAQItem
                key={index}
                faq={faq}
                isOpen={activeIndex === index}
                isLast={index === FAQS.length - 1}
                onClick={() =>
                  setActiveIndex(activeIndex === index ? null : index)
                }
              />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;