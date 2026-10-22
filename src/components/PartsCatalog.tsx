import React, { useState } from 'react';
import { ArrowUpRight, Download, Filter, CheckCircle2, Layers, Cpu, Award } from 'lucide-react';
import { Language, ManufacturedPart } from '../types';
import { extraContent, manufacturedPartsList } from '../data/extraContent';

interface PartsCatalogProps {
  currentLang: Language;
  onRequestQuoteForPart: (partTitle: string) => void;
  onOpenPassportModal: () => void;
}

export const PartsCatalog: React.FC<PartsCatalogProps> = ({
  currentLang,
  onRequestQuoteForPart,
  onOpenPassportModal
}) => {
  const t = extraContent[currentLang]?.partsCatalog || extraContent.ru.partsCatalog;
  const parts = manufacturedPartsList[currentLang] || manufacturedPartsList.ru;

  const [activeCategory, setActiveCategory] = useState<string>('all');

  const filteredParts = activeCategory === 'all'
    ? parts
    : parts.filter((p) => p.category === activeCategory);

  return (
    <section id="parts" className="py-20 sm:py-24 bg-[#ECEEF0] border-b border-[#D5D9DE] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 sm:mb-14">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white rounded-md border border-[#D5D9DE] text-[#E71B26] text-xs font-dela uppercase tracking-wider mb-3 shadow-xs">
              <span className="w-2 h-2 rounded-full bg-[#E71B26]" />
              <span>{t.eyebrow}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#2B3340] tracking-tight font-dela uppercase">
              {t.title}
            </h2>
            <p className="mt-3 text-sm sm:text-base text-[#444E60] font-medium leading-relaxed">
              {t.subtitle}
            </p>
          </div>

          {/* Quick PDF Catalog Download Button */}
          <button
            onClick={onOpenPassportModal}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-white hover:bg-[#2B3340] hover:text-white border border-[#D5D9DE] text-[#2B3340] font-bold text-xs uppercase tracking-wider transition-all shadow-sm hover:shadow-md cursor-pointer shrink-0 self-start md:self-end"
          >
            <Download className="w-4 h-4 text-[#E71B26]" />
            <span>{t.btnDownloadCatalog}</span>
          </button>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-thin">
          <button
            onClick={() => setActiveCategory('all')}
            className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer ${
              activeCategory === 'all'
                ? 'bg-[#2B3340] text-white shadow-sm'
                : 'bg-white text-[#647082] hover:text-[#2B3340] border border-[#D5D9DE]'
            }`}
          >
            {t.allFilter} ({parts.length})
          </button>

          {t.categories.map((cat) => {
            const count = parts.filter((p) => p.category === cat.id).length;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer ${
                  activeCategory === cat.id
                    ? 'bg-[#E71B26] text-white shadow-sm'
                    : 'bg-white text-[#647082] hover:text-[#2B3340] border border-[#D5D9DE]'
                }`}
              >
                {cat.label} {count > 0 && `(${count})`}
              </button>
            );
          })}
        </div>

        {/* Parts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredParts.map((part) => (
            <div
              key={part.id}
              className="bg-white rounded-xl border border-[#D5D9DE] overflow-hidden shadow-sm hover:shadow-xl hover:border-[#E71B26] transition-all flex flex-col group"
            >
              {/* Part Image with Tag */}
              <div className="relative aspect-[16/11] bg-[#1E2530] overflow-hidden">
                <img
                  src={part.image}
                  alt={part.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1E2530]/90 via-transparent to-transparent" />

                {/* Category Badge */}
                <div className="absolute top-3 left-3 bg-[#2B3340]/90 backdrop-blur-md px-2.5 py-1 rounded text-[10px] font-dela text-white uppercase tracking-wider">
                  {part.categoryKey}
                </div>

                {/* Tolerance Floating Tag */}
                <div className="absolute top-3 right-3 bg-[#E71B26] text-white px-2 py-0.5 rounded text-[10px] font-dela tracking-wider">
                  {part.tolerance.includes('IT') ? part.tolerance.split(',')[0] : '±0,005 мм'}
                </div>

                {/* Batch label on bottom image */}
                <div className="absolute bottom-2 left-3 right-3 text-white text-[11px] font-bold truncate">
                  {part.application}
                </div>
              </div>

              {/* 45-degree Ribbon Strip */}
              <div className="h-1.5 w-full bzal-ribbon-red-white" />

              {/* Card Body */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-dela text-sm sm:text-base font-bold text-[#2B3340] group-hover:text-[#E71B26] transition-colors leading-snug mb-3">
                    {part.title}
                  </h3>

                  {/* Technical Specifications Matrix */}
                  <div className="space-y-2 text-xs border-y border-[#ECEEF0] py-3 mb-4">
                    <div className="flex items-start justify-between gap-2">
                      <span className="text-[#647082] font-semibold">{t.specLabels.material}</span>
                      <span className="text-[#2B3340] font-bold text-right">{part.material}</span>
                    </div>

                    <div className="flex items-start justify-between gap-2">
                      <span className="text-[#647082] font-semibold">{t.specLabels.dimensions}</span>
                      <span className="text-[#2B3340] font-bold text-right">{part.dimensions}</span>
                    </div>

                    <div className="flex items-start justify-between gap-2">
                      <span className="text-[#647082] font-semibold">{t.specLabels.roughness}</span>
                      <span className="text-[#E71B26] font-bold text-right">{part.roughness}</span>
                    </div>

                    <div className="flex items-start justify-between gap-2">
                      <span className="text-[#647082] font-semibold">{t.specLabels.leadTime}</span>
                      <span className="text-[#2B3340] font-bold text-right">{part.leadTime}</span>
                    </div>
                  </div>

                  {/* Features / Advantages Badges */}
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {part.features.map((feat, fIdx) => (
                      <span
                        key={fIdx}
                        className="px-2 py-0.5 rounded bg-[#ECEEF0] text-[10px] font-bold text-[#444E60] border border-[#D5D9DE]"
                      >
                        {feat}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action Button */}
                <button
                  onClick={() => onRequestQuoteForPart(`${part.title} (${part.material})`)}
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-[#ECEEF0] hover:bg-[#E71B26] text-[#2B3340] hover:text-white font-bold text-xs uppercase tracking-wider transition-all cursor-pointer group/btn"
                >
                  <span>{t.btnRequestQuote}</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#E71B26] group-hover/btn:text-white transition-colors" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Banner with Catalog Assurance */}
        <div className="mt-12 p-5 sm:p-6 rounded-xl bg-white border border-[#D5D9DE] shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-xs sm:text-sm text-[#444E60] font-medium">
            <CheckCircle2 className="w-5 h-5 text-[#E71B26] shrink-0" />
            <span>{t.catalogDownloadNote}</span>
          </div>

          <button
            onClick={onOpenPassportModal}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#2B3340] hover:bg-[#1B222C] text-white font-bold text-xs uppercase tracking-wider transition-all shadow-sm cursor-pointer whitespace-nowrap"
          >
            <Download className="w-4 h-4 text-[#E71B26]" />
            <span>{t.btnDownloadCatalog}</span>
          </button>
        </div>

      </div>
    </section>
  );
};
