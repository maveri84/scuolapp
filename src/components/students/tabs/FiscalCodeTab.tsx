
import React, { useState } from "react";
import { Card, CardHeader, CardContent, CardDescription, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Calculator, Copy } from "lucide-react";
import { Student } from "../types/student";

interface FiscalCodeTabProps {
  student: Student;
}

const FiscalCodeTab: React.FC<FiscalCodeTabProps> = ({ student }) => {
  const [fiscalCode, setFiscalCode] = useState("");
  const [birthPlace, setBirthPlace] = useState("");
  
  // This function would normally calculate the actual fiscal code
  // Here it's just a placeholder that returns a mock fiscal code
  const calculateFiscalCode = () => {
    // Creating a mock fiscal code based on student data
    const surname = student.surname.substring(0, 3).toUpperCase();
    const name = student.name.substring(0, 3).toUpperCase();
    
    // Fixed the type error by converting the string to a number
    const year = new Date(student.birthDate).getFullYear();
    
    // Get last two digits of year
    const yearStr = year.toString().substring(2, 4);
    
    // Mock code for birth place
    const placeCode = birthPlace.substring(0, 3).toUpperCase() || "XXX";
    
    return `${surname}${name}${yearStr}XXXXXXXXX${placeCode}`;
  };
  
  const handleCalculate = () => {
    const code = calculateFiscalCode();
    setFiscalCode(code);
  };
  
  const handleCopy = () => {
    navigator.clipboard.writeText(fiscalCode);
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Calcolo Codice Fiscale</CardTitle>
        <CardDescription>Calcola il codice fiscale dello studente</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <div className="space-y-1.5">
            <Label htmlFor="birth-place">Luogo di Nascita</Label>
            <Input 
              id="birth-place"
              value={birthPlace}
              onChange={e => setBirthPlace(e.target.value)}
              placeholder="Inserisci il luogo di nascita"
            />
          </div>
        </div>
        
        <Button 
          onClick={handleCalculate}
          className="w-full"
        >
          <Calculator className="mr-2 h-4 w-4" />
          Calcola Codice Fiscale
        </Button>
        
        {fiscalCode && (
          <div className="mt-4 p-4 bg-muted rounded-md flex justify-between items-center">
            <p className="font-mono text-lg">{fiscalCode}</p>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={handleCopy}
            >
              <Copy className="h-4 w-4" />
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default FiscalCodeTab;
