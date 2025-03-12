
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, Download, Upload } from "lucide-react";
import { toast } from "sonner";

interface ImportStudentsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onImport: (students: any[]) => void;
}

const ImportStudentsModal: React.FC<ImportStudentsModalProps> = ({
  isOpen,
  onClose,
  onImport,
}) => {
  const [file, setFile] = useState<File | null>(null);
  const [importing, setImporting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    setFile(selectedFile);
    setError(null);
  };

  const downloadTemplate = () => {
    // Create CSV template string
    const headers = [
      "Matricola",
      "Nome",
      "Cognome",
      "Data di Nascita (GG/MM/AAAA)",
      "Classe",
      "Indirizzo",
      "Nomi Genitori",
      "Codice Fiscale",
      "Luogo di Nascita",
      "Sesso (M/F)",
    ].join(",");
    
    const exampleRow = [
      "SR2024006",
      "Nome",
      "Cognome",
      "01/01/2010",
      "1A",
      "Via Example 123, Milano",
      "Nome e Cognome Genitori",
      "ABCDEF01G23H456I",
      "Milano",
      "M",
    ].join(",");
    
    const csvContent = `${headers}\n${exampleRow}`;
    
    // Create and download the file
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "template_studenti.csv";
    link.click();
    URL.revokeObjectURL(url);
  };

  const parseCSV = (text: string) => {
    const lines = text.split("\n");
    const headers = lines[0].split(",");
    
    return lines.slice(1).filter(line => line.trim()).map(line => {
      const values = line.split(",");
      const student: Record<string, string> = {};
      
      headers.forEach((header, index) => {
        student[header.trim()] = values[index]?.trim() || "";
      });
      
      return student;
    });
  };

  const handleImport = async () => {
    if (!file) {
      setError("Seleziona un file prima di importare");
      return;
    }

    setImporting(true);
    setError(null);

    try {
      // Check file extension
      const fileExt = file.name.split('.').pop()?.toLowerCase();
      if (fileExt !== 'csv' && fileExt !== 'xlsx' && fileExt !== 'xls') {
        throw new Error("Formato file non supportato. Usa CSV o Excel (.xlsx, .xls)");
      }

      // For CSV files
      if (fileExt === 'csv') {
        const text = await file.text();
        const students = parseCSV(text);
        
        if (students.length === 0) {
          throw new Error("Nessuno studente trovato nel file");
        }
        
        // Process the imported data
        onImport(students);
        toast.success(`Importati ${students.length} studenti con successo`);
        onClose();
      } 
      // For Excel files
      else {
        // In a real implementation, you would use a library like xlsx
        // For now, show a message about the implementation
        toast.info("L'importazione di file Excel richiede l'installazione di una libreria aggiuntiva");
        setError("L'importazione di file Excel è in fase di implementazione. Per ora, utilizza il formato CSV.");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Errore durante l'importazione");
      console.error("Import error:", err);
    } finally {
      setImporting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Importa Studenti</DialogTitle>
          <DialogDescription>
            Carica un file CSV o Excel con i dati degli studenti. Assicurati che il formato sia corretto.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="flex items-center justify-between">
            <Button variant="outline" onClick={downloadTemplate}>
              <Download className="mr-2 h-4 w-4" />
              Scarica Template
            </Button>
          </div>

          <div className="grid w-full max-w-sm items-center gap-1.5">
            <label htmlFor="file-upload" className="text-sm font-medium">
              File CSV/Excel
            </label>
            <input
              id="file-upload"
              type="file"
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              accept=".csv,.xlsx,.xls"
              onChange={handleFileChange}
            />
          </div>

          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Errore</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Annulla
          </Button>
          <Button onClick={handleImport} disabled={!file || importing}>
            {importing ? (
              <>Importazione in corso...</>
            ) : (
              <>
                <Upload className="mr-2 h-4 w-4" />
                Importa
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ImportStudentsModal;
