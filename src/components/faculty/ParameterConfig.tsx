
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import SubjectManagement from "@/components/classes/SubjectManagement";
import CompetitionClasses from "@/components/faculty/parameters/CompetitionClasses";
import ServiceTypes from "@/components/faculty/parameters/ServiceTypes";

const ParameterConfig: React.FC = () => {
  return (
    <div className="space-y-6">
      <Tabs defaultValue="subjects" className="space-y-4">
        <TabsList className="bg-background border">
          <TabsTrigger value="subjects">Materie</TabsTrigger>
          <TabsTrigger value="classes">Classi di Concorso</TabsTrigger>
          <TabsTrigger value="services">Tipi di Servizio</TabsTrigger>
        </TabsList>
        
        <TabsContent value="subjects" className="space-y-4">
          <SubjectManagement />
        </TabsContent>
        
        <TabsContent value="classes" className="space-y-4">
          <CompetitionClasses />
        </TabsContent>
        
        <TabsContent value="services" className="space-y-4">
          <ServiceTypes />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ParameterConfig;
