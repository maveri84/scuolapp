
import React, { useState } from "react";
import { Card, CardHeader, CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import { ActionButtons, MessageTable } from "./communications";

const CommunicationsTab: React.FC = () => {
  const [isEmailDialogOpen, setIsEmailDialogOpen] = useState(false);
  const [isMessageDialogOpen, setIsMessageDialogOpen] = useState(false);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Comunicazioni Dirette</CardTitle>
        <CardDescription>Gestione delle comunicazioni con la famiglia</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <ActionButtons
            isEmailDialogOpen={isEmailDialogOpen}
            setIsEmailDialogOpen={setIsEmailDialogOpen}
            isMessageDialogOpen={isMessageDialogOpen}
            setIsMessageDialogOpen={setIsMessageDialogOpen}
          />

          <MessageTable />
        </div>
      </CardContent>
    </Card>
  );
};

export default CommunicationsTab;
