
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle2, BookOpen, GraduationCap, FileText, Download } from "lucide-react";

const MimDirectives: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl">Direttive MIM 2025 sulla Valutazione</CardTitle>
            <CardDescription>
              Linee guida ministeriali aggiornate per tutti gli ordini di scuola
            </CardDescription>
          </div>
          <Badge className="bg-blue-500">Aggiornato 2025</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">
              <BookOpen className="h-4 w-4 mr-2" />
              Panoramica
            </TabsTrigger>
            <TabsTrigger value="primary">
              <GraduationCap className="h-4 w-4 mr-2" />
              Scuola Primaria
            </TabsTrigger>
            <TabsTrigger value="secondary1">
              <GraduationCap className="h-4 w-4 mr-2" />
              Scuola Sec. I Grado
            </TabsTrigger>
            <TabsTrigger value="secondary2">
              <GraduationCap className="h-4 w-4 mr-2" />
              Scuola Sec. II Grado
            </TabsTrigger>
            <TabsTrigger value="documents">
              <FileText className="h-4 w-4 mr-2" />
              Documenti
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <div className="space-y-4">
              <div className="border rounded-md p-4">
                <h3 className="text-lg font-medium mb-2">Principi Generali MIM 2025</h3>
                <p className="text-muted-foreground">
                  Le nuove direttive MIM 2025 rappresentano un'evoluzione del sistema di valutazione scolastica italiano, 
                  ponendo l'accento sulla valutazione formativa e sulla centralità delle competenze in linea con il Quadro 
                  Europeo delle Competenze Chiave per l'Apprendimento Permanente.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" />
                    <div>
                      <h4 className="font-medium">Approccio per Competenze</h4>
                      <p className="text-sm text-muted-foreground">Valutazione integrata di conoscenze, abilità e attitudini in contesti reali</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" />
                    <div>
                      <h4 className="font-medium">Valutazione Formativa</h4>
                      <p className="text-sm text-muted-foreground">Supporta il processo di apprendimento e fornisce feedback costanti</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" />
                    <div>
                      <h4 className="font-medium">Personalizzazione</h4>
                      <p className="text-sm text-muted-foreground">Attenzione ai diversi stili e ritmi di apprendimento degli studenti</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" />
                    <div>
                      <h4 className="font-medium">Documentazione e Trasparenza</h4>
                      <p className="text-sm text-muted-foreground">Processi valutativi documentati e comunicati chiaramente</p>
                    </div>
                  </div>
                </div>
              </div>

              <Accordion type="single" collapsible className="border rounded-md">
                <AccordionItem value="item-1">
                  <AccordionTrigger className="px-4">Linee Guida per l'Implementazione</AccordionTrigger>
                  <AccordionContent className="px-4 pt-2">
                    <ol className="space-y-2 list-decimal pl-5">
                      <li>Integrare la valutazione nel processo di apprendimento</li>
                      <li>Utilizzare molteplici strumenti e metodi di valutazione</li>
                      <li>Fornire feedback costruttivi e tempestivi</li>
                      <li>Coinvolgere gli studenti nel processo di valutazione</li>
                      <li>Adottare griglie di valutazione trasparenti e comprensibili</li>
                      <li>Documentare sistematicamente i progressi degli studenti</li>
                      <li>Comunicare regolarmente con le famiglie sui progressi</li>
                    </ol>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger className="px-4">Competenze Chiave Europee</AccordionTrigger>
                  <AccordionContent className="px-4 pt-2">
                    <ul className="space-y-2">
                      <li>Competenza alfabetica funzionale</li>
                      <li>Competenza multilinguistica</li>
                      <li>Competenza matematica e in scienze, tecnologie e ingegneria</li>
                      <li>Competenza digitale</li>
                      <li>Competenza personale, sociale e capacità di imparare a imparare</li>
                      <li>Competenza in materia di cittadinanza</li>
                      <li>Competenza imprenditoriale</li>
                      <li>Competenza in materia di consapevolezza ed espressione culturali</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger className="px-4">Cronologia delle Riforme</AccordionTrigger>
                  <AccordionContent className="px-4 pt-2">
                    <div className="space-y-3">
                      <div>
                        <div className="font-medium">2020 - Ordinanza 172</div>
                        <p className="text-sm text-muted-foreground">Introduzione della valutazione descrittiva nella scuola primaria</p>
                      </div>
                      <div>
                        <div className="font-medium">2022 - Aggiornamento Linee Guida</div>
                        <p className="text-sm text-muted-foreground">Revisione degli indicatori e delle competenze</p>
                      </div>
                      <div>
                        <div className="font-medium">2023 - Decreti Attuativi</div>
                        <p className="text-sm text-muted-foreground">Estensione del modello di valutazione formativa</p>
                      </div>
                      <div>
                        <div className="font-medium">2025 - Nuove Direttive MIM</div>
                        <p className="text-sm text-muted-foreground">Approccio integrato per tutti gli ordini di scuola</p>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </TabsContent>

          <TabsContent value="primary">
            <div className="space-y-4">
              <div className="border rounded-md p-4">
                <h3 className="text-lg font-medium mb-2">Valutazione nella Scuola Primaria</h3>
                <p className="text-muted-foreground mb-4">
                  In linea con l'Ordinanza 172/2020 e aggiornata con le direttive MIM 2025, la valutazione nella scuola primaria 
                  è espressa attraverso giudizi descrittivi riferiti a differenti livelli di apprendimento.
                </p>

                <h4 className="font-medium mt-4 mb-2">Livelli di Apprendimento</h4>
                <div className="space-y-3">
                  <div className="bg-green-50 border-l-4 border-green-500 p-3">
                    <div className="font-medium">Avanzato</div>
                    <p className="text-sm">L'alunno porta a termine compiti in situazioni note e non note, mobilitando una varietà di risorse sia fornite dal docente sia reperite altrove, in modo autonomo e con continuità.</p>
                  </div>
                  <div className="bg-blue-50 border-l-4 border-blue-500 p-3">
                    <div className="font-medium">Intermedio</div>
                    <p className="text-sm">L'alunno porta a termine compiti in situazioni note in modo autonomo e continuo; risolve compiti in situazioni non note utilizzando le risorse fornite dal docente o reperite altrove, anche se in modo discontinuo e non del tutto autonomo.</p>
                  </div>
                  <div className="bg-yellow-50 border-l-4 border-yellow-500 p-3">
                    <div className="font-medium">Base</div>
                    <p className="text-sm">L'alunno porta a termine compiti solo in situazioni note e utilizzando le risorse fornite dal docente, sia in modo autonomo ma discontinuo, sia in modo non autonomo, ma con continuità.</p>
                  </div>
                  <div className="bg-red-50 border-l-4 border-red-500 p-3">
                    <div className="font-medium">In via di prima acquisizione</div>
                    <p className="text-sm">L'alunno porta a termine compiti solo in situazioni note e unicamente con il supporto del docente e di risorse fornite appositamente.</p>
                  </div>
                </div>
              </div>

              <div className="border rounded-md p-4">
                <h4 className="font-medium mb-3">Novità MIM 2025 per la Scuola Primaria</h4>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Maggiore integrazione con le competenze chiave europee</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Introduzione del portfolio digitale delle competenze</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Valutazione potenziata delle competenze digitali e STEM</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Maggior coinvolgimento degli studenti nell'autovalutazione</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Strumenti di comunicazione innovativi per il dialogo scuola-famiglia</span>
                  </li>
                </ul>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="secondary1">
            <div className="space-y-4">
              <div className="border rounded-md p-4">
                <h3 className="text-lg font-medium mb-2">Valutazione nella Scuola Secondaria di I Grado</h3>
                <p className="text-muted-foreground mb-4">
                  Le direttive MIM 2025 hanno introdotto significative novità nella valutazione per la scuola secondaria di I grado, 
                  mantenendo la valutazione numerica ma arricchendola con elementi descrittivi e formativi.
                </p>

                <h4 className="font-medium mt-4 mb-2">Aspetti Fondamentali</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="border rounded-md p-3">
                    <div className="font-medium">Valutazione Numerica</div>
                    <p className="text-sm text-muted-foreground">Scala decimale (1-10) con descrittori dettagliati per ogni livello</p>
                  </div>
                  <div className="border rounded-md p-3">
                    <div className="font-medium">Competenze Trasversali</div>
                    <p className="text-sm text-muted-foreground">Valutazione esplicita di competenze sociali, civiche e metodologiche</p>
                  </div>
                  <div className="border rounded-md p-3">
                    <div className="font-medium">Prove Autentiche</div>
                    <p className="text-sm text-muted-foreground">Compiti di realtà e progetti interdisciplinari</p>
                  </div>
                  <div className="border rounded-md p-3">
                    <div className="font-medium">Osservazioni Sistematiche</div>
                    <p className="text-sm text-muted-foreground">Registrazione di comportamenti e processi di apprendimento</p>
                  </div>
                </div>
              </div>

              <div className="border rounded-md p-4">
                <h4 className="font-medium mb-3">Novità MIM 2025 per la Secondaria I Grado</h4>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Rafforzamento della dimensione formativa della valutazione</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Introduzione di rubriche di autovalutazione per gli studenti</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Valorizzazione delle soft skills e delle competenze di cittadinanza</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Certificazione digitale delle competenze aggiornata</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Portfolio digitale per documentare il percorso triennale</span>
                  </li>
                </ul>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="secondary2">
            <div className="space-y-4">
              <div className="border rounded-md p-4">
                <h3 className="text-lg font-medium mb-2">Valutazione nella Scuola Secondaria di II Grado</h3>
                <p className="text-muted-foreground mb-4">
                  Le direttive MIM 2025 ridefiniscono il sistema di valutazione nella scuola secondaria di II grado, 
                  orientandolo maggiormente verso le competenze, l'interdisciplinarità e la preparazione al mondo del lavoro e dell'università.
                </p>

                <h4 className="font-medium mt-4 mb-2">Aspetti Fondamentali</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="border rounded-md p-3">
                    <div className="font-medium">Valutazione Numerica e Formativa</div>
                    <p className="text-sm text-muted-foreground">Integrazione tra voti decimali e descrittori qualitativi</p>
                  </div>
                  <div className="border rounded-md p-3">
                    <div className="font-medium">PCTO e Competenze Professionali</div>
                    <p className="text-sm text-muted-foreground">Valutazione integrata delle esperienze di alternanza scuola-lavoro</p>
                  </div>
                  <div className="border rounded-md p-3">
                    <div className="font-medium">Didattica per Competenze</div>
                    <p className="text-sm text-muted-foreground">Focus su problem solving, creatività e pensiero critico</p>
                  </div>
                  <div className="border rounded-md p-3">
                    <div className="font-medium">Certificazioni e Crediti</div>
                    <p className="text-sm text-muted-foreground">Riconoscimento di competenze acquisite in contesti formali e informali</p>
                  </div>
                </div>
              </div>

              <div className="border rounded-md p-4">
                <h4 className="font-medium mb-3">Novità MIM 2025 per la Secondaria II Grado</h4>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Nuove rubriche di valutazione delle competenze digitali avanzate</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Potenziamento della valutazione delle competenze linguistiche secondo il QCER</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Integrazione della valutazione di educazione civica e sostenibilità</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Portfolio digitale delle competenze spendibile per l'università e il lavoro</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Valorizzazione dell'auto-imprenditorialità e delle competenze innovative</span>
                  </li>
                </ul>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="documents">
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Direttiva Ministeriale MIM 2025</CardTitle>
                    <CardDescription>Linee guida ufficiali sulla valutazione</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-2">
                    <p className="text-sm text-muted-foreground mb-4">
                      Documento completo con tutti i riferimenti normativi e indicazioni operative per l'implementazione.
                    </p>
                    <Button variant="outline" className="w-full">
                      <Download className="h-4 w-4 mr-2" />
                      Scarica PDF
                    </Button>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Ordinanza 172/2020 Aggiornata</CardTitle>
                    <CardDescription>Valutazione descrittiva scuola primaria</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-2">
                    <p className="text-sm text-muted-foreground mb-4">
                      Versione aggiornata dell'ordinanza con integrazioni MIM 2025 e nuovi descrittori di livello.
                    </p>
                    <Button variant="outline" className="w-full">
                      <Download className="h-4 w-4 mr-2" />
                      Scarica PDF
                    </Button>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Modelli di Certificazione Competenze</CardTitle>
                    <CardDescription>Format ufficiali per tutti gli ordini di scuola</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-2">
                    <p className="text-sm text-muted-foreground mb-4">
                      Modelli aggiornati per la certificazione delle competenze secondo le nuove direttive.
                    </p>
                    <Button variant="outline" className="w-full">
                      <Download className="h-4 w-4 mr-2" />
                      Scarica ZIP
                    </Button>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Esempi di Rubriche Valutative</CardTitle>
                    <CardDescription>Esempi pratici di griglie di valutazione</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-2">
                    <p className="text-sm text-muted-foreground mb-4">
                      Raccolta di rubriche valutative per diversi ambiti disciplinari e competenze trasversali.
                    </p>
                    <Button variant="outline" className="w-full">
                      <Download className="h-4 w-4 mr-2" />
                      Scarica ZIP
                    </Button>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Risorse Formative</CardTitle>
                  <CardDescription>Materiali per l'aggiornamento e la formazione dei docenti</CardDescription>
                </CardHeader>
                <CardContent className="pt-2">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center p-2 border rounded-md">
                      <span>Webinar "La Valutazione Formativa nella Pratica Didattica"</span>
                      <Button variant="ghost" size="sm">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="flex justify-between items-center p-2 border rounded-md">
                      <span>Slide "Implementare le Direttive MIM 2025"</span>
                      <Button variant="ghost" size="sm">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="flex justify-between items-center p-2 border rounded-md">
                      <span>Tutorial "Portfolio Digitale delle Competenze"</span>
                      <Button variant="ghost" size="sm">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="flex justify-between items-center p-2 border rounded-md">
                      <span>Guida "Valutazione e Inclusione"</span>
                      <Button variant="ghost" size="sm">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default MimDirectives;
