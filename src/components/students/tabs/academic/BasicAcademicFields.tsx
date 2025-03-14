
import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";

interface BasicAcademicFieldsProps {
  enrollmentDate: string;
  previousSchool: string;
  attendsReligiousEducation: boolean;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onSwitchChange: (checked: boolean) => void;
  isDisabled?: boolean;
}

const BasicAcademicFields: React.FC<BasicAcademicFieldsProps> = ({
  enrollmentDate,
  previousSchool,
  attendsReligiousEducation,
  onInputChange,
  onSwitchChange,
  isDisabled = false,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="space-y-2">
        <Label htmlFor="enrollmentDate">Data di Iscrizione</Label>
        <Input 
          id="enrollmentDate" 
          value={enrollmentDate} 
          onChange={onInputChange}
          disabled={isDisabled}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="previousSchool">Scuola Precedente</Label>
        <Input 
          id="previousSchool" 
          value={previousSchool} 
          onChange={onInputChange}
          disabled={isDisabled}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="irc">Insegnamento Religione Cattolica (IRC)</Label>
        <div className="flex items-center space-x-2">
          <Switch 
            id="irc" 
            checked={attendsReligiousEducation} 
            onCheckedChange={onSwitchChange}
            disabled={isDisabled}
          />
          <Label htmlFor="irc" className="mb-0">
            {attendsReligiousEducation ? 'Si avvale' : 'Non si avvale'}
          </Label>
        </div>
      </div>
    </div>
  );
};

export default BasicAcademicFields;
