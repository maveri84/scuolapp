
import React from "react";
import DashboardLayout from "@/layouts/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MessageCircle, Calendar, FileText, Clock } from "lucide-react";
import { format } from "date-fns";
import { it } from "date-fns/locale";

// Mock data for leave requests
const mockLeaveRequests = [
  {
    id: 1,
    studentName: "Marco Rossi",
    type: "malattia",
    startDate: "2024-05-15",
    endDate: "2024-05-17",
    status: "approvata",
    requestDate: "2024-05-14",
  },
  {
    id: 2,
    studentName: "Giulia Bianchi",
    type: "visita medica",
    startDate: "2024-05-20",
    endDate: "2024-05-20",
    status: "in attesa",
    requestDate: "2024-05-16",
  },
  {
    id: 3,
    studentName: "Luca Verdi",
    type: "motivi familiari",
    startDate: "2024-05-18",
    endDate: "2024-05-19",
    status: "in attesa",
    requestDate: "2024-05-15",
  },
];

const LeaveRequests = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Richieste Assenze</h1>
        <p className="text-muted-foreground">
          Gestisci le richieste di assenza degli studenti e docenti
        </p>
      </div>

      <Tabs defaultValue="pending" className="space-y-4">
        <TabsList>
          <TabsTrigger value="pending">
            <Clock className="mr-2 h-4 w-4" />
            In Attesa
          </TabsTrigger>
          <TabsTrigger value="approved">
            <Calendar className="mr-2 h-4 w-4" />
            Approvate
          </TabsTrigger>
          <TabsTrigger value="denied">
            <FileText className="mr-2 h-4 w-4" />
            Rifiutate
          </TabsTrigger>
          <TabsTrigger value="all">
            <MessageCircle className="mr-2 h-4 w-4" />
            Tutte
          </TabsTrigger>
        </TabsList>

        <TabsContent value="pending" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Richieste in Attesa</CardTitle>
              <CardDescription>
                Visualizza e gestisci le richieste di assenza in attesa di approvazione
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockLeaveRequests
                  .filter((request) => request.status === "in attesa")
                  .map((request) => (
                    <div key={request.id} className="border rounded-lg p-4 space-y-2">
                      <div className="flex justify-between">
                        <h3 className="font-medium">{request.studentName}</h3>
                        <span className="bg-amber-100 text-amber-800 px-2 py-1 rounded text-xs font-medium">
                          In attesa
                        </span>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div>
                          <span className="text-muted-foreground">Tipo:</span> {request.type}
                        </div>
                        <div>
                          <span className="text-muted-foreground">Data richiesta:</span>{" "}
                          {format(new Date(request.requestDate), "dd/MM/yyyy")}
                        </div>
                        <div>
                          <span className="text-muted-foreground">Data inizio:</span>{" "}
                          {format(new Date(request.startDate), "dd/MM/yyyy")}
                        </div>
                        <div>
                          <span className="text-muted-foreground">Data fine:</span>{" "}
                          {format(new Date(request.endDate), "dd/MM/yyyy")}
                        </div>
                      </div>
                      <div className="flex gap-2 justify-end pt-2">
                        <button className="bg-green-600 text-white px-3 py-1 rounded text-sm">
                          Approva
                        </button>
                        <button className="bg-red-600 text-white px-3 py-1 rounded text-sm">
                          Rifiuta
                        </button>
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="approved" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Richieste Approvate</CardTitle>
              <CardDescription>
                Visualizza le richieste di assenza che sono state approvate
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockLeaveRequests
                  .filter((request) => request.status === "approvata")
                  .map((request) => (
                    <div key={request.id} className="border rounded-lg p-4 space-y-2">
                      <div className="flex justify-between">
                        <h3 className="font-medium">{request.studentName}</h3>
                        <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-medium">
                          Approvata
                        </span>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div>
                          <span className="text-muted-foreground">Tipo:</span> {request.type}
                        </div>
                        <div>
                          <span className="text-muted-foreground">Data richiesta:</span>{" "}
                          {format(new Date(request.requestDate), "dd/MM/yyyy")}
                        </div>
                        <div>
                          <span className="text-muted-foreground">Data inizio:</span>{" "}
                          {format(new Date(request.startDate), "dd/MM/yyyy")}
                        </div>
                        <div>
                          <span className="text-muted-foreground">Data fine:</span>{" "}
                          {format(new Date(request.endDate), "dd/MM/yyyy")}
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="denied" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Richieste Rifiutate</CardTitle>
              <CardDescription>
                Visualizza le richieste di assenza che sono state rifiutate
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center justify-center h-48">
                <p className="text-muted-foreground">Nessuna richiesta rifiutata</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="all" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Tutte le Richieste</CardTitle>
              <CardDescription>Visualizza tutte le richieste di assenza</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockLeaveRequests.map((request) => (
                  <div key={request.id} className="border rounded-lg p-4 space-y-2">
                    <div className="flex justify-between">
                      <h3 className="font-medium">{request.studentName}</h3>
                      <span
                        className={`px-2 py-1 rounded text-xs font-medium ${
                          request.status === "approvata"
                            ? "bg-green-100 text-green-800"
                            : request.status === "rifiutata"
                            ? "bg-red-100 text-red-800"
                            : "bg-amber-100 text-amber-800"
                        }`}
                      >
                        {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <span className="text-muted-foreground">Tipo:</span> {request.type}
                      </div>
                      <div>
                        <span className="text-muted-foreground">Data richiesta:</span>{" "}
                        {format(new Date(request.requestDate), "dd/MM/yyyy")}
                      </div>
                      <div>
                        <span className="text-muted-foreground">Data inizio:</span>{" "}
                        {format(new Date(request.startDate), "dd/MM/yyyy")}
                      </div>
                      <div>
                        <span className="text-muted-foreground">Data fine:</span>{" "}
                        {format(new Date(request.endDate), "dd/MM/yyyy")}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default LeaveRequests;
