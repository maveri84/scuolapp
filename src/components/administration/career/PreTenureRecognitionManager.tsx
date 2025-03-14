
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Calculator, Calendar, Clock, Download, Eye, FileText, GraduationCap, Info, Minus, Plus, Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { ServicePeriod, PreTenureRecognition, mockPreTenureRecognitions } from "./types";
import { useToast } from "@/hooks/use-toast";

const PreTenureRecognitionManager: React.FC = () => {
  const [recognitions, setRecognitions] = useState<PreTenureRecognition[]>(mockPreTenureRecognitions);
  const [searchTerm, setSearchTerm] = useState("");
  const [showNewRecognitionDialog, setShowNewRecognitionDialog] = useState(false);
  const [showCalculatorDialog, setShowCalculatorDialog] = useState(false);
  const [showDetailsDialog, setShowDetailsDialog] = useState(false);
  const [selectedRecognition, setSelectedRecognition] = useState<PreTenureRecognition | null>(null);
  
  const [newRecognition, setNewRecognition] = useState<Partial<PreTenureRecognition>>({
    teacherName: "",
    requestDate: new Date().toISOString().split('T')[0],
    servicePeriods: [],
    totalRecognizedDays: 0,
    totalRecognizedMonths: 0,
    totalRecognizedYears: 0,
    status: "draft",
    notes: ""
  });
  
  const [newServicePeriod, setNewServicePeriod] = useState<Partial<ServicePeriod>>({
    schoolYear: "",
    startDate: "",
    endDate: "",
    institution: "",
    role: "Docente",
    category: "Docente",
    contractType: "Tempo determinato",
    daysCount: 0,
    monthsCount: 0,
    yearsCount: 0,
    isValid: true
  });
  
  const { toast } = useToast();
  
  // Filter recognitions based on search term
  const filteredRecognitions = recognitions.filter(
    rec => 
      rec.teacherName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rec.id.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const handleNewRecognition = () => {
    setShowNewRecognitionDialog(true);
  };
  
  const handleCalculator = () => {
    setShowCalculatorDialog(true);
  };
  
  const handleViewDetails = (id: string) => {
    const recognition = recognitions.find(r => r.id === id);
    if (recognition) {
      setSelectedRecognition(recognition);
      setShowDetailsDialog(true);
    }
  };
  
  const handleAddServicePeriod = () => {
    if (!newServicePeriod.startDate || !newServicePeriod.endDate || !newServicePeriod.institution) {
      toast({
        title: "Dati incompleti",
        description: "Compilare tutti i campi obbligatori",
        variant: "destructive"
      });
      return;
    }
    
    // Calcola la durata del periodo
    const start = new Date(newServicePeriod.startDate!);
    const end = new Date(newServicePeriod.endDate!);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const diffMonths = Math.floor(diffDays / 30);
    const diffYears = Math.floor(diffDays / 365);
    
    const servicePeriodToAdd: ServicePeriod = {
      id: `sp${Math.random().toString(36).substring(7)}`,
      startDate: newServicePeriod.startDate!,
      endDate: newServicePeriod.endDate!,
      schoolYear: newServicePeriod.schoolYear || `${start.getFullYear()}-${end.getFullYear()}`,
      institution: newServicePeriod.institution!,
      role: newServicePeriod.role || "Docente",
      category: newServicePeriod.category || "Docente",
      contractType: newServicePeriod.contractType || "Tempo determinato",
      daysCount: diffDays,
      monthsCount: diffMonths,
      yearsCount: diffYears,
      isValid: true
    };
    
    setNewRecognition(prev => {
      const updatedPeriods = [...(prev.servicePeriods || []), servicePeriodToAdd];
      
      // Calcola i totali
      const totalDays = updatedPeriods.reduce((sum, period) => sum + period.daysCount, 0);
      const totalMonths = Math.floor(totalDays / 30);
      const totalYears = Math.floor(totalDays / 365);
      
      return {
        ...prev,
        servicePeriods: updatedPeriods,
        totalRecognizedDays: totalDays,
        totalRecognizedMonths: totalMonths,
        totalRecognizedYears: totalYears
      };
    });
    
    // Reset form
    setNewServicePeriod({
      schoolYear: "",
      startDate: "",
      endDate: "",
      institution: "",
      role: "Docente",
      category: "Docente",
      contractType: "Tempo determinato",
      daysCount: 0,
      monthsCount: 0,
      yearsCount: 0,
      isValid: true
    });
    
    toast({
      title: "Periodo aggiunto",
      description: "Periodo di servizio aggiunto con successo",
    });
  };
  
  const handleRemoveServicePeriod = (index: number) => {
    setNewRecognition(prev => {
      const updatedPeriods = [...(prev.servicePeriods || [])];
      updatedPeriods.splice(index, 1);
      
      // Ricalcola i totali
      const totalDays = updatedPeriods.reduce((sum, period) => sum + period.daysCount, 0);
      const totalMonths = Math.floor(totalDays / 30);
      const totalYears = Math.floor(totalDays / 365);
      
      return {
        ...prev,
        servicePeriods: updatedPeriods,
        totalRecognizedDays: totalDays,
        totalRecognizedMonths: totalMonths,
        totalRecognizedYears: totalYears
      };
    });
    
    toast({
      title: "Periodo rimosso",
      description: "Periodo di servizio rimosso",
    });
  };
  
  const handleSubmitNewRecognition = () => {
    if (!newRecognition.teacherName || !(newRecognition.servicePeriods && newRecognition.servicePeriods.length > 0)) {
      toast({
        title: "Dati incompleti",
        description: "Inserire il nome del dipendente e almeno un periodo di servizio",
        variant: "destructive"
      });
      return;
    }
    
    const newId = `pretenure${recognitions.length + 1}`;
    const teacherId = `t${recognitions.length + 1}`;
    
    const recognitionToAdd: PreTenureRecognition = {
      id: newId,
      teacherId,
      teacherName: newRecognition.teacherName || "",
      requestDate: newRecognition.requestDate || new Date().toISOString(),
      servicePeriods: newRecognition.servicePeriods || [],
      totalRecognizedDays: newRecognition.totalRecognizedDays || 0,
      totalRecognizedMonths: newRecognition.totalRecognizedMonths || 0,
      totalRecognizedYears: newRecognition.totalRecognizedYears || 0,
      status: "submitted",
      submissionDate: new Date().toISOString(),
      notes: newRecognition.notes || ""
    };
    
    setRecognitions(prev => [...prev, recognitionToAdd]);
    setShowNewRecognitionDialog(false);
    
    toast({
      title: "Riconoscimento creato",
      description: `Riconoscimento pre-ruolo per ${recognitionToAdd.teacherName} creato con successo`,
    });
    
    // Reset form
    setNewRecognition({
      teacherName: "",
      requestDate: new Date().toISOString().split('T')[0],
      servicePeriods: [],
      totalRecognizedDays: 0,
      totalRecognizedMonths: 0,
      totalRecognizedYears: 0,
      status: "draft",
      notes: ""
    });
  };
  
  const handleApproveRecognition = (id: string) => {
    setRecognitions(prev => 
      prev.map(rec => 
        rec.id === id 
          ? {
              ...rec, 
              status: "approved", 
              approvalDate: new Date().toISOString(),
              approvedBy: "Admin", // In un'applicazione reale, questo verrebbe dall'utente loggato
              decree: {
                decreeName: "Decreto di Riconoscimento Servizio Pre-Ruolo",
                decreeNumber: `PRE-${new Date().getFullYear()}-${Math.floor(Math.random() * 1000)}`,
                decreeDate: new Date().toISOString()
              }
            } 
          : rec
      )
    );
    
    toast({
      title: "Riconoscimento approvato",
      description: `Riconoscimento ${id} approvato con successo`,
      variant: "default"
    });
    
    setShowDetailsDialog(false);
  };
  
  const handleRejectRecognition = (id: string) => {
    setRecognitions(prev => 
      prev.map(rec => 
        rec.id === id 
          ? {
              ...rec, 
              status: "rejected", 
              approvalDate: new Date().toISOString(),
              approvedBy: "Admin" // In un'applicazione reale, questo verrebbe dall'utente loggato
            } 
          : rec
      )
    );
    
    toast({
      title: "Riconoscimento respinto",
      description: `Riconoscimento ${id} respinto`,
      variant: "destructive"
    });
    
    setShowDetailsDialog(false);
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

      {/* Dialogo per nuovo riconoscimento */}
      <Dialog open={showNewRecognitionDialog} onOpenChange={setShowNewRecognitionDialog}>
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
                onChange={(e) => setNewRecognition(prev => ({...prev, teacherName: e.target.value}))}
                placeholder="Inserisci il nome del dipendente"
              />
            </div>
            
            <div className="grid grid-cols-1 gap-2">
              <Label htmlFor="requestDate">Data Richiesta</Label>
              <Input 
                id="requestDate" 
                type="date"
                value={newRecognition.requestDate} 
                onChange={(e) => setNewRecognition(prev => ({...prev, requestDate: e.target.value}))}
              />
            </div>
            
            <Separator />
            
            <div className="space-y-4">
              <h4 className="font-medium">Aggiungi Periodi di Servizio</h4>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="startDate">Data Inizio</Label>
                  <Input 
                    id="startDate" 
                    type="date"
                    value={newServicePeriod.startDate} 
                    onChange={(e) => setNewServicePeriod(prev => ({...prev, startDate: e.target.value}))}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="endDate">Data Fine</Label>
                  <Input 
                    id="endDate" 
                    type="date"
                    value={newServicePeriod.endDate} 
                    onChange={(e) => setNewServicePeriod(prev => ({...prev, endDate: e.target.value}))}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="schoolYear">Anno Scolastico</Label>
                  <Input 
                    id="schoolYear" 
                    value={newServicePeriod.schoolYear} 
                    onChange={(e) => setNewServicePeriod(prev => ({...prev, schoolYear: e.target.value}))}
                    placeholder="Es. 2020/2021"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="institution">Istituzione</Label>
                  <Input 
                    id="institution" 
                    value={newServicePeriod.institution} 
                    onChange={(e) => setNewServicePeriod(prev => ({...prev, institution: e.target.value}))}
                    placeholder="Nome dell'istituzione scolastica"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="role">Ruolo</Label>
                  <Select 
                    onValueChange={(value) => setNewServicePeriod(prev => ({...prev, role: value}))}
                    value={newServicePeriod.role}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Seleziona ruolo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Docente">Docente</SelectItem>
                      <SelectItem value="ATA">ATA</SelectItem>
                      <SelectItem value="Dirigente">Dirigente</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="contractType">Tipo Contratto</Label>
                  <Select 
                    onValueChange={(value) => setNewServicePeriod(prev => ({...prev, contractType: value}))}
                    value={newServicePeriod.contractType}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Seleziona tipo contratto" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Tempo determinato">Tempo determinato</SelectItem>
                      <SelectItem value="Supplenza">Supplenza</SelectItem>
                      <SelectItem value="Incarico annuale">Incarico annuale</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex justify-end items-end">
                  <Button onClick={handleAddServicePeriod}>
                    <Plus className="mr-2 h-4 w-4" />
                    Aggiungi Periodo
                  </Button>
                </div>
              </div>
            </div>
            
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
                            <Button variant="ghost" size="icon" onClick={() => handleRemoveServicePeriod(index)}>
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
              <Input 
                id="notes" 
                value={newRecognition.notes} 
                onChange={(e) => setNewRecognition(prev => ({...prev, notes: e.target.value}))}
                placeholder="Inserisci eventuali note"
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowNewRecognitionDialog(false)}>
              Annulla
            </Button>
            <Button onClick={handleSubmitNewRecognition}>
              Salva Riconoscimento
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialogo calcolatore */}
      <Dialog open={showCalculatorDialog} onOpenChange={setShowCalculatorDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Calcolatore Servizio Pre-Ruolo</DialogTitle>
            <DialogDescription>
              Calcola il servizio pre-ruolo secondo la normativa vigente
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="grid grid-cols-1 gap-2">
              <Label htmlFor="totalYears">Anni Totali di Servizio Pre-Ruolo</Label>
              <Input 
                id="totalYears" 
                type="number"
                min="0"
                max="50"
                placeholder="Inserisci il numero totale di anni"
              />
            </div>
            
            <div className="grid grid-cols-1 gap-2">
              <Label htmlFor="totalMonths">Mesi Aggiuntivi</Label>
              <Input 
                id="totalMonths" 
                type="number"
                min="0"
                max="11"
                placeholder="Inserisci eventuali mesi aggiuntivi"
              />
            </div>
            
            <Button className="w-full" onClick={() => {
              toast({
                title: "Calcolo completato",
                description: "Secondo l'Art. 485 D.Lgs. n. 297/1994, il servizio pre-ruolo viene riconosciuto nei seguenti termini: primi 4 anni per intero, ulteriore servizio per 2/3.",
              });
            }}>
              <Calculator className="mr-2 h-4 w-4" />
              Calcola Riconoscimento
            </Button>
            
            <div className="bg-gray-50 p-4 rounded-md">
              <h4 className="font-medium text-sm">Risultati calcolo:</h4>
              <div className="mt-2 text-sm">
                <div className="grid grid-cols-2 gap-1">
                  <div>Primi 4 anni:</div>
                  <div className="font-semibold">4 anni</div>
                  
                  <div>Ulteriore servizio (2/3):</div>
                  <div className="font-semibold">0 anni</div>
                  
                  <div>Totale riconosciuto:</div>
                  <div className="font-semibold text-green-600">4 anni</div>
                </div>
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowCalculatorDialog(false)}>
              Chiudi
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialogo dettagli riconoscimento */}
      <Dialog open={showDetailsDialog} onOpenChange={setShowDetailsDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <GraduationCap className="h-5 w-5" />
              Dettagli Riconoscimento Pre-Ruolo
              {selectedRecognition && getStatusBadge(selectedRecognition.status)}
            </DialogTitle>
            <DialogDescription>
              Dettagli completi del riconoscimento servizio pre-ruolo
            </DialogDescription>
          </DialogHeader>
          
          {selectedRecognition && (
            <div className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="font-semibold">Informazioni generali</div>
                  <div className="grid grid-cols-2 gap-1">
                    <div className="text-sm font-medium">ID:</div>
                    <div className="text-sm">{selectedRecognition.id}</div>
                    
                    <div className="text-sm font-medium">Dipendente:</div>
                    <div className="text-sm">{selectedRecognition.teacherName}</div>
                    
                    <div className="text-sm font-medium">Data richiesta:</div>
                    <div className="text-sm">{new Date(selectedRecognition.requestDate).toLocaleDateString('it-IT')}</div>
                    
                    {selectedRecognition.submissionDate && (
                      <>
                        <div className="text-sm font-medium">Data invio:</div>
                        <div className="text-sm">{new Date(selectedRecognition.submissionDate).toLocaleDateString('it-IT')}</div>
                      </>
                    )}
                    
                    {selectedRecognition.approvalDate && (
                      <>
                        <div className="text-sm font-medium">Data approvazione:</div>
                        <div className="text-sm">{new Date(selectedRecognition.approvalDate).toLocaleDateString('it-IT')}</div>
                      </>
                    )}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="font-semibold">Riepilogo servizio riconosciuto</div>
                  <div className="grid grid-cols-2 gap-1">
                    <div className="text-sm font-medium">Anni:</div>
                    <div className="text-sm">{selectedRecognition.totalRecognizedYears}</div>
                    
                    <div className="text-sm font-medium">Mesi:</div>
                    <div className="text-sm">{selectedRecognition.totalRecognizedMonths % 12}</div>
                    
                    <div className="text-sm font-medium">Periodi:</div>
                    <div className="text-sm">{selectedRecognition.servicePeriods.length}</div>
                  </div>
                </div>
              </div>
              
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
                      {selectedRecognition.servicePeriods.map((period, index) => (
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
              
              {selectedRecognition.notes && (
                <div className="space-y-2">
                  <div className="font-semibold">Note</div>
                  <div className="text-sm p-2 bg-gray-50 rounded-md">{selectedRecognition.notes}</div>
                </div>
              )}
              
              <div className="pt-4 flex justify-between">
                <div>
                  {selectedRecognition.status === "submitted" && (
                    <div className="flex gap-2">
                      <Button onClick={() => handleRejectRecognition(selectedRecognition.id)} variant="destructive">
                        <X className="mr-2 h-4 w-4" />
                        Respingi
                      </Button>
                      <Button onClick={() => handleApproveRecognition(selectedRecognition.id)}>
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

export default PreTenureRecognitionManager;
