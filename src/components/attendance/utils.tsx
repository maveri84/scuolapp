
import React from "react";
import { AttendanceRecord } from "./types";
import { Badge } from "@/components/ui/badge";
import { UserX, AlarmClock, ArrowRightFromLine, FileCheck } from "lucide-react";
import { format } from "date-fns";

export const getTypeIcon = (type: string) => {
  switch (type) {
    case "absence":
      return <UserX className="h-4 w-4 text-red-500" />;
    case "late":
      return <AlarmClock className="h-4 w-4 text-amber-500" />;
    case "early-exit":
      return <ArrowRightFromLine className="h-4 w-4 text-blue-500" />;
    case "justification":
      return <FileCheck className="h-4 w-4 text-green-500" />;
    default:
      return null;
  }
};

export const getTypeBadge = (type: string) => {
  switch (type) {
    case "absence":
      return <Badge variant="destructive" className="flex items-center gap-1">
        <UserX className="h-3 w-3" /> Assenza
      </Badge>;
    case "late":
      return <Badge variant="default" className="flex items-center gap-1 bg-amber-500">
        <AlarmClock className="h-3 w-3" /> Ritardo
      </Badge>;
    case "early-exit":
      return <Badge variant="default" className="flex items-center gap-1 bg-blue-500">
        <ArrowRightFromLine className="h-3 w-3" /> Uscita ant.
      </Badge>;
    case "justification":
      return <Badge variant="default" className="flex items-center gap-1 bg-green-500">
        <FileCheck className="h-3 w-3" /> Giustificazione
      </Badge>;
    default:
      return null;
  }
};

export const filterAttendanceData = (
  data: AttendanceRecord[],
  searchQuery: string,
  selectedClass: string,
  selectedType: string,
  selectedDate?: Date
) => {
  return data.filter(item => {
    const matchesSearch = item.studentName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesClass = selectedClass ? item.class === selectedClass : true;
    const matchesType = selectedType ? item.type === selectedType : true;
    
    // Filter by date if selected
    const matchesDate = selectedDate 
      ? item.date === format(selectedDate, 'yyyy-MM-dd')
      : true;
    
    return matchesSearch && matchesClass && matchesType && matchesDate;
  });
};

export const formatDate = (dateString: string): string => {
  return format(new Date(dateString), 'dd/MM/yyyy');
};
