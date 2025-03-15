
import React from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export const SearchBar: React.FC = () => {
  return (
    <div className="flex-1 w-full md:max-w-sm relative">
      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input placeholder="Cerca materiale didattico..." className="pl-8" />
    </div>
  );
};
