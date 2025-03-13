
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Download, FolderPlus, Share2, Trash2, Upload } from "lucide-react";

interface FileActionsProps {
  selectedFiles: string[];
  onFileUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onDelete: () => void;
}

const FileActions: React.FC<FileActionsProps> = ({
  selectedFiles,
  onFileUpload,
  onDelete
}) => {
  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm">
          <FolderPlus className="mr-2 h-4 w-4" />
          Nuova Cartella
        </Button>
        
        <Button
          variant="outline"
          size="sm"
          className="relative"
          onClick={() => document.getElementById('file-upload')?.click()}
        >
          <Upload className="mr-2 h-4 w-4" />
          Carica File
          <Input
            id="file-upload"
            type="file"
            className="sr-only"
            onChange={onFileUpload}
            multiple
          />
        </Button>
      </div>
      
      <div className="flex items-center gap-2">
        {selectedFiles.length > 0 && (
          <>
            <Button variant="outline" size="sm">
              <Download className="mr-2 h-4 w-4" />
              Scarica
            </Button>
            
            <Button variant="outline" size="sm">
              <Share2 className="mr-2 h-4 w-4" />
              Condividi
            </Button>
            
            <Button variant="destructive" size="sm" onClick={onDelete}>
              <Trash2 className="mr-2 h-4 w-4" />
              Elimina
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default FileActions;
