
import React, { useState } from "react";
import { useToast } from "@/hooks/use-toast";

// Import components
import DatabaseStatusCards from "./database/DatabaseStatusCards";
import DatabaseTableStatus from "./database/DatabaseTableStatus";
import DatabaseAccessManagement from "./database/DatabaseAccessManagement";
import BackupDialog from "./database/dialogs/BackupDialog";
import RestoreDialog from "./database/dialogs/RestoreDialog";
import ConfigDialog from "./database/dialogs/ConfigDialog";

const DatabaseTab: React.FC = () => {
  const [isBackupDialogOpen, setIsBackupDialogOpen] = useState(false);
  const [isRestoreDialogOpen, setIsRestoreDialogOpen] = useState(false);
  const [isConfigDialogOpen, setIsConfigDialogOpen] = useState(false);
  const { toast } = useToast();

  const handleBackup = () => {
    setIsBackupDialogOpen(false);
    toast({
      title: "Backup avviato",
      description: "Il backup del database è stato avviato. Riceverai una notifica al termine.",
    });
    // Simulazione del backup
    setTimeout(() => {
      toast({
        title: "Backup completato",
        description: "Il backup del database è stato completato con successo.",
      });
    }, 3000);
  };

  const handleRestore = () => {
    setIsRestoreDialogOpen(false);
    toast({
      title: "Ripristino avviato",
      description: "Il ripristino del database è stato avviato. Riceverai una notifica al termine.",
    });
    // Simulazione del ripristino
    setTimeout(() => {
      toast({
        title: "Ripristino completato",
        description: "Il database è stato ripristinato con successo.",
      });
    }, 4000);
  };

  const handleSaveConfig = () => {
    setIsConfigDialogOpen(false);
    toast({
      title: "Configurazione salvata",
      description: "Le impostazioni del database sono state aggiornate.",
    });
  };

  return (
    <div className="space-y-6">
      <DatabaseStatusCards 
        onOpenBackupDialog={() => setIsBackupDialogOpen(true)} 
        onOpenRestoreDialog={() => setIsRestoreDialogOpen(true)} 
        onOpenConfigDialog={() => setIsConfigDialogOpen(true)} 
      />
      
      <DatabaseTableStatus />
      
      <DatabaseAccessManagement />
      
      {/* Dialogs */}
      <BackupDialog 
        open={isBackupDialogOpen} 
        onOpenChange={setIsBackupDialogOpen} 
        onBackup={handleBackup} 
      />
      
      <RestoreDialog 
        open={isRestoreDialogOpen} 
        onOpenChange={setIsRestoreDialogOpen} 
        onRestore={handleRestore} 
      />
      
      <ConfigDialog 
        open={isConfigDialogOpen} 
        onOpenChange={setIsConfigDialogOpen} 
        onSaveConfig={handleSaveConfig} 
      />
    </div>
  );
};

export default DatabaseTab;
