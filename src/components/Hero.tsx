import React from 'react';
import { ArrowUpRight, CheckCircle2, ShieldCheck, Factory, Clock, ChevronDown, PhoneCall, Award, Scale, Search, ArrowRight } from 'lucide-react';
import { Language } from '../types';
import { content } from '../data/content';
import { SitePageId } from './Navbar';
import { GovLinksBanner } from './GovComplianceSection';
import { BrandLogo } from './BrandLogo';

interface HeroProps {
  currentLang: Language;
  onOpenRfq: () => void;
  onOpenEngineeringTool?: (tool: 'metal' | 'status') => void;
  onSelectPage?: (page: SitePageId) => void;
  onOpenGovSection?: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  currentLang,
  onOpenRfq,
  onOpenEngineeringTool,
  onSelectPage,
  onOpenGovSection,
}) => {
  const t = content[currentLang];

  return (
    <section className="relative py-4 sm:py-8 lg:py-12 overflow-hidden bg-tech-grid border-b border-[#D5D9DE]">
      {/* Decorative Watermark Number from Brandbook Heritage (1974) */}
      <div className="absolute right-6 top-12 text-[140px] sm:text-[220px] font-dela text-[#2B3340]/[0.03] select-none pointer-events-none leading-none z-0">
        1974
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center">
          
          {/* Left Column: Commercial Offer & High-Converting Industrial Copy */}
          <div className="lg:col-span-7 flex flex-col items-start">
            
            {/* Brand Eyebrow Badge strictly per Brandbook */}
            <div className="inline-flex flex-wrap items-center gap-2 px-3 py-1 rounded-md bg-white border border-[#D5D9DE] shadow-sm mb-3 sm:mb-4">
              <span className="w-2 h-2 rounded-full bg-[#E95A0C] animate-pulse shrink-0" />
              <span className="text-[#E95A0C] font-dela text-[10px] sm:text-xs tracking-wider uppercase">
                {t.hero.badge}
              </span>
              <span className="text-[#647082] text-[10px] sm:text-xs font-semibold pl-1.5 border-l border-[#D5D9DE]">
                {t.hero.sinceTag}
              </span>
            </div>

            {/* Main Headline in Brand Dela Gothic One & Montserrat (responsive for 320px-360px mobile screens) */}
            <h1 className="text-xl sm:text-3xl md:text-4xl lg:text-[42px] font-black text-[#2B3340] leading-[1.15] tracking-tight mb-4 break-words max-w-full">
              <span className="text-[#E95A0C] font-dela block mb-1">
                {t.hero.titleHighlight}
              </span>
              <span className="text-[#2B3340] uppercase">
                {t.hero.titleRest}
              </span>
            </h1>

            {/* Official Slogan from Brandbook Poster / Catalog */}
            <div className="p-3.5 bg-white rounded-lg border-l-4 border-[#E95A0C] shadow-sm mb-5 w-full max-w-2xl">
              <p className="font-dela text-[#E95A0C] text-xs sm:text-sm tracking-wide uppercase">
                {t.hero.sloganTitle}
              </p>
              <p className="text-xs sm:text-sm text-[#444E60] font-medium mt-1 leading-relaxed">
                {t.hero.sloganDesc}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-2.5 sm:gap-3 w-full sm:w-auto mb-3">
              <button
                type="button"
                onClick={onOpenRfq}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-3 sm:py-3.5 rounded-lg bg-[#E95A0C] hover:bg-[#CC4B06] text-white font-extrabold text-xs sm:text-sm uppercase tracking-wider shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all cursor-pointer active:translate-y-0"
              >
                <span>{t.hero.primaryCta.replace('↗', '').trim()}</span>
                <ArrowUpRight className="w-4 h-4 stroke-[2.5] shrink-0" />
              </button>

              <button
                type="button"
                onClick={() => onSelectPage?.('equipment')}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 sm:px-5 py-2.5 sm:py-3.5 rounded-lg bg-white hover:bg-[#ECEEF0] border border-[#D5D9DE] text-[#2B3340] font-bold text-xs sm:text-sm tracking-wide transition-all shadow-sm hover:-translate-y-0.5 cursor-pointer"
              >
                <span>{t.hero.secondaryCta.replace('↓', '').trim()}</span>
                <ArrowRight className="w-4 h-4 text-[#E95A0C] shrink-0" />
              </button>
            </div>

            {/* Quick Engineering Tools Bar (2-column compact grid on mobile so it never stacks into 4 tall rows) */}
            {onOpenEngineeringTool && (
              <div className="grid grid-cols-2 sm:flex sm:flex-wrap items-center gap-2 sm:gap-2.5 w-full mb-5">
                <button
                  type="button"
                  onClick={() => onOpenEngineeringTool('metal')}
                  className="inline-flex items-center justify-center gap-1.5 sm:gap-2 px-2.5 sm:px-4 py-2.5 rounded-lg bg-[#2B3340] hover:bg-[#1B222C] text-white text-[11px] sm:text-xs font-extrabold uppercase tracking-wider transition-all cursor-pointer shadow-xs text-center"
                >
                  <Scale className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#E95A0C] shrink-0" />
                  <span className="truncate">
                    {currentLang === 'ru'
                      ? 'Калькулятор ГОСТ'
                      : currentLang === 'en'
                        ? 'GOST Weight Calc'
                        : 'GOST毛坯计算'}
                  </span>
                </button>
                <button
                  type="button"
                  onClick={() => onOpenEngineeringTool('status')}
                  className="inline-flex items-center justify-center gap-1.5 sm:gap-2 px-2.5 sm:px-4 py-2.5 rounded-lg bg-white hover:bg-[#ECEEF0] border border-[#2B3340] text-[#2B3340] text-[11px] sm:text-xs font-extrabold uppercase tracking-wider transition-all cursor-pointer shadow-xs text-center"
                >
                  <Search className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#E95A0C] shrink-0" />
                  <span className="truncate">
                    {currentLang === 'ru'
                      ? 'Статус заявки №'
                      : currentLang === 'en'
                        ? 'Track Inquiry #'
                        : '查询询价状态'}
                  </span>
                </button>
              </div>
            )}

            {/* Direct Line with Marketing & Sales Department */}
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 text-xs font-semibold text-[#444E60] mb-6 pb-5 border-b border-[#D5D9DE] w-full">
              <span className="flex items-center gap-1.5 text-[#2B3340] font-bold">
                <PhoneCall className="w-4 h-4 text-[#E95A0C] shrink-0" />
                <span>{t.hero.salesLeadLabel}</span>
              </span>
              <a href={`tel:${t.brand.phoneRaw}`} className="text-[#E95A0C] font-extrabold hover:underline">
                {t.brand.phone}
              </a>
              <span className="text-[#D5D9DE]">•</span>
              <a href={`tel:${t.brand.phoneMarket.replace(/[^+\d]/g, '')}`} className="text-[#2B3340] hover:text-[#E95A0C]">
                {t.brand.phoneMarket}
              </a>
              <span className="text-[#D5D9DE]">•</span>
              <a href={`mailto:${t.brand.email}`} className="text-[#2B3340] font-bold hover:text-[#E95A0C] underline">
                {t.brand.email}
              </a>
            </div>

            {/* 4 Trust Guarantee Badges */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-2.5 w-full">
              {t.hero.trustBadges.map((badge, idx) => (
                <div key={idx} className="flex items-center gap-2 text-xs font-bold text-[#2B3340] bg-white p-2.5 rounded-md border border-[#E2E5E8] shadow-xs">
                  <CheckCircle2 className="w-4 h-4 text-[#E95A0C] shrink-0" />
                  <span className="leading-snug">{badge}</span>
                </div>
              ))}
            </div>

          </div>

          {/* Right Column: Authentic Brandbook Billboard Presentation */}
          <div className="lg:col-span-5 relative">
            {/* The Signature Red-and-White Chevron Ribbon at 45 Degrees */}
            <div className="relative rounded-2xl overflow-hidden border-2 border-[#2B3340] bg-white shadow-xl">
              
              {/* Clean Workshop Photo of Automatic Transfer Line */}
              <div className="relative aspect-[4/3] sm:aspect-[16/11] overflow-hidden bg-[#1B222C]">
                <img
                  src={((t.hero as Record<string, unknown>).heroImage as string) || '/images/landing_img_1.jpg'}
                  alt="Производственный комплекс и автоматические линии ОАО БЗАЛ"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1B222C]/90 via-transparent to-transparent" />

                {/* Corner Plant Stamp with Official Multilingual Logo */}
                <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-md px-2 py-1 rounded-lg border border-[#D5D9DE] shadow-md flex items-center">
                  <div className="w-[128px] h-[38px] overflow-hidden flex items-center justify-center">
                    <BrandLogo currentLang={currentLang} />
                  </div>
                </div>

                {/* Precision Floating Badge */}
                <div className="absolute top-4 right-4 bg-[#E95A0C] text-white px-3 py-1.5 rounded shadow-lg text-xs font-black tracking-wider uppercase flex items-center gap-1.5">
                  <Award className="w-3.5 h-3.5" />
                  <span>{t.hero.billboardPrecision}</span>
                </div>

                {/* Bottom Overlay Info on Photo */}
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <p className="text-xs uppercase font-extrabold tracking-widest text-[#E95A0C]">
                    {t.hero.billboardEyebrow}
                  </p>
                  <p className="text-sm font-bold text-white mt-0.5">
                    {t.hero.billboardTitle}
                  </p>
                </div>
              </div>

              {/* Signature Diagonal Chevron Ribbon Strip */}
              <div className="h-3 w-full bzal-ribbon-red-white" />

              {/* Plant Scale Metrics Card under image */}
              <div className="p-5 bg-white">
                <div className="grid grid-cols-2 gap-4">
                  {t.hero.stats.map((stat, sIdx) => (
                    <div key={sIdx} className="p-3 rounded-lg bg-[#ECEEF0] border border-[#D5D9DE]">
                      <div className={`font-dela text-xl sm:text-2xl leading-none mb-1 ${sIdx % 3 === 0 ? 'text-[#E95A0C]' : 'text-[#2B3340]'}`}>
                        {stat.value}
                      </div>
                      <div className="text-[11px] font-bold text-[#444E60] leading-tight">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-4 pt-3 border-t border-[#E2E5E8] flex items-center justify-between text-xs text-[#647082]">
                  <span className="font-bold text-[#2B3340]">{t.hero.plantLocationTag}</span>
                  <span className="font-semibold text-[#E95A0C]">{t.hero.certTag}</span>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* Mandatory State Portals & Electronic Appeals Banner on the Main Page */}
        <GovLinksBanner currentLang={currentLang} onOpenGovSection={onOpenGovSection} />
      </div>
    </section>
  );
};

