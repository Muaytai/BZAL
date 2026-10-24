import React from 'react';
import { ArrowUp, Phone, Mail, MapPin, ShieldCheck, Database } from 'lucide-react';
import { Language } from '../types';
import { content } from '../data/content';

interface FooterProps {
  currentLang: Language;
  onOpenCrm?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ currentLang, onOpenCrm }) => {
  const t = content[currentLang];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#2B3340] text-white text-xs pt-16 pb-10 relative overflow-hidden">
      
      {/* Dynamic Chevron Ribbon at Footer Top */}
      <div className="absolute top-0 left-0 right-0 h-2 bzal-ribbon-red-white" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          
          {/* Brand Info */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-lg bg-white p-1.5 shrink-0 flex items-center justify-center shadow-md">
                <img
                  src="/images/bzal_mark_pristine_red.png"
                  alt="БЗАЛ"
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-dela text-white text-base sm:text-lg tracking-wider">
                    {t.brand.name}
                  </span>
                  <span className="bg-[#E71B26] text-white font-dela text-[10px] px-2 py-0.5 rounded tracking-wider uppercase">
                    {t.brand.subname}
                  </span>
                </div>
                <div className="text-[10px] sm:text-[11px] text-[#BAC5CF] uppercase tracking-wide font-semibold mt-0.5">
                  {t.brand.fullName}
                </div>
              </div>
            </div>

            <p className="text-xs text-[#BAC5CF] leading-relaxed max-w-md font-medium">
              {t.footer.desc}
            </p>

            <div className="flex items-center gap-2 text-[11px] text-[#BAC5CF]">
              <ShieldCheck className="w-4 h-4 text-[#E71B26] shrink-0" />
              <span>{t.footer.isoCert}</span>
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-dela text-white uppercase tracking-wider">
              {t.footer.sectionsTitle}
            </h4>
            <ul className="space-y-2">
              {t.nav.map((item) => (
                <li key={item.id}>
                  <a
                    href={item.href}
                    className="text-[#BAC5CF] hover:text-[#E71B26] transition-colors font-medium flex items-center gap-1.5"
                  >
                    <span className="text-[#E71B26]">›</span>
                    <span>{item.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Requisites & Contacts */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="text-xs font-dela text-white uppercase tracking-wider">
              {t.footer.reqTitle}
            </h4>
            
            <div className="space-y-2 text-[#BAC5CF] text-xs">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#E71B26] shrink-0 mt-0.5" />
                <span>{t.contacts.addressVal}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#E71B26] shrink-0" />
                <a href="tel:+375447514477" className="text-white font-bold hover:text-[#E71B26]">
                  +375 44 751 44 77 {t.footer.salesDept}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#BAC5CF] shrink-0" />
                <span>+375 (163) 67-20-48 / 67-20-41 {t.footer.faxDept}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#E71B26] shrink-0" />
                <a href="mailto:sales@bzal.by" className="text-white hover:text-[#E71B26]">
                  sales@bzal.by
                </a>
              </div>
              <div className="pt-2 text-[11px] text-[#8E9BAE]">
                {t.footer.unpLabel}
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Legal Copyright Row */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[#8E9BAE] text-[11px]">
          <div>
            © 1974 – {new Date().getFullYear()} {t.footer.allRightsReserved}
          </div>

          <div className="flex flex-wrap items-center gap-5">
            <a
              href="http://www.bzal.by"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              {t.footer.portalLink}
            </a>
            <a
              href="http://bzal-uslugi.by"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              {t.footer.servicesLink}
            </a>
            {onOpenCrm && (
              <a
                href="#admin"
                onClick={(e) => {
                  e.preventDefault();
                  onOpenCrm();
                }}
                className="text-[#8E9BAE]/60 hover:text-white transition-colors text-[10px]"
                title="Служебный вход для специалистов ОАО «БЗАЛ»"
              >
                Служебный вход
              </a>
            )}
            <button
              onClick={scrollToTop}
              className="p-2 rounded-lg bg-[#1B222C] hover:bg-[#E71B26] text-white transition-colors cursor-pointer"
              title="Наверх"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
