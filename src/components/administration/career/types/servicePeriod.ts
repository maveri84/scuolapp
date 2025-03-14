
// Service Period for Pre-Tenure Recognition
export interface ServicePeriod {
  id: string;
  startDate: string;
  endDate: string;
  schoolYear: string;
  institution: string;
  role: string;
  category: string;
  contractType: string;
  daysCount: number;
  monthsCount: number;
  yearsCount: number;
  isValid: boolean;
  validationNotes?: string;
}
