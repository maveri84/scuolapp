
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

export type ContractType = 
  | "Tempo Indeterminato"
  | "Tempo Determinato"
  | "Supplenza"
  | "Part-Time";

export type LeaveRequestType = 
  | "malattia" // Malattia
  | "ferie" // Ferie
  | "permesso" // Permesso retribuito
  | "permessoNonRetribuito" // Permesso non retribuito
  | "aspettativa" // Aspettativa non retribuita
  | "congedo" // Congedo parentale
  | "congedo104" // Congedo legge 104
  | "donazioneSangue" // Donazione sangue
  | "lutti" // Lutto familiare
  | "matrimonio" // Congedo matrimoniale
  | "formazione" // Formazione
  | "dirittostudio" // Diritto allo studio (150 ore)
  | "esami" // Esami e concorsi
  | "altro"; // Altro

// Definizione delle tipologie di assenza disponibili per ogni tipo di contratto
export const leaveTypesByContract: Record<ContractType, LeaveRequestType[]> = {
  "Tempo Indeterminato": [
    "malattia", "ferie", "permesso", "permessoNonRetribuito", "aspettativa", 
    "congedo", "congedo104", "donazioneSangue", "lutti", "matrimonio", 
    "formazione", "dirittostudio", "esami", "altro"
  ],
  "Tempo Determinato": [
    "malattia", "ferie", "permesso", "permessoNonRetribuito", "congedo", 
    "donazioneSangue", "lutti", "matrimonio", "esami", "altro"
  ],
  "Supplenza": [
    "malattia", "ferie", "permesso", "lutti", "esami", "altro"
  ],
  "Part-Time": [
    "malattia", "ferie", "permesso", "permessoNonRetribuito", "congedo", 
    "congedo104", "donazioneSangue", "lutti", "matrimonio", "esami", "altro"
  ]
};

// Descrizioni e dettagli delle tipologie di assenza
export const leaveTypeDetails: Record<LeaveRequestType, {
  label: string;
  description: string;
  maxDays?: number;
  requiresDocumentation: boolean;
}> = {
  "malattia": {
    label: "Malattia",
    description: "Assenza per malattia con certificato medico",
    requiresDocumentation: true
  },
  "ferie": {
    label: "Ferie",
    description: "Periodo di riposo retribuito",
    requiresDocumentation: false
  },
  "permesso": {
    label: "Permesso retribuito",
    description: "Permesso breve con retribuzione",
    maxDays: 3,
    requiresDocumentation: false
  },
  "permessoNonRetribuito": {
    label: "Permesso non retribuito",
    description: "Permesso breve senza retribuzione",
    requiresDocumentation: false
  },
  "aspettativa": {
    label: "Aspettativa non retribuita",
    description: "Periodo di aspettativa senza retribuzione",
    requiresDocumentation: true
  },
  "congedo": {
    label: "Congedo parentale",
    description: "Congedo per maternità o paternità",
    requiresDocumentation: true
  },
  "congedo104": {
    label: "Congedo legge 104",
    description: "Permessi per assistenza familiari con disabilità",
    maxDays: 3,
    requiresDocumentation: true
  },
  "donazioneSangue": {
    label: "Donazione sangue",
    description: "Giornata per donazione sangue",
    maxDays: 1,
    requiresDocumentation: true
  },
  "lutti": {
    label: "Lutto familiare",
    description: "Permesso per lutto di familiari",
    maxDays: 3,
    requiresDocumentation: true
  },
  "matrimonio": {
    label: "Congedo matrimoniale",
    description: "Congedo per matrimonio",
    maxDays: 15,
    requiresDocumentation: true
  },
  "formazione": {
    label: "Formazione",
    description: "Aggiornamento professionale",
    requiresDocumentation: true
  },
  "dirittostudio": {
    label: "Diritto allo studio",
    description: "Permessi per studio (150 ore)",
    requiresDocumentation: true
  },
  "esami": {
    label: "Esami e concorsi",
    description: "Permessi per sostenere esami o concorsi",
    requiresDocumentation: true
  },
  "altro": {
    label: "Altro",
    description: "Altre tipologie di assenza",
    requiresDocumentation: false
  }
};

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
