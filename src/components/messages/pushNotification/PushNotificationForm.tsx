
import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AlertCircle } from "lucide-react";

interface PushNotificationFormProps {
  title: string;
  message: string;
  recipient: string;
  recipientSearch: string;
  priority: string;
  validationErrors: Record<string, string>;
  error: string;
  onChange: (field: string, value: string) => void;
}

const PushNotificationForm: React.FC<PushNotificationFormProps> = ({
  title,
  message,
  recipient,
  recipientSearch,
  priority,
  validationErrors,
  error,
  onChange,
}) => {
  return (
    <>
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
          <Select 
            value={recipient} 
            onValueChange={(value) => onChange("recipient", value)}
          >
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
            <div className="col-span-3">
              <Input
                id="recipient-push"
                placeholder="Nome del destinatario o classe"
                value={recipientSearch}
                onChange={(e) => onChange("recipientSearch", e.target.value)}
                className={validationErrors.recipientSearch ? "border-red-500" : ""}
              />
              {validationErrors.recipientSearch && (
                <p className="text-red-500 text-xs mt-1">{validationErrors.recipientSearch}</p>
              )}
            </div>
          </div>
        )}
        
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="title-push" className="text-right">
            Titolo
          </Label>
          <div className="col-span-3">
            <Input 
              id="title-push"
              value={title}
              onChange={(e) => onChange("title", e.target.value)}
              required
              className={validationErrors.title ? "border-red-500" : ""}
            />
            {validationErrors.title && (
              <p className="text-red-500 text-xs mt-1">{validationErrors.title}</p>
            )}
          </div>
        </div>
        
        <div className="grid grid-cols-4 items-start gap-4">
          <Label htmlFor="message-push" className="text-right pt-2">
            Messaggio
          </Label>
          <div className="col-span-3">
            <Textarea 
              id="message-push"
              rows={5} 
              value={message}
              onChange={(e) => onChange("message", e.target.value)}
              required
              className={validationErrors.message ? "border-red-500" : ""}
            />
            {validationErrors.message && (
              <p className="text-red-500 text-xs mt-1">{validationErrors.message}</p>
            )}
          </div>
        </div>
        
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="priority" className="text-right">
            Priorità
          </Label>
          <Select 
            value={priority} 
            onValueChange={(value) => onChange("priority", value)}
          >
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
    </>
  );
};

export default PushNotificationForm;
