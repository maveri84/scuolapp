
import React, { createContext, useContext, useState } from "react";
import { Teacher } from "../types/faculty";

interface TeacherContextType {
  teacher: Teacher;
  updateTeacher: (field: keyof Teacher, value: any) => void;
  updateNestedField: (category: keyof Teacher, itemId: string, field: string, value: any) => void;
}

const TeacherContext = createContext<TeacherContextType | undefined>(undefined);

export const TeacherProvider: React.FC<{
  initialTeacher: Teacher;
  children: React.ReactNode;
  onSave?: () => void;
}> = ({ initialTeacher, children, onSave }) => {
  const [teacher, setTeacher] = useState<Teacher>(initialTeacher);

  const updateTeacher = (field: keyof Teacher, value: any) => {
    setTeacher(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const updateNestedField = (
    category: keyof Teacher, 
    itemId: string, 
    field: string, 
    value: any
  ) => {
    setTeacher(prev => {
      const items = [...(prev[category] as any[])];
      const itemIndex = items.findIndex(item => item.id === itemId);
      
      if (itemIndex >= 0) {
        items[itemIndex] = {
          ...items[itemIndex],
          [field]: value
        };
      }
      
      return {
        ...prev,
        [category]: items
      };
    });
  };

  const handleSave = () => {
    if (onSave) onSave();
  };

  const contextValue: TeacherContextType = {
    teacher,
    updateTeacher,
    updateNestedField
  };

  return (
    <TeacherContext.Provider value={contextValue}>
      {children}
    </TeacherContext.Provider>
  );
};

export const useTeacher = (): TeacherContextType => {
  const context = useContext(TeacherContext);
  if (context === undefined) {
    throw new Error("useTeacher must be used within a TeacherProvider");
  }
  return context;
};
