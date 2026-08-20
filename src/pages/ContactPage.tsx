import React, { useState } from 'react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  MessageSquare, 
  Send, 
  CheckCircle2, 
  Building2, 
  ShieldCheck, 
  Users, 
  FileText,
  ExternalLink,
  Globe2
} from 'lucide-react';
import { PageId } from '../types';
import { useSiteSettings } from '../context/SiteSettingsContext';

interface ContactPageProps {
  onNavigate: (page: PageId) => void;
  onRequestQuote: () => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onNavigate, onRequestQuote }) => {
  const { settings, addInquiry } = useSiteSettings();
  const [inquiryType, setInquiryType] = useState<'employer' | 'candidate'>('employer');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    companyName: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const cleanPhone = settings.phoneMain.replace(/[^\d+]/g, '');
  const cleanWA = settings.whatsappNumber.replace(/[^\d]/g, '');
  const waUrl = `https://wa.me/${cleanWA}?text=${encodeURIComponent(settings.whatsappPrefill)}`;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    addInquiry({
      type: inquiryType === 'employer' ? 'quote' : 'contact',
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      company: formData.companyName || (inquiryType === 'candidate' ? 'Job Candidate' : undefined),
      details: `[${inquiryType.toUpperCase()}] Subject: ${formData.subject || 'General Inquiry'}\nMessage: ${formData.message}`
    });

    setSubmitted(true);
  };

  return (
    <div className="space-y-16 sm:space-y-20 pb-16">
      {/* Contact Hero */}
      <section className="bg-gradient-to-b from-[#EFF6FF] via-white to-white pt-10 pb-14 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100 text-[#1E40AF] text-xs font-bold uppercase tracking-wider">
            <Mail className="w-3.5 h-3.5" />
            <span>Connect with {settings.siteName}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-slate-950 font-heading tracking-tight max-w-3xl">
            Get in Touch with Our European Workforce Teams.
          </h1>
          <p className="text-base sm:text-lg text-slate-600 max-w-2xl leading-relaxed">
            Have a question about temporary staffing in Portugal, logistics manpower in the Netherlands, or international candidate recruitment? Reach out directly to our specialists.
          </p>
        </div>
      </section>

      {/* Main Grid: Direct Channels & Interactive Contact Form */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: HQ Cards, Dutch Branch & Real Contact Points */}
          <div className="lg:col-span-5 space-y-6">
            {/* Global HQ Box */}
            <div className="bg-[#001a4d] text-white rounded-3xl p-8 space-y-6 border border-blue-900/60 shadow-xl shadow-blue-950/10">
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div>
                  <span className="text-[10px] font-extrabold tracking-widest text-[#D4AF37] uppercase">
                    Operations
                  </span>
                  <h3 className="text-xl font-bold font-heading text-white mt-0.5">
                    {settings.siteName} (Portugal)
                  </h3>
                </div>
                <span className="text-2xl">🇵🇹</span>
              </div>

              <div className="space-y-4 text-xs">
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-blue-400 shrink-0" />
                  <div>
                    <span className="text-slate-400 block">Direct Phone Line:</span>
                    <a
                      href={`tel:${cleanPhone}`}
                      className="text-white font-bold hover:text-amber-400 text-sm transition-colors"
                    >
                      {settings.phoneMain}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-blue-400 shrink-0" />
                  <div>
                    <span className="text-slate-400 block">Official Inquiries:</span>
                    <a
                      href={`mailto:${settings.emailGeneral}`}
                      className="text-white font-bold hover:text-amber-400 text-sm transition-colors"
                    >
                      {settings.emailGeneral}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Clock className="w-4 h-4 text-blue-400 shrink-0" />
                  <div>
                    <span className="text-slate-400 block">Office Hours:</span>
                    <span className="text-slate-200">{settings.operatingHours}</span>
                  </div>
                </div>
              </div>

              {/* Direct WhatsApp Action Button */}
              <div className="pt-2 border-t border-slate-800">
                <a
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors shadow-md"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Chat Immediately on WhatsApp ({settings.whatsappNumber})</span>
                </a>
              </div>
            </div>

            {/* Netherlands Branch Box */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-md space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 text-xs">
                <div>
                  <span className="text-[10px] font-extrabold tracking-widest text-[#002255] uppercase">
                    Benelux Operational Desk
                  </span>
                  <h4 className="text-base font-bold text-slate-900 mt-0.5">
                    Netherlands Operations
                  </h4>
                </div>
                <span className="text-2xl">🇳🇱</span>
              </div>
              <div className="text-xs space-y-2 text-slate-600">
                <div className="flex items-center gap-2 text-[11px] text-slate-500">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{settings.nenCertificate}</span>
                </div>
              </div>
            </div>

            {/* Department Emails Card */}
            <div className="bg-slate-50 rounded-3xl p-6 border border-slate-200 space-y-3">
              <div className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                Direct Department Contacts
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3 bg-white rounded-xl border border-slate-200">
                  <span className="text-slate-500 text-[10px] block uppercase font-bold">Candidate CVs</span>
                  <a href={`mailto:${settings.emailRecruitment}`} className="text-[#002255] font-bold hover:underline">
                    {settings.emailRecruitment}
                  </a>
                </div>
                <div className="p-3 bg-white rounded-xl border border-slate-200">
                  <span className="text-slate-500 text-[10px] block uppercase font-bold">B2B & Compliance</span>
                  <a href={`mailto:${settings.emailSupport}`} className="text-[#002255] font-bold hover:underline">
                    {settings.emailSupport}
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Multi-Audience Inquiry Form */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-xl shadow-blue-950/5 space-y-6">
            {/* Inquiry Toggle */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 font-heading">
                  Send an Official Inquiry
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Our staffing coordinators respond within 2 business hours.
                </p>
              </div>
              <div className="inline-flex p-1 bg-slate-100 rounded-xl text-xs font-bold">
                <button
                  type="button"
                  onClick={() => setInquiryType('employer')}
                  className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                    inquiryType === 'employer'
                      ? 'bg-[#1E40AF] text-white'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  For Employers
                </button>
                <button
                  type="button"
                  onClick={() => setInquiryType('candidate')}
                  className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                    inquiryType === 'candidate'
                      ? 'bg-[#1E40AF] text-white'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  For Candidates
                </button>
              </div>
            </div>

            {submitted ? (
              <div className="py-12 text-center space-y-4 animate-in fade-in">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h4 className="text-2xl font-bold text-slate-900 font-heading">
                  Message Successfully Delivered!
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                  Thank you, <span className="font-bold text-slate-900">{formData.name}</span>. Your inquiry has been routed to our administration team for review. A representative will contact you at <span className="font-bold text-[#1E40AF]">{formData.email}</span>.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({ name: '', email: '', phone: '', companyName: '', subject: '', message: '' });
                  }}
                  className="px-6 py-2.5 bg-slate-900 text-white font-bold text-xs rounded-xl hover:bg-slate-800 cursor-pointer"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Maria Santos"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:outline-none focus:ring-2 focus:ring-[#1E40AF]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="e.g. m.santos@company.eu"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:outline-none focus:ring-2 focus:ring-[#1E40AF]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Contact Phone / WhatsApp *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+351 920 132 915"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:outline-none focus:ring-2 focus:ring-[#1E40AF]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      {inquiryType === 'employer' ? 'Company Name *' : 'Desired Job Title'}
                    </label>
                    <input
                      type="text"
                      required={inquiryType === 'employer'}
                      value={formData.companyName}
                      onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                      placeholder={inquiryType === 'employer' ? 'e.g. AgroIberia S.A.' : 'e.g. Warehouse Team Lead'}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:outline-none focus:ring-2 focus:ring-[#1E40AF]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Subject *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder={
                      inquiryType === 'employer'
                        ? 'e.g. Request 20 Forklift Drivers in Santarém'
                        : 'e.g. Application for Dutch Greenhouse Logistics'
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:outline-none focus:ring-2 focus:ring-[#1E40AF]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Your Message / Requirements Details *
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Provide details about your staffing volume, timeline, project location, or your work background..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:outline-none focus:ring-2 focus:ring-[#1E40AF]"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    id="contact-form-submit-btn"
                    className="w-full py-3.5 px-6 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-[#002255] to-[#1E40AF] hover:from-[#00173b] hover:to-[#173387] shadow-lg shadow-blue-900/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Send className="w-4 h-4 text-amber-300" />
                    <span>Submit Official Message</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};
