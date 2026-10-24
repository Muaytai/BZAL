import React from 'react';
import { ArrowUp, Phone, Mail, MapPin, ShieldCheck, ExternalLink, Eye, Lock, Scale } from 'lucide-react';
import { Language } from '../types';
import { content } from '../data/content';
import { SITE_PAGES, SitePageId } from './Navbar';
import { MANDATORY_BELARUS_GOV_LINKS } from './GovComplianceSection';

interface FooterProps {
  currentLang: Language;
  onOpenCrm?: () => void;
  onSelectPage?: (page: SitePageId) => void;
  onOpenPrivacyPolicy?: () => void;
  onToggleA11y?: () => void;
  onOpenGovSection?: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  currentLang,
  onOpenCrm,
  onSelectPage,
  onOpenPrivacyPolicy,
  onToggleA11y,
  onOpenGovSection,
}) => {
  const t = content[currentLang];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#2B3340] text-white text-xs pt-10 pb-8 relative overflow-hidden">
      
      {/* Dynamic Chevron Ribbon at Footer Top */}
      <div className="absolute top-0 left-0 right-0 h-2 bzal-ribbon-red-white" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 pb-8 border-b border-white/10">
          
          {/* Brand Info */}
          <div className="lg:col-span-5 space-y-3">
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-lg bg-white p-1.5 shrink-0 flex items-center justify-center shadow-md">
                <img
                  src="/images/bzal_mark_pristine_red.png"
                  alt="БЗАЛ"
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-dela text-white text-base tracking-wider">
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

            <div className="flex flex-wrap items-center gap-2 pt-1">
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-[#1B222C] border border-white/10 text-[10px] font-bold text-emerald-400">
                <Lock className="w-3 h-3" />
                <span>HTTPS / SSL • Указ Президента РБ № 60</span>
              </span>
              {onToggleA11y && (
                <button
                  type="button"
                  onClick={onToggleA11y}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-[#1B222C] hover:bg-[#E71B26] border border-white/15 text-[10px] font-bold text-white transition-colors cursor-pointer"
                >
                  <Eye className="w-3 h-3 text-[#E71B26]" />
                  <span>Версия для слабовидящих (СТБ 2105)</span>
                </button>
              )}
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div className="lg:col-span-3 space-y-2.5">
            <h4 className="text-xs font-dela text-white uppercase tracking-wider">
              {t.footer.sectionsTitle}
            </h4>
            <ul className="grid grid-cols-1 gap-1.5">
              {SITE_PAGES.map((page) => (
                <li key={page.id}>
                  <button
                    type="button"
                    onClick={() => onSelectPage?.(page.id)}
                    className="text-[#BAC5CF] hover:text-[#E71B26] transition-colors font-medium flex items-center gap-1.5 cursor-pointer text-left"
                  >
                    <span className="text-[#E71B26] font-bold">{page.num}.</span>
                    <span>
                      {currentLang === 'ru'
                        ? page.labelRu
                        : currentLang === 'en'
                          ? page.labelEn
                          : page.labelZh}
                    </span>
                  </button>
                </li>
              ))}
              {onOpenGovSection && (
                <li>
                  <button
                    type="button"
                    onClick={onOpenGovSection}
                    className="text-white hover:text-[#E71B26] underline decoration-[#E71B26] underline-offset-3 transition-colors font-extrabold flex items-center gap-1.5 cursor-pointer text-left pt-1"
                  >
                    <Scale className="w-3.5 h-3.5 text-[#E71B26] shrink-0" />
                    <span>
                      {currentLang === 'ru'
                        ? 'Обращения граждан и Госресурсы РБ'
                        : currentLang === 'en'
                          ? 'Appeals & Belarus Gov Portals'
                          : '电子申诉与政务门户'}
                    </span>
                  </button>
                </li>
              )}
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
                <a href="mailto:sales@bzal.by" className="text-white hover:text-[#E71B26] underline">
                  sales@bzal.by
                </a>
              </div>
              <div className="pt-2 text-[11px] text-[#8E9BAE]">
                {t.footer.unpLabel} • Вышестоящий орган: ГО «Белорусская железная дорога»
              </div>
            </div>
          </div>

        </div>

        {/* Mandatory State Portals Strip (Постановление СМ РБ № 645 / Закон № 300-З) */}
        <div className="py-5 border-b border-white/10">
          <div className="text-[11px] font-dela uppercase tracking-wider text-[#BAC5CF] mb-3">
            {currentLang === 'ru'
              ? 'Официальные государственные информационные ресурсы Республики Беларусь:'
              : currentLang === 'en'
                ? 'Official State Information Resources of the Republic of Belarus:'
                : '白俄罗斯共和国官方信息资源门户：'}
          </div>
          <div className="flex flex-wrap items-center gap-2.5">
            {MANDATORY_BELARUS_GOV_LINKS.map((item) => (
              <a
                key={item.id}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-bold underline underline-offset-3 transition-colors ${
                  item.highlight
                    ? 'bg-[#E71B26] border-[#E71B26] text-white hover:bg-[#C9141E]'
                    : 'bg-[#1B222C] border-white/15 text-[#BAC5CF] hover:text-white hover:border-white/40'
                }`}
              >
                <span>{item.domain}</span>
                <span className="text-[10px] opacity-80 hidden sm:inline">
                  — {currentLang === 'ru' ? item.badgeRu : item.domain}
                </span>
                <ExternalLink className="w-3 h-3 shrink-0" />
              </a>
            ))}
          </div>
        </div>

        {/* Bottom Legal Copyright Row */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[#8E9BAE] text-[11px]">
          <div>
            © 1974 – {new Date().getFullYear()} {t.footer.allRightsReserved}
          </div>

          <div className="flex flex-wrap items-center gap-4">
            {onOpenPrivacyPolicy && (
              <button
                type="button"
                onClick={onOpenPrivacyPolicy}
                className="text-[#BAC5CF] hover:text-white underline transition-colors cursor-pointer"
              >
                {currentLang === 'ru'
                  ? 'Защита персональных данных (Закон РБ № 99-З)'
                  : currentLang === 'en'
                    ? 'Personal Data Policy (Law No. 99-Z)'
                    : '个人数据保护政策'}
              </button>
            )}
            <a
              href="http://www.bzal.by"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white underline transition-colors"
            >
              {t.footer.portalLink}
            </a>
            <a
              href="http://bzal-uslugi.by"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white underline transition-colors"
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
                title="Служебный вход для специалистов ОАО БЗАЛ"
              >
                {currentLang === 'ru'
                  ? 'Служебный вход'
                  : currentLang === 'en'
                    ? 'Staff Login'
                    : '内部登录'}
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

