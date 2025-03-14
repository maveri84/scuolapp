
import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Calendar as CalendarIcon } from "lucide-react";
import { PhysicalEducationExemption as PhysicalEducationExemptionType } from "../../types/student";

interface PhysicalEducationExemptionProps {
  hasExemption: boolean;
  exemption: PhysicalEducationExemptionType;
  startDate: Date | undefined;
  endDate: Date | undefined;
  onExemptionSwitchChange: (checked: boolean) => void;
  onExemptionChange: (field: keyof PhysicalEducationExemptionType, value: string) => void;
  onStartDateChange: (date: Date | undefined) => void;
  onEndDateChange: (date: Date | undefined) => void;
}

const PhysicalEducationExemption: React.FC<PhysicalEducationExemptionProps> = ({
  hasExemption,
  exemption,
  startDate,
  endDate,
  onExemptionSwitchChange,
  onExemptionChange,
  onStartDateChange,
  onEndDateChange,
}) => {
  return (
    <div className="border p-4 rounded-md">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium">Esonero Educazione Fisica</h3>
        <div className="flex items-center space-x-2">
          <Switch 
            id="hasExemption" 
            checked={hasExemption} 
            onCheckedChange={onExemptionSwitchChange}
          />
          <Label htmlFor="hasExemption" className="mb-0">
            {hasExemption ? 'Attivo' : 'Non attivo'}
          </Label>
        </div>
      </div>
      
      {hasExemption && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="exemption-start">Data Inizio</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !startDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {startDate ? format(startDate, "dd/MM/yyyy") : <span>Seleziona data</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={startDate}
                  onSelect={onStartDateChange}
                  initialFocus
                  className={cn("p-3 pointer-events-auto")}
                />
              </PopoverContent>
            </Popover>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="exemption-end">Data Fine</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !endDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {endDate ? format(endDate, "dd/MM/yyyy") : <span>Seleziona data</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={endDate}
                  onSelect={onEndDateChange}
                  initialFocus
                  className={cn("p-3 pointer-events-auto")}
                />
              </PopoverContent>
            </Popover>
          </div>
          
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="exemption-reason">Motivo dell'Esonero</Label>
            <Input
              id="exemption-reason"
              value={exemption.reason}
              placeholder="Specificare il motivo dell'esonero"
              onChange={(e) => onExemptionChange('reason', e.target.value)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default PhysicalEducationExemption;
