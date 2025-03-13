
export interface Delegate {
  name: string;
  relationship: string;
  fiscalCode: string;
  phone: string;
}

export interface AcademicRecord {
  year: string;
  class: string;
  finalGrade: string;
  notes: string;
}

export interface Student {
  id: string;
  firstName: string;
  lastName: string;
  studentId: string;
  class: string;
  dateOfBirth: string;
  placeOfBirth: string;
  fiscalCode: string;
  address: string;
  city: string;
  postalCode: string;
  email: string;
  phone: string;
  
  disability: string;
  allergies: string;
  medications: string;
  attendsReligiousEducation: boolean;
  
  fatherFirstName: string;
  fatherLastName: string;
  fatherFiscalCode: string;
  fatherEmail: string;
  fatherPhone: string;
  fatherOccupation: string;
  
  motherFirstName: string;
  motherLastName: string;
  motherFiscalCode: string;
  motherEmail: string;
  motherPhone: string;
  motherOccupation: string;
  
  delegates: Delegate[];
  
  enrollmentDate: string;
  previousSchool: string;
  academicHistory: AcademicRecord[];
  
  specialNeeds: boolean;
  accommodations: string;
  
  notes: string;
}

export const mockStudentDetail: Student = {
  id: "1",
  firstName: "Marco",
  lastName: "Rossi",
  studentId: "SR2024001",
  class: "3A",
  dateOfBirth: "15/05/2008",
  placeOfBirth: "Milano",
  fiscalCode: "RSSMRC08E15F205Z",
  address: "Via Roma 123",
  city: "Milano",
  postalCode: "20100",
  email: "marco.rossi@student.example.com",
  phone: "333-1234567",
  
  disability: "Nessuna",
  allergies: "Polline",
  medications: "Nessuno",
  attendsReligiousEducation: true,
  
  fatherFirstName: "Giuseppe",
  fatherLastName: "Rossi",
  fatherFiscalCode: "RSSGPP70A01F205Z", 
  fatherEmail: "giuseppe.rossi@example.com",
  fatherPhone: "333-7654321",
  fatherOccupation: "Ingegnere",
  
  motherFirstName: "Maria",
  motherLastName: "Bianchi",
  motherFiscalCode: "BNCMRA75B41F205Y",
  motherEmail: "maria.rossi@example.com",
  motherPhone: "333-9876543",
  motherOccupation: "Medico",
  
  delegates: [
    { name: "Anna Verdi", relationship: "Nonna", fiscalCode: "VRDNNA50C44F205X", phone: "333-1122334" },
    { name: "Paolo Neri", relationship: "Zio", fiscalCode: "NREPLA65D23F205Y", phone: "333-5566778" }
  ],
  
  enrollmentDate: "01/09/2022",
  previousSchool: "Scuola Media Manzoni",
  academicHistory: [
    { year: "2022-2023", class: "1A", finalGrade: "8/10", notes: "Ottimo rendimento in matematica" },
    { year: "2023-2024", class: "2A", finalGrade: "8.5/10", notes: "Miglioramento nelle lingue straniere" }
  ],
  
  specialNeeds: false,
  accommodations: "",
  
  notes: "Partecipa attivamente alle attività extracurriculari. Rappresentante di classe per l'anno 2023-2024."
};
