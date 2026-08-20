import React, { useState, useRef, useEffect } from 'react';
import {
  Sliders,
  Settings,
  Image as ImageIcon,
  Shield,
  KeyRound,
  Lock,
  Phone,
  Mail,
  MapPin,
  Globe,
  Share2,
  Bell,
  Search,
  Upload,
  RotateCcw,
  Check,
  Download,
  FileJson,
  CheckCircle2,
  AlertCircle,
  Eye,
  EyeOff,
  LogOut,
  Users,
  Building2,
  Briefcase,
  FileText,
  Save,
  Trash2,
  ExternalLink,
  MessageSquare,
  Sparkles,
  Layout,
  ArrowRight,
  RefreshCw,
} from 'lucide-react';
import { useSiteSettings, SiteSettings } from '../context/SiteSettingsContext';
import { useImages, ImageItem } from '../context/ImageContext';
import { PageId } from '../types';
import { HeaderConfigTab } from '../components/admin/HeaderConfigTab';
import { FooterConfigTab } from '../components/admin/FooterConfigTab';
import { HomePageConfigTab } from '../components/admin/HomePageConfigTab';
import { BlogManagerTab } from '../components/admin/BlogManagerTab';
import { Logo } from '../components/Logo';

type AdminTab =
  | 'overview'
  | 'settings'
  | 'homepage'
  | 'header'
  | 'footer'
  | 'blogs'
  | 'contact'
  | 'locations'
  | 'images'
  | 'inquiries'
  | 'security';

export const AdminPage: React.FC<{ onNavigate?: (page: PageId) => void }> = ({ onNavigate }) => {
  const {
    settings,
    updateSettings,
    resetSettings,
    exportSettingsJson,
    importSettingsJson,
    isAdminAuthenticated,
    adminUser,
    login,
    logout,
    changePassword,
    updateAdminProfile,
    inquiries,
    updateInquiryStatus,
    deleteInquiry,
    clearInquiries,
  } = useSiteSettings();

  const {
    images,
    updateImage,
    resetImage,
    resetAllImages,
    exportConfigJson: exportImagesJson,
    importConfigJson: importImagesJson,
  } = useImages();

  // Login form state if unauthenticated
  const [loginUser, setLoginUser] = useState('');
  const [loginPass, setLoginPass] = useState('');
  const [loginError, setLoginError] = useState<string | null>(null);
  const [showLoginPass, setShowLoginPass] = useState(false);

  // Admin Workspace State
  const [activeTab, setActiveTab] = useState<AdminTab>('overview');
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [localSettings, setLocalSettings] = useState<SiteSettings>(settings);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  // Security state
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showOldPass, setShowOldPass] = useState(false);
  const [showNewPass, setShowNewPass] = useState(false);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [passwordSuccess, setPasswordSuccess] = useState<string | null>(null);

  // Profile state
  const [profileUsername, setProfileUsername] = useState(adminUser.username);
  const [profileName, setProfileName] = useState(adminUser.name);
  const [profileEmail, setProfileEmail] = useState(adminUser.email);

  // Image CMS state
  const [imageCategory, setImageCategory] = useState('All Images');
  const [imageSearch, setImageSearch] = useState('');
  const [previewModalImage, setPreviewModalImage] = useState<ImageItem | null>(null);
  const imageFileInputRefs = useRef<{ [key: string]: HTMLInputElement | null }>({});

  const logoInputRef = useRef<HTMLInputElement | null>(null);
  const faviconInputRef = useRef<HTMLInputElement | null>(null);

  // JSON Drawer
  const [showJsonDrawer, setShowJsonDrawer] = useState(false);
  const [jsonInput, setJsonInput] = useState('');

  useEffect(() => {
    setLocalSettings(settings);
    setHasUnsavedChanges(false);
  }, [settings]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const handleSettingChange = <K extends keyof SiteSettings>(
    key: K,
    value: SiteSettings[K]
  ) => {
    setLocalSettings((prev) => {
      const next = { ...prev, [key]: value };
      updateSettings(next);
      return next;
    });
    setHasUnsavedChanges(false);
    showToast(`Saved setting: ${String(key)}`);
  };

  const handleNestedSettingChange = (
    section: 'addressHQ' | 'addressNetherlands' | 'socialLinks' | 'announcementBanner' | 'seo',
    field: string,
    value: any
  ) => {
    setLocalSettings((prev: any) => {
      const next = {
        ...prev,
        [section]: {
          ...prev[section],
          [field]: value,
        },
      };
      updateSettings(next);
      return next;
    });
    setHasUnsavedChanges(false);
    showToast(`Saved: ${section}.${field}`);
  };

  const handleSaveAllSettings = () => {
    updateSettings(localSettings);
    setHasUnsavedChanges(false);

    fetch('/api/save-all', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        settings: localSettings,
        images,
      }),
    })
      .then(() => {
        showToast('All website settings & images permanently saved to server!');
      })
      .catch(() => {
        showToast('Saved locally and applied live!');
      });
  };

  const handleLogoUpload = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      if (typeof e.target?.result === 'string') {
        handleSettingChange('logoUrl', e.target.result);
        showToast('Company logo updated and applied live!');
      }
    };
    reader.readAsDataURL(file);
  };

  const handleFaviconUpload = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      if (typeof e.target?.result === 'string') {
        handleSettingChange('faviconUrl', e.target.result);
        showToast('Favicon updated! Check browser tab.');
      }
    };
    reader.readAsDataURL(file);
  };

  const handleCustomImageUpload = (key: string, file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      if (typeof e.target?.result === 'string') {
        updateImage(key, e.target.result);
        showToast(`Image "${images[key]?.title || key}" updated successfully!`);
      }
    };
    reader.readAsDataURL(file);
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError(null);
    setPasswordSuccess(null);

    if (newPassword.length < 6) {
      setPasswordError('New password must be at least 6 characters.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordError('New password and confirmation do not match.');
      return;
    }

    const res = changePassword(oldPassword, newPassword);
    if (res.success) {
      setPasswordSuccess('Password successfully updated!');
      setOldPassword('');
      setNewPassword('');
      setConfirmPassword('');
      showToast('Admin password changed successfully.');
    } else {
      setPasswordError(res.error || 'Failed to change password');
    }
  };

  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const res = updateAdminProfile({
      username: profileUsername,
      name: profileName,
      email: profileEmail,
    });
    if (res.success) {
      showToast('Admin profile details updated!');
    }
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(null);
    const res = login(loginUser.trim(), loginPass);
    if (res.success) {
      setLoginUser('');
      setLoginPass('');
      showToast(`Welcome back, ${adminUser.name}!`);
    } else {
      setLoginError(res.error || 'Invalid credentials');
    }
  };

  const imageList: ImageItem[] = (Object.values(images) || []) as ImageItem[];
  const categories: string[] = ['All Images', ...Array.from(new Set(imageList.map((img: ImageItem) => img.category)))];

  const filteredImages = imageList.filter((item: ImageItem) => {
    const matchesCat = imageCategory === 'All Images' || item.category === imageCategory;
    const matchesSearch =
      imageSearch === '' ||
      item.title.toLowerCase().includes(imageSearch.toLowerCase()) ||
      item.description.toLowerCase().includes(imageSearch.toLowerCase()) ||
      item.key.toLowerCase().includes(imageSearch.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const modifiedImageCount = imageList.filter((img: ImageItem) => img.currentUrl !== img.defaultUrl).length;

  // Unauthenticated Login View
  if (!isAdminAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-900 flex flex-col justify-center items-center px-4 py-12 text-slate-100">
        <div className="w-full max-w-md bg-slate-800/90 rounded-3xl p-8 border border-slate-700 shadow-2xl space-y-6">
          <div className="text-center space-y-2">
            <div className="w-14 h-14 rounded-2xl bg-blue-600/20 text-[#FFD000] border border-blue-500/30 flex items-center justify-center mx-auto shadow-inner">
              <Lock className="w-7 h-7 text-[#FFD000]" />
            </div>
            <h2 className="text-2xl font-black text-white font-heading tracking-tight">
              Admin Portal
            </h2>
            <p className="text-xs text-slate-400">
              Sign in to customize headers, footers, homepage sections, blogs & branding for{' '}
              <span className="text-[#FFD000] font-bold">{settings.siteName}</span>.
            </p>
          </div>

          {loginError && (
            <div className="p-3 bg-rose-950/80 border border-rose-600/60 rounded-xl text-rose-200 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
              <span>{loginError}</span>
            </div>
          )}

          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-300">Username</label>
              <input
                type="text"
                value={loginUser}
                onChange={(e) => setLoginUser(e.target.value)}
                placeholder="Enter admin username"
                className="w-full px-3.5 py-2.5 bg-slate-900/90 border border-slate-700 rounded-xl text-xs font-semibold text-white focus:outline-none focus:border-[#FFD000]"
                required
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-300">Password</label>
              <div className="relative">
                <input
                  type={showLoginPass ? 'text' : 'password'}
                  value={loginPass}
                  onChange={(e) => setLoginPass(e.target.value)}
                  placeholder="Enter admin password"
                  className="w-full px-3.5 py-2.5 bg-slate-900/90 border border-slate-700 rounded-xl text-xs font-semibold text-white focus:outline-none focus:border-[#FFD000] pr-10"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowLoginPass(!showLoginPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200 cursor-pointer"
                >
                  {showLoginPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-[#FFD000] hover:bg-[#ffe043] text-slate-950 font-black rounded-xl text-xs transition-all shadow-lg hover:scale-[1.01] cursor-pointer flex items-center justify-center gap-2"
            >
              <Lock className="w-4 h-4 text-slate-950" />
              <span>Sign In to Admin Workspace</span>
            </button>
          </form>

          <div className="pt-2 text-center">
            {onNavigate ? (
              <button
                type="button"
                onClick={() => onNavigate('home')}
                className="text-xs text-slate-400 hover:text-white inline-flex items-center justify-center gap-1 cursor-pointer"
              >
                <span>← Back to Public Website</span>
              </button>
            ) : (
              <a
                href="/"
                className="text-xs text-slate-400 hover:text-white inline-flex items-center justify-center gap-1"
              >
                <span>← Back to Public Website</span>
              </a>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Full Screen Admin Dashboard Workspace
  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans selection:bg-[#002255] selection:text-white">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-950 text-white px-5 py-3 rounded-2xl shadow-2xl border border-amber-400/40 flex items-center gap-3 animate-in slide-in-from-bottom-3 duration-200 text-xs font-semibold">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* TOP ADMIN HEADER BAR */}
      <header className="bg-[#002255] text-white px-4 sm:px-6 lg:px-8 py-3.5 border-b border-blue-900 flex flex-wrap items-center justify-between gap-4 sticky top-0 z-30 shadow-md">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center text-[#FFD000]">
            <Sliders className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base font-black tracking-tight font-heading">
                {settings.siteName} CMS & Admin Control Center
              </h1>
              <span className="text-[10px] bg-emerald-500/20 text-emerald-300 font-bold px-2 py-0.5 rounded-full border border-emerald-400/30 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Live Sync
              </span>
            </div>
            <p className="text-[11px] text-blue-200">
              Changes persist instantly across reloads and sync to open website tabs.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="px-3.5 py-2 bg-blue-800 hover:bg-blue-700 text-white font-bold rounded-xl text-xs flex items-center gap-1.5 transition-all shadow-xs"
            title="Open Live Public Website in a new tab"
          >
            <Globe className="w-3.5 h-3.5 text-[#FFD000]" />
            <span>View Website</span>
            <ExternalLink className="w-3 h-3 text-blue-300" />
          </a>

          <button
            onClick={() => setShowJsonDrawer(true)}
            className="px-3 py-2 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl text-xs border border-white/20 flex items-center gap-1.5 transition-all cursor-pointer"
            title="Export or Import Full Site JSON"
          >
            <FileJson className="w-3.5 h-3.5 text-amber-300" />
            <span>Backup / JSON</span>
          </button>

          <button
            onClick={logout}
            className="px-3 py-2 bg-rose-600/80 hover:bg-rose-600 text-white font-bold rounded-xl text-xs flex items-center gap-1.5 transition-all cursor-pointer"
            title="Sign out of Admin Dashboard"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Logout</span>
          </button>
        </div>
      </header>

      {/* TAB NAVIGATION STRIP */}
      <div className="bg-white px-4 sm:px-8 pt-3 border-b border-slate-200 overflow-x-auto flex items-center gap-1 scrollbar-none sticky top-[61px] z-20 shadow-xs">
        <button
          onClick={() => setActiveTab('overview')}
          className={`px-4 py-2.5 rounded-t-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
            activeTab === 'overview'
              ? 'bg-slate-100 text-[#002255] border-t-2 border-[#002255] shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
          }`}
        >
          <Settings className="w-3.5 h-3.5 text-blue-700" />
          <span>Dashboard Overview</span>
        </button>

        <button
          onClick={() => setActiveTab('homepage')}
          className={`px-4 py-2.5 rounded-t-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
            activeTab === 'homepage'
              ? 'bg-slate-100 text-[#002255] border-t-2 border-[#002255] shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
          }`}
        >
          <Sliders className="w-3.5 h-3.5 text-blue-700" />
          <span>Home Page Sections</span>
        </button>

        <button
          onClick={() => setActiveTab('header')}
          className={`px-4 py-2.5 rounded-t-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
            activeTab === 'header'
              ? 'bg-slate-100 text-[#002255] border-t-2 border-[#002255] shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
          }`}
        >
          <Layout className="w-3.5 h-3.5 text-blue-700" />
          <span>Header Customizer</span>
        </button>

        <button
          onClick={() => setActiveTab('footer')}
          className={`px-4 py-2.5 rounded-t-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
            activeTab === 'footer'
              ? 'bg-slate-100 text-[#002255] border-t-2 border-[#002255] shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
          }`}
        >
          <Layout className="w-3.5 h-3.5 text-indigo-600" />
          <span>Footer Customizer</span>
        </button>

        <button
          onClick={() => setActiveTab('blogs')}
          className={`px-4 py-2.5 rounded-t-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
            activeTab === 'blogs'
              ? 'bg-slate-100 text-[#002255] border-t-2 border-[#002255] shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
          }`}
        >
          <FileText className="w-3.5 h-3.5 text-amber-600" />
          <span>Blog Articles CMS</span>
        </button>

        <button
          onClick={() => setActiveTab('settings')}
          className={`px-4 py-2.5 rounded-t-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
            activeTab === 'settings'
              ? 'bg-slate-100 text-[#002255] border-t-2 border-[#002255] shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
          }`}
        >
          <Globe className="w-3.5 h-3.5 text-blue-700" />
          <span>Branding & Logo</span>
        </button>

        <button
          onClick={() => setActiveTab('contact')}
          className={`px-4 py-2.5 rounded-t-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
            activeTab === 'contact'
              ? 'bg-slate-100 text-[#002255] border-t-2 border-[#002255] shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
          }`}
        >
          <Phone className="w-3.5 h-3.5 text-emerald-600" />
          <span>Contact & WhatsApp</span>
        </button>

        <button
          onClick={() => setActiveTab('locations')}
          className={`px-4 py-2.5 rounded-t-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
            activeTab === 'locations'
              ? 'bg-slate-100 text-[#002255] border-t-2 border-[#002255] shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
          }`}
        >
          <Building2 className="w-3.5 h-3.5 text-indigo-600" />
          <span>Addresses & Legal</span>
        </button>

        <button
          onClick={() => setActiveTab('images')}
          className={`px-4 py-2.5 rounded-t-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
            activeTab === 'images'
              ? 'bg-slate-100 text-[#002255] border-t-2 border-[#002255] shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
          }`}
        >
          <ImageIcon className="w-3.5 h-3.5 text-amber-600" />
          <span>Image CMS</span>
          {modifiedImageCount > 0 && (
            <span className="px-1.5 py-0.2 bg-amber-500 text-slate-950 font-black rounded-full text-[10px]">
              {modifiedImageCount}
            </span>
          )}
        </button>

        <button
          onClick={() => setActiveTab('inquiries')}
          className={`px-4 py-2.5 rounded-t-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
            activeTab === 'inquiries'
              ? 'bg-slate-100 text-[#002255] border-t-2 border-[#002255] shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
          }`}
        >
          <MessageSquare className="w-3.5 h-3.5 text-purple-600" />
          <span>Inquiries</span>
          <span className="px-1.5 py-0.2 bg-purple-100 text-purple-800 font-bold rounded-full text-[10px]">
            {inquiries.length}
          </span>
        </button>

        <button
          onClick={() => setActiveTab('security')}
          className={`px-4 py-2.5 rounded-t-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
            activeTab === 'security'
              ? 'bg-slate-100 text-[#002255] border-t-2 border-[#002255] shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
          }`}
        >
          <KeyRound className="w-3.5 h-3.5 text-rose-600" />
          <span>Password & Security</span>
        </button>
      </div>

      {/* MAIN TAB CONTENT AREA */}
      <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full">
        {/* TAB 1: OVERVIEW */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <div className="p-6 rounded-3xl bg-gradient-to-r from-[#002255] to-[#1E40AF] text-white shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#FFD000] bg-white/10 px-2 py-0.5 rounded">
                    Admin Control Hub
                  </span>
                  <span className="text-xs text-blue-200">Last login: {adminUser.lastLogin || 'Today'}</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-black font-heading">
                  Welcome back, {adminUser.name}!
                </h2>
                <p className="text-xs sm:text-sm text-blue-100 max-w-2xl leading-relaxed">
                  You have full administrative privileges to customize branding, hide or modify sections, adjust header & footer modules, edit blogs, and manage all site images.
                </p>
              </div>

              <div className="flex items-center gap-2 self-stretch md:self-auto">
                <button
                  onClick={() => setActiveTab('homepage')}
                  className="flex-1 md:flex-none px-4 py-2.5 bg-[#FFD000] hover:bg-[#ffe043] text-slate-950 font-bold rounded-xl text-xs transition-colors shadow flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Sliders className="w-4 h-4" />
                  <span>Customize Sections</span>
                </button>
              </div>
            </div>

            {/* Quick Stat Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-500 uppercase">Website Name</span>
                  <Globe className="w-4 h-4 text-blue-600" />
                </div>
                <div className="text-lg font-black text-slate-900 truncate font-heading">{settings.siteName}</div>
                <p className="text-[11px] text-slate-500 truncate">{settings.tagline}</p>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-500 uppercase">Direct Phone</span>
                  <Phone className="w-4 h-4 text-emerald-600" />
                </div>
                <div className="text-lg font-black text-slate-900 truncate font-heading">{settings.phoneMain}</div>
                <p className="text-[11px] text-emerald-600 truncate">WhatsApp: {settings.whatsappNumber}</p>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-500 uppercase">Headquarters</span>
                  <MapPin className="w-4 h-4 text-indigo-600" />
                </div>
                <div className="text-lg font-black text-slate-900 truncate font-heading">{settings.addressHQ.city}, {settings.addressHQ.country}</div>
                <p className="text-[11px] text-slate-500 truncate">NIF: {settings.taxNif}</p>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-500 uppercase">Inquiries</span>
                  <MessageSquare className="w-4 h-4 text-purple-600" />
                </div>
                <div className="text-lg font-black text-slate-900 truncate font-heading">{inquiries.length} Requests</div>
                <p className="text-[11px] text-purple-600 font-semibold truncate">
                  {inquiries.filter((i) => i.status === 'new').length} New / Unread
                </p>
              </div>
            </div>

            {/* Quick Navigation Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div
                onClick={() => setActiveTab('homepage')}
                className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-blue-500 hover:shadow-md transition-all cursor-pointer group"
              >
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center font-bold mb-3 group-hover:scale-110 transition-transform">
                  <Sliders className="w-5 h-5" />
                </div>
                <h4 className="text-sm font-bold text-slate-900 group-hover:text-blue-700">
                  Home Page Sections & Text
                </h4>
                <p className="text-xs text-slate-500 mt-1">
                  Show or hide sections, customize hero slides, metrics, services, and FAQ items.
                </p>
              </div>

              <div
                onClick={() => setActiveTab('header')}
                className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-blue-500 hover:shadow-md transition-all cursor-pointer group"
              >
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center font-bold mb-3 group-hover:scale-110 transition-transform">
                  <Layout className="w-5 h-5" />
                </div>
                <h4 className="text-sm font-bold text-slate-900 group-hover:text-blue-700">
                  Header & Navigation Bar
                </h4>
                <p className="text-xs text-slate-500 mt-1">
                  Configure top contact bar, announcement ticker, menu items, and CTA button labels.
                </p>
              </div>

              <div
                onClick={() => setActiveTab('footer')}
                className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-indigo-500 hover:shadow-md transition-all cursor-pointer group"
              >
                <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-700 flex items-center justify-center font-bold mb-3 group-hover:scale-110 transition-transform">
                  <Layout className="w-5 h-5 text-indigo-600" />
                </div>
                <h4 className="text-sm font-bold text-slate-900 group-hover:text-indigo-700">
                  Footer & Copyright Bar
                </h4>
                <p className="text-xs text-slate-500 mt-1">
                  Customize copyright text, footer columns, quick links, and callback form widget.
                </p>
              </div>

              <div
                onClick={() => setActiveTab('blogs')}
                className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-amber-500 hover:shadow-md transition-all cursor-pointer group"
              >
                <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center font-bold mb-3 group-hover:scale-110 transition-transform">
                  <FileText className="w-5 h-5" />
                </div>
                <h4 className="text-sm font-bold text-slate-900 group-hover:text-amber-700">
                  Blog Articles CMS
                </h4>
                <p className="text-xs text-slate-500 mt-1">
                  Publish, edit, and organize industry articles, compliance guides, and staffing news.
                </p>
              </div>

              <div
                onClick={() => setActiveTab('images')}
                className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-amber-500 hover:shadow-md transition-all cursor-pointer group"
              >
                <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center font-bold mb-3 group-hover:scale-110 transition-transform">
                  <ImageIcon className="w-5 h-5" />
                </div>
                <h4 className="text-sm font-bold text-slate-900 group-hover:text-amber-700">
                  Complete Image Manager
                </h4>
                <p className="text-xs text-slate-500 mt-1">
                  Replace Hero slides, warehouse photos, worker housing images, and avatars with 1 click.
                </p>
              </div>

              <div
                onClick={() => setActiveTab('security')}
                className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-rose-500 hover:shadow-md transition-all cursor-pointer group"
              >
                <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-700 flex items-center justify-center font-bold mb-3 group-hover:scale-110 transition-transform">
                  <KeyRound className="w-5 h-5" />
                </div>
                <h4 className="text-sm font-bold text-slate-900 group-hover:text-rose-700">
                  Admin Password & Security
                </h4>
                <p className="text-xs text-slate-500 mt-1">
                  Change the admin login password and customize administrator name & email.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: HOME PAGE CUSTOMIZER */}
        {activeTab === 'homepage' && (
          <HomePageConfigTab onShowToast={showToast} />
        )}

        {/* TAB 3: HEADER CUSTOMIZER */}
        {activeTab === 'header' && (
          <HeaderConfigTab onShowToast={showToast} />
        )}

        {/* TAB 4: FOOTER CUSTOMIZER */}
        {activeTab === 'footer' && (
          <FooterConfigTab onShowToast={showToast} />
        )}

        {/* TAB 5: BLOG CMS */}
        {activeTab === 'blogs' && (
          <BlogManagerTab onShowToast={showToast} />
        )}

        {/* TAB 6: BRANDING & LOGO */}
        {activeTab === 'settings' && (
          <div className="space-y-8">
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-6">
              <div className="border-b border-slate-100 pb-4">
                <h3 className="text-lg font-bold text-slate-900 font-heading">
                  Website Name & Brand Identity
                </h3>
                <p className="text-xs text-slate-500">
                  Configure company branding displayed across headers, footers, meta tags, and hero banners.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Website Full Name</label>
                  <input
                    type="text"
                    value={localSettings.siteName}
                    onChange={(e) => handleSettingChange('siteName', e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm font-semibold text-slate-900 focus:bg-white focus:outline-none focus:border-[#002255]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Short Name / Prefix</label>
                  <input
                    type="text"
                    value={localSettings.siteShortName}
                    onChange={(e) => handleSettingChange('siteShortName', e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm font-semibold text-slate-900 focus:bg-white focus:outline-none focus:border-[#002255]"
                  />
                </div>

                <div className="md:col-span-2 space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Company Tagline</label>
                  <input
                    type="text"
                    value={localSettings.tagline}
                    onChange={(e) => handleSettingChange('tagline', e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm font-semibold text-slate-900 focus:bg-white focus:outline-none focus:border-[#002255]"
                  />
                </div>

                <div className="md:col-span-2 space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Short Company Description</label>
                  <textarea
                    rows={3}
                    value={localSettings.shortDesc}
                    onChange={(e) => handleSettingChange('shortDesc', e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm font-semibold text-slate-900 focus:bg-white focus:outline-none focus:border-[#002255]"
                  />
                </div>
              </div>
            </div>

            {/* Logo & Favicon Upload */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-6">
              <div className="border-b border-slate-100 pb-4">
                <h3 className="text-lg font-bold text-slate-900 font-heading">
                  Custom Logo & Browser Favicon
                </h3>
                <p className="text-xs text-slate-500">
                  Upload an image logo or favicon. Changes apply live to all navigation bars.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Logo Uploader */}
                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-900">Custom Website Logo</span>
                    {localSettings.logoUrl && (
                      <button
                        onClick={() => handleSettingChange('logoUrl', '')}
                        className="text-[11px] text-rose-600 hover:underline font-bold flex items-center gap-1 cursor-pointer"
                      >
                        <Trash2 className="w-3 h-3" />
                        <span>Reset to Vector Logo</span>
                      </button>
                    )}
                  </div>

                  <div className="p-4 bg-white rounded-xl border border-slate-200 flex items-center justify-center min-h-[90px]">
                    {localSettings.logoUrl ? (
                      <img
                        src={localSettings.logoUrl}
                        alt="Company Logo"
                        className="max-h-14 max-w-full object-contain"
                        referrerPolicy="no-referrer"
                      />
                    ) : (
                      <div className="text-center space-y-1">
                        <Logo size="md" />
                        <p className="text-[10px] text-slate-400">Default Built-in Vector Logo</p>
                      </div>
                    )}
                  </div>

                  <div className="flex gap-2">
                    <input
                      type="file"
                      ref={logoInputRef}
                      onChange={(e) => e.target.files?.[0] && handleLogoUpload(e.target.files[0])}
                      accept="image/*"
                      className="hidden"
                    />
                    <button
                      onClick={() => logoInputRef.current?.click()}
                      className="flex-1 py-2.5 bg-[#002255] hover:bg-[#001a4d] text-white font-bold rounded-xl text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                    >
                      <Upload className="w-4 h-4" />
                      <span>Upload Custom Logo</span>
                    </button>
                  </div>
                </div>

                {/* Favicon Uploader */}
                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-900">Browser Favicon</span>
                    {localSettings.faviconUrl && (
                      <button
                        onClick={() => handleSettingChange('faviconUrl', '')}
                        className="text-[11px] text-rose-600 hover:underline font-bold flex items-center gap-1 cursor-pointer"
                      >
                        <Trash2 className="w-3 h-3" />
                        <span>Reset Favicon</span>
                      </button>
                    )}
                  </div>

                  <div className="p-4 bg-white rounded-xl border border-slate-200 flex items-center justify-center min-h-[90px] gap-3">
                    <div className="w-10 h-10 rounded-lg border border-slate-300 flex items-center justify-center bg-slate-50">
                      {localSettings.faviconUrl ? (
                        <img
                          src={localSettings.faviconUrl}
                          alt="Favicon Preview"
                          className="w-6 h-6 object-contain"
                          referrerPolicy="no-referrer"
                        />
                      ) : (
                        <Shield className="w-6 h-6 text-[#002255]" />
                      )}
                    </div>
                    <div className="text-left text-xs">
                      <p className="font-bold text-slate-800">Browser Tab Icon</p>
                      <p className="text-[10px] text-slate-500">Recommended: 32x32px PNG/ICO</p>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <input
                      type="file"
                      ref={faviconInputRef}
                      onChange={(e) => e.target.files?.[0] && handleFaviconUpload(e.target.files[0])}
                      accept="image/*"
                      className="hidden"
                    />
                    <button
                      onClick={() => faviconInputRef.current?.click()}
                      className="flex-1 py-2.5 bg-slate-800 hover:bg-slate-900 text-white font-bold rounded-xl text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                    >
                      <Upload className="w-4 h-4" />
                      <span>Upload Custom Favicon</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 7: CONTACT & WHATSAPP */}
        {activeTab === 'contact' && (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-6">
              <div className="border-b border-slate-100 pb-4">
                <h3 className="text-lg font-bold text-slate-900 font-heading">
                  Phone Numbers & WhatsApp Configuration
                </h3>
                <p className="text-xs text-slate-500">
                  Update live phone numbers, emergency lines, and WhatsApp floating widget prefilled message.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Main Headquarters Phone</label>
                  <input
                    type="text"
                    value={localSettings.phoneMain}
                    onChange={(e) => handleSettingChange('phoneMain', e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm font-semibold text-slate-900 focus:bg-white focus:outline-none focus:border-[#002255]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">24/7 Emergency Line</label>
                  <input
                    type="text"
                    value={localSettings.phoneEmergency}
                    onChange={(e) => handleSettingChange('phoneEmergency', e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm font-semibold text-slate-900 focus:bg-white focus:outline-none focus:border-[#002255]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Official WhatsApp Number (International format)</label>
                  <input
                    type="text"
                    value={localSettings.whatsappNumber}
                    onChange={(e) => handleSettingChange('whatsappNumber', e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm font-semibold text-slate-900 focus:bg-white focus:outline-none focus:border-[#002255]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">General Inquiries Email</label>
                  <input
                    type="email"
                    value={localSettings.emailGeneral}
                    onChange={(e) => handleSettingChange('emailGeneral', e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm font-semibold text-slate-900 focus:bg-white focus:outline-none focus:border-[#002255]"
                  />
                </div>

                <div className="md:col-span-2 space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">WhatsApp Default Greeting / Prefill Message</label>
                  <textarea
                    rows={2}
                    value={localSettings.whatsappPrefill}
                    onChange={(e) => handleSettingChange('whatsappPrefill', e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm font-semibold text-slate-900 focus:bg-white focus:outline-none focus:border-[#002255]"
                  />
                </div>
              </div>
            </div>

            {/* Social Media Links */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-6">
              <div className="border-b border-slate-100 pb-4">
                <h3 className="text-lg font-bold text-slate-900 font-heading">
                  Social Media Links
                </h3>
                <p className="text-xs text-slate-500">
                  Update links to your official social channels displayed in the footer.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.keys(localSettings.socialLinks).map((network) => (
                  <div key={network} className="space-y-1">
                    <label className="text-xs font-bold text-slate-700 capitalize">{network} URL</label>
                    <input
                      type="url"
                      value={(localSettings.socialLinks as any)[network] || ''}
                      onChange={(e) => handleNestedSettingChange('socialLinks', network, e.target.value)}
                      placeholder={`https://${network}.com/bluegatework`}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-800"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 8: LOCATIONS & ADDRESSES */}
        {activeTab === 'locations' && (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-6">
              <div className="border-b border-slate-100 pb-4">
                <h3 className="text-lg font-bold text-slate-900 font-heading">
                  Portugal Headquarters
                </h3>
                <p className="text-xs text-slate-500">
                  Primary corporate location in Portugal.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2 space-y-1">
                  <label className="text-xs font-bold text-slate-700">Street & Number</label>
                  <input
                    type="text"
                    value={localSettings.addressHQ.street}
                    onChange={(e) => handleNestedSettingChange('addressHQ', 'street', e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold text-slate-900"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">City</label>
                  <input
                    type="text"
                    value={localSettings.addressHQ.city}
                    onChange={(e) => handleNestedSettingChange('addressHQ', 'city', e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold text-slate-900"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Postal Code</label>
                  <input
                    type="text"
                    value={localSettings.addressHQ.postalCode}
                    onChange={(e) => handleNestedSettingChange('addressHQ', 'postalCode', e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold text-slate-900"
                  />
                </div>
              </div>
            </div>

            {/* Legal Licenses */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-6">
              <div className="border-b border-slate-100 pb-4">
                <h3 className="text-lg font-bold text-slate-900 font-heading">
                  Legal Licenses & Tax Registration
                </h3>
                <p className="text-xs text-slate-500">
                  Government registration credentials and statutory compliance numbers.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Tax Identification (NIF)</label>
                  <input
                    type="text"
                    value={localSettings.taxNif}
                    onChange={(e) => handleSettingChange('taxNif', e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold text-slate-900"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">ACT ETT License Number</label>
                  <input
                    type="text"
                    value={localSettings.actLicense}
                    onChange={(e) => handleSettingChange('actLicense', e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold text-slate-900"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Netherlands NEN / SNA</label>
                  <input
                    type="text"
                    value={localSettings.nenCertificate}
                    onChange={(e) => handleSettingChange('nenCertificate', e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold text-slate-900"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 9: IMAGE CMS */}
        {activeTab === 'images' && (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
                <div>
                  <h3 className="text-lg font-bold text-slate-900 font-heading">
                    Image Manager & Visual Media CMS
                  </h3>
                  <p className="text-xs text-slate-500">
                    Upload custom photos or choose preset alternatives for every section of the website.
                  </p>
                </div>
                <button
                  onClick={resetAllImages}
                  className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs flex items-center gap-1.5 transition-colors cursor-pointer self-start sm:self-auto"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset All Images to Default</span>
                </button>
              </div>

              {/* Filter Strip */}
              <div className="flex flex-wrap items-center gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setImageCategory(cat)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      imageCategory === cat
                        ? 'bg-[#002255] text-white shadow-xs'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Images Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredImages.map((item) => {
                const isModified = item.currentUrl !== item.defaultUrl;
                return (
                  <div
                    key={item.key}
                    className={`p-5 rounded-2xl bg-white border transition-all flex flex-col justify-between gap-4 shadow-xs ${
                      isModified ? 'border-amber-400 ring-1 ring-amber-300' : 'border-slate-200'
                    }`}
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 bg-slate-100 px-2 py-0.5 rounded">
                          {item.category}
                        </span>
                        {isModified && (
                          <span className="text-[10px] font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded-full">
                            Custom Image
                          </span>
                        )}
                      </div>

                      <h4 className="text-sm font-bold text-slate-900 line-clamp-1">{item.title}</h4>
                      <p className="text-xs text-slate-500 line-clamp-2">{item.description}</p>

                      {/* Image Thumbnail */}
                      <div className="relative aspect-video rounded-xl overflow-hidden bg-slate-950/5 border border-slate-200 group">
                        <img
                          src={item.currentUrl}
                          alt={item.altText}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                    </div>

                    <div className="space-y-2 pt-2 border-t border-slate-100">
                      <div className="flex gap-2">
                        <input
                          type="file"
                          ref={(el) => (imageFileInputRefs.current[item.key] = el)}
                          onChange={(e) => e.target.files?.[0] && handleCustomImageUpload(item.key, e.target.files[0])}
                          accept="image/*"
                          className="hidden"
                        />
                        <button
                          onClick={() => imageFileInputRefs.current[item.key]?.click()}
                          className="flex-1 py-2 bg-slate-100 hover:bg-[#002255] hover:text-white text-slate-800 font-bold rounded-xl text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                        >
                          <Upload className="w-3.5 h-3.5" />
                          <span>Upload File</span>
                        </button>
                        {isModified && (
                          <button
                            onClick={() => resetImage(item.key)}
                            className="p-2 bg-slate-100 hover:bg-rose-100 text-slate-600 hover:text-rose-700 rounded-xl transition-colors cursor-pointer"
                            title="Reset to default image"
                          >
                            <RotateCcw className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 10: INQUIRIES */}
        {activeTab === 'inquiries' && (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="text-lg font-bold text-slate-900 font-heading">
                  Customer Quotes & Inquiries ({inquiries.length})
                </h3>
                <p className="text-xs text-slate-500">
                  Lead submissions from Request Quote modal and Contact form.
                </p>
              </div>
              {inquiries.length > 0 && (
                <button
                  onClick={clearInquiries}
                  className="px-3 py-2 bg-rose-50 text-rose-700 hover:bg-rose-100 font-bold rounded-xl text-xs transition-colors cursor-pointer self-start sm:self-auto"
                >
                  Clear All Inquiries
                </button>
              )}
            </div>

            <div className="space-y-3">
              {inquiries.length === 0 ? (
                <div className="p-12 text-center bg-white rounded-3xl border border-slate-200 space-y-2">
                  <MessageSquare className="w-8 h-8 text-slate-400 mx-auto" />
                  <h4 className="text-sm font-bold text-slate-800">No Inquiries Logged Yet</h4>
                  <p className="text-xs text-slate-500">
                    When clients submit quote requests, they will appear here.
                  </p>
                </div>
              ) : (
                inquiries.map((inq) => (
                  <div
                    key={inq.id}
                    className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-900 text-sm">{inq.name}</span>
                        <span className="text-[10px] uppercase font-extrabold px-2 py-0.5 rounded bg-blue-50 text-blue-800">
                          {inq.type}
                        </span>
                        <span className="text-xs text-slate-400">• {inq.date}</span>
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed max-w-3xl">{inq.details}</p>
                      <div className="flex items-center gap-4 text-xs text-slate-500 pt-1">
                        <span className="font-semibold">{inq.email}</span>
                        <span>•</span>
                        <span className="font-semibold">{inq.phone}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <select
                        value={inq.status}
                        onChange={(e) => updateInquiryStatus(inq.id, e.target.value as any)}
                        className="px-3 py-1.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-bold text-slate-800"
                      >
                        <option value="new">New</option>
                        <option value="in_review">In Review</option>
                        <option value="contacted">Contacted</option>
                        <option value="resolved">Resolved</option>
                      </select>
                      <button
                        onClick={() => deleteInquiry(inq.id)}
                        className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* TAB 11: SECURITY & PASSWORD */}
        {activeTab === 'security' && (
          <div className="space-y-6 max-w-2xl mx-auto">
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-6">
              <div className="border-b border-slate-100 pb-4">
                <h3 className="text-lg font-bold text-slate-900 font-heading">
                  Change Admin Password
                </h3>
                <p className="text-xs text-slate-500">
                  Update the password used to access the administrator panel.
                </p>
              </div>

              {passwordError && (
                <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{passwordError}</span>
                </div>
              )}

              {passwordSuccess && (
                <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs rounded-xl flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>{passwordSuccess}</span>
                </div>
              )}

              <form onSubmit={handlePasswordSubmit} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Current Password</label>
                  <div className="relative">
                    <input
                      type={showOldPass ? 'text' : 'password'}
                      value={oldPassword}
                      onChange={(e) => setOldPassword(e.target.value)}
                      placeholder="Enter current password"
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold text-slate-900 pr-10"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowOldPass(!showOldPass)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    >
                      {showOldPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">New Password (min. 6 characters)</label>
                  <div className="relative">
                    <input
                      type={showNewPass ? 'text' : 'password'}
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="Enter new strong password"
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold text-slate-900 pr-10"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewPass(!showNewPass)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    >
                      {showNewPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Confirm New Password</label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Repeat new password"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold text-slate-900"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-[#002255] hover:bg-[#001a4d] text-white font-bold rounded-xl text-xs transition-colors shadow-xs cursor-pointer flex items-center justify-center gap-2"
                >
                  <KeyRound className="w-4 h-4 text-[#FFD000]" />
                  <span>Update Admin Password</span>
                </button>
              </form>
            </div>
          </div>
        )}
      </main>

      {/* JSON Backup Drawer */}
      {showJsonDrawer && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-2xl bg-white rounded-3xl p-6 border border-slate-200 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <FileJson className="w-5 h-5 text-blue-700" />
                <h3 className="text-base font-bold text-slate-900">Backup & Restore Configuration JSON</h3>
              </div>
              <button
                onClick={() => setShowJsonDrawer(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-slate-500">
              Export all website customizations into a JSON string, or paste an exported JSON to restore settings.
            </p>

            <textarea
              rows={10}
              value={jsonInput || exportSettingsJson()}
              onChange={(e) => setJsonInput(e.target.value)}
              className="w-full p-3 font-mono text-[11px] bg-slate-900 text-emerald-400 rounded-xl border border-slate-700 focus:outline-none"
            />

            <div className="flex items-center justify-between gap-3 pt-2">
              <button
                onClick={() => {
                  navigator.clipboard.writeText(exportSettingsJson());
                  showToast('JSON copied to clipboard!');
                }}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs"
              >
                Copy JSON
              </button>

              <div className="flex gap-2">
                <button
                  onClick={() => {
                    if (jsonInput) {
                      const success = importSettingsJson(jsonInput);
                      if (success) {
                        showToast('Settings successfully imported!');
                        setShowJsonDrawer(false);
                      } else {
                        showToast('Failed to import JSON: invalid syntax.');
                      }
                    }
                  }}
                  className="px-4 py-2 bg-[#002255] hover:bg-[#001a4d] text-white font-bold rounded-xl text-xs"
                >
                  Import & Apply JSON
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
