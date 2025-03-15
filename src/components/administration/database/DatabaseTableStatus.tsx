
import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Check, AlertTriangle } from "lucide-react";

const DatabaseTableStatus: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Stato delle tabelle</CardTitle>
        <CardDescription>
          Monitora lo stato delle principali tabelle del database
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="relative overflow-x-auto rounded-md border">
          <table className="w-full text-sm text-left">
            <thead className="text-xs uppercase bg-muted">
              <tr>
                <th scope="col" className="px-4 py-3">Tabella</th>
                <th scope="col" className="px-4 py-3">Struttura</th>
                <th scope="col" className="px-4 py-3">Records</th>
                <th scope="col" className="px-4 py-3">Dimensione</th>
                <th scope="col" className="px-4 py-3">Ultimo aggiornamento</th>
                <th scope="col" className="px-4 py-3">Stato</th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-card border-b">
                <td className="px-4 py-3 font-medium">studenti</td>
                <td className="px-4 py-3">OK</td>
                <td className="px-4 py-3">2,456</td>
                <td className="px-4 py-3">4.2 MB</td>
                <td className="px-4 py-3">Oggi, 14:30</td>
                <td className="px-4 py-3">
                  <div className="flex items-center">
                    <Check className="h-4 w-4 text-green-600 mr-1" />
                    <span>Ottimale</span>
                  </div>
                </td>
              </tr>
              <tr className="bg-card border-b">
                <td className="px-4 py-3 font-medium">docenti</td>
                <td className="px-4 py-3">OK</td>
                <td className="px-4 py-3">187</td>
                <td className="px-4 py-3">1.8 MB</td>
                <td className="px-4 py-3">Ieri, 18:15</td>
                <td className="px-4 py-3">
                  <div className="flex items-center">
                    <Check className="h-4 w-4 text-green-600 mr-1" />
                    <span>Ottimale</span>
                  </div>
                </td>
              </tr>
              <tr className="bg-card border-b">
                <td className="px-4 py-3 font-medium">classi</td>
                <td className="px-4 py-3">OK</td>
                <td className="px-4 py-3">85</td>
                <td className="px-4 py-3">0.5 MB</td>
                <td className="px-4 py-3">Oggi, 09:10</td>
                <td className="px-4 py-3">
                  <div className="flex items-center">
                    <Check className="h-4 w-4 text-green-600 mr-1" />
                    <span>Ottimale</span>
                  </div>
                </td>
              </tr>
              <tr className="bg-card border-b">
                <td className="px-4 py-3 font-medium">presenze</td>
                <td className="px-4 py-3">OK</td>
                <td className="px-4 py-3">145,632</td>
                <td className="px-4 py-3">32.7 MB</td>
                <td className="px-4 py-3">Oggi, 15:45</td>
                <td className="px-4 py-3">
                  <div className="flex items-center">
                    <AlertTriangle className="h-4 w-4 text-amber-600 mr-1" />
                    <span>Da ottimizzare</span>
                  </div>
                </td>
              </tr>
              <tr className="bg-card">
                <td className="px-4 py-3 font-medium">valutazioni</td>
                <td className="px-4 py-3">OK</td>
                <td className="px-4 py-3">86,421</td>
                <td className="px-4 py-3">18.3 MB</td>
                <td className="px-4 py-3">Oggi, 16:20</td>
                <td className="px-4 py-3">
                  <div className="flex items-center">
                    <Check className="h-4 w-4 text-green-600 mr-1" />
                    <span>Ottimale</span>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};

export default DatabaseTableStatus;
