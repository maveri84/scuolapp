
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Send } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface MessageTableProps {
  type: "inbox" | "sent" | "drafts" | "templates";
}

const MessageTable: React.FC<MessageTableProps> = ({ type }) => {
  if (type === "inbox") {
    return (
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Tipo</TableHead>
                <TableHead>Mittente</TableHead>
                <TableHead>Oggetto</TableHead>
                <TableHead className="w-[180px]">Data</TableHead>
                <TableHead className="w-[100px]">Stato</TableHead>
                <TableHead className="w-[100px]">Azioni</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>Email</TableCell>
                <TableCell>Mario Rossi (Genitore)</TableCell>
                <TableCell>Richiesta colloquio</TableCell>
                <TableCell>10/03/2024 14:30</TableCell>
                <TableCell>Non letto</TableCell>
                <TableCell>
                  <Button variant="ghost" size="sm">
                    <FileText className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Email</TableCell>
                <TableCell>Lucia Bianchi (Insegnante)</TableCell>
                <TableCell>Riunione dipartimento</TableCell>
                <TableCell>08/03/2024 09:15</TableCell>
                <TableCell>Letto</TableCell>
                <TableCell>
                  <Button variant="ghost" size="sm">
                    <FileText className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    );
  }

  if (type === "sent") {
    return (
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Tipo</TableHead>
                <TableHead>Destinatari</TableHead>
                <TableHead>Oggetto</TableHead>
                <TableHead className="w-[180px]">Data</TableHead>
                <TableHead className="w-[100px]">Stato</TableHead>
                <TableHead className="w-[100px]">Azioni</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>Push</TableCell>
                <TableCell>Tutti gli studenti</TableCell>
                <TableCell>Chiusura straordinaria</TableCell>
                <TableCell>12/03/2024 08:00</TableCell>
                <TableCell>Inviato</TableCell>
                <TableCell>
                  <Button variant="ghost" size="sm">
                    <FileText className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Email</TableCell>
                <TableCell>Classe 2B</TableCell>
                <TableCell>Cambio orario lezioni</TableCell>
                <TableCell>10/03/2024 16:45</TableCell>
                <TableCell>Inviato</TableCell>
                <TableCell>
                  <Button variant="ghost" size="sm">
                    <FileText className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Email</TableCell>
                <TableCell>Tutti i genitori</TableCell>
                <TableCell>Riunione genitori-insegnanti</TableCell>
                <TableCell>05/03/2024 14:30</TableCell>
                <TableCell>Inviato</TableCell>
                <TableCell>
                  <Button variant="ghost" size="sm">
                    <FileText className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    );
  }

  if (type === "drafts") {
    return (
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Tipo</TableHead>
                <TableHead>Destinatari</TableHead>
                <TableHead>Oggetto</TableHead>
                <TableHead className="w-[180px]">Ultima modifica</TableHead>
                <TableHead className="w-[120px]">Azioni</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>Email</TableCell>
                <TableCell>Genitori Classe 3A</TableCell>
                <TableCell>Programmazione verifiche</TableCell>
                <TableCell>11/03/2024 11:20</TableCell>
                <TableCell className="space-x-1">
                  <Button variant="ghost" size="sm">
                    <FileText className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Send className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Tipo</TableHead>
              <TableHead>Nome modello</TableHead>
              <TableHead>Descrizione</TableHead>
              <TableHead className="w-[180px]">Creato il</TableHead>
              <TableHead className="w-[180px]">Azioni</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>Email</TableCell>
              <TableCell>Convocazione genitori</TableCell>
              <TableCell>Template per convocare i genitori a scuola</TableCell>
              <TableCell>01/03/2024</TableCell>
              <TableCell className="space-x-1">
                <Button variant="ghost" size="sm">
                  <FileText className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <Send className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <FileText className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <FileText className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Push</TableCell>
              <TableCell>Chiusura scuola</TableCell>
              <TableCell>Notifica per chiusura straordinaria</TableCell>
              <TableCell>15/02/2024</TableCell>
              <TableCell className="space-x-1">
                <Button variant="ghost" size="sm">
                  <FileText className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <Send className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <FileText className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <FileText className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default MessageTable;
