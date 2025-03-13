
import React from "react";
import { Card, CardHeader, CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import { UserCircle, Calendar, MapPin, BadgeCheck, Mail, Phone } from "lucide-react";
import { Student } from "../types/student";

interface ProfileCardProps {
  student: Student;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ student }) => {
  return (
    <Card className="flex-1">
      <CardHeader className="bg-muted/50">
        <div className="flex items-center">
          <UserCircle className="h-8 w-8 mr-3 text-primary" />
          <div>
            <CardTitle>{student.firstName} {student.lastName}</CardTitle>
            <CardDescription>Matricola: {student.studentId} • Classe: {student.class}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-6">
        <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
          <div>
            <dt className="text-sm font-medium text-muted-foreground">Data di nascita</dt>
            <dd className="mt-1 flex items-center">
              <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
              {student.dateOfBirth}
            </dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-muted-foreground">Luogo di nascita</dt>
            <dd className="mt-1 flex items-center">
              <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
              {student.placeOfBirth}
            </dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-muted-foreground">Codice Fiscale</dt>
            <dd className="mt-1 flex items-center">
              <BadgeCheck className="h-4 w-4 mr-2 text-muted-foreground" />
              {student.fiscalCode}
            </dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-muted-foreground">Email</dt>
            <dd className="mt-1 flex items-center">
              <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
              {student.email}
            </dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-muted-foreground">Telefono</dt>
            <dd className="mt-1 flex items-center">
              <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
              {student.phone}
            </dd>
          </div>
          <div className="md:col-span-2">
            <dt className="text-sm font-medium text-muted-foreground">Indirizzo</dt>
            <dd className="mt-1 flex items-center">
              <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
              {student.address}, {student.city}, {student.postalCode}
            </dd>
          </div>
        </dl>
      </CardContent>
    </Card>
  );
};

export default ProfileCard;
