import React, { useState } from 'react';
import { 
  Package, 
  Sprout, 
  HardHat, 
  Cpu, 
  Utensils, 
  Truck, 
  ArrowRight, 
  ShieldCheck, 
  Clock, 
  MapPin, 
  Sparkles 
} from 'lucide-react';
import { PageId } from '../types';
import { INDUSTRIES } from '../data/mockData';

interface IndustriesPageProps {
  onNavigate: (page: PageId) => void;
  onRequestQuote: () => void;
}

export const IndustriesPage: React.FC<IndustriesPageProps> = ({ onNavigate, onRequestQuote }) => {
  const [selectedIndustry, setSelectedIndustry] = useState<string>('logistics');

  const activeInd = INDUSTRIES.find((i) => i.id === selectedIndustry) || INDUSTRIES[0];

  const getIndustryIcon = (iconName: string) => {
    switch (iconName) {
      case 'Package': return <Package className="w-6 h-6" />;
      case 'Sprout': return <Sprout className="w-6 h-6" />;
      case 'HardHat': return <HardHat className="w-6 h-6" />;
      case 'Cpu': return <Cpu className="w-6 h-6" />;
      case 'Utensils': return <Utensils className="w-6 h-6" />;
      case 'Truck': return <Truck className="w-6 h-6" />;
      default: return <Package className="w-6 h-6" />;
    }
  };

  return (
    <div className="space-y-16 sm:space-y-20 pb-16">
      {/* Header */}
      <section className="bg-gradient-to-b from-[#EFF6FF] via-white to-white pt-10 pb-14 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100 text-[#1E40AF] text-xs font-bold uppercase tracking-wider">
            <span>Industry Sector Coverage</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-slate-950 font-heading tracking-tight max-w-3xl">
            Specialized Workforce for Europe's Essential Industries.
          </h1>
          <p className="text-base sm:text-lg text-slate-600 max-w-2xl leading-relaxed">
            Every sector has unique safety standards, shift requirements, and skill demands. Bluegate Work provides pre-certified personnel customized to your production reality.
          </p>
        </div>
      </section>

      {/* Main Interactive Industry Showcase */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Industry Selector List */}
          <div className="lg:col-span-4 space-y-2">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 px-2">
              Select Sector:
            </div>
            {INDUSTRIES.map((ind) => (
              <button
                key={ind.id}
                id={`ind-btn-${ind.id}`}
                onClick={() => setSelectedIndustry(ind.id)}
                className={`w-full text-left p-4 rounded-2xl border transition-all flex items-center justify-between group ${
                  selectedIndustry === ind.id
                    ? 'border-[#1E40AF] bg-blue-50/90 shadow-md shadow-blue-900/5 ring-1 ring-blue-500/20 text-[#1E40AF] font-bold'
                    : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-700 bg-white'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`p-2.5 rounded-xl transition-colors ${
                      selectedIndustry === ind.id
                        ? 'bg-[#1E40AF] text-white'
                        : 'bg-slate-100 text-slate-600 group-hover:bg-blue-100 group-hover:text-[#1E40AF]'
                    }`}
                  >
                    {getIndustryIcon(ind.icon)}
                  </div>
                  <div>
                    <div className="text-xs sm:text-sm font-bold">{ind.name}</div>
                    <div className="text-[10px] text-slate-400 font-normal">
                      Turnaround: {ind.avgDeploymentDays}
                    </div>
                  </div>
                </div>
                <ArrowRight
                  className={`w-4 h-4 transition-transform ${
                    selectedIndustry === ind.id
                      ? 'translate-x-1 text-[#1E40AF]'
                      : 'text-slate-300 group-hover:translate-x-1'
                  }`}
                />
              </button>
            ))}
          </div>

          {/* Right Column: Detailed Active Industry Panel */}
          <div className="lg:col-span-8 bg-white rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-xl shadow-blue-950/5 space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-5">
              <div>
                <span className="text-xs font-extrabold px-3 py-1 rounded-full bg-amber-100 text-amber-900">
                  {activeInd.demandLevel} Demand
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-heading mt-2">
                  {activeInd.name}
                </h2>
              </div>
              <div className="text-right">
                <span className="text-[11px] text-slate-400 font-medium block">Avg Deployment</span>
                <span className="text-base font-black text-[#1E40AF]">{activeInd.avgDeploymentDays}</span>
              </div>
            </div>

            <p className="text-sm text-slate-600 leading-relaxed">
              {activeInd.detailedDesc}
            </p>

            {/* Popular Roles Grid */}
            <div className="space-y-2 pt-2">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Core Roles & Certifications We Supply:
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {activeInd.popularRoles.map((role, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 text-xs font-bold text-slate-800 flex items-center gap-2"
                  >
                    <div className="w-2 h-2 rounded-full bg-[#1E40AF]" />
                    <span>{role}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Primary Locations */}
            <div className="space-y-2 pt-2">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Active Operational Hubs for this Sector:
              </div>
              <div className="flex flex-wrap gap-2">
                {activeInd.locations.map((loc, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-50 text-[#1E40AF] text-xs font-bold border border-blue-100"
                  >
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{loc}</span>
                  </span>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row gap-3 items-center justify-between">
              <div className="text-xs text-slate-500">
                Need specialized headcount for this sector?
              </div>
              <button
                onClick={onRequestQuote}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-[#1E40AF] to-[#2563EB] text-white font-bold text-xs uppercase tracking-wider shadow-md shadow-blue-900/20 flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>Request {activeInd.name} Staff</span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
