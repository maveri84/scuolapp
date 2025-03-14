
import React, { useState, useEffect } from "react";
import { toast } from "sonner";
import { Student } from "../types/student";
import SpecialNeedsSelection from "./special-needs/SpecialNeedsSelection";
import StudentPermissions from "./special-needs/StudentPermissions";
import DocumentationAndNotes from "./special-needs/DocumentationAndNotes";

interface SpecialNeedsTabProps {
  student: Student;
  isEditMode?: boolean;
  onChange?: (field: keyof Student, value: any) => void;
}

const SpecialNeedsTab: React.FC<SpecialNeedsTabProps> = ({ student, isEditMode, onChange }) => {
  const [isH, setIsH] = useState(false);
  const [isDSA, setIsDSA] = useState(false);
  const [isBES, setIsBES] = useState(false);
  const [notes, setNotes] = useState(student.notes || "");
  const [useSchoolBus, setUseSchoolBus] = useState(student.useSchoolBus || false);
  const [independentExit, setIndependentExit] = useState(student.independentExit || false);
  const [localExitPermission, setLocalExitPermission] = useState(student.localExitPermission || false);
  const [privacyConsent, setPrivacyConsent] = useState(student.privacyConsent || false);
  
  const handleNotesChange = (value: string) => {
    setNotes(value);
    if (onChange) {
      onChange("notes", value);
    }
  };
  
  const handleSpecialNeedsChange = () => {
    if (onChange) {
      // When setting specialNeeds, we're considering it's true if any of these is true
      if (isH || isDSA || isBES) {
        onChange("specialNeeds", true);
      } else {
        onChange("specialNeeds", false);
      }
    }
  };
  
  const handleSave = () => {
    toast.success("Informazioni salvate con successo");
  };

  const handleUpload = () => {
    // In a real application, this would trigger a file upload dialog
    toast.info("Funzionalità di caricamento file non implementata in questa demo");
  };
  
  const updateToggle = (field: keyof Student, value: boolean) => {
    if (field === 'useSchoolBus') setUseSchoolBus(value);
    if (field === 'independentExit') setIndependentExit(value);
    if (field === 'localExitPermission') setLocalExitPermission(value);
    if (field === 'privacyConsent') setPrivacyConsent(value);
    
    if (onChange) {
      onChange(field, value);
    }
  };
  
  const handleHChange = (checked: boolean) => {
    setIsH(checked);
    handleSpecialNeedsChange();
  };
  
  const handleDSAChange = (checked: boolean) => {
    setIsDSA(checked);
    handleSpecialNeedsChange();
  };
  
  const handleBESChange = (checked: boolean) => {
    setIsBES(checked);
    handleSpecialNeedsChange();
  };
  
  useEffect(() => {
    // Update special needs value when component loads or when switches change
    if (onChange && (isH || isDSA || isBES)) {
      onChange("specialNeeds", true);
    }
  }, [isH, isDSA, isBES, onChange]);

  return (
    <div className="space-y-6">
      <SpecialNeedsSelection
        isH={isH}
        isDSA={isDSA}
        isBES={isBES}
        onHChange={handleHChange}
        onDSAChange={handleDSAChange}
        onBESChange={handleBESChange}
        isDisabled={!isEditMode}
      />
      
      <StudentPermissions
        useSchoolBus={useSchoolBus}
        independentExit={independentExit}
        localExitPermission={localExitPermission}
        privacyConsent={privacyConsent}
        onToggleChange={updateToggle}
        onUploadClick={handleUpload}
        isDisabled={!isEditMode}
      />
      
      {(isH || isDSA || isBES) && (
        <DocumentationAndNotes
          notes={notes}
          onNotesChange={handleNotesChange}
          onSave={handleSave}
          onUpload={handleUpload}
          isDisabled={!isEditMode}
          showSaveButton={isEditMode}
        />
      )}
    </div>
  );
};

export default SpecialNeedsTab;
