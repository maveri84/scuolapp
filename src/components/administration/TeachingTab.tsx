
import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { 
  BookOpen, 
  PlusCircle, 
  Search, 
  FileText, 
  Paperclip, 
  Download, 
  Share2, 
  Video, 
  Lightbulb, 
  GraduationCap,
  BookMarked,
  CircleCheck,
  Upload
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

const TeachingTab: React.FC = () => {
  const [activeTab, setActiveTab] = useState("materials");
  const { toast } = useToast();
  
  const handleUpload = () => {
    toast({
      title: "Caricamento avviato",
      description: "Il materiale didattico è in fase di caricamento"
    });
  };
  
  const handleShare = () => {
    toast({
      title: "Condivisione completata",
      description: "Il materiale è stato condiviso con successo"
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
        <div className="flex-1 w-full md:max-w-sm relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Cerca materiale didattico..." className="pl-8" />
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <PlusCircle className="mr-2 h-4 w-4" />
            Nuovo corso
          </Button>
          <Button>
            <Upload className="mr-2 h-4 w-4" />
            Carica materiale
          </Button>
        </div>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="materials" className="flex items-center">
            <FileText className="mr-2 h-4 w-4" />
            Materiali
          </TabsTrigger>
          <TabsTrigger value="courses" className="flex items-center">
            <BookMarked className="mr-2 h-4 w-4" />
            Corsi
          </TabsTrigger>
          <TabsTrigger value="resources" className="flex items-center">
            <Lightbulb className="mr-2 h-4 w-4" />
            Risorse
          </TabsTrigger>
          <TabsTrigger value="multimedia" className="flex items-center">
            <Video className="mr-2 h-4 w-4" />
            Multimedia
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="materials" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Materiali didattici</CardTitle>
              <CardDescription>
                Gestisci i materiali didattici per studenti e docenti
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-base">Matematica - Algebra</CardTitle>
                      <Badge>PDF</Badge>
                    </div>
                    <CardDescription className="text-xs">Aggiornato 2 giorni fa</CardDescription>
                  </CardHeader>
                  <CardContent className="pb-2 text-sm">
                    <p>Materiale didattico per il corso di algebra delle classi terze.</p>
                  </CardContent>
                  <CardFooter className="flex justify-end gap-2 pt-0">
                    <Button size="sm" variant="ghost">
                      <Share2 className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="ghost">
                      <Download className="h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-base">Italiano - Grammatica</CardTitle>
                      <Badge>DOCX</Badge>
                    </div>
                    <CardDescription className="text-xs">Aggiornato 1 settimana fa</CardDescription>
                  </CardHeader>
                  <CardContent className="pb-2 text-sm">
                    <p>Esercizi di grammatica italiana per le classi seconde.</p>
                  </CardContent>
                  <CardFooter className="flex justify-end gap-2 pt-0">
                    <Button size="sm" variant="ghost">
                      <Share2 className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="ghost">
                      <Download className="h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-base">Storia - Antica Roma</CardTitle>
                      <Badge>PPT</Badge>
                    </div>
                    <CardDescription className="text-xs">Aggiornato ieri</CardDescription>
                  </CardHeader>
                  <CardContent className="pb-2 text-sm">
                    <p>Presentazione sulla storia dell'antica Roma per le classi prime.</p>
                  </CardContent>
                  <CardFooter className="flex justify-end gap-2 pt-0">
                    <Button size="sm" variant="ghost">
                      <Share2 className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="ghost">
                      <Download className="h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button variant="outline">Visualizza tutti i materiali</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="courses" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Corsi didattici</CardTitle>
              <CardDescription>
                Gestisci i corsi e i programmi didattici
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="rounded-lg border p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="bg-primary/10 p-2 rounded-md">
                        <BookOpen className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-medium">Corso di preparazione esami</h3>
                        <p className="text-sm text-muted-foreground">Classi quinte - Prof. Rossi</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="bg-green-50">Attivo</Badge>
                      <Button size="sm" variant="ghost">
                        <GraduationCap className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
                
                <div className="rounded-lg border p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="bg-primary/10 p-2 rounded-md">
                        <BookOpen className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-medium">Laboratorio di informatica</h3>
                        <p className="text-sm text-muted-foreground">Classi terze - Prof. Bianchi</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="bg-green-50">Attivo</Badge>
                      <Button size="sm" variant="ghost">
                        <GraduationCap className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
                
                <div className="rounded-lg border p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="bg-primary/10 p-2 rounded-md">
                        <BookOpen className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-medium">Recupero matematica</h3>
                        <p className="text-sm text-muted-foreground">Classi prime - Prof. Verdi</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="bg-amber-50 text-amber-800">In preparazione</Badge>
                      <Button size="sm" variant="ghost">
                        <GraduationCap className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">
                <PlusCircle className="mr-2 h-4 w-4" />
                Nuovo corso
              </Button>
              <Button variant="outline">Gestisci tutti i corsi</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="resources" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Risorse didattiche</CardTitle>
              <CardDescription>
                Gestisci le risorse e gli strumenti per la didattica
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Link a risorse esterne</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="rounded-md border p-3 flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <CircleCheck className="h-4 w-4 text-green-600" />
                        <span>MIUR - Risorse didattiche</span>
                      </div>
                      <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                        <Share2 className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="rounded-md border p-3 flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <CircleCheck className="h-4 w-4 text-green-600" />
                        <span>Khan Academy</span>
                      </div>
                      <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                        <Share2 className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="rounded-md border p-3 flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <CircleCheck className="h-4 w-4 text-green-600" />
                        <span>Biblioteca Digitale</span>
                      </div>
                      <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                        <Share2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Documenti ministeriali</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="rounded-md border p-3 flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <Paperclip className="h-4 w-4" />
                        <span>Linee guida nazionali</span>
                      </div>
                      <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="rounded-md border p-3 flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <Paperclip className="h-4 w-4" />
                        <span>Indicazioni programmatiche</span>
                      </div>
                      <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="rounded-md border p-3 flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <Paperclip className="h-4 w-4" />
                        <span>Circolari MIUR</span>
                      </div>
                      <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="multimedia" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Risorse multimediali</CardTitle>
              <CardDescription>
                Gestisci video, presentazioni e contenuti interattivi
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="border rounded-lg overflow-hidden">
                  <div className="aspect-video bg-muted flex items-center justify-center">
                    <Video className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <div className="p-3">
                    <h3 className="font-medium text-sm">Tutorial laboratorio di chimica</h3>
                    <p className="text-xs text-muted-foreground mt-1">Durata: 15:30 • Prof. Neri</p>
                    <div className="flex justify-end mt-2">
                      <Button size="sm" variant="ghost" className="h-7 w-7 p-0">
                        <Share2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </div>
                
                <div className="border rounded-lg overflow-hidden">
                  <div className="aspect-video bg-muted flex items-center justify-center">
                    <Video className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <div className="p-3">
                    <h3 className="font-medium text-sm">Presentazione storia dell'arte</h3>
                    <p className="text-xs text-muted-foreground mt-1">Durata: 22:15 • Prof. Belli</p>
                    <div className="flex justify-end mt-2">
                      <Button size="sm" variant="ghost" className="h-7 w-7 p-0">
                        <Share2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </div>
                
                <div className="border rounded-lg overflow-hidden">
                  <div className="aspect-video bg-muted flex items-center justify-center">
                    <Video className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <div className="p-3">
                    <h3 className="font-medium text-sm">Guida alla biblioteca digitale</h3>
                    <p className="text-xs text-muted-foreground mt-1">Durata: 08:45 • Staff tecnico</p>
                    <div className="flex justify-end mt-2">
                      <Button size="sm" variant="ghost" className="h-7 w-7 p-0">
                        <Share2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-center">
              <Button onClick={handleUpload}>
                <Upload className="mr-2 h-4 w-4" />
                Carica nuovo contenuto
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TeachingTab;
