import React, { useState } from 'react';
import { X, CheckCircle2, Building2, Users, Calendar, ShieldCheck, ArrowRight, Sparkles, MapPin } from 'lucide-react';
import { QuoteRequest } from '../types';
import { CORE_SERVICES, INDUSTRIES, COMPANY_INFO } from '../data/mockData';
import { useSiteSettings } from '../context/SiteSettingsContext';

interface RequestQuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialService?: string;
}

export const RequestQuoteModal: React.FC<RequestQuoteModalProps> = ({
  isOpen,
  onClose,
  initialService
}) => {
  const { addInquiry } = useSiteSettings();
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [formData, setFormData] = useState<QuoteRequest>({
    serviceType: initialService || 'temporary-staffing',
    targetCountry: 'Portugal',
    industry: 'Logistics & Warehousing',
    headcountNeeded: 10,
    urgency: 'Immediate (1-3 days)',
    requiresAccommodation: true,
    companyName: '',
    contactPerson: '',
    email: '',
    phone: '',
    additionalDetails: ''
  });
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    addInquiry({
      type: 'quote',
      name: formData.contactPerson || 'B2B Client',
      email: formData.email,
      phone: formData.phone,
      company: formData.companyName,
      details: `Service: ${formData.serviceType} | Country: ${formData.targetCountry} | Industry: ${formData.industry} | Headcount: ${formData.headcountNeeded} | Urgency: ${formData.urgency} | Housing Required: ${formData.requiresAccommodation ? 'Yes' : 'No'}\nNotes: ${formData.additionalDetails}`
    });

    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    setStep(1);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl shadow-slate-950/50 border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#0F2B68] via-[#1E40AF] to-[#2563EB] p-6 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 text-xs font-bold text-amber-300 uppercase tracking-wider mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Fast B2B Staffing Assessment</span>
          </div>

          <h2 className="text-xl sm:text-2xl font-extrabold font-heading text-white">
            Request Workforce & Quote Proposal
          </h2>
          <p className="text-blue-100 text-xs sm:text-sm mt-1 max-w-lg">
            Tell us your staffing requirements for Portugal, Netherlands, or Europe. Get a legally audited proposal within 2 hours.
          </p>

          {/* Stepper Indicators */}
          {!submitted && (
            <div className="flex items-center gap-2 mt-4 pt-4 border-t border-blue-400/20 text-xs">
              <div className={`flex items-center gap-1.5 font-bold ${step >= 1 ? 'text-white' : 'text-blue-300/60'}`}>
                <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${step >= 1 ? 'bg-amber-400 text-slate-900 font-black' : 'bg-blue-900 text-white'}`}>1</span>
                <span>Workforce Needs</span>
              </div>
              <div className="h-px w-6 bg-blue-400/30" />
              <div className={`flex items-center gap-1.5 font-bold ${step >= 2 ? 'text-white' : 'text-blue-300/60'}`}>
                <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${step >= 2 ? 'bg-amber-400 text-slate-900 font-black' : 'bg-blue-900 text-white'}`}>2</span>
                <span>Timeline & Logistics</span>
              </div>
              <div className="h-px w-6 bg-blue-400/30" />
              <div className={`flex items-center gap-1.5 font-bold ${step >= 3 ? 'text-white' : 'text-blue-300/60'}`}>
                <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${step >= 3 ? 'bg-amber-400 text-slate-900 font-black' : 'bg-blue-900 text-white'}`}>3</span>
                <span>Company Contact</span>
              </div>
            </div>
          )}
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8">
          {submitted ? (
            <div className="text-center py-8 space-y-4 animate-in fade-in">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-black text-slate-900 font-heading">
                Workforce Proposal Request Received!
              </h3>
              <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                Thank you, <span className="font-bold text-slate-900">{formData.contactPerson}</span>. Our European workforce specialist for <span className="font-bold text-[#1E40AF]">{formData.targetCountry}</span> is preparing your customized headcount availability matrix and rate card.
              </p>

              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 max-w-md mx-auto text-left text-xs space-y-2">
                <div className="font-bold text-slate-800 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-blue-600" />
                  <span>Bluegate Work Guaranteed SLA</span>
                </div>
                <ul className="text-slate-600 space-y-1 pl-5 list-disc">
                  <li>Direct phone callback from recruitment director within 2 hours</li>
                  <li>Candidate bench profile dossier sent to {formData.email}</li>
                  <li>100% legal compliance validation (ACT / NEN 4400-1 / A1)</li>
                </ul>
              </div>

              <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center">
                <button
                  onClick={handleReset}
                  className="px-6 py-2.5 rounded-xl bg-slate-900 text-white font-bold text-xs hover:bg-slate-800 transition-colors"
                >
                  Close & Return
                </button>
                <a
                  href={COMPANY_INFO.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-2.5 rounded-xl bg-emerald-600 text-white font-bold text-xs hover:bg-emerald-700 transition-colors flex items-center justify-center gap-1.5"
                >
                  <span>Chat on WhatsApp Now</span>
                </a>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              {/* Step 1: Service & Industry */}
              {step === 1 && (
                <div className="space-y-5 animate-in fade-in">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                      1. Select Workforce Service Needed
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                      {CORE_SERVICES.map((srv) => (
                        <button
                          type="button"
                          key={srv.id}
                          onClick={() => setFormData({ ...formData, serviceType: srv.id })}
                          className={`p-3 rounded-2xl border text-left transition-all ${
                            formData.serviceType === srv.id
                              ? 'border-[#1E40AF] bg-blue-50/80 ring-2 ring-blue-500/20 text-[#1E40AF]'
                              : 'border-slate-200 hover:border-slate-300 text-slate-700 bg-white'
                          }`}
                        >
                          <div className="text-xs font-bold">{srv.title}</div>
                          <div className="text-[10px] text-slate-500 mt-1 line-clamp-1">{srv.badge}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                        Target Country / Location
                      </label>
                      <select
                        value={formData.targetCountry}
                        onChange={(e) => setFormData({ ...formData, targetCountry: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[#1E40AF]"
                      >
                        <option value="Portugal">Portugal (Mainland & Islands)</option>
                        <option value="Netherlands">Netherlands (Holland / Benelux)</option>
                        <option value="Germany">Germany (Cross-Border)</option>
                        <option value="France">France</option>
                        <option value="Global / International Corridor">Global / International Corridor</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                        Industry / Sector
                      </label>
                      <select
                        value={formData.industry}
                        onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[#1E40AF]"
                      >
                        {INDUSTRIES.map((ind) => (
                          <option key={ind.id} value={ind.name}>
                            {ind.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
                        Estimated Headcount Needed: <span className="text-[#1E40AF] text-sm">{formData.headcountNeeded} Workers</span>
                      </label>
                    </div>
                    <input
                      type="range"
                      min={1}
                      max={150}
                      value={formData.headcountNeeded}
                      onChange={(e) => setFormData({ ...formData, headcountNeeded: parseInt(e.target.value) })}
                      className="w-full accent-[#1E40AF] cursor-pointer"
                    />
                    <div className="flex justify-between text-[10px] text-slate-400">
                      <span>1-5 (Pilot squad)</span>
                      <span>20-50 (Surge shift)</span>
                      <span>100+ (Turnkey line)</span>
                    </div>
                  </div>

                  <div className="pt-3 flex justify-end">
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="px-6 py-2.5 rounded-xl bg-[#1E40AF] hover:bg-[#1D4ED8] text-white font-bold text-xs flex items-center gap-1.5 shadow-md shadow-blue-900/20"
                    >
                      <span>Continue to Logistics</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* Step 2: Urgency & Logistics */}
              {step === 2 && (
                <div className="space-y-5 animate-in fade-in">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                      When do you need workers onsite?
                    </label>
                    <div className="grid grid-cols-2 gap-2.5">
                      {[
                        'Immediate (1-3 days)',
                        'Within 2 weeks',
                        'Next month',
                        'Planning ahead'
                      ].map((u) => (
                        <button
                          type="button"
                          key={u}
                          onClick={() => setFormData({ ...formData, urgency: u as any })}
                          className={`p-3 rounded-xl border text-left text-xs font-semibold transition-all ${
                            formData.urgency === u
                              ? 'border-[#1E40AF] bg-blue-50 text-[#1E40AF] font-bold ring-1 ring-blue-500/30'
                              : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                          }`}
                        >
                          {u}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
                    <div className="text-xs font-bold text-slate-800">Support Logistics Managed by Bluegate Work:</div>
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.requiresAccommodation}
                        onChange={(e) => setFormData({ ...formData, requiresAccommodation: e.target.checked })}
                        className="mt-0.5 w-4 h-4 rounded text-[#1E40AF] focus:ring-[#1E40AF]"
                      />
                      <div>
                        <div className="text-xs font-bold text-slate-800">Include Certified Housing & Commute Transport</div>
                        <div className="text-[11px] text-slate-500">
                          We manage SNF-inspected accommodation and daily site shuttles for all deployed workers.
                        </div>
                      </div>
                    </label>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                      Specific Skills, Shift Details or Requirements (Optional)
                    </label>
                    <textarea
                      rows={3}
                      value={formData.additionalDetails}
                      onChange={(e) => setFormData({ ...formData, additionalDetails: e.target.value })}
                      placeholder="e.g. 10 Reach truck drivers with certified VCA, 3 shifts rotating, starting next Monday in Rotterdam..."
                      className="w-full p-3 rounded-xl border border-slate-300 text-xs focus:outline-none focus:ring-2 focus:ring-[#1E40AF]"
                    />
                  </div>

                  <div className="pt-3 flex justify-between">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="px-4 py-2.5 rounded-xl text-slate-600 font-semibold text-xs hover:bg-slate-100"
                    >
                      Back
                    </button>
                    <button
                      type="button"
                      onClick={() => setStep(3)}
                      className="px-6 py-2.5 rounded-xl bg-[#1E40AF] hover:bg-[#1D4ED8] text-white font-bold text-xs flex items-center gap-1.5 shadow-md shadow-blue-900/20"
                    >
                      <span>Continue to Contact Info</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* Step 3: Contact Information */}
              {step === 3 && (
                <div className="space-y-4 animate-in fade-in">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Company Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.companyName}
                        onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                        placeholder="e.g. Logistics Park Europe"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:outline-none focus:ring-2 focus:ring-[#1E40AF]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Contact Person Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.contactPerson}
                        onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
                        placeholder="e.g. Maria Santos / Jan de Jong"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:outline-none focus:ring-2 focus:ring-[#1E40AF]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Corporate Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="hr@yourcompany.com"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:outline-none focus:ring-2 focus:ring-[#1E40AF]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Direct Phone / WhatsApp *
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+351 920 ... or +31 6 ..."
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:outline-none focus:ring-2 focus:ring-[#1E40AF]"
                      />
                    </div>
                  </div>

                  <div className="p-3 bg-blue-50 rounded-xl border border-blue-200 text-[11px] text-blue-900 flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-[#1E40AF] shrink-0" />
                    <span>Your data is strictly confidential. Bluegate Work complies with EU GDPR and labor confidentiality laws.</span>
                  </div>

                  <div className="pt-3 flex justify-between items-center">
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="px-4 py-2.5 rounded-xl text-slate-600 font-semibold text-xs hover:bg-slate-100"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      id="submit-workforce-quote"
                      className="px-8 py-3 rounded-xl bg-gradient-to-r from-[#F59E0B] to-[#D97706] hover:from-[#FBBF24] hover:to-[#F59E0B] text-slate-950 font-black text-xs uppercase tracking-wider shadow-lg shadow-amber-900/20 flex items-center gap-2 cursor-pointer"
                    >
                      <span>Submit & Receive Proposal</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
