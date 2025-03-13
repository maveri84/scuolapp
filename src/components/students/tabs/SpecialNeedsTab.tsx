
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
}

const SpecialNeedsTab: React.FC<SpecialNeedsTabProps> = ({ student }) => {
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
                    <Select defaultValue={student.disability === "Nessuna" ? "nessuna" : "presente"}>
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
                    <Input id="disabilityType" placeholder="Specificare la tipologia di disabilità" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="disabilityClause">Articolo di Riferimento</Label>
                    <Select>
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
                    <Label htmlFor="law10492ExpiryDate">Scadenza Certificazione 104/92</Label>
                    <Input 
                      id="law10492ExpiryDate" 
                      type="date" 
                      placeholder="Data di scadenza"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="otherCertificationsExpiry">Scadenza Altre Certificazioni</Label>
                    <Input 
                      id="otherCertificationsExpiry" 
                      type="date" 
                      placeholder="Data di scadenza"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Documentazione</Label>
                    <Input type="file" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="besType">Tipologia BES</Label>
                    <Input id="besType" placeholder="Es: DSA, ADHD, etc." />
                  </div>
                  <div className="space-y-2">
                    <Label>Note Specifiche</Label>
                    <Textarea 
                      placeholder="Inserisci note specifiche sui bisogni educativi speciali..."
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
                      defaultValue={student.allergies}
                      placeholder="Specificare eventuali allergie" 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="allergyDocumentation">Documentazione Allergie</Label>
                    <Input type="file" id="allergyDocumentation" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="medications">Farmaci Abituali</Label>
                    <Input 
                      id="medications" 
                      defaultValue={student.medications}
                      placeholder="Specificare eventuali farmaci" 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="medicationPermission">Autorizzazione Somministrazione Farmaci</Label>
                    <Input type="file" id="medicationPermission" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="medicationNotes">Note sui Farmaci</Label>
                    <Textarea 
                      id="medicationNotes"
                      placeholder="Specificare modalità di somministrazione, orari, dosaggi..."
                      className="min-h-[100px]"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="md:col-span-2">
            <Card className="border border-muted p-4">
              <CardHeader className="p-0">
                <CardTitle className="text-base flex items-center">
                  <Award className="h-4 w-4 mr-2 text-blue-500" />
                  Talenti e Attitudini
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0 pt-4">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Aree di Eccellenza</Label>
                    <Input placeholder="Es: Matematica, Arte, Sport" />
                  </div>
                  <div className="space-y-2">
                    <Label>Attività Extracurriculari</Label>
                    <Input placeholder="Es: Teatro, Coro, Sport" />
                  </div>
                  <div className="space-y-2">
                    <Label>Note sui Talenti</Label>
                    <Textarea 
                      className="min-h-[100px]"
                      placeholder="Descrivi i talenti e le attitudini dello studente..."
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Button className="w-full">
            <Save className="mr-2 h-4 w-4" />
            Salva Modifiche
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default SpecialNeedsTab;
