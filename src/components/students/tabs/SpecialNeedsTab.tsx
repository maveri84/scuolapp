
import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardContent, CardDescription, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { FileText, Upload, Save } from "lucide-react";
import { Student } from "../types/student";
import { toast } from "sonner";

interface SpecialNeedsTabProps {
  student: Student;
  onChange?: (field: keyof Student, value: any) => void;
}

const SpecialNeedsTab: React.FC<SpecialNeedsTabProps> = ({ student, onChange }) => {
  const [isH, setIsH] = useState(false);
  const [isDSA, setIsDSA] = useState(false);
  const [isBES, setIsBES] = useState(false);
  const [notes, setNotes] = useState(student.notes || "");
  
  const handleNotesChange = (value: string) => {
    setNotes(value);
    if (onChange) {
      onChange("notes", value);
    }
  };
  
  const handleSpecialNeedsChange = (value: boolean) => {
    if (onChange) {
      onChange("specialNeeds", value);
      // When setting specialNeeds, we're considering it's true if any of these is true
      if (isH || isDSA || isBES) {
        onChange("specialNeeds", true);
      } else {
        onChange("specialNeeds", false);
      }
    }
  };
  
  const handleSave = () => {
    toast.success("Informazioni salvate con successo");
  };
  
  useEffect(() => {
    // Update special needs value when component loads or when switches change
    if (onChange && (isH || isDSA || isBES)) {
      onChange("specialNeeds", true);
    }
  }, [isH, isDSA, isBES, onChange]);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Bisogni Educativi Speciali</CardTitle>
          <CardDescription>Gestisci le informazioni sui bisogni educativi speciali dello studente</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between space-x-2">
            <Label htmlFor="is-h" className="flex flex-col space-y-1">
              <span>Disabilità (L. 104/92)</span>
              <span className="font-normal text-sm text-muted-foreground">Lo studente ha una disabilità certificata</span>
            </Label>
            <Switch 
              id="is-h" 
              checked={isH}
              onCheckedChange={(checked) => {
                setIsH(checked);
                handleSpecialNeedsChange(checked || isDSA || isBES);
              }}
            />
          </div>
          
          <div className="flex items-center justify-between space-x-2">
            <Label htmlFor="is-dsa" className="flex flex-col space-y-1">
              <span>DSA (L. 170/2010)</span>
              <span className="font-normal text-sm text-muted-foreground">Lo studente ha un disturbo specifico dell'apprendimento</span>
            </Label>
            <Switch 
              id="is-dsa" 
              checked={isDSA}
              onCheckedChange={(checked) => {
                setIsDSA(checked);
                handleSpecialNeedsChange(isH || checked || isBES);
              }}
            />
          </div>
          
          <div className="flex items-center justify-between space-x-2">
            <Label htmlFor="is-bes" className="flex flex-col space-y-1">
              <span>Altri BES (Dir. Min. 27/12/2012)</span>
              <span className="font-normal text-sm text-muted-foreground">Lo studente ha altri bisogni educativi speciali</span>
            </Label>
            <Switch 
              id="is-bes" 
              checked={isBES}
              onCheckedChange={(checked) => {
                setIsBES(checked);
                handleSpecialNeedsChange(isH || isDSA || checked);
              }}
            />
          </div>
        </CardContent>
      </Card>
      
      {(isH || isDSA || isBES) && (
        <Card>
          <CardHeader>
            <CardTitle>Documentazione e Note</CardTitle>
            <CardDescription>Carica documenti e aggiungi note sulle particolarità dello studente</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-1.5">
              <Label>Documenti</Label>
              <div className="flex flex-col space-y-2">
                <div className="border rounded-md p-4 flex justify-between items-center">
                  <div className="flex items-center">
                    <FileText className="h-5 w-5 mr-2" />
                    <span>Diagnosi Funzionale.pdf</span>
                  </div>
                  <Button variant="ghost" size="sm">Visualizza</Button>
                </div>
                <div className="border rounded-md p-4 flex justify-between items-center">
                  <div className="flex items-center">
                    <FileText className="h-5 w-5 mr-2" />
                    <span>PEI_2023_2024.pdf</span>
                  </div>
                  <Button variant="ghost" size="sm">Visualizza</Button>
                </div>
                <Button variant="outline" className="w-full">
                  <Upload className="mr-2 h-4 w-4" />
                  Carica Nuovo Documento
                </Button>
              </div>
            </div>
            
            <div className="space-y-1.5">
              <Label htmlFor="special-notes">Note</Label>
              <Textarea 
                id="special-notes" 
                placeholder="Aggiungi note sulle particolarità dello studente..."
                value={notes}
                onChange={(e) => handleNotesChange(e.target.value)}
                rows={5}
              />
            </div>
            
            <Button onClick={handleSave}>
              <Save className="mr-2 h-4 w-4" />
              Salva Informazioni
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default SpecialNeedsTab;
