
import React, { useState } from "react";
import { TabsContent } from "@/components/ui/tabs";
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
import TeachingTab from "@/components/administration/TeachingTab";
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

const Administration: React.FC = () => {
  const [activeTab, setActiveTab] = useState("students");

  return (
    <DashboardLayout>
      <AdministrationHeader />

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
              <p className="text-center py-8 text-muted-foreground">
                Qui apparirà l'elenco dei documenti protocollati
              </p>
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
    </DashboardLayout>
  );
};

export default Administration;
