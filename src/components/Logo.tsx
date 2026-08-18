import React from 'react';
import { useSiteSettings } from '../context/SiteSettingsContext';

interface LogoProps {
  variant?: 'light' | 'dark' | 'white';
  size?: 'sm' | 'md' | 'lg';
  showTagline?: boolean;
}

export const Logo: React.FC<LogoProps> = ({
  variant = 'dark',
  size = 'md',
  showTagline = false
}) => {
  const { settings } = useSiteSettings();
  const isWhite = variant === 'white';

  const iconSizes = {
    sm: 'w-7 h-7',
    md: 'w-10 h-10',
    lg: 'w-12 h-12'
  };

  const textSizes = {
    sm: 'text-lg',
    md: 'text-2xl',
    lg: 'text-3xl'
  };

  const logoImgHeights = {
    sm: 'h-7',
    md: 'h-10',
    lg: 'h-12'
  };

  // If custom logo image is provided in site settings
  if (settings.logoUrl) {
    return (
      <div className="flex items-center gap-3 select-none group cursor-pointer">
        <img
          src={settings.logoUrl}
          alt={settings.siteName}
          className={`${logoImgHeights[size]} w-auto object-contain max-w-[200px]`}
        />
        {showTagline && (
          <span
            className={`text-[9px] tracking-widest uppercase font-bold mt-0.5 ${
              isWhite ? 'text-white/70' : 'text-slate-500'
            }`}
          >
            {settings.tagline}
          </span>
        )}
      </div>
    );
  }

  // Parse words for two-tone styling
  const nameParts = settings.siteName.split(' ');
  const firstWord = nameParts[0] || 'Bluegate';
  const remainingWords = nameParts.slice(1).join(' ') || 'Work';

  return (
    <div className="flex items-center gap-3 select-none group cursor-pointer">
      {/* Brand Icon: Deep Navy Box with Rotated Diamond & Golden Core Accent */}
      <div className={`relative flex items-center justify-center ${iconSizes[size]} rounded-xl ${isWhite ? 'bg-white/10 border border-white/20' : 'bg-[#002366]'} shadow-lg shadow-blue-950/20 group-hover:scale-105 transition-transform duration-300`}>
        <div className="w-5 h-5 border-2 border-white rounded-xs rotate-45 flex items-center justify-center">
          <div className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]"></div>
        </div>
      </div>

      {/* Brand Name Typography */}
      <div className="flex flex-col">
        <div className="flex items-center gap-1 leading-none">
          <span
            className={`font-black tracking-tight font-heading ${textSizes[size]} ${
              isWhite ? 'text-white' : 'text-[#002366]'
            }`}
          >
            {firstWord}
          </span>
          <span
            className={`font-black tracking-tight font-heading ${textSizes[size]} ${
              isWhite ? 'text-[#D4AF37]' : 'text-[#0056b3]'
            } group-hover:opacity-90 transition-colors`}
          >
            {remainingWords}
          </span>
        </div>
        {showTagline && (
          <span
            className={`text-[9px] tracking-widest uppercase font-bold mt-0.5 ${
              isWhite ? 'text-white/70' : 'text-slate-500'
            }`}
          >
            {settings.tagline || 'Global Workforce Solutions'}
          </span>
        )}
      </div>
    </div>
  );
};


