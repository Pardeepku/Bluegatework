import React, { useState } from 'react';
import { MessageSquare, X, Send, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { useSiteSettings } from '../context/SiteSettingsContext';

export const FloatingWhatsApp: React.FC = () => {
  const { settings } = useSiteSettings();
  const [isOpen, setIsOpen] = useState(false);
  const [customMsg, setCustomMsg] = useState('');

  const quickOptions = [
    { label: `🏢 We need temporary workers in Portugal / NL`, text: `Hello ${settings.siteName}, our company needs temporary staffing in Europe.` },
    { label: '🌐 Inquire about International Recruitment', text: `Hello ${settings.siteName}, I want to learn about your international talent recruitment pipelines.` },
    { label: '👷 I am looking for a job in Europe', text: `Hello ${settings.siteName}, I want to apply for open job positions in Portugal or Netherlands.` }
  ];

  const handleSend = (textToSend?: string) => {
    const message = textToSend || customMsg || settings.whatsappPrefill;
    const encoded = encodeURIComponent(message);
    const cleanWA = settings.whatsappNumber.replace(/[^\d]/g, '');
    const url = `https://wa.me/${cleanWA}?text=${encoded}`;
    window.open(url, '_blank');
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Expanded WhatsApp Modal Box */}
      {isOpen && (
        <div className="mb-3 w-80 sm:w-96 rounded-2xl bg-white shadow-2xl shadow-emerald-950/20 border border-slate-200 overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-200">
          {/* Header */}
          <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 p-4 text-white flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white font-bold">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-300 ring-2 ring-emerald-700" />
              </div>
              <div>
                <div className="font-bold text-sm">{settings.siteName} Support</div>
                <div className="text-[11px] text-emerald-100 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-300" />
                  <span>Online | {settings.whatsappNumber}</span>
                </div>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-lg hover:bg-white/20 text-white transition-colors cursor-pointer"
              aria-label="Close WhatsApp chat"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Chat Body */}
          <div className="p-4 bg-slate-50 space-y-3">
            <div className="bg-white p-3 rounded-2xl rounded-tl-sm shadow-sm border border-slate-100 text-xs text-slate-700 space-y-1">
              <p className="font-semibold text-emerald-800">Welcome to {settings.siteName}!</p>
              <p>
                How can our European workforce deployment team assist you today? Choose a quick inquiry or write directly below.
              </p>
              <span className="text-[10px] text-slate-400 block text-right">Just now</span>
            </div>

            {/* Quick Prompts */}
            <div className="space-y-1.5 pt-1">
              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Quick options:</div>
              {quickOptions.map((opt, i) => (
                <button
                  key={i}
                  onClick={() => handleSend(opt.text)}
                  className="w-full text-left text-xs p-2 rounded-xl bg-white hover:bg-emerald-50 text-slate-700 hover:text-emerald-900 border border-slate-200 transition-colors flex items-center justify-between group cursor-pointer"
                >
                  <span className="line-clamp-1">{opt.label}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-emerald-600 opacity-60 group-hover:opacity-100 shrink-0" />
                </button>
              ))}
            </div>

            {/* Input area */}
            <div className="pt-2">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={customMsg}
                  onChange={(e) => setCustomMsg(e.target.value)}
                  placeholder="Type your message..."
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleSend();
                  }}
                  className="flex-1 px-3 py-2 text-xs rounded-xl bg-white border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
                <button
                  onClick={() => handleSend()}
                  className="p-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white transition-colors cursor-pointer shadow-md shadow-emerald-700/20"
                  aria-label="Send via WhatsApp"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="flex items-center justify-center gap-1.5 text-[10px] text-slate-400 pt-1">
              <ShieldCheck className="w-3 h-3 text-emerald-600" />
              <span>Direct connection to {settings.siteName} WhatsApp</span>
            </div>
          </div>
        </div>
      )}

      {/* Floating Trigger Button */}
      <button
        id="floating-whatsapp-btn"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2.5 px-4 py-3 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white shadow-xl shadow-emerald-900/30 hover:shadow-2xl transition-all duration-300 group ring-4 ring-emerald-400/20 cursor-pointer"
        aria-label={`Contact ${settings.siteName} on WhatsApp`}
      >
        <div className="relative">
          <MessageSquare className="w-5 h-5 fill-current" />
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping" />
        </div>
        <span className="text-xs font-bold hidden sm:inline">WhatsApp Direct</span>
        <span className="text-[11px] font-medium opacity-90 hidden md:inline">&bull; {settings.whatsappNumber}</span>
      </button>
    </div>
  );
};
