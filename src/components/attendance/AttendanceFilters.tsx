
import React from "react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { 
  Search, 
  Calendar as CalendarIcon, 
  Filter,
  Plus
} from "lucide-react";
import { format } from "date-fns";

interface AttendanceFiltersProps {
  searchQuery: string;
  setSearchQuery: (value: string) => void;
  selectedClass: string;
  setSelectedClass: (value: string) => void;
  selectedType: string;
  setSelectedType: (value: string) => void;
  selectedDate: Date | undefined;
  setSelectedDate: (date: Date | undefined) => void;
  onNewAttendance: () => void;
}

const AttendanceFilters: React.FC<AttendanceFiltersProps> = ({
  searchQuery,
  setSearchQuery,
  selectedClass,
  setSelectedClass,
  selectedType,
  setSelectedType,
  selectedDate,
  setSelectedDate,
  onNewAttendance
}) => {
  return (
    <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4 mt-4">
      <div className="relative flex-1">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Cerca studente..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-8"
        />
      </div>
      
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" className="w-full sm:w-auto">
            <CalendarIcon className="mr-2 h-4 w-4" />
            {selectedDate ? format(selectedDate, 'dd/MM/yyyy') : "Seleziona data"}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={setSelectedDate}
            initialFocus
          />
        </PopoverContent>
      </Popover>
      
      <Select value={selectedClass} onValueChange={setSelectedClass}>
        <SelectTrigger className="w-full sm:w-[150px]">
          <div className="flex items-center">
            <Filter className="mr-2 h-4 w-4" />
            <SelectValue placeholder="Classe" />
          </div>
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="">Tutte le classi</SelectItem>
          <SelectItem value="1A">1A</SelectItem>
          <SelectItem value="1B">1B</SelectItem>
          <SelectItem value="2A">2A</SelectItem>
          <SelectItem value="2B">2B</SelectItem>
          <SelectItem value="3A">3A</SelectItem>
          <SelectItem value="3B">3B</SelectItem>
        </SelectContent>
      </Select>
      
      <Select value={selectedType} onValueChange={setSelectedType}>
        <SelectTrigger className="w-full sm:w-[180px]">
          <div className="flex items-center">
            <Filter className="mr-2 h-4 w-4" />
            <SelectValue placeholder="Tipo" />
          </div>
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="">Tutti i tipi</SelectItem>
          <SelectItem value="absence">Assenze</SelectItem>
          <SelectItem value="late">Ritardi</SelectItem>
          <SelectItem value="early-exit">Uscite anticipate</SelectItem>
          <SelectItem value="justification">Giustificazioni</SelectItem>
        </SelectContent>
      </Select>
      
      <Button className="w-full sm:w-auto" onClick={onNewAttendance}>
        <Plus className="mr-2 h-4 w-4" />
        Nuova Registrazione
      </Button>
    </div>
  );
};

export default AttendanceFilters;
