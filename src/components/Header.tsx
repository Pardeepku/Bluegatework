import React, { useState, useEffect, useRef } from 'react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  ChevronDown, 
  Menu, 
  X, 
  ArrowRight, 
  ShieldCheck, 
  Briefcase, 
  Users, 
  Globe, 
  Layers, 
  MessageSquare,
  Sparkles,
  Sliders,
  Image as ImageIcon,
  Lock,
  LogOut,
  User,
  Settings,
  Bell
} from 'lucide-react';
import { PageId, LanguageCode } from '../types';
import { CORE_SERVICES } from '../data/mockData';
import { Logo } from './Logo';
import { LanguageSelector } from './LanguageSelector';
import { useSiteSettings } from '../context/SiteSettingsContext';

interface HeaderProps {
  currentPage: PageId;
  onNavigate: (page: PageId) => void;
  onRequestQuote: () => void;
  currentLang: LanguageCode;
  onLanguageChange: (lang: LanguageCode) => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentPage,
  onNavigate,
  onRequestQuote,
  currentLang,
  onLanguageChange
}) => {
  const {
    settings,
    isAdminAuthenticated,
    adminUser,
    setIsLoginModalOpen,
    setIsAdminPanelOpen,
    logout
  } = useSiteSettings();

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [employersDropdownOpen, setEmployersDropdownOpen] = useState(false);
  const servicesRef = useRef<HTMLDivElement>(null);
  const employersRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (servicesRef.current && !servicesRef.current.contains(e.target as Node)) {
        setServicesDropdownOpen(false);
      }
      if (employersRef.current && !employersRef.current.contains(e.target as Node)) {
        setEmployersDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleNavClick = (page: PageId) => {
    onNavigate(page);
    setMobileMenuOpen(false);
    setServicesDropdownOpen(false);
    setEmployersDropdownOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const cleanPhone = settings.phoneMain.replace(/[^\d+]/g, '');
  const cleanWA = settings.whatsappNumber.replace(/[^\d]/g, '');
  const waUrl = `https://wa.me/${cleanWA}?text=${encodeURIComponent(settings.whatsappPrefill)}`;

  return (
    <header className="sticky top-0 z-40 w-full transition-all duration-300">
      {/* Optional Top Announcement Bar */}
      {settings.announcementBanner.enabled && (
        <div
          className="py-1.5 px-4 text-xs font-semibold flex items-center justify-between gap-3 text-center border-b border-white/10"
          style={{
            backgroundColor: settings.announcementBanner.bgColor || '#002255',
            color: '#FFFFFF',
          }}
        >
          <div className="max-w-7xl mx-auto w-full flex items-center justify-center gap-2 flex-wrap">
            <span className="text-[10px] font-extrabold uppercase px-1.5 py-0.5 rounded bg-white/20 text-[#FFD000]">
              Announcement
            </span>
            <span className="text-white text-xs">{settings.announcementBanner.text}</span>
            {settings.announcementBanner.linkText && (
              <button
                onClick={() => handleNavClick(settings.announcementBanner.linkPage || 'temporary-staffing')}
                className="inline-flex items-center gap-1 font-bold underline hover:opacity-80 transition-opacity ml-1 cursor-pointer"
                style={{ color: settings.announcementBanner.textColor || '#FFD000' }}
              >
                <span>{settings.announcementBanner.linkText}</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            )}
          </div>
        </div>
      )}

      {/* Top Bar - High Level Contact, Admin & Credibility Info */}
      <div className="bg-[#001a4d] text-slate-300 text-xs py-2 px-4 border-b border-blue-900/50">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          {/* Left info items */}
          <div className="flex items-center flex-wrap gap-4 sm:gap-6">
            <a
              href={`tel:${cleanPhone}`}
              className="flex items-center gap-1.5 hover:text-[#D4AF37] transition-colors font-medium"
            >
              <Phone className="w-3.5 h-3.5 text-blue-400" />
              <span>{settings.phoneMain}</span>
            </a>
            <a
              href={`mailto:${settings.emailGeneral}`}
              className="hidden sm:flex items-center gap-1.5 hover:text-[#D4AF37] transition-colors"
            >
              <Mail className="w-3.5 h-3.5 text-blue-400" />
              <span>{settings.emailGeneral}</span>
            </a>
            <div className="hidden lg:flex items-center gap-1.5 text-slate-300">
              <span className="w-2 h-2 rounded-full bg-[#D4AF37]"></span>
              <span>
                {settings.addressHQ.city} ({settings.addressHQ.country}) &bull; Netherlands &bull; Global Corridors
              </span>
            </div>
          </div>

          {/* Right info items - INCLUDING TOP RIGHT ADMIN LOGIN / LOGOUT */}
          <div className="flex items-center gap-2 sm:gap-3 ml-auto">
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-950/80 text-emerald-300 border border-emerald-700/50 hover:bg-emerald-900 transition-colors text-[11px] font-semibold"
            >
              <MessageSquare className="w-3 h-3 text-emerald-400" />
              <span>WhatsApp Direct</span>
            </a>

            <div className="h-3 w-px bg-blue-800 hidden sm:block" />

            <div className="hidden md:flex items-center gap-1.5 text-[11px] text-[#D4AF37] font-semibold">
              <ShieldCheck className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>{settings.actLicense}</span>
            </div>

            <div className="h-3 w-px bg-blue-800 hidden sm:block" />

            {/* TOP RIGHT ADMIN LOGIN / LOGOUT CONTROLS */}
            {!isAdminAuthenticated ? (
              <button
                id="top-right-admin-login-btn"
                onClick={() => setIsLoginModalOpen(true)}
                className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-900/80 hover:bg-blue-800 text-blue-100 hover:text-white border border-blue-700/60 transition-all text-[11px] font-bold cursor-pointer shadow-xs"
                title="Log in to Website Admin Panel"
              >
                <Lock className="w-3 h-3 text-[#FFD000]" />
                <span>Admin Login</span>
              </button>
            ) : (
              <div className="flex items-center gap-1.5">
                <button
                  id="top-right-admin-panel-btn"
                  onClick={() => setIsAdminPanelOpen(true)}
                  className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFD000] hover:bg-[#ffe043] text-slate-950 transition-all text-[11px] font-extrabold cursor-pointer shadow-sm"
                  title="Open Admin Control Center"
                >
                  <Sliders className="w-3 h-3 text-slate-950" />
                  <span>Admin Panel</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-700 animate-pulse" />
                </button>

                <button
                  id="top-right-admin-logout-btn"
                  onClick={logout}
                  className="flex items-center gap-1 px-2 py-1 rounded-full bg-rose-950/60 hover:bg-rose-900 text-rose-300 hover:text-white border border-rose-800/60 transition-all text-[11px] font-medium cursor-pointer"
                  title={`Logout (${adminUser.username})`}
                >
                  <LogOut className="w-3 h-3" />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </div>
            )}

            <LanguageSelector
              currentLang={currentLang}
              onLanguageChange={onLanguageChange}
            />
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <nav
        className={`w-full bg-white transition-all duration-300 ${
          isScrolled
            ? 'shadow-md shadow-blue-950/5 py-3 border-b border-blue-100'
            : 'py-4 border-b border-blue-100'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Company Logo */}
          <div onClick={() => handleNavClick('home')}>
            <Logo size="md" showTagline={true} />
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-1 xl:gap-2 text-[14px] font-medium text-[#002366]">
            {/* Home */}
            <button
              id="nav-home-btn"
              onClick={() => handleNavClick('home')}
              className={`px-3.5 py-2 rounded-xl transition-colors hover:text-[#0056b3] hover:bg-blue-50/80 ${
                currentPage === 'home' ? 'text-[#002366] bg-blue-50 font-bold' : ''
              }`}
            >
              Home
            </button>

            {/* Services Dropdown */}
            <div className="relative" ref={servicesRef}>
              <button
                id="nav-services-dropdown-btn"
                onClick={() => setServicesDropdownOpen(!servicesDropdownOpen)}
                className={`px-3.5 py-2 rounded-xl transition-colors hover:text-[#0056b3] hover:bg-blue-50/80 flex items-center gap-1.5 ${
                  currentPage === 'services' ||
                  currentPage === 'temporary-staffing' ||
                  currentPage === 'outsourcing' ||
                  currentPage === 'international-recruitment'
                    ? 'text-[#002366] bg-blue-50 font-bold'
                    : ''
                }`}
              >
                <span>Services</span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-200 ${
                    servicesDropdownOpen ? 'rotate-180 text-[#0056b3]' : 'opacity-70'
                  }`}
                />
              </button>

              {servicesDropdownOpen && (
                <div className="absolute top-full left-0 mt-2 w-96 rounded-2xl bg-white shadow-2xl shadow-blue-950/15 border border-slate-100 p-3 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 px-3 py-1.5">
                    European Workforce Capabilities
                  </div>
                  <div className="space-y-1 mt-1">
                    {CORE_SERVICES.map((service) => (
                      <button
                        key={service.id}
                        id={`dropdown-service-${service.id}`}
                        onClick={() => handleNavClick(service.pageId)}
                        className={`w-full text-left p-3 rounded-xl hover:bg-blue-50 transition-colors flex items-start gap-3 group ${
                          currentPage === service.pageId ? 'bg-blue-50' : ''
                        }`}
                      >
                        <div className="w-8 h-8 rounded-lg bg-blue-100 text-[#002366] flex items-center justify-center shrink-0 group-hover:bg-[#002366] group-hover:text-white transition-colors">
                          <Briefcase className="w-4 h-4" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-xs sm:text-sm text-slate-900 group-hover:text-[#0056b3]">
                              {service.title}
                            </span>
                            <span className="text-[10px] font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                              {service.badge}
                            </span>
                          </div>
                          <p className="text-xs text-slate-500 line-clamp-1 mt-0.5">
                            {service.shortDescription}
                          </p>
                        </div>
                      </button>
                    ))}

                    <div className="pt-2 border-t border-slate-100 mt-2 flex justify-between items-center px-2">
                      <button
                        id="dropdown-all-services-btn"
                        onClick={() => handleNavClick('services')}
                        className="text-xs font-bold text-[#0056b3] hover:underline flex items-center gap-1"
                      >
                        <span>View All Solutions</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                      <span className="text-[11px] text-slate-400">Rapid 48-72h Deployment</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Industries */}
            <button
              id="nav-industries-btn"
              onClick={() => handleNavClick('industries')}
              className={`px-3.5 py-2 rounded-xl transition-colors hover:text-[#0056b3] hover:bg-blue-50/80 ${
                currentPage === 'industries' ? 'text-[#002366] bg-blue-50 font-bold' : ''
              }`}
            >
              Industries
            </button>

            {/* For Employers Dropdown */}
            <div className="relative" ref={employersRef}>
              <button
                id="nav-employers-dropdown-btn"
                onClick={() => setEmployersDropdownOpen(!employersDropdownOpen)}
                className={`px-3.5 py-2 rounded-xl transition-colors hover:text-[#0056b3] hover:bg-blue-50/80 flex items-center gap-1.5 ${
                  currentPage === 'for-employers' || currentPage === 'compliance'
                    ? 'text-[#002366] bg-blue-50 font-bold'
                    : ''
                }`}
              >
                <span>For Employers</span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-200 ${
                    employersDropdownOpen ? 'rotate-180 text-[#0056b3]' : 'opacity-70'
                  }`}
                />
              </button>

              {employersDropdownOpen && (
                <div className="absolute top-full left-0 mt-2 w-80 rounded-2xl bg-white shadow-2xl shadow-blue-950/15 border border-slate-100 p-3 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="space-y-1">
                    <button
                      id="dropdown-hire-talent-btn"
                      onClick={() => handleNavClick('for-employers')}
                      className="w-full text-left p-3 rounded-xl hover:bg-blue-50 transition-colors flex items-start gap-3 group"
                    >
                      <div className="w-8 h-8 rounded-lg bg-blue-100 text-[#002366] flex items-center justify-center shrink-0">
                        <Users className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="font-bold text-xs sm:text-sm text-slate-900 group-hover:text-[#0056b3] block">
                          Hire European Talent
                        </span>
                        <span className="text-xs text-slate-500">
                          B2B Staffing, SLA metrics & pricing model
                        </span>
                      </div>
                    </button>

                    <button
                      id="dropdown-compliance-btn"
                      onClick={() => handleNavClick('compliance')}
                      className="w-full text-left p-3 rounded-xl hover:bg-blue-50 transition-colors flex items-start gap-3 group"
                    >
                      <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
                        <ShieldCheck className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="font-bold text-xs sm:text-sm text-slate-900 group-hover:text-[#0056b3] block">
                          Compliance & Legal Framework
                        </span>
                        <span className="text-xs text-slate-500">
                          ACT license, NEN 4400-1 & A1 portable certs
                        </span>
                      </div>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* For Jobseekers */}
            <button
              id="nav-jobseekers-btn"
              onClick={() => handleNavClick('for-jobseekers')}
              className={`px-3.5 py-2 rounded-xl transition-colors hover:text-[#0056b3] hover:bg-blue-50/80 ${
                currentPage === 'for-jobseekers' ? 'text-[#002366] bg-blue-50 font-bold' : ''
              }`}
            >
              For Job Seekers
            </button>

            {/* Locations */}
            <button
              id="nav-locations-btn"
              onClick={() => handleNavClick('locations')}
              className={`px-3.5 py-2 rounded-xl transition-colors hover:text-[#0056b3] hover:bg-blue-50/80 ${
                currentPage === 'locations' ? 'text-[#002366] bg-blue-50 font-bold' : ''
              }`}
            >
              Locations
            </button>

            {/* About */}
            <button
              id="nav-about-btn"
              onClick={() => handleNavClick('about')}
              className={`px-3.5 py-2 rounded-xl transition-colors hover:text-[#0056b3] hover:bg-blue-50/80 ${
                currentPage === 'about' ? 'text-[#002366] bg-blue-50 font-bold' : ''
              }`}
            >
              About
            </button>

            {/* Contact */}
            <button
              id="nav-contact-btn"
              onClick={() => handleNavClick('contact')}
              className={`px-3.5 py-2 rounded-xl transition-colors hover:text-[#0056b3] hover:bg-blue-50/80 ${
                currentPage === 'contact' ? 'text-[#002366] bg-blue-50 font-bold' : ''
              }`}
            >
              Contact
            </button>
          </div>

          {/* Action CTAs (Dual B2B & Candidate paths) */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              id="header-find-jobs-btn"
              onClick={() => handleNavClick('for-jobseekers')}
              className="px-4 py-2.5 text-xs font-bold text-[#002366] hover:bg-blue-50 rounded-xl transition-all border border-blue-100 cursor-pointer"
            >
              Browse Jobs
            </button>

            <button
              id="header-request-quote-btn"
              onClick={onRequestQuote}
              className="px-5 py-2.5 rounded-full bg-[#002366] text-white font-semibold text-xs shadow-lg shadow-blue-900/20 hover:bg-[#001a4d] transition-all flex items-center gap-2 hover:scale-[1.02] cursor-pointer"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]"></span>
              <span>Request Talent</span>
              <ArrowRight className="w-3.5 h-3.5 text-blue-200" />
            </button>
          </div>

          {/* Mobile menu trigger */}
          <button
            id="mobile-menu-toggle-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-[90px] bottom-0 bg-white/95 backdrop-blur-md z-50 overflow-y-auto p-5 border-t border-slate-100 shadow-2xl flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-400">Navigation</div>
              <LanguageSelector
                currentLang={currentLang}
                onLanguageChange={onLanguageChange}
                darkText={true}
              />
            </div>

            <div className="grid grid-cols-1 gap-1 font-semibold text-slate-800">
              <button
                id="mobile-nav-home"
                onClick={() => handleNavClick('home')}
                className={`text-left px-3 py-2.5 rounded-xl hover:bg-blue-50 flex items-center justify-between ${
                  currentPage === 'home' ? 'bg-blue-50 text-[#1E40AF] font-bold' : ''
                }`}
              >
                <span>Home</span>
                <ArrowRight className="w-4 h-4 opacity-40" />
              </button>

              {/* Mobile Services Accordion */}
              <div className="p-3 bg-slate-50/80 rounded-2xl border border-slate-100 space-y-2">
                <div className="text-xs font-bold text-[#1E40AF] uppercase tracking-wider">Our Services</div>
                <div className="space-y-1">
                  {CORE_SERVICES.map((s) => (
                    <button
                      key={s.id}
                      id={`mobile-nav-${s.id}`}
                      onClick={() => handleNavClick(s.pageId)}
                      className={`w-full text-left px-2.5 py-2 text-sm rounded-lg hover:bg-white flex items-center justify-between ${
                        currentPage === s.pageId ? 'bg-white font-bold text-[#1E40AF] shadow-sm' : 'text-slate-700'
                      }`}
                    >
                      <span>{s.title}</span>
                      <span className="text-[10px] text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded font-bold">
                        {s.badge}
                      </span>
                    </button>
                  ))}
                  <button
                    id="mobile-nav-services-overview"
                    onClick={() => handleNavClick('services')}
                    className="w-full text-left px-2.5 py-1.5 text-xs text-[#2563EB] font-bold hover:underline"
                  >
                    View All Services Overview →
                  </button>
                </div>
              </div>

              <button
                id="mobile-nav-industries"
                onClick={() => handleNavClick('industries')}
                className={`text-left px-3 py-2.5 rounded-xl hover:bg-blue-50 flex items-center justify-between ${
                  currentPage === 'industries' ? 'bg-blue-50 text-[#1E40AF] font-bold' : ''
                }`}
              >
                <span>Industries & Sectors</span>
                <ArrowRight className="w-4 h-4 opacity-40" />
              </button>

              <button
                id="mobile-nav-employers"
                onClick={() => handleNavClick('for-employers')}
                className={`text-left px-3 py-2.5 rounded-xl hover:bg-blue-50 flex items-center justify-between ${
                  currentPage === 'for-employers' ? 'bg-blue-50 text-[#1E40AF] font-bold' : ''
                }`}
              >
                <div className="flex items-center gap-2">
                  <span>For Employers</span>
                  <span className="text-[10px] bg-blue-100 text-[#1E40AF] px-1.5 py-0.5 rounded font-bold">B2B</span>
                </div>
                <ArrowRight className="w-4 h-4 opacity-40" />
              </button>

              <button
                id="mobile-nav-jobseekers"
                onClick={() => handleNavClick('for-jobseekers')}
                className={`text-left px-3 py-2.5 rounded-xl hover:bg-blue-50 flex items-center justify-between ${
                  currentPage === 'for-jobseekers' ? 'bg-blue-50 text-[#1E40AF] font-bold' : ''
                }`}
              >
                <div className="flex items-center gap-2">
                  <span>For Job Seekers (Open Jobs)</span>
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                </div>
                <ArrowRight className="w-4 h-4 opacity-40" />
              </button>

              <button
                id="mobile-nav-locations"
                onClick={() => handleNavClick('locations')}
                className={`text-left px-3 py-2.5 rounded-xl hover:bg-blue-50 flex items-center justify-between ${
                  currentPage === 'locations' ? 'bg-blue-50 text-[#1E40AF] font-bold' : ''
                }`}
              >
                <span>Locations & Global Hubs</span>
                <ArrowRight className="w-4 h-4 opacity-40" />
              </button>

              <button
                id="mobile-nav-about"
                onClick={() => handleNavClick('about')}
                className={`text-left px-3 py-2.5 rounded-xl hover:bg-blue-50 flex items-center justify-between ${
                  currentPage === 'about' ? 'bg-blue-50 text-[#1E40AF] font-bold' : ''
                }`}
              >
                <span>About {settings.siteName}</span>
                <ArrowRight className="w-4 h-4 opacity-40" />
              </button>

              <button
                id="mobile-nav-contact"
                onClick={() => handleNavClick('contact')}
                className={`text-left px-3 py-2.5 rounded-xl hover:bg-blue-50 flex items-center justify-between ${
                  currentPage === 'contact' ? 'bg-blue-50 text-[#1E40AF] font-bold' : ''
                }`}
              >
                <span>Contact & {settings.addressHQ.country} HQ</span>
                <ArrowRight className="w-4 h-4 opacity-40" />
              </button>
            </div>
          </div>

          {/* Mobile Bottom Actions */}
          <div className="pt-4 border-t border-slate-200 space-y-2 mt-4">
            {/* Mobile Admin Controls */}
            {!isAdminAuthenticated ? (
              <button
                id="mobile-admin-login-btn"
                onClick={() => {
                  setMobileMenuOpen(false);
                  setIsLoginModalOpen(true);
                }}
                className="w-full py-2.5 px-4 rounded-xl text-center text-xs font-bold text-blue-900 bg-blue-50 border border-blue-200 flex items-center justify-center gap-2 cursor-pointer"
              >
                <Lock className="w-3.5 h-3.5 text-[#002255]" />
                <span>Admin Login</span>
              </button>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                <button
                  id="mobile-admin-panel-btn"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setIsAdminPanelOpen(true);
                  }}
                  className="py-2.5 px-3 rounded-xl text-center text-xs font-bold text-slate-900 bg-[#FFD000] hover:bg-[#ffe043] flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <Sliders className="w-3.5 h-3.5" />
                  <span>Admin Panel</span>
                </button>
                <button
                  id="mobile-admin-logout-btn"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    logout();
                  }}
                  className="py-2.5 px-3 rounded-xl text-center text-xs font-semibold text-rose-700 bg-rose-50 border border-rose-200 hover:bg-rose-100 flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Logout</span>
                </button>
              </div>
            )}

            <button
              id="mobile-quote-btn"
              onClick={() => {
                setMobileMenuOpen(false);
                onRequestQuote();
              }}
              className="w-full py-3 px-4 rounded-xl text-center text-sm font-bold text-white bg-gradient-to-r from-[#1E40AF] to-[#2563EB] shadow-lg shadow-blue-900/20 flex items-center justify-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>Request Talent Consultation</span>
            </button>

            <a
              href={`tel:${cleanPhone}`}
              className="w-full py-2.5 px-4 rounded-xl text-center text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 flex items-center justify-center gap-2 cursor-pointer"
            >
              <Phone className="w-3.5 h-3.5 text-blue-600" />
              <span>Call Direct: {settings.phoneMain}</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
