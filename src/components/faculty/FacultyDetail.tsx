
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { 
  ArrowLeft, 
  Save, 
  User, 
  Building, 
  GraduationCap, 
  Briefcase, 
  FileText, 
  Mail,
  BadgeEuro,
  Shield 
} from "lucide-react";
import { mockTeachers, Teacher } from "./types/faculty";
import PersonalInfoTab from "./tabs/PersonalInfoTab";
import EmploymentTab from "./tabs/EmploymentTab";
import QualificationsTab from "./tabs/QualificationsTab";
import ServicesTab from "./tabs/ServicesTab";
import DocumentsTab from "./tabs/DocumentsTab";
import CommunicationsTab from "./tabs/CommunicationsTab";
import PayrollTab from "./tabs/PayrollTab";
import PermissionsTab from "./tabs/PermissionsTab";
import TeacherProfileCard from "./TeacherProfileCard";

interface FacultyDetailProps {
  teacherId: string | null;
  isNewTeacher?: boolean;
  onSave?: () => void;
  onBack: () => void;
}

// Initial empty teacher template
const emptyTeacher: Teacher = {
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

const FacultyDetail: React.FC<FacultyDetailProps> = ({ 
  teacherId, 
  isNewTeacher = false, 
  onSave, 
  onBack 
}) => {
  // Find the teacher or use empty teacher template
  const initialTeacher = isNewTeacher 
    ? emptyTeacher 
    : (teacherId ? mockTeachers.find(t => t.id === teacherId) || emptyTeacher : emptyTeacher);
  
  const [teacher, setTeacher] = useState<Teacher>(initialTeacher);
  const [activeTab, setActiveTab] = useState("personal");

  const handleSave = () => {
    // In a real application, you would call an API to save the teacher
    if (onSave) onSave();
  };

  const updateTeacher = (field: keyof Teacher, value: any) => {
    setTeacher(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Helper function for nested updates
  const updateNestedField = (
    category: keyof Teacher, 
    itemId: string, 
    field: string, 
    value: any
  ) => {
    setTeacher(prev => {
      const items = [...(prev[category] as any[])];
      const itemIndex = items.findIndex(item => item.id === itemId);
      
      if (itemIndex >= 0) {
        items[itemIndex] = {
          ...items[itemIndex],
          [field]: value
        };
      }
      
      return {
        ...prev,
        [category]: items
      };
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Button variant="outline" onClick={onBack}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Torna alla lista
        </Button>
        <Button onClick={handleSave}>
          <Save className="mr-2 h-4 w-4" />
          Salva
        </Button>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        <TeacherProfileCard teacher={teacher} />
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="mb-4 flex-wrap">
          <TabsTrigger value="personal">
            <User className="mr-2 h-4 w-4" />
            Anagrafica
          </TabsTrigger>
          <TabsTrigger value="employment">
            <Building className="mr-2 h-4 w-4" />
            Impiego
          </TabsTrigger>
          <TabsTrigger value="qualifications">
            <GraduationCap className="mr-2 h-4 w-4" />
            Qualifiche
          </TabsTrigger>
          <TabsTrigger value="services">
            <Briefcase className="mr-2 h-4 w-4" />
            Servizi
          </TabsTrigger>
          <TabsTrigger value="documents">
            <FileText className="mr-2 h-4 w-4" />
            Documenti
          </TabsTrigger>
          <TabsTrigger value="communications">
            <Mail className="mr-2 h-4 w-4" />
            Comunicazioni
          </TabsTrigger>
          <TabsTrigger value="payroll">
            <BadgeEuro className="mr-2 h-4 w-4" />
            Stipendio
          </TabsTrigger>
          <TabsTrigger value="permissions">
            <Shield className="mr-2 h-4 w-4" />
            Permessi
          </TabsTrigger>
        </TabsList>

        <TabsContent value="personal" className="space-y-4">
          <PersonalInfoTab 
            teacher={teacher} 
            onChange={(field, value) => updateTeacher(field as keyof Teacher, value)}
          />
        </TabsContent>

        <TabsContent value="employment" className="space-y-4">
          <EmploymentTab 
            teacher={teacher} 
            onChange={(field, value) => updateTeacher(field as keyof Teacher, value)}
          />
        </TabsContent>

        <TabsContent value="qualifications" className="space-y-4">
          <QualificationsTab 
            teacher={teacher} 
            onChange={updateTeacher}
          />
        </TabsContent>

        <TabsContent value="services" className="space-y-4">
          <ServicesTab 
            teacher={teacher} 
            onChange={updateTeacher}
          />
        </TabsContent>

        <TabsContent value="documents" className="space-y-4">
          <DocumentsTab teacherId={teacher.id} />
        </TabsContent>

        <TabsContent value="communications" className="space-y-4">
          <CommunicationsTab teacherId={teacher.id} />
        </TabsContent>

        <TabsContent value="payroll" className="space-y-4">
          <PayrollTab teacher={teacher} />
        </TabsContent>

        <TabsContent value="permissions" className="space-y-4">
          <PermissionsTab 
            teacher={teacher} 
            onChange={(field, value) => updateTeacher(field as keyof Teacher, value)}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FacultyDetail;
