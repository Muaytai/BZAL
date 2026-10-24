import React, { useState, useEffect } from 'react';
import { Phone, Mail, Globe, Menu, X, ArrowUpRight, Clock, MapPin, Lock } from 'lucide-react';
import { Language } from '../types';
import { content } from '../data/content';

interface NavbarProps {
  currentLang: Language;
  onLanguageChange: (lang: Language) => void;
  onOpenRfq: () => void;
  onOpenAdmin?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentLang,
  onLanguageChange,
  onOpenRfq,
  onOpenAdmin,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const t = content[currentLang];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-200">
      {/* Top Utility Bar (Graphite #2B3340 from Brandbook) */}
      <div className="bg-[#2B3340] text-white text-xs border-b border-[#1B222C] hidden md:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-1.5 flex items-center justify-between">
          <div className="flex items-center gap-5 text-[#BAC5CF]">
            <span className="flex items-center gap-1.5 font-medium">
              <MapPin className="w-3.5 h-3.5 text-[#E71B26]" />
              <span>{t.brand.address}</span>
            </span>
            <span className="flex items-center gap-1.5 font-medium">
              <Clock className="w-3.5 h-3.5 text-[#E71B26]" />
              <span>{t.brand.workingHours}</span>
            </span>
          </div>

          <div className="flex items-center gap-5">
            <a
              href="tel:+375447514477"
              className="flex items-center gap-1.5 text-white font-bold hover:text-[#E71B26] transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-[#E71B26]" />
              <span>+375 44 751 44 77</span>
            </a>
            <span className="text-white/20">|</span>
            <a
              href="mailto:sales@bzal.by"
              className="flex items-center gap-1.5 text-[#BAC5CF] hover:text-white transition-colors"
            >
              <Mail className="w-3.5 h-3.5 text-[#E71B26]" />
              <span>sales@bzal.by</span>
            </a>
            {onOpenAdmin && (
              <>
                <span className="text-white/20">|</span>
                <button
                  type="button"
                  onClick={onOpenAdmin}
                  className="inline-flex items-center gap-1 text-[#8E9BAE] hover:text-white transition-colors cursor-pointer"
                  title="Закрытый служебный вход для специалиста ОАО «БЗАЛ»"
                >
                  <Lock className="w-3 h-3 text-[#E71B26]" />
                  <span>Кабинет специалиста</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Main Navbar: Crisp White with Brand Red Accents */}
      <div
        className={`bg-white transition-all duration-200 ${
          isScrolled
            ? 'shadow-lg border-b border-[#D5D9DE] py-2.5'
            : 'border-b border-[#E2E5E8] py-3.5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4">
            
            {/* Brand Logo & Name strictly per Brandbook */}
            <a
              href="#top"
              className="flex items-center gap-3.5 group focus:outline-none"
              aria-label="Технопарк ОАО БЗАЛ"
            >
              {/* Pristine Brand Mark from Brandbook */}
              <div className="relative w-11 h-11 sm:w-12 sm:h-12 flex items-center justify-center bg-white border border-[#E2E5E8] rounded-lg p-1.5 shadow-sm group-hover:border-[#E71B26] transition-all">
                <img
                  src="/images/bzal_mark_pristine_red.png"
                  alt="БЗАЛ"
                  className="w-full h-full object-contain"
                />
              </div>

              {/* Typography */}
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="font-dela tracking-wider text-[#2B3340] text-base sm:text-lg lg:text-xl leading-none group-hover:text-[#E71B26] transition-colors">
                    {t.brand.name}
                  </span>
                  <span className="bg-[#E71B26] text-white font-dela text-[10px] sm:text-[11px] px-2 py-0.5 rounded tracking-wider uppercase">
                    {t.brand.subname}
                  </span>
                </div>
                <span className="text-[10px] sm:text-[11px] tracking-wide font-semibold text-[#647082] uppercase mt-0.5">
                  {t.brand.fullName}
                </span>
              </div>
            </a>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-7 text-sm font-semibold text-[#2B3340]">
              {t.nav.map((item) => (
                <a
                  key={item.id}
                  href={item.href}
                  className="hover:text-[#E71B26] transition-colors py-1 relative after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[#E71B26] after:scale-x-0 hover:after:scale-x-100 after:transition-transform"
                >
                  {item.label}
                </a>
              ))}
            </nav>

            {/* Right Action Area */}
            <div className="flex items-center gap-3">
              {/* Language Switcher */}
              <div className="flex items-center bg-[#ECEEF0] rounded-lg p-0.5 border border-[#D5D9DE] text-xs font-bold text-[#2B3340]">
                <Globe className="w-3.5 h-3.5 ml-2 text-[#647082] hidden sm:block" />
                {(['ru', 'en', 'zh'] as Language[]).map((lang) => (
                  <button
                    key={lang}
                    onClick={() => onLanguageChange(lang)}
                    className={`px-2 py-1 rounded-md uppercase transition-all cursor-pointer ${
                      currentLang === lang
                        ? 'bg-[#2B3340] text-white shadow-sm'
                        : 'text-[#647082] hover:text-[#2B3340]'
                    }`}
                  >
                    {lang}
                  </button>
                ))}
              </div>

              {/* Primary Red CTA Button */}
              <button
                onClick={onOpenRfq}
                className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#E71B26] hover:bg-[#C9141E] text-white font-bold text-xs uppercase tracking-wider shadow-sm hover:shadow-md transition-all cursor-pointer active:translate-y-0"
              >
                <span>{t.brand.btnRfq}</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 rounded-lg bg-[#ECEEF0] border border-[#D5D9DE] text-[#2B3340] hover:text-[#E71B26] focus:outline-none"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Dynamic Chevron Ribbon Under Navbar */}
        <div className="h-1.5 w-full bzal-ribbon-red-white" />
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-[#D5D9DE] shadow-2xl px-4 py-5 animate-in slide-in-from-top-4 duration-200">
          <nav className="flex flex-col gap-3">
            {t.nav.map((item) => (
              <a
                key={item.id}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg text-sm font-bold text-[#2B3340] hover:bg-[#ECEEF0] hover:text-[#E71B26] transition-colors"
              >
                {item.label}
              </a>
            ))}

            <div className="pt-3 border-t border-[#ECEEF0] flex flex-col gap-2">
              <div className="flex items-center gap-2 px-3 py-1 text-xs font-semibold text-[#647082]">
                <Clock className="w-3.5 h-3.5 text-[#E71B26]" />
                <span>{t.brand.workingHours}</span>
              </div>
              <a
                href="tel:+375447514477"
                className="flex items-center gap-2 px-3 py-1.5 text-sm font-bold text-[#2B3340]"
              >
                <Phone className="w-4 h-4 text-[#E71B26]" />
                <span>+375 44 751 44 77</span>
              </a>
              <a
                href="mailto:sales@bzal.by"
                className="flex items-center gap-2 px-3 py-1.5 text-sm font-bold text-[#E71B26]"
              >
                <Mail className="w-4 h-4 text-[#E71B26]" />
                <span>sales@bzal.by</span>
              </a>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenRfq();
                }}
                className="w-full flex items-center justify-center gap-2 py-3 mt-1 rounded-lg bg-[#E71B26] text-white font-bold text-sm uppercase tracking-wider"
              >
                <span>{t.brand.btnRfq}</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
