
import { Teacher } from "../types/faculty";

// Initial empty teacher template
export const emptyTeacher: Teacher = {
  id: "",
  firstName: "",
  lastName: "",
  taxCode: "",
  dateOfBirth: "",
  placeOfBirth: "",
  gender: "M",
  nationality: "Italiana",
  address: "",
  city: "",
  postalCode: "",
  province: "",
  email: "",
  phoneNumber: "",
  
  employeeId: "",
  position: "",
  contractType: "Tempo Determinato",
  hiringDate: "",
  subjectsTaught: [],
  isTenured: false,
  
  academicQualifications: [],
  teachingCertifications: [],
  trainingCourses: [],
  
  teachingServices: [],
  
  roles: ["Docente"],
  permissions: [],
  
  notes: ""
};

export const getInitialTeacher = (
  teacherId: string | null, 
  isNewTeacher: boolean, 
  teachers: Teacher[]
): Teacher => {
  if (isNewTeacher) {
    return emptyTeacher;
  }
  
  return teacherId ? teachers.find(t => t.id === teacherId) || emptyTeacher : emptyTeacher;
};
