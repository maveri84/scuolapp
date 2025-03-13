
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from "@/components/ui/resizable";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast";
import { FilePlus, Save, Eye, Upload, Image, Settings, Text, LayoutTemplate, Database } from "lucide-react";
import DatabaseFieldSelector from "./DatabaseFieldSelector";

interface TemplateDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

const TemplateDialog: React.FC<TemplateDialogProps> = ({ isOpen, onOpenChange }) => {
  const [templatePreview, setTemplatePreview] = useState(false);
  const { toast } = useToast();

  const handleCreateTemplate = (e: React.FormEvent) => {
    e.preventDefault();
    onOpenChange(false);
    toast({
      title: "Modello creato",
      description: "Il modello di comunicazione è stato creato con successo",
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
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
                      <DatabaseFieldSelector />
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
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Annulla
          </Button>
          <Button type="submit" onClick={handleCreateTemplate}>
            <Save className="mr-2 h-4 w-4" />
            Salva Modello
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default TemplateDialog;
