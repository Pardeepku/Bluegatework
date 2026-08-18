import React, { useState } from 'react';
import { Calculator, Users, Clock, ShieldCheck, Zap, ArrowRight, Building2, CheckCircle2 } from 'lucide-react';
import { INDUSTRIES } from '../data/mockData';

interface TalentMatchCalculatorProps {
  onRequestQuote: () => void;
}

export const TalentMatchCalculator: React.FC<TalentMatchCalculatorProps> = ({ onRequestQuote }) => {
  const [industry, setIndustry] = useState('logistics');
  const [country, setCountry] = useState('Portugal');
  const [headcount, setHeadcount] = useState(12);
  const [serviceTier, setServiceTier] = useState<'temporary' | 'outsourcing' | 'international'>('temporary');

  // Dynamic calculations based on state
  const selectedInd = INDUSTRIES.find((i) => i.id === industry) || INDUSTRIES[0];

  const deploymentHours = serviceTier === 'temporary' ? (country === 'Portugal' ? '48 Hours' : '72 Hours') : serviceTier === 'outsourcing' ? '1-2 Weeks' : '3-4 Weeks';
  const complianceScore = '100% Guaranteed (ACT & NEN 4400-1)';
  const activeBenchCount = (headcount * 4.5).toFixed(0);
  const estimatedSavings = serviceTier === 'outsourcing' ? '22% Operational Savings' : 'Zero Internal HR Overhead';

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 lg:p-10 shadow-xl shadow-blue-950/5 border border-slate-200/80">
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center">
        {/* Left: Input Controls */}
        <div className="w-full lg:w-7/12 space-y-6">
          <div className="flex items-center gap-2 text-xs font-bold text-[#1E40AF] uppercase tracking-wider">
            <Calculator className="w-4 h-4 text-amber-500" />
            <span>Interactive Workforce Sizing & Availability Engine</span>
          </div>

          <div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-heading tracking-tight">
              Estimate Your Workforce Readiness
            </h3>
            <p className="text-slate-500 text-xs sm:text-sm mt-1">
              Select your operational parameters to calculate verified talent availability, legal compliance timelines, and deployment estimates.
            </p>
          </div>

          {/* Service Selector */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              1. Engagement Model
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'temporary', label: 'Temporary Staffing', badge: 'Rapid 48h' },
                { id: 'outsourcing', label: 'Workforce Outsourcing', badge: 'Turnkey SLA' },
                { id: 'international', label: 'Global Recruitment', badge: 'Worldwide' }
              ].map((tier) => (
                <button
                  type="button"
                  key={tier.id}
                  onClick={() => setServiceTier(tier.id as any)}
                  className={`p-3 rounded-2xl border text-left transition-all ${
                    serviceTier === tier.id
                      ? 'border-[#1E40AF] bg-blue-50/80 ring-2 ring-blue-500/20 text-[#1E40AF] font-bold'
                      : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  <div className="text-xs">{tier.label}</div>
                  <div className="text-[10px] text-amber-700 font-semibold mt-0.5">{tier.badge}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Country & Industry Dropdowns */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                2. Deployment Country
              </label>
              <select
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[#1E40AF]"
              >
                <option value="Portugal">Portugal (Mainland & Santarém HQ)</option>
                <option value="Netherlands">Netherlands (Benelux Distribution)</option>
                <option value="Germany">Germany & Central Europe</option>
                <option value="France">France</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                3. Industry Sector
              </label>
              <select
                value={industry}
                onChange={(e) => setIndustry(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[#1E40AF]"
              >
                {INDUSTRIES.map((ind) => (
                  <option key={ind.id} value={ind.id}>
                    {ind.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Headcount Slider */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs font-bold text-slate-700">
              <span className="uppercase tracking-wider">4. Required Personnel:</span>
              <span className="text-base font-extrabold text-[#1E40AF] px-3 py-1 bg-blue-50 rounded-lg border border-blue-200">
                {headcount} Workers
              </span>
            </div>
            <input
              type="range"
              min={3}
              max={120}
              step={1}
              value={headcount}
              onChange={(e) => setHeadcount(parseInt(e.target.value))}
              className="w-full accent-[#1E40AF] h-2 bg-slate-200 rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[11px] text-slate-400">
              <span>Small Shift (3-10)</span>
              <span>Medium Facility (25-50)</span>
              <span>Enterprise Line (100+)</span>
            </div>
          </div>
        </div>

        {/* Right: Calculated Readiness Dashboard Card */}
        <div className="w-full lg:w-5/12 bg-gradient-to-br from-[#0F2B68] via-[#1E40AF] to-[#1D4ED8] rounded-3xl p-6 sm:p-8 text-white shadow-xl shadow-blue-900/30 relative overflow-hidden flex flex-col justify-between">
          <div className="absolute -right-8 -top-8 w-40 h-40 bg-amber-400/10 rounded-full blur-2xl" />

          <div className="relative space-y-5">
            <div className="flex items-center justify-between border-b border-blue-400/20 pb-4">
              <div>
                <span className="text-[11px] text-blue-200 uppercase font-semibold">Active Pipeline</span>
                <div className="text-2xl font-black font-heading text-white">{activeBenchCount}+ Candidates</div>
              </div>
              <div className="px-3 py-1 bg-emerald-500/20 border border-emerald-400/30 rounded-full text-[11px] text-emerald-300 font-bold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Pre-Vetted Bench</span>
              </div>
            </div>

            {/* Metric Rows */}
            <div className="space-y-3 text-xs">
              <div className="flex items-center justify-between p-3 rounded-xl bg-white/10 backdrop-blur-sm border border-white/10">
                <div className="flex items-center gap-2 text-blue-200">
                  <Clock className="w-4 h-4 text-amber-300" />
                  <span>Deployment Speed</span>
                </div>
                <span className="font-extrabold text-white">{deploymentHours}</span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-white/10 backdrop-blur-sm border border-white/10">
                <div className="flex items-center gap-2 text-blue-200">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>Compliance Security</span>
                </div>
                <span className="font-extrabold text-white text-[11px]">{complianceScore}</span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-white/10 backdrop-blur-sm border border-white/10">
                <div className="flex items-center gap-2 text-blue-200">
                  <Zap className="w-4 h-4 text-amber-400" />
                  <span>Cost Efficiency</span>
                </div>
                <span className="font-extrabold text-amber-300">{estimatedSavings}</span>
              </div>
            </div>

            <div className="text-[11px] text-blue-200/90 leading-relaxed pt-1">
              Includes full payroll administration, social security, worker accident insurance, and optional housing & transport.
            </div>
          </div>

          <div className="pt-6 mt-4 border-t border-blue-400/20">
            <button
              id="calculator-lock-roster-btn"
              onClick={onRequestQuote}
              className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-[#F59E0B] to-[#D97706] hover:from-[#FBBF24] hover:to-[#F59E0B] text-slate-950 font-extrabold text-xs uppercase tracking-wider shadow-lg shadow-amber-950/30 flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <span>Lock In Talent Roster Proposal</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
