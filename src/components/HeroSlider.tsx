import React, { useState, useEffect } from 'react';
import {
  ArrowUpRight,
  ChevronRight,
  ChevronLeft,
  Pause,
  Play,
  Building2,
  HardHat,
  Package,
} from 'lucide-react';
import { PageId } from '../types';
import { useImages } from '../context/ImageContext';
import { useSiteSettings } from '../context/SiteSettingsContext';

interface HeroSliderProps {
  onNavigate: (page: PageId) => void;
  onRequestQuote: () => void;
  onApplyJob: (job: null) => void;
}

interface SlideData {
  id: number;
  imageKey: string;
  eyebrow: string;
  headline: string;
  description: string;
  buttonText: string;
  categoryName: string;
  fallbackImageUrl: string;
}

export const HeroSlider: React.FC<HeroSliderProps> = ({
  onNavigate,
  onRequestQuote,
  onApplyJob,
}) => {
  const { getImageUrl } = useImages();
  const { settings } = useSiteSettings();
  const hp = settings.homePageContent || {};

  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState<boolean>(true);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);

  const slides: SlideData[] = [
    {
      id: 0,
      imageKey: 'hero_slide_1',
      eyebrow: hp.slide1Eyebrow || 'EFFICIENT WORKFORCE. SMOOTH OPERATIONS.',
      headline: hp.slide1Headline || 'Powering Your Business From Warehouse To Success',
      description:
        hp.slide1Description ||
        'Our dedicated warehouse workforce ensures accurate handling, timely operations, and complete efficiency to keep your supply chain running strong.',
      buttonText: hp.slide1ButtonText || 'Contact us',
      categoryName: 'Warehouse Workers',
      fallbackImageUrl:
        'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=2000&q=85',
    },
    {
      id: 1,
      imageKey: 'hero_slide_2',
      eyebrow: hp.slide2Eyebrow || 'BUILDING TOMORROW, TOGETHER',
      headline: hp.slide2Headline || 'Building Strong Foundations For A Better Tomorrow',
      description:
        hp.slide2Description ||
        'Delivering reliable and innovative construction solutions across Europe with a focus on quality, safety, and sustainability.',
      buttonText: hp.slide2ButtonText || 'Contact us',
      categoryName: 'Construction Workers',
      fallbackImageUrl:
        'https://images.unsplash.com/photo-1541888946425-d0fbb186156a?auto=format&fit=crop&w=2000&q=85',
    },
  ].map((tmpl) => ({
    ...tmpl,
    imageUrl: getImageUrl(tmpl.imageKey, tmpl.fallbackImageUrl),
  }));

  const totalSlides = slides.length;
  const slideDuration = 7000; // 7 seconds
  const stepInterval = 50;

  const isPaused = !isAutoPlaying || isHovered || isFocused;

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
    setProgress(0);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
    setProgress(0);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setProgress(0);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      nextSlide();
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      prevSlide();
    }
  };

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setProgress((prev) => {
        const next = prev + (stepInterval / slideDuration) * 100;
        if (next >= 100) {
          setCurrentSlide((curr) => (curr + 1) % totalSlides);
          return 0;
        }
        return next;
      });
    }, stepInterval);

    return () => clearInterval(interval);
  }, [isPaused, currentSlide]);

  const activeSlideData = slides[currentSlide];

  return (
    <div
      id="hero-banner-slider"
      className="relative w-full overflow-hidden bg-[#001f4d]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsFocused(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) {
          setIsFocused(false);
        }
      }}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="region"
      aria-roledescription="carousel"
      aria-label="Bluegate Hero Workforce Slider"
      aria-live="polite"
    >
      {/* BACKGROUND IMAGES WITH SMOOTH CROSSFADE */}
      <div className="relative min-h-[580px] sm:min-h-[620px] lg:min-h-[680px] w-full flex items-center">
        {slides.map((slide, idx) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              currentSlide === idx ? 'opacity-100 scale-100' : 'opacity-0 scale-105 pointer-events-none'
            }`}
            style={{
              backgroundImage: `url(${getImageUrl(slide.imageKey, slide.fallbackImageUrl)})`,
              backgroundPosition: idx === 1 ? 'center right' : 'center right',
              backgroundSize: 'cover',
            }}
          >
            {/* Multi-stage Royal Blue Gradient Overlay for High Contrast & Exact Reference Aesthetic */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#002255] via-[#002f73]/90 lg:via-[#003380]/80 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#001738]/90 via-transparent to-black/20" />
          </div>
        ))}

        {/* MAIN SLIDE CONTENT CONTAINER - FULL 100% WIDTH ON PC */}
        <div className="relative z-10 w-full px-4 sm:px-8 lg:px-14 xl:px-20 py-16 sm:py-20 lg:py-28 max-w-none">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 xl:gap-12 items-center w-full">
            {/* Left Content Area matching both reference layouts */}
            <div className="lg:col-span-8 xl:col-span-8 space-y-6 text-left max-w-4xl">
              {/* Eyebrow in Gold */}
              <div className="flex items-center gap-2">
                <p className="text-[#FFD000] text-xs sm:text-sm font-extrabold tracking-[0.2em] uppercase font-sans">
                  {activeSlideData.eyebrow}
                </p>
              </div>

              {/* Main Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white font-heading tracking-tight leading-[1.12] max-w-3xl drop-shadow-sm">
                {activeSlideData.headline}
              </h1>

              {/* Thin Divider Line under title */}
              <div className="w-20 h-[2px] bg-white/40 rounded-full" />

              {/* Description Body Text */}
              <p className="text-sm sm:text-base lg:text-lg text-slate-100/90 max-w-2xl leading-relaxed font-normal">
                {activeSlideData.description}
              </p>

              {/* Primary Gold Action Button matching reference with ArrowUpRight */}
              <div className="pt-4 flex flex-wrap items-center gap-4">
                <button
                  id="hero-contact-button"
                  onClick={onRequestQuote}
                  className="px-7 py-3.5 bg-[#FFD000] hover:bg-[#ffdc2e] text-[#111827] font-bold text-sm sm:text-base rounded-md shadow-lg shadow-black/20 hover:shadow-xl hover:scale-[1.02] transition-all flex items-center justify-center gap-2 cursor-pointer group focus:outline-none focus:ring-2 focus:ring-white"
                >
                  <span>{activeSlideData.buttonText}</span>
                  <ArrowUpRight className="w-4 h-4 text-black group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform stroke-[2.5]" />
                </button>

                <button
                  id="hero-secondary-portal-button"
                  onClick={() => onNavigate('for-jobseekers')}
                  className="px-6 py-3.5 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/30 text-white font-semibold text-sm sm:text-base rounded-md transition-all flex items-center gap-2 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#FFD000]"
                >
                  <span>{currentSlide === 0 ? 'Warehouse Careers' : 'Construction Careers'}</span>
                  <ChevronRight className="w-4 h-4 text-[#FFD000]" />
                </button>
              </div>
            </div>

            {/* Right Column: Floating Sector Switcher Widget */}
            <div className="lg:col-span-4 xl:col-span-4 flex justify-start lg:justify-end self-end pt-6 lg:pt-0">
              <div className="w-full max-w-xs bg-[#1f242d]/85 backdrop-blur-md border border-white/15 rounded-md p-4 text-white shadow-2xl space-y-3">
                <p className="text-[10px] uppercase font-extrabold tracking-widest text-[#FFD000]">
                  Industry Specializations
                </p>

                {/* Warehouse Workers Tab (Slide 1) */}
                <button
                  id="sector-tab-warehouse"
                  onClick={() => goToSlide(0)}
                  className={`w-full text-left py-2.5 px-3 rounded flex items-center justify-between text-sm font-bold transition-all cursor-pointer ${
                    currentSlide === 0
                      ? 'bg-white/15 text-white border-l-3 border-[#FFD000]'
                      : 'text-slate-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Package className={`w-4 h-4 ${currentSlide === 0 ? 'text-[#FFD000]' : 'text-slate-400'}`} />
                    <span>Warehouse Workers</span>
                  </div>
                  {currentSlide === 0 && <span className="w-2 h-2 rounded-full bg-[#FFD000] animate-pulse" />}
                </button>

                {/* Subtle Divider */}
                <div className="h-[1px] bg-white/10 w-full" />

                {/* Construction Workers Tab (Slide 2) */}
                <button
                  id="sector-tab-construction"
                  onClick={() => goToSlide(1)}
                  className={`w-full text-left py-2.5 px-3 rounded flex items-center justify-between text-sm font-bold transition-all cursor-pointer ${
                    currentSlide === 1
                      ? 'bg-white/15 text-white border-l-3 border-[#FFD000]'
                      : 'text-slate-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <HardHat className={`w-4 h-4 ${currentSlide === 1 ? 'text-[#FFD000]' : 'text-slate-400'}`} />
                    <span>Construction Workers</span>
                  </div>
                  {currentSlide === 1 && <span className="w-2 h-2 rounded-full bg-[#FFD000] animate-pulse" />}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM NAVIGATION STRIP (DOTS, LIVE PROGRESS BAR, PAUSE STATUS, ARROWS) */}
        <div className="absolute bottom-4 sm:bottom-6 inset-x-0 z-20">
          <div className="w-full px-4 sm:px-8 lg:px-14 xl:px-20 flex flex-col sm:flex-row items-center justify-between gap-3">
            {/* Navigation Dots Indicator */}
            <div
              className="flex items-center gap-2 bg-black/40 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/10"
              role="tablist"
              aria-label="Slider navigation"
            >
              {slides.map((slide, idx) => (
                <button
                  key={slide.id}
                  id={`hero-dot-${idx}`}
                  role="tab"
                  aria-selected={currentSlide === idx}
                  aria-label={`Jump to slide: ${slide.categoryName}`}
                  onClick={() => goToSlide(idx)}
                  className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer relative overflow-hidden focus:outline-none focus:ring-2 focus:ring-[#FFD000] ${
                    currentSlide === idx ? 'w-12 bg-white/30' : 'w-2.5 bg-white/40 hover:bg-white/70'
                  }`}
                  title={slide.categoryName}
                >
                  {/* Progress filler */}
                  {currentSlide === idx && (
                    <span
                      className="absolute inset-y-0 left-0 bg-[#FFD000] rounded-full transition-all duration-75"
                      style={{ width: `${progress}%` }}
                    />
                  )}
                </button>
              ))}

              <span className="text-[11px] font-bold text-white/80 pl-2">
                0{currentSlide + 1} / 0{totalSlides}
              </span>
            </div>

            {/* Slider Controls (Auto-Play Toggle & Prev/Next Arrows) */}
            <div className="flex items-center gap-2">
              <button
                id="hero-slider-pause-btn"
                onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                className="px-3 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-white text-xs font-semibold hover:bg-black/60 transition-colors flex items-center gap-1.5 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#FFD000]"
                title={isPaused ? 'Click to resume auto-play' : 'Click to pause auto-play'}
              >
                {isPaused ? (
                  <>
                    <Pause className="w-3.5 h-3.5 text-[#FFD000]" />
                    <span className="text-[11px] text-white/80">
                      {isHovered ? 'Paused (Hover)' : 'Paused'}
                    </span>
                  </>
                ) : (
                  <>
                    <Play className="w-3.5 h-3.5 text-white" />
                    <span className="text-[11px] text-white/80">Auto-Play</span>
                  </>
                )}
              </button>

              <div className="flex items-center bg-black/40 backdrop-blur-md rounded-full border border-white/10 p-0.5">
                <button
                  id="hero-slider-prev"
                  onClick={prevSlide}
                  className="p-1.5 rounded-full text-white hover:bg-white/20 transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#FFD000]"
                  title="Previous Slide"
                  aria-label="Previous Slide"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  id="hero-slider-next"
                  onClick={nextSlide}
                  className="p-1.5 rounded-full text-white hover:bg-white/20 transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#FFD000]"
                  title="Next Slide"
                  aria-label="Next Slide"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
