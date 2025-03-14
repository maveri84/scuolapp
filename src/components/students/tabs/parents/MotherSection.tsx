
import React from "react";
import ParentFormFields from "./ParentFormFields";
import { Student } from "../../types/student";

interface MotherSectionProps {
  student: Student;
  onChange?: (field: string, value: any) => void;
}

const MotherSection: React.FC<MotherSectionProps> = ({ student, onChange }) => {
  const handleChange = (field: string, value: any) => {
    if (onChange) {
      onChange(field, value);
    }
  };

  const motherData = {
    firstName: student.motherFirstName,
    lastName: student.motherLastName,
    fiscalCode: student.motherFiscalCode,
    email: student.motherEmail,
    phone: student.motherPhone,
    occupation: student.motherOccupation,
    education: student.motherEducation,
    maritalStatus: student.motherMaritalStatus
  };

  return (
    <div>
      <h3 className="text-lg font-medium mb-4">Madre</h3>
      <ParentFormFields 
        prefix="mother" 
        parentData={motherData} 
        onChange={handleChange} 
      />
    </div>
  );
};

export default MotherSection;
