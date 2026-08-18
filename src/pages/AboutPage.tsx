import React from 'react';
import { 
  ShieldCheck, 
  Target, 
  Compass, 
  Award, 
  Users, 
  Building2, 
  Globe2, 
  MapPin, 
  Phone, 
  Mail, 
  ArrowRight,
  CheckCircle2,
  Lock,
  HeartHandshake
} from 'lucide-react';
import { PageId } from '../types';
import { COMPANY_INFO, TRUST_METRICS } from '../data/mockData';
import { useImages } from '../context/ImageContext';

interface AboutPageProps {
  onNavigate: (page: PageId) => void;
  onRequestQuote: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate, onRequestQuote }) => {
  const { getImageUrl } = useImages();

  return (
    <div className="space-y-16 sm:space-y-20 pb-16">
      {/* Hero Header */}
      <section className="relative bg-gradient-to-b from-[#EFF6FF] via-white to-white pt-10 pb-16 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100 text-[#1E40AF] text-xs font-bold uppercase tracking-wider">
                <Globe2 className="w-3.5 h-3.5" />
                <span>About Bluegate Work</span>
              </div>

              <div className="space-y-4">
                <h1 className="text-3xl sm:text-5xl font-black text-slate-950 font-heading tracking-tight leading-[1.15]">
                  Building Ethical, Compliant & Agile Workforce Bridges Across Europe.
                </h1>
                <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
                  Bluegate Work was founded on a singular principle: European businesses need rapid, dependable, and fully compliant workforce solutions, while workers deserve dignified conditions, transparent contracts, and verified housing.
                </p>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-slate-900 group">
                <img
                  src={getImageUrl('about_headquarters')}
                  alt="Bluegate Work European Operations Hub"
                  className="w-full h-72 sm:h-80 object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#002255]/80 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#FFD000]">
                    Central Hub
                  </span>
                  <p className="text-sm font-bold">European Operations & Recruitment Center</p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
            {TRUST_METRICS.map((metric, i) => (
              <div key={i} className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-1">
                <div className="text-2xl sm:text-3xl font-black text-[#1E40AF] font-heading">{metric.value}</div>
                <div className="text-xs font-bold text-slate-700">{metric.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission, Vision & Core Values */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-md shadow-blue-950/5 space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-blue-100 text-[#1E40AF] flex items-center justify-center">
              <Target className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 font-heading">Our Mission</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              To eliminate workforce shortages for European enterprises through high-speed, legally audited temporary staffing, turnkey outsourcing, and ethical international recruitment.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-md shadow-blue-950/5 space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center">
              <Compass className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 font-heading">Our Vision</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              To be the most trusted cross-border staffing bridge between European industrial centers and qualified global talent corridors, setting the gold standard for worker care and regulatory compliance.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-md shadow-blue-950/5 space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
              <HeartHandshake className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 font-heading">The Zero-Fee Pledge</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              We strictly enforce the Dhaka Principles. Zero worker-paid recruitment fees, completely transparent employment agreements, certified housing, and guaranteed timely payroll payments.
            </p>
          </div>
        </div>
      </section>

      {/* The Bluegate Difference / Why Choose Us */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold text-[#1E40AF] uppercase tracking-wider">
            Operational Excellence
          </span>
          <h2 className="text-3xl font-black text-slate-950 font-heading">
            Why European Enterprises Choose Bluegate Work
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200 space-y-3">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-[#1E40AF] text-white">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-slate-900">Total Legal Compliance & Immunity</h4>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              We maintain full ETT licensing under Portuguese ACT and align with Dutch SNA/NEN 4400-1 requirements. We assume 100% legal responsibility for payroll, social security, worker insurance, and cross-border A1 postings.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200 space-y-3">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-amber-500 text-slate-950">
                <Building2 className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-slate-900">Turnkey Housing & Commute Infrastructure</h4>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Unlike broker agencies that leave housing to chance, Bluegate Work directly leases and manages SNF-inspected residential accommodations and provides commuter fleet shuttles to ensure 99.8% on-time shift arrivals.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200 space-y-3">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-blue-600 text-white">
                <Users className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-slate-900">Dedicated On-Site Coordinators</h4>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Every client deployment includes bilingual shift coordinators who manage clock-ins, safety gear distribution, performance tracking, and direct worker communication in their native languages.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200 space-y-3">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-emerald-600 text-white">
                <Globe2 className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-slate-900">Active Global Talent Pipelines</h4>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              When local labor pools are depleted, our established consular corridors in Eastern Europe, Asia, and Latin America supply certified welders, CNC machinists, and agricultural operatives within weeks.
            </p>
          </div>
        </div>
      </section>

      {/* Headquarters & Registration Showcase */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#0B1528] rounded-3xl p-8 sm:p-12 text-white border border-slate-800 space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-6 space-y-4">
              <div className="inline-flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-wider">
                <MapPin className="w-4 h-4" />
                <span>Portuguese Global Headquarters</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold font-heading text-white">
                Rooted in Portugal, Serving Europe & Beyond
              </h3>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                Our central European headquarters in Rio Maior, Santarém oversees our continental recruitment, legal compliance, and consular processing infrastructure.
              </p>
              
              <div className="space-y-2 pt-2 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-blue-400" />
                  <span><strong>Official Address:</strong> {COMPANY_INFO.address.full}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-blue-400" />
                  <span><strong>Phone / WhatsApp:</strong> {COMPANY_INFO.phoneDisplay}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-blue-400" />
                  <span><strong>Email:</strong> {COMPANY_INFO.email}</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 flex flex-col gap-3 justify-center">
              <div className="p-5 rounded-2xl bg-white/10 border border-white/10 space-y-2">
                <div className="font-bold text-amber-300 text-sm">Need a Custom Workforce Consultation?</div>
                <p className="text-xs text-blue-100">
                  Our recruitment directors in Portugal and the Netherlands are ready to review your staffing schedule.
                </p>
                <div className="pt-2 flex flex-wrap gap-3">
                  <button
                    onClick={onRequestQuote}
                    className="px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs transition-colors"
                  >
                    Request Staffing Plan
                  </button>
                  <button
                    onClick={() => onNavigate('contact')}
                    className="px-5 py-2.5 rounded-xl bg-white/20 hover:bg-white/30 text-white font-bold text-xs transition-colors"
                  >
                    Contact Portugal HQ
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
