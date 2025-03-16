
import React from "react";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { FileText } from "lucide-react";

const MessageTable: React.FC = () => {
  return (
    <div className="border rounded-lg overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Data</TableHead>
            <TableHead>Tipo</TableHead>
            <TableHead>Oggetto</TableHead>
            <TableHead>Destinatari</TableHead>
            <TableHead>Stato</TableHead>
            <TableHead>Azioni</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>10/03/2024</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Convocazione Genitori</TableCell>
            <TableCell>Classe 3A</TableCell>
            <TableCell>Inviata</TableCell>
            <TableCell>
              <Button variant="ghost" size="sm">
                <FileText className="h-4 w-4" />
              </Button>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>05/03/2024</TableCell>
            <TableCell>Messaggio</TableCell>
            <TableCell>Autorizzazione Gita</TableCell>
            <TableCell>Tutti i Genitori</TableCell>
            <TableCell>Ricevuto</TableCell>
            <TableCell>
              <Button variant="ghost" size="sm">
                <FileText className="h-4 w-4" />
              </Button>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>01/03/2024</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Riunione Docenti</TableCell>
            <TableCell>Tutti i Dipendenti</TableCell>
            <TableCell>Inviata</TableCell>
            <TableCell>
              <Button variant="ghost" size="sm">
                <FileText className="h-4 w-4" />
              </Button>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};

export default MessageTable;
