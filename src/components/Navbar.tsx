import { useState, useEffect } from 'react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface NavbarProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  onOpenResume: () => void;
}

export default function Navbar({ activeSection, onNavigate, onOpenResume }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [logoHovered, setLogoHovered] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: "Home", id: "hero" },
    { label: "Work", id: "works" },
    { label: "Skills", id: "skills" },
  ];

  return (
    <header
      id="main-navbar"
      className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-4 md:pt-6 px-4 transition-all duration-300 pointer-events-none"
    >
      <nav
        aria-label="Main Navigation"
        className={`pointer-events-auto inline-flex items-center gap-1 sm:gap-1.5 rounded-full backdrop-blur-md border border-white/10 bg-surface/90 px-2 py-1.5 sm:px-2.5 sm:py-2 transition-all duration-300 ${
          isScrolled ? 'shadow-xl shadow-black/40 border-white/15 bg-surface/95' : 'shadow-md shadow-black/20'
        }`}
      >
        {/* Logo (9x9 circle = 36px) */}
        <button
          id="nav-logo-btn"
          type="button"
          onClick={() => onNavigate('hero')}
          onMouseEnter={() => setLogoHovered(true)}
          onMouseLeave={() => setLogoHovered(false)}
          className="group relative flex items-center justify-center w-9 h-9 rounded-full p-[1.5px] transition-transform duration-300 hover:scale-110 focus:outline-none"
          title={`${PERSONAL_INFO.name} - Home`}
        >
          {/* Animated gradient ring border */}
          <span
            className={`absolute inset-0 rounded-full transition-all duration-500 ${
              logoHovered ? 'accent-gradient-reverse' : 'accent-gradient'
            }`}
          />
          <span className="relative z-10 w-full h-full rounded-full bg-bg flex items-center justify-center text-text-primary font-display italic text-[13px] font-bold tracking-tight group-hover:text-white">
            {PERSONAL_INFO.initials}
          </span>
        </button>

        {/* Divider */}
        <span className="w-px h-5 bg-stroke mx-1 hidden sm:block" />

        {/* Nav Links */}
        <div className="flex items-center gap-0.5 sm:gap-1">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                id={`nav-link-${item.id}`}
                type="button"
                onClick={() => onNavigate(item.id)}
                className={`text-xs sm:text-sm font-medium rounded-full px-2.5 sm:px-4 py-1.5 sm:py-2 transition-all duration-200 focus:outline-none ${
                  isActive
                    ? 'text-text-primary bg-stroke/60 font-semibold'
                    : 'text-muted hover:text-text-primary hover:bg-stroke/40'
                }`}
              >
                {item.label}
              </button>
            );
          })}

          {/* Resume Modal trigger */}
          <button
            id="nav-resume-btn"
            type="button"
            onClick={onOpenResume}
            className="text-xs sm:text-sm font-medium rounded-full px-2.5 sm:px-4 py-1.5 sm:py-2 text-muted hover:text-text-primary hover:bg-stroke/40 transition-all duration-200 focus:outline-none"
          >
            Resume
          </button>
        </div>

        {/* Divider */}
        <span className="w-px h-5 bg-stroke mx-1 hidden sm:block" />

        {/* "Say hi" CTA Button */}
        <a
          id="nav-say-hi-btn"
          href={`mailto:${PERSONAL_INFO.email}`}
          className="group relative inline-flex items-center justify-center rounded-full text-xs sm:text-sm font-medium focus:outline-none"
        >
          {/* Accent gradient hover border glow */}
          <span className="absolute -inset-[2px] rounded-full accent-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          <span className="relative z-10 inline-flex items-center gap-1.5 bg-surface rounded-full px-3.5 sm:px-4 py-1.5 sm:py-2 text-text-primary backdrop-blur-md border border-white/10 group-hover:border-transparent transition-all duration-200">
            <span>Say hi</span>
            <span className="text-[11px] transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200">
              ↗
            </span>
          </span>
        </a>
      </nav>
    </header>
  );
}
