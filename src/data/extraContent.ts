import { ManufacturedPart, MetrologyDevice, EaeuAdvantage, MachinerySpec, Language } from '../types';

export interface ExtraContentLanguage {
  partsCatalog: {
    eyebrow: string;
    title: string;
    subtitle: string;
    allFilter: string;
    categories: { id: string; label: string }[];
    specLabels: {
      material: string;
      tolerance: string;
      roughness: string;
      dimensions: string;
      batch: string;
      leadTime: string;
    };
    btnRequestQuote: string;
    btnDownloadCatalog: string;
    analogModalPrompt: string;
    catalogDownloadNote: string;
  };
  qualityMetrology: {
    eyebrow: string;
    title: string;
    subtitle: string;
    certBadge: string;
    certTitle: string;
    certDesc: string;
    stampLabel: string;
    stampText: string;
    docsTitle: string;
    docsSubtitle: string;
    docsList: string[];
    labTitle: string;
    devices: MetrologyDevice[];
  };
  eaeuTrade: {
    eyebrow: string;
    title: string;
    subtitle: string;
    railwayTitle: string;
    railwayBadge: string;
    railwayDesc: string;
    highwayTitle: string;
    highwayDesc: string;
    advantages: EaeuAdvantage[];
    logisticsRoutesTitle: string;
    routes: { city: string; time: string; distance: string; hubs: string }[];
    ctaTitle: string;
    ctaDesc: string;
    ctaBtn: string;
  };
  machinerySpecs: {
    title: string;
    subtitle: string;
    colModel: string;
    colCategory: string;
    colCnc: string;
    colTravels: string;
    colTable: string;
    colSpindle: string;
    colWeight: string;
    colAccuracy: string;
    items: MachinerySpec[];
  };
  passportModal: {
    title: string;
    subtitle: string;
    stats: { label: string; value: string }[];
    formTitle: string;
    formSubtitle: string;
    nameLabel: string;
    namePlaceholder: string;
    emailLabel: string;
    emailPlaceholder: string;
    companyLabel: string;
    companyPlaceholder: string;
    btnDownload: string;
    downloadSuccessTitle: string;
    downloadSuccessDesc: string;
    btnDirectDownload: string;
    btnClose: string;
    securityNote: string;
  };
  engineerWidget: {
    label: string;
    dutyEngineer: string;
    dutyStatus: string;
    callNow: string;
    sendBrief: string;
    downloadPassport: string;
    backToTop: string;
    quickHelp: string;
  };
}

export const extraContent: Record<Language, ExtraContentLanguage> = {
  ru: {
    partsCatalog: {
      eyebrow: 'ОСВОЕННАЯ НОМЕНКЛАТУРА ДЕТАЛЕЙ',
      title: 'КАТАЛОГ СЕРИЙНЫХ И СПЕЦИАЛИЗИРОВАННЫХ ИЗДЕЛИЙ',
      subtitle: 'Образцы деталей, технологической оснастки и узлов, выпускаемых на производственных мощностях ОАО «БЗАЛ» по чертежам заказчиков с гарантией точности до 0,005 мм.',
      allFilter: 'Все категории',
      categories: [
        { id: 'housings', label: 'Корпусные детали и станины' },
        { id: 'shafts', label: 'Валы, шпиндели и оси' },
        { id: 'railway', label: 'Узлы ж/д транспорта' },
        { id: 'gears', label: 'Зубчатые передачи и венцы' },
        { id: 'tooling', label: 'Штампы, пресс-формы и оснастка' },
        { id: 'units', label: 'Унифицированные станочные узлы' }
      ],
      specLabels: {
        material: 'Материал:',
        tolerance: 'Квалитет точности:',
        roughness: 'Шероховатость:',
        dimensions: 'Габариты:',
        batch: 'Объем партии:',
        leadTime: 'Срок выпуска:'
      },
      btnRequestQuote: 'Заказать расчёт аналога',
      btnDownloadCatalog: 'Скачать каталог номенклатуры (PDF)',
      analogModalPrompt: 'Расчет изготовления аналога детали:',
      catalogDownloadNote: 'Полный инженерный каталог включает 350+ освоенных типоразмеров деталей и узлов станкостроения.'
    },
    qualityMetrology: {
      eyebrow: 'СЛУЖБА КАЧЕСТВА И МЕТРОЛОГИИ',
      title: 'ЛАБОРАТОРИЯ ОТК И НЕРАЗРУШАЮЩЕГО КОНТРОЛЯ',
      subtitle: 'Многоступенчатый контроль на каждом этапе: от спектрального анализа входящего металлопроката до лазерного 3D-сканирования готовых изделий на координатно-измерительных машинах.',
      certBadge: 'СТБ ISO 9001-2015',
      certTitle: 'СЕРТИФИЦИРОВАННАЯ СИСТЕМА МЕНЕДЖМЕНТА КАЧЕСТВА',
      certDesc: 'Действующий сертификат соответствия национальным и международным стандартам станкостроения. Право ведения военной, железнодорожной и энергетической приёмки.',
      stampLabel: 'ЗАВОДСКОЙ ШТАМП ОТК',
      stampText: '100% деталей проходят сплошной выходной контроль с выдачей индивидуального паспорта качества и протокола замеров.',
      docsTitle: 'КОМПЛЕКТ СОПРОВОДИТЕЛЬНОЙ ДОКУМЕНТАЦИИ К КАЖДОЙ ПАРТИИ:',
      docsSubtitle: 'Поставляем продукцию с исчерпывающим пакетом юридически значимых технических документов:',
      docsList: [
        'Паспорт изделия с уникальным заводским серийным номером ОАО «БЗАЛ»',
        'Сертификаты качества завода-изготовителя на металлопрокат и поковки',
        'Протокол координатно-измерительной машины (CMM 3D Report) с картой отклонений',
        'Акт неразрушающего контроля (ультразвуковая и магнитопорошковая дефектоскопия)',
        'Протокол термообработки и карта замеров твердости (HRC / HB / HV)',
        'Декларация о соответствии требованиям технических регламентов ТР ТС (ЕАЭС)'
      ],
      labTitle: 'ПРИБОРНЫЙ ПАРК И ИЗМЕРИТЕЛЬНЫЕ КОМПЛЕКСЫ:',
      devices: [
        {
          id: 'cmm',
          title: '3D Координатно-измерительная машина (КИМ)',
          model: 'Координатно-измерительный портальный комплекс',
          precision: '±0,0018 мм',
          purpose: 'Прецизионное сканирование пространственной геометрии корпусных деталей',
          scope: 'Измерительный объем: 2000 × 1200 × 1000 мм, масса детали до 3000 кг',
          standard: 'ISO 10360, ГОСТ 8.549'
        },
        {
          id: 'spectro',
          title: 'Оптико-эмиссионный спектрометр',
          model: 'Анализатор сплавов сталей и чугунов',
          precision: '0,0001% по легирующим',
          purpose: 'Входной контроль химического состава поковок, отливок и проката',
          scope: 'Определение C, Si, Mn, Cr, Ni, Mo, Ti, V, W, Cu, Al, P, S',
          standard: 'ГОСТ 18895, ASTM E415'
        },
        {
          id: 'ultrasound',
          title: 'Ультразвуковой и магнитопорошковый дефектоскоп',
          model: 'УЗК-комплекс неразрушающего контроля',
          precision: 'Фиксация микронесплошностей от 0,1 мм',
          purpose: 'Выявление внутренних раковин, флокенов, микротрещин в поковках и сварных швах',
          scope: 'Глубина прозвучивания поковок до 1500 мм, 100% неразрушающий метод',
          standard: 'ГОСТ 14782, ГОСТ 21105'
        },
        {
          id: 'hardness',
          title: 'Стационарные твердомеры Роквелла, Бринелля и Виккерса',
          model: 'Универсальный комплекс проверки твердости',
          precision: '±0,5 HRC / ±2% HB',
          purpose: 'Контроль глубины и равномерности закалки после термообработки и ТВЧ',
          scope: 'Диапазон: 20–70 HRC, 100–650 HB, микротвердость слоев азотирования HV',
          standard: 'ГОСТ 9013, ГОСТ 9012'
        },
        {
          id: 'profilometer',
          title: 'Контактные профилометры шероховатости поверхности',
          model: 'Высокоточный профилограф-профилометр',
          precision: 'Дискретность 0,001 мкм',
          purpose: 'Аттестация шероховатости шлифованных и притертых поверхностей Ra, Rz',
          scope: 'Диапазон измерений Ra от 0,02 до 40 мкм на валах, зубьях и направляющих',
          standard: 'ГОСТ 2789, ISO 4287'
        },
        {
          id: 'balance',
          title: 'Динамический балансировочный стенд',
          model: 'Балансировочный станок для длинномерных тел вращения',
          precision: 'Класс точности балансировки G 1.0',
          purpose: 'Устранение динамического дисбаланса высокооборотных шпинделей и валов',
          scope: 'Длина балансируемых валов до 3000 мм, масса до 1500 кг, до 6000 об/мин',
          standard: 'ГОСТ ИСО 1940-1'
        }
      ]
    },
    eaeuTrade: {
      eyebrow: 'СТРАТЕГИЧЕСКИЕ ПРЕИМУЩЕСТВА',
      title: 'УСЛОВИЯ ДЛЯ ЗАКАЗЧИКОВ ИЗ РОССИЙСКОЙ ФЕДЕРАЦИИ И ЕАЭС',
      subtitle: 'Прямые контракты в российских рублях (RUB), нулевая ставка НДС, собственный железнодорожный тупик на территории завода и отлаженная логистика по трассе М1.',
      railwayTitle: 'СОБСТВЕННЫЙ Ж/Д ПУТЬ ПРЯМО В ЦЕХ СБОРКИ',
      railwayBadge: 'Ж/Д ВЕТКА ОАО «БЗАЛ»',
      railwayDesc: 'Подача железнодорожных платформ и полувагонов непосредственно под мостовые краны грузоподъемностью 20 тонн. Отгрузка крупногабаритных автоматических линий, станин и партий колесных пар до 60 тонн за один рейс без перегрузки.',
      highwayTitle: '3 КМ ДО МЕЖДУНАРОДНОЙ ТРАССЫ М1',
      highwayDesc: 'Завод расположен на прямой магистрали «Брест — Минск — Москва». Ежедневные отправки сборных и генеральных грузов ведущими транспортными компаниями (Деловые Линии, ПЭК, КИТ, Байкал-Сервис).',
      advantages: [
        {
          id: 'vat',
          title: '0% НДС и беспошлинный режим',
          badge: 'ЕАЭС',
          desc: 'В рамках Таможенного союза отгрузка осуществляется по нулевой ставке НДС. Отсутствуют таможенные пошлины и сборы, пакет документов готовится бухгалтерией завода за 1 день.',
          stat: '0%',
          statLabel: 'Таможенных пошлин и сборов'
        },
        {
          id: 'rub',
          title: 'Прямые расчеты в рублях РФ',
          badge: 'БЕЗ ВАЛЮТНОГО РИСКА',
          desc: 'Контракты заключаются с фиксацией цены в российских рублях (RUB). Платежи через корреспондентские счета в банках РФ без санкционных задержек и комиссий за конвертацию.',
          stat: 'RUB',
          statLabel: 'Прямой рублевый расчет'
        },
        {
          id: 'docs',
          title: 'Сертификаты происхождения СТ-1',
          badge: 'ГОСТ / ТР ТС',
          desc: 'Выдаем сертификаты формы СТ-1, подтверждающие производство в Союзном государстве. Беспрепятственное участие в госзакупках РФ по 44-ФЗ и 223-ФЗ.',
          stat: 'СТ-1',
          statLabel: 'Для госзакупок и тендеров РФ'
        },
        {
          id: 'turnaround',
          title: 'Экспресс-логистика до ЦФО и Поволжья',
          badge: '1–3 ДНЯ',
          desc: 'Благодаря расположению в г. Барановичи на пересечении ключевых транспортных артерий доставка автотранспортом до Москвы и Смоленска занимает от 24 до 36 часов.',
          stat: '24 ч',
          statLabel: 'Срок доставки до Москвы'
        }
      ],
      logisticsRoutesTitle: 'ОРИЕНТИРОВОЧНЫЕ СРОКИ ДОСТАВКИ АВТОТРАНСПОРТОМ:',
      routes: [
        { city: 'Москва / Московская область', time: '1–2 дня', distance: '850 км', hubs: 'Прямой автопоезд по М1' },
        { city: 'Санкт-Петербург / ЛО', time: '2 дня', distance: '890 км', hubs: 'Через Псков / Витебск' },
        { city: 'Нижний Новгород / Владимир', time: '2–3 дня', distance: '1 250 км', hubs: 'Через ЦКАД / М7' },
        { city: 'Казань / Набережные Челны', time: '3–4 дня', distance: '1 680 км', hubs: 'Для автозаводов КамАЗ, Соллерс' },
        { city: 'Самара / Тольятти', time: '3–4 дня', distance: '1 790 км', hubs: 'Для машиностроения и автопрома' },
        { city: 'Екатеринбург / Челябинск', time: '4–5 дней', distance: '2 650 км', hubs: 'Ж/Д платформы или прямые еврофуры' }
      ],
      ctaTitle: 'ГОТОВИТЕ ЗАКАЗ ДЛЯ ПРЕДПРИЯТИЯ ИЗ РОССИИ ИЛИ ЕАЭС?',
      ctaDesc: 'Наш департамент ВЭД и сбыта подготовит коммерческое предложение с расчётом логистики «до ворот вашего цеха» и полным пакетом документов СТ-1.',
      ctaBtn: 'Запросить расчет с доставкой в РФ ↗'
    },
    machinerySpecs: {
      title: 'СВОДНЫЙ ТЕХНИЧЕСКИЙ ПАСПОРТ СТАНОЧНОГО ПАРКА',
      subtitle: 'Основные технологические характеристики обрабатывающего оборудования Технопарка ОАО «БЗАЛ»',
      colModel: 'Модель станка',
      colCategory: 'Тип оборудования',
      colCnc: 'Система ЧПУ',
      colTravels: 'Перемещения X / Y / Z (мм)',
      colTable: 'Стол / Планшайба (мм)',
      colSpindle: 'Шпиндель / Обороты',
      colWeight: 'Макс. масса (кг)',
      colAccuracy: 'Точность',
      items: [
        {
          category: '5-осевой ОЦ',
          model: 'DMG MORI DMU 80 P duoBLOCK',
          cncSystem: 'Heidenhain TNC 640',
          travels: '800 × 800 × 800',
          tableSize: 'Ø900 × 700',
          spindleRpm: '12 000 об/мин',
          maxWeight: '1 800',
          accuracy: '±0,004 мм'
        },
        {
          category: 'Горизонтально-расточной',
          model: 'TOS Varnsdorf WHN 13.8 CNC',
          cncSystem: 'Siemens Sinumerik 840D',
          travels: '3 500 × 2 000 × 1 250',
          tableSize: '1 800 × 2 200',
          spindleRpm: '3 000 об/мин',
          maxWeight: '12 000',
          accuracy: '±0,008 мм'
        },
        {
          category: 'Токарно-карусельный',
          model: '1Л532 ЧПУ Heavy Duty',
          cncSystem: 'Siemens Sinumerik 828D',
          travels: 'Диаметр планшайбы: 2800',
          tableSize: 'Макс. Ø3 150 × 1 600',
          spindleRpm: '1–100 об/мин',
          maxWeight: '16 000',
          accuracy: '±0,010 мм'
        },
        {
          category: 'Портальный фрезерный',
          model: 'УФ-5220 Тяжелый портал',
          cncSystem: 'Fanuc 31i-MB',
          travels: '6 000 × 2 500 × 1 500',
          tableSize: '6 000 × 2 000',
          spindleRpm: '4 500 об/мин',
          maxWeight: '25 000',
          accuracy: '±0,012 мм'
        },
        {
          category: 'Токарно-револьверный ЧПУ',
          model: 'HAAS ST-35Y с осью Y',
          cncSystem: 'Haas NextGen',
          travels: 'Ø533 × 826 (ось Y ±51)',
          tableSize: 'Патрон Ø305',
          spindleRpm: '3 200 об/мин',
          maxWeight: '600',
          accuracy: '±0,005 мм'
        },
        {
          category: 'Круглошлифовальный',
          model: 'Studer S41 CNC',
          cncSystem: 'Fanuc 310i-B',
          travels: 'РМЦ: 1 600 (высота центров 275)',
          tableSize: 'Макс. Ø549 × 1 600',
          spindleRpm: 'Круг до 50 м/с',
          maxWeight: '250',
          accuracy: '±0,0015 мм'
        }
      ]
    },
    passportModal: {
      title: 'ТЕХНИЧЕСКИЙ ПАСПОРТ ТЕХНОПАРКА ОАО «БЗАЛ»',
      subtitle: 'Официальный инженерный документ с перечнем всех станков, допусков, габаритов обработки и сертификатов для технических директоров и главных инженеров.',
      stats: [
        { label: 'Производственная площадь', value: '30 000+ м²' },
        { label: 'Парк станочного оборудования', value: '180+ единиц' },
        { label: 'Грузоподъемность кранов', value: 'До 20 тонн' },
        { label: 'Собственный ж/д тупик', value: 'В сборочный цех' }
      ],
      formTitle: 'ПОЛУЧИТЬ ПАСПОРТ ОБОРУДОВАНИЯ (PDF):',
      formSubtitle: 'Укажите контактные данные — электронная версия будет отправлена на почту, а также доступна для мгновенной загрузки.',
      nameLabel: 'ФИО / Должность *',
      namePlaceholder: 'Иванов Алексей Петрович, Главный технолог',
      emailLabel: 'Корпоративный Email *',
      emailPlaceholder: 'chief.engineer@enterprise.ru',
      companyLabel: 'Предприятие / Завод *',
      companyPlaceholder: 'ПАО «Машиностроительный завод»',
      btnDownload: 'Скачать технический паспорт PDF',
      downloadSuccessTitle: 'Паспорт сформирован для загрузки',
      downloadSuccessDesc: 'Благодарим за интерес к мощностям ОАО «БЗАЛ». Документ готов к скачиванию. Копия паспорта с контактными данными ответственных специалистов ОГК/ОГТ направлена на ваш email.',
      btnDirectDownload: 'Открыть PDF-документ прямо сейчас',
      btnClose: 'Закрыть',
      securityNote: 'Конфиденциальность гарантируется. Ваши контакты не передаются третьим лицам.'
    },
    engineerWidget: {
      label: 'Инженерная консультация',
      dutyEngineer: 'ДЕЖУРНЫЙ ИНЖЕНЕР ОГТ / ОГК',
      dutyStatus: 'На связи на производстве',
      callNow: 'Позвонить дежурному инженеру',
      sendBrief: 'Задать технический вопрос / Отправить ТЗ',
      downloadPassport: 'Скачать паспорт оборудования (PDF)',
      backToTop: 'Наверх',
      quickHelp: 'Техническая консультация по чертежам'
    }
  },

  en: {
    partsCatalog: {
      eyebrow: 'PROVEN MANUFACTURING PORTFOLIO',
      title: 'CATALOG OF SERIAL & CUSTOM PRECISION COMPONENTS',
      subtitle: 'Showcase of machine components, custom tooling, and structural sub-assemblies manufactured at JSC "BZAL" manufacturing floors strictly to customer CAD drawings with tolerances down to 0.005 mm.',
      allFilter: 'All Categories',
      categories: [
        { id: 'housings', label: 'Housings & Machine Beds' },
        { id: 'shafts', label: 'Shafts, Spindles & Axles' },
        { id: 'railway', label: 'Railway & Rolling Stock' },
        { id: 'gears', label: 'Gears & Ring Drives' },
        { id: 'tooling', label: 'Tooling, Dies & Molds' },
        { id: 'units', label: 'Modular Machine Tool Heads' }
      ],
      specLabels: {
        material: 'Material Alloy:',
        tolerance: 'Tolerance Class:',
        roughness: 'Surface Roughness:',
        dimensions: 'Envelope Size:',
        batch: 'Batch Volume:',
        leadTime: 'Lead Time:'
      },
      btnRequestQuote: 'Request Quote for Similar Part',
      btnDownloadCatalog: 'Download Parts Catalog (PDF)',
      analogModalPrompt: 'RFQ for manufacturing analogous part:',
      catalogDownloadNote: 'Comprehensive engineering portfolio includes 350+ mastered standard sizes for machine tool and heavy equipment engineering.'
    },
    qualityMetrology: {
      eyebrow: 'QUALITY ASSURANCE & METROLOGY',
      title: 'INDEPENDENT QC & METROLOGICAL TEST LABORATORY',
      subtitle: 'Multi-stage quality gating: from optical spectrometry of incoming raw billets to complete 3D coordinate laser scanning of finished workpieces on CMM portals.',
      certBadge: 'ISO 9001:2015',
      certTitle: 'CERTIFIED QUALITY MANAGEMENT SYSTEM',
      certDesc: 'Valid certification conforming to international machine tool manufacturing standards. Authorized for defense, railway, and power generation quality acceptance.',
      stampLabel: 'FACTORY QC CERTIFIED',
      stampText: '100% of manufactured parts undergo final dimensional verification with individual quality passport and CMM inspection report issued.',
      docsTitle: 'ACCOMPANYING DOCUMENTATION DELIVERED WITH EVERY BATCH:',
      docsSubtitle: 'Every dispatch includes an exhaustive set of legally binding engineering and metallurgical documents:',
      docsList: [
        'Factory Certificate & Quality Passport with unique JSC "BZAL" serial numbers',
        'Material Mill Test Certificates for forgings, castings, and rolled steels',
        '3D Coordinate Measuring Machine (CMM) Inspection Report with GD&T deviation map',
        'Non-Destructive Testing Certificate (Ultrasonic & Magnetic Particle flaw detection)',
        'Heat Treatment Passport & Hardness Profile Report (HRC / HB / HV)',
        'Customs Union Declaration of Conformity (EAEU TR TS compliance)'
      ],
      labTitle: 'METROLOGY INSTRUMENTATION & TEST RIGS:',
      devices: [
        {
          id: 'cmm',
          title: '3D Coordinate Measuring Machine (CMM)',
          model: 'High-Precision Gantry Measuring Portal',
          precision: '±0.0018 mm',
          purpose: 'High-accuracy dimensional and GD&T verification of complex housings',
          scope: 'Measuring envelope: 2000 × 1200 × 1000 mm, max part load 3000 kg',
          standard: 'ISO 10360, GOST 8.549'
        },
        {
          id: 'spectro',
          title: 'Optical Emission Spectrometer',
          model: 'Alloy & Chemical Composition Analyzer',
          precision: '0.0001% for alloying elements',
          purpose: 'Incoming chemical composition verification of castings and forgings',
          scope: 'Analysis of C, Si, Mn, Cr, Ni, Mo, Ti, V, W, Cu, Al, P, S',
          standard: 'ASTM E415, GOST 18895'
        },
        {
          id: 'ultrasound',
          title: 'Ultrasonic & Magnetic Flaw Detector',
          model: 'Non-Destructive Testing (NDT) Station',
          precision: 'Detects internal flaws down to 0.1 mm',
          purpose: 'Reveals internal voids, inclusions, and micro-cracks in heavy forgings and welds',
          scope: 'Ultrasonic sound penetration depth up to 1500 mm',
          standard: 'ISO 9712, GOST 14782'
        },
        {
          id: 'hardness',
          title: 'Benchtop Rockwell, Brinell & Vickers Hardness Testers',
          model: 'Universal Hardness Measurement System',
          precision: '±0.5 HRC / ±2% HB',
          purpose: 'Verification of core and surface hardness after thermal treatment & induction hardening',
          scope: 'Range: 20–70 HRC, 100–650 HB, nitrided layer micro-hardness HV',
          standard: 'ASTM E18, ISO 6508'
        },
        {
          id: 'profilometer',
          title: 'Contact Surface Roughness Profilometer',
          model: 'High-Resolution Surface Profiler',
          precision: 'Resolution: 0.001 μm',
          purpose: 'Certified measurement of ground and lapped finishes Ra, Rz',
          scope: 'Measuring range Ra 0.02 to 40 μm on spindles, gears, and guideways',
          standard: 'ISO 4287, DIN 4768'
        },
        {
          id: 'balance',
          title: 'Dynamic Balancing Station',
          model: 'Rotary Shaft Balancing Rig',
          precision: 'Balancing quality grade G 1.0',
          purpose: 'Elimination of dynamic vibration on high-speed spindles, rotors, and shafts',
          scope: 'Shaft length up to 3000 mm, weight up to 1500 kg, up to 6000 RPM',
          standard: 'ISO 1940-1'
        }
      ]
    },
    eaeuTrade: {
      eyebrow: 'STRATEGIC SUPPLY ADVANTAGES',
      title: 'CONDITIONS FOR CLIENTS IN RUSSIAN FEDERATION & EAEU',
      subtitle: 'Direct contracts denominated in Russian Rubles (RUB), 0% export VAT, internal factory railway spur, and high-speed freight logistics along the M1 highway.',
      railwayTitle: 'DIRECT FACTORY RAIL SIDING INTO ASSEMBLY HALL',
      railwayBadge: 'JSC BZAL RAIL SPUR',
      railwayDesc: 'Dedicated railway track runs directly underneath 20-ton overhead cranes. Seamless dispatch of oversize automated transfer lines, machine beds, and heavy railway wheelsets up to 60 metric tons per railcar without transshipment.',
      highwayTitle: '3 KM FROM M1 INTERNATIONAL TRANSIT CORRIDOR',
      highwayDesc: 'The plant is located right on the Brest — Minsk — Moscow arterial highway. Daily departures of FTL (full truckload) and LTL consolidated freights to all Russian industrial regions.',
      advantages: [
        {
          id: 'vat',
          title: '0% VAT & Customs-Free Zone',
          badge: 'EAEU',
          desc: 'Deliveries within the Customs Union carry a 0% VAT rate. No customs import duties or tariffs, streamlined documentation finalized by plant accountants in 24 hours.',
          stat: '0%',
          statLabel: 'Import Tariffs & Duties'
        },
        {
          id: 'rub',
          title: 'Direct Settlements in Russian Rubles',
          badge: 'ZERO FX RISK',
          desc: 'Contracts are fixed directly in Russian Rubles (RUB). Payments execute smoothly via correspondent bank accounts without SWIFT restrictions or exchange fees.',
          stat: 'RUB',
          statLabel: 'Direct Ruble Invoicing'
        },
        {
          id: 'docs',
          title: 'CT-1 Certificates of Origin',
          badge: 'UNION STATE',
          desc: 'We supply certified CT-1 certificates proving manufacturing origin in the Union State of Belarus and Russia, enabling seamless participation in state procurements.',
          stat: 'CT-1',
          statLabel: 'For Federal & State Tenders'
        },
        {
          id: 'turnaround',
          title: 'Rapid Truck Delivery to Central Russia',
          badge: '1–3 DAYS',
          desc: 'Direct road freight from Baranovichi to Moscow and Smolensk takes only 24 to 36 hours from dispatch to arrival at your factory gates.',
          stat: '24h',
          statLabel: 'Road Transit Time to Moscow'
        }
      ],
      logisticsRoutesTitle: 'ESTIMATED ROAD TRANSIT TIMES TO INDUSTRIAL HUBS:',
      routes: [
        { city: 'Moscow & Moscow Region', time: '1–2 days', distance: '850 km', hubs: 'Direct FTL via M1 highway' },
        { city: 'St. Petersburg & Leningrad Reg.', time: '2 days', distance: '890 km', hubs: 'Via Vitebsk / Pskov' },
        { city: 'Nizhny Novgorod / Vladimir', time: '2–3 days', distance: '1,250 km', hubs: 'Via Central Ring / M7' },
        { city: 'Kazan / Naberezhnye Chelny', time: '3–4 days', distance: '1,680 km', hubs: 'For automotive & heavy industry' },
        { city: 'Samara / Togliatti', time: '3–4 days', distance: '1,790 km', hubs: 'Automotive & mechanical engineering' },
        { city: 'Ekaterinburg / Chelyabinsk', time: '4–5 days', distance: '2,650 km', hubs: 'Rail flatcars or direct express FTL' }
      ],
      ctaTitle: 'PLANNING AN ORDER FOR A RUSSIAN OR EAEU FACILITY?',
      ctaDesc: 'Our foreign trade and engineering department will prepare a turnkey quotation including freight to your doorstep and complete CT-1 documentation.',
      ctaBtn: 'Request Quote with Delivery to RF ↗'
    },
    machinerySpecs: {
      title: 'MACHINE PARK TECHNICAL SPECIFICATIONS',
      subtitle: 'Key technical parameters and capacities of CNC machine tools at JSC "BZAL" Technopark',
      colModel: 'Machine Model',
      colCategory: 'Type',
      colCnc: 'CNC Controller',
      colTravels: 'Travels X / Y / Z (mm)',
      colTable: 'Table Size (mm)',
      colSpindle: 'Spindle / RPM',
      colWeight: 'Max Load (kg)',
      colAccuracy: 'Accuracy',
      items: [
        {
          category: '5-Axis Machining Center',
          model: 'DMG MORI DMU 80 P duoBLOCK',
          cncSystem: 'Heidenhain TNC 640',
          travels: '800 × 800 × 800',
          tableSize: 'Ø900 × 700',
          spindleRpm: '12,000 RPM',
          maxWeight: '1,800',
          accuracy: '±0.004 mm'
        },
        {
          category: 'Horizontal Boring Mill',
          model: 'TOS Varnsdorf WHN 13.8 CNC',
          cncSystem: 'Siemens Sinumerik 840D',
          travels: '3,500 × 2,000 × 1,250',
          tableSize: '1,800 × 2,200',
          spindleRpm: '3,000 RPM',
          maxWeight: '12,000',
          accuracy: '±0.008 mm'
        },
        {
          category: 'Vertical Turning Lathe',
          model: '1L532 CNC Heavy Duty',
          cncSystem: 'Siemens Sinumerik 828D',
          travels: 'Chuck Faceplate: 2800',
          tableSize: 'Max Ø3,150 × 1,600',
          spindleRpm: '1–100 RPM',
          maxWeight: '16,000',
          accuracy: '±0.010 mm'
        },
        {
          category: 'Gantry Portal Mill',
          model: 'UF-5220 Heavy Portal CNC',
          cncSystem: 'Fanuc 31i-MB',
          travels: '6,000 × 2,500 × 1,500',
          tableSize: '6,000 × 2,000',
          spindleRpm: '4,500 RPM',
          maxWeight: '25,000',
          accuracy: '±0.012 mm'
        },
        {
          category: 'CNC Turning Center with Y',
          model: 'HAAS ST-35Y with Y-Axis',
          cncSystem: 'Haas NextGen',
          travels: 'Ø533 × 826 (Y-axis ±51)',
          tableSize: 'Chuck Ø305',
          spindleRpm: '3,200 RPM',
          maxWeight: '600',
          accuracy: '±0.005 mm'
        },
        {
          category: 'Cylindrical Grinder CNC',
          model: 'Studer S41 CNC',
          cncSystem: 'Fanuc 310i-B',
          travels: 'Distance btw centers: 1,600',
          tableSize: 'Max Ø549 × 1,600',
          spindleRpm: 'Wheel speed 50 m/s',
          maxWeight: '250',
          accuracy: '±0.0015 mm'
        }
      ]
    },
    passportModal: {
      title: 'TECHNOLOGY PASSPORT OF TECHNOPARK JSC "BZAL"',
      subtitle: 'Official engineering dossier detailing all machine tools, envelope travels, dimensional tolerances, and ISO credentials for technical directors and chief engineers.',
      stats: [
        { label: 'Production Floor Area', value: '30,000+ m²' },
        { label: 'Machine Tool Fleet', value: '180+ units' },
        { label: 'Overhead Crane Capacity', value: 'Up to 20 tons' },
        { label: 'Dedicated Rail Spur', value: 'Into assembly bay' }
      ],
      formTitle: 'GET COMPLETE EQUIPMENT PASSPORT (PDF):',
      formSubtitle: 'Enter your work details — the official technical PDF dossier will be generated for instant download and emailed to you.',
      nameLabel: 'Full Name / Position *',
      namePlaceholder: 'Alex Roberts, Chief Manufacturing Officer',
      emailLabel: 'Corporate Email *',
      emailPlaceholder: 'cmo@manufacturing-corp.com',
      companyLabel: 'Company / Organization *',
      companyPlaceholder: 'Heavy Machinery Plant Ltd.',
      btnDownload: 'Download Technical Passport PDF',
      downloadSuccessTitle: 'Technical Passport Ready for Download',
      downloadSuccessDesc: 'Thank you for your interest in JSC "BZAL" capacities. Your file has been generated. A copy with direct engineer contact lines has been sent to your email.',
      btnDirectDownload: 'Open PDF Dossier Now',
      btnClose: 'Close Window',
      securityNote: 'Enterprise privacy guaranteed. Data is strictly confidential.'
    },
    engineerWidget: {
      label: 'Engineering Support',
      dutyEngineer: 'DUTY CHIEF PROCESS ENGINEER',
      dutyStatus: 'Online on shop floor',
      callNow: 'Direct Phone Line',
      sendBrief: 'Submit Technical Drawing / Scope',
      downloadPassport: 'Download Equipment Passport (PDF)',
      backToTop: 'Scroll to Top',
      quickHelp: 'Drawing & DFM consultation'
    }
  },

  zh: {
    partsCatalog: {
      eyebrow: '已成熟量产零部件名录',
      title: '批量与定制精密机械零部件图录',
      subtitle: '展示白俄罗斯BZAL股份公司生产车间按照客户工程图纸加工制造的代表性机械部件、专用工艺工装夹具及关键子系统，加工精度高达0.005毫米。',
      allFilter: '全部类别',
      categories: [
        { id: 'housings', label: '箱体结构件与大型机床床身' },
        { id: 'shafts', label: '精密主轴、丝杠与重载光轴' },
        { id: 'railway', label: '铁路车辆轮对与承载轴箱' },
        { id: 'gears', label: '齿轮齿圈与渐开线传动件' },
        { id: 'tooling', label: '冷热冲压模具与专用夹具' },
        { id: 'units', label: '组合机床通用动力滑台与动力头' }
      ],
      specLabels: {
        material: '材料牌号:',
        tolerance: '公差等级:',
        roughness: '表面粗糙度:',
        dimensions: '加工包络尺寸:',
        batch: '生产批次:',
        leadTime: '生产交付期:'
      },
      btnRequestQuote: '按此规格核算定制报价',
      btnDownloadCatalog: '下载零部件产品图录 (PDF)',
      analogModalPrompt: '定制生产同类零部件询价：',
      catalogDownloadNote: '完整的重工机械制造图录涵盖350多种已量产的专用机床与重装核心标准件。'
    },
    qualityMetrology: {
      eyebrow: '质量保证与计量检测中心',
      title: '独立质检实验室与无损探伤检测中心',
      subtitle: '严苛的全流程质量关卡：从原材料光学光谱分析、毛坯内部超声探伤，直至成品在三坐标测量仪(CMM)上的全数字化三维激光扫描检测。',
      certBadge: 'ISO 9001:2015 认证',
      certTitle: '经国家认证的质量管理体系',
      certDesc: '持有符合国际与欧亚机床制造标准的国家认证证书，具备军工级、铁路车辆及大型能源装备验收资格。',
      stampLabel: '工厂官方质检合格章',
      stampText: '100%出厂零部件均经全尺寸检测，随货配发唯一出厂编号的质量合格证及坐标测量报告。',
      docsTitle: '每批产品均附带全套具有法律效力的技术文件：',
      docsSubtitle: '每批次交付均提供完整的工程质量技术证明卷宗：',
      docsList: [
        '附带唯一出厂编号的白俄罗斯BZAL股份公司原厂产品合格证',
        '金属原材料、锻件及铸件的材质成分质量保证书(Mill Test Certificate)',
        '三坐标测量仪(CMM)全尺寸形位公差检测报告及偏差色谱图',
        '无损探伤合格证明(超声波UT及磁粉探伤MT报告)',
        '热处理及高频淬火工艺记录单与硬度实测报告(HRC / HB / HV)',
        '欧亚经济联盟(EAEU)技术法规合格认证声明文件'
      ],
      labTitle: '先进检测计量仪器装备库：',
      devices: [
        {
          id: 'cmm',
          title: '三坐标测量机 (3D CMM)',
          model: '高精度桥式精密坐标测量机',
          precision: '±0.0018 毫米',
          purpose: '对复杂大型箱体件及壳体进行全三维几何尺寸与形位公差扫描',
          scope: '测量行程：2000 × 1200 × 1000 毫米，最大工件承重 3000 公斤',
          standard: 'ISO 10360, GOST 8.549'
        },
        {
          id: 'spectro',
          title: '直读光学发射光谱仪',
          model: '钢铁及合金金属化学成分全谱分析仪',
          precision: '微量元素检测精度达 0.0001%',
          purpose: '对入厂钢材、铸铁及有色金属原材料进行快速精确成分化验',
          scope: '精确检测碳C、硅Si、锰Mn、铬Cr、镍Ni、钼Mo、钒V、钛Ti等元素',
          standard: 'ASTM E415, GOST 18895'
        },
        {
          id: 'ultrasound',
          title: '超声波与磁粉无损探伤仪',
          model: '工业级无损探伤综合检测站',
          precision: '探测深层内部0.1毫米以上的微小缺陷',
          purpose: '排查大型锻件、铸造毛坯及焊缝深部的气孔、缩松及微观裂纹',
          scope: '超声波探测穿透深度达 1500 毫米，100%全覆盖探伤',
          standard: 'ISO 9712, GOST 14782'
        },
        {
          id: 'hardness',
          title: '台式洛氏、布氏与维氏硬度计',
          model: '多功能金属材料硬度测定系统',
          precision: '±0.5 HRC / ±2% HB',
          purpose: '测定热处理调质、高频淬火及表面渗氮后的基体与表面硬度',
          scope: '测试范围：20–70 HRC, 100–650 HB, 渗碳渗氮微观硬度 HV',
          standard: 'ASTM E18, ISO 6508'
        },
        {
          id: 'profilometer',
          title: '高精度接触式表面粗糙度仪',
          model: '精密表面轮廓粗糙度测量仪',
          precision: '分辨率 0.001 微米',
          purpose: '精准测量精密磨削及精研表面的轮廓微观几何粗糙度 Ra, Rz',
          scope: '测量范围 Ra 0.02 至 40 微米，适用于导轨、轴颈及高精齿面',
          standard: 'ISO 4287, DIN 4768'
        },
        {
          id: 'balance',
          title: '动平衡测试校正机',
          model: '长轴类旋转体动平衡试验机',
          precision: '动平衡精度等级达 G 1.0',
          purpose: '消除高速机床主轴、重载传动轴及电机转子在运转中的剧烈动动振',
          scope: '适用工件长度达 3000 毫米，工件自重达 1500 公斤，最高 6000 RPM',
          standard: 'ISO 1940-1'
        }
      ]
    },
    eaeuTrade: {
      eyebrow: '欧亚经济联盟战略物流优势',
      title: '面向俄罗斯及欧亚联盟客户的直供与结算特惠',
      subtitle: '直接以俄罗斯卢布(RUB)签署结算合同、享受0%免征增值税政策、厂区自备铁路专用线直达车间、紧邻M1跨国公路枢纽。',
      railwayTitle: '厂区自备宽轨铁路专用线直通总装车间',
      railwayBadge: 'BZAL工厂专线',
      railwayDesc: '铁路平板车皮直接开入总装车间内部20吨天车作业区。重达60吨的大型组合机床、重型床身及整批铁路轮对单次发运，免除中转倒运破损风险。',
      highwayTitle: '距M1国际交通运输走廊仅3公里',
      highwayDesc: '厂区地处布列斯特—明斯克—莫斯科国际大动脉上。顺畅通达俄罗斯主要工业中心，每日提供整车(FTL)与拼车(LTL)发运保障。',
      advantages: [
        {
          id: 'vat',
          title: '0% 增值税与免关税待遇',
          badge: '欧亚经济联盟',
          desc: '欧亚关税同盟框架内贸易享受0%增值税率，免缴进口关税。厂内专职外贸会计部门24小时内完备合规报关免税文件。',
          stat: '0%',
          statLabel: '进口关税及附加费'
        },
        {
          id: 'rub',
          title: '以俄罗斯卢布直接结算',
          badge: '零汇率波动风险',
          desc: '商务合同直接锁定俄罗斯卢布(RUB)固定单价。通过中俄白清算银行账户直接汇款，免受SWIFT限制与高昂换汇损耗。',
          stat: 'RUB',
          statLabel: '直接卢布无障碍结算'
        },
        {
          id: 'docs',
          title: 'CT-1原产地证明书',
          badge: '联盟国家制造',
          desc: '出具白俄与俄联邦官方认可的CT-1原产地证明书，合法合规参与俄罗斯44-FZ和223-FZ国家招投标与政府采购。',
          stat: 'CT-1',
          statLabel: '符合政府采购资质'
        },
        {
          id: 'turnaround',
          title: '极速卡车公路直达中央联邦区',
          badge: '1–3 天',
          desc: '依托巴拉诺维奇优越枢纽，公路货运直达莫斯科和斯摩棱斯克仅需24至36小时，门到门准时送达。',
          stat: '24小时',
          statLabel: '公路抵莫斯科时效'
        }
      ],
      logisticsRoutesTitle: '公路货运发往核心重工业城市参考时效：',
      routes: [
        { city: '莫斯科及莫斯科州', time: '1–2 天', distance: '850 公里', hubs: '走M1高速直达卡车' },
        { city: '圣彼得堡及列宁格勒州', time: '2 天', distance: '890 公里', hubs: '经维捷布斯克/普斯科夫' },
        { city: '下诺夫哥罗德 / 弗拉基米尔', time: '2–3 天', distance: '1,250 公里', hubs: '经中央环线 / M7' },
        { city: '喀山 / 卡马河畔切尔内', time: '3–4 天', distance: '1,680 公里', hubs: '为卡玛斯重卡及汽车主机厂保供' },
        { city: '萨马拉 / 陶里亚蒂', time: '3–4 天', distance: '1,790 公里', hubs: '机械工程与汽车制造重镇' },
        { city: '叶卡捷琳堡 / 车里雅宾斯克', time: '4–5 天', distance: '2,650 公里', hubs: '铁路平板车直达或卡车直达' }
      ],
      ctaTitle: '您正在为俄罗斯或欧亚联盟企业筹划机加工采购？',
      ctaDesc: '我们的外贸与总工艺师团队将在24小时内为您测算含“门到门运费”的完整方案并出具全套CT-1文件。',
      ctaBtn: '获取含送达俄罗斯运费的核算方案 ↗'
    },
    machinerySpecs: {
      title: '工厂核心机床装备参数汇总表',
      subtitle: '白俄罗斯BZAL自动化线厂科技园区机加工机床关键工艺技术规格',
      colModel: '机床型号',
      colCategory: '机床类别',
      colCnc: '数控系统',
      colTravels: '行程 X / Y / Z (毫米)',
      colTable: '工作台尺寸 (毫米)',
      colSpindle: '主轴转速 (RPM)',
      colWeight: '最大承重 (公斤)',
      colAccuracy: '加工精度',
      items: [
        {
          category: '五轴立卧联动加工中心',
          model: 'DMG MORI DMU 80 P duoBLOCK',
          cncSystem: 'Heidenhain TNC 640',
          travels: '800 × 800 × 800',
          tableSize: 'Ø900 × 700',
          spindleRpm: '12,000 RPM',
          maxWeight: '1,800',
          accuracy: '±0.004 毫米'
        },
        {
          category: '大型卧式数控镗铣床',
          model: 'TOS Varnsdorf WHN 13.8 CNC',
          cncSystem: 'Siemens Sinumerik 840D',
          travels: '3,500 × 2,000 × 1,250',
          tableSize: '1,800 × 2,200',
          spindleRpm: '3,000 RPM',
          maxWeight: '12,000',
          accuracy: '±0.008 毫米'
        },
        {
          category: '重型数控立式车床',
          model: '1L532 重型数控立车',
          cncSystem: 'Siemens Sinumerik 828D',
          travels: '花盘直径: 2800',
          tableSize: '最大 Ø3,150 × 1,600',
          spindleRpm: '1–100 RPM',
          maxWeight: '16,000',
          accuracy: '±0.010 毫米'
        },
        {
          category: '数控龙门重型镗铣床',
          model: 'UF-5220 重型龙门',
          cncSystem: 'Fanuc 31i-MB',
          travels: '6,000 × 2,500 × 1,500',
          tableSize: '6,000 × 2,000',
          spindleRpm: '4,500 RPM',
          maxWeight: '25,000',
          accuracy: '±0.012 毫米'
        },
        {
          category: '带Y轴车削动力刀塔中心',
          model: 'HAAS ST-35Y 带Y轴',
          cncSystem: 'Haas NextGen',
          travels: 'Ø533 × 826 (Y轴 ±51)',
          tableSize: '卡盘 Ø305',
          spindleRpm: '3,200 RPM',
          maxWeight: '600',
          accuracy: '±0.005 毫米'
        },
        {
          category: '高精度数控外圆磨床',
          model: 'Studer S41 CNC',
          cncSystem: 'Fanuc 310i-B',
          travels: '顶尖距: 1,600 (中心高 275)',
          tableSize: '最大 Ø549 × 1,600',
          spindleRpm: '线速度 50 m/s',
          maxWeight: '250',
          accuracy: '±0.0015 毫米'
        }
      ]
    },
    passportModal: {
      title: '白俄罗斯BZAL股份公司科技园区技术装备资质全宗',
      subtitle: '供机械制造企业总工程师、技术总监与物资采购部长查阅的官方综合技术能力卷宗，详列全部机床规格、加工行程公差与国家权威资质认证。',
      stats: [
        { label: '自备生产车间总面积', value: '30,000+ ㎡' },
        { label: '各类机床加工设备', value: '180+ 台套' },
        { label: '行车起重最大吊重', value: '达 20 吨' },
        { label: '专用铁路线路直达', value: '通达总装跨' }
      ],
      formTitle: '索取完整版技术装备资质文件 (PDF):',
      formSubtitle: '请填写您的职务与工作邮箱 — 系统将立即为您生成官方PDF技术白皮书并可即刻下载。',
      nameLabel: '姓名 / 职务 *',
      namePlaceholder: '张伟，总工艺师 / 设备采购部长',
      emailLabel: '企业工作邮箱 *',
      emailPlaceholder: 'cmo@manufacturing-corp.com',
      companyLabel: '所属企业 / 单位全称 *',
      companyPlaceholder: '重型装备制造集团',
      btnDownload: '立即获取装备技术白皮书 PDF',
      downloadSuccessTitle: '白皮书已生成就绪',
      downloadSuccessDesc: '感谢您关注BZAL工业科技园区制造实力。文件已生成完毕，可立即下载。同时我们已将附有总设计师及总工艺师直通电话的名录副本发送至您的邮箱。',
      btnDirectDownload: '立即在线查阅 PDF 卷宗',
      btnClose: '关闭窗口',
      securityNote: '我们严格恪守企业信息保密承诺，绝不向第三方透露您的任何联络资讯。'
    },
    engineerWidget: {
      label: '总师在线支持',
      dutyEngineer: '值班总工艺师 / 总设计师',
      dutyStatus: '车间一线在线',
      callNow: '直接拨打总师热线',
      sendBrief: '上传图纸 / 提交工艺咨询',
      downloadPassport: '下载设备技术白皮书 (PDF)',
      backToTop: '返回顶部',
      quickHelp: '图纸可行性即时咨询'
    }
  }
};

export const manufacturedPartsList: Record<Language, ManufacturedPart[]> = {
  ru: [
    {
      id: 'part-1',
      category: 'housings',
      categoryKey: 'Корпусные детали и станины',
      title: 'Станина прецизионного станка с направляющими',
      application: 'Для металлорежущих и шлифовальных станков высокой жесткости',
      material: 'Чугун СЧ20 / СЧ25 с термическим снятием напряжений (старение)',
      dimensions: '3 200 × 1 400 × 950 мм (масса 4 200 кг)',
      tolerance: 'Квалитет IT6, прямолинейность 0,008 мм на 1000 мм',
      roughness: 'Ra 0.4 (шлифованные направляющие)',
      batchSize: 'От 1 шт. до 50 шт./мес',
      leadTime: 'От 14 рабочих дней',
      image: '/images/landing_img_1.jpg',
      features: ['Вибростарение', 'Шлифовка V-направляющих', '100% КИМ контроль']
    },
    {
      id: 'part-2',
      category: 'shafts',
      categoryKey: 'Валы, шпиндели и оси',
      title: 'Шпиндель прецизионный многоступенчатый',
      application: 'Главный привод фрезерных и токарных обрабатывающих центров',
      material: 'Сталь 38Х2МЮА (азотированная) / 40ХН2МА',
      dimensions: 'Ø180 × 1 450 мм (посадочные шейки Ø120h4)',
      tolerance: 'Биение шеек не более 0,003 мм, соосность 0,004 мм',
      roughness: 'Ra 0.2 (суперфиниширование шеек)',
      batchSize: 'От 5 до 200 шт.',
      leadTime: 'От 10 рабочих дней',
      image: '/images/bzal_lathe.jpg',
      features: ['Глубокое азотирование HV 950', 'Динамическая балансировка G 1.0', 'Шлифовка конуса 7:24']
    },
    {
      id: 'part-3',
      category: 'railway',
      categoryKey: 'Узлы ж/д транспорта',
      title: 'Ось чистовая колесной пары РЖД / БЖД',
      application: 'Для локомотивных и вагонных тележек магистрального транспорта',
      material: 'Специальная осевая сталь ОсВ / ОсЛ (ГОСТ 31334)',
      dimensions: 'Ø220 × 2 450 мм (масса 520 кг)',
      tolerance: 'Квалитет IT7, допуск на шейку под подшипник ±0,009 мм',
      roughness: 'Ra 0.8 (накатка роликами шеек и галтелей)',
      batchSize: 'От 20 до 1 000 шт./мес',
      leadTime: 'Серийный график поставок',
      image: '/images/bzal_wheel_sparks.jpg',
      features: ['Упрочняющая накатка роликами', '100% УЗК контроль дефектоскопом', 'Клеймение ОТК']
    },
    {
      id: 'part-4',
      category: 'gears',
      categoryKey: 'Зубчатые передачи и венцы',
      title: 'Венец зубчатый прямозубый m=12 z=76',
      application: 'Тяжелые редукторы горнодобывающей и металлургической техники',
      material: 'Легированная сталь 20Х2Н4А с цементацией',
      dimensions: 'Наружный Ø936 мм, ширина венца 180 мм',
      tolerance: 'Степень точности 6-В по ГОСТ 1643',
      roughness: 'Ra 0.8 (зубошлифование на станке Höfler)',
      batchSize: 'От 2 до 50 шт.',
      leadTime: 'От 18 рабочих дней',
      image: '/images/bzal_gears.jpg',
      features: ['Цементация 1,8–2,2 мм', 'Твердость зуба 58–62 HRC', 'Профиль с модификацией']
    },
    {
      id: 'part-5',
      category: 'housings',
      categoryKey: 'Корпусные детали и станины',
      title: 'Корпус 4-ступенчатого редуктора со сложными расточками',
      application: 'Энергетическое машиностроение и приводы конвейерных линий',
      material: 'Высокопрочный чугун ВЧ50 / ВЧ60',
      dimensions: '1 600 × 1 100 × 850 мм',
      tolerance: 'Межосевое расстояние расточек ±0,012 мм, соосность 0,008 мм',
      roughness: 'Ra 0.8 в отверстиях под подшипники',
      batchSize: 'От 5 до 100 шт.',
      leadTime: 'От 15 рабочих дней',
      image: '/images/landing_img_2.jpg',
      features: ['Расточка за одну установку', 'Гидроиспытания на 16 бар', 'Антикоррозионная грунтовка']
    },
    {
      id: 'part-6',
      category: 'units',
      categoryKey: 'Унифицированные станочные узлы',
      title: 'Бабка расточная унифицированная БУ-45',
      application: 'Специальные и агрегатные станки автоматических линий',
      material: 'СЧ25, легированные термообработанные валы и шестерни',
      dimensions: '850 × 620 × 540 мм',
      tolerance: 'Радиальное биение шпинделя 0,004 мм',
      roughness: 'Ra 0.4',
      batchSize: 'От 1 шт. под проект станка',
      leadTime: 'От 20 рабочих дней',
      image: '/images/bzal_lines.jpg',
      features: ['Собственная конструкторская разработка БЗАЛ', 'Автономная смазка', 'Встроенный привод']
    },
    {
      id: 'part-7',
      category: 'tooling',
      categoryKey: 'Штампы, пресс-формы и оснастка',
      title: 'Блок вырубного штампа последовательного действия',
      application: 'Высокоскоростная штамповка деталей электротехнической и автопромышленности',
      material: 'Инструментальная сталь Х12МФ, 9ХС, плиты 40Х',
      dimensions: '750 × 500 × 380 мм',
      tolerance: 'Зазор пуансон-матрица 0,015 мм',
      roughness: 'Ra 0.2 (электроэрозионная и оптическая полировка)',
      batchSize: 'Штучное изготовление по КД',
      leadTime: 'От 25 рабочих дней',
      image: '/images/landing_img_3.jpg',
      features: ['Закалка матриц до 62 HRC', 'Прецизионные направляющие колонки', 'Гарантийный ресурс 500k ударов']
    },
    {
      id: 'part-8',
      category: 'railway',
      categoryKey: 'Узлы ж/д транспорта',
      title: 'Корпус буксы пассажирского и грузового вагона',
      application: 'Буксовый узел колесных пар подвижного состава',
      material: 'Сталь 20ГЛ / 20ФЛ (отливки повышенной ударной вязкости)',
      dimensions: '420 × 380 × 340 мм',
      tolerance: 'Посадочный диаметр под подшипник Ø250H7 (+0,030 мм)',
      roughness: 'Ra 1.25',
      batchSize: 'От 50 до 2 000 шт./мес',
      leadTime: 'Серийный график',
      image: '/images/bzal_sparks.jpg',
      features: ['100% магнитная дефектоскопия', 'Высокая морозостойкость (до -60°C)', 'Маркировка']
    }
  ],

  en: [
    {
      id: 'part-1',
      category: 'housings',
      categoryKey: 'Housings & Machine Beds',
      title: 'Precision Machine Tool Bed with Integrated Guideways',
      application: 'High-rigidity structural base for milling and grinding centers',
      material: 'Cast Iron SCH20 / SCH25 with thermal stress-relief annealing',
      dimensions: '3,200 × 1,400 × 950 mm (weight 4,200 kg)',
      tolerance: 'IT6 tolerance class, straightness 0.008 mm per 1,000 mm',
      roughness: 'Ra 0.4 (ground guideways)',
      batchSize: '1 to 50 pcs/month',
      leadTime: 'From 14 business days',
      image: '/images/landing_img_1.jpg',
      features: ['Stress-relieved casting', 'Precision V-guideway grinding', '100% CMM verified']
    },
    {
      id: 'part-2',
      category: 'shafts',
      categoryKey: 'Shafts, Spindles & Axles',
      title: 'Multi-Step High-Speed Spindle Shaft',
      application: 'Main spindle for CNC milling and turning centers',
      material: 'Nitrided Alloy Steel 38Kh2MYuA / 40KhN2MA',
      dimensions: 'Ø180 × 1,450 mm (bearing journal Ø120h4)',
      tolerance: 'Runout under 0.003 mm, concentricity 0.004 mm',
      roughness: 'Ra 0.2 (superfinished bearing seats)',
      batchSize: '5 to 200 pcs',
      leadTime: 'From 10 business days',
      image: '/images/bzal_lathe.jpg',
      features: ['Deep gas nitriding HV 950', 'Dynamic balancing G 1.0', '7:24 precision ground taper']
    },
    {
      id: 'part-3',
      category: 'railway',
      categoryKey: 'Railway & Rolling Stock',
      title: 'Machined Solid Railway Axle (RZD / BC Standards)',
      application: 'Mainline freight & passenger bogies and wheelsets',
      material: 'Specialized Axle Steel OsV / OsL (GOST 31334)',
      dimensions: 'Ø220 × 2,450 mm (weight 520 kg)',
      tolerance: 'IT7 class, bearing journal tolerance ±0.009 mm',
      roughness: 'Ra 0.8 (burnished roller finished fillets and journals)',
      batchSize: '20 to 1,000 pcs/month',
      leadTime: 'Serial delivery schedule',
      image: '/images/bzal_wheel_sparks.jpg',
      features: ['Deep roller burnishing', '100% Ultrasonic NDT inspection', 'Full stamp traceability']
    },
    {
      id: 'part-4',
      category: 'gears',
      categoryKey: 'Gears & Ring Drives',
      title: 'Spur Gear Ring m=12 z=76',
      application: 'Heavy industrial gearboxes for mining and metallurgical equipment',
      material: 'Alloy Carburized Steel 20Kh2N4A',
      dimensions: 'Outer Ø936 mm, face width 180 mm',
      tolerance: 'Grade 6-B gear precision (DIN 3962 / GOST 1643)',
      roughness: 'Ra 0.8 (Höfler profile tooth grinding)',
      batchSize: '2 to 50 pcs',
      leadTime: 'From 18 business days',
      image: '/images/bzal_gears.jpg',
      features: ['Carburized layer 1.8–2.2 mm', 'Tooth hardness 58–62 HRC', 'Lead and profile crowning']
    },
    {
      id: 'part-5',
      category: 'housings',
      categoryKey: 'Housings & Machine Beds',
      title: '4-Stage Heavy Industrial Reducer Housing',
      application: 'Power generation drives and heavy conveyor installations',
      material: 'Ductile Iron VCh50 / VCh60 (GGG50)',
      dimensions: '1,600 × 1,100 × 850 mm',
      tolerance: 'Center-to-center bore spacing ±0.012 mm, alignment 0.008 mm',
      roughness: 'Ra 0.8 on bearing bores',
      batchSize: '5 to 100 pcs',
      leadTime: 'From 15 business days',
      image: '/images/landing_img_2.jpg',
      features: ['Single-setup multi-axis boring', '16 bar hydrostatic pressure test', 'Anti-corrosion coating']
    },
    {
      id: 'part-6',
      category: 'units',
      categoryKey: 'Modular Machine Tool Heads',
      title: 'Modular Machine Tool Boring Head BU-45',
      application: 'Special purpose transfer lines and aggregate multi-spindle machines',
      material: 'Alloyed Cast Iron, heat-treated hardened shafts and gears',
      dimensions: '850 × 620 × 540 mm',
      tolerance: 'Spindle radial runout under 0.004 mm',
      roughness: 'Ra 0.4',
      batchSize: 'Custom built per machine project',
      leadTime: 'From 20 business days',
      image: '/images/bzal_lines.jpg',
      features: ['Proprietary BZAL engineering design', 'Self-contained lubrication', 'Integrated power feed']
    },
    {
      id: 'part-7',
      category: 'tooling',
      categoryKey: 'Tooling, Dies & Molds',
      title: 'Progressive Stamping Die Block',
      application: 'High-speed metal stamping for automotive & electrical components',
      material: 'Tool Steel X12MF, 9XS, base plates 40X',
      dimensions: '750 × 500 × 380 mm',
      tolerance: 'Punch-die clearance 0.015 mm',
      roughness: 'Ra 0.2 (wire EDM and optical polishing)',
      batchSize: 'Custom built to customer drawings',
      leadTime: 'From 25 business days',
      image: '/images/landing_img_3.jpg',
      features: ['Die insert hardening up to 62 HRC', 'Preloaded guide pillar assemblies', '500,000 stroke tool life']
    },
    {
      id: 'part-8',
      category: 'railway',
      categoryKey: 'Railway & Rolling Stock',
      title: 'Railway Axle Box Housing (Passenger & Freight)',
      application: 'Axle journal bearing assembly for rolling stock',
      material: 'Cast Low-Alloy Steel 20GL / 20FL (impact resistant)',
      dimensions: '420 × 380 × 340 mm',
      tolerance: 'Bearing bore diameter Ø250H7 (+0.030 mm)',
      roughness: 'Ra 1.25',
      batchSize: '50 to 2,000 pcs/month',
      leadTime: 'Serial delivery contract',
      image: '/images/bzal_sparks.jpg',
      features: ['100% Magnetic particle inspection', 'Low-temp impact toughness (-60°C)', 'Traceable batch stamp']
    }
  ],

  zh: [
    {
      id: 'part-1',
      category: 'housings',
      categoryKey: '箱体结构件与大型机床床身',
      title: '带精密导轨的高刚性机床床身铸件',
      application: '适用于高精度数控铣削与磨削机床的重型基座',
      material: '优质灰铸铁 SCH20 / SCH25，经高温人工时效退火消除应力',
      dimensions: '3,200 × 1,400 × 950 毫米 (自重 4,200 公斤)',
      tolerance: 'IT6公差级，每米导轨直线度误差在 0.008 毫米以内',
      roughness: 'Ra 0.4 (超精磨削导轨面)',
      batchSize: '单件试制至每月 50 件批量',
      leadTime: '14个工作日起',
      image: '/images/landing_img_1.jpg',
      features: ['振动与热时效去应力', 'V形双导轨超精磨', '100%三坐标扫描合格']
    },
    {
      id: 'part-2',
      category: 'shafts',
      categoryKey: '精密主轴、丝杠与重载光轴',
      title: '多台阶高转速精密机床主轴',
      application: '大型数控车床与加工中心的主运动轴',
      material: '高级氮化合金钢 38Kh2MYuA / 40KhN2MA',
      dimensions: 'Ø180 × 1,450 毫米 (轴承配合颈 Ø120h4)',
      tolerance: '各档轴颈径向跳动小于 0.003 毫米，同轴度 0.004 毫米',
      roughness: 'Ra 0.2 (配合面超精镜面研磨)',
      batchSize: '5 至 200 件',
      leadTime: '10个工作日起',
      image: '/images/bzal_lathe.jpg',
      features: ['深层离子渗氮硬度达 HV 950', 'G 1.0级高速动平衡', '7:24高精内锥孔研磨']
    },
    {
      id: 'part-3',
      category: 'railway',
      categoryKey: '铁路车辆轮对与承载轴箱',
      title: '干线客货机车铁路机加工实心车轴',
      application: '干线重载机车与货运客运车辆转向架轮对',
      material: '特种优质车轴钢 OsV / OsL (GOST 31334)',
      dimensions: 'Ø220 × 2,450 毫米 (自重 520 公斤)',
      tolerance: 'IT7公差级，轴承位极限偏差 ±0.009 毫米',
      roughness: 'Ra 0.8 (过渡圆角与轴颈实施高压滚压硬化强化)',
      batchSize: '每月 20 至 1,000 件',
      leadTime: '按大批量合同排期',
      image: '/images/bzal_wheel_sparks.jpg',
      features: ['深层滚压冷作硬化', '100%超声波内部无损探伤', '全流程钢印追溯']
    },
    {
      id: 'part-4',
      category: 'gears',
      categoryKey: '齿轮齿圈与渐开线传动件',
      title: '重型直齿圆柱齿圈 m=12 z=76',
      application: '矿山机械、冶金轧机及重型工程机械主减速箱',
      material: '高级合金渗碳钢 20Kh2N4A',
      dimensions: '外径 Ø936 毫米，齿宽 180 毫米',
      tolerance: 'DIN 6级齿轮精度 (DIN 3962 / GOST 1643)',
      roughness: 'Ra 0.8 (德国霍夫勒磨齿机精密磨齿)',
      batchSize: '2 至 50 件',
      leadTime: '18个工作日起',
      image: '/images/bzal_gears.jpg',
      features: ['渗碳淬火硬化层 1.8–2.2 毫米', '齿面硬度 58–62 HRC', '齿向齿形精密修形']
    },
    {
      id: 'part-5',
      category: 'housings',
      categoryKey: '箱体结构件与大型机床床身',
      title: '四级重载工业齿轮箱箱体 (带精密镗孔)',
      application: '重型发电设备与矿用输送机重载减速机构',
      material: '高强度球墨铸铁 VCh50 / VCh60 (GGG50)',
      dimensions: '1,600 × 1,100 × 850 毫米',
      tolerance: '轴承支承孔跨距中心距公差 ±0.012 毫米，同轴度 0.008 毫米',
      roughness: 'Ra 0.8 (轴承安装孔表面光洁度)',
      batchSize: '5 至 100 件',
      leadTime: '15个工作日起',
      image: '/images/landing_img_2.jpg',
      features: ['大型卧镗单次装夹多孔镗削', '16bar耐压水压防渗测试', '工业级防锈环氧底漆']
    },
    {
      id: 'part-6',
      category: 'units',
      categoryKey: '组合机床通用动力滑台与动力头',
      title: '组合机床通用镗削动力头 BU-45',
      application: '用于自动化加工线与专用组合机床的关键切削动力单元',
      material: '机体高牌号铸铁，内置合金调质主轴及传动齿轮系',
      dimensions: '850 × 620 × 540 毫米',
      tolerance: '主轴径向全跳动小于 0.004 毫米',
      roughness: 'Ra 0.4',
      batchSize: '针对机床工程项目单件或小批量配套',
      leadTime: '20个工作日起',
      image: '/images/bzal_lines.jpg',
      features: ['BZAL原厂完全自主知识产权', '内置自动循环润滑泵站', '支持伺服无级进给']
    },
    {
      id: 'part-7',
      category: 'tooling',
      categoryKey: '冷热冲压模具与专用夹具',
      title: '高精度级进级模具冲模组件',
      application: '汽车冲压件、五金精密冲裁与电气端子的高速冲制',
      material: '特种模具钢 X12MF, 9XS，模板优质40Cr',
      dimensions: '750 × 500 × 380 毫米',
      tolerance: '凸凹模精密配合间隙 0.015 毫米',
      roughness: 'Ra 0.2 (慢走丝线切割与光学镜面精研抛光)',
      batchSize: '单套或成套专用定制',
      leadTime: '25个工作日起',
      image: '/images/landing_img_3.jpg',
      features: ['模芯刃口真空淬火达 62 HRC', '高精度滚珠导柱导套导向', '模具寿命超 500,000 次']
    },
    {
      id: 'part-8',
      category: 'railway',
      categoryKey: '铁路车辆轮对与承载轴箱',
      title: '客货运铁路转向架轴箱铸钢壳体',
      application: '铁道机车车辆轮对轴承箱结构总成',
      material: '优质低合金铸钢 20GL / 20FL (高抗冲击韧性)',
      dimensions: '420 × 380 × 340 毫米',
      tolerance: '轴承安装孔径 Ø250H7 (+0.030 毫米)',
      roughness: 'Ra 1.25',
      batchSize: '每月 50 至 2,000 件',
      leadTime: '长期供货合同',
      image: '/images/bzal_sparks.jpg',
      features: ['100%磁粉探伤无表面裂纹', '-60°C低温冲击韧度达标', '合格追溯批次标识']
    }
  ]
};
