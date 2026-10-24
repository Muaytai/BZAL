import React from 'react';
import {
  ExternalLink,
  ShieldCheck,
  Building2,
  Users,
  FileText,
  Scale,
  Clock,
  Phone,
  Mail,
  MapPin,
  Lock,
  CheckCircle2,
  AlertCircle,
  Send,
} from 'lucide-react';
import { Language } from '../types';

export interface OfficialGovLink {
  id: string;
  titleRu: string;
  titleEn: string;
  titleZh: string;
  subRu: string;
  subEn: string;
  subZh: string;
  url: string;
  domain: string;
  badgeRu: string;
  highlight?: boolean;
}

export const MANDATORY_BELARUS_GOV_LINKS: OfficialGovLink[] = [
  {
    id: 'obrascheniya',
    titleRu: 'Государственная единая система электронных обращений',
    titleEn: 'Unified State Electronic Appeals System of Belarus',
    titleZh: '白俄罗斯国家统一电子申诉系统',
    subRu: 'Подача электронных обращений граждан и юридических лиц (с 02.01.2023, Закон РБ № 300-З)',
    subEn: 'Mandatory portal for electronic appeals of citizens and legal entities (since 02.01.2023)',
    subZh: '公民与法人电子申诉官方统一门户（自2023年1月2日起强制要求）',
    url: 'https://обращения.бел',
    domain: 'обращения.бел',
    badgeRu: 'Обязательный ресурс РБ',
    highlight: true,
  },
  {
    id: 'president',
    titleRu: 'Официальный интернет-портал Президента Республики Беларусь',
    titleEn: 'Official Internet Portal of the President of the Republic of Belarus',
    titleZh: '白俄罗斯共和国总统官方门户网站',
    subRu: 'Официальные указы, государственная политика и пресс-служба Главы государства',
    subEn: 'Official decrees, state policy and press service of the Head of State',
    subZh: '国家元首官方政令与新闻中心',
    url: 'https://president.gov.by',
    domain: 'president.gov.by',
    badgeRu: 'Государственный портал',
    highlight: true,
  },
  {
    id: 'rw',
    titleRu: 'ГО «Белорусская железная дорога» (Вышестоящее объединение)',
    titleEn: 'Belarusian Railway State Association (Higher Authority)',
    titleZh: '白俄罗斯国家铁路集团（上级主管部门）',
    subRu: 'Государственное объединение, в состав которого входит ОАО БЗАЛ',
    subEn: 'Higher governing state association of JSC BZAL',
    subZh: 'BZAL 所属上级国家铁路联合体',
    url: 'https://www.rw.by',
    domain: 'rw.by',
    badgeRu: 'Вышестоящий орган',
  },
  {
    id: 'minprom',
    titleRu: 'Министерство промышленности Республики Беларусь',
    titleEn: 'Ministry of Industry of the Republic of Belarus',
    titleZh: '白俄罗斯共和国工业部',
    subRu: 'Республиканский орган государственного управления промышленным комплексом',
    subEn: 'Republican state authority for machine-building and industry',
    subZh: '白俄罗斯国家工业与机械制造主管部门',
    url: 'https://minprom.gov.by',
    domain: 'minprom.gov.by',
    badgeRu: 'Отраслевое министерство',
  },
  {
    id: 'brest',
    titleRu: 'Брестский областной исполнительный комитет',
    titleEn: 'Brest Regional Executive Committee',
    titleZh: '布列斯特州执行委员会',
    subRu: 'Официальный портал исполнительной власти Брестской области и г. Барановичи',
    subEn: 'Official regional executive authority portal of Brest Region',
    subZh: '布列斯特州地方政府官方门户',
    url: 'https://brest-region.gov.by',
    domain: 'brest-region.gov.by',
    badgeRu: 'Облисполком',
  },
  {
    id: 'baranovichi',
    titleRu: 'Барановичский городской исполнительный комитет',
    titleEn: 'Baranovichi City Executive Committee',
    titleZh: '巴拉诺维奇市执行委员会',
    subRu: 'Местный исполнительный и распорядительный орган г. Барановичи',
    subEn: 'Local executive authority of Baranovichi city',
    subZh: '巴拉诺维奇市政府官方网站',
    url: 'https://baranovichi-gik.gov.by',
    domain: 'baranovichi-gik.gov.by',
    badgeRu: 'Горисполком',
  },
  {
    id: 'pravo',
    titleRu: 'Национальный правовой Интернет-портал Республики Беларусь',
    titleEn: 'National Legal Internet Portal of the Republic of Belarus',
    titleZh: '白俄罗斯国家法律门户网站',
    subRu: 'Официальное опубликование законов, указов и постановлений РБ (НЦЗПИ)',
    subEn: 'Official publication of legislation and regulatory acts of Belarus',
    subZh: '白俄罗斯法律法规官方发布平台',
    url: 'https://pravo.by',
    domain: 'pravo.by',
    badgeRu: 'Законодательство РБ',
  },
  {
    id: 'kachestvo',
    titleRu: 'Портал рейтинговой оценки качества оказания услуг организациями РБ',
    titleEn: 'State Service Quality Rating Portal of Belarus',
    titleZh: '白俄罗斯国家机构服务质量评价门户',
    subRu: 'Оценка эффективности деятельности организаций гражданами Республики Беларусь',
    subEn: 'Public quality assessment portal for organizations in Belarus',
    subZh: '公众服务质量评估系统',
    url: 'https://качество-услуг.бел',
    domain: 'качество-услуг.бел',
    badgeRu: 'Рейтинговая оценка',
  },
];

interface GovLinksBannerProps {
  currentLang: Language;
  onOpenGovSection?: () => void;
}

/**
 * Compact Mandatory State Resources Bar placed directly on the Main Page (Home)
 * and in Contacts so `обращения.бел`, `president.gov.by` and higher authorities
 * are immediately accessible with visually distinct hyperlinks.
 */
export const GovLinksBanner: React.FC<GovLinksBannerProps> = ({
  currentLang,
  onOpenGovSection,
}) => {
  return (
    <div className="mt-8 pt-6 border-t border-[#D5D9DE]">
      <div className="rounded-xl bg-white border-2 border-[#2B3340] p-4 sm:p-5 shadow-md">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 pb-3.5 mb-3.5 border-b border-[#E2E5E8]">
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#E71B26] shrink-0" />
            <h2 className="text-xs sm:text-sm font-dela uppercase text-[#2B3340] tracking-wide">
              {currentLang === 'ru'
                ? 'Государственные информационные ресурсы РБ и электронные обращения граждан'
                : currentLang === 'en'
                  ? 'Official State Portals of Belarus & Electronic Appeals System'
                  : '白俄罗斯共和国官方政务门户与电子申诉系统'}
            </h2>
          </div>

          {onOpenGovSection && (
            <button
              type="button"
              onClick={onOpenGovSection}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#2B3340] hover:bg-[#E71B26] text-white text-[11px] font-extrabold uppercase tracking-wider transition-colors cursor-pointer self-start lg:self-auto"
            >
              <Scale className="w-3.5 h-3.5 text-[#E71B26] shrink-0" />
              <span>
                {currentLang === 'ru'
                  ? 'График приёма руководства, структура и НПА РБ →'
                  : currentLang === 'en'
                    ? 'Management Reception, Structure & Legal Info →'
                    : '管理层接待日程、组织架构与法规 →'}
              </span>
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
          {MANDATORY_BELARUS_GOV_LINKS.slice(0, 4).map((item) => (
            <a
              key={item.id}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`group p-3 rounded-lg border transition-all flex flex-col justify-between ${
                item.highlight
                  ? 'bg-[#FDECEE]/60 border-[#E71B26] hover:bg-[#FDECEE]'
                  : 'bg-[#F8F9FA] border-[#D5D9DE] hover:border-[#2B3340] hover:bg-white'
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-1">
                  <span className="px-2 py-0.5 rounded bg-[#2B3340] text-white text-[10px] font-extrabold uppercase">
                    {item.domain}
                  </span>
                  <ExternalLink className="w-3.5 h-3.5 text-[#E71B26] shrink-0 group-hover:translate-x-0.5 transition-transform" />
                </div>
                <div className="text-xs font-extrabold text-[#2B3340] group-hover:text-[#E71B26] underline decoration-[#E71B26]/60 underline-offset-2 leading-snug">
                  {currentLang === 'ru'
                    ? item.titleRu
                    : currentLang === 'en'
                      ? item.titleEn
                      : item.titleZh}
                </div>
              </div>
              <div className="text-[11px] text-[#647082] mt-1.5 font-medium leading-tight">
                {currentLang === 'ru'
                  ? item.subRu
                  : currentLang === 'en'
                    ? item.subEn
                    : item.subZh}
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

interface GovComplianceSectionProps {
  currentLang: Language;
  onOpenRfq: () => void;
  onOpenPrivacyPolicy: () => void;
}

export const GovComplianceSection: React.FC<GovComplianceSectionProps> = ({
  currentLang,
  onOpenRfq,
  onOpenPrivacyPolicy,
}) => {
  const managementSchedule = [
    {
      role: 'Директор ОАО БЗАЛ',
      dept: 'Руководство предприятием, стратегическое развитие и гособоронзаказ / ВЭД',
      day: 'Первая и третья среда месяца',
      hours: '08:00 – 13:00',
      room: 'Приёмная руководителя (административный корпус, 2 этаж)',
      phone: '+375 (163) 67-20-41',
    },
    {
      role: 'Главный инженер — первый заместитель директора',
      dept: 'Техническая политика, ОГК, ОГТ, станочный парк ЧПУ, автоматические линии и модернизация',
      day: 'Второй и четвёртый вторник месяца',
      hours: '08:00 – 13:00',
      room: 'Кабинет главного инженера (административный корпус)',
      phone: '+375 (163) 67-20-41',
    },
    {
      role: 'Заместитель директора по коммерческим вопросам',
      dept: 'Материально-техническое снабжение, маркетинг, продажи, кооперация и экспорт ЕАЭС',
      day: 'Каждый четверг месяца',
      hours: '08:00 – 13:00',
      room: 'Отдел маркетинга и продаж',
      phone: '+375 44 751 44 77 / +375 (163) 67-20-92',
    },
    {
      role: 'Заместитель директора по идеологической работе, кадрам и социальным вопросам',
      dept: 'Кадровая политика, трудовые отношения, административные процедуры (Указ № 200), обращения граждан',
      day: 'Каждый понедельник месяца',
      hours: '08:00 – 13:00',
      room: 'Отдел кадров и социального развития',
      phone: '+375 (163) 67-20-41',
    },
    {
      role: 'Главный бухгалтер',
      dept: 'Финансово-экономическая деятельность, взаиморасчёты с контрагентами, отчётность ОАО',
      day: 'Каждая пятница месяца',
      hours: '08:00 – 12:00',
      room: 'Главная бухгалтерия',
      phone: '+375 (163) 67-20-48 (факс)',
    },
  ];

  const structureDepartments = [
    {
      code: 'АУП',
      name: 'Административно-управленческий аппарат и приёмная',
      desc: 'Общее руководство, делопроизводство, контроль исполнения поручений и работа с обращениями граждан по системе «Одно окно».',
    },
    {
      code: 'ОГК и ОГТ',
      name: 'Отдел главного конструктора и Отдел главного технолога',
      desc: 'Проектирование специальных станков, автоматических линий, технологической оснастки и разработка управляющих программ ЧПУ.',
    },
    {
      code: 'ОМиП',
      name: 'Отдел маркетинга и продаж (ВЭД и кооперация)',
      desc: 'Приём заявок и чертежей заказчиков, расчёт ТКП, заключение прямых контрактов и отгрузка продукции в РБ, РФ и страны ЕАЭС.',
    },
    {
      code: 'ОТК и ЦЗЛ',
      name: 'Отдел технического контроля и Центральная заводская лаборатория',
      desc: 'Входной контроль металлопроката, операционный и приёмочный контроль по СТБ ISO 9001-2015, паспортизация изделий.',
    },
    {
      code: 'МСП',
      name: 'Механосборочное производство и инструментальный участок',
      desc: 'Токарная, фрезерная, расточная, зуборезная, шлифовальная обработка, термообработка ТВЧ и сборка узлов.',
    },
    {
      code: 'ОК и ОТиЗ',
      name: 'Отдел кадров, охраны труда и идеологической работы',
      desc: 'Осуществление административных процедур по заявлениям работников и граждан (Указ № 200), охрана труда и промбезопасность.',
    },
  ];

  return (
    <section className="py-8 sm:py-10 bg-white border-b border-[#D5D9DE]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* 1. Header & Official Enterprise Identification */}
        <div className="rounded-2xl bg-[#2B3340] text-white p-6 sm:p-8 border border-[#1B222C] shadow-lg relative overflow-hidden">
          <div className="h-2 w-full bzal-ribbon-red-white absolute top-0 left-0 right-0" />
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center pt-2">
            <div className="lg:col-span-8 space-y-3">
              <div className="inline-flex flex-wrap items-center gap-2 px-3 py-1 rounded bg-[#E71B26] text-white text-[11px] font-dela uppercase tracking-wider">
                <span>Указ Президента РБ № 60 • Постановление СМ РБ № 645 • Закон № 300-З</span>
              </div>
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-dela uppercase text-white leading-tight">
                Официальные сведения о предприятии, обращения граждан и государственные ресурсы РБ
              </h2>
              <p className="text-xs sm:text-sm text-[#BAC5CF] leading-relaxed font-medium">
                Раздел сформирован в соответствии с требованиями законодательства Республики Беларусь к официальным интернет-сайтам государственных организаций и хозяйственных обществ с долей государства (СТБ 2105, Закон РБ № 300-З «Об обращениях граждан и юридических лиц», Закон РБ № 99-З «О защите персональных данных»).
              </p>
            </div>

            <div className="lg:col-span-4 bg-[#1B222C] rounded-xl p-4 border border-white/10 space-y-2 text-xs">
              <div className="font-dela text-white uppercase text-xs">
                Реквизиты юридического лица:
              </div>
              <div className="text-[#BAC5CF]">
                <strong className="text-white">Полное наименование:</strong> Открытое акционерное общество «Барановичский завод автоматических линий»
              </div>
              <div className="text-[#BAC5CF]">
                <strong className="text-white">Сокращённое:</strong> ОАО БЗАЛ (УНП 200166530)
              </div>
              <div className="text-[#BAC5CF]">
                <strong className="text-white">Вышестоящее объединение:</strong> ГО «Белорусская железная дорога» (rw.by)
              </div>
              <div className="text-[#BAC5CF]">
                <strong className="text-white">Режим работы:</strong> Пн–Пт 08:00–16:30 (обед 12:30–13:00), Сб–Вс выходной
              </div>
            </div>
          </div>
        </div>

        {/* 2. Electronic Appeals System (обращения.бел) & Appeal / Complaint Procedure */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          <div className="lg:col-span-7 rounded-2xl bg-[#FDECEE]/50 border-2 border-[#E71B26] p-6 sm:p-7 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="px-3 py-1 rounded bg-[#E71B26] text-white text-xs font-dela uppercase">
                  Действует со 2 января 2023 года
                </span>
                <span className="text-xs font-extrabold text-[#2B3340]">
                  Закон Республики Беларусь от 18.07.2011 № 300-З
                </span>
              </div>

              <h3 className="text-lg sm:text-xl font-dela uppercase text-[#2B3340]">
                Единая система электронных обращений граждан и юридических лиц — обращения.бел
              </h3>

              <p className="text-xs sm:text-sm text-[#2B3340] leading-relaxed font-medium">
                Со 2 января 2023 года в соответствии с Законом Республики Беларусь от 28.06.2022 № 176-З подача электронных обращений граждан и юридических лиц в государственные органы и иные государственные организации осуществляется <strong>исключительно через государственную единую (интегрированную) республиканскую информационную систему учета и обработки обращений граждан и юридических лиц</strong>.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3.5 rounded-xl bg-white border border-[#D5D9DE]">
                  <div className="font-extrabold text-[#2B3340] mb-1">
                    Сроки рассмотрения обращений:
                  </div>
                  <p className="text-[#444E60]">
                    Письменные и электронные обращения рассматриваются не позднее <strong>15 дней</strong>, а требующие дополнительного изучения и проверки — не позднее <strong>1 месяца</strong> (ст. 17 Закона № 300-З).
                  </p>
                </div>
                <div className="p-3.5 rounded-xl bg-white border border-[#D5D9DE]">
                  <div className="font-extrabold text-[#2B3340] mb-1">
                    Письменные обращения по почте:
                  </div>
                  <p className="text-[#444E60]">
                    Направляются по адресу: <strong>225409, Брестская обл., г. Барановичи, ул. Королика, 8</strong>, ОАО БЗАЛ. Книга замечаний и предложений находится в приёмной директора.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-[#E71B26]/20 flex flex-wrap items-center gap-3">
              <a
                href="https://обращения.бел"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#E71B26] hover:bg-[#C9141E] text-white font-extrabold text-xs uppercase tracking-wider shadow-md underline decoration-white/70 underline-offset-4 transition-all"
              >
                <span>Перейти на портал обращения.бел</span>
                <ExternalLink className="w-4 h-4" />
              </a>

              <button
                type="button"
                onClick={onOpenRfq}
                className="inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-[#2B3340] hover:bg-[#1B222C] text-white font-bold text-xs uppercase tracking-wider transition-all cursor-pointer"
              >
                <Send className="w-3.5 h-3.5 text-[#E71B26]" />
                <span>Коммерческая заявка в отдел маркетинга и продаж (ТЗ)</span>
              </button>
            </div>
          </div>

          {/* Order of Appealing Decisions */}
          <div className="lg:col-span-5 rounded-2xl bg-[#ECEEF0] border border-[#D5D9DE] p-6 sm:p-7 flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 text-xs font-dela uppercase text-[#E71B26]">
                <Scale className="w-4 h-4" />
                <span>Статья 20 Закона РБ № 300-З</span>
              </div>
              <h3 className="text-base sm:text-lg font-dela uppercase text-[#2B3340]">
                Порядок обжалования ответов и решений по обращениям
              </h3>
              <p className="text-xs text-[#444E60] leading-relaxed font-medium">
                Ответ ОАО БЗАЛ на обращение или решение об оставлении обращения без рассмотрения по существу могут быть обжалованы заявителем в вышестоящую организацию:
              </p>

              <div className="p-4 rounded-xl bg-white border border-[#D5D9DE] space-y-2 text-xs">
                <div className="font-extrabold text-[#2B3340]">
                  Вышестоящая организация: Государственное объединение «Белорусская железная дорога»
                </div>
                <div className="text-[#444E60]">
                  Адрес: 220030, г. Минск, ул. Ленина, 17 • Режим работы: Пн–Пт 09:00–18:00
                </div>
                <div className="flex flex-wrap items-center gap-3 pt-1">
                  <a
                    href="https://www.rw.by"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#E71B26] font-extrabold underline hover:text-[#2B3340] inline-flex items-center gap-1"
                  >
                    <span>Официальный сайт www.rw.by</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                  <a
                    href="https://minprom.gov.by"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#2B3340] font-extrabold underline hover:text-[#E71B26] inline-flex items-center gap-1"
                  >
                    <span>Минпром РБ minprom.gov.by</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>

              <p className="text-xs text-[#444E60] leading-relaxed">
                После рассмотрения обращения в вышестоящей организации ответ на жалобу может быть обжалован в <strong>суд Барановичского района и г. Барановичи</strong> в порядке, установленном гражданским процессуальным или хозяйственным процессуальным законодательством Республики Беларусь.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-white border border-[#D5D9DE] flex items-center justify-between gap-2 text-xs">
              <span className="font-bold text-[#2B3340]">
                Предварительная запись на личный приём:
              </span>
              <a
                href="tel:+375163672041"
                className="font-extrabold text-[#E71B26] underline"
              >
                +375 (163) 67-20-41
              </a>
            </div>
          </div>
        </div>

        {/* 3. Mandatory Hyperlinks to State Portals & Affiliated Organizations */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
            <div>
              <div className="text-xs font-dela uppercase text-[#E71B26]">
                Обязательные государственные интернет-ресурсы
              </div>
              <h3 className="text-lg sm:text-2xl font-dela uppercase text-[#2B3340] mt-1">
                Ссылки на портал Президента РБ, вышестоящие органы и партнёрские организации
              </h3>
            </div>
            <span className="text-xs font-semibold text-[#647082]">
              Все внешние гиперссылки визуально выделены и открываются в новой вкладке
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {MANDATORY_BELARUS_GOV_LINKS.map((link) => (
              <a
                key={link.id}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`group p-4 rounded-xl border-2 transition-all flex flex-col justify-between shadow-xs hover:shadow-md ${
                  link.highlight
                    ? 'bg-[#FDECEE]/40 border-[#E71B26]'
                    : 'bg-white border-[#D5D9DE] hover:border-[#2B3340]'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="px-2 py-0.5 rounded bg-[#2B3340] text-white text-[10px] font-extrabold uppercase">
                      {link.badgeRu}
                    </span>
                    <ExternalLink className="w-4 h-4 text-[#E71B26] shrink-0 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                  <div className="text-xs sm:text-sm font-extrabold text-[#2B3340] group-hover:text-[#E71B26] underline decoration-[#E71B26] underline-offset-3 leading-snug">
                    {link.titleRu}
                  </div>
                  <p className="text-[11px] text-[#647082] mt-2 leading-relaxed font-medium">
                    {link.subRu}
                  </p>
                </div>

                <div className="mt-3 pt-2.5 border-t border-[#E2E5E8] flex items-center justify-between text-[11px] font-extrabold text-[#E71B26]">
                  <span className="underline">{link.domain}</span>
                  <span>Перейти ↗</span>
                </div>
              </a>
            ))}
          </div>

          {/* Official Enterprise & Affiliated Portals */}
          <div className="p-4 sm:p-5 rounded-xl bg-[#ECEEF0] border border-[#D5D9DE] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="text-xs font-dela uppercase text-[#2B3340]">
                Официальные интернет-ресурсы и специализированные площадки ОАО БЗАЛ:
              </div>
              <p className="text-xs text-[#444E60] mt-0.5">
                Информационные порталы предприятия по серийной продукции, станкостроению и производственной кооперации:
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <a
                href="http://www.bzal.by"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-white border border-[#2B3340] text-[#2B3340] hover:bg-[#2B3340] hover:text-white text-xs font-extrabold underline transition-colors"
              >
                <span>www.bzal.by (Корпоративный портал)</span>
                <ExternalLink className="w-3.5 h-3.5 text-[#E71B26]" />
              </a>
              <a
                href="http://bzal-uslugi.by"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-white border border-[#2B3340] text-[#2B3340] hover:bg-[#2B3340] hover:text-white text-xs font-extrabold underline transition-colors"
              >
                <span>bzal-uslugi.by (Портал мехобработки)</span>
                <ExternalLink className="w-3.5 h-3.5 text-[#E71B26]" />
              </a>
            </div>
          </div>
        </div>

        {/* 4. Management & Personal Reception Schedule */}
        <div className="space-y-4">
          <div>
            <div className="text-xs font-dela uppercase text-[#E71B26]">
              Открытость и доступность руководства
            </div>
            <h3 className="text-lg sm:text-2xl font-dela uppercase text-[#2B3340] mt-1">
              Руководство ОАО БЗАЛ и график личного приёма граждан и юридических лиц
            </h3>
          </div>

          <div className="overflow-x-auto rounded-xl border border-[#D5D9DE] shadow-xs">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-[#2B3340] text-white uppercase font-dela text-[11px]">
                  <th className="p-3.5 border-b border-white/10">Должность руководителя</th>
                  <th className="p-3.5 border-b border-white/10">Курируемые вопросы</th>
                  <th className="p-3.5 border-b border-white/10">Дни и часы приёма</th>
                  <th className="p-3.5 border-b border-white/10">Место приёма / Телефон</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E2E5E8] bg-white">
                {managementSchedule.map((row, idx) => (
                  <tr key={idx} className="hover:bg-[#F8F9FA]">
                    <td className="p-3.5 font-extrabold text-[#2B3340] align-top">
                      {row.role}
                    </td>
                    <td className="p-3.5 text-[#444E60] font-medium align-top">
                      {row.dept}
                    </td>
                    <td className="p-3.5 align-top">
                      <div className="font-extrabold text-[#E71B26]">{row.day}</div>
                      <div className="text-[#2B3340] font-bold mt-0.5">{row.hours}</div>
                    </td>
                    <td className="p-3.5 align-top">
                      <div className="text-[#2B3340] font-semibold">{row.room}</div>
                      <div className="text-[#647082] font-bold mt-0.5">{row.phone}</div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 5. Organizational Structure & Normative Acts / Administrative Procedures */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Organizational Structure */}
          <div className="lg:col-span-7 space-y-3">
            <h3 className="text-base sm:text-lg font-dela uppercase text-[#2B3340] flex items-center gap-2">
              <Building2 className="w-5 h-5 text-[#E71B26]" />
              <span>Организационно-производственная структура ОАО БЗАЛ</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {structureDepartments.map((d, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-[#F8F9FA] border border-[#D5D9DE] space-y-1.5"
                >
                  <div className="inline-block px-2 py-0.5 rounded bg-[#2B3340] text-white font-dela text-[10px] uppercase">
                    {d.code}
                  </div>
                  <div className="text-xs font-extrabold text-[#2B3340]">{d.name}</div>
                  <p className="text-[11px] text-[#444E60] leading-relaxed">{d.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Normative Legal Acts, Plans, Reports & Technical Compliance */}
          <div className="lg:col-span-5 space-y-3">
            <h3 className="text-base sm:text-lg font-dela uppercase text-[#2B3340] flex items-center gap-2">
              <FileText className="w-5 h-5 text-[#E71B26]" />
              <span>Нормативные акты, отчётность и безопасность</span>
            </h3>
            <div className="rounded-xl bg-[#ECEEF0] border border-[#D5D9DE] p-5 space-y-3 text-xs">
              <div className="p-3 rounded-lg bg-white border border-[#D5D9DE]">
                <div className="font-extrabold text-[#2B3340]">
                  Перечень административных процедур («Одно окно»)
                </div>
                <p className="text-[11px] text-[#444E60] mt-1">
                  Осуществляется отделом кадров и бухгалтерией по заявлениям граждан в соответствии с Указом Президента РБ от 26.04.2010 № 200 (выдача справок о месте работы, размере заработной платы, периоде работы, копий трудовых книжек).
                </p>
              </div>

              <div className="p-3 rounded-lg bg-white border border-[#D5D9DE]">
                <div className="font-extrabold text-[#2B3340]">
                  Противодействие коррупции и раскрытие информации ОАО
                </div>
                <p className="text-[11px] text-[#444E60] mt-1">
                  На предприятии действует комиссия по противодействию коррупции (Закон РБ от 15.07.2015 № 305-З). Годовая бухгалтерская отчётность эмитента ОАО БЗАЛ публикуется в установленном законодательством РБ порядке.
                </p>
              </div>

              <div className="p-3 rounded-lg bg-white border border-[#D5D9DE] flex items-center justify-between gap-2">
                <div>
                  <div className="font-extrabold text-[#2B3340]">
                    Защита персональных данных (Закон РБ № 99-З) и HTTPS/SSL
                  </div>
                  <div className="text-[11px] text-[#647082] mt-0.5">
                    Криптографическая защита TLS 1.3 • Согласие субъектов ПДн
                  </div>
                </div>
                <button
                  type="button"
                  onClick={onOpenPrivacyPolicy}
                  className="px-3 py-1.5 rounded-lg bg-[#2B3340] hover:bg-[#E71B26] text-white font-bold text-[11px] underline shrink-0 cursor-pointer"
                >
                  Политика ПДн
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
