
import React from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Check, Download, GraduationCap, X } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { PreTenureRecognition } from "../types";
import { Badge } from "@/components/ui/badge";

interface DetailsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  recognition: PreTenureRecognition | null;
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
  onExportOdt: (id: string) => void;
}

export const DetailsDialog: React.FC<DetailsDialogProps> = ({
  open,
  onOpenChange,
  recognition,
  onApprove,
  onReject,
  onExportOdt
}) => {
  const getStatusBadge = (status: string) => {
    switch(status) {
      case "approved":
        return <Badge className="bg-green-500">Approvato</Badge>;
      case "rejected":
        return <Badge variant="destructive">Respinto</Badge>;
      case "processing":
        return <Badge variant="secondary">In elaborazione</Badge>;
      case "submitted":
        return <Badge variant="outline" className="border-blue-500 text-blue-500">Inviato</Badge>;
      case "draft":
      default:
        return <Badge variant="outline" className="border-gray-500 text-gray-500">Bozza</Badge>;
    }
  };

  if (!recognition) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <GraduationCap className="h-5 w-5" />
            Dettagli Riconoscimento Pre-Ruolo
            {getStatusBadge(recognition.status)}
          </DialogTitle>
          <DialogDescription>
            Dettagli completi del riconoscimento servizio pre-ruolo
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="font-semibold">Informazioni generali</div>
              <div className="grid grid-cols-2 gap-1">
                <div className="text-sm font-medium">ID:</div>
                <div className="text-sm">{recognition.id}</div>
                
                <div className="text-sm font-medium">Dipendente:</div>
                <div className="text-sm">{recognition.teacherName}</div>
                
                <div className="text-sm font-medium">Data richiesta:</div>
                <div className="text-sm">{new Date(recognition.requestDate).toLocaleDateString('it-IT')}</div>
                
                {recognition.submissionDate && (
                  <>
                    <div className="text-sm font-medium">Data invio:</div>
                    <div className="text-sm">{new Date(recognition.submissionDate).toLocaleDateString('it-IT')}</div>
                  </>
                )}
                
                {recognition.approvalDate && (
                  <>
                    <div className="text-sm font-medium">Data approvazione:</div>
                    <div className="text-sm">{new Date(recognition.approvalDate).toLocaleDateString('it-IT')}</div>
                  </>
                )}
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="font-semibold">Riepilogo servizio riconosciuto</div>
              <div className="grid grid-cols-2 gap-1">
                <div className="text-sm font-medium">Anni:</div>
                <div className="text-sm">{recognition.totalRecognizedYears}</div>
                
                <div className="text-sm font-medium">Mesi:</div>
                <div className="text-sm">{recognition.totalRecognizedMonths % 12}</div>
                
                <div className="text-sm font-medium">Periodi:</div>
                <div className="text-sm">{recognition.servicePeriods.length}</div>
                
                {recognition.parameters?.recognitionPercentages && (
                  <>
                    <div className="text-sm font-medium">Parametri di calcolo:</div>
                    <div className="text-sm">
                      Primi 4 anni: {recognition.parameters.recognitionPercentages.firstFourYears}%, 
                      Rimanenti: {recognition.parameters.recognitionPercentages.remainingYears}%
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
          
          <Separator />
          
          <div className="space-y-2">
            <div className="font-semibold">Periodi di servizio</div>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Periodo</TableHead>
                    <TableHead>Istituzione</TableHead>
                    <TableHead>Ruolo</TableHead>
                    <TableHead>Durata</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recognition.servicePeriods.map((period, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        {new Date(period.startDate).toLocaleDateString('it-IT')} - {new Date(period.endDate).toLocaleDateString('it-IT')}
                      </TableCell>
                      <TableCell>{period.institution}</TableCell>
                      <TableCell>{period.role} ({period.contractType})</TableCell>
                      <TableCell>
                        {period.yearsCount} anni, {period.monthsCount % 12} mesi
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
          
          {recognition.notes && (
            <div className="space-y-2">
              <div className="font-semibold">Note</div>
              <div className="text-sm p-2 bg-gray-50 rounded-md">{recognition.notes}</div>
            </div>
          )}
          
          {recognition.status === "approved" && recognition.decree && (
            <>
              <Separator />
              
              <div className="space-y-2">
                <div className="font-semibold">Decreto</div>
                <Alert className="bg-green-50 border-green-200">
                  <Check className="h-4 w-4 text-green-600" />
                  <AlertTitle className="text-green-800">{recognition.decree.decreeName}</AlertTitle>
                  <AlertDescription className="text-green-700">
                    N. {recognition.decree.decreeNumber} del {new Date(recognition.decree.decreeDate).toLocaleDateString('it-IT')}
                  </AlertDescription>
                </Alert>
                <div className="flex justify-end">
                  <Button variant="outline" className="text-sm" onClick={() => onExportOdt(recognition.id)}>
                    <Download className="mr-2 h-4 w-4" />
                    Esporta decreto in ODT
                  </Button>
                </div>
              </div>
            </>
          )}
          
          <div className="pt-4 flex justify-between">
            <div>
              {recognition.status === "submitted" && (
                <div className="flex gap-2">
                  <Button onClick={() => onReject(recognition.id)} variant="destructive">
                    <X className="mr-2 h-4 w-4" />
                    Respingi
                  </Button>
                  <Button onClick={() => onApprove(recognition.id)}>
                    <Check className="mr-2 h-4 w-4" />
                    Approva
                  </Button>
                </div>
              )}
            </div>
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Chiudi
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
