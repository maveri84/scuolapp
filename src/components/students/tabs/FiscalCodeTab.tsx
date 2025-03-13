
import React, { useState } from "react";
import { Card, CardHeader, CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Calculator } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Student } from "../types/student";

interface FiscalCodeCalcProps {
  student: Student;
}

const calculateFiscalCode = (firstName: string, lastName: string, birthDate: string, gender: string, birthPlace: string): string => {
  const birthDateComponents = birthDate.split('-');
  if (birthDateComponents.length !== 3) {
    return "Invalid date format (use YYYY-MM-DD)";
  }
  
  const lastNameConsonants = lastName.toUpperCase().replace(/[AEIOU]/g, '').substring(0, 3);
  const firstNameConsonants = firstName.toUpperCase().replace(/[AEIOU]/g, '').substring(0, 3);
  const year = birthDateComponents[0].substring(2, 4);
  const monthCodes = 'ABCDEHLMPRST';
  const month = monthCodes.charAt(parseInt(birthDateComponents[1], 10) - 1);
  let day = parseInt(birthDateComponents[2], 10);
  if (gender.toUpperCase() === 'F') {
    day += 40;
  }
  day = day.toString().padStart(2, '0');
  const birthPlaceCode = "F205";
  
  const code = lastNameConsonants + firstNameConsonants + year + month + day + birthPlaceCode;
  
  const lastChar = 'X';
  
  return code + lastChar;
};

const FiscalCodeTab: React.FC<FiscalCodeCalcProps> = ({ student }) => {
  const [fiscalCodeInputs, setFiscalCodeInputs] = useState({
    firstName: student.firstName,
    lastName: student.lastName,
    birthDate: "2008-05-15",
    gender: "M",
    birthPlace: student.placeOfBirth
  });
  
  const [calculatedFiscalCode, setCalculatedFiscalCode] = useState<string>("");
  
  const handleFiscalCodeCalculation = () => {
    const result = calculateFiscalCode(
      fiscalCodeInputs.firstName,
      fiscalCodeInputs.lastName,
      fiscalCodeInputs.birthDate,
      fiscalCodeInputs.gender,
      fiscalCodeInputs.birthPlace
    );
    setCalculatedFiscalCode(result);
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Calcolo Codice Fiscale</CardTitle>
        <CardDescription>Strumento per il calcolo e la verifica del codice fiscale</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="fc-firstName">Nome</Label>
              <Input 
                id="fc-firstName"
                value={fiscalCodeInputs.firstName}
                onChange={(e) => setFiscalCodeInputs({...fiscalCodeInputs, firstName: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="fc-lastName">Cognome</Label>
              <Input 
                id="fc-lastName"
                value={fiscalCodeInputs.lastName}
                onChange={(e) => setFiscalCodeInputs({...fiscalCodeInputs, lastName: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="fc-birthDate">Data di Nascita</Label>
              <Input 
                id="fc-birthDate"
                type="date"
                value={fiscalCodeInputs.birthDate}
                onChange={(e) => setFiscalCodeInputs({...fiscalCodeInputs, birthDate: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="fc-gender">Sesso</Label>
              <Select 
                value={fiscalCodeInputs.gender}
                onValueChange={(value) => setFiscalCodeInputs({...fiscalCodeInputs, gender: value})}
              >
                <SelectTrigger id="fc-gender">
                  <SelectValue placeholder="Seleziona genere" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="M">Maschio</SelectItem>
                  <SelectItem value="F">Femmina</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="fc-birthPlace">Luogo di Nascita</Label>
              <Input 
                id="fc-birthPlace"
                value={fiscalCodeInputs.birthPlace}
                onChange={(e) => setFiscalCodeInputs({...fiscalCodeInputs, birthPlace: e.target.value})}
                placeholder="Inserisci il comune di nascita"
              />
            </div>
          </div>

          <div className="flex flex-col items-center space-y-4">
            <Button onClick={handleFiscalCodeCalculation} className="w-full md:w-auto">
              <Calculator className="mr-2 h-4 w-4" />
              Calcola Codice Fiscale
            </Button>
            
            {calculatedFiscalCode && (
              <div className="p-4 bg-muted/30 rounded-md w-full text-center">
                <p className="text-sm text-muted-foreground mb-1">Risultato del calcolo:</p>
                <p className="text-xl font-mono font-bold">{calculatedFiscalCode}</p>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FiscalCodeTab;
