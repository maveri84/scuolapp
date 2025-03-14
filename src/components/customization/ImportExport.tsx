
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Download, Upload, FileJson, Copy, Check, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ImportExport = () => {
  const { toast } = useToast();
  
  const handleImportClick = () => {
    toast({
      title: "Importazione avviata",
      description: "Seleziona un file di configurazione da importare",
    });
  };
  
  const handleExportClick = () => {
    toast({
      title: "Esportazione completata",
      description: "File di configurazione esportato con successo",
    });
  };
  
  const handleCopyClick = () => {
    // Simulazione della copia negli appunti
    toast({
      title: "Codice copiato",
      description: "Il codice è stato copiato negli appunti",
    });
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Importa Configurazione</CardTitle>
            <CardDescription>
              Importa una configurazione precedentemente esportata
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center justify-center py-4">
              <div className="rounded-full bg-primary/10 p-3 mb-3">
                <Upload className="h-6 w-6 text-primary" />
              </div>
              <p className="text-sm text-center mb-4">
                Carica un file di configurazione JSON per importare le impostazioni di personalizzazione
              </p>
              
              <div className="flex gap-2">
                <Button variant="outline" onClick={handleImportClick}>
                  <Upload className="mr-2 h-4 w-4" />
                  Seleziona File
                </Button>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col items-start border-t pt-4">
            <div className="flex items-start">
              <AlertCircle className="h-5 w-5 text-amber-500 mr-2 shrink-0 mt-0.5" />
              <p className="text-xs text-muted-foreground">
                Attenzione: l'importazione sovrascriverà tutte le impostazioni esistenti. Si consiglia di esportare le configurazioni attuali prima di procedere.
              </p>
            </div>
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Esporta Configurazione</CardTitle>
            <CardDescription>
              Salva la configurazione attuale per uso futuro o backup
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center justify-center py-4">
              <div className="rounded-full bg-primary/10 p-3 mb-3">
                <Download className="h-6 w-6 text-primary" />
              </div>
              <p className="text-sm text-center mb-4">
                Esporta tutte le impostazioni di personalizzazione in un file JSON
              </p>
              
              <Button onClick={handleExportClick}>
                <Download className="mr-2 h-4 w-4" />
                Esporta Configurazione
              </Button>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col items-start border-t pt-4">
            <div className="flex items-start">
              <Check className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
              <p className="text-xs text-muted-foreground">
                L'esportazione includerà tutti i modelli di documento, loghi, intestazioni e impostazioni di stile.
              </p>
            </div>
          </CardFooter>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Condividi Configurazione</CardTitle>
          <CardDescription>
            Condividi le tue impostazioni con altri istituti
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-sm">
              Utilizza il codice seguente per condividere la tua configurazione con altri istituti:
            </p>
            
            <div className="relative">
              <div className="bg-muted rounded-md p-3 font-mono text-sm overflow-x-auto">
                <code>
                  {`{"id":"cfg_83729","name":"Configurazione Standard","version":"1.2","templates":5,"colorScheme":"modern","lastModified":"2024-04-15"}`}
                </code>
              </div>
              <Button 
                variant="ghost" 
                size="icon"
                className="absolute right-2 top-2"
                onClick={handleCopyClick}
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="flex gap-2 justify-end">
              <Button variant="outline">
                <FileJson className="mr-2 h-4 w-4" />
                Visualizza JSON Completo
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ImportExport;
