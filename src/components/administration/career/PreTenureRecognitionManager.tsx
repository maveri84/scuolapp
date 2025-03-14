
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Calculator, FileText, GraduationCap, Info, Search, Settings } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { PreTenureRecognition, ServicePeriod, mockPreTenureRecognitions } from "./types";
import { calculateServicePeriodDuration, calculateTotals, calculateRecognizedService, createServicePeriod } from "./utils/preTenureUtils";
import { PreTenureTable } from "./components/PreTenureTable";
import { ParametersDialog, ParameterSettings } from "./components/ParametersDialog";
import { CalculatorDialog } from "./components/CalculatorDialog";
import { NewRecognitionDialog } from "./components/NewRecognitionDialog";
import { DetailsDialog } from "./components/DetailsDialog";

const PreTenureRecognitionManager: React.FC = () => {
  const [recognitions, setRecognitions] = useState<PreTenureRecognition[]>(mockPreTenureRecognitions);
  const [searchTerm, setSearchTerm] = useState("");
  const [showNewRecognitionDialog, setShowNewRecognitionDialog] = useState(false);
  const [showCalculatorDialog, setShowCalculatorDialog] = useState(false);
  const [showDetailsDialog, setShowDetailsDialog] = useState(false);
  const [showParametersDialog, setShowParametersDialog] = useState(false);
  const [activeTab, setActiveTab] = useState("active");
  const [selectedRecognition, setSelectedRecognition] = useState<PreTenureRecognition | null>(null);
  
  const [parameters, setParameters] = useState<ParameterSettings>({
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
  
  const handleNewRecognitionChange = (field: string, value: string) => {
    setNewRecognition(prev => ({
      ...prev,
      [field]: value
    }));
  };
  
  const handleServicePeriodChange = (field: string, value: string) => {
    setNewServicePeriod(prev => ({
      ...prev,
      [field]: value
    }));
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
    
    const servicePeriodToAdd = createServicePeriod(
      newServicePeriod.startDate!,
      newServicePeriod.endDate!,
      newServicePeriod.schoolYear || "",
      newServicePeriod.institution!,
      newServicePeriod.role,
      newServicePeriod.category,
      newServicePeriod.contractType
    );
    
    setNewRecognition(prev => {
      const updatedPeriods = [...(prev.servicePeriods || []), servicePeriodToAdd];
      const totals = calculateTotals(updatedPeriods);
      
      return {
        ...prev,
        servicePeriods: updatedPeriods,
        ...totals
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
      
      const totals = calculateTotals(updatedPeriods);
      
      return {
        ...prev,
        servicePeriods: updatedPeriods,
        ...totals
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
  
  const handleCalculate = (data: any) => {
    const result = calculateRecognizedService(
      data.totalYears,
      data.additionalMonths,
      data.additionalDays,
      parameters.firstFourYearsPercentage,
      parameters.remainingYearsPercentage
    );
    
    toast({
      title: "Calcolo completato",
      description: `Servizio riconosciuto: ${result.recognizedYears} anni, ${result.recognizedMonths} mesi e ${result.finalDays} giorni`,
    });
  };
  
  const handleApproveRecognition = (id: string) => {
    setRecognitions(prev => 
      prev.map(rec => 
        rec.id === id 
          ? {
              ...rec, 
              status: "approved" as "approved", 
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
              status: "rejected" as "rejected", 
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
    toast({
      title: "Parametri salvati",
      description: "Le nuove impostazioni sono state salvate con successo",
    });
    setShowParametersDialog(false);
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
            <PreTenureTable
              recognitions={filteredRecognitions}
              onViewDetails={handleViewDetails}
              onExportOdt={handleExportOdt}
            />
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

      <NewRecognitionDialog
        open={showNewRecognitionDialog}
        onOpenChange={setShowNewRecognitionDialog}
        newRecognition={newRecognition}
        onNewRecognitionChange={handleNewRecognitionChange}
        newServicePeriod={newServicePeriod}
        onServicePeriodChange={handleServicePeriodChange}
        onAddServicePeriod={handleAddServicePeriod}
        onRemoveServicePeriod={handleRemoveServicePeriod}
        onSubmit={handleSubmitNewRecognition}
      />

      <CalculatorDialog
        open={showCalculatorDialog}
        onOpenChange={setShowCalculatorDialog}
        parameters={parameters}
        onCalculate={handleCalculate}
        onExport={handleExportOdt}
      />

      <DetailsDialog
        open={showDetailsDialog}
        onOpenChange={setShowDetailsDialog}
        recognition={selectedRecognition}
        onApprove={handleApproveRecognition}
        onReject={handleRejectRecognition}
        onExportOdt={handleExportOdt}
      />
      
      <ParametersDialog
        open={showParametersDialog}
        onOpenChange={setShowParametersDialog}
        parameters={parameters}
        onParametersChange={setParameters}
        onSaveParameters={handleSaveParameters}
      />
    </div>
  );
};

export default PreTenureRecognitionManager;
