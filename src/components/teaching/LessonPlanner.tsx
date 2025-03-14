
import React, { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { useLessonPlans } from "./hooks/useLessonPlans";
import LessonPlannerHeader from "./lesson/LessonPlannerHeader";
import LessonPlannerContent from "./lesson/LessonPlannerContent";
import LessonPlannerFooter from "./lesson/LessonPlannerFooter";

const LessonPlanner = () => {
  const [isCreating, setIsCreating] = useState(false);
  
  const {
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
  } = useLessonPlans();

  const filteredLessonPlans = getFilteredLessonPlans();

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <LessonPlannerHeader
            isCreating={isCreating}
            setIsCreating={setIsCreating}
            onCreateLessonPlan={handleCreateLessonPlan}
          />
        </CardHeader>
        <CardContent>
          <LessonPlannerContent
            filteredLessonPlans={filteredLessonPlans}
            hasActiveFilters={hasActiveFilters()}
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
            clearFilters={clearFilters}
            onCreateLesson={() => setIsCreating(true)}
            onDuplicateLessonPlan={handleDuplicateLessonPlan}
            onCompleteLessonPlan={handleCompleteLessonPlan}
            onDeleteLessonPlan={handleDeleteLessonPlan}
          />
        </CardContent>
        <CardFooter>
          <LessonPlannerFooter lessonCount={filteredLessonPlans.length} />
        </CardFooter>
      </Card>
    </div>
  );
};

export default LessonPlanner;
