
import React, { useState } from "react";
import { Tabs } from "@/components/ui/tabs";
import { mockTeachers } from "./types/faculty";
import { getInitialTeacher } from "./utils/teacherUtils";
import { TeacherProvider } from "./context/TeacherContext";
import FacultyActionBar from "./FacultyActionBar";
import FacultyTabHeader from "./FacultyTabHeader";
import TeacherProfileCard from "./TeacherProfileCard";
import { renderTabContent } from "./hooks/useTeacherTabs";

interface FacultyDetailProps {
  teacherId: string | null;
  isNewTeacher?: boolean;
  onSave?: () => void;
  onBack: () => void;
}

const FacultyDetail: React.FC<FacultyDetailProps> = ({ 
  teacherId, 
  isNewTeacher = false, 
  onSave, 
  onBack 
}) => {
  // Find the teacher or use empty teacher template
  const initialTeacher = getInitialTeacher(teacherId, isNewTeacher, mockTeachers);
  const [activeTab, setActiveTab] = useState("personal");

  const handleSave = () => {
    // In a real application, you would call an API to save the teacher
    if (onSave) onSave();
  };

  return (
    <TeacherProvider initialTeacher={initialTeacher} onSave={onSave}>
      <div className="space-y-6">
        <FacultyActionBar onBack={onBack} onSave={handleSave} />

        <div className="flex flex-col md:flex-row gap-6">
          <TeacherProfileCard teacher={initialTeacher} />
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <FacultyTabHeader activeTab={activeTab} />
          {renderTabContent(activeTab)}
        </Tabs>
      </div>
    </TeacherProvider>
  );
};

export default FacultyDetail;
