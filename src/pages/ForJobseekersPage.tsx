import React from 'react';
import { 
  Users, 
  Building2, 
  Home, 
  Truck, 
  CheckCircle2, 
  ShieldCheck, 
  ArrowRight, 
  Sparkles,
  FileCheck,
  Briefcase,
  Layers,
  HeartHandshake,
  Clock,
  Award
} from 'lucide-react';
import { PageId, JobPosting } from '../types';
import { COMPANY_INFO } from '../data/mockData';

interface ForJobseekersPageProps {
  onNavigate: (page: PageId) => void;
  onApplyJob: (job?: JobPosting | null) => void;
}

export const ForJobseekersPage: React.FC<ForJobseekersPageProps> = ({
  onNavigate,
  onApplyJob
}) => {
  return (
    <div className="space-y-16 sm:space-y-20 pb-16">
      {/* Candidate Hero */}
      <section className="bg-gradient-to-b from-[#EFF6FF] via-white to-white pt-10 pb-14 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3.5 py-1.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider">
              Zero Recruitment Fees • Guaranteed Legal Employment
            </span>
            <span className="px-3 py-1 rounded-full bg-blue-100 text-[#1E40AF] text-xs font-semibold">
              Verified Housing & Daily Commute Included
            </span>
          </div>

          <div className="max-w-3xl space-y-3">
            <h1 className="text-3xl sm:text-5xl font-black text-slate-950 font-heading tracking-tight leading-[1.15]">
              European Career Pathways & Legal Employment in Portugal & Netherlands.
            </h1>
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
              Find secure employment with leading European companies. Bluegate Work manages your legal contracts, tax numbers (NIF/BSN), health insurance, certified single/twin accommodation, and punctual salary payments.
            </p>
          </div>

          <div className="pt-2 flex flex-wrap gap-3">
            <button
              id="jobseeker-hero-apply-btn"
              onClick={() => onApplyJob(null)}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#1E40AF] to-[#2563EB] text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-blue-900/20 flex items-center gap-2 hover:opacity-95 transition-opacity cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>Submit General Candidate Application</span>
            </button>
            <a
              href={COMPANY_INFO.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-2 transition-colors shadow-md shadow-emerald-900/10 cursor-pointer"
            >
              <span>WhatsApp Recruiter</span>
            </a>
          </div>
        </div>
      </section>

      {/* Candidate Fast Registration & Talent Pool Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-md shadow-blue-950/5 space-y-8">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 pb-6 border-b border-slate-100">
            <div className="space-y-2 max-w-2xl">
              <div className="inline-flex items-center gap-2 text-xs font-bold text-[#1E40AF] uppercase tracking-wider">
                <Briefcase className="w-4 h-4 text-blue-600" />
                <span>European Talent Network</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 font-heading">
                Direct Candidate Placement & Career Sourcing
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                We continuously match qualified, motivated workers with vetted European industrial employers across Portugal and the Netherlands. Submit your profile to join our active recruitment pipeline.
              </p>
            </div>
            <button
              id="jobseeker-join-talent-btn"
              onClick={() => onApplyJob(null)}
              className="px-6 py-3 rounded-xl bg-[#1E40AF] hover:bg-[#1D4ED8] text-white font-bold text-xs uppercase tracking-wider shadow-md shadow-blue-900/20 flex items-center gap-2 shrink-0 cursor-pointer"
            >
              <span>Register Your Profile</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* 4-Step Placement Roadmap */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 space-y-3">
              <div className="w-9 h-9 rounded-xl bg-blue-100 text-[#1E40AF] font-black text-sm flex items-center justify-center">
                01
              </div>
              <h3 className="text-sm font-bold text-slate-900">1. Digital Registration</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Submit your CV, work history, and language capabilities via our secure application system.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 space-y-3">
              <div className="w-9 h-9 rounded-xl bg-blue-100 text-[#1E40AF] font-black text-sm flex items-center justify-center">
                02
              </div>
              <h3 className="text-sm font-bold text-slate-900">2. Assessment & Match</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Our recruitment consultants conduct skill checks and pair you with verified employers matching your profile.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 space-y-3">
              <div className="w-9 h-9 rounded-xl bg-blue-100 text-[#1E40AF] font-black text-sm flex items-center justify-center">
                03
              </div>
              <h3 className="text-sm font-bold text-slate-900">3. Legal Documentation</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                We assist with your official employment contracts, tax number issuance (NIF/BSN), and social security.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 space-y-3">
              <div className="w-9 h-9 rounded-xl bg-blue-100 text-[#1E40AF] font-black text-sm flex items-center justify-center">
                04
              </div>
              <h3 className="text-sm font-bold text-slate-900">4. Arrival & Support</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Move into certified housing, receive commute transportation, and start work with bilingual coordinator guidance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Sourcing Sectors */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="px-3 py-1 rounded-full bg-blue-100 text-[#1E40AF] text-xs font-bold uppercase tracking-wider">
            Placement Verticals
          </span>
          <h2 className="text-3xl font-black text-slate-950 font-heading tracking-tight">
            Key Industry Sectors We Staff
          </h2>
          <p className="text-xs sm:text-sm text-slate-600">
            We provide structured career pathways across high-demand European industries.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#1E40AF] flex items-center justify-center">
              <Truck className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Logistics & E-Commerce</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Order pickers, reach truck operators, parcel sorters, inventory controllers, and dispatch teams in modern fulfillment centers.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <Layers className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Agri-Food & Greenhouses</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              High-tech horticulture, crop cultivation, harvesting, modern packing lines, and climate-controlled greenhouse operations.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center">
              <Building2 className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Manufacturing & Industry</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Assembly technicians, machine operators, CNC operators, quality inspectors, and industrial maintenance personnel.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center">
              <Briefcase className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Technical & Operations</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Electricians, welders, certified forklift drivers, solar technicians, and specialized mechanical specialists.
            </p>
          </div>
        </div>
      </section>

      {/* Candidate Onboarding & Relocation Shield */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#0B1528] rounded-3xl p-8 sm:p-12 text-white border border-slate-800 space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-amber-400 text-xs font-bold uppercase tracking-wider">
              Complete Worker Care
            </span>
            <h2 className="text-2xl sm:text-3xl font-black font-heading text-white">
              What Bluegate Work Provides For Every Placed Candidate
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-5 rounded-2xl bg-white/10 border border-white/10 space-y-2">
              <Home className="w-6 h-6 text-amber-400" />
              <h3 className="text-sm font-bold text-white">Verified SNF Housing</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Clean, safe, furnished single or twin bedrooms with high-speed WiFi, modern kitchens, and laundry facilities.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white/10 border border-white/10 space-y-2">
              <Truck className="w-6 h-6 text-blue-400" />
              <h3 className="text-sm font-bold text-white">Free Commute Transport</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Dedicated company shuttle vans or e-bikes to ensure safe, punctual transit between your accommodation and workplace.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white/10 border border-white/10 space-y-2">
              <ShieldCheck className="w-6 h-6 text-emerald-400" />
              <h3 className="text-sm font-bold text-white">Legal Documents & Tax IDs</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                We accompany you to register your Portuguese NIF or Dutch BSN, set up local bank accounts, and enroll in national health insurance.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white/10 border border-white/10 space-y-2">
              <Users className="w-6 h-6 text-purple-400" />
              <h3 className="text-sm font-bold text-white">Bilingual Coordinators</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Dedicated coordinators on-site who speak your language, helping with work instructions, medical appointments, and local orientation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Fair Work & Ethical Guarantees */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-blue-900 to-[#1E40AF] rounded-3xl p-8 sm:p-10 text-white flex flex-col md:flex-row items-center justify-between gap-8 shadow-xl">
          <div className="space-y-3 max-w-xl">
            <div className="inline-flex items-center gap-2 text-xs font-bold text-amber-300 uppercase tracking-wider">
              <Award className="w-4 h-4" />
              <span>Ethical Recruitment Guarantee</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black font-heading text-white">
              Ready to take the next step in your European career?
            </h2>
            <p className="text-xs sm:text-sm text-blue-100 leading-relaxed">
              Submit your CV or connect with our international placement officers directly on WhatsApp to explore open opportunities.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full sm:w-auto">
            <button
              id="jobseeker-cta-apply-btn"
              onClick={() => onApplyJob(null)}
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs uppercase tracking-wider shadow-lg flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <Sparkles className="w-4 h-4" />
              <span>Apply Now</span>
            </button>
            <a
              href={COMPANY_INFO.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs border border-white/20 flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <span>Contact via WhatsApp</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
