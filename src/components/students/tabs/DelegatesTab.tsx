
import React, { useState } from "react";
import { Card, CardHeader, CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Save, UserPlus } from "lucide-react";
import { Student, Delegate } from "../types/student";

interface DelegatesTabProps {
  student: Student;
}

const DelegatesTab: React.FC<DelegatesTabProps> = ({ student }) => {
  const [delegates, setDelegates] = useState(student.delegates);
  
  const addDelegate = () => {
    if (delegates.length < 5) {
      setDelegates([...delegates, { name: "", relationship: "", fiscalCode: "", phone: "" }]);
    }
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Delegati per il Ritiro</CardTitle>
        <CardDescription>Persone autorizzate al ritiro dello studente (massimo 5)</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {delegates.map((delegate, index) => (
            <div key={index} className="p-4 border rounded-md">
              <h3 className="text-base font-medium mb-3">Delegato {index + 1}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor={`delegate-name-${index}`}>Nome e Cognome</Label>
                  <Input 
                    id={`delegate-name-${index}`} 
                    defaultValue={delegate.name}
                    placeholder="Nome completo del delegato" 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`delegate-relationship-${index}`}>Relazione</Label>
                  <Input 
                    id={`delegate-relationship-${index}`} 
                    defaultValue={delegate.relationship}
                    placeholder="Es: Nonna, Zio, Babysitter" 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`delegate-fiscal-code-${index}`}>Codice Fiscale</Label>
                  <Input 
                    id={`delegate-fiscal-code-${index}`} 
                    defaultValue={delegate.fiscalCode}
                    placeholder="Codice fiscale del delegato" 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`delegate-phone-${index}`}>Telefono</Label>
                  <Input 
                    id={`delegate-phone-${index}`} 
                    defaultValue={delegate.phone}
                    placeholder="Numero di telefono" 
                  />
                </div>
              </div>
            </div>
          ))}

          {delegates.length < 5 && (
            <Button variant="outline" type="button" onClick={addDelegate} className="w-full">
              <UserPlus className="mr-2 h-4 w-4" />
              Aggiungi Delegato
            </Button>
          )}

          <div className="flex justify-end mt-6">
            <Button>
              <Save className="mr-2 h-4 w-4" />
              Salva Modifiche
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DelegatesTab;
