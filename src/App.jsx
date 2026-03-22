import React from "react";
import { Routes, Route } from "react-router-dom"; // Removed BrowserRouter from here

// --- IMPORT COMPONENTS ---
import Header from "./components/Header";
import Hero from "./components/Hero";
import Curve from "./components/Curve";
import Gallery from "./components/Gallery";
import Artist from "./components/Artist";
import Album from "./components/Album";
import Price from "./components/Price";
import Footer from "./components/Footer";
import CommercialProducing from "./components/CommercialProducing";
import Work from "./components/Work";
// --- HOME PAGE COMPONENT ---
const Home = () => (
  <>
    <Hero />

    <Curve />
    <Gallery />
    <Artist />
    <Album />
    <Price />
    <Footer />
  </>
);

// --- COMMERCIAL PAGE COMPONENT ---
const Commercial = () => (
  <>
    <CommercialProducing />
    <Footer />
  </>
);

// --- MAIN APP COMPONENT ---
const App = () => {
  return (
    // Removed the <Router> wrapper here
    <div className="min-h-screen bg-[#050505]">
      {/* Header stays persistent across all routes */}
      <Header />
      
      {/* Standard routing */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/commercial-producing" element={<Commercial />} />
      </Routes>
    </div>
  );
};

export default App;