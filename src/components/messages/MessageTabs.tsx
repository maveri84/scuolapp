
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Inbox, Send, FileText, CheckSquare } from "lucide-react";
import MessageFilters from "./MessageFilters";
import MessageTable from "./MessageTable";
import TemplateDialog from "./TemplateDialog";

interface MessageTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isTemplateDialogOpen: boolean;
  setIsTemplateDialogOpen: (open: boolean) => void;
}

const MessageTabs: React.FC<MessageTabsProps> = ({ 
  activeTab, 
  setActiveTab, 
  isTemplateDialogOpen, 
  setIsTemplateDialogOpen 
}) => {
  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
      <TabsList className="mb-4">
        <TabsTrigger value="inbox">
          <Inbox className="mr-2 h-4 w-4" />
          Ricevute
        </TabsTrigger>
        <TabsTrigger value="sent">
          <Send className="mr-2 h-4 w-4" />
          Inviate
        </TabsTrigger>
        <TabsTrigger value="drafts">
          <FileText className="mr-2 h-4 w-4" />
          Bozze
        </TabsTrigger>
        <TabsTrigger value="templates">
          <CheckSquare className="mr-2 h-4 w-4" />
          Modelli
        </TabsTrigger>
      </TabsList>

      <TabsContent value="inbox" className="space-y-4">
        <MessageFilters />
        <MessageTable type="inbox" />
      </TabsContent>

      <TabsContent value="sent" className="space-y-4">
        <MessageFilters />
        <MessageTable type="sent" />
      </TabsContent>

      <TabsContent value="drafts" className="space-y-4">
        <MessageTable type="drafts" />
      </TabsContent>

      <TabsContent value="templates" className="space-y-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium">Modelli di comunicazione</h3>
          <TemplateDialog 
            isOpen={isTemplateDialogOpen} 
            onOpenChange={setIsTemplateDialogOpen} 
          />
        </div>
        <MessageTable type="templates" />
      </TabsContent>
    </Tabs>
  );
};

export default MessageTabs;
