
import { ServicePeriod } from "./servicePeriod";

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
