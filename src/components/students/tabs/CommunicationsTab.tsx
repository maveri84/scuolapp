
import React, { useState } from "react";
import { Card, CardHeader, CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail, MessageCircle, FileText, Send, User, Users, Bell } from "lucide-react";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

const CommunicationsTab: React.FC = () => {
  const [isEmailDialogOpen, setIsEmailDialogOpen] = useState(false);
  const [isMessageDialogOpen, setIsMessageDialogOpen] = useState(false);
  const { toast } = useToast();

  const handleSendEmail = (e: React.FormEvent) => {
    e.preventDefault();
    setIsEmailDialogOpen(false);
    toast({
      title: "Email inviata",
      description: "L'email è stata inviata con successo",
    });
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    setIsMessageDialogOpen(false);
    toast({
      title: "Messaggio inviato",
      description: "Il messaggio è stato inviato con successo",
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Comunicazioni Dirette</CardTitle>
        <CardDescription>Gestione delle comunicazioni con la famiglia</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="flex flex-wrap gap-4">
            <Dialog open={isEmailDialogOpen} onOpenChange={setIsEmailDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="outline">
                  <Mail className="mr-2 h-4 w-4" />
                  Nuova Email
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[525px]">
                <DialogHeader>
                  <DialogTitle>Invia Email</DialogTitle>
                  <DialogDescription>
                    Invia un'email a studenti, genitori o personale scolastico
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSendEmail}>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="recipient-type" className="text-right">
                        Destinatari
                      </Label>
                      <Select defaultValue="student">
                        <SelectTrigger className="col-span-3">
                          <SelectValue placeholder="Seleziona destinatari" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="student">Studente (Singolo)</SelectItem>
                          <SelectItem value="parent">Genitore (Singolo)</SelectItem>
                          <SelectItem value="employee">Dipendente (Singolo)</SelectItem>
                          <SelectItem value="class">Classe (Gruppo)</SelectItem>
                          <SelectItem value="all-students">Tutti gli Studenti</SelectItem>
                          <SelectItem value="all-parents">Tutti i Genitori</SelectItem>
                          <SelectItem value="all-employees">Tutti i Dipendenti</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="recipient" className="text-right">
                        Cerca
                      </Label>
                      <Input
                        id="recipient"
                        placeholder="Nome del destinatario o classe"
                        className="col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="subject" className="text-right">
                        Oggetto
                      </Label>
                      <Input id="subject" className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-start gap-4">
                      <Label htmlFor="message" className="text-right pt-2">
                        Messaggio
                      </Label>
                      <Textarea id="message" className="col-span-3" rows={8} />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="submit">
                      <Send className="mr-2 h-4 w-4" />
                      Invia Email
                    </Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>

            <Dialog open={isMessageDialogOpen} onOpenChange={setIsMessageDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="outline">
                  <MessageCircle className="mr-2 h-4 w-4" />
                  Nuovo Messaggio
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[525px]">
                <DialogHeader>
                  <DialogTitle>Invia Messaggio Push</DialogTitle>
                  <DialogDescription>
                    Invia una notifica push a studenti, genitori o personale scolastico
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSendMessage}>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="recipient-type" className="text-right">
                        Destinatari
                      </Label>
                      <Select defaultValue="student">
                        <SelectTrigger className="col-span-3">
                          <SelectValue placeholder="Seleziona destinatari" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="student">Studente (Singolo)</SelectItem>
                          <SelectItem value="parent">Genitore (Singolo)</SelectItem>
                          <SelectItem value="employee">Dipendente (Singolo)</SelectItem>
                          <SelectItem value="class">Classe (Gruppo)</SelectItem>
                          <SelectItem value="all-students">Tutti gli Studenti</SelectItem>
                          <SelectItem value="all-parents">Tutti i Genitori</SelectItem>
                          <SelectItem value="all-employees">Tutti i Dipendenti</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="recipient-push" className="text-right">
                        Cerca
                      </Label>
                      <Input
                        id="recipient-push"
                        placeholder="Nome del destinatario o classe"
                        className="col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="subject-push" className="text-right">
                        Titolo
                      </Label>
                      <Input id="subject-push" className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-start gap-4">
                      <Label htmlFor="message-push" className="text-right pt-2">
                        Messaggio
                      </Label>
                      <Textarea id="message-push" className="col-span-3" rows={6} />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="priority" className="text-right">
                        Priorità
                      </Label>
                      <Select defaultValue="normal">
                        <SelectTrigger className="col-span-3">
                          <SelectValue placeholder="Seleziona priorità" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="high">Alta</SelectItem>
                          <SelectItem value="normal">Normale</SelectItem>
                          <SelectItem value="low">Bassa</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="submit">
                      <Bell className="mr-2 h-4 w-4" />
                      Invia Notifica
                    </Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </div>

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
        </div>
      </CardContent>
    </Card>
  );
};

export default CommunicationsTab;
