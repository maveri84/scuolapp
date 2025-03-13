
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { 
  UserCircle, 
  Users, 
  GraduationCap, 
  FileText, 
  UserCog,
  MessageCircle,
  Heart,
  Calculator,
  UserCheck,
  ArrowLeft,
  Save
} from "lucide-react";
import { toast } from "sonner";
import { Student } from "./types/student";
import ProfileCard from "./profile/ProfileCard";
import PersonalInfoTab from "./tabs/PersonalInfoTab";
import ParentsTab from "./tabs/ParentsTab";
import DelegatesTab from "./tabs/DelegatesTab";
import AcademicTab from "./tabs/AcademicTab";
import SpecialNeedsTab from "./tabs/SpecialNeedsTab";

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
  
  motherFirstName: "",
  motherLastName: "",
  motherFiscalCode: "",
  motherEmail: "",
  motherPhone: "",
  motherOccupation: "",
  
  delegates: [],
  
  enrollmentDate: "",
  previousSchool: "",
  academicHistory: [],
  
  specialNeeds: false,
  accommodations: "",
  
  notes: ""
};

interface AddStudentFormProps {
  onCancel: () => void;
  onSave: (student: Student) => void;
}

const AddStudentForm: React.FC<AddStudentFormProps> = ({ onCancel, onSave }) => {
  const [student, setStudent] = useState<Student>({...emptyStudent});
  const [activeTab, setActiveTab] = useState("info");
  const [isSubmitting, setIsSubmitting] = useState(false);

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
        id: `new-${Date.now()}`,
        studentId: `SR${new Date().getFullYear()}${Math.floor(1000 + Math.random() * 9000)}`
      };
      
      onSave(newStudent);
      toast.success("Studente aggiunto con successo");
      setIsSubmitting(false);
    }, 1000);
  };

  const updateStudentField = (field: keyof Student, value: any) => {
    setStudent(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Button variant="outline" onClick={onCancel}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Torna alla lista
        </Button>
        <Button onClick={handleSubmit} disabled={isSubmitting}>
          <Save className="mr-2 h-4 w-4" />
          {isSubmitting ? "Salvataggio..." : "Salva Studente"}
        </Button>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        <ProfileCard student={student} />
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="mb-4 flex-wrap">
          <TabsTrigger value="info">
            <UserCog className="mr-2 h-4 w-4" />
            Informazioni Personali
          </TabsTrigger>
          <TabsTrigger value="parents">
            <Users className="mr-2 h-4 w-4" />
            Genitori
          </TabsTrigger>
          <TabsTrigger value="delegates">
            <UserCheck className="mr-2 h-4 w-4" />
            Delegati
          </TabsTrigger>
          <TabsTrigger value="academic">
            <GraduationCap className="mr-2 h-4 w-4" />
            Curriculum Scolastico
          </TabsTrigger>
          <TabsTrigger value="special">
            <Heart className="mr-2 h-4 w-4" />
            Particolarità
          </TabsTrigger>
        </TabsList>

        <TabsContent value="info" className="space-y-4">
          <PersonalInfoTab 
            student={student} 
            onChange={(field, value) => updateStudentField(field as keyof Student, value)}
          />
        </TabsContent>

        <TabsContent value="parents" className="space-y-4">
          <ParentsTab 
            student={student} 
            onChange={(field, value) => updateStudentField(field as keyof Student, value)}
          />
        </TabsContent>

        <TabsContent value="delegates" className="space-y-4">
          <DelegatesTab 
            student={student} 
            onChange={(delegates) => updateStudentField('delegates', delegates)}
          />
        </TabsContent>

        <TabsContent value="academic" className="space-y-4">
          <AcademicTab 
            student={student} 
            onChange={(field, value) => updateStudentField(field as keyof Student, value)}
          />
        </TabsContent>

        <TabsContent value="special" className="space-y-4">
          <SpecialNeedsTab 
            student={student} 
            onChange={(field, value) => updateStudentField(field as keyof Student, value)}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AddStudentForm;
