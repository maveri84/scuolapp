
import React from "react";
import { Button } from "@/components/ui/button";
import { PlusCircle, Upload } from "lucide-react";

interface ActionButtonsProps {
  onUpload: () => void;
}

export const ActionButtons: React.FC<ActionButtonsProps> = ({ onUpload }) => {
  return (
    <div className="flex items-center gap-2">
      <Button variant="outline">
        <PlusCircle className="mr-2 h-4 w-4" />
        Nuovo corso
      </Button>
      <Button onClick={onUpload}>
        <Upload className="mr-2 h-4 w-4" />
        Carica materiale
      </Button>
    </div>
  );
};
