
import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { PlusCircle, Download, Eye, Trash2 } from "lucide-react";

interface DocumentsTabProps {
  teacherId: string;
}

const DocumentsTab: React.FC<DocumentsTabProps> = ({ teacherId }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>Documenti</span>
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            Carica Documento
          </Button>
        </CardTitle>
        <CardDescription>
          Gestisci i documenti relativi al docente (contratti, certificati, ecc.)
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome Documento</TableHead>
              <TableHead>Tipo</TableHead>
              <TableHead>Data Caricamento</TableHead>
              <TableHead>Dimensione</TableHead>
              <TableHead className="text-right">Azioni</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell colSpan={5} className="text-center py-6 text-muted-foreground">
                Nessun documento presente. Clicca "Carica Documento" per aggiungere un nuovo documento.
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default DocumentsTab;
