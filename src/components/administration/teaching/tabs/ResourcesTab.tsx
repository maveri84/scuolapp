
import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CircleCheck, Paperclip, Share2, Download } from "lucide-react";

export const ResourcesTab: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Risorse didattiche</CardTitle>
        <CardDescription>
          Gestisci le risorse e gli strumenti per la didattica
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Link a risorse esterne</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <ResourceLink title="MIUR - Risorse didattiche" />
              <ResourceLink title="Khan Academy" />
              <ResourceLink title="Biblioteca Digitale" />
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Documenti ministeriali</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <DocumentLink title="Linee guida nazionali" />
              <DocumentLink title="Indicazioni programmatiche" />
              <DocumentLink title="Circolari MIUR" />
            </CardContent>
          </Card>
        </div>
      </CardContent>
    </Card>
  );
};

interface ResourceLinkProps {
  title: string;
}

const ResourceLink: React.FC<ResourceLinkProps> = ({ title }) => {
  return (
    <div className="rounded-md border p-3 flex justify-between items-center">
      <div className="flex items-center gap-2">
        <CircleCheck className="h-4 w-4 text-green-600" />
        <span>{title}</span>
      </div>
      <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
        <Share2 className="h-4 w-4" />
      </Button>
    </div>
  );
};

const DocumentLink: React.FC<ResourceLinkProps> = ({ title }) => {
  return (
    <div className="rounded-md border p-3 flex justify-between items-center">
      <div className="flex items-center gap-2">
        <Paperclip className="h-4 w-4" />
        <span>{title}</span>
      </div>
      <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
        <Download className="h-4 w-4" />
      </Button>
    </div>
  );
};
