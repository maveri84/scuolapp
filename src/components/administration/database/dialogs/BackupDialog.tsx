
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface BackupDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onBackup: () => void;
}

const BackupDialog: React.FC<BackupDialogProps> = ({ open, onOpenChange, onBackup }) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Backup del database</DialogTitle>
          <DialogDescription>
            Configura le opzioni per il backup del database
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-2">
          <div className="space-y-2">
            <Label htmlFor="backup-name">Nome del backup</Label>
            <Input id="backup-name" defaultValue={`backup_${new Date().toISOString().split('T')[0]}`} />
          </div>
          <div className="space-y-2">
            <Label>Tipo di backup</Label>
            <Select defaultValue="complete">
              <SelectTrigger>
                <SelectValue placeholder="Seleziona tipo di backup" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="complete">Completo</SelectItem>
                <SelectItem value="data-only">Solo dati</SelectItem>
                <SelectItem value="structure-only">Solo struttura</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Compressione</Label>
            <Select defaultValue="gzip">
              <SelectTrigger>
                <SelectValue placeholder="Seleziona compressione" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">Nessuna</SelectItem>
                <SelectItem value="gzip">GZIP</SelectItem>
                <SelectItem value="zip">ZIP</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Annulla</Button>
          <Button onClick={onBackup}>Avvia backup</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default BackupDialog;
