
// Define types for teaching materials and related data

export interface FileItem {
  id: string;
  name: string;
  type: string;
  size: string;
  lastModified: string;
  subject: string;
  class: string;
}

export interface SubjectOption {
  id: string;
  name: string;
}

export interface ClassOption {
  id: string;
  name: string;
}

// Mock data for Google Drive files
export const mockFiles: FileItem[] = [
  { id: '1', name: 'Lezione_Matematica_1.pdf', type: 'application/pdf', size: '2.4 MB', lastModified: '2024-03-10', subject: 'Matematica', class: '3A' },
  { id: '2', name: 'Dispense_Storia.docx', type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', size: '1.8 MB', lastModified: '2024-03-05', subject: 'Storia', class: '2A' },
  { id: '3', name: 'Esercizi_Grammatica.pdf', type: 'application/pdf', size: '1.2 MB', lastModified: '2024-03-12', subject: 'Italiano', class: '1B' },
  { id: '4', name: 'Slide_Scienze.pptx', type: 'application/vnd.openxmlformats-officedocument.presentationml.presentation', size: '4.6 MB', lastModified: '2024-03-08', subject: 'Scienze', class: '3A' },
  { id: '5', name: 'Verifica_Inglese.docx', type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', size: '0.9 MB', lastModified: '2024-03-11', subject: 'Inglese', class: '2B' },
];

// Mock data for subjects
export const subjects: SubjectOption[] = [
  { id: '1', name: 'Matematica' },
  { id: '2', name: 'Storia' },
  { id: '3', name: 'Italiano' },
  { id: '4', name: 'Scienze' },
  { id: '5', name: 'Inglese' },
  { id: '6', name: 'Geografia' },
  { id: '7', name: 'Arte' },
  { id: '8', name: 'Musica' },
  { id: '9', name: 'Tecnologia' },
  { id: '10', name: 'Educazione Fisica' },
];

// Mock data for classes
export const classes: ClassOption[] = [
  { id: '1', name: '1A' },
  { id: '2', name: '1B' },
  { id: '3', name: '2A' },
  { id: '4', name: '2B' },
  { id: '5', name: '3A' },
  { id: '6', name: '3B' },
];
