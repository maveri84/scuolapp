
import React, { useState } from "react";
import DashboardLayout from "@/layouts/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import EmailDialog from "@/components/messages/EmailDialog";
import { PushNotificationDialog } from "@/components/messages";
import MessageTabs from "@/components/messages/MessageTabs";

const Messages = () => {
  const [activeTab, setActiveTab] = useState("inbox");
  const [isEmailDialogOpen, setIsEmailDialogOpen] = useState(false);
  const [isPushDialogOpen, setIsPushDialogOpen] = useState(false);
  const [isTemplateDialogOpen, setIsTemplateDialogOpen] = useState(false);

  return (
    <DashboardLayout>
      <div className="flex flex-col space-y-6">
        <div className="flex flex-col space-y-2">
          <h2 className="text-2xl font-bold tracking-tight">Comunicazioni</h2>
          <p className="text-muted-foreground">
            Gestisci tutte le comunicazioni con studenti, genitori e personale scolastico
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <div className="w-full md:w-auto md:flex-1">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Cerca comunicazioni..."
                className="pl-8"
              />
            </div>
          </div>
          <div className="flex flex-row gap-2">
            <EmailDialog isOpen={isEmailDialogOpen} onOpenChange={setIsEmailDialogOpen} />
            <PushNotificationDialog isOpen={isPushDialogOpen} onOpenChange={setIsPushDialogOpen} />
          </div>
        </div>

        <MessageTabs 
          activeTab={activeTab} 
          setActiveTab={setActiveTab} 
          isTemplateDialogOpen={isTemplateDialogOpen}
          setIsTemplateDialogOpen={setIsTemplateDialogOpen}
        />
      </div>
    </DashboardLayout>
  );
};

export default Messages;
