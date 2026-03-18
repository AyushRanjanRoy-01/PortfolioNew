import { Github, Linkedin, Twitter, Mail, ArrowUp } from 'lucide-react';

export const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: Github, href: 'https://github.com', label: 'GitHub' },
    { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
    { icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
    { icon: Mail, href: 'mailto:ayushranjanroy@gmail.com', label: 'Email' },
  ];

  return (
    <footer className="relative border-t border-white/5 py-12" data-testid="footer">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Left - Brand */}
          <div className="flex flex-col items-center md:items-start gap-2">
            <span className="font-unbounded font-bold text-xl gradient-text">
              Ayush Ranjan Roy
            </span>
            <span className="text-[#5F5F6E] text-sm">
              Built with curiosity and code
            </span>
          </div>

          {/* Center - Social Links */}
          <div className="flex items-center gap-4">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-white/5 border border-white/10 text-[#9494A0] hover:text-[#00D4AA] hover:border-[#00D4AA]/30 transition-all"
                data-testid={`footer-social-${link.label.toLowerCase()}`}
                aria-label={link.label}
              >
                <link.icon size={18} />
              </a>
            ))}
          </div>

          {/* Right - Back to top & Copyright */}
          <div className="flex flex-col items-center md:items-end gap-2">
            <button
              onClick={scrollToTop}
              className="flex items-center gap-2 text-[#9494A0] hover:text-[#00D4AA] transition-colors text-sm"
              data-testid="back-to-top-button"
            >
              Back to top
              <ArrowUp size={16} />
            </button>
            <span className="text-[#5F5F6E] text-xs">
              &copy; {currentYear} All rights reserved
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
