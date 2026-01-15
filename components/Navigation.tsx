import React, { useState, useEffect } from 'react';
import { Page, Language } from '../types';

interface NavigationProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
  language: Language;
  onToggleLanguage: () => void;
  theme: 'dark' | 'light';
  onToggleTheme: () => void;
}

const Navigation: React.FC<NavigationProps> = ({ currentPage, onNavigate, language, onToggleLanguage, theme, onToggleTheme }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Transition State for Language Switching
  const [visibleLanguage, setVisibleLanguage] = useState<Language>(language);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (language !== visibleLanguage) {
      setIsAnimating(true);
      const timer = setTimeout(() => {
        setVisibleLanguage(language);
        setIsAnimating(false);
      }, 300); // 300ms fade out duration
      return () => clearTimeout(timer);
    }
  }, [language, visibleLanguage]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const labels = {
    [Language.EN]: { HOME: 'Home', INST: 'The Institution', SERVICES: 'Services', VAULT: 'The Vault', CONC: 'Concierge' },
    [Language.AR]: { HOME: 'الرئيسية', INST: 'المؤسسة', SERVICES: 'الخدمات', VAULT: 'الخزنة', CONC: 'الكونسيرج' },
  };

  const navLinks = [
    { label: labels[visibleLanguage].HOME, page: Page.HOME },
    { label: labels[visibleLanguage].INST, page: Page.INSTITUTION },
    { label: labels[visibleLanguage].SERVICES, page: Page.SERVICES },
    { label: labels[visibleLanguage].VAULT, page: Page.VAULT },
    { label: labels[visibleLanguage].CONC, page: Page.CONCIERGE },
  ];

  const handleMobileNavigate = (page: Page) => {
    onNavigate(page);
    setMobileMenuOpen(false);
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ease-in-out px-6 md:px-12 py-6 
          ${scrolled ? 'bg-navy border-b border-copper' : 'bg-transparent'}`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between relative">
          
          {/* Logo / Brand Marker (Visible when scrolled) */}
          <div className={`text-gold-foil font-serif font-bold tracking-widest transition-opacity duration-300 ${scrolled ? 'opacity-100' : 'opacity-0'}`}>
            ANEEF
          </div>

          {/* Desktop Menu - Centered */}
          {/* We strictly control 'dir' here to sync layout flip with text change */}
          <div 
            className="hidden md:flex gap-12 absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2"
            dir={visibleLanguage === Language.AR ? 'rtl' : 'ltr'}
          >
            {navLinks.map((link, index) => (
              <button
                key={link.page}
                onClick={() => onNavigate(link.page)}
                className={`text-xs uppercase tracking-[0.2em] transition-all duration-300 ease-in-out
                  ${currentPage === link.page ? 'text-white border-b border-copper pb-1' : 'text-white/60 hover:text-copper'}
                  ${visibleLanguage === Language.AR ? 'font-arabic text-sm' : 'font-sans'}
                  ${isAnimating ? 'opacity-0 blur-sm translate-y-1' : 'opacity-100 blur-0 translate-y-0'}
                `}
                style={{ transitionDelay: `${index * 30}ms` }} // Subtle stagger effect
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Right Controls */}
          <div className="flex items-center gap-4">
            {/* Theme Toggle */}
            <button 
              onClick={onToggleTheme}
              className="text-copper hover:text-white transition-colors"
              title="Toggle Theme"
            >
              <span className="material-symbols-outlined text-xl">
                {theme === 'dark' ? 'light_mode' : 'dark_mode'}
              </span>
            </button>

            {/* Language Switcher */}
            <button 
              onClick={onToggleLanguage}
              className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-copper hover:text-white transition-colors border border-copper/30 px-3 py-1 rounded-sm"
            >
              <span className={language === Language.EN ? 'text-white font-bold' : 'opacity-50'}>EN</span>
              <span className="w-[1px] h-3 bg-copper/50"></span>
              <span className={language === Language.AR ? 'text-white font-bold font-arabic' : 'opacity-50 font-arabic'}>عربي</span>
            </button>
          </div>

          {/* Mobile Menu Icon (Absolute Right on mobile) */}
          <button 
            className="md:hidden text-copper ml-4 z-50 relative"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <span className="material-symbols-outlined text-3xl">
              {mobileMenuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 bg-navy z-40 flex flex-col items-center justify-center transition-all duration-500 md:hidden ${mobileMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full pointer-events-none'}`}>
         <div className="flex flex-col gap-8 text-center" dir={visibleLanguage === Language.AR ? 'rtl' : 'ltr'}>
            {navLinks.map((link, index) => (
              <button
                key={link.page}
                onClick={() => handleMobileNavigate(link.page)}
                className={`text-xl uppercase tracking-[0.2em] transition-all duration-300
                  ${currentPage === link.page ? 'text-gold-foil' : 'text-white hover:text-copper'}
                  ${visibleLanguage === Language.AR ? 'font-arabic' : 'font-serif'}
                  ${isAnimating ? 'opacity-0 blur-sm translate-y-2' : 'opacity-100 blur-0 translate-y-0'}
                `}
                style={{ transitionDelay: `${index * 50}ms` }}
              >
                {link.label}
              </button>
            ))}
         </div>
         <div className="absolute bottom-12 text-center">
            <p className="text-white/30 text-xs uppercase tracking-widest">Est. 2024</p>
         </div>
      </div>
    </>
  );
};

export default Navigation;