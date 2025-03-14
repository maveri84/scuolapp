
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Eye, FilePlus, FileText, Search, UserPlus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { CareerProgression, mockCareerProgressions } from "./types";
import { useToast } from "@/hooks/use-toast";

const CareerProgressionManager: React.FC = () => {
  const [progressions, setProgressions] = useState<CareerProgression[]>(mockCareerProgressions);
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();
  
  // Filter progressions based on search term
  const filteredProgressions = progressions.filter(
    prog => 
      prog.teacherName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      prog.currentStep.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
      prog.id.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const handleNewProgression = () => {
    toast({
      title: "Nuova progressione",
      description: "Funzionalità in fase di implementazione",
    });
  };
  
  const handleViewDetails = (id: string) => {
    toast({
      title: "Dettagli progressione",
      description: `Visualizzazione dettagli per progressione ${id}`,
    });
  };
  
  const getStatusBadge = (status: string) => {
    switch(status) {
      case "approved":
        return <Badge className="bg-green-500">Approvata</Badge>;
      case "rejected":
        return <Badge variant="destructive">Respinta</Badge>;
      case "pending":
      default:
        return <Badge variant="outline" className="border-orange-500 text-orange-500">In attesa</Badge>;
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Cerca per nome dipendente, ruolo o ID..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <Button onClick={handleNewProgression}>
            <UserPlus className="mr-2 h-4 w-4" />
            Nuova Progressione
          </Button>
        </div>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Progressioni di Carriera</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Dipendente</TableHead>
                <TableHead>Data Progressione</TableHead>
                <TableHead>Fascia Attuale</TableHead>
                <TableHead>Fascia Precedente</TableHead>
                <TableHead>Stato</TableHead>
                <TableHead className="w-[100px]">Azioni</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProgressions.length > 0 ? (
                filteredProgressions.map((prog) => (
                  <TableRow key={prog.id}>
                    <TableCell className="font-medium">{prog.teacherName}</TableCell>
                    <TableCell>{new Date(prog.progressionDate).toLocaleDateString('it-IT')}</TableCell>
                    <TableCell>{prog.currentStep.salaryGrade}</TableCell>
                    <TableCell>{prog.previousStep.salaryGrade}</TableCell>
                    <TableCell>{getStatusBadge(prog.approvalStatus)}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button variant="outline" size="icon" onClick={() => handleViewDetails(prog.id)}>
                          <Eye className="h-4 w-4" />
                          <span className="sr-only">Visualizza</span>
                        </Button>
                        <Button variant="outline" size="icon">
                          <FileText className="h-4 w-4" />
                          <span className="sr-only">Documenti</span>
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
                      "Nessuna progressione di carriera trovata"
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
          <CardTitle className="text-lg">Come funzionano le progressioni</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-sm">
              Le progressioni di carriera per il personale scolastico in Italia avvengono secondo le normative del CCNL vigente, 
              che prevede scatti stipendiali basati sull'anzianità di servizio.
            </p>
            
            <div className="space-y-2">
              <h4 className="font-medium">Passaggi di fascia stipendiale:</h4>
              <ul className="list-disc pl-6 text-sm space-y-1">
                <li>0-8 anni (prima fascia)</li>
                <li>9-14 anni (seconda fascia)</li>
                <li>15-20 anni (terza fascia)</li>
                <li>21-27 anni (quarta fascia)</li>
                <li>28-34 anni (quinta fascia)</li>
                <li>Da 35 anni in poi (sesta fascia)</li>
              </ul>
            </div>
            
            <div className="flex justify-end">
              <Button variant="outline" className="text-sm">
                <FilePlus className="mr-2 h-4 w-4" />
                Apri normativa CCNL completa
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CareerProgressionManager;
