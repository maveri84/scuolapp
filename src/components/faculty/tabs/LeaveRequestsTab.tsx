
import React, { useState } from "react";
import { format } from "date-fns";
import { useTeacher } from "../context/TeacherContext";
import { 
  LeaveRequest, 
  LeaveRequestType, 
  mockLeaveRequests,
  leaveTypesByContract,
  ContractType
} from "../types/leave-requests";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import LeaveRequestForm, { LeaveRequestFormValues } from "./leave-requests/LeaveRequestForm";
import LeaveRequestCard from "./leave-requests/LeaveRequestCard";
import EmptyLeaveRequests from "./leave-requests/EmptyLeaveRequests";

interface LeaveRequestsTabProps {
  teacherId: string;
}

const LeaveRequestsTab: React.FC<LeaveRequestsTabProps> = ({ teacherId }) => {
  const { teacher } = useTeacher();
  const [leaveRequests, setLeaveRequests] = useState<LeaveRequest[]>(
    mockLeaveRequests.filter(req => req.teacherId === teacherId)
  );
  const [isNewRequestOpen, setIsNewRequestOpen] = useState(false);
  const { toast } = useToast();

  const contractType = teacher.contractType as ContractType || "Tempo Determinato";
  const availableLeaveTypes = leaveTypesByContract[contractType] || [];

  const handleSubmitRequest = (data: LeaveRequestFormValues, uploadedFiles: File[]) => {
    // Create a new leave request
    const newRequest: LeaveRequest = {
      id: `lr${Date.now()}`,
      teacherId: teacher.id,
      type: data.type as LeaveRequestType,
      startDate: format(data.startDate, "yyyy-MM-dd"),
      endDate: format(data.endDate, "yyyy-MM-dd"),
      status: "pending",
      description: data.description,
      submissionDate: format(new Date(), "yyyy-MM-dd"),
      attachments: uploadedFiles.map((file, index) => ({
        id: `att${Date.now()}-${index}`,
        fileName: file.name,
        fileSize: file.size,
        uploadDate: format(new Date(), "yyyy-MM-dd"),
        fileUrl: "#"
      }))
    };

    // Add the new request to the list
    setLeaveRequests(prev => [...prev, newRequest]);
    
    // Reset and close dialog
    setIsNewRequestOpen(false);
    
    // Show success toast
    toast({
      title: "Richiesta inviata",
      description: "La tua richiesta è stata inviata con successo.",
    });
  };

  const handleCancelRequest = (requestId: string) => {
    setLeaveRequests(prev => 
      prev.map(r => r.id === requestId ? {...r, status: "canceled"} : r)
    );
    toast({
      title: "Richiesta annullata",
      description: "La tua richiesta è stata annullata con successo.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Richieste e Assenze</h2>
          <p className="text-muted-foreground">
            Gestisci le tue richieste di assenza ai sensi del CCNL Istruzione e Ricerca.
          </p>
        </div>
        <Dialog open={isNewRequestOpen} onOpenChange={setIsNewRequestOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Nuova Richiesta
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Nuova Richiesta di Assenza</DialogTitle>
              <DialogDescription>
                Inserisci i dettagli per la tua richiesta di assenza. 
                I campi contrassegnati con * sono obbligatori.
              </DialogDescription>
            </DialogHeader>
            
            <LeaveRequestForm
              contractType={contractType}
              teacherId={teacherId}
              availableLeaveTypes={availableLeaveTypes}
              onSubmit={handleSubmitRequest}
              onCancel={() => setIsNewRequestOpen(false)}
            />
          </DialogContent>
        </Dialog>
      </div>
      
      {leaveRequests.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {leaveRequests.map((request) => (
            <LeaveRequestCard 
              key={request.id}
              request={request}
              onCancel={handleCancelRequest}
            />
          ))}
        </div>
      ) : (
        <EmptyLeaveRequests />
      )}
    </div>
  );
};

export default LeaveRequestsTab;
