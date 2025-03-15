
import React from "react";
import { Button } from "@/components/ui/button";
import { Clock } from "lucide-react";

interface LessonPlannerFooterProps {
  lessonCount: number;
}

const LessonPlannerFooter: React.FC<LessonPlannerFooterProps> = ({ lessonCount }) => {
  return (
    <div className="border-t pt-6 flex justify-between">
      <div className="text-sm text-muted-foreground">
        {lessonCount} lezioni{lessonCount !== 1 ? "" : ""}
      </div>
      
      <Button variant="outline" size="sm">
        <div className="flex items-center">
          <Clock className="mr-2 h-4 w-4" />
          Importa da orario
        </div>
      </Button>
    </div>
  );
};

export default LessonPlannerFooter;
