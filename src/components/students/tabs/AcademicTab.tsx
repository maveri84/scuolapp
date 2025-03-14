
import React, { useState } from "react";
import { Card, CardHeader, CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Save } from "lucide-react";
import { Student, AcademicRecord, PhysicalEducationExemption } from "../types/student";
import { format } from "date-fns";
import BasicAcademicFields from "./academic/BasicAcademicFields";
import PhysicalEducationExemptionSection from "./academic/PhysicalEducationExemption";
import AcademicHistory from "./academic/AcademicHistory";

interface AcademicTabProps {
  student: Student;
  isEditMode?: boolean;
  onChange?: (field: string, value: any) => void;
}

const AcademicTab: React.FC<AcademicTabProps> = ({ student, isEditMode, onChange }) => {
  const [academicHistory, setAcademicHistory] = useState<AcademicRecord[]>(student.academicHistory || []);
  const [hasExemption, setHasExemption] = useState(!!student.physicalEducationExemption);
  const [exemption, setExemption] = useState<PhysicalEducationExemption>(
    student.physicalEducationExemption || { startDate: "", endDate: "", reason: "" }
  );
  const [startDate, setStartDate] = useState<Date | undefined>(
    student.physicalEducationExemption?.startDate ? new Date(student.physicalEducationExemption.startDate) : undefined
  );
  const [endDate, setEndDate] = useState<Date | undefined>(
    student.physicalEducationExemption?.endDate ? new Date(student.physicalEducationExemption.endDate) : undefined
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (onChange) {
      onChange(e.target.id, e.target.value);
    }
  };

  const handleSwitchChange = (checked: boolean) => {
    if (onChange) {
      onChange('attendsReligiousEducation', checked);
    }
  };

  const handleExemptionSwitchChange = (checked: boolean) => {
    setHasExemption(checked);
    if (!checked && onChange) {
      onChange('physicalEducationExemption', null);
    }
  };

  const handleExemptionChange = (field: keyof PhysicalEducationExemption, value: string) => {
    const updatedExemption = { ...exemption, [field]: value };
    setExemption(updatedExemption);
    
    if (onChange) {
      onChange('physicalEducationExemption', updatedExemption);
    }
  };

  const handleStartDateChange = (date: Date | undefined) => {
    setStartDate(date);
    if (date && onChange) {
      const formattedDate = format(date, "yyyy-MM-dd");
      const updatedExemption = { ...exemption, startDate: formattedDate };
      setExemption(updatedExemption);
      onChange('physicalEducationExemption', updatedExemption);
    }
  };

  const handleEndDateChange = (date: Date | undefined) => {
    setEndDate(date);
    if (date && onChange) {
      const formattedDate = format(date, "yyyy-MM-dd");
      const updatedExemption = { ...exemption, endDate: formattedDate };
      setExemption(updatedExemption);
      onChange('physicalEducationExemption', updatedExemption);
    }
  };

  const addAcademicRecord = () => {
    const newRecord: AcademicRecord = { 
      year: "", 
      class: "", 
      finalGrade: "", 
      notes: "" 
    };
    const updatedHistory = [...academicHistory, newRecord];
    setAcademicHistory(updatedHistory);
    if (onChange) {
      onChange('academicHistory', updatedHistory);
    }
  };

  const updateAcademicRecord = (index: number, field: keyof AcademicRecord, value: string) => {
    const updatedHistory = [...academicHistory];
    updatedHistory[index] = {
      ...updatedHistory[index],
      [field]: value
    };
    setAcademicHistory(updatedHistory);
    if (onChange) {
      onChange('academicHistory', updatedHistory);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Curriculum Scolastico</CardTitle>
        <CardDescription>Storia accademica e progressione scolastica</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <BasicAcademicFields
            enrollmentDate={student.enrollmentDate}
            previousSchool={student.previousSchool}
            attendsReligiousEducation={student.attendsReligiousEducation}
            onInputChange={handleChange}
            onSwitchChange={handleSwitchChange}
            isDisabled={!isEditMode}
          />

          <PhysicalEducationExemptionSection
            hasExemption={hasExemption}
            exemption={exemption}
            startDate={startDate}
            endDate={endDate}
            onExemptionSwitchChange={handleExemptionSwitchChange}
            onExemptionChange={handleExemptionChange}
            onStartDateChange={handleStartDateChange}
            onEndDateChange={handleEndDateChange}
            isDisabled={!isEditMode}
          />

          <AcademicHistory
            academicHistory={academicHistory}
            onAddRecord={addAcademicRecord}
            onUpdateRecord={updateAcademicRecord}
            isDisabled={!isEditMode}
          />

          <div className="space-y-2">
            <Label htmlFor="notes">Note Aggiuntive</Label>
            <textarea 
              id="notes" 
              className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              value={student.notes}
              onChange={handleChange}
              disabled={!isEditMode}
            />
          </div>

          {isEditMode && (
            <div className="flex justify-end mt-6">
              <Button>
                <Save className="mr-2 h-4 w-4" />
                Salva Modifiche
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default AcademicTab;
