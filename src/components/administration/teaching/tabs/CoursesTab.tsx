
import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BookOpen, PlusCircle, GraduationCap } from "lucide-react";

export const CoursesTab: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Corsi didattici</CardTitle>
        <CardDescription>
          Gestisci i corsi e i programmi didattici
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <CourseItem 
            title="Corso di preparazione esami"
            teacher="Prof. Rossi"
            classes="Classi quinte"
            status="active"
          />
          
          <CourseItem 
            title="Laboratorio di informatica"
            teacher="Prof. Bianchi"
            classes="Classi terze"
            status="active"
          />
          
          <CourseItem 
            title="Recupero matematica"
            teacher="Prof. Verdi"
            classes="Classi prime"
            status="preparing"
          />
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">
          <PlusCircle className="mr-2 h-4 w-4" />
          Nuovo corso
        </Button>
        <Button variant="outline">Gestisci tutti i corsi</Button>
      </CardFooter>
    </Card>
  );
};

interface CourseItemProps {
  title: string;
  teacher: string;
  classes: string;
  status: 'active' | 'preparing';
}

const CourseItem: React.FC<CourseItemProps> = ({ title, teacher, classes, status }) => {
  return (
    <div className="rounded-lg border p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-primary/10 p-2 rounded-md">
            <BookOpen className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h3 className="font-medium">{title}</h3>
            <p className="text-sm text-muted-foreground">{classes} - {teacher}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {status === 'active' ? (
            <Badge variant="outline" className="bg-green-50">Attivo</Badge>
          ) : (
            <Badge variant="outline" className="bg-amber-50 text-amber-800">In preparazione</Badge>
          )}
          <Button size="sm" variant="ghost">
            <GraduationCap className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};
