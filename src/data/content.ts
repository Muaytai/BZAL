import { CompetencyTab, EquipmentItem, ComparisonRow, ProcessStep, PlantProject, ClientLogo } from '../types';

export const content = {
  ru: {
    brand: {
      name: 'ТЕХНОПАРК',
      subname: 'ОАО «БЗАЛ»',
      fullName: 'ОАО «Барановичский завод автоматических линий»',
      slogan: 'Промышленный инжиниринг • Станкостроение • Металлообработка',
      address: 'Республика Беларусь, 225410, г. Барановичи, ул. Королика, 8',
      phone: '+375 44 751 44 77',
      phoneRaw: '+375447514477',
      phoneFax: '+375 (163) 67-20-48',
      phoneMarket: '+375 (163) 67-20-41',
      email: 'bzal_market@mail.ru',
      website: 'www.bzal.by',
      workingHours: 'Пн-Пт: 08:00 – 16:45 (МСК/Минск)',
      since: 'С 1974 ГОДА',
      btnRfq: 'Заявка по ТЗ',
    },
    nav: [
      { id: 'about', label: 'О Технопарке', href: '#about' },
      { id: 'parts', label: 'Каталог деталей', href: '#parts' },
      { id: 'services', label: 'Компетенции', href: '#services' },
      { id: 'equipment', label: 'Оборудование', href: '#equipment' },
      { id: 'quality', label: 'Контроль ОТК', href: '#quality' },
      { id: 'eaeu', label: 'Поставки в РФ/ЕАЭС', href: '#eaeu' },
      { id: 'calculator', label: 'Калькулятор ТЗ', href: '#calculator' },
      { id: 'contacts', label: 'Контакты', href: '#contacts' },
    ],
    hero: {
      badge: 'ПРОМЫШЛЕННЫЙ ТЕХНОПАРК ПОЛНОГО ЦИКЛА',
      sinceTag: 'С 1974 ГОДА',
      titleHighlight: 'ИНЖЕНЕРНЫЕ РЕШЕНИЯ',
      titleRest: 'ДЛЯ ВАШЕЙ ПРОМЫШЛЕННОСТИ',
      sloganTitle: '«СТАНКИ, СОЗДАННЫЕ СПЕЦИАЛЬНО ДЛЯ ВАС»',
      sloganDesc: 'Полный производственный цикл станкостроительного гиганта: конструкторское бюро (ОГК), технологический отдел (ОГТ), литейное и заготовительное производство, высокоточная ЧПУ-металлообработка до 0,005 мм на 30 000+ м². Расчёт по чертежам за 24 часа напрямую от завода.',
      primaryCta: 'Экспресс-расчёт по ТЗ за 24 ч ↗',
      secondaryCta: 'Каталог станков и мощностей ↓',
      salesLeadLabel: 'Прямая связь с отделом продаж:',
      trustBadges: [
        'СТБ ISO 9001-2015',
        'Лаборатория ОТК',
        'ГОСТ / ЕСКД / ЕСТД',
        'Прямой договор завода',
      ],
      billboardTag: 'ТЕХНОПАРК БЗАЛ',
      billboardPrecision: '±0,005 мм',
      billboardEyebrow: 'ПРОИЗВОДСТВЕННЫЙ ПОТЕНЦИАЛ',
      billboardTitle: 'Автоматические линии и спецстанки для МАЗ, МТЗ, КамАЗ, РЖД',
      stats: [
        { value: '30 000+ м²', label: 'Собственных производственных цехов' },
        { value: '380+', label: 'Автоматических линий изготовлено' },
        { value: '8 000+', label: 'Агрегатных и специальных станков' },
        { value: '50+ ЛЕТ', label: 'Машиностроительного опыта (с 1974)' },
      ],
      plantLocationTag: 'ОАО «БЗАЛ», г. Барановичи',
      certTag: 'СТБ ISO 9001-2015',
    },
    about: {
      eyebrow: 'ИСТОРИЯ И ПРОИЗВОДСТВЕННЫЙ ПОТЕНЦИАЛ',
      title: 'БОЛЕЕ 50 ЛЕТ НА РЫНКЕ СТАНКОСТРОЕНИЯ',
      lead: 'Технопарк ОАО «БЗАЛ» создан на базе Барановичского завода автоматических линий — легендарного флагмана станкостроения, поставляющего специализированное станочное оборудование и автоматические линии на крупнейшие машиностроительные заводы.',
      quote: '«Мы создаем специализированное оборудование и детали, превосходящие стандарты, опираясь на традиции качества и непрерывные инновации.»',
      quoteAuthor: 'Руководство ОАО «БЗАЛ»',
      quoteBadge: 'Основан 14 марта 1974 г.',
      desc2: 'Сегодня Технопарк объединяет многолетний опыт заводской школы конструкторов и технологов с современными 3-, 4- и 5-осевыми обрабатывающими центрами. Мы берем на себя задачи любой сложности: от штучного реверс-инжиниринга импортных узлов до серийного контрактного производства деталей для станкостроения, энергетики, горнодобывающей и транспортной отраслей.',
      bulletTitle: 'Ключевые преимущества заводского Технопарка:',
      bullets: [
        'Полная инфраструктура: литейные, заготовительные, механообрабатывающие и сборочные участки в одном месте.',
        'Сильнейшие службы ОГК (главного конструктора) и ОГТ (главного технолога) со стажем решения нестандартных машиностроительных задач.',
        'Собственные подстанции высокой мощности, подъездные ж/д пути и крановое хозяйство грузоподъемностью до 20 тонн.',
        'Прямая ответственность государственного акционерного общества с официальной гарантией и паспортами изделий.'
      ],
      photoTag: 'ПРОИЗВОДСТВЕННЫЙ КОРПУС',
      photoTitle: 'Цех сборки автоматических линий и агрегатных станков',
      projectsEyebrow: 'ВНЕДРЕННЫЕ ПРОЕКТЫ',
      projectsSub: 'География поставок',
      projects: [
        {
          code: 'ЛБ0755',
          title: 'Автоматическая линия колесных пар',
          location: 'г. Магнитогорск, РФ',
          scope: 'Полный комплекс механической обработки и расточки'
        },
        {
          code: 'СБ940–СБ943',
          title: 'Специальные агрегатные станки',
          location: 'г. Могилев, РБ',
          scope: 'Многопозиционная обработка корпусных деталей двигателей'
        },
        {
          code: 'СБ902',
          title: 'Специальный станок для вагоностроения',
          location: 'г. Канаш, РФ',
          scope: 'Высокоточная обработка тележек подвижного состава'
        },
        {
          code: 'С1304 & СБ881',
          title: 'Спецстанки тяжелого машиностроения',
          location: 'г. Ярославль / г. Новоуральск',
          scope: 'Шлифовка и обработка валов и осей высокой точности'
        }
      ],
      clientsTitle: 'ОБОРУДОВАНИЕ И ДЕТАЛИ БЗАЛ РАБОТАЮТ НА ПРЕДПРИЯТИЯХ:',
      clients: [
        { name: 'МАЗ', desc: 'Минский автомобильный завод' },
        { name: 'МТЗ', desc: 'Минский тракторный завод' },
        { name: 'КамАЗ', desc: 'Камский автомобильный завод' },
        { name: 'ГАЗ', desc: 'Горьковский автозавод' },
        { name: 'ВАЗ', desc: 'Волжский автозавод' },
        { name: 'РЖД', desc: 'Российские железные дороги' },
        { name: 'БелЖД', desc: 'Белорусская железная дорога' },
        { name: 'БЕЛАЗ', desc: 'Белорусский автозавод' },
      ]
    },
    services: {
      eyebrow: 'ПРОИЗВОДСТВЕННЫЕ КОМПЕТЕНЦИИ',
      title: 'КОМПЛЕКСНЫЕ ИНЖЕНЕРНЫЕ УСЛУГИ ПОД КЛЮЧ',
      subtitle: 'Подключаем нужных специалистов на любом этапе жизненного цикла изделия — от разработки концепта до серийного выпуска.',
      unitCodeLabel: 'Код подразделения:',
      operationsTitle: 'ВЫПОЛНЯЕМЫЕ ОПЕРАЦИИ И РЕШЕНИЯ:',
      auditCta: 'Заказать аудит по направлению',
      guaranteeTitle: 'Прямая заводская гарантия',
      guaranteeDesc: 'Паспорт качества ОТК на каждую партию деталей',
      otcBadge: '100% ОТК',
    },
    equipment: {
      eyebrow: 'ТЕХНИЧЕСКАЯ ОСНАЩЕННОСТЬ',
      title: 'СТАНОЧНЫЙ ПАРК И МОЩНОСТИ МЕХАНООБРАБОТКИ',
      subtitle: 'Широкая номенклатура универсального и высокоточного оборудования с ЧПУ для обработки крупногабаритных и сложных корпусных деталей.',
      workZoneLabel: 'Рабочая зона:',
      bannerEyebrow: 'ДОПОЛНИТЕЛЬНЫЕ МОЩНОСТИ ЗАВОДА',
      bannerTitle: 'Литейное, термическое, гальваническое и покрасочное производство',
      bannerDesc: 'Помимо станочной обработки, на территории ОАО «БЗАЛ» функционируют участки чугунного и стального литья, участки объемной и ТВЧ-термообработки, химического оксидирования, цинкования и порошковой окраски.',
      bannerCta: 'Запросить паспорта оборудования',
    },
    comparison: {
      eyebrow: 'ЭКОНОМИЧЕСКАЯ ЭФФЕКТИВНОСТЬ',
      title: 'ТЕХНОПАРК ОАО «БЗАЛ» ИЛИ ЧАСТНЫЕ ПОСРЕДНИКИ?',
      subtitle: 'Сравните факты и исключите скрытые затраты, срывы сроков и брак при размещении заказов.',
      colCriterion: 'Критерий оценки',
      colBzal: 'Технопарк ОАО «БЗАЛ»',
      colBrokers: 'Частные посредники / Брокеры',
      directContractNote: 'Договор заключается напрямую с ОАО «БЗАЛ» без третьих лиц',
      ctaLink: 'Рассчитать экономию по вашему ТЗ →',
    },
    process: {
      eyebrow: 'ПРОЗРАЧНЫЙ РЕГЛАМЕНТ',
      title: 'ОТ ЧЕРТЕЖА ДО ГОТОВОЙ ПАРТИИ ЗА 4 ШАГА',
      subtitle: 'Четкие сроки, промежуточный контроль и закрепленный за проектом ведущий инженер.',
      durationLabel: 'Срок:',
      resultLabel: 'Результат этапа:',
    },
    calculator: {
      eyebrow: 'ОНЛАЙН-КОНФИГУРАТОР ЗАЯВКИ',
      title: 'ЭКСПРЕСС-РАСЧЕТ ТЕХНОЛОГИЧЕСКОЙ ПОДГОТОВКИ И СТОИМОСТИ',
      subtitle: 'Укажите вводные параметры вашей задачи — наш технологический отдел проведет предварительный аудит и предоставит расчет в течение 24 часов.',
      step1Label: '1. ВЫБЕРИТЕ ТРЕБУЕМУЮ КОМПЕТЕНЦИЮ / УСЛУГУ:',
      serviceOptions: [
        'Механическая обработка на станках с ЧПУ',
        'Разработка конструкторской документации (ОГК)',
        'Реверс-инжиниринг импортных деталей',
        'Технологическая подготовка и ЧПУ-программы (ОГТ)',
        'Контрактное серийное производство узлов',
        'Аренда производственных площадей Технопарка',
      ],
      step2Label: '2. ИСХОДНАЯ ТЕХНИЧЕСКАЯ ДОКУМЕНТАЦИЯ:',
      drawingOptions: [
        'Есть 3D-модели (STEP, IGES, Parasolid)',
        'Есть чертежи (PDF, DWG, Компас)',
        'Есть только физический образец детали',
        'Есть только техническое задание (ТЗ)',
      ],
      step3Label: '3. МАТЕРИАЛ ЗАГОТОВКИ:',
      materialOptions: [
        'Сталь конструкционная (45, 40Х и др.)',
        'Нержавеющая сталь (12Х18Н10Т, AISI 304/316)',
        'Цветные металлы (Алюминий, Д16Т, Латунь, Бронза)',
        'Серый и высокопрочный чугун (СЧ20, ВЧ50)',
        'Жаропрочные и инструментальные спецстали',
      ],
      step4Label: '4. ПЛАНИРУЕМЫЙ ОБЪЕМ ПАРТИИ:',
      quantityOptions: [
        'Единичный опытный образец (1–5 шт.)',
        'Мелкая серия (10–100 шт.)',
        'Средняя серия (100–1 000 шт.)',
        'Крупная серия (1 000+ шт./мес.)',
      ],
      step5Label: '5. ПРИКРЕПИТЬ ЧЕРТЕЖ ИЛИ ТЗ (PDF, STEP, DWG, ZIP):',
      uploadTitle: 'Нажмите для выбора файлов или перетащите их сюда',
      uploadFormats: 'Поддерживаются форматы PDF, STEP, DWG, IGES, ZIP до 50 Мб',
      rightCardTitle: 'РАСЧЕТ В ТЕЧЕНИЕ 24 Ч',
      rightCardBadge: 'БЕЗ НАЦЕНОК',
      rightCardDesc: 'Заполните контакты ответственного специалиста для получения официального ТКП с детализацией нормо-часов от ОАО «БЗАЛ».',
      fieldName: 'Ваше имя / Должность *',
      fieldNamePlaceholder: 'Константин, Главный технолог',
      fieldCompany: 'Организация / Завод *',
      fieldCompanyPlaceholder: 'ПАО «Машиностроительный комбинат»',
      fieldPhone: 'Телефон *',
      fieldPhonePlaceholder: '+375 29 000-00-00',
      fieldEmail: 'Корпоративный Email *',
      fieldEmailPlaceholder: 'tech@plant.ru',
      fieldComments: 'Комментарии к задаче (необязательно)',
      fieldCommentsPlaceholder: 'Особые требования к термообработке, шероховатости или срокам',
      submitBtn: 'Запросить расчет по ТЗ',
      turnaroundNote: 'Ответ инженера ОГК/ОГТ в течение 24 часов',
      confNote: 'Полная конфиденциальность и подписание NDA',
      successTitle: 'Заявка принята в работу ОАО «БЗАЛ»',
      successDesc: 'Службы ОГК и ОГТ уже приступили к предварительному анализу вашей задачи. Ведущий инженер свяжется с вами в течение 24 часов для согласования деталей и предоставления официального расчета.',
      successParamsTitle: 'Параметры вашей заявки:',
      newReqBtn: 'Отправить еще одну заявку',
    },
    contacts: {
      eyebrow: 'ОТДЕЛ МАРКЕТИНГА И ПРОДАЖ',
      title: 'ОБСУДИТЕ ВАШ ПРОЕКТ С ГЛАВНЫМИ СПЕЦИАЛИСТАМИ',
      subtitle: 'Отправьте чертежи, эскизы или техническое задание на оценку. Мы оперативно свяжемся с вами для согласования деталей.',
      cardDepartment: 'ТЕХНОПАРК ОАО «БЗАЛ» • ОТДЕЛ МАРКЕТИНГА И СБЫТА',
      phoneEngineerLabel: 'Дежурный инженер / Продажи:',
      phoneFaxLabel: 'Тел./факс:',
      phoneMarketLabel: 'Маркетинг:',
      emailLabel: 'Электронная почта:',
      emailDesc: 'Для чертежей, ТЗ и спецификаций',
      addressLabel: 'Адрес производства:',
      addressVal: '225410, Республика Беларусь, Брестская обл., г. Барановичи, ул. Королика, 8',
      hoursLabel: 'Режим работы:',
      hoursTime: 'Понедельник — Пятница: 08:00 – 16:45',
      hoursTimezone: '(Время Московское / Минское)',
      sendDrawingBtn: 'Отправить чертеж на оценку',
      mainPortalBtn: 'Основной портал bzal.by',
      logisticsTitle: 'ТРАНСПОРТНАЯ ДОСТУПНОСТЬ И ЛОГИСТИКА:',
      logisticsDesc: 'Завод расположен в 3 км от международной автомагистрали М1 (Брест — Минск — Москва). Действующая железнодорожная ветка заходит непосредственно на закрытую территорию цехов, что позволяет оперативно отгружать негабаритные станки, линии и тяжелые металлоконструкции полувагонами и платформами.',
      photoTag: 'ОФИЦИАЛЬНОЕ ПРОИЗВОДСТВО',
      photoPlant: 'Барановичи, ул. Королика, 8',
      photoHalls: 'Собственный промышленный комплекс 30 000+ м²',
      coordinatesLabel: 'Координаты проходной:',
      visitNote: 'Возможен очный визит представителей заказчика для технологического аудита станочного парка и лаборатории ОТК.',
    },
    footer: {
      desc: 'Специализированное станкостроение, конструкторские и технологические услуги (ОГК / ОГТ), контрактная прецизионная мехобработка и комплексное машиностроительное производство с 1974 года.',
      isoCert: 'Система менеджмента качества сертифицирована по СТБ ISO 9001-2015.',
      sectionsTitle: 'РАЗДЕЛЫ САЙТА:',
      reqTitle: 'РЕКВИЗИТЫ И СВЯЗЬ:',
      salesDept: '(Отдел сбыта)',
      faxDept: '(Факс / Маркетинг)',
      unpLabel: 'УНП 200166848 • ОКПО 00223254',
      allRightsReserved: 'ОАО «БЗАЛ». Технопарк станкостроения и инжиниринга. Все права защищены.',
      portalLink: 'Официальный сайт www.bzal.by',
      servicesLink: 'bzal-uslugi.by',
    },
    modal: {
      badge: 'ТЕХНОПАРК ОАО БЗАЛ',
      title: 'Экспресс-расчёт по ТЗ и чертежам',
      subtitle: 'Предварительный аудит технологичности и сметный расчёт за 24 часа напрямую от завода.',
      serviceLabel: 'Направление работ:',
      serviceOptions: [
        'Механическая обработка на станках с ЧПУ',
        'Разработка конструкторской документации (ОГК)',
        'Технологическая подготовка и программы (ОГТ)',
        'Реверс-инжиниринг импортных деталей',
        'Контрактное серийное производство',
        'Аренда производственных площадей',
      ],
      nameLabel: 'Ваше имя *',
      namePlaceholder: 'Иван Петров',
      companyLabel: 'Организация / Завод *',
      companyPlaceholder: 'ООО «ПромТех»',
      phoneLabel: 'Телефон для связи *',
      phonePlaceholder: '+375 29 000-00-00',
      emailLabel: 'Email для КП *',
      emailPlaceholder: 'mail@company.com',
      commentLabel: 'Краткое ТЗ / Комментарий',
      commentPlaceholder: 'Материал, объём партии, требования к точности...',
      attachLabel: 'Прикрепить чертеж (PDF, STEP, DWG)',
      chooseFileLabel: 'Выбрать файлы чертежей',
      filesCountLabel: 'Файлов выбрано:',
      submitBtn: 'Отправить на аудит инженеру',
      note: 'Ответ в течение 24 часов • Официальный договор с ОАО «БЗАЛ»',
      successTitle: 'Заявка принята ОАО «БЗАЛ»',
      successDesc: 'Спасибо! Мы зарегистрировали обращение. Дежурный ведущий инженер ОГК/ОГТ свяжется с вами в течение 24 часов.',
      closeBtn: 'Закрыть окно',
    }
  },

  en: {
    brand: {
      name: 'TECHNOPARK',
      subname: 'JSC "BZAL"',
      fullName: 'JSC "Baranovichi Automatic Lines Plant"',
      slogan: 'Industrial Engineering • Machine Tool Building • Metalworking',
      address: '8 Korolika Str., 225410, Baranovichi, Republic of Belarus',
      phone: '+375 44 751 44 77',
      phoneRaw: '+375447514477',
      phoneFax: '+375 (163) 67-20-48',
      phoneMarket: '+375 (163) 67-20-41',
      email: 'bzal_market@mail.ru',
      website: 'www.bzal.by',
      workingHours: 'Mon-Fri: 08:00 – 16:45 (UTC+3)',
      since: 'SINCE 1974',
      btnRfq: 'Request Quote',
    },
    nav: [
      { id: 'about', label: 'About Technopark', href: '#about' },
      { id: 'parts', label: 'Parts Catalog', href: '#parts' },
      { id: 'services', label: 'Competencies', href: '#services' },
      { id: 'equipment', label: 'Machinery', href: '#equipment' },
      { id: 'quality', label: 'Quality & QC', href: '#quality' },
      { id: 'eaeu', label: 'EAEU & Logistics', href: '#eaeu' },
      { id: 'calculator', label: 'RFQ Estimator', href: '#calculator' },
      { id: 'contacts', label: 'Contacts', href: '#contacts' },
    ],
    hero: {
      badge: 'FULL-CYCLE INDUSTRIAL TECHNOPARK',
      sinceTag: 'SINCE 1974',
      titleHighlight: 'ENGINEERING SOLUTIONS',
      titleRest: 'FOR YOUR INDUSTRY',
      sloganTitle: '«MACHINE TOOLS ENGINEERED SPECIFICALLY FOR YOU»',
      sloganDesc: 'Integrated production cycle of a machine tool giant: Design Bureau (CAD/R&D), Process Planning (CAM), in-house foundry, and high-precision CNC machining down to 0.005 mm across 30,000+ m². Rapid technical quotation within 24 hours direct from the plant.',
      primaryCta: 'Request Rapid Quote in 24h ↗',
      secondaryCta: 'Explore Machine Park ↓',
      salesLeadLabel: 'Direct line with Sales & Engineering:',
      trustBadges: [
        'ISO 9001:2015 Certified',
        'In-House QC Lab',
        'State & EU Standards',
        'Direct Plant Contract',
      ],
      billboardTag: 'TECHNOPARK BZAL',
      billboardPrecision: '±0.005 mm',
      billboardEyebrow: 'MANUFACTURING CAPACITY',
      billboardTitle: 'Automatic transfer lines and special machines for heavy transport & automotive',
      stats: [
        { value: '30,000+ m²', label: 'Dedicated manufacturing floors' },
        { value: '380+', label: 'Automatic transfer lines built' },
        { value: '8,000+', label: 'Specialized machine tools delivered' },
        { value: '50+ YEARS', label: 'Machine tool engineering heritage (1974)' },
      ],
      plantLocationTag: 'JSC "BZAL", Baranovichi',
      certTag: 'ISO 9001:2015',
    },
    about: {
      eyebrow: 'HERITAGE & PRODUCTION CAPACITY',
      title: 'OVER 50 YEARS IN MACHINE TOOL BUILDING',
      lead: 'Technopark of JSC "BZAL" was established on the foundation of the Baranovichi Automatic Lines Plant — a flagship manufacturer delivering specialized machine tools and automated transfer lines to major heavy industries.',
      quote: '"We engineer specialized equipment and components surpassing industry standards, anchored in quality traditions and continuous innovation."',
      quoteAuthor: 'Executive Board of JSC "BZAL"',
      quoteBadge: 'Established March 14, 1974',
      desc2: 'Today, the Technopark combines decades of technical mastery with modern multi-axis CNC machining centers. We manage projects from custom reverse-engineering of imported assemblies to serial contract manufacturing for machinery, energy, mining, and transport sectors.',
      bulletTitle: 'Key plant advantages:',
      bullets: [
        'Complete infrastructure: foundry, cutting, heavy machining, and assembly shops under one roof.',
        'High-caliber design (OGK) and process engineering (OGT) teams capable of solving non-standard mechanical challenges.',
        'High-capacity power substations, on-site railway spurs, and heavy overhead cranes up to 20 tons.',
        'Official manufacturer warranty, traceability, and certified inspection reports.'
      ],
      photoTag: 'PRODUCTION HALL',
      photoTitle: 'Assembly floor for automated transfer lines and machine tools',
      projectsEyebrow: 'COMPLETED PROJECTS',
      projectsSub: 'Supply Geography',
      projects: [
        {
          code: 'LB0755',
          title: 'Automated Railway Wheelset Line',
          location: 'Magnitogorsk, RU',
          scope: 'Full mechanical processing, boring, and CNC finishing'
        },
        {
          code: 'SB940–SB943',
          title: 'Specialized Multi-Way Machine Tools',
          location: 'Mogilev, BY',
          scope: 'Multi-station precision machining of diesel engine blocks'
        },
        {
          code: 'SB902',
          title: 'Specialized Rail Bogie Machining Center',
          location: 'Kanash, RU',
          scope: 'High-precision machining of rolling stock bogie frames'
        },
        {
          code: 'C1304 & SB881',
          title: 'Heavy-Duty Machine Tools',
          location: 'Yaroslavl / Novouralsk',
          scope: 'Precision grinding and turning of heavy shafts and axles'
        }
      ],
      clientsTitle: 'EQUIPMENT AND COMPONENTS OPERATING AT MAJOR ENTERPRISES:',
      clients: [
        { name: 'MAZ', desc: 'Minsk Automobile Plant' },
        { name: 'MTZ', desc: 'Minsk Tractor Works' },
        { name: 'KAMAZ', desc: 'Kama Automobile Plant' },
        { name: 'GAZ', desc: 'Gorky Automobile Plant' },
        { name: 'VAZ', desc: 'Volga Automobile Plant' },
        { name: 'RZD', desc: 'Russian Railways' },
        { name: 'BC', desc: 'Belarusian Railway' },
        { name: 'BELAZ', desc: 'Belarusian Autoworks' },
      ]
    },
    services: {
      eyebrow: 'MANUFACTURING COMPETENCIES',
      title: 'TURNKEY INDUSTRIAL ENGINEERING SERVICES',
      subtitle: 'Engaging top-tier specialists at every stage of the product lifecycle — from initial concept to high-volume production.',
      unitCodeLabel: 'Division code:',
      operationsTitle: 'CAPABILITIES & OPERATIONS:',
      auditCta: 'Request engineering audit',
      guaranteeTitle: 'Direct Plant Warranty',
      guaranteeDesc: 'Full QC inspection certificates provided with each batch',
      otcBadge: '100% QC',
    },
    equipment: {
      eyebrow: 'MACHINERY & CAPACITY',
      title: 'MACHINE PARK & PRECISION METALWORKING CAPABILITIES',
      subtitle: 'Versatile, heavy-duty, and multi-axis CNC machine park suited for large-format and complex housing parts.',
      workZoneLabel: 'Work envelope:',
      bannerEyebrow: 'ADDITIONAL IN-HOUSE FACILITIES',
      bannerTitle: 'Foundry, Heat Treatment, Plating & Powder Coating',
      bannerDesc: 'In addition to precision CNC machining, JSC "BZAL" operates cast iron and steel foundry units, induction and deep-hardening heat treatment, electroplating, zinc passivation, and industrial painting.',
      bannerCta: 'Request machine specifications',
    },
    comparison: {
      eyebrow: 'ECONOMIC ADVANTAGE',
      title: 'TECHNOPARK JSC "BZAL" VS INTERMEDIARY BROKERS',
      subtitle: 'Compare real facts and eliminate hidden markups, delivery delays, and quality risks.',
      colCriterion: 'Evaluation Criterion',
      colBzal: 'Technopark JSC "BZAL"',
      colBrokers: 'Intermediary Brokers / Trading Agencies',
      directContractNote: 'Direct enterprise contract executed with JSC "BZAL" with no middle parties',
      ctaLink: 'Calculate your savings from your brief →',
    },
    process: {
      eyebrow: 'TRANSPARENT PIPELINE',
      title: 'FROM DRAWING TO FINISHED BATCH IN 4 STRUCTURED STEPS',
      subtitle: 'Strict turnaround times, milestone quality gates, and a dedicated lead project engineer.',
      durationLabel: 'Lead time:',
      resultLabel: 'Step milestone deliverable:',
    },
    calculator: {
      eyebrow: 'ONLINE RFQ CALCULATOR',
      title: 'RAPID ENGINEERING & MANUFACTURING COST ESTIMATOR',
      subtitle: 'Select your task requirements — our process engineering team will review technical inputs and provide estimates within 24 hours.',
      step1Label: '1. SELECT REQUIRED SERVICE / COMPETENCY:',
      serviceOptions: [
        'Precision Multi-Axis CNC Machining',
        'Mechanical Design & CAD Drafting (R&D)',
        'Reverse Engineering of Imported Machinery Parts',
        'Process Planning & CAM Programming (Tooling)',
        'Serial Contract Assembly & Manufacturing',
        'Industrial Floor Space Leasing in Technopark',
      ],
      step2Label: '2. INITIAL TECHNICAL DATA AVAILABILITY:',
      drawingOptions: [
        '3D CAD Models Available (STEP, IGES, Parasolid)',
        '2D Drawings Available (PDF, DWG, DXF)',
        'Only Physical Sample Available',
        'Only Conceptual Functional Brief Available',
      ],
      step3Label: '3. WORKPIECE MATERIAL:',
      materialOptions: [
        'Carbon & Structural Steel (AISI 1045, 4140, etc.)',
        'Stainless Steel (AISI 304, 316, 321)',
        'Non-Ferrous Metals (Alloy Aluminum, Brass, Bronze)',
        'Gray & Ductile Cast Iron (GG20, GGG50)',
        'Heat-Resistant & Tool Tooling Steels',
      ],
      step4Label: '4. PLANNED BATCH VOLUME:',
      quantityOptions: [
        'Single Prototype (1–5 pcs)',
        'Pilot Batch (10–100 pcs)',
        'Medium Series (100–1,000 pcs)',
        'High-Volume Serial (1,000+ pcs/month)',
      ],
      step5Label: '5. ATTACH DRAWINGS OR BRIEF (PDF, STEP, DWG, ZIP):',
      uploadTitle: 'Click to browse files or drag and drop here',
      uploadFormats: 'Supports PDF, STEP, DWG, IGES, ZIP up to 50 MB',
      rightCardTitle: '24-HOUR ESTIMATION',
      rightCardBadge: 'DIRECT PRICING',
      rightCardDesc: 'Fill in your engineering contact details to receive an official commercial proposal with machine-hour breakdowns from JSC "BZAL".',
      fieldName: 'Your Name & Title *',
      fieldNamePlaceholder: 'John Doe, Lead Process Engineer',
      fieldCompany: 'Company / Enterprise *',
      fieldCompanyPlaceholder: 'Heavy Machinery Corp.',
      fieldPhone: 'Phone Number *',
      fieldPhonePlaceholder: '+1 (555) 000-0000',
      fieldEmail: 'Corporate Email *',
      fieldEmailPlaceholder: 'tech@company.com',
      fieldComments: 'Project Notes (Optional)',
      fieldCommentsPlaceholder: 'Heat treatment, surface roughness, or specific delivery deadlines',
      submitBtn: 'Request RFQ Cost Analysis',
      turnaroundNote: 'Engineering review turnaround within 24 hours',
      confNote: 'Full NDA and commercial confidentiality guaranteed',
      successTitle: 'RFQ Successfully Received by JSC "BZAL"',
      successDesc: 'Our engineering divisions have queued your task for technical assessment. A lead project engineer will contact you within 24 hours.',
      successParamsTitle: 'Parameters of your submission:',
      newReqBtn: 'Submit another inquiry',
    },
    contacts: {
      eyebrow: 'SALES & MARKETING DIVISION',
      title: 'DISCUSS YOUR PROJECT WITH SENIOR ENGINEERS',
      subtitle: 'Send your drawings, sketches, or technical briefs for rapid evaluation. Our engineering team is ready to assist.',
      cardDepartment: 'TECHNOPARK JSC "BZAL" • SALES & MARKETING DIVISION',
      phoneEngineerLabel: 'Direct Line / Lead Engineer:',
      phoneFaxLabel: 'Tel./Fax:',
      phoneMarketLabel: 'Marketing:',
      emailLabel: 'Email:',
      emailDesc: 'For drawings, briefs, and RFQ specifications',
      addressLabel: 'Manufacturing Plant Address:',
      addressVal: '8 Korolika Str., 225410, Baranovichi, Republic of Belarus',
      hoursLabel: 'Working Hours:',
      hoursTime: 'Monday — Friday: 08:00 – 16:45',
      hoursTimezone: '(UTC+3 / Moscow / Minsk time)',
      sendDrawingBtn: 'Send Drawing for Audit',
      mainPortalBtn: 'Main Portal www.bzal.by',
      logisticsTitle: 'TRANSPORT ACCESS & LOGISTICS:',
      logisticsDesc: 'The plant is located 3 km from the M1 international highway (Brest — Minsk — Moscow). Operational on-site railway spurs run directly into the manufacturing halls, enabling seamless dispatch of oversize machine tools, transfer lines, and heavy structural assemblies.',
      photoTag: 'OFFICIAL PRODUCTION COMPLEX',
      photoPlant: 'Baranovichi, 8 Korolika Str.',
      photoHalls: 'Dedicated industrial complex over 30,000+ m²',
      coordinatesLabel: 'Main Gate GPS Coordinates:',
      visitNote: 'On-site technical audit of the machinery park and metrology laboratory is available for client engineering delegations.',
    },
    footer: {
      desc: 'Specialized machine tool building, CAD/CAM engineering services (OGK / OGT), contract precision metalworking, and heavy mechanical manufacturing since 1974.',
      isoCert: 'Quality Management System certified according to ISO 9001:2015.',
      sectionsTitle: 'NAVIGATION:',
      reqTitle: 'REQUISITES & CONTACT:',
      salesDept: '(Sales Division)',
      faxDept: '(Fax / Marketing)',
      unpLabel: 'Tax ID: UNP 200166848 • OKPO 00223254',
      allRightsReserved: 'JSC "BZAL". Machine tool engineering technopark. All rights reserved.',
      portalLink: 'Official portal www.bzal.by',
      servicesLink: 'bzal-uslugi.by',
    },
    modal: {
      badge: 'TECHNOPARK JSC BZAL',
      title: 'Rapid Quote for Drawings & Specs',
      subtitle: 'Preliminary DFM audit and cost estimate turnaround within 24 hours direct from the plant.',
      serviceLabel: 'Scope of work:',
      serviceOptions: [
        'Multi-Axis CNC Machining',
        'CAD Design & Drafting (R&D)',
        'Process Tooling & CAM Programming',
        'Reverse Engineering of Machinery Parts',
        'Serial Contract Assembly & Manufacturing',
        'Technopark Industrial Space Leasing',
      ],
      nameLabel: 'Your Name *',
      namePlaceholder: 'John Doe',
      companyLabel: 'Company / Organization *',
      companyPlaceholder: 'Manufacturing Corp.',
      phoneLabel: 'Phone *',
      phonePlaceholder: '+1 234 567 8900',
      emailLabel: 'Email for Proposal *',
      emailPlaceholder: 'procurement@company.com',
      commentLabel: 'Technical Details / Scope',
      commentPlaceholder: 'Material, batch quantity, tolerances, requirements...',
      attachLabel: 'Attach Drawing (PDF, STEP, DWG)',
      chooseFileLabel: 'Select drawing files',
      filesCountLabel: 'Files selected:',
      submitBtn: 'Submit to Engineering Team',
      note: 'Response within 24 hours • Direct contract with JSC "BZAL"',
      successTitle: 'Inquiry Received by JSC "BZAL"',
      successDesc: 'Thank you! Your request has been registered. Our lead engineering team will review the parameters and get in touch within 24 hours.',
      closeBtn: 'Close Window',
    }
  },

  zh: {
    brand: {
      name: '科技园区',
      subname: 'BZAL股份公司',
      fullName: '巴拉诺维奇自动线厂开放式股份公司',
      slogan: '工业工程设计 • 机床制造 • 金属加工',
      address: '白俄罗斯共和国巴拉诺维奇市科罗利卡街8号',
      phone: '+375 44 751 44 77',
      phoneRaw: '+375447514477',
      phoneFax: '+375 (163) 67-20-48',
      phoneMarket: '+375 (163) 67-20-41',
      email: 'bzal_market@mail.ru',
      website: 'www.bzal.by',
      workingHours: '周一至周五: 08:00 – 16:45 (UTC+3)',
      since: '始于1974年',
      btnRfq: '技术询价',
    },
    nav: [
      { id: 'about', label: '关于园区', href: '#about' },
      { id: 'parts', label: '零件图录', href: '#parts' },
      { id: 'services', label: '专业能力', href: '#services' },
      { id: 'equipment', label: '加工设备', href: '#equipment' },
      { id: 'quality', label: '质检计量', href: '#quality' },
      { id: 'eaeu', label: '欧亚联盟物流', href: '#eaeu' },
      { id: 'calculator', label: '询价计算', href: '#calculator' },
      { id: 'contacts', label: '联系我们', href: '#contacts' },
    ],
    hero: {
      badge: '全流程重工科技园区',
      sinceTag: '始于1974年',
      titleHighlight: '工程解决方案',
      titleRest: '赋能核心重工业',
      sloganTitle: '«为您专属量身研制的专用机床与自动化线»',
      sloganDesc: '依托大型机床工业综合体完备体系：总设计师部(CAD)、工艺技术部(CAM)、铸造下料与高精数控机加工，精度达0.005毫米，厂房面积超30,000平方米。24小时内由厂家直接出具详尽技术方案与明细核算。',
      primaryCta: '24小时极速方案报价 ↗',
      secondaryCta: '查看加工机床设备 ↓',
      salesLeadLabel: '商务与总师热线：',
      trustBadges: [
        'ISO 9001:2015 质量体系',
        '厂内专业质检中心',
        '严格执行国家标准',
        '直签大厂供货合同',
      ],
      billboardTag: 'BZAL科技园区',
      billboardPrecision: '±0.005 毫米',
      billboardEyebrow: '重工制造实力',
      billboardTitle: '为各大主机厂与铁路机车提供自动化产线与专用机床',
      stats: [
        { value: '30,000+ m²', label: '自主独立重工生产车间' },
        { value: '380+', label: '已研制交付全自动生产流水线' },
        { value: '8,000+', label: '专用及组合机床交付使用' },
        { value: '50+年', label: '深厚重工机床制造底蕴 (1974)' },
      ],
      plantLocationTag: 'BZAL股份公司 • 巴拉诺维奇',
      certTag: 'ISO 9001:2015',
    },
    about: {
      eyebrow: '企业底蕴与制造实力',
      title: '深耕机床制造与重工领域逾50载',
      lead: 'BZAL科技园区依托巴拉诺维奇自动线厂设立。作为著名机床工业龙头，长期为大型汽车、工程机械与重工业骨干企业研制专用机床和全自动生产线。',
      quote: '“依托优良质量传统与持续技术创新，打造超越行业标准的专用设备与精密构件。”',
      quoteAuthor: 'BZAL股份公司领导层',
      quoteBadge: '创立于1974年3月14日',
      desc2: '如今，科技园区融合资深工程师团队与现代化多轴数控加工中心。承接从进口零部件逆向研发替代到大批量机械零部件合同制造的各类工程挑战。',
      bulletTitle: '源头大厂核心优势：',
      bullets: [
        '完备基础设施：铸造、下料、重型机械加工及组装车间齐备。',
        '雄厚的总设计师部与工艺技术部，具备复杂非标机械研发制造经验。',
        '高配自备变电站、专用铁路支线及20吨重型行吊起重能力。',
        '国有控股股份公司资质，出具权威产品质量证明书并提供正规质保。'
      ],
      photoTag: '重型装配车间',
      photoTitle: '自动化线与大型组合机床组装调试大厅',
      projectsEyebrow: '重点实施工程',
      projectsSub: '全球供货业绩',
      projects: [
        {
          code: 'LB0755',
          title: '铁路车轮全自动加工成套流水线',
          location: '俄罗斯马格尼托哥尔斯克',
          scope: '车轮粗精机加工、镗孔与数控车削全工序成套流水线'
        },
        {
          code: 'SB940–SB943',
          title: '发动机箱体高精多工位组合机床',
          location: '白俄罗斯莫吉廖夫',
          scope: '大型柴油机机体及核心铸件的多工位精密加工'
        },
        {
          code: 'SB902',
          title: '铁路转向架关键结构件专用加工机床',
          location: '俄罗斯卡纳什',
          scope: '铁路货运机车车辆转向架承载件的高精度加工'
        },
        {
          code: 'C1304 & SB881',
          title: '重型工业轴类高精磨削与车削机床',
          location: '雅罗斯拉夫尔 / 新乌拉尔斯克',
          scope: '重载长轴件、传动轴的高精度车磨加工'
        }
      ],
      clientsTitle: 'BZAL设备与零部件广泛运行于各大骨干工业企业：',
      clients: [
        { name: 'MAZ', desc: '明斯克汽车厂' },
        { name: 'MTZ', desc: '明斯克拖拉机厂' },
        { name: 'KAMAZ', desc: '卡玛斯重卡集团' },
        { name: 'GAZ', desc: '高尔基汽车厂' },
        { name: 'VAZ', desc: '伏尔加汽车厂' },
        { name: 'RZD', desc: '俄罗斯国家铁路' },
        { name: 'BC', desc: '白俄罗斯国家铁路' },
        { name: 'BELAZ', desc: '别拉斯重型矿卡厂' },
      ]
    },
    services: {
      eyebrow: '技术与加工服务',
      title: '一站式交钥匙工业工程服务',
      subtitle: '在产品全生命周期各环节提供资深工程支持 — 从前期方案构想到高精度批量交付。',
      unitCodeLabel: '部门编码：',
      operationsTitle: '专业加工与服务范围：',
      auditCta: '申请对应专业技术评估',
      guaranteeTitle: '原厂质量承保',
      guaranteeDesc: '每批次零件均附具质检中心出厂检验合格单',
      otcBadge: '100% 质检',
    },
    equipment: {
      eyebrow: '机床与制造实力',
      title: '数控加工机床与精密生产能力',
      subtitle: '通用与高精度数控机床门类齐全，专长于大型复杂箱体件与异形件加工。',
      workZoneLabel: '加工行程规格：',
      bannerEyebrow: '厂区综合配套制造能力',
      bannerTitle: '铸造、热处理、表面电镀与喷塑车间',
      bannerDesc: '除高精密机加工外，BZAL厂区内设有大型铸铁与铸钢车间、整体淬火及高频感应热处理、化学发黑、镀锌钝化及专业静电粉末喷涂流水线。',
      bannerCta: '索取设备技术参数表',
    },
    comparison: {
      eyebrow: '经济性与可靠性',
      title: '选择BZAL科技园区与普通贸易中介的对比',
      subtitle: '用客观事实说话，避免暗藏溢价、工期延误和产品质量缺陷。',
      colCriterion: '评估对比项目',
      colBzal: 'BZAL科技园区大厂直供',
      colBrokers: '贸易中介 / 外部代理公司',
      directContractNote: '直接与BZAL股份公司签署正式供货合同，无任何第三方转手',
      ctaLink: '核算您的技术要求节省成本 →',
    },
    process: {
      eyebrow: '规范透明工作流程',
      title: '4步规范流程：从图纸到成品验收交付',
      subtitle: '严守交期节点，全程质量受控，专属工程师跟进沟通。',
      durationLabel: '周期：',
      resultLabel: '阶段交付物：',
    },
    calculator: {
      eyebrow: '在线需求计算器',
      title: '工艺准备与制造成本快速测算',
      subtitle: '请选择您的需求参数 — 我们的工艺工程师将在24小时内为您审核技术方案并提供明细报价。',
      step1Label: '1. 请选择所需工程与加工服务类别：',
      serviceOptions: [
        '多轴联动精密数控机加工',
        '机械设计与工程施工图编制 (总设计师部)',
        '进口重大设备关键零部件逆向测绘研发',
        '加工工艺设计与CAM数控编程 (总工艺部)',
        '成套机械机构合同制造与整机代工组装',
        '科技园区工业标准重型厂房场地租赁',
      ],
      step2Label: '2. 初始工程技术资料完备情况：',
      drawingOptions: [
        '有现成3D模型 (STEP, IGES, Parasolid)',
        '有完整2D图纸 (PDF, DWG, DXF)',
        '仅有实物零部件样品 (需逆向测绘)',
        '仅有文字技术任务书或采购功能描述',
      ],
      step3Label: '3. 零件原材料材质类别：',
      materialOptions: [
        '优质碳素钢及合金结构钢 (45, 40Cr等)',
        '奥氏体及马氏体不锈钢 (304, 316等)',
        '有色金属材料 (航空铝合金, 黄铜, 青铜)',
        '灰铸铁与球墨铸铁 (HT200, QT500等)',
        '特种耐热钢及工模具工具钢',
      ],
      step4Label: '4. 计划加工订单批量规模：',
      quantityOptions: [
        '单件试制首件样品 (1–5件)',
        '小批量打样试产 (10–100件)',
        '中批量规模生产 (100–1,000件)',
        '大批量持续供货 (1,000件以上/月)',
      ],
      step5Label: '5. 上传工程图纸或技术要求 (PDF, STEP, DWG, ZIP)：',
      uploadTitle: '点击选择图纸文件或将文件拖曳至此',
      uploadFormats: '支持 PDF, STEP, DWG, IGES, ZIP 格式，文件上限 50 MB',
      rightCardTitle: '24小时极速方案核算',
      rightCardBadge: '直供零差价',
      rightCardDesc: '请填写技术负责人员联系方式，BZAL工程部将为您出具包含工时定额明细的正式商务技术建议书。',
      fieldName: '姓名及职务 *',
      fieldNamePlaceholder: '张工，技术总监',
      fieldCompany: '公司 / 工厂名称 *',
      fieldCompanyPlaceholder: '重型装备制造集团',
      fieldPhone: '联系电话 *',
      fieldPhonePlaceholder: '+86 138 0000 0000',
      fieldEmail: '企业工作邮箱 *',
      fieldEmailPlaceholder: 'procurement@factory.com',
      fieldComments: '技术要求补充说明 (选填)',
      fieldCommentsPlaceholder: '热处理硬度、表面光洁度或特定交付时限要求',
      submitBtn: '提交申请24小时技术核算',
      turnaroundNote: '总设计师部与工艺部联合24小时内答复',
      confNote: '严格遵守商业保密原则并可签署NDA保密协议',
      successTitle: '您的技术询价已成功提交至BZAL工厂',
      successDesc: '总设计师部与总工艺部已排入工艺分析流程。专属项目工程师将在24小时内与您沟通技术细节并提供正式方案报价。',
      successParamsTitle: '您的询价参数汇总：',
      newReqBtn: '再次提交其他需求',
    },
    contacts: {
      eyebrow: '市场营销与商务部',
      title: '与资深工程师直接对接您的项目',
      subtitle: '欢迎发送图纸、样品或技术要求。我们将在最短时间内与您确认技术参数并跟进方案。',
      cardDepartment: 'BZAL科技园区 • 市场销售与商务处',
      phoneEngineerLabel: '值班主任工程师 / 商务直线：',
      phoneFaxLabel: '电话 / 传真：',
      phoneMarketLabel: '市场部：',
      emailLabel: '商务联系邮箱：',
      emailDesc: '用于图纸发送、技术协议及技术参数确认',
      addressLabel: '工厂实际地址：',
      addressVal: '白俄罗斯共和国布列斯特州巴拉诺维奇市科罗利卡街8号，邮编 225410',
      hoursLabel: '工作时间：',
      hoursTime: '周一至周五: 08:00 – 16:45',
      hoursTimezone: '(莫斯科 / 明斯克时区 UTC+3)',
      sendDrawingBtn: '发送图纸申请技术评估',
      mainPortalBtn: '访问总厂官网 www.bzal.by',
      logisticsTitle: '交通区位与重工物流优势：',
      logisticsDesc: '工厂紧邻白俄罗斯M1国际高速公路(布列斯特—明斯克—莫斯科)，车程仅3公里。厂区内自备的标准规矩铁路专用支线直通生产车间内部，可直接使用铁路敞车和重型平板车装运超限机床、自动化产线和大型重工业构件。',
      photoTag: '正规重型工业基地',
      photoPlant: '巴拉诺维奇，科罗利卡街8号',
      photoHalls: '30,000+平方米自营工业厂房',
      coordinatesLabel: '正门门岗全球GPS坐标：',
      visitNote: '热忱欢迎海内外客户技术专家代表团莅临厂区进行实地技术考察与机床加工能力验证。',
    },
    footer: {
      desc: '始于1974年，深耕专用机床研发制造、机械结构设计(CAD)、工艺编制(CAM)、高精密合同机加工及成套重型机械装备组装。',
      isoCert: '质量管理体系通过 ISO 9001:2015 国际标准认证。',
      sectionsTitle: '网站导航：',
      reqTitle: '企业资质与联系：',
      salesDept: '(商务部)',
      faxDept: '(传真 / 市场)',
      unpLabel: '税号 UNP: 200166848 • OKPO: 00223254',
      allRightsReserved: 'BZAL开放式股份公司。机床制造科技园区。版权所有。',
      portalLink: '总厂官方网站 www.bzal.by',
      servicesLink: 'bzal-uslugi.by 服务站',
    },
    modal: {
      badge: 'BZAL科技园区',
      title: '图纸与技术要求快速核算',
      subtitle: '24小时内由源头大厂出具加工可行性评估与成本报价明细。',
      serviceLabel: '工程服务方向：',
      serviceOptions: [
        '多轴联动精密数控机加工',
        '图纸设计与工程图纸编制 (总设计师部)',
        '工艺准备与数控编程 (总工艺部)',
        '进口零部件逆向工程研发',
        '成套装备合同制造代工',
        '科技园区工业标准厂房租赁',
      ],
      nameLabel: '您的姓名 *',
      namePlaceholder: '张先生',
      companyLabel: '单位 / 工厂名称 *',
      companyPlaceholder: '工业制造企业',
      phoneLabel: '联系电话 *',
      phonePlaceholder: '+86 138 0000 0000',
      emailLabel: '接收方案邮箱 *',
      emailPlaceholder: 'procurement@company.com',
      commentLabel: '加工要求简述',
      commentPlaceholder: '材质、批次数量、公差精度等关键要求...',
      attachLabel: '上传图纸 (PDF, STEP, DWG)',
      chooseFileLabel: '选取图纸文件',
      filesCountLabel: '已选文件数：',
      submitBtn: '提交总工程师审核',
      note: '24小时内答复 • 直接与BZAL总厂签署正式供货合同',
      successTitle: '技术需求已成功送达BZAL',
      successDesc: '感谢您的垂询！我们已登记您的需求。值班主任工程师将在24小时内与您联系。',
      closeBtn: '关闭窗口',
    }
  }
};

export const competencyTabs: Record<'ru' | 'en' | 'zh', CompetencyTab[]> = {
  ru: [
    {
      id: 'ogk',
      code: 'ОГК',
      title: 'Конструкторское бюро (ОГК)',
      badge: 'РАЗРАБОТКА И АДАПТАЦИЯ КД',
      shortDesc: 'Проектирование машин, узлов и специальной технологической оснастки по ЕСКД.',
      fullDesc: 'Отдел главного конструктора (ОГК) ОАО «БЗАЛ» обладает более чем 50-летним опытом разработки специального металлорежущего оборудования, автоматических линий и нестандартной оснастки. Мы создаем 3D-модели, выполняем статические и динамические расчеты и выпускаем исчерпывающую документацию.',
      features: [
        'Проектирование с нуля по техническому заданию заказчика',
        'Реверс-инжиниринг и импортозамещение зарубежных компонентов и узлов',
        'Компьютерное 3D-моделирование (CAD) и прочностной анализ (FEA/CAE)',
        'Оформление рабочей конструкторской документации строго по ЕСКД',
        'Разработка штампов, пресс-форм и станочной оснастки'
      ],
      specs: [
        { label: 'Стандарты разработки', value: 'ЕСКД, ГОСТ, ISO' },
        { label: 'Инженерное ПО', value: 'Компас-3D, SolidWorks, NX' },
        { label: 'Срок аудита ТЗ', value: 'от 24 часов' },
        { label: 'Инженерный штат', value: '25+ конструкторов I и высшей кат.' }
      ],
      image: '/images/bzal_wheel_sparks.jpg',
      accentQuote: 'От концепта до проверенной КД, готовой к запуску в производство без доработок.'
    },
    {
      id: 'ogt',
      code: 'ОГТ',
      title: 'Технологический отдел (ОГТ)',
      badge: 'ПОДГОТОВКА И ЧПУ-ПРОГРАММИРОВАНИЕ',
      shortDesc: 'Разработка маршрутно-операционных карт, САМ-программ и технологических циклов.',
      fullDesc: 'Отдел главного технолога обеспечивает бесшовный переход от чертежа к реальной обработке на станке. Наши технологи оптимизируют траектории резания, подбирают режущий инструмент ведущих мировых марок и снижают машинное время без потери точности.',
      features: [
        'Разработка пооперационных технологических процессов (ЕСТД)',
        'Написание и верификация управляющих программ для станков с ЧПУ (Siemens, Fanuc, Heidenhain)',
        'Подбор режимов резания и расчет себестоимости деталей',
        'Проектирование специального режущего и мерительного инструмента',
        'Отработка деталей на технологичность для снижения стоимости серии'
      ],
      specs: [
        { label: 'САМ-системы', value: 'Mastercam, ESPRIT, PowerMill' },
        { label: 'Стойки ЧПУ', value: 'Fanuc, Siemens Sinumerik, NC' },
        { label: 'Оптимизация цикла', value: 'до 30% экономии времени' },
        { label: 'Поддержка цеха', value: 'Непосредственный контроль технолога' }
      ],
      image: '/images/bzal_lathe.jpg',
      accentQuote: 'Исключаем брак на этапе симуляции еще до первого касания фрезой заготовки.'
    },
    {
      id: 'machining',
      code: 'МЕХОБРАБОТКА',
      title: 'Высокоточная металлообработка',
      badge: 'СТАНКИ С ЧПУ И КРУПНЫЙ ГАБАРИТ',
      shortDesc: 'Токарная, фрезерная, расточная и шлифовальная обработка деталей весом до 5 тонн.',
      fullDesc: 'Собственный парк современных обрабатывающих центров и тяжелых универсальных станков позволяет изготавливать детали с допусками до 0,005 мм. Обрабатываем любые стали, жаропрочные сплавы, чугуны и цветные металлы.',
      features: [
        '3- и 4-осевая фрезерная обработка корпусных и сложных пространственных деталей',
        'Токарно-револьверная обработка тел вращения с приводным инструментом',
        'Горизонтально-расточные операции на крупногабаритных станинах и корпусах',
        'Координатная, круглая и плоская шлифовка высокой чистоты поверхности (Ra 0,4–0,1)',
        'Термическая обработка: объемная закалка, ТВЧ, цементация, азотирование'
      ],
      specs: [
        { label: 'Макс. габариты детали', value: 'до 3000 × 1600 × 1200 мм' },
        { label: 'Макс. вес заготовки', value: 'до 5 000 кг' },
        { label: 'Точность позиционирования', value: 'до 0,005 мм' },
        { label: 'Контроль геометрии', value: 'КИМ и поверенный инструмент ОТК' }
      ],
      image: '/images/bzal_gears.jpg',
      accentQuote: 'От прецизионных шпиндельных пар до тяжелых сварно-литых станин станков.'
    },
    {
      id: 'contract',
      code: 'СЕРИЯ',
      title: 'Контрактное производство и сборка',
      badge: 'ПОЛНЫЙ ЦИКЛ OEM/ODM',
      shortDesc: 'Серийный выпуск узлов, механизмов, агрегатов и автоматических станочных линий.',
      fullDesc: 'ОАО «БЗАЛ» берет на себя роль комплексного производственного подрядчика. Мы закупаем сертифицированный металлопрокат, изготавливаем детали, выполняем термообработку, гальванику, слесарно-сборочные работы и стендовые испытания.',
      features: [
        'Мелкосерийное и серийное контрактное производство по чертежам заказчика',
        'Узловая и агрегатная сборка механических, гидравлических и пневмосистем',
        'Электромонтаж шкафов управления, подключение датчиков и ПЛК',
        'Стендовые приемо-сдаточные испытания с оформлением паспорта ОТК',
        'Шеф-монтаж, пусконаладочные работы (ПНР) на площадке заказчика'
      ],
      specs: [
        { label: 'Формат работы', value: 'OEM (по чертежам) / ODM (разработка под ключ)' },
        { label: 'Партии', value: 'от 1 шт. до 10 000+ шт./мес.' },
        { label: 'Гарантия', value: 'от 12 до 24 месяцев' },
        { label: 'Доставка', value: 'Самовывоз / Ж/Д / Транспортные компании' }
      ],
      image: '/images/bzal_lines.jpg',
      accentQuote: 'Ваш надежный производственный цех в Беларуси с безупречной репутацией.'
    },
    {
      id: 'residency',
      code: 'ТЕХНОПАРК',
      title: 'Площади и инфраструктура Технопарка',
      badge: 'ПЛОЩАДКИ ДЛЯ РЕЗИДЕНТОВ',
      shortDesc: 'Аренда оборудованных производственных цехов с мощными коммуникациями.',
      fullDesc: 'Технопарк ОАО «БЗАЛ» предоставляет площади для промышленных резидентов, технологических стартапов и смежных производств. Готовая инженерная инфраструктура, льготные условия и кооперация с основным заводом.',
      features: [
        'Производственные площади от 200 до 15 000 м² с высотой потолков до 12 м',
        'Действующие кран-балки и мостовые краны грузоподъемностью 5, 10 и 20 тонн',
        'Выделенные электрические мощности (собственные ТП, мегаватты мощности)',
        'Прямое железнодорожное полотно, заходящее прямо в цеха завода',
        'Возможность загрузки оборудования резидентов заводскими заказами'
      ],
      specs: [
        { label: 'Общая территория', value: 'Более 15 гектаров' },
        { label: 'Электроснабжение', value: 'I и II категории надежности' },
        { label: 'Охрана', value: 'Круглосуточный КПП, видеонаблюдение' },
        { label: 'Логистика', value: 'Трасса М1 (Брест — Минск — Москва) 3 км' }
      ],
      image: '/images/bzal_sparks.jpg',
      accentQuote: 'Идеальный плацдарм для локализации промышленного производства в СНГ.'
    }
  ],
  en: [
    {
      id: 'ogk',
      code: 'R&D / CAD',
      title: 'Design Bureau (OGK)',
      badge: 'CAD DESIGN & ADAPTATION',
      shortDesc: 'Design of machinery, assemblies, and custom tooling strictly to engineering standards.',
      fullDesc: 'Chief Designer Division (OGK) of JSC "BZAL" holds over 50 years of experience designing specialized metal-cutting equipment, automated transfer lines, and non-standard tooling. We create 3D CAD models, run stress/kinematic simulations, and prepare comprehensive technical packages.',
      features: [
        'Full custom design based on customer specifications (URS/brief)',
        'Reverse engineering and import substitution of complex machinery parts',
        'Advanced 3D modeling and finite element stress analysis (FEA)',
        'Complete manufacturing drawing packages according to standards',
        'Design of dies, stamping molds, and CNC clamping fixtures'
      ],
      specs: [
        { label: 'Standards', value: 'ISO, GOST, DIN' },
        { label: 'CAD Platforms', value: 'SolidWorks, Siemens NX, Kompas-3D' },
        { label: 'Audit Turnaround', value: 'from 24 hours' },
        { label: 'Design Staff', value: '25+ Senior Mechanical Engineers' }
      ],
      image: '/images/bzal_wheel_sparks.jpg',
      accentQuote: 'From concept to validated drawings ready for immediate machining without rework.'
    },
    {
      id: 'ogt',
      code: 'CAM / TOOLING',
      title: 'Process Engineering Department (OGT)',
      badge: 'TOOLING & CNC PROGRAMMING',
      shortDesc: 'Development of manufacturing routes, CAM programs, and automated machining cycles.',
      fullDesc: 'The Chief Process Engineer Department ensures a seamless transition from CAD drawings to chip removal. Our manufacturing engineers optimize toolpaths, select high-performance tooling, and reduce cycle times while preserving tight tolerances.',
      features: [
        'Step-by-step manufacturing routing & operation sheets',
        'CNC programming and simulation for Fanuc, Siemens Sinumerik, and Heidenhain controls',
        'Cutting parameter optimization and part cost breakdown analysis',
        'Special cutting tool and inspection gauge engineering',
        'Design for Manufacturability (DFM) reviews to reduce serial costs'
      ],
      specs: [
        { label: 'CAM Software', value: 'Mastercam, PowerMill, ESPRIT' },
        { label: 'CNC Controls', value: 'Fanuc, Siemens, NC' },
        { label: 'Cycle Optimization', value: 'up to 30% time savings' },
        { label: 'Shop Floor Support', value: 'Direct on-site engineering supervision' }
      ],
      image: '/images/bzal_lathe.jpg',
      accentQuote: 'Eliminating scrap in CAM simulation before the cutting tool ever touches the workpiece.'
    },
    {
      id: 'machining',
      code: 'MACHINING',
      title: 'Precision Metalworking & CNC',
      badge: 'HEAVY-DUTY & MULTI-AXIS CNC',
      shortDesc: 'Turning, milling, boring, and surface grinding for components weighing up to 5 metric tons.',
      fullDesc: 'Our dedicated machine park of modern multi-axis machining centers and heavy universal machine tools delivers tolerances down to 0.005 mm. We machine alloy steels, stainless steel, cast iron, and non-ferrous metals.',
      features: [
        '3-axis and 4-axis milling of complex housing, prismatic, and contoured parts',
        'High-precision turning with live driven tooling for turned/milled parts',
        'Horizontal boring operations for massive machine beds and heavy frames',
        'Coordinate, cylindrical, and surface grinding with superfine Ra 0.4–0.1 finishes',
        'In-house thermal treatment: volume hardening, high-frequency, carburizing'
      ],
      specs: [
        { label: 'Max. Part Dimensions', value: 'up to 3,000 × 1,600 × 1,200 mm' },
        { label: 'Max. Workpiece Weight', value: 'up to 5,000 kg' },
        { label: 'Positioning Accuracy', value: 'down to 0.005 mm' },
        { label: 'Quality Verification', value: 'CMM & calibrated metrology tools' }
      ],
      image: '/images/bzal_gears.jpg',
      accentQuote: 'From micron-grade spindle pairs to heavy cast/welded machine beds.'
    },
    {
      id: 'contract',
      code: 'SERIAL OEM',
      title: 'Contract Manufacturing & Assembly',
      badge: 'FULL-CYCLE OEM/ODM',
      shortDesc: 'Serial production of sub-assemblies, mechanisms, units, and automatic machine lines.',
      fullDesc: 'JSC "BZAL" acts as an integrated manufacturing contractor. We source certified mill materials, machine components, handle thermal/chemical treatments, perform electromechanical assembly, and complete test runs.',
      features: [
        'Pilot and serial contract manufacturing to customer technical drawings',
        'Modular assembly of mechanical, hydraulic, and pneumatic systems',
        'Control cabinet wiring, sensor integration, and PLC programming',
        'Bench testing under load with accredited quality test certificates',
        'Supervised installation and commissioning on the customer site'
      ],
      specs: [
        { label: 'Contract Models', value: 'OEM (Build-to-Print) / ODM (Turnkey)' },
        { label: 'Batch Capacity', value: '1 pc to 10,000+ pcs/month' },
        { label: 'Warranty', value: '12 to 24 months full plant warranty' },
        { label: 'Logistics', value: 'Ex-Works / Direct Rail / International Freight' }
      ],
      image: '/images/bzal_lines.jpg',
      accentQuote: 'Your dependable manufacturing plant in Belarus with established international standing.'
    },
    {
      id: 'residency',
      code: 'TECHNOPARK',
      title: 'Technopark Infrastructure & Spaces',
      badge: 'RESIDENT INDUSTRIAL FLOORS',
      shortDesc: 'Leasing of equipped heavy-duty manufacturing bays with robust power and utilities.',
      fullDesc: 'Technopark JSC "BZAL" provides production spaces for industrial enterprises, tech ventures, and engineering operations. Ready industrial utilities, beneficial rates, and direct supply chain cooperation with the plant.',
      features: [
        'Production spaces from 200 to 15,000 m² with ceiling heights up to 12 m',
        'Operating overhead bridge cranes with 5, 10, and 20-ton capacities',
        'Dedicated high-voltage power substations with multi-megawatt capacities',
        'Dedicated standard railway lines entering directly into the workshops',
        'Possibility to subcontract plant manufacturing orders to resident shops'
      ],
      specs: [
        { label: 'Total Industrial Area', value: 'Over 15 hectares' },
        { label: 'Power Supply', value: 'Dual-feed Category I & II' },
        { label: 'Security', value: '24/7 guarded checkpoint & CCTV' },
        { label: 'Logistics', value: 'Direct access to M1 highway (3 km)' }
      ],
      image: '/images/bzal_sparks.jpg',
      accentQuote: 'An ideal industrial bridgehead for manufacturing localization in the region.'
    }
  ],
  zh: [
    {
      id: 'ogk',
      code: '总设计师部',
      title: '总设计师部 (OGK) 研发中心',
      badge: '图纸设计与工程图纸适配',
      shortDesc: '严格按照工程制图标准设计机械结构、非标零部件与专用工装夹具。',
      fullDesc: 'BZAL股份公司总设计师部拥有50多年专业金属切削机床、自动流水线和非标装备的研发经验。我们创建高精度三维模型，开展力学仿真与动态分析，并交付全套生产图纸。',
      features: [
        '依据客户技术协议与要求从零开展全套机械结构设计',
        '进口重大装备关键零部件逆向工程与国产化替代研发',
        '先进三维CAD实体造型与有限元结构强度分析(FEA)',
        '严格执行国家标准交付详尽加工图纸与装配图',
        '模具、冲压模及专用机加工气动/液压工装夹具设计'
      ],
      specs: [
        { label: '制图标准', value: 'ISO, GOST, DIN' },
        { label: '工程软件', value: 'SolidWorks, Siemens NX, Kompas' },
        { label: '方案审核时效', value: '24小时起' },
        { label: '技术队伍', value: '25+位资深机械主任设计工程师' }
      ],
      image: '/images/bzal_wheel_sparks.jpg',
      accentQuote: '从产品概念到成熟图纸，无缝衔接车间加工，免除二次修改风险。'
    },
    {
      id: 'ogt',
      code: '总工艺部',
      title: '总工艺部 (OGT) 制造技术室',
      badge: '数控编程与工艺流程设计',
      shortDesc: '制定机械加工工序卡、CAM刀具路径编程与高效切削工艺流程。',
      fullDesc: '总工艺部实现图纸到切削加工的无缝转化。我们的工艺工程师针对复杂构件优化刀轨路径，选用高品质刀具，在保证严苛公差前提下显著缩减单件加工节拍。',
      features: [
        '编制详细机械加工工艺卡片与工序流转卡',
        '编写并仿真验证发那科(Fanuc)、西门子(Siemens)数控加工中心程序',
        '切削参数科学优化与工时材料定额精准核算',
        '非标成形刀具与专用量检具专项设计',
        '零件可制造性(DFM)工程评审，助力大幅压降批量生产成本'
      ],
      specs: [
        { label: 'CAM系统', value: 'Mastercam, PowerMill, ESPRIT' },
        { label: '数控系统', value: 'Fanuc, Siemens Sinumerik' },
        { label: '节拍优化', value: '最高缩减30%单件工时' },
        { label: '车间指导', value: '工艺技术人员常驻车间实地保障' }
      ],
      image: '/images/bzal_lathe.jpg',
      accentQuote: '在电脑仿真阶段彻底消除过切与干涉，保护每一件毛坯工件。'
    },
    {
      id: 'machining',
      code: '精密机加工',
      title: '高精机械加工与数控制造',
      badge: '重型多轴数控联动加工',
      shortDesc: '车削、铣削、镗削与精密磨削，单件承重最高达5吨。',
      fullDesc: '依托现代化数控加工中心与大型重型机床装备，实现最高0.005毫米精准公差。可加工各类合金结构钢、不锈钢、耐热合金、灰铸铁与有色金属。',
      features: [
        '三轴/四轴联动加工箱体件与复杂曲面空间异形零件',
        '带动力刀头车削中心加工精密回转体轴套零部件',
        '重型卧式镗铣床加工大型机架、底座与机床床身',
        '外圆磨、平面磨与坐标磨削，表面粗糙度达Ra 0.4–0.1微米',
        '厂内自备热处理车间：整体淬火、高频感应淬火、渗碳渗氮'
      ],
      specs: [
        { label: '最大加工尺寸', value: '可达 3000 × 1600 × 1200 毫米' },
        { label: '最大工件重量', value: '可达 5,000 公斤' },
        { label: '重复定位精度', value: '可达 0.005 毫米' },
        { label: '质量检测', value: '三坐标测量仪(CMM)与认证计量室' }
      ],
      image: '/images/bzal_gears.jpg',
      accentQuote: '从微米级高精主轴零件，到数吨重的大型铸造焊接机床床身。'
    },
    {
      id: 'contract',
      code: '合同制造',
      title: '合同制造与成套装备组装',
      badge: '一站式OEM/ODM代工服务',
      shortDesc: '成套机械部件、传动机构、专用模块与自动流水线代工组装。',
      fullDesc: 'BZAL股份公司承担综合工业制造总承包商职责。统筹原材料采购、精密机加工、热处理、表面防腐喷涂、整机组装及动态出厂测试。',
      features: [
        '依据客户图纸承接中小批量及连续规模化合同制造',
        '机械传动、液压控制与气动系统成套装配与调试',
        '控制电柜布线、PLC控制逻辑烧录与电气联动测试',
        '出厂前满负荷动静态台架试验，附具正规质检报告与产品合格证',
        '派驻资深技术团队前往客户工厂进行指导安装与联动调试'
      ],
      specs: [
        { label: '代工模式', value: 'OEM (来图加工) / ODM (全案研发代工)' },
        { label: '批次规模', value: '单件试制至10,000+件/月规模化交付' },
        { label: '质保承诺', value: '提供12至24个月原厂质保' },
        { label: '物流运送', value: '厂区直达铁路支线 / 国际公路运输' }
      ],
      image: '/images/bzal_lines.jpg',
      accentQuote: '扎根白俄罗斯的可靠制造基地，信誉卓著，全流程可溯。'
    },
    {
      id: 'residency',
      code: '园区设施',
      title: '科技园区场地与重工基础设施',
      badge: '入驻企业重型工业厂房',
      shortDesc: '租赁配备大吨位行吊、大功率电力的成熟重型工业厂房。',
      fullDesc: 'BZAL科技园区为工业企业、技术型初创企业及配套加工厂提供高标准重型厂房。公用管网完备，享受专项优惠政策，并可与主机大厂直接形成供应链协作。',
      features: [
        '200至15,000平方米标准工业厂房，层高最高达12米',
        '在用5吨、10吨及20吨重型双梁桥式桥吊起重机',
        '兆瓦级双回路独立重型变电站直供充沛工业用电',
        '标准铁路线路直通入厂房内部，重型货运极其便捷',
        '入驻企业可直接承接主机厂的大宗零配件加工订单'
      ],
      specs: [
        { label: '园区占地面积', value: '超过15公顷' },
        { label: '供电保障', value: '一类与二类高可靠性双回路供电' },
        { label: '安保系统', value: '24小时保安值守，全覆盖高清监控' },
        { label: '区位交通', value: '紧邻白俄罗斯M1高速公路(3公里)' }
      ],
      image: '/images/bzal_sparks.jpg',
      accentQuote: '欧亚经济走廊上布局装备制造与本地化生产的理想基地。'
    }
  ]
};

export const equipmentList: Record<'ru' | 'en' | 'zh', EquipmentItem[]> = {
  ru: [
    {
      id: 'eq-1',
      name: '5-осевые и 4-осевые обрабатывающие центры',
      category: 'Фрезерная группа ЧПУ',
      precision: '±0,005 мм',
      capacity: 'Зона обработки до 2000 × 1200 × 1000 мм',
      description: 'Высокоскоростная обработка сложных пространственных корпусов, штампов и турбинных лопаток за один установ.',
      image: '/images/bzal_gears.jpg',
      tags: ['5-осей', 'Высокая точность', 'Корпусные детали']
    },
    {
      id: 'eq-2',
      name: 'Тяжелые горизонтально-расточные станки',
      category: 'Расточная группа',
      precision: '±0,01 мм',
      capacity: 'Стол до 2500 × 2000 мм, нагрузка до 5 000 кг',
      description: 'Точная расточка соосных отверстий и плоскостная фрезеровка массивных литых и сварных станин металлорежущих станков.',
      image: '/images/bzal_lines.jpg',
      tags: ['Крупный габарит', 'Станины до 5 т', 'Соосность']
    },
    {
      id: 'eq-3',
      name: 'Токарно-карусельные и токарные станки с ЧПУ',
      category: 'Токарная группа',
      precision: '±0,008 мм',
      capacity: 'Диаметр обработки до Ø1600 мм, длина до 3000 мм',
      description: 'Обработка тяжелых валов, фланцев, зубчатых колес и колесных пар с возможностью фрезерования и сверления.',
      image: '/images/bzal_wheel_sparks.jpg',
      tags: ['Токарная обработка', 'Валы до 3 м', 'Фланцы Ø1600']
    },
    {
      id: 'eq-4',
      name: 'Координатно-шлифовальные и круглошлифовальные станки',
      category: 'Шлифовальная группа',
      precision: '±0,002 мм',
      capacity: 'Шероховатость до Ra 0,1 мкм',
      description: 'Финишная доводка прецизионных шпиндельных шеек, высокоточных направляющих и калибров.',
      image: '/images/bzal_lathe.jpg',
      tags: ['Суперфиниш', 'Шпиндели', 'Ra 0.1']
    }
  ],
  en: [
    {
      id: 'eq-1',
      name: '5-Axis & 4-Axis CNC Machining Centers',
      category: 'Milling CNC Group',
      precision: '±0.005 mm',
      capacity: 'Travel envelope up to 2,000 × 1,200 × 1,000 mm',
      description: 'High-speed continuous machining of complex spatial housings, stamping dies, and turbine impellers in a single setup.',
      image: '/images/bzal_gears.jpg',
      tags: ['5-Axis', 'Ultra Precision', 'Prismatic Parts']
    },
    {
      id: 'eq-2',
      name: 'Heavy Horizontal Boring Machine Tools',
      category: 'Boring Group',
      precision: '±0.01 mm',
      capacity: 'Table up to 2,500 × 2,000 mm, table load up to 5,000 kg',
      description: 'Precision coaxial hole boring and planar milling of heavy cast iron and welded machine tool beds and frames.',
      image: '/images/bzal_lines.jpg',
      tags: ['Heavy Frame', 'Beds up to 5 tons', 'Coaxial Line Boring']
    },
    {
      id: 'eq-3',
      name: 'CNC Vertical Turning & Heavy Engine Lathes',
      category: 'Turning CNC Group',
      precision: '±0.008 mm',
      capacity: 'Turning diameter up to Ø1,600 mm, length up to 3,000 mm',
      description: 'Machining of heavy rotor shafts, flanges, gear wheels, and railway wheelsets with driven live tooling.',
      image: '/images/bzal_wheel_sparks.jpg',
      tags: ['Turning', 'Shafts up to 3 m', 'Flanges Ø1,600 mm']
    },
    {
      id: 'eq-4',
      name: 'Coordinate & Cylindrical Precision Grinders',
      category: 'Grinding Group',
      precision: '±0.002 mm',
      capacity: 'Surface roughness down to Ra 0.1 µm',
      description: 'Superfinishing of high-precision spindle journals, machine slideways, gauges, and critical bearing surfaces.',
      image: '/images/bzal_lathe.jpg',
      tags: ['Superfinish', 'Spindles', 'Ra 0.1']
    }
  ],
  zh: [
    {
      id: 'eq-1',
      name: '五轴与四轴联动数控加工中心',
      category: '数控铣削机床组',
      precision: '±0.005 毫米',
      capacity: '加工行程最高达 2000 × 1200 × 1000 毫米',
      description: '一次装夹完成复杂空间箱体件、冲压模具及叶轮叶片的高速高精多轴切削。',
      image: '/images/bzal_gears.jpg',
      tags: ['五轴联动', '微米级高精', '复杂箱体件']
    },
    {
      id: 'eq-2',
      name: '重型卧式数控镗铣床',
      category: '精密镗床组',
      precision: '±0.01 毫米',
      capacity: '工作台达 2500 × 2000 毫米，承重最高 5,000 公斤',
      description: '大型铸铁与焊接机床床身、底座与横梁的高精同轴孔系镗削及大平面铣削。',
      image: '/images/bzal_lines.jpg',
      tags: ['重型床身', '承重5吨', '同轴孔系加工']
    },
    {
      id: 'eq-3',
      name: '数控立式车床与重型卧式车削中心',
      category: '数控车削机床组',
      precision: '±0.008 毫米',
      capacity: '最大回转直径 Ø1600 毫米，车削长度达 3000 毫米',
      description: '重载阶梯轴、法兰盘、大齿轮与铁路轮对的车削、铣槽及钻孔复合加工。',
      image: '/images/bzal_wheel_sparks.jpg',
      tags: ['车铣复合', '轴类最长3米', '法兰Ø1600']
    },
    {
      id: 'eq-4',
      name: '高精度坐标磨床与外圆磨床',
      category: '精密磨削机床组',
      precision: '±0.002 毫米',
      capacity: '表面粗糙度达 Ra 0.1 微米',
      description: '高精机床主轴轴颈、精密导轨面、量检具关键表面的超精镜面研磨。',
      image: '/images/bzal_lathe.jpg',
      tags: ['超精研磨', '主轴部件', 'Ra 0.1微米']
    }
  ]
};

export const comparisonData: Record<'ru' | 'en' | 'zh', ComparisonRow[]> = {
  ru: [
    {
      criterion: 'Юридическая форма и ответственность',
      bzalTechnopark: 'Официальный завод ОАО «БЗАЛ» с 50-летней репутацией, прямым договором и гарантией',
      typicalBrokers: 'Фирмы-посредники без собственных производственных активов и оборудования',
      isPositive: true
    },
    {
      criterion: 'Ценообразование и комиссии',
      bzalTechnopark: 'Прямая заводская калькуляция без наценок агентств. Прозрачная смета нормо-часов',
      typicalBrokers: '+25%–50% скрытой комиссии посредника, перекладываемой на плечи заказчика',
      isPositive: true
    },
    {
      criterion: 'Инженерная поддержка (ОГК/ОГТ)',
      bzalTechnopark: '25+ штатных конструкторов и технологов дорабатывают чертежи и оптимизируют стоимость',
      typicalBrokers: 'Нет своих инженеров; любые замечания требуют долгих пересылок третьим лицам',
      isPositive: true
    },
    {
      criterion: 'Контроль качества (ОТК)',
      bzalTechnopark: 'Аттестованная лаборатория ОТК, поверенные измерительные приборы, паспорта качества',
      typicalBrokers: 'Контроль «на глаз» или на стороне случайного субподрядчика без аккредитации',
      isPositive: true
    },
    {
      criterion: 'Производственные масштабы',
      bzalTechnopark: '30 000+ м² цехов, литье, термообработка, гальваника, шлифовка, краны до 20 т',
      typicalBrokers: 'Ограничены возможностями разрозненных мелких мастерских',
      isPositive: true
    },
    {
      criterion: 'Сроки и гарантийные обязательства',
      bzalTechnopark: 'Фиксированные сроки по договору, 12–24 месяца гарантии, сервисный выезд',
      typicalBrokers: 'Регулярные срывы поставок и перекладывание вины на завод-субподрядчик',
      isPositive: true
    }
  ],
  en: [
    {
      criterion: 'Legal Status & Enterprise Accountability',
      bzalTechnopark: 'State Joint-Stock Plant with 50-year heritage, direct corporate warranty and contracts',
      typicalBrokers: 'Third-party trading brokers without physical manufacturing equipment or factories',
      isPositive: true
    },
    {
      criterion: 'Pricing Mechanism & Hidden Fees',
      bzalTechnopark: 'Direct plant calculation with transparent machine-hour rates and no agency markup',
      typicalBrokers: '+25% to 50% hidden intermediary commission added onto the customer bill',
      isPositive: true
    },
    {
      criterion: 'Engineering Support (CAD / CAM)',
      bzalTechnopark: '25+ in-house senior mechanical designers & CAM engineers optimizing part cost',
      typicalBrokers: 'No technical engineering staff; messages relayed through third-party subcontractors',
      isPositive: true
    },
    {
      criterion: 'Quality Control & Metrology (QC)',
      bzalTechnopark: 'Accredited QC laboratory, certified measuring instruments, official test reports',
      typicalBrokers: 'Visual check or uncertified sub-tier inspection without formal accountability',
      isPositive: true
    },
    {
      criterion: 'Manufacturing Footprint & Fleet',
      bzalTechnopark: '30,000+ m² halls, foundry, heat treatment, plating, grinding, 20-ton cranes',
      typicalBrokers: 'Constrained by disjointed small workshops',
      isPositive: true
    },
    {
      criterion: 'Delivery Deadlines & Warranty',
      bzalTechnopark: 'Enforceable contract delivery gates, 12–24 months full warranty coverage',
      typicalBrokers: 'Frequent shipping delays and blame pushed to sub-tier workshops',
      isPositive: true
    }
  ],
  zh: [
    {
      criterion: '法律资质与履约责任',
      bzalTechnopark: '拥有50年历史的国有控股大型股份制企业，直签正规供货合同并提供厂家质保',
      typicalBrokers: '无独立固定资产与生产加工装备的中介贸易公司',
      isPositive: true
    },
    {
      criterion: '定价机制与中间加价',
      bzalTechnopark: '源头大厂直供核算，机加工时费透明公布，零中间差价',
      typicalBrokers: '叠加25%–50%的中间商隐形利润，成本转嫁给最终客户',
      isPositive: true
    },
    {
      criterion: '技术与工艺支持 (CAD/CAM)',
      bzalTechnopark: '25+位全职主任设计师与工艺工程师协助审查优化图纸并降低制造成本',
      typicalBrokers: '缺乏专业技术工程师，图纸沟通依赖外部转包层层传话',
      isPositive: true
    },
    {
      criterion: '质量检验与计量保证 (QC)',
      bzalTechnopark: '资质认证质检中心，经法定校准仪器检测，随货出具权威出厂检验报告',
      typicalBrokers: '肉眼检验或非正规作坊自检，无法提供具有法律效力的质量合格单',
      isPositive: true
    },
    {
      criterion: '重工制造承载能力',
      bzalTechnopark: '30,000+平方米重工车间，下料、铸造、热处理、表面喷涂及20吨吊运齐全',
      typicalBrokers: '受制于分散零散的小加工作坊，难以承接大型复杂构件',
      isPositive: true
    },
    {
      criterion: '交付周期与售后质保',
      bzalTechnopark: '合同明确违约延误条款，提供12至24个月整机/构件质保与工程师售后服务',
      typicalBrokers: '经常延误工期，并将质量纠纷推诿给下游代工小厂',
      isPositive: true
    }
  ]
};

export const processSteps: Record<'ru' | 'en' | 'zh', ProcessStep[]> = {
  ru: [
    {
      step: '01',
      title: 'Входной аудит ТЗ и чертежей',
      subtitle: 'Оценка технической реализуемости за 24 часа',
      desc: 'Вы отправляете чертеж (PDF, DWG, STEP) или словесное ТЗ. Службы ОГК и ОГТ проводят аудит технологичности, рассчитывают трудоемкость и формируют коммерческое предложение с фиксированной стоимостью.',
      department: 'Отдел маркетинга + ОГК + ОГТ',
      duration: '24–48 часов',
      deliverables: ['Техническое заключение', 'Официальное КП со сметой', 'Согласованный график']
    },
    {
      step: '02',
      title: 'Конструкторская проработка (ОГК)',
      subtitle: '3D-моделирование и рабочая КД по ЕСКД',
      desc: 'Конструкторы создают параметрические 3D-модели, проводят прочностные и кинематические расчеты, разрабатывают чертежи специальной оснастки и согласовывают детали с заказчиком.',
      department: 'Конструкторское бюро ОГК',
      duration: '3–10 рабочих дней',
      deliverables: ['Комплект КД со штампом', '3D-модели узлов (STEP/IGES)', 'Паспорт оснастки']
    },
    {
      step: '03',
      title: 'Технологическая подготовка (ОГТ)',
      subtitle: 'Маршрутные карты, CAM-программы и оснастка',
      desc: 'Технологи прописывают пооперационный маршрут, подбирают режущий инструмент, пишут управляющие программы для ЧПУ с полной 3D-симуляцией обработки на станке.',
      department: 'Технологический отдел ОГТ',
      duration: '2–5 рабочих дней',
      deliverables: ['Технологические карты (ЕСТД)', 'Проверенные CAM-программы', 'Инструментальная ведомость']
    },
    {
      step: '04',
      title: 'Изготовление, контроль ОТК и отгрузка',
      subtitle: 'Мехобработка, термообработка и приемочные испытания',
      desc: 'Детали изготавливаются на станках, проходят необходимую термообработку и 100% входной/выходной контроль в заводской лаборатории ОТК. Готовая партия упаковывается с паспортом качества.',
      department: 'Производственные цеха + Лаборатория ОТК',
      duration: 'Строго по договору',
      deliverables: ['Готовое изделие / партия', 'Паспорт качества ОТК', 'Сертификаты на металл']
    }
  ],
  en: [
    {
      step: '01',
      title: 'Input Drawing & Specification Audit',
      subtitle: 'Technical feasibility check in 24 hours',
      desc: 'Submit your CAD file (STEP, DWG, PDF) or functional brief. Our design and process engineering divisions perform DFM analysis, calculate machine hours, and deliver an official quotation with locked-in pricing.',
      department: 'Sales & Marketing + R&D + Tooling',
      duration: '24–48 hours',
      deliverables: ['Feasibility Analysis', 'Official Quotation', 'Project Milestone Timeline']
    },
    {
      step: '02',
      title: 'Detailed Engineering Design (OGK)',
      subtitle: '3D Modeling & Standard Drawing Release',
      desc: 'Senior designers build parametric 3D models, conduct finite-element stress calculations, design custom clamping/stamping tooling, and coordinate engineering approval with the customer.',
      department: 'Design Bureau (OGK)',
      duration: '3–10 business days',
      deliverables: ['Approved Technical Drawings', '3D Assembly Models', 'Tooling Package']
    },
    {
      step: '03',
      title: 'Manufacturing Engineering (OGT)',
      subtitle: 'Route Sheets, CAM Programs & Tooling Prep',
      desc: 'Process engineers establish operation routings, specify cutting inserts, write multi-axis CNC programs, and execute full collision simulations in modern CAM environments.',
      department: 'Process Engineering (OGT)',
      duration: '2–5 business days',
      deliverables: ['Routing Process Sheets', 'Verified CNC Code', 'Tooling Allocation Sheet']
    },
    {
      step: '04',
      title: 'Machining, QC Acceptance & Delivery',
      subtitle: 'Machining, Heat Treatment & Final Metrology',
      desc: 'Workpieces are machined, thermally treated, and subjected to 100% inspection in our accredited quality lab. The finished batch is packaged with full quality certificates and dispatched.',
      department: 'Production Floors + Metrology Lab',
      duration: 'Per contractual timeline',
      deliverables: ['Finished Parts / Machine Line', 'Certified QC Inspection Report', 'Material Mill Test Certificates']
    }
  ],
  zh: [
    {
      step: '01',
      title: '技术要求与图纸初始审核',
      subtitle: '24小时内完成技术可行性评估与报价',
      desc: '您提交工程图纸(PDF, DWG, STEP)或文字要求。总设计师部与总工艺部联合进行加工可行性分析，精准核算机加工时，并出具固定成本商务报价书。',
      department: '市场商务部 + 总设计师部 + 工艺部',
      duration: '24–48小时',
      deliverables: ['工艺可行性评估报告', '正式商务明细报价单', '项目进度推进计划表']
    },
    {
      step: '02',
      title: '机械结构深化设计 (OGK)',
      subtitle: '参数化三维建模与工程施工图交付',
      desc: '设计师建立三维模型，开展力学仿真与动态刚度计算，设计专用工装夹具并与客户技术负责人最终确认图纸关键尺寸公差。',
      department: '总设计师部 (OGK)',
      duration: '3–10个工作日',
      deliverables: ['正式受控工程图纸', '三维装配体数字模型', '专用工装设计方案']
    },
    {
      step: '03',
      title: '制造工艺与数控编程 (OGT)',
      subtitle: '工艺路线卡、CAM程序编制与刀具配套',
      desc: '工艺师拟定分道加工工序，选配刀具牌号，编写多轴数控加工中心代码并进行全程切削干涉模拟，消除撞刀报废风险。',
      department: '总工艺技术部 (OGT)',
      duration: '2–5个工作日',
      deliverables: ['全套工艺过程卡片', '经严格验证的数控代码', '刀具物料配置明细']
    },
    {
      step: '04',
      title: '机械切削、严苛质检与发运',
      subtitle: '数控切削、热处理与出厂检验合格出库',
      desc: '零部件在车间机床加工，完成调质淬火，并在工厂质检实验室执行严格尺寸与形位公差检验。成品附全套合格证书包装发运。',
      department: '生产制造车间 + 质检计量室',
      duration: '严格恪守合同约定',
      deliverables: ['加工成品零件 / 成套装备', '官方质检合格证明文件', '原材料质量证明书']
    }
  ]
};
