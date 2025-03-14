
import React from "react";
import { Card, CardHeader, CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { FileText, Upload, Save } from "lucide-react";

interface DocumentationAndNotesProps {
  notes: string;
  onNotesChange: (value: string) => void;
  onSave: () => void;
  onUpload: () => void;
  isDisabled?: boolean;
  showSaveButton?: boolean;
}

const DocumentationAndNotes: React.FC<DocumentationAndNotesProps> = ({
  notes,
  onNotesChange,
  onSave,
  onUpload,
  isDisabled = false,
  showSaveButton = true,
}) => {
  return (
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
            <Button variant="outline" className="w-full" onClick={onUpload} disabled={isDisabled}>
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
            onChange={(e) => onNotesChange(e.target.value)}
            rows={5}
            disabled={isDisabled}
          />
        </div>
        
        {showSaveButton && (
          <Button onClick={onSave} disabled={isDisabled}>
            <Save className="mr-2 h-4 w-4" />
            Salva Informazioni
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default DocumentationAndNotes;
