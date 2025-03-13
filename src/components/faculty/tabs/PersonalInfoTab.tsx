
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Teacher } from "../types/faculty";

interface PersonalInfoTabProps {
  teacher: Teacher;
  onChange: (field: string, value: any) => void;
}

const PersonalInfoTab: React.FC<PersonalInfoTabProps> = ({ teacher, onChange }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Informazioni Personali</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="firstName">Nome</Label>
            <Input 
              id="firstName" 
              value={teacher.firstName} 
              onChange={(e) => onChange("firstName", e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="lastName">Cognome</Label>
            <Input 
              id="lastName" 
              value={teacher.lastName} 
              onChange={(e) => onChange("lastName", e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="taxCode">Codice Fiscale</Label>
            <Input 
              id="taxCode" 
              value={teacher.taxCode} 
              onChange={(e) => onChange("taxCode", e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="dateOfBirth">Data di Nascita</Label>
            <Input 
              id="dateOfBirth" 
              type="date" 
              value={teacher.dateOfBirth} 
              onChange={(e) => onChange("dateOfBirth", e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="placeOfBirth">Luogo di Nascita</Label>
            <Input 
              id="placeOfBirth" 
              value={teacher.placeOfBirth} 
              onChange={(e) => onChange("placeOfBirth", e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="gender">Genere</Label>
            <Select 
              value={teacher.gender} 
              onValueChange={(value) => onChange("gender", value as "M" | "F" | "O")}
            >
              <SelectTrigger id="gender">
                <SelectValue placeholder="Seleziona genere" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="M">Maschile</SelectItem>
                <SelectItem value="F">Femminile</SelectItem>
                <SelectItem value="O">Altro</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="nationality">Nazionalità</Label>
            <Input 
              id="nationality" 
              value={teacher.nationality} 
              onChange={(e) => onChange("nationality", e.target.value)}
            />
          </div>
        </div>
        
        <div className="border-t pt-6">
          <h3 className="text-lg font-medium mb-4">Indirizzo e Contatti</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="address">Indirizzo</Label>
              <Input 
                id="address" 
                value={teacher.address} 
                onChange={(e) => onChange("address", e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="city">Città</Label>
              <Input 
                id="city" 
                value={teacher.city} 
                onChange={(e) => onChange("city", e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="postalCode">CAP</Label>
              <Input 
                id="postalCode" 
                value={teacher.postalCode} 
                onChange={(e) => onChange("postalCode", e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="province">Provincia</Label>
              <Input 
                id="province" 
                value={teacher.province} 
                onChange={(e) => onChange("province", e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email Istituzionale</Label>
              <Input 
                id="email" 
                type="email" 
                value={teacher.email} 
                onChange={(e) => onChange("email", e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="personalEmail">Email Personale</Label>
              <Input 
                id="personalEmail" 
                type="email" 
                value={teacher.personalEmail || ""} 
                onChange={(e) => onChange("personalEmail", e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="phoneNumber">Telefono</Label>
              <Input 
                id="phoneNumber" 
                value={teacher.phoneNumber} 
                onChange={(e) => onChange("phoneNumber", e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="cellPhone">Cellulare</Label>
              <Input 
                id="cellPhone" 
                value={teacher.cellPhone || ""} 
                onChange={(e) => onChange("cellPhone", e.target.value)}
              />
            </div>
          </div>
        </div>
        
        <div className="border-t pt-6">
          <h3 className="text-lg font-medium mb-4">Note Aggiuntive</h3>
          <div className="space-y-2">
            <Label htmlFor="notes">Note</Label>
            <Textarea 
              id="notes" 
              value={teacher.notes} 
              onChange={(e) => onChange("notes", e.target.value)}
              rows={4}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PersonalInfoTab;
