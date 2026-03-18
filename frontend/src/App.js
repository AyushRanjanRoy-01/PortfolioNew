import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";
import { Starfield, Nebula, ShootingStar } from "./components/Starfield";
import { Navigation } from "./components/Navigation";
import { WhatsAppButton } from "./components/WhatsAppButton";
import { ScrollProgress } from "./components/ScrollProgress";
import { Footer } from "./components/Footer";
import Home from "./pages/Home";
import { BlogIndex, BlogPost } from "./pages/Blog";
import TechPulse from "./pages/TechPulse";
import Admin from "./pages/Admin";

function App() {
  return (
    <div className="App min-h-screen bg-[#0A0A0F]">
      <BrowserRouter>
        {/* Background Effects */}
        <Starfield />
        <Nebula />
        <ShootingStar />
        
        {/* UI Components */}
        <ScrollProgress />
        <Navigation />
        <WhatsAppButton />
        
        {/* Toast Notifications */}
        <Toaster 
          position="top-right" 
          richColors 
          toastOptions={{
            style: {
              background: '#12121A',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              color: '#E8E8ED'
            }
          }}
        />
        
        {/* Routes */}
        <main className="relative z-10">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/blog" element={<BlogIndex />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/tech-pulse" element={<TechPulse />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </main>
        
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
