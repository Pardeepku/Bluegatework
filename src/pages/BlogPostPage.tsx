import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Calendar, 
  Clock, 
  User, 
  Share2, 
  Check, 
  BookOpen, 
  Tag, 
  Briefcase, 
  ShieldCheck, 
  MessageSquare,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { useSiteSettings } from '../context/SiteSettingsContext';
import { BlogPost, PageId } from '../types';

interface BlogPostPageProps {
  blogSlug: string;
  onNavigate: (page: PageId, blogSlug?: string) => void;
  onRequestQuote: () => void;
}

export const BlogPostPage: React.FC<BlogPostPageProps> = ({
  blogSlug,
  onNavigate,
  onRequestQuote,
}) => {
  const { blogs, settings } = useSiteSettings();
  const [copiedLink, setCopiedLink] = useState(false);

  // Find blog by slug or fallback to first blog
  const post = blogs.find((b) => b.slug === blogSlug) || blogs[0];

  // Related posts from same category or newest
  const relatedPosts = blogs
    .filter((b) => b.id !== post?.id)
    .slice(0, 3);

  const handleCopyLink = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  const cleanWA = settings.whatsappNumber.replace(/[^\d]/g, '');
  const shareWhatsAppUrl = `https://wa.me/?text=${encodeURIComponent(
    `Check out this insight on European workforce solutions: "${post.title}" - ${window.location.href}`
  )}`;
  const shareLinkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
    window.location.href
  )}`;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* Top Breadcrumb Header Bar */}
      <div className="bg-[#001a4d] text-white py-8 border-b border-blue-900/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-2 text-xs text-blue-200/80 mb-4 flex-wrap">
            <button
              onClick={() => onNavigate('home')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Home
            </button>
            <span>/</span>
            <button
              onClick={() => onNavigate('blog')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Blog & Insights
            </button>
            <span>/</span>
            <span className="text-[#FFD000] font-semibold truncate max-w-[240px]">
              {post.category}
            </span>
          </div>

          <button
            onClick={() => onNavigate('blog')}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-bold text-white transition-colors cursor-pointer mb-4"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to all articles</span>
          </button>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-black font-heading leading-tight text-white">
            {post.title}
          </h1>

          <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-blue-100/90 pt-3 border-t border-white/10">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-blue-800 text-blue-100 flex items-center justify-center font-bold text-xs">
                <User className="w-3.5 h-3.5" />
              </div>
              <div>
                <span className="font-bold text-white block">{post.author.name}</span>
                <span className="text-[10px] text-blue-200">{post.author.role}</span>
              </div>
            </div>

            <span className="text-blue-300">&bull;</span>

            <div className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-[#FFD000]" />
              <span>{post.publishedDate}</span>
            </div>

            <span className="text-blue-300">&bull;</span>

            <div className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-[#FFD000]" />
              <span>{post.readTimeMinutes} min read</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Container */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 sm:py-12 space-y-10">
        {/* Cover Image */}
        <div className="relative rounded-3xl overflow-hidden shadow-xl aspect-video bg-slate-900 max-h-[460px]">
          <img
            src={post.coverImageUrl}
            alt={post.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-4 right-4">
            <span className="px-3.5 py-1 rounded-full bg-[#002255]/90 backdrop-blur-md text-[#FFD000] text-xs font-black shadow">
              {post.category}
            </span>
          </div>
        </div>

        {/* Social Share & Quick Actions */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1">
              <Share2 className="w-3.5 h-3.5" />
              <span>Share:</span>
            </span>
            <a
              href={shareLinkedInUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-bold transition-colors"
            >
              LinkedIn
            </a>
            <a
              href={shareWhatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-700 text-xs font-bold transition-colors"
            >
              WhatsApp
            </a>
            <button
              onClick={handleCopyLink}
              className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors flex items-center gap-1 cursor-pointer"
            >
              {copiedLink ? <Check className="w-3 h-3 text-emerald-600" /> : null}
              <span>{copiedLink ? 'Link Copied!' : 'Copy Link'}</span>
            </button>
          </div>

          <div className="flex items-center gap-1.5">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="text-[11px] px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 font-medium"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>

        {/* Article Excerpt Callout */}
        <div className="p-6 rounded-2xl bg-blue-50/80 border-l-4 border-[#002255] text-slate-800 text-sm sm:text-base font-medium leading-relaxed italic shadow-xs">
          "{post.excerpt}"
        </div>

        {/* Article Body Content */}
        <article className="prose prose-slate max-w-none space-y-6 text-slate-800 text-sm sm:text-base leading-relaxed">
          {post.content.split('\n\n').map((paragraph, index) => {
            if (paragraph.startsWith('## ')) {
              return (
                <h2
                  key={index}
                  className="text-xl sm:text-2xl font-black font-heading text-slate-900 pt-4 pb-1 border-b border-slate-200"
                >
                  {paragraph.replace('## ', '')}
                </h2>
              );
            }
            if (paragraph.startsWith('### ')) {
              return (
                <h3
                  key={index}
                  className="text-lg sm:text-xl font-bold font-heading text-[#002255] pt-2"
                >
                  {paragraph.replace('### ', '')}
                </h3>
              );
            }
            if (paragraph.startsWith('- ') || paragraph.startsWith('1. ')) {
              const lines = paragraph.split('\n');
              return (
                <ul key={index} className="space-y-2 pl-5 list-disc text-slate-700">
                  {lines.map((line, lIdx) => (
                    <li key={lIdx} className="pl-1">
                      <span
                        dangerouslySetInnerHTML={{
                          __html: line
                            .replace(/^[-*]\s+|\d+\.\s+/, '')
                            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>'),
                        }}
                      />
                    </li>
                  ))}
                </ul>
              );
            }
            return (
              <p
                key={index}
                className="text-slate-700 leading-relaxed"
                dangerouslySetInnerHTML={{
                  __html: paragraph.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>'),
                }}
              />
            );
          })}
        </article>

        {/* Author Bio Box */}
        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-[#002255] text-[#FFD000] flex items-center justify-center font-bold text-xl shrink-0 shadow-md">
            <User className="w-7 h-7" />
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">About the Author</span>
            </div>
            <h4 className="text-base font-bold text-slate-900 font-heading">{post.author.name}</h4>
            <p className="text-xs text-slate-500 font-medium">{post.author.role} at {settings.siteName}</p>
            <p className="text-xs text-slate-600 pt-1">
              Specializing in cross-border European labor mobility, compliance frameworks, and industrial workforce management across Portugal, the Netherlands, and global corridors.
            </p>
          </div>
        </div>

        {/* In-Article Action Consultation Banner */}
        <div className="p-8 rounded-3xl bg-gradient-to-r from-[#002255] to-[#1E40AF] text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/10 text-[#FFD000] text-xs font-bold uppercase">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Compliant European Staffing</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black font-heading">
              Have Questions About Workforce Regulations or Peak Staffing?
            </h3>
            <p className="text-xs sm:text-sm text-blue-100">
              Speak with our senior labor coordinators to explore how {settings.siteName} handles legal A1 certifications, SNF worker housing, and rapid 48-72h deployment.
            </p>
          </div>

          <div className="shrink-0 flex flex-col sm:flex-row items-center gap-3">
            <button
              onClick={onRequestQuote}
              className="px-6 py-3 bg-[#FFD000] hover:bg-[#ffe043] text-slate-950 font-black rounded-2xl text-xs sm:text-sm transition-all shadow-md flex items-center gap-2 cursor-pointer"
            >
              <Briefcase className="w-4 h-4" />
              <span>Request Talent</span>
            </button>
            <button
              onClick={() => onNavigate('contact')}
              className="px-5 py-3 bg-white/10 hover:bg-white/20 text-white font-bold rounded-2xl text-xs sm:text-sm border border-white/20 transition-all cursor-pointer"
            >
              <span>Contact Us</span>
            </button>
          </div>
        </div>

        {/* Related Articles Section */}
        {relatedPosts.length > 0 && (
          <div className="space-y-6 pt-6 border-t border-slate-200">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold font-heading text-slate-900">
                Related European Workforce Insights
              </h3>
              <button
                onClick={() => onNavigate('blog')}
                className="text-xs font-bold text-[#002255] hover:underline flex items-center gap-1 cursor-pointer"
              >
                <span>View All Articles</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPosts.map((rPost) => (
                <div
                  key={rPost.id}
                  onClick={() => onNavigate('blog', rPost.slug)}
                  className="group bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all p-4 flex flex-col justify-between cursor-pointer"
                >
                  <div className="space-y-2.5">
                    <div className="relative h-32 rounded-xl overflow-hidden bg-slate-900">
                      <img
                        src={rPost.coverImageUrl}
                        alt={rPost.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <span className="text-[10px] font-bold text-[#002255] bg-blue-50 px-2 py-0.5 rounded">
                      {rPost.category}
                    </span>
                    <h5 className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-[#002255] transition-colors line-clamp-2">
                      {rPost.title}
                    </h5>
                  </div>

                  <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                    <span>{rPost.readTimeMinutes} min read</span>
                    <span className="font-bold text-[#002255] group-hover:underline">Read →</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
