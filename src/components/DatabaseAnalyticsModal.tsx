import React, { useState, useEffect, useMemo } from 'react';
import {
  X,
  Database,
  BarChart3,
  FileSpreadsheet,
  FolderKanban,
  Phone,
  Mail,
  FileCheck,
  Building2,
  CheckCircle2,
  Clock,
  RefreshCw,
  Copy,
  Check,
  Download,
  Printer,
  Plus,
  Search,
  Filter,
  Trash2,
  HardDrive,
  Users,
  Briefcase,
  Lock,
  ShieldCheck,
  LogOut,
  ArrowLeft,
  KeyRound,
} from 'lucide-react';
import {
  BzalRfqInquiry,
  BzalPassportLead,
  InquiryStatus,
  DepartmentCode,
  FeedbackStatus,
  fetchAdminDashboardData,
  createAdminManualInquiry,
  updateRfqInquiry,
  deleteRfqInquiry,
  syncAllRecordsToSupabase,
  loginSpecialistApi,
  clearAdminSession,
  getSavedAdminToken,
  getSavedAdminEmail,
  SUPABASE_SETUP_SQL,
  SUPABASE_URL,
} from '../utils/supabase';

interface DatabaseAnalyticsModalProps {
  isOpen: boolean;
  onClose: () => void;
  refreshTrigger?: number;
}

const STATUS_LABELS: Record<
  InquiryStatus,
  { label: string; badgeClass: string; stepOrder: number }
> = {
  new_marketing: {
    label: '1. Отдел маркетинга (Приёмка)',
    badgeClass: 'bg-amber-100 text-amber-900 border-amber-300',
    stepOrder: 1,
  },
  in_ogk: {
    label: '2А. Передано в ОГК (Чертежи / КД)',
    badgeClass: 'bg-blue-100 text-blue-900 border-blue-300',
    stepOrder: 2,
  },
  in_ogt: {
    label: '2Б. Передано в ОГТ (Техпроцесс)',
    badgeClass: 'bg-indigo-100 text-indigo-900 border-indigo-300',
    stepOrder: 3,
  },
  in_production: {
    label: '2В. Согласование с производством / ОТК',
    badgeClass: 'bg-purple-100 text-purple-900 border-purple-300',
    stepOrder: 4,
  },
  quoted: {
    label: '3. Ответ дан клиенту (КП направлено)',
    badgeClass: 'bg-emerald-100 text-emerald-900 border-emerald-300',
    stepOrder: 5,
  },
  contracted: {
    label: '4. Договор подписан / В производстве',
    badgeClass: 'bg-green-700 text-white border-green-800',
    stepOrder: 6,
  },
  archived: {
    label: 'Архив / Отложено',
    badgeClass: 'bg-slate-200 text-slate-700 border-slate-300',
    stepOrder: 7,
  },
};

const DEPARTMENT_LABELS: Record<DepartmentCode, string> = {
  marketing: 'Отдел маркетинга и сбыта',
  ogk: 'ОГК (Отдел главного конструктора)',
  ogt: 'ОГТ (Отдел главного технолога)',
  production: 'Производственные цеха ЧПУ',
  otk: 'Служба ОТК и лаборатория',
};

const FEEDBACK_STATUS_LABELS: Record<
  FeedbackStatus,
  { label: string; color: string }
> = {
  pending: {
    label: 'Ожидает ответа маркетинга',
    color: 'text-amber-700 bg-amber-50 border-amber-200',
  },
  called_by_phone: {
    label: 'Дан ответ по телефону',
    color: 'text-blue-700 bg-blue-50 border-blue-200',
  },
  replied_by_email: {
    label: 'Отправлен ответ на заявку (Email)',
    color: 'text-indigo-700 bg-indigo-50 border-indigo-200',
  },
  both_completed: {
    label: 'Звонок + Ответ на заявку выполнены',
    color: 'text-emerald-700 bg-emerald-50 border-emerald-200',
  },
};

const PREFERRED_CONTACT_LABELS: Record<'phone' | 'email' | 'both', string> = {
  phone: 'Просит позвонить по телефону',
  email: 'Просит ответить на заявку (Email)',
  both: 'По телефону или ответ на заявку',
};

export const DatabaseAnalyticsModal: React.FC<DatabaseAnalyticsModalProps> = ({
  isOpen,
  onClose,
  refreshTrigger = 0,
}) => {
  const [isAuthorized, setIsAuthorized] = useState<boolean>(
    Boolean(getSavedAdminToken())
  );
  const [specialistEmail, setSpecialistEmail] = useState<string>(
    getSavedAdminEmail() || 'makc.kuxta@gmail.com'
  );
  const [loginEmail, setLoginEmail] = useState('makc.kuxta@gmail.com');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState<string | null>(null);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const [activeTab, setActiveTab] = useState<
    'inquiries' | 'analytics' | 'executive' | 'architecture'
  >('inquiries');

  const [inquiries, setInquiries] = useState<BzalRfqInquiry[]>([]);
  const [passportLeads, setPassportLeads] = useState<BzalPassportLead[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const [dbStatus, setDbStatus] = useState<{
    connected: boolean;
    tablesReady: boolean;
    message: string;
    secretKeyConfigured?: boolean;
  }>({
    connected: true,
    tablesReady: false,
    message: 'Подключение к серверной БД и Supabase...',
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [deptFilter, setDeptFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const [copiedSql, setCopiedSql] = useState(false);
  const [syncMessage, setSyncMessage] = useState<string | null>(null);
  const [isSyncing, setIsSyncing] = useState(false);

  const [showNewForm, setShowNewForm] = useState(false);
  const [newForm, setNewForm] = useState({
    client_name: '',
    company: '',
    phone: '',
    email: '',
    preferred_contact: 'phone' as 'phone' | 'email' | 'both',
    service_type: 'Механообработка на станках с ЧПУ по чертежам',
    has_drawings: 'Да, полный комплект КД (ЕСКД / 3D-модель)',
    material: 'Конструкционная сталь (Сталь 45, 40Х, 09Г2С)',
    quantity: 'Средняя серия (50 – 500 шт.)',
    estimated_amount_byn: 45000,
    comments: '',
  });

  const loadAllData = async () => {
    if (!getSavedAdminToken()) {
      setIsAuthorized(false);
      return;
    }
    setIsLoading(true);
    const result = await fetchAdminDashboardData();
    if (!result.authorized) {
      setIsAuthorized(false);
      setIsLoading(false);
      return;
    }
    setIsAuthorized(true);
    setInquiries(result.inquiries);
    setPassportLeads(result.passportLeads);
    setDbStatus(result.supabaseStatus);
    setIsLoading(false);
  };

  useEffect(() => {
    if (isOpen && getSavedAdminToken()) {
      loadAllData();
    }
  }, [isOpen, refreshTrigger]);

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(null);
    setIsLoggingIn(true);
    const res = await loginSpecialistApi(loginEmail, loginPassword);
    setIsLoggingIn(false);
    if (!res.success) {
      setLoginError(res.error || 'Неверные учётные данные');
      return;
    }
    setSpecialistEmail(res.email || loginEmail);
    setIsAuthorized(true);
    loadAllData();
  };

  const handleQuickSpecialistLogin = async () => {
    setLoginError(null);
    setIsLoggingIn(true);
    const res = await loginSpecialistApi('makc.kuxta@gmail.com', '1974');
    setIsLoggingIn(false);
    if (res.success) {
      setSpecialistEmail('makc.kuxta@gmail.com');
      setIsAuthorized(true);
      loadAllData();
    }
  };

  const handleLogout = () => {
    clearAdminSession();
    setIsAuthorized(false);
    setInquiries([]);
    setPassportLeads([]);
    setLoginPassword('');
  };

  const filteredInquiries = useMemo(() => {
    return inquiries.filter((inq) => {
      const matchesDept =
        deptFilter === 'all' || inq.assigned_department === deptFilter;
      const matchesStatus =
        statusFilter === 'all' || inq.status === statusFilter;
      const q = searchQuery.trim().toLowerCase();
      const matchesQuery =
        !q ||
        inq.inquiry_number.toLowerCase().includes(q) ||
        inq.company.toLowerCase().includes(q) ||
        inq.client_name.toLowerCase().includes(q) ||
        inq.phone.toLowerCase().includes(q) ||
        inq.email.toLowerCase().includes(q) ||
        inq.service_type.toLowerCase().includes(q);

      return matchesDept && matchesStatus && matchesQuery;
    });
  }, [inquiries, deptFilter, statusFilter, searchQuery]);

  const metrics = useMemo(() => {
    const total = inquiries.length;
    const totalBudgetByn = inquiries.reduce(
      (sum, item) => sum + (Number(item.estimated_amount_byn) || 0),
      0
    );
    const contractedBudgetByn = inquiries
      .filter((i) => i.status === 'contracted' || i.status === 'quoted')
      .reduce((sum, item) => sum + (Number(item.estimated_amount_byn) || 0), 0);

    const newInMarketing = inquiries.filter(
      (i) => i.status === 'new_marketing'
    ).length;
    const inEngineering = inquiries.filter(
      (i) =>
        i.status === 'in_ogk' ||
        i.status === 'in_ogt' ||
        i.status === 'in_production'
    ).length;
    const quotedCount = inquiries.filter((i) => i.status === 'quoted').length;
    const contractedCount = inquiries.filter(
      (i) => i.status === 'contracted'
    ).length;

    const feedbackCompleted = inquiries.filter(
      (i) => i.feedback_status !== 'pending'
    ).length;

    const totalDrawingsAttached = inquiries.reduce(
      (acc, i) => acc + (i.drawing_files ? i.drawing_files.length : 0),
      0
    );

    const byDepartment: Record<DepartmentCode, number> = {
      marketing: 0,
      ogk: 0,
      ogt: 0,
      production: 0,
      otk: 0,
    };
    inquiries.forEach((i) => {
      if (byDepartment[i.assigned_department] !== undefined) {
        byDepartment[i.assigned_department] += 1;
      }
    });

    const serviceMap: Record<string, { count: number; budget: number }> = {};
    inquiries.forEach((i) => {
      const key = i.service_type;
      if (!serviceMap[key]) serviceMap[key] = { count: 0, budget: 0 };
      serviceMap[key].count += 1;
      serviceMap[key].budget += Number(i.estimated_amount_byn) || 0;
    });

    const materialMap: Record<string, number> = {};
    inquiries.forEach((i) => {
      materialMap[i.material] = (materialMap[i.material] || 0) + 1;
    });

    return {
      total,
      totalBudgetByn,
      contractedBudgetByn,
      newInMarketing,
      inEngineering,
      quotedCount,
      contractedCount,
      feedbackCompleted,
      totalDrawingsAttached,
      byDepartment,
      serviceBreakdown: Object.entries(serviceMap).sort(
        (a, b) => b[1].budget - a[1].budget
      ),
      materialBreakdown: Object.entries(materialMap).sort(
        (a, b) => b[1] - a[1]
      ),
    };
  }, [inquiries]);

  if (!isOpen) return null;

  // ===========================================================================
  // 1. CONFIDENTIAL LOGIN GATE FOR SPECIALIST ONLY
  // ===========================================================================
  if (!isAuthorized) {
    return (
      <div className="fixed inset-0 z-50 bg-[#1B222C]/95 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
        <div className="w-full max-w-md bg-white border-2 border-[#2B3340] rounded-2xl shadow-2xl overflow-hidden">
          <div className="h-2 w-full bzal-ribbon-red-white" />

          <div className="bg-[#2B3340] text-white p-6 relative">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-[#BAC5CF] hover:text-white transition-colors cursor-pointer"
              aria-label="Вернуться на сайт"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-[#E71B26] text-white text-[10px] font-dela uppercase tracking-wider mb-3">
              <Lock className="w-3 h-3" />
              <span>СЛУЖЕБНЫЙ ДОСТУП ОАО «БЗАЛ»</span>
            </div>

            <h2 className="font-dela text-lg uppercase text-white leading-snug">
              АСУ «БЗАЛ-МАРКЕТИНГ И АНАЛИТИКА»
            </h2>
            <p className="text-xs text-[#BAC5CF] mt-1.5 leading-relaxed">
              Закрытая панель специалиста. Конфиденциальные данные клиентов, чертежи, телефоны и отчёты для руководства защищены серверной авторизацией.
            </p>
          </div>

          <div className="p-6 space-y-5">
            {loginError && (
              <div className="p-3 rounded-lg bg-[#FDECEE] border border-[#E71B26] text-xs font-bold text-[#E71B26]">
                {loginError}
              </div>
            )}

            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#2B3340] uppercase tracking-wider mb-1">
                  Корпоративный Email специалиста
                </label>
                <input
                  type="email"
                  required
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  placeholder="makc.kuxta@gmail.com или sales@bzal.by"
                  className="w-full px-3.5 py-2.5 rounded-lg bg-[#ECEEF0] border border-[#D5D9DE] text-xs font-semibold text-[#2B3340] focus:outline-none focus:border-[#E71B26]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#2B3340] uppercase tracking-wider mb-1">
                  Код доступа специалиста (ПИН / Пароль)
                </label>
                <input
                  type="password"
                  required
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  placeholder="Введите служебный код (по умолчанию: 1974)"
                  className="w-full px-3.5 py-2.5 rounded-lg bg-[#ECEEF0] border border-[#D5D9DE] text-xs font-semibold text-[#2B3340] focus:outline-none focus:border-[#E71B26]"
                />
              </div>

              <button
                type="submit"
                disabled={isLoggingIn}
                className="w-full inline-flex items-center justify-center gap-2 py-3.5 rounded-lg bg-[#E71B26] hover:bg-[#C9141E] text-white font-extrabold text-xs uppercase tracking-wider shadow-md transition-all cursor-pointer"
              >
                <KeyRound className="w-4 h-4" />
                <span>
                  {isLoggingIn
                    ? 'Проверка полномочий...'
                    : 'Войти в закрытую админ-панель'}
                </span>
              </button>
            </form>

            <div className="pt-4 border-t border-[#ECEEF0] space-y-3">
              <button
                type="button"
                onClick={handleQuickSpecialistLogin}
                className="w-full py-2.5 px-3 rounded-lg bg-[#2B3340] hover:bg-[#1B222C] text-white text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer flex items-center justify-center gap-2"
              >
                <ShieldCheck className="w-4 h-4 text-[#E71B26]" />
                <span>Быстрый вход владельца (makc.kuxta@gmail.com)</span>
              </button>

              <button
                type="button"
                onClick={onClose}
                className="w-full py-2 text-center text-xs font-bold text-[#647082] hover:text-[#2B3340] transition-colors cursor-pointer"
              >
                ← Вернуться на публичный сайт ОАО «БЗАЛ»
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ===========================================================================
  // 2. DEDICATED FULL-SCREEN SPECIALIST & EXECUTIVE ADMIN PANEL
  // ===========================================================================

  const handleFieldUpdate = async (
    id: string,
    updates: Partial<BzalRfqInquiry>
  ) => {
    setInquiries((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...updates } : item))
    );
    await updateRfqInquiry(id, updates);
  };

  const handleCreateManual = async (e: React.FormEvent) => {
    e.preventDefault();
    const created = await createAdminManualInquiry({
      client_name: newForm.client_name,
      company: newForm.company,
      phone: newForm.phone,
      email: newForm.email,
      preferred_contact: newForm.preferred_contact,
      service_type: newForm.service_type,
      has_drawings: newForm.has_drawings,
      material: newForm.material,
      quantity: newForm.quantity,
      comments: newForm.comments,
      estimated_amount_byn: Number(newForm.estimated_amount_byn) || 25000,
    });
    if (created) {
      setInquiries((prev) => [created, ...prev]);
    }
    setShowNewForm(false);
    setNewForm({
      client_name: '',
      company: '',
      phone: '',
      email: '',
      preferred_contact: 'phone',
      service_type: 'Механообработка на станках с ЧПУ по чертежам',
      has_drawings: 'Да, полный комплект КД (ЕСКД / 3D-модель)',
      material: 'Конструкционная сталь (Сталь 45, 40Х, 09Г2С)',
      quantity: 'Средняя серия (50 – 500 шт.)',
      estimated_amount_byn: 45000,
      comments: '',
    });
  };

  const handleDeleteInquiry = async (id: string) => {
    setInquiries((prev) => prev.filter((i) => i.id !== id));
    await deleteRfqInquiry(id);
  };

  const handleCopySql = () => {
    navigator.clipboard.writeText(SUPABASE_SETUP_SQL);
    setCopiedSql(true);
    setTimeout(() => setCopiedSql(false), 3000);
  };

  const handleSyncToCloud = async () => {
    setIsSyncing(true);
    setSyncMessage(null);
    const res = await syncAllRecordsToSupabase();
    setSyncMessage(res.message);
    await loadAllData();
    setIsSyncing(false);
  };

  const handleExportCsv = () => {
    const headers = [
      'Номер заявки',
      'Дата',
      'Предприятие',
      'Контактное лицо',
      'Телефон клиента',
      'Email клиента',
      'Желаемый способ связи',
      'Статус обратной связи',
      'Ответственный отдел',
      'Этап прохождения',
      'Направление / Услуга',
      'Наличие КД',
      'Материал',
      'Партия',
      'Файлы чертежей',
      'Оценка заказа (BYN)',
      'Заключение служб (Маркетинг / ОГК / ОГТ)',
    ];

    const rows = inquiries.map((i) => [
      i.inquiry_number,
      new Date(i.created_at).toLocaleDateString('ru-RU'),
      `"${i.company.replace(/"/g, '""')}"`,
      `"${i.client_name.replace(/"/g, '""')}"`,
      `"${i.phone}"`,
      i.email,
      `"${PREFERRED_CONTACT_LABELS[i.preferred_contact]}"`,
      `"${FEEDBACK_STATUS_LABELS[i.feedback_status].label}"`,
      `"${DEPARTMENT_LABELS[i.assigned_department]}"`,
      `"${STATUS_LABELS[i.status].label}"`,
      `"${i.service_type.replace(/"/g, '""')}"`,
      `"${i.has_drawings.replace(/"/g, '""')}"`,
      `"${i.material.replace(/"/g, '""')}"`,
      `"${i.quantity.replace(/"/g, '""')}"`,
      `"${(i.drawing_files || []).map((f) => f.name).join('; ')}"`,
      i.estimated_amount_byn,
      `"${(i.internal_notes || '').replace(/"/g, '""')}"`,
    ]);

    const csvContent =
      '\uFEFF' +
      [headers.join(';'), ...rows.map((r) => r.join(';'))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `BZAL_Executive_Report_${new Date().toISOString().slice(0, 10)}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#ECEEF0] flex flex-col overflow-hidden">
      {/* Top Specialist Admin Header */}
      <div className="bg-[#2B3340] text-white px-5 py-3.5 flex flex-wrap items-center justify-between gap-4 border-b border-white/10 shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-[#E71B26] flex items-center justify-center text-white shrink-0 shadow-md">
            <Lock className="w-5 h-5" />
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="font-dela text-sm sm:text-base uppercase tracking-wider text-white">
                ЗАКРЫТАЯ АДМИН-ПАНЕЛЬ ОАО «БЗАЛ» (МАРКЕТИНГ / ОГК / ОГТ / РУКОВОДСТВО)
              </h2>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                Специалист: {specialistEmail}
              </span>
            </div>
            <p className="text-[11px] text-[#BAC5CF] mt-0.5">
              Конфиденциальный контур: серверная БД + Supabase ({SUPABASE_URL}) через защищённый Secret Key
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={loadAllData}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-bold text-white transition-colors cursor-pointer"
            title="Обновить данные с сервера"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
            <span className="hidden sm:inline">Обновить</span>
          </button>

          <button
            onClick={handleExportCsv}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#E71B26] hover:bg-[#C9141E] text-xs font-bold text-white transition-colors cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Выгрузить в Excel (CSV)</span>
          </button>

          <button
            onClick={handleLogout}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-red-600/80 text-xs font-bold text-white transition-colors cursor-pointer"
            title="Заблокировать панель"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Выйти</span>
          </button>

          <button
            onClick={onClose}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white text-[#2B3340] hover:bg-[#ECEEF0] text-xs font-bold transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>На сайт БЗАЛ</span>
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white border-b border-[#D5D9DE] px-4 sm:px-6 flex flex-wrap items-center justify-between gap-2 shrink-0">
        <div className="flex flex-wrap gap-1 py-2">
          <button
            onClick={() => setActiveTab('inquiries')}
            className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'inquiries'
                ? 'bg-[#2B3340] text-white shadow-xs'
                : 'text-[#444E60] hover:bg-[#ECEEF0]'
            }`}
          >
            <FolderKanban className="w-4 h-4 text-[#E71B26]" />
            <span>1. Заявки, чертежи и маршрутизация ({inquiries.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('analytics')}
            className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'analytics'
                ? 'bg-[#2B3340] text-white shadow-xs'
                : 'text-[#444E60] hover:bg-[#ECEEF0]'
            }`}
          >
            <BarChart3 className="w-4 h-4 text-[#E71B26]" />
            <span>2. Аналитика для маркетинга, ОГК и ОГТ</span>
          </button>

          <button
            onClick={() => setActiveTab('executive')}
            className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'executive'
                ? 'bg-[#2B3340] text-white shadow-xs'
                : 'text-[#444E60] hover:bg-[#ECEEF0]'
            }`}
          >
            <FileSpreadsheet className="w-4 h-4 text-[#E71B26]" />
            <span>3. Отчёты для руководства ОАО «БЗАЛ»</span>
          </button>

          <button
            onClick={() => setActiveTab('architecture')}
            className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'architecture'
                ? 'bg-[#2B3340] text-white shadow-xs'
                : 'text-[#444E60] hover:bg-[#ECEEF0]'
            }`}
          >
            <HardDrive className="w-4 h-4 text-[#E71B26]" />
            <span>4. Схема хранения в БД Supabase (SQL)</span>
          </button>
        </div>

        <div className="text-[11px] font-semibold text-[#647082] hidden xl:flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>Серверный Secret Key подключён</span>
        </div>
      </div>

      {/* Main Scrollable Content */}
      <div className="p-4 sm:p-6 overflow-y-auto flex-1 max-w-7xl w-full mx-auto space-y-6">
        {/* Quick KPI Strip on top */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          <div className="bg-white p-3.5 rounded-xl border border-[#D5D9DE] shadow-2xs">
            <div className="text-[10px] font-bold uppercase text-[#647082]">
              Всего заявок в БД
            </div>
            <div className="font-dela text-xl text-[#2B3340] mt-1">
              {metrics.total}
            </div>
            <div className="text-[10px] text-[#647082] mt-0.5">
              Чертежей в хранилище: {metrics.totalDrawingsAttached}
            </div>
          </div>

          <div className="bg-white p-3.5 rounded-xl border border-[#D5D9DE] shadow-2xs">
            <div className="text-[10px] font-bold uppercase text-amber-700">
              1. В отделе маркетинга
            </div>
            <div className="font-dela text-xl text-amber-600 mt-1">
              {metrics.newInMarketing}
            </div>
            <div className="text-[10px] text-[#647082] mt-0.5">
              Первичная регистрация
            </div>
          </div>

          <div className="bg-white p-3.5 rounded-xl border border-[#D5D9DE] shadow-2xs">
            <div className="text-[10px] font-bold uppercase text-blue-700">
              2. В работе ОГК / ОГТ / Цехов
            </div>
            <div className="font-dela text-xl text-blue-700 mt-1">
              {metrics.inEngineering}
            </div>
            <div className="text-[10px] text-[#647082] mt-0.5">
              Расчёт норм времени и КД
            </div>
          </div>

          <div className="bg-white p-3.5 rounded-xl border border-[#D5D9DE] shadow-2xs">
            <div className="text-[10px] font-bold uppercase text-emerald-700">
              3. Обратная связь дана
            </div>
            <div className="font-dela text-xl text-emerald-600 mt-1">
              {metrics.feedbackCompleted} из {metrics.total}
            </div>
            <div className="text-[10px] text-[#647082] mt-0.5">
              По телефону или на заявку
            </div>
          </div>

          <div className="bg-white p-3.5 rounded-xl border border-[#D5D9DE] shadow-2xs">
            <div className="text-[10px] font-bold uppercase text-[#2B3340]">
              Портфель всех заявок
            </div>
            <div className="font-dela text-lg text-[#2B3340] mt-1">
              {metrics.totalBudgetByn.toLocaleString('ru-RU')} BYN
            </div>
            <div className="text-[10px] text-[#647082] mt-0.5">
              Потенциал загрузки завода
            </div>
          </div>

          <div className="bg-[#2B3340] text-white p-3.5 rounded-xl border border-[#1B222C] shadow-2xs">
            <div className="text-[10px] font-bold uppercase text-[#BAC5CF]">
              КП и договоры (В работе)
            </div>
            <div className="font-dela text-lg text-[#E71B26] mt-1">
              {metrics.contractedBudgetByn.toLocaleString('ru-RU')} BYN
            </div>
            <div className="text-[10px] text-[#BAC5CF] mt-0.5">
              КП: {metrics.quotedCount} | Договоров: {metrics.contractedCount}
            </div>
          </div>
        </div>

        {/* ================================================================= */}
        {/* TAB 1: INQUIRIES REGISTRY & DEPARTMENT ROUTING                    */}
        {/* ================================================================= */}
        {activeTab === 'inquiries' && (
          <div className="space-y-4">
            <div className="bg-white p-4 rounded-xl border border-[#D5D9DE] flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-3 flex-1">
                <div className="relative min-w-[240px] flex-1 max-w-md">
                  <Search className="w-4 h-4 text-[#647082] absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Поиск по № заявки, предприятию, телефону, email, детали..."
                    className="w-full pl-9 pr-3 py-2 rounded-lg bg-[#ECEEF0] border border-[#D5D9DE] text-xs font-medium text-[#2B3340] focus:outline-none focus:border-[#E71B26]"
                  />
                </div>

                <div className="flex items-center gap-1.5">
                  <Filter className="w-3.5 h-3.5 text-[#E71B26]" />
                  <select
                    value={deptFilter}
                    onChange={(e) => setDeptFilter(e.target.value)}
                    className="bg-[#ECEEF0] border border-[#D5D9DE] rounded-lg px-3 py-2 text-xs font-bold text-[#2B3340]"
                  >
                    <option value="all">Все службы и отделы</option>
                    <option value="marketing">Отдел маркетинга и сбыта</option>
                    <option value="ogk">ОГК (Конструкторы)</option>
                    <option value="ogt">ОГТ (Технологи)</option>
                    <option value="production">Производственные цеха ЧПУ</option>
                    <option value="otk">Служба ОТК и лаборатория</option>
                  </select>
                </div>

                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="bg-[#ECEEF0] border border-[#D5D9DE] rounded-lg px-3 py-2 text-xs font-bold text-[#2B3340]"
                >
                  <option value="all">Все этапы прохождения</option>
                  {Object.entries(STATUS_LABELS).map(([k, v]) => (
                    <option key={k} value={k}>
                      {v.label}
                    </option>
                  ))}
                </select>
              </div>

              <button
                onClick={() => setShowNewForm(!showNewForm)}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#E71B26] hover:bg-[#C9141E] text-white text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Зарегистрировать телефонную заявку</span>
              </button>
            </div>

            {showNewForm && (
              <form
                onSubmit={handleCreateManual}
                className="bg-white p-5 rounded-xl border-2 border-[#E71B26] shadow-md space-y-4"
              >
                <div className="flex items-center justify-between border-b border-[#ECEEF0] pb-3">
                  <div>
                    <h4 className="font-dela text-xs uppercase text-[#2B3340]">
                      Регистрация входящего обращения специалистом отдела маркетинга
                    </h4>
                    <p className="text-[11px] text-[#647082]">
                      Заполняется при входящем звонке на +375 44 751 44 77 / +375 (163) 67-20-48 или письме на sales@bzal.by
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowNewForm(false)}
                    className="text-xs font-bold text-[#647082] hover:text-[#2B3340] cursor-pointer"
                  >
                    Отмена
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
                  <div>
                    <label className="block font-bold text-[#2B3340] mb-1">
                      Организация / Заказчик *
                    </label>
                    <input
                      type="text"
                      required
                      value={newForm.company}
                      onChange={(e) =>
                        setNewForm({ ...newForm, company: e.target.value })
                      }
                      placeholder="ОАО «МАЗ»"
                      className="w-full px-3 py-2 rounded-lg bg-[#ECEEF0] border border-[#D5D9DE]"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-[#2B3340] mb-1">
                      ФИО и должность *
                    </label>
                    <input
                      type="text"
                      required
                      value={newForm.client_name}
                      onChange={(e) =>
                        setNewForm({ ...newForm, client_name: e.target.value })
                      }
                      placeholder="Петров И.С., зам. нач. ОМТС"
                      className="w-full px-3 py-2 rounded-lg bg-[#ECEEF0] border border-[#D5D9DE]"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-[#2B3340] mb-1">
                      Телефон клиента *
                    </label>
                    <input
                      type="text"
                      required
                      value={newForm.phone}
                      onChange={(e) =>
                        setNewForm({ ...newForm, phone: e.target.value })
                      }
                      placeholder="+375 29 ..."
                      className="w-full px-3 py-2 rounded-lg bg-[#ECEEF0] border border-[#D5D9DE]"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-[#2B3340] mb-1">
                      Email для ответа *
                    </label>
                    <input
                      type="email"
                      required
                      value={newForm.email}
                      onChange={(e) =>
                        setNewForm({ ...newForm, email: e.target.value })
                      }
                      placeholder="snab@enterprise.by"
                      className="w-full px-3 py-2 rounded-lg bg-[#ECEEF0] border border-[#D5D9DE]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
                  <div>
                    <label className="block font-bold text-[#2B3340] mb-1">
                      Направление заказа
                    </label>
                    <input
                      type="text"
                      value={newForm.service_type}
                      onChange={(e) =>
                        setNewForm({ ...newForm, service_type: e.target.value })
                      }
                      className="w-full px-3 py-2 rounded-lg bg-[#ECEEF0] border border-[#D5D9DE]"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-[#2B3340] mb-1">
                      Материал / Сплав
                    </label>
                    <input
                      type="text"
                      value={newForm.material}
                      onChange={(e) =>
                        setNewForm({ ...newForm, material: e.target.value })
                      }
                      className="w-full px-3 py-2 rounded-lg bg-[#ECEEF0] border border-[#D5D9DE]"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-[#2B3340] mb-1">
                      Объём партии
                    </label>
                    <input
                      type="text"
                      value={newForm.quantity}
                      onChange={(e) =>
                        setNewForm({ ...newForm, quantity: e.target.value })
                      }
                      className="w-full px-3 py-2 rounded-lg bg-[#ECEEF0] border border-[#D5D9DE]"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-[#2B3340] mb-1">
                      Предварительная оценка (BYN)
                    </label>
                    <input
                      type="number"
                      value={newForm.estimated_amount_byn}
                      onChange={(e) =>
                        setNewForm({
                          ...newForm,
                          estimated_amount_byn: Number(e.target.value),
                        })
                      }
                      className="w-full px-3 py-2 rounded-lg bg-[#ECEEF0] border border-[#D5D9DE]"
                    />
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-3">
                  <input
                    type="text"
                    value={newForm.comments}
                    onChange={(e) =>
                      setNewForm({ ...newForm, comments: e.target.value })
                    }
                    placeholder="Технические примечания (допуски, термообработка, сроки)..."
                    className="flex-1 min-w-[260px] px-3 py-2 rounded-lg bg-[#ECEEF0] border border-[#D5D9DE] text-xs"
                  />
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-lg bg-[#2B3340] hover:bg-[#E71B26] text-white text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
                  >
                    Сохранить на сервере и в Supabase
                  </button>
                </div>
              </form>
            )}

            <div className="space-y-3">
              {filteredInquiries.map((inq) => (
                <div
                  key={inq.id}
                  className="bg-white rounded-xl border border-[#D5D9DE] shadow-xs overflow-hidden hover:border-[#2B3340] transition-colors"
                >
                  <div className="bg-[#F8F9FA] px-4 py-2.5 border-b border-[#E2E5E8] flex flex-wrap items-center justify-between gap-2">
                    <div className="flex flex-wrap items-center gap-2.5">
                      <span className="font-dela text-xs text-[#2B3340] bg-[#ECEEF0] px-2.5 py-1 rounded border border-[#D5D9DE]">
                        {inq.inquiry_number}
                      </span>
                      <span
                        className={`text-[11px] font-bold px-2.5 py-0.5 rounded-md border ${
                          STATUS_LABELS[inq.status]?.badgeClass || ''
                        }`}
                      >
                        {STATUS_LABELS[inq.status]?.label || inq.status}
                      </span>
                      <span
                        className={`text-[11px] font-bold px-2.5 py-0.5 rounded-md border ${
                          FEEDBACK_STATUS_LABELS[inq.feedback_status]?.color || ''
                        }`}
                      >
                        {FEEDBACK_STATUS_LABELS[inq.feedback_status]?.label}
                      </span>
                      <span className="text-[11px] text-[#647082] font-medium flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {new Date(inq.created_at).toLocaleString('ru-RU', {
                          day: '2-digit',
                          month: '2-digit',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="text-xs font-bold text-[#2B3340]">
                        Оценка:{' '}
                        <span className="font-dela text-[#E71B26]">
                          {Number(inq.estimated_amount_byn).toLocaleString('ru-RU')} BYN
                        </span>
                      </div>
                      <button
                        onClick={() => handleDeleteInquiry(inq.id)}
                        className="p-1 text-[#647082] hover:text-[#E71B26] transition-colors cursor-pointer"
                        title="Удалить запись"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div className="p-4 grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
                    <div className="lg:col-span-4 space-y-2 border-b lg:border-b-0 lg:border-r border-[#ECEEF0] pb-3 lg:pb-0 lg:pr-4">
                      <div className="flex items-start gap-2">
                        <Building2 className="w-4 h-4 text-[#E71B26] shrink-0 mt-0.5" />
                        <div>
                          <div className="font-bold text-sm text-[#2B3340]">
                            {inq.company}
                          </div>
                          <div className="text-xs text-[#444E60] font-medium">
                            Контактное лицо: {inq.client_name}
                          </div>
                        </div>
                      </div>

                      <div className="pt-1 space-y-1.5 text-xs">
                        <div className="flex items-center gap-2">
                          <Phone className="w-3.5 h-3.5 text-[#E71B26]" />
                          <a
                            href={`tel:${inq.phone}`}
                            className="font-bold text-[#2B3340] hover:text-[#E71B26] underline"
                          >
                            {inq.phone}
                          </a>
                          <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#ECEEF0] text-[#444E60] font-semibold">
                            Позвонить клиенту
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          <Mail className="w-3.5 h-3.5 text-[#E71B26]" />
                          <a
                            href={`mailto:${inq.email}?subject=${encodeURIComponent(
                              `Ответ ОАО «БЗАЛ» по заявке ${inq.inquiry_number} (${inq.service_type})`
                            )}&body=${encodeURIComponent(
                              `Уважаемый(ая) ${inq.client_name}!\n\nОтдел маркетинга и сбыта ОАО «БЗАЛ» совместно с инженерными службами (ОГК / ОГТ) рассмотрел вашу заявку № ${inq.inquiry_number} (${inq.service_type}).\n\nС уважением,\nОтдел маркетинга и сбыта ОАО «БЗАЛ»\nТел.: +375 44 751 44 77, +375 (163) 67-20-48\nEmail: sales@bzal.by`
                            )}`}
                            className="font-bold text-[#E71B26] hover:underline break-all"
                          >
                            {inq.email}
                          </a>
                        </div>

                        <div className="text-[11px] text-[#444E60] bg-[#ECEEF0] px-2.5 py-1.5 rounded-lg font-medium">
                          <strong>Запрос клиента по связи:</strong>{' '}
                          {PREFERRED_CONTACT_LABELS[inq.preferred_contact]}
                        </div>
                      </div>
                    </div>

                    <div className="lg:col-span-4 space-y-2 border-b lg:border-b-0 lg:border-r border-[#ECEEF0] pb-3 lg:pb-0 lg:pr-4 text-xs">
                      <div>
                        <span className="text-[10px] font-bold uppercase text-[#647082] block">
                          Направление / Номенклатура:
                        </span>
                        <span className="font-bold text-[#2B3340]">
                          {inq.service_type}
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <div className="bg-[#F8F9FA] p-2 rounded border border-[#E2E5E8]">
                          <span className="text-[10px] text-[#647082] block">
                            Материал:
                          </span>
                          <span className="font-semibold text-[#2B3340] text-[11px]">
                            {inq.material}
                          </span>
                        </div>
                        <div className="bg-[#F8F9FA] p-2 rounded border border-[#E2E5E8]">
                          <span className="text-[10px] text-[#647082] block">
                            Объём партии:
                          </span>
                          <span className="font-semibold text-[#2B3340] text-[11px]">
                            {inq.quantity}
                          </span>
                        </div>
                      </div>

                      <div className="text-[11px] text-[#444E60]">
                        <strong>КД / Чертежи:</strong> {inq.has_drawings}
                      </div>

                      <div>
                        <span className="text-[10px] font-bold uppercase text-[#647082] block mb-1">
                          Файлы чертежей в хранилище (bzal-drawings):
                        </span>
                        {inq.drawing_files && inq.drawing_files.length > 0 ? (
                          <div className="flex flex-wrap gap-1.5">
                            {inq.drawing_files.map((file, idx) => (
                              <span
                                key={idx}
                                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#FDECEE] border border-[#E71B26]/30 text-[#2B3340] text-[11px] font-bold"
                                title={`Путь в БД: ${file.storage_path || file.name}`}
                              >
                                <FileCheck className="w-3.5 h-3.5 text-[#E71B26] shrink-0" />
                                <span className="truncate max-w-[210px]">
                                  {file.name}
                                </span>
                              </span>
                            ))}
                          </div>
                        ) : (
                          <span className="text-[11px] text-[#647082] italic">
                            Файлы не прикреплены (ожидаются на sales@bzal.by)
                          </span>
                        )}
                      </div>

                      {inq.comments && (
                        <div className="p-2 rounded bg-[#ECEEF0] text-[11px] text-[#2B3340]">
                          <strong>ТЗ клиента:</strong> {inq.comments}
                        </div>
                      )}
                    </div>

                    <div className="lg:col-span-4 space-y-2.5 text-xs">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        <div>
                          <label className="block text-[10px] font-bold uppercase text-[#647082] mb-1">
                            Ответственная служба:
                          </label>
                          <select
                            value={inq.assigned_department}
                            onChange={(e) =>
                              handleFieldUpdate(inq.id, {
                                assigned_department: e.target
                                  .value as DepartmentCode,
                              })
                            }
                            className="w-full bg-[#ECEEF0] border border-[#D5D9DE] rounded-lg px-2.5 py-1.5 text-[11px] font-bold text-[#2B3340]"
                          >
                            {Object.entries(DEPARTMENT_LABELS).map(
                              ([code, label]) => (
                                <option key={code} value={code}>
                                  {label}
                                </option>
                              )
                            )}
                          </select>
                        </div>

                        <div>
                          <label className="block text-[10px] font-bold uppercase text-[#647082] mb-1">
                            Этап прохождения заявки:
                          </label>
                          <select
                            value={inq.status}
                            onChange={(e) =>
                              handleFieldUpdate(inq.id, {
                                status: e.target.value as InquiryStatus,
                              })
                            }
                            className="w-full bg-[#ECEEF0] border border-[#D5D9DE] rounded-lg px-2.5 py-1.5 text-[11px] font-bold text-[#2B3340]"
                          >
                            {Object.entries(STATUS_LABELS).map(([k, v]) => (
                              <option key={k} value={k}>
                                {v.label}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        <div>
                          <label className="block text-[10px] font-bold uppercase text-[#647082] mb-1">
                            Обратная связь клиенту:
                          </label>
                          <select
                            value={inq.feedback_status}
                            onChange={(e) =>
                              handleFieldUpdate(inq.id, {
                                feedback_status: e.target
                                  .value as FeedbackStatus,
                              })
                            }
                            className="w-full bg-[#ECEEF0] border border-[#D5D9DE] rounded-lg px-2.5 py-1.5 text-[11px] font-bold text-[#2B3340]"
                          >
                            {Object.entries(FEEDBACK_STATUS_LABELS).map(
                              ([k, v]) => (
                                <option key={k} value={k}>
                                  {v.label}
                                </option>
                              )
                            )}
                          </select>
                        </div>

                        <div>
                          <label className="block text-[10px] font-bold uppercase text-[#647082] mb-1">
                            Сумма заказа (BYN):
                          </label>
                          <input
                            type="number"
                            value={inq.estimated_amount_byn}
                            onChange={(e) =>
                              handleFieldUpdate(inq.id, {
                                estimated_amount_byn:
                                  Number(e.target.value) || 0,
                              })
                            }
                            className="w-full bg-[#ECEEF0] border border-[#D5D9DE] rounded-lg px-2.5 py-1.5 text-[11px] font-bold text-[#2B3340]"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[10px] font-bold uppercase text-[#647082] mb-1">
                          Резолюция маркетинга / Заключение ОГК и ОГТ:
                        </label>
                        <textarea
                          rows={2}
                          value={inq.internal_notes}
                          onChange={(e) =>
                            handleFieldUpdate(inq.id, {
                              internal_notes: e.target.value,
                            })
                          }
                          className="w-full bg-[#F8F9FA] border border-[#D5D9DE] rounded-lg px-2.5 py-1.5 text-[11px] text-[#2B3340]"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ================================================================= */}
        {/* TAB 2: MARKETING & ENGINEERING DEPARTMENTS ANALYTICS              */}
        {/* ================================================================= */}
        {activeTab === 'analytics' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white p-5 rounded-xl border border-[#D5D9DE] shadow-xs">
                <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#ECEEF0]">
                  <div>
                    <h3 className="font-dela text-sm uppercase text-[#2B3340]">
                      Структура спроса по направлениям (Анализ для маркетинга)
                    </h3>
                    <p className="text-xs text-[#647082]">
                      Какие компетенции Технопарка БЗАЛ запрашивают чаще всего и их объём в BYN
                    </p>
                  </div>
                  <Briefcase className="w-5 h-5 text-[#E71B26]" />
                </div>

                <div className="space-y-3.5">
                  {metrics.serviceBreakdown.map(([service, info], idx) => {
                    const pct =
                      metrics.totalBudgetByn > 0
                        ? Math.round(
                            (info.budget / metrics.totalBudgetByn) * 100
                          )
                        : 0;
                    return (
                      <div key={idx} className="space-y-1">
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-bold text-[#2B3340]">
                            {service}
                          </span>
                          <span className="font-dela text-[#E71B26]">
                            {info.count} заяв. •{' '}
                            {info.budget.toLocaleString('ru-RU')} BYN ({pct}%)
                          </span>
                        </div>
                        <div className="h-2.5 w-full bg-[#ECEEF0] rounded-full overflow-hidden">
                          <div
                            className="h-full bg-[#E71B26] rounded-full"
                            style={{ width: `${Math.max(pct, 6)}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="bg-white p-5 rounded-xl border border-[#D5D9DE] shadow-xs">
                <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#ECEEF0]">
                  <div>
                    <h3 className="font-dela text-sm uppercase text-[#2B3340]">
                      Распределение заявок по службам завода
                    </h3>
                    <p className="text-xs text-[#647082]">
                      Контроль прохождения заявок: Маркетинг → ОГК → ОГТ → Производство → ОТК
                    </p>
                  </div>
                  <Users className="w-5 h-5 text-[#E71B26]" />
                </div>

                <div className="space-y-3">
                  {(Object.keys(DEPARTMENT_LABELS) as DepartmentCode[]).map(
                    (deptCode) => {
                      const count = metrics.byDepartment[deptCode] || 0;
                      const pct =
                        metrics.total > 0
                          ? Math.round((count / metrics.total) * 100)
                          : 0;
                      return (
                        <div
                          key={deptCode}
                          className="p-3 rounded-lg bg-[#F8F9FA] border border-[#E2E5E8] flex items-center justify-between gap-4"
                        >
                          <div>
                            <div className="text-xs font-bold text-[#2B3340]">
                              {DEPARTMENT_LABELS[deptCode]}
                            </div>
                            <div className="text-[11px] text-[#647082]">
                              Доля от текущих обращений: {pct}%
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="font-dela text-base text-[#2B3340]">
                              {count}
                            </span>
                            <button
                              onClick={() => {
                                setDeptFilter(deptCode);
                                setActiveTab('inquiries');
                              }}
                              className="px-2.5 py-1 rounded bg-[#2B3340] hover:bg-[#E71B26] text-white text-[10px] font-bold uppercase transition-colors cursor-pointer"
                            >
                              Открыть список
                            </button>
                          </div>
                        </div>
                      );
                    }
                  )}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white p-5 rounded-xl border border-[#D5D9DE] shadow-xs">
                <h3 className="font-dela text-sm uppercase text-[#2B3340] mb-1">
                  Потребность в металле и заготовках (Для ОМТС и ОГТ)
                </h3>
                <p className="text-xs text-[#647082] mb-4">
                  Анализ запрашиваемых марок сталей и литья по входящим заявкам
                </p>
                <div className="space-y-2.5">
                  {metrics.materialBreakdown.map(([mat, count], i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between p-2.5 rounded-lg bg-[#ECEEF0] text-xs"
                    >
                      <span className="font-bold text-[#2B3340]">{mat}</span>
                      <span className="px-2.5 py-0.5 rounded bg-white font-dela text-[#E71B26]">
                        {count} заяв.
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white p-5 rounded-xl border border-[#D5D9DE] shadow-xs">
                <h3 className="font-dela text-sm uppercase text-[#2B3340] mb-1">
                  Скачивания Техпаспорта оборудования БЗАЛ ({passportLeads.length})
                </h3>
                <p className="text-xs text-[#647082] mb-4">
                  Контакты главных технологов и снабженцев предприятий для проактивной работы маркетинга
                </p>
                <div className="space-y-2.5 max-h-64 overflow-y-auto">
                  {passportLeads.map((lead) => (
                    <div
                      key={lead.id}
                      className="p-3 rounded-lg bg-[#F8F9FA] border border-[#E2E5E8] flex items-center justify-between gap-2 text-xs"
                    >
                      <div>
                        <div className="font-bold text-[#2B3340]">
                          {lead.company}
                        </div>
                        <div className="text-[#444E60]">
                          {lead.contact_name}
                        </div>
                      </div>
                      <div className="text-right">
                        <a
                          href={`mailto:${lead.email}`}
                          className="font-bold text-[#E71B26] hover:underline block"
                        >
                          {lead.email}
                        </a>
                        <span className="text-[10px] text-[#647082]">
                          {new Date(lead.created_at).toLocaleDateString('ru-RU')}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ================================================================= */}
        {/* TAB 3: EXECUTIVE REPORTS FOR PLANT MANAGEMENT                     */}
        {/* ================================================================= */}
        {activeTab === 'executive' && (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-xl border border-[#D5D9DE] shadow-xs">
              <div className="flex flex-wrap items-center justify-between gap-4 pb-5 border-b border-[#ECEEF0]">
                <div>
                  <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded bg-[#FDECEE] text-[#E71B26] text-[10px] font-dela uppercase mb-1">
                    УПРАВЛЕНЧЕСКАЯ ОТЧЁТНОСТЬ ДИРЕКЦИИ
                  </div>
                  <h3 className="font-dela text-base sm:text-lg uppercase text-[#2B3340]">
                    Сводный отчёт для руководства ОАО «БЗАЛ» по коммерческим заявкам
                  </h3>
                  <p className="text-xs text-[#647082]">
                    Сформировано автоматически на основании базы данных обращений отдела маркетинга, ОГК и ОГТ
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => window.print()}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#2B3340] hover:bg-[#1B222C] text-white text-xs font-bold uppercase cursor-pointer"
                  >
                    <Printer className="w-4 h-4" />
                    <span>Печать сводки</span>
                  </button>
                  <button
                    onClick={handleExportCsv}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#E71B26] hover:bg-[#C9141E] text-white text-xs font-bold uppercase cursor-pointer"
                  >
                    <Download className="w-4 h-4" />
                    <span>Скачать Excel (CSV)</span>
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 my-6">
                <div className="p-4 rounded-xl bg-[#F8F9FA] border-l-4 border-amber-500">
                  <div className="text-[11px] font-bold text-[#647082] uppercase">
                    Этап 1: Принято маркетингом
                  </div>
                  <div className="font-dela text-2xl text-[#2B3340] mt-1">
                    {metrics.total} заявок
                  </div>
                  <div className="text-xs text-[#444E60] mt-1">
                    На сумму {metrics.totalBudgetByn.toLocaleString('ru-RU')} BYN
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-[#F8F9FA] border-l-4 border-blue-600">
                  <div className="text-[11px] font-bold text-[#647082] uppercase">
                    Этап 2: Проработка ОГК и ОГТ
                  </div>
                  <div className="font-dela text-2xl text-blue-700 mt-1">
                    {metrics.inEngineering} в расчёте
                  </div>
                  <div className="text-xs text-[#444E60] mt-1">
                    Анализ чертежей ЕСКД и норм ЧПУ
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-[#F8F9FA] border-l-4 border-emerald-600">
                  <div className="text-[11px] font-bold text-[#647082] uppercase">
                    Этап 3: Обратная связь и КП
                  </div>
                  <div className="font-dela text-2xl text-emerald-700 mt-1">
                    {metrics.feedbackCompleted} отвечено
                  </div>
                  <div className="text-xs text-[#444E60] mt-1">
                    По телефону или письмом на заявку
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-[#F8F9FA] border-l-4 border-[#E71B26]">
                  <div className="text-[11px] font-bold text-[#647082] uppercase">
                    Этап 4: КП и Контрактация
                  </div>
                  <div className="font-dela text-2xl text-[#E71B26] mt-1">
                    {metrics.contractedBudgetByn.toLocaleString('ru-RU')} BYN
                  </div>
                  <div className="text-xs text-[#444E60] mt-1">
                    Подписано и выставлено КП: {metrics.quotedCount + metrics.contractedCount}
                  </div>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-[#2B3340] text-white uppercase text-[10px] tracking-wider">
                      <th className="p-3 rounded-tl-lg">№ Заявки</th>
                      <th className="p-3">Заказчик / Предприятие</th>
                      <th className="p-3">Телефон / Email</th>
                      <th className="p-3">Предмет заказа и КД</th>
                      <th className="p-3">Ответственная служба</th>
                      <th className="p-3">Статус обратной связи</th>
                      <th className="p-3 text-right rounded-tr-lg">Оценка (BYN)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E2E5E8]">
                    {inquiries.map((inq) => (
                      <tr key={inq.id} className="hover:bg-[#F8F9FA]">
                        <td className="p-3 font-dela text-[#2B3340]">
                          {inq.inquiry_number}
                        </td>
                        <td className="p-3">
                          <div className="font-bold text-[#2B3340]">
                            {inq.company}
                          </div>
                          <div className="text-[11px] text-[#647082]">
                            {inq.client_name}
                          </div>
                        </td>
                        <td className="p-3">
                          <div className="font-bold text-[#2B3340]">
                            {inq.phone}
                          </div>
                          <div className="text-[11px] text-[#E71B26]">
                            {inq.email}
                          </div>
                        </td>
                        <td className="p-3">
                          <div className="font-semibold text-[#2B3340]">
                            {inq.service_type}
                          </div>
                          <div className="text-[11px] text-[#647082]">
                            {inq.material} • {inq.quantity}
                          </div>
                        </td>
                        <td className="p-3 font-bold text-[#2B3340]">
                          {DEPARTMENT_LABELS[inq.assigned_department]}
                        </td>
                        <td className="p-3">
                          <span
                            className={`inline-block px-2 py-0.5 rounded border text-[10px] font-bold ${
                              FEEDBACK_STATUS_LABELS[inq.feedback_status]?.color
                            }`}
                          >
                            {FEEDBACK_STATUS_LABELS[inq.feedback_status]?.label}
                          </span>
                        </td>
                        <td className="p-3 text-right font-dela text-[#2B3340]">
                          {Number(inq.estimated_amount_byn).toLocaleString('ru-RU')}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ================================================================= */}
        {/* TAB 4: SUPABASE DATABASE ARCHITECTURE & SQL INITIALIZATION        */}
        {/* ================================================================= */}
        {activeTab === 'architecture' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white p-5 rounded-xl border border-[#D5D9DE] shadow-xs">
                <div className="text-[10px] font-dela uppercase text-[#E71B26] mb-1">
                  ТАБЛИЦА POSTGRESQL #1
                </div>
                <h4 className="font-dela text-sm text-[#2B3340] uppercase mb-2">
                  public.rfq_inquiries
                </h4>
                <p className="text-xs text-[#444E60] leading-relaxed mb-3">
                  Основной реестр всех заявок с сайта и телефонных обращений в отдел маркетинга:
                </p>
                <ul className="text-xs text-[#2B3340] space-y-1 font-medium">
                  <li>• <strong>phone, email, client_name, company</strong> — прямые контакты заказчика</li>
                  <li>• <strong>preferred_contact</strong> — как клиенту удобнее получить ответ (телефон / заявка)</li>
                  <li>• <strong>assigned_department</strong> — маршрутизация (Маркетинг → ОГК → ОГТ → Цех)</li>
                  <li>• <strong>estimated_amount_byn, internal_notes</strong> — аналитика и резолюции служб</li>
                </ul>
              </div>

              <div className="bg-white p-5 rounded-xl border border-[#D5D9DE] shadow-xs">
                <div className="text-[10px] font-dela uppercase text-[#E71B26] mb-1">
                  ФАЙЛОВОЕ ХРАНИЛИЩЕ ЧЕРТЕЖЕЙ
                </div>
                <h4 className="font-dela text-sm text-[#2B3340] uppercase mb-2">
                  storage.buckets / bzal-drawings
                </h4>
                <p className="text-xs text-[#444E60] leading-relaxed mb-3">
                  Объектное хранилище Supabase Storage для конструкторской документации (ЕСКД и 3D-модели):
                </p>
                <ul className="text-xs text-[#2B3340] space-y-1 font-medium">
                  <li>• Поддержка <strong>.PDF, .STEP, .IGES, .DXF, .DWG, .ZIP</strong></li>
                  <li>• Структурирование по папкам: <code>inquiries/БЗАЛ-2026-XXXX/файл</code></li>
                  <li>• Метаданные файлов сохраняются в JSONB-поле <code>drawing_files</code> заявки</li>
                </ul>
              </div>

              <div className="bg-white p-5 rounded-xl border border-[#D5D9DE] shadow-xs">
                <div className="text-[10px] font-dela uppercase text-[#E71B26] mb-1">
                  ТАБЛИЦА POSTGRESQL #2
                </div>
                <h4 className="font-dela text-sm text-[#2B3340] uppercase mb-2">
                  public.passport_leads
                </h4>
                <p className="text-xs text-[#444E60] leading-relaxed mb-3">
                  База потенциальных B2B-клиентов, скачавших Технический паспорт оборудования Технопарка:
                </p>
                <ul className="text-xs text-[#2B3340] space-y-1 font-medium">
                  <li>• <strong>contact_name</strong> — ФИО и должность специалиста</li>
                  <li>• <strong>company</strong> — предприятие</li>
                  <li>• <strong>email, created_at</strong> — корпоративная почта и дата скачивания</li>
                </ul>
              </div>
            </div>

            <div className="bg-[#2B3340] text-white p-6 rounded-xl border border-[#1B222C] space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded bg-[#E71B26] text-white text-[10px] font-dela uppercase mb-1">
                    ПОДКЛЮЧЕН СЕРВЕР SUPABASE: {SUPABASE_URL}
                  </div>
                  <h4 className="font-dela text-sm sm:text-base uppercase text-white">
                    SQL-скрипт инициализации таблиц (с закрытым доступом через Secret Key)
                  </h4>
                  <p className="text-xs text-[#BAC5CF] mt-0.5">
                    Статус: {dbStatus.message}
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <button
                    onClick={handleCopySql}
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg bg-white text-[#2B3340] hover:bg-[#ECEEF0] text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
                  >
                    {copiedSql ? (
                      <>
                        <Check className="w-4 h-4 text-emerald-600" />
                        <span>SQL-скрипт скопирован!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4 text-[#E71B26]" />
                        <span>1. Скопировать SQL-скрипт</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={handleSyncToCloud}
                    disabled={isSyncing}
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg bg-[#E71B26] hover:bg-[#C9141E] text-white text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
                  >
                    <RefreshCw
                      className={`w-4 h-4 ${isSyncing ? 'animate-spin' : ''}`}
                    />
                    <span>2. Синхронизировать через серверный Secret Key</span>
                  </button>
                </div>
              </div>

              {syncMessage && (
                <div className="p-3 rounded-lg bg-white/10 border border-white/20 text-xs font-medium text-white flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#E71B26] shrink-0" />
                  <span>{syncMessage}</span>
                </div>
              )}

              <pre className="p-4 rounded-xl bg-[#1B222C] border border-white/10 text-[11px] font-mono text-emerald-300 overflow-x-auto max-h-72">
                {SUPABASE_SETUP_SQL}
              </pre>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
