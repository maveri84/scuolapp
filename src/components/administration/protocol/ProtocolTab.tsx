
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  FileBox,
  FileText,
  Mail,
  MailOpen,
  Send,
  Stamp,
  CheckSquare,
  FolderArchive,
  HardDrive
} from "lucide-react";

const ProtocolTab: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="flex items-center">
                <Mail className="mr-2 h-5 w-5" /> Importazione Email
              </span>
              <Badge variant="outline">24 nuove</Badge>
            </CardTitle>
            <CardDescription>Importa e protocolla email da PEO e PEC</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Button className="w-full justify-start" variant="outline">
                <MailOpen className="mr-2 h-4 w-4" /> PEO Istituzionale
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <Send className="mr-2 h-4 w-4" /> PEC Istituzionale
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="flex items-center">
                <FileBox className="mr-2 h-5 w-5" /> Protocollo
              </span>
              <Badge variant="outline">103 documenti</Badge>
            </CardTitle>
            <CardDescription>Gestione del protocollo in entrata e uscita</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Button className="w-full justify-start" variant="outline">
                <CheckSquare className="mr-2 h-4 w-4" /> Protocolla Documento
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <Stamp className="mr-2 h-4 w-4" /> Applica Timbro
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="flex items-center">
                <FolderArchive className="mr-2 h-5 w-5" /> Fascicolazione
              </span>
              <Badge variant="outline">18 fascicoli</Badge>
            </CardTitle>
            <CardDescription>Organizza i documenti in fascicoli</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Button className="w-full justify-start" variant="outline">
                <FileText className="mr-2 h-4 w-4" /> Crea Fascicolo
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <HardDrive className="mr-2 h-4 w-4" /> Archivio Fascicoli
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Registro di Protocollo</CardTitle>
          <CardDescription>Ultimi documenti protocollati</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <table className="w-full">
              <thead>
                <tr className="bg-muted/50">
                  <th className="p-2 text-left text-sm font-medium">ID</th>
                  <th className="p-2 text-left text-sm font-medium">Oggetto</th>
                  <th className="p-2 text-left text-sm font-medium">Data</th>
                  <th className="p-2 text-left text-sm font-medium">Mittente</th>
                  <th className="p-2 text-left text-sm font-medium">Tipo</th>
                  <th className="p-2 text-left text-sm font-medium">Azioni</th>
                </tr>
              </thead>
              <tbody>
                {[
                  {
                    id: "2024/0001",
                    subject: "Convocazione collegio docenti",
                    date: "15/05/2024",
                    sender: "Dirigente Scolastico",
                    type: "Uscita"
                  },
                  {
                    id: "2024/0002",
                    subject: "Richiesta materiale didattico",
                    date: "14/05/2024",
                    sender: "Prof. Bianchi",
                    type: "Entrata"
                  },
                  {
                    id: "2024/0003",
                    subject: "Comunicazione USR",
                    date: "12/05/2024",
                    sender: "USR Lombardia",
                    type: "Entrata"
                  }
                ].map((doc) => (
                  <tr key={doc.id} className="border-t">
                    <td className="p-2 text-sm">{doc.id}</td>
                    <td className="p-2 text-sm">{doc.subject}</td>
                    <td className="p-2 text-sm">{doc.date}</td>
                    <td className="p-2 text-sm">{doc.sender}</td>
                    <td className="p-2 text-sm">
                      <Badge variant={doc.type === "Entrata" ? "outline" : "secondary"}>
                        {doc.type}
                      </Badge>
                    </td>
                    <td className="p-2 text-sm">
                      <div className="flex space-x-2">
                        <Button variant="ghost" size="sm">
                          <FileText className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Stamp className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProtocolTab;
