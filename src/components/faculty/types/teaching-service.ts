
// Teaching service history and details

export interface TeachingService {
  id: string;
  schoolYear: string;
  startDate: string;
  endDate: string;
  schoolName: string;
  schoolType: string;
  subjectsTaught: string[];
  hoursPerWeek: number;
  contractType: string;
  isTenured: boolean;
  notes: string;
}
