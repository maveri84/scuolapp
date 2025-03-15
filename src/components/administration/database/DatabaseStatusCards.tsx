
import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Database, Server, Shield, RefreshCw, Settings } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface DatabaseStatusCardsProps {
  onOpenBackupDialog: () => void;
  onOpenRestoreDialog: () => void;
  onOpenConfigDialog: () => void;
}

const DatabaseStatusCards: React.FC<DatabaseStatusCardsProps> = ({
  onOpenBackupDialog,
  onOpenRestoreDialog,
  onOpenConfigDialog
}) => {
  const [isConnecting, setIsConnecting] = useState(false);
  const [isSynchronizing, setIsSynchronizing] = useState(false);
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

  return (
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
          <Button variant="outline" size="sm" onClick={onOpenConfigDialog}>
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
          <Button variant="outline" size="sm" onClick={onOpenBackupDialog}>
            <RefreshCw className="mr-2 h-4 w-4" />
            Backup
          </Button>
          <Button variant="outline" size="sm" onClick={onOpenRestoreDialog}>
            <Server className="mr-2 h-4 w-4" />
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
  );
};

export default DatabaseStatusCards;
