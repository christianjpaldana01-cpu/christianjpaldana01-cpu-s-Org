export type ZoomLevel = 'macro' | 'cuticle' | 'ultrastructure' | 'microfibrils' | 'molecular';

export type HairType = 'straight' | 'wavy' | 'curly' | 'afro';

export interface AnatomicalLayer {
  id: string;
  name: string;
  category: 'shaft' | 'follicle' | 'molecular';
  depth: string;
  magnification: string;
  scientificName: string;
  shortDescription: string;
  detailedFunction: string;
  biochemicalComposition: string;
  clinicalImportance: string;
  phBehavior: string;
  imageUrl?: string;
}

export type ChemicalProcessId = 'bleach' | 'color' | 'straightening' | 'reconstruction' | 'haircut';

export interface ChemicalProcessStep {
  stepNumber: number;
  title: string;
  reagent: string;
  ph: number;
  duration: string;
  molecularMechanism: string;
  structuralImpact: string;
  stylistRecommendation: string;
}

export interface ChemicalProcessData {
  id: ChemicalProcessId;
  name: string;
  category: string;
  summary: string;
  primaryReagents: string[];
  affectedBonds: string[];
  optimalPhRange: string;
  steps: ChemicalProcessStep[];
  damageLevel: 'Bajo' | 'Moderado' | 'Alto' | 'Severo';
  counterMeasure: string;
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  trichologyDomain: string;
}
