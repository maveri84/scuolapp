
import React from "react";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Send, Mail } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

interface EmailDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

const EmailDialog: React.FC<EmailDialogProps> = ({ isOpen, onOpenChange }) => {
  const { toast } = useToast();

  const handleSendEmail = (e: React.FormEvent) => {
    e.preventDefault();
    onOpenChange(false);
    toast({
      title: "Email inviata",
      description: "L'email è stata inviata con successo",
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
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
  );
};

export default EmailDialog;
