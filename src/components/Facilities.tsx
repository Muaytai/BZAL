import React, { useState } from 'react';
import { Settings, Cpu, Gauge, Maximize2, ShieldCheck, ArrowUpRight, Table, LayoutGrid, FileText, Download } from 'lucide-react';
import { Language } from '../types';
import { content, equipmentList } from '../data/content';
import { extraContent } from '../data/extraContent';

interface FacilitiesProps {
  currentLang: Language;
  onOpenPassportModal?: () => void;
  onSelectService?: (serviceTitle: string) => void;
}

export const Facilities: React.FC<FacilitiesProps> = ({
  currentLang,
  onOpenPassportModal,
  onSelectService
}) => {
  const t = content[currentLang];
  const specs = extraContent[currentLang]?.machinerySpecs || extraContent.ru.machinerySpecs;
  const list = equipmentList[currentLang] || equipmentList.ru;

  const [viewMode, setViewMode] = useState<'cards' | 'table'>('cards');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: currentLang === 'ru' ? 'Все станки' : currentLang === 'en' ? 'All Machines' : '全部机床' },
    { id: 'milling', label: currentLang === 'ru' ? 'Фрезерные ЧПУ' : currentLang === 'en' ? 'Milling CNC' : '数控铣削' },
    { id: 'turning', label: currentLang === 'ru' ? 'Токарные ЧПУ' : currentLang === 'en' ? 'Turning CNC' : '数控车削' },
    { id: 'boring', label: currentLang === 'ru' ? 'Расточные' : currentLang === 'en' ? 'Boring Mills' : '重型镗铣' },
    { id: 'grinding', label: currentLang === 'ru' ? 'Шлифовальные' : currentLang === 'en' ? 'Grinders' : '精密磨床' }
  ];

  const filteredList = selectedCategory === 'all'
    ? list
    : list.filter((item) => {
        const cat = item.category.toLowerCase();
        if (selectedCategory === 'milling') return cat.includes('фрезер') || cat.includes('mill') || cat.includes('铣');
        if (selectedCategory === 'turning') return cat.includes('токар') || cat.includes('turn') || cat.includes('车');
        if (selectedCategory === 'boring') return cat.includes('расточ') || cat.includes('boring') || cat.includes('镗');
        if (selectedCategory === 'grinding') return cat.includes('шлиф') || cat.includes('grind') || cat.includes('磨');
        return true;
      });

  return (
    <section id="equipment" className="py-8 sm:py-10 bg-white border-b border-[#D5D9DE] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header with Switcher */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6 sm:mb-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#ECEEF0] rounded-md border border-[#D5D9DE] text-[#E71B26] text-xs font-dela uppercase tracking-wider mb-2.5">
              <span className="w-2 h-2 rounded-full bg-[#E71B26]" />
              <span>{t.equipment.eyebrow}</span>
            </div>
            <h2 className="text-xl sm:text-3xl lg:text-4xl font-black text-[#2B3340] tracking-tight font-dela uppercase">
              {t.equipment.title}
            </h2>
            <p className="mt-2 text-xs sm:text-base text-[#444E60] font-medium leading-relaxed">
              {t.equipment.subtitle}
            </p>
          </div>

          {/* View Mode Toggle (Cards vs Technical Specs Table) */}
          <div className="flex items-center gap-1.5 bg-[#ECEEF0] p-1 rounded-xl border border-[#D5D9DE] self-start md:self-end shrink-0">
            <button
              onClick={() => setViewMode('cards')}
              className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold uppercase transition-all cursor-pointer ${
                viewMode === 'cards'
                  ? 'bg-white text-[#2B3340] shadow-sm'
                  : 'text-[#647082] hover:text-[#2B3340]'
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>{currentLang === 'ru' ? 'Карточки' : currentLang === 'en' ? 'Cards' : '卡片视图'}</span>
            </button>

            <button
              onClick={() => setViewMode('table')}
              className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold uppercase transition-all cursor-pointer ${
                viewMode === 'table'
                  ? 'bg-[#2B3340] text-white shadow-sm'
                  : 'text-[#647082] hover:text-[#2B3340]'
              }`}
            >
              <Table className="w-3.5 h-3.5" />
              <span>{currentLang === 'ru' ? 'Таблица паспортов' : currentLang === 'en' ? 'Specs Table' : '参数表格'}</span>
            </button>
          </div>
        </div>

        {/* Category Filters (when in cards view) */}
        {viewMode === 'cards' && (
          <div className="flex flex-wrap items-center gap-2 mb-6">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-[#2B3340] text-white shadow-sm'
                    : 'bg-[#ECEEF0] text-[#647082] hover:text-[#2B3340] border border-[#D5D9DE]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        )}

        {/* View Mode 1: Rich Cards Grid */}
        {viewMode === 'cards' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {filteredList.map((item) => (
              <div
                key={item.id}
                className="rounded-2xl bg-white border border-[#D5D9DE] overflow-hidden shadow-md hover:border-[#E71B26] transition-all flex flex-col group"
              >
                <div className="aspect-[16/9] relative overflow-hidden bg-[#2B3340]">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#2B3340]/90 via-transparent to-transparent" />
                  
                  {/* Category Pill */}
                  <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-3 py-1 rounded border border-[#D5D9DE] text-[10px] font-dela text-[#2B3340] uppercase tracking-wider shadow-xs">
                    {item.category}
                  </div>

                  {/* Precision Red Badge */}
                  <div className="absolute top-4 right-4 bg-[#E71B26] text-white text-xs font-dela px-3 py-1 rounded shadow-md">
                    {item.precision}
                  </div>

                  {/* Capacity Label */}
                  <div className="absolute bottom-3 left-4 right-4 text-white">
                    <div className="text-[11px] text-[#BAC5CF] font-bold uppercase tracking-wider">
                      {t.equipment.workZoneLabel}
                    </div>
                    <div className="text-xs sm:text-sm font-bold text-white">
                      {item.capacity}
                    </div>
                  </div>
                </div>

                {/* Diagonal Ribbon Accent */}
                <div className="h-1.5 w-full bzal-ribbon-red-white" />

                <div className="p-6 flex-1 flex flex-col justify-between bg-white">
                  <div>
                    <h3 className="text-base sm:text-lg font-black text-[#2B3340] mb-2 font-dela uppercase group-hover:text-[#E71B26] transition-colors">
                      {item.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#444E60] leading-relaxed mb-5 font-medium">
                      {item.description}
                    </p>
                  </div>

                  <div>
                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 pt-4 border-t border-[#ECEEF0]">
                      {item.tags.map((tag, idx) => (
                        <span
                          key={idx}
                          className="px-2.5 py-1 rounded bg-[#ECEEF0] text-[11px] font-bold text-[#2B3340] border border-[#D5D9DE]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* View Mode 2: Detailed Technical Specifications Table */}
        {viewMode === 'table' && (
          <div className="mb-12 rounded-2xl border border-[#D5D9DE] overflow-hidden shadow-sm bg-white">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-[#2B3340] text-white font-dela uppercase tracking-wider text-[11px]">
                    <th className="py-3.5 px-4">{specs.colModel}</th>
                    <th className="py-3.5 px-4">{specs.colCategory}</th>
                    <th className="py-3.5 px-4">{specs.colCnc}</th>
                    <th className="py-3.5 px-4">{specs.colTravels}</th>
                    <th className="py-3.5 px-4">{specs.colTable}</th>
                    <th className="py-3.5 px-4">{specs.colSpindle}</th>
                    <th className="py-3.5 px-4">{specs.colWeight}</th>
                    <th className="py-3.5 px-4 text-[#E71B26]">{specs.colAccuracy}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#ECEEF0]">
                  {specs.items.map((row, rIdx) => (
                    <tr key={rIdx} className="hover:bg-[#F8F9FA] transition-colors">
                      <td className="py-3 px-4 font-dela font-bold text-[#2B3340] whitespace-nowrap">
                        {row.model}
                      </td>
                      <td className="py-3 px-4 text-[#647082] font-semibold whitespace-nowrap">
                        {row.category}
                      </td>
                      <td className="py-3 px-4 font-mono font-bold text-[#2B3340] whitespace-nowrap">
                        {row.cncSystem}
                      </td>
                      <td className="py-3 px-4 font-mono text-[#444E60] whitespace-nowrap">
                        {row.travels}
                      </td>
                      <td className="py-3 px-4 font-mono text-[#444E60] whitespace-nowrap">
                        {row.tableSize}
                      </td>
                      <td className="py-3 px-4 text-[#444E60] whitespace-nowrap">
                        {row.spindleRpm}
                      </td>
                      <td className="py-3 px-4 font-bold text-[#2B3340] whitespace-nowrap">
                        {row.maxWeight}
                      </td>
                      <td className="py-3 px-4 font-dela font-bold text-[#E71B26] whitespace-nowrap">
                        {row.accuracy}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Bottom Capabilities Banner in Dark Graphite (#2B3340) from Brandbook */}
        <div className="p-6 sm:p-8 rounded-2xl bg-[#2B3340] text-white shadow-xl relative overflow-hidden">
          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="max-w-2xl">
              <span className="text-[11px] font-dela uppercase tracking-wider text-[#E71B26]">
                {t.equipment.bannerEyebrow}
              </span>
              <h3 className="text-lg sm:text-xl font-black text-white font-dela uppercase mt-1">
                {t.equipment.bannerTitle}
              </h3>
              <p className="text-xs sm:text-sm text-[#BAC5CF] mt-2 font-medium leading-relaxed">
                {t.equipment.bannerDesc}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 shrink-0">
              {onOpenPassportModal && (
                <button
                  onClick={onOpenPassportModal}
                  className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-lg bg-white/10 hover:bg-white/20 text-white font-bold text-xs uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap"
                >
                  <Download className="w-4 h-4 text-[#E71B26]" />
                  <span>{specs.title.length > 25 ? (currentLang === 'ru' ? 'Скачать паспорта' : currentLang === 'en' ? 'Download Dossier' : '下载参数手册') : specs.title}</span>
                </button>
              )}

              <a
                href="#calculator"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-[#E71B26] hover:bg-[#C9141E] text-white font-bold text-xs uppercase tracking-wider shadow-sm hover:shadow-md transition-all cursor-pointer whitespace-nowrap self-start lg:self-center"
              >
                <span>{t.equipment.bannerCta}</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Chevron Accent Strip */}
          <div className="absolute bottom-0 left-0 right-0 h-1.5 bzal-ribbon-red-white" />
        </div>

      </div>
    </section>
  );
};
