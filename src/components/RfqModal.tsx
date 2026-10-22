import React, { useState } from 'react';
import { X, Send, CheckCircle2, Upload, FileCheck, Phone, Mail, Clock } from 'lucide-react';
import { Language } from '../types';
import { content } from '../data/content';

interface RfqModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentLang: Language;
  initialService?: string;
}

export const RfqModal: React.FC<RfqModalProps> = ({
  isOpen,
  onClose,
  currentLang,
  initialService,
}) => {
  const t = content[currentLang];
  const [submitted, setSubmitted] = useState(false);
  const [service, setService] = useState(initialService || t.modal.serviceOptions[0]);
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [comment, setComment] = useState('');
  const [files, setFiles] = useState<string[]>([]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const names = Array.from(e.target.files).map((f) => f.name);
      setFiles((prev) => [...prev, ...names]);
    }
  };

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
            <div className="py-8 text-center animate-in zoom-in-95">
              <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center mb-4">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-black text-[#2B3340] font-dela uppercase mb-2">
                {t.modal.successTitle}
              </h3>
              <p className="text-xs sm:text-sm text-[#444E60] leading-relaxed mb-6 font-medium">
                {t.modal.successDesc}
              </p>
              <button
                onClick={onClose}
                className="px-6 py-2.5 rounded-lg bg-[#2B3340] hover:bg-[#1B222C] text-white text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
              >
                {t.modal.closeBtn}
              </button>
            </div>
          ) : (
            <div>
              {/* Modal Header */}
              <div className="mb-6">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-[#FDECEE] text-[#E71B26] text-[10px] font-dela uppercase tracking-wider mb-2">
                  <span>{t.modal.badge}</span>
                </div>
                <h3 className="text-lg sm:text-xl font-black text-[#2B3340] font-dela uppercase leading-tight">
                  {t.modal.title}
                </h3>
                <p className="text-xs text-[#647082] mt-1 font-medium">
                  {t.modal.subtitle}
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div>
                  <label className="block text-[11px] font-dela text-[#2B3340] uppercase tracking-wider mb-1">
                    {t.modal.serviceLabel}
                  </label>
                  <select
                    value={service}
                    onChange={(e) => setService(e.target.value)}
                    className="w-full bg-[#ECEEF0] border border-[#D5D9DE] rounded-lg px-3.5 py-2.5 text-xs text-[#2B3340] font-semibold focus:outline-none focus:border-[#E71B26]"
                  >
                    {t.modal.serviceOptions.map((opt, i) => (
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
                      className="w-full bg-[#ECEEF0] border border-[#D5D9DE] rounded-lg px-3.5 py-2.5 text-xs text-[#2B3340] placeholder-slate-400 focus:outline-none focus:border-[#E71B26]"
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
                      className="w-full bg-[#ECEEF0] border border-[#D5D9DE] rounded-lg px-3.5 py-2.5 text-xs text-[#2B3340] placeholder-slate-400 focus:outline-none focus:border-[#E71B26]"
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
                      className="w-full bg-[#ECEEF0] border border-[#D5D9DE] rounded-lg px-3.5 py-2.5 text-xs text-[#2B3340] placeholder-slate-400 focus:outline-none focus:border-[#E71B26]"
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
                      className="w-full bg-[#ECEEF0] border border-[#D5D9DE] rounded-lg px-3.5 py-2.5 text-xs text-[#2B3340] placeholder-slate-400 focus:outline-none focus:border-[#E71B26]"
                    />
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
                    className="w-full bg-[#ECEEF0] border border-[#D5D9DE] rounded-lg px-3.5 py-2 text-xs text-[#2B3340] placeholder-slate-400 focus:outline-none focus:border-[#E71B26]"
                  />
                </div>

                {/* File Upload in Modal */}
                <div>
                  <label className="block text-[11px] font-bold text-[#444E60] uppercase tracking-wider mb-1">
                    {t.modal.attachLabel}
                  </label>
                  <div className="border border-dashed border-[#D5D9DE] hover:border-[#E71B26] rounded-lg p-3 text-center bg-[#ECEEF0] transition-colors">
                    <input
                      type="file"
                      id="modal-file-upload"
                      multiple
                      onChange={handleFile}
                      className="hidden"
                    />
                    <label htmlFor="modal-file-upload" className="cursor-pointer flex items-center justify-center gap-2 text-xs text-[#2B3340] font-semibold">
                      <Upload className="w-4 h-4 text-[#E71B26]" />
                      <span>{files.length > 0 ? `${t.modal.filesCountLabel} ${files.length}` : t.modal.chooseFileLabel}</span>
                    </label>
                  </div>
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center gap-2 py-3.5 rounded-lg bg-[#E71B26] hover:bg-[#C9141E] text-white font-extrabold text-xs uppercase tracking-wider shadow-sm transition-all cursor-pointer mt-4"
                >
                  <Send className="w-4 h-4" />
                  <span>{t.modal.submitBtn}</span>
                </button>

                <div className="flex items-center justify-center gap-2 text-[10px] text-[#647082] pt-1">
                  <Clock className="w-3.5 h-3.5 text-[#E71B26]" />
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
