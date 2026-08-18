import React from 'react';
import { 
  Globe2, 
  Plane, 
  ShieldCheck, 
  ArrowRight, 
  CheckCircle2, 
  Building2, 
  Sparkles, 
  HelpCircle, 
  Award, 
  FileCheck
} from 'lucide-react';
import { PageId } from '../types';
import { CORE_SERVICES } from '../data/mockData';
import { useImages } from '../context/ImageContext';

interface InternationalRecruitmentPageProps {
  onNavigate: (page: PageId) => void;
  onRequestQuote: () => void;
}

export const InternationalRecruitmentPage: React.FC<InternationalRecruitmentPageProps> = ({
  onNavigate,
  onRequestQuote
}) => {
  const { getImageUrl } = useImages();
  const service = CORE_SERVICES[2]; // International Recruitment

  return (
    <div className="space-y-16 sm:space-y-20 pb-16">
      {/* Service Hero */}
      <section className="bg-gradient-to-b from-[#EFF6FF] via-white to-white pt-10 pb-16 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3.5 py-1.5 rounded-full bg-blue-100 text-[#1E40AF] text-xs font-bold uppercase tracking-wider">
              {service.badge}
            </span>
            <span className="px-3 py-1 rounded-full bg-purple-100 text-purple-900 text-xs font-semibold">
              Zero Worker Fees • 100% Consular Compliant
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <h1 className="text-3xl sm:text-5xl font-black text-slate-950 font-heading tracking-tight">
                {service.title} for Portugal, Netherlands & Europe
              </h1>
              <p className="text-lg font-bold text-blue-700">
                {service.tagline}
              </p>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                {service.fullDescription}
              </p>

              <div className="pt-4 flex flex-wrap gap-3">
                <button
                  id="intl-recruitment-quote-btn"
                  onClick={onRequestQuote}
                  className="px-7 py-3.5 rounded-xl bg-[#1E40AF] hover:bg-[#1D4ED8] text-white font-extrabold text-xs uppercase tracking-wider shadow-lg shadow-blue-900/20 flex items-center gap-2 cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 text-amber-300" />
                  <span>Request International Talent Pipeline</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => onNavigate('contact')}
                  className="px-6 py-3.5 rounded-xl bg-white hover:bg-slate-50 text-slate-800 font-bold text-xs border border-slate-300 cursor-pointer"
                >
                  Inquire on Visa Lead Times
                </button>
              </div>
            </div>

            {/* Right Card: Dynamic Image & Corridor Guarantees */}
            <div className="lg:col-span-5 space-y-4">
              <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-slate-900 relative group">
                <img
                  src={getImageUrl('service_international_recruitment')}
                  alt="International Recruitment Pipelines"
                  className="w-full h-60 sm:h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#002255]/90 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-4 right-4 text-white">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#FFD000]">
                      Global Corridors
                    </span>
                    <span className="text-xs bg-purple-500 text-white px-2 py-0.5 rounded font-bold">
                      Zero Worker Fees
                    </span>
                  </div>
                  <h4 className="text-sm font-bold mt-1">Consular-Verified Skilled Labor Pipeline</h4>
                </div>
              </div>

              <div className="bg-gradient-to-br from-[#0F2B68] via-[#1E40AF] to-[#1D4ED8] rounded-2xl p-5 text-white shadow-xl space-y-3">
                <h3 className="text-sm font-bold text-amber-300 font-heading">
                  International Corridor Guarantees
                </h3>
                <div className="grid grid-cols-3 gap-2 text-xs">
                  {service.stats.map((s, i) => (
                    <div key={i} className="p-2.5 bg-white/10 rounded-xl border border-white/10 text-center">
                      <div className="text-[10px] text-blue-100">{s.label}</div>
                      <div className="font-extrabold text-white text-sm mt-0.5">{s.value}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sourcing Corridors Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold text-[#1E40AF] uppercase tracking-wider">
            Established Corridors
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-950 font-heading">
            Where We Source Verified International Talent
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-3">
            <div className="text-2xl">🇪🇺</div>
            <h4 className="text-base font-bold text-slate-900">Central & Eastern Europe</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Poland, Romania, Bulgaria. Immediate EU cross-border mobility with A1 certificates. High availability of certified industrial welders, Code 95 truck drivers, and CNC operators.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-3">
            <div className="text-2xl">🌏</div>
            <h4 className="text-base font-bold text-slate-900">South & Southeast Asia</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              India, Philippines, Vietnam, Nepal. Trade-tested specialists for high-spec manufacturing, agricultural greenhouse management, and high-volume logistics packing.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-3">
            <div className="text-2xl">🌎</div>
            <h4 className="text-base font-bold text-slate-900">Latin America Corridors</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Brazil, Colombia, Argentina. Native Portuguese and Spanish speakers with rapid integration into Portuguese manufacturing and Dutch supply chain hubs.
            </p>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold text-[#1E40AF] uppercase tracking-wider">
            End-to-End Mobility
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-950 font-heading">
            Our 4-Stage International Onboarding Protocol
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {service.processSteps.map((step) => (
            <div key={step.step} className="p-6 rounded-3xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="text-2xl font-black text-[#1E40AF] font-heading">{step.step}</div>
              <h4 className="text-sm font-bold text-slate-900">{step.title}</h4>
              <p className="text-xs text-slate-600 leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQs */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <h3 className="text-2xl font-bold text-slate-900 text-center font-heading">
          International Recruitment FAQs
        </h3>
        <div className="space-y-3">
          {service.faqs.map((faq, i) => (
            <div key={i} className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-2">
              <div className="font-bold text-xs sm:text-sm text-slate-900 flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-[#1E40AF] shrink-0" />
                <span>{faq.question}</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed pl-6">{faq.answer}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-10 rounded-3xl bg-[#0B1528] text-white flex flex-col md:flex-row items-center justify-between gap-6 border border-slate-800">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="text-2xl font-black font-heading">Overcome Local Labor Scarcity</h3>
            <p className="text-xs sm:text-sm text-slate-300">
              Access pre-screened global talent with complete visa and relocation management.
            </p>
          </div>
          <button
            onClick={onRequestQuote}
            className="px-6 py-3.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs uppercase tracking-wider shrink-0 transition-colors"
          >
            Request Sourcing Strategy
          </button>
        </div>
      </section>
    </div>
  );
};
