
import React from "react";
import { Calendar } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const EmptyLeaveRequests: React.FC = () => {
  return (
    <Card className="border-dashed">
      <CardContent className="flex flex-col items-center justify-center p-6 text-center">
        <Calendar className="h-10 w-10 text-muted-foreground mb-4" />
        <h3 className="font-medium text-lg mb-2">Nessuna richiesta</h3>
        <p className="text-muted-foreground text-sm max-w-md">
          Non hai ancora effettuato richieste di assenza. Clicca su "Nuova Richiesta" per iniziare.
        </p>
      </CardContent>
    </Card>
  );
};

export default EmptyLeaveRequests;
