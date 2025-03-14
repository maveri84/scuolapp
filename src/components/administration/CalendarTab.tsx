
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const CalendarTab: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Calendario Scolastico</CardTitle>
        <CardDescription>
          Gestione dell'anno scolastico, festività e chiusure programmate
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Anno Scolastico</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Configura le date di inizio e fine dell'anno scolastico
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Festività</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Gestisci festività nazionali e locali
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Chiusure</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Pianifica chiusure straordinarie dell'istituto
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Eventi</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Gestisci eventi e attività scolastiche
              </p>
            </CardContent>
          </Card>
        </div>
      </CardContent>
    </Card>
  );
};

export default CalendarTab;
