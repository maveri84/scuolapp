
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import DashboardLayout from "@/layouts/DashboardLayout";
import AdministrationHeader from "@/components/administration/AdministrationHeader";
import AdministrationTabs from "@/components/administration/AdministrationTabs";
import StudentsTab from "@/components/administration/StudentsTab";
import PersonnelTab from "@/components/administration/PersonnelTab";
import CalendarTab from "@/components/administration/CalendarTab";
import DocumentsTab from "@/components/administration/DocumentsTab";
import CertificateManager from "@/components/administration/CertificateManager";
import DatabaseTab from "@/components/administration/DatabaseTab";
import { TeachingTab } from "@/components/administration/teaching";
import { Badge } from "@/components/ui/badge";
import {
  BookOpen,
  Calendar,
  FileText,
  Shield,
  UserCog,
  Users,
  Mail,
  Database,
  FileBox,
  Send,
  MailOpen,
  CheckSquare,
  Stamp,
  FolderArchive,
  HardDrive
} from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";

const Administration: React.FC = () => {
  const [activeTab, setActiveTab] = useState("students");
  const [rejectionDialogOpen, setRejectionDialogOpen] = useState(false);
  const [rejectionReason, setRejectionReason] = useState("");
  const [selectedRequestId, setSelectedRequestId] = useState<number | null>(null);

  const handleApprove = (id: number) => {
    console.log(`Request ${id} approved`);
    // Here you would normally update the request status in your data
  };

  const handleReject = (id: number) => {
    setSelectedRequestId(id);
    setRejectionDialogOpen(true);
  };

  const confirmRejection = () => {
    console.log(`Request ${selectedRequestId} rejected with reason: ${rejectionReason}`);
    // Here you would normally update the request status in your data
    setRejectionDialogOpen(false);
    setRejectionReason("");
    setSelectedRequestId(null);
  };

  return (
    <DashboardLayout>
      <AdministrationHeader />

      <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-4">
        <AdministrationTabs activeTab={activeTab} setActiveTab={setActiveTab} />

        <div className="mt-4">
          <TabsContent value="students" className="space-y-4">
            <StudentsTab />
          </TabsContent>

          <TabsContent value="personnel" className="space-y-4">
            <PersonnelTab />
          </TabsContent>

          <TabsContent value="calendar" className="space-y-4">
            <CalendarTab />
          </TabsContent>

          <TabsContent value="documents" className="space-y-4">
            <DocumentsTab />
          </TabsContent>

          <TabsContent value="certificates" className="space-y-4">
            <CertificateManager />
          </TabsContent>

          <TabsContent value="protocol" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span className="flex items-center">
                      <Mail className="mr-2 h-5 w-5" /> Importazione Email
                    </span>
                    <Badge variant="outline">24 nuove</Badge>
                  </CardTitle>
                  <CardDescription>Importa e protocolla email da PEO e PEC</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <Button className="w-full justify-start" variant="outline">
                      <MailOpen className="mr-2 h-4 w-4" /> PEO Istituzionale
                    </Button>
                    <Button className="w-full justify-start" variant="outline">
                      <Send className="mr-2 h-4 w-4" /> PEC Istituzionale
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span className="flex items-center">
                      <FileBox className="mr-2 h-5 w-5" /> Protocollo
                    </span>
                    <Badge variant="outline">103 documenti</Badge>
                  </CardTitle>
                  <CardDescription>Gestione del protocollo in entrata e uscita</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <Button className="w-full justify-start" variant="outline">
                      <CheckSquare className="mr-2 h-4 w-4" /> Protocolla Documento
                    </Button>
                    <Button className="w-full justify-start" variant="outline">
                      <Stamp className="mr-2 h-4 w-4" /> Applica Timbro
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span className="flex items-center">
                      <FolderArchive className="mr-2 h-5 w-5" /> Fascicolazione
                    </span>
                    <Badge variant="outline">18 fascicoli</Badge>
                  </CardTitle>
                  <CardDescription>Organizza i documenti in fascicoli</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <Button className="w-full justify-start" variant="outline">
                      <FileText className="mr-2 h-4 w-4" /> Crea Fascicolo
                    </Button>
                    <Button className="w-full justify-start" variant="outline">
                      <HardDrive className="mr-2 h-4 w-4" /> Archivio Fascicoli
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Registro di Protocollo</CardTitle>
                <CardDescription>Ultimi documenti protocollati</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-muted/50">
                        <th className="p-2 text-left text-sm font-medium">ID</th>
                        <th className="p-2 text-left text-sm font-medium">Oggetto</th>
                        <th className="p-2 text-left text-sm font-medium">Data</th>
                        <th className="p-2 text-left text-sm font-medium">Mittente</th>
                        <th className="p-2 text-left text-sm font-medium">Tipo</th>
                        <th className="p-2 text-left text-sm font-medium">Azioni</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        {
                          id: "2024/0001",
                          subject: "Convocazione collegio docenti",
                          date: "15/05/2024",
                          sender: "Dirigente Scolastico",
                          type: "Uscita"
                        },
                        {
                          id: "2024/0002",
                          subject: "Richiesta materiale didattico",
                          date: "14/05/2024",
                          sender: "Prof. Bianchi",
                          type: "Entrata"
                        },
                        {
                          id: "2024/0003",
                          subject: "Comunicazione USR",
                          date: "12/05/2024",
                          sender: "USR Lombardia",
                          type: "Entrata"
                        }
                      ].map((doc) => (
                        <tr key={doc.id} className="border-t">
                          <td className="p-2 text-sm">{doc.id}</td>
                          <td className="p-2 text-sm">{doc.subject}</td>
                          <td className="p-2 text-sm">{doc.date}</td>
                          <td className="p-2 text-sm">{doc.sender}</td>
                          <td className="p-2 text-sm">
                            <Badge variant={doc.type === "Entrata" ? "outline" : "secondary"}>
                              {doc.type}
                            </Badge>
                          </td>
                          <td className="p-2 text-sm">
                            <div className="flex space-x-2">
                              <Button variant="ghost" size="sm">
                                <FileText className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="sm">
                                <Stamp className="h-4 w-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="database" className="space-y-4">
            <DatabaseTab />
          </TabsContent>
          
          <TabsContent value="teaching" className="space-y-4">
            <TeachingTab />
          </TabsContent>
        </div>
      </Tabs>

      <Dialog open={rejectionDialogOpen} onOpenChange={setRejectionDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Motivo del rifiuto</DialogTitle>
            <DialogDescription>
              Inserisci il motivo per cui stai rifiutando questa richiesta.
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
    </DashboardLayout>
  );
};

export default Administration;
