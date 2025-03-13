
// Faculty data types

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

export interface TeacherCommunication {
  id: string;
  date: string;
  subject: string;
  content: string;
  sender: string;
  attachments: string[];
  read: boolean;
}

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

// Mock data for teachers
export const mockTeachers: Teacher[] = [
  {
    id: "1",
    firstName: "Maria",
    lastName: "Rossi",
    taxCode: "RSSMRA80A01H501U",
    dateOfBirth: "1980-01-01",
    placeOfBirth: "Roma",
    gender: "F",
    nationality: "Italiana",
    address: "Via Roma 123",
    city: "Milano",
    postalCode: "20100",
    province: "MI",
    email: "maria.rossi@scuola.edu.it",
    personalEmail: "maria.rossi@gmail.com",
    phoneNumber: "02 1234567",
    cellPhone: "333 1234567",
    
    employeeId: "T001",
    position: "Docente di Matematica",
    contractType: "Tempo Indeterminato",
    hiringDate: "2010-09-01",
    subjectsTaught: ["Matematica", "Informatica"],
    isTenured: true,
    
    academicQualifications: [
      {
        id: "1",
        title: "Laurea in Matematica",
        institution: "Università di Milano",
        year: "2005",
        grade: "110/110 con lode"
      }
    ],
    teachingCertifications: [
      {
        id: "1",
        title: "Abilitazione all'insegnamento",
        institution: "MIUR",
        year: "2008",
        grade: "Superato"
      }
    ],
    trainingCourses: [
      {
        id: "1",
        title: "Didattica Digitale",
        provider: "Ministero dell'Istruzione",
        startDate: "2022-06-01",
        endDate: "2022-06-30",
        totalHours: 40
      }
    ],
    
    teachingServices: [
      {
        id: "1",
        schoolYear: "2022-2023",
        startDate: "2022-09-01",
        endDate: "2023-06-15",
        schoolName: "Liceo Scientifico Einstein",
        schoolType: "Liceo Scientifico",
        subjectsTaught: ["Matematica"],
        hoursPerWeek: 18,
        contractType: "Tempo Indeterminato",
        isTenured: true,
        notes: ""
      },
      {
        id: "2",
        schoolYear: "2021-2022",
        startDate: "2021-09-01",
        endDate: "2022-06-15",
        schoolName: "Liceo Scientifico Einstein",
        schoolType: "Liceo Scientifico",
        subjectsTaught: ["Matematica", "Informatica"],
        hoursPerWeek: 18,
        contractType: "Tempo Indeterminato",
        isTenured: true,
        notes: ""
      }
    ],
    
    roles: ["Docente", "Coordinatore di Dipartimento"],
    permissions: ["edit_grades", "view_student_data"],
    
    bankDetails: {
      iban: "IT60X0542811101000000123456",
      bank: "Intesa San Paolo"
    },
    
    notes: "Insegnante esperta di didattica digitale. Responsabile del laboratorio di informatica."
  },
  {
    id: "2",
    firstName: "Giuseppe",
    lastName: "Bianchi",
    taxCode: "BNCGPP75B02F205Z",
    dateOfBirth: "1975-02-02",
    placeOfBirth: "Milano",
    gender: "M",
    nationality: "Italiana",
    address: "Via Verdi 45",
    city: "Milano",
    postalCode: "20100",
    province: "MI",
    email: "giuseppe.bianchi@scuola.edu.it",
    personalEmail: "g.bianchi@gmail.com",
    phoneNumber: "02 7654321",
    cellPhone: "333 7654321",
    
    employeeId: "T002",
    position: "Docente di Italiano",
    contractType: "Tempo Indeterminato",
    hiringDate: "2008-09-01",
    subjectsTaught: ["Italiano", "Storia"],
    isTenured: true,
    
    academicQualifications: [
      {
        id: "1",
        title: "Laurea in Lettere",
        institution: "Università di Bologna",
        year: "2000",
        grade: "110/110"
      }
    ],
    teachingCertifications: [
      {
        id: "1",
        title: "Abilitazione all'insegnamento",
        institution: "MIUR",
        year: "2005",
        grade: "Superato"
      }
    ],
    trainingCourses: [],
    
    teachingServices: [
      {
        id: "1",
        schoolYear: "2022-2023",
        startDate: "2022-09-01",
        endDate: "2023-06-15",
        schoolName: "Liceo Classico Manzoni",
        schoolType: "Liceo Classico",
        subjectsTaught: ["Italiano", "Storia"],
        hoursPerWeek: 18,
        contractType: "Tempo Indeterminato",
        isTenured: true,
        notes: ""
      }
    ],
    
    roles: ["Docente"],
    permissions: ["edit_grades", "view_student_data"],
    
    bankDetails: {
      iban: "IT60X0542811101000000654321",
      bank: "Unicredit"
    },
    
    notes: ""
  }
];
