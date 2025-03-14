
import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  EDUCATION_OPTIONS, 
  MARITAL_STATUS_OPTIONS 
} from "./parentsConstants";

interface ParentFormFieldsProps {
  prefix: string;
  parentData: {
    firstName: string;
    lastName: string;
    fiscalCode: string;
    email: string;
    phone: string;
    occupation: string;
    education: string;
    maritalStatus: string;
  };
  onChange: (field: string, value: any) => void;
}

const ParentFormFields: React.FC<ParentFormFieldsProps> = ({ 
  prefix, 
  parentData, 
  onChange 
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.id, e.target.value);
  };

  const handleSelectChange = (field: string, value: string) => {
    onChange(field, value);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="space-y-2">
        <Label htmlFor={`${prefix}FirstName`}>Nome</Label>
        <Input 
          id={`${prefix}FirstName`} 
          value={parentData.firstName} 
          onChange={handleChange}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor={`${prefix}LastName`}>Cognome</Label>
        <Input 
          id={`${prefix}LastName`} 
          value={parentData.lastName} 
          onChange={handleChange}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor={`${prefix}FiscalCode`}>Codice Fiscale</Label>
        <Input 
          id={`${prefix}FiscalCode`} 
          value={parentData.fiscalCode} 
          onChange={handleChange}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor={`${prefix}Email`}>Email</Label>
        <Input 
          id={`${prefix}Email`} 
          type="email" 
          value={parentData.email} 
          onChange={handleChange}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor={`${prefix}Phone`}>Telefono</Label>
        <Input 
          id={`${prefix}Phone`} 
          value={parentData.phone} 
          onChange={handleChange}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor={`${prefix}Occupation`}>Occupazione</Label>
        <Input 
          id={`${prefix}Occupation`} 
          value={parentData.occupation} 
          onChange={handleChange}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor={`${prefix}Education`}>Titolo di Studio</Label>
        <Select 
          value={parentData.education} 
          onValueChange={(value) => handleSelectChange(`${prefix}Education`, value)}
        >
          <SelectTrigger id={`${prefix}Education`}>
            <SelectValue placeholder="Seleziona titolo di studio" />
          </SelectTrigger>
          <SelectContent>
            {EDUCATION_OPTIONS.map(option => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label htmlFor={`${prefix}MaritalStatus`}>Stato Civile</Label>
        <Select 
          value={parentData.maritalStatus} 
          onValueChange={(value) => handleSelectChange(`${prefix}MaritalStatus`, value)}
        >
          <SelectTrigger id={`${prefix}MaritalStatus`}>
            <SelectValue placeholder="Seleziona stato civile" />
          </SelectTrigger>
          <SelectContent>
            {MARITAL_STATUS_OPTIONS.map(option => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2 md:col-span-2">
        <Label htmlFor={`${prefix}Address`}>Indirizzo (se diverso da quello dello studente)</Label>
        <Input 
          id={`${prefix}Address`} 
          placeholder="Inserisci l'indirizzo completo" 
        />
      </div>
    </div>
  );
};

export default ParentFormFields;
