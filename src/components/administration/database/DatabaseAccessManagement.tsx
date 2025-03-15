
import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Shield, Server, LifeBuoy, FileUp, Download, RefreshCw } from "lucide-react";

const DatabaseAccessManagement: React.FC = () => {
  return (
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
  );
};

export default DatabaseAccessManagement;
