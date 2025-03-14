
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { FilePlus, FileText, Search } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Certificate, DEFAULT_TEMPLATES, MOCK_PEOPLE, Person } from "./types";
import { CertificateFormValues, CertificateGenerationValues } from "./schemas";
import CertificateForm from "./CertificateForm";
import CertificateGenerationForm from "./CertificateGenerationForm";
import CertificateTable from "./CertificateTable";
import GeneratedCertificatesTable from "./GeneratedCertificatesTable";

interface GeneratedCertificate {
  id: string;
  templateId: string;
  templateName: string;
  recipientId: string;
  recipientName: string;
  recipientType: string;
  content: string;
  createdAt: string;
  signed?: boolean;
  signedBy?: string;
  signedDate?: string;
  sentEmail?: boolean;
  savedToFile?: boolean;
}

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
  const [signatureData, setSignatureData] = useState({ name: "", title: "Dirigente Scolastico" });
  const [generatedCertificates, setGeneratedCertificates] = useState<GeneratedCertificate[]>([]);

  // Filter certificates based on search and active tab
  const filteredCertificates = certificates.filter(cert => {
    const matchesSearch = cert.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cert.type.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesTab = activeTab === "tutti" || 
      cert.target === activeTab || 
      cert.target === "entrambi";
    
    return matchesSearch && matchesTab;
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
      // Add new certificate
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
    const generatedCert: GeneratedCertificate = {
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
  };

  // Handle edit certificate
  const handleEdit = (certificate: Certificate) => {
    setEditingCertificate(certificate);
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
    setIsDialogOpen(true);
  };

  // Handle generate certificate
  const handleGenerateCertificate = (certificate: Certificate) => {
    setSelectedCertificate(certificate);
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

  // Handle setting preview content directly
  const handlePreviewContent = (content: string) => {
    setPreviewHtml(content);
    setIsPreviewDialogOpen(true);
  };

  // Handle download certificate
  const handleDownload = (certificate: any) => {
    // In a real application, this would download the certificate
    toast({
      title: "Download certificato",
      description: `Download di "${certificate.templateName}" avviato.`,
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

              <CertificateForm 
                onSubmit={onSubmit} 
                editingCertificate={editingCertificate} 
              />
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

          <CertificateGenerationForm 
            onSubmit={onGenerateSubmit}
            certificates={certificates}
            selectedCertificate={selectedCertificate}
            signatureData={signatureData}
            setSignatureData={setSignatureData}
          />
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

          <div className="flex justify-end gap-2 mt-4">
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
              Download PDF
            </Button>
          </div>
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
                  <GeneratedCertificatesTable 
                    certificates={generatedCertificates}
                    onPreview={handlePreviewContent}
                    onDownload={handleDownload}
                    onSendEmail={handleSendEmail}
                    setGeneratedCertificates={setGeneratedCertificates}
                  />
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
                <CertificateTable 
                  certificates={filteredCertificates}
                  onPreview={handlePreview}
                  onGenerate={handleGenerateCertificate}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CertificateManager;
