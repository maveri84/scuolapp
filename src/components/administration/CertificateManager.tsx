
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
import { FilePlus, FileText, Download, Eye, Edit, Trash2, Search, Mail, Send, Signature, Save, User } from "lucide-react";
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
  signed?: boolean;
  signedBy?: string;
  signedDate?: string;
  sentTo?: string[];
  sentDate?: string;
  savedToFile?: boolean;
}

// Person interface for certificate recipients
interface Person {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  type: "studente" | "docente" | "personale";
  class?: string;
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

// Mock data for students and teachers
const MOCK_PEOPLE: Person[] = [
  { id: "std1", firstName: "Marco", lastName: "Rossi", email: "marco.rossi@studenti.scuola.it", type: "studente", class: "3A" },
  { id: "std2", firstName: "Anna", lastName: "Verdi", email: "anna.verdi@studenti.scuola.it", type: "studente", class: "4B" },
  { id: "std3", firstName: "Luca", lastName: "Bianchi", email: "luca.bianchi@studenti.scuola.it", type: "studente", class: "5C" },
  { id: "doc1", firstName: "Maria", lastName: "Ferrari", email: "maria.ferrari@docenti.scuola.it", type: "docente" },
  { id: "doc2", firstName: "Giuseppe", lastName: "Romano", email: "giuseppe.romano@docenti.scuola.it", type: "docente" },
  { id: "ata1", firstName: "Sofia", lastName: "Esposito", email: "sofia.esposito@personale.scuola.it", type: "personale" },
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

// Schema for certificate generation form
const certificateGenerationSchema = z.object({
  templateId: z.string().min(1, { message: "Seleziona un modello" }),
  recipientId: z.string().min(1, { message: "Seleziona un destinatario" }),
  additionalData: z.record(z.string()).optional(),
  sendEmail: z.boolean().default(false),
  saveToFile: z.boolean().default(false),
  signDocument: z.boolean().default(false),
});

type CertificateFormValues = z.infer<typeof certificateFormSchema>;
type CertificateGenerationValues = z.infer<typeof certificateGenerationSchema>;

const CertificateManager: React.FC = () => {
  const { toast } = useToast();
  const [certificates, setCertificates] = useState<Certificate[]>(DEFAULT_TEMPLATES);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState<"studenti" | "docenti" | "tutti">("tutti");
  const [editingCertificate, setEditingCertificate] = useState<Certificate | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isGenerateDialogOpen, setIsGenerateDialogOpen] = useState(false);
  const [selectedCertificate, setSelectedCertificate] = useState<Certificate | null>(null);
  const [previewHtml, setPreviewHtml] = useState<string>("");
  const [isPreviewDialogOpen, setIsPreviewDialogOpen] = useState(false);
  const [isSignDialogOpen, setIsSignDialogOpen] = useState(false);
  const [signatureData, setSignatureData] = useState({ name: "", title: "Dirigente Scolastico" });
  const [generatedCertificates, setGeneratedCertificates] = useState<any[]>([]);

  // Filter certificates based on search and active tab
  const filteredCertificates = certificates.filter(cert => {
    const matchesSearch = cert.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cert.type.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesTab = activeTab === "tutti" || 
      cert.target === activeTab || 
      cert.target === "entrambi";
    
    return matchesSearch && matchesTab;
  });

  // Form setup for certificate template
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

  // Form setup for certificate generation
  const generateForm = useForm<CertificateGenerationValues>({
    resolver: zodResolver(certificateGenerationSchema),
    defaultValues: {
      templateId: "",
      recipientId: "",
      sendEmail: false,
      saveToFile: false,
      signDocument: false,
    },
  });

  // Handle form submission for templates
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

  // Handle certificate generation submission
  const onGenerateSubmit = (values: CertificateGenerationValues) => {
    const template = certificates.find(c => c.id === values.templateId);
    const recipient = MOCK_PEOPLE.find(p => p.id === values.recipientId);
    
    if (!template || !recipient) {
      toast({
        title: "Errore",
        description: "Seleziona un modello di certificato e un destinatario validi.",
        variant: "destructive"
      });
      return;
    }

    // Generate certificate content with actual data
    let processedContent = template.content;
    if (recipient.type === "studente") {
      processedContent = processedContent
        .replace(/{{nome_studente}}/g, recipient.firstName)
        .replace(/{{cognome_studente}}/g, recipient.lastName)
        .replace(/{{classe}}/g, recipient.class || "")
        .replace(/{{sezione}}/g, recipient.class ? recipient.class.charAt(recipient.class.length - 1) : "")
        .replace(/{{data_corrente}}/g, new Date().toLocaleDateString('it-IT'))
        .replace(/{{anno_scolastico}}/g, `${new Date().getFullYear()}-${new Date().getFullYear() + 1}`)
        .replace(/{{genere}}/g, "o") // Simplified, should be based on actual gender
        .replace(/{{nome_scuola}}/g, "I.I.S. Leonardo da Vinci")
        .replace(/{{luogo}}/g, "Roma")
        .replace(/{{nome_dirigente}}/g, "Dott.ssa Maria Rossi");
    } else {
      processedContent = processedContent
        .replace(/{{nome_docente}}/g, recipient.firstName)
        .replace(/{{cognome_docente}}/g, recipient.lastName)
        .replace(/{{data_corrente}}/g, new Date().toLocaleDateString('it-IT'))
        .replace(/{{nome_scuola}}/g, "I.I.S. Leonardo da Vinci")
        .replace(/{{luogo}}/g, "Roma")
        .replace(/{{nome_dirigente}}/g, "Dott.ssa Maria Rossi");
    }

    // Process additional data fields if available
    if (values.additionalData) {
      Object.entries(values.additionalData).forEach(([key, value]) => {
        processedContent = processedContent.replace(new RegExp(`{{${key}}}`, 'g'), value);
      });
    }

    // Create generated certificate record
    const generatedCert = {
      id: `gen_${Date.now()}`,
      templateId: template.id,
      templateName: template.name,
      recipientId: recipient.id,
      recipientName: `${recipient.firstName} ${recipient.lastName}`,
      recipientType: recipient.type,
      content: processedContent,
      createdAt: new Date().toISOString(),
      signed: values.signDocument,
      signedBy: values.signDocument ? signatureData.name : undefined,
      signedDate: values.signDocument ? new Date().toISOString() : undefined,
      sentEmail: values.sendEmail,
      savedToFile: values.saveToFile,
    };

    setGeneratedCertificates(prev => [generatedCert, ...prev]);
    setPreviewHtml(processedContent);
    setIsPreviewDialogOpen(true);
    setIsGenerateDialogOpen(false);

    // Handle actions
    if (values.sendEmail) {
      handleSendEmail(generatedCert, recipient);
    }
    
    if (values.saveToFile) {
      handleSaveToFile(generatedCert, recipient);
    }

    if (values.signDocument) {
      // The document is already marked as signed based on the form
      toast({
        title: "Certificato Firmato",
        description: `Il certificato è stato firmato digitalmente da ${signatureData.name}.`
      });
    }

    generateForm.reset();
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

  // Handle generate certificate
  const handleGenerateCertificate = (certificate: Certificate) => {
    setSelectedCertificate(certificate);
    generateForm.reset({
      templateId: certificate.id,
      recipientId: "",
      sendEmail: false,
      saveToFile: false,
      signDocument: false,
    });
    setIsGenerateDialogOpen(true);
  };

  // Handle preview certificate
  const handlePreview = (certificate: Certificate) => {
    // Get simplified preview with placeholder data
    let previewContent = certificate.content
      .replace(/{{nome_studente}}/g, "Nome")
      .replace(/{{cognome_studente}}/g, "Cognome")
      .replace(/{{nome_docente}}/g, "Nome")
      .replace(/{{cognome_docente}}/g, "Cognome")
      .replace(/{{classe}}/g, "3")
      .replace(/{{sezione}}/g, "A")
      .replace(/{{data_corrente}}/g, new Date().toLocaleDateString('it-IT'))
      .replace(/{{anno_scolastico}}/g, `${new Date().getFullYear()}-${new Date().getFullYear() + 1}`)
      .replace(/{{genere}}/g, "o")
      .replace(/{{nome_scuola}}/g, "I.I.S. Leonardo da Vinci")
      .replace(/{{luogo}}/g, "Roma")
      .replace(/{{nome_dirigente}}/g, "Dott.ssa Maria Rossi");
    
    setPreviewHtml(previewContent);
    setIsPreviewDialogOpen(true);
  };

  // Handle download certificate
  const handleDownload = (certificate: Certificate) => {
    // In a real application, this would download the certificate
    toast({
      title: "Download certificato",
      description: `Download di "${certificate.name}" avviato.`,
    });
  };

  // Handle sending email
  const handleSendEmail = (certificate: any, recipient: Person) => {
    // In a real application, this would send an email with the certificate
    toast({
      title: "Email inviata",
      description: `Certificato "${certificate.templateName}" inviato a ${recipient.email}.`,
    });
  };

  // Handle saving to personal file
  const handleSaveToFile = (certificate: any, recipient: Person) => {
    // In a real application, this would save to the student or employee file
    toast({
      title: "Salvato nel fascicolo personale",
      description: `Certificato "${certificate.templateName}" salvato nel fascicolo di ${recipient.firstName} ${recipient.lastName}.`,
    });
  };

  // Get filtered recipient options based on selected certificate
  const getRecipientOptions = () => {
    const certificateTemplate = certificates.find(c => c.id === generateForm.watch("templateId"));
    if (!certificateTemplate) return MOCK_PEOPLE;
    
    if (certificateTemplate.target === "studenti") {
      return MOCK_PEOPLE.filter(p => p.type === "studente");
    } else if (certificateTemplate.target === "docenti") {
      return MOCK_PEOPLE.filter(p => p.type === "docente" || p.type === "personale");
    } else {
      return MOCK_PEOPLE;
    }
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

      {/* Certificate Generation Dialog */}
      <Dialog open={isGenerateDialogOpen} onOpenChange={setIsGenerateDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Genera Certificato</DialogTitle>
            <DialogDescription>
              Compila i campi per generare un nuovo certificato personalizzato.
            </DialogDescription>
          </DialogHeader>

          <Form {...generateForm}>
            <form onSubmit={generateForm.handleSubmit(onGenerateSubmit)} className="space-y-4">
              <FormField
                control={generateForm.control}
                name="templateId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Modello Certificato</FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Seleziona un modello" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {certificates.map(cert => (
                          <SelectItem key={cert.id} value={cert.id}>
                            {cert.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={generateForm.control}
                name="recipientId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Destinatario</FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Seleziona un destinatario" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {getRecipientOptions().map(person => (
                          <SelectItem key={person.id} value={person.id}>
                            {person.firstName} {person.lastName} {person.type === "studente" ? `(${person.class})` : ""}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="space-y-2">
                <FormLabel>Operazioni</FormLabel>
                <div className="flex flex-col gap-2 border rounded-md p-3">
                  <FormField
                    control={generateForm.control}
                    name="signDocument"
                    render={({ field }) => (
                      <FormItem className="flex items-center space-x-2">
                        <FormControl>
                          <Checkbox 
                            checked={field.value} 
                            onCheckedChange={field.onChange} 
                          />
                        </FormControl>
                        <div className="space-y-0.5">
                          <FormLabel className="!mt-0">Firma Digitale</FormLabel>
                          <FormDescription className="text-xs">
                            Applica la firma digitale del dirigente scolastico
                          </FormDescription>
                        </div>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={generateForm.control}
                    name="sendEmail"
                    render={({ field }) => (
                      <FormItem className="flex items-center space-x-2">
                        <FormControl>
                          <Checkbox 
                            checked={field.value} 
                            onCheckedChange={field.onChange} 
                          />
                        </FormControl>
                        <div className="space-y-0.5">
                          <FormLabel className="!mt-0">Invia Email</FormLabel>
                          <FormDescription className="text-xs">
                            Invia il certificato via email al destinatario
                          </FormDescription>
                        </div>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={generateForm.control}
                    name="saveToFile"
                    render={({ field }) => (
                      <FormItem className="flex items-center space-x-2">
                        <FormControl>
                          <Checkbox 
                            checked={field.value} 
                            onCheckedChange={field.onChange} 
                          />
                        </FormControl>
                        <div className="space-y-0.5">
                          <FormLabel className="!mt-0">Salva nel Fascicolo</FormLabel>
                          <FormDescription className="text-xs">
                            Salva il certificato nel fascicolo personale
                          </FormDescription>
                        </div>
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              {generateForm.watch("signDocument") && (
                <div className="space-y-4">
                  <FormLabel>Dati Firma</FormLabel>
                  <div className="grid grid-cols-2 gap-4 border rounded-md p-3">
                    <div>
                      <FormLabel className="text-sm">Nome Firmatario</FormLabel>
                      <Input 
                        value={signatureData.name} 
                        onChange={(e) => setSignatureData({...signatureData, name: e.target.value})}
                        placeholder="Inserisci nome"
                      />
                    </div>
                    <div>
                      <FormLabel className="text-sm">Titolo</FormLabel>
                      <Input 
                        value={signatureData.title} 
                        onChange={(e) => setSignatureData({...signatureData, title: e.target.value})}
                        placeholder="Inserisci titolo"
                      />
                    </div>
                  </div>
                </div>
              )}

              <DialogFooter>
                <Button type="submit" className="w-full sm:w-auto">
                  <FileText className="mr-2 h-4 w-4" />
                  Genera Certificato
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* Certificate Preview Dialog */}
      <Dialog open={isPreviewDialogOpen} onOpenChange={setIsPreviewDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Anteprima Certificato</DialogTitle>
            <DialogDescription>
              Visualizzazione del certificato generato
            </DialogDescription>
          </DialogHeader>
          
          <div className="border rounded-md p-4 bg-white min-h-[500px]">
            <div 
              className="certificate-preview" 
              dangerouslySetInnerHTML={{ __html: previewHtml }}
            />
          </div>

          <DialogFooter className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setIsPreviewDialogOpen(false)}>
              Chiudi
            </Button>
            <Button onClick={() => {
              toast({
                title: "Download avviato",
                description: "Il certificato è stato scaricato con successo"
              });
              setIsPreviewDialogOpen(false);
            }}>
              <Download className="mr-2 h-4 w-4" />
              Scarica PDF
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Tabs defaultValue="tutti" onValueChange={(value) => setActiveTab(value as any)}>
        <TabsList>
          <TabsTrigger value="tutti">Tutti i Certificati</TabsTrigger>
          <TabsTrigger value="studenti">Certificati Studenti</TabsTrigger>
          <TabsTrigger value="docenti">Certificati Docenti</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="mt-4">
          <div className="grid grid-cols-1 gap-4">
            {/* Generated Certificates Card */}
            {generatedCertificates.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Certificati Generati</CardTitle>
                  <CardDescription>
                    Certificati recentemente generati e inviati
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Certificato</TableHead>
                          <TableHead>Destinatario</TableHead>
                          <TableHead>Data</TableHead>
                          <TableHead>Stato</TableHead>
                          <TableHead className="text-right">Azioni</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {generatedCertificates.map((cert) => (
                          <TableRow key={cert.id}>
                            <TableCell className="font-medium">{cert.templateName}</TableCell>
                            <TableCell>{cert.recipientName}</TableCell>
                            <TableCell>{new Date(cert.createdAt).toLocaleDateString('it-IT')}</TableCell>
                            <TableCell>
                              <div className="flex flex-wrap gap-1">
                                {cert.signed && (
                                  <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">
                                    Firmato
                                  </span>
                                )}
                                {cert.sentEmail && (
                                  <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                                    Inviato
                                  </span>
                                )}
                                {cert.savedToFile && (
                                  <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-purple-100 text-purple-800">
                                    Archiviato
                                  </span>
                                )}
                              </div>
                            </TableCell>
                            <TableCell className="text-right">
                              <div className="flex justify-end gap-2">
                                <Button variant="outline" size="icon" onClick={() => {
                                  setPreviewHtml(cert.content);
                                  setIsPreviewDialogOpen(true);
                                }}>
                                  <Eye className="h-4 w-4" />
                                </Button>
                                <Button variant="outline" size="icon" onClick={() => {
                                  toast({
                                    title: "Download avviato",
                                    description: "Il certificato è stato scaricato con successo"
                                  });
                                }}>
                                  <Download className="h-4 w-4" />
                                </Button>
                                {!cert.sentEmail && (
                                  <Button variant="outline" size="icon" onClick={() => {
                                    const recipient = MOCK_PEOPLE.find(p => p.id === cert.recipientId);
                                    if (recipient) {
                                      handleSendEmail(cert, recipient);
                                      // Update the certificate to mark as sent
                                      setGeneratedCertificates(prev => 
                                        prev.map(c => c.id === cert.id ? {...c, sentEmail: true} : c)
                                      );
                                    }
                                  }}>
                                    <Mail className="h-4 w-4" />
                                  </Button>
                                )}
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Certificate Templates Card */}
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
                                <Button variant="outline" size="icon" onClick={() => handleGenerateCertificate(certificate)}>
                                  <FileText className="h-4 w-4" />
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
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CertificateManager;
