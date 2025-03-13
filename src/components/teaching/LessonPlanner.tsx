
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Dialog } from "@/components/ui/dialog";
import { toast } from "sonner";
import { BookCopy, Clock, FileText, Plus } from "lucide-react";

// Import types and mock data
import { LessonPlan, LessonStatus, mockLessonPlans } from "./types/lesson";

// Import components
import LessonFilters from "./lesson/LessonFilters";
import LessonTable from "./lesson/LessonTable";
import LessonForm from "./lesson/LessonForm";
import CalendarView from "./lesson/CalendarView";
import EmptyState from "./lesson/EmptyState";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

const LessonPlanner = () => {
  const [lessonPlans, setLessonPlans] = useState<LessonPlan[]>(mockLessonPlans);
  const [isCreating, setIsCreating] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedClass, setSelectedClass] = useState<string | null>(null);
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [showCompleted, setShowCompleted] = useState(true);
  
  const handleCreateLessonPlan = (newPlan: Omit<LessonPlan, 'id' | 'status'>) => {
    const newLessonPlan: LessonPlan = {
      ...newPlan,
      id: Date.now().toString(),
      status: 'upcoming' // Use the correct LessonStatus type
    };
    
    setLessonPlans([...lessonPlans, newLessonPlan]);
    setIsCreating(false);
    toast.success("Piano di lezione creato con successo");
  };
  
  const handleDuplicateLessonPlan = (plan: LessonPlan) => {
    const duplicatedPlan: LessonPlan = {
      ...plan,
      id: Date.now().toString(),
      title: `${plan.title} (copia)`,
      status: 'draft' // Use the correct LessonStatus type
    };
    
    setLessonPlans([...lessonPlans, duplicatedPlan]);
    toast.success("Piano di lezione duplicato con successo");
  };
  
  const handleDeleteLessonPlan = (id: string) => {
    setLessonPlans(lessonPlans.filter(plan => plan.id !== id));
    toast.success("Piano di lezione eliminato");
  };
  
  const handleCompleteLessonPlan = (id: string) => {
    const updatedPlans = lessonPlans.map(plan => {
      if (plan.id === id) {
        return { ...plan, status: 'completed' as LessonStatus };
      }
      return plan;
    });
    
    setLessonPlans(updatedPlans);
    toast.success("Piano di lezione contrassegnato come completato");
  };
  
  const clearFilters = () => {
    setSearchQuery("");
    setSelectedClass(null);
    setSelectedSubject(null);
    setSelectedDate(null);
  };
  
  const filteredLessonPlans = lessonPlans.filter(plan => {
    // Filter by search query
    if (searchQuery && !plan.title.toLowerCase().includes(searchQuery.toLowerCase()) && 
        !plan.objectives.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    // Filter by class
    if (selectedClass && plan.class !== selectedClass) {
      return false;
    }
    
    // Filter by subject
    if (selectedSubject && plan.subject !== selectedSubject) {
      return false;
    }
    
    // Filter by date
    if (selectedDate && plan.date !== format(selectedDate, 'yyyy-MM-dd')) {
      return false;
    }
    
    // Filter by status
    if (!showCompleted && plan.status === 'completed') {
      return false;
    }
    
    return true;
  });

  // Check if there are active filters
  const hasActiveFilters = !!(searchQuery || selectedClass || selectedSubject || selectedDate);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <CardTitle className="flex items-center">
                <BookCopy className="mr-2 h-5 w-5" />
                Pianificazione Lezioni
              </CardTitle>
              <CardDescription>
                Crea e gestisci i tuoi piani di lezione
              </CardDescription>
            </div>
            <Dialog open={isCreating} onOpenChange={setIsCreating}>
              <Button onClick={() => setIsCreating(true)}>
                <Plus className="mr-2 h-4 w-4" />
                Nuova Lezione
              </Button>
              
              {isCreating && (
                <LessonForm 
                  onCancel={() => setIsCreating(false)} 
                  onSave={handleCreateLessonPlan} 
                />
              )}
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <LessonFilters 
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              selectedClass={selectedClass}
              setSelectedClass={setSelectedClass}
              selectedSubject={selectedSubject}
              setSelectedSubject={setSelectedSubject}
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
              showCompleted={showCompleted}
              setShowCompleted={setShowCompleted}
            />
            
            <Separator />
            
            <Tabs defaultValue="list" className="w-full">
              <TabsList className="mb-4">
                <TabsTrigger value="list">
                  <FileText className="mr-2 h-4 w-4" />
                  Lista
                </TabsTrigger>
                <TabsTrigger value="calendar">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  Calendario
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="list">
                {filteredLessonPlans.length === 0 ? (
                  <EmptyState 
                    hasFilters={hasActiveFilters}
                    onClearFilters={clearFilters}
                    onCreateLesson={() => setIsCreating(true)}
                  />
                ) : (
                  <LessonTable 
                    lessons={filteredLessonPlans}
                    onDuplicate={handleDuplicateLessonPlan}
                    onComplete={handleCompleteLessonPlan}
                    onDelete={handleDeleteLessonPlan}
                  />
                )}
              </TabsContent>
              
              <TabsContent value="calendar">
                <CalendarView />
              </TabsContent>
            </Tabs>
          </div>
        </CardContent>
        <CardFooter className="border-t pt-6 flex justify-between">
          <div className="text-sm text-muted-foreground">
            {filteredLessonPlans.length} lezioni{filteredLessonPlans.length !== 1 ? "" : ""}
          </div>
          
          <Button variant="outline" size="sm">
            <div className="flex items-center">
              <Clock className="mr-2 h-4 w-4" />
              Importa da orario
            </div>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default LessonPlanner;
