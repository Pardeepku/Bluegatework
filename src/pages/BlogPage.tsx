import React, { useState, useMemo } from 'react';
import { 
  BookOpen, 
  Search, 
  Tag, 
  Clock, 
  Calendar, 
  ArrowRight, 
  User, 
  ChevronRight, 
  Sparkles,
  Share2,
  SlidersHorizontal,
  Briefcase
} from 'lucide-react';
import { useSiteSettings } from '../context/SiteSettingsContext';
import { BlogPost, PageId } from '../types';

interface BlogPageProps {
  onNavigate: (page: PageId, blogSlug?: string) => void;
  onRequestQuote: () => void;
}

export const BlogPage: React.FC<BlogPageProps> = ({ onNavigate, onRequestQuote }) => {
  const { blogs, settings } = useSiteSettings();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Extract unique categories
  const categories = useMemo(() => {
    const cats = new Set<string>();
    blogs.forEach((b) => {
      if (b.category) cats.add(b.category);
    });
    return ['All', ...Array.from(cats)];
  }, [blogs]);

  // Filtered blogs
  const filteredBlogs = useMemo(() => {
    return blogs.filter((blog) => {
      if (!blog.isPublished && blog.isPublished !== undefined) return false;
      const matchesCategory =
        selectedCategory === 'All' || blog.category.toLowerCase() === selectedCategory.toLowerCase();
      const matchesSearch =
        blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        blog.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        blog.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase())) ||
        blog.author.name.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [blogs, selectedCategory, searchQuery]);

  const featuredPost = useMemo(() => {
    return blogs.find((b) => b.isFeatured) || blogs[0];
  }, [blogs]);

  const regularPosts = useMemo(() => {
    if (searchQuery || selectedCategory !== 'All') {
      return filteredBlogs;
    }
    return filteredBlogs.filter((b) => b.id !== featuredPost?.id);
  }, [filteredBlogs, featuredPost, searchQuery, selectedCategory]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* Hero Header Section */}
      <section className="relative bg-[#001a4d] text-white py-16 sm:py-20 overflow-hidden border-b border-blue-900/50">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#FFD000_1px,transparent_1px)] [background-size:20px_20px]" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-900/80 border border-blue-700/60 text-[#FFD000] text-xs font-bold uppercase tracking-wider">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Insights, Labor Law & Staffing Trends</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black font-heading tracking-tight leading-tight">
              European Workforce Intelligence & Sector News
            </h1>

            <p className="text-sm sm:text-base text-blue-100/90 leading-relaxed">
              Expert legal analysis, cross-border deployment best practices, seasonal logistics scalability, and ethical international recruitment insights from the {settings.siteName} team.
            </p>

            {/* Live Search & Filter Bar */}
            <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search articles by title, topic, or keyword..."
                  className="w-full pl-10 pr-4 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl text-xs sm:text-sm text-white placeholder:text-blue-200/60 focus:bg-white/20 focus:outline-none focus:border-[#FFD000] transition-all"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-blue-200 hover:text-white"
                  >
                    Clear
                  </button>
                )}
              </div>

              <button
                onClick={onRequestQuote}
                className="px-5 py-3 rounded-2xl bg-[#FFD000] hover:bg-[#ffe043] text-slate-950 text-xs sm:text-sm font-black transition-all shadow-md flex items-center justify-center gap-2 shrink-0 cursor-pointer"
              >
                <span>Request Staffing Proposal</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Category Pills Bar */}
      <div className="sticky top-[73px] z-30 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center gap-2 overflow-x-auto scrollbar-none">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1 shrink-0 mr-1">
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Filter:</span>
          </span>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all shrink-0 cursor-pointer ${
                selectedCategory.toLowerCase() === cat.toLowerCase()
                  ? 'bg-[#002255] text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-12">
        {/* Featured Post Hero Banner (Only when not searching or filtering by specific category) */}
        {!searchQuery && selectedCategory === 'All' && featuredPost && (
          <div className="group bg-white rounded-3xl border border-slate-200/80 shadow-md hover:shadow-xl transition-all overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-0">
            <div className="lg:col-span-7 relative h-64 sm:h-80 lg:h-full min-h-[300px] overflow-hidden bg-slate-900">
              <img
                src={featuredPost.coverImageUrl}
                alt={featuredPost.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent lg:hidden" />
              <div className="absolute top-4 left-4">
                <span className="px-3 py-1 rounded-full bg-[#FFD000] text-slate-950 text-xs font-black uppercase tracking-wider shadow">
                  Featured Insight
                </span>
              </div>
            </div>

            <div className="lg:col-span-5 p-6 sm:p-8 lg:p-10 flex flex-col justify-between space-y-6">
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-xs text-slate-500">
                  <span className="font-bold text-[#002255] bg-blue-50 px-2.5 py-0.5 rounded-md border border-blue-100">
                    {featuredPost.category}
                  </span>
                  <div className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{featuredPost.readTimeMinutes} min read</span>
                  </div>
                </div>

                <h2
                  onClick={() => onNavigate('blog', featuredPost.slug)}
                  className="text-xl sm:text-2xl font-black font-heading text-slate-900 group-hover:text-[#002255] transition-colors cursor-pointer leading-tight"
                >
                  {featuredPost.title}
                </h2>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-3">
                  {featuredPost.excerpt}
                </p>

                <div className="flex flex-wrap gap-1.5 pt-1">
                  {featuredPost.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="text-[11px] px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 font-medium"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-blue-100 text-[#002255] flex items-center justify-center font-bold text-xs">
                    <User className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900">{featuredPost.author.name}</div>
                    <div className="text-[10px] text-slate-500">{featuredPost.publishedDate}</div>
                  </div>
                </div>

                <button
                  onClick={() => onNavigate('blog', featuredPost.slug)}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#002255] hover:bg-[#001738] text-white text-xs font-bold transition-all shadow-xs cursor-pointer"
                >
                  <span>Read Article</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Regular Articles Grid */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg sm:text-xl font-bold font-heading text-slate-900 flex items-center gap-2">
              <span>{selectedCategory === 'All' ? 'Latest Publications' : `${selectedCategory} Articles`}</span>
              <span className="text-xs font-normal text-slate-500">({filteredBlogs.length} articles)</span>
            </h3>
          </div>

          {filteredBlogs.length === 0 ? (
            <div className="p-12 text-center bg-white rounded-3xl border border-slate-200 space-y-4">
              <BookOpen className="w-12 h-12 text-slate-300 mx-auto" />
              <div className="text-base font-bold text-slate-700">No articles found</div>
              <p className="text-xs text-slate-500 max-w-md mx-auto">
                No matching publications found for "{searchQuery}". Try searching with different keywords or reset your filter.
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('All');
                }}
                className="px-4 py-2 bg-[#002255] text-white text-xs font-bold rounded-xl"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {regularPosts.map((post) => (
                <article
                  key={post.id}
                  className="group bg-white rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden hover:-translate-y-1"
                >
                  {/* Card Image */}
                  <div
                    onClick={() => onNavigate('blog', post.slug)}
                    className="relative h-48 sm:h-52 overflow-hidden bg-slate-900 cursor-pointer"
                  >
                    <img
                      src={post.coverImageUrl}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-md text-[#002255] text-[11px] font-extrabold shadow-xs">
                        {post.category}
                      </span>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-2.5">
                      <div className="flex items-center gap-3 text-[11px] text-slate-400">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          <span>{post.publishedDate}</span>
                        </div>
                        <span>&bull;</span>
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          <span>{post.readTimeMinutes} min read</span>
                        </div>
                      </div>

                      <h4
                        onClick={() => onNavigate('blog', post.slug)}
                        className="text-base font-bold font-heading text-slate-900 group-hover:text-[#002255] transition-colors cursor-pointer line-clamp-2 leading-snug"
                      >
                        {post.title}
                      </h4>

                      <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                        {post.excerpt}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-blue-50 text-[#002255] flex items-center justify-center font-bold text-[10px]">
                          <User className="w-3 h-3" />
                        </div>
                        <span className="text-xs font-semibold text-slate-700 truncate max-w-[120px]">
                          {post.author.name}
                        </span>
                      </div>

                      <button
                        onClick={() => onNavigate('blog', post.slug)}
                        className="text-xs font-bold text-[#002255] group-hover:text-blue-700 flex items-center gap-1 cursor-pointer"
                      >
                        <span>Read</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>

        {/* Bottom Staffing CTA Box */}
        <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-[#002255] to-[#1E40AF] text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl text-center md:text-left">
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#FFD000]">
              Custom Workforce Solutions
            </span>
            <h3 className="text-2xl font-black font-heading">
              Need Reliable Staffing for Your Facility?
            </h3>
            <p className="text-xs sm:text-sm text-blue-100">
              Get in touch with our European recruitment specialists to discuss headcount requirements, SLA frameworks, and 48-72h deployment timelines.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
            <button
              onClick={onRequestQuote}
              className="w-full sm:w-auto px-6 py-3 bg-[#FFD000] hover:bg-[#ffe043] text-slate-950 font-extrabold rounded-2xl text-xs sm:text-sm transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
            >
              <Briefcase className="w-4 h-4" />
              <span>Request Talent Quote</span>
            </button>
            <button
              onClick={() => onNavigate('contact')}
              className="w-full sm:w-auto px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-bold rounded-2xl text-xs sm:text-sm border border-white/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Contact Headquarters</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
