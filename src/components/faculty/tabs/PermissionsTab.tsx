
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PlusCircle, X } from "lucide-react";
import { Teacher } from "../types";

interface PermissionsTabProps {
  teacher: Teacher;
  onChange: (field: keyof Teacher, value: any) => void;
}

const PermissionsTab: React.FC<PermissionsTabProps> = ({ teacher, onChange }) => {
  const [newRole, setNewRole] = useState("");

  const handleAddRole = () => {
    if (newRole.trim() && !teacher.roles.includes(newRole.trim())) {
      onChange("roles", [...teacher.roles, newRole.trim()]);
      setNewRole("");
    }
  };

  const handleRemoveRole = (role: string) => {
    onChange("roles", teacher.roles.filter(r => r !== role));
  };

  // System permissions
  const permissions = [
    { id: "edit_grades", label: "Modifica valutazioni" },
    { id: "view_student_data", label: "Visualizza dati studenti" },
    { id: "edit_student_data", label: "Modifica dati studenti" },
    { id: "view_teacher_data", label: "Visualizza dati docenti" },
    { id: "edit_teacher_data", label: "Modifica dati docenti" },
    { id: "manage_classes", label: "Gestisci classi" },
    { id: "manage_subjects", label: "Gestisci materie" },
    { id: "manage_communications", label: "Gestisci comunicazioni" },
    { id: "manage_calendar", label: "Gestisci calendario" }
  ];

  const handleTogglePermission = (permissionId: string) => {
    const currentPermissions = [...teacher.permissions];
    
    if (currentPermissions.includes(permissionId)) {
      onChange("permissions", currentPermissions.filter(p => p !== permissionId));
    } else {
      onChange("permissions", [...currentPermissions, permissionId]);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Ruoli e Permessi</CardTitle>
        <CardDescription>
          Gestisci i ruoli e i permessi assegnati al docente
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h3 className="text-lg font-medium mb-4">Ruoli</h3>
          <div className="space-y-4">
            <div className="flex flex-wrap gap-2">
              {teacher.roles.map((role, index) => (
                <Badge key={index} variant="secondary" className="flex items-center gap-1">
                  {role}
                  <button
                    type="button"
                    onClick={() => handleRemoveRole(role)}
                    className="ml-1 rounded-full text-muted-foreground hover:text-foreground"
                  >
                    <X className="h-3 w-3" />
                    <span className="sr-only">Rimuovi {role}</span>
                  </button>
                </Badge>
              ))}
              {teacher.roles.length === 0 && (
                <span className="text-sm text-muted-foreground">
                  Nessun ruolo assegnato
                </span>
              )}
            </div>
            
            <div className="flex gap-2">
              <select 
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                value={newRole}
                onChange={(e) => setNewRole(e.target.value)}
              >
                <option value="">Seleziona un ruolo...</option>
                <option value="Docente">Docente</option>
                <option value="Coordinatore di Classe">Coordinatore di Classe</option>
                <option value="Coordinatore di Dipartimento">Coordinatore di Dipartimento</option>
                <option value="Funzione Strumentale">Funzione Strumentale</option>
                <option value="Collaboratore del Dirigente">Collaboratore del Dirigente</option>
                <option value="Responsabile di Laboratorio">Responsabile di Laboratorio</option>
                <option value="Referente BES/DSA">Referente BES/DSA</option>
                <option value="Animatore Digitale">Animatore Digitale</option>
                <option value="Vicario">Vicario</option>
              </select>
              <Button onClick={handleAddRole} type="button">
                <PlusCircle className="mr-2 h-4 w-4" />
                Aggiungi
              </Button>
            </div>
          </div>
        </div>
        
        <div className="border-t pt-6">
          <h3 className="text-lg font-medium mb-4">Permessi di Sistema</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {permissions.map((permission) => (
              <div key={permission.id} className="flex items-center space-x-2">
                <Checkbox 
                  id={permission.id}
                  checked={teacher.permissions.includes(permission.id)}
                  onCheckedChange={() => handleTogglePermission(permission.id)}
                />
                <Label htmlFor={permission.id}>{permission.label}</Label>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PermissionsTab;
