
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { it } from "date-fns/locale";
import { CalendarIcon, CheckCircle2, Search } from "lucide-react";
import { classesData, subjectsData } from "../types/lesson";

interface LessonFiltersProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedClass: string | null;
  setSelectedClass: (classId: string | null) => void;
  selectedSubject: string | null;
  setSelectedSubject: (subjectId: string | null) => void;
  selectedDate: Date | null;
  setSelectedDate: (date: Date | null) => void;
  showCompleted: boolean;
  setShowCompleted: (show: boolean) => void;
}

const LessonFilters: React.FC<LessonFiltersProps> = ({
  searchQuery,
  setSearchQuery,
  selectedClass,
  setSelectedClass,
  selectedSubject,
  setSelectedSubject,
  selectedDate,
  setSelectedDate,
  showCompleted,
  setShowCompleted,
}) => {
  return (
    <div className="flex flex-col sm:flex-row gap-4">
      <div className="relative flex-1">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Cerca lezioni..."
          className="pl-8"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      
      <div className="flex flex-wrap gap-2">
        <Select 
          value={selectedClass || ""} 
          onValueChange={(value) => setSelectedClass(value || null)}
        >
          <SelectTrigger className="w-[120px]">
            <SelectValue placeholder="Classe" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">Tutte</SelectItem>
            {classesData.map((classItem) => (
              <SelectItem key={classItem.id} value={classItem.name}>
                {classItem.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        
        <Select 
          value={selectedSubject || ""} 
          onValueChange={(value) => setSelectedSubject(value || null)}
        >
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="Materia" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">Tutte</SelectItem>
            {subjectsData.map((subject) => (
              <SelectItem key={subject.id} value={subject.name}>
                {subject.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="h-10">
              <CalendarIcon className="mr-2 h-4 w-4" />
              {selectedDate ? format(selectedDate, 'd MMM', { locale: it }) : "Data"}
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
        
        <Button
          variant="outline"
          className="h-10"
          onClick={() => setShowCompleted(!showCompleted)}
        >
          <CheckCircle2 className={`mr-2 h-4 w-4 ${showCompleted ? 'text-green-500' : 'text-muted-foreground'}`} />
          {showCompleted ? 'Nascondi Completate' : 'Mostra Completate'}
        </Button>
      </div>
    </div>
  );
};

export default LessonFilters;
