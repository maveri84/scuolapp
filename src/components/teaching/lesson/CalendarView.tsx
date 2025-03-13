
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { CalendarIcon } from "lucide-react";

const CalendarView: React.FC = () => {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="text-center py-10">
          <CalendarIcon className="mx-auto h-12 w-12 text-muted-foreground" />
          <h3 className="mt-2 text-lg font-medium text-gray-900">Vista Calendario</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            La visualizzazione calendario delle lezioni programmate sarà disponibile nella prossima versione.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default CalendarView;
