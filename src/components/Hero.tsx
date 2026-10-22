import React from 'react';
import { ArrowUpRight, CheckCircle2, ShieldCheck, Factory, Clock, ChevronDown, PhoneCall, Award } from 'lucide-react';
import { Language } from '../types';
import { content } from '../data/content';

interface HeroProps {
  currentLang: Language;
  onOpenRfq: () => void;
}

export const Hero: React.FC<HeroProps> = ({ currentLang, onOpenRfq }) => {
  const t = content[currentLang];

  return (
    <section className="relative pt-32 pb-16 lg:pt-40 lg:pb-24 overflow-hidden bg-tech-grid border-b border-[#D5D9DE]">
      {/* Decorative Watermark Number from Brandbook Heritage (1974) */}
      <div className="absolute right-6 top-24 text-[140px] sm:text-[220px] font-dela text-[#2B3340]/[0.03] select-none pointer-events-none leading-none z-0">
        1974
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column: Commercial Offer & High-Converting Industrial Copy */}
          <div className="lg:col-span-7 flex flex-col items-start">
            
            {/* Brand Eyebrow Badge strictly per Brandbook */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-md bg-white border border-[#D5D9DE] shadow-sm mb-5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#E71B26] animate-pulse" />
              <span className="text-[#E71B26] font-dela text-xs tracking-wider uppercase">
                {t.hero.badge}
              </span>
              <span className="text-[#647082] text-xs font-semibold pl-1 border-l border-[#D5D9DE]">
                {t.hero.sinceTag}
              </span>
            </div>

            {/* Main Headline in Brand Dela Gothic One & Montserrat */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[46px] font-black text-[#2B3340] leading-[1.12] tracking-tight mb-5">
              <span className="text-[#E71B26] font-dela block mb-1">
                {t.hero.titleHighlight}
              </span>
              <span className="text-[#2B3340] uppercase">
                {t.hero.titleRest}
              </span>
            </h1>

            {/* Official Slogan from Brandbook Poster / Catalog */}
            <div className="p-3.5 bg-white rounded-lg border-l-4 border-[#E71B26] shadow-sm mb-6 w-full max-w-2xl">
              <p className="font-dela text-[#E71B26] text-xs sm:text-sm tracking-wide uppercase">
                {t.hero.sloganTitle}
              </p>
              <p className="text-xs sm:text-sm text-[#444E60] font-medium mt-1 leading-relaxed">
                {t.hero.sloganDesc}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3.5 w-full sm:w-auto mb-8">
              <button
                onClick={onOpenRfq}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-lg bg-[#E71B26] hover:bg-[#C9141E] text-white font-extrabold text-sm uppercase tracking-wider shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all cursor-pointer active:translate-y-0"
              >
                <span>{t.hero.primaryCta}</span>
                <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
              </button>

              <a
                href="#equipment"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 rounded-lg bg-white hover:bg-[#ECEEF0] border border-[#D5D9DE] text-[#2B3340] font-bold text-sm tracking-wide transition-all shadow-sm hover:-translate-y-0.5"
              >
                <span>{t.hero.secondaryCta}</span>
                <ChevronDown className="w-4 h-4 text-[#647082]" />
              </a>
            </div>

            {/* Direct Line with Engineering Chief */}
            <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-[#444E60] mb-8 pb-6 border-b border-[#D5D9DE] w-full">
              <span className="flex items-center gap-1.5 text-[#2B3340] font-bold">
                <PhoneCall className="w-4 h-4 text-[#E71B26]" />
                <span>{t.hero.salesLeadLabel}</span>
              </span>
              <a href="tel:+375447514477" className="text-[#E71B26] font-extrabold hover:underline">
                +375 44 751 44 77
              </a>
              <span className="text-[#D5D9DE]">•</span>
              <a href="tel:+375163672048" className="text-[#2B3340] hover:text-[#E71B26]">
                +375 (163) 67-20-48
              </a>
            </div>

            {/* 4 Trust Guarantee Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full">
              {t.hero.trustBadges.map((badge, idx) => (
                <div key={idx} className="flex items-center gap-2 text-xs font-bold text-[#2B3340] bg-white p-2.5 rounded-md border border-[#E2E5E8] shadow-xs">
                  <CheckCircle2 className="w-4 h-4 text-[#E71B26] shrink-0" />
                  <span className="truncate">{badge}</span>
                </div>
              ))}
            </div>

          </div>

          {/* Right Column: Authentic Brandbook Billboard Presentation */}
          <div className="lg:col-span-5 relative">
            {/* The Signature Red-and-White Chevron Ribbon at 45 Degrees */}
            <div className="relative rounded-2xl overflow-hidden border-2 border-[#2B3340] bg-white shadow-xl">
              
              {/* Photo with Machining Sparks from Brandbook */}
              <div className="relative aspect-[4/3] sm:aspect-[16/11] overflow-hidden bg-[#1B222C]">
                <img
                  src="/images/bzal_wheel_sparks.jpg"
                  alt="Обработка колесных пар со снопом искр ОАО БЗАЛ"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1B222C]/90 via-transparent to-transparent" />

                {/* Corner Plant Stamp */}
                <div className="absolute top-4 left-4 bg-[#2B3340]/90 backdrop-blur-md px-3 py-1.5 rounded border border-white/20 text-white flex items-center gap-2">
                  <img src="/images/bzal_mark_pristine_red.png" alt="БЗАЛ" className="w-5 h-5 object-contain" />
                  <span className="font-dela text-[10px] tracking-wider uppercase text-white">{t.hero.billboardTag}</span>
                </div>

                {/* Precision Floating Badge */}
                <div className="absolute top-4 right-4 bg-[#E71B26] text-white px-3 py-1.5 rounded shadow-lg text-xs font-black tracking-wider uppercase flex items-center gap-1.5">
                  <Award className="w-3.5 h-3.5" />
                  <span>{t.hero.billboardPrecision}</span>
                </div>

                {/* Bottom Overlay Info on Photo */}
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <p className="text-xs uppercase font-extrabold tracking-widest text-[#E71B26]">
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
                      <div className={`font-dela text-xl sm:text-2xl leading-none mb-1 ${sIdx % 3 === 0 ? 'text-[#E71B26]' : 'text-[#2B3340]'}`}>
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
                  <span className="font-semibold text-[#E71B26]">{t.hero.certTag}</span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
