import React from 'react';
import {
  Layout,
  Eye,
  EyeOff,
  Bell,
  Phone,
  Mail,
  MapPin,
  ShieldCheck,
  CheckCircle2,
  Navigation,
  Globe,
  Sliders
} from 'lucide-react';
import { useSiteSettings } from '../../context/SiteSettingsContext';
import { HeaderConfig } from '../../types';

interface HeaderConfigTabProps {
  onShowToast: (msg: string) => void;
}

export const HeaderConfigTab: React.FC<HeaderConfigTabProps> = ({ onShowToast }) => {
  const { settings, updateHeaderConfig } = useSiteSettings();
  const cfg = settings.headerConfig || {};

  const handleToggle = (key: keyof HeaderConfig) => {
    const updated = {
      ...cfg,
      [key]: !cfg[key],
    };
    updateHeaderConfig(updated);
    onShowToast(`Updated header setting: ${String(key)}`);
  };

  const handleTextChange = (key: keyof HeaderConfig, value: any) => {
    const updated = {
      ...cfg,
      [key]: value,
    };
    updateHeaderConfig(updated);
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Top Banner Overview */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-50 text-[#002366] flex items-center justify-center font-bold">
              <Layout className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900 font-heading">
                Header & Navigation Bar Customization
              </h3>
              <p className="text-xs text-slate-500">
                Control the top notification bar, contact indicators, menu navigation items, and action buttons.
              </p>
            </div>
          </div>
        </div>

        {/* 1. Announcement Bar Section */}
        <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bell className="w-4 h-4 text-amber-600" />
              <span className="text-sm font-bold text-slate-800">Top Announcement Banner</span>
            </div>
            <button
              onClick={() => handleToggle('announcementEnabled')}
              className={`px-3 py-1 rounded-full text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5 ${
                cfg.announcementEnabled
                  ? 'bg-emerald-100 text-emerald-800'
                  : 'bg-slate-200 text-slate-600'
              }`}
            >
              {cfg.announcementEnabled ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
              <span>{cfg.announcementEnabled ? 'Enabled' : 'Hidden'}</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Announcement Text</label>
              <input
                type="text"
                value={cfg.announcementText || ''}
                onChange={(e) => handleTextChange('announcementText', e.target.value)}
                placeholder="e.g. EU Cross-Border Staffing 2025: Rapid 48h surge workforce..."
                className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Action Link Label</label>
              <input
                type="text"
                value={cfg.announcementLinkText || ''}
                onChange={(e) => handleTextChange('announcementLinkText', e.target.value)}
                placeholder="e.g. Request SLA Quote"
                className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>
        </div>

        {/* 2. Top Contact Bar Items */}
        <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
          <div className="flex items-center gap-2">
            <Phone className="w-4 h-4 text-emerald-600" />
            <span className="text-sm font-bold text-slate-800">Top Contact Strip & Badges</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {[
              { key: 'showTopBar', label: 'Entire Top Bar', icon: Layout },
              { key: 'showTopPhone', label: 'Phone Number', icon: Phone },
              { key: 'showTopWhatsApp', label: 'WhatsApp Badge', icon: Phone },
              { key: 'showTopEmail', label: 'Email Address', icon: Mail },
              { key: 'showTopLocation', label: 'Location Text', icon: MapPin },
              { key: 'showTopLicense', label: 'ETT License Text', icon: ShieldCheck },
            ].map(({ key, label, icon: Icon }) => (
              <div
                key={key}
                onClick={() => handleToggle(key as keyof HeaderConfig)}
                className="p-3 bg-white border border-slate-200 rounded-xl flex items-center justify-between cursor-pointer hover:border-blue-300 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <Icon className="w-3.5 h-3.5 text-slate-500" />
                  <span className="text-xs font-semibold text-slate-800">{label}</span>
                </div>
                <span
                  className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold ${
                    (cfg as any)[key] !== false
                      ? 'bg-emerald-500 text-white'
                      : 'bg-slate-200 text-slate-500'
                  }`}
                >
                  {(cfg as any)[key] !== false ? '✓' : '✕'}
                </span>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Top Bar Location Label</label>
              <input
                type="text"
                value={cfg.topBarLocationText || ''}
                onChange={(e) => handleTextChange('topBarLocationText', e.target.value)}
                placeholder="Rio Maior, PT & Rotterdam, NL"
                className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl text-xs text-slate-800"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">WhatsApp Badge Label</label>
              <input
                type="text"
                value={cfg.topBarWhatsAppBadgeText || ''}
                onChange={(e) => handleTextChange('topBarWhatsAppBadgeText', e.target.value)}
                placeholder="WhatsApp Direct"
                className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl text-xs text-slate-800"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">License Badge Label</label>
              <input
                type="text"
                value={cfg.topBarLicenseText || ''}
                onChange={(e) => handleTextChange('topBarLicenseText', e.target.value)}
                placeholder="ETT ACT Licença Nº 892"
                className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl text-xs text-slate-800"
              />
            </div>
          </div>
        </div>

        {/* 3. Main Navigation Menu Links */}
        <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
          <div className="flex items-center gap-2">
            <Navigation className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-bold text-slate-800">Menu Navigation Links Visibility</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {[
              { key: 'showNavHome', label: 'Home Link' },
              { key: 'showNavServices', label: 'Services Dropdown' },
              { key: 'showNavIndustries', label: 'Industries Link' },
              { key: 'showNavEmployers', label: 'For Employers' },
              { key: 'showNavJobseekers', label: 'For Jobseekers' },
              { key: 'showNavBlog', label: 'Blog & Insights' },
              { key: 'showNavLocations', label: 'Global Locations' },
              { key: 'showNavAbout', label: 'About Us' },
              { key: 'showNavContact', label: 'Contact Us' },
            ].map(({ key, label }) => (
              <div
                key={key}
                onClick={() => handleToggle(key as keyof HeaderConfig)}
                className="p-3 bg-white border border-slate-200 rounded-xl flex items-center justify-between cursor-pointer hover:border-blue-300 transition-colors"
              >
                <span className="text-xs font-semibold text-slate-800">{label}</span>
                <span
                  className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold ${
                    (cfg as any)[key] !== false
                      ? 'bg-emerald-500 text-white'
                      : 'bg-slate-200 text-slate-500'
                  }`}
                >
                  {(cfg as any)[key] !== false ? '✓' : '✕'}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* 4. Action Buttons & Language */}
        <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
          <div className="flex items-center gap-2">
            <Sliders className="w-4 h-4 text-purple-600" />
            <span className="text-sm font-bold text-slate-800">Call-to-Action Buttons & Language</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-3 bg-white border border-slate-200 rounded-xl space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-800">Primary CTA Button</span>
                <button
                  onClick={() => handleToggle('showPrimaryCta')}
                  className={`px-2.5 py-0.5 rounded text-[11px] font-bold ${
                    cfg.showPrimaryCta !== false ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-600'
                  }`}
                >
                  {cfg.showPrimaryCta !== false ? 'Visible' : 'Hidden'}
                </button>
              </div>
              <input
                type="text"
                value={cfg.ctaButtonText || 'Request Quote'}
                onChange={(e) => handleTextChange('ctaButtonText', e.target.value)}
                placeholder="Button text (e.g. Request Quote)"
                className="w-full px-3 py-1.5 bg-slate-50 border border-slate-300 rounded-lg text-xs text-slate-800"
              />
            </div>

            <div className="p-3 bg-white border border-slate-200 rounded-xl space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-800">Language Selector</span>
                <button
                  onClick={() => handleToggle('showLanguageSelector')}
                  className={`px-2.5 py-0.5 rounded text-[11px] font-bold ${
                    cfg.showLanguageSelector !== false ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-600'
                  }`}
                >
                  {cfg.showLanguageSelector !== false ? 'Visible' : 'Hidden'}
                </button>
              </div>
              <p className="text-[11px] text-slate-500">
                Displays the EN / PT / NL / ES flag language selector in the navbar.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
