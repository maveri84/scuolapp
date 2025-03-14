
import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Download, Eye, BadgeEuro, PlusCircle } from "lucide-react";
import { Teacher } from "../types";

interface PayrollTabProps {
  teacher: Teacher;
}

const PayrollTab: React.FC<PayrollTabProps> = ({ teacher }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>Dati Stipendiali</span>
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            Aggiungi Cedolino
          </Button>
        </CardTitle>
        <CardDescription>
          Gestisci i dati stipendiali e visualizza i cedolini del docente
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Dati Bancari</CardTitle>
            </CardHeader>
            <CardContent>
              <dl className="space-y-2">
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">IBAN:</dt>
                  <dd className="font-medium">{teacher.bankDetails?.iban || "Non specificato"}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Banca:</dt>
                  <dd className="font-medium">{teacher.bankDetails?.bank || "Non specificato"}</dd>
                </div>
              </dl>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Inquadramento</CardTitle>
            </CardHeader>
            <CardContent>
              <dl className="space-y-2">
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Tipologia Contratto:</dt>
                  <dd className="font-medium">{teacher.contractType}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Status:</dt>
                  <dd className="font-medium">{teacher.isTenured ? "Di ruolo" : "Non di ruolo"}</dd>
                </div>
              </dl>
            </CardContent>
          </Card>
        </div>
        
        <h3 className="text-lg font-medium mb-4">Cedolini Stipendiali</h3>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Mese</TableHead>
              <TableHead>Anno</TableHead>
              <TableHead>Importo Netto</TableHead>
              <TableHead>Data Pagamento</TableHead>
              <TableHead className="text-right">Azioni</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell colSpan={5} className="text-center py-6 text-muted-foreground">
                Nessun cedolino disponibile.
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default PayrollTab;
