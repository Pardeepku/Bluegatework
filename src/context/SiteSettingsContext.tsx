import React, { createContext, useContext, useState, useEffect } from 'react';
import { PageId, BlogPost, HeaderConfig, FooterConfig, HomePageConfig } from '../types';
import {
  DEFAULT_BLOG_POSTS,
  DEFAULT_HEADER_CONFIG,
  DEFAULT_FOOTER_CONFIG,
  DEFAULT_HOME_PAGE_CONTENT,
} from '../data/mockData';

export interface AddressConfig {
  street: string;
  city: string;
  district?: string;
  postalCode: string;
  country: string;
  full: string;
}

export interface SocialLinksConfig {
  facebook: string;
  instagram: string;
  linkedin: string;
  youtube: string;
  twitter: string;
  tiktok: string;
  telegram: string;
}

export interface AnnouncementBannerConfig {
  enabled: boolean;
  text: string;
  linkText: string;
  linkPage: PageId;
  bgColor: string;
  textColor: string;
}

export interface SeoConfig {
  metaTitle: string;
  metaDescription: string;
  keywords: string;
}

export interface SiteSettings {
  siteName: string;
  siteShortName: string;
  tagline: string;
  shortDesc: string;
  logoUrl: string; // custom image url or empty for SVG logo
  faviconUrl: string; // custom favicon url
  phoneMain: string;
  phoneEmergency: string;
  whatsappNumber: string;
  whatsappPrefill: string;
  emailGeneral: string;
  emailSupport: string;
  emailRecruitment: string;
  addressHQ: AddressConfig;
  addressNetherlands: {
    street: string;
    city: string;
    postalCode: string;
    country: string;
    full: string;
  };
  socialLinks: SocialLinksConfig;
  operatingHours: string;
  businessLicensing: string;
  taxNif: string;
  actLicense: string;
  nenCertificate: string;
  announcementBanner: AnnouncementBannerConfig;
  seo: SeoConfig;
  headerConfig: HeaderConfig;
  footerConfig: FooterConfig;
  homePageContent: HomePageConfig;
}

export interface AdminUser {
  username: string;
  name: string;
  email: string;
  role: string;
  lastLogin?: string;
}

export interface InquiryRecord {
  id: string;
  type: 'quote' | 'job_application' | 'callback' | 'contact_message';
  name: string;
  email: string;
  phone: string;
  details: string;
  date: string;
  status: 'new' | 'in_review' | 'contacted' | 'resolved';
}

const DEFAULT_SITE_SETTINGS: SiteSettings = {
  siteName: 'Bluegate Work',
  siteShortName: 'Bluegate',
  tagline: 'Your Gateway to Global Workforce & European Staffing Solutions',
  shortDesc:
    'Premier European workforce provider operating across Portugal, the Netherlands, and globally. Delivering compliant temporary staffing, managed outsourcing, and international talent recruitment.',
  logoUrl: '',
  faviconUrl: '',
  phoneMain: '+351 920 132 915',
  phoneEmergency: '+351 920 132 915',
  whatsappNumber: '+351 920 132 915',
  whatsappPrefill:
    'Hello Bluegate Work, I would like to inquire about your workforce recruitment and staffing services in Europe.',
  emailGeneral: 'info@bluegatework.com',
  emailSupport: 'support@bluegatework.com',
  emailRecruitment: 'recruitment@bluegatework.com',
  addressHQ: {
    street: 'RUA DOM FERNANDO I 25 RIO MAIOR RIO MAIOR',
    city: 'Rio Maior',
    district: 'Santarém',
    postalCode: '2040-265',
    country: 'Portugal',
    full: 'RUA DOM FERNANDO I 25 RIO MAIOR RIO MAIOR, Rio Maior, Santarém, 2040-265, Portugal',
  },
  addressNetherlands: {
    street: 'Keizersgracht 482',
    city: 'Amsterdam',
    postalCode: '1016 EG',
    country: 'Netherlands',
    full: 'Keizersgracht 482, 1016 EG Amsterdam, Netherlands',
  },
  socialLinks: {
    facebook: 'https://facebook.com/bluegatework',
    instagram: 'https://instagram.com/bluegatework',
    linkedin: 'https://linkedin.com/company/bluegatework',
    youtube: 'https://youtube.com/@bluegatework',
    twitter: 'https://twitter.com/bluegatework',
    tiktok: 'https://tiktok.com/@bluegatework',
    telegram: 'https://t.me/bluegatework',
  },
  operatingHours:
    'Mon - Fri: 08:30 - 18:30 CET (24/7 Emergency Dispatch for active client deployments)',
  businessLicensing:
    'Certified European Cross-Border Workforce & Operational Outsourcing Provider',
  taxNif: 'PT 517 890 123',
  actLicense: 'ACT Licença Nº 892/ACT',
  nenCertificate: 'NEN 4400-1 / SNA Certified',
  announcementBanner: {
    enabled: true,
    text: '🚀 High-Demand Seasonal Logistics & Warehouse Staffing Available for Q3/Q4 across Portugal & Netherlands',
    linkText: 'Request Workforce',
    linkPage: 'temporary-staffing',
    bgColor: '#002255',
    textColor: '#FFD000',
  },
  seo: {
    metaTitle: 'Bluegate Work | European Staffing & Global Workforce Solutions',
    metaDescription:
      'Premier European workforce provider in Portugal and Netherlands. Certified temporary staffing, managed outsourcing, and international talent pipelines.',
    keywords:
      'temporary work agency portugal, temporary staffing netherlands, european workforce, outsourcing, international recruitment, rio maior staffing',
  },
  headerConfig: DEFAULT_HEADER_CONFIG,
  footerConfig: DEFAULT_FOOTER_CONFIG,
  homePageContent: DEFAULT_HOME_PAGE_CONTENT,
};

const DEFAULT_ADMIN_PASSWORD_HASH = 'admin123'; // Default password

const INITIAL_INQUIRIES: InquiryRecord[] = [
  {
    id: 'inq-101',
    type: 'quote',
    name: 'Carlos Mendes',
    email: 'c.mendes@agroiberica.pt',
    phone: '+351 912 345 678',
    details: 'Requested 35 agricultural harvesters & packing operators in Santarém region for 3-month peak.',
    date: '2026-08-18 10:24',
    status: 'new',
  },
  {
    id: 'inq-102',
    type: 'quote',
    name: 'Jan van der Berg',
    email: 'j.vandenberg@rotterdamlogistics.nl',
    phone: '+31 6 1234 5678',
    details: 'Needs 20 certified reach-truck drivers for cold storage facility with housing provided.',
    date: '2026-08-17 16:45',
    status: 'in_review',
  },
  {
    id: 'inq-103',
    type: 'job_application',
    name: 'Rajesh Sharma',
    email: 'rajesh.sharma.mfg@gmail.com',
    phone: '+351 933 881 204',
    details: 'Applied for Warehouse Operator in Portugal (Experience: 4 years, has work permit & accommodation request).',
    date: '2026-08-17 11:15',
    status: 'contacted',
  },
  {
    id: 'inq-104',
    type: 'callback',
    name: 'Helena Silva',
    email: 'hsilva@lisbonfoodgroup.pt',
    phone: '+351 965 432 109',
    details: 'Requested 15-minute quick callback regarding outsourcing SLA for meat packaging facility.',
    date: '2026-08-16 14:02',
    status: 'resolved',
  },
];

const SETTINGS_STORAGE_KEY = 'bluegate_site_settings_v2';
const BLOGS_STORAGE_KEY = 'bluegate_blogs_v1';
const ADMIN_AUTH_KEY = 'bluegate_admin_auth_v1';
const ADMIN_PASSWORD_KEY = 'bluegate_admin_password_v1';
const ADMIN_PROFILE_KEY = 'bluegate_admin_profile_v1';
const INQUIRIES_STORAGE_KEY = 'bluegate_inquiries_v1';

interface SiteSettingsContextType {
  settings: SiteSettings;
  updateSettings: (newSettings: Partial<SiteSettings>) => void;
  updateHeaderConfig: (newHeader: Partial<HeaderConfig>) => void;
  updateFooterConfig: (newFooter: Partial<FooterConfig>) => void;
  updateHomePageContent: (newContent: Partial<HomePageConfig>) => void;
  resetSettings: () => void;
  exportSettingsJson: () => string;
  importSettingsJson: (jsonString: string) => boolean;

  // Blog Management
  blogs: BlogPost[];
  addBlogPost: (blog: Omit<BlogPost, 'id'>) => BlogPost;
  updateBlogPost: (id: string, updated: Partial<BlogPost>) => void;
  deleteBlogPost: (id: string) => void;
  resetBlogs: () => void;

  // Admin Auth
  isAdminAuthenticated: boolean;
  adminUser: AdminUser;
  isLoginModalOpen: boolean;
  setIsLoginModalOpen: (open: boolean) => void;
  isAdminPanelOpen: boolean;
  setIsAdminPanelOpen: (open: boolean) => void;
  login: (username: string, pass: string) => { success: boolean; error?: string };
  logout: () => void;
  changePassword: (oldPass: string, newPass: string) => { success: boolean; error?: string };
  updateAdminProfile: (profile: Partial<AdminUser>) => { success: boolean; error?: string };

  // Inquiries
  inquiries: InquiryRecord[];
  addInquiry: (inquiry: Omit<InquiryRecord, 'id' | 'date' | 'status'>) => void;
  updateInquiryStatus: (id: string, status: InquiryRecord['status']) => void;
  deleteInquiry: (id: string) => void;
  clearInquiries: () => void;
}

const SiteSettingsContext = createContext<SiteSettingsContextType | undefined>(undefined);

export const SiteSettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Settings State
  const [settings, setSettings] = useState<SiteSettings>(() => {
    try {
      const saved = localStorage.getItem(SETTINGS_STORAGE_KEY) || localStorage.getItem('bluegate_site_settings_v1');
      if (saved) {
        const parsed = JSON.parse(saved);
        return {
          ...DEFAULT_SITE_SETTINGS,
          ...parsed,
          headerConfig: { ...DEFAULT_HEADER_CONFIG, ...(parsed.headerConfig || {}) },
          footerConfig: { ...DEFAULT_FOOTER_CONFIG, ...(parsed.footerConfig || {}) },
          homePageContent: { ...DEFAULT_HOME_PAGE_CONTENT, ...(parsed.homePageContent || {}) },
        };
      }
    } catch (e) {
      console.warn('Could not load site settings from localStorage', e);
    }
    return DEFAULT_SITE_SETTINGS;
  });

  // Blogs State
  const [blogs, setBlogs] = useState<BlogPost[]>(() => {
    try {
      const saved = localStorage.getItem(BLOGS_STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.warn('Could not load blogs from localStorage', e);
    }
    return DEFAULT_BLOG_POSTS;
  });

  // Admin Auth State
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(() => {
    try {
      return localStorage.getItem(ADMIN_AUTH_KEY) === 'true';
    } catch {
      return false;
    }
  });

  const [adminUser, setAdminUser] = useState<AdminUser>(() => {
    try {
      const saved = localStorage.getItem(ADMIN_PROFILE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.warn('Could not load admin profile', e);
    }
    return {
      username: 'admin',
      name: 'Bluegate Administrator',
      email: 'admin@bluegatework.com',
      role: 'Super Admin',
      lastLogin: new Date().toLocaleString(),
    };
  });

  const [adminPassword, setAdminPassword] = useState<string>(() => {
    try {
      const saved = localStorage.getItem(ADMIN_PASSWORD_KEY);
      if (saved) {
        return saved;
      }
    } catch (e) {
      console.warn('Could not load admin password', e);
    }
    return DEFAULT_ADMIN_PASSWORD_HASH;
  });

  // Inquiries State
  const [inquiries, setInquiries] = useState<InquiryRecord[]>(() => {
    try {
      const saved = localStorage.getItem(INQUIRIES_STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.warn('Could not load inquiries', e);
    }
    return INITIAL_INQUIRIES;
  });

  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isAdminPanelOpen, setIsAdminPanelOpen] = useState(false);

  // Sync settings to localStorage and document elements (title, favicon)
  useEffect(() => {
    try {
      localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(settings));
    } catch (e) {
      console.error('Failed to save settings to localStorage', e);
    }

    // Dynamic Title
    if (settings.seo?.metaTitle) {
      document.title = settings.seo.metaTitle;
    } else {
      document.title = `${settings.siteName} - ${settings.tagline}`;
    }

    // Dynamic Favicon if custom is uploaded
    if (settings.faviconUrl) {
      let link: HTMLLinkElement | null = document.querySelector("link[rel*='icon']");
      if (!link) {
        link = document.createElement('link');
        link.rel = 'shortcut icon';
        document.getElementsByTagName('head')[0].appendChild(link);
      }
      link.href = settings.faviconUrl;
    }
  }, [settings]);

  // Sync blogs to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(BLOGS_STORAGE_KEY, JSON.stringify(blogs));
    } catch (e) {
      console.error('Failed to save blogs to localStorage', e);
    }
  }, [blogs]);

  // Sync inquiries to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(INQUIRIES_STORAGE_KEY, JSON.stringify(inquiries));
    } catch (e) {
      console.error('Failed to save inquiries to localStorage', e);
    }
  }, [inquiries]);

  // Cross-tab synchronization so edits in the admin tab immediately update the website tab in real-time
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === SETTINGS_STORAGE_KEY && e.newValue) {
        try {
          const parsed = JSON.parse(e.newValue);
          setSettings((prev) => ({
            ...DEFAULT_SITE_SETTINGS,
            ...prev,
            ...parsed,
            headerConfig: { ...DEFAULT_HEADER_CONFIG, ...(parsed.headerConfig || {}) },
            footerConfig: { ...DEFAULT_FOOTER_CONFIG, ...(parsed.footerConfig || {}) },
            homePageContent: { ...DEFAULT_HOME_PAGE_CONTENT, ...(parsed.homePageContent || {}) },
          }));
        } catch (err) {
          console.warn('Cross-tab sync error for settings:', err);
        }
      }
      if (e.key === BLOGS_STORAGE_KEY && e.newValue) {
        try {
          setBlogs(JSON.parse(e.newValue));
        } catch (err) {
          console.warn('Cross-tab sync error for blogs:', err);
        }
      }
      if (e.key === INQUIRIES_STORAGE_KEY && e.newValue) {
        try {
          setInquiries(JSON.parse(e.newValue));
        } catch (err) {
          console.warn('Cross-tab sync error for inquiries:', err);
        }
      }
      if (e.key === ADMIN_AUTH_KEY) {
        setIsAdminAuthenticated(e.newValue === 'true');
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const saveSettingsDirectly = (next: SiteSettings) => {
    try {
      localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(next));
    } catch (err) {
      console.error('Immediate settings save error:', err);
    }
  };

  const updateSettings = (newSettings: Partial<SiteSettings>) => {
    setSettings((prev) => {
      const updated: SiteSettings = {
        ...prev,
        ...newSettings,
        addressHQ: {
          ...prev.addressHQ,
          ...(newSettings.addressHQ || {}),
        },
        addressNetherlands: {
          ...prev.addressNetherlands,
          ...(newSettings.addressNetherlands || {}),
        },
        socialLinks: {
          ...prev.socialLinks,
          ...(newSettings.socialLinks || {}),
        },
        announcementBanner: {
          ...prev.announcementBanner,
          ...(newSettings.announcementBanner || {}),
        },
        seo: {
          ...prev.seo,
          ...(newSettings.seo || {}),
        },
        headerConfig: {
          ...prev.headerConfig,
          ...(newSettings.headerConfig || {}),
        },
        footerConfig: {
          ...prev.footerConfig,
          ...(newSettings.footerConfig || {}),
        },
        homePageContent: {
          ...prev.homePageContent,
          ...(newSettings.homePageContent || {}),
        },
      };
      saveSettingsDirectly(updated);
      return updated;
    });
  };

  const updateHeaderConfig = (newHeader: Partial<HeaderConfig>) => {
    setSettings((prev) => {
      const updated: SiteSettings = {
        ...prev,
        headerConfig: {
          ...prev.headerConfig,
          ...newHeader,
        },
      };
      saveSettingsDirectly(updated);
      return updated;
    });
  };

  const updateFooterConfig = (newFooter: Partial<FooterConfig>) => {
    setSettings((prev) => {
      const updated: SiteSettings = {
        ...prev,
        footerConfig: {
          ...prev.footerConfig,
          ...newFooter,
        },
      };
      saveSettingsDirectly(updated);
      return updated;
    });
  };

  const updateHomePageContent = (newContent: Partial<HomePageConfig>) => {
    setSettings((prev) => {
      const updated: SiteSettings = {
        ...prev,
        homePageContent: {
          ...prev.homePageContent,
          ...newContent,
        },
      };
      saveSettingsDirectly(updated);
      return updated;
    });
  };

  const resetSettings = () => {
    setSettings(DEFAULT_SITE_SETTINGS);
    try {
      localStorage.removeItem(SETTINGS_STORAGE_KEY);
      localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(DEFAULT_SITE_SETTINGS));
    } catch (e) {
      console.error('Failed to reset settings', e);
    }
  };

  // Blog Management Methods
  const addBlogPost = (blogData: Omit<BlogPost, 'id'>): BlogPost => {
    const newId = `blog-${Date.now()}`;
    const newBlog: BlogPost = {
      ...blogData,
      id: newId,
      slug: blogData.slug || blogData.title.toLowerCase().replace(/[^\w ]+/g, '').replace(/ +/g, '-'),
      publishedDate: blogData.publishedDate || new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    };
    setBlogs((prev) => {
      const updated = [newBlog, ...prev];
      try {
        localStorage.setItem(BLOGS_STORAGE_KEY, JSON.stringify(updated));
      } catch {}
      return updated;
    });
    return newBlog;
  };

  const updateBlogPost = (id: string, updated: Partial<BlogPost>) => {
    setBlogs((prev) => {
      const updatedList = prev.map((b) => (b.id === id ? { ...b, ...updated } : b));
      try {
        localStorage.setItem(BLOGS_STORAGE_KEY, JSON.stringify(updatedList));
      } catch {}
      return updatedList;
    });
  };

  const deleteBlogPost = (id: string) => {
    setBlogs((prev) => {
      const updatedList = prev.filter((b) => b.id !== id);
      try {
        localStorage.setItem(BLOGS_STORAGE_KEY, JSON.stringify(updatedList));
      } catch {}
      return updatedList;
    });
  };

  const resetBlogs = () => {
    setBlogs(DEFAULT_BLOG_POSTS);
  };

  const exportSettingsJson = (): string => {
    const exportData = {
      siteSettings: settings,
      blogs: blogs,
      exportedAt: new Date().toISOString(),
    };
    return JSON.stringify(exportData, null, 2);
  };

  const importSettingsJson = (jsonString: string): boolean => {
    try {
      const parsed = JSON.parse(jsonString);
      if (typeof parsed === 'object' && parsed !== null) {
        if (parsed.siteSettings) {
          updateSettings(parsed.siteSettings);
        } else {
          updateSettings(parsed);
        }
        if (Array.isArray(parsed.blogs)) {
          setBlogs(parsed.blogs);
        }
        return true;
      }
    } catch (err) {
      console.error('Invalid JSON supplied for settings import:', err);
    }
    return false;
  };

  // Auth Methods
  const login = (username: string, pass: string): { success: boolean; error?: string } => {
    const cleanUsername = username.trim().toLowerCase();
    const cleanPass = pass.trim();

    const expectedUser = adminUser.username.toLowerCase();
    const expectedEmail = adminUser.email.toLowerCase();

    if ((cleanUsername === expectedUser || cleanUsername === expectedEmail || cleanUsername === 'admin') && cleanPass === adminPassword) {
      setIsAdminAuthenticated(true);
      const now = new Date().toLocaleString();
      const updatedUser = { ...adminUser, lastLogin: now };
      setAdminUser(updatedUser);

      try {
        localStorage.setItem(ADMIN_AUTH_KEY, 'true');
        localStorage.setItem(ADMIN_PROFILE_KEY, JSON.stringify(updatedUser));
      } catch (e) {
        console.error('Failed to save admin auth state', e);
      }
      return { success: true };
    }

    return { success: false, error: 'Invalid username/email or password. Default is "admin" and "admin123".' };
  };

  const logout = () => {
    setIsAdminAuthenticated(false);
    setIsAdminPanelOpen(false);
    try {
      localStorage.removeItem(ADMIN_AUTH_KEY);
    } catch (e) {
      console.error('Failed to logout', e);
    }
  };

  const changePassword = (oldPass: string, newPass: string): { success: boolean; error?: string } => {
    if (oldPass !== adminPassword) {
      return { success: false, error: 'Current password does not match.' };
    }
    if (!newPass || newPass.length < 4) {
      return { success: false, error: 'New password must be at least 4 characters long.' };
    }

    setAdminPassword(newPass);
    try {
      localStorage.setItem(ADMIN_PASSWORD_KEY, newPass);
    } catch (e) {
      console.error('Failed to save new password', e);
    }
    return { success: true };
  };

  const updateAdminProfile = (profile: Partial<AdminUser>): { success: boolean; error?: string } => {
    const updated = { ...adminUser, ...profile };
    setAdminUser(updated);
    try {
      localStorage.setItem(ADMIN_PROFILE_KEY, JSON.stringify(updated));
    } catch (e) {
      console.error('Failed to save admin profile', e);
    }
    return { success: true };
  };

  // Inquiry Methods
  const addInquiry = (inquiry: Omit<InquiryRecord, 'id' | 'date' | 'status'>) => {
    const newRecord: InquiryRecord = {
      ...inquiry,
      id: `inq-${Date.now()}`,
      date: new Date().toLocaleString(),
      status: 'new',
    };
    setInquiries((prev) => [newRecord, ...prev]);
  };

  const updateInquiryStatus = (id: string, status: InquiryRecord['status']) => {
    setInquiries((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status } : item))
    );
  };

  const deleteInquiry = (id: string) => {
    setInquiries((prev) => prev.filter((item) => item.id !== id));
  };

  const clearInquiries = () => {
    setInquiries([]);
  };

  return (
    <SiteSettingsContext.Provider
      value={{
        settings,
        updateSettings,
        updateHeaderConfig,
        updateFooterConfig,
        updateHomePageContent,
        resetSettings,
        exportSettingsJson,
        importSettingsJson,

        blogs,
        addBlogPost,
        updateBlogPost,
        deleteBlogPost,
        resetBlogs,

        isAdminAuthenticated,
        adminUser,
        isLoginModalOpen,
        setIsLoginModalOpen,
        isAdminPanelOpen,
        setIsAdminPanelOpen,
        login,
        logout,
        changePassword,
        updateAdminProfile,

        inquiries,
        addInquiry,
        updateInquiryStatus,
        deleteInquiry,
        clearInquiries,
      }}
    >
      {children}
    </SiteSettingsContext.Provider>
  );
};

export const useSiteSettings = () => {
  const context = useContext(SiteSettingsContext);
  if (!context) {
    throw new Error('useSiteSettings must be used within a SiteSettingsProvider');
  }
  return context;
};

