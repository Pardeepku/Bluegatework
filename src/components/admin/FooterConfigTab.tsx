import React from 'react';
import {
  Layout,
  Eye,
  EyeOff,
  Phone,
  Mail,
  ShieldCheck,
  Building2,
  Clock,
  CheckCircle2,
  Sliders,
  Sparkles
} from 'lucide-react';
import { useSiteSettings } from '../../context/SiteSettingsContext';
import { FooterConfig } from '../../types';

interface FooterConfigTabProps {
  onShowToast: (msg: string) => void;
}

export const FooterConfigTab: React.FC<FooterConfigTabProps> = ({ onShowToast }) => {
  const { settings, updateFooterConfig } = useSiteSettings();
  const cfg = settings.footerConfig || {};

  const handleToggle = (key: keyof FooterConfig) => {
    const updated = {
      ...cfg,
      [key]: !cfg[key],
    };
    updateFooterConfig(updated);
    onShowToast(`Updated footer setting: ${String(key)}`);
  };

  const handleTextChange = (key: keyof FooterConfig, value: any) => {
    const updated = {
      ...cfg,
      [key]: value,
    };
    updateFooterConfig(updated);
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
          <div className="w-10 h-10 rounded-2xl bg-blue-50 text-[#002366] flex items-center justify-center font-bold">
            <Layout className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900 font-heading">
              Footer Sections & Columns Customization
            </h3>
            <p className="text-xs text-slate-500">
              Customize the top CTA banner, footer columns, titles, callback widget, and copyright bar.
            </p>
          </div>
        </div>

        {/* 1. Top Call to Action Banner */}
        <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-600" />
              <span className="text-sm font-bold text-slate-800">Top Footer CTA Banner</span>
            </div>
            <button
              onClick={() => handleToggle('showCtaBanner')}
              className={`px-3 py-1 rounded-full text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5 ${
                cfg.showCtaBanner !== false
                  ? 'bg-emerald-100 text-emerald-800'
                  : 'bg-slate-200 text-slate-600'
              }`}
            >
              {cfg.showCtaBanner !== false ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
              <span>{cfg.showCtaBanner !== false ? 'Visible' : 'Hidden'}</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Banner Badge</label>
              <input
                type="text"
                value={cfg.ctaBannerBadge || ''}
                onChange={(e) => handleTextChange('ctaBannerBadge', e.target.value)}
                placeholder="48-Hour Rapid Surge Deployment"
                className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl text-xs text-slate-800"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Banner Heading</label>
              <input
                type="text"
                value={cfg.ctaBannerHeading || ''}
                onChange={(e) => handleTextChange('ctaBannerHeading', e.target.value)}
                placeholder="Need Flexible, Qualified Workforce in Europe?"
                className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl text-xs text-slate-800"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700">Banner Subtext</label>
            <input
              type="text"
              value={cfg.ctaBannerSubtext || ''}
              onChange={(e) => handleTextChange('ctaBannerSubtext', e.target.value)}
              placeholder="Contact our multi-lingual team in Portugal or the Netherlands for immediate headcount."
              className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl text-xs text-slate-800"
            />
          </div>
        </div>

        {/* 2. Column Visibility Controls */}
        <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
          <div className="flex items-center gap-2">
            <Layout className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-bold text-slate-800">Footer Columns Visibility & Titles</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {/* Brand / About Column */}
            <div className="p-4 bg-white border border-slate-200 rounded-2xl space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-900">About Column</span>
                <button
                  onClick={() => handleToggle('showAboutColumn')}
                  className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                    cfg.showAboutColumn !== false ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-600'
                  }`}
                >
                  {cfg.showAboutColumn !== false ? 'Visible' : 'Hidden'}
                </button>
              </div>
              <input
                type="text"
                value={cfg.aboutTitle || 'About Bluegate'}
                onChange={(e) => handleTextChange('aboutTitle', e.target.value)}
                placeholder="Column Title"
                className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800"
              />
            </div>

            {/* Services Column */}
            <div className="p-4 bg-white border border-slate-200 rounded-2xl space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-900">Services Column</span>
                <button
                  onClick={() => handleToggle('showServicesColumn')}
                  className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                    cfg.showServicesColumn !== false ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-600'
                  }`}
                >
                  {cfg.showServicesColumn !== false ? 'Visible' : 'Hidden'}
                </button>
              </div>
              <input
                type="text"
                value={cfg.servicesTitle || 'Core Capabilities'}
                onChange={(e) => handleTextChange('servicesTitle', e.target.value)}
                placeholder="Column Title"
                className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800"
              />
            </div>

            {/* Quick Links Column */}
            <div className="p-4 bg-white border border-slate-200 rounded-2xl space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-900">Quick Links Column</span>
                <button
                  onClick={() => handleToggle('showQuickLinksColumn')}
                  className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                    cfg.showQuickLinksColumn !== false ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-600'
                  }`}
                >
                  {cfg.showQuickLinksColumn !== false ? 'Visible' : 'Hidden'}
                </button>
              </div>
              <input
                type="text"
                value={cfg.quickLinksTitle || 'Quick Navigation'}
                onChange={(e) => handleTextChange('quickLinksTitle', e.target.value)}
                placeholder="Column Title"
                className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800"
              />
            </div>

            {/* Callback Widget Column */}
            <div className="p-4 bg-white border border-slate-200 rounded-2xl space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-900">Callback Column</span>
                <button
                  onClick={() => handleToggle('showCallbackColumn')}
                  className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                    cfg.showCallbackColumn !== false ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-600'
                  }`}
                >
                  {cfg.showCallbackColumn !== false ? 'Visible' : 'Hidden'}
                </button>
              </div>
              <input
                type="text"
                value={cfg.callbackTitle || 'Fast Callback'}
                onChange={(e) => handleTextChange('callbackTitle', e.target.value)}
                placeholder="Column Title"
                className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800"
              />
            </div>

            {/* Operating Hours Column */}
            <div className="p-4 bg-white border border-slate-200 rounded-2xl space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-900">Operating Hours</span>
                <button
                  onClick={() => handleToggle('showOperatingHours')}
                  className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                    cfg.showOperatingHours !== false ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-600'
                  }`}
                >
                  {cfg.showOperatingHours !== false ? 'Visible' : 'Hidden'}
                </button>
              </div>
              <input
                type="text"
                value={cfg.operatingHoursTitle || 'Operating Hours'}
                onChange={(e) => handleTextChange('operatingHoursTitle', e.target.value)}
                placeholder="Column Title"
                className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800"
              />
            </div>

            {/* Bottom Copyright Bar */}
            <div className="p-4 bg-white border border-slate-200 rounded-2xl space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-900">Copyright Bar</span>
                <button
                  onClick={() => handleToggle('showCopyrightBar')}
                  className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                    cfg.showCopyrightBar !== false ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-600'
                  }`}
                >
                  {cfg.showCopyrightBar !== false ? 'Visible' : 'Hidden'}
                </button>
              </div>
              <input
                type="text"
                value={cfg.copyrightText || ''}
                onChange={(e) => handleTextChange('copyrightText', e.target.value)}
                placeholder="Custom copyright wording"
                className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
