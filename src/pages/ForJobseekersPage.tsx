import React, { useState } from 'react';
import { 
  Users, 
  Search, 
  MapPin, 
  Building2, 
  DollarSign, 
  Home, 
  Truck, 
  CheckCircle2, 
  ShieldCheck, 
  ArrowRight, 
  Filter,
  Sparkles,
  HelpCircle
} from 'lucide-react';
import { PageId, JobPosting } from '../types';
import { ACTIVE_JOBS, COMPANY_INFO } from '../data/mockData';

interface ForJobseekersPageProps {
  onNavigate: (page: PageId) => void;
  onApplyJob: (job?: JobPosting | null) => void;
}

export const ForJobseekersPage: React.FC<ForJobseekersPageProps> = ({
  onNavigate,
  onApplyJob
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCountry, setSelectedCountry] = useState<string>('All');
  const [selectedIndustry, setSelectedIndustry] = useState<string>('All');

  // Filter jobs dynamically
  const filteredJobs = ACTIVE_JOBS.filter((job) => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          job.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          job.industry.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCountry = selectedCountry === 'All' || job.country === selectedCountry;
    const matchesIndustry = selectedIndustry === 'All' || job.industry.includes(selectedIndustry);

    return matchesSearch && matchesCountry && matchesIndustry;
  });

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
              Verified Jobs in Portugal & Netherlands with Safe Accommodation.
            </h1>
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
              Find secure employment with leading European companies. Bluegate Work manages your legal contracts, tax numbers (NIF/BSN), health insurance, certified single/twin accommodation, and punctual weekly salary payments.
            </p>
          </div>

          <div className="pt-2 flex flex-wrap gap-3">
            <button
              onClick={() => onApplyJob(null)}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#1E40AF] to-[#2563EB] text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-blue-900/20 flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>Submit General CV Application</span>
            </button>
            <a
              href={COMPANY_INFO.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-2 transition-colors"
            >
              <span>WhatsApp Recruiter</span>
            </a>
          </div>
        </div>
      </section>

      {/* Search & Job Board Filters */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-md shadow-blue-950/5 space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-bold text-[#1E40AF] uppercase tracking-wider">
              <Search className="w-4 h-4 text-blue-600" />
              <span>Live European Job Search ({filteredJobs.length} Available Openings)</span>
            </div>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCountry('All');
                setSelectedIndustry('All');
              }}
              className="text-xs text-slate-400 hover:text-slate-700 font-semibold"
            >
              Reset Filters
            </button>
          </div>

          {/* Search Inputs Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search job title, skills, keyword..."
                className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:outline-none focus:ring-2 focus:ring-[#1E40AF]"
              />
            </div>

            <div>
              <select
                value={selectedCountry}
                onChange={(e) => setSelectedCountry(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[#1E40AF]"
              >
                <option value="All">All Countries (Portugal & Netherlands)</option>
                <option value="Portugal">Portugal (Santarém, Lisbon, Algarve)</option>
                <option value="Netherlands">Netherlands (Rotterdam, Tilburg, Westland)</option>
              </select>
            </div>

            <div>
              <select
                value={selectedIndustry}
                onChange={(e) => setSelectedIndustry(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[#1E40AF]"
              >
                <option value="All">All Sectors</option>
                <option value="Logistics">Logistics & Warehousing</option>
                <option value="Agriculture">Agriculture & Horticulture</option>
                <option value="Manufacturing">Manufacturing & Automotive</option>
                <option value="Construction">Construction & Engineering</option>
                <option value="Technical">Technical & Transport</option>
              </select>
            </div>
          </div>
        </div>

        {/* Job Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredJobs.length > 0 ? (
            filteredJobs.map((job) => (
              <div
                key={job.id}
                className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-md shadow-blue-950/5 hover:border-blue-400 hover:shadow-xl transition-all flex flex-col justify-between space-y-4 group"
              >
                <div className="space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-extrabold px-2.5 py-1 rounded-full bg-blue-50 text-[#1E40AF]">
                        {job.country}
                      </span>
                      <span className="text-xs font-bold text-slate-500 flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-slate-400" />
                        <span>{job.location}</span>
                      </span>
                    </div>
                    <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                      {job.vacancies} Openings
                    </span>
                  </div>

                  <h3 className="text-lg font-black text-slate-900 font-heading group-hover:text-[#1E40AF] transition-colors">
                    {job.title}
                  </h3>

                  <div className="text-xs font-extrabold text-slate-900 bg-amber-50 p-2.5 rounded-xl border border-amber-200/60 text-amber-900 flex items-center gap-1.5">
                    <DollarSign className="w-4 h-4 text-amber-700 shrink-0" />
                    <span>{job.salaryRange}</span>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">
                    {job.description}
                  </p>

                  {/* Highlights (Accommodation, Transport) */}
                  <div className="flex flex-wrap gap-2 pt-1">
                    {job.accommodationProvided && (
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-1 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200">
                        <Home className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Certified Housing Provided</span>
                      </span>
                    )}
                    {job.transportProvided && (
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-1 rounded-lg bg-blue-50 text-[#1E40AF] border border-blue-200">
                        <Truck className="w-3.5 h-3.5 text-blue-600" />
                        <span>Commute Transport Included</span>
                      </span>
                    )}
                  </div>
                </div>

                {/* Card Actions */}
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] text-slate-400 font-medium">
                    Language: {job.languageRequired}
                  </span>
                  <button
                    id={`apply-job-btn-${job.id}`}
                    onClick={() => onApplyJob(job)}
                    className="px-5 py-2.5 rounded-xl bg-[#1E40AF] hover:bg-[#1D4ED8] text-white font-bold text-xs uppercase tracking-wider shadow-md shadow-blue-900/20 flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>Apply Now</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-2 text-center py-12 bg-white rounded-3xl border border-slate-200 p-8 space-y-3">
              <Users className="w-12 h-12 text-slate-300 mx-auto" />
              <div className="text-base font-bold text-slate-800">No matching jobs found with current filter</div>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Try searching with different keywords or submit a general CV application and our European recruitment team will match you.
              </p>
              <button
                onClick={() => onApplyJob(null)}
                className="px-5 py-2.5 bg-[#1E40AF] text-white font-bold text-xs rounded-xl"
              >
                Submit General Application
              </button>
            </div>
          )}
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
              <h4 className="text-sm font-bold text-white">Verified SNF Housing</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Clean, safe, furnished single or twin bedrooms with high-speed WiFi, modern kitchens, and laundry facilities.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white/10 border border-white/10 space-y-2">
              <Truck className="w-6 h-6 text-blue-400" />
              <h4 className="text-sm font-bold text-white">Free Commute Transport</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Dedicated company shuttle vans or e-bikes to ensure safe, punctual transit between your accommodation and workplace.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white/10 border border-white/10 space-y-2">
              <ShieldCheck className="w-6 h-6 text-emerald-400" />
              <h4 className="text-sm font-bold text-white">Legal Documents & Tax IDs</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                We accompany you to register your Portuguese NIF or Dutch BSN, set up local bank accounts, and enroll in national health insurance.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white/10 border border-white/10 space-y-2">
              <Users className="w-6 h-6 text-purple-400" />
              <h4 className="text-sm font-bold text-white">Bilingual Coordinators</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Dedicated coordinators on-site who speak your language, helping with work instructions, medical appointments, and local orientation.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
