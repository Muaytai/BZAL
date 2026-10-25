import React from 'react';
import { Train, Truck, ArrowUpRight, ShieldCheck, DollarSign, Clock, MapPin, CheckCircle2 } from 'lucide-react';
import { Language } from '../types';
import { extraContent } from '../data/extraContent';

interface EaeuLogisticsProps {
  currentLang: Language;
  onOpenRfq: (serviceNote?: string) => void;
}

export const EaeuLogistics: React.FC<EaeuLogisticsProps> = ({ currentLang, onOpenRfq }) => {
  const t = extraContent[currentLang]?.eaeuTrade || extraContent.ru.eaeuTrade;

  return (
    <section id="eaeu" className="py-8 sm:py-10 bg-[#ECEEF0] border-b border-[#D5D9DE] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="max-w-3xl mb-6 sm:mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white rounded-md border border-[#D5D9DE] text-[#E95A0C] text-xs font-dela uppercase tracking-wider mb-3 shadow-xs">
            <span className="w-2 h-2 rounded-full bg-[#E95A0C]" />
            <span>{t.eyebrow}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#2B3340] tracking-tight font-dela uppercase">
            {t.title}
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#444E60] font-medium leading-relaxed">
            {t.subtitle}
          </p>
        </div>

        {/* 4 Commercial Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {t.advantages.map((adv) => (
            <div
              key={adv.id}
              className="bg-white rounded-xl p-6 border border-[#D5D9DE] shadow-sm hover:border-[#E95A0C] hover:shadow-lg transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className="px-2.5 py-1 rounded bg-[#ECEEF0] text-[10px] font-dela text-[#2B3340] uppercase tracking-wider border border-[#D5D9DE]">
                    {adv.badge}
                  </span>
                  <span className="font-dela text-xl text-[#E95A0C]">
                    {adv.stat}
                  </span>
                </div>

                <h3 className="font-dela text-sm sm:text-base text-[#2B3340] group-hover:text-[#E95A0C] transition-colors mb-2">
                  {adv.title}
                </h3>

                <p className="text-xs text-[#444E60] font-medium leading-relaxed mb-4">
                  {adv.desc}
                </p>
              </div>

              <div className="pt-3 border-t border-[#ECEEF0] text-[11px] font-bold text-[#647082] uppercase">
                {adv.statLabel}
              </div>
            </div>
          ))}
        </div>

        {/* Dual Infrastructure Showcase: Factory Railway Spur & M1 Transit Corridor */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
          
          {/* Railway Spur Feature Card */}
          <div className="lg:col-span-6 bg-white rounded-2xl border-2 border-[#2B3340] p-6 sm:p-8 shadow-md flex flex-col justify-between relative overflow-hidden">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 rounded-lg bg-[#2B3340] text-white">
                  <Train className="w-6 h-6 text-[#E95A0C]" />
                </div>
                <div>
                  <span className="text-[10px] font-dela uppercase text-[#E95A0C] tracking-wider block">
                    {t.railwayBadge}
                  </span>
                  <h3 className="text-base sm:text-lg font-black font-dela text-[#2B3340] uppercase">
                    {t.railwayTitle}
                  </h3>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-[#444E60] font-medium leading-relaxed mb-6">
                {t.railwayDesc}
              </p>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-lg bg-[#ECEEF0] border border-[#D5D9DE]">
                  <span className="text-[#647082] block text-[11px] font-semibold">
                    {currentLang === 'ru'
                      ? 'Грузоподъемность:'
                      : currentLang === 'en'
                        ? 'Payload capacity:'
                        : '车皮载重：'}
                  </span>
                  <span className="font-dela text-[#2B3340] text-sm sm:text-base">
                    {currentLang === 'ru'
                      ? 'До 60 тонн / вагон'
                      : currentLang === 'en'
                        ? 'Up to 60 tons / car'
                        : '最高 60 吨 / 车皮'}
                  </span>
                </div>
                <div className="p-3 rounded-lg bg-[#ECEEF0] border border-[#D5D9DE]">
                  <span className="text-[#647082] block text-[11px] font-semibold">
                    {currentLang === 'ru'
                      ? 'Ширина колеи:'
                      : currentLang === 'en'
                        ? 'Track gauge:'
                        : '铁路轨距：'}
                  </span>
                  <span className="font-dela text-[#2B3340] text-sm sm:text-base">
                    {currentLang === 'ru'
                      ? '1520 мм (СНГ / РЖД)'
                      : currentLang === 'en'
                        ? '1520 mm (CIS / EAEU)'
                        : '1520 毫米 (独联体标准)'}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-[#ECEEF0] flex items-center gap-2 text-xs text-[#2B3340] font-bold">
              <CheckCircle2 className="w-4 h-4 text-[#E95A0C] shrink-0" />
              <span>
                {currentLang === 'ru'
                  ? 'Прямой маневровый локомотив со станции Барановичи-Центральные'
                  : currentLang === 'en'
                    ? 'Direct shunting locomotive access from Baranovichi-Centralnaya rail hub'
                    : '巴拉诺维奇中央铁路枢纽调车机车直通车间'}
              </span>
            </div>
          </div>

          {/* Highway & Transit Times Card */}
          <div className="lg:col-span-6 bg-white rounded-2xl border border-[#D5D9DE] p-6 sm:p-8 shadow-md flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 rounded-lg bg-[#E95A0C] text-white">
                  <Truck className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[10px] font-dela uppercase text-[#647082] tracking-wider block">
                    {currentLang === 'ru'
                      ? 'ТРАССА М1 (E30)'
                      : currentLang === 'en'
                        ? 'M1 (E30) EXPRESSWAY'
                        : 'M1 (E30) 国际高速走廊'}
                  </span>
                  <h3 className="text-base sm:text-lg font-black font-dela text-[#2B3340] uppercase">
                    {t.highwayTitle}
                  </h3>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-[#444E60] font-medium leading-relaxed mb-5">
                {t.highwayDesc}
              </p>

              {/* Transit Times Table */}
              <div className="space-y-2">
                <div className="text-xs font-dela text-[#2B3340] uppercase mb-2">
                  {t.logisticsRoutesTitle}
                </div>
                <div className="divide-y divide-[#ECEEF0] border border-[#ECEEF0] rounded-lg overflow-hidden text-xs">
                  {t.routes.slice(0, 4).map((route, rIdx) => (
                    <div key={rIdx} className="p-2.5 flex items-center justify-between hover:bg-[#F8F9FA] transition-colors">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-3.5 h-3.5 text-[#E95A0C]" />
                        <span className="font-bold text-[#2B3340]">{route.city}</span>
                        <span className="text-[10px] text-[#647082] hidden sm:inline">({route.distance})</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded bg-[#ECEEF0] font-dela text-[11px] text-[#E95A0C]">
                          {route.time}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-4 text-[11px] text-[#647082] font-semibold">
              {currentLang === 'ru'
                ? '* Доставка автотранспортом осуществляется «до ворот цеха» с предоставлением транспортных накладных CMR.'
                : currentLang === 'en'
                  ? '* Door-to-door road freight delivery with full CMR international waybill documentation.'
                  : '* 提供门到门公路货运及完整国际公路运单 (CMR) 文件。'}
            </div>
          </div>

        </div>

        {/* CTA Banner */}
        <div className="rounded-xl bg-[#2B3340] text-white p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-lg border border-[#1B222C]">
          <div className="max-w-2xl text-center md:text-left">
            <h3 className="font-dela text-base sm:text-xl text-white uppercase">
              {t.ctaTitle}
            </h3>
            <p className="text-xs sm:text-sm text-[#BAC5CF] mt-1.5 font-medium">
              {t.ctaDesc}
            </p>
          </div>

          <button
            onClick={() => onOpenRfq('Поставка в РФ/ЕАЭС: расчет логистики и цены в RUB')}
            className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-lg bg-[#E95A0C] hover:bg-[#CC4B06] text-white font-extrabold text-xs uppercase tracking-wider shadow-md hover:shadow-lg transition-all cursor-pointer whitespace-nowrap active:translate-y-0"
          >
            <span>{t.ctaBtn}</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
};
