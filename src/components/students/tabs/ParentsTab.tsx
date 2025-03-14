
import React from "react";
import { Card, CardHeader, CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Save } from "lucide-react";
import { Student } from "../types/student";

interface ParentsTabProps {
  student: Student;
  onChange?: (field: string, value: any) => void;
}

const ParentsTab: React.FC<ParentsTabProps> = ({ student, onChange }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(e.target.id, e.target.value);
    }
  };

  const handleSelectChange = (field: string, value: string) => {
    if (onChange) {
      onChange(field, value);
    }
  };

  const maritalStatusOptions = [
    { value: "single", label: "Celibe/Nubile" },
    { value: "married", label: "Sposato/a" },
    { value: "divorced", label: "Divorziato/a" },
    { value: "separated", label: "Separato/a" },
    { value: "widowed", label: "Vedovo/a" }
  ];

  const educationOptions = [
    { value: "elementary", label: "Scuola Elementare" },
    { value: "middle", label: "Scuola Media" },
    { value: "high", label: "Diploma Superiore" },
    { value: "bachelor", label: "Laurea Triennale" },
    { value: "master", label: "Laurea Magistrale" },
    { value: "phd", label: "Dottorato" }
  ];

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
                <Input 
                  id="fatherFirstName" 
                  value={student.fatherFirstName} 
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="fatherLastName">Cognome</Label>
                <Input 
                  id="fatherLastName" 
                  value={student.fatherLastName} 
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="fatherFiscalCode">Codice Fiscale</Label>
                <Input 
                  id="fatherFiscalCode" 
                  value={student.fatherFiscalCode} 
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="fatherEmail">Email</Label>
                <Input 
                  id="fatherEmail" 
                  type="email" 
                  value={student.fatherEmail} 
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="fatherPhone">Telefono</Label>
                <Input 
                  id="fatherPhone" 
                  value={student.fatherPhone} 
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="fatherOccupation">Occupazione</Label>
                <Input 
                  id="fatherOccupation" 
                  value={student.fatherOccupation} 
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="fatherEducation">Titolo di Studio</Label>
                <Select 
                  value={student.fatherEducation} 
                  onValueChange={(value) => handleSelectChange("fatherEducation", value)}
                >
                  <SelectTrigger id="fatherEducation">
                    <SelectValue placeholder="Seleziona titolo di studio" />
                  </SelectTrigger>
                  <SelectContent>
                    {educationOptions.map(option => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="fatherMaritalStatus">Stato Civile</Label>
                <Select 
                  value={student.fatherMaritalStatus} 
                  onValueChange={(value) => handleSelectChange("fatherMaritalStatus", value)}
                >
                  <SelectTrigger id="fatherMaritalStatus">
                    <SelectValue placeholder="Seleziona stato civile" />
                  </SelectTrigger>
                  <SelectContent>
                    {maritalStatusOptions.map(option => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="fatherAddress">Indirizzo (se diverso da quello dello studente)</Label>
                <Input 
                  id="fatherAddress" 
                  placeholder="Inserisci l'indirizzo completo" 
                />
              </div>
            </div>
          </div>

          <Separator />

          <div>
            <h3 className="text-lg font-medium mb-4">Madre</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="motherFirstName">Nome</Label>
                <Input 
                  id="motherFirstName" 
                  value={student.motherFirstName} 
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="motherLastName">Cognome</Label>
                <Input 
                  id="motherLastName" 
                  value={student.motherLastName} 
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="motherFiscalCode">Codice Fiscale</Label>
                <Input 
                  id="motherFiscalCode" 
                  value={student.motherFiscalCode} 
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="motherEmail">Email</Label>
                <Input 
                  id="motherEmail" 
                  type="email" 
                  value={student.motherEmail} 
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="motherPhone">Telefono</Label>
                <Input 
                  id="motherPhone" 
                  value={student.motherPhone} 
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="motherOccupation">Occupazione</Label>
                <Input 
                  id="motherOccupation" 
                  value={student.motherOccupation} 
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="motherEducation">Titolo di Studio</Label>
                <Select 
                  value={student.motherEducation} 
                  onValueChange={(value) => handleSelectChange("motherEducation", value)}
                >
                  <SelectTrigger id="motherEducation">
                    <SelectValue placeholder="Seleziona titolo di studio" />
                  </SelectTrigger>
                  <SelectContent>
                    {educationOptions.map(option => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="motherMaritalStatus">Stato Civile</Label>
                <Select 
                  value={student.motherMaritalStatus} 
                  onValueChange={(value) => handleSelectChange("motherMaritalStatus", value)}
                >
                  <SelectTrigger id="motherMaritalStatus">
                    <SelectValue placeholder="Seleziona stato civile" />
                  </SelectTrigger>
                  <SelectContent>
                    {maritalStatusOptions.map(option => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="motherAddress">Indirizzo (se diverso da quello dello studente)</Label>
                <Input 
                  id="motherAddress" 
                  placeholder="Inserisci l'indirizzo completo" 
                />
              </div>
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
        </div>
      </CardContent>
    </Card>
  );
};

export default ParentsTab;
