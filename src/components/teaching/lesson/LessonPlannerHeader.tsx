
import React from "react";
import { CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog } from "@/components/ui/dialog";
import { BookCopy, Plus } from "lucide-react";
import LessonForm from "./LessonForm";
import { LessonPlan } from "../types/lesson";

interface LessonPlannerHeaderProps {
  isCreating: boolean;
  setIsCreating: (value: boolean) => void;
  onCreateLessonPlan: (plan: Omit<LessonPlan, 'id' | 'status'>) => void;
}

const LessonPlannerHeader: React.FC<LessonPlannerHeaderProps> = ({
  isCreating,
  setIsCreating,
  onCreateLessonPlan
}) => {
  return (
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
            onSave={onCreateLessonPlan} 
          />
        )}
      </Dialog>
    </div>
  );
};

export default LessonPlannerHeader;
