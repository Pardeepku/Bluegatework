import React from 'react';
import {
  ShieldCheck,
  Award,
  FileCheck,
  CheckCircle2,
  Lock,
  Globe,
  FileText,
  AlertCircle,
  ArrowRight,
  ExternalLink,
  Scale,
  Building,
  Users
} from 'lucide-react';
import { PageId } from '../types';
import { useSiteSettings } from '../context/SiteSettingsContext';

interface CompliancePageProps {
  onNavigate: (page: PageId) => void;
  onRequestQuote: () => void;
}

export const CompliancePage: React.FC<CompliancePageProps> = ({ onNavigate, onRequestQuote }) => {
  const { settings } = useSiteSettings();

  const compliancePillars = [
    {
      title: 'ACT Portugal Licensed & Inspected',
      code: 'ACT Lic. #8492/PT',
      authority: 'Autoridade para as Condições do Trabalho (Portugal)',
      desc: 'Fully licensed under Portuguese labor statutes for temporary agency work (trabalho temporário). We adhere strictly to standard collective bargaining wage floors, workplace insurance, and mandatory occupational safety protocols.',
      badges: ['Labor Law Compliant', 'Worker Insurance 100%', 'Safe Work Standards'],
    },
    {
      title: 'AIMA & SEF Immigration Compliance',
      code: 'AIMA Work Authorizations',
      authority: 'Agência para a Integração, Migrações e Asilo (Portugal)',
      desc: 'All non-EU and third-country nationals deployed through Bluegate Work operate with valid Portuguese residence permits, manifestation of interest (MI), or EU Blue Cards with full social security (NISS) and fiscal (NIF) registrations.',
      badges: ['100% Legal Work Status', 'NIF & NISS Enrolled', 'Anti-Trafficking Verified'],
    },
    {
      title: 'Dutch NEN 4400-1 & SNA Standards',
      code: 'Stichting Normering Arbeid (SNA)',
      authority: 'Labour Standards Foundation (Netherlands)',
      desc: 'For cross-border deployments and assignments in the Netherlands, we comply with strict Dutch WAADI obligations, G-Account payroll escrow procedures, and prevent chain-liability for hirers.',
      badges: ['WAADI Registered', 'G-Account Supported', 'Zero Chain Liability'],
    },
    {
      title: 'EU Posted Workers Directive 96/71/EC',
      code: 'Directive (EU) 2018/957',
      authority: 'European Labour Authority (ELA)',
      desc: 'Full compliance with cross-border posting of workers across European member states. Prior notification submitted to national labor inspectorates (e.g. SIPSI France, Meldeportal Germany, PostNL inspections).',
      badges: ['A1 Certificates Issued', 'Equal Pay for Equal Work', 'Prior Declarations Lodged'],
    },
    {
      title: 'Ethical Recruitment & Zero-Fee Guarantee',
      code: 'ILO Fair Recruitment Principles',
      authority: 'International Labour Organization Standards',
      desc: 'Candidates NEVER pay placement fees, recruitment charges, or unlawful visa premiums. We operate under strict Employer-Pays models to guarantee ethical sourcing and prevent debt bondage.',
      badges: ['Zero Recruitment Fees to Workers', 'Clear Employment Contracts', 'Transparent Deductions'],
    },
    {
      title: 'GDPR & Candidate Data Protection',
      code: 'Regulation (EU) 2016/679',
      authority: 'National Data Protection Commission (CNPD)',
      desc: 'Strict end-to-end encryption and procedural safeguards for candidate identity documents, criminal record checks, biometric photos, and enterprise HR contracts.',
      badges: ['GDPR Compliant', 'Encrypted Document Vault', 'Privacy by Design'],
    },
  ];

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Hero Header */}
      <section className="relative bg-[#001738] text-white py-16 lg:py-24 overflow-hidden border-b-4 border-[#002f73]">
        <div className="absolute inset-0 bg-gradient-to-r from-[#001a4d] via-[#002868] to-[#001738] opacity-95" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#FFD000]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 text-[#FFD000] text-xs font-bold uppercase tracking-wider backdrop-blur-sm border border-white/10">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Rigorous European Legal Standards</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight font-heading">
              Labor Compliance & Legal Integrity
            </h1>
            <p className="text-blue-100 text-sm sm:text-base leading-relaxed">
              At {settings.siteName}, compliance is not an afterthought—it is the foundation of our entire operational model. We protect both enterprise employers and global workers through 100% certified legal frameworks.
            </p>
          </div>
        </div>
      </section>

      {/* Main Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {compliancePillars.map((item, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl p-7 border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-6"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono font-bold text-blue-700 bg-blue-50 border border-blue-200 px-2.5 py-1 rounded-lg">
                    {item.code}
                  </span>
                  <Award className="w-5 h-5 text-[#FFD000]" />
                </div>

                <h3 className="text-lg font-bold text-slate-900 font-heading leading-snug">
                  {item.title}
                </h3>
                <p className="text-[11px] font-semibold text-slate-400">
                  {item.authority}
                </p>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {item.desc}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 space-y-2">
                <div className="flex flex-wrap gap-1.5">
                  {item.badges.map((b, bIdx) => (
                    <span
                      key={bIdx}
                      className="text-[10px] font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded-full flex items-center gap-1"
                    >
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                      <span>{b}</span>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Employer Liability Protection Box */}
        <div className="mt-16 bg-[#001a4d] rounded-3xl p-8 sm:p-12 text-white border-2 border-[#FFD000]/30 shadow-2xl relative overflow-hidden">
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[#FFD000] text-xs font-bold uppercase tracking-wider">
                <Scale className="w-3.5 h-3.5" />
                <span>Zero Chain Liability for Employers</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-white">
                Request an Employer Compliance & SLA Packet
              </h2>
              <p className="text-blue-100 text-sm max-w-2xl leading-relaxed">
                Receive our comprehensive compliance dossier including proof of ACT license, tax clearance certificates (Certidão de Não Dívida AT & Segurança Social), insurance policies, and sample workforce supply contracts.
              </p>
            </div>

            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3">
              <button
                onClick={onRequestQuote}
                className="w-full py-3.5 px-6 rounded-xl font-bold text-sm bg-[#FFD000] hover:bg-[#e6bc00] text-[#001738] transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-lg"
              >
                <span>Request Compliance Dossier</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => onNavigate('contact')}
                className="w-full py-3 px-6 rounded-xl font-semibold text-xs text-white bg-white/10 hover:bg-white/20 transition-colors flex items-center justify-center border border-white/20 cursor-pointer"
              >
                <span>Consult Legal & HR Advisory</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
