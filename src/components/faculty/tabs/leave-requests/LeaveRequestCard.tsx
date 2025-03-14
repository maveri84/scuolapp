
import React from "react";
import { format } from "date-fns";
import { 
  LeaveRequest, 
  leaveTypeDetails
} from "../../types/leave-requests";
import { 
  CalendarRange,
  FilePlus 
} from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

// Translation map for leave request status
const statusTranslations: Record<string, { label: string, color: string }> = {
  pending: { label: "In attesa", color: "bg-amber-500" },
  approved: { label: "Approvata", color: "bg-green-500" },
  rejected: { label: "Respinta", color: "bg-red-500" },
  canceled: { label: "Annullata", color: "bg-gray-500" },
};

interface LeaveRequestCardProps {
  request: LeaveRequest;
  onCancel: (requestId: string) => void;
}

const LeaveRequestCard: React.FC<LeaveRequestCardProps> = ({ request, onCancel }) => {
  return (
    <Card key={request.id} className="overflow-hidden">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-base font-medium">
            {leaveTypeDetails[request.type].label}
          </CardTitle>
          <Badge 
            className={statusTranslations[request.status].color + " text-white"}
          >
            {statusTranslations[request.status].label}
          </Badge>
        </div>
        <CardDescription>
          Richiesta del {format(new Date(request.submissionDate), "dd/MM/yyyy")}
        </CardDescription>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="space-y-2">
          <div className="flex items-center text-sm">
            <CalendarRange className="h-4 w-4 mr-2 text-muted-foreground" />
            <span>
              Dal {format(new Date(request.startDate), "dd/MM/yyyy")} al{" "}
              {format(new Date(request.endDate), "dd/MM/yyyy")}
            </span>
          </div>
          <p className="text-sm">{request.description}</p>
          {request.attachments.length > 0 && (
            <div className="pt-2">
              <span className="text-xs font-medium">Allegati:</span>
              <ul className="mt-1">
                {request.attachments.map((att) => (
                  <li key={att.id} className="flex items-center text-xs">
                    <FilePlus className="h-3 w-3 mr-1 text-muted-foreground" />
                    <a href={att.fileUrl} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline truncate">
                      {att.fileName}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="pt-2">
        <div className="flex gap-2 justify-end w-full">
          {request.status === "pending" && (
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => onCancel(request.id)}
            >
              Annulla
            </Button>
          )}
          <Button variant="outline" size="sm">Dettagli</Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default LeaveRequestCard;
