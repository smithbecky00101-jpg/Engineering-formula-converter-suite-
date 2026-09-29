import { UnitCategory } from '../types';

export const UNIT_DATA: Record<string, UnitCategory> = {
  Length: {
    name: 'Length',
    units: {
      'Meter (m)': 1,
      'Kilometer (km)': 1000,
      'Centimeter (cm)': 0.01,
      'Millimeter (mm)': 0.001,
      'Inch (in)': 0.0254,
      'Foot (ft)': 0.3048,
      'Yard (yd)': 0.9144,
      'Mile (mi)': 1609.34
    }
  },
  Mass: {
    name: 'Mass',
    units: {
      'Kilogram (kg)': 1,
      'Gram (g)': 0.001,
      'Milligram (mg)': 0.000001,
      'Pound (lb)': 0.453592,
      'Ounce (oz)': 0.0283495,
      'Metric Tonne (t)': 1000
    }
  },
  Force: {
    name: 'Force',
    units: {
      'Newton (N)': 1,
      'Kilonewton (kN)': 1000,
      'Pound-force (lbf)': 4.44822,
      'Dyne (dyn)': 0.00001
    }
  },
  Pressure: {
    name: 'Pressure',
    units: {
      'Pascal (Pa)': 1,
      'Kilopascal (kPa)': 1000,
      'Bar': 100000,
      'PSI (lb/in²)': 6894.76,
      'Atmosphere (atm)': 101325
    }
  },
  Energy: {
    name: 'Energy',
    units: {
      'Joule (J)': 1,
      'Kilojoule (kJ)': 1000,
      'Calorie (cal)': 4.184,
      'Kilocalorie (kcal)': 4184,
      'Watt-hour (Wh)': 3600,
      'Kilowatt-hour (kWh)': 3600000,
      'BTU': 1055.06
    }
  },
  Power: {
    name: 'Power',
    units: {
      'Watt (W)': 1,
      'Kilowatt (kW)': 1000,
      'Horsepower (hp)': 745.7,
      'BTU/hr': 0.293071
    }
  },
  Speed: {
    name: 'Speed',
    units: {
      'm/s': 1,
      'km/h': 0.277778,
      'mph': 0.44704,
      'Knot': 0.514444
    }
  }
};

export function convertValue(value: number, fromUnit: string, toUnit: string, category: string): number {
  if (category === 'Temperature') {
    return convertTemperature(value, fromUnit, toUnit);
  }
  const categoryData = UNIT_DATA[category];
  if (!categoryData) return 0;

  const baseValue = value * categoryData.units[fromUnit];
  return baseValue / categoryData.units[toUnit];
}

function convertTemperature(val: number, from: string, to: string): number {
  let celsius = val;
  if (from === 'Fahrenheit (°F)') celsius = (val - 32) * (5 / 9);
  if (from === 'Kelvin (K)') celsius = val - 273.15;

  if (to === 'Celsius (°C)') return celsius;
  if (to === 'Fahrenheit (°F)') return (celsius * 9 / 5) + 32;
  if (to === 'Kelvin (K)') return celsius + 273.15;
  return celsius;
                             }
