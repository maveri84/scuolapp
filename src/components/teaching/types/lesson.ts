
// Define types for lessons and related data

export type LessonStatus = 'draft' | 'upcoming' | 'completed';

export interface LessonPlan {
  id: string;
  title: string;
  subject: string;
  class: string;
  date: string;
  duration: number;
  objectives: string;
  materials: string[];
  activities: string;
  assessment: string;
  notes: string;
  status: LessonStatus;
}

export interface ClassOption {
  id: string;
  name: string;
}

export interface SubjectOption {
  id: string;
  name: string;
}

// Mock data for classes
export const classesData: ClassOption[] = [
  { id: '1A', name: '1A' },
  { id: '1B', name: '1B' },
  { id: '2A', name: '2A' },
  { id: '2B', name: '2B' },
  { id: '3A', name: '3A' },
  { id: '3B', name: '3B' },
];

// Mock data for subjects
export const subjectsData: SubjectOption[] = [
  { id: '1', name: 'Matematica' },
  { id: '2', name: 'Italiano' },
  { id: '3', name: 'Storia' },
  { id: '4', name: 'Geografia' },
  { id: '5', name: 'Scienze' },
  { id: '6', name: 'Inglese' },
  { id: '7', name: 'Arte' },
  { id: '8', name: 'Musica' },
  { id: '9', name: 'Educazione Fisica' },
  { id: '10', name: 'Tecnologia' },
];

// Mock lesson plans
export const mockLessonPlans: LessonPlan[] = [
  {
    id: '1',
    title: 'Le frazioni: introduzione',
    subject: 'Matematica',
    class: '1A',
    date: '2024-04-15',
    duration: 60,
    objectives: 'Comprendere il concetto di frazione come parte di un intero. Saper rappresentare graficamente le frazioni.',
    materials: ['Libro di testo', 'Schede didattiche', 'LIM'],
    activities: 'Lezione frontale (20 min)\nAttività pratiche con materiali manipolativi (30 min)\nEsercizi alla lavagna (10 min)',
    assessment: 'Partecipazione in classe\nEsercizi individuali di verifica',
    notes: 'Prestare attenzione agli studenti con difficoltà nel concetto di divisione',
    status: 'completed'
  },
  {
    id: '2',
    title: 'I verbi regolari al presente',
    subject: 'Italiano',
    class: '1B',
    date: '2024-04-16',
    duration: 45,
    objectives: 'Riconoscere i verbi regolari. Saper coniugare i verbi al presente indicativo.',
    materials: ['Libro di testo', 'LIM', 'Schede di esercizi'],
    activities: 'Ripasso delle regole (15 min)\nEsempi pratici (15 min)\nEsercizi individuali (15 min)',
    assessment: 'Esercizi di completamento\nProva di verifica scritta',
    notes: '',
    status: 'upcoming'
  },
  {
    id: '3',
    title: 'La civiltà romana: le origini',
    subject: 'Storia',
    class: '2A',
    date: '2024-04-18',
    duration: 90,
    objectives: 'Conoscere le origini di Roma e le principali caratteristiche della civiltà romana',
    materials: ['Libro di testo', 'Presentazione PowerPoint', 'Documentario video'],
    activities: 'Introduzione all\'argomento (20 min)\nVisione documentario (30 min)\nDiscussione guidata (20 min)\nAttività di gruppo (20 min)',
    assessment: 'Partecipazione alla discussione\nElaborato di gruppo',
    notes: 'Preparare la mappa concettuale da distribuire agli studenti',
    status: 'draft'
  }
];
