
import { useState } from "react";
import { toast } from "sonner";
import { LessonPlan, LessonStatus, mockLessonPlans } from "../types/lesson";
import { format } from "date-fns";

export function useLessonPlans() {
  const [lessonPlans, setLessonPlans] = useState<LessonPlan[]>(mockLessonPlans);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedClass, setSelectedClass] = useState<string | null>(null);
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [showCompleted, setShowCompleted] = useState(true);
  
  const handleCreateLessonPlan = (newPlan: Omit<LessonPlan, 'id' | 'status'>) => {
    const newLessonPlan: LessonPlan = {
      ...newPlan,
      id: Date.now().toString(),
      status: 'upcoming' as LessonStatus
    };
    
    setLessonPlans([...lessonPlans, newLessonPlan]);
    toast.success("Piano di lezione creato con successo");
    return newLessonPlan;
  };
  
  const handleDuplicateLessonPlan = (plan: LessonPlan) => {
    const duplicatedPlan: LessonPlan = {
      ...plan,
      id: Date.now().toString(),
      title: `${plan.title} (copia)`,
      status: 'draft' as LessonStatus
    };
    
    setLessonPlans([...lessonPlans, duplicatedPlan]);
    toast.success("Piano di lezione duplicato con successo");
    return duplicatedPlan;
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
  
  const getFilteredLessonPlans = () => {
    return lessonPlans.filter(plan => {
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
  };

  // Check if there are active filters
  const hasActiveFilters = () => !!(searchQuery || selectedClass || selectedSubject || selectedDate);

  return {
    lessonPlans,
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
    handleCreateLessonPlan,
    handleDuplicateLessonPlan,
    handleDeleteLessonPlan,
    handleCompleteLessonPlan,
    clearFilters,
    getFilteredLessonPlans,
    hasActiveFilters
  };
}
