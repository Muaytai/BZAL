import React, { useEffect, useState } from 'react';
import { Eye, RotateCcw, X, Type, Contrast, Image, Link2 } from 'lucide-react';
import { Language } from '../types';

export interface A11ySettings {
  enabled: boolean;
  fontSize: 'normal' | 'md' | 'lg';
  theme: 'normal' | 'bw' | 'wb' | 'blue';
  images: 'all' | 'grayscale' | 'hidden';
  highlightLinks: boolean;
}

const STORAGE_KEY = 'bzal_a11y_settings_v1';

const DEFAULT_SETTINGS: A11ySettings = {
  enabled: false,
  fontSize: 'normal',
  theme: 'normal',
  images: 'all',
  highlightLinks: false,
};

export function loadA11ySettings(): A11ySettings {
  if (typeof window === 'undefined') return DEFAULT_SETTINGS;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_SETTINGS;
    return { ...DEFAULT_SETTINGS, ...JSON.parse(raw) };
  } catch {
    return DEFAULT_SETTINGS;
  }
}

export function applyA11ySettingsToDom(s: A11ySettings): void {
  if (typeof document === 'undefined') return;
  const html = document.documentElement;
  html.classList.remove(
    'a11y-font-md',
    'a11y-font-lg',
    'a11y-theme-bw',
    'a11y-theme-wb',
    'a11y-theme-blue',
    'a11y-img-grayscale',
    'a11y-img-hidden',
    'a11y-links-highlight'
  );

  if (!s.enabled) return;

  if (s.fontSize === 'md') html.classList.add('a11y-font-md');
  if (s.fontSize === 'lg') html.classList.add('a11y-font-lg');

  if (s.theme === 'bw') html.classList.add('a11y-theme-bw');
  if (s.theme === 'wb') html.classList.add('a11y-theme-wb');
  if (s.theme === 'blue') html.classList.add('a11y-theme-blue');

  if (s.images === 'grayscale') html.classList.add('a11y-img-grayscale');
  if (s.images === 'hidden') html.classList.add('a11y-img-hidden');

  if (s.highlightLinks) html.classList.add('a11y-links-highlight');
}

interface AccessibilityToolbarProps {
  currentLang: Language;
  isOpen: boolean;
  onClose: () => void;
}

export const AccessibilityToolbar: React.FC<AccessibilityToolbarProps> = ({
  currentLang,
  isOpen,
  onClose,
}) => {
  const [settings, setSettings] = useState<A11ySettings>(() => loadA11ySettings());

  useEffect(() => {
    applyA11ySettingsToDom(settings);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    } catch {
      // ignore storage errors
    }
  }, [settings]);

  // Ensure settings are applied when panel opens
  useEffect(() => {
    if (isOpen && !settings.enabled) {
      setSettings((prev) => ({
        ...prev,
        enabled: true,
        fontSize: prev.fontSize === 'normal' ? 'md' : prev.fontSize,
        highlightLinks: true,
      }));
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const update = (patch: Partial<A11ySettings>) => {
    setSettings((prev) => ({ ...prev, enabled: true, ...patch }));
  };

  const resetAll = () => {
    setSettings(DEFAULT_SETTINGS);
    applyA11ySettingsToDom(DEFAULT_SETTINGS);
    onClose();
  };

  return (
    <div
      role="region"
      aria-label={
        currentLang === 'ru'
          ? 'Панель настроек версии для слабовидящих (СТБ 2105)'
          : 'Accessibility settings panel'
      }
      className="fixed top-0 left-0 right-0 z-[70] bg-[#1B222C] text-white border-b-2 border-[#E71B26] shadow-2xl px-4 py-3 animate-in slide-in-from-top duration-200"
    >
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4 text-xs">
        {/* Title */}
        <div className="flex items-center gap-2 font-extrabold uppercase tracking-wider text-white">
          <Eye className="w-4 h-4 text-[#E71B26] shrink-0" />
          <span>
            {currentLang === 'ru'
              ? 'Версия для слабовидящих (СТБ 2105)'
              : currentLang === 'en'
                ? 'Visually Impaired Mode (STB 2105)'
                : '无障碍高对比度模式'}
          </span>
        </div>

        {/* Controls */}
        <div className="flex flex-wrap items-center gap-4">
          {/* Font Size */}
          <div className="flex items-center gap-1.5">
            <Type className="w-3.5 h-3.5 text-[#BAC5CF]" />
            <span className="text-[#BAC5CF] font-semibold">
              {currentLang === 'ru' ? 'Шрифт:' : currentLang === 'en' ? 'Font:' : '字号：'}
            </span>
            {(
              [
                { id: 'normal', label: '100%' },
                { id: 'md', label: '115% (А+)' },
                { id: 'lg', label: '125% (А++)' },
              ] as const
            ).map((f) => (
              <button
                key={f.id}
                type="button"
                onClick={() => update({ fontSize: f.id })}
                className={`px-2.5 py-1 rounded font-extrabold cursor-pointer transition-colors ${
                  settings.fontSize === f.id
                    ? 'bg-[#E71B26] text-white'
                    : 'bg-[#2B3340] text-[#BAC5CF] hover:text-white'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          {/* Contrast Theme */}
          <div className="flex items-center gap-1.5">
            <Contrast className="w-3.5 h-3.5 text-[#BAC5CF]" />
            <span className="text-[#BAC5CF] font-semibold">
              {currentLang === 'ru' ? 'Контраст:' : currentLang === 'en' ? 'Theme:' : '对比度：'}
            </span>
            {(
              [
                {
                  id: 'normal',
                  label: currentLang === 'ru' ? 'Цветная' : currentLang === 'en' ? 'Standard' : '标准',
                },
                {
                  id: 'bw',
                  label: currentLang === 'ru' ? 'Ч/Б' : 'B/W',
                },
                {
                  id: 'wb',
                  label: currentLang === 'ru' ? 'Инверсия' : 'Invert',
                },
                {
                  id: 'blue',
                  label: currentLang === 'ru' ? 'Синяя' : 'Blue',
                },
              ] as const
            ).map((tItem) => (
              <button
                key={tItem.id}
                type="button"
                onClick={() => update({ theme: tItem.id })}
                className={`px-2.5 py-1 rounded font-extrabold cursor-pointer transition-colors ${
                  settings.theme === tItem.id
                    ? 'bg-[#E71B26] text-white'
                    : 'bg-[#2B3340] text-[#BAC5CF] hover:text-white'
                }`}
              >
                {tItem.label}
              </button>
            ))}
          </div>

          {/* Images */}
          <div className="flex items-center gap-1.5">
            <Image className="w-3.5 h-3.5 text-[#BAC5CF]" />
            <span className="text-[#BAC5CF] font-semibold">
              {currentLang === 'ru' ? 'Фото:' : currentLang === 'en' ? 'Images:' : '图片：'}
            </span>
            {(
              [
                {
                  id: 'all',
                  label: currentLang === 'ru' ? 'Вкл' : 'On',
                },
                {
                  id: 'grayscale',
                  label: currentLang === 'ru' ? 'Монохром' : 'Mono',
                },
                {
                  id: 'hidden',
                  label: currentLang === 'ru' ? 'Скрыть' : 'Hide',
                },
              ] as const
            ).map((img) => (
              <button
                key={img.id}
                type="button"
                onClick={() => update({ images: img.id })}
                className={`px-2 py-1 rounded font-extrabold cursor-pointer transition-colors ${
                  settings.images === img.id
                    ? 'bg-[#E71B26] text-white'
                    : 'bg-[#2B3340] text-[#BAC5CF] hover:text-white'
                }`}
              >
                {img.label}
              </button>
            ))}
          </div>

          {/* Highlight Hyperlinks */}
          <button
            type="button"
            onClick={() => update({ highlightLinks: !settings.highlightLinks })}
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded font-extrabold cursor-pointer transition-colors ${
              settings.highlightLinks
                ? 'bg-amber-500 text-black'
                : 'bg-[#2B3340] text-[#BAC5CF] hover:text-white'
            }`}
          >
            <Link2 className="w-3.5 h-3.5" />
            <span>
              {currentLang === 'ru'
                ? 'Подчеркнуть ссылки'
                : currentLang === 'en'
                  ? 'Underline Links'
                  : '高亮链接'}
            </span>
          </button>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={resetAll}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#2B3340] hover:bg-[#444E60] text-white font-bold cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5 text-[#E71B26]" />
            <span>
              {currentLang === 'ru'
                ? 'Обычная версия сайта'
                : currentLang === 'en'
                  ? 'Standard View'
                  : '恢复正常视图'}
            </span>
          </button>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg bg-[#2B3340] hover:bg-[#E71B26] text-white cursor-pointer"
            title={currentLang === 'ru' ? 'Скрыть панель' : 'Close panel'}
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
