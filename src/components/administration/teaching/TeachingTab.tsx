
import React, { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { FileText, BookMarked, Lightbulb, Video } from "lucide-react";
import { SearchBar } from "./components/SearchBar";
import { ActionButtons } from "./components/ActionButtons";
import { MaterialsTab } from "./tabs/MaterialsTab";
import { CoursesTab } from "./tabs/CoursesTab";
import { ResourcesTab } from "./tabs/ResourcesTab";
import { MultimediaTab } from "./tabs/MultimediaTab";

const TeachingTab: React.FC = () => {
  const [activeTab, setActiveTab] = useState("materials");
  const { toast } = useToast();
  
  const handleUpload = () => {
    toast({
      title: "Caricamento avviato",
      description: "Il materiale didattico è in fase di caricamento"
    });
  };
  
  const handleShare = () => {
    toast({
      title: "Condivisione completata",
      description: "Il materiale è stato condiviso con successo"
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
        <SearchBar />
        <ActionButtons onUpload={handleUpload} />
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="materials" className="flex items-center">
            <FileText className="mr-2 h-4 w-4" />
            Materiali
          </TabsTrigger>
          <TabsTrigger value="courses" className="flex items-center">
            <BookMarked className="mr-2 h-4 w-4" />
            Corsi
          </TabsTrigger>
          <TabsTrigger value="resources" className="flex items-center">
            <Lightbulb className="mr-2 h-4 w-4" />
            Risorse
          </TabsTrigger>
          <TabsTrigger value="multimedia" className="flex items-center">
            <Video className="mr-2 h-4 w-4" />
            Multimedia
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="materials">
          <MaterialsTab />
        </TabsContent>
        
        <TabsContent value="courses">
          <CoursesTab />
        </TabsContent>
        
        <TabsContent value="resources">
          <ResourcesTab />
        </TabsContent>
        
        <TabsContent value="multimedia">
          <MultimediaTab onUpload={handleUpload} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TeachingTab;
