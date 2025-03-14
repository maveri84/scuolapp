
import { useState } from "react";
import { Student } from "../types/student";
import { toast } from "sonner";

interface UseStudentFormProps {
  onSave: (student: Student) => void;
  initialStudent?: Student;
}

const emptyStudent: Student = {
  id: "",
  firstName: "",
  lastName: "",
  studentId: "",
  class: "",
  dateOfBirth: "",
  placeOfBirth: "",
  fiscalCode: "",
  address: "",
  city: "",
  postalCode: "",
  email: "",
  phone: "",
  
  disability: "",
  allergies: "",
  medications: "",
  attendsReligiousEducation: false,
  
  fatherFirstName: "",
  fatherLastName: "",
  fatherFiscalCode: "",
  fatherEmail: "",
  fatherPhone: "",
  fatherOccupation: "",
  fatherEducation: "",
  fatherMaritalStatus: "",
  
  motherFirstName: "",
  motherLastName: "",
  motherFiscalCode: "",
  motherEmail: "",
  motherPhone: "",
  motherOccupation: "",
  motherEducation: "",
  motherMaritalStatus: "",
  
  delegates: [],
  
  enrollmentDate: "",
  previousSchool: "",
  academicHistory: [],
  physicalEducationExemption: null,
  
  specialNeeds: false,
  accommodations: "",
  
  useSchoolBus: false,
  independentExit: false,
  localExitPermission: false,
  privacyConsent: false,
  
  notes: ""
};

export function useStudentForm({ onSave, initialStudent }: UseStudentFormProps) {
  const [student, setStudent] = useState<Student>(initialStudent ? {...initialStudent} : {...emptyStudent});
  const [activeTab, setActiveTab] = useState("info");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const updateStudentField = (field: keyof Student, value: any) => {
    setStudent(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = () => {
    // Validate required fields
    if (!student.firstName || !student.lastName) {
      toast.error("Nome e cognome sono campi obbligatori");
      setActiveTab("info");
      return;
    }

    setIsSubmitting(true);
    
    // In a real application, you would send this data to your API
    // For now, we'll simulate a delay and then call onSave
    setTimeout(() => {
      // Generate a unique ID and student ID
      const newStudent = {
        ...student,
        id: student.id || `new-${Date.now()}`,
        studentId: student.studentId || `SR${new Date().getFullYear()}${Math.floor(1000 + Math.random() * 9000)}`
      };
      
      onSave(newStudent);
      toast.success("Studente aggiunto con successo");
      setIsSubmitting(false);
    }, 1000);
  };

  return {
    student,
    activeTab,
    isSubmitting,
    setActiveTab,
    updateStudentField,
    handleSubmit
  };
}
