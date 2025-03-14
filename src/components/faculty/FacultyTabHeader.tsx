
import React from "react";
import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTeacherTabs } from "./hooks/useTeacherTabs";

interface FacultyTabHeaderProps {
  activeTab: string;
}

const FacultyTabHeader: React.FC<FacultyTabHeaderProps> = ({ activeTab }) => {
  const { tabs } = useTeacherTabs();
  
  return (
    <TabsList className="mb-4 flex-wrap">
      {tabs.map((tab) => (
        <TabsTrigger key={tab.id} value={tab.id}>
          {tab.icon}
          {tab.label}
        </TabsTrigger>
      ))}
    </TabsList>
  );
};

export default FacultyTabHeader;
