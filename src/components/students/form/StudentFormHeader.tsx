
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Save } from "lucide-react";

interface StudentFormHeaderProps {
  isSubmitting: boolean;
  onCancel: () => void;
  onSubmit: () => void;
}

const StudentFormHeader: React.FC<StudentFormHeaderProps> = ({
  isSubmitting,
  onCancel,
  onSubmit,
}) => {
  return (
    <div className="flex items-center justify-between">
      <Button variant="outline" onClick={onCancel}>
        <ArrowLeft className="mr-2 h-4 w-4" />
        Torna alla lista
      </Button>
      <Button onClick={onSubmit} disabled={isSubmitting}>
        <Save className="mr-2 h-4 w-4" />
        {isSubmitting ? "Salvataggio..." : "Salva Studente"}
      </Button>
    </div>
  );
};

export default StudentFormHeader;
