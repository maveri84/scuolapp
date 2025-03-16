
import React from "react";
import { Button } from "@/components/ui/button";
import { Mail, MessageCircle } from "lucide-react";
import EmailDialog from "./EmailDialog";
import PushNotificationDialog from "@/components/messages/PushNotificationDialog";

interface ActionButtonsProps {
  isEmailDialogOpen: boolean;
  setIsEmailDialogOpen: (open: boolean) => void;
  isMessageDialogOpen: boolean;
  setIsMessageDialogOpen: (open: boolean) => void;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({
  isEmailDialogOpen,
  setIsEmailDialogOpen,
  isMessageDialogOpen,
  setIsMessageDialogOpen
}) => {
  return (
    <div className="flex flex-wrap gap-4">
      <Button variant="outline" onClick={() => setIsEmailDialogOpen(true)}>
        <Mail className="mr-2 h-4 w-4" />
        Nuova Email
      </Button>
      
      <EmailDialog 
        isOpen={isEmailDialogOpen} 
        onOpenChange={setIsEmailDialogOpen} 
      />

      <Button variant="outline" onClick={() => setIsMessageDialogOpen(true)}>
        <MessageCircle className="mr-2 h-4 w-4" />
        Nuovo Messaggio
      </Button>
      
      <PushNotificationDialog 
        isOpen={isMessageDialogOpen} 
        onOpenChange={setIsMessageDialogOpen} 
      />
    </div>
  );
};

export default ActionButtons;
