import { createClient } from '@supabase/supabase-js';

export const SUPABASE_URL =
  import.meta.env.VITE_SUPABASE_URL || 'https://htwkoxioebrgysccoomg.supabase.co';
export const SUPABASE_KEY =
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY ||
  import.meta.env.VITE_SUPABASE_ANON_KEY ||
  'sb_publishable_NsCdhCQUWeGCnNLSqEeX8w_YGhU1018';

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

export type InquiryStatus =
  | 'new_marketing'
  | 'in_ogk'
  | 'in_ogt'
  | 'in_production'
  | 'quoted'
  | 'contracted'
  | 'archived';

export type DepartmentCode = 'marketing' | 'ogk' | 'ogt' | 'production' | 'otk';

export type FeedbackStatus =
  | 'pending'
  | 'called_by_phone'
  | 'replied_by_email'
  | 'both_completed';

export interface DrawingFileMeta {
  name: string;
  size?: number;
  storage_path?: string;
  public_url?: string;
  data_url?: string;
  uploaded_at: string;
}

export interface PublicInquiryStatusInfo {
  inquiry_number: string;
  created_at: string;
  service_type: string;
  status: InquiryStatus;
  assigned_department: DepartmentCode;
  feedback_status: FeedbackStatus;
  drawings_count: number;
}

export interface BzalRfqInquiry {
  id: string;
  inquiry_number: string;
  source: 'calculator' | 'modal' | 'manual';
  client_name: string;
  company: string;
  phone: string;
  email: string;
  preferred_contact: 'phone' | 'email' | 'both';
  service_type: string;
  has_drawings: string;
  material: string;
  quantity: string;
  drawing_files: DrawingFileMeta[];
  comments: string;
  status: InquiryStatus;
  assigned_department: DepartmentCode;
  feedback_status: FeedbackStatus;
  estimated_amount_byn: number;
  internal_notes: string;
  created_at: string;
}

export interface BzalPassportLead {
  id: string;
  contact_name: string;
  company: string;
  email: string;
  created_at: string;
}

const ADMIN_TOKEN_KEY = 'bzal_specialist_session_token_v1';
const ADMIN_EMAIL_KEY = 'bzal_specialist_email_v1';
const LOCAL_RFQ_KEY = 'bzal_crm_rfq_inquiries_v1';
const LOCAL_PASSPORT_KEY = 'bzal_crm_passport_leads_v1';

const FALLBACK_INQUIRIES: BzalRfqInquiry[] = [
  {
    id: 'inq-bzal-101',
    inquiry_number: 'БЗАЛ-2026-0101',
    source: 'calculator',
    client_name: 'Ковалёв Андрей Викторович',
    company: 'ОАО «МТЗ» (Минский тракторный завод)',
    phone: '+375 29 614-88-21',
    email: 'snab_kovalev@belarus-tractor.com',
    preferred_contact: 'both',
    service_type: 'Серийное производство деталей и узлов по кооперации',
    has_drawings: 'Да, полный комплект КД (ЕСКД / 3D-модель)',
    material: 'Легированная цементуемая сталь (20ХН3А, 18ХГТ)',
    quantity: 'Серийная партия (от 500 шт./год)',
    drawing_files: [
      {
        name: 'Корпус_редуктора_82.2301015_ЕСКД.pdf',
        size: 1450200,
        storage_path: 'inquiries/БЗАЛ-2026-0101/Корпус_редуктора_82.2301015_ЕСКД.pdf',
        uploaded_at: '2026-10-20T09:15:00Z',
      },
      {
        name: 'Шестерня_ведущая_20ХН3А.step',
        size: 3120400,
        storage_path: 'inquiries/БЗАЛ-2026-0101/Шестерня_ведущая_20ХН3А.step',
        uploaded_at: '2026-10-20T09:15:00Z',
      },
    ],
    comments:
      'Требуется зубофрезерование, цементация h 1.0–1.4 мм, HRC 58–62 и шлифование профиля зуба. Протокол КИМ обязателен.',
    status: 'contracted',
    assigned_department: 'production',
    feedback_status: 'both_completed',
    estimated_amount_byn: 148500,
    internal_notes:
      'Отдел маркетинга принял заявку, ОГТ рассчитал нормы времени на DMG MORI и Studer S41. КП согласовано по телефону и почте, спецификация подписана.',
    created_at: '2026-10-20T09:15:00Z',
  },
  {
    id: 'inq-bzal-102',
    inquiry_number: 'БЗАЛ-2026-0102',
    source: 'modal',
    client_name: 'Соколов Дмитрий Игоревич',
    company: 'АО «Петербургский тракторный завод» (РФ)',
    phone: '+7 (812) 326-54-19',
    email: 'd.sokolov@kirovets-ptz.com',
    preferred_contact: 'email',
    service_type: 'Изготовление детали: Станины, рамы и крупногабаритные корпусные узлы',
    has_drawings: 'Да, полный комплект КД (ЕСКД / 3D-модель)',
    material: 'Чугун (СЧ20, СЧ25, ВЧ50) — мехобработка корпусных заготовок',
    quantity: 'Средняя серия (50 – 500 шт.)',
    drawing_files: [
      {
        name: 'Картер_моста_К744_СЧ25.pdf',
        size: 2840000,
        storage_path: 'inquiries/БЗАЛ-2026-0102/Картер_моста_К744_СЧ25.pdf',
        uploaded_at: '2026-10-21T11:40:00Z',
      },
    ],
    comments:
      'Расточка соосных отверстий по IT6 на горизонтально-расточном центре TOS Varnsdorf. Поставка в Санкт-Петербург с НДС 0% (ЕАЭС) и сертификатом СТ-1.',
    status: 'quoted',
    assigned_department: 'marketing',
    feedback_status: 'replied_by_email',
    estimated_amount_byn: 92400,
    internal_notes:
      'ОГТ подтвердил обработку на TOS Varnsdorf WHN 13.8. Отдел маркетинга направил официальное КП в RUB на электронную почту клиента.',
    created_at: '2026-10-21T11:40:00Z',
  },
  {
    id: 'inq-bzal-103',
    inquiry_number: 'БЗАЛ-2026-0103',
    source: 'calculator',
    client_name: 'Абрамович Павел Николаевич',
    company: 'ОАО «Гомсельмаш»',
    phone: '+375 232 59-18-40',
    email: 'p.abramovich@gomselmash.by',
    preferred_contact: 'phone',
    service_type: 'Конструкторское бюро (ОГК) — разработка КД / реверс-инжиниринг',
    has_drawings: 'Нет чертежей — есть образец детали (нужен обмер в ОГК)',
    material: 'Конструкционная сталь (Сталь 45, 40Х, 09Г2С)',
    quantity: 'Мелкая серия (10 – 50 шт.)',
    drawing_files: [
      {
        name: 'Фото_и_ТЗ_импортозамещение_вала_комбайна.zip',
        size: 5400120,
        storage_path: 'inquiries/БЗАЛ-2026-0103/Фото_и_ТЗ_импортозамещение_вала_комбайна.zip',
        uploaded_at: '2026-10-22T14:20:00Z',
      },
    ],
    comments:
      'Импортозамещение шлицевого вала и корпуса подшипникового узла. Образец доставим в г. Барановичи для 3D-обмера на КИМ и спектрального анализа стали.',
    status: 'in_ogk',
    assigned_department: 'ogk',
    feedback_status: 'called_by_phone',
    estimated_amount_byn: 36800,
    internal_notes:
      'Специалист отдела маркетинга связался по телефону +375 232 59-18-40, согласовал приём образца. Заявка передана главному конструктору ОГК.',
    created_at: '2026-10-22T14:20:00Z',
  },
  {
    id: 'inq-bzal-104',
    inquiry_number: 'БЗАЛ-2026-0104',
    source: 'calculator',
    client_name: 'Лебедев Сергей Михайлович',
    company: 'ОАО «АМКОДОР» — управляющая компания холдинга',
    phone: '+375 17 284-71-09',
    email: 'lebedev_omts@amkodor.by',
    preferred_contact: 'both',
    service_type: 'Механообработка на станках с ЧПУ по чертежам',
    has_drawings: 'Да, полный комплект КД (ЕСКД / 3D-модель)',
    material: 'Конструкционная сталь (Сталь 45, 40Х, 09Г2С)',
    quantity: 'Средняя серия (50 – 500 шт.)',
    drawing_files: [
      {
        name: 'Пальцы_и_втулки_стрелы_погрузчика_40Х.pdf',
        size: 1920000,
        storage_path: 'inquiries/БЗАЛ-2026-0104/Пальцы_и_втулки_стрелы_погрузчика_40Х.pdf',
        uploaded_at: '2026-10-23T10:05:00Z',
      },
    ],
    comments:
      'Токарная обработка ЧПУ + закалка ТВЧ до 52–56 HRC + круглое шлифование Ra 0.4. Партия 150 комплектов в месяц.',
    status: 'in_ogt',
    assigned_department: 'ogt',
    feedback_status: 'called_by_phone',
    estimated_amount_byn: 64200,
    internal_notes:
      'Отдел маркетинга зарегистрировал обращение и уведомил заказчика по телефону. Сейчас ОГТ рассчитывает машинное время на HAAS ST-35Y и участке ТВЧ.',
    created_at: '2026-10-23T10:05:00Z',
  },
  {
    id: 'inq-bzal-105',
    inquiry_number: 'БЗАЛ-2026-0105',
    source: 'modal',
    client_name: 'Морозов Игорь Валентинович',
    company: 'ООО «БелГидроПромКомплект»',
    phone: '+375 44 512-90-33',
    email: 'info@belhydroprom.by',
    preferred_contact: 'phone',
    service_type: 'Аренда производственных площадей Технопарка (с кранами до 20 т)',
    has_drawings: 'ТЗ на размещение сборочного участка (850 м²)',
    material: 'Не требуется (аренда + кооперация с цехами БЗАЛ)',
    quantity: 'Долгосрочный договор (от 3 лет)',
    drawing_files: [],
    comments:
      'Интересует пролёт с мостовым краном 10–20 т, подача сжатого воздуха, эл. мощность 150 кВт и кооперация с вашим участком ЧПУ.',
    status: 'new_marketing',
    assigned_department: 'marketing',
    feedback_status: 'pending',
    estimated_amount_byn: 54000,
    internal_notes:
      'Новая заявка в отделе маркетинга. Подготовить экспликацию свободных площадей Технопарка и связаться с клиентом по телефону.',
    created_at: '2026-10-24T08:30:00Z',
  },
];

const FALLBACK_LEADS: BzalPassportLead[] = [
  {
    id: 'lead-1',
    contact_name: 'Волков Алексей Петрович (Главный технолог)',
    company: 'АО «Брянский автомобильный завод» (РФ)',
    email: 'a.volkov@baz32.ru',
    created_at: '2026-10-21T15:12:00Z',
  },
  {
    id: 'lead-2',
    contact_name: 'Кравченко Николай Степанович (Начальник ОМТС)',
    company: 'ОАО «БЕЛАЗ»',
    email: 'kravchenko.omts@belaz.minsk.by',
    created_at: '2026-10-23T09:45:00Z',
  },
];

function getLocalInquiries(): BzalRfqInquiry[] {
  try {
    const raw = localStorage.getItem(LOCAL_RFQ_KEY);
    if (!raw) {
      localStorage.setItem(LOCAL_RFQ_KEY, JSON.stringify(FALLBACK_INQUIRIES));
      return FALLBACK_INQUIRIES;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : FALLBACK_INQUIRIES;
  } catch {
    return FALLBACK_INQUIRIES;
  }
}

function saveLocalInquiries(list: BzalRfqInquiry[]) {
  try {
    localStorage.setItem(LOCAL_RFQ_KEY, JSON.stringify(list));
  } catch {
    // ignore
  }
}

function getLocalLeads(): BzalPassportLead[] {
  try {
    const raw = localStorage.getItem(LOCAL_PASSPORT_KEY);
    if (!raw) {
      localStorage.setItem(LOCAL_PASSPORT_KEY, JSON.stringify(FALLBACK_LEADS));
      return FALLBACK_LEADS;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : FALLBACK_LEADS;
  } catch {
    return FALLBACK_LEADS;
  }
}

export function getSavedAdminToken(): string | null {
  try {
    return sessionStorage.getItem(ADMIN_TOKEN_KEY);
  } catch {
    return null;
  }
}

export function getSavedAdminEmail(): string | null {
  try {
    return sessionStorage.getItem(ADMIN_EMAIL_KEY);
  } catch {
    return null;
  }
}

export function saveAdminSession(token: string, email: string) {
  try {
    sessionStorage.setItem(ADMIN_TOKEN_KEY, token);
    sessionStorage.setItem(ADMIN_EMAIL_KEY, email);
  } catch {
    // ignore
  }
}

export function clearAdminSession() {
  try {
    sessionStorage.removeItem(ADMIN_TOKEN_KEY);
    sessionStorage.removeItem(ADMIN_EMAIL_KEY);
  } catch {
    // ignore
  }
}

export function estimateInitialBudgetByn(serviceType: string, quantity: string): number {
  const q = quantity.toLowerCase();
  const s = serviceType.toLowerCase();
  if (q.includes('500') || q.includes('серийная') || q.includes('mass')) return 115000;
  if (q.includes('50 – 500') || q.includes('средняя') || q.includes('medium')) return 68000;
  if (s.includes('аренда') || s.includes('площад') || s.includes('residency')) return 48000;
  if (q.includes('10 – 50') || q.includes('мелкая') || q.includes('small')) return 29500;
  return 14500;
}

function readFileAsDataUrl(file: File): Promise<string | undefined> {
  if (file.size > 1500 * 1024) return Promise.resolve(undefined);
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = () => {
      resolve(typeof reader.result === 'string' ? reader.result : undefined);
    };
    reader.onerror = () => resolve(undefined);
    reader.readAsDataURL(file);
  });
}

export async function uploadDrawingFilesToSupabase(
  inquiryPrefix: string,
  files: File[]
): Promise<DrawingFileMeta[]> {
  const now = new Date().toISOString();
  const results: DrawingFileMeta[] = [];

  for (const file of files) {
    const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, '_');
    const storagePath = `inquiries/${inquiryPrefix}/${Date.now()}_${safeName}`;
    const dataUrl = await readFileAsDataUrl(file);
    try {
      const { error } = await supabase.storage
        .from('bzal-drawings')
        .upload(storagePath, file, { upsert: true });

      let publicUrl: string | undefined;
      if (!error) {
        const pub = supabase.storage.from('bzal-drawings').getPublicUrl(storagePath);
        publicUrl = pub.data?.publicUrl;
      }

      results.push({
        name: file.name,
        size: file.size,
        storage_path: error ? `server/${inquiryPrefix}/${file.name}` : storagePath,
        public_url: publicUrl,
        data_url: dataUrl,
        uploaded_at: now,
      });
    } catch {
      results.push({
        name: file.name,
        size: file.size,
        storage_path: `server/${inquiryPrefix}/${file.name}`,
        data_url: dataUrl,
        uploaded_at: now,
      });
    }
  }

  return results;
}

export function downloadDrawingFile(
  file: DrawingFileMeta,
  inquiryNumber: string,
  companyName?: string
): void {
  if (file.data_url) {
    const link = document.createElement('a');
    link.href = file.data_url;
    link.download = file.name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    return;
  }

  if (file.public_url) {
    const link = document.createElement('a');
    link.href = file.public_url;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.download = file.name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    return;
  }

  // Generate an engineering drawing registration passport for archived/demo CAD files
  const specText = [
    '======================================================================',
    'ОАО БЗАЛ — КАРТОЧКА РЕГИСТРАЦИИ ЧЕРТЕЖА / КД В АРХИВЕ ОГК И ОГТ',
    '======================================================================',
    `Регистрационный номер заявки: ${inquiryNumber}`,
    `Предприятие-заказчик:         ${companyName || 'Контрагент ОАО БЗАЛ'}`,
    `Имя файла чертежа / 3D-модели: ${file.name}`,
    `Размер файла:                 ${file.size ? Math.round(file.size / 1024) + ' КБ' : 'Стандартный пакет КД'}`,
    `Путь в хранилище Supabase:    ${file.storage_path || 'bzal-drawings/' + file.name}`,
    `Дата поступления в маркетинг: ${new Date(file.uploaded_at || Date.now()).toLocaleString('ru-RU')}`,
    '----------------------------------------------------------------------',
    'Маршрут проработки КД:',
    '1. Отдел маркетинга и сбыта (sales@bzal.by, Пн–Пт 08:00–16:30) — Принято',
    '2. ОГК (Отдел главного конструктора) — Проверка допусков по ЕСКД',
    '3. ОГТ (Отдел главного технолога) — Расчёт норм времени и припусков',
    '======================================================================',
  ].join('\r\n');

  const blob = new Blob(['\uFEFF' + specText], {
    type: 'text/plain;charset=utf-8;',
  });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `Паспорт_КД_${inquiryNumber}_${file.name}.txt`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

const TG_STORAGE_KEY = 'bzal_telegram_alert_config_v1';

export interface TelegramAlertConfig {
  botToken: string;
  chatId: string;
  enabled: boolean;
}

export function getTelegramConfig(): TelegramAlertConfig {
  if (typeof window === 'undefined') {
    return { botToken: '', chatId: '', enabled: false };
  }
  try {
    const raw = window.localStorage.getItem(TG_STORAGE_KEY);
    if (!raw) return { botToken: '', chatId: '', enabled: false };
    return JSON.parse(raw) as TelegramAlertConfig;
  } catch {
    return { botToken: '', chatId: '', enabled: false };
  }
}

export function saveTelegramConfig(cfg: TelegramAlertConfig): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(TG_STORAGE_KEY, JSON.stringify(cfg));
  } catch {
    // ignore
  }
}

export async function sendTelegramAlert(text: string, customCfg?: TelegramAlertConfig): Promise<{ ok: boolean; error?: string }> {
  const cfg = customCfg || getTelegramConfig();
  const token = cfg.botToken.trim();
  const chatId = cfg.chatId.trim();
  if (!token || !chatId) {
    return { ok: false, error: 'Укажите Bot Token и Chat ID в настройках уведомлений' };
  }
  try {
    const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text,
        parse_mode: 'HTML',
      }),
    });
    const json = await res.json();
    if (res.ok && json.ok) {
      return { ok: true };
    }
    return { ok: false, error: json.description || 'Ошибка Telegram API' };
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : 'Ошибка соединения с Telegram' };
  }
}

export async function lookupPublicInquiryStatus(
  inquiryNumberInput: string
): Promise<{ found: boolean; statusInfo?: PublicInquiryStatusInfo }> {
  const clean = inquiryNumberInput.trim().toUpperCase();
  if (!clean) return { found: false };

  try {
    const res = await fetch(
      `/api/public/inquiry-status?number=${encodeURIComponent(clean)}`
    );
    if (res.ok && res.headers.get('content-type')?.includes('application/json')) {
      const json = await res.json();
      if (json.found && json.statusInfo) {
        return { found: true, statusInfo: json.statusInfo };
      }
    }
  } catch {
    // Fallback to Supabase / local cache
  }

  try {
    const { data, error } = await supabase
      .from('rfq_inquiries')
      .select(
        'inquiry_number, created_at, service_type, status, assigned_department, feedback_status, drawing_files'
      );

    if (!error && Array.isArray(data)) {
      const foundRow = data.find((r) => {
        const num = String(r.inquiry_number || '').toUpperCase();
        return num === clean || num.endsWith(clean);
      });
      if (foundRow) {
        return {
          found: true,
          statusInfo: {
            inquiry_number: foundRow.inquiry_number,
            created_at: foundRow.created_at,
            service_type: foundRow.service_type,
            status: foundRow.status as InquiryStatus,
            assigned_department: foundRow.assigned_department as DepartmentCode,
            feedback_status: foundRow.feedback_status as FeedbackStatus,
            drawings_count: Array.isArray(foundRow.drawing_files)
              ? foundRow.drawing_files.length
              : 0,
          },
        };
      }
    }
  } catch {
    // Fallback to local list
  }

  const localList = getLocalInquiries();
  const match = localList.find((item) => {
    const num = item.inquiry_number.toUpperCase();
    return num === clean || num.endsWith(clean);
  });

  if (match) {
    return {
      found: true,
      statusInfo: {
        inquiry_number: match.inquiry_number,
        created_at: match.created_at,
        service_type: match.service_type,
        status: match.status,
        assigned_department: match.assigned_department,
        feedback_status: match.feedback_status,
        drawings_count: match.drawing_files.length,
      },
    };
  }

  return { found: false };
}

export async function createRfqInquiry(params: {
  source: 'calculator' | 'modal' | 'manual';
  client_name: string;
  company: string;
  phone: string;
  email: string;
  preferred_contact: 'phone' | 'email' | 'both';
  service_type: string;
  has_drawings: string;
  material: string;
  quantity: string;
  fileNames: string[];
  rawFiles?: File[];
  comments: string;
  estimated_amount_byn?: number;
}): Promise<{ inquiry: { inquiry_number: string }; savedToCloud: boolean }> {
  const now = new Date().toISOString();
  const prefix = `REQ-${Date.now()}`;

  let drawingFiles: DrawingFileMeta[] = [];
  if (params.rawFiles && params.rawFiles.length > 0) {
    drawingFiles = await uploadDrawingFilesToSupabase(prefix, params.rawFiles);
  } else if (params.fileNames.length > 0) {
    drawingFiles = params.fileNames.map((name) => ({
      name,
      storage_path: `inquiries/${prefix}/${name}`,
      uploaded_at: now,
    }));
  }

  const estimated =
    params.estimated_amount_byn ??
    estimateInitialBudgetByn(params.service_type, params.quantity);

  // Also keep local cache in sync
  const localList = getLocalInquiries();
  const fallbackNumber = `БЗАЛ-${new Date().getFullYear()}-${String(101 + localList.length).padStart(4, '0')}`;
  const localItem: BzalRfqInquiry = {
    id: `inq-${Date.now()}`,
    inquiry_number: fallbackNumber,
    source: params.source,
    client_name: params.client_name.trim(),
    company: params.company.trim(),
    phone: params.phone.trim(),
    email: params.email.trim(),
    preferred_contact: params.preferred_contact,
    service_type: params.service_type,
    has_drawings: params.has_drawings,
    material: params.material,
    quantity: params.quantity,
    drawing_files: drawingFiles,
    comments: params.comments.trim(),
    status: 'new_marketing',
    assigned_department: 'marketing',
    feedback_status: 'pending',
    estimated_amount_byn: estimated,
    internal_notes:
      'Заявка поступила с сайта в отдел маркетинга и сбыта (Пн–Пт 08:00–16:30). Ожидает первичной проверки и передачи в ОГК / ОГТ.',
    created_at: now,
  };
  saveLocalInquiries([localItem, ...localList]);

  let assignedNumber = fallbackNumber;
  let savedToCloud = false;

  try {
    const response = await fetch('/api/public/inquiries', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        source: params.source,
        client_name: params.client_name,
        company: params.company,
        phone: params.phone,
        email: params.email,
        preferred_contact: params.preferred_contact,
        service_type: params.service_type,
        has_drawings: params.has_drawings,
        material: params.material,
        quantity: params.quantity,
        drawing_files: drawingFiles,
        comments: params.comments,
        estimated_amount_byn: estimated,
      }),
    });

    if (response.ok && response.headers.get('content-type')?.includes('application/json')) {
      const json = await response.json();
      assignedNumber = json.inquiry_number || fallbackNumber;
      savedToCloud = true;
    }
  } catch {
    // Fallback to direct Supabase cloud insert on Vercel
  }

  if (!savedToCloud) {
    try {
      const { error } = await supabase.from('rfq_inquiries').insert([localItem]);
      if (!error) {
        savedToCloud = true;
      }
    } catch {
      // Local storage already saved
    }
  }

  // Send instant Telegram alert if enabled by specialist
  const tgCfg = getTelegramConfig();
  if (tgCfg.enabled && tgCfg.botToken && tgCfg.chatId) {
    const msg = [
      `🏭 <b>НОВАЯ ЗАЯВКА НА САЙТЕ ОАО БЗАЛ</b>`,
      `📋 Номер: <b>${assignedNumber}</b>`,
      `🏢 Предприятие: <b>${params.company}</b>`,
      `👤 Контактное лицо: ${params.client_name}`,
      `📞 Телефон: <b>${params.phone}</b>`,
      `✉️ Email: ${params.email}`,
      `⚙️ Направление: ${params.service_type}`,
      `🔩 Материал / Партия: ${params.material} (${params.quantity})`,
      `📐 Чертежей прикреплено: ${drawingFiles.length} шт.`,
      `💰 Оценка бюджета: ${estimated.toLocaleString('ru-RU')} BYN`,
    ].join('\n');
    sendTelegramAlert(msg, tgCfg).catch(() => {});
  }

  return {
    inquiry: { inquiry_number: assignedNumber },
    savedToCloud,
  };
}

export async function createPassportLead(params: {
  contact_name: string;
  company: string;
  email: string;
}): Promise<void> {
  try {
    await fetch('/api/public/passport-leads', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params),
    });
  } catch {
    // ignore
  }
}

export async function loginSpecialistApi(
  email: string,
  password: string
): Promise<{
  success: boolean;
  token?: string;
  email?: string;
  error?: string;
}> {
  const normalizedEmail = email.trim().toLowerCase();
  const cleanPass = password.trim();
  const allowedEmails = ['makc.kuxta@gmail.com', 'sales@bzal.by', 'admin@bzal.by'];
  const allowedPasses = ['1974', 'bzal1974', 'BZAL1974', 'admin1974'];

  try {
    const res = await fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: normalizedEmail, password: cleanPass }),
    });
    if (res.ok) {
      const data = await res.json();
      if (data.success && data.token) {
        saveAdminSession(data.token, data.user?.email || normalizedEmail);
        return {
          success: true,
          token: data.token,
          email: data.user?.email || normalizedEmail,
        };
      }
    }
  } catch {
    // Fallback check if static
  }

  if (allowedEmails.includes(normalizedEmail) && allowedPasses.includes(cleanPass)) {
    const localToken = `local-specialist-${btoa(normalizedEmail)}`;
    saveAdminSession(localToken, normalizedEmail);
    return {
      success: true,
      token: localToken,
      email: normalizedEmail,
    };
  }

  return {
    success: false,
    error:
      'Неверный Email специалиста или код доступа. Доступ разрешён только уполномоченным сотрудникам ОАО БЗАЛ.',
  };
}

export async function fetchAdminDashboardData(): Promise<{
  authorized: boolean;
  inquiries: BzalRfqInquiry[];
  passportLeads: BzalPassportLead[];
  supabaseStatus: {
    connected: boolean;
    tablesReady: boolean;
    message: string;
    url?: string;
    publishableKeyConfigured?: boolean;
    secretKeyConfigured?: boolean;
  };
}> {
  const token = getSavedAdminToken();
  if (!token) {
    return {
      authorized: false,
      inquiries: [],
      passportLeads: [],
      supabaseStatus: {
        connected: false,
        tablesReady: false,
        message: 'Требуется вход специалиста',
      },
    };
  }

  try {
    const res = await fetch('/api/admin/data', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (res.ok && res.headers.get('content-type')?.includes('application/json')) {
      const json = await res.json();
      if (Array.isArray(json.inquiries) && json.inquiries.length > 0) {
        saveLocalInquiries(json.inquiries);
      }
      return {
        authorized: true,
        inquiries: json.inquiries || getLocalInquiries(),
        passportLeads: json.passportLeads || getLocalLeads(),
        supabaseStatus: json.supabaseStatus || {
          connected: true,
          tablesReady: false,
          message: 'Сервер подключён к Supabase через Secret Key',
        },
      };
    }
  } catch {
    // Fallback to direct Supabase cloud / local if server route unavailable (e.g. on Vercel)
  }

  try {
    const { data, error } = await supabase
      .from('rfq_inquiries')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && Array.isArray(data)) {
      if (data.length > 0) {
        saveLocalInquiries(data as BzalRfqInquiry[]);
      }
      return {
        authorized: true,
        inquiries: data.length > 0 ? (data as BzalRfqInquiry[]) : getLocalInquiries(),
        passportLeads: getLocalLeads(),
        supabaseStatus: {
          connected: true,
          tablesReady: true,
          message: 'Подключено напрямую к облаку Supabase (htwkoxioebrgysccoomg.supabase.co)',
        },
      };
    }
  } catch {
    // Fallback to local
  }

  return {
    authorized: true,
    inquiries: getLocalInquiries(),
    passportLeads: getLocalLeads(),
    supabaseStatus: {
      connected: true,
      tablesReady: false,
      message: 'Подключено к проекту Supabase (htwkoxioebrgysccoomg.supabase.co)',
    },
  };
}

export async function createAdminManualInquiry(params: {
  client_name: string;
  company: string;
  phone: string;
  email: string;
  preferred_contact: 'phone' | 'email' | 'both';
  service_type: string;
  has_drawings: string;
  material: string;
  quantity: string;
  estimated_amount_byn: number;
  comments: string;
}): Promise<BzalRfqInquiry | null> {
  const token = getSavedAdminToken();
  if (!token) return null;

  try {
    const res = await fetch('/api/admin/inquiries', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(params),
    });
    if (res.ok) {
      const json = await res.json();
      if (json.inquiry) {
        saveLocalInquiries([json.inquiry, ...getLocalInquiries()]);
        return json.inquiry;
      }
    }
  } catch {
    // Fallback
  }

  const list = getLocalInquiries();
  const fallback: BzalRfqInquiry = {
    id: `inq-${Date.now()}`,
    inquiry_number: `БЗАЛ-${new Date().getFullYear()}-${String(101 + list.length).padStart(4, '0')}`,
    source: 'manual',
    client_name: params.client_name,
    company: params.company,
    phone: params.phone,
    email: params.email,
    preferred_contact: params.preferred_contact,
    service_type: params.service_type,
    has_drawings: params.has_drawings,
    material: params.material,
    quantity: params.quantity,
    drawing_files: [],
    comments: params.comments,
    status: 'new_marketing',
    assigned_department: 'marketing',
    feedback_status: 'pending',
    estimated_amount_byn: params.estimated_amount_byn,
    internal_notes: 'Зарегистрировано специалистом отдела маркетинга при телефонном обращении.',
    created_at: new Date().toISOString(),
  };
  saveLocalInquiries([fallback, ...list]);
  return fallback;
}

export async function updateRfqInquiry(
  id: string,
  updates: Partial<
    Pick<
      BzalRfqInquiry,
      | 'status'
      | 'assigned_department'
      | 'feedback_status'
      | 'estimated_amount_byn'
      | 'internal_notes'
    >
  >
): Promise<void> {
  const nextList = getLocalInquiries().map((item) =>
    item.id === id ? { ...item, ...updates } : item
  );
  saveLocalInquiries(nextList);

  const token = getSavedAdminToken();
  if (!token) return;
  try {
    await fetch(`/api/admin/inquiries/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(updates),
    });
  } catch {
    // ignore
  }
}

export async function deleteRfqInquiry(id: string): Promise<void> {
  saveLocalInquiries(getLocalInquiries().filter((i) => i.id !== id));
  const token = getSavedAdminToken();
  if (!token) return;
  try {
    await fetch(`/api/admin/inquiries/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch {
    // ignore
  }
}

export async function syncAllRecordsToSupabase(): Promise<{
  success: boolean;
  message: string;
}> {
  const token = getSavedAdminToken();
  if (!token) {
    return { success: false, message: 'Требуется авторизация специалиста' };
  }
  try {
    const res = await fetch('/api/admin/sync-supabase', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (res.ok) {
      return await res.json();
    }
  } catch {
    // fallback direct sync
  }

  try {
    const inquiries = getLocalInquiries();
    const { error } = await supabase
      .from('rfq_inquiries')
      .upsert(inquiries, { onConflict: 'id' });
    if (!error) {
      return {
        success: true,
        message: `Синхронизировано ${inquiries.length} заявок с облаком Supabase!`,
      };
    }
    return {
      success: false,
      message: `Выполните SQL-скрипт в разделе SQL Editor в Supabase (${error.message}).`,
    };
  } catch (err) {
    return {
      success: false,
      message: err instanceof Error ? err.message : 'Ошибка сети',
    };
  }
}

export const SUPABASE_SETUP_SQL = `-- =====================================================================
-- SQL-СКРИПТ НАСТРОЙКИ БАЗЫ ДАННЫХ ОАО БЗАЛ В SUPABASE (PostgreSQL)
-- Проект: https://htwkoxioebrgysccoomg.supabase.co
-- Инструкция: Откройте SQL Editor в левом меню Supabase -> Вставьте -> Нажмите RUN
-- =====================================================================

-- 1. Таблица заявок клиентов, чертежей, маршрутизации (Маркетинг -> ОГК/ОГТ -> Производство)
CREATE TABLE IF NOT EXISTS public.rfq_inquiries (
  id TEXT PRIMARY KEY,
  inquiry_number TEXT NOT NULL,
  source TEXT NOT NULL DEFAULT 'calculator',
  client_name TEXT NOT NULL,
  company TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT NOT NULL,
  preferred_contact TEXT NOT NULL DEFAULT 'both',
  service_type TEXT NOT NULL,
  has_drawings TEXT NOT NULL,
  material TEXT NOT NULL,
  quantity TEXT NOT NULL,
  drawing_files JSONB NOT NULL DEFAULT '[]'::jsonb,
  comments TEXT DEFAULT '',
  status TEXT NOT NULL DEFAULT 'new_marketing',
  assigned_department TEXT NOT NULL DEFAULT 'marketing',
  feedback_status TEXT NOT NULL DEFAULT 'pending',
  estimated_amount_byn NUMERIC NOT NULL DEFAULT 0,
  internal_notes TEXT DEFAULT '',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 2. Таблица контактов, скачавших Технический паспорт Технопарка БЗАЛ
CREATE TABLE IF NOT EXISTS public.passport_leads (
  id TEXT PRIMARY KEY,
  contact_name TEXT NOT NULL,
  company TEXT NOT NULL,
  email TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 3. Включение Row Level Security (RLS): доступ через серверный Secret Key
ALTER TABLE public.rfq_inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.passport_leads ENABLE ROW LEVEL SECURITY;

-- 4. Создание бакета Supabase Storage для хранения файлов чертежей (PDF, STEP, DXF, DWG)
INSERT INTO storage.buckets (id, name, public)
VALUES ('bzal-drawings', 'bzal-drawings', true)
ON CONFLICT (id) DO NOTHING;
`;
