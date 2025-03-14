import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { PlusCircle, Edit, Trash2, CalendarRange } from "lucide-react";
import { Teacher, TeachingService } from "../types";

interface ServicesTabProps {
  teacher: Teacher;
  onChange: (field: keyof Teacher, value: any) => void;
}

const ServicesTab: React.FC<ServicesTabProps> = ({ teacher, onChange }) => {
  const [isServiceDialogOpen, setIsServiceDialogOpen] = useState(false);
  const [currentService, setCurrentService] = useState<Partial<TeachingService>>({});
  const [isEditing, setIsEditing] = useState(false);
  const [newSubject, setNewSubject] = useState("");

  const handleOpenServiceDialog = (service?: TeachingService) => {
    if (service) {
      setCurrentService(service);
      setIsEditing(true);
    } else {
      setCurrentService({
        id: Date.now().toString(),
        schoolYear: "",
        startDate: "",
        endDate: "",
        schoolName: "",
        schoolType: "",
        subjectsTaught: [],
        hoursPerWeek: 0,
        contractType: "Tempo Determinato",
        isTenured: false,
        notes: ""
      });
      setIsEditing(false);
    }
    setIsServiceDialogOpen(true);
  };

  const handleSaveService = () => {
    if (
      !currentService.schoolYear ||
      !currentService.startDate ||
      !currentService.endDate ||
      !currentService.schoolName
    ) {
      return;
    }

    const newServices = [...teacher.teachingServices];
    
    if (isEditing) {
      const index = newServices.findIndex(s => s.id === currentService.id);
      if (index !== -1) {
        newServices[index] = currentService as TeachingService;
      }
    } else {
      newServices.push(currentService as TeachingService);
    }
    
    onChange("teachingServices", newServices);
    setIsServiceDialogOpen(false);
    setCurrentService({});
    setIsEditing(false);
  };

  const handleDeleteService = (id: string) => {
    const newServices = teacher.teachingServices.filter(service => service.id !== id);
    onChange("teachingServices", newServices);
  };

  const handleAddSubject = () => {
    if (
      newSubject.trim() && 
      currentService.subjectsTaught && 
      !currentService.subjectsTaught.includes(newSubject.trim())
    ) {
      setCurrentService({
        ...currentService,
        subjectsTaught: [...(currentService.subjectsTaught || []), newSubject.trim()]
      });
      setNewSubject("");
    }
  };

  const handleRemoveSubject = (subject: string) => {
    if (currentService.subjectsTaught) {
      setCurrentService({
        ...currentService,
        subjectsTaught: currentService.subjectsTaught.filter(s => s !== subject)
      });
    }
  };

  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString("it-IT");
    } catch {
      return dateString;
    }
  };

  return (
    <>
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            <span>Servizi di Insegnamento</span>
            <Button onClick={() => handleOpenServiceDialog()}>
              <PlusCircle className="mr-2 h-4 w-4" />
              Aggiungi Servizio
            </Button>
          </CardTitle>
          <CardDescription>
            Storico dei servizi di insegnamento prestati dal docente
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Anno Scolastico</TableHead>
                <TableHead>Periodo</TableHead>
                <TableHead>Scuola</TableHead>
                <TableHead>Materie</TableHead>
                <TableHead>Contratto</TableHead>
                <TableHead className="text-right">Azioni</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {teacher.teachingServices.length > 0 ? (
                teacher.teachingServices.map((service) => (
                  <TableRow key={service.id}>
                    <TableCell>{service.schoolYear}</TableCell>
                    <TableCell>
                      {formatDate(service.startDate)} - {formatDate(service.endDate)}
                    </TableCell>
                    <TableCell>
                      <div>{service.schoolName}</div>
                      <div className="text-xs text-muted-foreground">{service.schoolType}</div>
                    </TableCell>
                    <TableCell>{service.subjectsTaught.join(", ")}</TableCell>
                    <TableCell>
                      <div>{service.contractType}</div>
                      <div className="text-xs text-muted-foreground">
                        {service.isTenured ? "Di ruolo" : "Non di ruolo"}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleOpenServiceDialog(service)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleDeleteService(service.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-6 text-muted-foreground">
                    Nessun servizio registrato. Clicca "Aggiungi Servizio" per iniziare.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Service Dialog */}
      <Dialog open={isServiceDialogOpen} onOpenChange={setIsServiceDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {isEditing ? "Modifica Servizio" : "Aggiungi Nuovo Servizio"}
            </DialogTitle>
          </DialogHeader>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="schoolYear">Anno Scolastico</Label>
              <Input
                id="schoolYear"
                placeholder="Es: 2023-2024"
                value={currentService.schoolYear || ""}
                onChange={(e) => setCurrentService({ ...currentService, schoolYear: e.target.value })}
              />
            </div>
            
            <div className="md:col-span-2 flex flex-col md:flex-row gap-4">
              <div className="space-y-2 flex-1">
                <Label htmlFor="startDate">Data Inizio</Label>
                <Input
                  id="startDate"
                  type="date"
                  value={currentService.startDate || ""}
                  onChange={(e) => setCurrentService({ ...currentService, startDate: e.target.value })}
                />
              </div>
              
              <div className="space-y-2 flex-1">
                <Label htmlFor="endDate">Data Fine</Label>
                <Input
                  id="endDate"
                  type="date"
                  value={currentService.endDate || ""}
                  onChange={(e) => setCurrentService({ ...currentService, endDate: e.target.value })}
                />
              </div>
            </div>
            
            <div className="md:col-span-2 space-y-2">
              <Label htmlFor="schoolName">Nome Scuola</Label>
              <Input
                id="schoolName"
                value={currentService.schoolName || ""}
                onChange={(e) => setCurrentService({ ...currentService, schoolName: e.target.value })}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="schoolType">Tipo Scuola</Label>
              <Select
                value={currentService.schoolType || ""}
                onValueChange={(value) => setCurrentService({ ...currentService, schoolType: value })}
              >
                <SelectTrigger id="schoolType">
                  <SelectValue placeholder="Seleziona tipo scuola" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Scuola dell'Infanzia">Scuola dell'Infanzia</SelectItem>
                  <SelectItem value="Scuola Primaria">Scuola Primaria</SelectItem>
                  <SelectItem value="Scuola Secondaria di I grado">Scuola Secondaria di I grado</SelectItem>
                  <SelectItem value="Liceo Scientifico">Liceo Scientifico</SelectItem>
                  <SelectItem value="Liceo Classico">Liceo Classico</SelectItem>
                  <SelectItem value="Liceo Linguistico">Liceo Linguistico</SelectItem>
                  <SelectItem value="Istituto Tecnico">Istituto Tecnico</SelectItem>
                  <SelectItem value="Istituto Professionale">Istituto Professionale</SelectItem>
                  <SelectItem value="Altro">Altro</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="contractType">Tipo Contratto</Label>
              <Select
                value={currentService.contractType || ""}
                onValueChange={(value) => setCurrentService({ ...currentService, contractType: value })}
              >
                <SelectTrigger id="contractType">
                  <SelectValue placeholder="Seleziona tipo contratto" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Tempo Indeterminato">Tempo Indeterminato</SelectItem>
                  <SelectItem value="Tempo Determinato">Tempo Determinato</SelectItem>
                  <SelectItem value="Supplenza">Supplenza</SelectItem>
                  <SelectItem value="Part-Time">Part-Time</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="hoursPerWeek">Ore Settimanali</Label>
              <Input
                id="hoursPerWeek"
                type="number"
                value={currentService.hoursPerWeek?.toString() || ""}
                onChange={(e) => setCurrentService({ 
                  ...currentService, 
                  hoursPerWeek: parseInt(e.target.value) || 0 
                })}
              />
            </div>
            
            <div className="space-y-2">
              <Label>Di Ruolo</Label>
              <div className="flex items-center space-x-2">
                <Switch 
                  checked={currentService.isTenured || false} 
                  onCheckedChange={(checked) => setCurrentService({ ...currentService, isTenured: checked })}
                />
                <span className="text-sm">
                  {currentService.isTenured ? "Di ruolo" : "Non di ruolo"}
                </span>
              </div>
            </div>
            
            <div className="md:col-span-2 space-y-2">
              <Label>Materie Insegnate</Label>
              <div className="flex flex-wrap gap-2 mb-2">
                {currentService.subjectsTaught?.map((subject, index) => (
                  <div key={index} className="bg-muted rounded-md px-3 py-1 text-sm flex items-center gap-2">
                    {subject}
                    <button
                      type="button"
                      onClick={() => handleRemoveSubject(subject)}
                      className="text-muted-foreground hover:text-foreground"
                    >
                      <Trash2 className="h-3 w-3" />
                      <span className="sr-only">Rimuovi {subject}</span>
                    </button>
                  </div>
                ))}
                {(!currentService.subjectsTaught || currentService.subjectsTaught.length === 0) && (
                  <span className="text-sm text-muted-foreground">
                    Nessuna materia aggiunta
                  </span>
                )}
              </div>
              <div className="flex gap-2">
                <Input 
                  placeholder="Aggiungi una materia..." 
                  value={newSubject} 
                  onChange={(e) => setNewSubject(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleAddSubject();
                    }
                  }}
                />
                <Button onClick={handleAddSubject} type="button">
                  Aggiungi
                </Button>
              </div>
            </div>
            
            <div className="md:col-span-2 space-y-2">
              <Label htmlFor="notes">Note</Label>
              <Textarea
                id="notes"
                value={currentService.notes || ""}
                onChange={(e) => setCurrentService({ ...currentService, notes: e.target.value })}
                rows={3}
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsServiceDialogOpen(false)}>
              Annulla
            </Button>
            <Button onClick={handleSaveService}>
              {isEditing ? "Aggiorna" : "Salva"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ServicesTab;
