
import React from "react";
import { Button } from "@/components/ui/button";
import { Save, X, Loader2 } from "lucide-react";

interface FormActionsProps {
  onSubmit: (e: React.FormEvent) => void;
  isSubmitting?: boolean;
}

const FormActions: React.FC<FormActionsProps> = ({ onSubmit, isSubmitting = false }) => {
  return (
    <div className="flex justify-end gap-4 w-full">
      <Button type="button" variant="outline">
        <X className="mr-2 h-4 w-4" />
        Annulla
      </Button>
      
      <Button 
        onClick={onSubmit} 
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Salvataggio...
          </>
        ) : (
          <>
            <Save className="mr-2 h-4 w-4" />
            Salva
          </>
        )}
      </Button>
    </div>
  );
};

export default FormActions;
