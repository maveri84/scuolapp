
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Briefcase, FileText, UserCog, Users } from "lucide-react";
import CareerTab from "./career/CareerTab";

const PersonnelTab: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Gestione Personale</CardTitle>
        <CardDescription>
          Contratti, assenze, carriera e gestione del personale scolastico
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview" className="flex items-center">
              <Users className="mr-2 h-4 w-4" />
              Panoramica
            </TabsTrigger>
            <TabsTrigger value="career" className="flex items-center">
              <Briefcase className="mr-2 h-4 w-4" />
              Carriera
            </TabsTrigger>
            <TabsTrigger value="documents" className="flex items-center">
              <FileText className="mr-2 h-4 w-4" />
              Documenti
            </TabsTrigger>
            <TabsTrigger value="administration" className="flex items-center">
              <UserCog className="mr-2 h-4 w-4" />
              Amministrazione
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview">
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
          </TabsContent>
          
          <TabsContent value="career">
            <CareerTab />
          </TabsContent>
          
          <TabsContent value="documents">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Fascicoli Personali</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Archivio digitale dei fascicoli del personale
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Documenti Ufficiali</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Gestione dei documenti ufficiali relativi al personale
                  </p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="administration">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Impostazioni</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Configurazione delle impostazioni di gestione del personale
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Log Attività</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Registro delle attività di gestione del personale
                  </p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default PersonnelTab;
