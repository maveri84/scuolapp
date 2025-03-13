
import React from "react";
import { Card, CardHeader, CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Save } from "lucide-react";
import { Student } from "../types/student";

interface PersonalInfoTabProps {
  student: Student;
  onChange?: (field: string, value: any) => void;
}

const PersonalInfoTab: React.FC<PersonalInfoTabProps> = ({ student, onChange }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(e.target.id, e.target.value);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Informazioni Personali</CardTitle>
        <CardDescription>Gestisci i dati anagrafici dello studente</CardDescription>
      </CardHeader>
      <CardContent>
        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">Nome</Label>
              <Input 
                id="firstName" 
                value={student.firstName} 
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Cognome</Label>
              <Input 
                id="lastName" 
                value={student.lastName} 
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="dateOfBirth">Data di Nascita</Label>
              <Input 
                id="dateOfBirth" 
                type="date" 
                value={student.dateOfBirth || ""} 
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="placeOfBirth">Luogo di Nascita</Label>
              <Input 
                id="placeOfBirth" 
                value={student.placeOfBirth} 
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="fiscalCode">Codice Fiscale</Label>
              <Input 
                id="fiscalCode" 
                value={student.fiscalCode} 
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email" 
                type="email" 
                value={student.email} 
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Telefono</Label>
              <Input 
                id="phone" 
                value={student.phone} 
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="address">Indirizzo</Label>
              <Input 
                id="address" 
                value={student.address} 
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="city">Città</Label>
              <Input 
                id="city" 
                value={student.city} 
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="postalCode">CAP</Label>
              <Input 
                id="postalCode" 
                value={student.postalCode} 
                onChange={handleChange}
              />
            </div>
          </div>

          {!onChange && (
            <div className="flex justify-end mt-6">
              <Button>
                <Save className="mr-2 h-4 w-4" />
                Salva Modifiche
              </Button>
            </div>
          )}
        </form>
      </CardContent>
    </Card>
  );
};

export default PersonalInfoTab;
