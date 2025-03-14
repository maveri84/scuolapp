
import React from "react";
import ParentFormFields from "./ParentFormFields";
import { Student } from "../../types/student";

interface FatherSectionProps {
  student: Student;
  onChange?: (field: string, value: any) => void;
}

const FatherSection: React.FC<FatherSectionProps> = ({ student, onChange }) => {
  const handleChange = (field: string, value: any) => {
    if (onChange) {
      onChange(field, value);
    }
  };

  const fatherData = {
    firstName: student.fatherFirstName,
    lastName: student.fatherLastName,
    fiscalCode: student.fatherFiscalCode,
    email: student.fatherEmail,
    phone: student.fatherPhone,
    occupation: student.fatherOccupation,
    education: student.fatherEducation,
    maritalStatus: student.fatherMaritalStatus
  };

  return (
    <div>
      <h3 className="text-lg font-medium mb-4">Padre</h3>
      <ParentFormFields 
        prefix="father" 
        parentData={fatherData} 
        onChange={handleChange} 
      />
    </div>
  );
};

export default FatherSection;
