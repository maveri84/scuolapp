
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AlertCircle, Calendar, Check, Download, Eye, FileText, FilePlus, Search, Upload, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { LegalReconstruction, mockLegalRecons } from "./types";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";

// Define the status type to match the LegalReconstruction interface
type ReconstructionStatus = "draft" | "submitted" | "processing" | "approved" | "rejected";

const LegalReconstructionManager: React.FC = () => {
  const [legalRecons, setLegalRecons] = useState<LegalReconstruction[]>(mockLegalRecons);
  const [searchTerm, setSearchTerm] = useState("");
  const [showNewReconDialog, setShowNewReconDialog] = useState(false);
  const [showUploadDialog, setShowUploadDialog] = useState(false);
  const [showDetailsDialog, setShowDetailsDialog] = useState(false);
  const [activeTab, setActiveTab] = useState("active");
  const [selectedRecon, setSelectedRecon] = useState<LegalReconstruction | null>(null);
  const { toast } = useToast();
  
  const [newRecon, setNewRecon] = useState<Partial<LegalReconstruction>>({
    teacherName: "",
    courtName: "",
    sentenceNumber: "",
    sentenceDate: new Date().toISOString().split('T')[0],
    servicePeriods: [],
    status: "submitted" as ReconstructionStatus, // Fix by explicitly casting to the correct type
    notes: "",
    legalNotes: "",
    reconstructionType: "legal"
  });
  
  // Filter reconstructions based on search term and active tab
  const filteredRecons = legalRecons
    .filter(recon => 
      recon.teacherName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      recon.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      recon.courtName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      recon.sentenceNumber.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(recon => {
      if (activeTab === "active") {
        return recon.status !== "rejected";
      } else if (activeTab === "archived") {
        return recon.status === "rejected";
      }
      return true;
    });
  
  const handleNewLegalRecon = () => {
    setShowNewReconDialog(true);
  };
  
  const handleUploadSentence = () => {
    setShowUploadDialog(true);
  };
  
  const handleViewDetails = (id: string) => {
    const recon = legalRecons.find(r => r.id === id);
    if (recon) {
      setSelectedRecon(recon);
      setShowDetailsDialog(true);
    }
  };
  
  const handleSubmitNewRecon = () => {
    if (!newRecon.teacherName || !newRecon.courtName || !newRecon.sentenceNumber || !newRecon.sentenceDate) {
      toast({
        title: "Dati incompleti",
        description: "Compila tutti i campi obbligatori",
        variant: "destructive"
      });
      return;
    }
    
    const newId = `legal${legalRecons.length + 1}`;
    const teacherId = `t${legalRecons.length + 4}`;
    
    const reconToAdd: LegalReconstruction = {
      id: newId,
      teacherId,
      teacherName: newRecon.teacherName || "",
      requestDate: new Date().toISOString(),
      reconstructionType: "legal",
      servicePeriods: [],
      status: "submitted", // This is now properly typed
      submissionDate: new Date().toISOString(),
      courtName: newRecon.courtName || "",
      sentenceNumber: newRecon.sentenceNumber || "",
      sentenceDate: newRecon.sentenceDate || "",
      legalNotes: newRecon.legalNotes || "",
      notes: newRecon.notes || "",
      exportFormats: {
        odt: true,
        pdf: true
      }
    };
    
    setLegalRecons(prev => [...prev, reconToAdd]);
    setShowNewReconDialog(false);
    
    toast({
      title: "Ricostruzione a sentenza creata",
      description: `Ricostruzione a sentenza per ${reconToAdd.teacherName} creata con successo`,
    });
    
    // Reset form - fix status type here as well
    setNewRecon({
      teacherName: "",
      courtName: "",
      sentenceNumber: "",
      sentenceDate: new Date().toISOString().split('T')[0],
      servicePeriods: [],
      status: "submitted" as ReconstructionStatus, // Fix by explicitly casting
      notes: "",
      legalNotes: "",
      reconstructionType: "legal"
    });
  };
  
  const handleExportOdt = (id: string) => {
    toast({
      title: "Esportazione in ODT",
      description: `Esportazione in formato ODT della ricostruzione ${id} in corso...`,
    });
    
    // Simulazione del completamento dell'esportazione
    setTimeout(() => {
      toast({
        title: "Esportazione completata",
        description: "Il documento ODT è stato generato con successo",
      });
    }, 1500);
  };
  
  const handleApproveRecon = (id: string) => {
    setLegalRecons(prev => 
      prev.map(rec => 
        rec.id === id 
          ? {
              ...rec, 
              status: "approved", 
              approvalDate: new Date().toISOString(),
              approvedBy: "Admin", // In un'applicazione reale, questo verrebbe dall'utente loggato
              decree: {
                decreeName: "Decreto di Ricostruzione Carriera a Sentenza",
                decreeNumber: `RIC-LEG-${new Date().getFullYear()}-${Math.floor(Math.random() * 1000)}`,
                decreeDate: new Date().toISOString()
              }
            } 
          : rec
      )
    );
    
    toast({
      title: "Ricostruzione approvata",
      description: `Ricostruzione ${id} approvata con successo`,
      variant: "default"
    });
    
    setShowDetailsDialog(false);
  };
  
  const handleRejectRecon = (id: string) => {
    setLegalRecons(prev => 
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
      title: "Ricostruzione respinta",
      description: `Ricostruzione ${id} respinta`,
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
          <Button variant="outline" onClick={handleUploadSentence}>
            <Upload className="mr-2 h-4 w-4" />
            Carica Sentenza
          </Button>
          <Button onClick={handleNewLegalRecon}>
            <FileText className="mr-2 h-4 w-4" />
            Nuova Ricostruzione
          </Button>
        </div>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-4">
          <TabsTrigger value="active">Ricostruzioni Attive</TabsTrigger>
          <TabsTrigger value="archived">Archiviate</TabsTrigger>
          <TabsTrigger value="all">Tutte</TabsTrigger>
        </TabsList>
      
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
                          <Button 
                            variant="outline" 
                            size="icon" 
                            onClick={() => handleExportOdt(recon.id)}
                            title="Esporta in ODT"
                          >
                            <Download className="h-4 w-4" />
                            <span className="sr-only">Esporta in ODT</span>
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
      </Tabs>

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

      {/* Dialogo per nuova ricostruzione a sentenza */}
      <Dialog open={showNewReconDialog} onOpenChange={setShowNewReconDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Nuova Ricostruzione a Sentenza</DialogTitle>
            <DialogDescription>
              Inserisci i dati per la nuova ricostruzione di carriera a seguito di sentenza.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-1 gap-2">
              <Label htmlFor="teacherName">Nome Dipendente</Label>
              <Input 
                id="teacherName" 
                value={newRecon.teacherName || ""} 
                onChange={(e) => setNewRecon(prev => ({...prev, teacherName: e.target.value}))}
                placeholder="Inserisci il nome del dipendente"
              />
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="courtName">Tribunale</Label>
                <Input 
                  id="courtName" 
                  value={newRecon.courtName || ""} 
                  onChange={(e) => setNewRecon(prev => ({...prev, courtName: e.target.value}))}
                  placeholder="Nome del tribunale"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="sentenceNumber">Numero Sentenza</Label>
                <Input 
                  id="sentenceNumber" 
                  value={newRecon.sentenceNumber || ""} 
                  onChange={(e) => setNewRecon(prev => ({...prev, sentenceNumber: e.target.value}))}
                  placeholder="Es. 1234/2023"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="sentenceDate">Data Sentenza</Label>
                <Input 
                  id="sentenceDate" 
                  type="date"
                  value={newRecon.sentenceDate || ""} 
                  onChange={(e) => setNewRecon(prev => ({...prev, sentenceDate: e.target.value}))}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="status">Stato</Label>
                <Select 
                  onValueChange={(value) => setNewRecon(prev => ({...prev, status: value}))}
                  defaultValue="submitted"
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Seleziona stato" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="draft">Bozza</SelectItem>
                    <SelectItem value="submitted">Inviata</SelectItem>
                    <SelectItem value="processing">In elaborazione</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="legalNotes">Note Legali</Label>
              <Textarea 
                id="legalNotes" 
                value={newRecon.legalNotes || ""} 
                onChange={(e) => setNewRecon(prev => ({...prev, legalNotes: e.target.value}))}
                placeholder="Inserisci i dettagli relativi alla sentenza"
                rows={3}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="notes">Note Generali</Label>
              <Textarea 
                id="notes" 
                value={newRecon.notes || ""} 
                onChange={(e) => setNewRecon(prev => ({...prev, notes: e.target.value}))}
                placeholder="Inserisci eventuali note aggiuntive"
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
            <Button variant="outline" onClick={() => setShowNewReconDialog(false)}>
              Annulla
            </Button>
            <Button onClick={handleSubmitNewRecon}>
              Salva Ricostruzione
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialogo per caricamento sentenza */}
      <Dialog open={showUploadDialog} onOpenChange={setShowUploadDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Carica Sentenza</DialogTitle>
            <DialogDescription>
              Carica una sentenza del tribunale in formato PDF o immagine
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="border-2 border-dashed border-gray-200 rounded-lg p-6 text-center">
              <Upload className="mx-auto h-10 w-10 text-gray-400 mb-2" />
              <div className="text-sm mb-2">
                Trascina qui il file o <span className="text-blue-500 cursor-pointer">seleziona un file</span>
              </div>
              <div className="text-xs text-gray-500">
                Supportati: PDF, JPG, PNG (max 10MB)
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="teacherSelect">Assegna a Dipendente</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Seleziona dipendente" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="t1">Mario Rossi</SelectItem>
                  <SelectItem value="t2">Laura Bianchi</SelectItem>
                  <SelectItem value="t3">Antonio Verdi</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="uploadNotes">Note</Label>
              <Textarea 
                id="uploadNotes" 
                placeholder="Inserisci eventuali note per questa sentenza"
                rows={2}
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowUploadDialog(false)}>
              Annulla
            </Button>
            <Button onClick={() => {
              setShowUploadDialog(false);
              toast({
                title: "Sentenza caricata",
                description: "La sentenza è stata caricata con successo",
              });
            }}>
              Carica
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialogo dettagli ricostruzione */}
      <Dialog open={showDetailsDialog} onOpenChange={setShowDetailsDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Dettagli Ricostruzione a Sentenza
              {selectedRecon && getStatusBadge(selectedRecon.status)}
            </DialogTitle>
            <DialogDescription>
              Visualizzazione completa della ricostruzione di carriera a seguito di sentenza
            </DialogDescription>
          </DialogHeader>
          
          {selectedRecon && (
            <div className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="font-semibold">Informazioni generali</div>
                  <div className="grid grid-cols-2 gap-1">
                    <div className="text-sm font-medium">ID:</div>
                    <div className="text-sm">{selectedRecon.id}</div>
                    
                    <div className="text-sm font-medium">Dipendente:</div>
                    <div className="text-sm">{selectedRecon.teacherName}</div>
                    
                    <div className="text-sm font-medium">Data richiesta:</div>
                    <div className="text-sm">{new Date(selectedRecon.requestDate).toLocaleDateString('it-IT')}</div>
                    
                    {selectedRecon.submissionDate && (
                      <>
                        <div className="text-sm font-medium">Data invio:</div>
                        <div className="text-sm">{new Date(selectedRecon.submissionDate).toLocaleDateString('it-IT')}</div>
                      </>
                    )}
                    
                    {selectedRecon.approvalDate && (
                      <>
                        <div className="text-sm font-medium">Data approvazione:</div>
                        <div className="text-sm">{new Date(selectedRecon.approvalDate).toLocaleDateString('it-IT')}</div>
                      </>
                    )}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="font-semibold">Dati della sentenza</div>
                  <div className="grid grid-cols-2 gap-1">
                    <div className="text-sm font-medium">Tribunale:</div>
                    <div className="text-sm">{selectedRecon.courtName}</div>
                    
                    <div className="text-sm font-medium">N. Sentenza:</div>
                    <div className="text-sm">{selectedRecon.sentenceNumber}</div>
                    
                    <div className="text-sm font-medium">Data Sentenza:</div>
                    <div className="text-sm">{new Date(selectedRecon.sentenceDate).toLocaleDateString('it-IT')}</div>
                  </div>
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-2">
                <div className="font-semibold">Periodi di servizio riconosciuti</div>
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
                      {selectedRecon.servicePeriods.map((period, index) => (
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
              
              {(selectedRecon.legalNotes || selectedRecon.notes) && (
                <>
                  <Separator />
                  
                  <div className="space-y-3">
                    {selectedRecon.legalNotes && (
                      <div className="space-y-1">
                        <div className="font-semibold">Note legali</div>
                        <div className="text-sm p-2 bg-gray-50 rounded-md">{selectedRecon.legalNotes}</div>
                      </div>
                    )}
                    
                    {selectedRecon.notes && (
                      <div className="space-y-1">
                        <div className="font-semibold">Note generali</div>
                        <div className="text-sm p-2 bg-gray-50 rounded-md">{selectedRecon.notes}</div>
                      </div>
                    )}
                  </div>
                </>
              )}
              
              {selectedRecon.status === "approved" && selectedRecon.decree && (
                <>
                  <Separator />
                  
                  <div className="space-y-2">
                    <div className="font-semibold">Decreto</div>
                    <Alert className="bg-green-50 border-green-200">
                      <Check className="h-4 w-4 text-green-600" />
                      <AlertTitle className="text-green-800">{selectedRecon.decree.decreeName}</AlertTitle>
                      <AlertDescription className="text-green-700">
                        N. {selectedRecon.decree.decreeNumber} del {new Date(selectedRecon.decree.decreeDate).toLocaleDateString('it-IT')}
                      </AlertDescription>
                    </Alert>
                    <div className="flex justify-end">
                      <Button variant="outline" className="text-sm" onClick={() => handleExportOdt(selectedRecon.id)}>
                        <Download className="mr-2 h-4 w-4" />
                        Esporta decreto in ODT
                      </Button>
                    </div>
                  </div>
                </>
              )}
              
              <div className="pt-4 flex justify-between">
                <div>
                  {selectedRecon.status === "submitted" && (
                    <div className="flex gap-2">
                      <Button onClick={() => handleRejectRecon(selectedRecon.id)} variant="destructive">
                        <X className="mr-2 h-4 w-4" />
                        Respingi
                      </Button>
                      <Button onClick={() => handleApproveRecon(selectedRecon.id)}>
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
    </div>
  );
};

export default LegalReconstructionManager;
