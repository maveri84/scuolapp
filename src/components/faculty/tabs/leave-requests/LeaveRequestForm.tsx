
import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import { it } from "date-fns/locale";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { 
  LeaveRequestType, 
  leaveTypeDetails
} from "../../types/leave-requests";
import { 
  FileUp,
  X,
  Calendar,
  FileCheck,
  Info,
  HelpCircle
} from "lucide-react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

// Form schema for validation
const leaveRequestSchema = z.object({
  type: z.string({
    required_error: "Seleziona il tipo di assenza",
  }),
  startDate: z.date({
    required_error: "Seleziona la data di inizio",
  }),
  endDate: z.date({
    required_error: "Seleziona la data di fine",
  }),
  description: z.string().min(5, {
    message: "La descrizione deve essere di almeno 5 caratteri",
  }),
  attachments: z.array(z.any()).optional(),
});

export type LeaveRequestFormValues = z.infer<typeof leaveRequestSchema>;

interface LeaveRequestFormProps {
  contractType: string;
  teacherId: string;
  availableLeaveTypes: LeaveRequestType[];
  onSubmit: (data: LeaveRequestFormValues, files: File[]) => void;
  onCancel: () => void;
}

const LeaveRequestForm: React.FC<LeaveRequestFormProps> = ({ 
  contractType, 
  teacherId, 
  availableLeaveTypes, 
  onSubmit, 
  onCancel 
}) => {
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [selectedLeaveType, setSelectedLeaveType] = useState<LeaveRequestType | null>(null);
  const { toast } = useToast();

  const form = useForm<LeaveRequestFormValues>({
    resolver: zodResolver(leaveRequestSchema),
    defaultValues: {
      description: "",
      attachments: [],
    },
  });

  // Aggiorna la descrizione quando cambia il tipo di assenza
  useEffect(() => {
    if (selectedLeaveType) {
      const currentDescription = form.getValues("description");
      // Solo se la descrizione è vuota o è la descrizione predefinita di un altro tipo
      if (!currentDescription || Object.values(leaveTypeDetails).some(detail => 
        detail.description === currentDescription && detail.label !== leaveTypeDetails[selectedLeaveType].label)) {
        form.setValue("description", leaveTypeDetails[selectedLeaveType].description);
      }
    }
  }, [selectedLeaveType, form]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files);
      setUploadedFiles(prev => [...prev, ...newFiles]);
    }
  };

  const removeFile = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (data: LeaveRequestFormValues) => {
    // Verifica se sono richiesti gli allegati
    const leaveType = data.type as LeaveRequestType;
    const requiresDocumentation = leaveTypeDetails[leaveType].requiresDocumentation;
    
    if (requiresDocumentation && uploadedFiles.length === 0) {
      toast({
        title: "Documenti richiesti",
        description: `Per questa tipologia di assenza è necessario allegare della documentazione.`,
        variant: "destructive"
      });
      return;
    }
    
    onSubmit(data, uploadedFiles);
  };

  const handleLeaveTypeChange = (value: string) => {
    const leaveType = value as LeaveRequestType;
    setSelectedLeaveType(leaveType);
    form.setValue("type", value);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <div className="bg-muted/50 p-3 rounded-md">
          <p className="text-sm text-muted-foreground">
            <span className="font-medium">Tipo di contratto:</span> {contractType}
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            Le tipologie di assenza disponibili sono filtrate in base al tuo tipo di contratto.
          </p>
        </div>
        
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tipo di Assenza *</FormLabel>
              <Select 
                onValueChange={(value) => handleLeaveTypeChange(value)} 
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleziona il tipo di assenza" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {availableLeaveTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      <div className="flex items-center">
                        <span>{leaveTypeDetails[type].label}</span>
                        {leaveTypeDetails[type].maxDays && (
                          <span className="ml-2 text-xs text-muted-foreground">
                            (max {leaveTypeDetails[type].maxDays} giorni)
                          </span>
                        )}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {selectedLeaveType && (
                <div className="mt-1 text-xs text-muted-foreground flex items-center">
                  <Info className="h-3 w-3 mr-1" />
                  {leaveTypeDetails[selectedLeaveType].description}
                  {leaveTypeDetails[selectedLeaveType].requiresDocumentation && (
                    <span className="ml-2 text-amber-600 font-medium">
                      Richiede documentazione
                    </span>
                  )}
                </div>
              )}
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="startDate"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Data di Inizio *</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP", { locale: it })
                        ) : (
                          <span>Seleziona una data</span>
                        )}
                        <Calendar className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <CalendarComponent
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      initialFocus
                      className={cn("p-3 pointer-events-auto")}
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="endDate"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Data di Fine *</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP", { locale: it })
                        ) : (
                          <span>Seleziona una data</span>
                        )}
                        <Calendar className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <CalendarComponent
                      mode="single"
                      selected={field.value}
                      onSelect={(date) => {
                        field.onChange(date);
                        
                        // Controllo sui giorni massimi per il tipo di assenza selezionato
                        if (selectedLeaveType && date && form.getValues("startDate")) {
                          const maxDays = leaveTypeDetails[selectedLeaveType].maxDays;
                          if (maxDays) {
                            const startDate = form.getValues("startDate");
                            const diffDays = Math.floor((date.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)) + 1;
                            
                            if (diffDays > maxDays) {
                              toast({
                                title: "Attenzione",
                                description: `Per ${leaveTypeDetails[selectedLeaveType].label} il massimo è di ${maxDays} giorni. L'assenza richiesta è di ${diffDays} giorni.`,
                                variant: "destructive"
                              });
                            }
                          }
                        }
                      }}
                      initialFocus
                      className={cn("p-3 pointer-events-auto")}
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Motivazione *</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Descrivi la motivazione della richiesta" 
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormItem>
          <div className="flex items-center justify-between">
            <FormLabel>
              Allegati
              {selectedLeaveType && leaveTypeDetails[selectedLeaveType].requiresDocumentation && (
                <span className="ml-2 text-red-500">*</span>
              )}
            </FormLabel>
            {selectedLeaveType && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" type="button">
                      <HelpCircle className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="max-w-xs">
                      {leaveTypeDetails[selectedLeaveType].requiresDocumentation 
                        ? "Per questa tipologia di assenza è obbligatorio allegare documentazione" 
                        : "Per questa tipologia di assenza non è necessario allegare documentazione"}
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
          </div>
          <div className="grid grid-cols-1 gap-4">
            <div className="border-2 border-dashed rounded-md p-4 text-center">
              <Input
                type="file"
                className="hidden"
                id="file-upload"
                onChange={handleFileUpload}
                multiple
              />
              <label 
                htmlFor="file-upload" 
                className="cursor-pointer flex flex-col items-center"
              >
                <FileUp className="h-8 w-8 text-muted-foreground mb-2" />
                <span className="text-sm text-muted-foreground">
                  Trascina qui i file o clicca per selezionare
                </span>
                <span className="text-xs text-muted-foreground mt-1">
                  PDF, JPG, PNG (max 5MB)
                </span>
              </label>
            </div>
            
            {uploadedFiles.length > 0 && (
              <div className="space-y-2">
                {uploadedFiles.map((file, index) => (
                  <div 
                    key={index} 
                    className="flex items-center justify-between p-2 bg-muted rounded"
                  >
                    <div className="flex items-center">
                      <FileCheck className="h-4 w-4 mr-2" />
                      <span className="text-sm truncate max-w-[200px]">
                        {file.name}
                      </span>
                      <span className="text-xs text-muted-foreground ml-2">
                        {(file.size / 1024).toFixed(0)} KB
                      </span>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => removeFile(index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>
          <FormDescription>
            {selectedLeaveType && leaveTypeDetails[selectedLeaveType].requiresDocumentation
              ? "Allegare certificati o altri documenti richiesti per questa tipologia di assenza."
              : "Allega documentazione opzionale a supporto della richiesta."}
          </FormDescription>
        </FormItem>
        
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline" type="button" onClick={onCancel}>Annulla</Button>
          </DialogClose>
          <Button type="submit">Invia Richiesta</Button>
        </DialogFooter>
      </form>
    </Form>
  );
};

export default LeaveRequestForm;
