
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CalendarDays, FileText, GraduationCap, Users } from "lucide-react";
import StudentsTab from "./StudentsTab";
import PersonnelTab from "./PersonnelTab";
import CalendarTab from "./CalendarTab";
import DocumentsTab from "./DocumentsTab";

const AdministrationTabs: React.FC = () => {
  return (
    <Tabs defaultValue="students" className="space-y-4">
      <TabsList>
        <TabsTrigger value="students" className="flex items-center">
          <GraduationCap className="mr-2 h-4 w-4" />
          Studenti
        </TabsTrigger>
        <TabsTrigger value="personnel" className="flex items-center">
          <Users className="mr-2 h-4 w-4" />
          Personale
        </TabsTrigger>
        <TabsTrigger value="calendar" className="flex items-center">
          <CalendarDays className="mr-2 h-4 w-4" />
          Calendario Scolastico
        </TabsTrigger>
        <TabsTrigger value="documents" className="flex items-center">
          <FileText className="mr-2 h-4 w-4" />
          Documenti
        </TabsTrigger>
      </TabsList>
      
      <TabsContent value="students" className="space-y-4">
        <StudentsTab />
      </TabsContent>
      
      <TabsContent value="personnel" className="space-y-4">
        <PersonnelTab />
      </TabsContent>
      
      <TabsContent value="calendar" className="space-y-4">
        <CalendarTab />
      </TabsContent>
      
      <TabsContent value="documents" className="space-y-4">
        <DocumentsTab />
      </TabsContent>
    </Tabs>
  );
};

export default AdministrationTabs;
