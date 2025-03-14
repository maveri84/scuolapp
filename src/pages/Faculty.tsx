
import React, { useState } from "react";
import DashboardLayout from "@/layouts/DashboardLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import FacultyList from "@/components/faculty/FacultyList";
import FacultyDetail from "@/components/faculty/FacultyDetail";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Faculty: React.FC = () => {
  const [selectedTeacherId, setSelectedTeacherId] = useState<string | null>(null);
  const [isAddingTeacher, setIsAddingTeacher] = useState(false);
  const { toast } = useToast();

  const handleSelectTeacher = (id: string) => {
    setSelectedTeacherId(id);
    setIsAddingTeacher(false);
  };

  const handleAddTeacher = () => {
    setSelectedTeacherId(null);
    setIsAddingTeacher(true);
  };

  const handleSaveNewTeacher = () => {
    toast({
      title: "Docente aggiunto",
      description: "Il nuovo docente è stato aggiunto con successo.",
    });
    setIsAddingTeacher(false);
  };

  const handleBackToList = () => {
    setSelectedTeacherId(null);
    setIsAddingTeacher(false);
  };

  return (
    <DashboardLayout>
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Gestione Personale</h1>
        <p className="text-muted-foreground">
          Gestisci i dati, i servizi e la carriera del personale dell'istituto
        </p>
      </div>

      {!selectedTeacherId && !isAddingTeacher ? (
        <div className="space-y-6">
          <div className="flex justify-between">
            <div>
              {/* Filter options could go here */}
            </div>
            <Button onClick={handleAddTeacher}>
              <PlusCircle className="mr-2 h-4 w-4" />
              Nuovo Dipendente
            </Button>
          </div>
          <Card>
            <FacultyList onSelectTeacher={handleSelectTeacher} />
          </Card>
        </div>
      ) : (
        <FacultyDetail 
          teacherId={selectedTeacherId}
          isNewTeacher={isAddingTeacher}
          onSave={handleSaveNewTeacher}
          onBack={handleBackToList}
        />
      )}
    </DashboardLayout>
  );
};

export default Faculty;
