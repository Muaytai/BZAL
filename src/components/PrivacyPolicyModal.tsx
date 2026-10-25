import React, { useState, useEffect } from 'react';
import { ShieldCheck, X, Lock, FileText, CheckCircle2, Globe } from 'lucide-react';
import { Language } from '../types';

interface PrivacyPolicyModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentLang: Language;
}

export const PrivacyPolicyModal: React.FC<PrivacyPolicyModalProps> = ({
  isOpen,
  onClose,
  currentLang,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[75] flex items-center justify-center p-4 bg-black/65 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl bg-white border border-[#D5D9DE] rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
        {/* Top Chevron Ribbon */}
        <div className="h-2 w-full bzal-ribbon-red-white shrink-0" />

        {/* Header */}
        <div className="px-6 py-4 bg-[#2B3340] text-white flex items-center justify-between gap-4 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-[#E95A0C] flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="text-[10px] font-dela uppercase tracking-wider text-[#BAC5CF]">
                {currentLang === 'ru'
                  ? 'Закон Республики Беларусь от 07.05.2021 № 99-З • Указ № 60'
                  : currentLang === 'en'
                    ? 'Law of the Republic of Belarus No. 99-Z • Decree No. 60'
                    : '白俄罗斯共和国第99-Z号个人数据保护法'}
              </div>
              <h3 className="text-sm sm:text-base font-dela uppercase text-white">
                {currentLang === 'ru'
                  ? 'Политика защиты персональных данных и файлов Cookie ОАО БЗАЛ'
                  : currentLang === 'en'
                    ? 'Personal Data & Cookie Protection Policy of JSC BZAL'
                    : 'BZAL 个人数据与 Cookie 保护政策'}
              </h3>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-lg bg-[#1B222C] hover:bg-[#E95A0C] text-white transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-5 text-xs sm:text-sm text-[#2B3340] leading-relaxed">
          <div className="p-4 rounded-xl bg-[#ECEEF0] border border-[#D5D9DE] flex flex-wrap items-center justify-between gap-3">
            <div>
              <div className="font-extrabold text-[#2B3340]">
                {currentLang === 'ru'
                  ? 'Оператор персональных данных: ОАО «Барановичский завод автоматических линий» (ОАО БЗАЛ)'
                  : currentLang === 'en'
                    ? 'Data Controller: JSC Baranovichi Automatic Lines Plant (JSC BZAL)'
                    : '个人数据控制方：巴拉诺维奇自动线厂股份有限公司 (BZAL)'}
              </div>
              <div className="text-xs text-[#647082] mt-0.5">
                {currentLang === 'ru'
                  ? 'УНП 200166530 • Юридический адрес: 225410, Республика Беларусь, Брестская обл., г. Барановичи, ул. Королика, 8'
                  : currentLang === 'en'
                    ? 'Tax ID (UNP) 200166530 • Legal Address: 8 Korolika Str., 225410, Baranovichi, Brest Region, Republic of Belarus'
                    : '税号 UNP 200166530 • 法定地址：白俄罗斯布列斯特州巴拉诺维奇市科罗利卡街8号 (225410)'}
              </div>
            </div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-emerald-100 text-emerald-800 text-xs font-extrabold">
              <Lock className="w-3.5 h-3.5" />
              <span>
                {currentLang === 'ru'
                  ? 'HTTPS / TLS 1.3 Защищено'
                  : currentLang === 'en'
                    ? 'HTTPS / TLS 1.3 Secured'
                    : 'HTTPS / TLS 1.3 安全加密'}
              </span>
            </span>
          </div>

          <div className="space-y-2">
            <h4 className="font-dela text-xs sm:text-sm uppercase text-[#2B3340]">
              {currentLang === 'ru'
                ? '1. Общие положения и правовые основания (Закон РБ № 99-З)'
                : currentLang === 'en'
                  ? '1. General Provisions & Legal Basis (Belarus Law No. 99-Z)'
                  : '1. 总则与法律依据（白俄罗斯第99-Z号法律）'}
            </h4>
            <p className="text-[#444E60]">
              {currentLang === 'ru'
                ? 'Настоящая Политика разработана во исполнение требований Закона Республики Беларусь от 7 мая 2021 г. № 99-З «О защите персональных данных», Указа Президента Республики Беларусь от 1 февраля 2010 г. № 60 «О мерах по совершенствованию использования национального сегмента сети Интернет» и Постановления Совета Министров Республики Беларусь от 29 апреля 2010 г. № 645.'
                : currentLang === 'en'
                  ? 'This Policy is established in compliance with the Law of the Republic of Belarus dated May 7, 2021 No. 99-Z "On Personal Data Protection", Presidential Decree No. 60, and Council of Ministers Resolution No. 645.'
                  : '本政策依据白俄罗斯共和国2021年5月7日第99-Z号《个人数据保护法》、总统令第60号及部长会议第645号决议制定。'}
            </p>
          </div>

          <div className="space-y-2">
            <h4 className="font-dela text-xs sm:text-sm uppercase text-[#2B3340]">
              {currentLang === 'ru'
                ? '2. Цели и объём обрабатываемых данных при подаче коммерческих заявок (ТЗ)'
                : currentLang === 'en'
                  ? '2. Scope & Purpose of Data Processing for Commercial Inquiries (RFQ)'
                  : '2. 商业询价 (RFQ) 数据处理的目的与范围'}
            </h4>
            <p className="text-[#444E60]">
              {currentLang === 'ru'
                ? 'При заполнении форм расчёта стоимости (RFQ), отправке чертежей и заказе технического паспорта завода на сайте обрабатываются исключительно данные, необходимые для подготовки технико-коммерческого предложения (ТКП) и связи с представителем заказчика: ФИО контактного лица, наименование организации, контактный телефон, адрес электронной почты и прикреплённая конструкторско-технологическая документация.'
                : currentLang === 'en'
                  ? 'When submitting RFQ forms, engineering drawings, or requesting the plant capability passport, we process only the data strictly required to prepare an official quotation and contact your representative: contact name, company name, phone number, email address, and attached CAD/technical documentation.'
                  : '在提交在线询价表、工程图纸或下载工厂能力手册时，我们仅处理编制正式报价单及联系贵方代表所必需的数据：联系人姓名、企业名称、电话号码、电子邮箱及所附技术图纸文件。'}
            </p>
          </div>

          <div className="space-y-2">
            <h4 className="font-dela text-xs sm:text-sm uppercase text-[#2B3340]">
              {currentLang === 'ru'
                ? '3. Порядок подачи электронных обращений граждан и юридических лиц (Закон РБ № 300-З)'
                : currentLang === 'en'
                  ? '3. Electronic Appeals of Citizens & Legal Entities (Belarus Law No. 300-Z)'
                  : '3. 公民与法人电子申诉程序（白俄罗斯第300-Z号法律）'}
            </h4>
            <p className="text-[#444E60]">
              {currentLang === 'ru'
                ? 'В соответствии с Законом Республики Беларусь от 18 июля 2011 г. № 300-З «Об обращениях граждан и юридических лиц» (в редакции от 2 января 2023 г.) подача официальных электронных обращений граждан и юридических лиц осуществляется через государственную единую (интегрированную) республиканскую информационную систему учета и обработки обращений граждан и юридических лиц — '
                : currentLang === 'en'
                  ? 'In accordance with the Law of the Republic of Belarus No. 300-Z "On Appeals of Citizens and Legal Entities" (as amended January 2, 2023), official electronic appeals are submitted via the Unified State Electronic Appeals System — '
                  : '根据白俄罗斯共和国第300-Z号法律（2023年1月2日修订版），公民和法人的正式电子申诉统一通过白俄罗斯国家电子申诉系统提交 — '}
              <a
                href="https://обращения.бел"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#E95A0C] font-extrabold underline hover:text-[#2B3340]"
              >
                обращения.бел
              </a>
              .
            </p>
          </div>

          <div className="space-y-2">
            <h4 className="font-dela text-xs sm:text-sm uppercase text-[#2B3340]">
              {currentLang === 'ru'
                ? '4. Обработка технических файлов Cookie и защита соединения (HTTPS/SSL)'
                : currentLang === 'en'
                  ? '4. Technical Cookies & Connection Security (HTTPS/SSL)'
                  : '4. 技术性 Cookie 处理与连接安全 (HTTPS/SSL)'}
            </h4>
            <p className="text-[#444E60]">
              {currentLang === 'ru'
                ? 'Официальный сайт ОАО БЗАЛ использует защищённый протокол передачи данных HTTPS с криптографическим сертификатом SSL/TLS. Технические файлы cookie (выбранный язык интерфейса, настройки версии для слабовидящих по СТБ 2105) хранятся локально в браузере пользователя и не передаются третьим лицам.'
                : currentLang === 'en'
                  ? 'The official website of JSC BZAL uses encrypted HTTPS communication with SSL/TLS certificates. Technical cookies (selected interface language, STB 2105 accessibility preferences) are stored locally in your browser and are never shared with third parties.'
                  : 'BZAL 官方网站使用带有 SSL/TLS 证书的 HTTPS 加密传输协议。技术性 Cookie（所选界面语言、无障碍浏览设置）仅保存在您的浏览器本地，绝不向第三方传输。'}
            </p>
          </div>

          <div className="space-y-2">
            <h4 className="font-dela text-xs sm:text-sm uppercase text-[#2B3340]">
              {currentLang === 'ru'
                ? '5. Права субъектов персональных данных'
                : currentLang === 'en'
                  ? '5. Rights of Data Subjects'
                  : '5. 个人数据主体的权利'}
            </h4>
            <p className="text-[#444E60]">
              {currentLang === 'ru'
                ? 'Субъект персональных данных вправе в любое время отозвать согласие на обработку персональных данных, запросить информацию об их обработке, требовать внесения изменений или удаления данных путём направления письменного заявления по адресу: 225410, г. Барановичи, ул. Королика, 8 либо через систему '
                : currentLang === 'en'
                  ? 'Data subjects have the right at any time to withdraw consent, request information on data processing, or request correction/deletion by sending a written notice to: 8 Korolika Str., 225410, Baranovichi, Belarus or via '
                  : '个人数据主体有权随时撤回同意、查询数据处理情况或要求更正/删除数据，请寄送书面申请至：225410, Baranovichi, 8 Korolika Str. 或通过 '}
              <a
                href="https://обращения.бел"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#E95A0C] font-extrabold underline"
              >
                обращения.бел
              </a>
              .
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-[#F8F9FA] border-t border-[#D5D9DE] flex items-center justify-between gap-4 shrink-0">
          <div className="text-xs text-[#647082] font-semibold">
            {currentLang === 'ru'
              ? 'ОАО «Барановичский завод автоматических линий» • УНП 200166530'
              : currentLang === 'en'
                ? 'JSC Baranovichi Automatic Lines Plant (JSC BZAL) • UNP 200166530'
                : '巴拉诺维奇自动线厂股份有限公司 (BZAL) • UNP 200166530'}
          </div>
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 rounded-lg bg-[#E95A0C] hover:bg-[#CC4B06] text-white text-xs font-extrabold uppercase tracking-wider cursor-pointer"
          >
            {currentLang === 'ru' ? 'Понятно, закрыть' : currentLang === 'en' ? 'Close' : '关闭'}
          </button>
        </div>
      </div>
    </div>
  );
};

const COOKIE_CONSENT_KEY = 'bzal_cookie_consent_99z_v1';

interface CookieConsentBannerProps {
  currentLang: Language;
  onOpenPolicy: () => void;
}

export const CookieConsentBanner: React.FC<CookieConsentBannerProps> = ({
  currentLang,
  onOpenPolicy,
}) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const accepted = localStorage.getItem(COOKIE_CONSENT_KEY);
      if (!accepted) {
        setVisible(true);
      }
    } catch {
      setVisible(false);
    }
  }, []);

  if (!visible) return null;

  const handleAccept = () => {
    try {
      localStorage.setItem(COOKIE_CONSENT_KEY, 'accepted');
    } catch {
      // ignore
    }
    setVisible(false);
  };

  return (
    <div className="fixed bottom-3 left-3 right-3 sm:left-6 sm:right-auto sm:max-w-xl z-40 bg-[#1B222C] text-white border border-white/15 rounded-xl p-4 shadow-2xl">
      <div className="flex items-start gap-3">
        <ShieldCheck className="w-5 h-5 text-[#E95A0C] shrink-0 mt-0.5" />
        <div className="flex-1 text-xs leading-relaxed text-[#BAC5CF]">
          <div className="font-extrabold text-white mb-1">
            {currentLang === 'ru'
              ? 'Защита персональных данных и файлов Cookie (Закон РБ № 99-З)'
              : currentLang === 'en'
                ? 'Personal Data & Cookie Compliance (Belarus Law No. 99-Z)'
                : '个人数据与 Cookie 合规声明 (白俄罗斯第99-Z号法)'}
          </div>
          <p>
            {currentLang === 'ru'
              ? 'Мы используем технические файлы cookie (включая настройки версии для слабовидящих СТБ 2105) и защищённое соединение HTTPS/SSL в соответствии с законодательством Республики Беларусь.'
              : currentLang === 'en'
                ? 'We use technical cookies (including accessibility settings) and HTTPS/SSL encryption in compliance with the legislation of the Republic of Belarus.'
                : '本网站根据白俄罗斯共和国法律使用技术性 Cookie 及 HTTPS/SSL 安全加密连接。'}
          </p>
          <div className="mt-3 flex flex-wrap items-center gap-2.5">
            <button
              type="button"
              onClick={handleAccept}
              className="px-4 py-1.5 rounded-lg bg-[#E95A0C] hover:bg-[#CC4B06] text-white font-extrabold text-xs uppercase tracking-wider cursor-pointer"
            >
              {currentLang === 'ru' ? 'Принять' : currentLang === 'en' ? 'Accept' : '同意'}
            </button>
            <button
              type="button"
              onClick={onOpenPolicy}
              className="px-3 py-1.5 rounded-lg bg-[#2B3340] hover:bg-[#444E60] text-white font-bold text-xs underline cursor-pointer"
            >
              {currentLang === 'ru'
                ? 'Политика обработки ПДн (Закон № 99-З)'
                : currentLang === 'en'
                  ? 'Privacy Policy (Law No. 99-Z)'
                  : '隐私政策'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
