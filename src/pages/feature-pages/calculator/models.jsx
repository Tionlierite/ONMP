export const Measure = {
	Mg: 'mg',
	Ml: 'ml',
	ME: 'ME',
	Blob: 'blob'
  }
  
export const CalculationParametr = {
	Age: 'age',
	Weight: 'weight'
}

export interface Diagnosis {
	diagnosis: string;
	dose: number;
}

export interface MedicineItem {
	title: string;
	measure: Measure;
	adultDose: Diagnosis[];
	childrenDose: Diagnosis[];
	childMeasure: CalculationParametr;
	contraindications: string[];
}
