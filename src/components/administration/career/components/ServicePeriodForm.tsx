
import React from "react";
import { ServicePeriod } from "../types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus } from "lucide-react";

interface ServicePeriodFormProps {
  servicePeriod: Partial<ServicePeriod>;
  onServicePeriodChange: (field: string, value: string) => void;
  onAddServicePeriod: () => void;
}

export const ServicePeriodForm: React.FC<ServicePeriodFormProps> = ({
  servicePeriod,
  onServicePeriodChange,
  onAddServicePeriod
}) => {
  return (
    <div className="space-y-4">
      <h4 className="font-medium">Aggiungi Periodi di Servizio</h4>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="startDate">Data Inizio</Label>
          <Input 
            id="startDate" 
            type="date"
            value={servicePeriod.startDate || ""} 
            onChange={(e) => onServicePeriodChange("startDate", e.target.value)}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="endDate">Data Fine</Label>
          <Input 
            id="endDate" 
            type="date"
            value={servicePeriod.endDate || ""} 
            onChange={(e) => onServicePeriodChange("endDate", e.target.value)}
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="schoolYear">Anno Scolastico</Label>
          <Input 
            id="schoolYear" 
            value={servicePeriod.schoolYear || ""} 
            onChange={(e) => onServicePeriodChange("schoolYear", e.target.value)}
            placeholder="Es. 2020/2021"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="institution">Istituzione</Label>
          <Input 
            id="institution" 
            value={servicePeriod.institution || ""} 
            onChange={(e) => onServicePeriodChange("institution", e.target.value)}
            placeholder="Nome dell'istituzione scolastica"
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="role">Ruolo</Label>
          <Select 
            onValueChange={(value) => onServicePeriodChange("role", value)}
            value={servicePeriod.role || "Docente"}
          >
            <SelectTrigger>
              <SelectValue placeholder="Seleziona ruolo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Docente">Docente</SelectItem>
              <SelectItem value="ATA">ATA</SelectItem>
              <SelectItem value="Dirigente">Dirigente</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="contractType">Tipo Contratto</Label>
          <Select 
            onValueChange={(value) => onServicePeriodChange("contractType", value)}
            value={servicePeriod.contractType || "Tempo determinato"}
          >
            <SelectTrigger>
              <SelectValue placeholder="Seleziona tipo contratto" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Tempo determinato">Tempo determinato</SelectItem>
              <SelectItem value="Supplenza">Supplenza</SelectItem>
              <SelectItem value="Incarico annuale">Incarico annuale</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="flex justify-end items-end">
          <Button onClick={onAddServicePeriod}>
            <Plus className="mr-2 h-4 w-4" />
            Aggiungi Periodo
          </Button>
        </div>
      </div>
    </div>
  );
};
