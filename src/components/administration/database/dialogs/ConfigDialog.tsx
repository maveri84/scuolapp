
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface ConfigDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSaveConfig: () => void;
}

const ConfigDialog: React.FC<ConfigDialogProps> = ({ open, onOpenChange, onSaveConfig }) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Configurazione database</DialogTitle>
          <DialogDescription>
            Modifica i parametri di connessione al database
          </DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-2 gap-4 py-2">
          <div className="space-y-2">
            <Label htmlFor="db-host">Host</Label>
            <Input id="db-host" defaultValue="db.schoolapp.it" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="db-port">Porta</Label>
            <Input id="db-port" defaultValue="3306" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="db-name">Nome database</Label>
            <Input id="db-name" defaultValue="scuola_db" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="db-user">Utente</Label>
            <Input id="db-user" defaultValue="admin_scuola" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="db-password">Password</Label>
            <Input id="db-password" type="password" defaultValue="********" />
          </div>
          <div className="space-y-2">
            <Label>Tipo database</Label>
            <Select defaultValue="mysql">
              <SelectTrigger>
                <SelectValue placeholder="Seleziona tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="mysql">MySQL</SelectItem>
                <SelectItem value="postgres">PostgreSQL</SelectItem>
                <SelectItem value="mssql">SQL Server</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2 col-span-2">
            <Label>Parametri connessione aggiuntivi</Label>
            <Input defaultValue="charset=utf8mb4&timeout=60" />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Annulla</Button>
          <Button onClick={onSaveConfig}>Salva configurazione</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ConfigDialog;
