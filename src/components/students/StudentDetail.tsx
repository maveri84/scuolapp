
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
  UserCheck
} from "lucide-react";
import { Student, mockStudentDetail } from "./types/student";
import ProfileCard from "./profile/ProfileCard";
import PersonalInfoTab from "./tabs/PersonalInfoTab";
import ParentsTab from "./tabs/ParentsTab";
import DelegatesTab from "./tabs/DelegatesTab";
import AcademicTab from "./tabs/AcademicTab";
import SpecialNeedsTab from "./tabs/SpecialNeedsTab";
import CommunicationsTab from "./tabs/CommunicationsTab";
import DocumentsTab from "./tabs/DocumentsTab";
import FiscalCodeTab from "./tabs/FiscalCodeTab";

interface StudentDetailProps {
  student: Student;
}

const StudentDetail: React.FC<StudentDetailProps> = ({ student }) => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-6">
        <ProfileCard student={student} />
      </div>

      <Tabs defaultValue="info" className="w-full">
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
          <TabsTrigger value="communications">
            <MessageCircle className="mr-2 h-4 w-4" />
            Comunicazioni
          </TabsTrigger>
          <TabsTrigger value="documents">
            <FileText className="mr-2 h-4 w-4" />
            Documenti
          </TabsTrigger>
          <TabsTrigger value="fiscal-code">
            <Calculator className="mr-2 h-4 w-4" />
            Calcolo CF
          </TabsTrigger>
        </TabsList>

        <TabsContent value="info" className="space-y-4">
          <PersonalInfoTab student={student} />
        </TabsContent>

        <TabsContent value="parents" className="space-y-4">
          <ParentsTab student={student} />
        </TabsContent>

        <TabsContent value="delegates" className="space-y-4">
          <DelegatesTab student={student} />
        </TabsContent>

        <TabsContent value="academic" className="space-y-4">
          <AcademicTab student={student} />
        </TabsContent>

        <TabsContent value="special" className="space-y-4">
          <SpecialNeedsTab student={student} />
        </TabsContent>

        <TabsContent value="communications" className="space-y-4">
          <CommunicationsTab />
        </TabsContent>

        <TabsContent value="documents" className="space-y-4">
          <DocumentsTab />
        </TabsContent>

        <TabsContent value="fiscal-code" className="space-y-4">
          <FiscalCodeTab student={student} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export { StudentDetail };

interface StudentDetailWrapperProps {
  studentId: string;
}

const StudentDetailWrapper: React.FC<StudentDetailWrapperProps> = ({ studentId }) => {
  // In a real application, you would fetch the student data based on the studentId
  // For now, we're using the mock data
  const student = mockStudentDetail;
  
  return <StudentDetail student={student} />;
};

export default StudentDetailWrapper;
