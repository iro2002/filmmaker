import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send } from "lucide-react";

const CONTACT_INFO = [
  {
    icon: Mail,
    title: "Email Us",
    detail: "hello@youragency.com",
    subDetail: "Drop us a line anytime",
  },
  {
    icon: Phone,
    title: "Call Us",
    detail: "+94 77 123 4567",
    subDetail: "Mon-Fri, 9am to 6pm",
  },
  {
    icon: MapPin,
    title: "Visit Us",
    detail: "Colombo, Sri Lanka",
    subDetail: "By appointment only",
  },
];

const SubmitButton = ({ isSubmitting }) => (
  <motion.button
    type="submit"
    disabled={isSubmitting}
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    className="relative w-full group py-4 rounded-xl overflow-hidden text-[11px] font-bold tracking-[0.2em] uppercase mt-4 disabled:opacity-70"
  >
    <div className="absolute inset-0 bg-gradient-to-r from-[#1C0770] via-[#2b0bb5] to-[#3b82f6]" />
    <div className="absolute inset-0 backdrop-blur-md bg-white/10 opacity-0 group-hover:opacity-100 transition duration-500" />
    <div className="absolute -left-40 top-0 h-full w-40 bg-white/20 rotate-12 group-hover:left-full transition-all duration-700 ease-in-out" />
    <span className="relative z-10 text-white font-black flex items-center justify-center gap-2">
      {isSubmitting ? "Sending..." : "Send Message"}
      {!isSubmitting && <Send className="w-4 h-4" />}
    </span>
  </motion.button>
);

const Contact = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setFormData({ name: "", email: "", message: "" });
      alert("Message sent successfully!");
    }, 1500);
  };

  // Animations for the Left Column (Contact Info)
  const leftColumnVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 },
    },
  };

  const infoCardVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { type: "spring", stiffness: 70, damping: 15 },
    },
  };

  // Animations for the Right Column (Form Fields)
  const formContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.4 }, // Starts slightly after the left column
    },
  };

  const formItemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 15 },
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
        
        {/* Header Section */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }} // Triggers when 30% of header is visible
          className="text-center max-w-2xl mx-auto mb-14 md:mb-20 flex flex-col items-center"
        >
          <motion.span
            variants={headerVariants}
            className="inline-block text-[9px] font-bold tracking-[0.4em] uppercase mb-2.5 text-[#1C0770]"
          >
            Get In Touch
          </motion.span>

          <motion.h2
            variants={headerVariants}
            className="text-4xl md:text-6xl font-bold tracking-tight text-[#1C0770]"
          >
            Let's start a{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1C0770] to-blue-500">
              conversation
            </span>
          </motion.h2>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-5 gap-12 lg:gap-8 items-start">
          
          {/* Left Column: Contact Info */}
          <motion.div
            variants={leftColumnVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }} // Triggers when 20% of this section is visible
            className="lg:col-span-2 space-y-6"
          >
            {CONTACT_INFO.map((info, idx) => (
              <motion.div
                key={idx}
                variants={infoCardVariants}
                className="group flex items-start gap-5 p-6 rounded-[2rem] border border-gray-100 bg-gray-50/50 hover:bg-white hover:border-[#1C0770]/30 hover:shadow-lg hover:shadow-[#1C0770]/5 transition-all duration-300"
              >
                <div className="p-3.5 rounded-2xl bg-white border border-gray-100 text-[#1C0770] group-hover:bg-[#1C0770] group-hover:text-white transition-colors duration-300">
                  <info.icon className="w-6 h-6 stroke-[2px]" />
                </div>
                <div>
                  <h4 className="text-lg font-black text-[#1A1A1E] mb-1 tracking-tight">
                    {info.title}
                  </h4>
                  <p className="text-[#1C0770] font-bold text-sm mb-1">
                    {info.detail}
                  </p>
                  <p className="text-gray-500 text-xs font-medium">
                    {info.subDetail}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Right Column: Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, type: "spring", stiffness: 50 }}
            className="lg:col-span-3 bg-white p-8 md:p-10 rounded-[2rem] border border-gray-200"
          >
            <motion.form 
              variants={formContainerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              onSubmit={handleSubmit} 
              className="space-y-6"
            >
              <div className="grid md:grid-cols-2 gap-6">
                <motion.div variants={formItemVariants} className="space-y-2">
                  <label className="text-[10px] font-bold tracking-widest uppercase text-gray-500 ml-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-5 py-4 bg-gray-50/50 border border-gray-200 rounded-xl text-sm font-medium text-[#1A1A1E] placeholder-gray-400 focus:outline-none focus:border-[#1C0770] focus:ring-1 focus:ring-[#1C0770] transition-all"
                    placeholder="John Doe"
                  />
                </motion.div>
                <motion.div variants={formItemVariants} className="space-y-2">
                  <label className="text-[10px] font-bold tracking-widest uppercase text-gray-500 ml-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-5 py-4 bg-gray-50/50 border border-gray-200 rounded-xl text-sm font-medium text-[#1A1A1E] placeholder-gray-400 focus:outline-none focus:border-[#1C0770] focus:ring-1 focus:ring-[#1C0770] transition-all"
                    placeholder="john@example.com"
                  />
                </motion.div>
              </div>

              <motion.div variants={formItemVariants} className="space-y-2">
                <label className="text-[10px] font-bold tracking-widest uppercase text-gray-500 ml-2">
                  Project Details
                </label>
                <textarea
                  required
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-5 py-4 bg-gray-50/50 border border-gray-200 rounded-xl text-sm font-medium text-[#1A1A1E] placeholder-gray-400 focus:outline-none focus:border-[#1C0770] focus:ring-1 focus:ring-[#1C0770] transition-all resize-none"
                  placeholder="Tell us about your goals, timeline, and budget..."
                />
              </motion.div>

              <motion.div variants={formItemVariants}>
                <SubmitButton isSubmitting={isSubmitting} />
              </motion.div>
            </motion.form>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Contact;