import React, { useState } from 'react';
import { X, CheckCircle2, Upload, FileText, Globe, MapPin, User, Mail, Phone, ShieldCheck, ArrowRight } from 'lucide-react';
import { JobPosting, CandidateApplication } from '../types';
import { COMPANY_INFO } from '../data/mockData';
import { useSiteSettings } from '../context/SiteSettingsContext';

interface ApplyJobModalProps {
  isOpen: boolean;
  onClose: () => void;
  job?: JobPosting | null;
}

export const ApplyJobModal: React.FC<ApplyJobModalProps> = ({
  isOpen,
  onClose,
  job
}) => {
  const { addJobApplication, addInquiry } = useSiteSettings();
  const [formData, setFormData] = useState<CandidateApplication>({
    jobId: job?.id || '',
    jobTitle: job?.title || 'General European Application',
    fullName: '',
    email: '',
    phone: '',
    nationality: '',
    currentLocation: '',
    preferredDestination: job?.country || 'Netherlands',
    experienceYears: '1-3 years',
    primarySkill: job?.industry || 'Logistics & Warehousing',
    hasEuPassportOrWorkPermit: true,
    requiresHousing: true,
    notes: ''
  });

  const [fileName, setFileName] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIsUploading(true);
      setTimeout(() => {
        setFileName(file.name);
        setIsUploading(false);
      }, 600);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    addJobApplication({
      jobTitle: formData.jobTitle,
      candidateName: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      nationality: formData.nationality,
      destination: formData.preferredDestination,
      experience: formData.experienceYears,
      cvName: fileName || 'Uploaded-CV.pdf',
      status: 'pending'
    });

    addInquiry({
      type: 'application',
      name: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      company: `Candidate for: ${formData.jobTitle}`,
      details: `Nationality: ${formData.nationality} | Destination: ${formData.preferredDestination} | Experience: ${formData.experienceYears} | Housing Needed: ${formData.requiresHousing ? 'Yes' : 'No'} | CV: ${fileName || 'None'}\nNotes: ${formData.notes}`
    });

    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    setFileName(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl shadow-slate-950/50 border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-[#0F2B68] via-[#1E40AF] to-[#2563EB] p-6 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold uppercase tracking-wider mb-1">
            <span>Zero Recruitment Fees Guarantee</span>
          </div>

          <h2 className="text-xl sm:text-2xl font-extrabold font-heading text-white">
            {job ? `Apply: ${job.title}` : 'Submit Your European Job Application'}
          </h2>
          <p className="text-blue-100 text-xs sm:text-sm mt-1">
            {job ? `${job.location}, ${job.country} • ${job.salaryRange}` : 'Register with Bluegate Work for verified opportunities across Portugal & Netherlands'}
          </p>
        </div>

        {/* Modal Content */}
        <div className="p-6 sm:p-8">
          {submitted ? (
            <div className="text-center py-8 space-y-4 animate-in fade-in">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-black text-slate-900 font-heading">
                Application Successfully Submitted!
              </h3>
              <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                Thank you, <span className="font-bold text-slate-900">{formData.fullName}</span>. Your application for <span className="font-bold text-[#1E40AF]">{job?.title || formData.primarySkill}</span> has been logged into our European talent matching system.
              </p>

              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 max-w-md mx-auto text-left text-xs space-y-2">
                <div className="font-bold text-slate-800 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>What happens next?</span>
                </div>
                <ul className="text-slate-600 space-y-1.5 pl-5 list-disc">
                  <li>Our recruitment team will review your CV within 24-48 business hours</li>
                  <li>We will contact you via WhatsApp (+{formData.phone}) for a quick phone screening</li>
                  <li>Free assistance with housing, commute, and legal documents is provided</li>
                </ul>
              </div>

              <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center">
                <button
                  onClick={handleReset}
                  className="px-6 py-2.5 rounded-xl bg-slate-900 text-white font-bold text-xs hover:bg-slate-800 transition-colors"
                >
                  Close Window
                </button>
                <a
                  href={COMPANY_INFO.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-2.5 rounded-xl bg-emerald-600 text-white font-bold text-xs hover:bg-emerald-700 transition-colors flex items-center justify-center gap-1.5"
                >
                  <span>Connect with Recruiter on WhatsApp</span>
                </a>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="e.g. Marco Silva"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:outline-none focus:ring-2 focus:ring-[#1E40AF]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="name@email.com"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:outline-none focus:ring-2 focus:ring-[#1E40AF]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Phone / WhatsApp Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+351 920 132 915"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:outline-none focus:ring-2 focus:ring-[#1E40AF]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Nationality / Citizenship *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.nationality}
                    onChange={(e) => setFormData({ ...formData, nationality: e.target.value })}
                    placeholder="e.g. Portuguese, Dutch, Brazilian, Indian..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:outline-none focus:ring-2 focus:ring-[#1E40AF]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Preferred Destination Country
                  </label>
                  <select
                    value={formData.preferredDestination}
                    onChange={(e) => setFormData({ ...formData, preferredDestination: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[#1E40AF]"
                  >
                    <option value="Portugal">Portugal (Santarém, Lisbon, Algarve)</option>
                    <option value="Netherlands">Netherlands (Rotterdam, Tilburg, Westland)</option>
                    <option value="Germany">Germany</option>
                    <option value="Any EU Location">Open to Any European Destination</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Relevant Experience
                  </label>
                  <select
                    value={formData.experienceYears}
                    onChange={(e) => setFormData({ ...formData, experienceYears: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[#1E40AF]"
                  >
                    <option value="No experience (Eager to learn)">No experience (Eager to learn)</option>
                    <option value="1-3 years">1 - 3 years experience</option>
                    <option value="3-5 years">3 - 5 years experience</option>
                    <option value="5+ years (Certified Specialist)">5+ years (Certified Specialist)</option>
                  </select>
                </div>
              </div>

              {/* Upload CV Box */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Upload Resume / CV (PDF, DOCX) or Certificates
                </label>
                <div className="relative border-2 border-dashed border-slate-300 hover:border-[#1E40AF] rounded-2xl p-4 text-center bg-slate-50/60 transition-colors">
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileUpload}
                    className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
                  />
                  <div className="flex flex-col items-center justify-center gap-1.5 text-xs text-slate-600">
                    {fileName ? (
                      <div className="flex items-center gap-2 text-emerald-700 font-bold">
                        <FileText className="w-5 h-5 text-emerald-600" />
                        <span>{fileName} (Attached)</span>
                      </div>
                    ) : isUploading ? (
                      <div className="text-blue-600 font-semibold animate-pulse">Uploading CV...</div>
                    ) : (
                      <>
                        <Upload className="w-6 h-6 text-slate-400" />
                        <span className="font-semibold text-slate-700">Click to attach CV or drag & drop</span>
                        <span className="text-[10px] text-slate-400">PDF, DOC, DOCX up to 10MB</span>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Housing & Document Checkboxes */}
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-2 text-xs">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.hasEuPassportOrWorkPermit}
                    onChange={(e) => setFormData({ ...formData, hasEuPassportOrWorkPermit: e.target.checked })}
                    className="rounded text-[#1E40AF]"
                  />
                  <span className="text-slate-700">I have a valid EU Passport, Portuguese NIF, or European Work Permit (or need visa guidance)</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.requiresHousing}
                    onChange={(e) => setFormData({ ...formData, requiresHousing: e.target.checked })}
                    className="rounded text-[#1E40AF]"
                  />
                  <span className="text-slate-700">I would like Bluegate Work to arrange accommodation and daily transport</span>
                </label>
              </div>

              <div className="pt-3 flex justify-between items-center">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-slate-500 hover:text-slate-800 text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  id="submit-candidate-application"
                  className="px-8 py-3 rounded-xl bg-gradient-to-r from-[#1E40AF] to-[#2563EB] hover:from-[#1D4ED8] hover:to-[#1D4ED8] text-white font-bold text-xs uppercase tracking-wider shadow-md shadow-blue-900/20 flex items-center gap-2 cursor-pointer"
                >
                  <span>Submit Application</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
