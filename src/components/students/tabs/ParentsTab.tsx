
import React from "react";
import { Card, CardHeader, CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Save } from "lucide-react";
import { Student } from "../types/student";

interface ParentsTabProps {
  student: Student;
}

const ParentsTab: React.FC<ParentsTabProps> = ({ student }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Informazioni Genitori</CardTitle>
        <CardDescription>Dati di contatto e informazioni dei genitori o tutori</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium mb-4">Padre</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="fatherFirstName">Nome</Label>
                <Input id="fatherFirstName" defaultValue={student.fatherFirstName} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="fatherLastName">Cognome</Label>
                <Input id="fatherLastName" defaultValue={student.fatherLastName} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="fatherFiscalCode">Codice Fiscale</Label>
                <Input id="fatherFiscalCode" defaultValue={student.fatherFiscalCode} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="fatherEmail">Email</Label>
                <Input id="fatherEmail" type="email" defaultValue={student.fatherEmail} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="fatherPhone">Telefono</Label>
                <Input id="fatherPhone" defaultValue={student.fatherPhone} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="fatherOccupation">Occupazione</Label>
                <Input id="fatherOccupation" defaultValue={student.fatherOccupation} />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="fatherAddress">Indirizzo (se diverso da quello dello studente)</Label>
                <Input id="fatherAddress" placeholder="Inserisci l'indirizzo completo" />
              </div>
            </div>
          </div>

          <Separator />

          <div>
            <h3 className="text-lg font-medium mb-4">Madre</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="motherFirstName">Nome</Label>
                <Input id="motherFirstName" defaultValue={student.motherFirstName} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="motherLastName">Cognome</Label>
                <Input id="motherLastName" defaultValue={student.motherLastName} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="motherFiscalCode">Codice Fiscale</Label>
                <Input id="motherFiscalCode" defaultValue={student.motherFiscalCode} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="motherEmail">Email</Label>
                <Input id="motherEmail" type="email" defaultValue={student.motherEmail} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="motherPhone">Telefono</Label>
                <Input id="motherPhone" defaultValue={student.motherPhone} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="motherOccupation">Occupazione</Label>
                <Input id="motherOccupation" defaultValue={student.motherOccupation} />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="motherAddress">Indirizzo (se diverso da quello dello studente)</Label>
                <Input id="motherAddress" placeholder="Inserisci l'indirizzo completo" />
              </div>
            </div>
          </div>

          <div className="flex justify-end mt-6">
            <Button>
              <Save className="mr-2 h-4 w-4" />
              Salva Modifiche
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ParentsTab;
