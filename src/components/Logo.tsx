import React, { useState } from 'react';
import { useSiteSettings } from '../context/SiteSettingsContext';

interface LogoProps {
  variant?: 'light' | 'dark' | 'white';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  showTagline?: boolean;
}

export const Logo: React.FC<LogoProps> = ({
  variant = 'dark',
  size = 'md',
  className = '',
}) => {
  const { settings } = useSiteSettings();
  const [imgError, setImgError] = useState(false);
  const isWhite = variant === 'white';

  const sizeClasses = {
    sm: 'h-8 sm:h-9 max-w-[170px]',
    md: 'h-10 sm:h-12 md:h-13 max-w-[240px]',
    lg: 'h-14 sm:h-16 md:h-20 max-w-[320px]',
    xl: 'h-20 sm:h-24 md:h-28 max-w-[400px]',
  };

  // Determine logo source
  let logoSrc = isWhite ? '/bluegate-logo-white.svg' : '/bluegate-logo.svg';
  if (settings.logoUrl && !imgError) {
    logoSrc = settings.logoUrl;
  }

  return (
    <div className={`inline-flex items-center select-none group cursor-pointer ${className}`}>
      {!imgError ? (
        <img
          src={logoSrc}
          alt={settings.siteName || 'Blue Gate Work'}
          className={`${sizeClasses[size]} w-auto object-contain transition-transform duration-300 group-hover:scale-[1.02]`}
          onError={() => setImgError(true)}
        />
      ) : (
        /* Vector Fallback if SVG fails to load */
        <div className="flex items-center gap-3">
          <div
            className={`w-10 h-10 rounded-xl flex items-center justify-center font-serif font-black text-xl shadow-md ${
              isWhite ? 'bg-white text-[#002D62]' : 'bg-[#002D62] text-[#D4AF37]'
            }`}
          >
            BG
          </div>
          <div className="flex flex-col">
            <span
              className={`font-serif font-black tracking-wider text-xl leading-none ${
                isWhite ? 'text-white' : 'text-[#002D62]'
              }`}
            >
              BLUE GATE
            </span>
            <span
              className={`text-[9px] font-semibold tracking-widest uppercase mt-0.5 ${
                isWhite ? 'text-[#FCD34D]' : 'text-[#B38027]'
              }`}
            >
              Gate for Opportunities
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
