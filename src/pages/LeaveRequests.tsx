
import React, { useState } from "react";
import DashboardLayout from "@/layouts/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MessageCircle, Calendar, FileText, Clock, Check, X } from "lucide-react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

// Mock data for leave requests
const initialLeaveRequests = [
  {
    id: 1,
    studentName: "Marco Rossi",
    type: "malattia",
    startDate: "2024-05-15",
    endDate: "2024-05-17",
    status: "approvata",
    requestDate: "2024-05-14",
    rejectionReason: ""
  },
  {
    id: 2,
    studentName: "Giulia Bianchi",
    type: "visita medica",
    startDate: "2024-05-20",
    endDate: "2024-05-20",
    status: "in attesa",
    requestDate: "2024-05-16",
    rejectionReason: ""
  },
  {
    id: 3,
    studentName: "Luca Verdi",
    type: "motivi familiari",
    startDate: "2024-05-18",
    endDate: "2024-05-19",
    status: "in attesa",
    requestDate: "2024-05-15",
    rejectionReason: ""
  },
  {
    id: 4,
    studentName: "Sofia Neri",
    type: "visita specialistica",
    startDate: "2024-05-22",
    endDate: "2024-05-22",
    status: "in attesa",
    requestDate: "2024-05-17",
    rejectionReason: ""
  },
];

const LeaveRequests = () => {
  const [leaveRequests, setLeaveRequests] = useState(initialLeaveRequests);
  const [activeTab, setActiveTab] = useState("pending");
  const [rejectionDialogOpen, setRejectionDialogOpen] = useState(false);
  const [rejectionReason, setRejectionReason] = useState("");
  const [selectedRequestId, setSelectedRequestId] = useState<number | null>(null);
  const { toast } = useToast();

  const handleApprove = (id: number) => {
    setLeaveRequests(prev => 
      prev.map(request => 
        request.id === id ? { ...request, status: "approvata" } : request
      )
    );
    
    toast({
      title: "Richiesta approvata",
      description: "La richiesta di assenza è stata approvata con successo.",
    });
  };

  const handleReject = (id: number) => {
    setSelectedRequestId(id);
    setRejectionDialogOpen(true);
  };

  const confirmRejection = () => {
    if (!rejectionReason.trim()) {
      toast({
        title: "Errore",
        description: "È necessario inserire un motivo per il rifiuto.",
        variant: "destructive"
      });
      return;
    }
    
    setLeaveRequests(prev => 
      prev.map(request => 
        request.id === selectedRequestId 
          ? { ...request, status: "rifiutata", rejectionReason } 
          : request
      )
    );
    
    toast({
      title: "Richiesta rifiutata",
      description: "La richiesta di assenza è stata rifiutata.",
    });
    
    setRejectionDialogOpen(false);
    setRejectionReason("");
    setSelectedRequestId(null);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight">Richieste Assenze</h1>
          <p className="text-muted-foreground">
            Gestisci le richieste di assenza degli studenti e docenti
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
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
                  {leaveRequests
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
                          <Button 
                            onClick={() => handleApprove(request.id)}
                            className="bg-green-600 hover:bg-green-700 text-white"
                          >
                            <Check className="mr-2 h-4 w-4" /> Approva
                          </Button>
                          <Button 
                            onClick={() => handleReject(request.id)}
                            className="bg-red-600 hover:bg-red-700 text-white"
                          >
                            <X className="mr-2 h-4 w-4" /> Rifiuta
                          </Button>
                        </div>
                      </div>
                    ))}
                    
                  {leaveRequests.filter(req => req.status === "in attesa").length === 0 && (
                    <div className="flex flex-col items-center justify-center h-48">
                      <p className="text-muted-foreground">Nessuna richiesta in attesa</p>
                    </div>
                  )}
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
                  {leaveRequests
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
                    
                  {leaveRequests.filter(req => req.status === "approvata").length === 0 && (
                    <div className="flex flex-col items-center justify-center h-48">
                      <p className="text-muted-foreground">Nessuna richiesta approvata</p>
                    </div>
                  )}
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
                <div className="space-y-4">
                  {leaveRequests
                    .filter((request) => request.status === "rifiutata")
                    .map((request) => (
                      <div key={request.id} className="border rounded-lg p-4 space-y-2">
                        <div className="flex justify-between">
                          <h3 className="font-medium">{request.studentName}</h3>
                          <span className="bg-red-100 text-red-800 px-2 py-1 rounded text-xs font-medium">
                            Rifiutata
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
                        {request.rejectionReason && (
                          <div className="mt-2 p-2 bg-red-50 rounded-md">
                            <p className="text-sm font-medium text-red-800">Motivo del rifiuto:</p>
                            <p className="text-sm text-red-700">{request.rejectionReason}</p>
                          </div>
                        )}
                      </div>
                    ))}
                    
                  {leaveRequests.filter(req => req.status === "rifiutata").length === 0 && (
                    <div className="flex flex-col items-center justify-center h-48">
                      <p className="text-muted-foreground">Nessuna richiesta rifiutata</p>
                    </div>
                  )}
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
                  {leaveRequests.map((request) => (
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
                      {request.status === "rifiutata" && request.rejectionReason && (
                        <div className="mt-2 p-2 bg-red-50 rounded-md">
                          <p className="text-sm font-medium text-red-800">Motivo del rifiuto:</p>
                          <p className="text-sm text-red-700">{request.rejectionReason}</p>
                        </div>
                      )}
                      {request.status === "in attesa" && (
                        <div className="flex gap-2 justify-end pt-2">
                          <Button 
                            onClick={() => handleApprove(request.id)} 
                            size="sm"
                            className="bg-green-600 hover:bg-green-700 text-white"
                          >
                            <Check className="mr-2 h-4 w-4" /> Approva
                          </Button>
                          <Button 
                            onClick={() => handleReject(request.id)} 
                            size="sm"
                            className="bg-red-600 hover:bg-red-700 text-white"
                          >
                            <X className="mr-2 h-4 w-4" /> Rifiuta
                          </Button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <Dialog open={rejectionDialogOpen} onOpenChange={setRejectionDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Motivo del rifiuto</DialogTitle>
              <DialogDescription>
                Inserisci il motivo per cui stai rifiutando questa richiesta di assenza.
              </DialogDescription>
            </DialogHeader>
            <Textarea
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
              placeholder="Inserisci il motivo del rifiuto..."
              className="min-h-[100px]"
            />
            <DialogFooter>
              <Button variant="outline" onClick={() => setRejectionDialogOpen(false)}>
                Annulla
              </Button>
              <Button onClick={confirmRejection}>
                Conferma rifiuto
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
};

export default LeaveRequests;
