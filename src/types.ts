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
  | 'compliance'
  | 'blog'
  | 'admin'
  | 'sitemap'
  | 'sitemap-xml';

export type LanguageCode = 'en' | 'pt' | 'nl' | 'es';
export type Language = LanguageCode;

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  author: {
    name: string;
    role: string;
    avatarUrl?: string;
  };
  coverImageUrl: string;
  coverImage?: string;
  publishedDate: string;
  readTimeMinutes: number;
  readTime?: string;
  tags: string[];
  isFeatured?: boolean;
  isPublished: boolean;
}

export interface HeaderConfig {
  announcementText: string;
  announcementLinkText: string;
  announcementLinkPage: PageId;
  announcementEnabled: boolean;
  announcementBgColor: string;
  announcementTextColor: string;
  showTopBar: boolean;
  showTopPhone: boolean;
  showTopEmail: boolean;
  showTopWhatsApp: boolean;
  showTopLocation: boolean;
  showTopLicense: boolean;
  topBarLocationText: string;
  topBarWhatsAppBadgeText: string;
  topBarLicenseText: string;
  showLogoTagline: boolean;
  showNavHome: boolean;
  showNavServices: boolean;
  showNavIndustries: boolean;
  showNavEmployers: boolean;
  showNavJobseekers: boolean;
  showNavBlog: boolean;
  showNavLocations: boolean;
  showNavAbout: boolean;
  showNavContact: boolean;
  showSecondaryCta: boolean;
  secondaryCtaText: string;
  showPrimaryCta: boolean;
  ctaButtonText: string;
  showLanguageSelector: boolean;
}

export interface FooterConfig {
  showCtaBanner: boolean;
  ctaBannerBadge: string;
  ctaBannerHeading: string;
  ctaBannerSubtext: string;
  ctaButtonText: string;
  ctaWhatsAppText: string;
  showAboutColumn: boolean;
  aboutTitle: string;
  aboutText: string;
  showSocialLinks: boolean;
  showServicesColumn: boolean;
  servicesTitle: string;
  showIndustriesSublist: boolean;
  industriesTitle: string;
  showQuickLinksColumn: boolean;
  quickLinksTitle: string;
  showLicensingBox: boolean;
  licensingBoxTitle: string;
  licensingBoxText: string;
  showCallbackColumn: boolean;
  callbackTitle: string;
  callbackSubtext: string;
  callbackPlaceholder: string;
  callbackResponseTime: string;
  showOperatingHours: boolean;
  operatingHoursTitle: string;
  operatingHours: string;
  showCopyrightBar: boolean;
  copyrightText: string;
  registeredLocationText?: string;
  bottomLicenseText?: string;
  showFooterCertifications: boolean;
}

export interface HeroSlideConfig {
  id: string;
  category: string;
  eyebrow: string;
  headline: string;
  highlightText: string;
  description: string;
  buttonText: string;
  secondaryButtonText: string;
  imageKey: string;
}

export interface TrustMetricConfig {
  id: string;
  value: string;
  label: string;
  subtext: string;
}

export interface ProcessStepConfig {
  step: string;
  title: string;
  desc: string;
}

export interface HomePageConfig {
  showHeroSlider: boolean;
  showHeroQuickCards: boolean;
  showTrustMetrics: boolean;
  showServicesSection: boolean;
  showCalculatorSection: boolean;
  showIndustriesSection: boolean;
  showGlobalSection: boolean;
  showProcessSection: boolean;
  showComplianceSection: boolean;
  showTestimonialsSection: boolean;
  showFaqSection: boolean;
  showCtaBannerSection: boolean;
  heroSlides: HeroSlideConfig[];
  heroQuickCards: {
    badge: string;
    title: string;
    desc: string;
    pageId: PageId;
  }[];
  trustMetrics: TrustMetricConfig[];
  servicesSection: {
    badge: string;
    title: string;
    subtitle: string;
  };
  calculatorSection: {
    badge: string;
    title: string;
    subtitle: string;
  };
  industriesSection: {
    badge: string;
    title: string;
    subtitle: string;
    ctaText: string;
  };
  globalSection: {
    badge: string;
    title: string;
    subtitle: string;
    hubsTitle: string;
  };
  processSection: {
    badge: string;
    title: string;
    subtitle: string;
    steps: ProcessStepConfig[];
  };
  complianceSection: {
    badge: string;
    title: string;
    subtitle: string;
    card1Title: string;
    card1Desc: string;
    card2Title: string;
    card2Desc: string;
    card3Title: string;
    card3Desc: string;
    card4Title: string;
    card4Desc: string;
  };
  testimonialsSection: {
    badge: string;
    title: string;
    subtitle: string;
  };
  faqSection: {
    badge: string;
    title: string;
    subtitle: string;
    items: {
      question: string;
      answer: string;
    }[];
  };
  ctaBannerSection: {
    title: string;
    subtitle: string;
    buttonText: string;
    secondaryButtonText: string;
  };
}

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
