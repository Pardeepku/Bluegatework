export type PageId =
  | 'home'
  | 'about'
  | 'services'
  | 'temporary-staffing'
  | 'outsourcing'
  | 'international-recruitment'
  | 'industries'
  | 'for-employers'
  | 'for-jobseekers'
  | 'locations'
  | 'contact'
  | 'compliance';

export type LanguageCode = 'en' | 'pt' | 'nl' | 'es';
export type Language = LanguageCode;

export interface ServiceItem {
  id: string;
  pageId: PageId;
  title: string;
  tagline: string;
  shortDescription: string;
  fullDescription: string;
  icon: string;
  badge: string;
  keyBenefits: string[];
  capabilities: string[];
  industries: string[];
  deploymentTime: string;
  complianceAssurance: string;
  stats: { label: string; value: string }[];
  processSteps: { step: string; title: string; desc: string }[];
  faqs: { question: string; answer: string }[];
}

export interface IndustryItem {
  id: string;
  name: string;
  icon: string;
  shortDesc: string;
  detailedDesc: string;
  popularRoles: string[];
  locations: string[];
  demandLevel: 'High' | 'Very High' | 'Seasonal Peak';
  avgDeploymentDays: string;
}

export interface JobPosting {
  id: string;
  title: string;
  industry: string;
  location: string;
  country: 'Portugal' | 'Netherlands' | 'Germany' | 'France' | 'Remote / EU Wide';
  contractType: 'Full-time' | 'Temporary' | 'Seasonal' | 'Contract';
  salaryRange: string;
  accommodationProvided: boolean;
  transportProvided: boolean;
  vacancies: number;
  experienceLevel: 'Entry-level' | 'Mid-level' | 'Skilled / Certified';
  languageRequired: string;
  description: string;
  requirements: string[];
  benefits: string[];
  postedDate: string;
}

export interface Testimonial {
  id: string;
  authorName: string;
  role: string;
  companyOrCountry: string;
  type: 'employer' | 'candidate';
  rating: number;
  quote: string;
  serviceUsed: string;
  location: string;
}

export interface LocationHub {
  id: string;
  name: string;
  country: string;
  type: 'Headquarters' | 'Operations Branch' | 'Recruitment Hub' | 'Global Corridor';
  address?: string;
  city: string;
  focus: string;
  phone?: string;
  email?: string;
  activeWorkforceCount: string;
  keyIndustries: string[];
}

export interface QuoteRequest {
  serviceType: string;
  targetCountry: string;
  industry: string;
  headcountNeeded: number;
  urgency: 'Immediate (1-3 days)' | 'Within 2 weeks' | 'Next month' | 'Planning ahead';
  requiresAccommodation: boolean;
  companyName: string;
  contactPerson: string;
  email: string;
  phone: string;
  additionalDetails?: string;
}

export interface CandidateApplication {
  jobId?: string;
  jobTitle?: string;
  fullName: string;
  email: string;
  phone: string;
  nationality: string;
  currentLocation: string;
  preferredDestination: string;
  experienceYears: string;
  primarySkill: string;
  hasEuPassportOrWorkPermit: boolean;
  requiresHousing: boolean;
  notes?: string;
}
