
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
