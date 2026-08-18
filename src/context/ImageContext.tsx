import React, { createContext, useContext, useState, useEffect } from 'react';

export interface ImageItem {
  key: string;
  title: string;
  category:
    | 'Hero Slider'
    | 'Services'
    | 'Industries'
    | 'About & Company'
    | 'Locations & Corridors'
    | 'Worker Housing & Care'
    | 'Jobs & Careers'
    | 'Testimonials & Avatars'
    | 'Badges & Certificates';
  defaultUrl: string;
  currentUrl: string;
  description: string;
  recommendedSize: string;
  altText: string;
  presetAlternatives?: { label: string; url: string }[];
}

export const INITIAL_IMAGE_REGISTRY: Record<string, Omit<ImageItem, 'currentUrl'>> = {
  // Hero Slider
  'hero_slide_1': {
    key: 'hero_slide_1',
    title: 'Hero Slide 1 - Warehouse Logistics',
    category: 'Hero Slider',
    defaultUrl: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=2000&q=85',
    description: 'Background image for Slide 1 (Warehouse worker taping box with forklift in background)',
    recommendedSize: '2000 x 1000 px (16:9 or 21:9)',
    altText: 'Warehouse operator packaging parcels in logistics center',
    presetAlternatives: [
      { label: 'Warehouse Packaging (Default)', url: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=2000&q=85' },
      { label: 'Forklift & Racks', url: 'https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&fit=crop&w=2000&q=85' },
      { label: 'Automated Logistics Hub', url: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=2000&q=85' },
      { label: 'Inventory Distribution', url: 'https://images.unsplash.com/photo-1616401784845-180882ba9ba8?auto=format&fit=crop&w=2000&q=85' },
    ],
  },
  'hero_slide_2': {
    key: 'hero_slide_2',
    title: 'Hero Slide 2 - Construction & Engineering',
    category: 'Hero Slider',
    defaultUrl: 'https://images.unsplash.com/photo-1541888946425-d0fbb186156a?auto=format&fit=crop&w=2000&q=85',
    description: 'Background image for Slide 2 (Civil engineers in safety vests reviewing blueprints)',
    recommendedSize: '2000 x 1000 px (16:9 or 21:9)',
    altText: 'Engineers in hard hats reviewing construction blueprints',
    presetAlternatives: [
      { label: 'Engineers with Blueprints (Default)', url: 'https://images.unsplash.com/photo-1541888946425-d0fbb186156a?auto=format&fit=crop&w=2000&q=85' },
      { label: 'Modern Construction Site', url: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=2000&q=85' },
      { label: 'Skilled Trades Team', url: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=2000&q=85' },
      { label: 'Industrial Steel Structure', url: 'https://images.unsplash.com/photo-1517581177682-a085bb7ffb15?auto=format&fit=crop&w=2000&q=85' },
    ],
  },

  // Services
  'service_temporary_staffing': {
    key: 'service_temporary_staffing',
    title: 'Service: Temporary Work Staffing',
    category: 'Services',
    defaultUrl: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1200&q=80',
    description: 'Hero and showcase image for Temporary Staffing service page and cards',
    recommendedSize: '1200 x 800 px (3:2)',
    altText: 'Dynamic temporary workforce team on site',
    presetAlternatives: [
      { label: 'Collaborative Team', url: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1200&q=80' },
      { label: 'Industrial Shift Workers', url: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=80' },
      { label: 'Warehouse Team Briefing', url: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=1200&q=80' },
    ],
  },
  'service_outsourcing': {
    key: 'service_outsourcing',
    title: 'Service: Workforce Outsourcing',
    category: 'Services',
    defaultUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80',
    description: 'Hero and card image for Turnkey Workforce Outsourcing and Process Management',
    recommendedSize: '1200 x 800 px (3:2)',
    altText: 'Supervised assembly and manufacturing operational line',
    presetAlternatives: [
      { label: 'Manufacturing Line Lead', url: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80' },
      { label: 'Quality Control Inspection', url: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=1200&q=80' },
      { label: 'Automated Operations', url: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1200&q=80' },
    ],
  },
  'service_international_recruitment': {
    key: 'service_international_recruitment',
    title: 'Service: International Recruitment',
    category: 'Services',
    defaultUrl: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1200&q=80',
    description: 'Hero and card image for Global Talent Corridors & Visa Relocation services',
    recommendedSize: '1200 x 800 px (3:2)',
    altText: 'International cross-border European aviation and talent corridor',
    presetAlternatives: [
      { label: 'Aviation & Global Corridor', url: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1200&q=80' },
      { label: 'Global Professionals Arrival', url: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80' },
      { label: 'International Trade Workers', url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1200&q=80' },
    ],
  },

  // Industries
  'industry_logistics': {
    key: 'industry_logistics',
    title: 'Industry: Logistics & Warehousing',
    category: 'Industries',
    defaultUrl: 'https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&fit=crop&w=800&q=80',
    description: 'Thumbnail and banner for Logistics, Warehousing & E-Commerce industry',
    recommendedSize: '800 x 600 px (4:3)',
    altText: 'Forklift driver in European logistics facility',
  },
  'industry_agriculture': {
    key: 'industry_agriculture',
    title: 'Industry: Agriculture & Agri-Food',
    category: 'Industries',
    defaultUrl: 'https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?auto=format&fit=crop&w=800&q=80',
    description: 'Thumbnail and banner for Agriculture, Greenhouses & Agri-Food sector',
    recommendedSize: '800 x 600 px (4:3)',
    altText: 'Modern agricultural greenhouse harvesting staff in Europe',
  },
  'industry_construction': {
    key: 'industry_construction',
    title: 'Industry: Construction & Energy',
    category: 'Industries',
    defaultUrl: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80',
    description: 'Thumbnail and banner for Construction, Infrastructure & Renewable Energy',
    recommendedSize: '800 x 600 px (4:3)',
    altText: 'Construction crew working on civil infrastructure',
  },
  'industry_manufacturing': {
    key: 'industry_manufacturing',
    title: 'Industry: Manufacturing & Automotive',
    category: 'Industries',
    defaultUrl: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80',
    description: 'Thumbnail and banner for Industrial Manufacturing & Automotive Assembly',
    recommendedSize: '800 x 600 px (4:3)',
    altText: 'Precision manufacturing line technician',
  },
  'industry_hospitality': {
    key: 'industry_hospitality',
    title: 'Industry: Hospitality & Facility Services',
    category: 'Industries',
    defaultUrl: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=800&q=80',
    description: 'Thumbnail and banner for Hospitality, Catering & Industrial Facility Services',
    recommendedSize: '800 x 600 px (4:3)',
    altText: 'Hospitality and cleaning staff in modern facility',
  },

  // About & Company
  'about_headquarters': {
    key: 'about_headquarters',
    title: 'About Us: European Operations Hub',
    category: 'About & Company',
    defaultUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
    description: 'Corporate headquarters and European administration center showcase',
    recommendedSize: '1200 x 800 px (3:2)',
    altText: 'Modern European headquarters building in Portugal',
  },
  'about_team_meeting': {
    key: 'about_team_meeting',
    title: 'About Us: Bluegate Leadership & Recruiters',
    category: 'About & Company',
    defaultUrl: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=1200&q=80',
    description: 'Corporate leadership and bilingual operations managers at work',
    recommendedSize: '1200 x 800 px (3:2)',
    altText: 'Bluegate Work staffing team collaborating in conference room',
  },

  // Worker Housing & Relocation Care
  'care_snf_housing': {
    key: 'care_snf_housing',
    title: 'Worker Care: SNF-Certified Accommodation',
    category: 'Worker Housing & Care',
    defaultUrl: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=800&q=80',
    description: 'Image demonstrating clean, inspected single/twin worker accommodation with WiFi',
    recommendedSize: '800 x 600 px (4:3)',
    altText: 'Clean modern furnished worker bedroom with bed, desk, and amenities',
    presetAlternatives: [
      { label: 'Modern Studio Apartment', url: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=800&q=80' },
      { label: 'Residential Kitchen Area', url: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=80' },
      { label: 'Shared Living Lounge', url: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80' },
    ],
  },
  'care_daily_transport': {
    key: 'care_daily_transport',
    title: 'Worker Care: Daily Commuter Shuttles',
    category: 'Worker Housing & Care',
    defaultUrl: 'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?auto=format&fit=crop&w=800&q=80',
    description: 'Image showing company commuter vans and daily transport fleet',
    recommendedSize: '800 x 600 px (4:3)',
    altText: 'Fleet of passenger commuter shuttle vans',
  },
  'care_worksite_safety': {
    key: 'care_worksite_safety',
    title: 'Worker Care: PPE & Certified Safety',
    category: 'Worker Housing & Care',
    defaultUrl: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=800&q=80',
    description: 'Safety equipment, helmet, safety boots, and compliance orientation',
    recommendedSize: '800 x 600 px (4:3)',
    altText: 'Worker wearing high-visibility PPE and safety helmet',
  },

  // Locations & Corridors
  'location_portugal': {
    key: 'location_portugal',
    title: 'Location: Portugal HQ (Rio Maior / Lisbon)',
    category: 'Locations & Corridors',
    defaultUrl: 'https://images.unsplash.com/photo-1555881400-74d7acaacd8b?auto=format&fit=crop&w=800&q=80',
    description: 'City landscape / operational view of Portugal Headquarters',
    recommendedSize: '800 x 600 px (4:3)',
    altText: 'Lisbon and Santarém business corridor in Portugal',
  },
  'location_netherlands': {
    key: 'location_netherlands',
    title: 'Location: Netherlands Branch (Rotterdam / Tilburg)',
    category: 'Locations & Corridors',
    defaultUrl: 'https://images.unsplash.com/photo-1512470876302-972faa2aa9a4?auto=format&fit=crop&w=800&q=80',
    description: 'Rotterdam Port & logistics hub in the Netherlands',
    recommendedSize: '800 x 600 px (4:3)',
    altText: 'Rotterdam Erasmus bridge and logistics harbor skyline',
  },
  'location_eastern_europe': {
    key: 'location_eastern_europe',
    title: 'Location: Eastern European Corridor (Poland / Romania)',
    category: 'Locations & Corridors',
    defaultUrl: 'https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?auto=format&fit=crop&w=800&q=80',
    description: 'Recruitment hub in Eastern Europe',
    recommendedSize: '800 x 600 px (4:3)',
    altText: 'Eastern European business district',
  },
  'location_asia_corridor': {
    key: 'location_asia_corridor',
    title: 'Location: Global Asia Corridor (India / Philippines / Vietnam)',
    category: 'Locations & Corridors',
    defaultUrl: 'https://images.unsplash.com/photo-1506461883276-594a12b11cf3?auto=format&fit=crop&w=800&q=80',
    description: 'Trade testing centers and consular visa hubs across Asia',
    recommendedSize: '800 x 600 px (4:3)',
    altText: 'International technical skills training and departure hub',
  },

  // Testimonials & Avatars
  'avatar_testimonial_1': {
    key: 'avatar_testimonial_1',
    title: 'Avatar: Marco Silva (Logistics Director, PT)',
    category: 'Testimonials & Avatars',
    defaultUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&h=200&q=80',
    description: 'Profile photo for client testimonial 1',
    recommendedSize: '200 x 200 px (1:1 square)',
    altText: 'Headshot portrait of Marco Silva',
  },
  'avatar_testimonial_2': {
    key: 'avatar_testimonial_2',
    title: 'Avatar: Jan van den Berg (VP Operations, NL)',
    category: 'Testimonials & Avatars',
    defaultUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&h=200&q=80',
    description: 'Profile photo for client testimonial 2',
    recommendedSize: '200 x 200 px (1:1 square)',
    altText: 'Headshot portrait of Jan van den Berg',
  },
  'avatar_testimonial_3': {
    key: 'avatar_testimonial_3',
    title: 'Avatar: Andrei Popescu (Candidate Welder)',
    category: 'Testimonials & Avatars',
    defaultUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&h=200&q=80',
    description: 'Profile photo for worker candidate testimonial',
    recommendedSize: '200 x 200 px (1:1 square)',
    altText: 'Headshot portrait of Andrei Popescu',
  },
};

const STORAGE_KEY = 'bluegate_custom_image_registry_v1';

interface ImageContextType {
  images: Record<string, ImageItem>;
  getImageUrl: (key: string, fallback?: string) => string;
  updateImage: (key: string, newUrl: string) => void;
  resetImage: (key: string) => void;
  resetAllImages: () => void;
  exportConfigJson: () => string;
  importConfigJson: (jsonString: string) => boolean;
  isAdminOpen: boolean;
  setIsAdminOpen: (open: boolean) => void;
}

const ImageContext = createContext<ImageContextType | undefined>(undefined);

export const ImageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [images, setImages] = useState<Record<string, ImageItem>>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        const merged: Record<string, ImageItem> = {};
        Object.keys(INITIAL_IMAGE_REGISTRY).forEach((key) => {
          const item = INITIAL_IMAGE_REGISTRY[key];
          merged[key] = {
            ...item,
            currentUrl: parsed[key]?.currentUrl || item.defaultUrl,
          };
        });
        return merged;
      }
    } catch (e) {
      console.warn('Error loading custom images from storage:', e);
    }

    const defaults: Record<string, ImageItem> = {};
    Object.keys(INITIAL_IMAGE_REGISTRY).forEach((key) => {
      const item = INITIAL_IMAGE_REGISTRY[key];
      defaults[key] = {
        ...item,
        currentUrl: item.defaultUrl,
      };
    });
    return defaults;
  });

  const [isAdminOpen, setIsAdminOpen] = useState(false);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(images));
    } catch (e) {
      console.warn('Failed to save custom images to localStorage:', e);
    }
  }, [images]);

  const getImageUrl = (key: string, fallback?: string): string => {
    return images[key]?.currentUrl || fallback || INITIAL_IMAGE_REGISTRY[key]?.defaultUrl || '';
  };

  const updateImage = (key: string, newUrl: string) => {
    setImages((prev) => {
      if (!prev[key]) return prev;
      return {
        ...prev,
        [key]: {
          ...prev[key],
          currentUrl: newUrl.trim(),
        },
      };
    });
  };

  const resetImage = (key: string) => {
    setImages((prev) => {
      if (!prev[key]) return prev;
      return {
        ...prev,
        [key]: {
          ...prev[key],
          currentUrl: prev[key].defaultUrl,
        },
      };
    });
  };

  const resetAllImages = () => {
    const resetState: Record<string, ImageItem> = {};
    Object.keys(INITIAL_IMAGE_REGISTRY).forEach((key) => {
      const item = INITIAL_IMAGE_REGISTRY[key];
      resetState[key] = {
        ...item,
        currentUrl: item.defaultUrl,
      };
    });
    setImages(resetState);
    localStorage.removeItem(STORAGE_KEY);
  };

  const exportConfigJson = (): string => {
    const exportMap: Record<string, string> = {};
    Object.keys(images).forEach((key) => {
      exportMap[key] = images[key].currentUrl;
    });
    return JSON.stringify(exportMap, null, 2);
  };

  const importConfigJson = (jsonString: string): boolean => {
    try {
      const parsed = JSON.parse(jsonString);
      setImages((prev) => {
        const next = { ...prev };
        Object.keys(parsed).forEach((key) => {
          if (next[key] && typeof parsed[key] === 'string') {
            next[key] = {
              ...next[key],
              currentUrl: parsed[key],
            };
          }
        });
        return next;
      });
      return true;
    } catch (err) {
      console.error('Failed to parse image config JSON:', err);
      return false;
    }
  };

  return (
    <ImageContext.Provider
      value={{
        images,
        getImageUrl,
        updateImage,
        resetImage,
        resetAllImages,
        exportConfigJson,
        importConfigJson,
        isAdminOpen,
        setIsAdminOpen,
      }}
    >
      {children}
    </ImageContext.Provider>
  );
};

export const useImages = () => {
  const context = useContext(ImageContext);
  if (!context) {
    throw new Error('useImages must be used within an ImageProvider');
  }
  return context;
};
