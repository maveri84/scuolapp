
export interface ClassSelectProps {
  value: string;
  label: string;
}

export interface SubjectSelectProps {
  value: string;
  label: string;
}

export interface StudentProps {
  id: string;
  name: string;
}

export interface TeacherSchedulePeriod {
  time: string;
  subject: string;
  class: string;
}

export interface TeacherScheduleProps {
  day: string;
  periods: TeacherSchedulePeriod[];
}

export interface ClassRegisterProps {
  classes: ClassSelectProps[];
  subjects: SubjectSelectProps[];
  students: StudentProps[];
  teacherSchedule: TeacherScheduleProps[];
}
