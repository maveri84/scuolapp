
import React from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";

interface RejectionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  rejectionReason: string;
  setRejectionReason: (reason: string) => void;
  onConfirm: () => void;
}

const RejectionDialog: React.FC<RejectionDialogProps> = ({
  open,
  onOpenChange,
  rejectionReason,
  setRejectionReason,
  onConfirm
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Motivo del rifiuto</DialogTitle>
          <DialogDescription>
            Inserisci il motivo per cui stai rifiutando questa richiesta.
          </DialogDescription>
        </DialogHeader>
        <Textarea
          value={rejectionReason}
          onChange={(e) => setRejectionReason(e.target.value)}
          placeholder="Inserisci il motivo del rifiuto..."
          className="min-h-[100px]"
        />
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Annulla
          </Button>
          <Button onClick={onConfirm}>
            Conferma rifiuto
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default RejectionDialog;
