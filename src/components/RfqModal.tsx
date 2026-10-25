import React, { useState, useEffect } from 'react';
import { X, Send, CheckCircle2, Upload, FileCheck, Mail, Clock, Database } from 'lucide-react';
import { Language } from '../types';
import { content } from '../data/content';
import { createRfqInquiry } from '../utils/supabase';

interface RfqModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentLang: Language;
  initialService?: string;
  onInquiryCreated?: () => void;
  onOpenCrm?: () => void;
  onOpenPrivacyPolicy?: () => void;
}

export const RfqModal: React.FC<RfqModalProps> = ({
  isOpen,
  onClose,
  currentLang,
  initialService,
  onInquiryCreated,
  onOpenCrm,
  onOpenPrivacyPolicy,
}) => {
  const t = content[currentLang];
  const [submitted, setSubmitted] = useState(false);
  const [createdNumber, setCreatedNumber] = useState('');
  const [service, setService] = useState(initialService || t.modal.serviceOptions[0]);
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [preferredContact, setPreferredContact] = useState<'phone' | 'email' | 'both'>('both');
  const [comment, setComment] = useState('');
  const [files, setFiles] = useState<string[]>([]);
  const [rawFiles, setRawFiles] = useState<File[]>([]);

  useEffect(() => {
    if (isOpen) {
      setSubmitted(false);
      setService(initialService || content[currentLang].modal.serviceOptions[0]);
    }
  }, [isOpen, initialService, currentLang]);

  if (!isOpen) return null;

  const serviceOptionsList =
    initialService && !t.modal.serviceOptions.includes(initialService)
      ? [initialService, ...t.modal.serviceOptions]
      : t.modal.serviceOptions;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { inquiry } = await createRfqInquiry({
      source: 'modal',
      client_name: name,
      company,
      phone,
      email,
      preferred_contact: preferredContact,
      service_type: service,
      has_drawings: files.length > 0 ? 'Да, прикреплены файлы чертежей / ТЗ' : 'Уточняется с отделом маркетинга',
      material: 'По спецификации заказчика',
      quantity: 'По согласованию с отделом маркетинга',
      fileNames: files,
      rawFiles,
      comments: comment,
    });
    setCreatedNumber(inquiry.inquiry_number);
    onInquiryCreated?.();
    setSubmitted(true);
  };

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selected = Array.from(e.target.files);
      const names = selected.map((f) => f.name);
      setRawFiles((prev) => [...prev, ...selected]);
      setFiles((prev) => [...prev, ...names]);
    }
  };

  const handleRemoveFile = (indexToRemove: number) => {
    setRawFiles((prev) => prev.filter((_, idx) => idx !== indexToRemove));
    setFiles((prev) => prev.filter((_, idx) => idx !== indexToRemove));
  };

  const feedbackLabel =
    currentLang === 'ru'
      ? 'Как вам удобнее получить ответ от отдела маркетинга?'
      : currentLang === 'en'
      ? 'Preferred feedback method:'
      : '首选反馈方式：';

  const feedbackOptions: { id: 'phone' | 'email' | 'both'; label: string }[] =
    currentLang === 'ru'
      ? [
          { id: 'both', label: 'По телефону или на почту' },
          { id: 'phone', label: 'По телефону' },
          { id: 'email', label: 'Ответ на заявку (Email)' },
        ]
      : currentLang === 'en'
      ? [
          { id: 'both', label: 'Phone or Email' },
          { id: 'phone', label: 'By Phone' },
          { id: 'email', label: 'Email Reply' },
        ]
      : [
          { id: 'both', label: '电话或邮件' },
          { id: 'phone', label: '电话' },
          { id: 'email', label: '邮件回复' },
        ];

  const selectedFeedbackText =
    feedbackOptions.find((o) => o.id === preferredContact)?.label || feedbackOptions[0].label;

  const mailtoSubject = encodeURIComponent(`Заявка ${createdNumber ? `№ ${createdNumber} ` : ''}в отдел маркетинга: ${service} (${company})`);
  const mailtoBody = encodeURIComponent(
    `Регистрационный номер в БД: ${createdNumber || 'Новая'}\nОрганизация: ${company}\nИмя: ${name}\nТелефон: ${phone}\nEmail: ${email}\nСпособ обратной связи: ${selectedFeedbackText}\n\nТема обращения: ${service}\nКомментарий / ТЗ: ${comment || '—'}`
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-white border border-[#D5D9DE] rounded-2xl shadow-2xl overflow-hidden max-h-[92vh] overflow-y-auto">
        
        {/* Top Diagonal Chevron Ribbon */}
        <div className="h-2 w-full bzal-ribbon-red-white" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-lg bg-[#ECEEF0] hover:bg-[#D5D9DE] text-[#2B3340] transition-colors cursor-pointer"
          aria-label={t.modal.closeBtn}
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-6 sm:p-8">
          {submitted ? (
            <div className="py-6 text-center animate-in zoom-in-95">
              <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center mb-4">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              {createdNumber && (
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#FFF2EB] border border-[#E95A0C]/30 text-[#E95A0C] font-dela text-[11px] uppercase mb-2">
                  <span>
                    {currentLang === 'ru'
                      ? `Заявка зарегистрирована в БД № ${createdNumber}`
                      : currentLang === 'en'
                        ? `Registered Inquiry # ${createdNumber}`
                        : `已登记询价编号 # ${createdNumber}`}
                  </span>
                </div>
              )}
              <h3 className="text-xl font-black text-[#2B3340] font-dela uppercase mb-2">
                {t.modal.successTitle}
              </h3>
              <p className="text-xs sm:text-sm text-[#444E60] leading-relaxed mb-6 font-medium">
                {t.modal.successDesc}
              </p>
              <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-2.5">
                <a
                  href={`mailto:sales@bzal.by?subject=${mailtoSubject}&body=${mailtoBody}`}
                  className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-[#E95A0C] hover:bg-[#CC4B06] text-white text-xs font-bold uppercase tracking-wider transition-colors"
                >
                  <Mail className="w-4 h-4" />
                  <span>
                    {currentLang === 'ru'
                      ? 'Написать на sales@bzal.by'
                      : currentLang === 'en'
                      ? 'Email sales@bzal.by'
                      : '发送邮件至 sales@bzal.by'}
                  </span>
                </a>
                <button
                  onClick={onClose}
                  className="px-5 py-2.5 rounded-lg bg-[#2B3340] hover:bg-[#1B222C] text-white text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
                >
                  {t.modal.closeBtn}
                </button>
              </div>
            </div>
          ) : (
            <div>
              {/* Modal Header */}
              <div className="mb-5 pr-8">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-[#FFF2EB] text-[#E95A0C] text-[10px] font-dela uppercase tracking-wider mb-2">
                  <span>{t.modal.badge}</span>
                </div>
                <h3 className="text-lg sm:text-xl font-black text-[#2B3340] font-dela uppercase leading-tight">
                  {t.modal.title}
                </h3>
                <p className="text-xs text-[#647082] mt-1 font-medium leading-relaxed">
                  {t.modal.subtitle}
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
                <div>
                  <label className="block text-[11px] font-dela text-[#2B3340] uppercase tracking-wider mb-1">
                    {t.modal.serviceLabel}
                  </label>
                  <select
                    value={service}
                    onChange={(e) => setService(e.target.value)}
                    className="w-full bg-[#ECEEF0] border border-[#D5D9DE] rounded-lg px-3.5 py-2.5 text-xs text-[#2B3340] font-semibold focus:outline-none focus:border-[#E95A0C]"
                  >
                    {serviceOptionsList.map((opt, i) => (
                      <option key={i} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-[#444E60] uppercase tracking-wider mb-1">
                      {t.modal.nameLabel}
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder={t.modal.namePlaceholder}
                      className="w-full bg-[#ECEEF0] border border-[#D5D9DE] rounded-lg px-3.5 py-2.5 text-xs text-[#2B3340] placeholder-slate-400 focus:outline-none focus:border-[#E95A0C]"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-[#444E60] uppercase tracking-wider mb-1">
                      {t.modal.companyLabel}
                    </label>
                    <input
                      type="text"
                      required
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      placeholder={t.modal.companyPlaceholder}
                      className="w-full bg-[#ECEEF0] border border-[#D5D9DE] rounded-lg px-3.5 py-2.5 text-xs text-[#2B3340] placeholder-slate-400 focus:outline-none focus:border-[#E95A0C]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-[#444E60] uppercase tracking-wider mb-1">
                      {t.modal.phoneLabel}
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder={t.modal.phonePlaceholder}
                      className="w-full bg-[#ECEEF0] border border-[#D5D9DE] rounded-lg px-3.5 py-2.5 text-xs text-[#2B3340] placeholder-slate-400 focus:outline-none focus:border-[#E95A0C]"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-[#444E60] uppercase tracking-wider mb-1">
                      {t.modal.emailLabel}
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={t.modal.emailPlaceholder}
                      className="w-full bg-[#ECEEF0] border border-[#D5D9DE] rounded-lg px-3.5 py-2.5 text-xs text-[#2B3340] placeholder-slate-400 focus:outline-none focus:border-[#E95A0C]"
                    />
                  </div>
                </div>

                {/* Preferred Feedback Method */}
                <div>
                  <label className="block text-[11px] font-bold text-[#444E60] uppercase tracking-wider mb-1">
                    {feedbackLabel}
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {feedbackOptions.map((opt) => (
                      <button
                        type="button"
                        key={opt.id}
                        onClick={() => setPreferredContact(opt.id)}
                        className={`py-2 px-2 rounded-lg border text-[11px] font-bold transition-colors cursor-pointer text-center ${
                          preferredContact === opt.id
                            ? 'bg-[#FFF2EB] border-[#E95A0C] text-[#E95A0C]'
                            : 'bg-[#ECEEF0] border-[#D5D9DE] text-[#444E60] hover:text-[#2B3340]'
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-[#444E60] uppercase tracking-wider mb-1">
                    {t.modal.commentLabel}
                  </label>
                  <textarea
                    rows={2}
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder={t.modal.commentPlaceholder}
                    className="w-full bg-[#ECEEF0] border border-[#D5D9DE] rounded-lg px-3.5 py-2 text-xs text-[#2B3340] placeholder-slate-400 focus:outline-none focus:border-[#E95A0C]"
                  />
                </div>

                {/* File Upload in Modal */}
                <div>
                  <label className="block text-[11px] font-bold text-[#444E60] uppercase tracking-wider mb-1">
                    {t.modal.attachLabel}
                  </label>
                  <div className="border border-dashed border-[#D5D9DE] hover:border-[#E95A0C] rounded-lg p-3 text-center bg-[#ECEEF0] transition-colors">
                    <input
                      type="file"
                      id="modal-file-upload"
                      multiple
                      onChange={handleFile}
                      className="hidden"
                    />
                    <label htmlFor="modal-file-upload" className="cursor-pointer flex items-center justify-center gap-2 text-xs text-[#2B3340] font-semibold">
                      <Upload className="w-4 h-4 text-[#E95A0C]" />
                      <span>{files.length > 0 ? `${t.modal.filesCountLabel} ${files.length}` : t.modal.chooseFileLabel}</span>
                    </label>
                    {files.length > 0 && (
                      <div className="mt-2 flex flex-wrap gap-1.5 justify-center">
                        {files.map((fileName, idx) => (
                          <span key={idx} className="inline-flex items-center gap-1 px-2 py-0.5 bg-white border border-[#D5D9DE] rounded text-[10px] font-bold text-[#2B3340]">
                            <FileCheck className="w-3 h-3 text-[#E95A0C]" />
                            <span>{fileName}</span>
                            <button
                              type="button"
                              onClick={() => handleRemoveFile(idx)}
                              className="text-[#647082] hover:text-[#E95A0C] cursor-pointer"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Personal Data Protection Consent (Law of RB No. 99-Z) */}
                <label className="flex items-start gap-2 pt-1 text-[11px] text-[#444E60] cursor-pointer">
                  <input
                    type="checkbox"
                    required
                    defaultChecked
                    className="mt-0.5 accent-[#E95A0C] shrink-0"
                  />
                  <span>
                    {currentLang === 'ru' ? (
                      <>
                        Даю согласие на обработку персональных данных в соответствии с{' '}
                        <button
                          type="button"
                          onClick={onOpenPrivacyPolicy}
                          className="text-[#E95A0C] font-bold underline cursor-pointer"
                        >
                          Законом РБ № 99-З «О защите персональных данных»
                        </button>
                      </>
                    ) : currentLang === 'en' ? (
                      <>
                        I consent to personal data processing under{' '}
                        <button
                          type="button"
                          onClick={onOpenPrivacyPolicy}
                          className="text-[#E95A0C] font-bold underline cursor-pointer"
                        >
                          Law of Belarus No. 99-Z
                        </button>
                      </>
                    ) : (
                      <>
                        同意根据白俄罗斯第99-Z号法律处理个人数据
                      </>
                    )}
                  </span>
                </label>

                {/* Submit button */}
                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center gap-2 py-3.5 rounded-lg bg-[#E95A0C] hover:bg-[#CC4B06] text-white font-extrabold text-xs uppercase tracking-wider shadow-sm transition-all cursor-pointer mt-2"
                >
                  <Send className="w-4 h-4" />
                  <span>{t.modal.submitBtn}</span>
                </button>

                <div className="flex items-center justify-center gap-2 text-[10px] text-[#647082] pt-1">
                  <Clock className="w-3.5 h-3.5 text-[#E95A0C] shrink-0" />
                  <span>{t.modal.note}</span>
                </div>
              </form>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

