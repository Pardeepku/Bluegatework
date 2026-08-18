import React, { useState, useRef, useEffect } from 'react';
import { Globe, ChevronDown, Check } from 'lucide-react';
import { LanguageCode } from '../types';

interface LanguageSelectorProps {
  currentLang: LanguageCode;
  onLanguageChange: (lang: LanguageCode) => void;
  darkText?: boolean;
}

const LANGUAGES: { code: LanguageCode; label: string; flag: string; country: string }[] = [
  { code: 'en', label: 'English', flag: '🇬🇧', country: 'Global / UK' },
  { code: 'pt', label: 'Português', flag: '🇵🇹', country: 'Portugal' },
  { code: 'nl', label: 'Nederlands', flag: '🇳🇱', country: 'Nederland' },
  { code: 'es', label: 'Español', flag: '🇪🇸', country: 'España / LatAm' }
];

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  currentLang,
  onLanguageChange,
  darkText = false
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selected = LANGUAGES.find((l) => l.code === currentLang) || LANGUAGES[0];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        id="language-selector-btn"
        onClick={() => setIsOpen(!isOpen)}
        className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-lg transition-colors duration-200 border ${
          darkText
            ? 'text-slate-700 bg-white/80 border-slate-200 hover:bg-slate-50'
            : 'text-slate-200 bg-slate-800/60 border-slate-700 hover:bg-slate-800 hover:text-white'
        }`}
        title="Change language"
      >
        <Globe className="w-3.5 h-3.5 text-[#3B82F6]" />
        <span>{selected.flag}</span>
        <span className="hidden sm:inline font-medium uppercase tracking-wider">{selected.code}</span>
        <ChevronDown className="w-3 h-3 opacity-60" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-1.5 w-44 rounded-xl bg-white shadow-xl shadow-slate-900/10 border border-slate-100 py-1.5 z-50 animate-in fade-in zoom-in-95 duration-150">
          <div className="px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-slate-400 border-b border-slate-100">
            Select Language
          </div>
          {LANGUAGES.map((lang) => (
            <button
              key={lang.code}
              id={`lang-btn-${lang.code}`}
              onClick={() => {
                onLanguageChange(lang.code);
                setIsOpen(false);
              }}
              className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-blue-50 transition-colors ${
                currentLang === lang.code ? 'font-bold text-[#1E40AF] bg-blue-50/60' : 'text-slate-700'
              }`}
            >
              <div className="flex items-center gap-2">
                <span className="text-base">{lang.flag}</span>
                <div>
                  <div className="font-semibold">{lang.label}</div>
                  <div className="text-[10px] text-slate-400">{lang.country}</div>
                </div>
              </div>
              {currentLang === lang.code && <Check className="w-3.5 h-3.5 text-[#1E40AF]" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
