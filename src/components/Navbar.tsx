import React, { useState, useEffect } from 'react';
import { Phone, Mail, Globe, Menu, X, ArrowUpRight, Clock, MapPin, Lock, Scale, Search, Eye, ExternalLink } from 'lucide-react';
import { Language } from '../types';
import { content } from '../data/content';
import { BrandLogo } from './BrandLogo';

export type SitePageId =
  | 'home'
  | 'tools'
  | 'parts'
  | 'services'
  | 'equipment'
  | 'eaeu'
  | 'calculator'
  | 'contacts';

export interface SitePageMeta {
  id: SitePageId;
  num: string;
  labelRu: string;
  labelEn: string;
  labelZh: string;
  shortRu: string;
  shortEn: string;
  shortZh: string;
  mobileRu: string;
  mobileEn: string;
  mobileZh: string;
}

export const SITE_PAGES: SitePageMeta[] = [
  {
    id: 'home',
    num: '01',
    labelRu: 'Главная',
    labelEn: 'Home',
    labelZh: '首页',
    shortRu: 'Главная',
    shortEn: 'Home',
    shortZh: '首页',
    mobileRu: 'Главная',
    mobileEn: 'Home',
    mobileZh: '首页',
  },
  {
    id: 'tools',
    num: '02',
    labelRu: 'Калькулятор ГОСТ и Статус',
    labelEn: 'GOST Calc & Status',
    labelZh: '毛坯计算与状态',
    shortRu: 'Калькулятор ГОСТ / Статус',
    shortEn: 'GOST Calc & Status',
    shortZh: '计算与状态',
    mobileRu: 'ГОСТ и Статус',
    mobileEn: 'Calc & Status',
    mobileZh: '计算与状态',
  },
  {
    id: 'parts',
    num: '03',
    labelRu: 'Каталог деталей',
    labelEn: 'Parts Catalog',
    labelZh: '零件图录',
    shortRu: 'Каталог деталей',
    shortEn: 'Parts',
    shortZh: '零件图录',
    mobileRu: 'Детали',
    mobileEn: 'Parts',
    mobileZh: '零件',
  },
  {
    id: 'services',
    num: '04',
    labelRu: 'Компетенции ОГК/ОГТ',
    labelEn: 'Engineering & CNC',
    labelZh: '工程与机加工',
    shortRu: 'Компетенции',
    shortEn: 'Competencies',
    shortZh: '专业能力',
    mobileRu: 'Компетенции',
    mobileEn: 'Services',
    mobileZh: '能力',
  },
  {
    id: 'equipment',
    num: '05',
    labelRu: 'Станки ЧПУ и ОТК',
    labelEn: 'Machinery & QC Lab',
    labelZh: '机床与质检',
    shortRu: 'Станки и ОТК',
    shortEn: 'Machinery & QC',
    shortZh: '机床与质检',
    mobileRu: 'Станки ЧПУ',
    mobileEn: 'Machines',
    mobileZh: '机床',
  },
  {
    id: 'eaeu',
    num: '06',
    labelRu: 'Поставки РФ и ЕАЭС',
    labelEn: 'EAEU & Logistics',
    labelZh: '欧亚联盟物流',
    shortRu: 'РФ и ЕАЭС',
    shortEn: 'EAEU Logistics',
    shortZh: '欧亚物流',
    mobileRu: 'РФ и ЕАЭС',
    mobileEn: 'EAEU',
    mobileZh: '物流',
  },
  {
    id: 'calculator',
    num: '07',
    labelRu: 'Расчёт по ТЗ',
    labelEn: 'RFQ Estimator',
    labelZh: '询价计算',
    shortRu: 'Расчёт по ТЗ',
    shortEn: 'RFQ Form',
    shortZh: '在线询价',
    mobileRu: 'Расчёт ТЗ',
    mobileEn: 'RFQ Form',
    mobileZh: '询价',
  },
  {
    id: 'contacts',
    num: '08',
    labelRu: 'О заводе и Контакты',
    labelEn: 'About & Contacts',
    labelZh: '关于与联系',
    shortRu: 'О заводе / Контакты',
    shortEn: 'Contacts',
    shortZh: '联系我们',
    mobileRu: 'Контакты',
    mobileEn: 'Contacts',
    mobileZh: '联系',
  },
];

interface NavbarProps {
  currentLang: Language;
  onLanguageChange: (lang: Language) => void;
  onOpenRfq: () => void;
  onOpenAdmin?: () => void;
  onOpenEngineeringTool?: (tool: 'metal' | 'status') => void;
  onToggleA11y?: () => void;
  onOpenGovSection?: () => void;
  activePage: SitePageId;
  onSelectPage: (page: SitePageId) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentLang,
  onLanguageChange,
  onOpenRfq,
  onOpenAdmin,
  onOpenEngineeringTool,
  onToggleA11y,
  onOpenGovSection,
  activePage,
  onSelectPage,
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

  const getPageLabel = (p: SitePageMeta) =>
    currentLang === 'ru' ? p.shortRu : currentLang === 'en' ? p.shortEn : p.shortZh;

  const getMobilePageLabel = (p: SitePageMeta) =>
    currentLang === 'ru' ? p.mobileRu : currentLang === 'en' ? p.mobileEn : p.mobileZh;

  const specialistLabel =
    currentLang === 'ru'
      ? 'Кабинет специалиста'
      : currentLang === 'en'
        ? 'Specialist Portal'
        : '专员后台';

  const mobileSelectLabel =
    currentLang === 'ru'
      ? 'Выберите страницу сайта:'
      : currentLang === 'en'
        ? 'Select site page:'
        : '选择网站页面：';

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-200">
      {/* Top Utility Bar (Graphite #2B3340 from Brandbook) - Centered */}
      <div className="bg-[#2B3340] text-white text-xs border-b border-[#1B222C] hidden md:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-1.5 flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-center">
          <span className="inline-flex items-center gap-1.5 font-medium text-[#BAC5CF]">
            <MapPin className="w-3.5 h-3.5 text-[#E95A0C] shrink-0" />
            <span>{t.brand.address}</span>
          </span>

          <span className="text-white/20 hidden lg:inline">|</span>

          <span className="inline-flex items-center gap-1.5 font-bold text-white">
            <Clock className="w-3.5 h-3.5 text-[#E95A0C] shrink-0" />
            <span>{t.brand.workingHours}</span>
          </span>

          <span className="text-white/20">|</span>

          <a
            href="tel:+375447514477"
            className="inline-flex items-center gap-1.5 text-white font-bold hover:text-[#E95A0C] transition-colors"
          >
            <Phone className="w-3.5 h-3.5 text-[#E95A0C] shrink-0" />
            <span>+375 44 751 44 77</span>
          </a>

          <span className="text-white/20">|</span>

          {/* Mandatory State Electronic Appeals Link (обращения.бел) */}
          <a
            href="https://обращения.бел"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-white font-extrabold underline decoration-[#E95A0C] underline-offset-3 hover:text-[#E95A0C] transition-colors"
            title={
              currentLang === 'ru'
                ? 'Государственная единая система учета и обработки обращений граждан и юридических лиц'
                : currentLang === 'en'
                  ? 'Unified State Electronic Appeals System of Belarus (обращения.бел)'
                  : '白俄罗斯国家统一电子申诉系统 (обращения.бел)'
            }
          >
            <span>
              {currentLang === 'ru'
                ? 'обращения.бел'
                : currentLang === 'en'
                  ? 'Appeals (обращения.бел)'
                  : '电子申诉 (обращения.бел)'}
            </span>
            <ExternalLink className="w-3 h-3 text-[#E95A0C]" />
          </a>

          {onOpenGovSection && (
            <button
              type="button"
              onClick={onOpenGovSection}
              className="inline-flex items-center gap-1 text-[#BAC5CF] hover:text-white underline decoration-white/30 underline-offset-3 transition-colors cursor-pointer"
            >
              <span>
                {currentLang === 'ru'
                  ? 'Госресурсы РБ'
                  : currentLang === 'en'
                    ? 'Gov Portals'
                    : '政务门户'}
              </span>
            </button>
          )}

          <span className="text-white/20">|</span>

          {/* Visually Impaired Mode Toggle (СТБ 2105) - Large & High Contrast */}
          {onToggleA11y && (
            <button
              type="button"
              onClick={onToggleA11y}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-[#FFCC00] hover:bg-white text-[#1B222C] border-2 border-white font-black text-xs sm:text-[13px] uppercase tracking-wide shadow-md hover:scale-[1.02] transition-all cursor-pointer shrink-0"
              title="Версия сайта для слабовидящих (СТБ 2105)"
            >
              <Eye className="w-4 h-4 sm:w-5 sm:h-5 text-[#E95A0C] stroke-[2.5] shrink-0" />
              <span>
                {currentLang === 'ru'
                  ? 'Версия для слабовидящих'
                  : currentLang === 'en'
                    ? 'Visually Impaired'
                    : '无障碍模式'}
              </span>
            </button>
          )}

          {/* Language Switcher in Top Bar on Desktop */}
          <div className="inline-flex items-center gap-1 bg-[#1B222C] rounded-md p-0.5 border border-white/10 text-[11px] font-bold">
            <Globe className="w-3 h-3 ml-1 text-[#8E9BAE]" />
            {(['ru', 'en', 'zh'] as Language[]).map((lang) => (
              <button
                key={lang}
                type="button"
                onClick={() => onLanguageChange(lang)}
                className={`px-1.5 py-0.5 rounded uppercase transition-all cursor-pointer ${
                  currentLang === lang
                    ? 'bg-[#E95A0C] text-white'
                    : 'text-[#BAC5CF] hover:text-white'
                }`}
              >
                {lang}
              </button>
            ))}
          </div>

          {onOpenAdmin && (
            <>
              <span className="text-white/20">|</span>
              <button
                type="button"
                onClick={onOpenAdmin}
                className="inline-flex items-center gap-1 text-[#8E9BAE] hover:text-white transition-colors cursor-pointer"
                title={specialistLabel}
              >
                <Lock className="w-3 h-3 text-[#E95A0C]" />
                <span>{specialistLabel}</span>
              </button>
            </>
          )}
        </div>
      </div>

      {/* Main Navbar: Crisp White with Centered Layout */}
      <div
        className={`bg-white transition-all duration-200 ${
          isScrolled
            ? 'shadow-lg border-b border-[#D5D9DE] py-1.5 sm:py-2'
            : 'border-b border-[#E2E5E8] py-1.5 sm:py-2'
        }`}
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between lg:justify-center gap-2 xl:gap-3">
            {/* Official Horizontal Brand Logo (dynamically localized for RU / EN / ZH) */}
            <button
              type="button"
              onClick={() => onSelectPage('home')}
              className="flex items-center group focus:outline-none text-left cursor-pointer shrink-0"
              aria-label="Технопарк ОАО БЗАЛ"
            >
              <div className="relative w-[142px] h-[44px] sm:w-[174px] sm:h-[52px] xl:w-[190px] xl:h-[56px] flex items-center justify-center bg-white border border-[#E2E5E8] rounded-xl overflow-hidden shadow-xs group-hover:border-[#E95A0C] transition-all shrink-0 p-1">
                <BrandLogo currentLang={currentLang} />
              </div>
            </button>

            {/* Centered Desktop Page Navigation Tabs */}
            <nav className="hidden lg:flex items-center justify-center gap-0.5 xl:gap-1 bg-[#F3F5F7] p-1 rounded-xl border border-[#D5D9DE]">
              {SITE_PAGES.map((page) => {
                const isActive = activePage === page.id;
                return (
                  <button
                    key={page.id}
                    type="button"
                    onClick={() => onSelectPage(page.id)}
                    className={`px-2 xl:px-2.5 py-1.5 rounded-lg text-[11px] xl:text-xs font-extrabold transition-all cursor-pointer whitespace-nowrap ${
                      isActive
                        ? 'bg-[#E95A0C] text-white shadow-xs'
                        : 'text-[#2B3340] hover:bg-white hover:text-[#E95A0C]'
                    }`}
                  >
                    {getPageLabel(page)}
                  </button>
                );
              })}
            </nav>

            {/* Right Action Area */}
            <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
              {/* Prominent Visually Impaired Button on Mobile/Tablet where top bar is hidden */}
              {onToggleA11y && (
                <button
                  type="button"
                  onClick={onToggleA11y}
                  className="inline-flex md:hidden items-center gap-1 px-2.5 py-1.5 rounded-lg bg-[#FFCC00] text-[#1B222C] border-2 border-[#2B3340] font-black text-[11px] shadow-xs cursor-pointer"
                  title="Версия для слабовидящих (СТБ 2105)"
                >
                  <Eye className="w-4 h-4 text-[#E95A0C] stroke-[2.5] shrink-0" />
                  <span className="hidden xs:inline">
                    {currentLang === 'ru' ? 'Слабовидящим' : 'A11Y'}
                  </span>
                </button>
              )}

              {/* Language Switcher (shown on mobile where top utility bar is hidden) */}
              <div className="flex md:hidden items-center bg-[#ECEEF0] rounded-lg p-0.5 border border-[#D5D9DE] text-[10px] font-bold text-[#2B3340]">
                {(['ru', 'en', 'zh'] as Language[]).map((lang) => (
                  <button
                    key={lang}
                    type="button"
                    onClick={() => onLanguageChange(lang)}
                    className={`px-1.5 py-1 rounded uppercase transition-all cursor-pointer ${
                      currentLang === lang
                        ? 'bg-[#2B3340] text-white shadow-xs'
                        : 'text-[#647082] hover:text-[#2B3340]'
                    }`}
                  >
                    {lang}
                  </button>
                ))}
              </div>

              {/* Quick Call Button on Mobile */}
              <a
                href="tel:+375447514477"
                className="inline-flex sm:hidden items-center justify-center p-1.5 rounded-lg bg-[#E95A0C] text-white shadow-xs"
                aria-label="Call Marketing & Sales"
                title="+375 44 751 44 77"
              >
                <Phone className="w-4 h-4" />
              </a>

              {/* Primary Red CTA Button */}
              <button
                type="button"
                onClick={onOpenRfq}
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-[#E95A0C] hover:bg-[#CC4B06] text-white font-bold text-xs uppercase tracking-wider shadow-sm hover:shadow-md transition-all cursor-pointer whitespace-nowrap"
              >
                <span>{t.brand.btnRfq}</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>

              {/* Mobile / Tablet Menu Toggle */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-1.5 sm:p-2 rounded-lg bg-[#ECEEF0] border border-[#D5D9DE] text-[#2B3340] hover:text-[#E95A0C] focus:outline-none cursor-pointer"
                aria-label="Menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Mobile & Tablet Horizontal Quick-Scroll Page Strip (scrollbar hidden via .no-scrollbar, concise labels) */}
          <div className="lg:hidden flex items-center gap-1 overflow-x-auto pt-1.5 pb-0.5 no-scrollbar -mx-1 px-1">
            {SITE_PAGES.map((page) => {
              const isActive = activePage === page.id;
              return (
                <button
                  key={page.id}
                  type="button"
                  onClick={() => onSelectPage(page.id)}
                  className={`px-2.5 py-1 rounded-md text-[11px] font-extrabold whitespace-nowrap transition-all cursor-pointer shrink-0 ${
                    isActive
                      ? 'bg-[#E95A0C] text-white shadow-2xs'
                      : 'bg-[#F3F5F7] text-[#2B3340] border border-[#D5D9DE]'
                  }`}
                >
                  {getMobilePageLabel(page)}
                </button>
              );
            })}
          </div>
        </div>

        {/* Dynamic Chevron Ribbon Under Navbar */}
        <div className="h-1.5 w-full bzal-ribbon-red-white mt-1.5" />
      </div>

      {/* Mobile & Tablet Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-[#D5D9DE] shadow-2xl px-4 py-4 animate-in slide-in-from-top-4 duration-200 max-h-[82vh] overflow-y-auto">
          <div className="text-[11px] font-bold uppercase tracking-wider text-[#647082] mb-2 px-2">
            {mobileSelectLabel}
          </div>
          <nav className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
            {SITE_PAGES.map((page) => {
              const isActive = activePage === page.id;
              return (
                <button
                  key={page.id}
                  type="button"
                  onClick={() => {
                    onSelectPage(page.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-lg text-xs font-extrabold text-left transition-colors cursor-pointer ${
                    isActive
                      ? 'bg-[#E95A0C] text-white'
                      : 'bg-[#F8F9FA] text-[#2B3340] hover:bg-[#ECEEF0]'
                  }`}
                >
                  <span>
                    {page.num}. {getPageLabel(page)}
                  </span>
                  <span>→</span>
                </button>
              );
            })}
          </nav>

          <div className="pt-3 mt-3 border-t border-[#ECEEF0] flex flex-col gap-2">
            <div className="flex items-center gap-2 px-2 py-1 text-xs font-bold text-[#2B3340]">
              <Clock className="w-3.5 h-3.5 text-[#E95A0C]" />
              <span>{t.brand.workingHours}</span>
            </div>
            <div className="flex flex-wrap items-center gap-4 px-2">
              <a
                href="tel:+375447514477"
                className="flex items-center gap-1.5 text-xs font-extrabold text-[#2B3340]"
              >
                <Phone className="w-3.5 h-3.5 text-[#E95A0C]" />
                <span>+375 44 751 44 77</span>
              </a>
              <a
                href="mailto:sales@bzal.by"
                className="flex items-center gap-1.5 text-xs font-extrabold text-[#E95A0C]"
              >
                <Mail className="w-3.5 h-3.5 text-[#E95A0C]" />
                <span>sales@bzal.by</span>
              </a>
            </div>
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenRfq();
              }}
              className="w-full flex items-center justify-center gap-2 py-3 mt-1 rounded-lg bg-[#E95A0C] text-white font-bold text-xs uppercase tracking-wider cursor-pointer"
            >
              <span>{t.brand.btnRfq}</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
            {onToggleA11y && (
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onToggleA11y();
                }}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-lg bg-[#FFCC00] text-[#1B222C] border-2 border-[#2B3340] font-black text-xs uppercase tracking-wide shadow-sm cursor-pointer"
              >
                <Eye className="w-4 h-4 text-[#E95A0C] stroke-[2.5]" />
                <span>
                  {currentLang === 'ru'
                    ? 'Версия для слабовидящих (СТБ 2105)'
                    : currentLang === 'en'
                      ? 'Visually Impaired Mode (STB 2105)'
                      : '无障碍模式'}
                </span>
              </button>
            )}
            <a
              href="https://обращения.бел"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-1.5 py-2 rounded-lg bg-[#FFF2EB] border border-[#E95A0C]/30 text-[#E95A0C] font-extrabold text-xs underline"
            >
              <span>
                {currentLang === 'ru'
                  ? 'Электронные обращения (обращения.бел)'
                  : currentLang === 'en'
                    ? 'Electronic Appeals (обращения.бел)'
                    : '国家电子申诉系统 (обращения.бел)'}
              </span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
            {onOpenAdmin && (
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAdmin();
                }}
                className="w-full flex items-center justify-center gap-1.5 py-2 rounded-lg bg-[#ECEEF0] text-[#2B3340] font-bold text-xs cursor-pointer"
              >
                <Lock className="w-3.5 h-3.5 text-[#E95A0C]" />
                <span>{specialistLabel}</span>
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
