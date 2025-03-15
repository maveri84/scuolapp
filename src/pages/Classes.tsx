
import React from "react";
import DashboardLayout from "@/layouts/DashboardLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ClassTeacherAssignment from "@/components/classes/ClassTeacherAssignment";
import SubjectManagement from "@/components/classes/SubjectManagement";
import ClassesStructure from "@/components/classes/ClassesStructure";
import SubjectClassAssignment from "@/components/classes/SubjectClassAssignment";
import { Book, Building, CircleUser, LayoutList } from "lucide-react";

const Classes: React.FC = () => {
  return (
    <DashboardLayout>
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Gestione Classi</h1>
        <p className="text-muted-foreground">
          Gestisci le classi, gli insegnanti, le materie e la struttura scolastica
        </p>
      </div>

      <Tabs defaultValue="assignments" className="space-y-6">
        <TabsList>
          <TabsTrigger value="assignments" className="flex items-center">
            <CircleUser className="mr-2 h-4 w-4" />
            Abbinamenti Docenti
          </TabsTrigger>
          <TabsTrigger value="subjects" className="flex items-center">
            <Book className="mr-2 h-4 w-4" />
            Materie
          </TabsTrigger>
          <TabsTrigger value="subject-assignments" className="flex items-center">
            <LayoutList className="mr-2 h-4 w-4" />
            Assegnazione Materie
          </TabsTrigger>
          <TabsTrigger value="structure" className="flex items-center">
            <Building className="mr-2 h-4 w-4" />
            Struttura Scolastica
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="assignments" className="space-y-6">
          <ClassTeacherAssignment />
        </TabsContent>
        
        <TabsContent value="subjects" className="space-y-6">
          <SubjectManagement />
        </TabsContent>

        <TabsContent value="subject-assignments" className="space-y-6">
          <SubjectClassAssignment />
        </TabsContent>
        
        <TabsContent value="structure" className="space-y-6">
          <ClassesStructure />
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
};

export default Classes;
