
import React, { useState } from "react";
import { Tabs, TabsContent } from "@/components/ui/tabs";
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
import ProtocolTab from "@/components/administration/protocol/ProtocolTab";
import RejectionDialog from "@/components/administration/RejectionDialog";

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
            <ProtocolTab />
          </TabsContent>

          <TabsContent value="database" className="space-y-4">
            <DatabaseTab />
          </TabsContent>
          
          <TabsContent value="teaching" className="space-y-4">
            <TeachingTab />
          </TabsContent>
        </div>
      </Tabs>

      <RejectionDialog
        open={rejectionDialogOpen}
        onOpenChange={setRejectionDialogOpen}
        rejectionReason={rejectionReason}
        setRejectionReason={setRejectionReason}
        onConfirm={confirmRejection}
      />
    </DashboardLayout>
  );
};

export default Administration;
