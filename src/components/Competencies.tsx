import React, { useState } from 'react';
import { Check, ArrowRight, Cog, Layers, Hammer, Boxes, Building, ShieldCheck, ArrowUpRight } from 'lucide-react';
import { Language } from '../types';
import { content, competencyTabs } from '../data/content';

interface CompetenciesProps {
  currentLang: Language;
  onSelectService: (serviceTitle: string) => void;
}

export const Competencies: React.FC<CompetenciesProps> = ({ currentLang, onSelectService }) => {
  const t = content[currentLang];
  const tabs = competencyTabs[currentLang];
  const [activeTabId, setActiveTabId] = useState(tabs[0].id);

  const activeTab = tabs.find((item) => item.id === activeTabId) || tabs[0];

  const getIcon = (id: string) => {
    switch (id) {
      case 'ogk':
        return <Layers className="w-4 h-4" />;
      case 'ogt':
        return <Cog className="w-4 h-4" />;
      case 'machining':
        return <Hammer className="w-4 h-4" />;
      case 'contract':
        return <Boxes className="w-4 h-4" />;
      case 'residency':
        return <Building className="w-4 h-4" />;
      default:
        return <Layers className="w-4 h-4" />;
    }
  };

  return (
    <section id="services" className="py-8 sm:py-10 bg-tech-grid border-b border-[#D5D9DE] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-6 sm:mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white rounded-md border border-[#D5D9DE] text-[#E71B26] text-xs font-dela uppercase tracking-wider mb-3">
              <span className="w-2 h-2 rounded-full bg-[#E71B26]" />
              <span>{t.services.eyebrow}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#2B3340] tracking-tight font-dela uppercase">
              {t.services.title}
            </h2>
          </div>
          <p className="text-sm sm:text-base text-[#444E60] font-medium max-w-md">
            {t.services.subtitle}
          </p>
        </div>

        {/* Tab Buttons Navigation */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-8 scrollbar-none">
          {tabs.map((tab) => {
            const isActive = tab.id === activeTabId;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTabId(tab.id)}
                className={`flex items-center gap-2.5 px-4 py-3 rounded-lg text-xs sm:text-sm font-bold uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap shadow-xs ${
                  isActive
                    ? 'bg-[#E71B26] text-white shadow-md'
                    : 'bg-white text-[#2B3340] hover:bg-[#ECEEF0] border border-[#D5D9DE]'
                }`}
              >
                <span>{getIcon(tab.id)}</span>
                <span>{tab.code}</span>
              </button>
            );
          })}
        </div>

        {/* Active Competency Detailed White Card */}
        <div className="rounded-2xl bg-white border border-[#D5D9DE] shadow-lg overflow-hidden">
          
          {/* Top Brand Stripe */}
          <div className="h-2 w-full bzal-ribbon-red-white" />

          <div className="p-6 sm:p-8 lg:p-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
              
              {/* Left Column: Descriptions and Features */}
              <div className="lg:col-span-7 flex flex-col">
                
                {/* Badge & Title */}
                <div className="flex items-center gap-3 mb-3">
                  <span className="px-2.5 py-1 rounded bg-[#ECEEF0] text-[#E71B26] text-xs font-dela uppercase tracking-wider border border-[#D5D9DE]">
                    {activeTab.badge}
                  </span>
                  <span className="text-xs font-bold text-[#647082] uppercase">
                    {t.services.unitCodeLabel} {activeTab.code}
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl lg:text-3xl font-black text-[#2B3340] mb-4 font-dela uppercase">
                  {activeTab.title}
                </h3>

                <p className="text-sm sm:text-base text-[#444E60] leading-relaxed mb-6 font-medium">
                  {activeTab.fullDesc}
                </p>

                {/* Features Checklist */}
                <div className="space-y-3 mb-8">
                  <h4 className="text-xs font-dela text-[#2B3340] uppercase tracking-wider">
                    {t.services.operationsTitle}
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {activeTab.features.map((feature, idx) => (
                      <div
                        key={idx}
                        className="p-3 rounded-lg bg-[#ECEEF0] border border-[#D5D9DE] flex items-start gap-2.5 text-xs text-[#2B3340] font-medium leading-relaxed"
                      >
                        <Check className="w-4 h-4 text-[#E71B26] shrink-0 mt-0.5 stroke-[2.5]" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Technical Specifications Grid */}
                <div className="p-4 rounded-xl bg-[#ECEEF0] border border-[#D5D9DE] mb-6">
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {activeTab.specs.map((spec, idx) => (
                      <div key={idx} className="flex flex-col">
                        <span className="text-[10px] font-bold text-[#647082] uppercase tracking-wider">
                          {spec.label}
                        </span>
                        <span className="text-xs sm:text-sm font-bold text-[#2B3340] mt-0.5">
                          {spec.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Quote & Action Button */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-[#E2E5E8]">
                  <div className="text-xs italic text-[#444E60] font-medium border-l-2 border-[#E71B26] pl-3">
                    {activeTab.accentQuote}
                  </div>

                  <button
                    onClick={() => onSelectService(activeTab.title)}
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-[#E71B26] hover:bg-[#C9141E] text-white font-bold text-xs uppercase tracking-wider shadow-sm hover:shadow-md transition-all cursor-pointer whitespace-nowrap"
                  >
                    <span>{t.services.auditCta}</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                </div>

              </div>

              {/* Right Column: Visual Photo from Brandbook */}
              <div className="lg:col-span-5 flex flex-col gap-4">
                <div className="rounded-xl overflow-hidden border border-[#D5D9DE] shadow-md relative group">
                  <div className="aspect-[4/3] relative overflow-hidden bg-[#2B3340]">
                    <img
                      src={activeTab.image}
                      alt={activeTab.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#2B3340]/80 via-transparent to-transparent" />
                    
                    <div className="absolute bottom-3 left-4 right-4 text-white">
                      <span className="text-[10px] font-dela uppercase tracking-wider bg-[#E71B26] px-2 py-0.5 rounded">
                        {t.brand.name} {t.brand.subname}
                      </span>
                      <p className="text-xs font-bold text-white mt-1">
                        {t.brand.slogan}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Direct Guarantee Banner */}
                <div className="p-4 rounded-xl bg-[#2B3340] text-white flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <ShieldCheck className="w-6 h-6 text-[#E71B26] shrink-0" />
                    <div>
                      <div className="text-xs font-bold uppercase tracking-wide">
                        {t.services.guaranteeTitle}
                      </div>
                      <div className="text-[11px] text-[#BAC5CF]">
                        {t.services.guaranteeDesc}
                      </div>
                    </div>
                  </div>
                  <span className="font-dela text-sm text-[#E71B26]">{t.services.otcBadge}</span>
                </div>

              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
