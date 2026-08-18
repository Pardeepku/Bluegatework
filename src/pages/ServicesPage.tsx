import React from 'react';
import { 
  Users, 
  Briefcase, 
  Globe, 
  ArrowRight, 
  CheckCircle2, 
  ShieldCheck, 
  Zap, 
  Clock, 
  Layers,
  Sparkles
} from 'lucide-react';
import { PageId } from '../types';
import { CORE_SERVICES } from '../data/mockData';

interface ServicesPageProps {
  onNavigate: (page: PageId) => void;
  onRequestQuote: () => void;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({ onNavigate, onRequestQuote }) => {
  return (
    <div className="space-y-16 sm:space-y-20 pb-16">
      {/* Header */}
      <section className="bg-gradient-to-b from-[#EFF6FF] via-white to-white pt-10 pb-14 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100 text-[#1E40AF] text-xs font-bold uppercase tracking-wider">
            <Layers className="w-3.5 h-3.5" />
            <span>Comprehensive Workforce Portfolio</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-slate-950 font-heading tracking-tight max-w-3xl">
            Strategic Staffing & Workforce Solutions for Europe & Beyond.
          </h1>
          <p className="text-base sm:text-lg text-slate-600 max-w-2xl leading-relaxed">
            From emergency 48-hour temporary worker deployments to full-facility operational outsourcing and global visa recruitment corridors, Bluegate Work provides agile labor capacity with 100% legal compliance.
          </p>

          <div className="pt-4 flex flex-wrap gap-3">
            <button
              onClick={onRequestQuote}
              className="px-6 py-3 rounded-xl bg-[#1E40AF] hover:bg-[#1D4ED8] text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-blue-900/20"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>Request Custom Workforce Plan</span>
            </button>
          </div>
        </div>
      </section>

      {/* 3 Core Services Detailed Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="space-y-8">
          {CORE_SERVICES.map((srv, index) => (
            <div
              key={srv.id}
              className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-xl shadow-blue-950/5 hover:border-blue-300 transition-all grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
            >
              {/* Left Column */}
              <div className="lg:col-span-7 space-y-5">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-blue-100 text-[#1E40AF] flex items-center justify-center">
                    {srv.id === 'temporary-staffing' && <Users className="w-6 h-6" />}
                    {srv.id === 'outsourcing' && <Briefcase className="w-6 h-6" />}
                    {srv.id === 'international-recruitment' && <Globe className="w-6 h-6" />}
                  </div>
                  <div>
                    <span className="text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900">
                      {srv.badge}
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-heading">
                      {srv.title}
                    </h2>
                  </div>
                </div>

                <p className="text-sm font-semibold text-blue-700">
                  {srv.tagline}
                </p>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {srv.fullDescription}
                </p>

                {/* Key Benefits */}
                <div className="space-y-2 pt-2 border-t border-slate-100">
                  <div className="text-xs font-bold text-slate-900">Key Capabilities & Advantages:</div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {srv.keyBenefits.map((b, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-slate-700">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{b}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-2 flex items-center gap-4">
                  <button
                    id={`services-explore-${srv.id}`}
                    onClick={() => onNavigate(srv.pageId)}
                    className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-[#1E40AF] text-white font-bold text-xs transition-colors flex items-center gap-1.5"
                  >
                    <span>View Dedicated {srv.title} Page</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <button
                    onClick={onRequestQuote}
                    className="px-5 py-2.5 rounded-xl text-[#1E40AF] font-bold text-xs hover:bg-blue-50 border border-blue-200"
                  >
                    Request Staff
                  </button>
                </div>
              </div>

              {/* Right Column: Statistics & Highlights Card */}
              <div className="lg:col-span-5 bg-gradient-to-br from-[#0F2B68] to-[#1E40AF] rounded-3xl p-6 sm:p-7 text-white shadow-xl space-y-6">
                <div className="text-xs font-bold uppercase tracking-wider text-amber-300">
                  Performance & SLA Guarantee
                </div>

                <div className="space-y-3">
                  {srv.stats.map((st, i) => (
                    <div key={i} className="p-3.5 rounded-2xl bg-white/10 border border-white/10 flex items-center justify-between">
                      <span className="text-xs text-blue-100">{st.label}</span>
                      <span className="text-base font-black text-white">{st.value}</span>
                    </div>
                  ))}
                </div>

                <div className="p-3.5 rounded-2xl bg-emerald-950/60 border border-emerald-500/30 text-[11px] text-emerald-200 space-y-1">
                  <div className="font-bold flex items-center gap-1.5 text-emerald-300">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Legal Compliance Assurance</span>
                  </div>
                  <p>{srv.complianceAssurance}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Comparison Matrix Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h3 className="text-2xl font-black text-slate-950 font-heading">
            Which Service Model Fits Your Operational Needs?
          </h3>
          <p className="text-xs sm:text-sm text-slate-600">
            Compare our three workforce engagement models side-by-side.
          </p>
        </div>

        <div className="bg-white rounded-3xl border border-slate-200 shadow-md overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-800 font-extrabold uppercase">
                <th className="p-4 sm:p-5">Feature / Metric</th>
                <th className="p-4 sm:p-5 text-[#1E40AF]">Temporary Staffing</th>
                <th className="p-4 sm:p-5 text-[#1E40AF]">Workforce Outsourcing</th>
                <th className="p-4 sm:p-5 text-[#1E40AF]">International Recruitment</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              <tr>
                <td className="p-4 font-bold text-slate-900">Deployment Speed</td>
                <td className="p-4 font-semibold text-emerald-700">48 - 72 Hours</td>
                <td className="p-4">1 - 2 Weeks</td>
                <td className="p-4">3 - 6 Weeks (Visa based)</td>
              </tr>
              <tr>
                <td className="p-4 font-bold text-slate-900">Daily Line Supervision</td>
                <td className="p-4">Client managed (or optional lead)</td>
                <td className="p-4 font-semibold text-emerald-700">100% Bluegate Onsite Team Lead</td>
                <td className="p-4">Client managed with Bluegate onboarding</td>
              </tr>
              <tr>
                <td className="p-4 font-bold text-slate-900">Payroll & Legal Employer</td>
                <td className="p-4 font-semibold text-emerald-700">Bluegate Work (100% Liability Shield)</td>
                <td className="p-4 font-semibold text-emerald-700">Bluegate Work (SLA based)</td>
                <td className="p-4">Direct Client or Bluegate ETT option</td>
              </tr>
              <tr>
                <td className="p-4 font-bold text-slate-900">Housing & Commute</td>
                <td className="p-4">Fully Managed by Bluegate</td>
                <td className="p-4">Fully Managed by Bluegate</td>
                <td className="p-4">Turnkey Relocation & Accommodation</td>
              </tr>
              <tr>
                <td className="p-4 font-bold text-slate-900">Ideal For</td>
                <td className="p-4">Seasonal peaks, sudden surges, shift fills</td>
                <td className="p-4">Whole production lines, sorting, picking</td>
                <td className="p-4">Hard-to-fill technical & high-volume trades</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};
