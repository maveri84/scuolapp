
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Calculator, Calendar, Clock, Download, Eye, FileText, GraduationCap, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { PreTenureRecognition, mockPreTenureRecognitions } from "./types";
import { useToast } from "@/hooks/use-toast";

const PreTenureRecognitionManager: React.FC = () => {
  const [recognitions, setRecognitions] = useState<PreTenureRecognition[]>(mockPreTenureRecognitions);
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();
  
  // Filter recognitions based on search term
  const filteredRecognitions = recognitions.filter(
    rec => 
      rec.teacherName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rec.id.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const handleNewRecognition = () => {
    toast({
      title: "Nuovo riconoscimento pre-ruolo",
      description: "Funzionalità in fase di implementazione",
    });
  };
  
  const handleCalculator = () => {
    toast({
      title: "Calcolatore anni pre-ruolo",
      description: "Apertura strumento di calcolo periodi di servizio",
    });
  };
  
  const handleViewDetails = (id: string) => {
    toast({
      title: "Dettagli riconoscimento",
      description: `Visualizzazione dettagli per riconoscimento ${id}`,
    });
  };
  
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
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Cerca per nome dipendente o ID..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleCalculator}>
            <Calculator className="mr-2 h-4 w-4" />
            Calcolatore
          </Button>
          <Button onClick={handleNewRecognition}>
            <GraduationCap className="mr-2 h-4 w-4" />
            Nuovo Riconoscimento
          </Button>
        </div>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Riconoscimenti Servizio Pre-Ruolo</CardTitle>
        </CardHeader>
        <CardContent>
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
              {filteredRecognitions.length > 0 ? (
                filteredRecognitions.map((recognition) => (
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
                        <Button variant="outline" size="icon" onClick={() => handleViewDetails(recognition.id)}>
                          <Eye className="h-4 w-4" />
                          <span className="sr-only">Visualizza</span>
                        </Button>
                        {recognition.decree && (
                          <Button variant="outline" size="icon">
                            <Download className="h-4 w-4" />
                            <span className="sr-only">Scarica decreto</span>
                          </Button>
                        )}
                        <Button variant="outline" size="icon">
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
                    {searchTerm ? (
                      <>
                        Nessun risultato per "<strong>{searchTerm}</strong>"
                      </>
                    ) : (
                      "Nessun riconoscimento di servizio pre-ruolo trovato"
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
          <CardTitle className="text-lg">Normativa sul riconoscimento del servizio pre-ruolo</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-sm">
              Il riconoscimento del servizio pre-ruolo è il procedimento con cui, a domanda dell'interessato, viene riconosciuto 
              il servizio prestato con contratto a tempo determinato prima dell'immissione in ruolo.
            </p>
            
            <div className="space-y-2">
              <h4 className="font-medium">Riferimenti normativi:</h4>
              <ul className="list-disc pl-6 text-sm space-y-1">
                <li>Art. 485 D.Lgs. n. 297/1994 (Testo Unico)</li>
                <li>D.L. n. 370/1970, convertito in L. n. 576/1970</li>
                <li>Art. 142 della L. n. 312/1980</li>
                <li>D.P.R. n. 399/1988</li>
              </ul>
            </div>
            
            <div className="space-y-2">
              <h4 className="font-medium">Calcolo del servizio pre-ruolo:</h4>
              <ul className="list-disc pl-6 text-sm space-y-1">
                <li>Primo servizio prestato: per intero (fino a 4 anni)</li>
                <li>Ulteriore servizio: 2/3 del periodo restante</li>
                <li>Il servizio deve essere stato prestato con possesso del titolo di studio prescritto per l'accesso al ruolo di appartenenza</li>
                <li>Le frazioni di anno sono valutate per dodicesimi (servizio continuativo di almeno 180 giorni o ininterrotto dal 1 febbraio fino al termine delle operazioni di scrutinio finale)</li>
              </ul>
            </div>
            
            <div className="flex justify-end">
              <Button variant="outline" className="text-sm">
                <FileText className="mr-2 h-4 w-4" />
                Guida completa ai riconoscimenti
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PreTenureRecognitionManager;
