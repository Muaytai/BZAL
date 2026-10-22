import React from 'react';
import { ShieldCheck, Award, FileText, CheckCircle2, Microscope, Scale, Gauge, Activity, Cpu } from 'lucide-react';
import { Language } from '../types';
import { extraContent } from '../data/extraContent';

interface QualityMetrologyProps {
  currentLang: Language;
  onOpenRfq: () => void;
}

export const QualityMetrology: React.FC<QualityMetrologyProps> = ({ currentLang, onOpenRfq }) => {
  const t = extraContent[currentLang]?.qualityMetrology || extraContent.ru.qualityMetrology;

  const deviceIcons = [
    <Cpu className="w-5 h-5 text-[#E71B26]" key="cmm" />,
    <Microscope className="w-5 h-5 text-[#E71B26]" key="spectro" />,
    <Activity className="w-5 h-5 text-[#E71B26]" key="ut" />,
    <Gauge className="w-5 h-5 text-[#E71B26]" key="hard" />,
    <Scale className="w-5 h-5 text-[#E71B26]" key="prof" />,
    <Award className="w-5 h-5 text-[#E71B26]" key="bal" />
  ];

  return (
    <section id="quality" className="py-20 sm:py-24 bg-white border-b border-[#D5D9DE] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#ECEEF0] rounded-md border border-[#D5D9DE] text-[#E71B26] text-xs font-dela uppercase tracking-wider mb-3">
            <ShieldCheck className="w-4 h-4 text-[#E71B26]" />
            <span>{t.eyebrow}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#2B3340] tracking-tight font-dela uppercase">
            {t.title}
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#444E60] font-medium leading-relaxed">
            {t.subtitle}
          </p>
        </div>

        {/* ISO 9001 & Official Certification Authority Banner */}
        <div className="mb-14 rounded-2xl bg-[#2B3340] text-white p-6 sm:p-8 relative overflow-hidden shadow-xl border-2 border-[#1B222C]">
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#E71B26] text-white text-[11px] font-dela uppercase tracking-wider mb-3">
                <Award className="w-3.5 h-3.5" />
                <span>{t.certBadge}</span>
              </div>
              <h3 className="font-dela text-lg sm:text-2xl text-white uppercase tracking-tight">
                {t.certTitle}
              </h3>
              <p className="text-xs sm:text-sm text-[#BAC5CF] mt-2 font-medium leading-relaxed max-w-2xl">
                {t.certDesc}
              </p>

              {/* Official Stamp Box */}
              <div className="mt-5 p-3.5 rounded-lg bg-white/10 backdrop-blur-md border border-white/20 inline-flex items-center gap-3">
                <div className="w-10 h-10 rounded-full border-2 border-[#E71B26] flex items-center justify-center shrink-0 bg-[#E71B26]/20">
                  <span className="font-dela text-[10px] text-white">ОТК</span>
                </div>
                <div>
                  <div className="text-[11px] font-dela uppercase text-[#E71B26] tracking-wider">
                    {t.stampLabel}
                  </div>
                  <div className="text-xs text-[#BAC5CF] font-medium">
                    {t.stampText}
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Key Deliverable Document Badges */}
            <div className="lg:col-span-4 bg-white/5 backdrop-blur-md rounded-xl p-5 border border-white/10">
              <h4 className="text-xs font-dela text-white uppercase tracking-wider mb-3 flex items-center gap-2">
                <FileText className="w-4 h-4 text-[#E71B26]" />
                <span>{t.docsTitle}</span>
              </h4>
              <ul className="space-y-2 text-[11px] sm:text-xs text-[#BAC5CF]">
                {t.docsList.map((doc, dIdx) => (
                  <li key={dIdx} className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#E71B26] shrink-0 mt-0.5" />
                    <span>{doc}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>

          {/* Decorative Chevron Ribbon Strip */}
          <div className="absolute bottom-0 left-0 right-0 h-1.5 bzal-ribbon-red-white" />
        </div>

        {/* Metrology Laboratory Equipment Grid */}
        <div>
          <div className="flex items-center gap-3 mb-8">
            <div className="h-5 w-1 bg-[#E71B26] rounded-full" />
            <h3 className="text-base sm:text-xl font-bold font-dela text-[#2B3340] uppercase">
              {t.labTitle}
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {t.devices.map((dev, idx) => (
              <div
                key={dev.id}
                className="bg-[#ECEEF0] rounded-xl p-6 border border-[#D5D9DE] hover:border-[#E71B26] hover:bg-white hover:shadow-lg transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="p-2.5 rounded-lg bg-white border border-[#D5D9DE] group-hover:border-[#E71B26] transition-colors">
                      {deviceIcons[idx % deviceIcons.length]}
                    </div>
                    <span className="px-2.5 py-1 rounded bg-[#E71B26] text-white text-[11px] font-dela tracking-wider">
                      {dev.precision}
                    </span>
                  </div>

                  <h4 className="font-dela text-sm sm:text-base font-bold text-[#2B3340] group-hover:text-[#E71B26] transition-colors mb-1.5">
                    {dev.title}
                  </h4>

                  <div className="text-xs font-bold text-[#647082] uppercase mb-3">
                    {dev.model}
                  </div>

                  <p className="text-xs text-[#444E60] font-medium leading-relaxed mb-4">
                    {dev.purpose}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#D5D9DE] text-[11px] space-y-1">
                  <div className="text-[#2B3340] font-semibold">
                    <span className="text-[#647082]">Параметры: </span>
                    {dev.scope}
                  </div>
                  <div className="text-[#647082]">
                    <span>Стандарты: </span>
                    <span className="font-bold text-[#2B3340]">{dev.standard}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
