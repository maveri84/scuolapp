
import React from "react";
import { Card, CardHeader, CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Save, AlertCircle, Pill, Award } from "lucide-react";
import { Student } from "../types/student";

interface SpecialNeedsTabProps {
  student: Student;
  onChange?: (field: string, value: any) => void;
}

const SpecialNeedsTab: React.FC<SpecialNeedsTabProps> = ({ student, onChange }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (onChange) {
      onChange(e.target.id, e.target.value);
    }
  };

  const handleSelectChange = (field: string, value: string) => {
    if (onChange) {
      onChange(field, value);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Particolarità dello Studente</CardTitle>
        <CardDescription>Informazioni specifiche, bisogni speciali, allergie e farmaci</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="border border-muted p-4">
              <CardHeader className="p-0">
                <CardTitle className="text-base flex items-center">
                  <AlertCircle className="h-4 w-4 mr-2 text-yellow-500" />
                  Disabilità e Bisogni Educativi Speciali
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0 pt-4">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="disability">Disabilità</Label>
                    <Select 
                      value={student.disability === "Nessuna" ? "nessuna" : "presente"}
                      onValueChange={(value) => handleSelectChange("disability", value === "nessuna" ? "Nessuna" : "Presente")}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Seleziona" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="nessuna">Nessuna</SelectItem>
                        <SelectItem value="presente">Presente</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="disabilityType">Tipologia Disabilità</Label>
                    <Input 
                      id="disabilityType" 
                      placeholder="Specificare la tipologia di disabilità"
                      onChange={handleChange} 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="disabilityClause">Articolo di Riferimento</Label>
                    <Select onValueChange={(value) => handleSelectChange("disabilityClause", value)}>
                      <SelectTrigger id="disabilityClause">
                        <SelectValue placeholder="Seleziona" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="comma1">Comma 1</SelectItem>
                        <SelectItem value="comma3">Comma 3</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="specialNeeds">Bisogni Educativi Speciali</Label>
                    <Select 
                      value={student.specialNeeds ? "si" : "no"}
                      onValueChange={(value) => handleSelectChange("specialNeeds", value === "si")}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Seleziona" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="no">No</SelectItem>
                        <SelectItem value="si">Sì</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="accommodations">Accomodamenti</Label>
                    <Textarea 
                      id="accommodations" 
                      value={student.accommodations}
                      onChange={handleChange}
                      placeholder="Specificare accomodamenti necessari"
                      className="min-h-[100px]"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border border-muted p-4">
              <CardHeader className="p-0">
                <CardTitle className="text-base flex items-center">
                  <Pill className="h-4 w-4 mr-2 text-red-500" />
                  Allergie e Farmaci
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0 pt-4">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="allergies">Allergie</Label>
                    <Input 
                      id="allergies" 
                      value={student.allergies}
                      onChange={handleChange}
                      placeholder="Specificare eventuali allergie" 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="medications">Farmaci Abituali</Label>
                    <Input 
                      id="medications" 
                      value={student.medications}
                      onChange={handleChange}
                      placeholder="Specificare eventuali farmaci" 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="medicationNotes">Note sui Farmaci</Label>
                    <Textarea 
                      id="medicationNotes"
                      placeholder="Specificare modalità di somministrazione, orari, dosaggi..."
                      onChange={handleChange}
                      className="min-h-[100px]"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {!onChange && (
            <Button className="w-full">
              <Save className="mr-2 h-4 w-4" />
              Salva Modifiche
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default SpecialNeedsTab;
