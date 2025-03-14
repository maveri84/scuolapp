
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Eye, FilePlus, FileText, Search, UserPlus, X, Award } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CareerProgression, CareerStep, mockCareerProgressions } from "./types";
import { useToast } from "@/hooks/use-toast";

const CareerProgressionManager: React.FC = () => {
  const [progressions, setProgressions] = useState<CareerProgression[]>(mockCareerProgressions);
  const [searchTerm, setSearchTerm] = useState("");
  const [showNewProgressionDialog, setShowNewProgressionDialog] = useState(false);
  const [showDetailsDialog, setShowDetailsDialog] = useState(false);
  const [selectedProgression, setSelectedProgression] = useState<CareerProgression | null>(null);
  const [newProgression, setNewProgression] = useState<Partial<CareerProgression>>({
    teacherName: "",
    currentStep: {
      role: "Docente",
      category: "Docente",
      contractType: "Tempo indeterminato",
      salaryGrade: "",
      salary: 0,
      institution: "",
      startDate: new Date().toISOString().split('T')[0],
      endDate: "",
      description: "",
      id: ""
    } as CareerStep,
    previousStep: {
      role: "Docente",
      category: "Docente",
      contractType: "Tempo indeterminato",
      salaryGrade: "",
      salary: 0,
      institution: "",
      startDate: "",
      endDate: "",
      description: "",
      id: ""
    } as CareerStep,
    approvalStatus: "pending",
    notes: "",
    progressionDate: new Date().toISOString().split('T')[0],
    documents: []
  });
  
  const { toast } = useToast();
  
  // Filter progressions based on search term
  const filteredProgressions = progressions.filter(
    prog => 
      prog.teacherName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      prog.currentStep.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
      prog.id.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const handleNewProgression = () => {
    setShowNewProgressionDialog(true);
  };
  
  const handleSubmitNewProgression = () => {
    if (!newProgression.teacherName || 
        !newProgression.currentStep?.salaryGrade || 
        !newProgression.previousStep?.salaryGrade) {
      toast({
        title: "Dati incompleti",
        description: "Compilare tutti i campi obbligatori",
        variant: "destructive"
      });
      return;
    }

    const newId = `prog${progressions.length + 1}`;
    const teacherId = `t${progressions.length + 1}`;
    
    const progressionToAdd: CareerProgression = {
      id: newId,
      teacherId,
      teacherName: newProgression.teacherName || "",
      currentStep: {
        ...newProgression.currentStep as CareerStep,
        id: `step${Math.random().toString(36).substring(7)}`
      },
      previousStep: {
        ...newProgression.previousStep as CareerStep,
        id: `step${Math.random().toString(36).substring(7)}`
      },
      progressionDate: newProgression.progressionDate || new Date().toISOString(),
      approvalStatus: "pending",
      notes: newProgression.notes || "",
      documents: []
    };
    
    setProgressions(prev => [...prev, progressionToAdd]);
    setShowNewProgressionDialog(false);
    
    toast({
      title: "Progressione creata",
      description: `Progressione per ${progressionToAdd.teacherName} aggiunta con successo`,
    });
    
    // Reset form
    setNewProgression({
      teacherName: "",
      currentStep: {
        role: "Docente",
        category: "Docente",
        contractType: "Tempo indeterminato",
        salaryGrade: "",
        salary: 0,
        institution: "",
        startDate: new Date().toISOString().split('T')[0],
        endDate: "",
        description: "",
        id: ""
      } as CareerStep,
      previousStep: {
        role: "Docente",
        category: "Docente",
        contractType: "Tempo indeterminato",
        salaryGrade: "",
        salary: 0,
        institution: "",
        startDate: "",
        endDate: "",
        description: "",
        id: ""
      } as CareerStep,
      approvalStatus: "pending",
      notes: "",
      progressionDate: new Date().toISOString().split('T')[0],
      documents: []
    });
  };
  
  const handleViewDetails = (id: string) => {
    const progression = progressions.find(p => p.id === id);
    if (progression) {
      setSelectedProgression(progression);
      setShowDetailsDialog(true);
    }
  };

  const handleApproveProgression = (id: string) => {
    setProgressions(prev => 
      prev.map(prog => 
        prog.id === id 
          ? {...prog, 
             approvalStatus: "approved", 
             approvalDate: new Date().toISOString(),
             approvedBy: "Admin" // In un'applicazione reale, questo verrebbe dall'utente loggato
            } 
          : prog
      )
    );
    
    toast({
      title: "Progressione approvata",
      description: `Progressione ${id} approvata con successo`,
      variant: "default"
    });
    
    setShowDetailsDialog(false);
  };
  
  const handleRejectProgression = (id: string) => {
    setProgressions(prev => 
      prev.map(prog => 
        prog.id === id 
          ? {...prog, 
             approvalStatus: "rejected", 
             approvalDate: new Date().toISOString(),
             approvedBy: "Admin" // In un'applicazione reale, questo verrebbe dall'utente loggato
            } 
          : prog
      )
    );
    
    toast({
      title: "Progressione respinta",
      description: `Progressione ${id} respinta`,
      variant: "destructive"
    });
    
    setShowDetailsDialog(false);
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

      {/* Dialogo per nuova progressione */}
      <Dialog open={showNewProgressionDialog} onOpenChange={setShowNewProgressionDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Nuova Progressione di Carriera</DialogTitle>
            <DialogDescription>
              Inserisci i dati per la nuova progressione di carriera.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-1 gap-2">
              <Label htmlFor="teacherName">Nome Dipendente</Label>
              <Input 
                id="teacherName" 
                value={newProgression.teacherName} 
                onChange={(e) => setNewProgression(prev => ({...prev, teacherName: e.target.value}))}
                placeholder="Inserisci il nome del dipendente"
              />
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <h4 className="font-medium">Fascia Stipendiale Attuale</h4>
                <div className="space-y-2">
                  <div>
                    <Label htmlFor="currentSalaryGrade">Fascia</Label>
                    <Select 
                      onValueChange={(value) => 
                        setNewProgression(prev => ({
                          ...prev, 
                          currentStep: {...prev.currentStep as CareerStep, salaryGrade: value}
                        }))
                      }
                      value={newProgression.currentStep?.salaryGrade}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Seleziona fascia stipendiale" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="0-8">0-8 anni</SelectItem>
                        <SelectItem value="9-14">9-14 anni</SelectItem>
                        <SelectItem value="15-20">15-20 anni</SelectItem>
                        <SelectItem value="21-27">21-27 anni</SelectItem>
                        <SelectItem value="28-34">28-34 anni</SelectItem>
                        <SelectItem value="35+">Da 35 anni in poi</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="currentSalary">Stipendio Annuale</Label>
                    <Input 
                      id="currentSalary" 
                      type="number"
                      value={newProgression.currentStep?.salary || ""} 
                      onChange={(e) => 
                        setNewProgression(prev => ({
                          ...prev, 
                          currentStep: {...prev.currentStep as CareerStep, salary: Number(e.target.value)}
                        }))
                      }
                      placeholder="Inserisci lo stipendio annuale"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="currentInstitution">Istituzione</Label>
                    <Input 
                      id="currentInstitution"
                      value={newProgression.currentStep?.institution || ""} 
                      onChange={(e) => 
                        setNewProgression(prev => ({
                          ...prev, 
                          currentStep: {...prev.currentStep as CareerStep, institution: e.target.value}
                        }))
                      }
                      placeholder="Inserisci l'istituzione"
                    />
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <h4 className="font-medium">Fascia Stipendiale Precedente</h4>
                <div className="space-y-2">
                  <div>
                    <Label htmlFor="previousSalaryGrade">Fascia</Label>
                    <Select 
                      onValueChange={(value) => 
                        setNewProgression(prev => ({
                          ...prev, 
                          previousStep: {...prev.previousStep as CareerStep, salaryGrade: value}
                        }))
                      }
                      value={newProgression.previousStep?.salaryGrade}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Seleziona fascia stipendiale" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="0-8">0-8 anni</SelectItem>
                        <SelectItem value="9-14">9-14 anni</SelectItem>
                        <SelectItem value="15-20">15-20 anni</SelectItem>
                        <SelectItem value="21-27">21-27 anni</SelectItem>
                        <SelectItem value="28-34">28-34 anni</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="previousSalary">Stipendio Annuale</Label>
                    <Input 
                      id="previousSalary" 
                      type="number"
                      value={newProgression.previousStep?.salary || ""} 
                      onChange={(e) => 
                        setNewProgression(prev => ({
                          ...prev, 
                          previousStep: {...prev.previousStep as CareerStep, salary: Number(e.target.value)}
                        }))
                      }
                      placeholder="Inserisci lo stipendio annuale precedente"
                    />
                  </div>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 gap-2">
              <Label htmlFor="progressionDate">Data Progressione</Label>
              <Input 
                id="progressionDate" 
                type="date"
                value={newProgression.progressionDate} 
                onChange={(e) => setNewProgression(prev => ({...prev, progressionDate: e.target.value}))}
              />
            </div>
            
            <div className="grid grid-cols-1 gap-2">
              <Label htmlFor="notes">Note</Label>
              <Input 
                id="notes" 
                value={newProgression.notes} 
                onChange={(e) => setNewProgression(prev => ({...prev, notes: e.target.value}))}
                placeholder="Inserisci eventuali note"
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowNewProgressionDialog(false)}>
              Annulla
            </Button>
            <Button onClick={handleSubmitNewProgression}>
              Salva Progressione
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialogo dettagli progressione */}
      <Dialog open={showDetailsDialog} onOpenChange={setShowDetailsDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Award className="h-5 w-5" />
              Dettagli Progressione
              {selectedProgression && getStatusBadge(selectedProgression.approvalStatus)}
            </DialogTitle>
            <DialogDescription>
              Dettagli completi della progressione di carriera
            </DialogDescription>
          </DialogHeader>
          
          {selectedProgression && (
            <div className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="font-semibold">Informazioni generali</div>
                  <div className="grid grid-cols-2 gap-1">
                    <div className="text-sm font-medium">ID:</div>
                    <div className="text-sm">{selectedProgression.id}</div>
                    
                    <div className="text-sm font-medium">Dipendente:</div>
                    <div className="text-sm">{selectedProgression.teacherName}</div>
                    
                    <div className="text-sm font-medium">Data progressione:</div>
                    <div className="text-sm">{new Date(selectedProgression.progressionDate).toLocaleDateString('it-IT')}</div>
                    
                    {selectedProgression.approvalDate && (
                      <>
                        <div className="text-sm font-medium">Data approvazione:</div>
                        <div className="text-sm">{new Date(selectedProgression.approvalDate).toLocaleDateString('it-IT')}</div>
                      </>
                    )}
                    
                    {selectedProgression.approvedBy && (
                      <>
                        <div className="text-sm font-medium">Approvato da:</div>
                        <div className="text-sm">{selectedProgression.approvedBy}</div>
                      </>
                    )}
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <div className="font-semibold">Fascia attuale</div>
                    <div className="text-sm">{selectedProgression.currentStep.salaryGrade} - {selectedProgression.currentStep.salary} €/anno</div>
                    <div className="text-sm">{selectedProgression.currentStep.institution}</div>
                  </div>
                  
                  <div>
                    <div className="font-semibold">Fascia precedente</div>
                    <div className="text-sm">{selectedProgression.previousStep.salaryGrade} - {selectedProgression.previousStep.salary} €/anno</div>
                  </div>
                </div>
              </div>
              
              {selectedProgression.notes && (
                <div className="space-y-2">
                  <div className="font-semibold">Note</div>
                  <div className="text-sm p-2 bg-gray-50 rounded-md">{selectedProgression.notes}</div>
                </div>
              )}
              
              <div className="pt-4 flex justify-between">
                <div>
                  {selectedProgression.approvalStatus === "pending" && (
                    <div className="flex gap-2">
                      <Button onClick={() => handleRejectProgression(selectedProgression.id)} variant="destructive">
                        <X className="mr-2 h-4 w-4" />
                        Respingi
                      </Button>
                      <Button onClick={() => handleApproveProgression(selectedProgression.id)}>
                        <FileText className="mr-2 h-4 w-4" />
                        Approva
                      </Button>
                    </div>
                  )}
                </div>
                <Button variant="outline" onClick={() => setShowDetailsDialog(false)}>
                  Chiudi
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CareerProgressionManager;
