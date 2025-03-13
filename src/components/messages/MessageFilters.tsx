
import React from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowUpDown, Filter } from "lucide-react";

const MessageFilters: React.FC = () => {
  return (
    <div className="flex justify-between items-center mb-4">
      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm">
          <Filter className="h-4 w-4 mr-2" />
          Filtri
        </Button>
        <Select defaultValue="all">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Tipo di messaggio" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tutti i messaggi</SelectItem>
            <SelectItem value="email">Email</SelectItem>
            <SelectItem value="push">Notifiche Push</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Button variant="outline" size="sm">
        <ArrowUpDown className="h-4 w-4 mr-2" />
        Ordina
      </Button>
    </div>
  );
};

export default MessageFilters;
