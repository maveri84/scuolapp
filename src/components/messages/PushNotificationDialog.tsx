
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
import { Bell, Send, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface PushNotificationDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

const PushNotificationDialog: React.FC<PushNotificationDialogProps> = ({ isOpen, onOpenChange }) => {
  const { toast } = useToast();
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [recipient, setRecipient] = useState("student");
  const [recipientSearch, setRecipientSearch] = useState("");
  const [priority, setPriority] = useState("normal");
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState("");

  const validateForm = () => {
    if (!title.trim()) {
      setError("Il titolo è obbligatorio");
      return false;
    }
    if (!message.trim()) {
      setError("Il messaggio è obbligatorio");
      return false;
    }
    setError("");
    return true;
  };

  const handleSendPush = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSending(true);
    
    try {
      // Simulate API call with timeout
      await new Promise(resolve => setTimeout(resolve, 800));
      
      setIsSending(false);
      onOpenChange(false);
      
      // Reset form
      setTitle("");
      setMessage("");
      setRecipientSearch("");
      setPriority("normal");
      
      toast({
        title: "Notifica inviata",
        description: "La notifica push è stata inviata con successo",
      });
    } catch (err) {
      setIsSending(false);
      setError("Si è verificato un errore durante l'invio della notifica");
      
      toast({
        title: "Errore",
        description: "Si è verificato un errore durante l'invio della notifica",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
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
          {error && (
            <div className="bg-destructive/15 p-3 rounded-md mb-4 flex items-start">
              <AlertCircle className="h-5 w-5 text-destructive mr-2 mt-0.5" />
              <span className="text-destructive text-sm">{error}</span>
            </div>
          )}
          
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="recipient-type-push" className="text-right">
                Destinatari
              </Label>
              <Select value={recipient} onValueChange={setRecipient}>
                <SelectTrigger className="col-span-3" id="recipient-type-push">
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
            
            {recipient !== "all-students" && recipient !== "all-parents" && recipient !== "all-employees" && (
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="recipient-push" className="text-right">
                  Cerca
                </Label>
                <Input
                  id="recipient-push"
                  placeholder="Nome del destinatario o classe"
                  className="col-span-3"
                  value={recipientSearch}
                  onChange={(e) => setRecipientSearch(e.target.value)}
                />
              </div>
            )}
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="title-push" className="text-right">
                Titolo
              </Label>
              <Input 
                id="title-push" 
                className="col-span-3" 
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            
            <div className="grid grid-cols-4 items-start gap-4">
              <Label htmlFor="message-push" className="text-right pt-2">
                Messaggio
              </Label>
              <Textarea 
                id="message-push" 
                className="col-span-3" 
                rows={5} 
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="priority" className="text-right">
                Priorità
              </Label>
              <Select value={priority} onValueChange={setPriority}>
                <SelectTrigger className="col-span-3" id="priority">
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
            <Button type="submit" disabled={isSending}>
              {isSending ? (
                <>
                  <span className="animate-pulse mr-2">⚪</span>
                  Invio in corso...
                </>
              ) : (
                <>
                  <Send className="mr-2 h-4 w-4" />
                  Invia Notifica
                </>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default PushNotificationDialog;
