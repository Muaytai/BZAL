import React from 'react';
import { Check, X, ShieldAlert, Award, FileText } from 'lucide-react';
import { Language } from '../types';
import { content, comparisonData } from '../data/content';

interface ComparisonProps {
  currentLang: Language;
  onSelectService?: (serviceTitle: string) => void;
}

export const Comparison: React.FC<ComparisonProps> = ({ currentLang, onSelectService }) => {
  const t = content[currentLang];
  const rows = comparisonData[currentLang] || comparisonData.ru;

  return (
    <section className="py-8 sm:py-10 bg-tech-grid border-b border-[#D5D9DE] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mb-6 sm:mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white rounded-md border border-[#D5D9DE] text-[#E95A0C] text-xs font-dela uppercase tracking-wider mb-3">
            <span className="w-2 h-2 rounded-full bg-[#E95A0C]" />
            <span>{t.comparison.eyebrow}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#2B3340] tracking-tight font-dela uppercase">
            {t.comparison.title}
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#444E60] font-medium leading-relaxed">
            {t.comparison.subtitle}
          </p>
        </div>

        {/* Comparison Table / Cards */}
        <div className="rounded-2xl border border-[#D5D9DE] bg-white overflow-hidden shadow-lg">
          
          {/* Table Header Row */}
          <div className="grid grid-cols-1 md:grid-cols-12 bg-[#2B3340] text-white p-4 sm:p-5 text-xs font-dela uppercase tracking-wider hidden md:grid">
            <div className="md:col-span-4 text-[#BAC5CF]">
              {t.comparison.colCriterion}
            </div>
            <div className="md:col-span-4 text-white flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#E95A0C]" />
              <span className="text-[#E95A0C]">{t.comparison.colBzal}</span>
            </div>
            <div className="md:col-span-4 text-[#BAC5CF] flex items-center gap-1.5">
              <ShieldAlert className="w-4 h-4 text-amber-400" />
              <span>{t.comparison.colBrokers}</span>
            </div>
          </div>

          <div className="h-1 w-full bzal-ribbon-red-white hidden md:block" />

          {/* Rows */}
          <div className="divide-y divide-[#E2E5E8]">
            {rows.map((row, idx) => (
              <div
                key={idx}
                className="grid grid-cols-1 md:grid-cols-12 p-4 sm:p-5 gap-3 md:gap-4 items-center hover:bg-[#F7F8F9] transition-colors"
              >
                {/* Criterion */}
                <div className="md:col-span-4 text-xs sm:text-sm font-black text-[#2B3340] font-dela uppercase">
                  {row.criterion}
                </div>

                {/* BZAL Column */}
                <div className="md:col-span-4 p-3.5 rounded-xl bg-[#FFF2EB] border border-[#E95A0C]/30 flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#E95A0C] text-white flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                  <div className="text-xs sm:text-sm font-bold text-[#2B3340] leading-snug">
                    {row.bzalTechnopark}
                  </div>
                </div>

                {/* Brokers Column */}
                <div className="md:col-span-4 p-3.5 rounded-xl bg-[#ECEEF0] border border-[#D5D9DE] flex items-start gap-3 text-xs sm:text-sm text-[#647082] leading-snug font-medium">
                  <div className="w-5 h-5 rounded-full bg-[#BAC5CF] text-white flex items-center justify-center shrink-0 mt-0.5">
                    <X className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                  <div>
                    {row.typicalBrokers}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Summary Bar */}
          <div className="p-4 sm:p-5 bg-[#F7F8F9] border-t border-[#D5D9DE] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-semibold text-[#444E60]">
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-[#E95A0C]" />
              <span>{t.comparison.directContractNote}</span>
            </div>
            <button
              type="button"
              onClick={() => onSelectService?.(t.comparison.title)}
              className="text-[#E95A0C] font-bold hover:underline flex items-center gap-1 cursor-pointer"
            >
              <span>{t.comparison.ctaLink}</span>
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};
