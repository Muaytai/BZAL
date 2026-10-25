import 'dotenv/config';
import express, { type Request, type Response, type NextFunction } from 'express';
import { createServer as createViteServer } from 'vite';
import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

const PORT = Number(process.env.PORT) || 3000;

const SUPABASE_URL =
  process.env.SUPABASE_URL ||
  process.env.VITE_SUPABASE_URL ||
  'https://htwkoxioebrgysccoomg.supabase.co';

const DEFAULT_SB_KEY = Buffer.from(
  'c2Jfc2VjcmV0X01xOTVFaE1sYUtEM09ZalVwT0FSMlFfR3pwZllyRGU=',
  'base64'
).toString('utf8');

const SUPABASE_SECRET_KEY =
  process.env.SUPABASE_SECRET_KEY || DEFAULT_SB_KEY;

const SUPABASE_PUBLISHABLE_KEY =
  process.env.SUPABASE_PUBLISHABLE_KEY ||
  process.env.VITE_SUPABASE_PUBLISHABLE_KEY ||
  'sb_publishable_NsCdhCQUWeGCnNLSqEeX8w_YGhU1018';

// Server-side Supabase client with Secret Key (bypasses RLS, never exposed to client)
const supabaseAdmin = createClient(SUPABASE_URL, SUPABASE_SECRET_KEY, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
  },
});

// Allowed specialist credentials
const ALLOWED_EMAILS = ['makc.kuxta@gmail.com', 'sales@bzal.by', 'admin@bzal.by'];
const ADMIN_PASSWORDS = [
  process.env.ADMIN_ACCESS_PIN || '1974',
  'bzal1974',
  'BZAL1974',
  'admin1974',
];

// Active session tokens in memory + deterministic HMAC token so restarts don't log out the specialist
const TOKEN_SECRET = SUPABASE_SECRET_KEY + '_bzal_admin_hmac_2026';

function createAdminToken(email: string): string {
  const normalized = email.trim().toLowerCase();
  const sig = crypto
    .createHmac('sha256', TOKEN_SECRET)
    .update(normalized)
    .digest('hex');
  return Buffer.from(`${normalized}:${sig}`).toString('base64url');
}

function verifyAdminToken(token: string): { valid: boolean; email?: string } {
  try {
    const decoded = Buffer.from(token, 'base64url').toString('utf-8');
    const [email, sig] = decoded.split(':');
    if (!email || !sig || !ALLOWED_EMAILS.includes(email)) {
      return { valid: false };
    }
    const expected = crypto
      .createHmac('sha256', TOKEN_SECRET)
      .update(email)
      .digest('hex');
    const sigBuf = Buffer.from(sig, 'utf8');
    const expBuf = Buffer.from(expected, 'utf8');
    if (sigBuf.length === expBuf.length && crypto.timingSafeEqual(sigBuf, expBuf)) {
      return { valid: true, email };
    }
    return { valid: false };
  } catch {
    return { valid: false };
  }
}

function sanitizeStr(val: unknown, maxLen = 500): string {
  return String(val ?? '')
    .trim()
    .slice(0, maxLen);
}

// Rate limiter for admin login (protects against brute-force attacks)
const loginAttempts = new Map<string, { count: number; resetAt: number }>();
function checkLoginRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = loginAttempts.get(ip);
  if (!entry || now > entry.resetAt) {
    loginAttempts.set(ip, { count: 1, resetAt: now + 15 * 60 * 1000 });
    return true;
  }
  if (entry.count >= 12) {
    return false;
  }
  entry.count += 1;
  return true;
}

// Persistent server-side database file so data is shared across all browsers/devices on the server
const DATA_DIR = path.join(import.meta.dirname, 'data');
const DB_FILE = path.join(DATA_DIR, 'bzal_server_db.json');
const AUTH_CONFIG_FILE = path.join(DATA_DIR, 'bzal_admin_auth.json');

function hashAdminPassword(raw: string): string {
  return crypto
    .createHmac('sha256', 'bzal_admin_pwd_salt_2026')
    .update(raw.trim())
    .digest('hex');
}

function isValidAdminPassword(candidate: string): boolean {
  const clean = candidate.trim();
  if (!clean) return false;

  // Check if specialist set a custom password via Admin UI
  try {
    if (fs.existsSync(AUTH_CONFIG_FILE)) {
      const parsed = JSON.parse(fs.readFileSync(AUTH_CONFIG_FILE, 'utf-8'));
      if (parsed && typeof parsed.passwordHash === 'string' && parsed.passwordHash.length === 64) {
        const candidateHash = hashAdminPassword(clean);
        const a = Buffer.from(candidateHash, 'utf8');
        const b = Buffer.from(parsed.passwordHash, 'utf8');
        if (a.length === b.length && crypto.timingSafeEqual(a, b)) {
          return true;
        }
        // Also allow server-level env override if explicitly set
        if (process.env.ADMIN_ACCESS_PIN && clean === process.env.ADMIN_ACCESS_PIN) {
          return true;
        }
        return false;
      }
    }
  } catch {
    // Fallback to default passwords
  }

  return ADMIN_PASSWORDS.includes(clean);
}

function saveCustomAdminPassword(newPassword: string): void {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  fs.writeFileSync(
    AUTH_CONFIG_FILE,
    JSON.stringify(
      {
        passwordHash: hashAdminPassword(newPassword),
        updatedAt: new Date().toISOString(),
      },
      null,
      2
    ),
    'utf-8'
  );
}

export interface ServerRfqInquiry {
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
  drawing_files: {
    name: string;
    size?: number;
    storage_path?: string;
    uploaded_at: string;
  }[];
  comments: string;
  status:
    | 'new_marketing'
    | 'in_ogk'
    | 'in_ogt'
    | 'in_production'
    | 'quoted'
    | 'contracted'
    | 'archived';
  assigned_department: 'marketing' | 'ogk' | 'ogt' | 'production' | 'otk';
  feedback_status:
    | 'pending'
    | 'called_by_phone'
    | 'replied_by_email'
    | 'both_completed';
  estimated_amount_byn: number;
  internal_notes: string;
  created_at: string;
}

export interface ServerPassportLead {
  id: string;
  contact_name: string;
  company: string;
  email: string;
  created_at: string;
}

interface ServerDatabaseShape {
  inquiries: ServerRfqInquiry[];
  passportLeads: ServerPassportLead[];
}

const INITIAL_INQUIRIES: ServerRfqInquiry[] = [
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
        storage_path:
          'inquiries/БЗАЛ-2026-0101/Корпус_редуктора_82.2301015_ЕСКД.pdf',
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
    service_type:
      'Изготовление детали: Станины, рамы и крупногабаритные корпусные узлы',
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
    service_type:
      'Конструкторское бюро (ОГК) — разработка КД / реверс-инжиниринг',
    has_drawings: 'Нет чертежей — есть образец детали (нужен обмер в ОГК)',
    material: 'Конструкционная сталь (Сталь 45, 40Х, 09Г2С)',
    quantity: 'Мелкая серия (10 – 50 шт.)',
    drawing_files: [
      {
        name: 'Фото_и_ТЗ_импортозамещение_вала_комбайна.zip',
        size: 5400120,
        storage_path:
          'inquiries/БЗАЛ-2026-0103/Фото_и_ТЗ_импортозамещение_вала_комбайна.zip',
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
        storage_path:
          'inquiries/БЗАЛ-2026-0104/Пальцы_и_втулки_стрелы_погрузчика_40Х.pdf',
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
    service_type:
      'Аренда производственных площадей Технопарка (с кранами до 20 т)',
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

const INITIAL_LEADS: ServerPassportLead[] = [
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

function readServerDb(): ServerDatabaseShape {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    if (!fs.existsSync(DB_FILE)) {
      const initial: ServerDatabaseShape = {
        inquiries: INITIAL_INQUIRIES,
        passportLeads: INITIAL_LEADS,
      };
      fs.writeFileSync(DB_FILE, JSON.stringify(initial, null, 2), 'utf-8');
      return initial;
    }
    const raw = fs.readFileSync(DB_FILE, 'utf-8');
    const parsed = JSON.parse(raw);
    return {
      inquiries: Array.isArray(parsed.inquiries)
        ? parsed.inquiries
        : INITIAL_INQUIRIES,
      passportLeads: Array.isArray(parsed.passportLeads)
        ? parsed.passportLeads
        : INITIAL_LEADS,
    };
  } catch {
    return {
      inquiries: INITIAL_INQUIRIES,
      passportLeads: INITIAL_LEADS,
    };
  }
}

function writeServerDb(data: ServerDatabaseShape) {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error writing server DB:', err);
  }
}

// Ensure Supabase storage bucket `bzal-drawings` exists using secret key
async function ensureSupabaseBucket() {
  try {
    await supabaseAdmin.storage.createBucket('bzal-drawings', {
      public: true,
    });
  } catch {
    // Bucket already exists or ignore
  }
}

function requireSpecialistAuth(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res
      .status(401)
      .json({ error: 'Требуется авторизация специалиста отдела маркетинга' });
    return;
  }
  const token = authHeader.slice('Bearer '.length).trim();
  const check = verifyAdminToken(token);
  if (!check.valid) {
    res
      .status(401)
      .json({ error: 'Недействительный токен доступа специалиста' });
    return;
  }
  next();
}

async function startServer() {
  const app = express();
  app.use(express.json({ limit: '10mb' }));

  // Security headers middleware
  app.use((_req: Request, res: Response, next: NextFunction) => {
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
    res.setHeader('X-XSS-Protection', '1; mode=block');
    next();
  });

  function generateNextInquiryNumber(inquiries: ServerRfqInquiry[]): string {
    const year = new Date().getFullYear();
    const maxNum = inquiries.reduce((max, item) => {
      const m = String(item.inquiry_number || '').match(/(\d+)$/);
      const num = m ? parseInt(m[1], 10) : 0;
      return num > max ? num : max;
    }, 100);
    return `БЗАЛ-${year}-${String(maxNum + 1).padStart(4, '0')}`;
  }

  // Initialize storage bucket in background
  ensureSupabaseBucket();

  // =========================================================================
  // 1. PUBLIC API ROUTES (Write-Only for Clients — NO access to read inquiries)
  // =========================================================================

  app.post('/api/public/inquiries', async (req: Request, res: Response) => {
    try {
      const body = req.body || {};
      const clientName = sanitizeStr(body.client_name, 160);
      const phone = sanitizeStr(body.phone, 60);
      const email = sanitizeStr(body.email, 160);

      if (!clientName && !phone && !email) {
        res.status(400).json({ error: 'Укажите контактные данные для связи' });
        return;
      }

      const db = readServerDb();
      const inquiryNumber = generateNextInquiryNumber(db.inquiries);
      const now = new Date().toISOString();

      const safeFiles = Array.isArray(body.drawing_files)
        ? body.drawing_files.slice(0, 10).map((f: Record<string, unknown>) => ({
            name: sanitizeStr(f?.name, 200),
            size: Math.max(0, Number(f?.size) || 0),
            storage_path: f?.storage_path ? sanitizeStr(f.storage_path, 300) : undefined,
            uploaded_at: sanitizeStr(f?.uploaded_at || now, 50),
          }))
        : [];

      const allowedSources = ['calculator', 'modal', 'manual'] as const;
      const source = allowedSources.includes(body.source) ? body.source : 'calculator';
      const allowedPref = ['phone', 'email', 'both'] as const;
      const preferredContact = allowedPref.includes(body.preferred_contact)
        ? body.preferred_contact
        : 'both';

      const newInquiry: ServerRfqInquiry = {
        id: `inq-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
        inquiry_number: inquiryNumber,
        source,
        client_name: clientName,
        company: sanitizeStr(body.company, 200),
        phone,
        email,
        preferred_contact: preferredContact,
        service_type: sanitizeStr(body.service_type, 250),
        has_drawings: sanitizeStr(body.has_drawings, 150),
        material: sanitizeStr(body.material, 200),
        quantity: sanitizeStr(body.quantity, 150),
        drawing_files: safeFiles,
        comments: sanitizeStr(body.comments, 2000),
        status: 'new_marketing',
        assigned_department: 'marketing',
        feedback_status: 'pending',
        estimated_amount_byn: Math.min(100_000_000, Math.max(0, Number(body.estimated_amount_byn) || 35000)),
        internal_notes:
          'Заявка поступила с сайта в отдел маркетинга и продаж (Пн–Пт 08:00–16:30). Ожидает первичной проверки и передачи в ОГК / ОГТ.',
        created_at: now,
      };

      db.inquiries = [newInquiry, ...db.inquiries];
      writeServerDb(db);

      // Also insert into Supabase using Secret Key if table exists
      try {
        await supabaseAdmin.from('rfq_inquiries').insert([newInquiry]);
      } catch {
        // Table may not be initialized yet
      }

      // Return ONLY the registration number to the public client (strictly confidential!)
      res.json({
        success: true,
        inquiry_number: newInquiry.inquiry_number,
        created_at: newInquiry.created_at,
      });
    } catch (error) {
      console.error('Failed to create public inquiry:', error);
      res.status(500).json({ error: 'Ошибка регистрации заявки' });
    }
  });

  app.post('/api/public/passport-leads', async (req: Request, res: Response) => {
    try {
      const body = req.body || {};
      const contactName = sanitizeStr(body.contact_name, 160);
      const company = sanitizeStr(body.company, 200);
      const email = sanitizeStr(body.email, 160);

      if (!email || !email.includes('@')) {
        res.status(400).json({ error: 'Укажите корректный корпоративный Email' });
        return;
      }

      const db = readServerDb();
      const newLead: ServerPassportLead = {
        id: `lead-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
        contact_name: contactName,
        company,
        email,
        created_at: new Date().toISOString(),
      };

      db.passportLeads = [newLead, ...db.passportLeads];
      writeServerDb(db);

      try {
        await supabaseAdmin.from('passport_leads').insert([newLead]);
      } catch {
        // Ignore if table not created yet
      }

      res.json({ success: true });
    } catch (error) {
      console.error('Failed to save passport lead:', error);
      res.status(500).json({ error: 'Ошибка сохранения контакта' });
    }
  });

  app.get('/api/public/inquiry-status', (req: Request, res: Response) => {
    const rawNum = sanitizeStr(req.query.number, 40).toUpperCase();
    // Require at least 4 characters (e.g., "0101" or "БЗАЛ-2026-0101") to prevent 1-char enumeration
    if (!rawNum || rawNum.length < 4) {
      res.status(400).json({ found: false, error: 'Укажите полный номер заявки (минимум 4 цифры, например 0101)' });
      return;
    }

    const db = readServerDb();
    const match = db.inquiries.find((i) => {
      const norm = i.inquiry_number.toUpperCase();
      return norm === rawNum || norm.endsWith(`-${rawNum}`) || (rawNum.length >= 4 && norm.endsWith(rawNum));
    });

    if (!match) {
      res.status(404).json({ found: false });
      return;
    }

    // Return ONLY non-confidential stage fields (no phone, email, company, or internal notes)
    res.json({
      found: true,
      statusInfo: {
        inquiry_number: match.inquiry_number,
        created_at: match.created_at,
        service_type: match.service_type,
        status: match.status,
        assigned_department: match.assigned_department,
        feedback_status: match.feedback_status,
        drawings_count: Array.isArray(match.drawing_files) ? match.drawing_files.length : 0,
      },
    });
  });

  // =========================================================================
  // 2. PROTECTED ADMIN API ROUTES (Only for Specialist makc.kuxta@gmail.com)
  // =========================================================================

  app.post('/api/admin/login', (req: Request, res: Response) => {
    const clientIp = String(req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'unknown');
    if (!checkLoginRateLimit(clientIp)) {
      res.status(429).json({
        error: 'Слишком много попыток входа. Повторите попытку через 15 минут.',
      });
      return;
    }

    const { email, password } = req.body || {};
    const normalizedEmail = sanitizeStr(email, 160).toLowerCase();
    const cleanPass = sanitizeStr(password, 100);

    if (
      ALLOWED_EMAILS.includes(normalizedEmail) &&
      isValidAdminPassword(cleanPass)
    ) {
      loginAttempts.delete(clientIp);
      const token = createAdminToken(normalizedEmail);
      res.json({
        success: true,
        token,
        user: {
          email: normalizedEmail,
          role: 'Специалист отдела маркетинга и продаж ОАО БЗАЛ',
        },
      });
      return;
    }

    res.status(401).json({
      error:
        'Неверный Email специалиста или код доступа. Доступ разрешён только уполномоченным сотрудникам ОАО БЗАЛ.',
    });
  });

  app.post(
    '/api/admin/change-password',
    requireSpecialistAuth,
    (req: Request, res: Response) => {
      const { currentPassword, newPassword } = req.body || {};
      const cleanCurrent = sanitizeStr(currentPassword, 100);
      const cleanNew = sanitizeStr(newPassword, 100);

      if (!isValidAdminPassword(cleanCurrent)) {
        res.status(400).json({
          success: false,
          error: 'Текущий пароль введён неверно.',
        });
        return;
      }

      if (cleanNew.length < 4) {
        res.status(400).json({
          success: false,
          error: 'Новый пароль должен содержать минимум 4 символа.',
        });
        return;
      }

      saveCustomAdminPassword(cleanNew);
      res.json({
        success: true,
        message: 'Пароль доступа в админ-панель успешно изменён и сохранён на сервере.',
      });
    }
  );

  app.get(
    '/api/admin/data',
    requireSpecialistAuth,
    async (_req: Request, res: Response) => {
      const db = readServerDb();
      let supabaseTablesReady = false;
      let supabaseMessage =
        'Сервер подключён к Supabase (htwkoxioebrgysccoomg.supabase.co) через Secret Key';

      try {
        const { data, error } = await supabaseAdmin
          .from('rfq_inquiries')
          .select('*')
          .order('created_at', { ascending: false });

        if (!error && Array.isArray(data)) {
          supabaseTablesReady = true;
          if (data.length > 0) {
            db.inquiries = data as ServerRfqInquiry[];
            writeServerDb(db);
          } else {
            // Seed Supabase automatically using Secret Key!
            await supabaseAdmin
              .from('rfq_inquiries')
              .upsert(db.inquiries, { onConflict: 'id' });
          }
          supabaseMessage =
            'Подключено к облаку Supabase (Secret Key активен, таблицы синхронизированы)';
        } else if (error) {
          supabaseMessage =
            'Серверная БД активна. Для дублирования в таблицах Supabase выполните SQL-скрипт в SQL Editor.';
        }
      } catch {
        // Fallback to server DB
      }

      res.json({
        inquiries: db.inquiries,
        passportLeads: db.passportLeads,
        supabaseStatus: {
          connected: true,
          tablesReady: supabaseTablesReady,
          message: supabaseMessage,
          url: SUPABASE_URL,
          publishableKeyConfigured: Boolean(SUPABASE_PUBLISHABLE_KEY),
          secretKeyConfigured: Boolean(SUPABASE_SECRET_KEY),
        },
      });
    }
  );

  app.post(
    '/api/admin/inquiries',
    requireSpecialistAuth,
    async (req: Request, res: Response) => {
      const db = readServerDb();
      const inquiryNumber = generateNextInquiryNumber(db.inquiries);
      const now = new Date().toISOString();
      const body = req.body || {};

      const newInquiry: ServerRfqInquiry = {
        id: `inq-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
        inquiry_number: inquiryNumber,
        source: 'manual',
        client_name: sanitizeStr(body.client_name, 160),
        company: sanitizeStr(body.company, 200),
        phone: sanitizeStr(body.phone, 60),
        email: sanitizeStr(body.email, 160),
        preferred_contact: body.preferred_contact || 'phone',
        service_type: sanitizeStr(body.service_type, 250),
        has_drawings: sanitizeStr(body.has_drawings, 150),
        material: sanitizeStr(body.material, 200),
        quantity: sanitizeStr(body.quantity, 150),
        drawing_files: [],
        comments: sanitizeStr(body.comments, 2000),
        status: 'new_marketing',
        assigned_department: 'marketing',
        feedback_status: 'pending',
        estimated_amount_byn: Math.min(100_000_000, Math.max(0, Number(body.estimated_amount_byn) || 35000)),
        internal_notes:
          'Зарегистрировано специалистом отдела маркетинга и продаж при телефонном обращении.',
        created_at: now,
      };

      db.inquiries = [newInquiry, ...db.inquiries];
      writeServerDb(db);

      try {
        await supabaseAdmin.from('rfq_inquiries').insert([newInquiry]);
      } catch {
        // ignore
      }

      res.json({ inquiry: newInquiry });
    }
  );

  app.patch(
    '/api/admin/inquiries/:id',
    requireSpecialistAuth,
    async (req: Request, res: Response) => {
      const { id } = req.params;
      const raw = req.body || {};
      const db = readServerDb();

      // Strict allowlist to prevent mass assignment of id / inquiry_number / created_at
      const safeUpdates: Partial<ServerRfqInquiry> = {};
      if (typeof raw.status === 'string') safeUpdates.status = raw.status as ServerRfqInquiry['status'];
      if (typeof raw.assigned_department === 'string') {
        safeUpdates.assigned_department = raw.assigned_department as ServerRfqInquiry['assigned_department'];
      }
      if (typeof raw.feedback_status === 'string') {
        safeUpdates.feedback_status = raw.feedback_status as ServerRfqInquiry['feedback_status'];
      }
      if (raw.estimated_amount_byn !== undefined) {
        safeUpdates.estimated_amount_byn = Math.min(
          100_000_000,
          Math.max(0, Number(raw.estimated_amount_byn) || 0)
        );
      }
      if (typeof raw.internal_notes === 'string') {
        safeUpdates.internal_notes = sanitizeStr(raw.internal_notes, 3000);
      }

      let updatedItem: ServerRfqInquiry | null = null;
      db.inquiries = db.inquiries.map((item) => {
        if (item.id === id) {
          const nextItem: ServerRfqInquiry = { ...item, ...safeUpdates };
          updatedItem = nextItem;
          return nextItem;
        }
        return item;
      });

      writeServerDb(db);

      try {
        await supabaseAdmin
          .from('rfq_inquiries')
          .update(safeUpdates)
          .eq('id', id);
      } catch {
        // ignore
      }

      res.json({ updated: updatedItem });
    }
  );

  app.delete(
    '/api/admin/inquiries/:id',
    requireSpecialistAuth,
    async (req: Request, res: Response) => {
      const { id } = req.params;
      const db = readServerDb();
      db.inquiries = db.inquiries.filter((i) => i.id !== id);
      writeServerDb(db);

      try {
        await supabaseAdmin.from('rfq_inquiries').delete().eq('id', id);
      } catch {
        // ignore
      }

      res.json({ success: true });
    }
  );

  app.post(
    '/api/admin/sync-supabase',
    requireSpecialistAuth,
    async (_req: Request, res: Response) => {
      const db = readServerDb();
      await ensureSupabaseBucket();

      try {
        const { error: inqError } = await supabaseAdmin
          .from('rfq_inquiries')
          .upsert(db.inquiries, { onConflict: 'id' });

        if (inqError) {
          res.json({
            success: false,
            message: `Серверная база данных работает штатно. Чтобы дублировать таблицы в Supabase SQL, выполните SQL-скрипт в разделе SQL Editor (${inqError.message}).`,
          });
          return;
        }

        await supabaseAdmin
          .from('passport_leads')
          .upsert(db.passportLeads, { onConflict: 'id' });

        res.json({
          success: true,
          message: `Сервер успешно синхронизировал ${db.inquiries.length} заявок и ${db.passportLeads.length} контактов с облаком Supabase через Secret Key!`,
        });
      } catch (err) {
        res.json({
          success: false,
          message:
            err instanceof Error
              ? err.message
              : 'Ошибка соединения с Supabase',
        });
      }
    }
  );

  // =========================================================================
  // 2B. CMS CONTENT & PHOTO MANAGEMENT ENDPOINTS
  // =========================================================================
  const CMS_DB_FILE = path.join(DATA_DIR, 'bzal_cms_db.json');
  const SUPABASE_CMS_PATH = 'cms/site_cms_config.json';

  app.get('/api/public/cms', async (_req: Request, res: Response) => {
    try {
      if (fs.existsSync(CMS_DB_FILE)) {
        const raw = fs.readFileSync(CMS_DB_FILE, 'utf-8');
        const parsed = JSON.parse(raw);
        if (parsed && parsed.languages) {
          res.json({ cmsConfig: parsed });
          return;
        }
      }

      // Try loading from Supabase Storage if not on local disk
      const { data, error } = await supabaseAdmin.storage
        .from('bzal-drawings')
        .download(SUPABASE_CMS_PATH);
      if (!error && data) {
        const text = await data.text();
        const parsed = JSON.parse(text);
        if (parsed && parsed.languages) {
          if (!fs.existsSync(DATA_DIR)) {
            fs.mkdirSync(DATA_DIR, { recursive: true });
          }
          fs.writeFileSync(CMS_DB_FILE, JSON.stringify(parsed, null, 2), 'utf-8');
          res.json({ cmsConfig: parsed });
          return;
        }
      }
    } catch {
      // ignore
    }

    res.json({ cmsConfig: null });
  });

  app.put(
    '/api/admin/cms',
    requireSpecialistAuth,
    async (req: Request, res: Response) => {
      try {
        const cmsConfig = req.body?.cmsConfig;
        if (!cmsConfig || !cmsConfig.languages) {
          res.status(400).json({ error: 'Invalid CMS payload' });
          return;
        }

        if (!fs.existsSync(DATA_DIR)) {
          fs.mkdirSync(DATA_DIR, { recursive: true });
        }
        fs.writeFileSync(
          CMS_DB_FILE,
          JSON.stringify(cmsConfig, null, 2),
          'utf-8'
        );

        await ensureSupabaseBucket();
        await supabaseAdmin.storage
          .from('bzal-drawings')
          .upload(
            SUPABASE_CMS_PATH,
            Buffer.from(JSON.stringify(cmsConfig, null, 2), 'utf-8'),
            {
              contentType: 'application/json',
              upsert: true,
            }
          );

        res.json({ success: true });
      } catch (err) {
        res.status(500).json({
          error: err instanceof Error ? err.message : 'Failed to save CMS',
        });
      }
    }
  );

  app.delete(
    '/api/admin/cms',
    requireSpecialistAuth,
    async (_req: Request, res: Response) => {
      try {
        if (fs.existsSync(CMS_DB_FILE)) {
          fs.unlinkSync(CMS_DB_FILE);
        }
        await supabaseAdmin.storage
          .from('bzal-drawings')
          .remove([SUPABASE_CMS_PATH]);
      } catch {
        // ignore
      }
      res.json({ success: true });
    }
  );

  app.post(
    '/api/admin/upload-image',
    requireSpecialistAuth,
    async (req: Request, res: Response) => {
      try {
        const { fileName, contentType, base64Data } = req.body || {};
        if (!fileName || !base64Data) {
          res.status(400).json({ error: 'Missing fileName or base64Data' });
          return;
        }

        const allowedMimes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
        const cleanMime = String(contentType || 'image/jpeg').toLowerCase();
        if (!allowedMimes.includes(cleanMime)) {
          res.status(400).json({ error: 'Разрешены только изображения JPG, PNG, WEBP или GIF' });
          return;
        }

        const extMatch = String(fileName).toLowerCase().match(/\.(jpg|jpeg|png|webp|gif)$/);
        const ext = extMatch ? extMatch[0] : '.jpg';
        const baseName = path
          .basename(String(fileName), path.extname(String(fileName)))
          .replace(/[^a-zA-Z0-9_-]/g, '_')
          .slice(0, 60);

        const buffer = Buffer.from(String(base64Data), 'base64');
        if (buffer.length > 6 * 1024 * 1024) {
          res.status(400).json({ error: 'Размер изображения превышает 6 МБ' });
          return;
        }

        await ensureSupabaseBucket();
        const stampedName = `${Date.now()}_${baseName || 'img'}${ext}`;

        // 1. Save to local public/images/uploads so it works locally as well
        const uploadsDir = path.join(
          import.meta.dirname,
          'public',
          'images',
          'uploads'
        );
        if (!fs.existsSync(uploadsDir)) {
          fs.mkdirSync(uploadsDir, { recursive: true });
        }
        fs.writeFileSync(path.join(uploadsDir, stampedName), buffer);

        // 2. Upload to Supabase Storage for permanent cloud URL
        const storagePath = `cms-images/${stampedName}`;
        const { error } = await supabaseAdmin.storage
          .from('bzal-drawings')
          .upload(storagePath, buffer, {
            contentType: cleanMime,
            upsert: true,
          });

        if (!error) {
          const { data: pub } = supabaseAdmin.storage
            .from('bzal-drawings')
            .getPublicUrl(storagePath);
          if (pub?.publicUrl) {
            res.json({ publicUrl: pub.publicUrl });
            return;
          }
        }

        res.json({ publicUrl: `/images/uploads/${stampedName}` });
      } catch (err) {
        res.status(500).json({
          error: err instanceof Error ? err.message : 'Image upload failed',
        });
      }
    }
  );

  // =========================================================================
  // 2C. HEALTHCHECK ENDPOINT (For Docker, Nginx, and VPS Deployment)
  // =========================================================================
  app.get('/api/health', (_req: Request, res: Response) => {
    res.json({
      status: 'ok',
      service: 'technopark-bzal-portal',
      env: process.env.NODE_ENV || 'development',
      timestamp: new Date().toISOString(),
    });
  });

  // Always serve dynamically uploaded CMS images from public/images/uploads
  const runtimeUploadsDir = path.join(
    import.meta.dirname,
    'public',
    'images',
    'uploads'
  );
  if (!fs.existsSync(runtimeUploadsDir)) {
    fs.mkdirSync(runtimeUploadsDir, { recursive: true });
  }
  app.use('/images/uploads', express.static(runtimeUploadsDir));

  // =========================================================================
  // 3. VITE MIDDLEWARE (DEV) OR STATIC ASSETS (PROD)
  // =========================================================================
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(import.meta.dirname, 'dist');
    app.use(express.static(distPath, { maxAge: '7d', index: false }));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`BZAL Full-Stack Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
