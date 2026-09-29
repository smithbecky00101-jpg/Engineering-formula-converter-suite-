import { CalculatorDefinition } from '../types';

export const CALCULATORS: CalculatorDefinition[] = [
  // Electrical
  {
    id: 'ohms-law',
    title: "Ohm's Law (Voltage)",
    category: 'Electrical',
    description: 'Calculates electric voltage given current and resistance.',
    formula: 'V = I × R',
    inputs: [
      { id: 'i', label: 'Current', symbol: 'I', unit: 'A', defaultValue: 2 },
      { id: 'r', label: 'Resistance', symbol: 'R', unit: 'Ω', defaultValue: 10 }
    ],
    outputUnit: 'Volts',
    outputSymbol: 'V',
    explanation: 'Ohm\'s Law defines the relationship between voltage, current, and resistance in an electrical circuit.',
    diagramType: 'ohms',
    calculate: (inputs) => {
      const v = inputs.i * inputs.r;
      return {
        result: v,
        steps: [
          `Formula: V = I × R`,
          `Substitute inputs: V = ${inputs.i} A × ${inputs.r} Ω`,
          `Calculate result: V = ${v} V`
        ]
      };
    }
  },
  {
    id: 'elec-power',
    title: 'Electrical Power',
    category: 'Electrical',
    description: 'Calculates power consumed in an electrical circuit.',
    formula: 'P = V × I',
    inputs: [
      { id: 'v', label: 'Voltage', symbol: 'V', unit: 'V', defaultValue: 120 },
      { id: 'i', label: 'Current', symbol: 'I', unit: 'A', defaultValue: 5 }
    ],
    outputUnit: 'Watts',
    outputSymbol: 'W',
    explanation: 'Electrical power is the rate at which electrical energy is transferred by an electric circuit.',
    calculate: (inputs) => {
      const p = inputs.v * inputs.i;
      return {
        result: p,
        steps: [
          `Formula: P = V × I`,
          `Substitute inputs: P = ${inputs.v} V × ${inputs.i} A`,
          `Calculate result: P = ${p} W`
        ]
      };
    }
  },
  // Mechanical
  {
    id: 'torque',
    title: 'Torque Calculation',
    category: 'Mechanical',
    description: 'Calculates rotational torque given force and distance.',
    formula: 'τ = F × r',
    inputs: [
      { id: 'f', label: 'Force', symbol: 'F', unit: 'N', defaultValue: 50 },
      { id: 'r', label: 'Distance (Radius)', symbol: 'r', unit: 'm', defaultValue: 0.5 }
    ],
    outputUnit: 'Newton-meters',
    outputSymbol: 'N·m',
    explanation: 'Torque is the measure of the force that can cause an object to rotate about an axis.',
    calculate: (inputs) => {
      const t = inputs.f * inputs.r;
      return {
        result: t,
        steps: [
          `Formula: τ = F × r`,
          `Substitute inputs: τ = ${inputs.f} N × ${inputs.r} m`,
          `Calculate result: τ = ${t} N·m`
        ]
      };
    }
  },
  {
    id: 'gear-ratio',
    title: 'Gear Ratio',
    category: 'Mechanical',
    description: 'Calculates the gear ratio between driven and driving gears.',
    formula: 'GR = N_driven / N_driver',
    inputs: [
      { id: 'n1', label: 'Driver Teeth', symbol: 'N1', unit: 'teeth', defaultValue: 10 },
      { id: 'n2', label: 'Driven Teeth', symbol: 'N2', unit: 'teeth', defaultValue: 40 }
    ],
    outputUnit: 'Ratio',
    outputSymbol: ':1',
    explanation: 'Gear ratio expresses the mechanical advantage provided by a pair of meshed gears.',
    calculate: (inputs) => {
      const gr = inputs.n2 / inputs.n1;
      return {
        result: gr,
        steps: [
          `Formula: GR = Driven Teeth / Driver Teeth`,
          `Substitute inputs: GR = ${inputs.n2} / ${inputs.n1}`,
          `Calculate result: ${gr}:1`
        ]
      };
    }
  },
  // Civil / Mechanics of Materials
  {
    id: 'stress-calc',
    title: 'Mechanical Stress',
    category: 'Civil',
    description: 'Calculates normal stress in a structural element.',
    formula: 'σ = F / A',
    inputs: [
      { id: 'f', label: 'Applied Force', symbol: 'F', unit: 'N', defaultValue: 10000 },
      { id: 'a', label: 'Cross-sectional Area', symbol: 'A', unit: 'm²', defaultValue: 0.02 }
    ],
    outputUnit: 'Pascals',
    outputSymbol: 'Pa',
    explanation: 'Stress is a physical quantity that expresses the internal forces that neighboring particles of a continuous material exert on each other.',
    diagramType: 'stress',
    calculate: (inputs) => {
      const s = inputs.f / inputs.a;
      return {
        result: s,
        steps: [
          `Formula: σ = F / A`,
          `Substitute inputs: σ = ${inputs.f} N / ${inputs.a} m²`,
          `Calculate result: σ = ${s} Pa (${(s/1000000).toFixed(2)} MPa)`
        ]
      };
    }
  },
  // Thermodynamics
  {
    id: 'ideal-gas',
    title: 'Ideal Gas Law (Pressure)',
    category: 'Thermodynamics',
    description: 'Calculates ideal gas pressure P = (nRT) / V.',
    formula: 'P = (n × R × T) / V',
    inputs: [
      { id: 'n', label: 'Moles', symbol: 'n', unit: 'mol', defaultValue: 1 },
      { id: 't', label: 'Temperature', symbol: 'T', unit: 'K', defaultValue: 298.15 },
      { id: 'v', label: 'Volume', symbol: 'V', unit: 'm³', defaultValue: 0.0224 }
    ],
    outputUnit: 'Pascals',
    outputSymbol: 'Pa',
    explanation: 'The ideal gas law relates state parameters of a hypothetical ideal gas.',
    calculate: (inputs) => {
      const R = 8.314; // Gas constant
      const p = (inputs.n * R * inputs.t) / inputs.v;
      return {
        result: p,
        steps: [
          `Gas Constant R = 8.314 J/(mol·K)`,
          `Formula: P = (n × R × T) / V`,
          `Substitute: P = (${inputs.n} × 8.314 × ${inputs.t}) / ${inputs.v}`,
          `Calculate result: P = ${p.toFixed(2)} Pa`
        ]
      };
    }
  },
  // Fluid Mechanics
  {
    id: 'reynolds-number',
    title: 'Reynolds Number',
    category: 'Fluid Mechanics',
    description: 'Determines flow regime (Laminar vs Turbulent).',
    formula: 'Re = (ρ × v × L) / μ',
    inputs: [
      { id: 'rho', label: 'Density', symbol: 'ρ', unit: 'kg/m³', defaultValue: 1000 },
      { id: 'v', label: 'Velocity', symbol: 'v', unit: 'm/s', defaultValue: 2 },
      { id: 'l', label: 'Length/Diameter', symbol: 'L', unit: 'm', defaultValue: 0.05 },
      { id: 'mu', label: 'Dynamic Viscosity', symbol: 'μ', unit: 'Pa·s', defaultValue: 0.001 }
    ],
    outputUnit: 'Dimensionless',
    outputSymbol: 'Re',
    explanation: 'Reynolds number predicts fluid flow patterns in different fluid flow situations.',
    diagramType: 'fluid',
    calculate: (inputs) => {
      const re = (inputs.rho * inputs.v * inputs.l) / inputs.mu;
      const state = re < 2300 ? 'Laminar Flow' : re > 4000 ? 'Turbulent Flow' : 'Transient Flow';
      return {
        result: re,
        steps: [
          `Formula: Re = (ρ × v × L) / μ`,
          `Substitute: Re = (${inputs.rho} × ${inputs.v} × ${inputs.l}) / ${inputs.mu}`,
          `Result: Re = ${re.toFixed(2)}`,
          `Flow Regime: ${state}`
        ]
      };
    }
  },
  // Physics / Kinematics
  {
    id: 'kinematics-dist',
    title: 'Kinematic Distance',
    category: 'Physics',
    description: 'Calculates displacement with initial velocity and acceleration.',
    formula: 'd = v₀t + ½at²',
    inputs: [
      { id: 'v0', label: 'Initial Velocity', symbol: 'v₀', unit: 'm/s', defaultValue: 0 },
      { id: 'a', label: 'Acceleration', symbol: 'a', unit: 'm/s²', defaultValue: 9.81 },
      { id: 't', label: 'Time', symbol: 't', unit: 's', defaultValue: 5 }
    ],
    outputUnit: 'Meters',
    outputSymbol: 'm',
    explanation: 'Calculates the total distance traveled under uniform linear acceleration.',
    diagramType: 'projectile',
    calculate: (inputs) => {
      const d = inputs.v0 * inputs.t + 0.5 * inputs.a * Math.pow(inputs.t, 2);
      return {
        result: d,
        steps: [
          `Formula: d = v₀ × t + 0.5 × a × t²`,
          `Substitute: d = (${inputs.v0} × ${inputs.t}) + 0.5 × ${inputs.a} × (${inputs.t}²)`,
          `Calculate result: d = ${d.toFixed(2)} m`
        ]
      };
    }
  }
];
      
