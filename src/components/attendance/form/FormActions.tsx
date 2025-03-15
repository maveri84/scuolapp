
import React from "react";
import { Button } from "@/components/ui/button";

interface FormActionsProps {
  onCancel?: () => void;
  onSubmit: (e: React.FormEvent) => void;
}

const FormActions: React.FC<FormActionsProps> = ({ onCancel, onSubmit }) => {
  return (
    <div className="flex justify-end space-x-2">
      <Button variant="outline" type="button" onClick={onCancel}>
        Annulla
      </Button>
      <Button type="submit" onClick={onSubmit}>
        Salva Registrazione
      </Button>
    </div>
  );
};

export default FormActions;
