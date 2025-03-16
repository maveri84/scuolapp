
import React from "react";
import { Button } from "@/components/ui/button";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { Bell } from "lucide-react";
import { usePushNotification } from "./usePushNotification";
import PushNotificationForm from "./PushNotificationForm";
import SubmitButton from "./SubmitButton";

interface PushNotificationDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

const PushNotificationDialog: React.FC<PushNotificationDialogProps> = ({ isOpen, onOpenChange }) => {
  const {
    formData,
    updateFormData,
    isSending,
    error,
    validationErrors,
    handleSendPush,
    resetForm
  } = usePushNotification();

  const handleFormSubmit = async (e: React.FormEvent) => {
    const success = await handleSendPush(e);
    if (success) {
      onOpenChange(false);
    }
  };

  // Reset form when dialog is closed
  React.useEffect(() => {
    if (!isOpen) {
      resetForm();
    }
  }, [isOpen, resetForm]);

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
        <form onSubmit={handleFormSubmit}>
          <PushNotificationForm
            title={formData.title}
            message={formData.message}
            recipient={formData.recipient}
            recipientSearch={formData.recipientSearch}
            priority={formData.priority}
            validationErrors={validationErrors}
            error={error}
            onChange={updateFormData}
          />
          
          <DialogFooter>
            <SubmitButton isSending={isSending} />
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default PushNotificationDialog;
