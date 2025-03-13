
import React from "react";
import DashboardLayout from "@/layouts/DashboardLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import GradesCard from "@/components/dashboard/GradesCard";
import GradesTable from "@/components/dashboard/GradesTable";
import AssessmentRubric from "@/components/dashboard/AssessmentRubric";
import MimDirectives from "@/components/dashboard/MimDirectives";
import { GraduationCap, ClipboardList, BookText, Award, FileSpreadsheet } from "lucide-react";

const Grades = () => {
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
            <CardHeader>
              <CardTitle className="text-xl">Report di Valutazione</CardTitle>
              <CardDescription>
                Genera report personalizzati sulle valutazioni della classe
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Seleziona i parametri per generare il report desiderato.
              </p>
              <div className="space-y-4">
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium">Tipo di Report</label>
                  <select className="p-2 border rounded-md">
                    <option>Report individuale</option>
                    <option>Report di classe</option>
                    <option>Report per materia</option>
                    <option>Report temporale</option>
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium">Periodo</label>
                    <select className="p-2 border rounded-md">
                      <option>Primo Quadrimestre</option>
                      <option>Secondo Quadrimestre</option>
                      <option>Intero Anno Scolastico</option>
                    </select>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium">Formato</label>
                    <select className="p-2 border rounded-md">
                      <option>PDF</option>
                      <option>Excel</option>
                      <option>CSV</option>
                    </select>
                  </div>
                </div>
                <button className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90 w-full">
                  Genera Report
                </button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
};

export default Grades;
