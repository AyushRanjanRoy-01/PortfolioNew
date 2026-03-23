import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";
import { Component } from "react";
import { Starfield, Nebula, ShootingStar } from "./components/Starfield";
import { Navigation } from "./components/Navigation";
import { WhatsAppButton } from "./components/WhatsAppButton";
import { ScrollProgress } from "./components/ScrollProgress";
import { Footer } from "./components/Footer";
import { ThemeProvider } from "./contexts/ThemeContext";
import { ThemeToggle } from "./components/ThemeToggle";
import Home from "./pages/Home";
import { BlogIndex, BlogPost } from "./pages/Blog";
import TechPulse from "./pages/TechPulse";
import Learn from "./pages/Learn";
import PromptLesson from "./pages/PromptLesson";
import PromptDocumentation from "./pages/PromptDocumentation";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#0A0A0F] flex items-center justify-center px-6">
          <div className="text-center">
            <h1 className="font-unbounded text-4xl text-[#E8E8ED] mb-4">Something went wrong</h1>
            <p className="text-[#9494A0] mb-6">We're sorry for the inconvenience. Please refresh the page.</p>
            <button 
              onClick={() => window.location.reload()} 
              className="bg-[#00D4AA] text-[#0A0A0F] px-6 py-3 rounded-full font-semibold hover:bg-[#5EEAD4] transition-colors"
            >
              Refresh Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <div className="App" style={{ backgroundColor: 'var(--bg-primary)' }}>
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
                <Route path="/learn" element={<Learn />} />
                <Route path="/learn/documentation" element={<PromptDocumentation />} />
                <Route path="/learn/:slug" element={<PromptLesson />} />
                <Route path="/admin" element={<Admin />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            
            <Footer />
            
            {/* Theme Toggle */}
            <ThemeToggle />
          </BrowserRouter>
        </div>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
