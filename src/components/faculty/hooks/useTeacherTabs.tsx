import React from "react";
import {
  User,
  Building,
  GraduationCap,
  Briefcase,
  FileText,
  Mail,
  BadgeEuro,
  Shield,
} from "lucide-react";
import { TabsContent } from "@/components/ui/tabs";
import PersonalInfoTab from "../tabs/PersonalInfoTab";
import EmploymentTab from "../tabs/EmploymentTab";
import QualificationsTab from "../tabs/QualificationsTab";
import ServicesTab from "../tabs/ServicesTab";
import DocumentsTab from "../tabs/DocumentsTab";
import CommunicationsTab from "../tabs/CommunicationsTab";
import PayrollTab from "../tabs/PayrollTab";
import PermissionsTab from "../tabs/PermissionsTab";
import { useTeacher } from "../context/TeacherContext";
import { Teacher } from "../types";

export interface TabDefinition {
  id: string;
  label: string;
  icon: React.ReactNode;
  content: React.ReactNode;
}

export const useTeacherTabs = () => {
  const { teacher, updateTeacher } = useTeacher();

  const tabs: TabDefinition[] = [
    {
      id: "personal",
      label: "Anagrafica",
      icon: <User className="mr-2 h-4 w-4" />,
      content: (
        <PersonalInfoTab
          teacher={teacher}
          onChange={(field, value) => updateTeacher(field as keyof typeof teacher, value)}
        />
      ),
    },
    {
      id: "employment",
      label: "Impiego",
      icon: <Building className="mr-2 h-4 w-4" />,
      content: (
        <EmploymentTab
          teacher={teacher}
          onChange={(field, value) => updateTeacher(field as keyof typeof teacher, value)}
        />
      ),
    },
    {
      id: "qualifications",
      label: "Qualifiche",
      icon: <GraduationCap className="mr-2 h-4 w-4" />,
      content: (
        <QualificationsTab
          teacher={teacher}
          onChange={updateTeacher}
        />
      ),
    },
    {
      id: "services",
      label: "Servizi",
      icon: <Briefcase className="mr-2 h-4 w-4" />,
      content: (
        <ServicesTab
          teacher={teacher}
          onChange={updateTeacher}
        />
      ),
    },
    {
      id: "documents",
      label: "Documenti",
      icon: <FileText className="mr-2 h-4 w-4" />,
      content: (
        <DocumentsTab teacherId={teacher.id} />
      ),
    },
    {
      id: "communications",
      label: "Comunicazioni",
      icon: <Mail className="mr-2 h-4 w-4" />,
      content: (
        <CommunicationsTab teacherId={teacher.id} />
      ),
    },
    {
      id: "payroll",
      label: "Stipendio",
      icon: <BadgeEuro className="mr-2 h-4 w-4" />,
      content: (
        <PayrollTab teacher={teacher} />
      ),
    },
    {
      id: "permissions",
      label: "Permessi",
      icon: <Shield className="mr-2 h-4 w-4" />,
      content: (
        <PermissionsTab
          teacher={teacher}
          onChange={(field, value) => updateTeacher(field as keyof typeof teacher, value)}
        />
      ),
    },
  ];

  return { tabs };
};

export const renderTabContent = (activeTab: string) => {
  const { tabs } = useTeacherTabs();
  
  return (
    <>
      {tabs.map((tab) => (
        <TabsContent key={tab.id} value={tab.id} className="space-y-4">
          {tab.content}
        </TabsContent>
      ))}
    </>
  );
};
