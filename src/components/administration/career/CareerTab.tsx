
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Award, Book, Briefcase, FileText, GraduationCap, Redo, Settings, UserCheck } from "lucide-react";
import CareerProgressionManager from "./CareerProgressionManager";
import CareerReconstructionManager from "./CareerReconstructionManager";
import LegalReconstructionManager from "./LegalReconstructionManager";
import PreTenureRecognitionManager from "./PreTenureRecognitionManager";
import CareerDashboard from "./CareerDashboard";

const CareerTab: React.FC = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Gestione Carriera</CardTitle>
          <CardDescription>
            Progressioni, ricostruzioni e riconoscimenti secondo la normativa italiana
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
            <TabsList className="grid grid-cols-2 md:grid-cols-5 gap-2">
              <TabsTrigger value="dashboard" className="flex items-center">
                <Briefcase className="mr-2 h-4 w-4" />
                <span className="hidden md:inline">Dashboard</span>
                <span className="md:hidden">Home</span>
              </TabsTrigger>
              <TabsTrigger value="progressions" className="flex items-center">
                <Award className="mr-2 h-4 w-4" />
                <span className="hidden md:inline">Progressioni</span>
                <span className="md:hidden">Prog.</span>
              </TabsTrigger>
              <TabsTrigger value="reconstructions" className="flex items-center">
                <Redo className="mr-2 h-4 w-4" />
                <span className="hidden md:inline">Ricostruzioni</span>
                <span className="md:hidden">Ric.</span>
              </TabsTrigger>
              <TabsTrigger value="legal" className="flex items-center">
                <FileText className="mr-2 h-4 w-4" />
                <span className="hidden md:inline">Ricostruzioni a Sentenza</span>
                <span className="md:hidden">Sent.</span>
              </TabsTrigger>
              <TabsTrigger value="pretenure" className="flex items-center">
                <GraduationCap className="mr-2 h-4 w-4" />
                <span className="hidden md:inline">Riconoscimento Pre-Ruolo</span>
                <span className="md:hidden">Pre-R.</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="dashboard">
              <CareerDashboard />
            </TabsContent>

            <TabsContent value="progressions">
              <CareerProgressionManager />
            </TabsContent>

            <TabsContent value="reconstructions">
              <CareerReconstructionManager />
            </TabsContent>

            <TabsContent value="legal">
              <LegalReconstructionManager />
            </TabsContent>

            <TabsContent value="pretenure">
              <PreTenureRecognitionManager />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default CareerTab;
