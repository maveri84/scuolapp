
import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardContent, CardDescription, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { FileText, Upload, Save, Bus, LogOut, MapPin, Lock } from "lucide-react";
import { Student } from "../types/student";
import { toast } from "sonner";
import { Separator } from "@/components/ui/separator";

interface SpecialNeedsTabProps {
  student: Student;
  onChange?: (field: keyof Student, value: any) => void;
}

const SpecialNeedsTab: React.FC<SpecialNeedsTabProps> = ({ student, onChange }) => {
  const [isH, setIsH] = useState(false);
  const [isDSA, setIsDSA] = useState(false);
  const [isBES, setIsBES] = useState(false);
  const [notes, setNotes] = useState(student.notes || "");
  const [useSchoolBus, setUseSchoolBus] = useState(student.useSchoolBus || false);
  const [independentExit, setIndependentExit] = useState(student.independentExit || false);
  const [localExitPermission, setLocalExitPermission] = useState(student.localExitPermission || false);
  const [privacyConsent, setPrivacyConsent] = useState(student.privacyConsent || false);
  
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

  const handleUpload = () => {
    // In a real application, this would trigger a file upload dialog
    toast.info("Funzionalità di caricamento file non implementata in questa demo");
  };
  
  const updateToggle = (field: keyof Student, value: boolean) => {
    if (field === 'useSchoolBus') setUseSchoolBus(value);
    if (field === 'independentExit') setIndependentExit(value);
    if (field === 'localExitPermission') setLocalExitPermission(value);
    if (field === 'privacyConsent') setPrivacyConsent(value);
    
    if (onChange) {
      onChange(field, value);
    }
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
      
      <Card>
        <CardHeader>
          <CardTitle>Autorizzazioni e Permessi</CardTitle>
          <CardDescription>Gestione delle autorizzazioni per lo studente</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between space-x-2">
            <Label htmlFor="use-school-bus" className="flex flex-col space-y-1">
              <div className="flex items-center space-x-2">
                <Bus className="h-4 w-4" />
                <span>Scuola BUS</span>
              </div>
              <span className="font-normal text-sm text-muted-foreground">Lo studente utilizza il servizio di trasporto scolastico</span>
            </Label>
            <Switch 
              id="use-school-bus" 
              checked={useSchoolBus}
              onCheckedChange={(checked) => updateToggle('useSchoolBus', checked)}
            />
          </div>
          
          <div className="flex items-center justify-between space-x-2">
            <Label htmlFor="independent-exit" className="flex flex-col space-y-1">
              <div className="flex items-center space-x-2">
                <LogOut className="h-4 w-4" />
                <span>Uscita Autonoma</span>
              </div>
              <span className="font-normal text-sm text-muted-foreground">Lo studente è autorizzato ad uscire autonomamente da scuola</span>
            </Label>
            <Switch 
              id="independent-exit" 
              checked={independentExit}
              onCheckedChange={(checked) => updateToggle('independentExit', checked)}
            />
          </div>

          <div className="border p-4 rounded-md space-y-3">
            <div className="flex items-center justify-between space-x-2">
              <Label htmlFor="local-exit" className="flex flex-col space-y-1">
                <div className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4" />
                  <span>Uscita sul Territorio</span>
                </div>
                <span className="font-normal text-sm text-muted-foreground">Lo studente è autorizzato a partecipare alle uscite sul territorio</span>
              </Label>
              <Switch 
                id="local-exit" 
                checked={localExitPermission}
                onCheckedChange={(checked) => updateToggle('localExitPermission', checked)}
              />
            </div>
            
            {localExitPermission && (
              <div className="pt-2">
                <Button variant="outline" className="w-full" onClick={handleUpload}>
                  <Upload className="mr-2 h-4 w-4" />
                  Carica Autorizzazione Firmata
                </Button>
              </div>
            )}
          </div>

          <div className="border p-4 rounded-md space-y-3">
            <div className="flex items-center justify-between space-x-2">
              <Label htmlFor="privacy-consent" className="flex flex-col space-y-1">
                <div className="flex items-center space-x-2">
                  <Lock className="h-4 w-4" />
                  <span>Autorizzazioni Privacy</span>
                </div>
                <span className="font-normal text-sm text-muted-foreground">Consenso al trattamento dati e pubblicazione immagini/video</span>
              </Label>
              <Switch 
                id="privacy-consent" 
                checked={privacyConsent}
                onCheckedChange={(checked) => updateToggle('privacyConsent', checked)}
              />
            </div>
            
            {privacyConsent && (
              <div className="pt-2">
                <Button variant="outline" className="w-full" onClick={handleUpload}>
                  <Upload className="mr-2 h-4 w-4" />
                  Carica Modulo Privacy Firmato
                </Button>
              </div>
            )}
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
                <Button variant="outline" className="w-full" onClick={handleUpload}>
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
