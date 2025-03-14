
// Base interface for career progression steps
export interface CareerStep {
  id: string;
  startDate: string;
  endDate: string;
  role: string;
  category: string; // Docente, ATA, Dirigente
  contractType: string; // Tempo determinato, indeterminato
  institution: string; // Nome istituzione
  description: string;
  salary: number;
  salaryGrade: string; // Fascia stipendiale
}

// Career Progression
export interface CareerProgression {
  id: string;
  teacherId: string;
  teacherName: string;
  currentStep: CareerStep;
  previousStep: CareerStep;
  progressionDate: string;
  approvalStatus: "pending" | "approved" | "rejected";
  approvalDate?: string;
  approvedBy?: string;
  notes: string;
  documents: string[]; // Array of document IDs
}

// Career Reconstruction
export interface CareerReconstruction {
  id: string;
  teacherId: string;
  teacherName: string;
  requestDate: string;
  reconstructionType: "normal" | "legal";
  servicePeriods: ServicePeriod[];
  status: "draft" | "submitted" | "processing" | "approved" | "rejected";
  submissionDate?: string;
  approvalDate?: string;
  approvedBy?: string;
  decree?: {
    decreeName: string;
    decreeNumber: string;
    decreeDate: string;
    decreeUrl?: string;
  };
  notes: string;
}

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

// Legal Reconstruction (Sentenza)
export interface LegalReconstruction extends CareerReconstruction {
  courtName: string;
  sentenceNumber: string;
  sentenceDate: string;
  sentenceUrl?: string;
  legalNotes: string;
}

// Pre-Tenure Recognition
export interface PreTenureRecognition {
  id: string;
  teacherId: string;
  teacherName: string;
  requestDate: string;
  servicePeriods: ServicePeriod[];
  totalRecognizedDays: number;
  totalRecognizedMonths: number;
  totalRecognizedYears: number;
  status: "draft" | "submitted" | "processing" | "approved" | "rejected";
  submissionDate?: string;
  approvalDate?: string;
  approvedBy?: string;
  decree?: {
    decreeName: string;
    decreeNumber: string;
    decreeDate: string;
    decreeUrl?: string;
  };
  notes: string;
}

// Mock data for testing
export const mockCareerProgressions: CareerProgression[] = [
  {
    id: "prog1",
    teacherId: "t1",
    teacherName: "Mario Rossi",
    currentStep: {
      id: "step2",
      startDate: "2023-09-01",
      endDate: "",
      role: "Docente",
      category: "Docente",
      contractType: "Tempo indeterminato",
      institution: "Liceo Scientifico A. Einstein",
      description: "Passaggio a fascia stipendiale 9-14",
      salary: 24000,
      salaryGrade: "9-14"
    },
    previousStep: {
      id: "step1",
      startDate: "2018-09-01",
      endDate: "2023-08-31",
      role: "Docente",
      category: "Docente",
      contractType: "Tempo indeterminato",
      institution: "Liceo Scientifico A. Einstein",
      description: "Fascia stipendiale 0-8",
      salary: 22000,
      salaryGrade: "0-8"
    },
    progressionDate: "2023-09-01",
    approvalStatus: "approved",
    approvalDate: "2023-10-15",
    approvedBy: "Giuseppe Verdi",
    notes: "Progressione automatica per anzianità di servizio",
    documents: ["doc1", "doc2"]
  },
  {
    id: "prog2",
    teacherId: "t2",
    teacherName: "Laura Bianchi",
    currentStep: {
      id: "step4",
      startDate: "2024-01-01",
      endDate: "",
      role: "Docente",
      category: "Docente",
      contractType: "Tempo indeterminato",
      institution: "ITC Marco Polo",
      description: "Passaggio a fascia stipendiale 15-20",
      salary: 26000,
      salaryGrade: "15-20"
    },
    previousStep: {
      id: "step3",
      startDate: "2019-01-01",
      endDate: "2023-12-31",
      role: "Docente",
      category: "Docente",
      contractType: "Tempo indeterminato",
      institution: "ITC Marco Polo",
      description: "Fascia stipendiale 9-14",
      salary: 24000,
      salaryGrade: "9-14"
    },
    progressionDate: "2024-01-01",
    approvalStatus: "pending",
    notes: "In attesa di approvazione per passaggio di fascia",
    documents: ["doc3"]
  }
];

export const mockCareerRecons: CareerReconstruction[] = [
  {
    id: "recon1",
    teacherId: "t1",
    teacherName: "Mario Rossi",
    requestDate: "2023-06-10",
    reconstructionType: "normal",
    servicePeriods: [
      {
        id: "sp1",
        startDate: "2010-09-01",
        endDate: "2011-08-31",
        schoolYear: "2010/2011",
        institution: "Istituto Comprensivo G. Leopardi",
        role: "Docente",
        category: "Docente",
        contractType: "Tempo determinato",
        daysCount: 365,
        monthsCount: 12,
        yearsCount: 1,
        isValid: true
      },
      {
        id: "sp2",
        startDate: "2011-09-01",
        endDate: "2012-08-31",
        schoolYear: "2011/2012",
        institution: "Istituto Comprensivo G. Leopardi",
        role: "Docente",
        category: "Docente",
        contractType: "Tempo determinato",
        daysCount: 365,
        monthsCount: 12,
        yearsCount: 1,
        isValid: true
      }
    ],
    status: "approved",
    submissionDate: "2023-06-15",
    approvalDate: "2023-07-20",
    approvedBy: "Giuseppe Verdi",
    decree: {
      decreeName: "Decreto di Ricostruzione Carriera",
      decreeNumber: "RIC-2023-1254",
      decreeDate: "2023-07-20"
    },
    notes: "Ricostruzione carriera per servizio pre-ruolo"
  }
];

export const mockLegalRecons: LegalReconstruction[] = [
  {
    id: "legal1",
    teacherId: "t2",
    teacherName: "Laura Bianchi",
    requestDate: "2023-04-05",
    reconstructionType: "legal",
    servicePeriods: [
      {
        id: "sp3",
        startDate: "2015-09-01",
        endDate: "2016-08-31",
        schoolYear: "2015/2016",
        institution: "Liceo Classico G. Carducci",
        role: "Docente",
        category: "Docente",
        contractType: "Tempo determinato",
        daysCount: 365,
        monthsCount: 12,
        yearsCount: 1,
        isValid: true
      },
      {
        id: "sp4",
        startDate: "2016-09-01",
        endDate: "2017-08-31",
        schoolYear: "2016/2017",
        institution: "Liceo Classico G. Carducci",
        role: "Docente",
        category: "Docente",
        contractType: "Tempo determinato",
        daysCount: 365,
        monthsCount: 12,
        yearsCount: 1,
        isValid: true
      }
    ],
    status: "approved",
    submissionDate: "2023-04-10",
    approvalDate: "2023-05-25",
    approvedBy: "Giuseppe Verdi",
    decree: {
      decreeName: "Decreto di Ricostruzione Carriera",
      decreeNumber: "RIC-LEG-2023-089",
      decreeDate: "2023-05-25"
    },
    notes: "Ricostruzione carriera a seguito di sentenza",
    courtName: "Tribunale di Milano",
    sentenceNumber: "1234/2023",
    sentenceDate: "2023-03-15",
    legalNotes: "Sentenza favorevole per riconoscimento integrale servizio pre-ruolo"
  }
];

export const mockPreTenureRecognitions: PreTenureRecognition[] = [
  {
    id: "pretenure1",
    teacherId: "t3",
    teacherName: "Antonio Verdi",
    requestDate: "2023-09-15",
    servicePeriods: [
      {
        id: "sp5",
        startDate: "2018-09-01",
        endDate: "2019-08-31",
        schoolYear: "2018/2019",
        institution: "ITIS A. Volta",
        role: "Docente",
        category: "Docente",
        contractType: "Tempo determinato",
        daysCount: 365,
        monthsCount: 12,
        yearsCount: 1,
        isValid: true
      },
      {
        id: "sp6",
        startDate: "2019-09-01",
        endDate: "2020-08-31",
        schoolYear: "2019/2020",
        institution: "ITIS A. Volta",
        role: "Docente",
        category: "Docente",
        contractType: "Tempo determinato",
        daysCount: 365,
        monthsCount: 12,
        yearsCount: 1,
        isValid: true
      },
      {
        id: "sp7",
        startDate: "2020-09-01",
        endDate: "2021-08-31",
        schoolYear: "2020/2021",
        institution: "ITIS A. Volta",
        role: "Docente",
        category: "Docente",
        contractType: "Tempo determinato",
        daysCount: 365,
        monthsCount: 12,
        yearsCount: 1,
        isValid: true
      }
    ],
    totalRecognizedDays: 1095,
    totalRecognizedMonths: 36,
    totalRecognizedYears: 3,
    status: "approved",
    submissionDate: "2023-09-20",
    approvalDate: "2023-11-10",
    approvedBy: "Giuseppe Verdi",
    decree: {
      decreeName: "Decreto di Riconoscimento Servizio Pre-Ruolo",
      decreeNumber: "PRE-2023-078",
      decreeDate: "2023-11-10"
    },
    notes: "Riconoscimento servizio pre-ruolo per tre anni scolastici completi"
  }
];
