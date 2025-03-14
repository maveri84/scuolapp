
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, Download, Eye, FilePlus, Search, UserPlus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { CareerReconstruction, mockCareerRecons } from "./types";
import { useToast } from "@/hooks/use-toast";

const CareerReconstructionManager: React.FC = () => {
  const [reconstructions, setReconstructions] = useState<CareerReconstruction[]>(mockCareerRecons);
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();
  
  // Filter reconstructions based on search term
  const filteredRecons = reconstructions.filter(
    recon => 
      recon.teacherName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      recon.id.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const handleNewReconstruction = () => {
    toast({
      title: "Nuova ricostruzione",
      description: "Funzionalità in fase di implementazione",
    });
  };
  
  const handleViewDetails = (id: string) => {
    toast({
      title: "Dettagli ricostruzione",
      description: `Visualizzazione dettagli per ricostruzione ${id}`,
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
            placeholder="Cerca per nome dipendente o ID..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <Button onClick={handleNewReconstruction}>
            <UserPlus className="mr-2 h-4 w-4" />
            Nuova Ricostruzione
          </Button>
        </div>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Ricostruzioni di Carriera</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Dipendente</TableHead>
                <TableHead>Data Richiesta</TableHead>
                <TableHead>Periodi</TableHead>
                <TableHead>Decreto</TableHead>
                <TableHead>Stato</TableHead>
                <TableHead className="w-[120px]">Azioni</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRecons.length > 0 ? (
                filteredRecons.map((recon) => (
                  <TableRow key={recon.id}>
                    <TableCell className="font-medium">{recon.teacherName}</TableCell>
                    <TableCell>{new Date(recon.requestDate).toLocaleDateString('it-IT')}</TableCell>
                    <TableCell>{recon.servicePeriods.length}</TableCell>
                    <TableCell>
                      {recon.decree ? (
                        <span className="text-xs">{recon.decree.decreeNumber}</span>
                      ) : (
                        <span className="text-xs text-muted-foreground">Non emesso</span>
                      )}
                    </TableCell>
                    <TableCell>{getStatusBadge(recon.status)}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button variant="outline" size="icon" onClick={() => handleViewDetails(recon.id)}>
                          <Eye className="h-4 w-4" />
                          <span className="sr-only">Visualizza</span>
                        </Button>
                        {recon.decree && (
                          <Button variant="outline" size="icon">
                            <Download className="h-4 w-4" />
                            <span className="sr-only">Scarica decreto</span>
                          </Button>
                        )}
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
                      "Nessuna ricostruzione di carriera trovata"
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
          <CardTitle className="text-lg">Normativa di riferimento</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-sm">
              La ricostruzione di carriera è il procedimento con cui l'Amministrazione riconosce al personale scolastico 
              il servizio pre-ruolo ai fini della carriera, determinando l'inquadramento stipendiale.
            </p>
            
            <div className="space-y-2">
              <h4 className="font-medium">Normativa di riferimento:</h4>
              <ul className="list-disc pl-6 text-sm space-y-1">
                <li>D.P.R. n. 399/1988</li>
                <li>D.L. n. 370/1970, convertito in L. n. 576/1970</li>
                <li>D.L. n. 355/2003, convertito in L. n. 47/2004</li>
                <li>CCNL Comparto Scuola</li>
              </ul>
            </div>
            
            <div className="flex justify-end">
              <Button variant="outline" className="text-sm">
                <FilePlus className="mr-2 h-4 w-4" />
                Guida alle ricostruzioni
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CareerReconstructionManager;
