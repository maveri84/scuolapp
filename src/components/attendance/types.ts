
export interface AttendanceRecord {
  id: number;
  studentId: number;
  studentName: string;
  class: string;
  date: string;
  type: 'absence' | 'late' | 'early-exit' | 'justification';
  time: string;
  notes: string;
  justified: boolean;
}

export const mockAttendanceData: AttendanceRecord[] = [
  { 
    id: 1, 
    studentId: 1, 
    studentName: "Marco Bianchi", 
    class: "3A",
    date: "2024-05-20", 
    type: "absence", 
    time: "",
    notes: "Malattia",
    justified: true
  },
  { 
    id: 2, 
    studentId: 3, 
    studentName: "Luca Rossi", 
    class: "3A",
    date: "2024-05-20", 
    type: "late", 
    time: "08:45",
    notes: "Ritardo treno",
    justified: true
  },
  { 
    id: 3, 
    studentId: 5, 
    studentName: "Paolo Gialli", 
    class: "3A",
    date: "2024-05-19", 
    type: "early-exit", 
    time: "12:30",
    notes: "Visita medica",
    justified: true
  },
  { 
    id: 4, 
    studentId: 2, 
    studentName: "Anna Verdi", 
    class: "3A",
    date: "2024-05-18", 
    type: "absence", 
    time: "",
    notes: "",
    justified: false
  },
  { 
    id: 5, 
    studentId: 4, 
    studentName: "Elena Neri", 
    class: "3A",
    date: "2024-05-17", 
    type: "late", 
    time: "09:05",
    notes: "",
    justified: false
  },
];
