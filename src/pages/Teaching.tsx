
import React, { useState } from "react";
import DashboardLayout from "@/layouts/DashboardLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TeachingMaterials from "@/components/teaching/TeachingMaterials";
import EducationalApps from "@/components/teaching/EducationalApps";
import LessonPlanner from "@/components/teaching/LessonPlanner";

const Teaching = () => {
  const [activeTab, setActiveTab] = useState("materials");

  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Didattica</h1>
        <p className="text-muted-foreground mt-2">
          Gestisci il materiale didattico e le lezioni
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-3 lg:w-[400px]">
          <TabsTrigger value="materials">Materiali</TabsTrigger>
          <TabsTrigger value="apps">App Didattiche</TabsTrigger>
          <TabsTrigger value="planner">Pianificazione</TabsTrigger>
        </TabsList>
        
        <TabsContent value="materials" className="space-y-4">
          <TeachingMaterials />
        </TabsContent>
        
        <TabsContent value="apps" className="space-y-4">
          <EducationalApps />
        </TabsContent>
        
        <TabsContent value="planner" className="space-y-4">
          <LessonPlanner />
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
};

export default Teaching;
