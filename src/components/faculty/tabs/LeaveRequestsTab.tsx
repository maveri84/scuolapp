
import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import { it } from "date-fns/locale";
import { useTeacher } from "../context/TeacherContext";
import { 
  LeaveRequest, 
  LeaveRequestType, 
  mockLeaveRequests,
  leaveTypesByContract,
  leaveTypeDetails,
  ContractType
} from "../types/leave-requests";
import { 
  Calendar,
  FileUp,
  FilePlus,
  X,
  Plus,
  CalendarRange,
  FileCheck,
  Info,
  HelpCircle
} from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
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
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
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

type LeaveRequestFormValues = z.infer<typeof leaveRequestSchema>;

// Translation map for leave request status
const statusTranslations: Record<string, { label: string, color: string }> = {
  pending: { label: "In attesa", color: "bg-amber-500" },
  approved: { label: "Approvata", color: "bg-green-500" },
  rejected: { label: "Respinta", color: "bg-red-500" },
  canceled: { label: "Annullata", color: "bg-gray-500" },
};

interface LeaveRequestsTabProps {
  teacherId: string;
}

const LeaveRequestsTab: React.FC<LeaveRequestsTabProps> = ({ teacherId }) => {
  const { teacher } = useTeacher();
  const [leaveRequests, setLeaveRequests] = useState<LeaveRequest[]>(
    mockLeaveRequests.filter(req => req.teacherId === teacherId)
  );
  const [isNewRequestOpen, setIsNewRequestOpen] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [selectedLeaveType, setSelectedLeaveType] = useState<LeaveRequestType | null>(null);
  const { toast } = useToast();

  const contractType = teacher.contractType as ContractType || "Tempo Determinato";
  const availableLeaveTypes = leaveTypesByContract[contractType] || [];

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

  const onSubmit = (data: LeaveRequestFormValues) => {
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
    
    // Create a new leave request
    const newRequest: LeaveRequest = {
      id: `lr${Date.now()}`,
      teacherId: teacher.id,
      type: data.type as LeaveRequestType,
      startDate: format(data.startDate, "yyyy-MM-dd"),
      endDate: format(data.endDate, "yyyy-MM-dd"),
      status: "pending",
      description: data.description,
      submissionDate: format(new Date(), "yyyy-MM-dd"),
      attachments: uploadedFiles.map((file, index) => ({
        id: `att${Date.now()}-${index}`,
        fileName: file.name,
        fileSize: file.size,
        uploadDate: format(new Date(), "yyyy-MM-dd"),
        fileUrl: "#"
      }))
    };

    // Add the new request to the list
    setLeaveRequests(prev => [...prev, newRequest]);
    
    // Reset form and close dialog
    form.reset();
    setUploadedFiles([]);
    setSelectedLeaveType(null);
    setIsNewRequestOpen(false);
    
    // Show success toast
    toast({
      title: "Richiesta inviata",
      description: "La tua richiesta è stata inviata con successo.",
    });
  };

  const handleLeaveTypeChange = (value: string) => {
    const leaveType = value as LeaveRequestType;
    setSelectedLeaveType(leaveType);
    form.setValue("type", value);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Richieste e Assenze</h2>
          <p className="text-muted-foreground">
            Gestisci le tue richieste di assenza ai sensi del CCNL Istruzione e Ricerca.
          </p>
        </div>
        <Dialog open={isNewRequestOpen} onOpenChange={setIsNewRequestOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Nuova Richiesta
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Nuova Richiesta di Assenza</DialogTitle>
              <DialogDescription>
                Inserisci i dettagli per la tua richiesta di assenza. 
                I campi contrassegnati con * sono obbligatori.
              </DialogDescription>
            </DialogHeader>
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
                    <Button variant="outline" type="button">Annulla</Button>
                  </DialogClose>
                  <Button type="submit">Invia Richiesta</Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>
      
      {leaveRequests.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {leaveRequests.map((request) => (
            <Card key={request.id} className="overflow-hidden">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-base font-medium">
                    {leaveTypeDetails[request.type].label}
                  </CardTitle>
                  <Badge 
                    className={statusTranslations[request.status].color + " text-white"}
                  >
                    {statusTranslations[request.status].label}
                  </Badge>
                </div>
                <CardDescription>
                  Richiesta del {format(new Date(request.submissionDate), "dd/MM/yyyy")}
                </CardDescription>
              </CardHeader>
              <CardContent className="pb-2">
                <div className="space-y-2">
                  <div className="flex items-center text-sm">
                    <CalendarRange className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span>
                      Dal {format(new Date(request.startDate), "dd/MM/yyyy")} al{" "}
                      {format(new Date(request.endDate), "dd/MM/yyyy")}
                    </span>
                  </div>
                  <p className="text-sm">{request.description}</p>
                  {request.attachments.length > 0 && (
                    <div className="pt-2">
                      <span className="text-xs font-medium">Allegati:</span>
                      <ul className="mt-1">
                        {request.attachments.map((att) => (
                          <li key={att.id} className="flex items-center text-xs">
                            <FilePlus className="h-3 w-3 mr-1 text-muted-foreground" />
                            <a href={att.fileUrl} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline truncate">
                              {att.fileName}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </CardContent>
              <CardFooter className="pt-2">
                <div className="flex gap-2 justify-end w-full">
                  {request.status === "pending" && (
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => {
                        setLeaveRequests(prev => 
                          prev.map(r => r.id === request.id ? {...r, status: "canceled"} : r)
                        );
                        toast({
                          title: "Richiesta annullata",
                          description: "La tua richiesta è stata annullata con successo.",
                        });
                      }}
                    >
                      Annulla
                    </Button>
                  )}
                  <Button variant="outline" size="sm">Dettagli</Button>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="border-dashed">
          <CardContent className="flex flex-col items-center justify-center p-6 text-center">
            <Calendar className="h-10 w-10 text-muted-foreground mb-4" />
            <h3 className="font-medium text-lg mb-2">Nessuna richiesta</h3>
            <p className="text-muted-foreground text-sm max-w-md">
              Non hai ancora effettuato richieste di assenza. Clicca su "Nuova Richiesta" per iniziare.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default LeaveRequestsTab;
