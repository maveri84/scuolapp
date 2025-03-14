
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const PersonnelTab: React.FC = () => {
  return (
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
  );
};

export default PersonnelTab;
