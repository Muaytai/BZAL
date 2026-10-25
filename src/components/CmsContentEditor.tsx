import React, { useState, useEffect, useRef } from 'react';
import {
  Save,
  RotateCcw,
  Upload,
  Image as ImageIcon,
  Plus,
  Trash2,
  CheckCircle2,
  Globe,
  Phone,
  Home,
  Package,
  Cpu,
  Building2,
  FolderOpen,
  Download,
  FileUp,
  Sparkles,
  Copy,
  Check,
  Eye,
} from 'lucide-react';
import { Language, EquipmentItem, ManufacturedPart, PlantProject } from '../types';
import {
  CmsSiteConfig,
  BUILTIN_GALLERY_IMAGES,
  getCurrentCmsConfigFromRuntime,
  saveCmsConfigEverywhere,
  resetCmsToFactoryDefaults,
  uploadCmsImageFile,
} from '../utils/cmsStore';

interface CmsContentEditorProps {
  onPreviewSite?: () => void;
}

type CmsSectionTab =
  | 'contacts'
  | 'hero'
  | 'parts'
  | 'equipment'
  | 'about'
  | 'media';

const PART_CATEGORIES = [
  { id: 'housings', labelRu: 'Корпусные детали и станины' },
  { id: 'shafts', labelRu: 'Валы, шпиндели и оси' },
  { id: 'railway', labelRu: 'Узлы ж/д транспорта' },
  { id: 'gears', labelRu: 'Зубчатые передачи и венцы' },
  { id: 'tooling', labelRu: 'Штампы, пресс-формы и оснастка' },
  { id: 'units', labelRu: 'Унифицированные станочные узлы' },
];

const EQUIPMENT_CATEGORIES = [
  'Фрезерная группа с ЧПУ',
  'Горизонтально-расточная группа',
  'Токарная группа с ЧПУ',
  'Шлифовальная и зубообрабатывающая группа',
];

export const CmsContentEditor: React.FC<CmsContentEditorProps> = ({
  onPreviewSite,
}) => {
  const [cmsConfig, setCmsConfig] = useState<CmsSiteConfig>(() =>
    getCurrentCmsConfigFromRuntime()
  );
  const [editLang, setEditLang] = useState<Language>('ru');
  const [activeSection, setActiveSection] = useState<CmsSectionTab>('parts');
  const [syncPhotosAllLangs, setSyncPhotosAllLangs] = useState<boolean>(true);

  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [statusBanner, setStatusBanner] = useState<{
    type: 'success' | 'info' | 'error';
    text: string;
  } | null>(null);

  // Gallery Picker Modal state
  const [pickerTarget, setPickerTarget] = useState<{
    title: string;
    currentUrl: string;
    onSelect: (newUrl: string) => void;
  } | null>(null);

  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);
  const fileImportRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const refreshFromRuntime = () => {
      setCmsConfig(getCurrentCmsConfigFromRuntime());
    };
    window.addEventListener('bzal-cms-updated', refreshFromRuntime);
    return () => window.removeEventListener('bzal-cms-updated', refreshFromRuntime);
  }, []);

  const langData = cmsConfig.languages[editLang];

  const allAvailableImages = [
    ...cmsConfig.customGalleryImages.map((img) => ({
      name: img.name,
      url: img.url,
      category: 'Загруженные фото',
    })),
    ...BUILTIN_GALLERY_IMAGES,
  ];

  const handleSaveAll = async () => {
    setIsSaving(true);
    setStatusBanner(null);
    const res = await saveCmsConfigEverywhere(cmsConfig);
    setIsSaving(false);
    setStatusBanner({
      type: res.ok ? 'success' : 'error',
      text: res.message,
    });
  };

  const handleResetDefaults = async () => {
    const fresh = await resetCmsToFactoryDefaults();
    setCmsConfig(fresh);
    setStatusBanner({
      type: 'info',
      text: 'Все тексты, карточки и фотографии восстановлены к заводским настройкам по умолчанию.',
    });
  };

  const handleUploadNewPhoto = async (
    file: File,
    onDone?: (url: string) => void
  ) => {
    setIsUploading(true);
    setStatusBanner({
      type: 'info',
      text: `Обработка и загрузка фото «${file.name}»...`,
    });
    try {
      const uploaded = await uploadCmsImageFile(file);
      const nextCustomGallery = [
        {
          name: uploaded.name,
          url: uploaded.url,
          uploadedAt: new Date().toISOString(),
        },
        ...cmsConfig.customGalleryImages,
      ];

      setCmsConfig((prev) => ({
        ...prev,
        customGalleryImages: nextCustomGallery,
      }));

      if (onDone) {
        onDone(uploaded.url);
      }

      setStatusBanner({
        type: 'success',
        text: `Фотография «${file.name}» загружена! Нажмите «Сохранить и опубликовать», чтобы закрепить изменения.`,
      });
    } catch (err) {
      setStatusBanner({
        type: 'error',
        text:
          err instanceof Error
            ? `Ошибка загрузки фото: ${err.message}`
            : 'Не удалось обработать изображение',
      });
    } finally {
      setIsUploading(false);
    }
  };

  // Helpers to update current language (and optionally sync photo across all 3 languages)
  const updateBrandField = (key: keyof typeof langData.brand, value: string) => {
    setCmsConfig((prev) => ({
      ...prev,
      languages: {
        ...prev.languages,
        [editLang]: {
          ...prev.languages[editLang],
          brand: {
            ...prev.languages[editLang].brand,
            [key]: value,
          },
        },
      },
    }));
  };

  const updateHeroField = (key: keyof typeof langData.hero, value: unknown) => {
    setCmsConfig((prev) => {
      const nextLangs = { ...prev.languages };
      if (key === 'heroImage' && syncPhotosAllLangs && typeof value === 'string') {
        (['ru', 'en', 'zh'] as Language[]).forEach((l) => {
          nextLangs[l] = {
            ...nextLangs[l],
            hero: { ...nextLangs[l].hero, heroImage: value },
          };
        });
      } else {
        nextLangs[editLang] = {
          ...nextLangs[editLang],
          hero: {
            ...nextLangs[editLang].hero,
            [key]: value,
          },
        };
      }
      return { ...prev, languages: nextLangs };
    });
  };

  const updateAboutField = (key: keyof typeof langData.about, value: unknown) => {
    setCmsConfig((prev) => {
      const nextLangs = { ...prev.languages };
      if (key === 'photoImage' && syncPhotosAllLangs && typeof value === 'string') {
        (['ru', 'en', 'zh'] as Language[]).forEach((l) => {
          nextLangs[l] = {
            ...nextLangs[l],
            about: { ...nextLangs[l].about, photoImage: value },
          };
        });
      } else {
        nextLangs[editLang] = {
          ...nextLangs[editLang],
          about: {
            ...nextLangs[editLang].about,
            [key]: value,
          },
        };
      }
      return { ...prev, languages: nextLangs };
    });
  };

  const updatePartItem = (
    partId: string,
    updates: Partial<ManufacturedPart>
  ) => {
    setCmsConfig((prev) => {
      const nextLangs = { ...prev.languages };
      if (updates.image && syncPhotosAllLangs) {
        (['ru', 'en', 'zh'] as Language[]).forEach((l) => {
          nextLangs[l] = {
            ...nextLangs[l],
            partsList: nextLangs[l].partsList.map((p) =>
              p.id === partId
                ? {
                    ...p,
                    ...(l === editLang ? updates : { image: updates.image! }),
                  }
                : p
            ),
          };
        });
      } else {
        nextLangs[editLang] = {
          ...nextLangs[editLang],
          partsList: nextLangs[editLang].partsList.map((p) =>
            p.id === partId ? { ...p, ...updates } : p
          ),
        };
      }
      return { ...prev, languages: nextLangs };
    });
  };

  const handleAddPartItem = () => {
    const newId = `part-${Date.now()}`;
    const newPart: ManufacturedPart = {
      id: newId,
      category: 'housings',
      categoryKey: 'Корпусные детали и станины',
      title: 'Новая деталь по чертежу заказчика',
      application: 'Машиностроение и станкостроение',
      material: 'Сталь 45 / 40Х / СЧ25',
      dimensions: 'По чертежу ЕСКД',
      tolerance: 'IT6 – IT7 (до ±0,005 мм)',
      roughness: 'Ra 0.8 – 1.6',
      batchSize: 'От 1 до 500 шт.',
      leadTime: 'От 10 рабочих дней',
      image: '/images/landing_img_2.jpg',
      features: ['Контроль ОТК 100%', 'Паспорт качества ОАО БЗАЛ'],
    };

    setCmsConfig((prev) => {
      const nextLangs = { ...prev.languages };
      (['ru', 'en', 'zh'] as Language[]).forEach((l) => {
        nextLangs[l] = {
          ...nextLangs[l],
          partsList: [newPart, ...nextLangs[l].partsList],
        };
      });
      return { ...prev, languages: nextLangs };
    });

    setStatusBanner({
      type: 'info',
      text: 'Добавлена новая карточка детали в начало списка. Отредактируйте поля и нажмите «Сохранить и опубликовать».',
    });
  };

  const handleDeletePartItem = (partId: string) => {
    setCmsConfig((prev) => {
      const nextLangs = { ...prev.languages };
      (['ru', 'en', 'zh'] as Language[]).forEach((l) => {
        nextLangs[l] = {
          ...nextLangs[l],
          partsList: nextLangs[l].partsList.filter((p) => p.id !== partId),
        };
      });
      return { ...prev, languages: nextLangs };
    });
  };

  const updateEquipmentItem = (
    eqId: string,
    updates: Partial<EquipmentItem>
  ) => {
    setCmsConfig((prev) => {
      const nextLangs = { ...prev.languages };
      if (updates.image && syncPhotosAllLangs) {
        (['ru', 'en', 'zh'] as Language[]).forEach((l) => {
          nextLangs[l] = {
            ...nextLangs[l],
            equipmentList: nextLangs[l].equipmentList.map((item) =>
              item.id === eqId
                ? {
                    ...item,
                    ...(l === editLang ? updates : { image: updates.image! }),
                  }
                : item
            ),
          };
        });
      } else {
        nextLangs[editLang] = {
          ...nextLangs[editLang],
          equipmentList: nextLangs[editLang].equipmentList.map((item) =>
            item.id === eqId ? { ...item, ...updates } : item
          ),
        };
      }
      return { ...prev, languages: nextLangs };
    });
  };

  const handleAddEquipmentItem = () => {
    const newId = `eq-${Date.now()}`;
    const newEq: EquipmentItem = {
      id: newId,
      name: 'Новый обрабатывающий центр с ЧПУ',
      category: 'Фрезерная группа с ЧПУ',
      capacity: '1 200 × 800 × 700 мм',
      precision: '0,005 мм',
      description:
        'Высокоточная механическая обработка корпусных и призматических деталей по управляющим программам ОГТ.',
      image: '/images/landing_img_2.jpg',
      tags: [
        'ЧПУ Siemens / Fanuc',
        'Автосмена инструмента',
        'Контроль ОТК',
      ],
    };

    setCmsConfig((prev) => {
      const nextLangs = { ...prev.languages };
      (['ru', 'en', 'zh'] as Language[]).forEach((l) => {
        nextLangs[l] = {
          ...nextLangs[l],
          equipmentList: [newEq, ...nextLangs[l].equipmentList],
        };
      });
      return { ...prev, languages: nextLangs };
    });

    setStatusBanner({
      type: 'info',
      text: 'Добавлена новая карточка станка. Отредактируйте характеристики и нажмите «Сохранить и опубликовать».',
    });
  };

  const handleDeleteEquipmentItem = (eqId: string) => {
    setCmsConfig((prev) => {
      const nextLangs = { ...prev.languages };
      (['ru', 'en', 'zh'] as Language[]).forEach((l) => {
        nextLangs[l] = {
          ...nextLangs[l],
          equipmentList: nextLangs[l].equipmentList.filter(
            (item) => item.id !== eqId
          ),
        };
      });
      return { ...prev, languages: nextLangs };
    });
  };

  const handleExportJson = () => {
    const blob = new Blob([JSON.stringify(cmsConfig, null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `bzal_cms_backup_${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImportJson = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const text = await file.text();
      const parsed = JSON.parse(text) as CmsSiteConfig;
      if (!parsed.languages || !parsed.languages.ru) {
        throw new Error('Некорректный формат файла конфигурации CMS');
      }
      setCmsConfig(parsed);
      await saveCmsConfigEverywhere(parsed);
      setStatusBanner({
        type: 'success',
        text: 'Конфигурация CMS успешно импортирована и опубликована на сайте!',
      });
    } catch (err) {
      setStatusBanner({
        type: 'error',
        text:
          err instanceof Error
            ? err.message
            : 'Ошибка чтения JSON-файла конфигурации',
      });
    } finally {
      e.target.value = '';
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Action & Language Control Bar */}
      <div className="rounded-2xl bg-white border-2 border-[#2B3340] p-4 sm:p-5 shadow-md flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-[#E95A0C]/10 text-[#E95A0C] text-[11px] font-extrabold uppercase tracking-wider mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>CMS • ВИЗУАЛЬНЫЙ РЕДАКТОР КОНТЕНТА И ФОТОГРАФИЙ САЙТА</span>
          </div>
          <h3 className="text-lg sm:text-xl font-black text-[#2B3340] font-dela uppercase">
            Управление данными, каталогом деталей, станками и фото ОАО БЗАЛ
          </h3>
          <p className="text-xs text-[#647082] font-semibold mt-0.5">
            Все изменения мгновенно применяются на сайте и сохраняются на сервере и в облаке Supabase.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          {/* Language Switcher for editing */}
          <div className="inline-flex items-center bg-[#ECEEF0] p-1 rounded-xl border border-[#D5D9DE]">
            <Globe className="w-4 h-4 text-[#647082] ml-2 mr-1" />
            {(['ru', 'en', 'zh'] as Language[]).map((l) => (
              <button
                key={l}
                type="button"
                onClick={() => setEditLang(l)}
                className={`px-3 py-1.5 rounded-lg text-xs font-extrabold uppercase transition-all cursor-pointer ${
                  editLang === l
                    ? 'bg-[#2B3340] text-white shadow-xs'
                    : 'text-[#647082] hover:text-[#2B3340]'
                }`}
              >
                {l === 'ru' ? 'RU Рус' : l === 'en' ? 'EN Eng' : 'ZH 中文'}
              </button>
            ))}
          </div>

          {onPreviewSite && (
            <button
              type="button"
              onClick={onPreviewSite}
              className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-[#ECEEF0] hover:bg-[#D5D9DE] text-[#2B3340] text-xs font-extrabold uppercase transition-all cursor-pointer"
            >
              <Eye className="w-4 h-4 text-[#E95A0C]" />
              <span>Посмотреть на сайте</span>
            </button>
          )}

          <button
            type="button"
            onClick={handleSaveAll}
            disabled={isSaving || isUploading}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#E95A0C] hover:bg-[#CC4B06] text-white text-xs font-extrabold uppercase tracking-wider shadow-md transition-all cursor-pointer disabled:opacity-60"
          >
            <Save className="w-4 h-4" />
            <span>
              {isSaving ? 'Сохранение...' : 'Сохранить и опубликовать'}
            </span>
          </button>
        </div>
      </div>

      {/* Status Notification Banner */}
      {statusBanner && (
        <div
          className={`p-4 rounded-xl border flex items-center justify-between gap-3 text-xs sm:text-sm font-bold ${
            statusBanner.type === 'success'
              ? 'bg-emerald-50 border-emerald-300 text-emerald-900'
              : statusBanner.type === 'error'
                ? 'bg-red-50 border-red-300 text-red-900'
                : 'bg-blue-50 border-blue-300 text-blue-900'
          }`}
        >
          <div className="flex items-center gap-2.5">
            <CheckCircle2 className="w-5 h-5 shrink-0 text-[#E95A0C]" />
            <span>{statusBanner.text}</span>
          </div>
          <button
            type="button"
            onClick={() => setStatusBanner(null)}
            className="text-xs underline opacity-75 hover:opacity-100 cursor-pointer"
          >
            Закрыть
          </button>
        </div>
      )}

      {/* Section Navigation Pills + Photo Sync Checkbox */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-3 rounded-xl border border-[#D5D9DE]">
        <div className="flex flex-wrap items-center gap-1.5">
          {[
            {
              id: 'parts' as CmsSectionTab,
              label: `Каталог деталей (${langData.partsList.length})`,
              icon: Package,
            },
            {
              id: 'equipment' as CmsSectionTab,
              label: `Станки и оборудование (${langData.equipmentList.length})`,
              icon: Cpu,
            },
            {
              id: 'hero' as CmsSectionTab,
              label: 'Главная страница и фото',
              icon: Home,
            },
            {
              id: 'contacts' as CmsSectionTab,
              label: 'Контакты и реквизиты',
              icon: Phone,
            },
            {
              id: 'about' as CmsSectionTab,
              label: 'О заводе и проекты',
              icon: Building2,
            },
            {
              id: 'media' as CmsSectionTab,
              label: 'Медиатека и Бэкап',
              icon: FolderOpen,
            },
          ].map((sec) => {
            const Icon = sec.icon;
            return (
              <button
                key={sec.id}
                type="button"
                onClick={() => setActiveSection(sec.id)}
                className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-extrabold uppercase transition-all cursor-pointer ${
                  activeSection === sec.id
                    ? 'bg-[#2B3340] text-white shadow-xs'
                    : 'bg-[#ECEEF0] text-[#444E60] hover:text-[#2B3340]'
                }`}
              >
                <Icon className="w-3.5 h-3.5 text-[#E95A0C]" />
                <span>{sec.label}</span>
              </button>
            );
          })}
        </div>

        <label className="inline-flex items-center gap-2 text-xs font-bold text-[#2B3340] cursor-pointer select-none px-2 py-1 rounded bg-[#ECEEF0]">
          <input
            type="checkbox"
            checked={syncPhotosAllLangs}
            onChange={(e) => setSyncPhotosAllLangs(e.target.checked)}
            className="accent-[#E95A0C] w-4 h-4"
          />
          <span>Синхронизировать новые фото для RU / EN / ZH</span>
        </label>
      </div>

      {/* =================================================================== */}
      {/* SECTION 1: PARTS CATALOG EDITOR                                     */}
      {/* =================================================================== */}
      {activeSection === 'parts' && (
        <div className="space-y-5">
          {/* Section Headings Editor */}
          <div className="bg-white rounded-xl border border-[#D5D9DE] p-5 shadow-xs">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-4 pb-3 border-b border-[#E2E5E8]">
              <div>
                <h4 className="text-sm font-black uppercase text-[#2B3340] font-dela">
                  Заголовок страницы «Каталог деталей» ({editLang.toUpperCase()})
                </h4>
                <p className="text-xs text-[#647082]">
                  Редактируйте тексты шапки каталога или добавьте новую деталь в номенклатуру.
                </p>
              </div>
              <button
                type="button"
                onClick={handleAddPartItem}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#E95A0C] hover:bg-[#CC4B06] text-white text-xs font-extrabold uppercase cursor-pointer shadow-xs"
              >
                <Plus className="w-4 h-4" />
                <span>Добавить новую деталь</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-[11px] font-extrabold uppercase text-[#647082] mb-1">
                  Надзаголовок (Бейдж)
                </label>
                <input
                  type="text"
                  value={langData.partsHeading.eyebrow}
                  onChange={(e) =>
                    setCmsConfig((prev) => ({
                      ...prev,
                      languages: {
                        ...prev.languages,
                        [editLang]: {
                          ...prev.languages[editLang],
                          partsHeading: {
                            ...prev.languages[editLang].partsHeading,
                            eyebrow: e.target.value,
                          },
                        },
                      },
                    }))
                  }
                  className="w-full px-3 py-2 rounded-lg border border-[#D5D9DE] text-xs font-bold text-[#2B3340]"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-[11px] font-extrabold uppercase text-[#647082] mb-1">
                  Главный заголовок каталога
                </label>
                <input
                  type="text"
                  value={langData.partsHeading.title}
                  onChange={(e) =>
                    setCmsConfig((prev) => ({
                      ...prev,
                      languages: {
                        ...prev.languages,
                        [editLang]: {
                          ...prev.languages[editLang],
                          partsHeading: {
                            ...prev.languages[editLang].partsHeading,
                            title: e.target.value,
                          },
                        },
                      },
                    }))
                  }
                  className="w-full px-3 py-2 rounded-lg border border-[#D5D9DE] text-xs font-bold text-[#2B3340]"
                />
              </div>
              <div className="md:col-span-3">
                <label className="block text-[11px] font-extrabold uppercase text-[#647082] mb-1">
                  Подзаголовок / Описание
                </label>
                <textarea
                  rows={2}
                  value={langData.partsHeading.subtitle}
                  onChange={(e) =>
                    setCmsConfig((prev) => ({
                      ...prev,
                      languages: {
                        ...prev.languages,
                        [editLang]: {
                          ...prev.languages[editLang],
                          partsHeading: {
                            ...prev.languages[editLang].partsHeading,
                            subtitle: e.target.value,
                          },
                        },
                      },
                    }))
                  }
                  className="w-full px-3 py-2 rounded-lg border border-[#D5D9DE] text-xs font-semibold text-[#2B3340]"
                />
              </div>
            </div>
          </div>

          {/* Parts Cards Editor Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {langData.partsList.map((part, idx) => (
              <div
                key={part.id}
                className="bg-white rounded-xl border border-[#D5D9DE] overflow-hidden shadow-xs flex flex-col"
              >
                {/* Top Photo + Quick Photo Changer */}
                <div className="grid grid-cols-1 sm:grid-cols-12 bg-[#1E2530] border-b border-[#D5D9DE]">
                  <div className="sm:col-span-5 relative aspect-[16/10] sm:aspect-auto min-h-[160px] bg-[#141921] overflow-hidden">
                    <img
                      src={part.image}
                      alt={part.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-[#2B3340]/90 text-white text-[10px] font-extrabold uppercase">
                      #{idx + 1} • {part.id}
                    </div>
                  </div>

                  <div className="sm:col-span-7 p-4 flex flex-col justify-between text-white">
                    <div>
                      <div className="text-[11px] font-extrabold uppercase text-[#E95A0C] mb-1">
                        Фотография изделия
                      </div>
                      <p className="text-xs text-white/80 leading-snug mb-3">
                        Загрузите фото детали с компьютера, выберите из галереи завода или укажите путь:
                      </p>
                      <input
                        type="text"
                        value={part.image}
                        onChange={(e) =>
                          updatePartItem(part.id, { image: e.target.value })
                        }
                        placeholder="/images/landing_img_4.jpg или https://..."
                        className="w-full px-2.5 py-1.5 rounded bg-white/10 border border-white/20 text-white text-xs font-mono mb-2.5"
                      />
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                      <label className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#E95A0C] hover:bg-[#CC4B06] text-white text-[11px] font-extrabold uppercase cursor-pointer">
                        <Upload className="w-3.5 h-3.5" />
                        <span>Загрузить фото</span>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => {
                            const f = e.target.files?.[0];
                            if (f) {
                              handleUploadNewPhoto(f, (url) =>
                                updatePartItem(part.id, { image: url })
                              );
                            }
                            e.target.value = '';
                          }}
                        />
                      </label>

                      <button
                        type="button"
                        onClick={() =>
                          setPickerTarget({
                            title: `Выбор фото для: ${part.title}`,
                            currentUrl: part.image,
                            onSelect: (newUrl) =>
                              updatePartItem(part.id, { image: newUrl }),
                          })
                        }
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/15 hover:bg-white/25 text-white text-[11px] font-extrabold uppercase cursor-pointer"
                      >
                        <ImageIcon className="w-3.5 h-3.5" />
                        <span>Из галереи</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => handleDeletePartItem(part.id)}
                        className="ml-auto inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-red-500/20 hover:bg-red-600 text-red-200 hover:text-white text-[11px] font-bold cursor-pointer"
                        title="Удалить деталь"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Part Fields Form */}
                <div className="p-4 space-y-3 flex-1">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="sm:col-span-2">
                      <label className="block text-[10px] font-extrabold uppercase text-[#647082] mb-0.5">
                        Наименование детали / узла
                      </label>
                      <input
                        type="text"
                        value={part.title}
                        onChange={(e) =>
                          updatePartItem(part.id, { title: e.target.value })
                        }
                        className="w-full px-3 py-1.5 rounded-lg border border-[#D5D9DE] text-xs font-extrabold text-[#2B3340]"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-extrabold uppercase text-[#647082] mb-0.5">
                        Категория фильтра
                      </label>
                      <select
                        value={part.category}
                        onChange={(e) => {
                          const catObj = PART_CATEGORIES.find(
                            (c) => c.id === e.target.value
                          );
                          updatePartItem(part.id, {
                            category: e.target.value as ManufacturedPart['category'],
                            ...(catObj ? { categoryKey: catObj.labelRu } : {}),
                          });
                        }}
                        className="w-full px-2.5 py-1.5 rounded-lg border border-[#D5D9DE] text-xs font-bold text-[#2B3340] bg-white"
                      >
                        {PART_CATEGORIES.map((c) => (
                          <option key={c.id} value={c.id}>
                            {c.labelRu}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-[10px] font-extrabold uppercase text-[#647082] mb-0.5">
                        Подпись категории на фото
                      </label>
                      <input
                        type="text"
                        value={part.categoryKey}
                        onChange={(e) =>
                          updatePartItem(part.id, {
                            categoryKey: e.target.value,
                          })
                        }
                        className="w-full px-2.5 py-1.5 rounded-lg border border-[#D5D9DE] text-xs font-semibold text-[#2B3340]"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-[10px] font-extrabold uppercase text-[#647082] mb-0.5">
                        Область применения
                      </label>
                      <input
                        type="text"
                        value={part.application}
                        onChange={(e) =>
                          updatePartItem(part.id, {
                            application: e.target.value,
                          })
                        }
                        className="w-full px-2.5 py-1.5 rounded-lg border border-[#D5D9DE] text-xs font-semibold text-[#2B3340]"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-extrabold uppercase text-[#647082] mb-0.5">
                        Материал заготовки
                      </label>
                      <input
                        type="text"
                        value={part.material}
                        onChange={(e) =>
                          updatePartItem(part.id, { material: e.target.value })
                        }
                        className="w-full px-2.5 py-1.5 rounded-lg border border-[#D5D9DE] text-xs font-semibold text-[#2B3340]"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-extrabold uppercase text-[#647082] mb-0.5">
                        Габариты / Размеры
                      </label>
                      <input
                        type="text"
                        value={part.dimensions}
                        onChange={(e) =>
                          updatePartItem(part.id, {
                            dimensions: e.target.value,
                          })
                        }
                        className="w-full px-2.5 py-1.5 rounded-lg border border-[#D5D9DE] text-xs font-semibold text-[#2B3340]"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-extrabold uppercase text-[#647082] mb-0.5">
                        Квалитет точности / Допуски
                      </label>
                      <input
                        type="text"
                        value={part.tolerance}
                        onChange={(e) =>
                          updatePartItem(part.id, { tolerance: e.target.value })
                        }
                        className="w-full px-2.5 py-1.5 rounded-lg border border-[#D5D9DE] text-xs font-semibold text-[#E95A0C]"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-extrabold uppercase text-[#647082] mb-0.5">
                        Шероховатость поверхности
                      </label>
                      <input
                        type="text"
                        value={part.roughness}
                        onChange={(e) =>
                          updatePartItem(part.id, { roughness: e.target.value })
                        }
                        className="w-full px-2.5 py-1.5 rounded-lg border border-[#D5D9DE] text-xs font-semibold text-[#2B3340]"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-extrabold uppercase text-[#647082] mb-0.5">
                        Объём партии
                      </label>
                      <input
                        type="text"
                        value={part.batchSize}
                        onChange={(e) =>
                          updatePartItem(part.id, { batchSize: e.target.value })
                        }
                        className="w-full px-2.5 py-1.5 rounded-lg border border-[#D5D9DE] text-xs font-semibold text-[#2B3340]"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-extrabold uppercase text-[#647082] mb-0.5">
                        Срок изготовления
                      </label>
                      <input
                        type="text"
                        value={part.leadTime}
                        onChange={(e) =>
                          updatePartItem(part.id, { leadTime: e.target.value })
                        }
                        className="w-full px-2.5 py-1.5 rounded-lg border border-[#D5D9DE] text-xs font-semibold text-[#2B3340]"
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* =================================================================== */}
      {/* SECTION 2: EQUIPMENT / MACHINE PARK EDITOR                          */}
      {/* =================================================================== */}
      {activeSection === 'equipment' && (
        <div className="space-y-5">
          <div className="bg-white rounded-xl border border-[#D5D9DE] p-5 shadow-xs">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-4 pb-3 border-b border-[#E2E5E8]">
              <div>
                <h4 className="text-sm font-black uppercase text-[#2B3340] font-dela">
                  Станочный парк и оборудование ({editLang.toUpperCase()})
                </h4>
                <p className="text-xs text-[#647082]">
                  Редактируйте карточки станков, меняйте фотографии или добавляйте новое оборудование.
                </p>
              </div>
              <button
                type="button"
                onClick={handleAddEquipmentItem}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#E95A0C] hover:bg-[#CC4B06] text-white text-xs font-extrabold uppercase cursor-pointer shadow-xs"
              >
                <Plus className="w-4 h-4" />
                <span>Добавить станок</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-extrabold uppercase text-[#647082] mb-1">
                  Заголовок раздела оборудования
                </label>
                <input
                  type="text"
                  value={langData.equipmentHeading.title}
                  onChange={(e) =>
                    setCmsConfig((prev) => ({
                      ...prev,
                      languages: {
                        ...prev.languages,
                        [editLang]: {
                          ...prev.languages[editLang],
                          equipmentHeading: {
                            ...prev.languages[editLang].equipmentHeading,
                            title: e.target.value,
                          },
                        },
                      },
                    }))
                  }
                  className="w-full px-3 py-2 rounded-lg border border-[#D5D9DE] text-xs font-bold text-[#2B3340]"
                />
              </div>
              <div>
                <label className="block text-[11px] font-extrabold uppercase text-[#647082] mb-1">
                  Заголовок нижнего баннера цехов
                </label>
                <input
                  type="text"
                  value={langData.equipmentHeading.bannerTitle}
                  onChange={(e) =>
                    setCmsConfig((prev) => ({
                      ...prev,
                      languages: {
                        ...prev.languages,
                        [editLang]: {
                          ...prev.languages[editLang],
                          equipmentHeading: {
                            ...prev.languages[editLang].equipmentHeading,
                            bannerTitle: e.target.value,
                          },
                        },
                      },
                    }))
                  }
                  className="w-full px-3 py-2 rounded-lg border border-[#D5D9DE] text-xs font-bold text-[#2B3340]"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {langData.equipmentList.map((item, idx) => (
              <div
                key={item.id}
                className="bg-white rounded-xl border border-[#D5D9DE] overflow-hidden shadow-xs flex flex-col"
              >
                <div className="grid grid-cols-1 sm:grid-cols-12 bg-[#1E2530] border-b border-[#D5D9DE]">
                  <div className="sm:col-span-5 relative aspect-[16/10] sm:aspect-auto min-h-[160px] bg-[#141921] overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-[#2B3340]/90 text-white text-[10px] font-extrabold uppercase">
                      #{idx + 1} • {item.id}
                    </div>
                  </div>

                  <div className="sm:col-span-7 p-4 flex flex-col justify-between text-white">
                    <div>
                      <div className="text-[11px] font-extrabold uppercase text-[#E95A0C] mb-1">
                        Фотография станка
                      </div>
                      <input
                        type="text"
                        value={item.image}
                        onChange={(e) =>
                          updateEquipmentItem(item.id, { image: e.target.value })
                        }
                        className="w-full px-2.5 py-1.5 rounded bg-white/10 border border-white/20 text-white text-xs font-mono mb-2.5"
                      />
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                      <label className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#E95A0C] hover:bg-[#CC4B06] text-white text-[11px] font-extrabold uppercase cursor-pointer">
                        <Upload className="w-3.5 h-3.5" />
                        <span>Загрузить фото</span>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => {
                            const f = e.target.files?.[0];
                            if (f) {
                              handleUploadNewPhoto(f, (url) =>
                                updateEquipmentItem(item.id, { image: url })
                              );
                            }
                            e.target.value = '';
                          }}
                        />
                      </label>

                      <button
                        type="button"
                        onClick={() =>
                          setPickerTarget({
                            title: `Выбор фото для станка: ${item.name}`,
                            currentUrl: item.image,
                            onSelect: (newUrl) =>
                              updateEquipmentItem(item.id, { image: newUrl }),
                          })
                        }
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/15 hover:bg-white/25 text-white text-[11px] font-extrabold uppercase cursor-pointer"
                      >
                        <ImageIcon className="w-3.5 h-3.5" />
                        <span>Из галереи</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => handleDeleteEquipmentItem(item.id)}
                        className="ml-auto inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-red-500/20 hover:bg-red-600 text-red-200 hover:text-white text-[11px] font-bold cursor-pointer"
                        title="Удалить карточку станка"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>

                <div className="p-4 space-y-3 flex-1">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="sm:col-span-2">
                      <label className="block text-[10px] font-extrabold uppercase text-[#647082] mb-0.5">
                        Название станка / Станочной группы
                      </label>
                      <input
                        type="text"
                        value={item.name}
                        onChange={(e) =>
                          updateEquipmentItem(item.id, { name: e.target.value })
                        }
                        className="w-full px-3 py-1.5 rounded-lg border border-[#D5D9DE] text-xs font-extrabold text-[#2B3340]"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-extrabold uppercase text-[#647082] mb-0.5">
                        Категория (для фильтра)
                      </label>
                      <input
                        type="text"
                        list={`eq-cats-${item.id}`}
                        value={item.category}
                        onChange={(e) =>
                          updateEquipmentItem(item.id, {
                            category: e.target.value,
                          })
                        }
                        className="w-full px-2.5 py-1.5 rounded-lg border border-[#D5D9DE] text-xs font-bold text-[#2B3340]"
                      />
                      <datalist id={`eq-cats-${item.id}`}>
                        {EQUIPMENT_CATEGORIES.map((c) => (
                          <option key={c} value={c} />
                        ))}
                      </datalist>
                    </div>

                    <div>
                      <label className="block text-[10px] font-extrabold uppercase text-[#647082] mb-0.5">
                        Рабочая зона / Габариты обработки
                      </label>
                      <input
                        type="text"
                        value={item.capacity}
                        onChange={(e) =>
                          updateEquipmentItem(item.id, {
                            capacity: e.target.value,
                          })
                        }
                        className="w-full px-2.5 py-1.5 rounded-lg border border-[#D5D9DE] text-xs font-semibold text-[#2B3340]"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-extrabold uppercase text-[#647082] mb-0.5">
                        Точность позиционирования
                      </label>
                      <input
                        type="text"
                        value={item.precision}
                        onChange={(e) =>
                          updateEquipmentItem(item.id, {
                            precision: e.target.value,
                          })
                        }
                        className="w-full px-2.5 py-1.5 rounded-lg border border-[#D5D9DE] text-xs font-bold text-[#E95A0C]"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-[10px] font-extrabold uppercase text-[#647082] mb-0.5">
                        Описание технологических возможностей
                      </label>
                      <textarea
                        rows={2}
                        value={item.description}
                        onChange={(e) =>
                          updateEquipmentItem(item.id, {
                            description: e.target.value,
                          })
                        }
                        className="w-full px-2.5 py-1.5 rounded-lg border border-[#D5D9DE] text-xs font-semibold text-[#2B3340]"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-[10px] font-extrabold uppercase text-[#647082] mb-0.5">
                        Теги и ключевые параметры (по одному на строку)
                      </label>
                      <textarea
                        rows={2}
                        value={item.tags.join('\n')}
                        onChange={(e) =>
                          updateEquipmentItem(item.id, {
                            tags: e.target.value
                              .split('\n')
                              .map((s) => s.trim())
                              .filter(Boolean),
                          })
                        }
                        className="w-full px-2.5 py-1.5 rounded-lg border border-[#D5D9DE] text-xs font-semibold text-[#2B3340]"
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* =================================================================== */}
      {/* SECTION 3: HERO PAGE & MAIN PHOTO EDITOR                            */}
      {/* =================================================================== */}
      {activeSection === 'hero' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left: Hero Texts */}
          <div className="lg:col-span-7 bg-white rounded-xl border border-[#D5D9DE] p-5 space-y-4">
            <h4 className="text-sm font-black uppercase text-[#2B3340] font-dela border-b border-[#E2E5E8] pb-2.5">
              Тексты первого экрана (01. Главная — {editLang.toUpperCase()})
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-extrabold uppercase text-[#647082] mb-1">
                  Верхний бейдж
                </label>
                <input
                  type="text"
                  value={langData.hero.badge}
                  onChange={(e) => updateHeroField('badge', e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-[#D5D9DE] text-xs font-bold text-[#2B3340]"
                />
              </div>
              <div>
                <label className="block text-[11px] font-extrabold uppercase text-[#647082] mb-1">
                  Год основания (бейдж)
                </label>
                <input
                  type="text"
                  value={langData.hero.sinceTag}
                  onChange={(e) => updateHeroField('sinceTag', e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-[#D5D9DE] text-xs font-bold text-[#2B3340]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-extrabold uppercase text-[#647082] mb-1">
                  Заголовок (Красная строка)
                </label>
                <input
                  type="text"
                  value={langData.hero.titleHighlight}
                  onChange={(e) =>
                    updateHeroField('titleHighlight', e.target.value)
                  }
                  className="w-full px-3 py-2 rounded-lg border border-[#D5D9DE] text-xs font-extrabold text-[#E95A0C]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-extrabold uppercase text-[#647082] mb-1">
                  Заголовок (Вторая строка)
                </label>
                <input
                  type="text"
                  value={langData.hero.titleRest}
                  onChange={(e) => updateHeroField('titleRest', e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-[#D5D9DE] text-xs font-extrabold text-[#2B3340]"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-[11px] font-extrabold uppercase text-[#647082] mb-1">
                  Фирменный слоган в рамке
                </label>
                <input
                  type="text"
                  value={langData.hero.sloganTitle}
                  onChange={(e) =>
                    updateHeroField('sloganTitle', e.target.value)
                  }
                  className="w-full px-3 py-2 rounded-lg border border-[#D5D9DE] text-xs font-bold text-[#2B3340]"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-[11px] font-extrabold uppercase text-[#647082] mb-1">
                  Описание производственного цикла под слоганом
                </label>
                <textarea
                  rows={3}
                  value={langData.hero.sloganDesc}
                  onChange={(e) =>
                    updateHeroField('sloganDesc', e.target.value)
                  }
                  className="w-full px-3 py-2 rounded-lg border border-[#D5D9DE] text-xs font-semibold text-[#2B3340]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-extrabold uppercase text-[#647082] mb-1">
                  Текст главной красной кнопки
                </label>
                <input
                  type="text"
                  value={langData.hero.primaryCta}
                  onChange={(e) =>
                    updateHeroField('primaryCta', e.target.value)
                  }
                  className="w-full px-3 py-2 rounded-lg border border-[#D5D9DE] text-xs font-bold text-[#2B3340]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-extrabold uppercase text-[#647082] mb-1">
                  Текст второй кнопки
                </label>
                <input
                  type="text"
                  value={langData.hero.secondaryCta}
                  onChange={(e) =>
                    updateHeroField('secondaryCta', e.target.value)
                  }
                  className="w-full px-3 py-2 rounded-lg border border-[#D5D9DE] text-xs font-bold text-[#2B3340]"
                />
              </div>
            </div>

            {/* 4 Key Stats under Hero Photo */}
            <div className="pt-3 border-t border-[#E2E5E8]">
              <div className="text-xs font-extrabold uppercase text-[#2B3340] mb-2.5">
                4 ключевых показателя завода (в карточке под главным фото):
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {langData.hero.stats.map((st, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-lg bg-[#ECEEF0] border border-[#D5D9DE] space-y-1.5"
                  >
                    <input
                      type="text"
                      value={st.value}
                      onChange={(e) => {
                        const nextStats = [...langData.hero.stats];
                        nextStats[idx] = {
                          ...nextStats[idx],
                          value: e.target.value,
                        };
                        updateHeroField('stats', nextStats);
                      }}
                      className="w-full px-2.5 py-1 rounded bg-white border border-[#D5D9DE] text-xs font-black text-[#E95A0C]"
                      placeholder="Цифра (напр. 30 000+ м²)"
                    />
                    <input
                      type="text"
                      value={st.label}
                      onChange={(e) => {
                        const nextStats = [...langData.hero.stats];
                        nextStats[idx] = {
                          ...nextStats[idx],
                          label: e.target.value,
                        };
                        updateHeroField('stats', nextStats);
                      }}
                      className="w-full px-2.5 py-1 rounded bg-white border border-[#D5D9DE] text-xs font-semibold text-[#2B3340]"
                      placeholder="Подпись показателя"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Main Hero Photo & Photo Captions */}
          <div className="lg:col-span-5 bg-white rounded-xl border border-[#D5D9DE] p-5 space-y-4">
            <h4 className="text-sm font-black uppercase text-[#2B3340] font-dela border-b border-[#E2E5E8] pb-2.5">
              Главное фото на 1-й странице
            </h4>

            <div className="rounded-xl overflow-hidden border-2 border-[#2B3340] bg-[#1B222C] relative aspect-[16/10]">
              <img
                src={langData.hero.heroImage || '/images/landing_img_1.jpg'}
                alt="Hero preview"
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-2 left-2 right-2 bg-[#1B222C]/85 backdrop-blur-xs p-2.5 rounded text-white text-xs">
                <div className="text-[10px] font-extrabold text-[#E95A0C] uppercase">
                  {langData.hero.billboardEyebrow}
                </div>
                <div className="font-bold truncate">
                  {langData.hero.billboardTitle}
                </div>
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-extrabold uppercase text-[#647082] mb-1">
                Путь или URL главной фотографии
              </label>
              <input
                type="text"
                value={langData.hero.heroImage || '/images/landing_img_1.jpg'}
                onChange={(e) => updateHeroField('heroImage', e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-[#D5D9DE] text-xs font-mono text-[#2B3340]"
              />
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <label className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#E95A0C] hover:bg-[#CC4B06] text-white text-xs font-extrabold uppercase cursor-pointer">
                <Upload className="w-4 h-4" />
                <span>Загрузить новое фото с ПК</span>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const f = e.target.files?.[0];
                    if (f) {
                      handleUploadNewPhoto(f, (url) =>
                        updateHeroField('heroImage', url)
                      );
                    }
                    e.target.value = '';
                  }}
                />
              </label>

              <button
                type="button"
                onClick={() =>
                  setPickerTarget({
                    title: 'Выбор главного фото для 1-й страницы',
                    currentUrl:
                      langData.hero.heroImage || '/images/landing_img_1.jpg',
                    onSelect: (newUrl) => updateHeroField('heroImage', newUrl),
                  })
                }
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#ECEEF0] hover:bg-[#D5D9DE] text-[#2B3340] text-xs font-extrabold uppercase cursor-pointer"
              >
                <ImageIcon className="w-4 h-4 text-[#E95A0C]" />
                <span>Выбрать из галереи</span>
              </button>
            </div>

            <div className="space-y-3 pt-3 border-t border-[#E2E5E8]">
              <div>
                <label className="block text-[11px] font-extrabold uppercase text-[#647082] mb-1">
                  Бейдж точности в правом верхнем углу фото
                </label>
                <input
                  type="text"
                  value={langData.hero.billboardPrecision}
                  onChange={(e) =>
                    updateHeroField('billboardPrecision', e.target.value)
                  }
                  className="w-full px-3 py-2 rounded-lg border border-[#D5D9DE] text-xs font-bold text-[#2B3340]"
                />
              </div>
              <div>
                <label className="block text-[11px] font-extrabold uppercase text-[#647082] mb-1">
                  Надзаголовок на фото
                </label>
                <input
                  type="text"
                  value={langData.hero.billboardEyebrow}
                  onChange={(e) =>
                    updateHeroField('billboardEyebrow', e.target.value)
                  }
                  className="w-full px-3 py-2 rounded-lg border border-[#D5D9DE] text-xs font-bold text-[#2B3340]"
                />
              </div>
              <div>
                <label className="block text-[11px] font-extrabold uppercase text-[#647082] mb-1">
                  Подпись на фото (Заказчики и линии)
                </label>
                <input
                  type="text"
                  value={langData.hero.billboardTitle}
                  onChange={(e) =>
                    updateHeroField('billboardTitle', e.target.value)
                  }
                  className="w-full px-3 py-2 rounded-lg border border-[#D5D9DE] text-xs font-bold text-[#2B3340]"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =================================================================== */}
      {/* SECTION 4: CONTACTS, PHONES, WORKING HOURS & BRAND                  */}
      {/* =================================================================== */}
      {activeSection === 'contacts' && (
        <div className="bg-white rounded-xl border border-[#D5D9DE] p-5 space-y-4">
          <div className="border-b border-[#E2E5E8] pb-3">
            <h4 className="text-sm font-black uppercase text-[#2B3340] font-dela">
              Контактные данные, телефоны, адрес и время работы ({editLang.toUpperCase()})
            </h4>
            <p className="text-xs text-[#647082]">
              Эти данные автоматически отображаются в шапке сайта (Header), подвале (Footer), на Главной и на странице «08. Контакты».
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label className="block text-[11px] font-extrabold uppercase text-[#647082] mb-1">
                Основной бренд в шапке
              </label>
              <input
                type="text"
                value={langData.brand.name}
                onChange={(e) => updateBrandField('name', e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-[#D5D9DE] text-xs font-bold text-[#2B3340]"
              />
            </div>

            <div>
              <label className="block text-[11px] font-extrabold uppercase text-[#647082] mb-1">
                Краткое наименование (без кавычек)
              </label>
              <input
                type="text"
                value={langData.brand.subname}
                onChange={(e) => updateBrandField('subname', e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-[#D5D9DE] text-xs font-bold text-[#E95A0C]"
              />
            </div>

            <div>
              <label className="block text-[11px] font-extrabold uppercase text-[#647082] mb-1">
                Полное официальное наименование завода
              </label>
              <input
                type="text"
                value={langData.brand.fullName}
                onChange={(e) => updateBrandField('fullName', e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-[#D5D9DE] text-xs font-bold text-[#2B3340]"
              />
            </div>

            <div>
              <label className="block text-[11px] font-extrabold uppercase text-[#647082] mb-1">
                Основной телефон отдела маркетинга
              </label>
              <input
                type="text"
                value={langData.brand.phone}
                onChange={(e) => {
                  updateBrandField('phone', e.target.value);
                  updateBrandField(
                    'phoneRaw',
                    e.target.value.replace(/[^+\d]/g, '')
                  );
                }}
                className="w-full px-3 py-2 rounded-lg border border-[#D5D9DE] text-xs font-black text-[#2B3340]"
              />
            </div>

            <div>
              <label className="block text-[11px] font-extrabold uppercase text-[#647082] mb-1">
                Телефон бюро маркетинга (городской)
              </label>
              <input
                type="text"
                value={langData.brand.phoneMarket}
                onChange={(e) =>
                  updateBrandField('phoneMarket', e.target.value)
                }
                className="w-full px-3 py-2 rounded-lg border border-[#D5D9DE] text-xs font-bold text-[#2B3340]"
              />
            </div>

            <div>
              <label className="block text-[11px] font-extrabold uppercase text-[#647082] mb-1">
                Приёмная / Факс
              </label>
              <input
                type="text"
                value={langData.brand.phoneFax}
                onChange={(e) => updateBrandField('phoneFax', e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-[#D5D9DE] text-xs font-bold text-[#2B3340]"
              />
            </div>

            <div>
              <label className="block text-[11px] font-extrabold uppercase text-[#647082] mb-1">
                Официальный Email для ТЗ и чертежей
              </label>
              <input
                type="text"
                value={langData.brand.email}
                onChange={(e) => updateBrandField('email', e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-[#D5D9DE] text-xs font-black text-[#E95A0C]"
              />
            </div>

            <div>
              <label className="block text-[11px] font-extrabold uppercase text-[#647082] mb-1">
                Время работы завода
              </label>
              <input
                type="text"
                value={langData.brand.workingHours}
                onChange={(e) =>
                  updateBrandField('workingHours', e.target.value)
                }
                className="w-full px-3 py-2 rounded-lg border border-[#D5D9DE] text-xs font-bold text-[#2B3340]"
              />
            </div>

            <div>
              <label className="block text-[11px] font-extrabold uppercase text-[#647082] mb-1">
                Веб-сайт
              </label>
              <input
                type="text"
                value={langData.brand.website}
                onChange={(e) => updateBrandField('website', e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-[#D5D9DE] text-xs font-bold text-[#2B3340]"
              />
            </div>

            <div className="md:col-span-2 lg:col-span-3">
              <label className="block text-[11px] font-extrabold uppercase text-[#647082] mb-1">
                Юридический и фактический адрес завода
              </label>
              <input
                type="text"
                value={langData.brand.address}
                onChange={(e) => updateBrandField('address', e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-[#D5D9DE] text-xs font-bold text-[#2B3340]"
              />
            </div>
          </div>
        </div>
      )}

      {/* =================================================================== */}
      {/* SECTION 5: ABOUT PLANT, WORKSHOP PHOTO & PROJECTS                   */}
      {/* =================================================================== */}
      {activeSection === 'about' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-7 bg-white rounded-xl border border-[#D5D9DE] p-5 space-y-4">
            <h4 className="text-sm font-black uppercase text-[#2B3340] font-dela border-b border-[#E2E5E8] pb-2.5">
              Раздел «О заводе ОАО БЗАЛ» ({editLang.toUpperCase()})
            </h4>

            <div className="space-y-3">
              <div>
                <label className="block text-[11px] font-extrabold uppercase text-[#647082] mb-1">
                  Заголовок раздела
                </label>
                <input
                  type="text"
                  value={langData.about.title}
                  onChange={(e) => updateAboutField('title', e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-[#D5D9DE] text-xs font-bold text-[#2B3340]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-extrabold uppercase text-[#647082] mb-1">
                  Вводный абзац (Лид)
                </label>
                <textarea
                  rows={3}
                  value={langData.about.lead}
                  onChange={(e) => updateAboutField('lead', e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-[#D5D9DE] text-xs font-semibold text-[#2B3340]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-extrabold uppercase text-[#647082] mb-1">
                  Цитата руководства
                </label>
                <textarea
                  rows={2}
                  value={langData.about.quote}
                  onChange={(e) => updateAboutField('quote', e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-[#D5D9DE] text-xs font-bold text-[#2B3340]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-extrabold uppercase text-[#647082] mb-1">
                  Описание мощностей и компетенций
                </label>
                <textarea
                  rows={3}
                  value={langData.about.desc2}
                  onChange={(e) => updateAboutField('desc2', e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-[#D5D9DE] text-xs font-semibold text-[#2B3340]"
                />
              </div>
            </div>

            {/* Implemented Projects Editor */}
            <div className="pt-3 border-t border-[#E2E5E8] space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold uppercase text-[#2B3340]">
                  Внедрённые проекты станкостроения:
                </span>
                <button
                  type="button"
                  onClick={() => {
                    const nextProjects: PlantProject[] = [
                      ...langData.about.projects,
                      {
                        code: 'СБ-НОВЫЙ',
                        title: 'Специальный агрегатный станок',
                        location: 'г. Минск, РБ',
                        scope: 'Механическая обработка корпусных деталей',
                      },
                    ];
                    updateAboutField('projects', nextProjects);
                  }}
                  className="inline-flex items-center gap-1 px-3 py-1 rounded bg-[#E95A0C] text-white text-[11px] font-extrabold uppercase cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Добавить проект</span>
                </button>
              </div>

              <div className="space-y-2.5">
                {langData.about.projects.map((proj, pIdx) => (
                  <div
                    key={pIdx}
                    className="p-3 rounded-lg bg-[#ECEEF0] border border-[#D5D9DE] grid grid-cols-1 sm:grid-cols-12 gap-2 items-center"
                  >
                    <input
                      type="text"
                      value={proj.code}
                      onChange={(e) => {
                        const next = [...langData.about.projects];
                        next[pIdx] = { ...next[pIdx], code: e.target.value };
                        updateAboutField('projects', next);
                      }}
                      className="sm:col-span-3 px-2.5 py-1.5 rounded bg-white border border-[#D5D9DE] text-xs font-black text-[#E95A0C]"
                      placeholder="Индекс (ЛБ0755)"
                    />
                    <input
                      type="text"
                      value={proj.location}
                      onChange={(e) => {
                        const next = [...langData.about.projects];
                        next[pIdx] = {
                          ...next[pIdx],
                          location: e.target.value,
                        };
                        updateAboutField('projects', next);
                      }}
                      className="sm:col-span-4 px-2.5 py-1.5 rounded bg-white border border-[#D5D9DE] text-xs font-semibold text-[#647082]"
                      placeholder="Город поставки"
                    />
                    <input
                      type="text"
                      value={proj.title}
                      onChange={(e) => {
                        const next = [...langData.about.projects];
                        next[pIdx] = { ...next[pIdx], title: e.target.value };
                        updateAboutField('projects', next);
                      }}
                      className="sm:col-span-4 px-2.5 py-1.5 rounded bg-white border border-[#D5D9DE] text-xs font-bold text-[#2B3340]"
                      placeholder="Название линии / станка"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        const next = langData.about.projects.filter(
                          (_, i) => i !== pIdx
                        );
                        updateAboutField('projects', next);
                      }}
                      className="sm:col-span-1 p-1.5 rounded bg-red-100 hover:bg-red-600 text-red-700 hover:text-white flex items-center justify-center cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                    <input
                      type="text"
                      value={proj.scope}
                      onChange={(e) => {
                        const next = [...langData.about.projects];
                        next[pIdx] = { ...next[pIdx], scope: e.target.value };
                        updateAboutField('projects', next);
                      }}
                      className="sm:col-span-12 px-2.5 py-1.5 rounded bg-white border border-[#D5D9DE] text-xs text-[#2B3340]"
                      placeholder="Описание выполненных работ"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: About Workshop Photo */}
          <div className="lg:col-span-5 bg-white rounded-xl border border-[#D5D9DE] p-5 space-y-4">
            <h4 className="text-sm font-black uppercase text-[#2B3340] font-dela border-b border-[#E2E5E8] pb-2.5">
              Фотография производственного корпуса
            </h4>

            <div className="rounded-xl overflow-hidden border border-[#D5D9DE] bg-[#1B222C] relative aspect-[16/10]">
              <img
                src={langData.about.photoImage || '/images/bzal_lines.jpg'}
                alt="About plant preview"
                className="w-full h-full object-cover"
              />
            </div>

            <div>
              <label className="block text-[11px] font-extrabold uppercase text-[#647082] mb-1">
                Путь или URL фото сборочного цеха
              </label>
              <input
                type="text"
                value={langData.about.photoImage || '/images/bzal_lines.jpg'}
                onChange={(e) => updateAboutField('photoImage', e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-[#D5D9DE] text-xs font-mono text-[#2B3340]"
              />
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <label className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#E95A0C] hover:bg-[#CC4B06] text-white text-xs font-extrabold uppercase cursor-pointer">
                <Upload className="w-4 h-4" />
                <span>Загрузить своё фото</span>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const f = e.target.files?.[0];
                    if (f) {
                      handleUploadNewPhoto(f, (url) =>
                        updateAboutField('photoImage', url)
                      );
                    }
                    e.target.value = '';
                  }}
                />
              </label>

              <button
                type="button"
                onClick={() =>
                  setPickerTarget({
                    title: 'Выбор фото производственного корпуса',
                    currentUrl:
                      langData.about.photoImage || '/images/bzal_lines.jpg',
                    onSelect: (newUrl) =>
                      updateAboutField('photoImage', newUrl),
                  })
                }
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#ECEEF0] hover:bg-[#D5D9DE] text-[#2B3340] text-xs font-extrabold uppercase cursor-pointer"
              >
                <ImageIcon className="w-4 h-4 text-[#E95A0C]" />
                <span>Выбрать из галереи</span>
              </button>
            </div>

            <div>
              <label className="block text-[11px] font-extrabold uppercase text-[#647082] mb-1">
                Подпись на фотографии цеха
              </label>
              <input
                type="text"
                value={langData.about.photoTitle}
                onChange={(e) => updateAboutField('photoTitle', e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-[#D5D9DE] text-xs font-bold text-[#2B3340]"
              />
            </div>
          </div>
        </div>
      )}

      {/* =================================================================== */}
      {/* SECTION 6: MEDIA LIBRARY & JSON BACKUP / RESET                      */}
      {/* =================================================================== */}
      {activeSection === 'media' && (
        <div className="space-y-6">
          {/* Backup / Restore / Factory Reset Box */}
          <div className="bg-white rounded-xl border border-[#D5D9DE] p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h4 className="text-sm font-black uppercase text-[#2B3340] font-dela">
                Резервное копирование и сброс настроек CMS
              </h4>
              <p className="text-xs text-[#647082] mt-0.5">
                Вы можете скачать полную конфигурацию сайта в файл `.json`, загрузить ранее сохранённую копию или вернуть исходные заводские тексты и фото.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2.5 shrink-0">
              <button
                type="button"
                onClick={handleExportJson}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#2B3340] hover:bg-[#1B222C] text-white text-xs font-extrabold uppercase cursor-pointer"
              >
                <Download className="w-3.5 h-3.5 text-[#E95A0C]" />
                <span>Экспорт JSON</span>
              </button>

              <button
                type="button"
                onClick={() => fileImportRef.current?.click()}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#ECEEF0] hover:bg-[#D5D9DE] text-[#2B3340] text-xs font-extrabold uppercase cursor-pointer"
              >
                <FileUp className="w-3.5 h-3.5 text-[#E95A0C]" />
                <span>Импорт JSON</span>
              </button>
              <input
                ref={fileImportRef}
                type="file"
                accept=".json,application/json"
                className="hidden"
                onChange={handleImportJson}
              />

              <button
                type="button"
                onClick={handleResetDefaults}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-red-50 hover:bg-red-600 text-red-700 hover:text-white border border-red-200 text-xs font-extrabold uppercase transition-all cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Сбросить по умолчанию</span>
              </button>
            </div>
          </div>

          {/* Media Library Grid */}
          <div className="bg-white rounded-xl border border-[#D5D9DE] p-5 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#E2E5E8] pb-3">
              <div>
                <h4 className="text-sm font-black uppercase text-[#2B3340] font-dela">
                  Медиабиблиотека фотографий ОАО БЗАЛ ({allAvailableImages.length})
                </h4>
                <p className="text-xs text-[#647082]">
                  Загружайте новые фотографии цехов, станков и деталей — они сразу станут доступны для выбора в любой карточке.
                </p>
              </div>

              <label className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#E95A0C] hover:bg-[#CC4B06] text-white text-xs font-extrabold uppercase cursor-pointer shadow-sm">
                <Upload className="w-4 h-4" />
                <span>Загрузить фото в медиатеку</span>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const f = e.target.files?.[0];
                    if (f) {
                      handleUploadNewPhoto(f);
                    }
                    e.target.value = '';
                  }}
                />
              </label>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {allAvailableImages.map((img, i) => (
                <div
                  key={`${img.url}-${i}`}
                  className="rounded-xl border border-[#D5D9DE] overflow-hidden bg-[#ECEEF0] flex flex-col"
                >
                  <div className="aspect-[16/10] bg-[#1B222C] relative overflow-hidden">
                    <img
                      src={img.url}
                      alt={img.name}
                      className="w-full h-full object-cover"
                    />
                    <span className="absolute top-2 left-2 px-2 py-0.5 rounded bg-[#2B3340]/85 text-white text-[10px] font-bold">
                      {img.category}
                    </span>
                  </div>
                  <div className="p-3 flex flex-col justify-between flex-1 gap-2 bg-white">
                    <div className="text-xs font-bold text-[#2B3340] truncate">
                      {img.name}
                    </div>
                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => {
                          navigator.clipboard.writeText(img.url);
                          setCopiedUrl(img.url);
                          setTimeout(() => setCopiedUrl(null), 2000);
                        }}
                        className="w-full inline-flex items-center justify-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-[#ECEEF0] hover:bg-[#2B3340] text-[#2B3340] hover:text-white text-[11px] font-extrabold uppercase transition-all cursor-pointer"
                      >
                        {copiedUrl === img.url ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-500" />
                            <span>Скопировано</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>Скопировать путь</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* =================================================================== */}
      {/* MODAL: GALLERY IMAGE PICKER                                         */}
      {/* =================================================================== */}
      {pickerTarget && (
        <div className="fixed inset-0 z-[90] bg-black/75 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border-2 border-[#2B3340] max-w-4xl w-full max-h-[88vh] flex flex-col overflow-hidden shadow-2xl">
            <div className="p-4 sm:p-5 bg-[#2B3340] text-white flex items-center justify-between">
              <div>
                <div className="text-[10px] font-extrabold uppercase text-[#E95A0C]">
                  ВЫБОР ИЗОБРАЖЕНИЯ ИЗ МЕДИАБИБЛИОТЕКИ ОАО БЗАЛ
                </div>
                <h4 className="text-sm sm:text-base font-black font-dela uppercase">
                  {pickerTarget.title}
                </h4>
              </div>
              <button
                type="button"
                onClick={() => setPickerTarget(null)}
                className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-extrabold uppercase cursor-pointer"
              >
                Закрыть ✕
              </button>
            </div>

            <div className="p-4 sm:p-5 overflow-y-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {allAvailableImages.map((img, idx) => {
                const isSelected = pickerTarget.currentUrl === img.url;
                return (
                  <button
                    key={`${img.url}-${idx}`}
                    type="button"
                    onClick={() => {
                      pickerTarget.onSelect(img.url);
                      setPickerTarget(null);
                    }}
                    className={`text-left rounded-xl overflow-hidden border-2 transition-all cursor-pointer flex flex-col ${
                      isSelected
                        ? 'border-[#E95A0C] ring-2 ring-[#E95A0C]/30'
                        : 'border-[#D5D9DE] hover:border-[#2B3340]'
                    }`}
                  >
                    <div className="aspect-[16/10] bg-[#1B222C] relative overflow-hidden w-full">
                      <img
                        src={img.url}
                        alt={img.name}
                        className="w-full h-full object-cover"
                      />
                      <span className="absolute top-2 left-2 px-2 py-0.5 rounded bg-[#2B3340]/85 text-white text-[10px] font-bold">
                        {img.category}
                      </span>
                    </div>
                    <div className="p-3 bg-white w-full">
                      <div className="text-xs font-extrabold text-[#2B3340] truncate">
                        {img.name}
                      </div>
                      <div className="text-[10px] text-[#E95A0C] font-bold uppercase mt-1">
                        {isSelected ? '✓ Выбрано сейчас' : 'Нажмите, чтобы выбрать →'}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
