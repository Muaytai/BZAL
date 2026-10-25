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
            <span className="w-2.5 h-2.5 rounded-full bg-[#E95A0C] shrink-0" />
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
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#2B3340] hover:bg-[#E95A0C] text-white text-[11px] font-extrabold uppercase tracking-wider transition-colors cursor-pointer self-start lg:self-auto"
            >
              <Scale className="w-3.5 h-3.5 text-[#E95A0C] shrink-0" />
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
                  ? 'bg-[#FFF2EB]/60 border-[#E95A0C] hover:bg-[#FFF2EB]'
                  : 'bg-[#F8F9FA] border-[#D5D9DE] hover:border-[#2B3340] hover:bg-white'
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-1">
                  <span className="px-2 py-0.5 rounded bg-[#2B3340] text-white text-[10px] font-extrabold uppercase">
                    {item.domain}
                  </span>
                  <ExternalLink className="w-3.5 h-3.5 text-[#E95A0C] shrink-0 group-hover:translate-x-0.5 transition-transform" />
                </div>
                <div className="text-xs font-extrabold text-[#2B3340] group-hover:text-[#E95A0C] underline decoration-[#E95A0C]/60 underline-offset-2 leading-snug">
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
  const managementSchedule =
    currentLang === 'ru'
      ? [
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
        ]
      : currentLang === 'en'
        ? [
            {
              role: 'Director of JSC BZAL',
              dept: 'Executive management, strategic development & foreign trade',
              day: '1st and 3rd Wednesday of the month',
              hours: '08:00 – 13:00',
              room: 'Director Reception (Admin Building, 2nd Floor)',
              phone: '+375 (163) 67-20-41',
            },
            {
              role: 'Chief Engineer — First Deputy Director',
              dept: 'Engineering policy, Design Bureau (OGK), Process Dept (OGT), CNC park & modernization',
              day: '2nd and 4th Tuesday of the month',
              hours: '08:00 – 13:00',
              room: 'Chief Engineer Office (Admin Building)',
              phone: '+375 (163) 67-20-41',
            },
            {
              role: 'Deputy Director for Commercial Affairs',
              dept: 'Procurement, marketing & sales, industrial subcontracting and EAEU export',
              day: 'Every Thursday',
              hours: '08:00 – 13:00',
              room: 'Marketing & Sales Department',
              phone: '+375 44 751 44 77 / +375 (163) 67-20-92',
            },
            {
              role: 'Deputy Director for HR, Social & Ideological Affairs',
              dept: 'HR policy, labor relations, administrative procedures (Decree No. 200), citizen appeals',
              day: 'Every Monday',
              hours: '08:00 – 13:00',
              room: 'HR & Social Development Office',
              phone: '+375 (163) 67-20-41',
            },
            {
              role: 'Chief Accountant',
              dept: 'Financial operations, contractor settlements & corporate reporting',
              day: 'Every Friday',
              hours: '08:00 – 12:00',
              room: 'Central Accounting Office',
              phone: '+375 (163) 67-20-48 (fax)',
            },
          ]
        : [
            {
              role: 'BZAL 股份公司厂长（总经理）',
              dept: '企业全面管理、战略发展及对外贸易合作',
              day: '每月第一和第三个周三',
              hours: '08:00 – 13:00',
              room: '行政大楼二楼厂长接待室',
              phone: '+375 (163) 67-20-41',
            },
            {
              role: '总工程师 — 第一副厂长',
              dept: '技术政策、总设计师部(OGK)、总工艺师部(OGT)、数控机床与技术改造',
              day: '每月第二和第四个周二',
              hours: '08:00 – 13:00',
              room: '行政大楼总工程师办公室',
              phone: '+375 (163) 67-20-41',
            },
            {
              role: '商务副厂长',
              dept: '物资采购、市场与销售、工业协作与欧亚联盟出口',
              day: '每周四',
              hours: '08:00 – 13:00',
              room: '市场与销售部',
              phone: '+375 44 751 44 77 / +375 (163) 67-20-92',
            },
            {
              role: '人事与社会事务副厂长',
              dept: '人力资源政策、劳动关系、行政手续（第200号法令）及公民申诉',
              day: '每周一',
              hours: '08:00 – 13:00',
              room: '人事与社会发展部',
              phone: '+375 (163) 67-20-41',
            },
            {
              role: '总会计师',
              dept: '财务与经济核算、合同结算及股份公司报表',
              day: '每周五',
              hours: '08:00 – 12:00',
              room: '总会计室',
              phone: '+375 (163) 67-20-48 (传真)',
            },
          ];

  const structureDepartments =
    currentLang === 'ru'
      ? [
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
        ]
      : currentLang === 'en'
        ? [
            {
              code: 'ADMIN',
              name: 'Executive Administration & Reception ("One Window")',
              desc: 'Corporate governance, document management, compliance control, and citizen appeals handling.',
            },
            {
              code: 'OGK & OGT',
              name: 'Chief Designer Bureau & Chief Process Engineering Dept',
              desc: 'Engineering of special-purpose machines, automatic transfer lines, custom tooling, and CNC CAM programming.',
            },
            {
              code: 'SALES',
              name: 'Marketing & Sales Department (Export & Subcontracting)',
              desc: 'Customer inquiry intake, blueprint quotation, direct B2B contracting, and dispatch to Belarus, Russia, and EAEU.',
            },
            {
              code: 'QC & LAB',
              name: 'Quality Control Department (OTK) & Central Metrology Lab',
              desc: 'Incoming alloy inspection, in-process and final inspection under STB ISO 9001-2015, and quality certification.',
            },
            {
              code: 'CNC PROD',
              name: 'Mechanical Assembly & Tooling Workshops',
              desc: 'CNC turning, milling, heavy boring, gear cutting, precision grinding, induction heat treatment, and assembly.',
            },
            {
              code: 'HR & HSE',
              name: 'Human Resources & Industrial Safety Department',
              desc: 'Administrative procedures for employees and citizens (Decree No. 200), occupational health, and industrial safety.',
            },
          ]
        : [
            {
              code: '行政管理',
              name: '行政管理部与厂长接待室（“一站式窗口”）',
              desc: '企业综合管理、公文督办及公民与法人申诉受理。',
            },
            {
              code: 'OGK & OGT',
              name: '总设计师部与总工艺师部',
              desc: '专用机床、自动生产线、工装夹具设计及数控加工程序编制。',
            },
            {
              code: '市场与销售',
              name: '市场与销售部（外贸与工业协作）',
              desc: '接收客户图纸与询价、编制技术商务报价、签署直供合同及欧亚联盟发运。',
            },
            {
              code: 'OTK 质检',
              name: '质量检验部与中央计量实验室',
              desc: '金属原材料入厂检验、ISO 9001-2015 过程与终检及合格证签发。',
            },
            {
              code: '机加工车间',
              name: '机械装配车间与工具工段',
              desc: '数控车削、铣削、重型镗削、齿轮加工、精密磨削、高频热处理及部件总装。',
            },
            {
              code: '人事与安全',
              name: '人事、劳动保护与工业安全部',
              desc: '办理职工与公民行政手续（第200号法令）、劳动保护与安全生产管理。',
            },
          ];

  return (
    <section className="py-6 sm:py-10 bg-white border-b border-[#D5D9DE]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-10">
        {/* 1. Header & Official Enterprise Identification */}
        <div className="rounded-2xl bg-[#2B3340] text-white p-5 sm:p-8 border border-[#1B222C] shadow-lg relative overflow-hidden">
          <div className="h-2 w-full bzal-ribbon-red-white absolute top-0 left-0 right-0" />
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center pt-2">
            <div className="lg:col-span-8 space-y-3">
              <div className="inline-flex flex-wrap items-center gap-2 px-3 py-1 rounded bg-[#E95A0C] text-white text-[11px] font-dela uppercase tracking-wider">
                <span>
                  {currentLang === 'ru'
                    ? 'Указ Президента РБ № 60 • Постановление СМ РБ № 645 • Закон № 300-З'
                    : currentLang === 'en'
                      ? 'Presidential Decree No. 60 • Resolution No. 645 • Law No. 300-Z'
                      : '白俄罗斯总统令第60号 • 政府第645号决议 • 第300-Z号法'}
                </span>
              </div>
              <h2 className="text-lg sm:text-2xl lg:text-3xl font-dela uppercase text-white leading-tight">
                {currentLang === 'ru'
                  ? 'Официальные сведения о предприятии, обращения граждан и государственные ресурсы РБ'
                  : currentLang === 'en'
                    ? 'Official Enterprise Disclosures, Electronic Appeals & State Portals of Belarus'
                    : '企业官方公示信息、电子申诉与白俄罗斯国家政务门户'}
              </h2>
              <p className="text-xs sm:text-sm text-[#BAC5CF] leading-relaxed font-medium">
                {currentLang === 'ru'
                  ? 'Раздел сформирован в соответствии с требованиями законодательства Республики Беларусь к официальным интернет-сайтам государственных организаций и хозяйственных обществ с долей государства (СТБ 2105, Закон РБ № 300-З «Об обращениях граждан и юридических лиц», Закон РБ № 99-З «О защите персональных данных»).'
                  : currentLang === 'en'
                    ? 'Prepared in compliance with the legislation of the Republic of Belarus for official websites of state enterprises (STB 2105, Law No. 300-Z "On Appeals of Citizens and Legal Entities", Law No. 99-Z "On Personal Data Protection").'
                    : '本栏目依据白俄罗斯共和国关于国有企业官方网站的法律法规要求设立（STB 2105标准、第300-Z号《公民与法人申诉法》、第99-Z号《个人数据保护法》）。'}
              </p>
            </div>

            <div className="lg:col-span-4 bg-[#1B222C] rounded-xl p-4 border border-white/10 space-y-2 text-xs">
              <div className="font-dela text-white uppercase text-xs">
                {currentLang === 'ru'
                  ? 'Реквизиты юридического лица:'
                  : currentLang === 'en'
                    ? 'Legal Entity Requisites:'
                    : '法人机构注册信息：'}
              </div>
              <div className="text-[#BAC5CF]">
                <strong className="text-white">
                  {currentLang === 'ru'
                    ? 'Полное наименование:'
                    : currentLang === 'en'
                      ? 'Full Legal Name:'
                      : '法定全称：'}
                </strong>{' '}
                {currentLang === 'ru'
                  ? 'Открытое акционерное общество «Барановичский завод автоматических линий»'
                  : currentLang === 'en'
                    ? 'Open Joint-Stock Company "Baranovichi Automatic Lines Plant"'
                    : '巴拉诺维奇自动线厂开放式股份有限公司'}
              </div>
              <div className="text-[#BAC5CF]">
                <strong className="text-white">
                  {currentLang === 'ru'
                    ? 'Сокращённое:'
                    : currentLang === 'en'
                      ? 'Short Name / Tax ID:'
                      : '简称与税号：'}
                </strong>{' '}
                {currentLang === 'ru'
                  ? 'ОАО БЗАЛ (УНП 200166530)'
                  : currentLang === 'en'
                    ? 'JSC BZAL (UNP 200166530)'
                    : 'OJSC BZAL (UNP 200166530)'}
              </div>
              <div className="text-[#BAC5CF]">
                <strong className="text-white">
                  {currentLang === 'ru'
                    ? 'Вышестоящее объединение:'
                    : currentLang === 'en'
                      ? 'Higher Authority:'
                      : '上级主管部门：'}
                </strong>{' '}
                {currentLang === 'ru'
                  ? 'ГО «Белорусская железная дорога» (rw.by)'
                  : currentLang === 'en'
                    ? 'Belarusian Railway State Association (rw.by)'
                    : '白俄罗斯国家铁路集团 (rw.by)'}
              </div>
              <div className="text-[#BAC5CF]">
                <strong className="text-white">
                  {currentLang === 'ru'
                    ? 'Режим работы:'
                    : currentLang === 'en'
                      ? 'Working Hours:'
                      : '工作时间：'}
                </strong>{' '}
                {currentLang === 'ru'
                  ? 'Пн–Пт 08:00–16:30 (обед 12:30–13:00), Сб–Вс выходной'
                  : currentLang === 'en'
                    ? 'Mon–Fri 08:00–16:30 (lunch 12:30–13:00), Sat–Sun closed'
                    : '周一至周五 08:00–16:30（午休 12:30–13:00）'}
              </div>
            </div>
          </div>
        </div>

        {/* 2. Electronic Appeals System (обращения.бел) & Appeal / Complaint Procedure */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          <div className="lg:col-span-7 rounded-2xl bg-[#FFF2EB]/50 border-2 border-[#E95A0C] p-5 sm:p-7 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="px-3 py-1 rounded bg-[#E95A0C] text-white text-xs font-dela uppercase">
                  {currentLang === 'ru'
                    ? 'Действует со 2 января 2023 года'
                    : currentLang === 'en'
                      ? 'Effective since January 2, 2023'
                      : '自2023年1月2日起生效'}
                </span>
                <span className="text-xs font-extrabold text-[#2B3340]">
                  {currentLang === 'ru'
                    ? 'Закон Республики Беларусь от 18.07.2011 № 300-З'
                    : currentLang === 'en'
                      ? 'Law of the Republic of Belarus No. 300-Z'
                      : '白俄罗斯共和国第300-Z号法律'}
                </span>
              </div>

              <h3 className="text-base sm:text-xl font-dela uppercase text-[#2B3340]">
                {currentLang === 'ru'
                  ? 'Единая система электронных обращений граждан и юридических лиц — обращения.бел'
                  : currentLang === 'en'
                    ? 'Unified State Electronic Appeals System — обращения.бел'
                    : '白俄罗斯国家统一电子申诉系统 — обращения.бел'}
              </h3>

              <p className="text-xs sm:text-sm text-[#2B3340] leading-relaxed font-medium">
                {currentLang === 'ru'
                  ? 'Со 2 января 2023 года в соответствии с Законом Республики Беларусь от 28.06.2022 № 176-З подача электронных обращений граждан и юридических лиц в государственные органы и иные государственные организации осуществляется исключительно через государственную единую (интегрированную) республиканскую информационную систему учета и обработки обращений граждан и юридических лиц.'
                  : currentLang === 'en'
                    ? 'Since January 2, 2023, in accordance with Law No. 176-Z of the Republic of Belarus, official electronic appeals of citizens and legal entities to state enterprises are submitted exclusively through the Unified State Republican Information System for Recording and Processing Appeals (обращения.бел).'
                    : '自2023年1月2日起，根据白俄罗斯共和国第176-Z号法律，公民和法人向国家机构及国有企业提交正式电子申诉，统一通过国家电子申诉信息系统（обращения.бел）办理。'}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3.5 rounded-xl bg-white border border-[#D5D9DE]">
                  <div className="font-extrabold text-[#2B3340] mb-1">
                    {currentLang === 'ru'
                      ? 'Сроки рассмотрения обращений:'
                      : currentLang === 'en'
                        ? ' Statutory Review Deadlines:'
                        : '法定审理期限：'}
                  </div>
                  <p className="text-[#444E60]">
                    {currentLang === 'ru'
                      ? 'Письменные и электронные обращения рассматриваются не позднее 15 дней, а требующие дополнительного изучения и проверки — не позднее 1 месяца (ст. 17 Закона № 300-З).'
                      : currentLang === 'en'
                        ? 'Written and electronic appeals are reviewed within 15 days, or up to 1 month if additional verification is required (Article 17 of Law No. 300-Z).'
                        : '书面及电子申诉在15日内审理完毕；需进一步核查的申诉不超过1个月（第300-Z号法第17条）。'}
                  </p>
                </div>
                <div className="p-3.5 rounded-xl bg-white border border-[#D5D9DE]">
                  <div className="font-extrabold text-[#2B3340] mb-1">
                    {currentLang === 'ru'
                      ? 'Письменные обращения по почте:'
                      : currentLang === 'en'
                        ? 'Written Appeals by Post:'
                        : '邮寄书面申诉地址：'}
                  </div>
                  <p className="text-[#444E60]">
                    {currentLang === 'ru'
                      ? 'Направляются по адресу: 225410, Брестская обл., г. Барановичи, ул. Королика, 8, ОАО БЗАЛ. Книга замечаний и предложений находится в приёмной директора.'
                      : currentLang === 'en'
                        ? 'Send to: JSC BZAL, 8 Korolika Str., 225410, Baranovichi, Brest Region, Belarus. The Book of Comments and Suggestions is kept at the Director Reception.'
                        : '邮寄地址：白俄罗斯布列斯特州巴拉诺维奇市科罗利卡街8号 (225410) BZAL。意见簿存放于厂长接待室。'}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-[#E95A0C]/20 flex flex-wrap items-center gap-3">
              <a
                href="https://обращения.бел"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#E95A0C] hover:bg-[#CC4B06] text-white font-extrabold text-xs uppercase tracking-wider shadow-md underline decoration-white/70 underline-offset-4 transition-all"
              >
                <span>
                  {currentLang === 'ru'
                    ? 'Перейти на портал обращения.бел'
                    : currentLang === 'en'
                      ? 'Open Portal обращения.бел'
                      : '前往申诉门户 обращения.бел'}
                </span>
                <ExternalLink className="w-4 h-4" />
              </a>

              <button
                type="button"
                onClick={onOpenRfq}
                className="inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-[#2B3340] hover:bg-[#1B222C] text-white font-bold text-xs uppercase tracking-wider transition-all cursor-pointer"
              >
                <Send className="w-3.5 h-3.5 text-[#E95A0C]" />
                <span>
                  {currentLang === 'ru'
                    ? 'Коммерческая заявка в отдел маркетинга и продаж (ТЗ)'
                    : currentLang === 'en'
                      ? 'Commercial RFQ to Marketing & Sales Dept'
                      : '向市场与销售部提交商业询价 (RFQ)'}
                </span>
              </button>
            </div>
          </div>

          {/* Order of Appealing Decisions */}
          <div className="lg:col-span-5 rounded-2xl bg-[#ECEEF0] border border-[#D5D9DE] p-5 sm:p-7 flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 text-xs font-dela uppercase text-[#E95A0C]">
                <Scale className="w-4 h-4" />
                <span>
                  {currentLang === 'ru'
                    ? 'Статья 20 Закона РБ № 300-З'
                    : currentLang === 'en'
                      ? 'Article 20 of Law No. 300-Z'
                      : '第300-Z号法律第20条'}
                </span>
              </div>
              <h3 className="text-base sm:text-lg font-dela uppercase text-[#2B3340]">
                {currentLang === 'ru'
                  ? 'Порядок обжалования ответов и решений по обращениям'
                  : currentLang === 'en'
                    ? 'Procedure for Appealing Decisions on Appeals'
                    : '申诉答复与决定的复议程序'}
              </h3>
              <p className="text-xs text-[#444E60] leading-relaxed font-medium">
                {currentLang === 'ru'
                  ? 'Ответ ОАО БЗАЛ на обращение или решение об оставлении обращения без рассмотрения по существу могут быть обжалованы заявителем в вышестоящую организацию:'
                  : currentLang === 'en'
                    ? 'Responses or decisions of JSC BZAL regarding an appeal may be appealed by the applicant to the higher governing authority:'
                    : '申请人如对 BZAL 的申诉答复或决定有异议，可向上级主管部门提出复议：'}
              </p>

              <div className="p-4 rounded-xl bg-white border border-[#D5D9DE] space-y-2 text-xs">
                <div className="font-extrabold text-[#2B3340]">
                  {currentLang === 'ru'
                    ? 'Вышестоящая организация: Государственное объединение «Белорусская железная дорога»'
                    : currentLang === 'en'
                      ? 'Higher Authority: Belarusian Railway State Association'
                      : '上级主管部门：白俄罗斯国家铁路集团'}
                </div>
                <div className="text-[#444E60]">
                  {currentLang === 'ru'
                    ? 'Адрес: 220030, г. Минск, ул. Ленина, 17 • Режим работы: Пн–Пт 09:00–18:00'
                    : currentLang === 'en'
                      ? 'Address: 17 Lenina Str., 220030, Minsk, Belarus • Hours: Mon–Fri 09:00–18:00'
                      : '地址：明斯克市列宁街17号 (220030) • 工作时间：周一至周五 09:00–18:00'}
                </div>
                <div className="flex flex-wrap items-center gap-3 pt-1">
                  <a
                    href="https://www.rw.by"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#E95A0C] font-extrabold underline hover:text-[#2B3340] inline-flex items-center gap-1"
                  >
                    <span>www.rw.by</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                  <a
                    href="https://minprom.gov.by"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#2B3340] font-extrabold underline hover:text-[#E95A0C] inline-flex items-center gap-1"
                  >
                    <span>minprom.gov.by</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>

              <p className="text-xs text-[#444E60] leading-relaxed">
                {currentLang === 'ru'
                  ? 'После рассмотрения обращения в вышестоящей организации ответ на жалобу может быть обжалован в суд Барановичского района и г. Барановичи в порядке, установленном законодательством Республики Беларусь.'
                  : currentLang === 'en'
                    ? 'Following review by the higher authority, the decision may be appealed to the Court of Baranovichi District and Baranovichi City in accordance with the procedural legislation of Belarus.'
                    : '经上级主管部门复议后，仍可依法向巴拉诺维奇区及市法院提起诉讼。'}
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-white border border-[#D5D9DE] flex items-center justify-between gap-2 text-xs">
              <span className="font-bold text-[#2B3340]">
                {currentLang === 'ru'
                  ? 'Предварительная запись на личный приём:'
                  : currentLang === 'en'
                    ? 'Personal reception appointment:'
                    : '管理层接待预约电话：'}
              </span>
              <a
                href="tel:+375163672041"
                className="font-extrabold text-[#E95A0C] underline"
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
              <div className="text-xs font-dela uppercase text-[#E95A0C]">
                {currentLang === 'ru'
                  ? 'Обязательные государственные интернет-ресурсы'
                  : currentLang === 'en'
                    ? 'Mandatory Official State Portals'
                    : '白俄罗斯官方政务门户链接'}
              </div>
              <h3 className="text-base sm:text-2xl font-dela uppercase text-[#2B3340] mt-1">
                {currentLang === 'ru'
                  ? 'Ссылки на портал Президента РБ, вышестоящие органы и партнёрские организации'
                  : currentLang === 'en'
                    ? 'Links to the Portal of the President of Belarus, Higher Authorities & State Portals'
                    : '白俄罗斯总统门户网站、上级主管部门及政务资源链接'}
              </h3>
            </div>
            <span className="text-xs font-semibold text-[#647082]">
              {currentLang === 'ru'
                ? 'Все внешние гиперссылки визуально выделены и открываются в новой вкладке'
                : currentLang === 'en'
                  ? 'All external links open in a new tab'
                  : '所有外部官方链接均在新标签页打开'}
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
                    ? 'bg-[#FFF2EB]/40 border-[#E95A0C]'
                    : 'bg-white border-[#D5D9DE] hover:border-[#2B3340]'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="px-2 py-0.5 rounded bg-[#2B3340] text-white text-[10px] font-extrabold uppercase">
                      {currentLang === 'ru' ? link.badgeRu : link.domain}
                    </span>
                    <ExternalLink className="w-4 h-4 text-[#E95A0C] shrink-0 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                  <div className="text-xs sm:text-sm font-extrabold text-[#2B3340] group-hover:text-[#E95A0C] underline decoration-[#E95A0C] underline-offset-3 leading-snug">
                    {currentLang === 'ru'
                      ? link.titleRu
                      : currentLang === 'en'
                        ? link.titleEn
                        : link.titleZh}
                  </div>
                  <p className="text-[11px] text-[#647082] mt-2 leading-relaxed font-medium">
                    {currentLang === 'ru'
                      ? link.subRu
                      : currentLang === 'en'
                        ? link.subEn
                        : link.subZh}
                  </p>
                </div>

                <div className="mt-3 pt-2.5 border-t border-[#E2E5E8] flex items-center justify-between text-[11px] font-extrabold text-[#E95A0C]">
                  <span className="underline">{link.domain}</span>
                  <span>
                    {currentLang === 'ru'
                      ? 'Перейти ↗'
                      : currentLang === 'en'
                        ? 'Open ↗'
                        : '访问 ↗'}
                  </span>
                </div>
              </a>
            ))}
          </div>

          {/* Official Enterprise & Affiliated Portals */}
          <div className="p-4 sm:p-5 rounded-xl bg-[#ECEEF0] border border-[#D5D9DE] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="text-xs font-dela uppercase text-[#2B3340]">
                {currentLang === 'ru'
                  ? 'Официальные интернет-ресурсы и специализированные площадки ОАО БЗАЛ:'
                  : currentLang === 'en'
                    ? 'Official Web Portals of JSC BZAL:'
                    : 'BZAL 官方网站与工业服务平台：'}
              </div>
              <p className="text-xs text-[#444E60] mt-0.5">
                {currentLang === 'ru'
                  ? 'Информационные порталы предприятия по серийной продукции, станкостроению и производственной кооперации:'
                  : currentLang === 'en'
                    ? 'Enterprise portals for serial products, machine-tool building, and subcontracting:'
                    : '企业系列产品、机床制造与工业加工协作官方门户：'}
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <a
                href="http://www.bzal.by"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-white border border-[#2B3340] text-[#2B3340] hover:bg-[#2B3340] hover:text-white text-xs font-extrabold underline transition-colors"
              >
                <span>
                  {currentLang === 'ru'
                    ? 'www.bzal.by (Корпоративный портал)'
                    : currentLang === 'en'
                      ? 'www.bzal.by (Corporate Portal)'
                      : 'www.bzal.by (企业门户)'}
                </span>
                <ExternalLink className="w-3.5 h-3.5 text-[#E95A0C]" />
              </a>
              <a
                href="http://bzal-uslugi.by"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-white border border-[#2B3340] text-[#2B3340] hover:bg-[#2B3340] hover:text-white text-xs font-extrabold underline transition-colors"
              >
                <span>
                  {currentLang === 'ru'
                    ? 'bzal-uslugi.by (Портал мехобработки)'
                    : currentLang === 'en'
                      ? 'bzal-uslugi.by (Machining Portal)'
                      : 'bzal-uslugi.by (机加工门户)'}
                </span>
                <ExternalLink className="w-3.5 h-3.5 text-[#E95A0C]" />
              </a>
            </div>
          </div>
        </div>

        {/* 4. Management & Personal Reception Schedule */}
        <div className="space-y-4">
          <div>
            <div className="text-xs font-dela uppercase text-[#E95A0C]">
              {currentLang === 'ru'
                ? 'Открытость и доступность руководства'
                : currentLang === 'en'
                  ? 'Executive Management & Reception Schedule'
                  : '管理层公开接待日程'}
            </div>
            <h3 className="text-base sm:text-2xl font-dela uppercase text-[#2B3340] mt-1">
              {currentLang === 'ru'
                ? 'Руководство ОАО БЗАЛ и график личного приёма граждан и юридических лиц'
                : currentLang === 'en'
                  ? 'JSC BZAL Management & Personal Reception Schedule'
                  : 'BZAL 管理层及公民与法人接待时间表'}
            </h3>
          </div>

          <div className="overflow-x-auto rounded-xl border border-[#D5D9DE] shadow-xs">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-[#2B3340] text-white uppercase font-dela text-[11px]">
                  <th className="p-3.5 border-b border-white/10">
                    {currentLang === 'ru'
                      ? 'Должность руководителя'
                      : currentLang === 'en'
                        ? 'Executive Position'
                        : '职务'}
                  </th>
                  <th className="p-3.5 border-b border-white/10">
                    {currentLang === 'ru'
                      ? 'Курируемые вопросы'
                      : currentLang === 'en'
                        ? 'Area of Responsibility'
                        : '分管领域'}
                  </th>
                  <th className="p-3.5 border-b border-white/10">
                    {currentLang === 'ru'
                      ? 'Дни и часы приёма'
                      : currentLang === 'en'
                        ? 'Reception Days & Hours'
                        : '接待日期与时间'}
                  </th>
                  <th className="p-3.5 border-b border-white/10">
                    {currentLang === 'ru'
                      ? 'Место приёма / Телефон'
                      : currentLang === 'en'
                        ? 'Location / Phone'
                        : '接待地点 / 电话'}
                  </th>
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
                      <div className="font-extrabold text-[#E95A0C]">{row.day}</div>
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
              <Building2 className="w-5 h-5 text-[#E95A0C]" />
              <span>
                {currentLang === 'ru'
                  ? 'Организационно-производственная структура ОАО БЗАЛ'
                  : currentLang === 'en'
                    ? 'Organizational & Production Structure of JSC BZAL'
                    : 'BZAL 组织与生产架构'}
              </span>
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
              <FileText className="w-5 h-5 text-[#E95A0C]" />
              <span>
                {currentLang === 'ru'
                  ? 'Нормативные акты, отчётность и безопасность'
                  : currentLang === 'en'
                    ? 'Regulations, Reporting & Data Security'
                    : '法规遵循、企业报表与数据安全'}
              </span>
            </h3>
            <div className="rounded-xl bg-[#ECEEF0] border border-[#D5D9DE] p-5 space-y-3 text-xs">
              <div className="p-3 rounded-lg bg-white border border-[#D5D9DE]">
                <div className="font-extrabold text-[#2B3340]">
                  {currentLang === 'ru'
                    ? 'Перечень административных процедур («Одно окно»)'
                    : currentLang === 'en'
                      ? 'Administrative Procedures ("One Window")'
                      : '“一站式窗口”行政办理服务'}
                </div>
                <p className="text-[11px] text-[#444E60] mt-1">
                  {currentLang === 'ru'
                    ? 'Осуществляется отделом кадров и бухгалтерией по заявлениям граждан в соответствии с Указом Президента РБ от 26.04.2010 № 200 (выдача справок о месте работы, размере заработной платы, периоде работы, копий трудовых книжек).'
                    : currentLang === 'en'
                      ? 'Carried out by the HR and Accounting departments upon citizen applications under Presidential Decree No. 200 (issuance of employment, salary, and service record certificates).'
                      : '由人事部与财务部依据白俄罗斯第200号总统令办理在职证明、薪资证明及工龄档案证明。'}
                </p>
              </div>

              <div className="p-3 rounded-lg bg-white border border-[#D5D9DE]">
                <div className="font-extrabold text-[#2B3340]">
                  {currentLang === 'ru'
                    ? 'Противодействие коррупции и раскрытие информации ОАО'
                    : currentLang === 'en'
                      ? 'Anti-Corruption Compliance & Corporate Disclosure'
                      : '反腐败合规与股份公司信息披露'}
                </div>
                <p className="text-[11px] text-[#444E60] mt-1">
                  {currentLang === 'ru'
                    ? 'На предприятии действует комиссия по противодействию коррупции (Закон РБ от 15.07.2015 № 305-З). Годовая бухгалтерская отчётность эмитента ОАО БЗАЛ публикуется в установленном законодательством РБ порядке.'
                    : currentLang === 'en'
                      ? 'An anti-corruption commission operates at the plant under Law of Belarus No. 305-Z. Annual statutory disclosures of JSC BZAL are published in accordance with Belarusian law.'
                      : '企业依据白俄罗斯第305-Z号法律设有反腐败委员会，并依法定期披露股份公司年度财务报告。'}
                </p>
              </div>

              <div className="p-3 rounded-lg bg-white border border-[#D5D9DE] flex items-center justify-between gap-2">
                <div>
                  <div className="font-extrabold text-[#2B3340]">
                    {currentLang === 'ru'
                      ? 'Защита персональных данных (Закон РБ № 99-З) и HTTPS/SSL'
                      : currentLang === 'en'
                        ? 'Personal Data Protection (Law No. 99-Z) & HTTPS/SSL'
                        : '个人数据保护（第99-Z号法）与 HTTPS/SSL'}
                  </div>
                  <div className="text-[11px] text-[#647082] mt-0.5">
                    {currentLang === 'ru'
                      ? 'Криптографическая защита TLS 1.3 • Согласие субъектов ПДн'
                      : currentLang === 'en'
                        ? 'TLS 1.3 Encryption • Data Subject Consent'
                        : 'TLS 1.3 加密保护 • 数据主体知情同意'}
                  </div>
                </div>
                <button
                  type="button"
                  onClick={onOpenPrivacyPolicy}
                  className="px-3 py-1.5 rounded-lg bg-[#2B3340] hover:bg-[#E95A0C] text-white font-bold text-[11px] underline shrink-0 cursor-pointer"
                >
                  {currentLang === 'ru'
                    ? 'Политика ПДн'
                    : currentLang === 'en'
                      ? 'Privacy Policy'
                      : '隐私政策'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
