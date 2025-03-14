
import { ServicePeriod } from "./servicePeriod";

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

// Mock data for testing
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
