
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import CertificateManager from "@/components/administration/certificates/CertificateManager";
import { FileText, Send, FilePlus, Mail, Download, FileCheck } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const DocumentsTab: React.FC = () => {
  const { toast } = useToast();

  const handleQuickCertificate = (type: string) => {
    toast({
      title: "Certificato studenti",
      description: `Aperto assistente per la generazione del certificato di ${type}`,
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Gestione Documenti</CardTitle>
        <CardDescription>
          Archivio digitale, protocollo e documenti ufficiali
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Protocollo</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Gestione del protocollo informatico
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Archivio</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Accedi all'archivio digitale dei documenti
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Modulistica</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Gestisci e genera moduli ufficiali
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Circolari</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Crea e pubblica circolari interne
              </p>
            </CardContent>
          </Card>
        </div>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Certificati</CardTitle>
            <CardDescription>
              Gestione e personalizzazione dei certificati ufficiali
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6">
              <Card className="bg-secondary/20">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    Certificati Studenti
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <Button 
                      variant="outline" 
                      className="w-full justify-start" 
                      onClick={() => handleQuickCertificate("iscrizione")}
                    >
                      <FilePlus className="mr-2 h-4 w-4" />
                      Certificato di Iscrizione
                    </Button>
                    <Button 
                      variant="outline" 
                      className="w-full justify-start" 
                      onClick={() => handleQuickCertificate("frequenza")}
                    >
                      <FilePlus className="mr-2 h-4 w-4" />
                      Certificato di Frequenza
                    </Button>
                    <Button 
                      variant="outline" 
                      className="w-full justify-start" 
                      onClick={() => handleQuickCertificate("nulla osta")}
                    >
                      <FileCheck className="mr-2 h-4 w-4" />
                      Nulla Osta
                    </Button>
                    <Button 
                      variant="secondary" 
                      className="w-full justify-start"
                    >
                      <Mail className="mr-2 h-4 w-4" />
                      Invia a Studenti
                    </Button>
                    <Button 
                      variant="secondary" 
                      className="w-full justify-start"
                    >
                      <Download className="mr-2 h-4 w-4" />
                      Esporta Certificati
                    </Button>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-muted/30">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base flex items-center gap-2">
                    <Send className="h-4 w-4" />
                    Invio Rapido
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <p className="text-sm mb-4">Invia certificati a:</p>
                    <Button 
                      variant="outline" 
                      className="w-full justify-start"
                    >
                      <Send className="mr-2 h-4 w-4" />
                      Invio Singolo Studente
                    </Button>
                    <Button 
                      variant="outline" 
                      className="w-full justify-start"
                    >
                      <Send className="mr-2 h-4 w-4" />
                      Invio Classe Completa
                    </Button>
                    <Button 
                      variant="outline" 
                      className="w-full justify-start"
                    >
                      <Send className="mr-2 h-4 w-4" />
                      Invio a Coordinatori
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-muted/30">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base flex items-center gap-2">
                    <FileCheck className="h-4 w-4" />
                    Strumenti
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <p className="text-sm mb-4">Gestione avanzata:</p>
                    <Button 
                      variant="outline" 
                      className="w-full justify-start"
                    >
                      <FileCheck className="mr-2 h-4 w-4" />
                      Firma Digitale Multipla
                    </Button>
                    <Button 
                      variant="outline" 
                      className="w-full justify-start"
                    >
                      <Download className="mr-2 h-4 w-4" />
                      Archivio Fascicoli
                    </Button>
                    <Button 
                      variant="outline" 
                      className="w-full justify-start"
                    >
                      <Mail className="mr-2 h-4 w-4" />
                      Invia al Registro
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            <CertificateManager />
          </CardContent>
        </Card>
      </CardContent>
    </Card>
  );
};

export default DocumentsTab;
