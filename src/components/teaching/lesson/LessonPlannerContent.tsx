
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { FileText, CalendarIcon } from "lucide-react";
import { LessonPlan } from "../types/lesson";
import LessonFilters from "./LessonFilters";
import LessonTable from "./LessonTable";
import CalendarView from "./CalendarView";
import EmptyState from "./EmptyState";

interface LessonPlannerContentProps {
  filteredLessonPlans: LessonPlan[];
  hasActiveFilters: boolean;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedClass: string | null;
  setSelectedClass: (classId: string | null) => void;
  selectedSubject: string | null;
  setSelectedSubject: (subjectId: string | null) => void;
  selectedDate: Date | null;
  setSelectedDate: (date: Date | null) => void;
  showCompleted: boolean;
  setShowCompleted: (show: boolean) => void;
  clearFilters: () => void;
  onCreateLesson: () => void;
  onDuplicateLessonPlan: (lesson: LessonPlan) => void;
  onCompleteLessonPlan: (id: string) => void;
  onDeleteLessonPlan: (id: string) => void;
}

const LessonPlannerContent: React.FC<LessonPlannerContentProps> = ({
  filteredLessonPlans,
  hasActiveFilters,
  searchQuery,
  setSearchQuery,
  selectedClass,
  setSelectedClass,
  selectedSubject,
  setSelectedSubject,
  selectedDate,
  setSelectedDate,
  showCompleted,
  setShowCompleted,
  clearFilters,
  onCreateLesson,
  onDuplicateLessonPlan,
  onCompleteLessonPlan,
  onDeleteLessonPlan
}) => {
  return (
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
              onCreateLesson={onCreateLesson}
            />
          ) : (
            <LessonTable 
              lessons={filteredLessonPlans}
              onDuplicate={onDuplicateLessonPlan}
              onComplete={onCompleteLessonPlan}
              onDelete={onDeleteLessonPlan}
            />
          )}
        </TabsContent>
        
        <TabsContent value="calendar">
          <CalendarView />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default LessonPlannerContent;
