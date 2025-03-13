
import React from "react";
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
import { Bell, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface PushNotificationDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

const PushNotificationDialog: React.FC<PushNotificationDialogProps> = ({ isOpen, onOpenChange }) => {
  const { toast } = useToast();

  const handleSendPush = (e: React.FormEvent) => {
    e.preventDefault();
    onOpenChange(false);
    toast({
      title: "Notifica inviata",
      description: "La notifica push è stata inviata con successo",
    });
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
  );
};

export default PushNotificationDialog;
