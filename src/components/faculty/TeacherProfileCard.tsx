
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Teacher } from "./types";
import { Mail, Phone, User } from "lucide-react";

interface TeacherProfileCardProps {
  teacher: Teacher;
}

const TeacherProfileCard: React.FC<TeacherProfileCardProps> = ({ teacher }) => {
  return (
    <Card className="w-full md:w-80 h-fit">
      <CardContent className="p-6">
        <div className="flex flex-col items-center space-y-4">
          <div className="relative">
            <div className="h-32 w-32 rounded-full overflow-hidden bg-muted flex items-center justify-center">
              {teacher.profileImageUrl ? (
                <img
                  src={teacher.profileImageUrl}
                  alt={`${teacher.firstName} ${teacher.lastName}`}
                  className="h-full w-full object-cover"
                />
              ) : (
                <User className="h-16 w-16 text-muted-foreground" />
              )}
            </div>
          </div>

          <div className="text-center space-y-1">
            <h3 className="text-xl font-medium">
              {teacher.firstName && teacher.lastName
                ? `${teacher.firstName} ${teacher.lastName}`
                : "Nuovo Docente"}
            </h3>
            <p className="text-sm text-muted-foreground">{teacher.position || "Posizione non specificata"}</p>
            <p className="text-sm font-medium">{teacher.employeeId || ""}</p>
          </div>

          {(teacher.email || teacher.phoneNumber) && (
            <div className="w-full space-y-2 pt-4 border-t">
              {teacher.email && (
                <div className="flex items-center text-sm">
                  <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span className="truncate">{teacher.email}</span>
                </div>
              )}
              {teacher.phoneNumber && (
                <div className="flex items-center text-sm">
                  <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>{teacher.phoneNumber}</span>
                </div>
              )}
            </div>
          )}
          
          <div className="w-full pt-4 border-t">
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="text-muted-foreground">Tipo Contratto:</div>
              <div className="text-right font-medium">{teacher.contractType || "N/A"}</div>
              
              <div className="text-muted-foreground">Data Assunzione:</div>
              <div className="text-right font-medium">
                {teacher.hiringDate ? new Date(teacher.hiringDate).toLocaleDateString("it-IT") : "N/A"}
              </div>
              
              <div className="text-muted-foreground">Status:</div>
              <div className="text-right font-medium">{teacher.isTenured ? "Di ruolo" : "Non di ruolo"}</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TeacherProfileCard;
