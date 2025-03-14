
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import CertificateManager from "@/components/administration/CertificateManager";

const DocumentsTab: React.FC = () => {
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
            <CertificateManager />
          </CardContent>
        </Card>
      </CardContent>
    </Card>
  );
};

export default DocumentsTab;
