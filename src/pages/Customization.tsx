
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import DocumentTemplates from "@/components/customization/DocumentTemplates";
import SchoolBranding from "@/components/customization/SchoolBranding";
import ImportExport from "@/components/customization/ImportExport";

const Customization = () => {
  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Personalizzazione</h1>
      </div>
      
      <Tabs defaultValue="templates" className="space-y-4">
        <TabsList className="bg-background border">
          <TabsTrigger value="templates">Modelli di Documenti</TabsTrigger>
          <TabsTrigger value="branding">Identità Istituto</TabsTrigger>
          <TabsTrigger value="import-export">Importa/Esporta</TabsTrigger>
        </TabsList>
        
        <TabsContent value="templates" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Modelli di Documenti</CardTitle>
              <CardDescription>
                Personalizza i modelli di documenti utilizzati per certificati, comunicazioni e altri documenti ufficiali
              </CardDescription>
            </CardHeader>
            <CardContent>
              <DocumentTemplates />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="branding" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Identità Istituto</CardTitle>
              <CardDescription>
                Personalizza l'intestazione, il logo e altri elementi visivi dell'istituto
              </CardDescription>
            </CardHeader>
            <CardContent>
              <SchoolBranding />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="import-export" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Importa/Esporta Configurazioni</CardTitle>
              <CardDescription>
                Importa o esporta le configurazioni di personalizzazione per il tuo istituto
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ImportExport />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Customization;
