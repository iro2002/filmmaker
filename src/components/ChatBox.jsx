"use client";

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, User, Bot } from 'lucide-react';

const RealChatBox = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  // Initial greeting message
  const [messages, setMessages] = useState([
    { id: 1, text: "Hello! How can we help you with your project today?", sender: 'bot' }
  ]);

  const toggleChat = () => setIsOpen(!isOpen);

  // Auto-scroll to the bottom when a new message is added
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    // 1. Add User Message to UI
    const newUserMessage = { id: Date.now(), text: inputValue, sender: 'user' };
    setMessages((prev) => [...prev, newUserMessage]);

    // 2. Redirect to WhatsApp
    // REPLACE THIS with your actual WhatsApp number (Include country code, no '+' or spaces)
    // Example: "14155552671" for US, "447700900077" for UK
    const myWhatsAppNumber = "1234567890";

    // Encode the text so it is safe for a URL
    const encodedMessage = encodeURIComponent(inputValue);
    const whatsappUrl = `https://wa.me/${myWhatsAppNumber}?text=${encodedMessage}`;

    // Open WhatsApp in a new tab
    window.open(whatsappUrl, '_blank');

    // Clear the input
    setInputValue("");

    // 3. Simulate a bot reply in the UI acknowledging the redirect
    setIsTyping(true);
    setTimeout(() => {
      setMessages((prev) => [...prev, {
        id: Date.now() + 1,
        text: "Opening WhatsApp... You can continue our conversation there!",
        sender: 'bot'
      }]);
      setIsTyping(false);
    }, 1000);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end">

      {/* The Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="mb-4 w-[90vw] max-w-[380px] h-[500px] max-h-[75vh] bg-[#050505]/95 backdrop-blur-xl border border-white/20 rounded-2xl flex flex-col overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.8)]"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-white/10 bg-black/50">
              <h3 className="font-serif text-white tracking-widest text-sm uppercase">Live Support</h3>
              <button onClick={toggleChat} className="text-zinc-400 hover:text-white transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex w-full ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex items-end gap-2 max-w-[80%] ${msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>

                    {/* Avatar */}
                    <div className={`flex items-center justify-center w-6 h-6 rounded-full flex-shrink-0 ${msg.sender === 'user' ? 'bg-white text-black' : 'bg-zinc-800 text-white'}`}>
                      {msg.sender === 'user' ? <User className="w-3 h-3" /> : <Bot className="w-3 h-3" />}
                    </div>

                    {/* Bubble */}
                    <div className={`px-4 py-2 text-sm leading-relaxed ${msg.sender === 'user'
                      ? 'bg-white text-black rounded-2xl rounded-br-sm'
                      : 'bg-zinc-900 border border-white/10 text-zinc-300 rounded-2xl rounded-bl-sm'
                      }`}>
                      {msg.text}
                    </div>
                  </div>
                </motion.div>
              ))}

              {/* Typing Indicator */}
              {isTyping && (
                <div className="flex w-full justify-start">
                  <div className="flex items-end gap-2 max-w-[80%]">
                    <div className="flex items-center justify-center w-6 h-6 rounded-full flex-shrink-0 bg-zinc-800 text-white">
                      <Bot className="w-3 h-3" />
                    </div>
                    <div className="px-4 py-3 bg-zinc-900 border border-white/10 rounded-2xl rounded-bl-sm flex gap-1">
                      <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0 }} className="w-1.5 h-1.5 bg-zinc-500 rounded-full" />
                      <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }} className="w-1.5 h-1.5 bg-zinc-500 rounded-full" />
                      <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }} className="w-1.5 h-1.5 bg-zinc-500 rounded-full" />
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <form onSubmit={handleSendMessage} className="p-3 border-t border-white/10 bg-black/50">
              <div className="relative flex items-center">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Type your message..."
                  className="w-full bg-zinc-900 border border-white/10 text-white placeholder-zinc-500 text-sm rounded-full pl-5 pr-12 py-3 focus:outline-none focus:border-white/30 transition-colors"
                />
                <button
                  type="submit"
                  disabled={!inputValue.trim()}
                  className="absolute right-1 w-9 h-9 flex items-center justify-center bg-white text-black rounded-full hover:scale-105 disabled:opacity-50 disabled:hover:scale-100 transition-all"
                >
                  <Send className="w-4 h-4 ml-0.5" />
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={toggleChat}
        className="flex items-center justify-center w-14 h-14 bg-[#050505]/90 backdrop-blur-md border border-white/30 text-white rounded-full shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:bg-white hover:text-black transition-colors duration-300 relative"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="absolute"
            >
              <X className="w-6 h-6" />
            </motion.div>
          ) : (
            <motion.div
              key="chat"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="absolute"
            >
              <MessageSquare className="w-6 h-6" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
};

export default RealChatBox;