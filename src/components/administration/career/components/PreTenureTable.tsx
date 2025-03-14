
import React from "react";
import { PreTenureRecognition } from "../types";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, Download, Eye } from "lucide-react";

interface PreTenureTableProps {
  recognitions: PreTenureRecognition[];
  onViewDetails: (id: string) => void;
  onExportOdt: (id: string) => void;
}

export const PreTenureTable: React.FC<PreTenureTableProps> = ({
  recognitions,
  onViewDetails,
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

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Dipendente</TableHead>
          <TableHead>Data Richiesta</TableHead>
          <TableHead>Servizio Riconosciuto</TableHead>
          <TableHead>Periodi</TableHead>
          <TableHead>Stato</TableHead>
          <TableHead className="w-[120px]">Azioni</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {recognitions.length > 0 ? (
          recognitions.map((recognition) => (
            <TableRow key={recognition.id}>
              <TableCell className="font-medium">{recognition.teacherName}</TableCell>
              <TableCell>{new Date(recognition.requestDate).toLocaleDateString('it-IT')}</TableCell>
              <TableCell>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-1 text-blue-500" />
                  <span>
                    {recognition.totalRecognizedYears} anni, {recognition.totalRecognizedMonths % 12} mesi
                  </span>
                </div>
              </TableCell>
              <TableCell>{recognition.servicePeriods.length}</TableCell>
              <TableCell>{getStatusBadge(recognition.status)}</TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <Button variant="outline" size="icon" onClick={() => onViewDetails(recognition.id)}>
                    <Eye className="h-4 w-4" />
                    <span className="sr-only">Visualizza</span>
                  </Button>
                  <Button variant="outline" size="icon" onClick={() => onExportOdt(recognition.id)} title="Esporta in ODT">
                    <Download className="h-4 w-4" />
                    <span className="sr-only">Esporta in ODT</span>
                  </Button>
                  <Button variant="outline" size="icon" title="Visualizza periodi">
                    <Calendar className="h-4 w-4" />
                    <span className="sr-only">Periodi</span>
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={6} className="text-center py-6 text-muted-foreground">
              Nessun riconoscimento di servizio pre-ruolo trovato
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};
