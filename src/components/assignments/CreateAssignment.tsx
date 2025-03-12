
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Book, Link, Upload, AlertCircle } from "lucide-react";
import { toast } from "sonner";

// Mock data for classes and students
const classesData = [
  { id: "1A", name: "1A" },
  { id: "1B", name: "1B" },
  { id: "2A", name: "2A" },
  { id: "2B", name: "2B" },
  { id: "3A", name: "3A" },
];

const studentsData = [
  { id: "S12345", name: "Marco Rossi", classId: "1A" },
  { id: "S12346", name: "Laura Bianchi", classId: "1A" },
  { id: "S12347", name: "Giovanni Verdi", classId: "2A" },
  { id: "S12348", name: "Sofia Russo", classId: "2B" },
  { id: "S12349", name: "Luca Ferrari", classId: "3A" },
  { id: "S12350", name: "Giulia Esposito", classId: "1B" },
  { id: "S12351", name: "Andrea Romano", classId: "2A" },
  { id: "S12352", name: "Martina Colombo", classId: "3A" },
  { id: "S12353", name: "Davide Ricci", classId: "2B" },
  { id: "S12354", name: "Valentina Marino", classId: "1B" },
];

// Assignment form schema
const assignmentSchema = z.object({
  title: z.string().min(3, { message: "Il titolo deve essere di almeno 3 caratteri" }),
  description: z.string().min(5, { message: "La descrizione deve essere di almeno 5 caratteri" }),
  dueDate: z.string().min(1, { message: "La data di scadenza è obbligatoria" }),
  assignmentType: z.enum(["file", "link", "text"]),
  assignedTo: z.enum(["class", "student"]),
  classId: z.string().optional(),
  studentId: z.string().optional(),
  filterClassId: z.string().optional(),
  resourceFile: z.any().optional(),
  resourceLink: z.string().url({ message: "Inserire un URL valido" }).optional(),
});

type AssignmentFormValues = z.infer<typeof assignmentSchema>;

const CreateAssignment = () => {
  const [resourceType, setResourceType] = useState("file");
  const [assigneeType, setAssigneeType] = useState("class");
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);
  const [filteredStudents, setFilteredStudents] = useState(studentsData);
  const [selectedFilterClass, setSelectedFilterClass] = useState<string | null>(null);

  const form = useForm<AssignmentFormValues>({
    resolver: zodResolver(assignmentSchema),
    defaultValues: {
      title: "",
      description: "",
      dueDate: "",
      assignmentType: "file",
      assignedTo: "class",
      classId: "",
      studentId: "",
      filterClassId: "",
      resourceLink: "",
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      form.setValue("resourceFile", file);
      setUploadedFileName(file.name);
    }
  };

  // Filter students when filter class changes
  const handleFilterClassChange = (classId: string) => {
    setSelectedFilterClass(classId);
    const filtered = studentsData.filter(student => student.classId === classId);
    setFilteredStudents(filtered);
    
    // Reset the selected student when changing class filter
    form.setValue("studentId", "");
  };

  const onSubmit = (data: AssignmentFormValues) => {
    console.log("Form data:", data);
    
    // In a real app, this would send data to the server
    toast.success("Compito creato con successo!");
    
    // Reset form
    form.reset();
    setUploadedFileName(null);
    setSelectedFilterClass(null);
    setFilteredStudents(studentsData);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Titolo</FormLabel>
              <FormControl>
                <Input placeholder="Titolo del compito" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descrizione</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Descrizione dettagliata del compito" 
                  className="min-h-[100px]"
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="dueDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Data di scadenza</FormLabel>
              <FormControl>
                <Input type="date" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="space-y-4">
          <FormLabel>Tipo di risorsa</FormLabel>
          <Tabs value={resourceType} onValueChange={(value) => {
            setResourceType(value);
            form.setValue("assignmentType", value as "file" | "link" | "text");
          }}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="file">
                <Upload className="mr-2 h-4 w-4" />
                File
              </TabsTrigger>
              <TabsTrigger value="link">
                <Link className="mr-2 h-4 w-4" />
                Link
              </TabsTrigger>
              <TabsTrigger value="text">
                <Book className="mr-2 h-4 w-4" />
                Solo testo
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="file" className="pt-4">
              <div className="space-y-4">
                <Label htmlFor="file-upload">Carica file</Label>
                <div className="grid w-full items-center gap-1.5">
                  <Input 
                    id="file-upload" 
                    type="file" 
                    onChange={handleFileChange}
                  />
                  {uploadedFileName && (
                    <p className="text-sm text-muted-foreground">
                      File selezionato: {uploadedFileName}
                    </p>
                  )}
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="link" className="pt-4">
              <FormField
                control={form.control}
                name="resourceLink"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>URL</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="https://example.com/risorsa-educativa" 
                        {...field} 
                      />
                    </FormControl>
                    <FormDescription>
                      Inserisci il link alla risorsa educativa o al materiale online
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </TabsContent>
            
            <TabsContent value="text" className="pt-4">
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  Seleziona questa opzione se il compito non richiede file o link esterni.
                  Gli studenti potranno completare il compito basandosi sulla descrizione fornita.
                </AlertDescription>
              </Alert>
            </TabsContent>
          </Tabs>
        </div>

        <div className="space-y-4">
          <FormLabel>Assegna a</FormLabel>
          <RadioGroup 
            defaultValue="class" 
            value={assigneeType} 
            onValueChange={(value) => {
              setAssigneeType(value);
              form.setValue("assignedTo", value as "class" | "student");
            }}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="class" id="class-option" />
              <Label htmlFor="class-option">Classe intera</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="student" id="student-option" />
              <Label htmlFor="student-option">Studente specifico</Label>
            </div>
          </RadioGroup>

          {assigneeType === "class" ? (
            <FormField
              control={form.control}
              name="classId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Classe</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleziona una classe" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {classesData.map((classItem) => (
                        <SelectItem key={classItem.id} value={classItem.id}>
                          {classItem.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          ) : (
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="filterClassId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Filtra per classe</FormLabel>
                    <Select 
                      onValueChange={(value) => {
                        field.onChange(value);
                        handleFilterClassChange(value);
                      }} 
                      value={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Seleziona una classe per filtrare" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {classesData.map((classItem) => (
                          <SelectItem key={classItem.id} value={classItem.id}>
                            {classItem.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      Seleziona prima una classe per filtrare l'elenco degli studenti
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="studentId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Studente</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Seleziona uno studente" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {filteredStudents.map((student) => (
                          <SelectItem key={student.id} value={student.id}>
                            {student.name} ({student.classId})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {selectedFilterClass && (
                      <FormDescription>
                        Mostrando studenti della classe {selectedFilterClass}
                      </FormDescription>
                    )}
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          )}
        </div>

        <Button type="submit" className="w-full sm:w-auto">Crea compito</Button>
      </form>
    </Form>
  );
};

export default CreateAssignment;
