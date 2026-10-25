import React, { useState, useEffect } from 'react';
import { Upload, CheckCircle2, Clock, FileCheck, Phone, Mail, ArrowUpRight, X, Database } from 'lucide-react';
import { Language, RfqFormData } from '../types';
import { content } from '../data/content';
import { createRfqInquiry } from '../utils/supabase';

interface RfqCalculatorProps {
  currentLang: Language;
  preselectedService?: string;
  onInquiryCreated?: () => void;
  onOpenCrm?: () => void;
  onOpenPrivacyPolicy?: () => void;
}

export const RfqCalculator: React.FC<RfqCalculatorProps> = ({
  currentLang,
  preselectedService,
  onInquiryCreated,
  onOpenCrm,
  onOpenPrivacyPolicy,
}) => {
  const t = content[currentLang];

  const [formData, setFormData] = useState<RfqFormData>({
    serviceType: preselectedService || t.calculator.serviceOptions[0],
    hasDrawings: t.calculator.drawingOptions[0],
    material: t.calculator.materialOptions[0],
    quantity: t.calculator.quantityOptions[0],
    urgency: 'standard',
    name: '',
    company: '',
    email: '',
    phone: '',
    preferredContact: 'both',
    comments: '',
    fileNames: [],
  });

  const [rawFiles, setRawFiles] = useState<File[]>([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [createdNumber, setCreatedNumber] = useState<string>('');

  // Sync serviceType when preselectedService changes
  useEffect(() => {
    if (preselectedService) {
      setFormData((prev) => ({
        ...prev,
        serviceType: preselectedService,
      }));
      setIsSubmitted(false);
    }
  }, [preselectedService]);

  // Sync default options when language changes
  useEffect(() => {
    const langCalc = content[currentLang].calculator;
    setFormData((prev) => ({
      ...prev,
      serviceType: preselectedService || langCalc.serviceOptions[0],
      hasDrawings: langCalc.drawingOptions[0],
      material: langCalc.materialOptions[0],
      quantity: langCalc.quantityOptions[0],
    }));
  }, [currentLang, preselectedService]);

  const serviceOptionsList =
    preselectedService && !t.calculator.serviceOptions.includes(preselectedService)
      ? [preselectedService, ...t.calculator.serviceOptions]
      : t.calculator.serviceOptions;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selected = Array.from(e.target.files);
      const names = selected.map((f) => f.name);
      setRawFiles((prev) => [...prev, ...selected]);
      setFormData((prev) => ({ ...prev, fileNames: [...prev.fileNames, ...names] }));
    }
  };

  const handleRemoveFile = (indexToRemove: number) => {
    setRawFiles((prev) => prev.filter((_, idx) => idx !== indexToRemove));
    setFormData((prev) => ({
      ...prev,
      fileNames: prev.fileNames.filter((_, idx) => idx !== indexToRemove),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const { inquiry } = await createRfqInquiry({
        source: 'calculator',
        client_name: formData.name,
        company: formData.company,
        phone: formData.phone,
        email: formData.email,
        preferred_contact: formData.preferredContact,
        service_type: formData.serviceType,
        has_drawings: formData.hasDrawings,
        material: formData.material,
        quantity: formData.quantity,
        fileNames: formData.fileNames,
        rawFiles,
        comments: formData.comments,
      });
      setCreatedNumber(inquiry.inquiry_number);
      onInquiryCreated?.();
    } finally {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }
  };

  const feedbackLabel =
    currentLang === 'ru'
      ? 'Удобный способ получения обратной связи:'
      : currentLang === 'en'
      ? 'Preferred feedback method:'
      : '首选反馈方式：';

  const feedbackOptions: { id: 'phone' | 'email' | 'both'; label: string }[] =
    currentLang === 'ru'
      ? [
          { id: 'both', label: 'По телефону или ответ на заявку' },
          { id: 'phone', label: 'Звонок по телефону' },
          { id: 'email', label: 'Ответ на заявку (Email)' },
        ]
      : currentLang === 'en'
      ? [
          { id: 'both', label: 'Phone call or Email reply' },
          { id: 'phone', label: 'By Phone' },
          { id: 'email', label: 'Reply to Inquiry (Email)' },
        ]
      : [
          { id: 'both', label: '电话或邮件回复均可' },
          { id: 'phone', label: '电话回访' },
          { id: 'email', label: '邮件回复申请' },
        ];

  const selectedFeedbackText =
    feedbackOptions.find((o) => o.id === formData.preferredContact)?.label || feedbackOptions[0].label;

  const mailtoSubject = encodeURIComponent(`Заявка ${createdNumber ? `№ ${createdNumber} ` : ''}на расчёт: ${formData.serviceType} (${formData.company})`);
  const mailtoBody = encodeURIComponent(
    `Регистрационный номер в БД: ${createdNumber || 'Новая'}\nОрганизация: ${formData.company}\nКонтактное лицо: ${formData.name}\nТелефон: ${formData.phone}\nEmail: ${formData.email}\nСпособ обратной связи: ${selectedFeedbackText}\n\nНаправление: ${formData.serviceType}\nДокументация: ${formData.hasDrawings}\nМатериал: ${formData.material}\nОбъем партии: ${formData.quantity}\nКомментарий: ${formData.comments || '—'}`
  );

  return (
    <section id="calculator" className="py-8 sm:py-10 bg-tech-grid border-b border-[#D5D9DE] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mb-6 sm:mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white rounded-md border border-[#D5D9DE] text-[#E95A0C] text-xs font-dela uppercase tracking-wider mb-3">
            <span className="w-2 h-2 rounded-full bg-[#E95A0C]" />
            <span>{t.calculator.eyebrow}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#2B3340] tracking-tight font-dela uppercase">
            {t.calculator.title}
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#444E60] font-medium leading-relaxed">
            {t.calculator.subtitle}
          </p>
        </div>

        {/* Form Container */}
        <div className="rounded-2xl border border-[#D5D9DE] bg-white shadow-xl overflow-hidden">
          
          <div className="h-2 w-full bzal-ribbon-red-white" />

          <div className="p-6 sm:p-8 lg:p-10">
            {isSubmitted ? (
              <div className="py-10 text-center max-w-xl mx-auto">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center mb-6">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                {createdNumber && (
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#FFF2EB] border border-[#E95A0C]/30 text-[#E95A0C] font-dela text-xs uppercase mb-3">
                    <span>
                      {currentLang === 'ru'
                        ? `Зарегистрирована в БД № ${createdNumber}`
                        : currentLang === 'en'
                          ? `Registered Inquiry # ${createdNumber}`
                          : `已登记询价编号 # ${createdNumber}`}
                    </span>
                  </div>
                )}
                <h3 className="text-xl sm:text-2xl font-black text-[#2B3340] font-dela uppercase mb-2">
                  {t.calculator.successTitle}
                </h3>
                <p className="text-sm text-[#444E60] leading-relaxed mb-6 font-medium">
                  {t.calculator.successDesc}
                </p>
                
                <div className="p-4 rounded-xl bg-[#ECEEF0] border border-[#D5D9DE] text-xs text-left text-[#2B3340] space-y-2 mb-6">
                  <div className="font-dela text-[#2B3340] uppercase text-[11px] tracking-wider mb-2">
                    {t.calculator.successParamsTitle}
                  </div>
                  <div><strong>{t.calculator.step1Label}</strong> {formData.serviceType}</div>
                  <div><strong>{t.calculator.step2Label}</strong> {formData.hasDrawings}</div>
                  <div><strong>{t.calculator.step3Label}</strong> {formData.material}</div>
                  <div><strong>{t.calculator.step4Label}</strong> {formData.quantity}</div>
                  <div><strong>{t.calculator.fieldName}</strong> {formData.name} ({formData.company})</div>
                  <div><strong>{feedbackLabel}</strong> {selectedFeedbackText} ({formData.phone} / {formData.email})</div>
                </div>

                <div className="flex flex-wrap items-center justify-center gap-3">
                  <a
                    href={`mailto:sales@bzal.by?subject=${mailtoSubject}&body=${mailtoBody}`}
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-[#E95A0C] hover:bg-[#CC4B06] text-white text-xs font-bold uppercase tracking-wider transition-colors"
                  >
                    <Mail className="w-4 h-4" />
                    <span>
                      {currentLang === 'ru'
                        ? 'Продублировать письмо на sales@bzal.by'
                        : currentLang === 'en'
                        ? 'Send via Email Client to sales@bzal.by'
                        : '通过邮件客户端发送至 sales@bzal.by'}
                    </span>
                  </a>

                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="px-6 py-3 rounded-lg bg-[#2B3340] hover:bg-[#1B222C] text-white text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
                  >
                    {t.calculator.newReqBtn}
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                
                {/* Left Column: Technical Selectors */}
                <div className="lg:col-span-7 space-y-6">
                  
                  {/* 1. Service Type */}
                  <div>
                    <label className="block text-xs font-dela text-[#2B3340] uppercase tracking-wider mb-2">
                      {t.calculator.step1Label}
                    </label>
                    <select
                      value={formData.serviceType}
                      onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
                      className="w-full bg-[#ECEEF0] border border-[#D5D9DE] rounded-lg px-4 py-3 text-sm text-[#2B3340] font-semibold focus:outline-none focus:border-[#E95A0C] transition-colors"
                    >
                      {serviceOptionsList.map((opt, i) => (
                        <option key={i} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* 2. Drawing Availability */}
                  <div>
                    <label className="block text-xs font-dela text-[#2B3340] uppercase tracking-wider mb-2">
                      {t.calculator.step2Label}
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {t.calculator.drawingOptions.map((opt, i) => (
                        <label
                          key={i}
                          className={`flex items-center gap-2.5 p-3 rounded-lg border text-xs cursor-pointer transition-all ${
                            formData.hasDrawings === opt
                              ? 'bg-[#FFF2EB] border-[#E95A0C] text-[#2B3340] font-bold shadow-xs'
                              : 'bg-[#ECEEF0] border-[#D5D9DE] text-[#444E60] hover:text-[#2B3340]'
                          }`}
                        >
                          <input
                            type="radio"
                            name="hasDrawings"
                            checked={formData.hasDrawings === opt}
                            onChange={() => setFormData({ ...formData, hasDrawings: opt })}
                            className="accent-[#E95A0C]"
                          />
                          <span>{opt}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* 3. Material Selection */}
                  <div>
                    <label className="block text-xs font-dela text-[#2B3340] uppercase tracking-wider mb-2">
                      {t.calculator.step3Label}
                    </label>
                    <select
                      value={formData.material}
                      onChange={(e) => setFormData({ ...formData, material: e.target.value })}
                      className="w-full bg-[#ECEEF0] border border-[#D5D9DE] rounded-lg px-4 py-3 text-sm text-[#2B3340] font-semibold focus:outline-none focus:border-[#E95A0C] transition-colors"
                    >
                      {t.calculator.materialOptions.map((mat, i) => (
                        <option key={i} value={mat}>
                          {mat}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* 4. Quantity Selection */}
                  <div>
                    <label className="block text-xs font-dela text-[#2B3340] uppercase tracking-wider mb-2">
                      {t.calculator.step4Label}
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {t.calculator.quantityOptions.map((qty, i) => (
                        <label
                          key={i}
                          className={`flex items-center gap-2.5 p-3 rounded-lg border text-xs cursor-pointer transition-all ${
                            formData.quantity === qty
                              ? 'bg-[#FFF2EB] border-[#E95A0C] text-[#2B3340] font-bold shadow-xs'
                              : 'bg-[#ECEEF0] border-[#D5D9DE] text-[#444E60] hover:text-[#2B3340]'
                          }`}
                        >
                          <input
                            type="radio"
                            name="quantity"
                            checked={formData.quantity === qty}
                            onChange={() => setFormData({ ...formData, quantity: qty })}
                            className="accent-[#E95A0C]"
                          />
                          <span>{qty}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* 5. Attach Drawing File */}
                  <div>
                    <label className="block text-xs font-dela text-[#2B3340] uppercase tracking-wider mb-2">
                      {t.calculator.step5Label}
                    </label>
                    <div className="border-2 border-dashed border-[#D5D9DE] hover:border-[#E95A0C] rounded-xl p-5 text-center bg-[#ECEEF0] transition-colors">
                      <input
                        type="file"
                        id="calculator-file-upload"
                        multiple
                        onChange={handleFileUpload}
                        className="hidden"
                      />
                      <label htmlFor="calculator-file-upload" className="cursor-pointer flex flex-col items-center">
                        <Upload className="w-8 h-8 text-[#E95A0C] mb-2" />
                        <span className="text-xs font-bold text-[#2B3340]">
                          {t.calculator.uploadTitle}
                        </span>
                        <span className="text-[11px] text-[#647082] mt-1">
                          {t.calculator.uploadFormats}
                        </span>
                      </label>
                      {formData.fileNames.length > 0 && (
                        <div className="mt-3 flex flex-wrap gap-2 justify-center">
                          {formData.fileNames.map((name, i) => (
                            <span key={i} className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-white border border-[#D5D9DE] rounded text-[11px] font-bold text-[#2B3340]">
                              <FileCheck className="w-3.5 h-3.5 text-[#E95A0C]" />
                              <span>{name}</span>
                              <button
                                type="button"
                                onClick={() => handleRemoveFile(i)}
                                className="text-[#647082] hover:text-[#E95A0C] cursor-pointer ml-0.5"
                                title="Удалить файл"
                              >
                                <X className="w-3.5 h-3.5" />
                              </button>
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                </div>

                {/* Right Column: Contact Details & Marketing Intake Card */}
                <div className="lg:col-span-5 bg-[#2B3340] text-white p-6 sm:p-7 rounded-xl shadow-lg border border-[#1B222C]">
                  
                  <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/10">
                    <span className="font-dela text-sm uppercase text-white tracking-wider">
                      {t.calculator.rightCardTitle}
                    </span>
                    <span className="px-2 py-0.5 rounded bg-[#E95A0C] text-white text-[10px] font-dela uppercase">
                      {t.calculator.rightCardBadge}
                    </span>
                  </div>

                  <p className="text-xs text-[#BAC5CF] mb-5 leading-relaxed font-medium">
                    {t.calculator.rightCardDesc}
                  </p>

                  <div className="space-y-3.5 mb-6">
                    <div>
                      <label className="block text-[11px] font-bold text-[#BAC5CF] uppercase tracking-wider mb-1">
                        {t.calculator.fieldName}
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder={t.calculator.fieldNamePlaceholder}
                        className="w-full bg-[#1B222C] border border-white/15 rounded-lg px-3.5 py-2.5 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-[#E95A0C]"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-[#BAC5CF] uppercase tracking-wider mb-1">
                        {t.calculator.fieldCompany}
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        placeholder={t.calculator.fieldCompanyPlaceholder}
                        className="w-full bg-[#1B222C] border border-white/15 rounded-lg px-3.5 py-2.5 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-[#E95A0C]"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-bold text-[#BAC5CF] uppercase tracking-wider mb-1">
                          {t.calculator.fieldPhone}
                        </label>
                        <input
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder={t.calculator.fieldPhonePlaceholder}
                          className="w-full bg-[#1B222C] border border-white/15 rounded-lg px-3.5 py-2.5 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-[#E95A0C]"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-[#BAC5CF] uppercase tracking-wider mb-1">
                          {t.calculator.fieldEmail}
                        </label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder={t.calculator.fieldEmailPlaceholder}
                          className="w-full bg-[#1B222C] border border-white/15 rounded-lg px-3.5 py-2.5 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-[#E95A0C]"
                        />
                      </div>
                    </div>

                    {/* Preferred Feedback Method Selector */}
                    <div>
                      <label className="block text-[11px] font-bold text-[#BAC5CF] uppercase tracking-wider mb-1.5">
                        {feedbackLabel}
                      </label>
                      <div className="grid grid-cols-1 gap-1.5">
                        {feedbackOptions.map((opt) => (
                          <label
                            key={opt.id}
                            className={`flex items-center gap-2 px-3 py-2 rounded-lg border text-xs cursor-pointer transition-colors ${
                              formData.preferredContact === opt.id
                                ? 'bg-[#E95A0C]/20 border-[#E95A0C] text-white font-bold'
                                : 'bg-[#1B222C] border-white/10 text-[#BAC5CF] hover:text-white'
                            }`}
                          >
                            <input
                              type="radio"
                              name="preferredContact"
                              checked={formData.preferredContact === opt.id}
                              onChange={() => setFormData({ ...formData, preferredContact: opt.id })}
                              className="accent-[#E95A0C]"
                            />
                            <span>{opt.label}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-[#BAC5CF] uppercase tracking-wider mb-1">
                        {t.calculator.fieldComments}
                      </label>
                      <textarea
                        rows={2}
                        value={formData.comments}
                        onChange={(e) => setFormData({ ...formData, comments: e.target.value })}
                        placeholder={t.calculator.fieldCommentsPlaceholder}
                        className="w-full bg-[#1B222C] border border-white/15 rounded-lg px-3.5 py-2 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-[#E95A0C]"
                      />
                    </div>
                    {/* Personal Data Consent (Law of RB No. 99-Z) */}
                    <label className="flex items-start gap-2 pt-1 text-[11px] text-[#BAC5CF] cursor-pointer">
                      <input
                        type="checkbox"
                        required
                        defaultChecked
                        className="mt-0.5 accent-[#E95A0C] shrink-0"
                      />
                      <span>
                        {currentLang === 'ru' ? (
                          <>
                            Согласен на обработку персональных данных согласно{' '}
                            <button
                              type="button"
                              onClick={onOpenPrivacyPolicy}
                              className="text-white font-bold underline hover:text-[#E95A0C] cursor-pointer"
                            >
                              Закону РБ № 99-З «О защите персональных данных»
                            </button>
                          </>
                        ) : currentLang === 'en' ? (
                          <>
                            I agree to personal data processing under{' '}
                            <button
                              type="button"
                              onClick={onOpenPrivacyPolicy}
                              className="text-white font-bold underline hover:text-[#E95A0C] cursor-pointer"
                            >
                              Law of Belarus No. 99-Z
                            </button>
                          </>
                        ) : (
                          <>同意根据白俄罗斯第99-Z号法律处理个人数据</>
                        )}
                      </span>
                    </label>
                  </div>

                  {/* Submission Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 rounded-lg bg-[#E95A0C] hover:bg-[#CC4B06] text-white font-extrabold text-xs uppercase tracking-wider shadow-lg shadow-red-900/40 hover:-translate-y-0.5 transition-all cursor-pointer"
                  >
                    <span>{t.calculator.submitBtn}</span>
                    <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
                  </button>

                  <div className="mt-4 pt-4 border-t border-white/10 space-y-2 text-[11px] text-[#BAC5CF]">
                    <div className="flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5 text-[#E95A0C] shrink-0" />
                      <span>{t.calculator.turnaroundNote}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#E95A0C] shrink-0" />
                      <span>{t.calculator.confNote}</span>
                    </div>
                  </div>

                </div>

              </form>
            )}
          </div>

        </div>

      </div>
    </section>
  );
};

