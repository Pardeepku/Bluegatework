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
import { AdminPage } from './pages/AdminPage';
import { CompliancePage } from './pages/CompliancePage';
import { SitemapPage } from './pages/SitemapPage';
import { XmlSitemapPage } from './pages/XmlSitemapPage';

function getInitialRoute(): { page: PageId; blogSlug?: string; wasFallback?: boolean } {
  if (typeof window === 'undefined') return { page: 'home' };

  let rawPath = window.location.pathname.replace(/^\/+|\/+$/g, '');

  // Check SPA query redirect from 404.html (e.g. /?/admin or /?p=/admin or ?admin)
  if (!rawPath || rawPath === 'index.html') {
    if (window.location.search) {
      const search = window.location.search;
      if (search.startsWith('?/')) {
        rawPath = search.slice(2).split('&')[0].replace(/~and~/g, '&');
      } else {
        const params = new URLSearchParams(search);
        const p = params.get('p') || params.get('page') || params.get('route');
        if (p) {
          rawPath = p.replace(/^\/+|\/+$/g, '');
        } else if (search === '?admin' || search === '?/admin') {
          rawPath = 'admin';
        }
      }
    }
  }

  // Check hash routing if user typed #/admin or #/services or #about
  if (!rawPath || rawPath === 'index.html') {
    if (window.location.hash) {
      rawPath = window.location.hash.replace(/^#\/?/, '').replace(/\/+$/, '');
    }
  }

  if (!rawPath) return { page: 'home' };

  // Normalize path (lowercase, strip trailing .html)
  let path = rawPath.toLowerCase();
  path = path.replace(/\.html$/i, '');

  // Check blog slug routes
  if (path.startsWith('blog/')) {
    const slug = rawPath.substring(5).replace(/^\/+|\/+$/g, '');
    if (slug) {
      return { page: 'blog', blogSlug: slug };
    }
    return { page: 'blog' };
  }

  // Route Aliases & Mapping
  const aliasMap: Record<string, PageId> = {
    '': 'home',
    'index': 'home',
    'home': 'home',
    'about': 'about',
    'about-us': 'about',
    'company': 'about',
    'services': 'services',
    'our-services': 'services',
    'temporary-staffing': 'temporary-staffing',
    'staffing': 'temporary-staffing',
    'temp-staffing': 'temporary-staffing',
    'outsourcing': 'outsourcing',
    'workforce-outsourcing': 'outsourcing',
    'international-recruitment': 'international-recruitment',
    'relocation': 'international-recruitment',
    'global-recruitment': 'international-recruitment',
    'industries': 'industries',
    'sectors': 'industries',
    'for-employers': 'for-employers',
    'employers': 'for-employers',
    'hire': 'for-employers',
    'client': 'for-employers',
    'for-jobseekers': 'for-jobseekers',
    'jobseekers': 'for-jobseekers',
    'jobs': 'for-jobseekers',
    'careers': 'for-jobseekers',
    'vacancies': 'for-jobseekers',
    'locations': 'locations',
    'branches': 'locations',
    'hubs': 'locations',
    'contact': 'contact',
    'contact-us': 'contact',
    'inquiry': 'contact',
    'compliance': 'compliance',
    'legal': 'compliance',
    'certifications': 'compliance',
    'blog': 'blog',
    'insights': 'blog',
    'news': 'blog',
    'articles': 'blog',
    'admin': 'admin',
    'control': 'admin',
    'sitemap': 'sitemap',
    'sitemaps': 'sitemap',
    'html-sitemap': 'sitemap',
    'sitemap.xml': 'sitemap-xml',
    'sitemap-xml': 'sitemap-xml',
  };

  if (aliasMap[path]) {
    return { page: aliasMap[path] };
  }

  const validPages: PageId[] = [
    'home',
    'about',
    'services',
    'temporary-staffing',
    'outsourcing',
    'international-recruitment',
    'industries',
    'for-employers',
    'for-jobseekers',
    'locations',
    'contact',
    'compliance',
    'blog',
    'admin',
    'sitemap',
    'sitemap-xml',
  ];

  if (validPages.includes(path as PageId)) {
    return { page: path as PageId };
  }

  // If path does not exist in sitemap, fallback to home page as requested
  return { page: 'home', wasFallback: true };
}

function getPathForPage(page: PageId, blogSlug?: string): string {
  if (page === 'home') return '/';
  if (page === 'blog' && blogSlug) return `/blog/${blogSlug}`;
  if (page === 'sitemap-xml') return '/sitemap.xml';
  return `/${page}`;
}

import { BlogPage } from './pages/BlogPage';
import { BlogPostPage } from './pages/BlogPostPage';

function AppContent() {
  const initialRoute = getInitialRoute();
  const [currentPage, setCurrentPage] = useState<PageId>(initialRoute.page);
  const [currentBlogSlug, setCurrentBlogSlug] = useState<string | undefined>(initialRoute.blogSlug);
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

  // Listen for browser Back/Forward buttons and normalize fallback URLs
  useEffect(() => {
    if (initialRoute.wasFallback) {
      window.history.replaceState({ page: 'home' }, '', '/');
    }

    const handlePopState = () => {
      const route = getInitialRoute();
      setCurrentPage(route.page);
      setCurrentBlogSlug(route.blogSlug);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Dynamic Browser Title and Favicon Management based on Site Settings
  useEffect(() => {
    // Update Document Title based on current page
    const pageTitleMap: Record<PageId, string> = {
      home: `${settings.siteName} | ${settings.tagline}`,
      about: `About Us | ${settings.siteName}`,
      services: `Workforce Services & Staffing | ${settings.siteName}`,
      'temporary-staffing': `Temporary Staffing Solutions | ${settings.siteName}`,
      outsourcing: `Workforce Outsourcing & Operations | ${settings.siteName}`,
      'international-recruitment': `International Recruitment & Relocation | ${settings.siteName}`,
      industries: `Industries We Power | ${settings.siteName}`,
      'for-employers': `For Employers & Request Staff | ${settings.siteName}`,
      'for-jobseekers': `For Jobseekers & European Careers | ${settings.siteName}`,
      locations: `Global Hubs & European Corridors | ${settings.siteName}`,
      contact: `Contact Us & Locations | ${settings.siteName}`,
      compliance: `Labor Compliance & Legal Standards | ${settings.siteName}`,
      blog: `Blog, Legal & Staffing Insights | ${settings.siteName}`,
      admin: `Admin Control Center | ${settings.siteName}`,
      sitemap: `Website Sitemap & Page Index | ${settings.siteName}`,
      'sitemap-xml': `XML Protocol Sitemap | ${settings.siteName}`,
    };

    document.title = pageTitleMap[currentPage] || `${settings.siteName} | ${settings.tagline}`;

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
  }, [currentPage, settings.siteName, settings.tagline, settings.faviconUrl]);

  // Navigate function that syncs URL in browser address bar
  const handleNavigate = (page: PageId, blogSlug?: string) => {
    setCurrentPage(page);
    setCurrentBlogSlug(blogSlug);

    const newPath = getPathForPage(page, blogSlug);
    if (window.location.pathname !== newPath) {
      window.history.pushState({ page, blogSlug }, '', newPath);
    }
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

  // If URL is /admin, render dedicated full-screen AdminPage without header/footer clutter
  if (currentPage === 'admin') {
    return <AdminPage onNavigate={handleNavigate} />;
  }

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

        {currentPage === 'compliance' && (
          <CompliancePage
            onNavigate={handleNavigate}
            onRequestQuote={handleOpenQuoteModal}
          />
        )}

        {currentPage === 'sitemap' && (
          <SitemapPage
            onNavigate={handleNavigate}
            onRequestQuote={handleOpenQuoteModal}
          />
        )}

        {currentPage === 'sitemap-xml' && (
          <XmlSitemapPage
            onNavigate={handleNavigate}
          />
        )}

        {currentPage === 'blog' && (
          currentBlogSlug ? (
            <BlogPostPage
              blogSlug={currentBlogSlug}
              onNavigate={handleNavigate}
              onRequestQuote={handleOpenQuoteModal}
            />
          ) : (
            <BlogPage
              onNavigate={handleNavigate}
              onRequestQuote={handleOpenQuoteModal}
            />
          )
        )}
      </main>

      {/* Global Comprehensive Footer */}
      <Footer
        onNavigate={handleNavigate}
        onRequestQuote={handleOpenQuoteModal}
      />

      {/* Floating Interactive WhatsApp Widget */}
      <FloatingWhatsApp />

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
