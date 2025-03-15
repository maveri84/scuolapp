
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AlertTriangle } from "lucide-react";

interface RestoreDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onRestore: () => void;
}

const RestoreDialog: React.FC<RestoreDialogProps> = ({ open, onOpenChange, onRestore }) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Ripristino database</DialogTitle>
          <DialogDescription>
            Seleziona un backup da ripristinare
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-2">
          <div className="space-y-2">
            <Label>Backup disponibili</Label>
            <Select defaultValue="today">
              <SelectTrigger>
                <SelectValue placeholder="Seleziona backup" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="today">Oggi, 08:00 (4.2 GB)</SelectItem>
                <SelectItem value="yesterday">Ieri, 20:00 (4.1 GB)</SelectItem>
                <SelectItem value="week">Una settimana fa (3.9 GB)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Opzioni di ripristino</Label>
            <Select defaultValue="replace">
              <SelectTrigger>
                <SelectValue placeholder="Seleziona opzione" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="replace">Sostituisci database esistente</SelectItem>
                <SelectItem value="merge">Unisci con database esistente</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="rounded-md bg-amber-50 p-3 text-sm text-amber-800">
            <AlertTriangle className="h-4 w-4 inline-block mr-2" />
            Attenzione: il ripristino sovrascriverà i dati attuali. Procedi solo se sei sicuro.
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Annulla</Button>
          <Button variant="destructive" onClick={onRestore}>Ripristina database</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default RestoreDialog;
