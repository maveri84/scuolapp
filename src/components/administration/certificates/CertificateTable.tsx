
import React from "react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Certificate, CERTIFICATE_TYPES } from "./types";
import { Eye, FileText, Edit, Trash2 } from "lucide-react";

interface CertificateTableProps {
  certificates: Certificate[];
  onPreview: (certificate: Certificate) => void;
  onGenerate: (certificate: Certificate) => void;
  onEdit: (certificate: Certificate) => void;
  onDelete: (id: string) => void;
}

const CertificateTable: React.FC<CertificateTableProps> = ({
  certificates,
  onPreview,
  onGenerate,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nome</TableHead>
            <TableHead>Tipo</TableHead>
            <TableHead>Destinatari</TableHead>
            <TableHead className="text-right">Azioni</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {certificates.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4} className="h-24 text-center">
                Nessun certificato trovato.
              </TableCell>
            </TableRow>
          ) : (
            certificates.map((certificate) => (
              <TableRow key={certificate.id}>
                <TableCell className="font-medium">{certificate.name}</TableCell>
                <TableCell>
                  {CERTIFICATE_TYPES.find(t => t.value === certificate.type)?.label || certificate.type}
                </TableCell>
                <TableCell>
                  {certificate.target === "studenti" && "Studenti"}
                  {certificate.target === "docenti" && "Docenti"}
                  {certificate.target === "entrambi" && "Studenti e Docenti"}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" size="icon" onClick={() => onPreview(certificate)}>
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon" onClick={() => onGenerate(certificate)}>
                      <FileText className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon" onClick={() => onEdit(certificate)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon" onClick={() => onDelete(certificate.id)}>
                      <Trash2 className="h-4 w-4" />
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

export default CertificateTable;
