
import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { TeacherScheduleProps } from "./types";

interface ScheduleTabProps {
  teacherSchedule: TeacherScheduleProps[];
}

const ScheduleTab = ({ teacherSchedule }: ScheduleTabProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Orario Settimanale</CardTitle>
        <CardDescription>
          Consulta il tuo orario di lezione settimanale
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="p-2 border bg-muted font-medium text-left">Orario</th>
                <th className="p-2 border bg-muted font-medium text-left">Lunedì</th>
                <th className="p-2 border bg-muted font-medium text-left">Martedì</th>
                <th className="p-2 border bg-muted font-medium text-left">Mercoledì</th>
                <th className="p-2 border bg-muted font-medium text-left">Giovedì</th>
                <th className="p-2 border bg-muted font-medium text-left">Venerdì</th>
              </tr>
            </thead>
            <tbody>
              {["08:00-09:00", "09:00-10:00", "10:00-11:00", "11:00-12:00", "12:00-13:00"].map((timeSlot) => (
                <tr key={timeSlot}>
                  <td className="p-2 border font-medium">{timeSlot}</td>
                  {["Lunedì", "Martedì", "Mercoledì", "Giovedì", "Venerdì"].map((day) => {
                    const lesson = teacherSchedule
                      .find(d => d.day === day)
                      ?.periods.find(p => p.time === timeSlot);
                    
                    return (
                      <td key={`${day}-${timeSlot}`} className="p-2 border">
                        {lesson ? (
                          <div className="p-1 bg-blue-50 dark:bg-blue-900/20 rounded">
                            <div className="font-medium">{lesson.subject}</div>
                            <div className="text-xs text-muted-foreground">{lesson.class}</div>
                          </div>
                        ) : null}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};

export default ScheduleTab;
