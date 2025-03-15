
import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Share2, Download } from "lucide-react";

export const MaterialsTab: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Materiali didattici</CardTitle>
        <CardDescription>
          Gestisci i materiali didattici per studenti e docenti
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <MaterialCard 
            title="Matematica - Algebra" 
            type="PDF" 
            updatedDays={2} 
            description="Materiale didattico per il corso di algebra delle classi terze."
          />
          
          <MaterialCard 
            title="Italiano - Grammatica" 
            type="DOCX" 
            updatedDays={7} 
            description="Esercizi di grammatica italiana per le classi seconde."
          />
          
          <MaterialCard 
            title="Storia - Antica Roma" 
            type="PPT" 
            updatedDays={1} 
            description="Presentazione sulla storia dell'antica Roma per le classi prime."
          />
        </div>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button variant="outline">Visualizza tutti i materiali</Button>
      </CardFooter>
    </Card>
  );
};

interface MaterialCardProps {
  title: string;
  type: string;
  updatedDays: number;
  description: string;
}

const MaterialCard: React.FC<MaterialCardProps> = ({ title, type, updatedDays, description }) => {
  const updatedText = updatedDays === 1 ? 'ieri' : `${updatedDays} giorni fa`;
  
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-base">{title}</CardTitle>
          <Badge>{type}</Badge>
        </div>
        <CardDescription className="text-xs">Aggiornato {updatedText}</CardDescription>
      </CardHeader>
      <CardContent className="pb-2 text-sm">
        <p>{description}</p>
      </CardContent>
      <CardFooter className="flex justify-end gap-2 pt-0">
        <Button size="sm" variant="ghost">
          <Share2 className="h-4 w-4" />
        </Button>
        <Button size="sm" variant="ghost">
          <Download className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
};
