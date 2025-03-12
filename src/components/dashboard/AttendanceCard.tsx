
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { UserCheck, UserX, Clock } from "lucide-react";

// Example student data for attendance
const students = [
  { id: 1, name: "Marco Bianchi", status: "present", time: "08:05" },
  { id: 2, name: "Anna Verdi", status: "absent", time: "-" },
  { id: 3, name: "Luca Rossi", status: "late", time: "08:45" },
  { id: 4, name: "Elena Neri", status: "present", time: "08:10" },
  { id: 5, name: "Paolo Gialli", status: "present", time: "08:02" },
];

const AttendanceCard: React.FC = () => {
  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl">Presenze di oggi</CardTitle>
        <CardDescription>
          Classe 3A - Informatica
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 gap-3">
          {students.map((student) => (
            <div 
              key={student.id}
              className="flex items-center justify-between p-3 rounded-lg bg-secondary"
            >
              <div className="flex items-center gap-3">
                {student.status === "present" ? (
                  <span className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
                    <UserCheck className="h-4 w-4 text-green-600" />
                  </span>
                ) : student.status === "absent" ? (
                  <span className="h-8 w-8 rounded-full bg-red-100 flex items-center justify-center">
                    <UserX className="h-4 w-4 text-red-600" />
                  </span>
                ) : (
                  <span className="h-8 w-8 rounded-full bg-amber-100 flex items-center justify-center">
                    <Clock className="h-4 w-4 text-amber-600" />
                  </span>
                )}
                <span className="font-medium">{student.name}</span>
              </div>
              <div className={`text-sm ${student.status === 'late' ? 'text-amber-600' : ''}`}>
                {student.time}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default AttendanceCard;
