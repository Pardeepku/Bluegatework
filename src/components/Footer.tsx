import React, { useState } from 'react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Globe, 
  ArrowRight, 
  CheckCircle2, 
  Shield, 
  MessageSquare, 
  Send,
  ExternalLink,
  Sliders,
  Lock,
  Share2
} from 'lucide-react';
import { PageId } from '../types';
import { CORE_SERVICES, INDUSTRIES } from '../data/mockData';
import { Logo } from './Logo';
import { useSiteSettings } from '../context/SiteSettingsContext';

interface FooterProps {
  onNavigate: (page: PageId) => void;
  onRequestQuote: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onRequestQuote }) => {
  const {
    settings,
    isAdminAuthenticated,
    setIsLoginModalOpen,
    setIsAdminPanelOpen,
    addInquiry
  } = useSiteSettings();

  const [callbackPhone, setCallbackPhone] = useState('');
  const [callbackSent, setCallbackSent] = useState(false);

  const handleCallbackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!callbackPhone) return;

    addInquiry({
      type: 'callback',
      name: 'Website Visitor',
      email: 'Via Fast Callback Form',
      phone: callbackPhone,
      details: 'Requested urgent 30-minute callback via website footer.',
    });

    setCallbackSent(true);
    setTimeout(() => {
      setCallbackPhone('');
    }, 4000);
  };

  const handleLinkClick = (page: PageId) => {
    onNavigate(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const cleanPhone = settings.phoneMain.replace(/[^\d+]/g, '');
  const cleanWA = settings.whatsappNumber.replace(/[^\d]/g, '');
  const waUrl = `https://wa.me/${cleanWA}?text=${encodeURIComponent(settings.whatsappPrefill)}`;

  return (
    <footer className="bg-[#001a4d] text-slate-300 pt-16 pb-8 border-t-4 border-[#002366]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Call-to-Action Bar */}
        <div className="bg-[#002366] rounded-3xl p-8 sm:p-10 mb-16 shadow-2xl shadow-blue-950/40 relative overflow-hidden border border-blue-400/20">
          {/* Subtle background glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[#D4AF37] text-xs font-bold uppercase tracking-wider backdrop-blur-sm">
                <span>Verified European Workforce Ready in 48-72h</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-heading">
                Need Qualified Workers in Portugal, Netherlands or Europe?
              </h3>
              <p className="text-blue-100 text-sm sm:text-base max-w-2xl">
                Get an instant headcount assessment and compliance roadmap tailored to your industry, seasonal surges, or turnkey operational outsourcing.
              </p>
            </div>

            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3">
              <button
                id="footer-request-quote-btn"
                onClick={onRequestQuote}
                className="w-full py-3.5 px-6 rounded-xl font-bold text-sm bg-[#D4AF37] hover:bg-[#c49f2f] text-[#002366] shadow-lg shadow-amber-950/20 transition-all flex items-center justify-center gap-2 group cursor-pointer"
              >
                <span>Request Staffing Proposal</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-6 rounded-xl font-semibold text-xs text-white bg-emerald-600 hover:bg-emerald-500 transition-colors flex items-center justify-center gap-2 border border-emerald-400/30"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Chat on WhatsApp ({settings.whatsappNumber})</span>
              </a>
            </div>
          </div>
        </div>

        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-blue-900/50">
          {/* Col 1: Brand & Contact Info */}
          <div className="lg:col-span-4 space-y-5">
            <div onClick={() => handleLinkClick('home')} className="inline-block cursor-pointer">
              <Logo variant="white" size="lg" showTagline={true} />
            </div>

            <p className="text-slate-400 text-sm leading-relaxed">
              {settings.shortDesc}
            </p>

            <div className="space-y-3 text-xs text-slate-300">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-white">Global Headquarters ({settings.addressHQ.country}):</div>
                  <p className="text-slate-400 leading-snug">{settings.addressHQ.full}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-blue-400 shrink-0" />
                <div>
                  <span className="text-slate-400">Direct Phone / WhatsApp: </span>
                  <a
                    href={`tel:${cleanPhone}`}
                    className="font-bold text-white hover:text-[#D4AF37] transition-colors"
                  >
                    {settings.phoneMain}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-blue-400 shrink-0" />
                <div>
                  <span className="text-slate-400">Official Email: </span>
                  <a
                    href={`mailto:${settings.emailGeneral}`}
                    className="font-bold text-white hover:text-[#D4AF37] transition-colors"
                  >
                    {settings.emailGeneral}
                  </a>
                </div>
              </div>
            </div>

            {/* Social Media Links */}
            <div className="pt-2 flex items-center gap-2.5 flex-wrap">
              {settings.socialLinks.linkedin && (
                <a
                  href={settings.socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg bg-blue-950/80 hover:bg-[#002366] text-slate-300 hover:text-white flex items-center justify-center transition-colors border border-blue-800 text-xs font-bold"
                  aria-label="LinkedIn"
                >
                  IN
                </a>
              )}
              {settings.socialLinks.facebook && (
                <a
                  href={settings.socialLinks.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg bg-blue-950/80 hover:bg-[#002366] text-slate-300 hover:text-white flex items-center justify-center transition-colors border border-blue-800 text-xs font-bold"
                  aria-label="Facebook"
                >
                  FB
                </a>
              )}
              {settings.socialLinks.instagram && (
                <a
                  href={settings.socialLinks.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg bg-blue-950/80 hover:bg-[#002366] text-slate-300 hover:text-white flex items-center justify-center transition-colors border border-blue-800 text-xs font-bold"
                  aria-label="Instagram"
                >
                  IG
                </a>
              )}
              {settings.socialLinks.youtube && (
                <a
                  href={settings.socialLinks.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg bg-blue-950/80 hover:bg-[#002366] text-slate-300 hover:text-white flex items-center justify-center transition-colors border border-blue-800 text-xs font-bold"
                  aria-label="YouTube"
                >
                  YT
                </a>
              )}
              {settings.socialLinks.twitter && (
                <a
                  href={settings.socialLinks.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg bg-blue-950/80 hover:bg-[#002366] text-slate-300 hover:text-white flex items-center justify-center transition-colors border border-blue-800 text-xs font-bold"
                  aria-label="Twitter / X"
                >
                  X
                </a>
              )}
              {settings.socialLinks.telegram && (
                <a
                  href={settings.socialLinks.telegram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg bg-blue-950/80 hover:bg-[#002366] text-slate-300 hover:text-white flex items-center justify-center transition-colors border border-blue-800 text-xs font-bold"
                  aria-label="Telegram"
                >
                  TG
                </a>
              )}
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-blue-950/80 hover:bg-emerald-600 text-slate-300 hover:text-white flex items-center justify-center transition-colors border border-blue-800 text-xs font-bold"
                aria-label="WhatsApp"
              >
                WA
              </a>
            </div>
          </div>

          {/* Col 2: Services Directory */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#D4AF37] font-heading">
              Our Core Services
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              {CORE_SERVICES.map((srv) => (
                <li key={srv.id}>
                  <button
                    id={`footer-srv-${srv.id}`}
                    onClick={() => handleLinkClick(srv.pageId)}
                    className="hover:text-white transition-colors flex items-center gap-2 group text-left"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500 group-hover:bg-[#D4AF37] transition-colors" />
                    <span>{srv.title}</span>
                  </button>
                </li>
              ))}
              <li>
                <button
                  onClick={() => handleLinkClick('services')}
                  className="text-blue-400 hover:text-blue-300 font-semibold pt-1 inline-block"
                >
                  View Full Services Overview →
                </button>
              </li>
            </ul>

            <h4 className="text-xs font-bold uppercase tracking-wider text-[#D4AF37] font-heading pt-3">
              European Sectors
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-400">
              {INDUSTRIES.slice(0, 4).map((ind) => (
                <li key={ind.id}>
                  <button
                    onClick={() => handleLinkClick('industries')}
                    className="hover:text-slate-200 transition-colors text-left"
                  >
                    {ind.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Quick Navigation & Pathways */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#D4AF37] font-heading">
              Company & Hubs
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button onClick={() => handleLinkClick('home')} className="hover:text-white transition-colors">
                  Home Overview
                </button>
              </li>
              <li>
                <button onClick={() => handleLinkClick('about')} className="hover:text-white transition-colors">
                  About {settings.siteName}
                </button>
              </li>
              <li>
                <button onClick={() => handleLinkClick('for-employers')} className="hover:text-white transition-colors">
                  For Employers (B2B)
                </button>
              </li>
              <li>
                <button onClick={() => handleLinkClick('for-jobseekers')} className="hover:text-white transition-colors">
                  For Job Seekers (Open Jobs)
                </button>
              </li>
              <li>
                <button onClick={() => handleLinkClick('locations')} className="hover:text-white transition-colors">
                  Locations (Portugal & NL)
                </button>
              </li>
              <li>
                <button onClick={() => handleLinkClick('contact')} className="hover:text-white transition-colors">
                  Contact & Inquiry Hub
                </button>
              </li>
            </ul>

            <div className="pt-2">
              <div className="p-3 bg-[#001338] rounded-xl border border-blue-900/60 text-[11px] space-y-1">
                <div className="font-bold text-white flex items-center gap-1.5">
                  <Shield className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>Licensed Provider</span>
                </div>
                <p className="text-slate-400">
                  {settings.businessLicensing}
                </p>
                <div className="text-[10px] text-blue-300 font-mono pt-1">
                  <span>NIF: {settings.taxNif}</span> &bull; <span>{settings.actLicense}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Col 4: Request Fast Callback & Newsletter */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#D4AF37] font-heading">
              Fast Callback Request
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Enter your phone number and our European workforce deployment team will call you within 30 minutes.
            </p>

            <form onSubmit={handleCallbackSubmit} className="space-y-2">
              <div className="relative">
                <input
                  type="tel"
                  id="footer-callback-phone"
                  value={callbackPhone}
                  onChange={(e) => setCallbackPhone(e.target.value)}
                  placeholder="+351 920 132 915"
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#001338] border border-blue-900/60 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#0056b3] focus:border-transparent"
                />
                <button
                  type="submit"
                  id="footer-callback-submit"
                  className="absolute right-1 top-1 bottom-1 px-3 bg-[#002366] hover:bg-[#0056b3] text-white rounded-lg transition-colors flex items-center justify-center cursor-pointer"
                  title="Request callback"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
              {callbackSent && (
                <div className="p-2 rounded-lg bg-emerald-950/80 border border-emerald-700 text-emerald-300 text-[11px] flex items-center gap-1.5 animate-in fade-in">
                  <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                  <span>Thank you! Request logged to administration.</span>
                </div>
              )}
            </form>

            <div className="pt-2 text-[11px] text-slate-400">
              <span className="font-semibold text-slate-300">Operational Office Hours:</span>
              <p>{settings.operatingHours}</p>
            </div>
          </div>
        </div>

        {/* Bottom Compliance & Copyright Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div className="flex flex-wrap items-center gap-2 text-center sm:text-left">
            <span>© {new Date().getFullYear()} {settings.siteName}. All rights reserved.</span>
            <span className="hidden sm:inline">•</span>
            <span>Registered in {settings.addressHQ.country} ({settings.addressHQ.city})</span>
          </div>

          <div className="flex flex-wrap items-center gap-3 text-[11px]">
            <span className="text-slate-300">{settings.actLicense}</span>
            <span>•</span>
            <span className="text-slate-300">{settings.nenCertificate}</span>
            <span>•</span>
            <span className="text-slate-300">NIF {settings.taxNif}</span>
            <span>•</span>

            {/* Admin Control Link in Bottom Bar */}
            {!isAdminAuthenticated ? (
              <button
                id="footer-admin-login-link"
                onClick={() => setIsLoginModalOpen(true)}
                className="text-[#FFD000] hover:underline font-bold flex items-center gap-1 cursor-pointer"
              >
                <Lock className="w-3 h-3 text-[#FFD000]" />
                <span>Admin Login</span>
              </button>
            ) : (
              <button
                id="footer-admin-panel-link"
                onClick={() => setIsAdminPanelOpen(true)}
                className="text-[#FFD000] hover:underline font-bold flex items-center gap-1 cursor-pointer"
              >
                <Sliders className="w-3 h-3 text-[#FFD000]" />
                <span>Admin Control Center</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
};
