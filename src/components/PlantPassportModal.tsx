import React, { useState } from 'react';
import { X, Download, FileText, CheckCircle2, ShieldCheck, ArrowRight, Building, Printer } from 'lucide-react';
import { Language } from '../types';
import { extraContent } from '../data/extraContent';
import { createPassportLead } from '../utils/supabase';

interface PlantPassportModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentLang: Language;
  onLeadCreated?: () => void;
}

export const PlantPassportModal: React.FC<PlantPassportModalProps> = ({
  isOpen,
  onClose,
  currentLang,
  onLeadCreated,
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const t = extraContent[currentLang]?.passportModal || extraContent.ru.passportModal;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await createPassportLead({
      contact_name: formData.name,
      company: formData.company,
      email: formData.email,
    });
    onLeadCreated?.();
    setIsSubmitted(true);
  };

  const handleDownloadDirectly = () => {
    // Generate and trigger download of a comprehensive Plant Passport text/pdf specification summary
    const passportContent = `========================================================================
ТЕХНОЛОГИЧЕСКИЙ ПАСПОРТ ТЕХНОПАРКА ОАО «БЗАЛ»
Барановичский завод автоматических линий (Основан 14.03.1974)
Адрес: Республика Беларусь, 225410, г. Барановичи, ул. Королика, 8
Тел. сбыта: +375 44 751 44 77, +375 (163) 67-20-48
Email: sales@bzal.by | Сайт: www.bzal.by
Сертификация: СТБ ISO 9001-2015 | Аккредитованная лаборатория ОТК
========================================================================

1. ПРОИЗВОДСТВЕННЫЙ ПОТЕНЦИАЛ:
- Общая производственная площадь: свыше 30 000 м²
- Парк металлорежущего оборудования: 180+ единиц (ЧПУ, универсальные, специальные)
- Крановое хозяйство: мостовые краны грузоподъемностью до 20 тонн
- Собственный железнодорожный тупик: подача платформ непосредственно в сборочный цех
- Литейный участок: серый чугун СЧ20-СЧ25, высокопрочный чугун ВЧ50, стальное литье
- Термический участок: объемная закалка, отпуск, цементация, ТВЧ-закалка токами высокой частоты

2. ОСНОВНЫЕ ТЕХНОЛОГИЧЕСКИЕ ВОЗМОЖНОСТИ ОБРАБОТКИ:
- Фрезерная 5-осевая обработка (DMG MORI DMU 80 P): до 800×800×800 мм, точность ±0,004 мм
- Горизонтально-расточная обработка (TOS Varnsdorf WHN 13.8): стол 1800×2200 мм, масса до 12 т, перемещения 3500×2000×1250 мм
- Токарно-карусельная обработка (1Л532): диаметр планшайбы 2800 мм, макс. диаметр детали 3150 мм, масса до 16 тонн
- Портальная фрезерная обработка (УФ-5220): стол 6000×2000 мм, длина детали до 6000 мм, масса до 25 тонн
- Токарная ЧПУ с приводным инструментом (HAAS ST-35Y): диаметр до 533 мм, длина до 826 мм
- Прецизионное круглое и плоское шлифование (Studer S41 CNC): длина до 1600 мм, диаметр до 549 мм, шероховатость Ra 0.2

3. ЛАБОРАТОРИЯ ОТК И МЕТРОЛОГИИ:
- 3D координатно-измерительная машина (CMM): диапазон 2000×1200×1000 мм, точность ±0,0018 мм
- Оптико-эмиссионный спектрометр: входной спектральный анализ сплавов металлов
- Ультразвуковая (УЗК) и магнитопорошковая (МПК) дефектоскопия
- Стационарные твердомеры Роквелла (HRC), Бринелля (HB), Виккерса (HV)
- Профилометры контактного измерения шероховатости Ra/Rz

4. УСЛОВИЯ ДЛЯ ЗАКАЗЧИКОВ ИЗ РФ И ЕАЭС:
- Нулевая ставка НДС (0%) в рамках Таможенного союза ЕАЭС
- Прямые рублевые расчеты (RUB) через банки РФ
- Сертификаты происхождения формы СТ-1 для участия в тендерах
- Логистика автотранспортом (3 км от М1) и Ж/Д транспортом по колее 1520 мм

(c) ОАО «БЗАЛ», г. Барановичи.
`;

    const blob = new Blob([passportContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'BZAL_Plant_Technical_Passport_2025.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border-2 border-[#2B3340] overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Modal Header */}
        <div className="bg-[#2B3340] text-white p-5 sm:p-6 relative">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-[#E71B26] text-white text-[10px] font-dela uppercase tracking-wider mb-2">
                <FileText className="w-3.5 h-3.5" />
                <span>ОФИЦИАЛЬНЫЙ ДОКУМЕНТ ОАО «БЗАЛ»</span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold font-dela text-white uppercase leading-snug">
                {t.title}
              </h3>
              <p className="text-xs text-[#BAC5CF] font-medium mt-1 leading-relaxed">
                {t.subtitle}
              </p>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-[#BAC5CF] hover:text-white transition-colors cursor-pointer shrink-0"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Chevron Ribbon */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bzal-ribbon-red-white" />
        </div>

        {/* Modal Content */}
        <div className="p-6 sm:p-8">
          
          {/* Key Metric Pills */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
            {t.stats.map((st, idx) => (
              <div key={idx} className="p-2.5 rounded-lg bg-[#ECEEF0] border border-[#D5D9DE] text-center">
                <div className="font-dela text-sm sm:text-base text-[#E71B26] leading-none mb-1">
                  {st.value}
                </div>
                <div className="text-[10px] font-bold text-[#647082] leading-tight">
                  {st.label}
                </div>
              </div>
            ))}
          </div>

          {/* Preview Snapshot Box */}
          <div className="p-4 rounded-xl bg-[#F8F9FA] border border-[#E2E5E8] mb-6 flex items-center gap-4">
            <div className="w-16 h-20 bg-white border-2 border-[#D5D9DE] rounded-md shadow-xs p-1.5 flex flex-col justify-between shrink-0">
              <div className="h-1.5 w-8 bg-[#E71B26] rounded-xs" />
              <div className="space-y-1">
                <div className="h-1 w-full bg-[#D5D9DE] rounded-xs" />
                <div className="h-1 w-10 bg-[#D5D9DE] rounded-xs" />
                <div className="h-1 w-8 bg-[#D5D9DE] rounded-xs" />
              </div>
              <div className="flex justify-between items-center text-[7px] text-[#647082] font-mono">
                <span>БЗАЛ</span>
                <span>ISO</span>
              </div>
            </div>

            <div className="text-xs">
              <div className="font-dela text-[#2B3340] uppercase">
                ТЕХНОЛОГИЧЕСКИЙ ПАСПОРТ ОБОРУДОВАНИЯ (PDF)
              </div>
              <p className="text-[#647082] mt-0.5">
                Полные карты перемещений X/Y/Z, типы шпинделей, максимальные нагрузки на стол и сертификаты испытаний на 24 страницах.
              </p>
            </div>
          </div>

          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#2B3340] uppercase mb-1">
                  {t.nameLabel}
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder={t.namePlaceholder}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-[#D5D9DE] bg-[#F8F9FA] text-xs font-medium focus:bg-white focus:outline-none focus:border-[#E71B26]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#2B3340] uppercase mb-1">
                    {t.emailLabel}
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder={t.emailPlaceholder}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-[#D5D9DE] bg-[#F8F9FA] text-xs font-medium focus:bg-white focus:outline-none focus:border-[#E71B26]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#2B3340] uppercase mb-1">
                    {t.companyLabel}
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    placeholder={t.companyPlaceholder}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-[#D5D9DE] bg-[#F8F9FA] text-xs font-medium focus:bg-white focus:outline-none focus:border-[#E71B26]"
                  />
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-[#E71B26] hover:bg-[#C9141E] text-white font-extrabold text-xs uppercase tracking-wider shadow-md hover:shadow-lg transition-all cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  <span>{t.btnDownload}</span>
                </button>
              </div>

              <p className="text-[10px] text-[#647082] text-center font-medium">
                {t.securityNote}
              </p>
            </form>
          ) : (
            <div className="text-center py-4 space-y-4">
              <div className="w-12 h-12 rounded-full bg-green-100 text-green-600 mx-auto flex items-center justify-center">
                <CheckCircle2 className="w-7 h-7" />
              </div>

              <h4 className="font-dela text-base sm:text-lg text-[#2B3340] uppercase">
                {t.downloadSuccessTitle}
              </h4>
              <p className="text-xs text-[#444E60] font-medium max-w-md mx-auto">
                {t.downloadSuccessDesc}
              </p>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  onClick={handleDownloadDirectly}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[#E71B26] hover:bg-[#C9141E] text-white font-bold text-xs uppercase tracking-wider shadow-md transition-all cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  <span>{t.btnDirectDownload}</span>
                </button>

                <button
                  onClick={onClose}
                  className="px-5 py-3 rounded-lg bg-[#ECEEF0] text-[#2B3340] hover:bg-[#D5D9DE] font-bold text-xs uppercase transition-colors cursor-pointer"
                >
                  {t.btnClose}
                </button>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
