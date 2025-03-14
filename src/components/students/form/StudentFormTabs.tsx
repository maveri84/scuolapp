
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  UserCog, 
  Users, 
  GraduationCap, 
  Heart,
  UserCheck,
} from "lucide-react";
import { Student } from "../types/student";
import PersonalInfoTab from "../tabs/PersonalInfoTab";
import ParentsTab from "../tabs/ParentsTab";
import DelegatesTab from "../tabs/DelegatesTab";
import AcademicTab from "../tabs/AcademicTab";
import SpecialNeedsTab from "../tabs/SpecialNeedsTab";

interface StudentFormTabsProps {
  student: Student;
  activeTab: string;
  onTabChange: (value: string) => void;
  updateStudentField: (field: keyof Student, value: any) => void;
}

const StudentFormTabs: React.FC<StudentFormTabsProps> = ({
  student,
  activeTab,
  onTabChange,
  updateStudentField,
}) => {
  return (
    <Tabs value={activeTab} onValueChange={onTabChange} className="w-full">
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
  );
};

export default StudentFormTabs;
