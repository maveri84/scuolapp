
import React from "react";
import { Button } from "@/components/ui/button";
import { Loader2, Send } from "lucide-react";

interface SubmitButtonProps {
  isSending: boolean;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({ isSending }) => {
  return (
    <Button type="submit" disabled={isSending}>
      {isSending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Invio in corso...
        </>
      ) : (
        <>
          <Send className="mr-2 h-4 w-4" />
          Invia Notifica
        </>
      )}
    </Button>
  );
};

export default SubmitButton;
