import React, { useState, useEffect } from 'react';
import { Language } from './types';
import { Navbar } from './components/Navbar';
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
  const [isRfqOpen, setIsRfqOpen] = useState(false);
  const [isPassportOpen, setIsPassportOpen] = useState(false);
  const [isCrmOpen, setIsCrmOpen] = useState<boolean>(checkIsAdminRoute);
  const [crmRefreshCount, setCrmRefreshCount] = useState(0);
  const [selectedService, setSelectedService] = useState<string | undefined>(undefined);

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

  const handleScrollToCalculator = (serviceTitle: string) => {
    setSelectedService(serviceTitle);
    const element = document.getElementById('calculator');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    } else {
      setIsRfqOpen(true);
    }
  };

  const triggerCrmRefresh = () => {
    setCrmRefreshCount((c) => c + 1);
  };

  return (
    <div id="top" className="min-h-screen bg-[#ECEEF0] text-[#2B3340] flex flex-col font-montserrat">
      {/* 1. Navigation */}
      <Navbar
        currentLang={currentLang}
        onLanguageChange={setCurrentLang}
        onOpenRfq={() => handleOpenRfq()}
        onOpenAdmin={handleOpenAdmin}
      />

      {/* Main Content */}
      <main className="flex-1">
        {/* 2. Hero */}
        <Hero
          currentLang={currentLang}
          onOpenRfq={() => handleOpenRfq()}
        />

        {/* 3. About the Technopark & Plant History */}
        <AboutSection
          currentLang={currentLang}
        />

        {/* 4. Interactive Parts & Manufactured Components Catalog */}
        <PartsCatalog
          currentLang={currentLang}
          onRequestQuoteForPart={(partTitle) => handleOpenRfq(`Изготовление детали: ${partTitle}`)}
          onOpenPassportModal={() => setIsPassportOpen(true)}
        />

        {/* 5. Competencies & Engineering Services (OGK, OGT, CNC, Contract, Residency) */}
        <Competencies
          currentLang={currentLang}
          onSelectService={handleScrollToCalculator}
        />

        {/* 6. Equipment, Shop Floor & Technical Specs Table */}
        <Facilities
          currentLang={currentLang}
          onOpenPassportModal={() => setIsPassportOpen(true)}
          onSelectService={handleScrollToCalculator}
        />

        {/* 7. Quality Assurance, Metrology & Testing Laboratory */}
        <QualityMetrology
          currentLang={currentLang}
          onOpenRfq={() => handleOpenRfq('Запрос протоколов ОТК и сертификатов')}
        />

        {/* 8. Direct Plant vs Brokers Comparison */}
        <Comparison
          currentLang={currentLang}
        />

        {/* 9. Strategic Conditions for Russian Federation & EAEU Clients */}
        <EaeuLogistics
          currentLang={currentLang}
          onOpenRfq={(note) => handleOpenRfq(note)}
        />

        {/* 10. 4-Step Process Pipeline */}
        <ProcessPipeline
          currentLang={currentLang}
        />

        {/* 11. Interactive RFQ Estimator & Lead Form */}
        <RfqCalculator
          currentLang={currentLang}
          preselectedService={selectedService}
          onInquiryCreated={triggerCrmRefresh}
        />

        {/* 12. Official Contacts & Location */}
        <ContactSection
          currentLang={currentLang}
          onOpenRfq={() => handleOpenRfq()}
        />
      </main>

      {/* Footer */}
      <Footer
        currentLang={currentLang}
        onOpenCrm={handleOpenAdmin}
      />

      {/* Quick RFQ Modal Dialog */}
      <RfqModal
        isOpen={isRfqOpen}
        onClose={() => setIsRfqOpen(false)}
        currentLang={currentLang}
        initialService={selectedService}
        onInquiryCreated={triggerCrmRefresh}
      />

      {/* Plant Capability Passport Lead Magnet Modal */}
      <PlantPassportModal
        isOpen={isPassportOpen}
        onClose={() => setIsPassportOpen(false)}
        currentLang={currentLang}
        onLeadCreated={triggerCrmRefresh}
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
        onOpenRfq={() => handleOpenRfq('Обращение в отдел маркетинга и сбыта')}
        onOpenPassport={() => setIsPassportOpen(true)}
      />
    </div>
  );
}
