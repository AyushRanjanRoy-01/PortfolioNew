import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/#about' },
  { name: 'Projects', path: '/#projects' },
  { name: 'Blog', path: '/blog' },
  { name: 'Tech Pulse', path: '/tech-pulse' },
  { name: 'Contact', path: '/#contact' },
];

export const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

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
      <nav
        data-testid="main-navigation"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? 'nav-blur border-b border-white/5' : ''
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link 
              to="/" 
              className="font-unbounded font-bold text-xl md:text-2xl gradient-text"
              data-testid="nav-logo"
            >
              ARR
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path.startsWith('/#') ? '/' : link.path}
                  onClick={() => handleNavClick(link.path)}
                  className={`relative font-rajdhani font-medium text-sm tracking-wider uppercase transition-colors ${
                    isActive(link.path) ? 'text-[#00D4AA]' : 'text-[#9494A0] hover:text-[#E8E8ED]'
                  } link-underline`}
                  data-testid={`nav-link-${link.name.toLowerCase().replace(' ', '-')}`}
                >
                  {link.name}
                  {isActive(link.path) && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#00D4AA]"
                    />
                  )}
                </Link>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-[#E8E8ED]"
              data-testid="mobile-menu-button"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
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
            <div className="absolute inset-0 bg-[#0A0A0F]/95 backdrop-blur-xl">
              <div className="flex flex-col items-center justify-center h-full gap-8">
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
                      className={`font-unbounded text-2xl ${
                        isActive(link.path) ? 'text-[#00D4AA]' : 'text-[#E8E8ED]'
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
