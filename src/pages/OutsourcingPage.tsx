import React from 'react';
import { 
  Briefcase, 
  Target, 
  ShieldCheck, 
  ArrowRight, 
  CheckCircle2, 
  Layers, 
  TrendingUp, 
  Sparkles,
  HelpCircle
} from 'lucide-react';
import { PageId } from '../types';
import { CORE_SERVICES } from '../data/mockData';
import { useImages } from '../context/ImageContext';

interface OutsourcingPageProps {
  onNavigate: (page: PageId) => void;
  onRequestQuote: () => void;
}

export const OutsourcingPage: React.FC<OutsourcingPageProps> = ({
  onNavigate,
  onRequestQuote
}) => {
  const { getImageUrl } = useImages();
  const service = CORE_SERVICES[1]; // Outsourcing

  return (
    <div className="space-y-16 sm:space-y-20 pb-16">
      {/* Service Hero */}
      <section className="bg-gradient-to-b from-[#EFF6FF] via-white to-white pt-10 pb-16 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3.5 py-1.5 rounded-full bg-blue-100 text-[#1E40AF] text-xs font-bold uppercase tracking-wider">
              {service.badge}
            </span>
            <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-semibold">
              Guaranteed Output SLAs
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <h1 className="text-3xl sm:text-5xl font-black text-slate-950 font-heading tracking-tight">
                Turnkey {service.title} & Facility Operations
              </h1>
              <p className="text-lg font-bold text-blue-700">
                {service.tagline}
              </p>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                {service.fullDescription}
              </p>

              <div className="pt-4 flex flex-wrap gap-3">
                <button
                  id="outsourcing-quote-btn"
                  onClick={onRequestQuote}
                  className="px-7 py-3.5 rounded-xl bg-[#1E40AF] hover:bg-[#1D4ED8] text-white font-extrabold text-xs uppercase tracking-wider shadow-lg shadow-blue-900/20 flex items-center gap-2 cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 text-amber-300" />
                  <span>Request Outsourcing Feasibility Study</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => onNavigate('contact')}
                  className="px-6 py-3.5 rounded-xl bg-white hover:bg-slate-50 text-slate-800 font-bold text-xs border border-slate-300 cursor-pointer"
                >
                  Speak with Operations Director
                </button>
              </div>
            </div>

            {/* Right Card: Dynamic Service Image & SLA Metrics */}
            <div className="lg:col-span-5 space-y-4">
              <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-slate-900 relative group">
                <img
                  src={getImageUrl('service_outsourcing')}
                  alt="Workforce Outsourcing Operations"
                  className="w-full h-60 sm:h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#002255]/90 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-4 right-4 text-white">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#FFD000]">
                      Managed Lines & Teams
                    </span>
                    <span className="text-xs bg-amber-500/80 text-slate-950 px-2 py-0.5 rounded font-bold">
                      99.4% SLA Adherence
                    </span>
                  </div>
                  <h4 className="text-sm font-bold mt-1">Supervised Assembly, Packaging & Line Output</h4>
                </div>
              </div>

              <div className="bg-gradient-to-br from-[#0F2B68] via-[#1E40AF] to-[#1D4ED8] rounded-2xl p-5 text-white shadow-xl space-y-3">
                <h3 className="text-sm font-bold text-amber-300 font-heading">
                  Outsourcing SLA Scorecard
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

      {/* Key Benefits */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold text-[#1E40AF] uppercase tracking-wider">
            SLA-Driven Excellence
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-950 font-heading">
            How Managed Outsourcing Protects Your Margins
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {service.keyBenefits.map((benefit, i) => (
            <div key={i} className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
                0{i + 1}
              </div>
              <h4 className="text-sm font-bold text-slate-900">{benefit}</h4>
            </div>
          ))}
        </div>
      </section>

      {/* Outsourcing Process */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold text-[#1E40AF] uppercase tracking-wider">
            Implementation Timeline
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-950 font-heading">
            4-Stage Transition Framework
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
          Outsourcing FAQs
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
            <h3 className="text-2xl font-black font-heading">Outsource Operational Lines with Confidence</h3>
            <p className="text-xs sm:text-sm text-slate-300">
              Transform fixed labor costs into flexible performance-based operational efficiency.
            </p>
          </div>
          <button
            onClick={onRequestQuote}
            className="px-6 py-3.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs uppercase tracking-wider shrink-0 transition-colors"
          >
            Schedule Facility Walkthrough
          </button>
        </div>
      </section>
    </div>
  );
};
