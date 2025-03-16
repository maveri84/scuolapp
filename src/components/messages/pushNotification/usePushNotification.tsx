
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

type RecipientType = "student" | "parent" | "employee" | "class" | "all-students" | "all-parents" | "all-employees";
type PriorityType = "high" | "normal" | "low";

interface PushNotificationFormData {
  title: string;
  message: string;
  recipient: RecipientType;
  recipientSearch: string;
  priority: PriorityType;
}

export function usePushNotification() {
  const { toast } = useToast();
  const [formData, setFormData] = useState<PushNotificationFormData>({
    title: "",
    message: "",
    recipient: "student",
    recipientSearch: "",
    priority: "normal",
  });
  
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState("");
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const errors: Record<string, string> = {};
    
    if (!formData.title.trim()) {
      errors.title = "Il titolo è obbligatorio";
    }
    
    if (!formData.message.trim()) {
      errors.message = "Il messaggio è obbligatorio";
    }
    
    if ((formData.recipient !== "all-students" && formData.recipient !== "all-parents" && formData.recipient !== "all-employees") && 
        !formData.recipientSearch.trim()) {
      errors.recipientSearch = "Inserisci un destinatario";
    }
    
    setValidationErrors(errors);
    
    if (Object.keys(errors).length > 0) {
      setError("Compila tutti i campi obbligatori");
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
      
      // In a real app, you would call an API like:
      // const response = await fetch('/api/notifications/push', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ title, message, recipient, recipientSearch, priority }),
      // });
      // if (!response.ok) throw new Error('Errore durante l\'invio');
      
      setIsSending(false);
      resetForm();
      
      toast({
        title: "Notifica inviata",
        description: "La notifica push è stata inviata con successo",
      });
      
      return true;
    } catch (err) {
      setIsSending(false);
      setError("Si è verificato un errore durante l'invio della notifica");
      
      toast({
        title: "Errore",
        description: "Si è verificato un errore durante l'invio della notifica",
        variant: "destructive",
      });
      
      return false;
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      message: "",
      recipient: "student",
      recipientSearch: "",
      priority: "normal",
    });
    setValidationErrors({});
    setError("");
  };

  const updateFormData = (field: keyof PushNotificationFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return {
    formData,
    updateFormData,
    isSending,
    error,
    validationErrors,
    handleSendPush,
    resetForm
  };
}
