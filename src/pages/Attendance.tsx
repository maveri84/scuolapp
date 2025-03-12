
import React, { useState } from "react";
import DashboardLayout from "@/layouts/DashboardLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { UserCheck, UserX, AlarmClock, ArrowRightFromLine, FileCheck } from "lucide-react";
import AttendanceCard from "@/components/dashboard/AttendanceCard";
import AttendanceForm from "@/components/attendance/AttendanceForm";
import AttendanceRegister from "@/components/attendance/AttendanceRegister";

const Attendance = () => {
  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Gestione Presenze</h1>
        <p className="text-muted-foreground mt-2">
          Gestisci le presenze e le assenze degli studenti
        </p>
      </div>

      <Tabs defaultValue="register" className="space-y-4">
        <TabsList>
          <TabsTrigger value="register">
            <UserCheck className="mr-2 h-4 w-4" />
            Registro Presenze
          </TabsTrigger>
          <TabsTrigger value="new">
            <UserX className="mr-2 h-4 w-4" />
            Nuova Registrazione
          </TabsTrigger>
          <TabsTrigger value="overview">
            <AlarmClock className="mr-2 h-4 w-4" />
            Riepilogo
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="register" className="space-y-4">
          <AttendanceRegister />
        </TabsContent>
        
        <TabsContent value="new" className="space-y-4">
          <AttendanceForm />
        </TabsContent>
        
        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <AttendanceCard />
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Statistiche Assenze</CardTitle>
                <CardDescription>
                  Riepilogo delle assenze mensili
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="h-8 w-8 rounded-full bg-red-100 flex items-center justify-center">
                        <UserX className="h-4 w-4 text-red-600" />
                      </span>
                      <span>Assenze</span>
                    </div>
                    <span className="font-semibold">12</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="h-8 w-8 rounded-full bg-amber-100 flex items-center justify-center">
                        <AlarmClock className="h-4 w-4 text-amber-600" />
                      </span>
                      <span>Ritardi</span>
                    </div>
                    <span className="font-semibold">8</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                        <ArrowRightFromLine className="h-4 w-4 text-blue-600" />
                      </span>
                      <span>Uscite anticipate</span>
                    </div>
                    <span className="font-semibold">5</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
                        <FileCheck className="h-4 w-4 text-green-600" />
                      </span>
                      <span>Giustificazioni</span>
                    </div>
                    <span className="font-semibold">10</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
};

export default Attendance;
