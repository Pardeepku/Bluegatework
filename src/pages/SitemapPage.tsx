import React, { useState } from 'react';
import {
  Globe,
  FileCode,
  Layers,
  Building2,
  Briefcase,
  Users,
  ShieldCheck,
  MapPin,
  Phone,
  BookOpen,
  ArrowRight,
  ExternalLink,
  Search,
  Download,
  Copy,
  Check,
  CheckCircle2,
  Sparkles,
  FileText
} from 'lucide-react';
import { PageId } from '../types';
import { useSiteSettings } from '../context/SiteSettingsContext';
import { CORE_SERVICES, INDUSTRIES } from '../data/mockData';

interface SitemapPageProps {
  onNavigate: (page: PageId, blogSlug?: string) => void;
  onRequestQuote: () => void;
}

export const SitemapPage: React.FC<SitemapPageProps> = ({ onNavigate, onRequestQuote }) => {
  const { settings, blogs } = useSiteSettings();
  const [searchTerm, setSearchTerm] = useState('');
  const [copiedXml, setCopiedXml] = useState(false);

  const publishedBlogs = blogs.filter((b) => b.isPublished !== false);

  const sections = [
    {
      id: 'main',
      title: 'Main Company & Corporate Portals',
      description: 'Core organizational information, company mission, and direct contact gateways.',
      icon: Building2,
      color: 'blue',
      items: [
        {
          title: 'Home / Primary Overview',
          url: '/',
          slug: 'home',
          pageId: 'home' as PageId,
          description: 'Main homepage introducing Bluegate Work services, industry coverage, and European corridors.',
          priority: '1.0',
          changefreq: 'Daily',
        },
        {
          title: 'About Bluegate Work',
          url: '/about',
          slug: 'about',
          pageId: 'about' as PageId,
          description: 'Company history, executive team, European footprint, compliance integrity, and mission.',
          priority: '0.9',
          changefreq: 'Weekly',
        },
        {
          title: 'Global Hubs & European Corridors',
          url: '/locations',
          slug: 'locations',
          pageId: 'locations' as PageId,
          description: 'Lisbon headquarters, Rotterdam logistics branch, and cross-border candidate corridors.',
          priority: '0.8',
          changefreq: 'Monthly',
        },
        {
          title: 'Contact Us & Headquarter Inquiries',
          url: '/contact',
          slug: 'contact',
          pageId: 'contact' as PageId,
          description: 'Direct phone lines, email contact, office maps, and instant callback request channels.',
          priority: '0.8',
          changefreq: 'Monthly',
        },
        {
          title: 'Labor Compliance & Legal Standards',
          url: '/compliance',
          slug: 'compliance',
          pageId: 'compliance' as PageId,
          description: 'ACT Portugal, Dutch NEN 4400 / WAADI, AIMA work permits, and EU Posted Worker Directives.',
          priority: '0.8',
          changefreq: 'Monthly',
        },
      ],
    },
    {
      id: 'services',
      title: 'Workforce & Staffing Solutions',
      description: 'Flexible staffing, turnkey operations outsourcing, and global recruitment programs.',
      icon: Briefcase,
      color: 'amber',
      items: [
        {
          title: 'All Workforce Services Overview',
          url: '/services',
          slug: 'services',
          pageId: 'services' as PageId,
          description: 'Complete directory of workforce models, SLAs, recruitment pipelines, and pricing tiers.',
          priority: '0.9',
          changefreq: 'Weekly',
        },
        {
          title: 'Temporary Staffing Solutions',
          url: '/temporary-staffing',
          slug: 'temporary-staffing',
          pageId: 'temporary-staffing' as PageId,
          description: 'Rapid on-demand deployment within 48-72h for seasonal surges, warehousing, and production.',
          priority: '0.9',
          changefreq: 'Weekly',
        },
        {
          title: 'Workforce Outsourcing & Operations',
          url: '/outsourcing',
          slug: 'outsourcing',
          pageId: 'outsourcing' as PageId,
          description: 'Output-based managed services, dedicated on-site supervision, KPI tracking, and line management.',
          priority: '0.9',
          changefreq: 'Weekly',
        },
        {
          title: 'International Recruitment & Relocation',
          url: '/international-recruitment',
          slug: 'international-recruitment',
          pageId: 'international-recruitment' as PageId,
          description: 'Ethical global talent acquisition, visa processing, certified accommodation, and transport.',
          priority: '0.9',
          changefreq: 'Weekly',
        },
      ],
    },
    {
      id: 'audiences',
      title: 'Employer & Jobseeker Portals',
      description: 'Tailored pathways for B2B enterprise clients and European career candidates.',
      icon: Users,
      color: 'emerald',
      items: [
        {
          title: 'For Employers (B2B Staffing)',
          url: '/for-employers',
          slug: 'for-employers',
          pageId: 'for-employers' as PageId,
          description: 'Enterprise staffing consultation, fast headcount quotes, SLA options, and client testimonials.',
          priority: '0.9',
          changefreq: 'Weekly',
        },
        {
          title: 'For Jobseekers (Careers & Jobs)',
          url: '/for-jobseekers',
          slug: 'for-jobseekers',
          pageId: 'for-jobseekers' as PageId,
          description: 'Live vacancies across Portugal and Netherlands, housing benefits, and application forms.',
          priority: '0.9',
          changefreq: 'Daily',
        },
      ],
    },
    {
      id: 'industries',
      title: 'Industry Sectors Powered',
      description: 'Specialized workforce deployment across critical European economic verticals.',
      icon: Layers,
      color: 'indigo',
      items: [
        {
          title: 'Industries We Power (Full Directory)',
          url: '/industries',
          slug: 'industries',
          pageId: 'industries' as PageId,
          description: 'Comprehensive industry overview covering logistics, manufacturing, agriculture, and hospitality.',
          priority: '0.8',
          changefreq: 'Weekly',
        },
      ],
    },
    {
      id: 'blog',
      title: 'Knowledge Hub & Legal Guides (Blog)',
      description: 'Expert analysis on European labor legislation, supply chain staffing, and recruitment.',
      icon: BookOpen,
      color: 'purple',
      items: [
        {
          title: 'Blog & Insights Main Hub',
          url: '/blog',
          slug: 'blog',
          pageId: 'blog' as PageId,
          description: 'All published articles, compliance whitepapers, and European workforce guides.',
          priority: '0.8',
          changefreq: 'Daily',
        },
        ...publishedBlogs.map((b) => ({
          title: b.title,
          url: `/blog/${b.slug}`,
          slug: `blog/${b.slug}`,
          pageId: 'blog' as PageId,
          blogSlug: b.slug,
          description: b.excerpt,
          priority: '0.7',
          changefreq: 'Monthly',
        })),
      ],
    },
    {
      id: 'technical',
      title: 'Technical XML Sitemaps & Feeds',
      description: 'Machine-readable search engine endpoints and protocol files.',
      icon: FileCode,
      color: 'rose',
      items: [
        {
          title: 'XML Sitemap Feed (sitemap.xml)',
          url: '/sitemap.xml',
          slug: 'sitemap.xml',
          pageId: 'sitemap-xml' as PageId,
          description: 'Standard XML protocol sitemap for search engine crawlers (Google, Bing, Yandex).',
          priority: '0.7',
          changefreq: 'Weekly',
        },
        {
          title: 'Robots Protocol (robots.txt)',
          url: '/robots.txt',
          slug: 'robots.txt',
          pageId: 'home' as PageId,
          isExternalFile: true,
          description: 'Crawler directives, indexing permissions, and sitemap pointer.',
          priority: '0.5',
          changefreq: 'Monthly',
        },
      ],
    },
  ];

  // Filter sections by search term
  const filteredSections = sections
    .map((sec) => ({
      ...sec,
      items: sec.items.filter(
        (item) =>
          item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.url.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    }))
    .filter((sec) => sec.items.length > 0);

  const totalUrlCount = sections.reduce((acc, s) => acc + s.items.length, 0);

  const handleCopyXmlUrl = () => {
    navigator.clipboard.writeText(`${window.location.origin}/sitemap.xml`);
    setCopiedXml(true);
    setTimeout(() => setCopiedXml(false), 2500);
  };

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Header Banner */}
      <section className="relative bg-[#001738] text-white py-16 lg:py-20 overflow-hidden border-b-4 border-[#002f73]">
        <div className="absolute inset-0 bg-gradient-to-r from-[#001a4d] via-[#002868] to-[#001738] opacity-95" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#FFD000]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div className="space-y-4 max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 text-[#FFD000] text-xs font-bold uppercase tracking-wider backdrop-blur-sm border border-white/10">
                <Globe className="w-3.5 h-3.5" />
                <span>SEO & Site Navigation Directory</span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight font-heading">
                Website Sitemap & Page Index
              </h1>
              <p className="text-blue-100 text-sm sm:text-base leading-relaxed">
                A complete navigational directory of all public pages, workforce service branches, European industry corridors, career listings, legal guides, and technical XML feeds for <span className="text-[#FFD000] font-semibold">{settings.siteName}</span>.
              </p>
            </div>

            {/* Quick Actions Card */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/15 space-y-3 min-w-[280px]">
              <div className="text-xs font-bold uppercase tracking-wider text-blue-200 flex items-center justify-between">
                <span>Total Indexed URLs</span>
                <span className="bg-[#FFD000] text-[#001738] px-2.5 py-0.5 rounded-full font-black text-xs">
                  {totalUrlCount} Pages
                </span>
              </div>

              <div className="flex flex-col gap-2 pt-1">
                <button
                  onClick={() => onNavigate('sitemap-xml')}
                  className="w-full py-2.5 px-4 bg-[#FFD000] hover:bg-[#e6bc00] text-[#001738] font-bold text-xs rounded-xl transition-colors flex items-center justify-center gap-2 shadow-md cursor-pointer"
                >
                  <FileCode className="w-4 h-4" />
                  <span>View XML Sitemap Live</span>
                </button>

                <div className="flex gap-2">
                  <a
                    href="/sitemap.xml"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-2 px-3 bg-white/15 hover:bg-white/25 text-white font-semibold text-xs rounded-xl transition-colors flex items-center justify-center gap-1.5 border border-white/10"
                    title="Open raw sitemap.xml in browser"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>Raw XML</span>
                  </a>

                  <button
                    onClick={handleCopyXmlUrl}
                    className="py-2 px-3 bg-white/15 hover:bg-white/25 text-white font-semibold text-xs rounded-xl transition-colors flex items-center justify-center gap-1.5 border border-white/10 cursor-pointer"
                    title="Copy XML Sitemap URL"
                  >
                    {copiedXml ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedXml ? 'Copied' : 'Copy URL'}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Search & Filter Bar */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-sm mb-10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full sm:max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search sitemap by keyword, slug, or page name..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all"
            />
          </div>

          <div className="flex items-center gap-3 text-xs text-slate-500 w-full sm:w-auto justify-between sm:justify-end">
            <span>Showing {filteredSections.reduce((a, s) => a + s.items.length, 0)} of {totalUrlCount} links</span>
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="text-blue-600 font-bold hover:underline cursor-pointer"
              >
                Clear Search
              </button>
            )}
          </div>
        </div>

        {/* Sitemap Categories Grid */}
        <div className="space-y-10">
          {filteredSections.map((section) => {
            const Icon = section.icon;
            return (
              <div
                key={section.id}
                className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6"
              >
                {/* Section Header */}
                <div className="flex items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-100 flex-col sm:flex-row">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#001738] text-[#FFD000] flex items-center justify-center shrink-0">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-slate-900 font-heading">{section.title}</h2>
                      <p className="text-xs text-slate-500">{section.description}</p>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-slate-400 bg-slate-100 px-3 py-1 rounded-full">
                    {section.items.length} {section.items.length === 1 ? 'URL' : 'URLs'}
                  </span>
                </div>

                {/* Section Items Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {section.items.map((item, idx) => (
                    <div
                      key={idx}
                      className="group p-4 rounded-2xl bg-slate-50/70 hover:bg-blue-50/50 border border-slate-200/80 hover:border-blue-300 transition-all flex flex-col justify-between gap-3"
                    >
                      <div className="space-y-1.5">
                        <div className="flex items-center justify-between gap-2">
                          <span className="font-mono text-[11px] font-bold text-blue-700 bg-blue-100/80 px-2 py-0.5 rounded">
                            {item.url}
                          </span>
                          <div className="flex items-center gap-1.5 text-[10px] text-slate-400">
                            <span>Priority: {item.priority}</span>
                            <span>•</span>
                            <span>{item.changefreq}</span>
                          </div>
                        </div>

                        <h3 className="text-sm font-bold text-slate-900 group-hover:text-blue-900 transition-colors">
                          {item.title}
                        </h3>
                        <p className="text-xs text-slate-500 leading-relaxed line-clamp-2">
                          {item.description}
                        </p>
                      </div>

                      <div className="pt-2 border-t border-slate-200/60 flex items-center justify-between">
                        {item.isExternalFile ? (
                          <a
                            href={item.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1 cursor-pointer"
                          >
                            <span>Open File</span>
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        ) : (
                          <button
                            onClick={() => {
                              if (item.pageId === 'sitemap-xml') {
                                onNavigate('sitemap-xml');
                              } else {
                                onNavigate(item.pageId, item.blogSlug);
                              }
                              window.scrollTo({ top: 0, behavior: 'smooth' });
                            }}
                            className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1 cursor-pointer group-hover:translate-x-0.5 transition-all"
                          >
                            <span>Visit Page</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </button>
                        )}
                        <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                          {item.slug}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA Card */}
        <div className="mt-12 bg-[#001a4d] rounded-3xl p-8 sm:p-10 text-white flex flex-col md:flex-row items-center justify-between gap-6 border-2 border-[#FFD000]/30 shadow-xl">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="text-2xl font-bold font-heading text-white">Need Custom Staffing or Relocation Advice?</h3>
            <p className="text-blue-200 text-sm max-w-xl">
              Our workforce deployment specialists in Lisbon and Rotterdam are ready to assist your business with customized headcount planning.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <button
              onClick={onRequestQuote}
              className="py-3 px-6 rounded-xl font-bold text-sm bg-[#FFD000] hover:bg-[#e6bc00] text-[#001738] transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-lg"
            >
              <span>Request Staffing Proposal</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => onNavigate('contact')}
              className="py-3 px-6 rounded-xl font-semibold text-sm bg-white/10 hover:bg-white/20 text-white transition-colors flex items-center justify-center cursor-pointer border border-white/20"
            >
              <span>Contact Headquarters</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
