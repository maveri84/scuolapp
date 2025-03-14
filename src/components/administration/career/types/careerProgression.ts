
import { CareerStep } from "./careerStep";

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
