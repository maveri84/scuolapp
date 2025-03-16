
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { FileText, Save, Upload } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ProtocolEntryProps {
  onSuccess?: () => void;
}

const ProtocolEntry: React.FC<ProtocolEntryProps> = ({ onSuccess }) => {
  const { toast } = useToast();
  const [subject, setSubject] = useState("");
  const [type, setType] = useState("in");
  const [sender, setSender] = useState("");
  const [recipient, setRecipient] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!subject || !type || !sender || !recipient) {
      toast({
        title: "Errore di validazione",
        description: "Compila tutti i campi obbligatori",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    // Simulate API call with timeout
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In a real app, you would send this data to an API
      // const formData = new FormData();
      // formData.append('subject', subject);
      // formData.append('type', type);
      // formData.append('sender', sender);
      // formData.append('recipient', recipient);
      // formData.append('category', category);
      // formData.append('description', description);
      // if (file) formData.append('file', file);
      
      // const response = await fetch('/api/protocol/register', {
      //   method: 'POST',
      //   body: formData,
      // });
      
      // if (!response.ok) throw new Error('Errore durante la registrazione');

      toast({
        title: "Documento protocollato",
        description: `Documento "${subject}" registrato con successo nel protocollo`,
      });

      // Reset the form
      setSubject("");
      setType("in");
      setSender("");
      setRecipient("");
      setCategory("");
      setDescription("");
      setFile(null);
      
      if (onSuccess) onSuccess();
    } catch (error) {
      toast({
        title: "Errore",
        description: "Si è verificato un errore durante la registrazione",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5" />
          Registra Nuovo Documento
        </CardTitle>
        <CardDescription>
          Inserisci i dati del documento da protocollare
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="protocol-subject">Oggetto*</Label>
              <Input
                id="protocol-subject"
                placeholder="Oggetto del documento"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="protocol-type">Tipo di Protocollo*</Label>
              <Select value={type} onValueChange={setType} required>
                <SelectTrigger id="protocol-type">
                  <SelectValue placeholder="Seleziona il tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="in">Entrata</SelectItem>
                  <SelectItem value="out">Uscita</SelectItem>
                  <SelectItem value="internal">Interno</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="protocol-sender">Mittente*</Label>
              <Input
                id="protocol-sender"
                placeholder="Nome del mittente"
                value={sender}
                onChange={(e) => setSender(e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="protocol-recipient">Destinatario*</Label>
              <Input
                id="protocol-recipient"
                placeholder="Nome del destinatario"
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="protocol-category">Categoria</Label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger id="protocol-category">
                  <SelectValue placeholder="Seleziona la categoria" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="administrative">Amministrativo</SelectItem>
                  <SelectItem value="teaching">Didattico</SelectItem>
                  <SelectItem value="financial">Finanziario</SelectItem>
                  <SelectItem value="personnel">Personale</SelectItem>
                  <SelectItem value="student">Studenti</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="protocol-file">Documento</Label>
              <Input
                id="protocol-file"
                type="file"
                onChange={(e) => {
                  if (e.target.files && e.target.files.length > 0) {
                    setFile(e.target.files[0]);
                  }
                }}
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="protocol-description">Descrizione</Label>
            <Textarea
              id="protocol-description"
              placeholder="Descrizione dettagliata del documento"
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
        </CardContent>
        
        <CardFooter className="justify-between">
          <p className="text-sm text-muted-foreground">* Campi obbligatori</p>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                Registrazione...
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                Registra Documento
              </>
            )}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default ProtocolEntry;
