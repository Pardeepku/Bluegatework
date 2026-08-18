import React, { useState, useEffect } from 'react';
import { PageId, Language, JobPosting } from './types';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { RequestQuoteModal } from './components/RequestQuoteModal';
import { ApplyJobModal } from './components/ApplyJobModal';
import { AdminLoginModal } from './components/AdminLoginModal';
import { AdminPanelModal } from './components/AdminPanelModal';
import { AdminImageManagerModal } from './components/AdminImageManagerModal';
import { ImageProvider, useImages } from './context/ImageContext';
import { SiteSettingsProvider, useSiteSettings } from './context/SiteSettingsContext';
import { Sliders, Lock, ShieldCheck } from 'lucide-react';

// Pages
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ServicesPage } from './pages/ServicesPage';
import { TemporaryStaffingPage } from './pages/TemporaryStaffingPage';
import { OutsourcingPage } from './pages/OutsourcingPage';
import { InternationalRecruitmentPage } from './pages/InternationalRecruitmentPage';
import { IndustriesPage } from './pages/IndustriesPage';
import { ForEmployersPage } from './pages/ForEmployersPage';
import { ForJobseekersPage } from './pages/ForJobseekersPage';
import { LocationsPage } from './pages/LocationsPage';
import { ContactPage } from './pages/ContactPage';

function AppContent() {
  const [currentPage, setCurrentPage] = useState<PageId>('home');
  const [currentLang, setCurrentLang] = useState<Language>('en');
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [selectedJobForApply, setSelectedJobForApply] = useState<JobPosting | null>(null);

  const {
    settings,
    isAdminAuthenticated,
    isLoginModalOpen,
    setIsLoginModalOpen,
    isAdminPanelOpen,
    setIsAdminPanelOpen
  } = useSiteSettings();

  const { isAdminOpen, setIsAdminOpen } = useImages();

  // Dynamic Browser Title and Favicon Management based on Site Settings
  useEffect(() => {
    // Update Document Title
    document.title = `${settings.siteName} | ${settings.tagline}`;

    // Update Favicon if custom favicon provided
    if (settings.faviconUrl) {
      let link = document.querySelector("link[rel~='icon']") as HTMLLinkElement;
      if (!link) {
        link = document.createElement('link');
        link.rel = 'icon';
        document.getElementsByTagName('head')[0].appendChild(link);
      }
      link.href = settings.faviconUrl;
    }
  }, [settings.siteName, settings.tagline, settings.faviconUrl]);

  // Scroll to top upon page navigation
  const handleNavigate = (page: PageId) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenQuoteModal = () => {
    setIsQuoteModalOpen(true);
  };

  const handleOpenApplyModal = (job?: JobPosting | null) => {
    setSelectedJobForApply(job || null);
    setIsApplyModalOpen(true);
  };

  const handleOpenAdminTrigger = () => {
    if (isAdminAuthenticated) {
      setIsAdminPanelOpen(true);
    } else {
      setIsLoginModalOpen(true);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-slate-900 font-sans selection:bg-[#1E40AF] selection:text-white">
      {/* Top Main Navigation */}
      <Header
        currentPage={currentPage}
        onNavigate={handleNavigate}
        onRequestQuote={handleOpenQuoteModal}
        currentLang={currentLang}
        onLanguageChange={setCurrentLang}
      />

      {/* Main Dynamic Content Area */}
      <main className="flex-1">
        {currentPage === 'home' && (
          <HomePage
            onNavigate={handleNavigate}
            onRequestQuote={handleOpenQuoteModal}
            onApplyJob={handleOpenApplyModal}
          />
        )}

        {currentPage === 'about' && (
          <AboutPage
            onNavigate={handleNavigate}
            onRequestQuote={handleOpenQuoteModal}
          />
        )}

        {currentPage === 'services' && (
          <ServicesPage
            onNavigate={handleNavigate}
            onRequestQuote={handleOpenQuoteModal}
          />
        )}

        {currentPage === 'temporary-staffing' && (
          <TemporaryStaffingPage
            onNavigate={handleNavigate}
            onRequestQuote={handleOpenQuoteModal}
          />
        )}

        {currentPage === 'outsourcing' && (
          <OutsourcingPage
            onNavigate={handleNavigate}
            onRequestQuote={handleOpenQuoteModal}
          />
        )}

        {currentPage === 'international-recruitment' && (
          <InternationalRecruitmentPage
            onNavigate={handleNavigate}
            onRequestQuote={handleOpenQuoteModal}
          />
        )}

        {currentPage === 'industries' && (
          <IndustriesPage
            onNavigate={handleNavigate}
            onRequestQuote={handleOpenQuoteModal}
          />
        )}

        {currentPage === 'for-employers' && (
          <ForEmployersPage
            onNavigate={handleNavigate}
            onRequestQuote={handleOpenQuoteModal}
          />
        )}

        {currentPage === 'for-jobseekers' && (
          <ForJobseekersPage
            onNavigate={handleNavigate}
            onApplyJob={handleOpenApplyModal}
          />
        )}

        {currentPage === 'locations' && (
          <LocationsPage
            onNavigate={handleNavigate}
            onRequestQuote={handleOpenQuoteModal}
          />
        )}

        {currentPage === 'contact' && (
          <ContactPage
            onNavigate={handleNavigate}
            onRequestQuote={handleOpenQuoteModal}
          />
        )}
      </main>

      {/* Global Comprehensive Footer */}
      <Footer
        onNavigate={handleNavigate}
        onRequestQuote={handleOpenQuoteModal}
      />

      {/* Floating Interactive WhatsApp Widget */}
      <FloatingWhatsApp />

      {/* Floating Quick Admin Pill */}
      <div className="fixed bottom-6 left-6 z-40">
        <button
          id="floating-admin-control-btn"
          onClick={handleOpenAdminTrigger}
          className="group px-3.5 py-2 rounded-full bg-[#002255] text-white hover:bg-[#001738] shadow-xl border border-blue-400/30 flex items-center gap-2 transition-all hover:scale-105 cursor-pointer text-xs font-bold"
          title={isAdminAuthenticated ? "Open Admin Control Panel" : "Admin Login to manage website settings & images"}
        >
          <div className="w-5 h-5 rounded-full bg-[#FFD000] text-slate-950 flex items-center justify-center font-bold">
            {isAdminAuthenticated ? (
              <Sliders className="w-3 h-3 text-slate-950" />
            ) : (
              <Lock className="w-3 h-3 text-slate-950" />
            )}
          </div>
          <span className="hidden sm:inline">
            {isAdminAuthenticated ? 'Admin Panel' : 'Admin Login'}
          </span>
          <span className="sm:hidden">
            {isAdminAuthenticated ? 'Admin' : 'Login'}
          </span>
          {isAdminAuthenticated && (
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          )}
        </button>
      </div>

      {/* Admin Authentication & Management Modals */}
      <AdminLoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
      />

      <AdminPanelModal
        isOpen={isAdminPanelOpen}
        onClose={() => setIsAdminPanelOpen(false)}
      />

      {/* Standalone Image Manager Modal (also accessible via Admin Panel) */}
      <AdminImageManagerModal
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
      />

      {/* Customer / Candidate Facing Modals */}
      <RequestQuoteModal
        isOpen={isQuoteModalOpen}
        onClose={() => setIsQuoteModalOpen(false)}
      />

      <ApplyJobModal
        isOpen={isApplyModalOpen}
        onClose={() => {
          setIsApplyModalOpen(false);
          setSelectedJobForApply(null);
        }}
        job={selectedJobForApply}
      />
    </div>
  );
}

export default function App() {
  return (
    <SiteSettingsProvider>
      <ImageProvider>
        <AppContent />
      </ImageProvider>
    </SiteSettingsProvider>
  );
}
