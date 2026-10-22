import React from 'react';
import { Phone, Mail, MapPin, Clock, Globe, ArrowUpRight, Download, Send, Building, Train, Truck } from 'lucide-react';
import { Language } from '../types';
import { content } from '../data/content';

interface ContactSectionProps {
  currentLang: Language;
  onOpenRfq: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ currentLang, onOpenRfq }) => {
  const t = content[currentLang];

  return (
    <section id="contacts" className="py-20 sm:py-24 bg-white border-b border-[#D5D9DE] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#ECEEF0] rounded-md border border-[#D5D9DE] text-[#E71B26] text-xs font-dela uppercase tracking-wider mb-3">
            <span className="w-2 h-2 rounded-full bg-[#E71B26]" />
            <span>{t.contacts.eyebrow}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#2B3340] tracking-tight font-dela uppercase">
            {t.contacts.title}
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#444E60] font-medium leading-relaxed">
            {t.contacts.subtitle}
          </p>
        </div>

        {/* Contact Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Official Enterprise Contacts */}
          <div className="lg:col-span-7 space-y-4">
            
            {/* Primary Phone & Email Card */}
            <div className="rounded-2xl bg-white border border-[#D5D9DE] p-6 sm:p-8 shadow-md">
              <div className="flex items-center justify-between pb-6 border-b border-[#E2E5E8] mb-6">
                <div>
                  <h3 className="text-lg sm:text-xl font-black text-[#2B3340] mb-1 font-dela uppercase">
                    {t.brand.fullName}
                  </h3>
                  <div className="text-xs text-[#E71B26] font-dela tracking-wider uppercase">
                    {t.contacts.cardDepartment}
                  </div>
                </div>
                <div className="w-12 h-12 rounded-xl bg-white border border-[#D5D9DE] p-1.5 shrink-0 hidden sm:block">
                  <img
                    src="/images/bzal_mark_pristine_red.png"
                    alt="БЗАЛ"
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                
                {/* Direct Line */}
                <div className="space-y-1">
                  <div className="text-[11px] font-bold text-[#647082] uppercase tracking-wider flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-[#E71B26]" />
                    <span>{t.contacts.phoneEngineerLabel}</span>
                  </div>
                  <a
                    href="tel:+375447514477"
                    className="text-base sm:text-lg font-black text-[#2B3340] hover:text-[#E71B26] transition-colors block"
                  >
                    +375 44 751 44 77
                  </a>
                  <a
                    href="tel:+375163672048"
                    className="text-xs text-[#647082] hover:text-[#2B3340] block font-semibold"
                  >
                    {t.contacts.phoneFaxLabel} +375 (163) 67-20-48
                  </a>
                  <a
                    href="tel:+375163672041"
                    className="text-xs text-[#647082] hover:text-[#2B3340] block font-semibold"
                  >
                    {t.contacts.phoneMarketLabel} +375 (163) 67-20-41
                  </a>
                </div>

                {/* Email Contacts */}
                <div className="space-y-1">
                  <div className="text-[11px] font-bold text-[#647082] uppercase tracking-wider flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-[#E71B26]" />
                    <span>{t.contacts.emailLabel}</span>
                  </div>
                  <a
                    href="mailto:bzal_market@mail.ru"
                    className="text-base sm:text-lg font-black text-[#E71B26] hover:underline transition-colors block"
                  >
                    bzal_market@mail.ru
                  </a>
                  <div className="text-xs text-[#647082] font-semibold">
                    {t.contacts.emailDesc}
                  </div>
                </div>

                {/* Physical Plant Address */}
                <div className="space-y-1">
                  <div className="text-[11px] font-bold text-[#647082] uppercase tracking-wider flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#E71B26]" />
                    <span>{t.contacts.addressLabel}</span>
                  </div>
                  <div className="text-xs sm:text-sm font-bold text-[#2B3340]">
                    {t.contacts.addressVal}
                  </div>
                </div>

                {/* Working Hours */}
                <div className="space-y-1">
                  <div className="text-[11px] font-bold text-[#647082] uppercase tracking-wider flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-[#E71B26]" />
                    <span>{t.contacts.hoursLabel}</span>
                  </div>
                  <div className="text-xs sm:text-sm font-bold text-[#2B3340]">
                    {t.contacts.hoursTime}
                  </div>
                  <div className="text-[11px] text-[#647082]">
                    {t.contacts.hoursTimezone}
                  </div>
                </div>

              </div>

              {/* Action Buttons */}
              <div className="mt-8 pt-6 border-t border-[#E2E5E8] flex flex-wrap items-center gap-3">
                <button
                  onClick={onOpenRfq}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[#E71B26] hover:bg-[#C9141E] text-white font-bold text-xs uppercase tracking-wider shadow-sm transition-all cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>{t.contacts.sendDrawingBtn}</span>
                </button>

                <a
                  href="http://www.bzal.by"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-[#ECEEF0] hover:bg-[#D5D9DE] text-[#2B3340] font-bold text-xs uppercase tracking-wider transition-all"
                >
                  <Globe className="w-4 h-4" />
                  <span>{t.contacts.mainPortalBtn}</span>
                </a>
              </div>
            </div>

            {/* Logistics & Accessibility Card */}
            <div className="rounded-xl bg-[#ECEEF0] border border-[#D5D9DE] p-5">
              <div className="flex items-center gap-2 text-xs font-dela text-[#2B3340] uppercase mb-2">
                <Truck className="w-4 h-4 text-[#E71B26]" />
                <span>{t.contacts.logisticsTitle}</span>
              </div>
              <p className="text-xs text-[#444E60] leading-relaxed font-medium">
                {t.contacts.logisticsDesc}
              </p>
            </div>

          </div>

          {/* Right Column: Visual Brand Card with Real Photography */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            
            <div className="rounded-2xl overflow-hidden border border-[#D5D9DE] bg-white shadow-lg">
              <div className="relative aspect-[4/3] overflow-hidden bg-[#2B3340]">
                <img
                  src="/images/bzal_sparks.jpg"
                  alt="ОАО БЗАЛ производство"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#2B3340]/90 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <span className="text-[10px] font-dela uppercase tracking-wider text-[#E71B26] bg-[#2B3340] px-2 py-0.5 rounded">
                    {t.contacts.photoTag}
                  </span>
                  <div className="text-base font-bold text-white mt-1">
                    {t.contacts.photoPlant}
                  </div>
                  <div className="text-xs text-[#BAC5CF] mt-0.5">
                    {t.contacts.photoHalls}
                  </div>
                </div>
              </div>
              <div className="h-2 w-full bzal-ribbon-red-white" />
              <div className="p-5 bg-white">
                <div className="flex items-center justify-between text-xs font-semibold text-[#444E60]">
                  <span>{t.contacts.coordinatesLabel}</span>
                  <span className="font-bold text-[#2B3340]">53.1257° N, 26.0422° E</span>
                </div>
                <div className="mt-2 text-[11px] text-[#647082]">
                  {t.contacts.visitNote}
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
