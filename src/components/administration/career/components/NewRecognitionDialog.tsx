
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Info, Minus } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { PreTenureRecognition, ServicePeriod } from "../types";
import { ServicePeriodForm } from "./ServicePeriodForm";

interface NewRecognitionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  newRecognition: Partial<PreTenureRecognition>;
  onNewRecognitionChange: (field: string, value: string) => void;
  newServicePeriod: Partial<ServicePeriod>;
  onServicePeriodChange: (field: string, value: string) => void;
  onAddServicePeriod: () => void;
  onRemoveServicePeriod: (index: number) => void;
  onSubmit: () => void;
}

export const NewRecognitionDialog: React.FC<NewRecognitionDialogProps> = ({
  open,
  onOpenChange,
  newRecognition,
  onNewRecognitionChange,
  newServicePeriod,
  onServicePeriodChange,
  onAddServicePeriod,
  onRemoveServicePeriod,
  onSubmit
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Nuovo Riconoscimento Servizio Pre-Ruolo</DialogTitle>
          <DialogDescription>
            Inserisci i dati per il nuovo riconoscimento del servizio pre-ruolo.
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-1 gap-2">
            <Label htmlFor="teacherName">Nome Dipendente</Label>
            <Input 
              id="teacherName" 
              value={newRecognition.teacherName || ""} 
              onChange={(e) => onNewRecognitionChange("teacherName", e.target.value)}
              placeholder="Inserisci il nome del dipendente"
            />
          </div>
          
          <div className="grid grid-cols-1 gap-2">
            <Label htmlFor="requestDate">Data Richiesta</Label>
            <Input 
              id="requestDate" 
              type="date"
              value={newRecognition.requestDate} 
              onChange={(e) => onNewRecognitionChange("requestDate", e.target.value)}
            />
          </div>
          
          <Separator />
          
          <ServicePeriodForm
            servicePeriod={newServicePeriod}
            onServicePeriodChange={onServicePeriodChange}
            onAddServicePeriod={onAddServicePeriod}
          />
          
          <Separator />
          
          <div className="space-y-2">
            <h4 className="font-medium">Periodi di Servizio Aggiunti</h4>
            
            {newRecognition.servicePeriods && newRecognition.servicePeriods.length > 0 ? (
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Periodo</TableHead>
                      <TableHead>Istituzione</TableHead>
                      <TableHead>Durata</TableHead>
                      <TableHead className="w-[70px]"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {newRecognition.servicePeriods.map((period, index) => (
                      <TableRow key={index}>
                        <TableCell>
                          {new Date(period.startDate).toLocaleDateString('it-IT')} - {new Date(period.endDate).toLocaleDateString('it-IT')}
                        </TableCell>
                        <TableCell>{period.institution}</TableCell>
                        <TableCell>
                          {period.yearsCount} anni, {period.monthsCount % 12} mesi
                        </TableCell>
                        <TableCell>
                          <Button variant="ghost" size="icon" onClick={() => onRemoveServicePeriod(index)}>
                            <Minus className="h-4 w-4 text-red-500" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            ) : (
              <div className="text-center py-4 text-muted-foreground border rounded-md">
                Nessun periodo di servizio aggiunto
              </div>
            )}
          </div>
          
          {newRecognition.servicePeriods && newRecognition.servicePeriods.length > 0 && (
            <Alert>
              <Info className="h-4 w-4" />
              <AlertTitle>Riepilogo</AlertTitle>
              <AlertDescription>
                Totale servizio pre-ruolo: {newRecognition.totalRecognizedYears} anni, {newRecognition.totalRecognizedMonths % 12} mesi ({newRecognition.totalRecognizedDays} giorni)
              </AlertDescription>
            </Alert>
          )}
          
          <div className="grid grid-cols-1 gap-2">
            <Label htmlFor="notes">Note</Label>
            <Textarea 
              id="notes" 
              value={newRecognition.notes || ""} 
              onChange={(e) => onNewRecognitionChange("notes", e.target.value)}
              placeholder="Inserisci eventuali note"
              rows={2}
            />
          </div>
          
          <div className="space-y-2">
            <Label>Formato di Esportazione</Label>
            <div className="flex gap-4 mt-1">
              <div className="flex items-center space-x-2">
                <input type="checkbox" id="exportOdt" className="h-4 w-4" defaultChecked />
                <Label htmlFor="exportOdt" className="font-normal text-sm">ODT</Label>
              </div>
              <div className="flex items-center space-x-2">
                <input type="checkbox" id="exportPdf" className="h-4 w-4" defaultChecked />
                <Label htmlFor="exportPdf" className="font-normal text-sm">PDF</Label>
              </div>
            </div>
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Annulla
          </Button>
          <Button onClick={onSubmit}>
            Salva Riconoscimento
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
