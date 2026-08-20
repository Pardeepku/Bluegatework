import React from 'react';
import {
  Sliders,
  Eye,
  EyeOff,
  Sparkles,
  Layers,
  Users,
  ShieldCheck,
  Globe,
  Briefcase,
  HelpCircle,
  CheckCircle2,
  FileText
} from 'lucide-react';
import { useSiteSettings } from '../../context/SiteSettingsContext';

interface HomePageConfigTabProps {
  onShowToast: (msg: string) => void;
}

export const HomePageConfigTab: React.FC<HomePageConfigTabProps> = ({ onShowToast }) => {
  const { settings, updateHomePageContent } = useSiteSettings();
  const hp = settings.homePageContent || {};

  const handleToggle = (key: string) => {
    const currentValue = (hp as any)[key];
    const updated = {
      ...hp,
      [key]: currentValue === false ? true : false,
    };
    updateHomePageContent(updated);
    onShowToast(`Toggled section: ${key}`);
  };

  const handleTextChange = (key: string, value: string) => {
    const updated = {
      ...hp,
      [key]: value,
    };
    updateHomePageContent(updated);
  };

  const SECTIONS = [
    { key: 'showHeroSlider', label: '1. Hero Slider (100% Width on PC)', icon: Sparkles, desc: 'Top rotating 2-slide hero banner with CTA buttons' },
    { key: 'showQuickCards', label: '2. Quick 3 Service Cards Strip', icon: Layers, desc: 'Shortcuts under hero banner' },
    { key: 'showTrustMetrics', label: '3. Trust Metrics & Stats Strip', icon: CheckCircle2, desc: 'Dark blue bar with 10k+ deployed, 99.4% compliance stats' },
    { key: 'showServicesSection', label: '4. Core Services Cards (3 Pillars)', icon: Briefcase, desc: 'Temporary Staffing, Outsourcing, International Recruitment' },
    { key: 'showTalentCalculator', label: '5. Interactive Talent Calculator', icon: Sliders, desc: 'Interactive deployment quote calculator widget' },
    { key: 'showIndustriesSection', label: '6. Industries & Sectors Grid', icon: Users, desc: 'Logistics, Construction, Agriculture, Hospitality, etc.' },
    { key: 'showGlobalCorridor', label: '7. Global Footprint & Sourcing Hubs', icon: Globe, desc: 'Portugal HQ, Netherlands, Eastern Europe, Asia/LATAM' },
    { key: 'showProcessSection', label: '8. 4-Stage Compliance & Delivery Process', icon: FileText, desc: 'Step 01 to 04 operational roadmap' },
    { key: 'showComplianceShield', label: '9. European Compliance Shield (ACT/SNA)', icon: ShieldCheck, desc: 'Legal indemnity and cross-border protection section' },
    { key: 'showFaqSection', label: '10. Frequently Asked Questions Accordion', icon: HelpCircle, desc: 'Accordion with quick answers' },
  ];

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* 1. Section Visibility Switches */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
          <div className="w-10 h-10 rounded-2xl bg-blue-50 text-[#002366] flex items-center justify-center font-bold">
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900 font-heading">
              Home Page Section Visibility Controls
            </h3>
            <p className="text-xs text-slate-500">
              Easily show, hide, or remove individual sections on the homepage with a single click.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {SECTIONS.map(({ key, label, icon: Icon, desc }) => {
            const isVisible = (hp as any)[key] !== false;
            return (
              <div
                key={key}
                className={`p-4 rounded-2xl border transition-all flex items-start justify-between gap-3 ${
                  isVisible ? 'bg-white border-slate-200 shadow-xs' : 'bg-slate-100 border-slate-300 opacity-60'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className={`p-2 rounded-xl mt-0.5 ${isVisible ? 'bg-blue-50 text-[#002366]' : 'bg-slate-200 text-slate-500'}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">{label}</h4>
                    <p className="text-[11px] text-slate-500 mt-0.5">{desc}</p>
                  </div>
                </div>

                <button
                  onClick={() => handleToggle(key)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 shrink-0 ${
                    isVisible
                      ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                      : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
                  }`}
                >
                  {isVisible ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                  <span>{isVisible ? 'Visible' : 'Hidden'}</span>
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* 2. Hero Slider 1 & 2 Text Customization */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
          <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-900 flex items-center justify-center font-bold">
            <Sparkles className="w-5 h-5 text-amber-600" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900 font-heading">
              Hero Slider Slides Text Customization
            </h3>
            <p className="text-xs text-slate-500">
              Customize headlines, descriptions, eyebrows, and button labels for Slide 1 and Slide 2.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Slide 1 */}
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3.5">
            <div className="flex items-center justify-between border-b border-slate-200/60 pb-2">
              <span className="text-xs font-black uppercase text-[#002366]">Slide 1: Warehouse & Logistics</span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-blue-100 text-blue-800 font-bold">Slide #1</span>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Slide 1 Eyebrow</label>
              <input
                type="text"
                value={hp.slide1Eyebrow || ''}
                onChange={(e) => handleTextChange('slide1Eyebrow', e.target.value)}
                placeholder="EFFICIENT WORKFORCE. SMOOTH OPERATIONS."
                className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl text-xs text-slate-800"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Slide 1 Headline</label>
              <input
                type="text"
                value={hp.slide1Headline || ''}
                onChange={(e) => handleTextChange('slide1Headline', e.target.value)}
                placeholder="Powering Your Business From Warehouse To Success"
                className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl text-xs text-slate-800 font-semibold"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Slide 1 Description</label>
              <textarea
                rows={2}
                value={hp.slide1Description || ''}
                onChange={(e) => handleTextChange('slide1Description', e.target.value)}
                placeholder="Our dedicated warehouse workforce ensures accurate handling..."
                className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl text-xs text-slate-800"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Slide 1 Button Text</label>
              <input
                type="text"
                value={hp.slide1ButtonText || ''}
                onChange={(e) => handleTextChange('slide1ButtonText', e.target.value)}
                placeholder="Contact us"
                className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl text-xs text-slate-800"
              />
            </div>
          </div>

          {/* Slide 2 */}
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3.5">
            <div className="flex items-center justify-between border-b border-slate-200/60 pb-2">
              <span className="text-xs font-black uppercase text-[#002366]">Slide 2: Construction & Industrial</span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-blue-100 text-blue-800 font-bold">Slide #2</span>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Slide 2 Eyebrow</label>
              <input
                type="text"
                value={hp.slide2Eyebrow || ''}
                onChange={(e) => handleTextChange('slide2Eyebrow', e.target.value)}
                placeholder="BUILDING TOMORROW, TOGETHER"
                className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl text-xs text-slate-800"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Slide 2 Headline</label>
              <input
                type="text"
                value={hp.slide2Headline || ''}
                onChange={(e) => handleTextChange('slide2Headline', e.target.value)}
                placeholder="Building Strong Foundations For A Better Tomorrow"
                className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl text-xs text-slate-800 font-semibold"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Slide 2 Description</label>
              <textarea
                rows={2}
                value={hp.slide2Description || ''}
                onChange={(e) => handleTextChange('slide2Description', e.target.value)}
                placeholder="Delivering reliable and innovative construction solutions..."
                className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl text-xs text-slate-800"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Slide 2 Button Text</label>
              <input
                type="text"
                value={hp.slide2ButtonText || ''}
                onChange={(e) => handleTextChange('slide2ButtonText', e.target.value)}
                placeholder="Contact us"
                className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl text-xs text-slate-800"
              />
            </div>
          </div>
        </div>
      </div>

      {/* 3. Section Headings Customization */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
          <div className="w-10 h-10 rounded-2xl bg-purple-50 text-purple-900 flex items-center justify-center font-bold">
            <FileText className="w-5 h-5 text-purple-600" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900 font-heading">
              Section Headings & Descriptions
            </h3>
            <p className="text-xs text-slate-500">
              Customize text content of services, industries, process, and compliance sections.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700">Services Section Heading</label>
            <input
              type="text"
              value={hp.servicesHeading || ''}
              onChange={(e) => handleTextChange('servicesHeading', e.target.value)}
              placeholder="Tailored Staffing Solutions Built for Speed & Compliance"
              className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-800"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700">Industries Section Heading</label>
            <input
              type="text"
              value={hp.industriesHeading || ''}
              onChange={(e) => handleTextChange('industriesHeading', e.target.value)}
              placeholder="Sectors We Power Across Portugal & Netherlands"
              className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-800"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700">Corridor Hubs Heading</label>
            <input
              type="text"
              value={hp.corridorHeading || ''}
              onChange={(e) => handleTextChange('corridorHeading', e.target.value)}
              placeholder="From Portugal to Netherlands & Worldwide"
              className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-800"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700">Process Heading</label>
            <input
              type="text"
              value={hp.processHeading || ''}
              onChange={(e) => handleTextChange('processHeading', e.target.value)}
              placeholder="How We Deliver 100% Reliable Workforce"
              className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-800"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700">Compliance Shield Heading</label>
            <input
              type="text"
              value={hp.complianceHeading || ''}
              onChange={(e) => handleTextChange('complianceHeading', e.target.value)}
              placeholder="The Bluegate Compliance Shield"
              className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-800"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700">FAQs Heading</label>
            <input
              type="text"
              value={hp.faqHeading || ''}
              onChange={(e) => handleTextChange('faqHeading', e.target.value)}
              placeholder="Clear Answers to Common Workforce Inquiries"
              className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-800"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
