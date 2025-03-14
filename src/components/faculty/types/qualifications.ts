
// Interfaces for academic qualifications and training

export interface AcademicQualification {
  id: string;
  title: string;
  institution: string;
  year: string;
  grade: string;
  attachmentUrl?: string;
}

export interface TrainingCourse {
  id: string;
  title: string;
  provider: string;
  startDate: string;
  endDate: string;
  totalHours: number;
  certificateUrl?: string;
}
