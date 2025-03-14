
import React from "react";
import DashboardLayout from "@/layouts/DashboardLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import CalendarView from "@/components/teaching/lesson/CalendarView";
import { CalendarDays, Users, School } from "lucide-react";

const Calendar = () => {
  return (
    <DashboardLayout>
      <div className="flex flex-col space-y-2 mb-6">
        <h2 className="text-3xl font-bold tracking-tight">Calendario</h2>
        <p className="text-muted-foreground">
          Gestisci eventi, riunioni, colloqui e chiusure dell'istituto
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Calendario Scolastico</CardTitle>
          <CardDescription>
            Visualizza e gestisci tutti gli eventi dell'istituto
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all">
            <TabsList className="mb-4">
              <TabsTrigger value="all">
                <CalendarDays className="mr-2 h-4 w-4" />
                Tutti gli eventi
              </TabsTrigger>
              <TabsTrigger value="meetings">
                <Users className="mr-2 h-4 w-4" />
                Riunioni e colloqui
              </TabsTrigger>
              <TabsTrigger value="closures">
                <School className="mr-2 h-4 w-4" />
                Chiusure scolastiche
              </TabsTrigger>
            </TabsList>

            <TabsContent value="all">
              <CalendarView />
            </TabsContent>
            
            <TabsContent value="meetings">
              <CalendarView />
            </TabsContent>
            
            <TabsContent value="closures">
              <CalendarView />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
};

export default Calendar;
