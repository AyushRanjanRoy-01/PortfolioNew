import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/#about' },
  { name: 'Projects', path: '/#projects' },
  { name: 'Learn', path: '/learn' },
  { name: 'Blog', path: '/blog' },
  { name: 'Tech Pulse', path: '/tech-pulse' },
  { name: 'Contact', path: '/#contact' },
];

export const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const [showSkipLink, setShowSkipLink] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const handleNavClick = (path) => {
    if (path.startsWith('/#')) {
      const sectionId = path.substring(2);
      if (location.pathname === '/') {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      } else {
        window.location.href = path;
      }
    }
    setIsMobileMenuOpen(false);
  };

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    if (path.startsWith('/#')) return false;
    return location.pathname.startsWith(path);
  };

  return (
    <>
      {/* Skip to main content link for accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:bg-[#00D4AA] focus:text-[#0A0A0F] focus:px-4 focus:py-2 focus:rounded-lg focus:font-semibold"
        onFocus={() => setShowSkipLink(true)}
        onBlur={() => setShowSkipLink(false)}
      >
        Skip to main content
      </a>
      <nav
        data-testid="main-navigation"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? 'bg-[#0A0A0F]/80 backdrop-blur-xl border-b border-white/[0.08]' : 'bg-transparent'
        }`}
      >
        <div className="max-w-[980px] mx-auto px-6">
          <div className="flex items-center justify-between h-11">
            {/* Logo */}
            <Link 
              to="/" 
              className="text-[17px] font-semibold tracking-tight text-[#E8E8ED] hover:text-white transition-colors"
              data-testid="nav-logo"
            >
              <span className="md:hidden">AR</span>
              <span className="hidden md:inline">Ayush Roy</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-7" role="navigation" aria-label="Main navigation">
              {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path.startsWith('/#') ? '/' : link.path}
                onClick={() => handleNavClick(link.path)}
                className={`text-[13px] font-normal tracking-tight transition-all duration-200 focus:outline-none focus:text-white ${
                  isActive(link.path) ? 'text-white' : 'text-[#A8A8B4] hover:text-white'
                }`}
                data-testid={`nav-link-${link.name.toLowerCase().replace(' ', '-')}`}
                aria-current={isActive(link.path) ? 'page' : undefined}
              >
                  {link.name}
                </Link>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-1 text-[#E8E8ED] hover:text-white transition-colors"
              data-testid="mobile-menu-button"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-40 md:hidden"
            data-testid="mobile-menu"
          >
            <div className="absolute inset-0 bg-[#0A0A0F]/98 backdrop-blur-2xl">
              <div className="flex flex-col items-center justify-center h-full gap-6">
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link
                      to={link.path.startsWith('/#') ? '/' : link.path}
                      onClick={() => handleNavClick(link.path)}
                      className={`text-xl font-normal tracking-tight ${
                        isActive(link.path) ? 'text-white' : 'text-[#A8A8B4]'
                      }`}
                      data-testid={`mobile-nav-link-${link.name.toLowerCase().replace(' ', '-')}`}
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
