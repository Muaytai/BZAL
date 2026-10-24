import React from 'react';
import { Award, Building2, Cpu, Wrench, Shield, CheckCircle, Factory, Train, Truck, ChevronRight } from 'lucide-react';
import { Language } from '../types';
import { content } from '../data/content';

interface AboutSectionProps {
  currentLang: Language;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ currentLang }) => {
  const t = content[currentLang];

  return (
    <section id="about" className="py-8 sm:py-10 bg-white border-b border-[#D5D9DE] relative overflow-hidden">
      
      {/* Background Watermark from Brandbook */}
      <div className="absolute left-8 bottom-0 text-[160px] sm:text-[240px] font-dela text-[#2B3340]/[0.02] select-none pointer-events-none leading-none z-0">
        БЗАЛ
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-6 sm:mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#ECEEF0] rounded-md border border-[#D5D9DE] text-[#E71B26] text-xs font-dela uppercase tracking-wider mb-3">
            <span className="w-2 h-2 rounded-full bg-[#E71B26]" />
            <span>{t.about.eyebrow}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#2B3340] tracking-tight leading-tight uppercase font-dela">
            {t.about.title}
          </h2>
          <p className="mt-3 text-base sm:text-lg text-[#444E60] font-medium leading-relaxed">
            {t.about.lead}
          </p>
        </div>

        {/* 2-Column Story & Strategic Advantages */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-12 items-start mb-16">
          
          {/* Text Content */}
          <div className="lg:col-span-7 space-y-6 text-sm sm:text-base text-[#444E60] leading-relaxed">
            <div className="p-6 rounded-xl bg-[#ECEEF0] border-l-4 border-[#E71B26] border-y border-r border-[#D5D9DE]">
              <p className="text-base sm:text-lg font-bold text-[#2B3340] leading-snug">
                {t.about.quote}
              </p>
              <div className="mt-3 flex items-center justify-between text-xs font-semibold text-[#647082]">
                <span>{t.about.quoteAuthor}</span>
                <span className="text-[#E71B26] font-bold">{t.about.quoteBadge}</span>
              </div>
            </div>

            <p>
              {t.about.desc2}
            </p>

            {/* Core Infrastructure Strengths */}
            <div className="pt-2">
              <h3 className="text-base font-dela text-[#2B3340] uppercase tracking-wide mb-4 flex items-center gap-2">
                <Building2 className="w-5 h-5 text-[#E71B26]" />
                <span>{t.about.bulletTitle}</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {t.about.bullets.map((bullet, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-lg bg-white border border-[#D5D9DE] shadow-xs flex items-start gap-3 text-xs sm:text-sm text-[#2B3340] font-medium leading-relaxed"
                  >
                    <CheckCircle className="w-4 h-4 text-[#E71B26] shrink-0 mt-0.5" />
                    <span>{bullet}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column: Plant Photo and Real Projects Catalog */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            
            {/* Visual Photo Card with Diagonal Chevron Accent */}
            <div className="rounded-xl overflow-hidden border border-[#D5D9DE] bg-white shadow-md">
              <div className="relative aspect-[16/10] overflow-hidden">
                <img
                  src={((t.about as Record<string, unknown>).photoImage as string) || '/images/bzal_lines.jpg'}
                  alt="Автоматические линии ОАО БЗАЛ"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#2B3340]/90 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-4 right-4 text-white">
                  <span className="text-[10px] font-dela uppercase tracking-wider text-[#E71B26] bg-[#2B3340] px-2 py-0.5 rounded">
                    {t.about.photoTag}
                  </span>
                  <p className="text-sm font-bold mt-1 text-white">
                    {t.about.photoTitle}
                  </p>
                </div>
              </div>
              <div className="h-2 w-full bzal-ribbon-red-white" />
            </div>

            {/* Real Projects Showcase from Catalog */}
            <div className="p-5 rounded-xl bg-[#ECEEF0] border border-[#D5D9DE]">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-dela uppercase tracking-wider text-[#2B3340]">
                  {t.about.projectsEyebrow}
                </span>
                <span className="text-[11px] font-bold text-[#E71B26]">{t.about.projectsSub}</span>
              </div>

              <div className="space-y-2.5">
                {t.about.projects.map((p, idx) => (
                  <div key={idx} className="p-3 bg-white rounded-lg border border-[#D5D9DE] shadow-xs">
                    <div className="flex items-center justify-between">
                      <span className="font-dela text-xs text-[#E71B26]">{p.code}</span>
                      <span className="text-[11px] font-semibold text-[#647082]">{p.location}</span>
                    </div>
                    <div className="text-xs font-bold text-[#2B3340] mt-0.5">{p.title}</div>
                    <div className="text-[11px] text-[#647082] mt-0.5">{p.scope}</div>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

        {/* Corporate Trust Strip: Major Industrial Customers */}
        <div className="pt-10 border-t border-[#D5D9DE]">
          <div className="text-center mb-6">
            <span className="text-xs font-dela text-[#647082] uppercase tracking-widest">
              {t.about.clientsTitle}
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
            {t.about.clients.map((client, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-lg bg-[#ECEEF0] border border-[#D5D9DE] hover:border-[#E71B26] transition-colors flex flex-col items-center justify-center text-center group"
              >
                <span className="font-dela text-base sm:text-lg text-[#2B3340] group-hover:text-[#E71B26] transition-colors">
                  {client.name}
                </span>
                <span className="text-[9px] font-semibold text-[#647082] mt-0.5 truncate w-full">
                  {client.desc}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
