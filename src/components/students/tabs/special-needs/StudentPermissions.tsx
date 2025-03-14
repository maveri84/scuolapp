
import React from "react";
import { Card, CardHeader, CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Bus, LogOut, MapPin, Lock, Upload } from "lucide-react";

interface StudentPermissionsProps {
  useSchoolBus: boolean;
  independentExit: boolean;
  localExitPermission: boolean;
  privacyConsent: boolean;
  onToggleChange: (field: string, value: boolean) => void;
  onUploadClick: () => void;
  isDisabled?: boolean;
}

const StudentPermissions: React.FC<StudentPermissionsProps> = ({
  useSchoolBus,
  independentExit,
  localExitPermission,
  privacyConsent,
  onToggleChange,
  onUploadClick,
  isDisabled = false,
}) => {
  return (
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
            onCheckedChange={(checked) => onToggleChange('useSchoolBus', checked)}
            disabled={isDisabled}
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
            onCheckedChange={(checked) => onToggleChange('independentExit', checked)}
            disabled={isDisabled}
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
              onCheckedChange={(checked) => onToggleChange('localExitPermission', checked)}
              disabled={isDisabled}
            />
          </div>
          
          {localExitPermission && (
            <div className="pt-2">
              <Button variant="outline" className="w-full" onClick={onUploadClick} disabled={isDisabled}>
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
              onCheckedChange={(checked) => onToggleChange('privacyConsent', checked)}
              disabled={isDisabled}
            />
          </div>
          
          {privacyConsent && (
            <div className="pt-2">
              <Button variant="outline" className="w-full" onClick={onUploadClick} disabled={isDisabled}>
                <Upload className="mr-2 h-4 w-4" />
                Carica Modulo Privacy Firmato
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default StudentPermissions;
