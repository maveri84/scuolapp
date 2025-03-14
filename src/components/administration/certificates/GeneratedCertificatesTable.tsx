
import React from "react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Eye, Download, Mail } from "lucide-react";
import { Person, MOCK_PEOPLE } from "./types";

interface GeneratedCertificate {
  id: string;
  templateId: string;
  templateName: string;
  recipientId: string;
  recipientName: string;
  recipientType: string;
  content: string;
  createdAt: string;
  signed?: boolean;
  signedBy?: string;
  signedDate?: string;
  sentEmail?: boolean;
  savedToFile?: boolean;
}

interface GeneratedCertificatesTableProps {
  certificates: GeneratedCertificate[];
  onPreview: (content: string) => void;
  onDownload: (certificate: GeneratedCertificate) => void;
  onSendEmail: (certificate: GeneratedCertificate, recipient: Person) => void;
  setGeneratedCertificates: React.Dispatch<React.SetStateAction<GeneratedCertificate[]>>;
}

const GeneratedCertificatesTable: React.FC<GeneratedCertificatesTableProps> = ({
  certificates,
  onPreview,
  onDownload,
  onSendEmail,
  setGeneratedCertificates,
}) => {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Certificato</TableHead>
            <TableHead>Destinatario</TableHead>
            <TableHead>Data</TableHead>
            <TableHead>Stato</TableHead>
            <TableHead className="text-right">Azioni</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {certificates.map((cert) => (
            <TableRow key={cert.id}>
              <TableCell className="font-medium">{cert.templateName}</TableCell>
              <TableCell>{cert.recipientName}</TableCell>
              <TableCell>{new Date(cert.createdAt).toLocaleDateString('it-IT')}</TableCell>
              <TableCell>
                <div className="flex flex-wrap gap-1">
                  {cert.signed && (
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">
                      Firmato
                    </span>
                  )}
                  {cert.sentEmail && (
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                      Inviato
                    </span>
                  )}
                  {cert.savedToFile && (
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-purple-100 text-purple-800">
                      Archiviato
                    </span>
                  )}
                </div>
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button variant="outline" size="icon" onClick={() => onPreview(cert.content)}>
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon" onClick={() => onDownload(cert)}>
                    <Download className="h-4 w-4" />
                  </Button>
                  {!cert.sentEmail && (
                    <Button variant="outline" size="icon" onClick={() => {
                      const recipient = MOCK_PEOPLE.find(p => p.id === cert.recipientId);
                      if (recipient) {
                        onSendEmail(cert, recipient);
                        // Update the certificate to mark as sent
                        setGeneratedCertificates(prev => 
                          prev.map(c => c.id === cert.id ? {...c, sentEmail: true} : c)
                        );
                      }
                    }}>
                      <Mail className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default GeneratedCertificatesTable;
