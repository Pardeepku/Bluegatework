import React, { useState } from 'react';
import { 
  ArrowRight, 
  ShieldCheck, 
  Users, 
  Briefcase, 
  Globe, 
  Building2, 
  Zap, 
  CheckCircle2, 
  Star, 
  ChevronRight, 
  MapPin, 
  Phone, 
  MessageSquare,
  Sparkles,
  Award,
  Clock,
  Check,
  HelpCircle
} from 'lucide-react';
import { PageId } from '../types';
import { 
  COMPANY_INFO, 
  TRUST_METRICS, 
  CORE_SERVICES, 
  INDUSTRIES, 
  TESTIMONIALS, 
  COMPLIANCE_STANDARDS, 
  FAQS_HOMEPAGE,
  ACTIVE_JOBS
} from '../data/mockData';
import { TalentMatchCalculator } from '../components/TalentMatchCalculator';
import { HeroSlider } from '../components/HeroSlider';

interface HomePageProps {
  onNavigate: (page: PageId) => void;
  onRequestQuote: () => void;
  onApplyJob: (job?: any) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onNavigate,
  onRequestQuote,
  onApplyJob
}) => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  return (
    <div className="space-y-20 sm:space-y-24 pb-16 overflow-hidden">
      {/* 1. HERO 2-SLIDE SLIDER SECTION */}
      <section className="relative pt-4 sm:pt-6 pb-14 sm:pb-18 overflow-hidden bg-gradient-to-br from-white via-white to-[#eef6ff]">
        {/* Subtle background architectural gradient */}
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[500px] bg-gradient-to-tr from-blue-200/20 via-amber-100/10 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto space-y-8">
          {/* Main 2 Slide Slider */}
          <HeroSlider
            onNavigate={onNavigate}
            onRequestQuote={onRequestQuote}
            onApplyJob={onApplyJob}
          />

          {/* Quick 3 Service Cards Strip */}
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="bg-white border border-blue-100 p-6 sm:p-8 rounded-3xl grid grid-cols-1 md:grid-cols-3 gap-6 shadow-md shadow-blue-950/5">
              <div
                onClick={() => onNavigate('temporary-staffing')}
                className="group p-5 rounded-2xl bg-[#f0f7ff] border border-blue-100 hover:border-[#D4AF37] transition-all cursor-pointer space-y-2"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-xs text-[#002366] group-hover:bg-[#002366] group-hover:text-white transition-colors">
                    <Users className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[9px] font-bold uppercase tracking-wider text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full">48h Turnaround</span>
                    <h3 className="font-bold text-[#002366] text-base group-hover:text-[#0056b3] transition-colors">Temporary Staffing</h3>
                  </div>
                </div>
                <p className="text-xs text-slate-500 leading-snug">
                  Comprehensive flexible workforce solutions tailored to shift and seasonal surge needs in Portugal and Netherlands.
                </p>
              </div>

              <div
                onClick={() => onNavigate('outsourcing')}
                className="group p-5 rounded-2xl bg-[#f0f7ff] border border-blue-100 hover:border-[#D4AF37] transition-all cursor-pointer space-y-2"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-xs text-[#002366] group-hover:bg-[#002366] group-hover:text-white transition-colors">
                    <Briefcase className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[9px] font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full">SLA Guaranteed</span>
                    <h3 className="font-bold text-[#002366] text-base group-hover:text-[#0056b3] transition-colors">Workforce Outsourcing</h3>
                  </div>
                </div>
                <p className="text-xs text-slate-500 leading-snug">
                  Strategic production line & facility management with on-site coordinators allowing you to focus on core growth.
                </p>
              </div>

              <div
                onClick={() => onNavigate('international-recruitment')}
                className="group p-5 rounded-2xl bg-[#f0f7ff] border border-blue-100 hover:border-[#D4AF37] transition-all cursor-pointer space-y-2"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-xs text-[#002366] group-hover:bg-[#002366] group-hover:text-white transition-colors">
                    <Globe className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[9px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">Zero Worker Fees</span>
                    <h3 className="font-bold text-[#002366] text-base group-hover:text-[#0056b3] transition-colors">International Recruitment</h3>
                  </div>
                </div>
                <p className="text-xs text-slate-500 leading-snug">
                  Cross-border sourcing bridging European industries with certified talent in Eastern Europe, Asia, and Latin America.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. TRUST METRICS BAR */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#001a4d] rounded-3xl p-6 sm:p-8 lg:p-10 shadow-2xl shadow-blue-950/30 text-white border border-blue-900/50">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 divide-y lg:divide-y-0 lg:divide-x divide-blue-900/40">
            {TRUST_METRICS.map((metric, i) => (
              <div key={i} className={`space-y-1 ${i > 0 ? 'pt-4 lg:pt-0 lg:pl-8' : ''}`}>
                <div className="text-2xl sm:text-3xl lg:text-4xl font-black text-white font-heading tracking-tight flex items-baseline gap-2">
                  <span className="text-[#D4AF37]">
                    {metric.value}
                  </span>
                </div>
                <div className="text-xs sm:text-sm font-bold text-slate-200">{metric.label}</div>
                <div className="text-[11px] text-blue-300 font-medium">{metric.change}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. CORE SERVICES SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-[#002366] text-xs font-bold uppercase tracking-wider border border-blue-100">
            <Briefcase className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Comprehensive Workforce Capabilities</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-[#002366] font-heading tracking-tight">
            Tailored Staffing Solutions Built for Speed & Compliance
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            Whether you need rapid temporary reinforcement in 48 hours, fully managed line outsourcing, or cross-border skilled recruitment, Bluegate Work delivers with guaranteed quality.
          </p>
        </div>

        {/* 3 Service Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {CORE_SERVICES.map((service) => (
            <div
              key={service.id}
              className="bg-white rounded-3xl p-7 shadow-xl shadow-blue-950/5 border border-blue-100 hover:border-[#D4AF37] hover:shadow-2xl transition-all duration-300 flex flex-col justify-between group relative overflow-hidden"
            >
              <div className="space-y-5">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-[#002366] text-white flex items-center justify-center shadow-md shadow-blue-900/20 group-hover:scale-110 transition-transform">
                    {service.id === 'temporary-staffing' && <Users className="w-6 h-6" />}
                    {service.id === 'outsourcing' && <Briefcase className="w-6 h-6" />}
                    {service.id === 'international-recruitment' && <Globe className="w-6 h-6" />}
                  </div>
                  <span className="text-xs font-bold px-3 py-1 rounded-full bg-amber-50 text-amber-900 border border-amber-200/50">
                    {service.badge}
                  </span>
                </div>

                <div>
                  <h3 className="text-xl font-extrabold text-[#002366] font-heading group-hover:text-[#0056b3] transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-xs font-semibold text-[#0056b3] mt-1">
                    {service.tagline}
                  </p>
                </div>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {service.shortDescription}
                </p>

                {/* Key Benefits List */}
                <div className="space-y-2 pt-2 border-t border-blue-50">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Key Benefits:</div>
                  {service.keyBenefits.slice(0, 3).map((benefit, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="pt-6 mt-6 border-t border-blue-50 flex items-center justify-between">
                <div className="text-[11px] text-slate-500 font-medium">
                  Deployment: <span className="font-bold text-[#002366]">{service.deploymentTime}</span>
                </div>
                <button
                  id={`home-srv-btn-${service.id}`}
                  onClick={() => onNavigate(service.pageId)}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#002366] hover:text-[#0056b3] group-hover:translate-x-1 transition-transform"
                >
                  <span>Learn More</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. INTERACTIVE TALENT CALCULATOR */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <TalentMatchCalculator onRequestQuote={onRequestQuote} />
      </section>

      {/* 5. INDUSTRIES & SECTORS SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 text-[#1E40AF] text-xs font-extrabold uppercase tracking-wider">
              <span>European Industry Expertise</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-950 font-heading tracking-tight">
              Sectors We Power Across Portugal & Netherlands
            </h2>
            <p className="text-slate-600 text-sm">
              Supplying certified operators, seasoned technicians, and managed teams tailored to strict sector standards.
            </p>
          </div>

          <button
            onClick={() => onNavigate('industries')}
            className="px-5 py-2.5 rounded-xl border border-slate-300 hover:border-slate-900 font-bold text-xs text-slate-800 transition-colors flex items-center gap-1.5 shrink-0"
          >
            <span>View All Sectors</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {INDUSTRIES.map((ind) => (
            <div
              key={ind.id}
              className="bg-white rounded-2xl p-6 border border-slate-200 hover:border-blue-300 hover:shadow-lg transition-all space-y-4"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold px-2.5 py-0.5 rounded-md bg-blue-50 text-[#1E40AF]">
                  {ind.demandLevel} Demand
                </span>
                <span className="text-[11px] text-slate-400 font-medium">Avg: {ind.avgDeploymentDays}</span>
              </div>

              <div>
                <h3 className="text-base font-extrabold text-slate-900 font-heading">{ind.name}</h3>
                <p className="text-xs text-slate-600 mt-1 line-clamp-2">{ind.shortDesc}</p>
              </div>

              <div className="space-y-1.5 pt-2 border-t border-slate-100">
                <div className="text-[10px] font-bold text-slate-400 uppercase">Typical Roles Supplied:</div>
                <div className="flex flex-wrap gap-1.5">
                  {ind.popularRoles.slice(0, 3).map((role, idx) => (
                    <span
                      key={idx}
                      className="text-[11px] px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-medium"
                    >
                      {role}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. GLOBAL FOOTPRINT & HUBS */}
      <section className="bg-gradient-to-br from-[#0F2B68] via-[#1E40AF] to-[#0B1528] py-16 sm:py-20 text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="px-3.5 py-1 rounded-full bg-amber-400/20 text-amber-300 text-xs font-bold uppercase tracking-wider">
              International Sourcing Corridors
            </span>
            <h2 className="text-3xl sm:text-4xl font-black font-heading text-white tracking-tight">
              From Portugal to Netherlands & Worldwide
            </h2>
            <p className="text-blue-100 text-sm sm:text-base">
              Headquartered in Rio Maior, Santarém, Portugal with operational branches in the Netherlands and global sourcing pipelines in Europe, Asia, and Latin America.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-3xl bg-white/10 backdrop-blur-md border border-white/15 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-amber-300 uppercase">Headquarters</span>
                <span className="text-lg">🇵🇹</span>
              </div>
              <h3 className="text-lg font-bold text-white font-heading">Portugal (Rio Maior)</h3>
              <p className="text-xs text-blue-100/80 leading-relaxed">
                RUA DOM FERNANDO I 25, Rio Maior, Santarém. Central leadership, Southern European staffing, and consular operations.
              </p>
              <div className="text-[11px] text-amber-300 font-semibold pt-1">
                Active Staffing: 5,800+ Placements
              </div>
            </div>

            <div className="p-6 rounded-3xl bg-white/10 backdrop-blur-md border border-white/15 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-amber-300 uppercase">Benelux Branch</span>
                <span className="text-lg">🇳🇱</span>
              </div>
              <h3 className="text-lg font-bold text-white font-heading">Netherlands</h3>
              <p className="text-xs text-blue-100/80 leading-relaxed">
                Rotterdam / Tilburg hub. Rapid logistics surge staffing, high-tech glasshouse horticulture, and certified SNF housing.
              </p>
              <div className="text-[11px] text-amber-300 font-semibold pt-1">
                Active Staffing: 4,200+ Personnel
              </div>
            </div>

            <div className="p-6 rounded-3xl bg-white/10 backdrop-blur-md border border-white/15 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-amber-300 uppercase">EU Corridor</span>
                <span className="text-lg">🇪🇺</span>
              </div>
              <h3 className="text-lg font-bold text-white font-heading">Central & Eastern Europe</h3>
              <p className="text-xs text-blue-100/80 leading-relaxed">
                Poland, Romania, and Baltic corridors. Certified industrial welders, CNC machinists, and Code 95 transport drivers.
              </p>
              <div className="text-[11px] text-amber-300 font-semibold pt-1">
                Direct A1 Postings
              </div>
            </div>

            <div className="p-6 rounded-3xl bg-white/10 backdrop-blur-md border border-white/15 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-amber-300 uppercase">Global Pipelines</span>
                <span className="text-lg">🌐</span>
              </div>
              <h3 className="text-lg font-bold text-white font-heading">Asia & Latin America</h3>
              <p className="text-xs text-blue-100/80 leading-relaxed">
                India, Philippines, Brazil, Colombia. Comprehensive visa processing, consular clearances, and cultural onboarding.
              </p>
              <div className="text-[11px] text-amber-300 font-semibold pt-1">
                Zero Worker-Paid Fees
              </div>
            </div>
          </div>

          <div className="text-center pt-4">
            <button
              onClick={() => onNavigate('locations')}
              className="px-6 py-3 rounded-xl bg-white text-[#1E40AF] font-bold text-xs hover:bg-blue-50 transition-colors inline-flex items-center gap-2 shadow-lg"
            >
              <span>Explore Interactive Global Locations & Map</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* 7. STEP-BY-STEP COMPLIANCE & RECRUITMENT PROCESS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="px-3 py-1 rounded-full bg-blue-100 text-[#1E40AF] text-xs font-bold uppercase tracking-wider">
            Operational Blueprint
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-950 font-heading tracking-tight">
            How We Deliver 100% Reliable Workforce
          </h2>
          <p className="text-slate-600 text-sm">
            From first audit to daily on-site supervision, our 4-stage pipeline guarantees zero administrative burden and complete labor legal protection.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
          {[
            {
              step: '01',
              title: 'Operational Needs Audit',
              desc: 'We analyze your required headcount, shift structures, skill profiles, and project timeline.',
              icon: 'Clock'
            },
            {
              step: '02',
              title: 'Bench Matching & Vetting',
              desc: 'Candidates are selected from our active pre-vetted bench with verified certificates and background checks.',
              icon: 'Users'
            },
            {
              step: '03',
              title: 'Legal Contracts & Housing',
              desc: 'We handle A1 forms, social security, worker accident insurance, and SNF-certified accommodations.',
              icon: 'ShieldCheck'
            },
            {
              step: '04',
              title: 'Deployment & Site Leads',
              desc: 'Workers arrive punctually with PPE, guided by our dedicated bilingual field coordinators.',
              icon: 'Zap'
            }
          ].map((item, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl p-6 border border-slate-200 hover:border-blue-400 hover:shadow-lg transition-all space-y-3 relative"
            >
              <div className="text-3xl font-black font-heading text-[#1E40AF]/20">
                {item.step}
              </div>
              <h3 className="text-base font-bold text-slate-900 font-heading">{item.title}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 8. EUROPEAN LABOR COMPLIANCE STANDARDS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 rounded-3xl p-8 sm:p-12 text-white border border-slate-800 space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-5 space-y-3">
              <span className="text-amber-400 text-xs font-bold uppercase tracking-wider">
                Legal Protection & Indemnity
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold font-heading text-white">
                The Bluegate Compliance Shield
              </h3>
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                Cross-border labor laws in Europe are stringent. We guarantee complete legal compliance with Portuguese ACT standards, Dutch SNA guidelines, and the European Posting of Workers Directive, fully protecting your company from joint liability.
              </p>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {COMPLIANCE_STANDARDS.map((std, i) => (
                <div key={i} className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-amber-300">{std.badge}</span>
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  </div>
                  <div className="text-sm font-bold text-white">{std.title}</div>
                  <p className="text-[11px] text-slate-400 leading-snug">{std.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 9. TESTIMONIALS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="px-3 py-1 rounded-full bg-blue-100 text-[#1E40AF] text-xs font-bold uppercase tracking-wider">
            Verified Experiences
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-950 font-heading tracking-tight">
            Trusted by Employers & Candidates Alike
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.id}
              className="bg-white rounded-3xl p-7 border border-slate-200 shadow-md shadow-blue-950/5 space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed italic">
                  "{t.quote}"
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <div className="text-xs font-extrabold text-slate-900">{t.authorName}</div>
                  <div className="text-[11px] text-slate-500">{t.role}</div>
                  <div className="text-[10px] text-[#1E40AF] font-semibold">{t.companyOrCountry}</div>
                </div>
                <span className="text-[10px] px-2 py-1 rounded-md bg-blue-50 text-[#1E40AF] font-bold">
                  {t.serviceUsed}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 10. FAQ ACCORDION */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-2">
          <span className="px-3 py-1 rounded-full bg-blue-100 text-[#1E40AF] text-xs font-bold uppercase tracking-wider">
            Frequently Asked Questions
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-950 font-heading tracking-tight">
            Clear Answers to Common Workforce Inquiries
          </h2>
        </div>

        <div className="space-y-3">
          {FAQS_HOMEPAGE.map((faq, index) => {
            const isOpen = openFaqIndex === index;
            return (
              <div
                key={index}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden transition-all shadow-sm"
              >
                <button
                  onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                  className="w-full text-left p-5 flex items-center justify-between gap-4 font-bold text-xs sm:text-sm text-slate-900 hover:text-[#1E40AF]"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-50 text-[#1E40AF]">
                      {faq.category}
                    </span>
                    <span>{faq.question}</span>
                  </div>
                  <ChevronRight
                    className={`w-4 h-4 text-slate-400 transition-transform ${
                      isOpen ? 'rotate-90 text-[#1E40AF]' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 text-xs text-slate-600 leading-relaxed border-t border-slate-100 pt-3 animate-in fade-in">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};
