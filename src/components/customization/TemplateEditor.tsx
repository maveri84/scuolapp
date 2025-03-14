
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { Upload, Image, Settings, Layout, FileText, Database } from "lucide-react";
import DatabaseFieldSelector from "../messages/DatabaseFieldSelector";
import { useToast } from "@/hooks/use-toast";

interface TemplateEditorProps {
  templateId: number | null;
  onClose: () => void;
}

const TemplateEditor: React.FC<TemplateEditorProps> = ({ templateId, onClose }) => {
  const { toast } = useToast();
  const [templateView, setTemplateView] = useState<"editor" | "preview">("editor");
  
  const handleInsertField = (fieldName: string) => {
    toast({
      title: "Campo inserito",
      description: `Il campo {{${fieldName}}} è stato inserito nel template`,
    });
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-4">
          <div>
            <Label htmlFor="templateName">Nome Template</Label>
            <Input 
              id="templateName" 
              placeholder="Inserisci un nome descrittivo" 
              defaultValue={templateId ? "Certificato di Iscrizione" : ""}
            />
          </div>
          
          <div>
            <Label htmlFor="templateType">Tipo Documento</Label>
            <Select defaultValue={templateId ? "certificato" : ""}>
              <SelectTrigger>
                <SelectValue placeholder="Seleziona tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="certificato">Certificato</SelectItem>
                <SelectItem value="comunicazione">Comunicazione</SelectItem>
                <SelectItem value="pagella">Pagella</SelectItem>
                <SelectItem value="autorizzazione">Autorizzazione</SelectItem>
                <SelectItem value="altro">Altro</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="space-y-4">
          <div>
            <Label htmlFor="templateOrientation">Orientamento</Label>
            <Select defaultValue="portrait">
              <SelectTrigger>
                <SelectValue placeholder="Seleziona orientamento" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="portrait">Verticale</SelectItem>
                <SelectItem value="landscape">Orizzontale</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label htmlFor="templateDescription">Descrizione</Label>
            <Textarea 
              id="templateDescription" 
              placeholder="Breve descrizione del template e del suo utilizzo" 
              rows={3}
            />
          </div>
        </div>
      </div>
      
      <Tabs defaultValue="content" className="w-full">
        <TabsList className="grid grid-cols-3">
          <TabsTrigger value="content">Contenuto</TabsTrigger>
          <TabsTrigger value="layout">Layout</TabsTrigger>
          <TabsTrigger value="settings">Impostazioni</TabsTrigger>
        </TabsList>
        
        <TabsContent value="content" className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="documentContent">Contenuto documento</Label>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                <Image className="h-4 w-4" />
              </Button>
              <Select defaultValue={templateView}>
                <SelectTrigger className="h-8 w-28">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="editor">Editor</SelectItem>
                  <SelectItem value="preview">Anteprima</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="border rounded-md p-4 min-h-[400px]">
            <Textarea 
              className="min-h-[380px] font-mono" 
              placeholder="Inserisci qui il contenuto del documento. Utilizza i campi database come {{nome_studente}} o {{classe}} per inserire dati dinamici."
              defaultValue={templateId ? `
<div class="header">
  <img src="{{logo_scuola}}" alt="Logo Scuola" />
  <h1>{{nome_scuola}}</h1>
</div>

<h2>CERTIFICATO DI ISCRIZIONE</h2>

<p>Si certifica che l'alunno/a <strong>{{nome_studente}} {{cognome_studente}}</strong>, nato/a a {{luogo_nascita}} il {{data_nascita}}, è iscritto/a presso questo Istituto, nella classe <strong>{{classe}} {{sezione}}</strong> per l'anno scolastico {{anno_scolastico}}.</p>

<p>Il presente certificato viene rilasciato su richiesta dell'interessato per gli usi consentiti dalla legge.</p>

<div class="footer">
  <p>{{luogo}}, {{data_corrente}}</p>
  <p>Il Dirigente Scolastico</p>
  <p>____________________</p>
</div>
              ` : ""}
            />
          </div>
        </TabsContent>
        
        <TabsContent value="layout" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="p-4 space-y-4">
              <h3 className="text-sm font-medium">Elementi</h3>
              <div className="grid grid-cols-2 gap-2">
                <Button variant="outline" size="sm" className="justify-start">
                  <FileText className="mr-2 h-4 w-4" />
                  Testo
                </Button>
                <Button variant="outline" size="sm" className="justify-start">
                  <Image className="mr-2 h-4 w-4" />
                  Immagine
                </Button>
                <Button variant="outline" size="sm" className="justify-start">
                  <Database className="mr-2 h-4 w-4" />
                  Campo DB
                </Button>
                <Button variant="outline" size="sm" className="justify-start">
                  <Layout className="mr-2 h-4 w-4" />
                  Tabella
                </Button>
              </div>
            </Card>
            
            <div className="md:col-span-2">
              <Card className="p-4 h-full">
                <div className="h-full flex items-center justify-center border-2 border-dashed border-gray-200 rounded-md">
                  <div className="text-center p-6">
                    <Layout className="h-8 w-8 mx-auto text-gray-400" />
                    <p className="mt-2 text-sm text-gray-500">
                      Trascina qui gli elementi per comporre il layout del documento
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="settings" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-4">
              <div>
                <Label htmlFor="pageSize">Formato Pagina</Label>
                <Select defaultValue="a4">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="a4">A4</SelectItem>
                    <SelectItem value="a5">A5</SelectItem>
                    <SelectItem value="letter">Letter</SelectItem>
                    <SelectItem value="legal">Legal</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="margins">Margini (mm)</Label>
                <div className="grid grid-cols-2 gap-2">
                  <Input placeholder="Superiore" defaultValue="20" />
                  <Input placeholder="Inferiore" defaultValue="20" />
                  <Input placeholder="Sinistro" defaultValue="25" />
                  <Input placeholder="Destro" defaultValue="25" />
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="headerHeight">Altezza Intestazione (mm)</Label>
                <Input defaultValue="30" />
              </div>
              
              <div>
                <Label htmlFor="footerHeight">Altezza Piè di Pagina (mm)</Label>
                <Input defaultValue="20" />
              </div>
              
              <div>
                <Label htmlFor="fontFamily">Font Predefinito</Label>
                <Select defaultValue="arial">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="arial">Arial</SelectItem>
                    <SelectItem value="times">Times New Roman</SelectItem>
                    <SelectItem value="calibri">Calibri</SelectItem>
                    <SelectItem value="georgia">Georgia</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
      
      <div className="border-t pt-4">
        <h3 className="text-sm font-medium mb-2">Inserisci campi dinamici</h3>
        <DatabaseFieldSelector onFieldInsert={handleInsertField} />
      </div>
    </div>
  );
};

export default TemplateEditor;
