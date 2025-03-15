
import React, { useState } from "react";
import DashboardLayout from "@/layouts/DashboardLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import GradesCard from "@/components/dashboard/GradesCard";
import GradesTable from "@/components/dashboard/GradesTable";
import AssessmentRubric from "@/components/dashboard/AssessmentRubric";
import MimDirectives from "@/components/dashboard/MimDirectives";
import { GraduationCap, ClipboardList, BookText, Award, FileSpreadsheet, FileText, Plus, Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Grades = () => {
  const { toast } = useToast();
  const [showNewReportDialog, setShowNewReportDialog] = useState(false);
  const [reportType, setReportType] = useState("individual");
  const [reportPeriod, setReportPeriod] = useState("q1");
  const [reportFormat, setReportFormat] = useState("pdf");
  
  const handleGenerateReport = () => {
    toast({
      title: "Report generato",
      description: `Il report è stato generato con successo in formato ${
        reportFormat.toUpperCase()
      }`,
    });
  };
  
  const handleCreateReport = () => {
    toast({
      title: "Nuovo report creato",
      description: "Il nuovo report è stato creato con successo",
    });
    setShowNewReportDialog(false);
  };

  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Valutazioni</h1>
        <p className="text-muted-foreground mt-2">
          Gestisci le valutazioni e i compiti degli studenti secondo le direttive MIM 2025
        </p>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="flex-wrap">
          <TabsTrigger value="overview">
            <GraduationCap className="mr-2 h-4 w-4" />
            Panoramica
          </TabsTrigger>
          <TabsTrigger value="entry">
            <ClipboardList className="mr-2 h-4 w-4" />
            Inserimento Voti
          </TabsTrigger>
          <TabsTrigger value="rubrics">
            <BookText className="mr-2 h-4 w-4" />
            Griglie di Valutazione
          </TabsTrigger>
          <TabsTrigger value="directives">
            <Award className="mr-2 h-4 w-4" />
            Direttive MIM 2025
          </TabsTrigger>
          <TabsTrigger value="reports">
            <FileSpreadsheet className="mr-2 h-4 w-4" />
            Report
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Valutazioni Recenti</CardTitle>
                <CardDescription>
                  Valutazioni inserite negli ultimi 30 giorni
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">24</div>
                <p className="text-xs text-muted-foreground mt-1">+12% rispetto al mese precedente</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Media Classe</CardTitle>
                <CardDescription>
                  Media valutazioni complessive
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">7.8</div>
                <p className="text-xs text-muted-foreground mt-1">+0.3 rispetto al trimestre precedente</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Valutazioni Insufficienti</CardTitle>
                <CardDescription>
                  Studenti con valutazioni sotto la soglia
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">5</div>
                <p className="text-xs text-muted-foreground mt-1">-2 rispetto al mese precedente</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <GradesCard />
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Prossime Verifiche</CardTitle>
                <CardDescription>Calendario delle verifiche programmate</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Matematica - 3A</p>
                      <p className="text-sm text-muted-foreground">Verifica sui polinomi</p>
                    </div>
                    <div className="text-sm font-medium">25 Nov</div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Italiano - 3A</p>
                      <p className="text-sm text-muted-foreground">Verifica su Dante</p>
                    </div>
                    <div className="text-sm font-medium">28 Nov</div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Storia - 3A</p>
                      <p className="text-sm text-muted-foreground">Interrogazione sul Rinascimento</p>
                    </div>
                    <div className="text-sm font-medium">2 Dic</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="entry">
          <GradesTable />
        </TabsContent>

        <TabsContent value="rubrics">
          <AssessmentRubric />
        </TabsContent>

        <TabsContent value="directives">
          <MimDirectives />
        </TabsContent>

        <TabsContent value="reports" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-xl">Report di Valutazione</CardTitle>
                <CardDescription>
                  Genera report personalizzati sulle valutazioni della classe
                </CardDescription>
              </div>
              <Button onClick={() => setShowNewReportDialog(true)}>
                <Plus className="mr-2 h-4 w-4" />
                Nuovo Report
              </Button>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Seleziona i parametri per generare il report desiderato.
              </p>
              <div className="space-y-4">
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium">Tipo di Report</label>
                  <Select defaultValue="individual" onValueChange={setReportType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleziona tipo di report" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="individual">Report individuale</SelectItem>
                      <SelectItem value="class">Report di classe</SelectItem>
                      <SelectItem value="subject">Report per materia</SelectItem>
                      <SelectItem value="time">Report temporale</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium">Periodo</label>
                    <Select defaultValue="q1" onValueChange={setReportPeriod}>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleziona periodo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="q1">Primo Quadrimestre</SelectItem>
                        <SelectItem value="q2">Secondo Quadrimestre</SelectItem>
                        <SelectItem value="year">Intero Anno Scolastico</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium">Formato</label>
                    <Select defaultValue="pdf" onValueChange={setReportFormat}>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleziona formato" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pdf">PDF</SelectItem>
                        <SelectItem value="excel">Excel</SelectItem>
                        <SelectItem value="csv">CSV</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <Button className="w-full" onClick={handleGenerateReport}>
                  <Download className="mr-2 h-4 w-4" />
                  Genera Report
                </Button>
              </div>
              
              <div className="mt-8">
                <h3 className="text-lg font-medium mb-4">Report Recenti</h3>
                <div className="border rounded-md divide-y">
                  <div className="p-3 flex items-center justify-between">
                    <div>
                      <p className="font-medium">Report Classe 3A - Matematica</p>
                      <p className="text-xs text-muted-foreground">Generato il 15/11/2023</p>
                    </div>
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      PDF
                    </Button>
                  </div>
                  <div className="p-3 flex items-center justify-between">
                    <div>
                      <p className="font-medium">Report Individuale - Marco Rossi</p>
                      <p className="text-xs text-muted-foreground">Generato il 12/11/2023</p>
                    </div>
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      PDF
                    </Button>
                  </div>
                  <div className="p-3 flex items-center justify-between">
                    <div>
                      <p className="font-medium">Report Primo Quadrimestre - 2A</p>
                      <p className="text-xs text-muted-foreground">Generato il 05/11/2023</p>
                    </div>
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      Excel
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      <Dialog open={showNewReportDialog} onOpenChange={setShowNewReportDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Crea Nuovo Report</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="reportName">Nome Report</Label>
              <Input id="reportName" placeholder="Inserisci nome report" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="reportDescription">Descrizione</Label>
              <Textarea id="reportDescription" placeholder="Inserisci descrizione report" />
            </div>
            <div className="space-y-2">
              <Label>Contenuti Report</Label>
              <div className="grid gap-2 mt-2">
                <div className="flex items-center space-x-2">
                  <Checkbox id="grades" defaultChecked />
                  <label htmlFor="grades" className="text-sm">Voti</label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="absences" defaultChecked />
                  <label htmlFor="absences" className="text-sm">Assenze</label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="comments" defaultChecked />
                  <label htmlFor="comments" className="text-sm">Commenti</label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="skills" defaultChecked />
                  <label htmlFor="skills" className="text-sm">Competenze MIM 2025</label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="charts" defaultChecked />
                  <label htmlFor="charts" className="text-sm">Grafici</label>
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <Label>Condividi Con</Label>
              <div className="grid gap-2 mt-2">
                <div className="flex items-center space-x-2">
                  <Checkbox id="teachers" defaultChecked />
                  <label htmlFor="teachers" className="text-sm">Docenti</label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="students" />
                  <label htmlFor="students" className="text-sm">Studenti</label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="parents" />
                  <label htmlFor="parents" className="text-sm">Genitori</label>
                </div>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowNewReportDialog(false)}>Annulla</Button>
            <Button onClick={handleCreateReport}>Crea Report</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

export default Grades;
