import React, { useState, useMemo, useEffect } from 'react';
import {
  Calculator,
  Search,
  CheckCircle2,
  Clock,
  FileCheck2,
  ArrowRight,
  Layers,
  Scale,
  Building2,
  PhoneCall,
  Mail,
} from 'lucide-react';
import { Language } from '../types';
import {
  lookupPublicInquiryStatus,
  PublicInquiryStatusInfo,
} from '../utils/supabase';

interface EngineeringToolsSectionProps {
  currentLang: Language;
  onOpenRfqWithSpec: (specSummary: string) => void;
  requestedTool?: 'metal' | 'status';
  requestedToolSeq?: number;
}

type BlankShape = 'round' | 'tube' | 'hex' | 'plate';

interface AlloyOption {
  id: string;
  labelRu: string;
  labelEn: string;
  labelZh: string;
  densityGcm3: number;
  standard: string;
}

const ALLOY_OPTIONS: AlloyOption[] = [
  {
    id: '40x',
    labelRu: 'Сталь 40Х / Сталь 45 (конструкционная)',
    labelEn: 'Steel 40Cr / C45 (Structural Alloy)',
    labelZh: '40Cr / 45号结构钢',
    densityGcm3: 7.85,
    standard: 'ГОСТ 4543-2016',
  },
  {
    id: '20xn3a',
    labelRu: 'Сталь 20ХН3А / 18ХГТ (цементуемая для шестерён)',
    labelEn: 'Steel 20CrNi3 / 18CrMnTi (Case-Hardening Gear Steel)',
    labelZh: '20CrNi3 / 18CrMnTi 渗碳齿轮钢',
    densityGcm3: 7.86,
    standard: 'ГОСТ 4543-2016',
  },
  {
    id: 'shx15',
    labelRu: 'Сталь ШХ15 (подшипниковая высокоточная)',
    labelEn: 'Steel GCr15 / 100Cr6 (Bearing Steel)',
    labelZh: 'GCr15 轴承钢',
    densityGcm3: 7.81,
    standard: 'ГОСТ 801-78',
  },
  {
    id: 'sch20',
    labelRu: 'Чугун СЧ20 / СЧ25 (корпусные заготовки станин)',
    labelEn: 'Cast Iron GG20 / GG25 (Machine Bed Blanks)',
    labelZh: 'HT200 / HT250 机床床身灰铸铁',
    densityGcm3: 7.2,
    standard: 'ГОСТ 1412-85',
  },
  {
    id: 'vch50',
    labelRu: 'Чугун ВЧ50 (высокопрочный с шаровидным графитом)',
    labelEn: 'Ductile Iron GGG50 (High-Strength Nodular)',
    labelZh: 'QT500 球墨铸铁',
    densityGcm3: 7.3,
    standard: 'ГОСТ 7293-85',
  },
  {
    id: 'bronze',
    labelRu: 'Бронза БрА9Ж3Л / Латунь ЛС59-1 (втулки скольжения)',
    labelEn: 'Aluminum Bronze CuAl9Fe3 / Brass CW614N',
    labelZh: 'QAl9-4 铝青铜 / 黄铜',
    densityGcm3: 7.5,
    standard: 'ГОСТ 493-79',
  },
  {
    id: 'd16t',
    labelRu: 'Алюминиевый сплав Д16Т / АМг6',
    labelEn: 'Aluminum Alloy 2024-T4 / 5083',
    labelZh: '2024 / 5083 铝合金',
    densityGcm3: 2.78,
    standard: 'ГОСТ 4784-2019',
  },
];

export const EngineeringToolsSection: React.FC<EngineeringToolsSectionProps> = ({
  currentLang,
  onOpenRfqWithSpec,
  requestedTool,
  requestedToolSeq,
}) => {
  const [activeTool, setActiveTool] = useState<'metal' | 'status'>('metal');

  // Metal Calculator State
  const [shape, setShape] = useState<BlankShape>('round');
  const [alloyId, setAlloyId] = useState<string>('40x');
  const [diameterD, setDiameterD] = useState<number>(120);
  const [innerDiameterd, setInnerDiameterd] = useState<number>(60);
  const [lengthL, setLengthL] = useState<number>(350);
  const [widthB, setWidthB] = useState<number>(200);
  const [thicknessH, setThicknessH] = useState<number>(45);
  const [batchQty, setBatchQty] = useState<number>(50);
  const [allowancePct, setAllowancePct] = useState<number>(15);

  // Status Tracker State
  const [queryNumber, setQueryNumber] = useState<string>('БЗАЛ-2026-0101');
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [searchAttempted, setSearchAttempted] = useState<boolean>(false);
  const [statusResult, setStatusResult] = useState<PublicInquiryStatusInfo | null>(
    null
  );

  const selectedAlloy = useMemo(
    () => ALLOY_OPTIONS.find((a) => a.id === alloyId) || ALLOY_OPTIONS[0],
    [alloyId]
  );

  const metalCalc = useMemo(() => {
    const D_cm = Math.max(1, diameterD) / 10;
    const d_cm = Math.min(D_cm - 0.1, Math.max(0, innerDiameterd) / 10);
    const L_cm = Math.max(1, lengthL) / 10;
    const B_cm = Math.max(1, widthB) / 10;
    const H_cm = Math.max(1, thicknessH) / 10;

    let volumeCm3 = 0;
    if (shape === 'round') {
      volumeCm3 = Math.PI * Math.pow(D_cm / 2, 2) * L_cm;
    } else if (shape === 'tube') {
      volumeCm3 =
        Math.PI * (Math.pow(D_cm / 2, 2) - Math.pow(d_cm / 2, 2)) * L_cm;
    } else if (shape === 'hex') {
      volumeCm3 = (Math.sqrt(3) / 2) * Math.pow(D_cm, 2) * L_cm;
    } else {
      volumeCm3 = L_cm * B_cm * H_cm;
    }

    const netWeightKg = (volumeCm3 * selectedAlloy.densityGcm3) / 1000;
    const grossWeightKg = netWeightKg * (1 + allowancePct / 100);
    const qty = Math.max(1, batchQty);
    const totalBatchKg = grossWeightKg * qty;

    return {
      volumeCm3,
      netWeightKg,
      grossWeightKg,
      totalBatchKg,
      totalBatchTons: totalBatchKg / 1000,
    };
  }, [
    shape,
    selectedAlloy,
    diameterD,
    innerDiameterd,
    lengthL,
    widthB,
    thicknessH,
    batchQty,
    allowancePct,
  ]);

  const handleStatusSearch = async (e?: React.FormEvent, presetNumber?: string) => {
    if (e) e.preventDefault();
    const target = (presetNumber ?? queryNumber).trim();
    if (!target) return;
    if (presetNumber) setQueryNumber(presetNumber);

    setIsSearching(true);
    setSearchAttempted(true);
    const res = await lookupPublicInquiryStatus(target);
    setIsSearching(false);
    setStatusResult(res.found && res.statusInfo ? res.statusInfo : null);
  };

  useEffect(() => {
    if (!requestedTool) return;
    setActiveTool(requestedTool);
    if (requestedTool === 'status' && !searchAttempted) {
      handleStatusSearch(undefined, 'БЗАЛ-2026-0101');
    }
  }, [requestedTool, requestedToolSeq]);

  const handleSendMetalSpecToRfq = () => {
    const shapeName =
      shape === 'round'
        ? `Кругляк Ø${diameterD}×${lengthL} мм`
        : shape === 'tube'
          ? `Втулка/труба Ø${diameterD}×Ø${innerDiameterd}×${lengthL} мм`
          : shape === 'hex'
            ? `Шестигранник S${diameterD}×${lengthL} мм`
            : `Плита ${lengthL}×${widthB}×${thicknessH} мм`;

    const summary = `Расчёт заготовки: ${shapeName}, ${selectedAlloy.labelRu}, партия ${batchQty} шт., масса с припуском (${allowancePct}%): ${metalCalc.totalBatchKg.toFixed(1)} кг`;
    onOpenRfqWithSpec(summary);
  };

  const getStepProgress = (status: PublicInquiryStatusInfo['status']): number => {
    if (status === 'new_marketing') return 1;
    if (status === 'in_ogk' || status === 'in_ogt') return 2;
    if (status === 'in_production') return 3;
    if (status === 'quoted' || status === 'contracted') return 4;
    return 1;
  };

  const getDepartmentTitle = (dept: PublicInquiryStatusInfo['assigned_department']) => {
    switch (dept) {
      case 'marketing':
        return currentLang === 'ru'
          ? 'Отдел маркетинга и продаж (регистрация и первичная проверка)'
          : currentLang === 'en'
            ? 'Marketing & Sales Dept (Registration & initial check)'
            : '市场与销售部（登记与初审）';
      case 'ogk':
        return currentLang === 'ru'
          ? 'ОГК — Отдел главного конструктора (проверка чертежей и допусков ЕСКД)'
          : currentLang === 'en'
            ? 'OGK — Chief Designer Bureau (CAD drawing & tolerance review)'
            : '总设计师部 OGK（图纸与公差审核）';
      case 'ogt':
        return currentLang === 'ru'
          ? 'ОГТ — Отдел главного технолога (расчёт норм времени и техпроцесса)'
          : currentLang === 'en'
            ? 'OGT — Chief Process Engineer Dept (Cycle time & routing calculation)'
            : '总工艺师部 OGT（工时定额与工艺路线核算）';
      case 'production':
        return currentLang === 'ru'
          ? 'Производственная служба ЧПУ и цеха мехобработки (оценка загрузки станков)'
          : currentLang === 'en'
            ? 'CNC Machining Workshops (Machine load & schedule planning)'
            : '数控机加工车间（机床排产评估）';
      case 'otk':
        return currentLang === 'ru'
          ? 'Служба ОТК и центральная заводская лаборатория (контроль требований)'
          : currentLang === 'en'
            ? 'QC Department & Metrology Lab (Quality verification)'
            : '质量检验部与计量实验室（质量标准核验）';
    }
  };

  return (
    <section
      id="engineering-tools"
      className="py-8 sm:py-10 bg-white border-t border-b border-[#D5D9DE]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#E95A0C] mb-2">
              <span>
                {currentLang === 'ru'
                  ? 'ИНЖЕНЕРНЫЕ СЕРВИСЫ ОАО БЗАЛ'
                  : currentLang === 'en'
                    ? 'JSC BZAL ENGINEERING TOOLS'
                    : 'BZAL股份公司工程在线工具'}
              </span>
              <span aria-hidden="true">·</span>
              <span>GOST / ISO</span>
            </div>
            <h2 className="font-dela text-xl sm:text-3xl uppercase text-[#2B3340] leading-tight">
              {currentLang === 'ru'
                ? 'МЕТАЛЛОКАЛЬКУЛЯТОР ЗАГОТОВОК И ПРОВЕРКА СТАТУСА ЗАЯВКИ'
                : currentLang === 'en'
                  ? 'BLANK WEIGHT CALCULATOR & INQUIRY STATUS TRACKER'
                  : '毛坯重量计算器与询价状态查询'}
            </h2>
          </div>

          {/* Interactive Tool Switcher */}
          <div className="inline-flex flex-wrap p-1.5 rounded-xl bg-[#ECEEF0] border border-[#D5D9DE] self-start">
            <button
              type="button"
              onClick={() => setActiveTool('metal')}
              className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-extrabold uppercase tracking-wider transition-all cursor-pointer ${
                activeTool === 'metal'
                  ? 'bg-[#E95A0C] text-white shadow-sm'
                  : 'text-[#2B3340] hover:bg-white/70'
              }`}
            >
              <Scale className="w-4 h-4 shrink-0" />
              <span>
                {currentLang === 'ru'
                  ? '1. Калькулятор массы заготовки'
                  : currentLang === 'en'
                    ? '1. Blank Weight Calculator'
                    : '1. 毛坯重量计算器'}
              </span>
            </button>

            <button
              type="button"
              onClick={() => {
                setActiveTool('status');
                if (!searchAttempted) {
                  handleStatusSearch(undefined, 'БЗАЛ-2026-0101');
                }
              }}
              className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-extrabold uppercase tracking-wider transition-all cursor-pointer ${
                activeTool === 'status'
                  ? 'bg-[#E95A0C] text-white shadow-sm'
                  : 'text-[#2B3340] hover:bg-white/70'
              }`}
            >
              <Search className="w-4 h-4 shrink-0" />
              <span>
                {currentLang === 'ru'
                  ? '2. Проверить статус заявки по №'
                  : currentLang === 'en'
                    ? '2. Check Inquiry Status'
                    : '2. 查询申请状态'}
              </span>
            </button>
          </div>
        </div>

        {/* =================================================================== */}
        {/* TOOL 1: METAL BLANK WEIGHT & BATCH CALCULATOR                       */}
        {/* =================================================================== */}
        {activeTool === 'metal' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start bg-[#F8F9FA] border-2 border-[#2B3340] rounded-2xl p-5 sm:p-8 shadow-lg">
            <div className="lg:col-span-7 space-y-5">
              <div>
                <div className="text-xs font-extrabold uppercase tracking-wider text-[#2B3340] mb-3">
                  {currentLang === 'ru'
                    ? '1. Выберите тип металлопроката / заготовки под мехобработку'
                    : currentLang === 'en'
                      ? '1. Select Workpiece / Blank Geometry for Machining'
                      : '1. 选择机加工毛坯/型材几何形状'}
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {[
                    {
                      id: 'round',
                      label:
                        currentLang === 'ru'
                          ? 'Кругляк / Вал'
                          : currentLang === 'en'
                            ? 'Round Bar / Shaft'
                            : '圆钢 / 轴类',
                      sub: 'ØD × L',
                    },
                    {
                      id: 'tube',
                      label:
                        currentLang === 'ru'
                          ? 'Втулка / Гильза'
                          : currentLang === 'en'
                            ? 'Hollow Sleeve / Tube'
                            : '空心衬套 / 管材',
                      sub: 'ØD × Ød × L',
                    },
                    {
                      id: 'hex',
                      label:
                        currentLang === 'ru'
                          ? 'Шестигранник'
                          : currentLang === 'en'
                            ? 'Hexagon Bar'
                            : '六角钢',
                      sub: 'S × L',
                    },
                    {
                      id: 'plate',
                      label:
                        currentLang === 'ru'
                          ? 'Плита / Корпус'
                          : currentLang === 'en'
                            ? 'Plate / Block'
                            : '钢板 / 箱体块',
                      sub: 'L × B × H',
                    },
                  ].map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setShape(item.id as BlankShape)}
                      className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                        shape === item.id
                          ? 'bg-[#2B3340] text-white border-[#2B3340] shadow-sm'
                          : 'bg-white text-[#2B3340] border-[#D5D9DE] hover:border-[#2B3340]'
                      }`}
                    >
                      <div className="text-xs font-extrabold uppercase">
                        {item.label}
                      </div>
                      <div
                        className={`text-[11px] mt-0.5 font-mono ${
                          shape === item.id ? 'text-[#E95A0C]' : 'text-[#647082]'
                        }`}
                      >
                        {item.sub}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Alloy Selection */}
              <div>
                <label className="block text-xs font-extrabold uppercase tracking-wider text-[#2B3340] mb-2">
                  {currentLang === 'ru'
                    ? '2. Марка стали / сплава по ГОСТ (с учётом удельной плотности)'
                    : currentLang === 'en'
                      ? '2. Steel / Alloy Grade (with Specific Density ρ)'
                      : '2. 钢材 / 合金牌号（含比重密度 ρ）'}
                </label>
                <select
                  value={alloyId}
                  onChange={(e) => setAlloyId(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-white border border-[#D5D9DE] text-xs font-bold text-[#2B3340] focus:outline-none focus:border-[#E95A0C]"
                >
                  {ALLOY_OPTIONS.map((a) => (
                    <option key={a.id} value={a.id}>
                      {currentLang === 'ru'
                        ? a.labelRu
                        : currentLang === 'en'
                          ? a.labelEn
                          : a.labelZh}{' '}
                      — ρ = {a.densityGcm3} g/cm³ ({a.standard})
                    </option>
                  ))}
                </select>
              </div>

              {/* Dimensions Inputs */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {shape !== 'plate' ? (
                  <div>
                    <label className="block text-[11px] font-bold uppercase text-[#647082] mb-1">
                      {shape === 'hex'
                        ? currentLang === 'ru'
                          ? 'Размер под ключ S (мм)'
                          : currentLang === 'en'
                            ? 'Across Flats S (mm)'
                            : '对边尺寸 S (mm)'
                        : currentLang === 'ru'
                          ? 'Наружный диаметр D (мм)'
                          : currentLang === 'en'
                            ? 'Outer Diameter D (mm)'
                            : '外径 D (mm)'}
                    </label>
                    <input
                      type="number"
                      min={1}
                      max={3000}
                      value={diameterD}
                      onChange={(e) => setDiameterD(Number(e.target.value) || 1)}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-[#D5D9DE] text-sm font-extrabold text-[#2B3340]"
                    />
                  </div>
                ) : (
                  <div>
                    <label className="block text-[11px] font-bold uppercase text-[#647082] mb-1">
                      {currentLang === 'ru'
                        ? 'Ширина заготовки B (мм)'
                        : currentLang === 'en'
                          ? 'Blank Width B (mm)'
                          : '毛坯宽度 B (mm)'}
                    </label>
                    <input
                      type="number"
                      min={1}
                      max={5000}
                      value={widthB}
                      onChange={(e) => setWidthB(Number(e.target.value) || 1)}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-[#D5D9DE] text-sm font-extrabold text-[#2B3340]"
                    />
                  </div>
                )}

                {shape === 'tube' && (
                  <div>
                    <label className="block text-[11px] font-bold uppercase text-[#647082] mb-1">
                      {currentLang === 'ru'
                        ? 'Внутренний диаметр d (мм)'
                        : currentLang === 'en'
                          ? 'Inner Diameter d (mm)'
                          : '内径 d (mm)'}
                    </label>
                    <input
                      type="number"
                      min={0}
                      max={diameterD - 2}
                      value={innerDiameterd}
                      onChange={(e) =>
                        setInnerDiameterd(Number(e.target.value) || 0)
                      }
                      className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-[#D5D9DE] text-sm font-extrabold text-[#2B3340]"
                    />
                  </div>
                )}

                {shape === 'plate' && (
                  <div>
                    <label className="block text-[11px] font-bold uppercase text-[#647082] mb-1">
                      {currentLang === 'ru'
                        ? 'Толщина плиты H (мм)'
                        : currentLang === 'en'
                          ? 'Plate Thickness H (mm)'
                          : '板材厚度 H (mm)'}
                    </label>
                    <input
                      type="number"
                      min={1}
                      max={2000}
                      value={thicknessH}
                      onChange={(e) =>
                        setThicknessH(Number(e.target.value) || 1)
                      }
                      className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-[#D5D9DE] text-sm font-extrabold text-[#2B3340]"
                    />
                  </div>
                )}

                <div>
                  <label className="block text-[11px] font-bold uppercase text-[#647082] mb-1">
                    {currentLang === 'ru'
                      ? 'Длина заготовки L (мм)'
                      : currentLang === 'en'
                        ? 'Blank Length L (mm)'
                        : '毛坯长度 L (mm)'}
                  </label>
                  <input
                    type="number"
                    min={1}
                    max={12000}
                    value={lengthL}
                    onChange={(e) => setLengthL(Number(e.target.value) || 1)}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-[#D5D9DE] text-sm font-extrabold text-[#2B3340]"
                  />
                </div>
              </div>

              {/* Batch & Machining Allowance */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-[#E2E6EC]">
                <div>
                  <label className="block text-[11px] font-bold uppercase text-[#647082] mb-1">
                    {currentLang === 'ru'
                      ? 'Количество деталей в партии (шт.)'
                      : currentLang === 'en'
                        ? 'Batch Quantity (pcs)'
                        : '批次零件数量 (件)'}
                  </label>
                  <input
                    type="number"
                    min={1}
                    max={100000}
                    value={batchQty}
                    onChange={(e) => setBatchQty(Number(e.target.value) || 1)}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-[#D5D9DE] text-sm font-extrabold text-[#2B3340]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase text-[#647082] mb-1">
                    {currentLang === 'ru'
                      ? 'Технологический припуск ОГТ на мехобработку'
                      : currentLang === 'en'
                        ? 'OGT Machining Stock Allowance'
                        : '机加工工艺余量 (OGT)'}
                  </label>
                  <select
                    value={allowancePct}
                    onChange={(e) => setAllowancePct(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-[#D5D9DE] text-xs font-bold text-[#2B3340]"
                  >
                    <option value={0}>
                      {currentLang === 'ru'
                        ? '0% — Чистовой прокат без припуска'
                        : currentLang === 'en'
                          ? '0% — Net Blank Weight'
                          : '0% — 理论净重（无余量）'}
                    </option>
                    <option value={10}>
                      {currentLang === 'ru'
                        ? '+10% — Токарно-фрезерная ЧПУ'
                        : currentLang === 'en'
                          ? '+10% — Standard CNC Turning & Milling'
                          : '+10% — 常规数控车铣加工'}
                    </option>
                    <option value={15}>
                      {currentLang === 'ru'
                        ? '+15% — Зубонарезание и круглая шлифовка'
                        : currentLang === 'en'
                          ? '+15% — Gear Cutting & Cylindrical Grinding'
                          : '+15% — 滚齿与精密外圆磨削'}
                    </option>
                    <option value={25}>
                      {currentLang === 'ru'
                        ? '+25% — Глубокая расточка и термообработка'
                        : currentLang === 'en'
                          ? '+25% — Heavy Boring & Heat Treatment'
                          : '+25% — 深孔镗削与热处理工艺'}
                    </option>
                  </select>
                </div>
              </div>
            </div>

            {/* Right Results Card */}
            <div className="lg:col-span-5 bg-[#2B3340] text-white rounded-xl p-6 space-y-5">
              <div className="flex items-center justify-between border-b border-white/15 pb-4">
                <div>
                  <div className="text-[11px] font-bold uppercase tracking-wider text-[#BAC5CF]">
                    {currentLang === 'ru'
                      ? 'Сводка металлоёмкости для ОМТС и ОГТ'
                      : currentLang === 'en'
                        ? 'Metal Requirement Summary for Procurement & OGT'
                        : '物料采购与工艺定额汇总'}
                  </div>
                  <div className="font-dela text-lg text-white mt-0.5">
                    {currentLang === 'ru'
                      ? 'РАСЧЁТ ЗАГОТОВКИ ПО ГОСТ'
                      : currentLang === 'en'
                        ? 'GOST BLANK WEIGHT ESTIMATE'
                        : 'GOST 毛坯重量核算'}
                  </div>
                </div>
                <Calculator className="w-7 h-7 text-[#E95A0C] shrink-0" />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-3.5 rounded-lg bg-white/5 border border-white/10">
                  <div className="text-[11px] text-[#BAC5CF]">
                    {currentLang === 'ru'
                      ? 'Чистая масса 1 шт.'
                      : currentLang === 'en'
                        ? 'Net Weight (1 pc)'
                        : '单件净重'}
                  </div>
                  <div className="font-dela text-xl text-white mt-1">
                    {metalCalc.netWeightKg.toFixed(2)}{' '}
                    {currentLang === 'ru' ? 'кг' : 'kg'}
                  </div>
                </div>

                <div className="p-3.5 rounded-lg bg-white/5 border border-white/10">
                  <div className="text-[11px] text-[#BAC5CF]">
                    {currentLang === 'ru'
                      ? `С припуском (+${allowancePct}%)`
                      : currentLang === 'en'
                        ? `Gross (+${allowancePct}% stock)`
                        : `含加工余量 (+${allowancePct}%)`}
                  </div>
                  <div className="font-dela text-xl text-[#E95A0C] mt-1">
                    {metalCalc.grossWeightKg.toFixed(2)}{' '}
                    {currentLang === 'ru' ? 'кг' : 'kg'}
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[#1B222C] border border-white/15">
                <div className="text-xs text-[#BAC5CF] uppercase font-bold tracking-wider">
                  {currentLang === 'ru'
                    ? `Общая потребность металла на партию (${batchQty} шт.)`
                    : currentLang === 'en'
                      ? `Total Batch Metal Requirement (${batchQty} pcs)`
                      : `整批毛坯总重量需求 (${batchQty} 件)`}
                </div>
                <div className="flex items-baseline gap-3 mt-1.5">
                  <span className="font-dela text-2xl sm:text-3xl text-white">
                    {metalCalc.totalBatchKg.toLocaleString('ru-RU', {
                      maximumFractionDigits: 1,
                    })}{' '}
                    {currentLang === 'ru' ? 'кг' : 'kg'}
                  </span>
                  <span className="text-xs font-bold text-[#BAC5CF]">
                    ({metalCalc.totalBatchTons.toFixed(3)}{' '}
                    {currentLang === 'ru' ? 'т' : 't'})
                  </span>
                </div>
                <div className="text-[11px] text-[#95A1AE] mt-2">
                  {currentLang === 'ru'
                    ? `Плотность сплава: ${selectedAlloy.densityGcm3} г/см³ · ${selectedAlloy.standard}`
                    : currentLang === 'en'
                      ? `Alloy density: ${selectedAlloy.densityGcm3} g/cm³ · ${selectedAlloy.standard}`
                      : `合金密度：${selectedAlloy.densityGcm3} g/cm³ · ${selectedAlloy.standard}`}
                </div>
              </div>

              <button
                type="button"
                onClick={handleSendMetalSpecToRfq}
                className="w-full py-3.5 px-4 rounded-xl bg-[#E95A0C] hover:bg-[#CC4B06] text-white font-extrabold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
              >
                <span>
                  {currentLang === 'ru'
                    ? 'Передать расчёт в заявку отдела маркетинга'
                    : currentLang === 'en'
                      ? 'Attach Calculation to Marketing RFQ'
                      : '将计算结果附入市场部询价单'}
                </span>
                <ArrowRight className="w-4 h-4 shrink-0" />
              </button>
            </div>
          </div>
        )}

        {/* =================================================================== */}
        {/* TOOL 2: PUBLIC INQUIRY STATUS TRACKER BY NUMBER                     */}
        {/* =================================================================== */}
        {activeTool === 'status' && (
          <div className="bg-[#F8F9FA] border-2 border-[#2B3340] rounded-2xl p-5 sm:p-8 shadow-lg space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#D5D9DE] pb-5">
              <div>
                <h3 className="font-dela text-base sm:text-lg uppercase text-[#2B3340]">
                  {currentLang === 'ru'
                    ? 'ОТСЛЕЖИВАНИЕ ЭТАПА ПРОРАБОТКИ ЗАЯВКИ В СЛУЖБАХ ЗАВОДА'
                    : currentLang === 'en'
                      ? 'TRACK INQUIRY PROCESSING STAGE ACROSS PLANT DIVISIONS'
                      : '实时查询询价单在工厂各技术部门的审核进度'}
                </h3>
                <p className="text-xs text-[#647082] mt-1">
                  {currentLang === 'ru'
                    ? 'Введите регистрационный номер, присвоенный вам при отправке заявки на сайте или специалистом отдела маркетинга (например, БЗАЛ-2026-0101). Конфиденциальные данные контрагента скрыты.'
                    : currentLang === 'en'
                      ? 'Enter the registration number assigned when submitting your RFQ or by our Marketing Department (e.g. БЗАЛ-2026-0101). Confidential customer details remain protected.'
                      : '输入提交询价时获得的登记编号（例如 БЗАЛ-2026-0101）。客户商业机密信息受严格保护。'}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2 text-xs">
                <span className="font-bold text-[#647082]">
                  {currentLang === 'ru'
                    ? 'Примеры номеров:'
                    : currentLang === 'en'
                      ? 'Sample IDs:'
                      : '示例编号：'}
                </span>
                {['БЗАЛ-2026-0101', 'БЗАЛ-2026-0102', 'БЗАЛ-2026-0103'].map(
                  (sample) => (
                    <button
                      key={sample}
                      type="button"
                      onClick={() => handleStatusSearch(undefined, sample)}
                      className="px-2.5 py-1 rounded bg-white border border-[#D5D9DE] hover:border-[#E95A0C] text-[#2B3340] font-bold transition-colors cursor-pointer"
                    >
                      {sample}
                    </button>
                  )
                )}
              </div>
            </div>

            <form
              onSubmit={(e) => handleStatusSearch(e)}
              className="flex flex-col sm:flex-row gap-3"
            >
              <input
                type="text"
                value={queryNumber}
                onChange={(e) => setQueryNumber(e.target.value)}
                placeholder="БЗАЛ-2026-0101"
                className="flex-1 px-4 py-3.5 rounded-xl bg-white border border-[#D5D9DE] text-sm font-extrabold text-[#2B3340] uppercase focus:outline-none focus:border-[#E95A0C]"
              />
              <button
                type="submit"
                disabled={isSearching}
                className="px-6 py-3.5 rounded-xl bg-[#E95A0C] hover:bg-[#CC4B06] text-white font-extrabold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Search className="w-4 h-4" />
                <span>
                  {isSearching
                    ? currentLang === 'ru'
                      ? 'Поиск в реестре...'
                      : currentLang === 'en'
                        ? 'Searching...'
                        : '查询中...'
                    : currentLang === 'ru'
                      ? 'Проверить статус'
                      : currentLang === 'en'
                        ? 'Check Status'
                        : '查询进度'}
                </span>
              </button>
            </form>

            {searchAttempted && !statusResult && !isSearching && (
              <div className="p-5 rounded-xl bg-white border border-[#D5D9DE] text-xs text-[#2B3340] space-y-2">
                <div className="font-extrabold text-sm text-[#E95A0C]">
                  {currentLang === 'ru'
                    ? `Заявка с номером ${queryNumber} не найдена в оперативном реестре`
                    : currentLang === 'en'
                      ? `Inquiry # ${queryNumber} was not found in the active registry`
                      : `未找到编号为 ${queryNumber} 的询价记录`}
                </div>
                <p className="text-[#647082]">
                  {currentLang === 'ru'
                    ? 'Проверьте правильность написания номера (формат БЗАЛ-2026-XXXX) или свяжитесь с отделом маркетинга и продаж ОАО БЗАЛ: +375 44 751 44 77, +375 (163) 67-20-41, sales@bzal.by (Пн–Пт: 08:00 – 16:30).'
                    : currentLang === 'en'
                      ? 'Please verify the inquiry number format (БЗАЛ-2026-XXXX) or contact the Marketing & Sales Department of JSC BZAL: +375 44 751 44 77, +375 (163) 67-20-41, sales@bzal.by (Mon–Fri: 08:00 – 16:30).'
                      : '请核对编号格式（БЗАЛ-2026-XXXX）或联系BZAL市场销售部：+375 44 751 44 77，sales@bzal.by（周一至周五 08:00–16:30）。'}
                </p>
              </div>
            )}

            {statusResult && (
              <div className="bg-white border border-[#D5D9DE] rounded-xl p-5 sm:p-6 space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#ECEEF0] pb-4">
                  <div>
                    <div className="flex flex-wrap items-center gap-2 text-xs text-[#647082]">
                      <span>
                        {currentLang === 'ru'
                          ? 'Регистрационный номер:'
                          : currentLang === 'en'
                            ? 'Registration ID:'
                            : '登记编号：'}
                      </span>
                      <span aria-hidden="true">·</span>
                      <span>
                        {currentLang === 'ru'
                          ? 'Дата:'
                          : currentLang === 'en'
                            ? 'Date:'
                            : '日期：'}{' '}
                        {new Date(statusResult.created_at).toLocaleDateString(
                          currentLang === 'ru' ? 'ru-RU' : 'en-GB'
                        )}
                      </span>
                      <span aria-hidden="true">·</span>
                      <span>
                        {currentLang === 'ru'
                          ? `Чертежей в пакете: ${statusResult.drawings_count} шт.`
                          : currentLang === 'en'
                            ? `Drawings attached: ${statusResult.drawings_count}`
                            : `附图数量：${statusResult.drawings_count} 份`}
                      </span>
                    </div>
                    <div className="font-dela text-lg sm:text-xl text-[#2B3340] mt-1">
                      {statusResult.inquiry_number} — {statusResult.service_type}
                    </div>
                  </div>

                  <div className="text-xs font-extrabold text-[#2B3340] bg-[#ECEEF0] px-3.5 py-2 rounded-lg self-start">
                    {currentLang === 'ru'
                      ? 'Подразделение:'
                      : currentLang === 'en'
                        ? 'Division:'
                        : '当前部门：'}{' '}
                    <span className="text-[#E95A0C]">
                      {statusResult.assigned_department.toUpperCase()}
                    </span>
                  </div>
                </div>

                {/* 4-Step Pipeline Progress */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  {[
                    {
                      step: 1,
                      title:
                        currentLang === 'ru'
                          ? '1. Отдел маркетинга'
                          : currentLang === 'en'
                            ? '1. Marketing Dept'
                            : '1. 市场销售部',
                      desc:
                        currentLang === 'ru'
                          ? 'Регистрация обращения и комплектности КД (Пн–Пт 08:00–16:30)'
                          : currentLang === 'en'
                            ? 'Inquiry registration & drawing package intake (Mon–Fri 08:00–16:30)'
                            : '登记询价单并核对图纸完整性（周一至周五 08:00–16:30）',
                    },
                    {
                      step: 2,
                      title:
                        currentLang === 'ru'
                          ? '2. Службы ОГК и ОГТ'
                          : currentLang === 'en'
                            ? '2. OGK & OGT Engineering'
                            : '2. 总设计部与工艺部',
                      desc:
                        currentLang === 'ru'
                          ? 'Конструкторский анализ чертежей и расчёт норм времени'
                          : currentLang === 'en'
                            ? 'Engineering review of tolerances and cycle time calculation'
                            : '图纸公差审核与机加工工时定额核算',
                    },
                    {
                      step: 3,
                      title:
                        currentLang === 'ru'
                          ? '3. Производство и ОТК'
                          : currentLang === 'en'
                            ? '3. Production & QC'
                            : '3. 生产车间与质检部',
                      desc:
                        currentLang === 'ru'
                          ? 'Проверка технологической оснастки и окна в графике ЧПУ'
                          : currentLang === 'en'
                            ? 'Tooling verification & CNC machine schedule allocation'
                            : '工装夹具核验与数控机床排产计划确认',
                    },
                    {
                      step: 4,
                      title:
                        currentLang === 'ru'
                          ? '4. Направление ответа'
                          : currentLang === 'en'
                            ? '4. Official Quotation'
                            : '4. 正式报价反馈',
                      desc:
                        currentLang === 'ru'
                          ? 'Коммерческое предложение по телефону и в ответ на заявку'
                          : currentLang === 'en'
                            ? 'Commercial quotation delivered by phone and email'
                            : '通过电话及邮件回复提供正式商业报价单',
                    },
                  ].map((item) => {
                    const currentStep = getStepProgress(statusResult.status);
                    const isCompleted = item.step <= currentStep;
                    const isCurrent = item.step === currentStep;
                    return (
                      <div
                        key={item.step}
                        className={`p-4 rounded-xl border transition-all ${
                          isCurrent
                            ? 'bg-[#2B3340] text-white border-[#2B3340] shadow-md'
                            : isCompleted
                              ? 'bg-[#F8F9FA] text-[#2B3340] border-[#2B3340]/40'
                              : 'bg-white text-[#95A1AE] border-[#ECEEF0]'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs font-extrabold uppercase">
                            {item.title}
                          </span>
                          {isCompleted ? (
                            <CheckCircle2
                              className={`w-4 h-4 shrink-0 ${
                                isCurrent ? 'text-[#E95A0C]' : 'text-emerald-600'
                              }`}
                            />
                          ) : (
                            <Clock className="w-4 h-4 text-[#BAC5CF] shrink-0" />
                          )}
                        </div>
                        <p
                          className={`text-[11px] leading-relaxed ${
                            isCurrent ? 'text-[#DCE2E8]' : 'text-[#647082]'
                          }`}
                        >
                          {item.desc}
                        </p>
                      </div>
                    );
                  })}
                </div>

                {/* Detailed Department & Feedback Status */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                  <div className="p-4 rounded-xl bg-[#F8F9FA] border border-[#D5D9DE] flex items-start gap-3">
                    <Building2 className="w-5 h-5 text-[#E95A0C] shrink-0 mt-0.5" />
                    <div className="text-xs">
                      <div className="font-bold text-[#647082] uppercase">
                        {currentLang === 'ru'
                          ? 'Ответственное подразделение сейчас:'
                          : currentLang === 'en'
                            ? 'Currently Assigned Division:'
                            : '当前负责部门：'}
                      </div>
                      <div className="font-extrabold text-[#2B3340] mt-1">
                        {getDepartmentTitle(statusResult.assigned_department)}
                      </div>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-[#F8F9FA] border border-[#D5D9DE] flex items-start gap-3">
                    {statusResult.feedback_status === 'pending' ? (
                      <FileCheck2 className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                    ) : statusResult.feedback_status === 'called_by_phone' ? (
                      <PhoneCall className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    ) : (
                      <Mail className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    )}
                    <div className="text-xs">
                      <div className="font-bold text-[#647082] uppercase">
                        {currentLang === 'ru'
                          ? 'Статус обратной связи от отдела маркетинга:'
                          : currentLang === 'en'
                            ? 'Marketing Dept Feedback Status:'
                            : '市场部反馈状态：'}
                      </div>
                      <div className="font-extrabold text-[#2B3340] mt-1">
                        {statusResult.feedback_status === 'pending'
                          ? currentLang === 'ru'
                            ? 'В работе: специалист отдела маркетинга свяжется с вами после расчёта в ОГК / ОГТ'
                            : currentLang === 'en'
                              ? 'In progress: Marketing specialist will contact you once OGK/OGT completes estimation'
                              : '处理中：总设计部与工艺部完成核算后，市场专员将立即与您联系'
                          : statusResult.feedback_status === 'called_by_phone'
                            ? currentLang === 'ru'
                              ? 'Выполнен звонок специалиста по указанному в заявке телефону'
                              : currentLang === 'en'
                                ? 'Customer contacted by phone as requested in the inquiry'
                                : '专员已按申请单预留电话与客户完成沟通'
                            : statusResult.feedback_status === 'replied_by_email'
                              ? currentLang === 'ru'
                                ? 'Направлен официальный письменный ответ и КП на Email заказчика'
                                : currentLang === 'en'
                                  ? 'Official written quotation sent to customer Email'
                                  : '正式书面报价单已发送至客户邮箱'
                              : currentLang === 'ru'
                                ? 'Выполнен телефонный звонок и направлен письменный ответ на заявку'
                                : currentLang === 'en'
                                  ? 'Phone consultation completed and written quotation sent by Email'
                                  : '已完成电话沟通并发送正式书面报价单'}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};
