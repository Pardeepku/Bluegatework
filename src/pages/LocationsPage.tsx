import React, { useState } from 'react';
import { 
  MapPin, 
  Building2, 
  Phone, 
  Mail, 
  Globe2, 
  ArrowRight, 
  ShieldCheck, 
  Users, 
  ExternalLink,
  Sparkles
} from 'lucide-react';
import { PageId } from '../types';
import { LOCATION_HUBS, COMPANY_INFO } from '../data/mockData';

interface LocationsPageProps {
  onNavigate: (page: PageId) => void;
  onRequestQuote: () => void;
}

export const LocationsPage: React.FC<LocationsPageProps> = ({
  onNavigate,
  onRequestQuote
}) => {
  const [selectedHub, setSelectedHub] = useState<string>('portugal-hq');

  const activeLocation = LOCATION_HUBS.find((h) => h.id === selectedHub) || LOCATION_HUBS[0];

  return (
    <div className="space-y-16 sm:space-y-20 pb-16">
      {/* Locations Hero */}
      <section className="bg-gradient-to-b from-[#EFF6FF] via-white to-white pt-10 pb-14 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100 text-[#1E40AF] text-xs font-bold uppercase tracking-wider">
            <Globe2 className="w-3.5 h-3.5" />
            <span>Global Geographic Footprint</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-slate-950 font-heading tracking-tight max-w-3xl">
            Strategic Presence Across Portugal, Netherlands & Worldwide.
          </h1>
          <p className="text-base sm:text-lg text-slate-600 max-w-2xl leading-relaxed">
            Headquartered in Portugal with operational branches in the Netherlands and verified sourcing corridors spanning Europe, Asia, and Latin America.
          </p>
        </div>
      </section>

      {/* Interactive Map & Hub Viewer */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Hub List */}
          <div className="lg:col-span-4 space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-400 px-1">
              Select Regional Hub:
            </div>
            {LOCATION_HUBS.map((hub) => (
              <button
                key={hub.id}
                id={`hub-btn-${hub.id}`}
                onClick={() => setSelectedHub(hub.id)}
                className={`w-full text-left p-4 rounded-2xl border transition-all space-y-1.5 ${
                  selectedHub === hub.id
                    ? 'border-[#1E40AF] bg-blue-50/90 shadow-md shadow-blue-900/5 ring-1 ring-blue-500/20 text-[#1E40AF]'
                    : 'border-slate-200 hover:bg-slate-50 text-slate-700 bg-white'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-700 bg-amber-50 px-2 py-0.5 rounded">
                    {hub.type}
                  </span>
                  <span className="text-xs font-bold text-slate-400">{hub.country}</span>
                </div>
                <div className="text-sm font-black text-slate-900">{hub.name}</div>
                <div className="text-xs text-slate-500">{hub.city}</div>
              </button>
            ))}
          </div>

          {/* Detailed Hub Card */}
          <div className="lg:col-span-8 bg-white rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-xl shadow-blue-950/5 space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-5">
              <div>
                <span className="text-xs font-bold text-[#1E40AF] uppercase tracking-wider">
                  {activeLocation.type} • {activeLocation.country}
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-heading mt-1">
                  {activeLocation.name}
                </h2>
              </div>
              <div className="text-right">
                <span className="text-[11px] text-slate-400 font-medium block">Active Deployment Capacity</span>
                <span className="text-base font-black text-emerald-700">{activeLocation.activeWorkforceCount}</span>
              </div>
            </div>

            {/* Address & Contact Box if applicable */}
            {activeLocation.address && (
              <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200/80 space-y-2 text-xs">
                <div className="font-bold text-[#1E40AF] flex items-center gap-2">
                  <Building2 className="w-4 h-4" />
                  <span>Physical Address & Registered Office:</span>
                </div>
                <p className="text-slate-800 font-semibold">{activeLocation.address}, {activeLocation.city}</p>
                <div className="flex flex-wrap gap-4 pt-1 text-slate-700">
                  <span className="flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-blue-600" />
                    <span>{COMPANY_INFO.phoneDisplay}</span>
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-blue-600" />
                    <span>{COMPANY_INFO.email}</span>
                  </span>
                </div>
              </div>
            )}

            {/* Hub Focus */}
            <div className="space-y-2">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Core Operations & Capabilities at this Hub:
              </div>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed bg-slate-50 p-4 rounded-2xl border border-slate-200">
                {activeLocation.focus}
              </p>
            </div>

            {/* Key Industries */}
            <div className="space-y-2">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Major Industries Served by this Corridor:
              </div>
              <div className="flex flex-wrap gap-2">
                {activeLocation.keyIndustries.map((ind, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 rounded-xl bg-slate-100 text-slate-800 text-xs font-semibold"
                  >
                    {ind}
                  </span>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row gap-3 items-center justify-between">
              <button
                onClick={() => onNavigate('contact')}
                className="px-6 py-3 rounded-xl bg-[#1E40AF] hover:bg-[#1D4ED8] text-white font-bold text-xs flex items-center gap-2"
              >
                <span>Contact {activeLocation.city} Representative</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={onRequestQuote}
                className="px-5 py-3 rounded-xl border border-slate-300 font-bold text-xs text-slate-700 hover:bg-slate-50"
              >
                Request Deployment Quote
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
