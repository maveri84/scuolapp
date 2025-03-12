
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { BookOpen } from "lucide-react";

// Mock data for the class schedule
const todaysSchedule = [
  { id: 1, subject: "Matematica", time: "08:00 - 09:00", room: "Aula 3B" },
  { id: 2, subject: "Italiano", time: "09:00 - 10:00", room: "Aula 3B" },
  { id: 3, subject: "Storia", time: "10:15 - 11:15", room: "Aula 3B" },
  { id: 4, subject: "Scienze", time: "11:15 - 12:15", room: "Laboratorio 2" },
  { id: 5, subject: "Inglese", time: "12:15 - 13:15", room: "Aula Lingue" },
];

const ScheduleCard: React.FC = () => {
  // Calculate current class based on time
  const getCurrentClass = () => {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const currentTime = hours * 60 + minutes;
    
    for (const slot of todaysSchedule) {
      const [startStr, endStr] = slot.time.split(" - ");
      const [startHours, startMinutes] = startStr.split(":").map(Number);
      const [endHours, endMinutes] = endStr.split(":").map(Number);
      
      const slotStart = startHours * 60 + startMinutes;
      const slotEnd = endHours * 60 + endMinutes;
      
      if (currentTime >= slotStart && currentTime < slotEnd) {
        return slot.id;
      }
    }
    
    return null;
  };
  
  const currentClassId = getCurrentClass();
  
  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl">Orario di oggi</CardTitle>
        <CardDescription>
          Classe 3A - Informatica
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {todaysSchedule.map((slot, index) => (
            <React.Fragment key={slot.id}>
              <div className={`flex items-center p-2 rounded-lg ${slot.id === currentClassId ? 'bg-primary/10' : ''}`}>
                <div className="h-10 w-10 rounded-full bg-secondary flex items-center justify-center mr-3">
                  <BookOpen className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{slot.subject}</span>
                    {slot.id === currentClassId && (
                      <Badge variant="default" className="ml-2">
                        In corso
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground mt-1">
                    <span>{slot.time}</span>
                    <span className="mx-2">•</span>
                    <span>{slot.room}</span>
                  </div>
                </div>
              </div>
              {index < todaysSchedule.length - 1 && (
                <Separator />
              )}
            </React.Fragment>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ScheduleCard;
