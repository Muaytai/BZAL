import React, { useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight, Layers } from 'lucide-react';
import { Language } from './types';
import { Navbar, SITE_PAGES, SitePageId } from './components/Navbar';
import { Hero } from './components/Hero';
import { AboutSection } from './components/AboutSection';
import { PartsCatalog } from './components/PartsCatalog';
import { Competencies } from './components/Competencies';
import { Facilities } from './components/Facilities';
import { QualityMetrology } from './components/QualityMetrology';
import { Comparison } from './components/Comparison';
import { EaeuLogistics } from './components/EaeuLogistics';
import { ProcessPipeline } from './components/ProcessPipeline';
import { RfqCalculator } from './components/RfqCalculator';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { RfqModal } from './components/RfqModal';
import { PlantPassportModal } from './components/PlantPassportModal';
import { FloatingEngineerWidget } from './components/FloatingEngineerWidget';
import { DatabaseAnalyticsModal } from './components/DatabaseAnalyticsModal';
import { EngineeringToolsSection } from './components/EngineeringToolsSection';
import { GovComplianceSection } from './components/GovComplianceSection';
import {
  AccessibilityToolbar,
  loadA11ySettings,
  applyA11ySettingsToDom,
} from './components/AccessibilityToolbar';
import { PrivacyPolicyModal, CookieConsentBanner } from './components/PrivacyPolicyModal';
import { initCmsConfig } from './utils/cmsStore';

function checkIsAdminRoute(): boolean {
  if (typeof window === 'undefined') return false;
  return (
    window.location.hash === '#admin' ||
    window.location.pathname === '/admin' ||
    window.location.pathname.startsWith('/admin/')
  );
}

export default function App() {
  const [currentLang, setCurrentLang] = useState<Language>('ru');
  const [activePage, setActivePage] = useState<SitePageId>('home');

  // Sub-tabs inside combined pages so no page ever requires long scrolling
  const [servicesSubTab, setServicesSubTab] = useState<'competencies' | 'comparison'>('competencies');
  const [equipmentSubTab, setEquipmentSubTab] = useState<'machines' | 'quality'>('machines');
  const [eaeuSubTab, setEaeuSubTab] = useState<'logistics' | 'pipeline'>('logistics');
  const [contactsSubTab, setContactsSubTab] = useState<'contacts' | 'about' | 'gov'>('contacts');

  const [isRfqOpen, setIsRfqOpen] = useState(false);
  const [isPassportOpen, setIsPassportOpen] = useState(false);
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);
  const [isA11yOpen, setIsA11yOpen] = useState(false);
  const [isCrmOpen, setIsCrmOpen] = useState<boolean>(checkIsAdminRoute);
  const [crmRefreshCount, setCrmRefreshCount] = useState(0);
  const [cmsRevision, setCmsRevision] = useState(0);
  const [selectedService, setSelectedService] = useState<string | undefined>(undefined);
  const [requestedTool, setRequestedTool] = useState<'metal' | 'status'>('metal');
  const [requestedToolSeq, setRequestedToolSeq] = useState(0);

  useEffect(() => {
    applyA11ySettingsToDom(loadA11ySettings());
    const handleCmsUpdate = () => setCmsRevision((r) => r + 1);
    window.addEventListener('bzal-cms-updated', handleCmsUpdate);
    initCmsConfig().then(() => setCmsRevision((r) => r + 1));
    return () => window.removeEventListener('bzal-cms-updated', handleCmsUpdate);
  }, []);

  const currentPageIndex = Math.max(
    0,
    SITE_PAGES.findIndex((p) => p.id === activePage)
  );
  const currentPageMeta = SITE_PAGES[currentPageIndex] || SITE_PAGES[0];
  const prevPageMeta =
    currentPageIndex > 0 ? SITE_PAGES[currentPageIndex - 1] : null;
  const nextPageMeta =
    currentPageIndex < SITE_PAGES.length - 1
      ? SITE_PAGES[currentPageIndex + 1]
      : null;

  const getPageTitle = (p: (typeof SITE_PAGES)[number]) =>
    currentLang === 'ru'
      ? p.labelRu
      : currentLang === 'en'
        ? p.labelEn
        : p.labelZh;

  const handleSelectPage = (page: SitePageId) => {
    setActivePage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenGovSection = () => {
    setActivePage('contacts');
    setContactsSubTab('gov');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const syncRoute = () => {
      setIsCrmOpen(checkIsAdminRoute());
    };
    window.addEventListener('hashchange', syncRoute);
    window.addEventListener('popstate', syncRoute);
    return () => {
      window.removeEventListener('hashchange', syncRoute);
      window.removeEventListener('popstate', syncRoute);
    };
  }, []);

  // Allow flipping pages with Left / Right arrow keys when not typing in inputs
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isRfqOpen || isPassportOpen || isCrmOpen || isPrivacyOpen) return;
      const tag = (e.target as HTMLElement | null)?.tagName?.toLowerCase();
      if (tag === 'input' || tag === 'textarea' || tag === 'select') return;

      if (e.key === 'ArrowRight' && nextPageMeta) {
        handleSelectPage(nextPageMeta.id);
      } else if (e.key === 'ArrowLeft' && prevPageMeta) {
        handleSelectPage(prevPageMeta.id);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentPageIndex, isRfqOpen, isPassportOpen, isCrmOpen, isPrivacyOpen, nextPageMeta, prevPageMeta]);

  const handleOpenAdmin = () => {
    window.location.hash = 'admin';
    setIsCrmOpen(true);
  };

  const handleCloseAdmin = () => {
    if (window.location.hash === '#admin') {
      history.pushState('', document.title, window.location.pathname + window.location.search);
    } else if (window.location.pathname.startsWith('/admin')) {
      history.pushState('', document.title, '/');
    }
    setIsCrmOpen(false);
  };

  const handleOpenRfq = (serviceTitle?: string) => {
    setSelectedService(serviceTitle);
    setIsRfqOpen(true);
  };

  const handleOpenEngineeringTool = (tool: 'metal' | 'status') => {
    setRequestedTool(tool);
    setRequestedToolSeq((s) => s + 1);
    setActivePage('tools');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleGoToCalculator = (serviceTitle: string) => {
    setSelectedService(serviceTitle);
    setActivePage('calculator');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const triggerCrmRefresh = () => {
    setCrmRefreshCount((c) => c + 1);
  };

  return (
    <div id="top" className="min-h-screen bg-[#ECEEF0] text-[#2B3340] flex flex-col font-montserrat">
      {/* 0. Visually Impaired Mode Toolbar (СТБ 2105) */}
      <AccessibilityToolbar
        currentLang={currentLang}
        isOpen={isA11yOpen}
        onClose={() => setIsA11yOpen(false)}
      />

      {/* 1. Single Fixed Top Header with Page Navigation */}
      <Navbar
        currentLang={currentLang}
        onLanguageChange={setCurrentLang}
        onOpenRfq={() => handleOpenRfq()}
        onOpenAdmin={handleOpenAdmin}
        onOpenEngineeringTool={handleOpenEngineeringTool}
        onToggleA11y={() => setIsA11yOpen((prev) => !prev)}
        onOpenGovSection={handleOpenGovSection}
        activePage={activePage}
        onSelectPage={handleSelectPage}
      />

      {/* 2. Main Full-Screen Active Page View */}
      <main data-cms-rev={cmsRevision} className="flex-1 flex flex-col justify-between pt-24 sm:pt-28 lg:pt-28 min-h-[calc(100vh-110px)]">
        <div className="flex-1">
          {/* PAGE 01: HOME (HERO) */}
          {activePage === 'home' && (
            <Hero
              currentLang={currentLang}
              onOpenRfq={() => handleOpenRfq()}
              onOpenEngineeringTool={handleOpenEngineeringTool}
              onSelectPage={handleSelectPage}
              onOpenGovSection={handleOpenGovSection}
            />
          )}

          {/* PAGE 02: ENGINEERING TOOLS (GOST METAL CALCULATOR + INQUIRY STATUS TRACKER) */}
          {activePage === 'tools' && (
            <EngineeringToolsSection
              currentLang={currentLang}
              onOpenRfqWithSpec={(specSummary) => handleOpenRfq(specSummary)}
              requestedTool={requestedTool}
              requestedToolSeq={requestedToolSeq}
            />
          )}

          {/* PAGE 03: PARTS CATALOG */}
          {activePage === 'parts' && (
            <PartsCatalog
              currentLang={currentLang}
              onRequestQuoteForPart={(partTitle) =>
                handleOpenRfq(
                  currentLang === 'ru'
                    ? `Изготовление детали: ${partTitle}`
                    : currentLang === 'en'
                      ? `Part Manufacturing: ${partTitle}`
                      : `零件加工：${partTitle}`
                )
              }
              onOpenPassportModal={() => setIsPassportOpen(true)}
            />
          )}

          {/* PAGE 04: COMPETENCIES & DIRECT CONTRACT COMPARISON */}
          {activePage === 'services' && (
            <div>
              <div className="bg-white border-b border-[#D5D9DE] py-3">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap items-center justify-center sm:justify-between gap-3">
                  <div className="text-xs font-extrabold uppercase text-[#2B3340]">
                    {currentLang === 'ru'
                      ? 'Выберите подраздел страницы:'
                      : currentLang === 'en'
                        ? 'Select page section:'
                        : '选择页面子板块：'}
                  </div>
                  <div className="inline-flex flex-wrap p-1 rounded-xl bg-[#ECEEF0] border border-[#D5D9DE]">
                    <button
                      type="button"
                      onClick={() => setServicesSubTab('competencies')}
                      className={`px-3.5 py-2 rounded-lg text-xs font-extrabold uppercase transition-all cursor-pointer ${
                        servicesSubTab === 'competencies'
                          ? 'bg-[#E71B26] text-white shadow-xs'
                          : 'text-[#2B3340] hover:bg-white'
                      }`}
                    >
                      {currentLang === 'ru'
                        ? '1. Службы ОГК, ОГТ и мехобработка'
                        : currentLang === 'en'
                          ? '1. OGK, OGT & CNC Machining'
                          : '1. 总设计部、工艺部与机加工'}
                    </button>
                    <button
                      type="button"
                      onClick={() => setServicesSubTab('comparison')}
                      className={`px-3.5 py-2 rounded-lg text-xs font-extrabold uppercase transition-all cursor-pointer ${
                        servicesSubTab === 'comparison'
                          ? 'bg-[#E71B26] text-white shadow-xs'
                          : 'text-[#2B3340] hover:bg-white'
                      }`}
                    >
                      {currentLang === 'ru'
                        ? '2. Завод ОАО БЗАЛ или посредники?'
                        : currentLang === 'en'
                          ? '2. JSC BZAL vs Intermediaries'
                          : '2. BZAL源头大厂 vs 中间商'}
                    </button>
                  </div>
                </div>
              </div>

              {servicesSubTab === 'competencies' ? (
                <Competencies
                  currentLang={currentLang}
                  onSelectService={handleGoToCalculator}
                />
              ) : (
                <Comparison currentLang={currentLang} />
              )}
            </div>
          )}

          {/* PAGE 05: EQUIPMENT & QUALITY CONTROL (OTK) */}
          {activePage === 'equipment' && (
            <div>
              <div className="bg-white border-b border-[#D5D9DE] py-3">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap items-center justify-center sm:justify-between gap-3">
                  <div className="text-xs font-extrabold uppercase text-[#2B3340]">
                    {currentLang === 'ru'
                      ? 'Выберите подраздел страницы:'
                      : currentLang === 'en'
                        ? 'Select page section:'
                        : '选择页面子板块：'}
                  </div>
                  <div className="inline-flex flex-wrap p-1 rounded-xl bg-[#ECEEF0] border border-[#D5D9DE]">
                    <button
                      type="button"
                      onClick={() => setEquipmentSubTab('machines')}
                      className={`px-3.5 py-2 rounded-lg text-xs font-extrabold uppercase transition-all cursor-pointer ${
                        equipmentSubTab === 'machines'
                          ? 'bg-[#E71B26] text-white shadow-xs'
                          : 'text-[#2B3340] hover:bg-white'
                      }`}
                    >
                      {currentLang === 'ru'
                        ? '1. Станочный парк ЧПУ и характеристики'
                        : currentLang === 'en'
                          ? '1. CNC Machine Park & Specs'
                          : '1. 数控机床设备与技术参数'}
                    </button>
                    <button
                      type="button"
                      onClick={() => setEquipmentSubTab('quality')}
                      className={`px-3.5 py-2 rounded-lg text-xs font-extrabold uppercase transition-all cursor-pointer ${
                        equipmentSubTab === 'quality'
                          ? 'bg-[#E71B26] text-white shadow-xs'
                          : 'text-[#2B3340] hover:bg-white'
                      }`}
                    >
                      {currentLang === 'ru'
                        ? '2. Лаборатория ОТК и метрология ISO 9001'
                        : currentLang === 'en'
                          ? '2. QC Lab & ISO 9001 Metrology'
                          : '2. 质检实验室与 ISO 9001 计量'}
                    </button>
                  </div>
                </div>
              </div>

              {equipmentSubTab === 'machines' ? (
                <Facilities
                  currentLang={currentLang}
                  onOpenPassportModal={() => setIsPassportOpen(true)}
                  onSelectService={handleGoToCalculator}
                />
              ) : (
                <QualityMetrology
                  currentLang={currentLang}
                  onOpenRfq={() =>
                    handleOpenRfq(
                      currentLang === 'ru'
                        ? 'Запрос протоколов ОТК и сертификатов'
                        : currentLang === 'en'
                          ? 'QC Inspection Certificates Request'
                          : '质检报告与认证证书申请'
                    )
                  }
                />
              )}
            </div>
          )}

          {/* PAGE 06: EAEU LOGISTICS & 4-STEP WORKFLOW */}
          {activePage === 'eaeu' && (
            <div>
              <div className="bg-white border-b border-[#D5D9DE] py-3">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap items-center justify-center sm:justify-between gap-3">
                  <div className="text-xs font-extrabold uppercase text-[#2B3340]">
                    {currentLang === 'ru'
                      ? 'Выберите подраздел страницы:'
                      : currentLang === 'en'
                        ? 'Select page section:'
                        : '选择页面子板块：'}
                  </div>
                  <div className="inline-flex flex-wrap p-1 rounded-xl bg-[#ECEEF0] border border-[#D5D9DE]">
                    <button
                      type="button"
                      onClick={() => setEaeuSubTab('logistics')}
                      className={`px-3.5 py-2 rounded-lg text-xs font-extrabold uppercase transition-all cursor-pointer ${
                        eaeuSubTab === 'logistics'
                          ? 'bg-[#E71B26] text-white shadow-xs'
                          : 'text-[#2B3340] hover:bg-white'
                      }`}
                    >
                      {currentLang === 'ru'
                        ? '1. Поставки в РФ и ЕАЭС (0% НДС, RUB, Ж/Д)'
                        : currentLang === 'en'
                          ? '1. EAEU & Export Logistics (0% VAT, Rail)'
                          : '1. 欧亚联盟与国际铁路物流 (0%增值税)'}
                    </button>
                    <button
                      type="button"
                      onClick={() => setEaeuSubTab('pipeline')}
                      className={`px-3.5 py-2 rounded-lg text-xs font-extrabold uppercase transition-all cursor-pointer ${
                        eaeuSubTab === 'pipeline'
                          ? 'bg-[#E71B26] text-white shadow-xs'
                          : 'text-[#2B3340] hover:bg-white'
                      }`}
                    >
                      {currentLang === 'ru'
                        ? '2. Регламент работы (4 шага от заявки до партии)'
                        : currentLang === 'en'
                          ? '2. Workflow (4 Steps from Inquiry to Batch)'
                          : '2. 合作流程 (从询价到交付4个阶段)'}
                    </button>
                  </div>
                </div>
              </div>

              {eaeuSubTab === 'logistics' ? (
                <EaeuLogistics
                  currentLang={currentLang}
                  onOpenRfq={(note) => handleOpenRfq(note)}
                />
              ) : (
                <ProcessPipeline currentLang={currentLang} />
              )}
            </div>
          )}

          {/* PAGE 07: RFQ ESTIMATOR & ONLINE APPLICATION */}
          {activePage === 'calculator' && (
            <RfqCalculator
              currentLang={currentLang}
              preselectedService={selectedService}
              onInquiryCreated={triggerCrmRefresh}
              onOpenPrivacyPolicy={() => setIsPrivacyOpen(true)}
            />
          )}

          {/* PAGE 08: CONTACTS, PLANT HERITAGE & BELARUS STATE COMPLIANCE */}
          {activePage === 'contacts' && (
            <div>
              <div className="bg-white border-b border-[#D5D9DE] py-3">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap items-center justify-center sm:justify-between gap-3">
                  <div className="text-xs font-extrabold uppercase text-[#2B3340]">
                    {currentLang === 'ru'
                      ? 'Выберите подраздел страницы:'
                      : currentLang === 'en'
                        ? 'Select page section:'
                        : '选择页面子板块：'}
                  </div>
                  <div className="inline-flex flex-wrap p-1 rounded-xl bg-[#ECEEF0] border border-[#D5D9DE] gap-1">
                    <button
                      type="button"
                      onClick={() => setContactsSubTab('contacts')}
                      className={`px-3.5 py-2 rounded-lg text-xs font-extrabold uppercase transition-all cursor-pointer ${
                        contactsSubTab === 'contacts'
                          ? 'bg-[#E71B26] text-white shadow-xs'
                          : 'text-[#2B3340] hover:bg-white'
                      }`}
                    >
                      {currentLang === 'ru'
                        ? '1. Контакты отдела маркетинга и продаж (8:00–16:30)'
                        : currentLang === 'en'
                          ? '1. Marketing & Sales Contacts (8:00–16:30)'
                          : '1. 市场与销售部联系方式 (8:00–16:30)'}
                    </button>
                    <button
                      type="button"
                      onClick={() => setContactsSubTab('about')}
                      className={`px-3.5 py-2 rounded-lg text-xs font-extrabold uppercase transition-all cursor-pointer ${
                        contactsSubTab === 'about'
                          ? 'bg-[#E71B26] text-white shadow-xs'
                          : 'text-[#2B3340] hover:bg-white'
                      }`}
                    >
                      {currentLang === 'ru'
                        ? '2. О Технопарке и история завода (с 1974 г.)'
                        : currentLang === 'en'
                          ? '2. About Technopark & Heritage (since 1974)'
                          : '2. 关于科技园区与工厂历史 (始于1974年)'}
                    </button>
                    <button
                      type="button"
                      onClick={() => setContactsSubTab('gov')}
                      className={`px-3.5 py-2 rounded-lg text-xs font-extrabold uppercase transition-all cursor-pointer ${
                        contactsSubTab === 'gov'
                          ? 'bg-[#E71B26] text-white shadow-xs'
                          : 'text-[#2B3340] hover:bg-white'
                      }`}
                    >
                      {currentLang === 'ru'
                        ? '3. Обращения.бел, Руководство и Госресурсы РБ'
                        : currentLang === 'en'
                          ? '3. Appeals, Management & Belarus Gov Portals'
                          : '3. 电子申诉、管理层与政务门户'}
                    </button>
                  </div>
                </div>
              </div>

              {contactsSubTab === 'contacts' ? (
                <ContactSection
                  currentLang={currentLang}
                  onOpenRfq={() => handleOpenRfq()}
                  onOpenGovSection={handleOpenGovSection}
                />
              ) : contactsSubTab === 'about' ? (
                <AboutSection currentLang={currentLang} />
              ) : (
                <GovComplianceSection
                  currentLang={currentLang}
                  onOpenRfq={() => handleOpenRfq()}
                  onOpenPrivacyPolicy={() => setIsPrivacyOpen(true)}
                />
              )}
            </div>
          )}
        </div>

        {/* Bottom Page Flipper Bar (Localized RU / EN / ZH) */}
        <div className="bg-white border-t border-b border-[#D5D9DE] py-4">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <button
              type="button"
              disabled={!prevPageMeta}
              onClick={() => prevPageMeta && handleSelectPage(prevPageMeta.id)}
              className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-xs font-extrabold uppercase tracking-wider border transition-all ${
                prevPageMeta
                  ? 'bg-[#F8F9FA] hover:bg-[#2B3340] text-[#2B3340] hover:text-white border-[#D5D9DE] cursor-pointer'
                  : 'bg-[#F8F9FA] text-[#BAC5CF] border-[#ECEEF0] cursor-not-allowed'
              }`}
            >
              <ArrowLeft className="w-4 h-4 shrink-0" />
              <span>
                {prevPageMeta
                  ? currentLang === 'ru'
                    ? `Назад: ${prevPageMeta.num}. ${getPageTitle(prevPageMeta)}`
                    : currentLang === 'en'
                      ? `Previous: ${prevPageMeta.num}. ${getPageTitle(prevPageMeta)}`
                      : `上一页：${prevPageMeta.num}. ${getPageTitle(prevPageMeta)}`
                  : currentLang === 'ru'
                    ? 'Вы на первой странице'
                    : currentLang === 'en'
                      ? 'First Page'
                      : '当前为第一页'}
              </span>
            </button>

            <div className="text-xs font-bold text-[#647082] text-center">
              {currentLang === 'ru' ? 'Страница' : currentLang === 'en' ? 'Page' : '第'}{' '}
              <span className="text-[#2B3340] font-extrabold">{currentPageMeta.num}</span>{' '}
              {currentLang === 'ru' ? 'из' : currentLang === 'en' ? 'of' : '/'}{' '}
              <span className="text-[#2B3340] font-extrabold">08</span> ·{' '}
              <span className="text-[#E71B26] font-extrabold">{getPageTitle(currentPageMeta)}</span>
            </div>

            <button
              type="button"
              disabled={!nextPageMeta}
              onClick={() => nextPageMeta && handleSelectPage(nextPageMeta.id)}
              className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-xs font-extrabold uppercase tracking-wider transition-all ${
                nextPageMeta
                  ? 'bg-[#E71B26] hover:bg-[#C9141E] text-white shadow-sm cursor-pointer'
                  : 'bg-[#ECEEF0] text-[#95A1AE] cursor-not-allowed'
              }`}
            >
              <span>
                {nextPageMeta
                  ? currentLang === 'ru'
                    ? `Следующая страница: ${nextPageMeta.num}. ${getPageTitle(nextPageMeta)}`
                    : currentLang === 'en'
                      ? `Next Page: ${nextPageMeta.num}. ${getPageTitle(nextPageMeta)}`
                      : `下一页：${nextPageMeta.num}. ${getPageTitle(nextPageMeta)}`
                  : currentLang === 'ru'
                    ? 'Вы на последней странице'
                    : currentLang === 'en'
                      ? 'Last Page'
                      : '当前为最后一页'}
              </span>
              <ArrowRight className="w-4 h-4 shrink-0" />
            </button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer
        currentLang={currentLang}
        onOpenCrm={handleOpenAdmin}
        onSelectPage={handleSelectPage}
        onOpenPrivacyPolicy={() => setIsPrivacyOpen(true)}
        onToggleA11y={() => setIsA11yOpen((prev) => !prev)}
        onOpenGovSection={handleOpenGovSection}
      />

      {/* Quick RFQ Modal Dialog */}
      <RfqModal
        isOpen={isRfqOpen}
        onClose={() => setIsRfqOpen(false)}
        currentLang={currentLang}
        initialService={selectedService}
        onInquiryCreated={triggerCrmRefresh}
        onOpenPrivacyPolicy={() => setIsPrivacyOpen(true)}
      />

      {/* Plant Capability Passport Lead Magnet Modal */}
      <PlantPassportModal
        isOpen={isPassportOpen}
        onClose={() => setIsPassportOpen(false)}
        currentLang={currentLang}
        onLeadCreated={triggerCrmRefresh}
      />

      {/* Personal Data Protection Policy Modal (Law of Belarus No. 99-Z) */}
      <PrivacyPolicyModal
        isOpen={isPrivacyOpen}
        onClose={() => setIsPrivacyOpen(false)}
        currentLang={currentLang}
      />

      {/* Cookie & Personal Data Consent Banner (Law of Belarus No. 99-Z) */}
      <CookieConsentBanner
        currentLang={currentLang}
        onOpenPolicy={() => setIsPrivacyOpen(true)}
      />

      {/* Separate Protected Specialist Admin Panel (/admin or #admin) */}
      <DatabaseAnalyticsModal
        isOpen={isCrmOpen}
        onClose={handleCloseAdmin}
        refreshTrigger={crmRefreshCount}
      />

      {/* Floating Quick Action Marketing & Sales Widget */}
      <FloatingEngineerWidget
        currentLang={currentLang}
        onOpenRfq={() => handleOpenRfq('Обращение в отдел маркетинга и продаж')}
        onOpenPassport={() => setIsPassportOpen(true)}
      />
    </div>
  );
}

