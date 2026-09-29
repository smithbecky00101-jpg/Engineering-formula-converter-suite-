export type Category = 
  | 'Electrical'
  | 'Mechanical'
  | 'Civil'
  | 'Thermodynamics'
  | 'Fluid Mechanics'
  | 'Physics'
  | 'Mathematics';

export interface CalculationInput {
  id: string;
  label: string;
  symbol: string;
  unit: string;
  defaultValue: number;
}

export interface CalculatorDefinition {
  id: string;
  title: string;
  category: Category;
  description: string;
  formula: string;
  inputs: CalculationInput[];
  outputUnit: string;
  outputSymbol: string;
  explanation: string;
  diagramType?: 'ohms' | 'stress' | 'projectile' | 'fluid';
  calculate: (inputs: Record<string, number>) => { result: number; steps: string[] };
}

export interface CalculationRecord {
  id: string;
  timestamp: string;
  calculatorTitle: string;
  inputs: Record<string, number>;
  result: number;
  unit: string;
}

export interface UnitCategory {
  name: string;
  units: { [key: string]: number }; // Value relative to base SI unit
}
