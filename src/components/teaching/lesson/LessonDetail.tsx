
import React from "react";
import { format } from "date-fns";
import { it } from "date-fns/locale";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { BookCopy, CheckCircle2, Copy, Edit, Share2, Target, Users } from "lucide-react";
import { LessonPlan } from "../types/lesson";

interface LessonDetailProps {
  lesson: LessonPlan;
  onDuplicate: (lesson: LessonPlan) => void;
}

const LessonDetail: React.FC<LessonDetailProps> = ({ lesson, onDuplicate }) => {
  return (
    <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
      <DialogHeader>
        <DialogTitle>{lesson.title}</DialogTitle>
        <DialogDescription>
          {lesson.subject} - Classe {lesson.class} - {format(new Date(lesson.date), 'd MMMM yyyy', { locale: it })}
        </DialogDescription>
      </DialogHeader>
      
      <div className="space-y-4 py-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h4 className="text-sm font-medium text-muted-foreground">Materia</h4>
            <p>{lesson.subject}</p>
          </div>
          <div>
            <h4 className="text-sm font-medium text-muted-foreground">Classe</h4>
            <p>{lesson.class}</p>
          </div>
          <div>
            <h4 className="text-sm font-medium text-muted-foreground">Data</h4>
            <p>{format(new Date(lesson.date), 'd MMMM yyyy', { locale: it })}</p>
          </div>
          <div>
            <h4 className="text-sm font-medium text-muted-foreground">Durata</h4>
            <p>{lesson.duration} minuti</p>
          </div>
        </div>
        
        <Separator />
        
        <div>
          <h4 className="text-sm font-medium text-muted-foreground mb-2 flex items-center">
            <Target className="mr-2 h-4 w-4" />
            Obiettivi
          </h4>
          <p className="whitespace-pre-line">{lesson.objectives}</p>
        </div>
        
        <div>
          <h4 className="text-sm font-medium text-muted-foreground mb-2 flex items-center">
            <BookCopy className="mr-2 h-4 w-4" />
            Materiali
          </h4>
          <div className="flex flex-wrap gap-2">
            {lesson.materials.map((material, index) => (
              <Badge key={index} variant="secondary">
                {material}
              </Badge>
            ))}
          </div>
        </div>
        
        <div>
          <h4 className="text-sm font-medium text-muted-foreground mb-2 flex items-center">
            <Users className="mr-2 h-4 w-4" />
            Attività e Metodologie
          </h4>
          <p className="whitespace-pre-line">{lesson.activities}</p>
        </div>
        
        <div>
          <h4 className="text-sm font-medium text-muted-foreground mb-2 flex items-center">
            <CheckCircle2 className="mr-2 h-4 w-4" />
            Valutazione
          </h4>
          <p className="whitespace-pre-line">{lesson.assessment}</p>
        </div>
        
        {lesson.notes && (
          <div>
            <h4 className="text-sm font-medium text-muted-foreground mb-2">Note Aggiuntive</h4>
            <p className="whitespace-pre-line">{lesson.notes}</p>
          </div>
        )}
      </div>
      
      <DialogFooter>
        <div className="flex justify-between w-full">
          <Button
            variant="outline"
            onClick={() => onDuplicate(lesson)}
          >
            <Copy className="mr-2 h-4 w-4" />
            Duplica
          </Button>
          <div className="flex gap-2">
            <Button variant="outline">
              <Edit className="mr-2 h-4 w-4" />
              Modifica
            </Button>
            <Button>
              <Share2 className="mr-2 h-4 w-4" />
              Condividi
            </Button>
          </div>
        </div>
      </DialogFooter>
    </DialogContent>
  );
};

export default LessonDetail;
