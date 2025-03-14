
import React from "react";
import { Card, CardHeader, CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

interface SpecialNeedsSelectionProps {
  isH: boolean;
  isDSA: boolean;
  isBES: boolean;
  onHChange: (checked: boolean) => void;
  onDSAChange: (checked: boolean) => void;
  onBESChange: (checked: boolean) => void;
  isDisabled?: boolean;
}

const SpecialNeedsSelection: React.FC<SpecialNeedsSelectionProps> = ({
  isH,
  isDSA,
  isBES,
  onHChange,
  onDSAChange,
  onBESChange,
  isDisabled = false,
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Bisogni Educativi Speciali</CardTitle>
        <CardDescription>Gestisci le informazioni sui bisogni educativi speciali dello studente</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between space-x-2">
          <Label htmlFor="is-h" className="flex flex-col space-y-1">
            <span>Disabilità (L. 104/92)</span>
            <span className="font-normal text-sm text-muted-foreground">Lo studente ha una disabilità certificata</span>
          </Label>
          <Switch 
            id="is-h" 
            checked={isH}
            onCheckedChange={onHChange}
            disabled={isDisabled}
          />
        </div>
        
        <div className="flex items-center justify-between space-x-2">
          <Label htmlFor="is-dsa" className="flex flex-col space-y-1">
            <span>DSA (L. 170/2010)</span>
            <span className="font-normal text-sm text-muted-foreground">Lo studente ha un disturbo specifico dell'apprendimento</span>
          </Label>
          <Switch 
            id="is-dsa" 
            checked={isDSA}
            onCheckedChange={onDSAChange}
            disabled={isDisabled}
          />
        </div>
        
        <div className="flex items-center justify-between space-x-2">
          <Label htmlFor="is-bes" className="flex flex-col space-y-1">
            <span>Altri BES (Dir. Min. 27/12/2012)</span>
            <span className="font-normal text-sm text-muted-foreground">Lo studente ha altri bisogni educativi speciali</span>
          </Label>
          <Switch 
            id="is-bes" 
            checked={isBES}
            onCheckedChange={onBESChange}
            disabled={isDisabled}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default SpecialNeedsSelection;
