import React from "react";
import { Routes, Route } from "react-router-dom"; // Removed BrowserRouter from here

// --- IMPORT COMPONENTS ---
import Header from "./components/Header";
import Hero from "./components/Hero";
import Curve from "./components/Curve";
import Gallery from "./components/Gallery";
import Album from "./components/Album";
import Price from "./components/Price";
import Footer from "./components/Footer";
import CommercialProducing from "./components/CommercialProducing";
import Directing from "./components/Directing";
import Collaborators from "./components/Collaborators";
import Abouth from "./components/Abouth";
import HouseAndBrand from "./components/HouseAndBrand";
import JournalSection from "./components/JournalSection";
import Jurnal from "./components/Jurnal";
import Article from "./components/Article";
import ProjectDetails from "./components/ProjectDetails";

// --- HOME PAGE COMPONENT ---
const Home = () => (
  <>
    <Hero />

    <Abouth />


    <Curve />
    <JournalSection />

    <HouseAndBrand />

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

// --- COLLABORATORS PAGE COMPONENT ---
const CollaboratorsPage = () => (
  <>
    <Collaborators />
    <Footer />
  </>
);

// --- DIRECTING PAGE COMPONENT ---
const DirectingPage = () => (
  <>
    <Directing />
    <Footer />
  </>
);

// --- JOURNAL PAGE COMPONENT ---
const JournalPage = () => (
  <>
    <Jurnal />
    <Footer />
  </>
);

// --- ARTICLE PAGE COMPONENT ---
const ArticleFullPage = () => (
  <>
    <Article />
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
        <Route path="/collaborators" element={<CollaboratorsPage />} />
        <Route path="/directing" element={<DirectingPage />} />
        <Route path="/journal" element={<JournalPage />} />
        <Route path="/journal/:slug" element={<ArticleFullPage />} />
        <Route path="/project/:id" element={<ProjectDetails />} />
      </Routes>
    </div>
  );
};

export default App;