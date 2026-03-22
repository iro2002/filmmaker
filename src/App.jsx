import React from "react";
import Header from "./components/Header";
import Service from "./components/Service";
import Gallery from "./components/Gallery";
import AIAssistant from "./components/AIAssistant";
import Hero from "./components/Hero";
import Artist from "./components/Artist";
import Curve from "./components/Curve";

import Album from "./components/Album";
import Price from "./components/Price";
import Footer from "./components/Footer";
import VideoShowcase from "./components/Video";
import Faq from "./components/Faq";
import Contact from "./components/Contact";
import Form from "./components/Form";

const App = () => {
  return (
    <div className="min-h-screen">

      
      <Hero />
      <Curve />

      <Gallery />
   
      <Artist />
      <Album />

      <Price />

    
  
      <Footer />
    </div>
  );
};

export default App;
