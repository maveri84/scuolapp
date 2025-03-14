
export interface LeaveAttachment {
  id: string;
  fileName: string;
  fileSize: number;
  uploadDate: string;
  fileUrl: string;
}

export type LeaveRequestStatus = 
  | "pending" // In attesa
  | "approved" // Approvata
  | "rejected" // Respinta
  | "canceled"; // Annullata

export type LeaveRequestType = 
  | "malattia" // Malattia
  | "ferie" // Ferie
  | "permesso" // Permesso retribuito
  | "aspettativa" // Aspettativa non retribuita
  | "congedo" // Congedo parentale
  | "formazione" // Formazione
  | "altro"; // Altro

export interface LeaveRequest {
  id: string;
  teacherId: string;
  type: LeaveRequestType;
  startDate: string;
  endDate: string;
  status: LeaveRequestStatus;
  description: string;
  submissionDate: string;
  approvalDate?: string;
  approvedBy?: string;
  attachments: LeaveAttachment[];
  notes?: string;
}

// Mock data for leave requests
export const mockLeaveRequests: LeaveRequest[] = [
  {
    id: "lr1",
    teacherId: "T001",
    type: "malattia",
    startDate: "2023-11-15",
    endDate: "2023-11-18",
    status: "approved",
    description: "Influenza stagionale",
    submissionDate: "2023-11-14",
    approvalDate: "2023-11-14",
    approvedBy: "P001",
    attachments: [
      {
        id: "att1",
        fileName: "certificato_medico.pdf",
        fileSize: 125000,
        uploadDate: "2023-11-14",
        fileUrl: "#"
      }
    ]
  },
  {
    id: "lr2",
    teacherId: "T001",
    type: "permesso",
    startDate: "2023-12-05",
    endDate: "2023-12-05",
    status: "pending",
    description: "Visita medica specialistica",
    submissionDate: "2023-11-28",
    attachments: []
  }
];
