export type Language = 'ru' | 'en' | 'zh';

export interface NavItem {
  id: string;
  label: string;
  href: string;
}

export interface CompetencyTab {
  id: string;
  code: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  badge: string;
  features: string[];
  specs: { label: string; value: string }[];
  image: string;
  accentQuote: string;
}

export interface EquipmentItem {
  id: string;
  name: string;
  category: string;
  precision: string;
  capacity: string;
  description: string;
  image: string;
  tags: string[];
}

export interface ComparisonRow {
  criterion: string;
  bzalTechnopark: string;
  typicalBrokers: string;
  isPositive: boolean;
}

export interface ProcessStep {
  step: string;
  title: string;
  subtitle: string;
  desc: string;
  department: string;
  duration: string;
  deliverables: string[];
}

export interface PlantProject {
  code: string;
  title: string;
  location: string;
  scope: string;
}

export interface ClientLogo {
  name: string;
  desc: string;
}

export interface ManufacturedPart {
  id: string;
  category: string;
  categoryKey: string;
  title: string;
  application: string;
  material: string;
  dimensions: string;
  tolerance: string;
  roughness: string;
  batchSize: string;
  leadTime: string;
  image: string;
  features: string[];
}

export interface MetrologyDevice {
  id: string;
  title: string;
  model: string;
  precision: string;
  purpose: string;
  scope: string;
  standard: string;
}

export interface EaeuAdvantage {
  id: string;
  title: string;
  badge: string;
  desc: string;
  stat: string;
  statLabel: string;
}

export interface MachinerySpec {
  category: string;
  model: string;
  cncSystem: string;
  travels: string;
  tableSize: string;
  spindleRpm: string;
  maxWeight: string;
  accuracy: string;
}

export interface RfqFormData {
  serviceType: string;
  hasDrawings: string;
  material: string;
  quantity: string;
  urgency: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  preferredContact: 'phone' | 'telegram' | 'whatsapp' | 'email';
  comments: string;
  fileNames: string[];
}

