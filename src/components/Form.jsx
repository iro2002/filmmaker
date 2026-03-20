import React, { useState } from "react";
import { motion } from "framer-motion";
import { Send } from "lucide-react";

const ContactForm = () => {
  const PHONE_NUMBER = "94722006206";

  const [formData, setFormData] = useState({
    names: "",
    email: "",
    phone: "",
    date: "",
    venue: "",
    locationType: "Colombo",
    budget: "",
    aboutWedding: "",
    aboutWork: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const message = `
*New Wedding Inquiry!* 💍 ✨

*Couple:* ${formData.names}
*Email:* ${formData.email}
*Phone:* ${formData.phone}
*Date:* ${formData.date}
*Venue:* ${formData.venue}
*Region:* ${formData.locationType}
*Budget:* ${formData.budget}

*About Wedding:* ${formData.aboutWedding}
*Why Us:* ${formData.aboutWork}
    `.trim();

    const url = `https://wa.me/${PHONE_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  // Shared classes for inputs to keep code clean
  // Added 'placeholder:text-slate-300' to reduce opacity/visibility of placeholder text
  const inputClasses = "w-full border border-slate-300 p-3 text-sm focus:outline-none focus:border-emerald-800 rounded-sm placeholder:text-slate-300 placeholder:font-light transition-colors";

  return (
    <section className="py-24 bg-white text-slate-800">
      {/* WIDER CONTAINER for Horizontal Layout */}
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-emerald-800 text-[11px] font-bold uppercase tracking-[0.4em] block mb-4">
            Inquiry Form
          </span>
          {/* UPDATED: Larger Title Size */}
          <h2 className="font-serif text-5xl md:text-7xl text-slate-900 leading-[0.9]">
            Tell us about your <br className="hidden md:block"/>
            <span className="italic font-light text-emerald-800">Big Day</span>
          </h2>
        </motion.div>

        <motion.form 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          onSubmit={handleSubmit}
          className="bg-white"
        >
          
          {/* --- ROW 1: PERSONAL DETAILS (3 Columns) --- */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest font-bold text-slate-500">
                Your Names <span className="text-red-500">*</span>
              </label>
              <input 
                type="text" name="names" required placeholder="Dilshan & Nethmi"
                value={formData.names} onChange={handleChange}
                className={inputClasses}
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest font-bold text-slate-500">
                Email <span className="text-red-500">*</span>
              </label>
              <input 
                type="email" name="email" required placeholder="email@example.com"
                value={formData.email} onChange={handleChange}
                className={inputClasses}
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest font-bold text-slate-500">
                Phone <span className="text-red-500">*</span>
              </label>
              <input 
                type="tel" name="phone" required placeholder="077 123 4567"
                value={formData.phone} onChange={handleChange}
                className={inputClasses}
              />
            </div>
          </div>

          {/* --- ROW 2: WEDDING DETAILS (3 Columns) --- */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
             <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest font-bold text-slate-500">
                Date <span className="text-red-500">*</span>
              </label>
              <input 
                  type="date" name="date" required
                  value={formData.date} onChange={handleChange}
                  className={`${inputClasses} text-slate-500 uppercase`}
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest font-bold text-slate-500">
                Venue <span className="text-red-500">*</span>
              </label>
              <input 
                type="text" name="venue" required placeholder="e.g. Shangri-La"
                value={formData.venue} onChange={handleChange}
                className={inputClasses}
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest font-bold text-slate-500">
                Budget
              </label>
              <input 
                type="text" name="budget" placeholder="Approx. Budget"
                value={formData.budget} onChange={handleChange}
                className={inputClasses}
              />
            </div>
          </div>

          {/* --- ROW 3: LOCATION (Horizontal Radio Buttons) --- */}
          <div className="mb-10 p-6 bg-slate-50 rounded-sm border border-slate-100">
            <label className="text-[10px] uppercase tracking-widest font-bold text-slate-500 block mb-4">
              Location <span className="text-red-500">*</span>
            </label>
            <div className="flex flex-wrap gap-x-8 gap-y-3">
                {["Colombo", "Down South", "Hill Country", "Cultural Triangle", "Other"].map((loc) => (
                    <label key={loc} className="flex items-center gap-2 cursor-pointer group hover:bg-white px-4 py-2 rounded-full transition-all">
                        <input 
                            type="radio" name="locationType" value={loc}
                            checked={formData.locationType === loc} onChange={handleChange}
                            className="accent-emerald-800 w-4 h-4 cursor-pointer" 
                        />
                        <span className="text-xs font-medium text-slate-600 group-hover:text-emerald-800 uppercase tracking-wide">{loc}</span>
                    </label>
                ))}
            </div>
          </div>

          {/* --- ROW 4: TEXT AREAS (Side by Side) --- */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest font-bold text-slate-500">
                About Your Wedding
              </label>
              <textarea 
                name="aboutWedding" rows="4"
                placeholder="Tell us about the vibe, colors, & important moments..."
                value={formData.aboutWedding} onChange={handleChange}
                className={`${inputClasses} resize-none`}
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest font-bold text-slate-500">
                Why Us?
              </label>
              <textarea 
                name="aboutWork" rows="4"
                placeholder="What caught your eye about our photography?"
                value={formData.aboutWork} onChange={handleChange}
                className={`${inputClasses} resize-none`}
              />
            </div>
          </div>

          {/* SUBMIT */}
          <div className="text-center">
            <button 
                type="submit"
                className="inline-flex bg-emerald-800 text-white font-bold uppercase tracking-[0.2em] text-xs py-5 px-16 hover:bg-emerald-900 transition-all duration-300 items-center gap-3 shadow-xl rounded-sm hover:translate-y-[-2px]"
            >
                Check Availability <Send size={14} />
            </button>
          </div>

        </motion.form>
      </div>
    </section>
  );
};

export default ContactForm;