import React from 'react';
import { ArrowRight, Clock, CheckCircle2, FileCheck, Layers, Cog, ShieldCheck } from 'lucide-react';
import { Language } from '../types';
import { content, processSteps } from '../data/content';

interface ProcessPipelineProps {
  currentLang: Language;
}

export const ProcessPipeline: React.FC<ProcessPipelineProps> = ({ currentLang }) => {
  const t = content[currentLang];
  const steps = processSteps[currentLang] || processSteps.ru;

  const getStepIcon = (idx: number) => {
    switch (idx) {
      case 0:
        return <FileCheck className="w-5 h-5 text-[#E71B26]" />;
      case 1:
        return <Layers className="w-5 h-5 text-[#E71B26]" />;
      case 2:
        return <Cog className="w-5 h-5 text-[#E71B26]" />;
      case 3:
        return <ShieldCheck className="w-5 h-5 text-[#E71B26]" />;
      default:
        return <FileCheck className="w-5 h-5 text-[#E71B26]" />;
    }
  };

  return (
    <section id="process" className="py-20 sm:py-24 bg-white border-b border-[#D5D9DE] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#ECEEF0] rounded-md border border-[#D5D9DE] text-[#E71B26] text-xs font-dela uppercase tracking-wider mb-3">
            <span className="w-2 h-2 rounded-full bg-[#E71B26]" />
            <span>{t.process.eyebrow}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#2B3340] tracking-tight font-dela uppercase">
            {t.process.title}
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#444E60] font-medium leading-relaxed">
            {t.process.subtitle}
          </p>
        </div>

        {/* 4 Steps Horizontal / Grid Pipeline */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((item, idx) => (
            <div
              key={idx}
              className="rounded-xl bg-[#F7F8F9] border border-[#D5D9DE] hover:border-[#E71B26] transition-all p-6 flex flex-col justify-between shadow-xs hover:shadow-md relative group"
            >
              {/* Step Number in Dela Gothic One */}
              <div className="flex items-center justify-between mb-4">
                <span className="font-dela text-3xl sm:text-4xl text-[#E71B26] group-hover:scale-110 transition-transform">
                  {item.step}
                </span>
                <div className="w-10 h-10 rounded-lg bg-white border border-[#D5D9DE] flex items-center justify-center shadow-xs">
                  {getStepIcon(idx)}
                </div>
              </div>

              <div>
                <h3 className="text-base font-black text-[#2B3340] mb-1 font-dela uppercase">
                  {item.title}
                </h3>
                <div className="text-xs font-bold text-[#E71B26] mb-3">
                  {item.subtitle}
                </div>
                <p className="text-xs text-[#444E60] leading-relaxed mb-6 font-medium">
                  {item.desc}
                </p>
              </div>

              {/* Department & Deliverables */}
              <div className="pt-4 border-t border-[#D5D9DE] space-y-3">
                <div className="flex items-center justify-between text-[11px] font-semibold text-[#647082]">
                  <span>{t.process.durationLabel}</span>
                  <span className="font-bold text-[#2B3340] flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-[#E71B26]" />
                    <span>{item.duration}</span>
                  </span>
                </div>

                <div className="space-y-1">
                  <div className="text-[10px] font-bold text-[#647082] uppercase tracking-wider">
                    {t.process.resultLabel}
                  </div>
                  {item.deliverables.map((deliv, dIdx) => (
                    <div key={dIdx} className="flex items-center gap-1.5 text-[11px] font-bold text-[#2B3340]">
                      <CheckCircle2 className="w-3 h-3 text-[#E71B26] shrink-0" />
                      <span className="truncate">{deliv}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
