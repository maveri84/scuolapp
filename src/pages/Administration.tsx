
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarDays, FileText, GraduationCap, Users } from "lucide-react";
import CertificateManager from "@/components/administration/CertificateManager";

const Administration: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Segreteria Scolastica</h1>
        <p className="text-muted-foreground">
          Gestione amministrativa dell'istituto scolastico
        </p>
      </div>

      <Tabs defaultValue="students" className="space-y-4">
        <TabsList>
          <TabsTrigger value="students" className="flex items-center">
            <GraduationCap className="mr-2 h-4 w-4" />
            Studenti
          </TabsTrigger>
          <TabsTrigger value="personnel" className="flex items-center">
            <Users className="mr-2 h-4 w-4" />
            Personale
          </TabsTrigger>
          <TabsTrigger value="calendar" className="flex items-center">
            <CalendarDays className="mr-2 h-4 w-4" />
            Calendario Scolastico
          </TabsTrigger>
          <TabsTrigger value="documents" className="flex items-center">
            <FileText className="mr-2 h-4 w-4" />
            Documenti
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="students" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Gestione Studenti</CardTitle>
              <CardDescription>
                Iscrizioni, trasferimenti e gestione dei dati anagrafici degli studenti
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Iscrizioni</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Gestisci le nuove iscrizioni e i trasferimenti in entrata
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Trasferimenti</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Gestisci i trasferimenti in uscita e le pratiche correlate
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Certificati</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Rilascio di certificati e documenti ufficiali per gli studenti
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Fascicoli</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Accedi e gestisci i fascicoli degli studenti
                    </p>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="personnel" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Gestione Personale</CardTitle>
              <CardDescription>
                Contratti, assenze e gestione del personale scolastico
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Contratti</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Gestione dei contratti per docenti e personale ATA
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Assenze</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Monitoraggio e approvazione delle richieste di assenza
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Graduatorie</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Gestione delle graduatorie interne d'istituto
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Certificati</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Rilascio di certificati e attestati per il personale
                    </p>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="calendar" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Calendario Scolastico</CardTitle>
              <CardDescription>
                Gestione dell'anno scolastico, festività e chiusure programmate
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Anno Scolastico</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Configura le date di inizio e fine dell'anno scolastico
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Festività</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Gestisci festività nazionali e locali
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Chiusure</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Pianifica chiusure straordinarie dell'istituto
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Eventi</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Gestisci eventi e attività scolastiche
                    </p>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="documents" className="space-y-4">
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
                  <CertificateManager />
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Administration;
