
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";

export interface ParameterSettings {
  firstFourYearsPercentage: number;
  remainingYearsPercentage: number;
  minimumServiceDays: number;
  allowPartialSchoolYears: boolean;
  countSummerHolidays: boolean;
}

interface ParametersDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  parameters: ParameterSettings;
  onParametersChange: (parameters: ParameterSettings) => void;
  onSaveParameters: () => void;
}

export const ParametersDialog: React.FC<ParametersDialogProps> = ({
  open,
  onOpenChange,
  parameters,
  onParametersChange,
  onSaveParameters
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Parametri di Riconoscimento Pre-Ruolo</DialogTitle>
          <DialogDescription>
            Configura i parametri per il calcolo del riconoscimento del servizio pre-ruolo
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6 py-4">
          <div className="space-y-3">
            <div className="font-medium">Percentuali di Riconoscimento</div>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <Label className="flex justify-between">
                  <span>Primi 4 anni: {parameters.firstFourYearsPercentage}%</span>
                  <span className="text-sm text-muted-foreground">Art. 485 D.Lgs. 297/94</span>
                </Label>
                <Slider 
                  min={0} 
                  max={100} 
                  step={1}
                  value={[parameters.firstFourYearsPercentage]} 
                  onValueChange={(value) => onParametersChange({ ...parameters, firstFourYearsPercentage: value[0] })}
                />
              </div>
              
              <div className="space-y-2">
                <Label className="flex justify-between">
                  <span>Anni successivi: {parameters.remainingYearsPercentage}%</span>
                  <span className="text-sm text-muted-foreground">Art. 485 D.Lgs. 297/94</span>
                </Label>
                <Slider 
                  min={0} 
                  max={100} 
                  step={0.01}
                  value={[parameters.remainingYearsPercentage]} 
                  onValueChange={(value) => onParametersChange({ ...parameters, remainingYearsPercentage: value[0] })}
                />
              </div>
            </div>
          </div>
          
          <Separator />
          
          <div className="space-y-3">
            <div className="font-medium">Requisiti Minimi</div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="minimumDays">Giorni minimi per anno scolastico</Label>
                <Input 
                  id="minimumDays" 
                  type="number"
                  min="0"
                  max="365"
                  value={parameters.minimumServiceDays}
                  onChange={(e) => onParametersChange({ 
                    ...parameters, 
                    minimumServiceDays: parseInt(e.target.value) || 180 
                  })}
                />
                <p className="text-xs text-muted-foreground">
                  Servizio minimo per considerare valido un anno scolastico.
                </p>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="partialYears" className="cursor-pointer">Riconosci anni scolastici parziali</Label>
                <Switch 
                  id="partialYears" 
                  checked={parameters.allowPartialSchoolYears}
                  onCheckedChange={(checked) => onParametersChange({
                    ...parameters,
                    allowPartialSchoolYears: checked
                  })}
                />
              </div>
              <p className="text-xs text-muted-foreground">
                Se attivo, vengono riconosciuti anche periodi di servizio inferiori all'anno scolastico, in proporzione.
              </p>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="summerHolidays" className="cursor-pointer">Includi ferie estive nel conteggio</Label>
                <Switch 
                  id="summerHolidays" 
                  checked={parameters.countSummerHolidays}
                  onCheckedChange={(checked) => onParametersChange({
                    ...parameters,
                    countSummerHolidays: checked
                  })}
                />
              </div>
              <p className="text-xs text-muted-foreground">
                Se attivo, include anche i periodi di ferie estive nel calcolo del servizio.
              </p>
            </div>
          </div>
          
          <Separator />
          
          <div className="space-y-3">
            <div className="font-medium">Formati di Esportazione</div>
            
            <div className="flex flex-col gap-2">
              <div className="flex items-center space-x-2">
                <input type="checkbox" id="formatOdt" className="h-4 w-4" defaultChecked />
                <Label htmlFor="formatOdt" className="font-normal text-sm">ODT (OpenDocument Text)</Label>
              </div>
              <div className="flex items-center space-x-2">
                <input type="checkbox" id="formatPdf" className="h-4 w-4" defaultChecked />
                <Label htmlFor="formatPdf" className="font-normal text-sm">PDF (Portable Document Format)</Label>
              </div>
              <div className="flex items-center space-x-2">
                <input type="checkbox" id="formatDoc" className="h-4 w-4" />
                <Label htmlFor="formatDoc" className="font-normal text-sm">DOC/DOCX (Microsoft Word)</Label>
              </div>
              <div className="mt-2 text-xs text-muted-foreground">
                Seleziona i formati disponibili per l'esportazione dei documenti.
              </div>
            </div>
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Annulla
          </Button>
          <Button onClick={onSaveParameters}>
            Salva Parametri
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
