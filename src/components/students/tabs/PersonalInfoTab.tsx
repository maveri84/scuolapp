
import React from "react";
import { Card, CardHeader, CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Save } from "lucide-react";
import { Student } from "../types/student";

interface PersonalInfoTabProps {
  student: Student;
}

const PersonalInfoTab: React.FC<PersonalInfoTabProps> = ({ student }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Informazioni Personali</CardTitle>
        <CardDescription>Gestisci i dati anagrafici dello studente</CardDescription>
      </CardHeader>
      <CardContent>
        <form className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">Nome</Label>
              <Input id="firstName" defaultValue={student.firstName} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Cognome</Label>
              <Input id="lastName" defaultValue={student.lastName} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="dateOfBirth">Data di Nascita</Label>
              <Input id="dateOfBirth" type="date" defaultValue="2008-05-15" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="placeOfBirth">Luogo di Nascita</Label>
              <Input id="placeOfBirth" defaultValue={student.placeOfBirth} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="fiscalCode">Codice Fiscale</Label>
              <Input id="fiscalCode" defaultValue={student.fiscalCode} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" defaultValue={student.email} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Telefono</Label>
              <Input id="phone" defaultValue={student.phone} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="address">Indirizzo</Label>
              <Input id="address" defaultValue={student.address} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="city">Città</Label>
              <Input id="city" defaultValue={student.city} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="postalCode">CAP</Label>
              <Input id="postalCode" defaultValue={student.postalCode} />
            </div>
          </div>

          <div className="flex justify-end mt-6">
            <Button>
              <Save className="mr-2 h-4 w-4" />
              Salva Modifiche
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default PersonalInfoTab;
