import React, { useState } from "react";
import DashboardLayout from "@/layouts/DashboardLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Mail, 
  MessageCircle, 
  Bell, 
  Search, 
  User, 
  Users, 
  Send,
  Filter,
  Inbox,
  FileText,
  CheckSquare,
  ArrowUpDown,
  Image,
  Database,
  Save,
  Eye,
  Plus,
  Text,
  LayoutTemplate,
  FilePlus,
  Copy,
  Trash,
  Settings,
  Upload,
  Calendar,
  Clock,
  MapPin,
  Phone,
  AtSign,
  Book,
  Building,
  Home,
  UserCircle,
  CreditCard
} from "lucide-react";
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
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from "@/components/ui/resizable";
import { 
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage 
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const Messages = () => {
  const [activeTab, setActiveTab] = useState("inbox");
  const [isEmailDialogOpen, setIsEmailDialogOpen] = useState(false);
  const [isPushDialogOpen, setIsPushDialogOpen] = useState(false);
  const [isTemplateDialogOpen, setIsTemplateDialogOpen] = useState(false);
  const [templatePreview, setTemplatePreview] = useState(false);
  const { toast } = useToast();

  const form = useForm({
    defaultValues: {
      templateName: "",
      templateType: "email",
      description: "",
      subject: "",
      content: "",
    },
  });

  const databaseFields = [
    {
      category: "Informazioni Studente",
      fields: [
        { name: "nome_studente", label: "Nome Studente", icon: <User className="h-3 w-3" /> },
        { name: "cognome_studente", label: "Cognome Studente", icon: <User className="h-3 w-3" /> },
        { name: "codice_fiscale", label: "Codice Fiscale", icon: <CreditCard className="h-3 w-3" /> },
        { name: "data_nascita", label: "Data di Nascita", icon: <Calendar className="h-3 w-3" /> },
        { name: "indirizzo", label: "Indirizzo", icon: <Home className="h-3 w-3" /> },
        { name: "email_studente", label: "Email Studente", icon: <AtSign className="h-3 w-3" /> },
        { name: "telefono_studente", label: "Telefono Studente", icon: <Phone className="h-3 w-3" /> }
      ]
    },
    {
      category: "Informazioni Genitori",
      fields: [
        { name: "nome_genitore", label: "Nome Genitore", icon: <UserCircle className="h-3 w-3" /> },
        { name: "cognome_genitore", label: "Cognome Genitore", icon: <UserCircle className="h-3 w-3" /> },
        { name: "email_genitore", label: "Email Genitore", icon: <AtSign className="h-3 w-3" /> },
        { name: "telefono_genitore", label: "Telefono Genitore", icon: <Phone className="h-3 w-3" /> }
      ]
    },
    {
      category: "Informazioni Scuola",
      fields: [
        { name: "nome_scuola", label: "Nome Scuola", icon: <Building className="h-3 w-3" /> },
        { name: "classe", label: "Classe", icon: <Users className="h-3 w-3" /> },
        { name: "sezione", label: "Sezione", icon: <Book className="h-3 w-3" /> },
        { name: "anno_scolastico", label: "Anno Scolastico", icon: <Calendar className="h-3 w-3" /> },
        { name: "indirizzo_scuola", label: "Indirizzo Scuola", icon: <MapPin className="h-3 w-3" /> },
        { name: "nome_insegnante", label: "Nome Insegnante", icon: <UserCircle className="h-3 w-3" /> }
      ]
    },
    {
      category: "Date ed Eventi",
      fields: [
        { name: "data_evento", label: "Data Evento", icon: <Calendar className="h-3 w-3" /> },
        { name: "ora_evento", label: "Ora Evento", icon: <Clock className="h-3 w-3" /> },
        { name: "luogo_evento", label: "Luogo Evento", icon: <MapPin className="h-3 w-3" /> },
        { name: "tipo_evento", label: "Tipo Evento", icon: <FileText className="h-3 w-3" /> }
      ]
    }
  ];

  const insertFieldIntoTemplate = (fieldName) => {
    console.log(`Inserting field: {{${fieldName}}}`);
    toast({
      title: "Campo inserito",
      description: `Il campo {{${fieldName}}} è stato inserito nel modello`,
    });
  };

  const handleSendEmail = (e: React.FormEvent) => {
    e.preventDefault();
    setIsEmailDialogOpen(false);
    toast({
      title: "Email inviata",
      description: "L'email è stata inviata con successo",
    });
  };

  const handleSendPush = (e: React.FormEvent) => {
    e.preventDefault();
    setIsPushDialogOpen(false);
    toast({
      title: "Notifica inviata",
      description: "La notifica push è stata inviata con successo",
    });
  };

  const handleCreateTemplate = (e: React.FormEvent) => {
    e.preventDefault();
    setIsTemplateDialogOpen(false);
    toast({
      title: "Modello creato",
      description: "Il modello di comunicazione è stato creato con successo",
    });
  };

  return (
    <DashboardLayout>
      <div className="flex flex-col space-y-6">
        <div className="flex flex-col space-y-2">
          <h2 className="text-2xl font-bold tracking-tight">Comunicazioni</h2>
          <p className="text-muted-foreground">
            Gestisci tutte le comunicazioni con studenti, genitori e personale scolastico
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <div className="w-full md:w-auto md:flex-1">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Cerca comunicazioni..."
                className="pl-8"
              />
            </div>
          </div>
          <div className="flex flex-row gap-2">
            <Dialog open={isEmailDialogOpen} onOpenChange={setIsEmailDialogOpen}>
              <DialogTrigger asChild>
                <Button>
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

            <Dialog open={isPushDialogOpen} onOpenChange={setIsPushDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="outline">
                  <Bell className="mr-2 h-4 w-4" />
                  Notifica Push
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[525px]">
                <DialogHeader>
                  <DialogTitle>Invia Notifica Push</DialogTitle>
                  <DialogDescription>
                    Invia una notifica push a studenti, genitori o personale scolastico
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSendPush}>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="recipient-type-push" className="text-right">
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
                      <Label htmlFor="title-push" className="text-right">
                        Titolo
                      </Label>
                      <Input id="title-push" className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-start gap-4">
                      <Label htmlFor="message-push" className="text-right pt-2">
                        Messaggio
                      </Label>
                      <Textarea id="message-push" className="col-span-3" rows={5} />
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
                      <Send className="mr-2 h-4 w-4" />
                      Invia Notifica
                    </Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="inbox">
              <Inbox className="mr-2 h-4 w-4" />
              Ricevute
            </TabsTrigger>
            <TabsTrigger value="sent">
              <Send className="mr-2 h-4 w-4" />
              Inviate
            </TabsTrigger>
            <TabsTrigger value="drafts">
              <FileText className="mr-2 h-4 w-4" />
              Bozze
            </TabsTrigger>
            <TabsTrigger value="templates">
              <CheckSquare className="mr-2 h-4 w-4" />
              Modelli
            </TabsTrigger>
          </TabsList>

          <TabsContent value="inbox" className="space-y-4">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 mr-2" />
                  Filtri
                </Button>
                <Select defaultValue="all">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Tipo di messaggio" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tutti i messaggi</SelectItem>
                    <SelectItem value="email">Email</SelectItem>
                    <SelectItem value="push">Notifiche Push</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button variant="outline" size="sm">
                <ArrowUpDown className="h-4 w-4 mr-2" />
                Ordina
              </Button>
            </div>

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
          </TabsContent>

          <TabsContent value="sent" className="space-y-4">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 mr-2" />
                  Filtri
                </Button>
                <Select defaultValue="all">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Tipo di messaggio" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tutti i messaggi</SelectItem>
                    <SelectItem value="email">Email</SelectItem>
                    <SelectItem value="push">Notifiche Push</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button variant="outline" size="sm">
                <ArrowUpDown className="h-4 w-4 mr-2" />
                Ordina
              </Button>
            </div>

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
          </TabsContent>

          <TabsContent value="drafts" className="space-y-4">
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
          </TabsContent>

          <TabsContent value="templates" className="space-y-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">Modelli di comunicazione</h3>
              
              <Dialog open={isTemplateDialogOpen} onOpenChange={setIsTemplateDialogOpen}>
                <DialogTrigger asChild>
                  <Button>
                    <FilePlus className="mr-2 h-4 w-4" />
                    Nuovo Modello
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[900px] h-[80vh]">
                  <DialogHeader>
                    <DialogTitle>Crea Nuovo Modello di Comunicazione</DialogTitle>
                    <DialogDescription>
                      Crea un modello personalizzato per le tue comunicazioni con studenti, genitori e personale
                    </DialogDescription>
                  </DialogHeader>
                  
                  <div className="flex flex-col h-full overflow-hidden">
                    <ResizablePanelGroup direction="horizontal" className="min-h-[500px] rounded-lg border">
                      <ResizablePanel defaultSize={25} minSize={20}>
                        <div className="flex h-full flex-col">
                          <div className="flex items-center justify-between border-b p-4">
                            <h3 className="text-sm font-medium">Strumenti</h3>
                          </div>
                          <ScrollArea className="flex-1">
                            <div className="p-4 space-y-4">
                              <div className="space-y-1">
                                <Label htmlFor="templateName">Nome Modello</Label>
                                <Input id="templateName" />
                              </div>
                              
                              <div className="space-y-1">
                                <Label htmlFor="templateType">Tipo</Label>
                                <Select defaultValue="email">
                                  <SelectTrigger>
                                    <SelectValue placeholder="Seleziona tipo" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="email">Email</SelectItem>
                                    <SelectItem value="push">Notifica Push</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                              
                              <div className="space-y-1">
                                <Label htmlFor="description">Descrizione</Label>
                                <Textarea id="description" rows={3} />
                              </div>

                              <div className="space-y-2 pt-4">
                                <h4 className="text-sm font-medium">Elementi</h4>
                                <div className="grid grid-cols-2 gap-2">
                                  <Button variant="outline" size="sm" className="justify-start">
                                    <Text className="mr-2 h-4 w-4" />
                                    Testo
                                  </Button>
                                  <Button variant="outline" size="sm" className="justify-start">
                                    <Image className="mr-2 h-4 w-4" />
                                    Logo
                                  </Button>
                                  <Button variant="outline" size="sm" className="justify-start">
                                    <Database className="mr-2 h-4 w-4" />
                                    Dati DB
                                  </Button>
                                  <Button variant="outline" size="sm" className="justify-start">
                                    <LayoutTemplate className="mr-2 h-4 w-4" />
                                    Layout
                                  </Button>
                                </div>
                              </div>

                              <div className="space-y-2 pt-4">
                                <h4 className="text-sm font-medium">Campi Disponibili</h4>
                                <Accordion type="single" collapsible className="w-full">
                                  {databaseFields.map((category, index) => (
                                    <AccordionItem key={index} value={`category-${index}`}>
                                      <AccordionTrigger className="text-xs py-2">
                                        {category.category}
                                      </AccordionTrigger>
                                      <AccordionContent>
                                        <div className="space-y-1">
                                          {category.fields.map((field, fieldIndex) => (
                                            <div 
                                              key={fieldIndex} 
                                              className="flex items-center justify-between border px-2 py-1 rounded-md cursor-pointer hover:bg-muted text-xs"
                                              onClick={() => insertFieldIntoTemplate(field.name)}
                                            >
                                              <div className="flex items-center">
                                                {field.icon}
                                                <span className="ml-2">{field.label}</span>
                                              </div>
                                              <Plus className="h-3 w-3" />
                                            </div>
                                          ))}
                                        </div>
                                      </AccordionContent>
                                    </AccordionItem>
                                  ))}
                                </Accordion>
                              </div>
                            </div>
                          </ScrollArea>
                        </div>
                      </ResizablePanel>
                      
                      <ResizableHandle withHandle />
                      
                      <ResizablePanel defaultSize={75}>
                        <div className="flex h-full flex-col">
                          <div className="flex items-center justify-between border-b p-4">
                            <div className="flex items-center gap-2">
                              <h3 className="text-sm font-medium">Editor</h3>
                              
                              <Select defaultValue="editor">
                                <SelectTrigger className="h-8 w-[120px]">
                                  <SelectValue placeholder="Visualizza" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="editor">Editor</SelectItem>
                                  <SelectItem value="preview">Anteprima</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            
                            <div className="flex items-center gap-2">
                              <Button size="sm" variant="outline">
                                <Eye className="mr-2 h-4 w-4" />
                                Anteprima
                              </Button>
                              <Button size="sm">
                                <Save className="mr-2 h-4 w-4" />
                                Salva
                              </Button>
                            </div>
                          </div>
                          
                          <div className="flex-1 p-4 overflow-auto">
                            <div className="flex flex-col gap-4">
                              <div className="space-y-1">
                                <Label htmlFor="subject">Oggetto</Label>
                                <Input id="subject" placeholder="Inserisci l'oggetto" />
                              </div>
                              
                              <div className="space-y-2">
                                <div className="flex justify-between items-center">
                                  <Label htmlFor="content">Contenuto</Label>
                                  <div className="flex gap-1">
                                    <Button variant="outline" size="sm" className="h-7 w-7 p-0">
                                      <Upload className="h-4 w-4" />
                                    </Button>
                                    <Button variant="outline" size="sm" className="h-7 w-7 p-0">
                                      <Image className="h-4 w-4" />
                                    </Button>
                                    <Button variant="outline" size="sm" className="h-7 w-7 p-0">
                                      <Settings className="h-4 w-4" />
                                    </Button>
                                  </div>
                                </div>
                                <div className="min-h-[300px] rounded-md border p-4">
                                  <div className="flex flex-col gap-4">
                                    <div className="bg-muted p-3 rounded-md flex items-center justify-center h-16 border-2 border-dashed">
                                      <p className="text-sm text-muted-foreground">Trascina qui il logo della scuola o <span className="text-primary cursor-pointer">caricalo</span></p>
                                    </div>
                                    <Textarea 
                                      placeholder="Inizia a scrivere il contenuto del tuo messaggio qui..." 
                                      className="min-h-[200px]"
                                    />
                                    <div className="bg-muted-foreground/10 p-3 rounded-md text-sm">
                                      <p>Suggerimento: Utilizza {"{{"}"nome_studente{"}}"} per inserire il nome dello studente, {"{{"}"classe{"}}"} per la classe, ecc.</p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </ResizablePanel>
                    </ResizablePanelGroup>
                  </div>
                  
                  <DialogFooter className="mt-4">
                    <Button variant="outline" onClick={() => setIsTemplateDialogOpen(false)}>
                      Annulla
                    </Button>
                    <Button type="submit" onClick={handleCreateTemplate}>
                      <Save className="mr-2 h-4 w-4" />
                      Salva Modello
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>

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
                          <Copy className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Trash className="h-4 w-4" />
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
                          <Copy className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Trash className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Messages;

