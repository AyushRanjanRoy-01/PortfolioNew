import { Github, Linkedin, Twitter, Mail, ArrowUp } from 'lucide-react';

export const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: Github, href: 'https://github.com/AyushRanjanRoy-01', label: 'GitHub' },
    // TODO: replace with your real LinkedIn profile URL if this guess is wrong
    { icon: Linkedin, href: 'https://www.linkedin.com/in/ayushranjanroy', label: 'LinkedIn' },
    { icon: Mail, href: 'mailto:ayushranjanroy@gmail.com', label: 'Email' },
    { icon: Twitter, href: 'https://twitter.com/ayushranjanroy', label: 'Twitter' },
  ];

  return (
    <footer className="relative py-16 px-6 border-t border-white/[0.08]">
      <div className="max-w-[980px] mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          {/* Left - Brand */}
          <div className="flex flex-col items-center md:items-start gap-2">
            <h3 className="font-display font-semibold text-lg tracking-tight text-[#E8E8ED]">Ayush Roy</h3>
            <span className="text-[#6E6E73] text-sm font-normal">
              AI Engineer • Building Intelligent Automation Systems
            </span>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-5">
            {socialLinks.slice(0, 3).map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#6E6E73] hover:text-[#E8E8ED] transition-colors"
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
            <div className="mt-10 pt-8 border-t border-white/[0.08] text-center">
              <p className="text-[#6E6E73] text-xs font-normal">
                &copy; {currentYear} Ayush Ranjan Roy. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
