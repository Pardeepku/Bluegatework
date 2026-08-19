import React, { useState, useMemo } from 'react';
import {
  FileCode,
  Copy,
  Check,
  Download,
  ExternalLink,
  ArrowLeft,
  Search,
  Globe,
  Sparkles,
  Layers,
  Code
} from 'lucide-react';
import { PageId } from '../types';
import { useSiteSettings } from '../context/SiteSettingsContext';

interface XmlSitemapPageProps {
  onNavigate: (page: PageId) => void;
}

export const XmlSitemapPage: React.FC<XmlSitemapPageProps> = ({ onNavigate }) => {
  const { settings, blogs } = useSiteSettings();
  const [copied, setCopied] = useState(false);
  const [copiedUrl, setCopiedUrl] = useState(false);

  const publishedBlogs = blogs.filter((b) => b.isPublished !== false);

  const xmlContent = useMemo(() => {
    const today = new Date().toISOString().split('T')[0];
    const baseUrl = 'https://bluegatework.com';

    const staticUrls = [
      { loc: `${baseUrl}/`, priority: '1.0', changefreq: 'daily' },
      { loc: `${baseUrl}/about`, priority: '0.9', changefreq: 'weekly' },
      { loc: `${baseUrl}/services`, priority: '0.9', changefreq: 'weekly' },
      { loc: `${baseUrl}/temporary-staffing`, priority: '0.9', changefreq: 'weekly' },
      { loc: `${baseUrl}/outsourcing`, priority: '0.9', changefreq: 'weekly' },
      { loc: `${baseUrl}/international-recruitment`, priority: '0.9', changefreq: 'weekly' },
      { loc: `${baseUrl}/industries`, priority: '0.8', changefreq: 'weekly' },
      { loc: `${baseUrl}/for-employers`, priority: '0.9', changefreq: 'weekly' },
      { loc: `${baseUrl}/for-jobseekers`, priority: '0.9', changefreq: 'daily' },
      { loc: `${baseUrl}/locations`, priority: '0.8', changefreq: 'monthly' },
      { loc: `${baseUrl}/compliance`, priority: '0.8', changefreq: 'monthly' },
      { loc: `${baseUrl}/contact`, priority: '0.8', changefreq: 'monthly' },
      { loc: `${baseUrl}/blog`, priority: '0.8', changefreq: 'daily' },
      { loc: `${baseUrl}/sitemap`, priority: '0.7', changefreq: 'weekly' },
    ];

    const blogUrls = publishedBlogs.map((b) => ({
      loc: `${baseUrl}/blog/${b.slug}`,
      priority: '0.7',
      changefreq: 'monthly',
      lastmod: b.publishedDate ? new Date(b.publishedDate).toISOString().split('T')[0] : today,
    }));

    const allUrls = [...staticUrls, ...blogUrls];

    let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
    xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n`;
    xml += `        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"\n`;
    xml += `        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9\n`;
    xml += `        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">\n\n`;

    allUrls.forEach((u) => {
      xml += `  <url>\n`;
      xml += `    <loc>${u.loc}</loc>\n`;
      xml += `    <lastmod>${(u as any).lastmod || today}</lastmod>\n`;
      xml += `    <changefreq>${u.changefreq}</changefreq>\n`;
      xml += `    <priority>${u.priority}</priority>\n`;
      xml += `  </url>\n`;
    });

    xml += `</urlset>`;
    return xml;
  }, [publishedBlogs]);

  const handleCopyXml = () => {
    navigator.clipboard.writeText(xmlContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(`${window.location.origin}/sitemap.xml`);
    setCopiedUrl(true);
    setTimeout(() => setCopiedUrl(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([xmlContent], { type: 'application/xml;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'sitemap.xml';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-slate-900 text-slate-100 min-h-screen py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Top Navigation */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
          <button
            onClick={() => onNavigate('sitemap')}
            className="inline-flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 px-3.5 py-2 rounded-xl transition-colors cursor-pointer border border-slate-700"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to HTML Sitemap</span>
          </button>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={handleCopyUrl}
              className="py-2 px-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 border border-slate-700 flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              {copiedUrl ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedUrl ? 'URL Copied' : 'Copy Sitemap URL'}</span>
            </button>

            <button
              onClick={handleCopyXml}
              className="py-2 px-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 border border-slate-700 flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied XML' : 'Copy Full XML'}</span>
            </button>

            <button
              onClick={handleDownload}
              className="py-2 px-3.5 rounded-xl bg-[#FFD000] hover:bg-[#e6bc00] text-[#001738] text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer shadow-md"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download sitemap.xml</span>
            </button>

            <a
              href="/sitemap.xml"
              target="_blank"
              rel="noopener noreferrer"
              className="py-2 px-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold flex items-center gap-1.5 transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Raw Protocol File</span>
            </a>
          </div>
        </div>

        {/* Header Title */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-600/20 text-[#FFD000] border border-blue-500/30 flex items-center justify-center">
            <FileCode className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-xl font-bold font-heading text-white">XML Protocol Sitemap (`/sitemap.xml`)</h1>
            <p className="text-xs text-slate-400">
              Machine-readable XML index compliant with Sitemaps.org Protocol 0.9 for search engine web crawlers.
            </p>
          </div>
        </div>

        {/* XML Code Box */}
        <div className="bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden shadow-2xl">
          <div className="bg-slate-900/90 px-4 py-2.5 border-b border-slate-800 flex items-center justify-between text-xs text-slate-400 font-mono">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
              <span className="ml-2 text-slate-300 font-bold">sitemap.xml</span>
            </div>
            <span>UTF-8 • XML 1.0</span>
          </div>

          <pre className="p-6 font-mono text-xs text-blue-300 leading-relaxed overflow-x-auto selection:bg-blue-600 selection:text-white">
            <code>{xmlContent}</code>
          </pre>
        </div>
      </div>
    </div>
  );
};
