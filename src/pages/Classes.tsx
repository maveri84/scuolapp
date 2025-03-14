
import React from "react";
import DashboardLayout from "@/layouts/DashboardLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ClassTeacherAssignment from "@/components/classes/ClassTeacherAssignment";
import SubjectManagement from "@/components/classes/SubjectManagement";

const Classes: React.FC = () => {
  return (
    <DashboardLayout>
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Gestione Classi</h1>
        <p className="text-muted-foreground">
          Gestisci le classi, gli insegnanti e le materie
        </p>
      </div>

      <Tabs defaultValue="assignments" className="space-y-6">
        <TabsList>
          <TabsTrigger value="assignments">Abbinamenti</TabsTrigger>
          <TabsTrigger value="subjects">Materie</TabsTrigger>
        </TabsList>
        
        <TabsContent value="assignments" className="space-y-6">
          <ClassTeacherAssignment />
        </TabsContent>
        
        <TabsContent value="subjects" className="space-y-6">
          <SubjectManagement />
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
};

export default Classes;
