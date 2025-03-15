
import React, { useState } from "react";
import DashboardLayout from "@/layouts/DashboardLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AdministrationHeader from "@/components/administration/AdministrationHeader";
import AdministrationTabs from "@/components/administration/AdministrationTabs";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import {
  CalendarDays,
  FileText,
  GraduationCap,
  Users,
  Briefcase,
  MailOpen,
  Share2,
  Inbox,
  FileBox,
  Upload,
  Download,
  Clock,
  FileCheck,
  Printer,
  Database
} from "lucide-react";
import StudentsTab from "@/components/administration/StudentsTab";
import PersonnelTab from "@/components/administration/PersonnelTab";
import CalendarTab from "@/components/administration/CalendarTab";
import DocumentsTab from "@/components/administration/DocumentsTab";
import CertificateManager from "@/components/administration/CertificateManager";
import { useToast } from "@/hooks/use-toast";

const Administration = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("students");
  const [showDatabaseDialog, setShowDatabaseDialog] = useState(false);
  const [databaseUser, setDatabaseUser] = useState("");
  const [databasePassword, setDatabasePassword] = useState("");
  const [databaseHost, setDatabaseHost] = useState("localhost");
  const [databasePort, setDatabasePort] = useState("3306");
  const [databaseName, setDatabaseName] = useState("");

  const handleDatabaseConnect = () => {
    if (!databaseUser || !databasePassword || !databaseName) {
      toast({
        title: "Errore di connessione",
        description: "Inserisci tutti i campi obbligatori",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Connessione al database riuscita",
      description: `Connesso al database ${databaseName} come ${databaseUser}`,
    });
    setShowDatabaseDialog(false);
  };

  return (
    <DashboardLayout>
      <AdministrationHeader />

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="flex-wrap">
          <TabsTrigger value="students" className="flex items-center">
            <GraduationCap className="mr-2 h-4 w-4" />
            Gestione Studenti
          </TabsTrigger>
          <TabsTrigger value="personnel" className="flex items-center">
            <Users className="mr-2 h-4 w-4" />
            Gestione Personale
          </TabsTrigger>
          <TabsTrigger value="calendar" className="flex items-center">
            <CalendarDays className="mr-2 h-4 w-4" />
            Calendario Scolastico
          </TabsTrigger>
          <TabsTrigger value="documents" className="flex items-center">
            <FileText className="mr-2 h-4 w-4" />
            Documenti
          </TabsTrigger>
          <TabsTrigger value="certificates" className="flex items-center">
            <FileCheck className="mr-2 h-4 w-4" />
            Certificati
          </TabsTrigger>
          <TabsTrigger value="protocol" className="flex items-center">
            <FileBox className="mr-2 h-4 w-4" />
            Protocollo
          </TabsTrigger>
          <TabsTrigger value="database" className="flex items-center">
            <Database className="mr-2 h-4 w-4" />
            Database
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="students" className="space-y-4">
          <StudentsTab />
        </TabsContent>
        
        <TabsContent value="personnel" className="space-y-4">
          <PersonnelTab />
        </TabsContent>
        
        <TabsContent value="calendar" className="space-y-4">
          <CalendarTab />
        </TabsContent>
        
        <TabsContent value="documents" className="space-y-4">
          <DocumentsTab />
        </TabsContent>
        
        <TabsContent value="certificates" className="space-y-4">
          <CertificateManager />
        </TabsContent>
        
        <TabsContent value="protocol" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Protocollo Elettronico</CardTitle>
              <CardDescription>
                Gestione del protocollo informatico secondo la normativa italiana
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base flex items-center">
                      <MailOpen className="mr-2 h-4 w-4" />
                      Posta Elettronica
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <p className="text-sm text-muted-foreground">
                        Importazione automatica da PEO e PEC
                      </p>
                      <div className="flex flex-col space-y-2">
                        <Button variant="outline" size="sm" className="w-full justify-start">
                          <Inbox className="mr-2 h-4 w-4" />
                          PEO: 6 messaggi da importare
                        </Button>
                        <Button variant="outline" size="sm" className="w-full justify-start">
                          <Inbox className="mr-2 h-4 w-4" />
                          PEC: 3 messaggi da importare
                        </Button>
                        <Button size="sm" className="mt-2">
                          <Share2 className="mr-2 h-4 w-4" />
                          Importa Posta
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base flex items-center">
                      <Upload className="mr-2 h-4 w-4" />
                      Registrazione
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <p className="text-sm text-muted-foreground">
                        Registrazione e protocollazione in entrata/uscita
                      </p>
                      <div className="flex flex-col space-y-2">
                        <Button variant="outline" size="sm" className="w-full justify-start">
                          <FileBox className="mr-2 h-4 w-4" />
                          Protocollo in Entrata
                        </Button>
                        <Button variant="outline" size="sm" className="w-full justify-start">
                          <FileBox className="mr-2 h-4 w-4" />
                          Protocollo in Uscita
                        </Button>
                        <Button size="sm" className="mt-2">
                          <FileCheck className="mr-2 h-4 w-4" />
                          Nuovo Protocollo
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base flex items-center">
                      <Clock className="mr-2 h-4 w-4" />
                      Registro
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <p className="text-sm text-muted-foreground">
                        Consultazione registro protocollo giornaliero
                      </p>
                      <div className="flex flex-col space-y-2">
                        <Button variant="outline" size="sm" className="w-full justify-start">
                          <FileText className="mr-2 h-4 w-4" />
                          Registro Giornaliero
                        </Button>
                        <Button variant="outline" size="sm" className="w-full justify-start">
                          <Download className="mr-2 h-4 w-4" />
                          Esporta Registro
                        </Button>
                        <Button size="sm" className="mt-2">
                          <Printer className="mr-2 h-4 w-4" />
                          Stampa Registro
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Protocolli Recenti</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="border rounded-md divide-y">
                    <div className="p-3 flex items-center justify-between">
                      <div>
                        <div className="font-medium">Prot. n. 2023/0001245</div>
                        <div className="text-sm text-muted-foreground">
                          Comunicazione Ministeriale - 20/11/2023
                        </div>
                      </div>
                      <Badge variant="outline" className="border-blue-500 text-blue-500">
                        In entrata
                      </Badge>
                    </div>
                    <div className="p-3 flex items-center justify-between">
                      <div>
                        <div className="font-medium">Prot. n. 2023/0001244</div>
                        <div className="text-sm text-muted-foreground">
                          Convocazione Collegio Docenti - 19/11/2023
                        </div>
                      </div>
                      <Badge variant="outline" className="border-green-500 text-green-500">
                        In uscita
                      </Badge>
                    </div>
                    <div className="p-3 flex items-center justify-between">
                      <div>
                        <div className="font-medium">Prot. n. 2023/0001243</div>
                        <div className="text-sm text-muted-foreground">
                          Richiesta documenti - 18/11/2023
                        </div>
                      </div>
                      <Badge variant="outline" className="border-blue-500 text-blue-500">
                        In entrata
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="database" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Configurazione Database</CardTitle>
              <CardDescription>
                Configura la connessione al database SQL per la memorizzazione dei dati
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <h3 className="text-lg font-medium">Stato connessione</h3>
                    <div className="flex items-center space-x-2">
                      <span className="h-3 w-3 rounded-full bg-red-500"></span>
                      <span>Non connesso</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-lg font-medium">Azioni</h3>
                    <div className="flex flex-col space-y-2">
                      <Button onClick={() => setShowDatabaseDialog(true)}>
                        <Database className="mr-2 h-4 w-4" />
                        Configura Database
                      </Button>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6">
                  <h3 className="text-lg font-medium mb-4">Informazioni Database</h3>
                  <div className="border rounded-md p-4">
                    <p className="text-muted-foreground">
                      Nessuna connessione al database configurata. Clicca su "Configura Database" per iniziare.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      <Dialog open={showDatabaseDialog} onOpenChange={setShowDatabaseDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Configura Connessione Database</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="dbHost">Host Database</Label>
              <Input 
                id="dbHost" 
                value={databaseHost}
                onChange={(e) => setDatabaseHost(e.target.value)}
                placeholder="localhost o indirizzo IP" 
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="dbPort">Porta</Label>
              <Input 
                id="dbPort" 
                value={databasePort}
                onChange={(e) => setDatabasePort(e.target.value)}
                placeholder="3306" 
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="dbName">Nome Database</Label>
              <Input 
                id="dbName" 
                value={databaseName}
                onChange={(e) => setDatabaseName(e.target.value)}
                placeholder="scuola_db" 
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="dbUser">Utente</Label>
              <Input 
                id="dbUser" 
                value={databaseUser}
                onChange={(e) => setDatabaseUser(e.target.value)}
                placeholder="utente_db" 
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="dbPass">Password</Label>
              <Input 
                id="dbPass" 
                type="password" 
                value={databasePassword}
                onChange={(e) => setDatabasePassword(e.target.value)}
                placeholder="Password" 
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="dbType">Tipo Database</Label>
              <Select defaultValue="mysql">
                <SelectTrigger id="dbType">
                  <SelectValue placeholder="Seleziona tipo di database" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="mysql">MySQL / MariaDB</SelectItem>
                  <SelectItem value="postgres">PostgreSQL</SelectItem>
                  <SelectItem value="mssql">Microsoft SQL Server</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDatabaseDialog(false)}>Annulla</Button>
            <Button onClick={handleDatabaseConnect}>Connetti</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

export default Administration;
