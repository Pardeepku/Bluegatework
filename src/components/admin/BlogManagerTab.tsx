import React, { useState } from 'react';
import {
  BookOpen,
  Plus,
  Edit2,
  Trash2,
  Eye,
  EyeOff,
  Sparkles,
  Calendar,
  Clock,
  User,
  Tag,
  CheckCircle2,
  Search,
  RotateCcw,
  ExternalLink
} from 'lucide-react';
import { useSiteSettings } from '../../context/SiteSettingsContext';
import { BlogPost } from '../../types';

interface BlogManagerTabProps {
  onShowToast: (msg: string) => void;
}

export const BlogManagerTab: React.FC<BlogManagerTabProps> = ({ onShowToast }) => {
  const { blogs, addBlogPost, updateBlogPost, deleteBlogPost, resetBlogs } = useSiteSettings();
  const [search, setSearch] = useState('');
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  // Form State
  const [formTitle, setFormTitle] = useState('');
  const [formSlug, setFormSlug] = useState('');
  const [formCategory, setFormCategory] = useState('Compliance & Legal');
  const [formExcerpt, setFormExcerpt] = useState('');
  const [formContent, setFormContent] = useState('');
  const [formCoverImage, setFormCoverImage] = useState('');
  const [formAuthorName, setFormAuthorName] = useState('Ana Santos');
  const [formAuthorRole, setFormAuthorRole] = useState('Head of European Labor Compliance');
  const [formReadTime, setFormReadTime] = useState('5 min read');
  const [formTags, setFormTags] = useState('ETT, Compliance, Cross-Border');
  const [formIsFeatured, setFormIsFeatured] = useState(false);
  const [formIsPublished, setFormIsPublished] = useState(true);

  const CATEGORIES = [
    'Compliance & Legal',
    'Cross-Border Staffing',
    'Industry Spotlights',
    'Workforce Operations',
    'Global Relocation',
  ];

  const handleOpenCreate = () => {
    setEditingPost(null);
    setFormTitle('');
    setFormSlug('');
    setFormCategory('Compliance & Legal');
    setFormExcerpt('');
    setFormContent('');
    setFormCoverImage('https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1200&q=80');
    setFormAuthorName('Ana Santos');
    setFormAuthorRole('Head of European Labor Compliance');
    setFormReadTime('5 min read');
    setFormTags('Staffing, Europe, Recruitment');
    setFormIsFeatured(false);
    setFormIsPublished(true);
    setIsCreating(true);
  };

  const handleOpenEdit = (post: BlogPost) => {
    setEditingPost(post);
    setFormTitle(post.title);
    setFormSlug(post.slug);
    setFormCategory(post.category);
    setFormExcerpt(post.excerpt);
    setFormContent(post.content);
    setFormCoverImage(post.coverImage);
    setFormAuthorName(post.author.name);
    setFormAuthorRole(post.author.role);
    setFormReadTime(post.readTime);
    setFormTags(post.tags.join(', '));
    setFormIsFeatured(post.isFeatured || false);
    setFormIsPublished(post.isPublished !== false);
    setIsCreating(true);
  };

  const handleTitleChange = (val: string) => {
    setFormTitle(val);
    if (!editingPost) {
      const generatedSlug = val
        .toLowerCase()
        .replace(/[^\w ]+/g, '')
        .replace(/ +/g, '-');
      setFormSlug(generatedSlug);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle.trim() || !formContent.trim()) {
      onShowToast('Title and content are required');
      return;
    }

    const tagsArray = formTags.split(',').map((t) => t.trim()).filter(Boolean);

    if (editingPost) {
      updateBlogPost(editingPost.id, {
        title: formTitle,
        slug: formSlug || formTitle.toLowerCase().replace(/[^\w ]+/g, '').replace(/ +/g, '-'),
        category: formCategory,
        excerpt: formExcerpt,
        content: formContent,
        coverImage: formCoverImage,
        author: {
          name: formAuthorName,
          role: formAuthorRole,
          avatar: editingPost.author.avatar || 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
        },
        readTime: formReadTime,
        tags: tagsArray,
        isFeatured: formIsFeatured,
        isPublished: formIsPublished,
      });
      onShowToast(`Updated article: "${formTitle}"`);
    } else {
      addBlogPost({
        title: formTitle,
        slug: formSlug || formTitle.toLowerCase().replace(/[^\w ]+/g, '').replace(/ +/g, '-'),
        category: formCategory,
        excerpt: formExcerpt,
        content: formContent,
        coverImage: formCoverImage || 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1200&q=80',
        author: {
          name: formAuthorName,
          role: formAuthorRole,
          avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
        },
        readTime: formReadTime,
        publishedDate: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        tags: tagsArray,
        isFeatured: formIsFeatured,
        isPublished: formIsPublished,
      });
      onShowToast(`Published new article: "${formTitle}"`);
    }

    setIsCreating(false);
    setEditingPost(null);
  };

  const handleDelete = (id: string, title: string) => {
    if (window.confirm(`Are you sure you want to delete "${title}"?`)) {
      deleteBlogPost(id);
      onShowToast(`Deleted article: "${title}"`);
    }
  };

  const handleTogglePublish = (post: BlogPost) => {
    const nextState = !(post.isPublished !== false);
    updateBlogPost(post.id, { isPublished: nextState });
    onShowToast(`Article is now ${nextState ? 'Published' : 'Draft'}`);
  };

  const filteredBlogs = blogs.filter((b) =>
    b.title.toLowerCase().includes(search.toLowerCase()) ||
    b.category.toLowerCase().includes(search.toLowerCase()) ||
    b.excerpt.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Top Banner */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-indigo-50 text-indigo-700 flex items-center justify-center font-bold">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900 font-heading">
              Blog & Workforce Insights CMS
            </h3>
            <p className="text-xs text-slate-500">
              Create, edit, publish, and manage European staffing insights and compliance articles.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={resetBlogs}
            className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
            title="Reset to default mock articles"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Defaults</span>
          </button>
          <button
            onClick={handleOpenCreate}
            className="px-4 py-2 bg-[#002366] hover:bg-[#001738] text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow transition-colors cursor-pointer"
          >
            <Plus className="w-4 h-4 text-[#FFD000]" />
            <span>Write New Article</span>
          </button>
        </div>
      </div>

      {/* CREATE / EDIT FORM MODAL */}
      {isCreating && (
        <div className="bg-white p-6 rounded-3xl border-2 border-indigo-200 shadow-lg space-y-6 animate-in fade-in">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-indigo-600" />
              <h4 className="text-base font-bold text-slate-900 font-heading">
                {editingPost ? 'Edit Blog Article' : 'Compose New Article'}
              </h4>
            </div>
            <button
              onClick={() => {
                setIsCreating(false);
                setEditingPost(null);
              }}
              className="text-xs text-slate-500 hover:text-slate-900 font-bold"
            >
              Cancel
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1 sm:col-span-2">
                <label className="text-xs font-bold text-slate-700">Article Title *</label>
                <input
                  type="text"
                  required
                  value={formTitle}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  placeholder="e.g. European Cross-Border Labor Trends for 2025"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm text-slate-900 focus:bg-white focus:outline-none focus:border-indigo-600"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">URL Slug</label>
                <input
                  type="text"
                  value={formSlug}
                  onChange={(e) => setFormSlug(e.target.value)}
                  placeholder="european-cross-border-labor-trends-2025"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Category</label>
                <select
                  value={formCategory}
                  onChange={(e) => setFormCategory(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900"
                >
                  {CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1 sm:col-span-2">
                <label className="text-xs font-bold text-slate-700">Cover Image URL</label>
                <input
                  type="url"
                  value={formCoverImage}
                  onChange={(e) => setFormCoverImage(e.target.value)}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900"
                />
              </div>

              <div className="space-y-1 sm:col-span-2">
                <label className="text-xs font-bold text-slate-700">Short Excerpt / Summary</label>
                <textarea
                  rows={2}
                  value={formExcerpt}
                  onChange={(e) => setFormExcerpt(e.target.value)}
                  placeholder="A concise synopsis displayed on the blog list card..."
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900"
                />
              </div>

              <div className="space-y-1 sm:col-span-2">
                <label className="text-xs font-bold text-slate-700">Full Article Content (Markdown or HTML supported) *</label>
                <textarea
                  rows={8}
                  required
                  value={formContent}
                  onChange={(e) => setFormContent(e.target.value)}
                  placeholder="Write the full article body here..."
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm font-mono text-slate-900 focus:bg-white focus:outline-none focus:border-indigo-600"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Author Name</label>
                <input
                  type="text"
                  value={formAuthorName}
                  onChange={(e) => setFormAuthorName(e.target.value)}
                  placeholder="Ana Santos"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Author Role</label>
                <input
                  type="text"
                  value={formAuthorRole}
                  onChange={(e) => setFormAuthorRole(e.target.value)}
                  placeholder="Head of European Labor Compliance"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Read Time</label>
                <input
                  type="text"
                  value={formReadTime}
                  onChange={(e) => setFormReadTime(e.target.value)}
                  placeholder="5 min read"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Tags (comma separated)</label>
                <input
                  type="text"
                  value={formTags}
                  onChange={(e) => setFormTags(e.target.value)}
                  placeholder="ETT, Labor, Europe, Staffing"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900"
                />
              </div>

              <div className="sm:col-span-2 flex items-center gap-6 pt-2">
                <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-slate-800">
                  <input
                    type="checkbox"
                    checked={formIsFeatured}
                    onChange={(e) => setFormIsFeatured(e.target.checked)}
                    className="rounded text-indigo-600"
                  />
                  <span>Mark as Featured Post (Hero highlight)</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-slate-800">
                  <input
                    type="checkbox"
                    checked={formIsPublished}
                    onChange={(e) => setFormIsPublished(e.target.checked)}
                    className="rounded text-indigo-600"
                  />
                  <span>Published (Visible to visitors)</span>
                </label>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
              <button
                type="button"
                onClick={() => {
                  setIsCreating(false);
                  setEditingPost(null);
                }}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl text-xs shadow cursor-pointer flex items-center gap-1.5"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>{editingPost ? 'Save Article Changes' : 'Publish Article'}</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* SEARCH AND LIST OF ARTICLES */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search published articles..."
              className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:bg-white focus:outline-none"
            />
          </div>
          <span className="text-xs text-slate-500 font-semibold">
            Showing {filteredBlogs.length} of {blogs.length} articles
          </span>
        </div>

        <div className="divide-y divide-slate-100">
          {filteredBlogs.map((post) => (
            <div
              key={post.id}
              className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50/70 px-2 rounded-xl transition-colors"
            >
              <div className="flex items-start gap-4">
                <img
                  src={post.coverImage}
                  alt={post.title}
                  className="w-16 h-16 rounded-xl object-cover shrink-0 border border-slate-200"
                />
                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-blue-100 text-blue-800">
                      {post.category}
                    </span>
                    {post.isFeatured && (
                      <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-amber-100 text-amber-800 flex items-center gap-1">
                        <Sparkles className="w-2.5 h-2.5" />
                        Featured
                      </span>
                    )}
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                        post.isPublished !== false
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-slate-200 text-slate-600'
                      }`}
                    >
                      {post.isPublished !== false ? 'Published' : 'Draft'}
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-slate-900 leading-snug">
                    {post.title}
                  </h4>
                  <div className="flex items-center gap-3 text-[11px] text-slate-500">
                    <span className="flex items-center gap-1">
                      <User className="w-3 h-3 text-slate-400" />
                      {post.author.name}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-slate-400" />
                      {post.publishedDate}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-slate-400" />
                      {post.readTime}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                <button
                  onClick={() => handleTogglePublish(post)}
                  className={`p-2 rounded-xl border text-xs font-semibold flex items-center gap-1 cursor-pointer ${
                    post.isPublished !== false
                      ? 'bg-emerald-50 border-emerald-200 text-emerald-700 hover:bg-emerald-100'
                      : 'bg-slate-100 border-slate-200 text-slate-600 hover:bg-slate-200'
                  }`}
                  title="Toggle publication status"
                >
                  {post.isPublished !== false ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                </button>
                <button
                  onClick={() => handleOpenEdit(post)}
                  className="p-2 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 transition-colors cursor-pointer"
                  title="Edit article"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(post.id, post.title)}
                  className="p-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 transition-colors cursor-pointer"
                  title="Delete article"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
