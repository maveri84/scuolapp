
import React from "react";
import { Student } from "./types/student";
import ProfileCard from "./profile/ProfileCard";
import StudentFormHeader from "./form/StudentFormHeader";
import StudentFormTabs from "./form/StudentFormTabs";
import { useStudentForm } from "./form/useStudentForm";

interface AddStudentFormProps {
  onCancel: () => void;
  onSave: (student: Student) => void;
}

const AddStudentForm: React.FC<AddStudentFormProps> = ({ onCancel, onSave }) => {
  const {
    student,
    activeTab,
    isSubmitting,
    setActiveTab,
    updateStudentField,
    handleSubmit
  } = useStudentForm({ onSave });

  return (
    <div className="space-y-6">
      <StudentFormHeader 
        isSubmitting={isSubmitting}
        onCancel={onCancel}
        onSubmit={handleSubmit}
      />

      <div className="flex flex-col md:flex-row gap-6">
        <ProfileCard student={student} />
      </div>

      <StudentFormTabs
        student={student}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        updateStudentField={updateStudentField}
      />
    </div>
  );
};

export default AddStudentForm;
