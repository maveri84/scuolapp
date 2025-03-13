
import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Mail, MessageSquare } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface CommunicationsTabProps {
  teacherId: string;
}

const CommunicationsTab: React.FC<CommunicationsTabProps> = ({ teacherId }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Comunicazioni</CardTitle>
        <CardDescription>
          Gestisci le comunicazioni con il docente
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="email">
          <TabsList className="mb-4">
            <TabsTrigger value="email">
              <Mail className="mr-2 h-4 w-4" />
              Email
            </TabsTrigger>
            <TabsTrigger value="messages">
              <MessageSquare className="mr-2 h-4 w-4" />
              Messaggi
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="email">
            <div className="flex justify-between mb-4">
              <h3 className="text-lg font-medium">Email Inviate</h3>
              <Button>
                <Mail className="mr-2 h-4 w-4" />
                Nuova Email
              </Button>
            </div>
            
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Data</TableHead>
                  <TableHead>Oggetto</TableHead>
                  <TableHead>Stato</TableHead>
                  <TableHead className="text-right">Azioni</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-6 text-muted-foreground">
                    Nessuna email inviata a questo docente.
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TabsContent>
          
          <TabsContent value="messages">
            <div className="flex justify-between mb-4">
              <h3 className="text-lg font-medium">Messaggi Interni</h3>
              <Button>
                <MessageSquare className="mr-2 h-4 w-4" />
                Nuovo Messaggio
              </Button>
            </div>
            
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Data</TableHead>
                  <TableHead>Oggetto</TableHead>
                  <TableHead>Mittente</TableHead>
                  <TableHead className="text-right">Azioni</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-6 text-muted-foreground">
                    Nessun messaggio per questo docente.
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default CommunicationsTab;
