
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, Download, Eye, FileText, Search, Upload } from "lucide-react";
import { Input } from "@/components/ui/input";
import { LegalReconstruction, mockLegalRecons } from "./types";
import { useToast } from "@/hooks/use-toast";

const LegalReconstructionManager: React.FC = () => {
  const [legalRecons, setLegalRecons] = useState<LegalReconstruction[]>(mockLegalRecons);
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();
  
  // Filter reconstructions based on search term
  const filteredRecons = legalRecons.filter(
    recon => 
      recon.teacherName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      recon.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      recon.courtName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      recon.sentenceNumber.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const handleNewLegalRecon = () => {
    toast({
      title: "Nuova ricostruzione a sentenza",
      description: "Funzionalità in fase di implementazione",
    });
  };
  
  const handleViewDetails = (id: string) => {
    toast({
      title: "Dettagli ricostruzione legale",
      description: `Visualizzazione dettagli per ricostruzione a sentenza ${id}`,
    });
  };
  
  const getStatusBadge = (status: string) => {
    switch(status) {
      case "approved":
        return <Badge className="bg-green-500">Approvata</Badge>;
      case "rejected":
        return <Badge variant="destructive">Respinta</Badge>;
      case "processing":
        return <Badge variant="secondary">In elaborazione</Badge>;
      case "submitted":
        return <Badge variant="outline" className="border-blue-500 text-blue-500">Inviata</Badge>;
      case "draft":
      default:
        return <Badge variant="outline" className="border-gray-500 text-gray-500">Bozza</Badge>;
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Cerca per nome, tribunale o numero sentenza..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleNewLegalRecon}>
            <Upload className="mr-2 h-4 w-4" />
            Carica Sentenza
          </Button>
          <Button onClick={handleNewLegalRecon}>
            <FileText className="mr-2 h-4 w-4" />
            Nuova Ricostruzione
          </Button>
        </div>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Ricostruzioni a Sentenza</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Dipendente</TableHead>
                <TableHead>Tribunale</TableHead>
                <TableHead>Sentenza</TableHead>
                <TableHead>Data Sentenza</TableHead>
                <TableHead>Stato</TableHead>
                <TableHead className="w-[120px]">Azioni</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRecons.length > 0 ? (
                filteredRecons.map((recon) => (
                  <TableRow key={recon.id}>
                    <TableCell className="font-medium">{recon.teacherName}</TableCell>
                    <TableCell>{recon.courtName}</TableCell>
                    <TableCell>{recon.sentenceNumber}</TableCell>
                    <TableCell>{new Date(recon.sentenceDate).toLocaleDateString('it-IT')}</TableCell>
                    <TableCell>{getStatusBadge(recon.status)}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button variant="outline" size="icon" onClick={() => handleViewDetails(recon.id)}>
                          <Eye className="h-4 w-4" />
                          <span className="sr-only">Visualizza</span>
                        </Button>
                        <Button variant="outline" size="icon">
                          <Download className="h-4 w-4" />
                          <span className="sr-only">Scarica</span>
                        </Button>
                        <Button variant="outline" size="icon">
                          <AlertCircle className="h-4 w-4" />
                          <span className="sr-only">Info</span>
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-6 text-muted-foreground">
                    {searchTerm ? (
                      <>
                        Nessun risultato per "<strong>{searchTerm}</strong>"
                      </>
                    ) : (
                      "Nessuna ricostruzione a sentenza trovata"
                    )}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Gestione sentenze e normativa</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-sm">
              Le ricostruzioni di carriera a seguito di sentenza sono procedure che danno attuazione a decisioni giudiziarie favorevoli al 
              personale scolastico. Queste sentenze possono riguardare vari aspetti, come il riconoscimento integrale del servizio pre-ruolo 
              o la rideterminazione dell'anzianità.
            </p>
            
            <div className="space-y-2">
              <h4 className="font-medium">Procedura:</h4>
              <ol className="list-decimal pl-6 text-sm space-y-1">
                <li>Acquisizione della sentenza passata in giudicato</li>
                <li>Analisi dei termini della sentenza</li>
                <li>Ricostruzione specifica secondo il dispositivo della sentenza</li>
                <li>Emissione del decreto attuativo</li>
                <li>Comunicazione all'interessato e agli uffici competenti</li>
              </ol>
            </div>
            
            <div className="bg-blue-50 p-3 rounded-md border border-blue-200 text-sm">
              <h4 className="font-medium text-blue-800">Nota importante:</h4>
              <p className="text-blue-700 mt-1">
                La ricostruzione a sentenza ha priorità e segue procedure specifiche che possono differire da quelle standard, in base al dispositivo 
                della decisione del giudice. È fondamentale rispettare i tempi di attuazione previsti dalla sentenza stessa.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LegalReconstructionManager;
