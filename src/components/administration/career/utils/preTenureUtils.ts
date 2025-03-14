
import { PreTenureRecognition, ServicePeriod } from "../types";

// Calculate duration of a service period
export const calculateServicePeriodDuration = (startDate: string, endDate: string) => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const diffTime = Math.abs(end.getTime() - start.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  const diffMonths = Math.floor(diffDays / 30);
  const diffYears = Math.floor(diffDays / 365);
  
  return {
    daysCount: diffDays,
    monthsCount: diffMonths,
    yearsCount: diffYears
  };
};

// Calculate totals from a collection of service periods
export const calculateTotals = (periods: ServicePeriod[]) => {
  const totalDays = periods.reduce((sum, period) => sum + period.daysCount, 0);
  const totalMonths = Math.floor(totalDays / 30);
  const totalYears = Math.floor(totalDays / 365);
  
  return {
    totalRecognizedDays: totalDays,
    totalRecognizedMonths: totalMonths,
    totalRecognizedYears: totalYears
  };
};

// Calculate recognized service based on parameters
export const calculateRecognizedService = (
  totalYears: number, 
  additionalMonths: number, 
  additionalDays: number,
  firstFourYearsPercentage: number,
  remainingYearsPercentage: number
) => {
  // Convert everything to days
  const totalDays = (totalYears * 365) + (additionalMonths * 30) + additionalDays;
  
  // Primi 4 anni al 100%
  const fourYearsInDays = 4 * 365;
  let recognizedDays = 0;
  
  if (totalDays <= fourYearsInDays) {
    // Se il servizio è meno di 4 anni, tutto al 100%
    recognizedDays = totalDays * (firstFourYearsPercentage / 100);
  } else {
    // Primi 4 anni al percentuale configurata
    recognizedDays = fourYearsInDays * (firstFourYearsPercentage / 100);
    
    // Resto alla percentuale configurata
    const remainingDays = totalDays - fourYearsInDays;
    recognizedDays += remainingDays * (remainingYearsPercentage / 100);
  }
  
  const recognizedYears = Math.floor(recognizedDays / 365);
  const remainingDays = recognizedDays % 365;
  const recognizedMonths = Math.floor(remainingDays / 30);
  const finalDays = Math.floor(remainingDays % 30);
  
  return {
    recognizedDays,
    recognizedYears,
    recognizedMonths,
    finalDays
  };
};

// Create a new service period
export const createServicePeriod = (
  startDate: string, 
  endDate: string, 
  schoolYear: string,
  institution: string,
  role: string = "Docente",
  category: string = "Docente",
  contractType: string = "Tempo determinato"
): ServicePeriod => {
  const duration = calculateServicePeriodDuration(startDate, endDate);
  const start = new Date(startDate);
  const end = new Date(endDate);
  
  return {
    id: `sp${Math.random().toString(36).substring(7)}`,
    startDate,
    endDate,
    schoolYear: schoolYear || `${start.getFullYear()}-${end.getFullYear()}`,
    institution,
    role,
    category,
    contractType,
    daysCount: duration.daysCount,
    monthsCount: duration.monthsCount,
    yearsCount: duration.yearsCount,
    isValid: true
  };
};
