import React, { useState, useRef } from 'react';
import {
  X,
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
} from 'lucide-react';
import { useSiteSettings, SiteSettings } from '../context/SiteSettingsContext';
import { useImages, ImageItem } from '../context/ImageContext';
import { PageId } from '../types';

import { HeaderConfigTab } from './admin/HeaderConfigTab';
import { FooterConfigTab } from './admin/FooterConfigTab';
import { HomePageConfigTab } from './admin/HomePageConfigTab';
import { BlogManagerTab } from './admin/BlogManagerTab';

interface AdminPanelModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type AdminTab =
  | 'overview'
  | 'settings'
  | 'header'
  | 'footer'
  | 'homepage'
  | 'blogs'
  | 'contact'
  | 'locations'
  | 'images'
  | 'inquiries'
  | 'security';

export const AdminPanelModal: React.FC<AdminPanelModalProps> = ({ isOpen, onClose }) => {
  const {
    settings,
    updateSettings,
    resetSettings,
    exportSettingsJson,
    importSettingsJson,
    adminUser,
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

  const [activeTab, setActiveTab] = useState<AdminTab>('overview');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Form states for settings
  const [localSettings, setLocalSettings] = useState<SiteSettings>(settings);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  // Password change states
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showOldPass, setShowOldPass] = useState(false);
  const [showNewPass, setShowNewPass] = useState(false);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [passwordSuccess, setPasswordSuccess] = useState<string | null>(null);

  // Admin Profile states
  const [profileUsername, setProfileUsername] = useState(adminUser.username);
  const [profileName, setProfileName] = useState(adminUser.name);
  const [profileEmail, setProfileEmail] = useState(adminUser.email);

  // Image CMS states
  const [imageCategory, setImageCategory] = useState('All Images');
  const [imageSearch, setImageSearch] = useState('');
  const [previewModalImage, setPreviewModalImage] = useState<ImageItem | null>(null);
  const imageFileInputRefs = useRef<{ [key: string]: HTMLInputElement | null }>({});

  // File upload refs for Logo and Favicon
  const logoInputRef = useRef<HTMLInputElement | null>(null);
  const faviconInputRef = useRef<HTMLInputElement | null>(null);

  // JSON Drawer
  const [showJsonDrawer, setShowJsonDrawer] = useState(false);
  const [jsonInput, setJsonInput] = useState('');

  // Keep localSettings in sync if external settings change
  React.useEffect(() => {
    setLocalSettings(settings);
    setHasUnsavedChanges(false);
  }, [settings, isOpen]);

  if (!isOpen) return null;

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
    setLocalSettings((prev) => ({ ...prev, [key]: value }));
    setHasUnsavedChanges(true);
  };

  const handleNestedSettingChange = (
    section: 'addressHQ' | 'addressNetherlands' | 'socialLinks' | 'announcementBanner' | 'seo',
    field: string,
    value: any
  ) => {
    setLocalSettings((prev: any) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
    setHasUnsavedChanges(true);
  };

  const handleSaveAllSettings = () => {
    updateSettings(localSettings);
    setHasUnsavedChanges(false);
    showToast('All website settings successfully saved and applied!');
  };

  const handleLogoUpload = (file: File) => {
    if (!file.type.startsWith('image/')) {
      showToast('Please select a valid image file');
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result && typeof e.target.result === 'string') {
        handleSettingChange('logoUrl', e.target.result);
        showToast('Logo uploaded! Click "Save Changes" to apply.');
      }
    };
    reader.readAsDataURL(file);
  };

  const handleFaviconUpload = (file: File) => {
    if (!file.type.startsWith('image/')) {
      showToast('Please select a valid image/icon file');
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result && typeof e.target.result === 'string') {
        handleSettingChange('faviconUrl', e.target.result);
        showToast('Favicon uploaded! Click "Save Changes" to apply.');
      }
    };
    reader.readAsDataURL(file);
  };

  const handleChangePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError(null);
    setPasswordSuccess(null);

    if (newPassword !== confirmPassword) {
      setPasswordError('New password and confirmation do not match.');
      return;
    }

    if (newPassword.length < 4) {
      setPasswordError('New password must be at least 4 characters long.');
      return;
    }

    const res = changePassword(oldPassword, newPassword);
    if (res.success) {
      setPasswordSuccess('Password successfully updated! Use your new password for next login.');
      setOldPassword('');
      setNewPassword('');
      setConfirmPassword('');
      showToast('Admin password updated successfully');
    } else {
      setPasswordError(res.error || 'Failed to update password.');
    }
  };

  const handleUpdateProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateAdminProfile({
      username: profileUsername,
      name: profileName,
      email: profileEmail,
    });
    showToast('Admin profile details updated');
  };

  const handleExportFullConfig = () => {
    const fullConfig = {
      siteSettings: settings,
      imageConfig: JSON.parse(exportImagesJson()),
      exportedAt: new Date().toISOString(),
    };
    const blob = new Blob([JSON.stringify(fullConfig, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `bluegate-work-full-backup-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('Complete backup exported as JSON');
  };

  const handleImportJson = () => {
    if (!jsonInput.trim()) return;
    try {
      const parsed = JSON.parse(jsonInput);
      if (parsed.siteSettings) {
        updateSettings(parsed.siteSettings);
        setLocalSettings(parsed.siteSettings);
      }
      if (parsed.imageConfig) {
        importImagesJson(JSON.stringify(parsed.imageConfig));
      } else {
        // Try importing direct settings or images
        importSettingsJson(jsonInput);
        importImagesJson(jsonInput);
      }
      showToast('Configuration successfully restored!');
      setShowJsonDrawer(false);
      setJsonInput('');
    } catch (e) {
      showToast('Invalid JSON structure provided.');
    }
  };

  // Image CMS Filtering
  const imageList: ImageItem[] = Object.keys(images).map((k) => images[k]);
  const IMAGE_CATEGORIES = [
    'All Images',
    'Hero Slider',
    'Services',
    'Industries',
    'About & Company',
    'Worker Housing & Care',
    'Locations & Corridors',
    'Testimonials & Avatars',
  ];

  const filteredImages = imageList.filter((item: ImageItem) => {
    const matchesCategory =
      imageCategory === 'All Images' || item.category === imageCategory;
    const matchesSearch =
      item.title.toLowerCase().includes(imageSearch.toLowerCase()) ||
      item.description.toLowerCase().includes(imageSearch.toLowerCase()) ||
      item.key.toLowerCase().includes(imageSearch.toLowerCase()) ||
      item.category.toLowerCase().includes(imageSearch.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const modifiedImageCount = imageList.filter(
    (img: ImageItem) => img.currentUrl !== img.defaultUrl
  ).length;

  const handleImageFileUpload = (key: string, file: File) => {
    if (!file.type.startsWith('image/')) {
      showToast('Please select a valid image file');
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result && typeof e.target.result === 'string') {
        updateImage(key, e.target.result);
        showToast(`Updated image for "${images[key]?.title}"`);
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div
      id="admin-master-panel-modal"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-2 sm:p-4 md:p-6 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="admin-master-title"
    >
      <div className="relative w-full max-w-7xl max-h-[95vh] bg-white rounded-3xl shadow-2xl flex flex-col overflow-hidden border border-slate-200">
        {/* HEADER BAR */}
        <div className="bg-[#002255] text-white p-4 sm:p-5 border-b border-blue-900/60 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-[#FFD000] text-slate-950 flex items-center justify-center font-bold shadow-lg shrink-0">
              <Sliders className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h2 id="admin-master-title" className="text-xl sm:text-2xl font-black font-heading tracking-tight">
                  {settings.siteName} Master Admin Panel
                </h2>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[11px] font-bold flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  Authenticated: {adminUser.username} ({adminUser.role})
                </span>
              </div>
              <p className="text-xs text-blue-200/90 mt-0.5">
                Centralized CMS for website branding, logos, contact info, social channels, images, security & inquiries.
              </p>
            </div>
          </div>

          {/* Header Action Buttons */}
          <div className="flex items-center gap-2 flex-wrap">
            {hasUnsavedChanges && (
              <button
                id="header-save-changes-btn"
                onClick={handleSaveAllSettings}
                className="px-3.5 py-2 bg-[#FFD000] hover:bg-[#ffe043] text-slate-950 rounded-xl text-xs font-black flex items-center gap-1.5 shadow-md transition-all animate-bounce cursor-pointer"
              >
                <Save className="w-4 h-4" />
                <span>Save Changes</span>
              </button>
            )}

            <button
              id="admin-export-backup-btn"
              onClick={handleExportFullConfig}
              className="px-3 py-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl text-xs font-semibold text-white flex items-center gap-1.5 transition-colors cursor-pointer"
              title="Download complete settings & images backup JSON"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Backup JSON</span>
            </button>

            <button
              id="admin-import-toggle-btn"
              onClick={() => setShowJsonDrawer(!showJsonDrawer)}
              className="px-3 py-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl text-xs font-semibold text-white flex items-center gap-1.5 transition-colors cursor-pointer"
              title="Import JSON backup"
            >
              <FileJson className="w-3.5 h-3.5" />
              <span>Import JSON</span>
            </button>

            <button
              id="admin-logout-header-btn"
              onClick={() => {
                logout();
                onClose();
              }}
              className="px-3 py-2 bg-rose-500/20 hover:bg-rose-500/30 border border-rose-400/40 rounded-xl text-xs font-semibold text-rose-200 flex items-center gap-1.5 transition-colors cursor-pointer"
              title="Log out of admin session"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Logout</span>
            </button>

            <button
              id="admin-master-close-btn"
              onClick={onClose}
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
              aria-label="Close Admin Panel"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* TOAST MESSAGE */}
        {toastMessage && (
          <div className="bg-emerald-600 text-white px-5 py-2.5 text-xs sm:text-sm font-bold flex items-center justify-between animate-in fade-in shadow-md">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" />
              <span>{toastMessage}</span>
            </div>
            <button onClick={() => setToastMessage(null)} className="text-white/80 hover:text-white">
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* JSON RESTORE DRAWER */}
        {showJsonDrawer && (
          <div className="p-4 bg-slate-900 text-white border-b border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-[#FFD000]">
                Paste Full Settings & Image Backup JSON
              </span>
              <button
                onClick={() => setShowJsonDrawer(false)}
                className="text-slate-400 hover:text-white text-xs"
              >
                Cancel
              </button>
            </div>
            <textarea
              id="admin-backup-json-textarea"
              rows={3}
              value={jsonInput}
              onChange={(e) => setJsonInput(e.target.value)}
              placeholder="Paste JSON configuration export here..."
              className="w-full font-mono text-xs p-2.5 bg-slate-950 border border-slate-700 rounded-xl text-slate-100 focus:outline-none focus:border-[#FFD000]"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={handleImportJson}
                className="px-4 py-1.5 bg-[#FFD000] text-slate-950 font-bold text-xs rounded-lg hover:bg-[#ffe043] transition-colors cursor-pointer"
              >
                Restore Configuration
              </button>
            </div>
          </div>
        )}

        {/* TAB NAVIGATION STRIP */}
        <div className="bg-slate-100 px-4 pt-2 border-b border-slate-200 overflow-x-auto flex items-center gap-1 scrollbar-none">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-2.5 rounded-t-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'overview'
                ? 'bg-white text-[#002255] border-t-2 border-[#002255] shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
            }`}
          >
            <Settings className="w-3.5 h-3.5 text-blue-700" />
            <span>Dashboard Overview</span>
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            className={`px-4 py-2.5 rounded-t-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'settings'
                ? 'bg-white text-[#002255] border-t-2 border-[#002255] shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
            }`}
          >
            <Globe className="w-3.5 h-3.5 text-blue-700" />
            <span>Branding & Logo</span>
          </button>

          <button
            onClick={() => setActiveTab('homepage')}
            className={`px-4 py-2.5 rounded-t-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'homepage'
                ? 'bg-white text-[#002255] border-t-2 border-[#002255] shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
            }`}
          >
            <Sliders className="w-3.5 h-3.5 text-blue-700" />
            <span>Home Page Sections</span>
          </button>

          <button
            onClick={() => setActiveTab('header')}
            className={`px-4 py-2.5 rounded-t-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'header'
                ? 'bg-white text-[#002255] border-t-2 border-[#002255] shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
            }`}
          >
            <Layout className="w-3.5 h-3.5 text-blue-700" />
            <span>Header Customizer</span>
          </button>

          <button
            onClick={() => setActiveTab('footer')}
            className={`px-4 py-2.5 rounded-t-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'footer'
                ? 'bg-white text-[#002255] border-t-2 border-[#002255] shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
            }`}
          >
            <Layout className="w-3.5 h-3.5 text-indigo-600" />
            <span>Footer Customizer</span>
          </button>

          <button
            onClick={() => setActiveTab('blogs')}
            className={`px-4 py-2.5 rounded-t-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'blogs'
                ? 'bg-white text-[#002255] border-t-2 border-[#002255] shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
            }`}
          >
            <FileText className="w-3.5 h-3.5 text-amber-600" />
            <span>Blog Articles CMS</span>
          </button>

          <button
            onClick={() => setActiveTab('contact')}
            className={`px-4 py-2.5 rounded-t-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'contact'
                ? 'bg-white text-[#002255] border-t-2 border-[#002255] shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
            }`}
          >
            <Phone className="w-3.5 h-3.5 text-emerald-600" />
            <span>Contact, Phone & WhatsApp</span>
          </button>

          <button
            onClick={() => setActiveTab('locations')}
            className={`px-4 py-2.5 rounded-t-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'locations'
                ? 'bg-white text-[#002255] border-t-2 border-[#002255] shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
            }`}
          >
            <Building2 className="w-3.5 h-3.5 text-indigo-600" />
            <span>Addresses & Legal</span>
          </button>

          <button
            onClick={() => setActiveTab('images')}
            className={`px-4 py-2.5 rounded-t-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'images'
                ? 'bg-white text-[#002255] border-t-2 border-[#002255] shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
            }`}
          >
            <ImageIcon className="w-3.5 h-3.5 text-amber-600" />
            <span>Image Manager CMS</span>
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
                ? 'bg-white text-[#002255] border-t-2 border-[#002255] shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
            }`}
          >
            <MessageSquare className="w-3.5 h-3.5 text-purple-600" />
            <span>Inquiries & Quotes</span>
            <span className="px-1.5 py-0.2 bg-purple-100 text-purple-800 font-bold rounded-full text-[10px]">
              {inquiries.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('security')}
            className={`px-4 py-2.5 rounded-t-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'security'
                ? 'bg-white text-[#002255] border-t-2 border-[#002255] shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
            }`}
          >
            <KeyRound className="w-3.5 h-3.5 text-rose-600" />
            <span>Admin Password & Security</span>
          </button>
        </div>

        {/* TAB CONTENTS (SCROLLABLE BODY) */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 bg-slate-50">
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-6 max-w-6xl mx-auto">
              {/* Welcome Card */}
              <div className="p-6 rounded-3xl bg-gradient-to-r from-[#002255] to-[#1E40AF] text-white shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#FFD000] bg-white/10 px-2 py-0.5 rounded">
                      Admin Control Hub
                    </span>
                    <span className="text-xs text-blue-200">Last login: {adminUser.lastLogin || 'Today'}</span>
                  </div>
                  <h3 className="text-2xl font-black font-heading">
                    Welcome back, {adminUser.name}!
                  </h3>
                  <p className="text-xs sm:text-sm text-blue-100 max-w-2xl leading-relaxed">
                    You have full administrative privileges to customize branding, replace logos, update WhatsApp & phone numbers, edit addresses, manage images, and update your admin password.
                  </p>
                </div>

                <div className="flex items-center gap-2 self-stretch md:self-auto">
                  <button
                    onClick={() => setActiveTab('settings')}
                    className="flex-1 md:flex-none px-4 py-2.5 bg-[#FFD000] hover:bg-[#ffe043] text-slate-950 font-bold rounded-xl text-xs transition-colors shadow flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Settings className="w-4 h-4" />
                    <span>Site Settings</span>
                  </button>
                  <button
                    onClick={() => setActiveTab('security')}
                    className="flex-1 md:flex-none px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl text-xs border border-white/20 transition-colors flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <KeyRound className="w-4 h-4 text-amber-300" />
                    <span>Change Password</span>
                  </button>
                </div>
              </div>

              {/* Quick Stat Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500 uppercase">Website Name</span>
                    <Globe className="w-4 h-4 text-blue-600" />
                  </div>
                  <div className="text-lg font-black text-slate-900 truncate font-heading">{settings.siteName}</div>
                  <p className="text-[11px] text-slate-500 truncate">{settings.tagline}</p>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500 uppercase">Direct Phone & WA</span>
                    <Phone className="w-4 h-4 text-emerald-600" />
                  </div>
                  <div className="text-lg font-black text-slate-900 truncate font-heading">{settings.phoneMain}</div>
                  <p className="text-[11px] text-emerald-600 font-bold">WhatsApp: {settings.whatsappNumber}</p>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500 uppercase">Image CMS</span>
                    <ImageIcon className="w-4 h-4 text-amber-600" />
                  </div>
                  <div className="text-lg font-black text-slate-900 font-heading">
                    {modifiedImageCount} <span className="text-xs text-slate-500 font-normal">Customized</span>
                  </div>
                  <p className="text-[11px] text-slate-500">{imageList.length} total image assets</p>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500 uppercase">Inquiries & Leads</span>
                    <MessageSquare className="w-4 h-4 text-purple-600" />
                  </div>
                  <div className="text-lg font-black text-purple-900 font-heading">
                    {inquiries.length} <span className="text-xs text-purple-600 font-normal">Stored</span>
                  </div>
                  <p className="text-[11px] text-purple-600 font-semibold">
                    {inquiries.filter((i) => i.status === 'new').length} new unread requests
                  </p>
                </div>
              </div>

              {/* Quick Navigation Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div
                  onClick={() => setActiveTab('settings')}
                  className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-blue-500 hover:shadow-md transition-all cursor-pointer group"
                >
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center font-bold mb-3 group-hover:scale-110 transition-transform">
                    <Globe className="w-5 h-5" />
                  </div>
                  <h4 className="text-sm font-bold text-slate-900 group-hover:text-blue-700">
                    Branding, Logo & Favicon
                  </h4>
                  <p className="text-xs text-slate-500 mt-1">
                    Upload custom logo, replace browser favicon, update company name, and edit announcement banners.
                  </p>
                </div>

                <div
                  onClick={() => setActiveTab('contact')}
                  className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-emerald-500 hover:shadow-md transition-all cursor-pointer group"
                >
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold mb-3 group-hover:scale-110 transition-transform">
                    <Phone className="w-5 h-5" />
                  </div>
                  <h4 className="text-sm font-bold text-slate-900 group-hover:text-emerald-700">
                    Contact Channels & WhatsApp
                  </h4>
                  <p className="text-xs text-slate-500 mt-1">
                    Update headquarters phone, emergency line, official WhatsApp number, prefill message & emails.
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
                    Replace Hero slides, warehouse photos, worker housing images, and avatars with 1-click uploads.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB: HOME PAGE SECTIONS & CONTENT */}
          {activeTab === 'homepage' && (
            <HomePageConfigTab onShowToast={showToast} />
          )}

          {/* TAB: HEADER CUSTOMIZER */}
          {activeTab === 'header' && (
            <HeaderConfigTab onShowToast={showToast} />
          )}

          {/* TAB: FOOTER CUSTOMIZER */}
          {activeTab === 'footer' && (
            <FooterConfigTab onShowToast={showToast} />
          )}

          {/* TAB: BLOG ARTICLES CMS */}
          {activeTab === 'blogs' && (
            <BlogManagerTab onShowToast={showToast} />
          )}

          {/* TAB 2: BRANDING & GENERAL SETTINGS */}
          {activeTab === 'settings' && (
            <div className="space-y-8 max-w-5xl mx-auto">
              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-6">
                <div className="border-b border-slate-100 pb-4 flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 font-heading">
                      Website Name & Brand Identity
                    </h3>
                    <p className="text-xs text-slate-500">
                      Configure company branding displayed across headers, footers, meta tags, and hero banners.
                    </p>
                  </div>
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
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm text-slate-900 focus:bg-white focus:outline-none focus:border-[#002255]"
                    />
                  </div>

                  <div className="md:col-span-2 space-y-1.5">
                    <label className="text-xs font-bold text-slate-700">Short Company Bio / Description</label>
                    <textarea
                      rows={3}
                      value={localSettings.shortDesc}
                      onChange={(e) => handleSettingChange('shortDesc', e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm text-slate-900 focus:bg-white focus:outline-none focus:border-[#002255]"
                    />
                  </div>
                </div>
              </div>

              {/* Logo & Favicon Customizer */}
              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-6">
                <div className="border-b border-slate-100 pb-4">
                  <h3 className="text-lg font-bold text-slate-900 font-heading">
                    Website Logo & Browser Favicon
                  </h3>
                  <p className="text-xs text-slate-500">
                    Upload an image or specify an image URL to replace the default vector logo and browser tab favicon.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* LOGO BOX */}
                  <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-700 uppercase">Website Logo</span>
                      {localSettings.logoUrl && (
                        <button
                          type="button"
                          onClick={() => handleSettingChange('logoUrl', '')}
                          className="text-[11px] text-rose-600 hover:underline font-bold"
                        >
                          Revert to Vector Mark
                        </button>
                      )}
                    </div>

                    {/* Preview Box */}
                    <div className="h-24 rounded-xl bg-white border border-slate-200 flex items-center justify-center p-3 overflow-hidden shadow-inner">
                      {localSettings.logoUrl ? (
                        <img
                          src={localSettings.logoUrl}
                          alt="Custom Website Logo"
                          className="max-h-full max-w-full object-contain"
                        />
                      ) : (
                        <div className="text-center">
                          <span className="text-xs text-slate-400 font-bold block">
                            (Currently using default vector Bluegate mark)
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="space-y-2">
                      <input
                        type="text"
                        placeholder="https://example.com/logo.png"
                        value={localSettings.logoUrl.startsWith('data:') ? '[Local file uploaded]' : localSettings.logoUrl}
                        readOnly={localSettings.logoUrl.startsWith('data:')}
                        onChange={(e) => handleSettingChange('logoUrl', e.target.value)}
                        className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs font-mono text-slate-800"
                      />

                      <input
                        type="file"
                        accept="image/*"
                        ref={logoInputRef}
                        className="hidden"
                        onChange={(e) => {
                          if (e.target.files && e.target.files[0]) {
                            handleLogoUpload(e.target.files[0]);
                          }
                        }}
                      />

                      <button
                        type="button"
                        onClick={() => logoInputRef.current?.click()}
                        className="w-full py-2 bg-white hover:bg-slate-100 border border-slate-300 rounded-lg text-xs font-bold text-slate-700 flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                      >
                        <Upload className="w-3.5 h-3.5 text-blue-700" />
                        <span>Upload Logo File (PNG / JPG / SVG)</span>
                      </button>
                    </div>
                  </div>

                  {/* FAVICON BOX */}
                  <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-700 uppercase">Browser Favicon</span>
                      {localSettings.faviconUrl && (
                        <button
                          type="button"
                          onClick={() => handleSettingChange('faviconUrl', '')}
                          className="text-[11px] text-rose-600 hover:underline font-bold"
                        >
                          Revert to Default
                        </button>
                      )}
                    </div>

                    {/* Preview Box */}
                    <div className="h-24 rounded-xl bg-white border border-slate-200 flex items-center justify-center p-3 overflow-hidden shadow-inner">
                      {localSettings.faviconUrl ? (
                        <img
                          src={localSettings.faviconUrl}
                          alt="Custom Browser Favicon"
                          className="w-10 h-10 object-contain rounded"
                        />
                      ) : (
                        <div className="text-center">
                          <span className="text-xs text-slate-400 font-bold block">
                            (Currently using default favicon)
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="space-y-2">
                      <input
                        type="text"
                        placeholder="https://example.com/favicon.ico"
                        value={localSettings.faviconUrl.startsWith('data:') ? '[Local icon uploaded]' : localSettings.faviconUrl}
                        readOnly={localSettings.faviconUrl.startsWith('data:')}
                        onChange={(e) => handleSettingChange('faviconUrl', e.target.value)}
                        className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs font-mono text-slate-800"
                      />

                      <input
                        type="file"
                        accept="image/*,.ico"
                        ref={faviconInputRef}
                        className="hidden"
                        onChange={(e) => {
                          if (e.target.files && e.target.files[0]) {
                            handleFaviconUpload(e.target.files[0]);
                          }
                        }}
                      />

                      <button
                        type="button"
                        onClick={() => faviconInputRef.current?.click()}
                        className="w-full py-2 bg-white hover:bg-slate-100 border border-slate-300 rounded-lg text-xs font-bold text-slate-700 flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                      >
                        <Upload className="w-3.5 h-3.5 text-blue-700" />
                        <span>Upload Favicon (.ico / .png)</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Announcement Banner */}
              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-6">
                <div className="border-b border-slate-100 pb-4 flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 font-heading">
                      Top Announcement Bar
                    </h3>
                    <p className="text-xs text-slate-500">
                      Display an urgent banner at the very top of the website for seasonal campaigns, recruiting drives, or compliance notices.
                    </p>
                  </div>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <span className="text-xs font-bold text-slate-700">Enable Banner:</span>
                    <input
                      type="checkbox"
                      checked={localSettings.announcementBanner.enabled}
                      onChange={(e) =>
                        handleNestedSettingChange('announcementBanner', 'enabled', e.target.checked)
                      }
                      className="w-4 h-4 rounded text-blue-600 cursor-pointer"
                    />
                  </label>
                </div>

                {localSettings.announcementBanner.enabled && (
                  <div className="space-y-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-700">Banner Text Content</label>
                      <input
                        type="text"
                        value={localSettings.announcementBanner.text}
                        onChange={(e) =>
                          handleNestedSettingChange('announcementBanner', 'text', e.target.value)
                        }
                        className="w-full px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm text-slate-900"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-700">CTA Button Text</label>
                        <input
                          type="text"
                          value={localSettings.announcementBanner.linkText}
                          onChange={(e) =>
                            handleNestedSettingChange('announcementBanner', 'linkText', e.target.value)
                          }
                          className="w-full px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm text-slate-900"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-700">Destination Page</label>
                        <select
                          value={localSettings.announcementBanner.linkPage}
                          onChange={(e) =>
                            handleNestedSettingChange('announcementBanner', 'linkPage', e.target.value)
                          }
                          className="w-full px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm text-slate-900"
                        >
                          <option value="temporary-staffing">Temporary Staffing</option>
                          <option value="outsourcing">Outsourcing</option>
                          <option value="international-recruitment">International Recruitment</option>
                          <option value="for-employers">For Employers</option>
                          <option value="for-jobseekers">For Jobseekers</option>
                          <option value="contact">Contact Page</option>
                        </select>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* SEO Meta Tags */}
              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-6">
                <div className="border-b border-slate-100 pb-4">
                  <h3 className="text-lg font-bold text-slate-900 font-heading">
                    SEO & Meta Tags
                  </h3>
                  <p className="text-xs text-slate-500">
                    Controls browser tab title, search engine preview descriptions, and target keywords.
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700">Browser Tab & Meta Title</label>
                    <input
                      type="text"
                      value={localSettings.seo.metaTitle}
                      onChange={(e) =>
                        handleNestedSettingChange('seo', 'metaTitle', e.target.value)
                      }
                      className="w-full px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm text-slate-900"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700">Meta Description</label>
                    <textarea
                      rows={2}
                      value={localSettings.seo.metaDescription}
                      onChange={(e) =>
                        handleNestedSettingChange('seo', 'metaDescription', e.target.value)
                      }
                      className="w-full px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm text-slate-900"
                    />
                  </div>
                </div>
              </div>

              {/* Bottom Sticky Save Bar */}
              <div className="flex justify-end gap-3 pt-2">
                <button
                  onClick={handleSaveAllSettings}
                  className="px-6 py-3 bg-[#002255] hover:bg-[#001738] text-white font-extrabold text-xs uppercase tracking-wider rounded-xl shadow-lg flex items-center gap-2 cursor-pointer"
                >
                  <Save className="w-4 h-4 text-[#FFD000]" />
                  <span>Save Branding & Settings</span>
                </button>
              </div>
            </div>
          )}

          {/* TAB 3: CONTACT, PHONE & WHATSAPP */}
          {activeTab === 'contact' && (
            <div className="space-y-8 max-w-5xl mx-auto">
              {/* Phone & WhatsApp Card */}
              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-6">
                <div className="border-b border-slate-100 pb-4">
                  <h3 className="text-lg font-bold text-slate-900 font-heading flex items-center gap-2">
                    <Phone className="w-5 h-5 text-emerald-600" />
                    <span>Phone Numbers & WhatsApp Integration</span>
                  </h3>
                  <p className="text-xs text-slate-500">
                    Configure direct phone channels, 24/7 emergency dispatch line, and the floating WhatsApp widget.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700">Main Headquarters Phone</label>
                    <input
                      type="text"
                      value={localSettings.phoneMain}
                      onChange={(e) => handleSettingChange('phoneMain', e.target.value)}
                      placeholder="+351 920 132 915"
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm font-semibold text-slate-900 focus:bg-white focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700">Emergency 24/7 Dispatch Phone</label>
                    <input
                      type="text"
                      value={localSettings.phoneEmergency}
                      onChange={(e) => handleSettingChange('phoneEmergency', e.target.value)}
                      placeholder="+351 920 132 915"
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm font-semibold text-slate-900 focus:bg-white focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-emerald-700 flex items-center gap-1.5">
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>Official WhatsApp Number</span>
                    </label>
                    <input
                      type="text"
                      value={localSettings.whatsappNumber}
                      onChange={(e) => handleSettingChange('whatsappNumber', e.target.value)}
                      placeholder="+351 920 132 915"
                      className="w-full px-3.5 py-2.5 bg-emerald-50/50 border border-emerald-300 rounded-xl text-xs sm:text-sm font-bold text-emerald-950 focus:bg-white focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700">Operating Hours</label>
                    <input
                      type="text"
                      value={localSettings.operatingHours}
                      onChange={(e) => handleSettingChange('operatingHours', e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm text-slate-900"
                    />
                  </div>

                  <div className="md:col-span-2 space-y-1.5">
                    <label className="text-xs font-bold text-slate-700">
                      WhatsApp Pre-filled Customer Message
                    </label>
                    <textarea
                      rows={2}
                      value={localSettings.whatsappPrefill}
                      onChange={(e) => handleSettingChange('whatsappPrefill', e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm text-slate-900"
                    />
                  </div>
                </div>
              </div>

              {/* Email Addresses */}
              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-6">
                <div className="border-b border-slate-100 pb-4">
                  <h3 className="text-lg font-bold text-slate-900 font-heading flex items-center gap-2">
                    <Mail className="w-5 h-5 text-blue-600" />
                    <span>Email Inboxes & Departments</span>
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700">General Inquiries Email</label>
                    <input
                      type="email"
                      value={localSettings.emailGeneral}
                      onChange={(e) => handleSettingChange('emailGeneral', e.target.value)}
                      className="w-full px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm text-slate-900"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700">Recruitment & Candidates</label>
                    <input
                      type="email"
                      value={localSettings.emailRecruitment}
                      onChange={(e) => handleSettingChange('emailRecruitment', e.target.value)}
                      className="w-full px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm text-slate-900"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700">Support & Clients</label>
                    <input
                      type="email"
                      value={localSettings.emailSupport}
                      onChange={(e) => handleSettingChange('emailSupport', e.target.value)}
                      className="w-full px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm text-slate-900"
                    />
                  </div>
                </div>
              </div>

              {/* Social Media Channels */}
              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-6">
                <div className="border-b border-slate-100 pb-4">
                  <h3 className="text-lg font-bold text-slate-900 font-heading flex items-center gap-2">
                    <Share2 className="w-5 h-5 text-indigo-600" />
                    <span>Social Media Channels</span>
                  </h3>
                  <p className="text-xs text-slate-500">
                    Links appear in the header top bar, footer, and contact pages.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700">LinkedIn Profile / Company Page</label>
                    <input
                      type="text"
                      value={localSettings.socialLinks.linkedin}
                      onChange={(e) =>
                        handleNestedSettingChange('socialLinks', 'linkedin', e.target.value)
                      }
                      className="w-full px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 font-mono"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700">Facebook Page</label>
                    <input
                      type="text"
                      value={localSettings.socialLinks.facebook}
                      onChange={(e) =>
                        handleNestedSettingChange('socialLinks', 'facebook', e.target.value)
                      }
                      className="w-full px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 font-mono"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700">Instagram Profile</label>
                    <input
                      type="text"
                      value={localSettings.socialLinks.instagram}
                      onChange={(e) =>
                        handleNestedSettingChange('socialLinks', 'instagram', e.target.value)
                      }
                      className="w-full px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 font-mono"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700">YouTube Channel</label>
                    <input
                      type="text"
                      value={localSettings.socialLinks.youtube}
                      onChange={(e) =>
                        handleNestedSettingChange('socialLinks', 'youtube', e.target.value)
                      }
                      className="w-full px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 font-mono"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700">Twitter / X</label>
                    <input
                      type="text"
                      value={localSettings.socialLinks.twitter}
                      onChange={(e) =>
                        handleNestedSettingChange('socialLinks', 'twitter', e.target.value)
                      }
                      className="w-full px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 font-mono"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700">Telegram Channel</label>
                    <input
                      type="text"
                      value={localSettings.socialLinks.telegram}
                      onChange={(e) =>
                        handleNestedSettingChange('socialLinks', 'telegram', e.target.value)
                      }
                      className="w-full px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 font-mono"
                    />
                  </div>
                </div>
              </div>

              {/* Save Bar */}
              <div className="flex justify-end gap-3 pt-2">
                <button
                  onClick={handleSaveAllSettings}
                  className="px-6 py-3 bg-[#002255] hover:bg-[#001738] text-white font-extrabold text-xs uppercase tracking-wider rounded-xl shadow-lg flex items-center gap-2 cursor-pointer"
                >
                  <Save className="w-4 h-4 text-[#FFD000]" />
                  <span>Save Contact Details</span>
                </button>
              </div>
            </div>
          )}

          {/* TAB 4: LOCATIONS & LEGAL */}
          {activeTab === 'locations' && (
            <div className="space-y-8 max-w-5xl mx-auto">
              {/* Portugal HQ */}
              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-6">
                <div className="border-b border-slate-100 pb-4 flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 font-heading">
                      Portugal Headquarters
                    </h3>
                    <p className="text-xs text-slate-500">
                      Primary corporate location in Portugal.
                    </p>
                  </div>
                  <span className="text-2xl">🇵🇹</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2 space-y-1.5">
                    <label className="text-xs font-bold text-slate-700">Full Formatted Address</label>
                    <input
                      type="text"
                      value={localSettings.addressHQ.full}
                      onChange={(e) =>
                        handleNestedSettingChange('addressHQ', 'full', e.target.value)
                      }
                      className="w-full px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm text-slate-900"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700">Street & Number</label>
                    <input
                      type="text"
                      value={localSettings.addressHQ.street}
                      onChange={(e) =>
                        handleNestedSettingChange('addressHQ', 'street', e.target.value)
                      }
                      className="w-full px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700">City & Postal Code</label>
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="text"
                        value={localSettings.addressHQ.city}
                        onChange={(e) =>
                          handleNestedSettingChange('addressHQ', 'city', e.target.value)
                        }
                        placeholder="City"
                        className="w-full px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900"
                      />
                      <input
                        type="text"
                        value={localSettings.addressHQ.postalCode}
                        onChange={(e) =>
                          handleNestedSettingChange('addressHQ', 'postalCode', e.target.value)
                        }
                        placeholder="Postal Code"
                        className="w-full px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Netherlands Branch */}
              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-6">
                <div className="border-b border-slate-100 pb-4 flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 font-heading">
                      Netherlands Operations Branch
                    </h3>
                    <p className="text-xs text-slate-500">
                      Benelux dispatch & logistics hub in Amsterdam.
                    </p>
                  </div>
                  <span className="text-2xl">🇳🇱</span>
                </div>

                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700">Full Netherlands Address</label>
                    <input
                      type="text"
                      value={localSettings.addressNetherlands.full}
                      onChange={(e) =>
                        handleNestedSettingChange('addressNetherlands', 'full', e.target.value)
                      }
                      className="w-full px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm text-slate-900"
                    />
                  </div>
                </div>
              </div>

              {/* Legal & Regulatory Licenses */}
              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-6">
                <div className="border-b border-slate-100 pb-4">
                  <h3 className="text-lg font-bold text-slate-900 font-heading">
                    Tax IDs & Temporary Agency Licenses
                  </h3>
                  <p className="text-xs text-slate-500">
                    Shown in the website footer and compliance certificates.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700">Tax NIF / VAT Number</label>
                    <input
                      type="text"
                      value={localSettings.taxNif}
                      onChange={(e) => handleSettingChange('taxNif', e.target.value)}
                      className="w-full px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 font-mono"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700">Portuguese ACT License</label>
                    <input
                      type="text"
                      value={localSettings.actLicense}
                      onChange={(e) => handleSettingChange('actLicense', e.target.value)}
                      className="w-full px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 font-mono"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700">Dutch NEN 4400-1 / SNA</label>
                    <input
                      type="text"
                      value={localSettings.nenCertificate}
                      onChange={(e) => handleSettingChange('nenCertificate', e.target.value)}
                      className="w-full px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 font-mono"
                    />
                  </div>
                </div>
              </div>

              {/* Save Bar */}
              <div className="flex justify-end gap-3 pt-2">
                <button
                  onClick={handleSaveAllSettings}
                  className="px-6 py-3 bg-[#002255] hover:bg-[#001738] text-white font-extrabold text-xs uppercase tracking-wider rounded-xl shadow-lg flex items-center gap-2 cursor-pointer"
                >
                  <Save className="w-4 h-4 text-[#FFD000]" />
                  <span>Save Location & Legal Info</span>
                </button>
              </div>
            </div>
          )}

          {/* TAB 5: IMAGE CMS */}
          {activeTab === 'images' && (
            <div className="space-y-6 max-w-6xl mx-auto">
              {/* Controls Bar */}
              <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-sm flex flex-col lg:flex-row items-center justify-between gap-4">
                {/* Search */}
                <div className="relative w-full lg:w-80">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    value={imageSearch}
                    onChange={(e) => setImageSearch(e.target.value)}
                    placeholder="Search images by section, name..."
                    className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm text-slate-800 focus:outline-none focus:border-[#002255]"
                  />
                  {imageSearch && (
                    <button
                      onClick={() => setImageSearch('')}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                {/* Categories */}
                <div className="w-full lg:w-auto flex items-center gap-1.5 overflow-x-auto pb-1 lg:pb-0 scrollbar-none">
                  {IMAGE_CATEGORIES.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setImageCategory(cat)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                        imageCategory === cat
                          ? 'bg-[#002255] text-white shadow-sm'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Images Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredImages.map((item: ImageItem) => {
                  const isModified = item.currentUrl !== item.defaultUrl;
                  const isDataUrl = item.currentUrl.startsWith('data:');

                  return (
                    <div
                      key={item.key}
                      className={`bg-white rounded-2xl border transition-all shadow-sm flex flex-col ${
                        isModified ? 'border-amber-300 ring-1 ring-amber-200' : 'border-slate-200'
                      }`}
                    >
                      {/* Header */}
                      <div className="p-4 border-b border-slate-100 flex items-start gap-4">
                        <div className="relative group w-28 h-24 sm:w-32 sm:h-24 rounded-xl overflow-hidden bg-slate-900 shrink-0 border border-slate-200">
                          <img
                            src={item.currentUrl}
                            alt={item.altText}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = item.defaultUrl;
                            }}
                          />
                          <button
                            onClick={() => setPreviewModalImage(item)}
                            className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white cursor-pointer"
                            title="Preview image"
                          >
                            <Eye className="w-5 h-5" />
                          </button>
                          {isModified && (
                            <span className="absolute top-1 right-1 px-1.5 py-0.5 bg-amber-500 text-slate-950 text-[9px] font-black rounded shadow">
                              CUSTOM
                            </span>
                          )}
                        </div>

                        <div className="flex-1 min-w-0 space-y-1">
                          <div className="flex items-center justify-between gap-1">
                            <span className="px-2 py-0.5 bg-slate-100 text-slate-600 rounded text-[10px] font-bold uppercase tracking-wider">
                              {item.category}
                            </span>
                            <span className="text-[10px] text-slate-400 font-mono">
                              {item.recommendedSize}
                            </span>
                          </div>
                          <h4 className="text-sm font-bold text-slate-900 truncate">{item.title}</h4>
                          <p className="text-xs text-slate-500 line-clamp-2">{item.description}</p>
                        </div>
                      </div>

                      {/* Controls */}
                      <div className="p-4 space-y-3 flex-1 flex flex-col justify-between bg-slate-50/50 rounded-b-2xl">
                        <div className="space-y-1.5">
                          <label className="text-[11px] font-bold text-slate-700 flex items-center justify-between">
                            <span>Image URL (or upload local file below):</span>
                          </label>
                          <input
                            type="text"
                            value={isDataUrl ? '[Local File Uploaded]' : item.currentUrl}
                            readOnly={isDataUrl}
                            onChange={(e) => updateImage(item.key, e.target.value)}
                            className="w-full px-2.5 py-1.5 bg-white border border-slate-300 rounded text-xs text-slate-800 font-mono focus:outline-none"
                          />
                        </div>

                        {/* Presets */}
                        {item.presetAlternatives && item.presetAlternatives.length > 0 && (
                          <div className="space-y-1">
                            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                              Quick Presets:
                            </span>
                            <div className="flex flex-wrap gap-1.5">
                              {item.presetAlternatives.map((preset, pIdx) => {
                                const isSelected = item.currentUrl === preset.url;
                                return (
                                  <button
                                    key={pIdx}
                                    onClick={() => {
                                      updateImage(item.key, preset.url);
                                      showToast(`Applied preset "${preset.label}"`);
                                    }}
                                    className={`px-2 py-1 rounded text-[11px] font-semibold transition-all cursor-pointer flex items-center gap-1 ${
                                      isSelected
                                        ? 'bg-[#002255] text-[#FFD000] font-bold ring-1 ring-[#002255]'
                                        : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'
                                    }`}
                                  >
                                    {isSelected && <Check className="w-3 h-3 text-[#FFD000]" />}
                                    <span>{preset.label}</span>
                                  </button>
                                );
                              })}
                            </div>
                          </div>
                        )}

                        {/* Upload & Revert */}
                        <div className="pt-2 border-t border-slate-200 flex items-center justify-between gap-2">
                          <input
                            type="file"
                            accept="image/*"
                            ref={(el) => (imageFileInputRefs.current[item.key] = el)}
                            className="hidden"
                            onChange={(e) => {
                              if (e.target.files && e.target.files[0]) {
                                handleImageFileUpload(item.key, e.target.files[0]);
                              }
                            }}
                          />
                          <button
                            type="button"
                            onClick={() => imageFileInputRefs.current[item.key]?.click()}
                            className="px-3 py-1.5 bg-white hover:bg-slate-100 border border-slate-300 rounded-lg text-xs font-bold text-slate-700 flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
                          >
                            <Upload className="w-3.5 h-3.5 text-blue-700" />
                            <span>Upload File</span>
                          </button>

                          {isModified && (
                            <button
                              type="button"
                              onClick={() => {
                                resetImage(item.key);
                                showToast(`Reset "${item.title}" to default`);
                              }}
                              className="px-2.5 py-1.5 text-xs text-rose-700 hover:bg-rose-50 rounded-lg font-semibold flex items-center gap-1 cursor-pointer"
                            >
                              <RotateCcw className="w-3 h-3" />
                              <span>Reset Default</span>
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

          {/* TAB 6: INQUIRIES & QUOTES */}
          {activeTab === 'inquiries' && (
            <div className="space-y-6 max-w-5xl mx-auto">
              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 font-heading">
                      Client Inquiries & Quote Requests ({inquiries.length})
                    </h3>
                    <p className="text-xs text-slate-500">
                      View submitted workforce quote requests, candidate job applications, and callback submissions.
                    </p>
                  </div>
                  {inquiries.length > 0 && (
                    <button
                      onClick={() => {
                        if (confirm('Clear all inquiry history?')) {
                          clearInquiries();
                          showToast('Inquiry history cleared');
                        }
                      }}
                      className="px-3 py-1.5 text-xs text-rose-700 hover:bg-rose-50 rounded-lg font-semibold border border-rose-200 flex items-center gap-1 cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Clear All</span>
                    </button>
                  )}
                </div>

                {inquiries.length === 0 ? (
                  <div className="text-center py-12 text-slate-400">
                    <MessageSquare className="w-8 h-8 mx-auto mb-2 opacity-50" />
                    <p className="text-xs font-semibold">No inquiries recorded yet.</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {inquiries.map((inq) => (
                      <div
                        key={inq.id}
                        className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 hover:bg-slate-100/70 transition-colors"
                      >
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span
                              className={`px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider ${
                                inq.type === 'quote'
                                  ? 'bg-blue-100 text-blue-800'
                                  : inq.type === 'job_application'
                                  ? 'bg-purple-100 text-purple-800'
                                  : 'bg-amber-100 text-amber-800'
                              }`}
                            >
                              {inq.type.replace('_', ' ')}
                            </span>
                            <span className="text-xs font-bold text-slate-900">{inq.name}</span>
                            <span className="text-[11px] text-slate-400">&bull; {inq.date}</span>
                          </div>
                          <p className="text-xs text-slate-600 leading-snug">{inq.details}</p>
                          <div className="flex items-center gap-3 text-[11px] text-slate-500 font-mono pt-0.5">
                            <span>📞 {inq.phone}</span>
                            <span>✉️ {inq.email}</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 shrink-0 self-end md:self-auto">
                          <select
                            value={inq.status}
                            onChange={(e) =>
                              updateInquiryStatus(inq.id, e.target.value as any)
                            }
                            className={`text-xs font-bold px-2.5 py-1 rounded-lg border focus:outline-none ${
                              inq.status === 'new'
                                ? 'bg-amber-50 text-amber-800 border-amber-300'
                                : inq.status === 'contacted'
                                ? 'bg-blue-50 text-blue-800 border-blue-300'
                                : inq.status === 'resolved'
                                ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                                : 'bg-slate-50 text-slate-700 border-slate-300'
                            }`}
                          >
                            <option value="new">New</option>
                            <option value="in_review">In Review</option>
                            <option value="contacted">Contacted</option>
                            <option value="resolved">Resolved</option>
                          </select>

                          <button
                            onClick={() => deleteInquiry(inq.id)}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                            title="Delete record"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 7: ADMIN PASSWORD & SECURITY */}
          {activeTab === 'security' && (
            <div className="space-y-8 max-w-4xl mx-auto">
              {/* Change Password Card */}
              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-6">
                <div className="border-b border-slate-100 pb-4">
                  <h3 className="text-lg font-bold text-slate-900 font-heading flex items-center gap-2">
                    <KeyRound className="w-5 h-5 text-rose-600" />
                    <span>Change Admin Password</span>
                  </h3>
                  <p className="text-xs text-slate-500">
                    Update the credentials used to access this Admin Panel.
                  </p>
                </div>

                {passwordError && (
                  <div className="p-3.5 bg-rose-50 border border-rose-200 rounded-xl text-rose-800 text-xs font-semibold flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                    <span>{passwordError}</span>
                  </div>
                )}

                {passwordSuccess && (
                  <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 text-xs font-semibold flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{passwordSuccess}</span>
                  </div>
                )}

                <form onSubmit={handleChangePasswordSubmit} className="space-y-4 max-w-lg">
                  {/* Old Password */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700">Current Password</label>
                    <div className="relative">
                      <Lock className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input
                        type={showOldPass ? 'text' : 'password'}
                        required
                        value={oldPassword}
                        onChange={(e) => setOldPassword(e.target.value)}
                        placeholder="Enter current admin password"
                        className="w-full pl-9 pr-10 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm text-slate-900 focus:bg-white focus:outline-none"
                      />
                      <button
                        type="button"
                        onClick={() => setShowOldPass(!showOldPass)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1"
                      >
                        {showOldPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  {/* New Password */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700">New Password</label>
                    <div className="relative">
                      <Lock className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input
                        type={showNewPass ? 'text' : 'password'}
                        required
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="Enter new password (min. 4 characters)"
                        className="w-full pl-9 pr-10 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm text-slate-900 focus:bg-white focus:outline-none"
                      />
                      <button
                        type="button"
                        onClick={() => setShowNewPass(!showNewPass)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1"
                      >
                        {showNewPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  {/* Confirm Password */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700">Confirm New Password</label>
                    <div className="relative">
                      <Lock className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input
                        type={showNewPass ? 'text' : 'password'}
                        required
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Re-enter new password"
                        className="w-full pl-9 pr-10 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm text-slate-900 focus:bg-white focus:outline-none"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="px-5 py-2.5 bg-[#002255] hover:bg-[#001738] text-white font-extrabold text-xs uppercase tracking-wider rounded-xl shadow transition-colors flex items-center gap-2 cursor-pointer"
                  >
                    <KeyRound className="w-4 h-4 text-[#FFD000]" />
                    <span>Update Password</span>
                  </button>
                </form>
              </div>

              {/* Admin Profile Details */}
              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-6">
                <div className="border-b border-slate-100 pb-4">
                  <h3 className="text-lg font-bold text-slate-900 font-heading">
                    Admin Profile & Identity
                  </h3>
                  <p className="text-xs text-slate-500">
                    Customize the administrator username and display name.
                  </p>
                </div>

                <form onSubmit={handleUpdateProfile} className="space-y-4 max-w-lg">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700">Admin Username</label>
                    <input
                      type="text"
                      required
                      value={profileUsername}
                      onChange={(e) => setProfileUsername(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm text-slate-900"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700">Display Name</label>
                    <input
                      type="text"
                      required
                      value={profileName}
                      onChange={(e) => setProfileName(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm text-slate-900"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700">Admin Email</label>
                    <input
                      type="email"
                      required
                      value={profileEmail}
                      onChange={(e) => setProfileEmail(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm text-slate-900"
                    />
                  </div>

                  <button
                    type="submit"
                    className="px-5 py-2.5 bg-slate-800 hover:bg-slate-900 text-white font-bold text-xs rounded-xl shadow transition-colors flex items-center gap-2 cursor-pointer"
                  >
                    <Save className="w-4 h-4 text-emerald-400" />
                    <span>Save Profile Details</span>
                  </button>
                </form>
              </div>

              {/* Session Control */}
              <div className="bg-rose-50 border border-rose-200 p-6 rounded-3xl flex items-center justify-between gap-4">
                <div>
                  <h4 className="text-sm font-bold text-rose-950">Active Session Control</h4>
                  <p className="text-xs text-rose-700 mt-0.5">
                    Logged in as <strong>{adminUser.username}</strong> ({adminUser.role}). Terminating the session will require logging in again.
                  </p>
                </div>
                <button
                  onClick={() => {
                    logout();
                    onClose();
                  }}
                  className="px-4 py-2.5 bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs rounded-xl transition-colors flex items-center gap-2 shrink-0 cursor-pointer shadow"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Log Out Now</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* FOOTER BAR */}
        <div className="p-4 bg-slate-100 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div className="text-slate-600 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span>
              Changes persist across all website visits & are saved in client storage.
            </span>
          </div>
          <div className="flex items-center gap-3">
            {hasUnsavedChanges && (
              <button
                onClick={handleSaveAllSettings}
                className="px-4 py-2 bg-[#FFD000] hover:bg-[#ffe043] text-slate-950 font-bold rounded-xl shadow transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <Save className="w-3.5 h-3.5" />
                <span>Save All</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="px-5 py-2 bg-[#002255] hover:bg-[#001738] text-white font-bold rounded-xl shadow transition-colors cursor-pointer"
            >
              Done & Return to Website
            </button>
          </div>
        </div>
      </div>

      {/* FULL PREVIEW MODAL */}
      {previewModalImage && (
        <div
          className="fixed inset-0 z-60 flex items-center justify-center bg-black/90 p-4"
          onClick={() => setPreviewModalImage(null)}
        >
          <div className="max-w-4xl max-h-[90vh] bg-slate-900 rounded-2xl overflow-hidden shadow-2xl p-2 flex flex-col">
            <div className="p-3 flex items-center justify-between text-white border-b border-slate-800">
              <span className="font-bold text-sm">{previewModalImage.title}</span>
              <button
                onClick={() => setPreviewModalImage(null)}
                className="p-1 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="flex-1 overflow-auto flex items-center justify-center p-4">
              <img
                src={previewModalImage.currentUrl}
                alt={previewModalImage.altText}
                className="max-h-[70vh] object-contain rounded"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
