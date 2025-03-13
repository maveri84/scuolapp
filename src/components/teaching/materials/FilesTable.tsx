
import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Download, File, FileText, Share2 } from "lucide-react";
import { FileItem } from "../types/materials";

interface FilesTableProps {
  files: FileItem[];
  selectedFiles: string[];
  onToggleSelect: (fileId: string) => void;
  onSelectAll: () => void;
}

const FilesTable: React.FC<FilesTableProps> = ({
  files,
  selectedFiles,
  onToggleSelect,
  onSelectAll
}) => {
  const getFileIcon = (type: string) => {
    if (type.includes('pdf')) return <FileText className="h-4 w-4 text-red-500" />;
    if (type.includes('word')) return <FileText className="h-4 w-4 text-blue-500" />;
    if (type.includes('presentation')) return <FileText className="h-4 w-4 text-orange-500" />;
    return <File className="h-4 w-4 text-gray-500" />;
  };

  return (
    <div className="border rounded-md">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-12">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  checked={selectedFiles.length === files.length && files.length > 0}
                  onChange={onSelectAll}
                />
              </div>
            </TableHead>
            <TableHead>Nome</TableHead>
            <TableHead>Materia</TableHead>
            <TableHead>Classe</TableHead>
            <TableHead>Data Modifica</TableHead>
            <TableHead>Dimensione</TableHead>
            <TableHead className="text-right">Azioni</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {files.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} className="text-center py-6 text-muted-foreground">
                Nessun file trovato
              </TableCell>
            </TableRow>
          ) : (
            files.map((file) => (
              <TableRow key={file.id}>
                <TableCell>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                      checked={selectedFiles.includes(file.id)}
                      onChange={() => onToggleSelect(file.id)}
                    />
                  </div>
                </TableCell>
                <TableCell className="flex items-center gap-2">
                  {getFileIcon(file.type)}
                  {file.name}
                </TableCell>
                <TableCell>{file.subject}</TableCell>
                <TableCell>{file.class}</TableCell>
                <TableCell>{file.lastModified}</TableCell>
                <TableCell>{file.size}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button variant="ghost" size="sm">
                      <Download className="h-4 w-4" />
                      <span className="sr-only">Scarica</span>
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Share2 className="h-4 w-4" />
                      <span className="sr-only">Condividi</span>
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default FilesTable;
