
import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Database, 
  Server, 
  Shield, 
  RefreshCw, 
  Download, 
  Upload, 
  Check, 
  LifeBuoy, 
  FileUp, 
  Settings, 
  AlertTriangle
} from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

const DatabaseTab: React.FC = () => {
  const [isConnecting, setIsConnecting] = useState(false);
  const [isSynchronizing, setIsSynchronizing] = useState(false);
  const [isBackupDialogOpen, setIsBackupDialogOpen] = useState(false);
  const [isRestoreDialogOpen, setIsRestoreDialogOpen] = useState(false);
  const [isConfigDialogOpen, setIsConfigDialogOpen] = useState(false);
  const { toast } = useToast();

  const handleConnect = () => {
    setIsConnecting(true);
    // Simulazione della connessione al database
    setTimeout(() => {
      setIsConnecting(false);
      toast({
        title: "Connessione stabilita",
        description: "La connessione al database è stata stabilita con successo.",
      });
    }, 1500);
  };

  const handleSynchronize = () => {
    setIsSynchronizing(true);
    // Simulazione della sincronizzazione del database
    setTimeout(() => {
      setIsSynchronizing(false);
      toast({
        title: "Sincronizzazione completata",
        description: "I dati sono stati sincronizzati con successo.",
      });
    }, 2000);
  };

  const handleBackup = () => {
    setIsBackupDialogOpen(false);
    toast({
      title: "Backup avviato",
      description: "Il backup del database è stato avviato. Riceverai una notifica al termine.",
    });
    // Simulazione del backup
    setTimeout(() => {
      toast({
        title: "Backup completato",
        description: "Il backup del database è stato completato con successo.",
      });
    }, 3000);
  };

  const handleRestore = () => {
    setIsRestoreDialogOpen(false);
    toast({
      title: "Ripristino avviato",
      description: "Il ripristino del database è stato avviato. Riceverai una notifica al termine.",
    });
    // Simulazione del ripristino
    setTimeout(() => {
      toast({
        title: "Ripristino completato",
        description: "Il database è stato ripristinato con successo.",
      });
    }, 4000);
  };

  const handleSaveConfig = () => {
    setIsConfigDialogOpen(false);
    toast({
      title: "Configurazione salvata",
      description: "Le impostazioni del database sono state aggiornate.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-bold">Database principale</CardTitle>
              <Badge className="bg-green-100 text-green-800">Attivo</Badge>
            </div>
            <CardDescription>MySQL 8.0.32</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Host:</span>
                <span className="font-medium">db.schoolapp.it</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Porta:</span>
                <span className="font-medium">3306</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Database:</span>
                <span className="font-medium">scuola_db</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Tabelle:</span>
                <span className="font-medium">127</span>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end gap-2 pt-2">
            <Button variant="outline" size="sm" onClick={() => setIsConfigDialogOpen(true)}>
              <Settings className="mr-2 h-4 w-4" />
              Configura
            </Button>
            <Button size="sm" onClick={handleConnect} disabled={isConnecting}>
              {isConnecting ? (
                <>
                  <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                  Connessione...
                </>
              ) : (
                <>
                  <Database className="mr-2 h-4 w-4" />
                  Connetti
                </>
              )}
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-bold">Server di backup</CardTitle>
              <Badge className="bg-blue-100 text-blue-800">Secondario</Badge>
            </div>
            <CardDescription>PostgreSQL 14.9</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Host:</span>
                <span className="font-medium">backup.schoolapp.it</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Porta:</span>
                <span className="font-medium">5432</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Database:</span>
                <span className="font-medium">scuola_backup</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Ultimo backup:</span>
                <span className="font-medium">2 ore fa</span>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end gap-2 pt-2">
            <Button variant="outline" size="sm" onClick={() => setIsBackupDialogOpen(true)}>
              <Download className="mr-2 h-4 w-4" />
              Backup
            </Button>
            <Button variant="outline" size="sm" onClick={() => setIsRestoreDialogOpen(true)}>
              <Upload className="mr-2 h-4 w-4" />
              Ripristina
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-bold">Sincronizzazione dati</CardTitle>
              <Badge className="bg-amber-100 text-amber-800">In attesa</Badge>
            </div>
            <CardDescription>Sincronizza dati tra database</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Ultima sincronizzazione:</span>
                <span className="font-medium">Oggi, 08:30</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Stato:</span>
                <span className="font-medium">Completata</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Prossima sincronizzazione:</span>
                <span className="font-medium">Automatica (20:00)</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Record sincronizzati:</span>
                <span className="font-medium">24,586</span>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end gap-2 pt-2">
            <Button size="sm" onClick={handleSynchronize} disabled={isSynchronizing}>
              {isSynchronizing ? (
                <>
                  <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                  Sincronizzazione...
                </>
              ) : (
                <>
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Sincronizza ora
                </>
              )}
            </Button>
          </CardFooter>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Stato delle tabelle</CardTitle>
          <CardDescription>
            Monitora lo stato delle principali tabelle del database
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative overflow-x-auto rounded-md border">
            <table className="w-full text-sm text-left">
              <thead className="text-xs uppercase bg-muted">
                <tr>
                  <th scope="col" className="px-4 py-3">Tabella</th>
                  <th scope="col" className="px-4 py-3">Struttura</th>
                  <th scope="col" className="px-4 py-3">Records</th>
                  <th scope="col" className="px-4 py-3">Dimensione</th>
                  <th scope="col" className="px-4 py-3">Ultimo aggiornamento</th>
                  <th scope="col" className="px-4 py-3">Stato</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-card border-b">
                  <td className="px-4 py-3 font-medium">studenti</td>
                  <td className="px-4 py-3">OK</td>
                  <td className="px-4 py-3">2,456</td>
                  <td className="px-4 py-3">4.2 MB</td>
                  <td className="px-4 py-3">Oggi, 14:30</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center">
                      <Check className="h-4 w-4 text-green-600 mr-1" />
                      <span>Ottimale</span>
                    </div>
                  </td>
                </tr>
                <tr className="bg-card border-b">
                  <td className="px-4 py-3 font-medium">docenti</td>
                  <td className="px-4 py-3">OK</td>
                  <td className="px-4 py-3">187</td>
                  <td className="px-4 py-3">1.8 MB</td>
                  <td className="px-4 py-3">Ieri, 18:15</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center">
                      <Check className="h-4 w-4 text-green-600 mr-1" />
                      <span>Ottimale</span>
                    </div>
                  </td>
                </tr>
                <tr className="bg-card border-b">
                  <td className="px-4 py-3 font-medium">classi</td>
                  <td className="px-4 py-3">OK</td>
                  <td className="px-4 py-3">85</td>
                  <td className="px-4 py-3">0.5 MB</td>
                  <td className="px-4 py-3">Oggi, 09:10</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center">
                      <Check className="h-4 w-4 text-green-600 mr-1" />
                      <span>Ottimale</span>
                    </div>
                  </td>
                </tr>
                <tr className="bg-card border-b">
                  <td className="px-4 py-3 font-medium">presenze</td>
                  <td className="px-4 py-3">OK</td>
                  <td className="px-4 py-3">145,632</td>
                  <td className="px-4 py-3">32.7 MB</td>
                  <td className="px-4 py-3">Oggi, 15:45</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center">
                      <AlertTriangle className="h-4 w-4 text-amber-600 mr-1" />
                      <span>Da ottimizzare</span>
                    </div>
                  </td>
                </tr>
                <tr className="bg-card">
                  <td className="px-4 py-3 font-medium">valutazioni</td>
                  <td className="px-4 py-3">OK</td>
                  <td className="px-4 py-3">86,421</td>
                  <td className="px-4 py-3">18.3 MB</td>
                  <td className="px-4 py-3">Oggi, 16:20</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center">
                      <Check className="h-4 w-4 text-green-600 mr-1" />
                      <span>Ottimale</span>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Gestione accessi al database</CardTitle>
            <CardDescription>
              Configura e monitora gli accessi al database
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="rounded-md border p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Shield className="h-5 w-5 text-primary" />
                    <div>
                      <h3 className="text-sm font-medium">Protezione accessi</h3>
                      <p className="text-xs text-muted-foreground">Controllo di accesso al DB</p>
                    </div>
                  </div>
                  <Badge variant="outline" className="bg-green-50">Attivo</Badge>
                </div>
              </div>
              
              <div className="rounded-md border p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Server className="h-5 w-5 text-primary" />
                    <div>
                      <h3 className="text-sm font-medium">Limitazione IP</h3>
                      <p className="text-xs text-muted-foreground">Restrizioni per accesso geografico</p>
                    </div>
                  </div>
                  <Badge variant="outline" className="bg-green-50">Attivo</Badge>
                </div>
              </div>
              
              <div className="rounded-md border p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <LifeBuoy className="h-5 w-5 text-primary" />
                    <div>
                      <h3 className="text-sm font-medium">Supporto tecnico</h3>
                      <p className="text-xs text-muted-foreground">Assistenza 24/7 per il database</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">Contatta</Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Azioni rapide</CardTitle>
            <CardDescription>
              Operazioni comuni per la gestione del database
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <Button className="h-20 flex flex-col items-center justify-center space-y-1" variant="outline">
                <FileUp className="h-6 w-6" />
                <span className="text-xs">Importa SQL</span>
              </Button>
              <Button className="h-20 flex flex-col items-center justify-center space-y-1" variant="outline">
                <Download className="h-6 w-6" />
                <span className="text-xs">Esporta SQL</span>
              </Button>
              <Button className="h-20 flex flex-col items-center justify-center space-y-1" variant="outline">
                <RefreshCw className="h-6 w-6" />
                <span className="text-xs">Ottimizza</span>
              </Button>
              <Button className="h-20 flex flex-col items-center justify-center space-y-1" variant="outline">
                <Shield className="h-6 w-6" />
                <span className="text-xs">Verifica integrità</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Dialog per il backup */}
      <Dialog open={isBackupDialogOpen} onOpenChange={setIsBackupDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Backup del database</DialogTitle>
            <DialogDescription>
              Configura le opzioni per il backup del database
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label htmlFor="backup-name">Nome del backup</Label>
              <Input id="backup-name" defaultValue={`backup_${new Date().toISOString().split('T')[0]}`} />
            </div>
            <div className="space-y-2">
              <Label>Tipo di backup</Label>
              <Select defaultValue="complete">
                <SelectTrigger>
                  <SelectValue placeholder="Seleziona tipo di backup" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="complete">Completo</SelectItem>
                  <SelectItem value="data-only">Solo dati</SelectItem>
                  <SelectItem value="structure-only">Solo struttura</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Compressione</Label>
              <Select defaultValue="gzip">
                <SelectTrigger>
                  <SelectValue placeholder="Seleziona compressione" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">Nessuna</SelectItem>
                  <SelectItem value="gzip">GZIP</SelectItem>
                  <SelectItem value="zip">ZIP</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsBackupDialogOpen(false)}>Annulla</Button>
            <Button onClick={handleBackup}>Avvia backup</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog per il ripristino */}
      <Dialog open={isRestoreDialogOpen} onOpenChange={setIsRestoreDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Ripristino database</DialogTitle>
            <DialogDescription>
              Seleziona un backup da ripristinare
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label>Backup disponibili</Label>
              <Select defaultValue="today">
                <SelectTrigger>
                  <SelectValue placeholder="Seleziona backup" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="today">Oggi, 08:00 (4.2 GB)</SelectItem>
                  <SelectItem value="yesterday">Ieri, 20:00 (4.1 GB)</SelectItem>
                  <SelectItem value="week">Una settimana fa (3.9 GB)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Opzioni di ripristino</Label>
              <Select defaultValue="replace">
                <SelectTrigger>
                  <SelectValue placeholder="Seleziona opzione" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="replace">Sostituisci database esistente</SelectItem>
                  <SelectItem value="merge">Unisci con database esistente</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="rounded-md bg-amber-50 p-3 text-sm text-amber-800">
              <AlertTriangle className="h-4 w-4 inline-block mr-2" />
              Attenzione: il ripristino sovrascriverà i dati attuali. Procedi solo se sei sicuro.
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsRestoreDialogOpen(false)}>Annulla</Button>
            <Button variant="destructive" onClick={handleRestore}>Ripristina database</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog per la configurazione */}
      <Dialog open={isConfigDialogOpen} onOpenChange={setIsConfigDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Configurazione database</DialogTitle>
            <DialogDescription>
              Modifica i parametri di connessione al database
            </DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-4 py-2">
            <div className="space-y-2">
              <Label htmlFor="db-host">Host</Label>
              <Input id="db-host" defaultValue="db.schoolapp.it" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="db-port">Porta</Label>
              <Input id="db-port" defaultValue="3306" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="db-name">Nome database</Label>
              <Input id="db-name" defaultValue="scuola_db" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="db-user">Utente</Label>
              <Input id="db-user" defaultValue="admin_scuola" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="db-password">Password</Label>
              <Input id="db-password" type="password" defaultValue="********" />
            </div>
            <div className="space-y-2">
              <Label>Tipo database</Label>
              <Select defaultValue="mysql">
                <SelectTrigger>
                  <SelectValue placeholder="Seleziona tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="mysql">MySQL</SelectItem>
                  <SelectItem value="postgres">PostgreSQL</SelectItem>
                  <SelectItem value="mssql">SQL Server</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2 col-span-2">
              <Label>Parametri connessione aggiuntivi</Label>
              <Input defaultValue="charset=utf8mb4&timeout=60" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsConfigDialogOpen(false)}>Annulla</Button>
            <Button onClick={handleSaveConfig}>Salva configurazione</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DatabaseTab;
