import { Language, EquipmentItem, ManufacturedPart, PlantProject } from '../types';
import { content, equipmentList } from '../data/content';
import { extraContent, manufacturedPartsList } from '../data/extraContent';
import { supabase, getSavedAdminToken } from './supabase';

export interface CmsBrandOverride {
  name: string;
  subname: string;
  fullName: string;
  slogan: string;
  address: string;
  phone: string;
  phoneRaw: string;
  phoneFax: string;
  phoneMarket: string;
  email: string;
  website: string;
  workingHours: string;
  since: string;
  btnRfq: string;
}

export interface CmsHeroOverride {
  badge: string;
  sinceTag: string;
  titleHighlight: string;
  titleRest: string;
  sloganTitle: string;
  sloganDesc: string;
  primaryCta: string;
  secondaryCta: string;
  salesLeadLabel: string;
  trustBadges: string[];
  billboardTag: string;
  billboardPrecision: string;
  billboardEyebrow: string;
  billboardTitle: string;
  heroImage: string;
  stats: { value: string; label: string }[];
  plantLocationTag: string;
  certTag: string;
}

export interface CmsAboutOverride {
  eyebrow: string;
  title: string;
  lead: string;
  quote: string;
  quoteAuthor: string;
  quoteBadge: string;
  desc2: string;
  bulletTitle: string;
  bullets: string[];
  photoTag: string;
  photoTitle: string;
  photoImage: string;
  projectsEyebrow: string;
  projectsSub: string;
  projects: PlantProject[];
}

export interface CmsLanguageData {
  brand: CmsBrandOverride;
  hero: CmsHeroOverride;
  about: CmsAboutOverride;
  equipmentHeading: {
    eyebrow: string;
    title: string;
    subtitle: string;
    bannerEyebrow: string;
    bannerTitle: string;
    bannerDesc: string;
  };
  partsHeading: {
    eyebrow: string;
    title: string;
    subtitle: string;
  };
  equipmentList: EquipmentItem[];
  partsList: ManufacturedPart[];
}

export interface CmsSiteConfig {
  updatedAt: string;
  customGalleryImages: { name: string; url: string; uploadedAt: string }[];
  languages: Record<Language, CmsLanguageData>;
}

const LOCAL_CMS_STORAGE_KEY = 'bzal_cms_site_config_v1';
const SUPABASE_CMS_BUCKET = 'bzal-drawings';
const SUPABASE_CMS_FILE_PATH = 'cms/site_cms_config.json';

export const BUILTIN_GALLERY_IMAGES: { name: string; url: string; category: string }[] = [
  { name: 'Автоматическая линия (Цех 1)', url: '/images/landing_img_1.jpg', category: 'Цеха и линии' },
  { name: 'Механообработка корпусных узлов', url: '/images/landing_img_2.jpg', category: 'Мехобработка ЧПУ' },
  { name: 'Токарно-шлифовальный участок', url: '/images/landing_img_3.jpg', category: 'Валы и токарная группа' },
  { name: 'Шпиндели, валы и шестерни', url: '/images/landing_img_4.jpg', category: 'Шпиндели и детали' },
  { name: 'Сборка автоматических линий БЗАЛ', url: '/images/bzal_lines.jpg', category: 'Цеха и линии' },
  { name: 'Зубообработка и зубчатые венцы', url: '/images/bzal_gears.jpg', category: 'Шестерни и редукторы' },
  { name: 'Токарная обработка с ЧПУ', url: '/images/bzal_lathe.jpg', category: 'Валы и токарная группа' },
  { name: 'Плоскошлифовальная и круглошлифовальная обработка', url: '/images/bzal_sparks.jpg', category: 'Шлифовка и термообработка' },
  { name: 'Панорама станочного парка', url: '/images/hero_bg_1.jpg', category: 'Цеха и линии' },
];

function deepClone<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj));
}

// Capture pristine factory defaults before any mutation occurs
const FACTORY_DEFAULT_CONFIG: CmsSiteConfig = (() => {
  const langs: Language[] = ['ru', 'en', 'zh'];
  const languages = {} as Record<Language, CmsLanguageData>;

  for (const lang of langs) {
    const c = content[lang];
    const ec = extraContent[lang];
    languages[lang] = {
      brand: deepClone(c.brand),
      hero: {
        badge: c.hero.badge,
        sinceTag: c.hero.sinceTag,
        titleHighlight: c.hero.titleHighlight,
        titleRest: c.hero.titleRest,
        sloganTitle: c.hero.sloganTitle,
        sloganDesc: c.hero.sloganDesc,
        primaryCta: c.hero.primaryCta,
        secondaryCta: c.hero.secondaryCta,
        salesLeadLabel: c.hero.salesLeadLabel,
        trustBadges: deepClone(c.hero.trustBadges),
        billboardTag: c.hero.billboardTag,
        billboardPrecision: c.hero.billboardPrecision,
        billboardEyebrow: c.hero.billboardEyebrow,
        billboardTitle: c.hero.billboardTitle,
        heroImage: (c.hero as Record<string, unknown>).heroImage as string || '/images/landing_img_1.jpg',
        stats: deepClone(c.hero.stats),
        plantLocationTag: c.hero.plantLocationTag,
        certTag: c.hero.certTag,
      },
      about: {
        eyebrow: c.about.eyebrow,
        title: c.about.title,
        lead: c.about.lead,
        quote: c.about.quote,
        quoteAuthor: c.about.quoteAuthor,
        quoteBadge: c.about.quoteBadge,
        desc2: c.about.desc2,
        bulletTitle: c.about.bulletTitle,
        bullets: deepClone(c.about.bullets),
        photoTag: c.about.photoTag,
        photoTitle: c.about.photoTitle,
        photoImage: (c.about as Record<string, unknown>).photoImage as string || '/images/bzal_lines.jpg',
        projectsEyebrow: c.about.projectsEyebrow,
        projectsSub: c.about.projectsSub,
        projects: deepClone(c.about.projects),
      },
      equipmentHeading: {
        eyebrow: c.equipment.eyebrow,
        title: c.equipment.title,
        subtitle: c.equipment.subtitle,
        bannerEyebrow: c.equipment.bannerEyebrow,
        bannerTitle: c.equipment.bannerTitle,
        bannerDesc: c.equipment.bannerDesc,
      },
      partsHeading: {
        eyebrow: ec.partsCatalog.eyebrow,
        title: ec.partsCatalog.title,
        subtitle: ec.partsCatalog.subtitle,
      },
      equipmentList: deepClone(equipmentList[lang]),
      partsList: deepClone(manufacturedPartsList[lang]),
    };
  }

  return {
    updatedAt: new Date().toISOString(),
    customGalleryImages: [],
    languages,
  };
})();

export function getFactoryDefaultCmsConfig(): CmsSiteConfig {
  return deepClone(FACTORY_DEFAULT_CONFIG);
}

/**
 * Applies a CmsSiteConfig directly to the live in-memory `content`, `extraContent`,
 * `equipmentList`, and `manufacturedPartsList` objects and dispatches a global event
 * so all React components re-render immediately.
 */
export function applyCmsConfigToRuntime(config: CmsSiteConfig): void {
  if (!config || !config.languages) return;

  const langs: Language[] = ['ru', 'en', 'zh'];
  for (const lang of langs) {
    const langCfg = config.languages[lang];
    if (!langCfg) continue;

    // 1. Brand & Contacts sync
    if (langCfg.brand) {
      Object.assign(content[lang].brand, langCfg.brand);
      if (langCfg.brand.address) {
        content[lang].contacts.addressVal = langCfg.brand.address;
      }
      if (langCfg.brand.workingHours) {
        content[lang].contacts.hoursTime = langCfg.brand.workingHours;
      }
    }

    // 2. Hero section
    if (langCfg.hero) {
      if (lang === 'ru' && langCfg.hero.salesLeadLabel) {
        langCfg.hero.salesLeadLabel = langCfg.hero.salesLeadLabel.replace(
          /маркетинга и сбыта/gi,
          'маркетинга и продаж'
        );
      }
      Object.assign(content[lang].hero, langCfg.hero);
      (content[lang].hero as Record<string, unknown>).heroImage =
        langCfg.hero.heroImage || '/images/landing_img_1.jpg';
    }

    // 3. About section
    if (langCfg.about) {
      Object.assign(content[lang].about, langCfg.about);
      (content[lang].about as Record<string, unknown>).photoImage =
        langCfg.about.photoImage || '/images/bzal_lines.jpg';
    }

    // 4. Equipment section headings
    if (langCfg.equipmentHeading) {
      Object.assign(content[lang].equipment, langCfg.equipmentHeading);
    }

    // 5. Parts catalog headings
    if (langCfg.partsHeading) {
      Object.assign(extraContent[lang].partsCatalog, langCfg.partsHeading);
    }

    // 6. Equipment items array (in-place replacement)
    if (Array.isArray(langCfg.equipmentList)) {
      equipmentList[lang].splice(0, equipmentList[lang].length, ...deepClone(langCfg.equipmentList));
    }

    // 7. Manufactured parts array (in-place replacement)
    if (Array.isArray(langCfg.partsList)) {
      manufacturedPartsList[lang].splice(
        0,
        manufacturedPartsList[lang].length,
        ...deepClone(langCfg.partsList)
      );
    }
  }

  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('bzal-cms-updated'));
  }
}

export function getCurrentCmsConfigFromRuntime(): CmsSiteConfig {
  let savedCustomGallery: { name: string; url: string; uploadedAt: string }[] = [];
  if (typeof window !== 'undefined') {
    try {
      const raw = localStorage.getItem(LOCAL_CMS_STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as CmsSiteConfig;
        if (Array.isArray(parsed.customGalleryImages)) {
          savedCustomGallery = parsed.customGalleryImages;
        }
      }
    } catch {
      // ignore
    }
  }

  const langs: Language[] = ['ru', 'en', 'zh'];
  const languages = {} as Record<Language, CmsLanguageData>;

  for (const lang of langs) {
    const c = content[lang];
    const ec = extraContent[lang];
    languages[lang] = {
      brand: deepClone(c.brand),
      hero: {
        badge: c.hero.badge,
        sinceTag: c.hero.sinceTag,
        titleHighlight: c.hero.titleHighlight,
        titleRest: c.hero.titleRest,
        sloganTitle: c.hero.sloganTitle,
        sloganDesc: c.hero.sloganDesc,
        primaryCta: c.hero.primaryCta,
        secondaryCta: c.hero.secondaryCta,
        salesLeadLabel: c.hero.salesLeadLabel,
        trustBadges: deepClone(c.hero.trustBadges),
        billboardTag: c.hero.billboardTag,
        billboardPrecision: c.hero.billboardPrecision,
        billboardEyebrow: c.hero.billboardEyebrow,
        billboardTitle: c.hero.billboardTitle,
        heroImage:
          ((c.hero as Record<string, unknown>).heroImage as string) ||
          '/images/landing_img_1.jpg',
        stats: deepClone(c.hero.stats),
        plantLocationTag: c.hero.plantLocationTag,
        certTag: c.hero.certTag,
      },
      about: {
        eyebrow: c.about.eyebrow,
        title: c.about.title,
        lead: c.about.lead,
        quote: c.about.quote,
        quoteAuthor: c.about.quoteAuthor,
        quoteBadge: c.about.quoteBadge,
        desc2: c.about.desc2,
        bulletTitle: c.about.bulletTitle,
        bullets: deepClone(c.about.bullets),
        photoTag: c.about.photoTag,
        photoTitle: c.about.photoTitle,
        photoImage:
          ((c.about as Record<string, unknown>).photoImage as string) ||
          '/images/bzal_lines.jpg',
        projectsEyebrow: c.about.projectsEyebrow,
        projectsSub: c.about.projectsSub,
        projects: deepClone(c.about.projects),
      },
      equipmentHeading: {
        eyebrow: c.equipment.eyebrow,
        title: c.equipment.title,
        subtitle: c.equipment.subtitle,
        bannerEyebrow: c.equipment.bannerEyebrow,
        bannerTitle: c.equipment.bannerTitle,
        bannerDesc: c.equipment.bannerDesc,
      },
      partsHeading: {
        eyebrow: ec.partsCatalog.eyebrow,
        title: ec.partsCatalog.title,
        subtitle: ec.partsCatalog.subtitle,
      },
      equipmentList: deepClone(equipmentList[lang]),
      partsList: deepClone(manufacturedPartsList[lang]),
    };
  }

  return {
    updatedAt: new Date().toISOString(),
    customGalleryImages: savedCustomGallery,
    languages,
  };
}

/**
 * Loads CMS config on startup:
 * 1) Applies localStorage cache immediately for zero-flicker startup
 * 2) Fetches latest from `/api/public/cms` or Supabase Storage `cms/site_cms_config.json`
 */
export async function initCmsConfig(): Promise<CmsSiteConfig> {
  if (typeof window !== 'undefined') {
    try {
      const localRaw = localStorage.getItem(LOCAL_CMS_STORAGE_KEY);
      if (localRaw) {
        const parsed = JSON.parse(localRaw) as CmsSiteConfig;
        if (parsed && parsed.languages) {
          applyCmsConfigToRuntime(parsed);
        }
      }
    } catch {
      // ignore
    }
  }

  // 1. Try server endpoint `/api/public/cms`
  try {
    const res = await fetch('/api/public/cms');
    if (res.ok) {
      const data = await res.json();
      if (data?.cmsConfig && data.cmsConfig.languages) {
        if (typeof window !== 'undefined') {
          localStorage.setItem(LOCAL_CMS_STORAGE_KEY, JSON.stringify(data.cmsConfig));
        }
        applyCmsConfigToRuntime(data.cmsConfig);
        return data.cmsConfig as CmsSiteConfig;
      }
    }
  } catch {
    // Server endpoint not reachable (e.g., static Vercel hosting)
  }

  // 2. Fallback: Try Supabase Storage public/signed download
  try {
    const { data, error } = await supabase.storage
      .from(SUPABASE_CMS_BUCKET)
      .download(`${SUPABASE_CMS_FILE_PATH}?t=${Date.now()}`);
    if (!error && data) {
      const text = await data.text();
      const parsed = JSON.parse(text) as CmsSiteConfig;
      if (parsed && parsed.languages) {
        if (typeof window !== 'undefined') {
          localStorage.setItem(LOCAL_CMS_STORAGE_KEY, JSON.stringify(parsed));
        }
        applyCmsConfigToRuntime(parsed);
        return parsed;
      }
    }
  } catch {
    // ignore
  }

  return getCurrentCmsConfigFromRuntime();
}

/**
 * Saves CMS configuration to:
 * 1) Runtime memory (instant update across all pages)
 * 2) localStorage
 * 3) Backend Server (`/api/admin/cms`)
 * 4) Supabase Storage (`bzal-drawings/cms/site_cms_config.json`)
 */
export async function saveCmsConfigEverywhere(
  config: CmsSiteConfig
): Promise<{ ok: boolean; message: string }> {
  const stamped: CmsSiteConfig = {
    ...config,
    updatedAt: new Date().toISOString(),
  };

  // 1. Apply immediately to runtime
  applyCmsConfigToRuntime(stamped);

  // 2. Save to localStorage
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(LOCAL_CMS_STORAGE_KEY, JSON.stringify(stamped));
    } catch {
      // ignore quota error
    }
  }

  let serverSaved = false;
  let supabaseSaved = false;

  // 3. Save to Backend Server
  try {
    const token = getSavedAdminToken();
    const res = await fetch('/api/admin/cms', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify({ cmsConfig: stamped }),
    });
    if (res.ok) {
      serverSaved = true;
    }
  } catch {
    // ignore
  }

  // 4. Save to Supabase Storage bucket (`bzal-drawings/cms/site_cms_config.json`)
  try {
    const jsonBlob = new Blob([JSON.stringify(stamped, null, 2)], {
      type: 'application/json',
    });
    const { error } = await supabase.storage
      .from(SUPABASE_CMS_BUCKET)
      .upload(SUPABASE_CMS_FILE_PATH, jsonBlob, {
        upsert: true,
        contentType: 'application/json',
      });
    if (!error) {
      supabaseSaved = true;
    }
  } catch {
    // ignore
  }

  if (serverSaved && supabaseSaved) {
    return {
      ok: true,
      message:
        'Изменения опубликованы! Данные сохранены на сервере и синхронизированы с облаком Supabase.',
    };
  }
  if (serverSaved || supabaseSaved) {
    return {
      ok: true,
      message:
        'Изменения опубликованы и сохранены в базе данных сайта!',
    };
  }
  return {
    ok: true,
    message: 'Изменения применены на сайте и сохранены в памяти браузера.',
  };
}

/**
 * Resets CMS configuration back to factory defaults across all layers
 */
export async function resetCmsToFactoryDefaults(): Promise<CmsSiteConfig> {
  const defaults = getFactoryDefaultCmsConfig();
  if (typeof window !== 'undefined') {
    localStorage.removeItem(LOCAL_CMS_STORAGE_KEY);
  }
  applyCmsConfigToRuntime(defaults);

  try {
    const token = getSavedAdminToken();
    await fetch('/api/admin/cms', {
      method: 'DELETE',
      headers: {
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    });
  } catch {
    // ignore
  }

  try {
    await supabase.storage.from(SUPABASE_CMS_BUCKET).remove([SUPABASE_CMS_FILE_PATH]);
  } catch {
    // ignore
  }

  return defaults;
}

/**
 * Compresses and converts an uploaded image file to a fast, clean JPEG DataURL
 * and also attempts to upload it to the server / Supabase Storage so it gets a permanent URL.
 */
export async function uploadCmsImageFile(
  file: File
): Promise<{ url: string; name: string }> {
  const dataUrl = await compressImageFileToDataUrl(file, 1400, 0.84);
  const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, '_');

  // 1. Try uploading via backend `/api/admin/upload-image`
  try {
    const token = getSavedAdminToken();
    const base64Part = dataUrl.includes(',') ? dataUrl.split(',')[1] : dataUrl;
    const res = await fetch('/api/admin/upload-image', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify({
        fileName: safeName,
        contentType: 'image/jpeg',
        base64Data: base64Part,
      }),
    });
    if (res.ok) {
      const json = await res.json();
      if (json?.publicUrl) {
        return { url: json.publicUrl, name: file.name };
      }
    }
  } catch {
    // ignore
  }

  // 2. Try uploading directly to Supabase Storage (`bzal-drawings/cms-images/...`)
  try {
    const blob = await (await fetch(dataUrl)).blob();
    const storagePath = `cms-images/${Date.now()}_${safeName}`;
    const { error } = await supabase.storage
      .from(SUPABASE_CMS_BUCKET)
      .upload(storagePath, blob, {
        upsert: true,
        contentType: 'image/jpeg',
      });
    if (!error) {
      const { data: pub } = supabase.storage
        .from(SUPABASE_CMS_BUCKET)
        .getPublicUrl(storagePath);
      if (pub?.publicUrl) {
        return { url: pub.publicUrl, name: file.name };
      }
    }
  } catch {
    // ignore
  }

  // 3. Fallback: return compressed DataURL directly (works everywhere immediately)
  return { url: dataUrl, name: file.name };
}

function compressImageFileToDataUrl(
  file: File,
  maxWidth = 1400,
  quality = 0.84
): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const img = new Image();
      img.onload = () => {
        let width = img.width;
        let height = img.height;
        if (width > maxWidth) {
          height = Math.round((height * maxWidth) / width);
          width = maxWidth;
        }
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve(String(reader.result));
          return;
        }
        ctx.drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL('image/jpeg', quality));
      };
      img.onerror = () => resolve(String(reader.result));
      img.src = String(reader.result);
    };
    reader.onerror = (err) => reject(err);
    reader.readAsDataURL(file);
  });
}
