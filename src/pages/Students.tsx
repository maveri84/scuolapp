
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Search, UserPlus, FileText, Users, Upload } from "lucide-react";
import DashboardLayout from "@/layouts/DashboardLayout";
import StudentsList from "@/components/students/StudentsList";
import StudentDetailWrapper from "@/components/students/StudentDetail";
import ImportStudentsModal from "@/components/students/ImportStudentsModal";
import AddStudentForm from "@/components/students/AddStudentForm";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Student } from "@/components/students/types/student";

const Students = () => {
  const [selectedTab, setSelectedTab] = useState("list");
  const [selectedStudent, setSelectedStudent] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedClass, setSelectedClass] = useState<string | undefined>(undefined);
  const [showImportModal, setShowImportModal] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  const handleStudentSelect = (studentId: string) => {
    setSelectedStudent(studentId);
    setSelectedTab("detail");
    setShowAddForm(false);
    setIsEditMode(false);
  };

  const handleStudentEdit = (studentId: string) => {
    setSelectedStudent(studentId);
    setSelectedTab("detail");
    setShowAddForm(false);
    setIsEditMode(true);
    toast.info("Modalità modifica attivata");
  };

  const handleBackToList = () => {
    setSelectedStudent(null);
    setSelectedTab("list");
    setShowAddForm(false);
    setIsEditMode(false);
  };

  const handleNewStudent = () => {
    setSelectedStudent(null);
    setShowAddForm(true);
    setSelectedTab("add");
    setIsEditMode(false);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real application, this would trigger a search with the query and selected class
    console.log("Searching for:", searchQuery, "in class:", selectedClass);
  };

  const handleImportStudents = (importedStudents: any[]) => {
    // In a real app, you would process and save these students to your database
    console.log("Imported students:", importedStudents);
    toast.success(`Importati ${importedStudents.length} studenti con successo`);
  };

  const handleSaveNewStudent = (student: Student) => {
    // In a real app, you would save this student to your database
    console.log("New student:", student);
    toast.success("Studente aggiunto con successo");
    handleBackToList();
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
              {isEditMode ? "Modifica Studente" : "Dettaglio Studente"}
            </TabsTrigger>
            <TabsTrigger value="add" disabled={!showAddForm}>
              <UserPlus className="mr-2 h-4 w-4" />
              Nuovo Studente
            </TabsTrigger>
          </TabsList>

          <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
            <form onSubmit={handleSearch} className="flex w-full md:w-auto">
              <Input 
                placeholder="Cerca studente..." 
                className="rounded-r-none"
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button variant="outline" className="rounded-l-none" type="submit">
                <Search className="h-4 w-4" />
              </Button>
            </form>
            
            <div className="flex sm:flex-row gap-4">
              <Select value={selectedClass} onValueChange={setSelectedClass}>
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
              
              <div className="flex gap-2">
                <Button onClick={() => setShowImportModal(true)} variant="outline">
                  <Upload className="mr-2 h-4 w-4" />
                  Importa
                </Button>
                <Button onClick={handleNewStudent}>
                  <UserPlus className="mr-2 h-4 w-4" />
                  Nuovo Studente
                </Button>
              </div>
            </div>
          </div>
        </div>

        <TabsContent value="list" className="mt-0">
          <Card className="p-0">
            <StudentsList 
              onStudentSelect={handleStudentSelect} 
              onStudentEdit={handleStudentEdit}
            />
          </Card>
        </TabsContent>

        <TabsContent value="detail" className="mt-0">
          {selectedStudent && (
            <>
              <div className="mb-4">
                <Button variant="outline" onClick={handleBackToList}>
                  ← Torna alla lista
                </Button>
                {isEditMode && (
                  <span className="ml-4 text-blue-500 font-medium">
                    Modalità modifica attiva
                  </span>
                )}
              </div>
              <StudentDetailWrapper 
                studentId={selectedStudent} 
                isEditMode={isEditMode}
              />
            </>
          )}
        </TabsContent>

        <TabsContent value="add" className="mt-0">
          {showAddForm && (
            <AddStudentForm
              onCancel={handleBackToList}
              onSave={handleSaveNewStudent}
            />
          )}
        </TabsContent>
      </Tabs>

      <ImportStudentsModal 
        isOpen={showImportModal}
        onClose={() => setShowImportModal(false)}
        onImport={handleImportStudents}
      />
    </DashboardLayout>
  );
};

export default Students;
