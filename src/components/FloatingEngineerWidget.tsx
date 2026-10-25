import React, { useState, useEffect } from 'react';
import { Phone, Mail, FileText, ArrowUp, MessageSquare, Clock, X } from 'lucide-react';
import { Language } from '../types';
import { extraContent } from '../data/extraContent';

interface FloatingEngineerWidgetProps {
  currentLang: Language;
  onOpenRfq: () => void;
  onOpenPassport: () => void;
}

export const FloatingEngineerWidget: React.FC<FloatingEngineerWidgetProps> = ({
  currentLang,
  onOpenRfq,
  onOpenPassport
}) => {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const t = extraContent[currentLang]?.engineerWidget || extraContent.ru.engineerWidget;

  useEffect(() => {
    const checkScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', checkScroll);
    return () => window.removeEventListener('scroll', checkScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="fixed bottom-4 right-3 sm:bottom-5 sm:right-5 z-40 flex flex-col items-end gap-2 select-none">
      
      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white hover:bg-[#2B3340] text-[#2B3340] hover:text-white border border-[#D5D9DE] shadow-md flex items-center justify-center transition-all cursor-pointer hover:-translate-y-0.5 active:translate-y-0"
          aria-label={t.backToTop}
          title={t.backToTop}
        >
          <ArrowUp className="w-4 h-4" />
        </button>
      )}

      {/* Expanded Quick Options Menu */}
      {isExpanded && (
        <div className="bg-white rounded-2xl shadow-2xl border-2 border-[#2B3340] p-4 w-[calc(100vw-24px)] max-w-80 mb-1 animate-in fade-in slide-in-from-bottom-5 duration-200">
          <div className="flex items-start justify-between pb-3 border-b border-[#ECEEF0] mb-3">
            <div className="flex items-start gap-2">
              <Clock className="w-4 h-4 text-[#E95A0C] shrink-0 mt-0.5" />
              <div>
                <div className="font-dela text-[10px] text-[#2B3340] uppercase">
                  {t.dutyEngineer}
                </div>
                <div className="text-[10px] text-[#647082] font-semibold mt-0.5">
                  {t.dutyStatus}
                </div>
              </div>
            </div>

            <button
              onClick={() => setIsExpanded(false)}
              className="p-1 rounded-md text-[#647082] hover:text-[#2B3340] hover:bg-[#ECEEF0] cursor-pointer"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <p className="text-[11px] text-[#444E60] leading-snug mb-3 bg-[#ECEEF0] p-2.5 rounded-lg border border-[#D5D9DE] font-medium">
            {currentLang === 'ru'
              ? 'Отдел маркетинга и продаж принимает заявку, передаёт в ОГК, ОГТ и другие службы завода, после чего сообщает ответ по телефону или в ответ на заявку.'
              : currentLang === 'en'
              ? 'Marketing receives your request, forwards it to OGK/OGT & plant services, and replies by phone or email.'
              : '市场部统一接收申请，转交工程师及各部门评估后，通过电话或回复申请反馈。'}
          </p>

          <div className="space-y-2">
            {/* Quick Application / RFQ */}
            <button
              onClick={() => {
                setIsExpanded(false);
                onOpenRfq();
              }}
              className="w-full p-2.5 rounded-lg bg-[#E95A0C] hover:bg-[#CC4B06] text-white flex items-center gap-2.5 text-xs font-bold transition-colors cursor-pointer text-left"
            >
              <MessageSquare className="w-4 h-4 shrink-0" />
              <span>{t.sendBrief}</span>
            </button>

            {/* Direct Telephone Call to Marketing */}
            <a
              href="tel:+375447514477"
              className="w-full p-2.5 rounded-lg bg-[#ECEEF0] hover:bg-[#D5D9DE] text-[#2B3340] flex items-center gap-2.5 text-xs font-bold transition-colors text-left"
            >
              <Phone className="w-4 h-4 text-[#E95A0C] shrink-0" />
              <div>
                <div>{t.callNow}</div>
                <div className="text-[10px] font-mono text-[#647082]">+375 44 751 44 77 / (163) 67-20-41</div>
              </div>
            </a>

            {/* Direct Email to Marketing */}
            <a
              href="mailto:sales@bzal.by"
              className="w-full p-2.5 rounded-lg bg-[#ECEEF0] hover:bg-[#D5D9DE] text-[#2B3340] flex items-center gap-2.5 text-xs font-bold transition-colors text-left"
            >
              <Mail className="w-4 h-4 text-[#E95A0C] shrink-0" />
              <div>
                <div>sales@bzal.by</div>
                <div className="text-[10px] text-[#647082] font-medium">{t.quickHelp}</div>
              </div>
            </a>

            {/* Download Tech Passport */}
            <button
              onClick={() => {
                setIsExpanded(false);
                onOpenPassport();
              }}
              className="w-full p-2.5 rounded-lg bg-[#2B3340] hover:bg-[#1B222C] text-white flex items-center gap-2.5 text-xs font-bold transition-colors cursor-pointer text-left"
            >
              <FileText className="w-4 h-4 text-[#E95A0C] shrink-0" />
              <span>{t.downloadPassport}</span>
            </button>
          </div>
        </div>
      )}

      {/* Main Floating Trigger Button */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="group relative inline-flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-full bg-[#E95A0C] hover:bg-[#CC4B06] text-white font-extrabold text-[11px] sm:text-xs uppercase tracking-wider shadow-xl hover:shadow-2xl transition-all cursor-pointer hover:scale-105 active:scale-95 border-2 border-white"
        aria-label={t.label}
      >
        <Mail className="w-4 h-4 text-white shrink-0" />
        <span className="font-extrabold tracking-wider hidden sm:inline">{t.label}</span>
      </button>

    </div>
  );
};

