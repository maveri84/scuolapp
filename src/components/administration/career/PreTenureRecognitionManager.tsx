
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Calculator, Calendar, Check, Clock, Download, Eye, FileText, GraduationCap, Info, Minus, Plus, Search, Settings, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { ServicePeriod, PreTenureRecognition, mockPreTenureRecognitions } from "./types";
import { useToast } from "@/hooks/use-toast";

const PreTenureRecognitionManager: React.FC = () => {
  const [recognitions, setRecognitions] = useState<PreTenureRecognition[]>(mockPreTenureRecognitions);
  const [searchTerm, setSearchTerm] = useState("");
  const [showNewRecognitionDialog, setShowNewRecognitionDialog] = useState(false);
  const [showCalculatorDialog, setShowCalculatorDialog] = useState(false);
  const [showDetailsDialog, setShowDetailsDialog] = useState(false);
  const [showParametersDialog, setShowParametersDialog] = useState(false);
  const [activeTab, setActiveTab] = useState("active");
  const [selectedRecognition, setSelectedRecognition] = useState<PreTenureRecognition | null>(null);
  
  const [parameters, setParameters] = useState({
    firstFourYearsPercentage: 100,
    remainingYearsPercentage: 66.67,
    minimumServiceDays: 180,
    allowPartialSchoolYears: true,
    countSummerHolidays: true
  });
  
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
  
  // Form per il calcolo
  const calculatorForm = useForm({
    defaultValues: {
      totalYears: 0,
      additionalMonths: 0,
      additionalDays: 0,
      category: "Docente" as "Docente" | "ATA" | "Dirigente"
    }
  });
  
  const { toast } = useToast();
  
  // Filter recognitions based on search term and active tab
  const filteredRecognitions = recognitions
    .filter(rec => 
      rec.teacherName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rec.id.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(rec => {
      if (activeTab === "active") {
        return ["draft", "submitted", "processing", "approved"].includes(rec.status);
      } else if (activeTab === "archived") {
        return rec.status === "rejected";
      }
      return true;
    });
  
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
      notes: newRecognition.notes || "",
      parameters: {
        recognitionPercentages: {
          firstFourYears: parameters.firstFourYearsPercentage,
          remainingYears: parameters.remainingYearsPercentage
        },
        minimumServiceDays: parameters.minimumServiceDays
      },
      exportFormats: {
        odt: true,
        pdf: true
      }
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
  
  const handleCalculate = calculatorForm.handleSubmit((data) => {
    // Implementazione del calcolo riconoscimento secondo parametri
    const totalDays = (data.totalYears * 365) + (data.additionalMonths * 30) + data.additionalDays;
    
    // Primi 4 anni al 100%
    const fourYearsInDays = 4 * 365;
    let recognizedDays = 0;
    
    if (totalDays <= fourYearsInDays) {
      // Se il servizio è meno di 4 anni, tutto al 100%
      recognizedDays = totalDays;
    } else {
      // Primi 4 anni al 100%
      recognizedDays = fourYearsInDays;
      
      // Resto al 66.67%
      const remainingDays = totalDays - fourYearsInDays;
      recognizedDays += remainingDays * (parameters.remainingYearsPercentage / 100);
    }
    
    const recognizedYears = Math.floor(recognizedDays / 365);
    const remainingDays = recognizedDays % 365;
    const recognizedMonths = Math.floor(remainingDays / 30);
    const finalDays = Math.floor(remainingDays % 30);
    
    toast({
      title: "Calcolo completato",
      description: `Servizio riconosciuto: ${recognizedYears} anni, ${recognizedMonths} mesi e ${finalDays} giorni`,
    });
  });
  
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
  
  const handleExportOdt = (id: string) => {
    toast({
      title: "Esportazione in ODT",
      description: `Esportazione in formato ODT del riconoscimento ${id} in corso...`,
    });
    
    // Simulazione del completamento dell'esportazione
    setTimeout(() => {
      toast({
        title: "Esportazione completata",
        description: "Il documento ODT è stato generato con successo",
      });
    }, 1500);
  };
  
  const handleSaveParameters = () => {
    // Salva i parametri e aggiorna riconoscimenti esistenti
    toast({
      title: "Parametri salvati",
      description: "Le nuove impostazioni sono state salvate con successo",
    });
    setShowParametersDialog(false);
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
          <Button variant="outline" onClick={() => setShowParametersDialog(true)}>
            <Settings className="mr-2 h-4 w-4" />
            Parametri
          </Button>
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
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-4">
          <TabsTrigger value="active">Riconoscimenti Attivi</TabsTrigger>
          <TabsTrigger value="archived">Archiviati</TabsTrigger>
          <TabsTrigger value="all">Tutti</TabsTrigger>
        </TabsList>
        
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
                          <Button variant="outline" size="icon" onClick={() => handleExportOdt(recognition.id)} title="Esporta in ODT">
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
      </Tabs>

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
              <Textarea 
                id="notes" 
                value={newRecognition.notes || ""} 
                onChange={(e) => setNewRecognition(prev => ({...prev, notes: e.target.value}))}
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
          
          <Form {...calculatorForm}>
            <form onSubmit={handleCalculate} className="space-y-4 py-4">
              <FormField
                control={calculatorForm.control}
                name="totalYears"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Anni Totali di Servizio Pre-Ruolo</FormLabel>
                    <FormControl>
                      <Input 
                        type="number"
                        min="0"
                        max="50"
                        placeholder="Inserisci il numero totale di anni"
                        {...field}
                        onChange={e => field.onChange(parseInt(e.target.value) || 0)}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              
              <FormField
                control={calculatorForm.control}
                name="additionalMonths"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mesi Aggiuntivi</FormLabel>
                    <FormControl>
                      <Input 
                        type="number"
                        min="0"
                        max="11"
                        placeholder="Inserisci eventuali mesi aggiuntivi"
                        {...field}
                        onChange={e => field.onChange(parseInt(e.target.value) || 0)}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              
              <FormField
                control={calculatorForm.control}
                name="additionalDays"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Giorni Aggiuntivi</FormLabel>
                    <FormControl>
                      <Input 
                        type="number"
                        min="0"
                        max="30"
                        placeholder="Inserisci eventuali giorni aggiuntivi"
                        {...field}
                        onChange={e => field.onChange(parseInt(e.target.value) || 0)}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              
              <FormField
                control={calculatorForm.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Categoria</FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Seleziona categoria" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Docente">Docente</SelectItem>
                        <SelectItem value="ATA">ATA</SelectItem>
                        <SelectItem value="Dirigente">Dirigente</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
              
              <Button type="submit" className="w-full">
                <Calculator className="mr-2 h-4 w-4" />
                Calcola Riconoscimento
              </Button>
            </form>
          </Form>
          
          <div className="bg-gray-50 p-4 rounded-md">
            <h4 className="font-medium text-sm">Risultati calcolo:</h4>
            <div className="mt-2 text-sm">
              <div className="grid grid-cols-2 gap-1">
                <div>Primi 4 anni:</div>
                <div className="font-semibold">{Math.min(calculatorForm.getValues().totalYears, 4)} anni</div>
                
                <div>Ulteriore servizio (2/3):</div>
                <div className="font-semibold">
                  {calculatorForm.getValues().totalYears > 4 
                    ? ((calculatorForm.getValues().totalYears - 4) * (parameters.remainingYearsPercentage / 100)).toFixed(2) + ' anni'
                    : '0 anni'
                  }
                </div>
                
                <div>Totale riconosciuto:</div>
                <div className="font-semibold text-green-600">
                  {calculatorForm.getValues().totalYears <= 4 
                    ? calculatorForm.getValues().totalYears
                    : (4 + ((calculatorForm.getValues().totalYears - 4) * (parameters.remainingYearsPercentage / 100))).toFixed(2)
                  } anni
                </div>
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowCalculatorDialog(false)}>
              Chiudi
            </Button>
            <Button variant="default" onClick={() => handleExportOdt("calculator")} title="Esporta in ODT">
              <Download className="mr-2 h-4 w-4" />
              Esporta Calcolo
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
                    
                    {selectedRecognition.parameters?.recognitionPercentages && (
                      <>
                        <div className="text-sm font-medium">Parametri di calcolo:</div>
                        <div className="text-sm">
                          Primi 4 anni: {selectedRecognition.parameters.recognitionPercentages.firstFourYears}%, 
                          Rimanenti: {selectedRecognition.parameters.recognitionPercentages.remainingYears}%
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
              
              {selectedRecognition.status === "approved" && selectedRecognition.decree && (
                <>
                  <Separator />
                  
                  <div className="space-y-2">
                    <div className="font-semibold">Decreto</div>
                    <Alert className="bg-green-50 border-green-200">
                      <Check className="h-4 w-4 text-green-600" />
                      <AlertTitle className="text-green-800">{selectedRecognition.decree.decreeName}</AlertTitle>
                      <AlertDescription className="text-green-700">
                        N. {selectedRecognition.decree.decreeNumber} del {new Date(selectedRecognition.decree.decreeDate).toLocaleDateString('it-IT')}
                      </AlertDescription>
                    </Alert>
                    <div className="flex justify-end">
                      <Button variant="outline" className="text-sm" onClick={() => handleExportOdt(selectedRecognition.id)}>
                        <Download className="mr-2 h-4 w-4" />
                        Esporta decreto in ODT
                      </Button>
                    </div>
                  </div>
                </>
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
                        <Check className="mr-2 h-4 w-4" />
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
      
      {/* Dialogo parametri */}
      <Dialog open={showParametersDialog} onOpenChange={setShowParametersDialog}>
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
                    onValueChange={(value) => setParameters(prev => ({...prev, firstFourYearsPercentage: value[0]}))}
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
                    onValueChange={(value) => setParameters(prev => ({...prev, remainingYearsPercentage: value[0]}))}
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
                    onChange={(e) => setParameters(prev => ({...prev, minimumServiceDays: parseInt(e.target.value) || 180}))}
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
                    onCheckedChange={(checked) => setParameters(prev => ({...prev, allowPartialSchoolYears: checked}))}
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
                    onCheckedChange={(checked) => setParameters(prev => ({...prev, countSummerHolidays: checked}))}
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
            <Button variant="outline" onClick={() => setShowParametersDialog(false)}>
              Annulla
            </Button>
            <Button onClick={handleSaveParameters}>
              Salva Parametri
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PreTenureRecognitionManager;
