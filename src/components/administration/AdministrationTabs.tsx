
import React from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useIsMobile } from "@/hooks/use-mobile";
import { 
  BookOpen, 
  Calendar, 
  Database, 
  FileBox, 
  FileText, 
  GraduationCap, 
  Shield,
  Users 
} from "lucide-react";

interface AdministrationTabsProps {
  activeTab: string;
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;
}

const AdministrationTabs: React.FC<AdministrationTabsProps> = ({ activeTab, setActiveTab }) => {
  const isMobile = useIsMobile();

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
      <TabsList className={`grid ${isMobile ? 'grid-cols-4' : 'grid-cols-8'} gap-2`}>
        <TabsTrigger value="students" className="flex items-center">
          <GraduationCap className="mr-2 h-4 w-4" />
          <span className={isMobile ? "hidden" : "inline"}>Studenti</span>
        </TabsTrigger>
        <TabsTrigger value="personnel" className="flex items-center">
          <Users className="mr-2 h-4 w-4" />
          <span className={isMobile ? "hidden" : "inline"}>Personale</span>
        </TabsTrigger>
        <TabsTrigger value="calendar" className="flex items-center">
          <Calendar className="mr-2 h-4 w-4" />
          <span className={isMobile ? "hidden" : "inline"}>Calendario</span>
        </TabsTrigger>
        <TabsTrigger value="documents" className="flex items-center">
          <FileText className="mr-2 h-4 w-4" />
          <span className={isMobile ? "hidden" : "inline"}>Documenti</span>
        </TabsTrigger>
        <TabsTrigger value="certificates" className="flex items-center">
          <Shield className="mr-2 h-4 w-4" />
          <span className={isMobile ? "hidden" : "inline"}>Certificati</span>
        </TabsTrigger>
        <TabsTrigger value="protocol" className="flex items-center">
          <FileBox className="mr-2 h-4 w-4" />
          <span className={isMobile ? "hidden" : "inline"}>Protocollo</span>
        </TabsTrigger>
        <TabsTrigger value="database" className="flex items-center">
          <Database className="mr-2 h-4 w-4" />
          <span className={isMobile ? "hidden" : "inline"}>Database</span>
        </TabsTrigger>
        <TabsTrigger value="teaching" className="flex items-center">
          <BookOpen className="mr-2 h-4 w-4" />
          <span className={isMobile ? "hidden" : "inline"}>Didattica</span>
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
};

export default AdministrationTabs;
