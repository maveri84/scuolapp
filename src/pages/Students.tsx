
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Search, UserPlus, FileText, Users } from "lucide-react";
import DashboardLayout from "@/layouts/DashboardLayout";
import StudentsList from "@/components/students/StudentsList";
import StudentDetail from "@/components/students/StudentDetail";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const Students = () => {
  const [selectedTab, setSelectedTab] = useState("list");
  const [selectedStudent, setSelectedStudent] = useState<string | null>(null);

  const handleStudentSelect = (studentId: string) => {
    setSelectedStudent(studentId);
    setSelectedTab("detail");
  };

  const handleBackToList = () => {
    setSelectedStudent(null);
    setSelectedTab("list");
  };

  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Anagrafica Studenti</h1>
        <p className="text-muted-foreground mt-2">
          Gestione delle informazioni anagrafiche, genitori e curriculum scolastico
        </p>
      </div>

      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <TabsList>
            <TabsTrigger value="list">
              <Users className="mr-2 h-4 w-4" />
              Lista Studenti
            </TabsTrigger>
            <TabsTrigger value="detail" disabled={!selectedStudent}>
              <FileText className="mr-2 h-4 w-4" />
              Dettaglio Studente
            </TabsTrigger>
          </TabsList>

          <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
            <div className="flex w-full md:w-auto">
              <Input 
                placeholder="Cerca studente..." 
                className="rounded-r-none"
                type="search"
              />
              <Button variant="outline" className="rounded-l-none">
                <Search className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="flex sm:flex-row gap-4">
              <Select>
                <SelectTrigger className="w-[160px]">
                  <SelectValue placeholder="Classe" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1A">1A</SelectItem>
                  <SelectItem value="1B">1B</SelectItem>
                  <SelectItem value="2A">2A</SelectItem>
                  <SelectItem value="2B">2B</SelectItem>
                  <SelectItem value="3A">3A</SelectItem>
                </SelectContent>
              </Select>
              
              <Button>
                <UserPlus className="mr-2 h-4 w-4" />
                Nuovo Studente
              </Button>
            </div>
          </div>
        </div>

        <TabsContent value="list" className="mt-0">
          <Card className="p-0">
            <StudentsList onStudentSelect={handleStudentSelect} />
          </Card>
        </TabsContent>

        <TabsContent value="detail" className="mt-0">
          {selectedStudent && (
            <>
              <div className="mb-4">
                <Button variant="outline" onClick={handleBackToList}>
                  ← Torna alla lista
                </Button>
              </div>
              <StudentDetail studentId={selectedStudent} />
            </>
          )}
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
};

export default Students;
