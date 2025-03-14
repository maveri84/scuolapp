
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Save } from "lucide-react";

interface FacultyActionBarProps {
  onBack: () => void;
  onSave: () => void;
}

const FacultyActionBar: React.FC<FacultyActionBarProps> = ({ onBack, onSave }) => {
  return (
    <div className="flex items-center justify-between">
      <Button variant="outline" onClick={onBack}>
        <ArrowLeft className="mr-2 h-4 w-4" />
        Torna alla lista
      </Button>
      <Button onClick={onSave}>
        <Save className="mr-2 h-4 w-4" />
        Salva
      </Button>
    </div>
  );
};

export default FacultyActionBar;
