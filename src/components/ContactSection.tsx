import React from 'react';
import { Phone, Mail, MapPin, Clock, Globe, ArrowUpRight, Download, Send, Building, Train, Truck, ExternalLink } from 'lucide-react';
import { Language } from '../types';
import { content } from '../data/content';
import { GovLinksBanner } from './GovComplianceSection';
import { BrandLogo } from './BrandLogo';

interface ContactSectionProps {
  currentLang: Language;
  onOpenRfq: () => void;
  onOpenGovSection?: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  currentLang,
  onOpenRfq,
  onOpenGovSection,
}) => {
  const t = content[currentLang];

  return (
    <section id="contacts" className="py-8 sm:py-10 bg-white border-b border-[#D5D9DE] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mb-6 sm:mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#ECEEF0] rounded-md border border-[#D5D9DE] text-[#E95A0C] text-xs font-dela uppercase tracking-wider mb-3">
            <span className="w-2 h-2 rounded-full bg-[#E95A0C]" />
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
                  <div className="text-xs text-[#E95A0C] font-dela tracking-wider uppercase">
                    {t.contacts.cardDepartment} •{' '}
                    {currentLang === 'ru'
                      ? 'УНП 200166530'
                      : currentLang === 'en'
                        ? 'Tax ID (UNP) 200166530'
                        : '税号 UNP 200166530'}
                  </div>
                </div>
                <div className="w-[152px] h-[46px] rounded-xl bg-white border border-[#D5D9DE] overflow-hidden shrink-0 hidden sm:flex items-center justify-center shadow-2xs p-1">
                  <BrandLogo currentLang={currentLang} />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                
                {/* Direct Line */}
                <div className="space-y-1">
                  <div className="text-[11px] font-bold text-[#647082] uppercase tracking-wider flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-[#E95A0C]" />
                    <span>{t.contacts.phoneEngineerLabel}</span>
                  </div>
                  <a
                    href={`tel:${t.brand.phoneRaw}`}
                    className="text-base sm:text-lg font-black text-[#2B3340] hover:text-[#E95A0C] transition-colors block"
                  >
                    {t.brand.phone}
                  </a>
                  <a
                    href={`tel:${t.brand.phoneFax.replace(/[^+\d]/g, '')}`}
                    className="text-xs text-[#647082] hover:text-[#2B3340] block font-semibold"
                  >
                    {t.contacts.phoneFaxLabel} {t.brand.phoneFax}
                  </a>
                  <a
                    href={`tel:${t.brand.phoneMarket.replace(/[^+\d]/g, '')}`}
                    className="text-xs text-[#647082] hover:text-[#2B3340] block font-semibold"
                  >
                    {t.contacts.phoneMarketLabel} {t.brand.phoneMarket}
                  </a>
                </div>

                {/* Email Contacts */}
                <div className="space-y-1">
                  <div className="text-[11px] font-bold text-[#647082] uppercase tracking-wider flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-[#E95A0C]" />
                    <span>{t.contacts.emailLabel}</span>
                  </div>
                  <a
                    href={`mailto:${t.brand.email}`}
                    className="text-base sm:text-lg font-black text-[#E95A0C] hover:underline transition-colors block"
                  >
                    {t.brand.email}
                  </a>
                  <div className="text-xs text-[#647082] font-semibold">
                    {t.contacts.emailDesc}
                  </div>
                </div>

                {/* Physical Plant Address */}
                <div className="space-y-1">
                  <div className="text-[11px] font-bold text-[#647082] uppercase tracking-wider flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#E95A0C]" />
                    <span>{t.contacts.addressLabel}</span>
                  </div>
                  <div className="text-xs sm:text-sm font-bold text-[#2B3340]">
                    {t.contacts.addressVal}
                  </div>
                </div>

                {/* Working Hours */}
                <div className="space-y-1">
                  <div className="text-[11px] font-bold text-[#647082] uppercase tracking-wider flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-[#E95A0C]" />
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
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#E95A0C] hover:bg-[#CC4B06] text-white font-bold text-xs uppercase tracking-wider shadow-sm transition-all cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>{t.contacts.sendDrawingBtn}</span>
                </button>

                <a
                  href="https://обращения.бел"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#2B3340] hover:bg-[#1B222C] text-white font-bold text-xs uppercase tracking-wider underline decoration-white/60 underline-offset-3 transition-all"
                >
                  <span>
                    {currentLang === 'ru'
                      ? 'Электронные обращения (обращения.бел)'
                      : currentLang === 'en'
                        ? 'Electronic Appeals (обращения.бел)'
                        : '国家电子申诉系统 (обращения.бел)'}
                  </span>
                  <ExternalLink className="w-4 h-4 text-[#E95A0C]" />
                </a>

                <a
                  href="http://www.bzal.by"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#ECEEF0] hover:bg-[#D5D9DE] text-[#2B3340] font-bold text-xs uppercase tracking-wider underline transition-all"
                >
                  <Globe className="w-4 h-4" />
                  <span>{t.contacts.mainPortalBtn}</span>
                </a>
              </div>
            </div>

            {/* Logistics & Accessibility Card */}
            <div className="rounded-xl bg-[#ECEEF0] border border-[#D5D9DE] p-5">
              <div className="flex items-center gap-2 text-xs font-dela text-[#2B3340] uppercase mb-2">
                <Truck className="w-4 h-4 text-[#E95A0C]" />
                <span>{t.contacts.logisticsTitle}</span>
              </div>
              <p className="text-xs text-[#444E60] leading-relaxed font-medium">
                {t.contacts.logisticsDesc}
              </p>
            </div>

          </div>

          {/* Right Column: Interactive Yandex Map & Visual Brand Card */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            
            {/* Interactive Yandex Map Card — strictly Baranovichi, Korolika St., 8 (53.160550, 26.020241) */}
            <div className="rounded-2xl overflow-hidden border border-[#D5D9DE] bg-white shadow-lg">
              <div className="px-4 py-3 bg-[#2B3340] text-white flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 min-w-0">
                  <MapPin className="w-4 h-4 text-[#E95A0C] shrink-0" />
                  <div className="truncate">
                    <span className="text-[11px] font-dela uppercase tracking-wider block text-white truncate">
                      {currentLang === 'en'
                        ? 'YANDEX MAP • PLANT LOCATION'
                        : currentLang === 'zh'
                        ? 'YANDEX 地图 • 工厂位置'
                        : 'ЯНДЕКС.КАРТА • РАСПОЛОЖЕНИЕ ЗАВОДА'}
                    </span>
                    <span className="text-[11px] text-[#BAC5CF] font-semibold block truncate">
                      {currentLang === 'en'
                        ? 'Baranovichi, Korolika St., 8 (OJSC BZAL)'
                        : currentLang === 'zh'
                        ? '巴拉诺维奇市 科罗利卡街 8号 (BZAL)'
                        : 'г. Барановичи, ул. Королика, 8 (ОАО БЗАЛ)'}
                    </span>
                  </div>
                </div>
                <a
                  href="https://yandex.by/maps/?ll=26.020241%2C53.160550&z=16&pt=26.020241,53.160550,pm2orgm"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-[#E95A0C] hover:bg-[#CC4B06] text-white text-[10px] font-bold uppercase tracking-wider shrink-0 transition-colors"
                >
                  <span>
                    {currentLang === 'en'
                      ? 'Route'
                      : currentLang === 'zh'
                      ? '路线'
                      : 'Маршрут'}
                  </span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>

              <div className="relative w-full h-[270px] sm:h-[300px] bg-[#ECEEF0]">
                <iframe
                  src="https://yandex.ru/map-widget/v1/?ll=26.020241%2C53.160550&z=16&pt=26.020241,53.160550,pm2orgm"
                  width="100%"
                  height="100%"
                  frameBorder="0"
                  allowFullScreen={true}
                  title="Яндекс.Карта расположения ОАО БЗАЛ — г. Барановичи, ул. Королика, 8"
                  className="w-full h-full border-0"
                  loading="lazy"
                />
              </div>

              <div className="h-1.5 w-full bzal-ribbon-red-white" />

              <div className="px-4 py-3 bg-white flex flex-wrap items-center justify-between gap-2 text-xs">
                <div className="font-semibold text-[#444E60]">
                  <span>{t.contacts.coordinatesLabel} </span>
                  <span className="font-bold text-[#2B3340]">53.16055° N, 26.02024° E</span>
                </div>
                <a
                  href="https://yandex.by/maps/?rtext=~53.160550,26.020241&rtt=auto"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[11px] font-bold text-[#E95A0C] hover:underline inline-flex items-center gap-1"
                >
                  <span>
                    {currentLang === 'en'
                      ? 'Open in Yandex Maps'
                      : currentLang === 'zh'
                      ? '在 Yandex 地图中打开'
                      : 'Открыть в Яндекс Картах'}
                  </span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

            {/* Compact Plant Photo & Checkpoint Note */}
            <div className="rounded-2xl overflow-hidden border border-[#D5D9DE] bg-white shadow-md">
              <div className="relative h-36 overflow-hidden bg-[#2B3340]">
                <img
                  src="/images/bzal_sparks.jpg"
                  alt="ОАО БЗАЛ производство"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#2B3340]/95 via-[#2B3340]/40 to-transparent" />
                <div className="absolute bottom-3 left-4 right-4 text-white">
                  <span className="text-[9px] font-dela uppercase tracking-wider text-[#E95A0C] bg-[#2B3340] px-2 py-0.5 rounded">
                    {t.contacts.photoTag}
                  </span>
                  <div className="text-sm font-bold text-white mt-0.5">
                    {t.contacts.photoPlant} • {t.contacts.photoHalls}
                  </div>
                </div>
              </div>
              <div className="px-4 py-2.5 bg-[#ECEEF0] text-[11px] text-[#444E60] font-medium">
                {t.contacts.visitNote}
              </div>
            </div>

          </div>

        </div>

        {/* Mandatory State Portals & Electronic Appeals Banner in Contacts */}
        <GovLinksBanner currentLang={currentLang} onOpenGovSection={onOpenGovSection} />

      </div>
    </section>
  );
};

