
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { FilePlus, FileText, Download, Eye, Edit, Trash2, Search } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Certificate types based on Italian school system
const CERTIFICATE_TYPES = [
  { value: "iscrizione", label: "Certificato di Iscrizione" },
  { value: "frequenza", label: "Certificato di Frequenza" },
  { value: "diploma", label: "Diploma di Licenza" },
  { value: "maturita", label: "Diploma di Maturità" },
  { value: "servizio_docenti", label: "Certificato di Servizio (Docenti)" },
  { value: "servizio_ata", label: "Certificato di Servizio (ATA)" },
  { value: "identita_personale", label: "Certificato di Identità Personale" },
  { value: "sostitutivo", label: "Certificato Sostitutivo" },
  { value: "nulla_osta", label: "Nulla Osta al Trasferimento" },
]

// Define the certificate type
interface Certificate {
  id: string;
  name: string;
  type: string;
  target: "studenti" | "docenti" | "entrambi";
  description?: string;
  content: string;
  includeHeader?: boolean;
  includeFooter?: boolean;
}

// Default templates for certificates (simplified versions)
const DEFAULT_TEMPLATES: Certificate[] = [
  {
    id: "iscrizione_scolastica",
    name: "Certificato di Iscrizione Scolastica",
    type: "iscrizione",
    target: "studenti",
    content: `
<div class="header">
  <img src="{{logo_scuola}}" alt="Logo Scuola" />
  <h1>{{nome_scuola}}</h1>
</div>

<h2>CERTIFICATO DI ISCRIZIONE SCOLASTICA</h2>

<p>IL DIRIGENTE SCOLASTICO</p>

<p>CERTIFICA</p>

<p>che l'alunn{{genere}} <strong>{{cognome_studente}} {{nome_studente}}</strong>, nat{{genere}} a {{luogo_nascita}} ({{provincia_nascita}}) il {{data_nascita}}, è iscritt{{genere}} per l'anno scolastico {{anno_scolastico}} alla classe {{classe}} sezione {{sezione}} di questo Istituto.</p>

<p>Si rilascia il presente certificato per gli usi consentiti dalla legge.</p>

<div class="footer">
  <p>{{luogo}}, {{data_corrente}}</p>
  <div class="firma">
    <p>IL DIRIGENTE SCOLASTICO</p>
    <p>{{nome_dirigente}}</p>
  </div>
  <div class="timbro">
    <p>[TIMBRO]</p>
  </div>
</div>
    `
  },
  {
    id: "frequenza_scolastica",
    name: "Certificato di Frequenza",
    type: "frequenza",
    target: "studenti",
    content: `
<div class="header">
  <img src="{{logo_scuola}}" alt="Logo Scuola" />
  <h1>{{nome_scuola}}</h1>
</div>

<h2>CERTIFICATO DI FREQUENZA</h2>

<p>IL DIRIGENTE SCOLASTICO</p>

<p>CERTIFICA</p>

<p>che l'alunn{{genere}} <strong>{{cognome_studente}} {{nome_studente}}</strong>, nat{{genere}} a {{luogo_nascita}} ({{provincia_nascita}}) il {{data_nascita}}, frequenta nell'anno scolastico {{anno_scolastico}} la classe {{classe}} sezione {{sezione}} di questo Istituto.</p>

<p>Si rilascia il presente certificato per gli usi consentiti dalla legge.</p>

<div class="footer">
  <p>{{luogo}}, {{data_corrente}}</p>
  <div class="firma">
    <p>IL DIRIGENTE SCOLASTICO</p>
    <p>{{nome_dirigente}}</p>
  </div>
  <div class="timbro">
    <p>[TIMBRO]</p>
  </div>
</div>
    `
  },
  {
    id: "servizio_docenti",
    name: "Certificato di Servizio per Docenti",
    type: "servizio_docenti",
    target: "docenti",
    content: `
<div class="header">
  <img src="{{logo_scuola}}" alt="Logo Scuola" />
  <h1>{{nome_scuola}}</h1>
</div>

<h2>CERTIFICATO DI SERVIZIO</h2>

<p>IL DIRIGENTE SCOLASTICO</p>

<p>CERTIFICA</p>

<p>che {{titolo}} <strong>{{cognome_docente}} {{nome_docente}}</strong>, nat{{genere}} a {{luogo_nascita}} ({{provincia_nascita}}) il {{data_nascita}}, ha prestato servizio presso questo Istituto in qualità di Docente di {{materia}} dal {{data_inizio_servizio}} al {{data_fine_servizio}} con contratto di lavoro a tempo {{tipo_contratto}}.</p>

<p>Si rilascia il presente certificato per gli usi consentiti dalla legge.</p>

<div class="footer">
  <p>{{luogo}}, {{data_corrente}}</p>
  <div class="firma">
    <p>IL DIRIGENTE SCOLASTICO</p>
    <p>{{nome_dirigente}}</p>
  </div>
  <div class="timbro">
    <p>[TIMBRO]</p>
  </div>
</div>
    `
  },
  {
    id: "nulla_osta",
    name: "Nulla Osta al Trasferimento",
    type: "nulla_osta",
    target: "studenti",
    content: `
<div class="header">
  <img src="{{logo_scuola}}" alt="Logo Scuola" />
  <h1>{{nome_scuola}}</h1>
</div>

<h2>NULLA OSTA AL TRASFERIMENTO</h2>

<p>IL DIRIGENTE SCOLASTICO</p>

<p>CONCEDE</p>

<p>il nulla osta al trasferimento dell'alunn{{genere}} <strong>{{cognome_studente}} {{nome_studente}}</strong>, nat{{genere}} a {{luogo_nascita}} ({{provincia_nascita}}) il {{data_nascita}}, iscritt{{genere}} nell'anno scolastico {{anno_scolastico}} alla classe {{classe}} sezione {{sezione}} di questo Istituto, presso {{scuola_destinazione}}.</p>

<p>Si rilascia il presente nulla osta per gli usi consentiti dalla legge.</p>

<div class="footer">
  <p>{{luogo}}, {{data_corrente}}</p>
  <div class="firma">
    <p>IL DIRIGENTE SCOLASTICO</p>
    <p>{{nome_dirigente}}</p>
  </div>
  <div class="timbro">
    <p>[TIMBRO]</p>
  </div>
</div>
    `
  }
];

// Schema for certificate form validation
const certificateFormSchema = z.object({
  name: z.string().min(3, { message: "Il nome deve contenere almeno 3 caratteri" }),
  type: z.string().min(1, { message: "Seleziona un tipo di certificato" }),
  target: z.enum(["studenti", "docenti", "entrambi"], {
    required_error: "Seleziona a chi è destinato il certificato",
  }),
  description: z.string().optional(),
  content: z.string().min(1, { message: "Il contenuto non può essere vuoto" }),
  includeHeader: z.boolean().default(true),
  includeFooter: z.boolean().default(true),
});

type CertificateFormValues = z.infer<typeof certificateFormSchema>;

const CertificateManager: React.FC = () => {
  const { toast } = useToast();
  const [certificates, setCertificates] = useState<Certificate[]>(DEFAULT_TEMPLATES);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState<"studenti" | "docenti" | "tutti">("tutti");
  const [editingCertificate, setEditingCertificate] = useState<Certificate | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Filter certificates based on search and active tab
  const filteredCertificates = certificates.filter(cert => {
    const matchesSearch = cert.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cert.type.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesTab = activeTab === "tutti" || 
      cert.target === activeTab || 
      cert.target === "entrambi";
    
    return matchesSearch && matchesTab;
  });

  // Form setup
  const form = useForm<CertificateFormValues>({
    resolver: zodResolver(certificateFormSchema),
    defaultValues: {
      name: "",
      type: "",
      target: "studenti",
      description: "",
      content: "",
      includeHeader: true,
      includeFooter: true,
    },
  });

  // Handle form submission
  const onSubmit = (values: CertificateFormValues) => {
    if (editingCertificate) {
      // Update existing certificate
      setCertificates(prev => 
        prev.map(cert => 
          cert.id === editingCertificate.id ? { ...cert, ...values } : cert
        )
      );
      toast({
        title: "Certificato aggiornato",
        description: `Il certificato "${values.name}" è stato aggiornato con successo.`,
      });
    } else {
      // Add new certificate - Fix the type issue here
      // Make sure all required properties are provided
      const newCert: Certificate = {
        id: `cert_${Date.now()}`,
        name: values.name,
        type: values.type,
        target: values.target,
        description: values.description,
        content: values.content,
        includeHeader: values.includeHeader,
        includeFooter: values.includeFooter
      };
      setCertificates(prev => [...prev, newCert]);
      toast({
        title: "Certificato creato",
        description: `Il certificato "${values.name}" è stato creato con successo.`,
      });
    }
    setIsDialogOpen(false);
    setEditingCertificate(null);
    form.reset();
  };

  // Handle edit certificate
  const handleEdit = (certificate: Certificate) => {
    setEditingCertificate(certificate);
    form.reset({
      name: certificate.name,
      type: certificate.type,
      target: certificate.target,
      description: certificate.description || "",
      content: certificate.content,
      includeHeader: certificate.includeHeader !== false,
      includeFooter: certificate.includeFooter !== false,
    });
    setIsDialogOpen(true);
  };

  // Handle delete certificate
  const handleDelete = (id: string) => {
    setCertificates(prev => prev.filter(cert => cert.id !== id));
    toast({
      title: "Certificato eliminato",
      description: "Il certificato è stato eliminato con successo.",
    });
  };

  // Handle new certificate
  const handleNewCertificate = () => {
    setEditingCertificate(null);
    form.reset({
      name: "",
      type: "",
      target: "studenti",
      description: "",
      content: "",
      includeHeader: true,
      includeFooter: true,
    });
    setIsDialogOpen(true);
  };

  // Handle preview certificate
  const handlePreview = (certificate: Certificate) => {
    // In a real application, this would open a preview of the certificate
    toast({
      title: "Anteprima certificato",
      description: `Visualizzazione anteprima di "${certificate.name}"`,
    });
  };

  // Handle download certificate
  const handleDownload = (certificate: Certificate) => {
    // In a real application, this would download the certificate
    toast({
      title: "Download certificato",
      description: `Download di "${certificate.name}" avviato.`,
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Cerca certificati..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex gap-2">
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={handleNewCertificate}>
                <FilePlus className="mr-2 h-4 w-4" />
                Nuovo Certificato
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>
                  {editingCertificate ? "Modifica Certificato" : "Nuovo Certificato"}
                </DialogTitle>
                <DialogDescription>
                  {editingCertificate 
                    ? "Modifica i dettagli del certificato selezionato." 
                    : "Crea un nuovo modello di certificato personalizzato."}
                </DialogDescription>
              </DialogHeader>

              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nome Certificato</FormLabel>
                          <FormControl>
                            <Input placeholder="Es. Certificato di Iscrizione" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="type"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Tipo Certificato</FormLabel>
                          <Select 
                            onValueChange={field.onChange} 
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Seleziona tipo" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {CERTIFICATE_TYPES.map(type => (
                                <SelectItem key={type.value} value={type.value}>
                                  {type.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="target"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Destinato a</FormLabel>
                          <Select 
                            onValueChange={field.onChange} 
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Seleziona destinatari" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="studenti">Studenti</SelectItem>
                              <SelectItem value="docenti">Docenti</SelectItem>
                              <SelectItem value="entrambi">Entrambi</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Descrizione (opzionale)</FormLabel>
                          <FormControl>
                            <Input placeholder="Descrivi lo scopo del certificato" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="content"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Contenuto del Certificato</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Inserisci qui il contenuto del certificato. Usa {{nome_campo}} per i campi dinamici." 
                            className="min-h-[300px] font-mono"
                            {...field} 
                          />
                        </FormControl>
                        <FormDescription>
                          Usa i segnaposto come &#123;&#123;nome_studente&#125;&#125;, &#123;&#123;classe&#125;&#125;, &#123;&#123;data_corrente&#125;&#125; per i dati dinamici.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="flex items-center space-x-4">
                    <FormField
                      control={form.control}
                      name="includeHeader"
                      render={({ field }) => (
                        <FormItem className="flex items-center space-x-2">
                          <FormControl>
                            <Checkbox 
                              checked={field.value} 
                              onCheckedChange={field.onChange} 
                            />
                          </FormControl>
                          <FormLabel className="!mt-0">Includi intestazione standard</FormLabel>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="includeFooter"
                      render={({ field }) => (
                        <FormItem className="flex items-center space-x-2">
                          <FormControl>
                            <Checkbox 
                              checked={field.value} 
                              onCheckedChange={field.onChange} 
                            />
                          </FormControl>
                          <FormLabel className="!mt-0">Includi piè di pagina standard</FormLabel>
                        </FormItem>
                      )}
                    />
                  </div>

                  <DialogFooter>
                    <Button type="submit">
                      {editingCertificate ? "Aggiorna Certificato" : "Crea Certificato"}
                    </Button>
                  </DialogFooter>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Tabs defaultValue="tutti" onValueChange={(value) => setActiveTab(value as any)}>
        <TabsList>
          <TabsTrigger value="tutti">Tutti i Certificati</TabsTrigger>
          <TabsTrigger value="studenti">Certificati Studenti</TabsTrigger>
          <TabsTrigger value="docenti">Certificati Docenti</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Gestione Certificati</CardTitle>
              <CardDescription>
                {activeTab === "tutti" && "Tutti i modelli di certificato disponibili"}
                {activeTab === "studenti" && "Certificati per gli studenti"}
                {activeTab === "docenti" && "Certificati per i docenti"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nome</TableHead>
                      <TableHead>Tipo</TableHead>
                      <TableHead>Destinatari</TableHead>
                      <TableHead className="text-right">Azioni</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredCertificates.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={4} className="h-24 text-center">
                          Nessun certificato trovato.
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredCertificates.map((certificate) => (
                        <TableRow key={certificate.id}>
                          <TableCell className="font-medium">{certificate.name}</TableCell>
                          <TableCell>
                            {CERTIFICATE_TYPES.find(t => t.value === certificate.type)?.label || certificate.type}
                          </TableCell>
                          <TableCell>
                            {certificate.target === "studenti" && "Studenti"}
                            {certificate.target === "docenti" && "Docenti"}
                            {certificate.target === "entrambi" && "Studenti e Docenti"}
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button variant="outline" size="icon" onClick={() => handlePreview(certificate)}>
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button variant="outline" size="icon" onClick={() => handleDownload(certificate)}>
                                <Download className="h-4 w-4" />
                              </Button>
                              <Button variant="outline" size="icon" onClick={() => handleEdit(certificate)}>
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button variant="outline" size="icon" onClick={() => handleDelete(certificate.id)}>
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CertificateManager;
