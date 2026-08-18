import React from 'react';
import { 
  Building2, 
  ShieldCheck, 
  Clock, 
  Award, 
  Users, 
  ArrowRight, 
  CheckCircle2, 
  FileCheck, 
  Sparkles,
  Phone,
  MessageSquare
} from 'lucide-react';
import { PageId } from '../types';
import { COMPANY_INFO, COMPLIANCE_STANDARDS } from '../data/mockData';
import { TalentMatchCalculator } from '../components/TalentMatchCalculator';

interface ForEmployersPageProps {
  onNavigate: (page: PageId) => void;
  onRequestQuote: () => void;
}

export const ForEmployersPage: React.FC<ForEmployersPageProps> = ({
  onNavigate,
  onRequestQuote
}) => {
  return (
    <div className="space-y-16 sm:space-y-20 pb-16">
      {/* Employer Hero */}
      <section className="bg-gradient-to-b from-[#EFF6FF] via-white to-white pt-10 pb-16 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100 text-[#1E40AF] text-xs font-bold uppercase tracking-wider">
            <Building2 className="w-3.5 h-3.5" />
            <span>B2B European Staffing & Managed Workforce Hub</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <h1 className="text-3xl sm:text-5xl font-black text-slate-950 font-heading tracking-tight leading-[1.15]">
                Reliable Workforce Scalability with Guaranteed Compliance.
              </h1>
              <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
                Whether you need a 10-person shift in Santarém or 50 reach truck operators in Rotterdam, Bluegate Work provides pre-screened, legal, and housed personnel with 24/7 dedicated supervision.
              </p>

              <div className="pt-4 flex flex-wrap gap-3">
                <button
                  id="b2b-hero-quote-btn"
                  onClick={onRequestQuote}
                  className="px-7 py-3.5 rounded-xl bg-[#1E40AF] hover:bg-[#1D4ED8] text-white font-extrabold text-xs uppercase tracking-wider shadow-lg shadow-blue-900/20 flex items-center gap-2"
                >
                  <Sparkles className="w-4 h-4 text-amber-300" />
                  <span>Request Staffing Proposal</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <a
                  href={COMPANY_INFO.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-2 transition-colors"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Direct WhatsApp Line</span>
                </a>
              </div>
            </div>

            {/* Right Card: SLA Checklist */}
            <div className="lg:col-span-5 bg-gradient-to-br from-[#0F2B68] via-[#1E40AF] to-[#1D4ED8] rounded-3xl p-7 text-white shadow-xl space-y-4">
              <h3 className="text-base font-bold text-amber-300 font-heading">
                The Bluegate B2B Service Guarantee
              </h3>
              <ul className="space-y-2.5 text-xs text-blue-100">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>48-72h Rapid Deployment:</strong> Fast replacement and surge capacity from active talent benches.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>100% Legal Indemnity:</strong> We handle all payroll, taxes, insurance, and Portuguese/Dutch labor filings.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Certified Accommodation & Transport:</strong> Full housing and daily site commute logistics managed by Bluegate.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Dedicated Field Coordinators:</strong> Bilingual supervisors on-site for daily attendance and QA.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Calculator Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <TalentMatchCalculator onRequestQuote={onRequestQuote} />
      </section>

      {/* Compliance Framework */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold text-[#1E40AF] uppercase tracking-wider">
            Risk-Free Partnership
          </span>
          <h2 className="text-3xl font-black text-slate-950 font-heading">
            Strict Labor Regulatory Compliance
          </h2>
          <p className="text-xs sm:text-sm text-slate-600">
            We insulate our enterprise clients from joint liability and regulatory penalties.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {COMPLIANCE_STANDARDS.map((std, i) => (
            <div key={i} className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-2">
              <span className="text-xs font-bold text-[#1E40AF] bg-blue-50 px-2 py-0.5 rounded">
                {std.badge}
              </span>
              <h4 className="text-sm font-bold text-slate-900 pt-1">{std.title}</h4>
              <p className="text-xs text-slate-600 leading-relaxed">{std.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Direct Contact Callout */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-10 rounded-3xl bg-[#0B1528] text-white flex flex-col md:flex-row items-center justify-between gap-6 border border-slate-800">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="text-2xl font-black font-heading">Talk Directly with an Executive Recruiter</h3>
            <p className="text-xs sm:text-sm text-slate-300">
              Get immediate availability estimates for your facility in Portugal, Netherlands, or Europe.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <a
              href={`tel:${COMPANY_INFO.phone.replace(/\s+/g, '')}`}
              className="px-5 py-3 rounded-xl bg-white text-slate-900 font-bold text-xs hover:bg-slate-100 flex items-center justify-center gap-2"
            >
              <Phone className="w-4 h-4 text-blue-600" />
              <span>Call: {COMPANY_INFO.phoneDisplay}</span>
            </a>
            <button
              onClick={onRequestQuote}
              className="px-5 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs uppercase tracking-wider transition-colors"
            >
              Submit Staffing Requisition
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
