
// Base teacher interface containing personal and employment information
import { AcademicQualification, TrainingCourse } from './qualifications';
import { TeachingService } from './teaching-service';

export interface Teacher {
  id: string;
  firstName: string;
  lastName: string;
  taxCode: string; // Codice Fiscale
  dateOfBirth: string;
  placeOfBirth: string;
  gender: "M" | "F" | "O";
  nationality: string;
  address: string;
  city: string;
  postalCode: string;
  province: string;
  email: string;
  personalEmail?: string;
  phoneNumber: string;
  cellPhone?: string;
  profileImageUrl?: string;
  
  // Employment details
  employeeId: string;
  position: string;
  contractType: string;
  hiringDate: string;
  subjectsTaught: string[];
  isTenured: boolean; // Di ruolo
  
  // Academic and professional qualifications
  academicQualifications: AcademicQualification[];
  teachingCertifications: AcademicQualification[];
  trainingCourses: TrainingCourse[];
  
  // Teaching history and service
  teachingServices: TeachingService[];
  
  // Permissions and special roles
  roles: string[];
  permissions: string[];
  
  // Additional info
  bankDetails?: {
    iban: string;
    bank: string;
  };
  disabilities?: string;
  notes: string;
}
