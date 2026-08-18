import { ServiceItem, IndustryItem, JobPosting, Testimonial, LocationHub } from '../types';

export const COMPANY_INFO = {
  name: 'Bluegate Work',
  legalName: 'Bluegate Work Lda',
  tagline: 'Your Gateway to Global Workforce & European Staffing Solutions',
  shortDesc: 'Premier European workforce provider operating across Portugal, the Netherlands, and globally. Delivering compliant temporary staffing, managed outsourcing, and international talent recruitment.',
  phone: '+351 920 132 915',
  phoneDisplay: '+351 920 132 915',
  email: 'info@bluegatework.com',
  website: 'https://bluegatework.com',
  address: {
    street: 'RUA DOM FERNANDO I 25 RIO MAIOR RIO MAIOR',
    city: 'Rio Maior',
    district: 'Santarém',
    postalCode: '2040-265',
    country: 'Portugal',
    full: 'RUA DOM FERNANDO I 25 RIO MAIOR RIO MAIOR, Rio Maior, Santarém, 2040-265, Portugal'
  },
  whatsapp: '+351 920 132 915',
  whatsappUrl: 'https://wa.me/351920132915?text=Hello%20Bluegate%20Work%2C%20I%20am%20interested%20in%20your%20workforce%20services.',
  social: {
    facebook: 'https://facebook.com/bluegatework',
    instagram: 'https://instagram.com/bluegatework',
    youtube: 'https://youtube.com/bluegatework',
    linkedin: 'https://linkedin.com/company/bluegatework'
  },
  hours: 'Mon - Fri: 08:30 - 18:30 CET (24/7 Emergency On-call support for active client deployments)',
  licensing: 'Fully licensed Temporary Work Agency (ETT) & Certified European Cross-Border Workforce Provider'
};

export const TRUST_METRICS = [
  { label: 'European & Global Placements', value: '12,500+', change: '+24% YoY', icon: 'Users' },
  { label: 'Partner Client Companies', value: '380+', change: 'Portugal & Netherlands', icon: 'Building2' },
  { label: 'Average Rapid Deployment', value: '48 - 72h', change: 'Emergency ready', icon: 'Zap' },
  { label: 'EU Legal & Labor Compliance', value: '100%', change: 'A1 & ACT Certified', icon: 'ShieldCheck' }
];

export const CORE_SERVICES: ServiceItem[] = [
  {
    id: 'temporary-staffing',
    pageId: 'temporary-staffing',
    title: 'Temporary Work Staffing',
    tagline: 'Agile, On-Demand Workforce Tailored to Your Operational Surges',
    badge: 'High Flexibility',
    icon: 'Users2',
    shortDescription: 'Flexible, legally certified temporary staffing solutions for seasonal peaks, project expansions, and immediate operational shifts in Portugal, Netherlands, and Europe.',
    fullDescription: 'Bluegate Work provides end-to-end temporary staffing services designed to maintain optimal business productivity. We handle candidate sourcing, rigorous pre-screening, employment contracts, payroll administration, social security, insurance, and certified worker accommodation, freeing your management to focus purely on core business growth.',
    keyBenefits: [
      'Rapid deployment within 48 to 72 hours for urgent production shifts',
      'Zero employer liability overhead; we manage payroll, taxes, and A1 certificates',
      'Pre-vetted, background-checked and work-ready certified personnel',
      'Seamless scalability: expand or downsize workforce without administrative friction',
      '24/7 on-call coordinator support and bilingual field management'
    ],
    capabilities: [
      'Seasonal Peak Management (Agriculture, Logistics, Tourism)',
      'Shift-Based Replacement & Surge Capacity Staffing',
      'Multi-lingual On-site Coordination & Daily Attendance Tracking',
      'Transport and Certified Housing Logistics'
    ],
    industries: ['Logistics & Warehousing', 'Agriculture & Agri-food', 'Manufacturing & Assembly', 'Hospitality & Events'],
    deploymentTime: '48 - 72 Hours',
    complianceAssurance: '100% compliant with Portuguese ACT regulations, Dutch SNA/NEN standards, and EU Posting of Workers Directives.',
    stats: [
      { label: 'Time to First Worker Onsite', value: '< 72h' },
      { label: 'Placement Retention Rate', value: '96.8%' },
      { label: 'Payroll & Social Security Accuracy', value: '100%' }
    ],
    processSteps: [
      { step: '01', title: 'Operational Audit', desc: 'We analyze your required headcount, shift requirements, skill profile, and start date.' },
      { step: '02', title: 'Talent Sourcing & Vetting', desc: 'Instant matching from our active candidate bench with skills assessment and document verification.' },
      { step: '03', title: 'Contracting & Legal Paperwork', desc: 'We execute labor contracts, insurance, A1 postings, and arrange worker transport/housing.' },
      { step: '04', title: 'Onsite Deployment & Tracking', desc: 'Workers arrive on time, equipped with PPE, guided by our dedicated field supervisor.' }
    ],
    faqs: [
      { question: 'How quickly can Bluegate Work deploy temporary workers to our facility?', answer: 'For standard logistics, assembly, or agricultural positions, we deploy certified workers within 48 to 72 hours from request confirmation.' },
      { question: 'Who is legally responsible for payroll and worker taxes?', answer: 'Bluegate Work serves as the official legal employer. We assume complete responsibility for payroll, social security contributions, worker compensation insurance, and statutory benefits.' },
      { question: 'Do you arrange housing and transportation for workers?', answer: 'Yes. For cross-border or relocated temporary staff in Portugal and the Netherlands, we manage fully inspected SNF-compliant housing and daily site commutes.' }
    ]
  },
  {
    id: 'outsourcing',
    pageId: 'outsourcing',
    title: 'Workforce Outsourcing',
    tagline: 'Turnkey Departmental & Project Execution with Guaranteed SLAs',
    badge: 'Turnkey Management',
    icon: 'Briefcase',
    shortDescription: 'Comprehensive workforce management and process outsourcing. We take full ownership of operational lines, quality control, supervision, and workforce efficiency.',
    fullDescription: 'Transform fixed labor overheads into flexible, performance-driven operational output. Bluegate Work manages entire production lines, packaging units, agricultural harvesting blocks, or warehouse sections with dedicated on-site team leaders, measurable KPIs, and comprehensive accountability.',
    keyBenefits: [
      'Fixed cost per unit produced or guaranteed service-level agreements (SLAs)',
      'Dedicated on-site supervisors and bilingual shift leads included',
      'Continuous productivity optimization and lean workflow monitoring',
      'Substantial reduction in internal HR, recruitment, and management overhead',
      'Full insurance coverage and quality assurance audits'
    ],
    capabilities: [
      'Complete Warehouse & Order Fulfillment Operations',
      'Industrial Assembly Line Management & Quality Inspection',
      'Agricultural Harvesting & Sorting Facilities',
      'Facility Maintenance & Sanitation Teams'
    ],
    industries: ['Logistics & Supply Chain', 'Automotive & Industrial Manufacturing', 'Food Processing & Packaging', 'Construction Sites'],
    deploymentTime: '1 - 2 Weeks for full line transition',
    complianceAssurance: 'Guaranteed ISO-aligned workplace safety practices, certified equipment training, and labor compliance.',
    stats: [
      { label: 'Average Client Cost Reduction', value: '22%' },
      { label: 'SLA Quality Adherence', value: '99.4%' },
      { label: 'Supervised Operations', value: '50+ Lines' }
    ],
    processSteps: [
      { step: '01', title: 'Process Mapping', desc: 'We document your operational workflows, key output metrics, and quality standards.' },
      { step: '02', title: 'Team Architecture', desc: 'We curate dedicated squads comprising skilled operators, technical leads, and bilingual supervisors.' },
      { step: '03', title: 'SLA Definition & Ramp-Up', desc: 'Formal service contracts with output targets, response times, and quality scorecards.' },
      { step: '04', title: 'Autonomous Execution & Reporting', desc: 'Daily KPI dashboards, weekly productivity reviews, and proactive optimization.' }
    ],
    faqs: [
      { question: 'What is the difference between temporary staffing and outsourcing?', answer: 'In temporary staffing, workers integrate directly into your daily supervision. In outsourcing, Bluegate Work assumes full operational responsibility, providing our own on-site team leaders and delivering on agreed output KPIs and SLAs.' },
      { question: 'How do you ensure quality standards are maintained?', answer: 'Our dedicated on-site supervisors perform continuous quality audits, enforce strict standard operating procedures (SOPs), and report real-time production analytics.' }
    ]
  },
  {
    id: 'international-recruitment',
    pageId: 'international-recruitment',
    title: 'International Recruitment',
    tagline: 'Bridging Global Talent Corridors with European Labor Demand',
    badge: 'Global Mobility',
    icon: 'Globe2',
    shortDescription: 'End-to-end cross-border talent acquisition. Connecting European employers with pre-vetted skilled and semi-skilled workers from across the globe with complete visa, work permit, and relocation support.',
    fullDescription: 'Facing local labor shortages? Bluegate Work operates active talent corridors across Europe, Asia, Latin America, and beyond. We oversee international sourcing, biometric verification, technical skill assessments, consular visa processing, embassy filings, flight bookings, European onboarding, and cultural integration.',
    keyBenefits: [
      'Direct access to an international talent pool of over 50,000 pre-screened candidates',
      'Comprehensive legal handling: Work Visas, Residence Permits, A1 Postings, Tax IDs (NIF/BSN)',
      'Pre-departure trade testing, safety orientation, and basic language training',
      'Turnkey relocation logistics: air travel, airport pickup, and secure accommodation',
      'High retention rates exceeding 94% on long-term contracts'
    ],
    capabilities: [
      'Certified Welders, CNC Machinists & Industrial Technicians',
      'Commercial Drivers (Code 95) & Heavy Machinery Operators',
      'High-Volume Agricultural & Food Processing Teams',
      'Multilingual Logistics & E-Commerce Operatives'
    ],
    industries: ['Heavy Industry & Metal Construction', 'International Logistics', 'Commercial Farming & Greenhouse', 'Green Energy & Solar Installations'],
    deploymentTime: '3 - 6 Weeks (depending on visa corridor)',
    complianceAssurance: 'Strict adherence to the Dhaka Principles, Fair Recruitment Initiative, zero worker-paid recruitment fees, and full consular transparency.',
    stats: [
      { label: 'Active Sourcing Countries', value: '18+' },
      { label: 'Visa Approval Success Rate', value: '98.7%' },
      { label: 'Average Worker Contract Length', value: '18 Months' }
    ],
    processSteps: [
      { step: '01', title: 'Skill Profile Definition', desc: 'Custom job specification, language requirements, and technical trade certifications.' },
      { step: '02', title: 'Global Sourcing & Trade Testing', desc: 'Video interviews, practical video assessments, and background reference checks.' },
      { step: '03', title: 'Immigration & Consular Processing', desc: 'Our legal team expedites work contracts, government approvals, and consular visa appointments.' },
      { step: '04', title: 'European Arrival & Onboarding', desc: 'Airport greeting, local tax/social security registration, bank accounts, and factory introduction.' }
    ],
    faqs: [
      { question: 'Which countries do you source international workers from?', answer: 'We operate established sourcing hubs across Eastern Europe (Poland, Romania), Latin America (Brazil, Colombia), and South/Southeast Asia (India, Philippines, Vietnam, Nepal), always respecting ethical recruitment standards.' },
      { question: 'How long does the visa and legal paperwork process take?', answer: 'For EU citizens, deployment takes under 1 week. For non-EU candidates requiring work visas, average consular processing takes between 3 to 6 weeks depending on the destination country (Portugal or Netherlands).' }
    ]
  }
];

export const INDUSTRIES: IndustryItem[] = [
  {
    id: 'logistics',
    name: 'Logistics, Warehousing & E-Commerce',
    icon: 'Package',
    shortDesc: 'Order pickers, reach-truck drivers, inventory controllers, and shift managers for dynamic distribution hubs.',
    detailedDesc: 'Supplying rapid high-volume workforce for modern fulfillment centers across Portugal and the Netherlands, with certified EPT/reach truck operators and seasonal parcel sorters.',
    popularRoles: ['Order Pickers & Packers', 'Forklift / Reach Truck Operators (Certified)', 'Inventory Clerks', 'Dispatch Coordinators'],
    locations: ['Netherlands (Rotterdam, Tilburg, Venlo)', 'Portugal (Lisbon, Porto, Santarém)'],
    demandLevel: 'Very High',
    avgDeploymentDays: '2 - 3 Days'
  },
  {
    id: 'agriculture',
    name: 'Agriculture, Horticulture & Agri-Food',
    icon: 'Sprout',
    shortDesc: 'Harvesting teams, greenhouse technicians, sorting operatives, and farm managers for high-yield operations.',
    detailedDesc: 'Specialized seasonal and permanent agricultural crews for fruit picking, automated greenhouses, winery harvesting, and vegetable processing facilities.',
    popularRoles: ['Greenhouse Cultivation Specialists', 'Harvesting Operatives', 'Fresh Produce Sorters', 'Agri-Equipment Drivers'],
    locations: ['Portugal (Ribatejo, Alentejo, Algarve)', 'Netherlands (Westland, North Brabant)'],
    demandLevel: 'Seasonal Peak',
    avgDeploymentDays: '3 - 5 Days'
  },
  {
    id: 'construction',
    name: 'Construction, Infrastructure & Energy',
    icon: 'HardHat',
    shortDesc: 'Formwork carpenters, steel fixers, certified welders, electricians, and heavy machine operators.',
    detailedDesc: 'Qualified civil and commercial construction personnel equipped with VCA/safety certifications, ready for high-spec European infrastructure and renewable projects.',
    popularRoles: ['Formwork Carpenters', 'Certified TIG/MIG Welders', 'Solar PV Installers', 'Industrial Electricians'],
    locations: ['Portugal Nationwide', 'Netherlands', 'Germany & France Corridors'],
    demandLevel: 'High',
    avgDeploymentDays: '4 - 7 Days'
  },
  {
    id: 'manufacturing',
    name: 'Manufacturing, Automotive & Assembly',
    icon: 'Cpu',
    shortDesc: 'Line operators, CNC machinists, quality controllers, and electro-mechanical technicians.',
    detailedDesc: 'Precision-minded manufacturing workforce adhering to lean manufacturing and 5S standards for automotive supply chains and high-tech assembly.',
    popularRoles: ['Assembly Line Operators', 'CNC Programmers', 'Quality Assurance Technicians', 'Maintenance Mechanics'],
    locations: ['Portugal (Setúbal, Aveiro, Braga)', 'Netherlands (Eindhoven, Twente)'],
    demandLevel: 'High',
    avgDeploymentDays: '3 - 5 Days'
  },
  {
    id: 'hospitality',
    name: 'Hospitality, Catering & Facility Services',
    icon: 'Utensils',
    shortDesc: 'Chefs, kitchen assistants, housekeeping crews, and industrial sanitization specialists.',
    detailedDesc: 'Professional hotel and catering staff tailored for European tourist hubs, luxury resorts, and high-capacity corporate catering events.',
    popularRoles: ['Line & Prep Cooks', 'Housekeeping Supervisors', 'Event Stewards', 'Industrial Cleaners'],
    locations: ['Portugal (Algarve, Lisbon, Madeira)', 'Netherlands (Amsterdam, The Hague)'],
    demandLevel: 'Seasonal Peak',
    avgDeploymentDays: '2 - 4 Days'
  },
  {
    id: 'technical-transport',
    name: 'Technical Services & Commercial Transport',
    icon: 'Truck',
    shortDesc: 'International truck drivers (CE/Code 95), HVAC technicians, and renewable energy technicians.',
    detailedDesc: 'Licensed long-haul and regional commercial drivers alongside certified technical trades serving critical European supply lines.',
    popularRoles: ['CE Truck Drivers (Code 95)', 'HVAC & Refrigeration Techs', 'Hydraulics Specialists', 'Crane Operators'],
    locations: ['European Transit Corridors', 'Portugal', 'Netherlands'],
    demandLevel: 'Very High',
    avgDeploymentDays: '5 - 10 Days'
  }
];

export const LOCATION_HUBS: LocationHub[] = [
  {
    id: 'portugal-hq',
    name: 'Portugal Global Headquarters',
    country: 'Portugal',
    type: 'Headquarters',
    address: 'RUA DOM FERNANDO I 25 RIO MAIOR RIO MAIOR',
    city: 'Rio Maior, Santarém (2040-265)',
    focus: 'Executive Management, Southern European Operations, Legal & Consular Affairs, Central Candidate Processing',
    phone: '+351 920 132 915',
    email: 'info@bluegatework.com',
    activeWorkforceCount: '5,800+ Placed Workers',
    keyIndustries: ['Agriculture & Agri-Food', 'Industrial Manufacturing', 'Logistics Hubs', 'Renewable Energy']
  },
  {
    id: 'netherlands-branch',
    name: 'Netherlands Operations Branch',
    country: 'Netherlands',
    type: 'Operations Branch',
    city: 'Rotterdam / Tilburg Region',
    focus: 'Benelux Logistics, High-Tech Greenhouse Agriculture, E-commerce Fulfillment, SNF Housing Management',
    phone: '+351 920 132 915',
    email: 'info@bluegatework.com',
    activeWorkforceCount: '4,200+ Active Personnel',
    keyIndustries: ['E-Commerce Logistics', 'Cold Storage & Distribution', 'Greenhouse Horticulture', 'Automotive Supply']
  },
  {
    id: 'eastern-europe-hub',
    name: 'Central & Eastern European Talent Hub',
    country: 'Poland & Romania',
    type: 'Recruitment Hub',
    city: 'Warsaw & Bucharest',
    focus: 'Certified Trade Sourcing, EU Cross-Border Postings, A1 Direct Administration, Technical Skills Testing',
    activeWorkforceCount: '1,500+ Sourced Annually',
    keyIndustries: ['Construction Trades', 'Industrial Welding', 'Heavy Machinery', 'Commercial Transport']
  },
  {
    id: 'global-corridor',
    name: 'Global Talent Corridors (Asia & Latin America)',
    country: 'Global',
    type: 'Global Corridor',
    city: 'New Delhi, Manila, São Paulo & Bogota',
    focus: 'Consular Visa Processing, Pre-Departure Skills Assessments, Background Checks, Language & Cultural Orientation',
    activeWorkforceCount: '2,000+ Sourced Annually',
    keyIndustries: ['Skilled Manufacturing', 'Agri-Processing', 'Hospitality', 'Logistics Operations']
  }
];

export const ACTIVE_JOBS: JobPosting[] = [
  {
    id: 'job-1',
    title: 'Certified Reach Truck & EPT Operators',
    industry: 'Logistics & Warehousing',
    location: 'Tilburg / Venlo',
    country: 'Netherlands',
    contractType: 'Full-time',
    salaryRange: '€2,400 - €2,950 / month (Gross + Shift Allowances)',
    accommodationProvided: true,
    transportProvided: true,
    vacancies: 15,
    experienceLevel: 'Skilled / Certified',
    languageRequired: 'Basic English or Dutch',
    description: 'Operating modern reach trucks in a high-tech ambient and temperature-controlled distribution center. Fast-paced picking, palletizing, and barcode scanning.',
    requirements: [
      'Valid Reach Truck / EPT Certificate',
      'Minimum 1 year relevant warehouse driving experience',
      'Willingness to work rotating morning/afternoon shifts',
      'EU Passport or valid Dutch work authorization'
    ],
    benefits: [
      'Certified single-room SNF accommodation provided',
      'Free daily commuter transportation or company e-bike',
      'Weekly payroll payout directly to your bank account',
      'Dutch health insurance coordination and holiday pay'
    ],
    postedDate: 'Today'
  },
  {
    id: 'job-2',
    title: 'Automated Greenhouse Horticulture Specialists',
    industry: 'Agriculture & Horticulture',
    location: 'Westland / Bleiswijk',
    country: 'Netherlands',
    contractType: 'Full-time',
    salaryRange: '€2,250 - €2,600 / month',
    accommodationProvided: true,
    transportProvided: true,
    vacancies: 20,
    experienceLevel: 'Entry-level',
    languageRequired: 'Basic English or Spanish or Portuguese',
    description: 'Care, cultivation, harvesting, and packaging of tomatoes and bell peppers in high-tech climate-controlled glass greenhouses.',
    requirements: [
      'Good physical fitness and dexterity',
      'Punctual, reliable and team-oriented attitude',
      'EU citizenship or applicable work visa'
    ],
    benefits: [
      'Clean modern housing close to workplace',
      'Overtime bonus pay (125% - 150%)',
      'On-site training and advancement to team lead',
      'Full statutory benefits and pension enrollment'
    ],
    postedDate: '1 day ago'
  },
  {
    id: 'job-3',
    title: 'Industrial Assembly & Production Operators',
    industry: 'Manufacturing & Automotive',
    location: 'Santarém / Setúbal',
    country: 'Portugal',
    contractType: 'Full-time',
    salaryRange: '€1,200 - €1,650 / month + Meal Allowance',
    accommodationProvided: true,
    transportProvided: true,
    vacancies: 12,
    experienceLevel: 'Entry-level',
    languageRequired: 'Portuguese or Basic English',
    description: 'Component assembly, machine feeding, and quality check on automotive cable and mechanical sub-assemblies.',
    requirements: [
      'Attention to detail and manual precision',
      'Ability to follow technical work instructions',
      'Valid Portuguese NIF and Social Security (or eligible for Bluegate registration)'
    ],
    benefits: [
      'Permanent contract prospect after 6 months',
      'Subsidized company canteen meal vouchers',
      'Safe working environment with PPE provided',
      'Comprehensive on-job safety onboarding'
    ],
    postedDate: '2 days ago'
  },
  {
    id: 'job-4',
    title: 'TIG & MIG Certified Pipe Welders (6G)',
    industry: 'Construction & Engineering',
    location: 'Lisbon Port & Industrial Zone',
    country: 'Portugal',
    contractType: 'Contract',
    salaryRange: '€2,200 - €3,100 / month',
    accommodationProvided: true,
    transportProvided: true,
    vacancies: 8,
    experienceLevel: 'Skilled / Certified',
    languageRequired: 'English or Portuguese',
    description: 'High-precision pipe welding for marine and industrial pipeline projects. Radiographic testing quality standards.',
    requirements: [
      'Valid 6G welding certification (TIG 141 / MIG 131)',
      'Proven track record in industrial fabrication',
      'Ability to interpret ISO piping isometric drawings'
    ],
    benefits: [
      'High-spec premium PPE and Miller welding gear',
      'Comfortable private apartment accommodation',
      'Travel allowance and performance bonuses'
    ],
    postedDate: '3 days ago'
  },
  {
    id: 'job-5',
    title: 'Order Pickers & E-Commerce Packers (Voice-Pick)',
    industry: 'Logistics & Warehousing',
    location: 'Eindhoven / Rotterdam',
    country: 'Netherlands',
    contractType: 'Temporary',
    salaryRange: '€2,300 - €2,750 / month',
    accommodationProvided: true,
    transportProvided: true,
    vacancies: 25,
    experienceLevel: 'Entry-level',
    languageRequired: 'English',
    description: 'Handling consumer electronics and fashion orders using headset voice-picking systems and hand scanners.',
    requirements: [
      'Basic English communication skills',
      'Ability to walk and stand during shift hours',
      'Positive work ethic and motivation'
    ],
    benefits: [
      'Full accommodation and daily transport setup',
      'Weekly salary deposit with payslips on mobile app',
      'Free coffee, snacks and modern breakrooms'
    ],
    postedDate: 'Just now'
  },
  {
    id: 'job-6',
    title: 'International Commercial Drivers (CE / Code 95)',
    industry: 'Technical & Transport',
    location: 'Benelux & EU Transit',
    country: 'Netherlands',
    contractType: 'Full-time',
    salaryRange: '€3,200 - €4,100 / month (Net allowances included)',
    accommodationProvided: false,
    transportProvided: true,
    vacancies: 6,
    experienceLevel: 'Skilled / Certified',
    languageRequired: 'English, German, or Dutch',
    description: 'International freight haulage across the Netherlands, Belgium, and Germany with modern Euro-6 Volvo/Scania trucks.',
    requirements: [
      'Driving License Category CE + Driver Card (Tachograph)',
      'Valid European Code 95 certification',
      'Minimum 2 years international driving experience'
    ],
    benefits: [
      'Top-tier modern trucks with cabin comfort pack',
      'Flexible driving schedule options (3/1 or 2/2 weeks)',
      'Comprehensive European insurance and daily allowances'
    ],
    postedDate: '4 days ago'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 'test-1',
    authorName: 'Dirk van der Meer',
    role: 'Operations Director',
    companyOrCountry: 'Benelux Logistics Park B.V. (Netherlands)',
    type: 'employer',
    rating: 5,
    quote: 'When our warehouse experienced a sudden 300% surge during peak quarter, Bluegate Work provided 45 certified reach truck operators within 48 hours. The workers were fully documented, housed properly, and productive from Day 1. Their compliance standards in the Netherlands are flawless.',
    serviceUsed: 'Temporary Work Staffing',
    location: 'Rotterdam, Netherlands'
  },
  {
    id: 'test-2',
    authorName: 'Manuel Ferreira',
    role: 'Managing Partner',
    companyOrCountry: 'AgroSul Frutas de Portugal',
    type: 'employer',
    rating: 5,
    quote: 'Bluegate Work completely transformed our seasonal harvesting operations in Santarém. Their workforce outsourcing model gave us guaranteed output with on-site bilingual coordinators who handled everything from daily attendance to health protocols. A true strategic partner.',
    serviceUsed: 'Workforce Outsourcing',
    location: 'Rio Maior / Santarém, Portugal'
  },
  {
    id: 'test-3',
    authorName: 'Arjun Sharma',
    role: 'CNC Machinist & Team Lead',
    companyOrCountry: 'Placed in Eindhoven Industrial Cluster',
    type: 'candidate',
    rating: 5,
    quote: 'Bluegate Work handled my international recruitment from India to Europe with absolute transparency. Zero illegal fees, fast visa processing, and when I landed in Europe their coordinator met me at the airport, arranged my Dutch BSN, and provided great accommodation.',
    serviceUsed: 'International Recruitment',
    location: 'Eindhoven, Netherlands'
  },
  {
    id: 'test-4',
    authorName: 'Carla Silveira',
    role: 'HR & Plant Director',
    companyOrCountry: 'Lusitânia Componentes Automotivos',
    type: 'employer',
    rating: 5,
    quote: 'The level of labor law compliance and candidate vetting Bluegate Work brings is second to none. We have worked with multiple temporary agencies in Portugal, but Bluegate stands out for their responsiveness, reliability, and ethical treatment of every single worker.',
    serviceUsed: 'Temporary Staffing & Outsourcing',
    location: 'Setúbal, Portugal'
  }
];

export const COMPLIANCE_STANDARDS = [
  {
    title: 'ACT & Portuguese Labor Authority',
    badge: 'Certified ETT',
    desc: 'Fully registered and audited under Portuguese Authority for Working Conditions (ACT), guaranteeing legal payroll, health checks, and worker safety insurance.'
  },
  {
    title: 'Dutch NEN 4400-1 & SNA Standards',
    badge: 'Benelux Aligned',
    desc: 'Strict adherence to Dutch Labor Standards Foundation (SNA) norms, ensuring proper tax payments, BSN registrations, and collective labor agreements (CAO).'
  },
  {
    title: 'EU Posting of Workers Directive (A1)',
    badge: 'Cross-Border Legal',
    desc: 'Seamless, audited cross-border deployments across the EU with verified A1 certificates, avoiding double social security and shielding clients from tax liabilities.'
  },
  {
    title: 'Fair Recruitment & Zero-Fee Pledge',
    badge: 'Ethical Standard',
    desc: 'Strict compliance with international ethical labor conventions: no candidate ever pays recruitment fees for jobs with Bluegate Work.'
  }
];

export const FAQS_HOMEPAGE = [
  {
    category: 'For Employers',
    question: 'How quickly can Bluegate Work supply workers to our facility in Portugal or the Netherlands?',
    answer: 'For standard logistics, manufacturing, and agricultural roles, our active bench allows deployment within 48 to 72 hours. For specialized technical roles or international recruitment requiring visas, our pipeline takes between 2 to 4 weeks with complete documentation.'
  },
  {
    category: 'For Employers',
    question: 'What legal liabilities does our company bear when hiring through Bluegate Work?',
    answer: 'Zero liability for employment administration. Bluegate Work operates as the authorized employer of record. We manage labor contracts, gross/net payroll, social security contributions, worker accident insurance, and A1 postings with 100% indemnity.'
  },
  {
    category: 'For Employers',
    question: 'Do you manage worker accommodation and daily commuting logistics?',
    answer: 'Yes. In both Portugal and the Netherlands, Bluegate Work maintains verified, SNF-inspected residential accommodations and a fleet of company commuter vehicles to ensure 99.8% on-time shift arrivals.'
  },
  {
    category: 'For Candidates',
    question: 'Do candidates have to pay any recruitment or application fees to Bluegate Work?',
    answer: 'Absolutely NOT. Bluegate Work strictly upholds the International Labour Organization (ILO) zero-fee policy. All recruitment, visa assistance, and job placements are 100% free of charge for candidates.'
  },
  {
    category: 'For Candidates',
    question: 'What support does Bluegate Work provide upon arriving in Portugal or the Netherlands?',
    answer: 'We provide end-to-end relocation support: airport pickup, safe housing, assistance with local tax numbers (Portuguese NIF or Dutch BSN), European bank account opening, medical checkups, PPE work gear, and a dedicated bilingual coordinator.'
  }
];

export const DEFAULT_BLOG_POSTS = [
  {
    id: 'blog-1',
    slug: 'navigating-cross-border-eu-labor-postings-a1-compliance',
    title: 'Navigating Cross-Border EU Labor Directives & A1 Posting Compliance in 2026',
    excerpt: 'A comprehensive guide for European supply chain and manufacturing executives on legal workforce mobility between Portugal, Netherlands, and Germany without tax exposure.',
    content: `## The Modern Landscape of European Cross-Border Workforce Mobility

In an interconnected European Union, labor shortages in high-demand logistics corridors (such as Venlo, Rotterdam, and Brabant in the Netherlands) can be solved through strategic cross-border postings from southern European hubs like Portugal. However, compliance with the **EU Directive on the Posting of Workers (Directive 96/71/EC and Directive 2018/957/EU)** is essential to avoid chain liability, heavy penalties, and labor audits.

### Key Compliance Cornerstones:
1. **The A1 Portable Certificate:** Guarantees that the posted worker remains subject to the social security system of their home member state, preventing double taxation and ensuring unhindered social coverage.
2. **Equal Pay for Equal Work:** Host countries mandate that posted workers receive identical minimum wages, overtime rates, and collective labor agreement (CAO) allowances as local domestic workers.
3. **Accommodation & Transport Standards:** Ensuring SNF-certified residential housing and insured commuting solutions so employees are rested, safe, and productive.

### Why Certified Temporary Work Agencies (ETT) Matter
Partnering with a fully licensed agency eliminates co-employment risks. Bluegate Work manages 100% of the administrative burden, tax declarations, and bilateral compliance protocols.`,
    category: 'EU Labor Law & Compliance',
    author: {
      name: 'Helena Santos',
      role: 'Head of Legal & Cross-Border Compliance'
    },
    coverImageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
    publishedDate: 'March 14, 2026',
    readTimeMinutes: 6,
    tags: ['A1 Certificate', 'Cross-Border', 'EU Compliance', 'Staffing Law'],
    isFeatured: true,
    isPublished: true,
  },
  {
    id: 'blog-2',
    slug: 'solving-peak-season-logistics-labor-shortages-portugal-netherlands',
    title: 'How Strategic Staffing Solves Peak Logistics Demands Across Portugal & the Benelux',
    excerpt: 'Discover how 48-72h rapid workforce deployment models allow 3PL and e-commerce fulfillment centers to scale by 300% without quality degradation.',
    content: `## Surviving and Thriving During Q4 & Seasonal Peaks in European Warehouses

Automated warehouses and 3PL fulfillment hubs face severe labor bottlenecks during peak seasons (Black Friday, Cyber Week, and spring retail surges). When local candidate availability dries up, relying on traditional classified postings creates fatal order backlog delays.

### The 48-Hour Rapid Deployment Framework
Leading e-commerce hubs in Portugal and the Netherlands utilize modular temporary workforce solutions:
- **Pre-vetted Operator Pools:** Forklift (heftruck), reach-truck, and voice-picking operators pre-screened for English proficiency and safety credentials.
- **Dedicated On-Site Team Leads:** Bilingual coordinators who manage clock-ins, daily productivity KPIs, and shift rotations on-site.
- **Flexible Scalability:** Scale headcount from 20 to 120 within 72 hours and scale down seamlessly once the volume normalizes.

### Measurable ROI for Logistics Directors
Case studies show an average 99.4% SLA adherence and 35% reduction in administrative overtime when delegating shift management to specialized workforce partners.`,
    category: 'Logistics & Warehousing',
    author: {
      name: 'Bram de Jong',
      role: 'Director of Northern European Operations'
    },
    coverImageUrl: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80',
    publishedDate: 'March 02, 2026',
    readTimeMinutes: 5,
    tags: ['Logistics', 'Warehousing', 'Peak Season', 'Temporary Staffing'],
    isFeatured: false,
    isPublished: true,
  },
  {
    id: 'blog-3',
    slug: 'ethical-global-recruitment-zero-fee-pledge-explained',
    title: 'The Blueprint for Ethical Global Recruitment: Zero-Fee Corridors and Worker Wellbeing',
    excerpt: 'Why the Employer-Pays Principle and transparent visa pipelines build loyal, highly motivated technical and manufacturing teams.',
    content: `## Eliminating Exploitation: The Ethical Recruitment Imperative

At Bluegate Work, we adhere strictly to the International Labour Organization (ILO) standards and the "Employer-Pays Principle". International recruitment should be a gateway to professional growth and dignity, not indebtedness.

### What Zero-Fee Recruitment Means in Practice:
- **Zero Fees for Candidates:** Candidates never pay a single euro for interviews, document verification, or job placements.
- **Transparent Relocation Packages:** Clear employment contracts provided in the candidate's native language and English before boarding flights.
- **Comprehensive Onboarding:** Airport reception, local tax registration (NIF/BSN), European bank account setup, and clean modern housing.

### Why Employers Win with Ethical Hiring
Workers recruited through ethical channels show a **94% retention rate** over 12 months, virtually zero unexcused absenteeism, and superior craftsmanship across industrial welding, CNC machining, and mechanical assembly.`,
    category: 'International Recruitment',
    author: {
      name: 'Rui Albuquerque',
      role: 'VP of Global Talent Sourcing'
    },
    coverImageUrl: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1200&q=80',
    publishedDate: 'February 24, 2026',
    readTimeMinutes: 7,
    tags: ['Ethical Recruitment', 'Zero-Fee', 'Global Talent', 'Worker Care'],
    isFeatured: false,
    isPublished: true,
  },
  {
    id: 'blog-4',
    slug: 'automotive-and-industrial-manufacturing-talent-trends',
    title: '2026 Outlook: Tackling the Skilled Trades Deficit in European Manufacturing',
    excerpt: 'From certified 6G pipe welders to industrial electricians: how specialized workforce outsourcing is keeping factories running at full capacity.',
    content: `## Addressing the Severe Shortage of Skilled Industrial Craftsmen in Europe

Europe's heavy industry, shipbuilding, and automotive tier-1 suppliers face an acute generational transition. As veteran welders, CNC operators, and electromechanical technicians retire, finding replacement certified talent in local markets has become a critical challenge.

### Strategic Solutions:
1. **Targeted Technical Testing:** Rigorous pre-deployment weld test radiography (TIG 141, MIG 131) and CAD/CAM practical exams.
2. **Turnkey Outsourcing (Prestação de Serviços):** Contracting fixed production deliverables rather than standard hourly temps, transferring productivity risk to the service provider.
3. **Cross-Border Skill Circulation:** Moving certified teams between Portuguese marine shipyards and Dutch/German manufacturing plants according to project milestones.`,
    category: 'Manufacturing & Engineering',
    author: {
      name: 'Helena Santos',
      role: 'Head of Legal & Cross-Border Compliance'
    },
    coverImageUrl: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=80',
    publishedDate: 'February 15, 2026',
    readTimeMinutes: 5,
    tags: ['Manufacturing', 'Welders', 'CNC', 'Skilled Trades'],
    isFeatured: false,
    isPublished: true,
  }
];

export const DEFAULT_HEADER_CONFIG = {
  announcementText: '🚀 High-Demand Peak Q2 Logistics & Manufacturing Workforce Active Across Portugal & Netherlands',
  announcementLinkText: 'Request Talent in 48h',
  announcementLinkPage: 'for-employers' as const,
  announcementEnabled: true,
  announcementBgColor: '#002255',
  announcementTextColor: '#FFD000',
  showTopBar: true,
  topBarLocationText: 'Rio Maior (Portugal) • Netherlands • Global Corridors',
  topBarWhatsAppBadgeText: 'WhatsApp Direct',
  topBarLicenseText: 'ACT Licença Nº 892/ACT',
  ctaButtonText: 'Request Talent',
  secondaryCtaText: 'Browse Jobs'
};

export const DEFAULT_FOOTER_CONFIG = {
  ctaBannerHeading: 'Ready to Scale Your European Workforce?',
  ctaBannerSubtext: 'Deploy fully compliant, audited, and housed temporary teams or outsource industrial workflows within 48-72 hours.',
  ctaButtonText: 'Request Talent Consultation',
  ctaWhatsAppText: 'Chat on WhatsApp',
  aboutText: 'Bluegate Work is a premier European cross-border workforce, temporary staffing, and operational outsourcing partner connecting certified industrial, logistics, and technical talent with top enterprises.',
  callbackTitle: 'Request Fast Callback',
  callbackSubtext: 'Leave your contact number for a staffing specialist to call you within 15 minutes during business hours.',
  callbackPlaceholder: '+351 9XX XXX XXX or +31 6 XX...',
  callbackResponseTime: 'Guaranteed confidential response under 15 mins',
  operatingHours: 'Monday - Friday: 08:00 - 19:00 WET / CET (24/7 On-Call for Active Shifts)',
  copyrightText: 'All rights reserved. Dedicated to ethical workforce mobility, certified cross-border postings, and operational excellence.'
};

export const DEFAULT_HOME_PAGE_CONTENT = {
  heroSlides: [
    {
      id: 'slide-1',
      category: 'Strategic Cross-Border Staffing',
      eyebrow: 'European Temporary Work & Operational Outsourcing',
      headline: 'Certified European Workforce Solutions.',
      highlightText: 'Deployed in 48-72 Hours.',
      description: 'Connecting top enterprises across Portugal, the Netherlands, and Germany with compliant temporary staff, managed production outsourcing, and zero-fee ethical international recruitment.',
      buttonText: 'Request Talent Consultation',
      secondaryButtonText: 'Explore Open Jobs',
      imageKey: 'hero_slide_1'
    },
    {
      id: 'slide-2',
      category: 'Cross-Border Logistics & Industry',
      eyebrow: 'Rapid Scalability & Dedicated Worker Housing',
      headline: 'End-to-End Workforce Logistics & Care.',
      highlightText: '100% Legal A1 Compliance.',
      description: 'We handle everything from rapid candidate vetting and labor contracts to SNF-certified housing, daily commuter transit, and on-site bilingual shift coordinators.',
      buttonText: 'Calculate Workforce Pricing',
      secondaryButtonText: 'View Client Case Studies',
      imageKey: 'hero_slide_2'
    }
  ],
  heroQuickCards: [
    {
      badge: 'B2B Fast Staffing',
      title: 'Temporary Staffing (ETT)',
      desc: 'Rapid flexible workforce for seasonal peaks, warehouse surges & manufacturing lines.',
      pageId: 'temporary-staffing' as const
    },
    {
      badge: 'Full SLA Managed',
      title: 'Workforce Outsourcing',
      desc: 'Output-guaranteed production teams, packaging lines & facilities management.',
      pageId: 'outsourcing' as const
    },
    {
      badge: 'Zero-Fee Ethics',
      title: 'International Recruitment',
      desc: 'Global technical sourcing, certified skilled welders, CNC machinists & legal visas.',
      pageId: 'international-recruitment' as const
    }
  ],
  trustMetrics: [
    {
      id: 'm1',
      value: '4,850+',
      label: 'Active Workforce Deployed',
      subtext: 'Across Portugal & Benelux'
    },
    {
      id: 'm2',
      value: '48-72h',
      label: 'Rapid Deployment SLA',
      subtext: 'From request to clock-in'
    },
    {
      id: 'm3',
      value: '100%',
      label: 'A1 & Labor Law Audited',
      subtext: 'Zero client co-liability'
    },
    {
      id: 'm4',
      value: '99.4%',
      label: 'Shift Attendance Rate',
      subtext: 'Bilingual on-site leads'
    }
  ],
  servicesSection: {
    badge: 'Our Core Workforce Capabilities',
    title: 'Tailored Solutions for Every Operational Challenge',
    subtitle: 'From peak-season temporary staffing to full-scale output-based managed outsourcing and certified international technical sourcing.'
  },
  calculatorSection: {
    badge: 'Instant Workforce Estimator',
    title: 'Interactive Talent Match & Cost Calculator',
    subtitle: 'Select your sector, country, and required headcount to estimate deployment timelines and workforce SLA specifications.'
  },
  industriesSection: {
    badge: 'Sector Specialization',
    title: 'Dedicated Expertise Across Key European Industries',
    subtitle: 'Our recruitment pipelines and training programs are tailored to the high-tempo demands of modern industrial and logistics hubs.',
    ctaText: 'Explore All Industry Solutions'
  },
  globalSection: {
    badge: 'European Reach & Global Talent Corridors',
    title: 'Connected Operations from Portugal to the Benelux & Beyond',
    subtitle: 'Combining local headquarters in Rio Maior (Portugal) with active deployment hubs in the Netherlands and ethical international talent corridors.',
    hubsTitle: 'Operational Footprint & Hubs'
  },
  processSection: {
    badge: 'Proven 4-Step Deployment Model',
    title: 'From Requirement to Productive Shifts in 48-72 Hours',
    subtitle: 'A streamlined, audited process engineered to minimize downtime and eliminate administrative friction.',
    steps: [
      {
        step: '01',
        title: 'Requirement & SLA Blueprint',
        desc: 'We analyze your headcount, shift patterns, technical certifications, and output expectations to build a tailored proposal.'
      },
      {
        step: '02',
        title: 'Candidate Vetting & Compliance Verification',
        desc: 'Rigorous skill checks, background audits, medical fitness, and legal right-to-work / A1 certificate verification.'
      },
      {
        step: '03',
        title: 'Housing, Transport & Onboarding',
        desc: 'We arrange SNF-standard residential housing, daily commuting transit, PPE uniforms, and on-site bilingual onboarding.'
      },
      {
        step: '04',
        title: 'Performance Monitoring & 24/7 Support',
        desc: 'Dedicated on-site coordinators track attendance, productivity KPIs, and provide 24/7 operational contingency support.'
      }
    ]
  },
  complianceSection: {
    badge: 'Uncompromising Legal Protection',
    title: 'Full Compliance with Portuguese & European Labor Directives',
    subtitle: 'We protect our client partners with rigorous legal frameworks, transparent payroll, and certified standards.',
    card1Title: 'ACT Licensed & Registered',
    card1Desc: 'Fully certified under Portuguese Authority for Working Conditions (ACT), guaranteeing legal payroll, health checks, and worker safety insurance.',
    card2Title: 'Dutch NEN 4400-1 & SNA Standards',
    card2Desc: 'Strict adherence to Dutch Labor Standards Foundation (SNA) norms, ensuring proper tax payments, BSN registrations, and collective labor agreements (CAO).',
    card3Title: 'EU Posting of Workers Directive (A1)',
    card3Desc: 'Seamless, audited cross-border deployments across the EU with verified A1 certificates, avoiding double social security and shielding clients from tax liabilities.',
    card4Title: 'Fair Recruitment & Zero-Fee Pledge',
    card4Desc: 'Strict compliance with international ethical labor conventions: no candidate ever pays recruitment fees for jobs with Bluegate Work.'
  },
  testimonialsSection: {
    badge: 'Client & Worker Stories',
    title: 'Trusted by European Industry Leaders & Valued Candidates',
    subtitle: 'Read real experiences from logistics directors, manufacturing plant managers, and international specialists placed through our network.'
  },
  faqSection: {
    badge: 'Frequently Asked Questions',
    title: 'Everything You Need to Know About Partnering with Bluegate Work',
    subtitle: 'Clear answers on contracts, deployment timelines, legal compliance, and candidate care.',
    items: FAQS_HOMEPAGE
  },
  ctaBannerSection: {
    title: 'Transform Your Workforce Productivity Today',
    subtitle: 'Whether you need 10 reach-truck operators by Friday or an entire outsourced packaging line, our team is ready to deliver.',
    buttonText: 'Request Workforce Proposal',
    secondaryButtonText: 'Call Headquarters Direct'
  }
};

