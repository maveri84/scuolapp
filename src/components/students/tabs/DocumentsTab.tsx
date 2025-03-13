
import React from "react";
import { Card, CardHeader, CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText } from "lucide-react";

const DocumentsTab: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Documenti</CardTitle>
        <CardDescription>Documenti ufficiali e certificati</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="flex justify-end mb-4">
            <Button>
              <FileText className="mr-2 h-4 w-4" />
              Carica Nuovo Documento
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="border border-muted">
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Pagella 2023-2024</CardTitle>
                <CardDescription>Caricato il 15/06/2024</CardDescription>
              </CardHeader>
              <CardContent className="pt-2">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-muted-foreground">PDF, 1.2 MB</span>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">Visualizza</Button>
                    <Button variant="outline" size="sm">Scarica</Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border border-muted">
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Certificato di Iscrizione</CardTitle>
                <CardDescription>Caricato il 10/09/2023</CardDescription>
              </CardHeader>
              <CardContent className="pt-2">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-muted-foreground">PDF, 0.8 MB</span>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">Visualizza</Button>
                    <Button variant="outline" size="sm">Scarica</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DocumentsTab;
