import { MessageCircle } from 'lucide-react';
import { useState } from 'react';

export const WhatsAppButton = () => {
  const [showTooltip, setShowTooltip] = useState(false);
  const phoneNumber = '919540968483';
  const message = encodeURIComponent('Hi Ayush! I found your portfolio and would like to connect.');
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-20 sm:bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] shadow-lg hover:scale-110 transition-transform whatsapp-pulse"
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
      data-testid="whatsapp-button"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle className="w-7 h-7 text-white" fill="white" />
      
      {/* Tooltip */}
      {showTooltip && (
        <div className="absolute right-full mr-3 px-3 py-2 bg-[#12121A] text-[#E8E8ED] text-sm rounded-lg border border-white/10 whitespace-nowrap">
          Chat on WhatsApp
          <div className="absolute top-1/2 -right-1 -translate-y-1/2 w-2 h-2 bg-[#12121A] border-r border-t border-white/10 rotate-45" />
        </div>
      )}
    </a>
  );
};
