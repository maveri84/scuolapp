
import { CareerReconstruction } from "./careerReconstruction";
import { ServicePeriod } from "./servicePeriod";

// Legal Reconstruction (Sentenza)
export interface LegalReconstruction extends CareerReconstruction {
  courtName: string;
  sentenceNumber: string;
  sentenceDate: string;
  sentenceUrl?: string;
  legalNotes: string;
}

// Mock data for testing
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
