
import { ClassRegisterProps } from "./types";

export const classRegisterData: ClassRegisterProps = {
  classes: [
    { value: "1A", label: "1A" },
    { value: "1B", label: "1B" },
    { value: "2A", label: "2A" },
    { value: "2B", label: "2B" },
    { value: "3A", label: "3A" },
    { value: "3B", label: "3B" },
  ],
  
  subjects: [
    { value: "italiano", label: "Italiano" },
    { value: "matematica", label: "Matematica" },
    { value: "storia", label: "Storia" },
    { value: "scienze", label: "Scienze" },
    { value: "inglese", label: "Inglese" },
  ],
  
  students: [
    { id: "1", name: "Marco Rossi" },
    { id: "2", name: "Giulia Bianchi" },
    { id: "3", name: "Luca Verdi" },
    { id: "4", name: "Sofia Russo" },
    { id: "5", name: "Alessandro Ferrara" },
  ],
  
  teacherSchedule: [
    { day: "Lunedì", periods: [
      { time: "08:00-09:00", subject: "Italiano", class: "3A" },
      { time: "09:00-10:00", subject: "Italiano", class: "3A" },
      { time: "10:00-11:00", subject: "Storia", class: "2B" },
    ]},
    { day: "Martedì", periods: [
      { time: "08:00-09:00", subject: "Storia", class: "3A" },
      { time: "09:00-10:00", subject: "Italiano", class: "1A" },
    ]},
    { day: "Mercoledì", periods: [
      { time: "10:00-11:00", subject: "Italiano", class: "3A" },
      { time: "11:00-12:00", subject: "Storia", class: "3A" },
    ]},
    { day: "Giovedì", periods: [
      { time: "08:00-09:00", subject: "Italiano", class: "2B" },
      { time: "09:00-10:00", subject: "Storia", class: "1A" },
    ]},
    { day: "Venerdì", periods: [
      { time: "10:00-11:00", subject: "Italiano", class: "3A" },
      { time: "11:00-12:00", subject: "Storia", class: "2B" },
    ]},
  ]
};
