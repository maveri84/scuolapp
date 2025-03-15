
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Building, School, Pencil, Save, Trash2, Calendar } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Mock data
const schoolYears = [
  { id: "1", name: "2023-2024" },
  { id: "2", name: "2024-2025" },
];

const schoolOrders = [
  { id: "1", name: "Scuola dell'Infanzia" },
  { id: "2", name: "Scuola Primaria" },
  { id: "3", name: "Scuola Secondaria di primo grado" },
  { id: "4", name: "Scuola Secondaria di secondo grado" },
];

interface SchoolClass {
  id: string;
  year: string;
  order: string;
  grade: string;
  section: string;
  specialization: string;
}

interface School {
  id: string;
  code: string;
  name: string;
  order: string;
  cityCode: string;
  city: string;
}

interface Period {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  classes: string[];
}

const ClassesStructure: React.FC = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("classes");
  
  // Classes state
  const [classes, setClasses] = useState<SchoolClass[]>([
    { id: "1", year: "1", order: "2", grade: "1", section: "A", specialization: "Standard" },
    { id: "2", year: "1", order: "2", grade: "2", section: "A", specialization: "Standard" },
    { id: "3", year: "1", order: "3", grade: "3", section: "B", specialization: "Scientifico" },
  ]);
  const [isClassDialogOpen, setIsClassDialogOpen] = useState(false);
  const [currentClass, setCurrentClass] = useState<Partial<SchoolClass>>({});
  const [isEditingClass, setIsEditingClass] = useState(false);

  // Schools state
  const [schools, setSchools] = useState<School[]>([
    { id: "1", code: "RMIS123456", name: "Istituto Comprensivo Roma", order: "3", cityCode: "058091", city: "Roma" },
  ]);
  const [isSchoolDialogOpen, setIsSchoolDialogOpen] = useState(false);
  const [currentSchool, setCurrentSchool] = useState<Partial<School>>({});
  const [isEditingSchool, setIsEditingSchool] = useState(false);

  // Periods state
  const [periods, setPeriods] = useState<Period[]>([
    { id: "1", name: "Primo Quadrimestre", startDate: "2023-09-15", endDate: "2024-01-31", classes: ["1", "2"] },
    { id: "2", name: "Secondo Quadrimestre", startDate: "2024-02-01", endDate: "2024-06-10", classes: ["1", "2", "3"] },
  ]);
  const [isPeriodDialogOpen, setIsPeriodDialogOpen] = useState(false);
  const [currentPeriod, setCurrentPeriod] = useState<Partial<Period>>({});
  const [isEditingPeriod, setIsEditingPeriod] = useState(false);

  // Classes handlers
  const handleOpenClassDialog = (schoolClass?: SchoolClass) => {
    if (schoolClass) {
      setCurrentClass(schoolClass);
      setIsEditingClass(true);
    } else {
      setCurrentClass({});
      setIsEditingClass(false);
    }
    setIsClassDialogOpen(true);
  };

  const handleSaveClass = () => {
    if (!currentClass.year || !currentClass.order || !currentClass.grade || !currentClass.section) {
      toast({
        title: "Dati incompleti",
        description: "Compila tutti i campi obbligatori per continuare",
        variant: "destructive",
      });
      return;
    }

    if (isEditingClass && currentClass.id) {
      // Update existing class
      setClasses(classes.map((c) => (c.id === currentClass.id ? { ...currentClass as SchoolClass } : c)));
      toast({
        title: "Classe aggiornata",
        description: `La classe ${currentClass.grade}${currentClass.section} è stata aggiornata con successo.`,
      });
    } else {
      // Create new class
      const newClass: SchoolClass = {
        id: Date.now().toString(),
        year: currentClass.year!,
        order: currentClass.order!,
        grade: currentClass.grade!,
        section: currentClass.section!,
        specialization: currentClass.specialization || "",
      };
      setClasses([...classes, newClass]);
      toast({
        title: "Classe creata",
        description: `La classe ${newClass.grade}${newClass.section} è stata creata con successo.`,
      });
    }

    setIsClassDialogOpen(false);
    setCurrentClass({});
  };

  const handleDeleteClass = (id: string) => {
    setClasses(classes.filter((c) => c.id !== id));
    toast({
      title: "Classe eliminata",
      description: "La classe è stata eliminata con successo.",
    });
  };

  // School handlers
  const handleOpenSchoolDialog = (school?: School) => {
    if (school) {
      setCurrentSchool(school);
      setIsEditingSchool(true);
    } else {
      setCurrentSchool({});
      setIsEditingSchool(false);
    }
    setIsSchoolDialogOpen(true);
  };

  const handleSaveSchool = () => {
    if (!currentSchool.code || !currentSchool.name || !currentSchool.order) {
      toast({
        title: "Dati incompleti",
        description: "Compila tutti i campi obbligatori per continuare",
        variant: "destructive",
      });
      return;
    }

    if (isEditingSchool && currentSchool.id) {
      // Update existing school
      setSchools(schools.map((s) => (s.id === currentSchool.id ? { ...currentSchool as School } : s)));
      toast({
        title: "Istituto aggiornato",
        description: `L'istituto "${currentSchool.name}" è stato aggiornato con successo.`,
      });
    } else {
      // Create new school
      const newSchool: School = {
        id: Date.now().toString(),
        code: currentSchool.code!,
        name: currentSchool.name!,
        order: currentSchool.order!,
        cityCode: currentSchool.cityCode || "",
        city: currentSchool.city || "",
      };
      setSchools([...schools, newSchool]);
      toast({
        title: "Istituto creato",
        description: `L'istituto "${newSchool.name}" è stato creato con successo.`,
      });
    }

    setIsSchoolDialogOpen(false);
    setCurrentSchool({});
  };

  const handleDeleteSchool = (id: string) => {
    setSchools(schools.filter((s) => s.id !== id));
    toast({
      title: "Istituto eliminato",
      description: "L'istituto è stato eliminato con successo.",
    });
  };

  // Period handlers
  const handleOpenPeriodDialog = (period?: Period) => {
    if (period) {
      setCurrentPeriod(period);
      setIsEditingPeriod(true);
    } else {
      setCurrentPeriod({});
      setIsEditingPeriod(false);
    }
    setIsPeriodDialogOpen(true);
  };

  const handleSavePeriod = () => {
    if (!currentPeriod.name || !currentPeriod.startDate || !currentPeriod.endDate) {
      toast({
        title: "Dati incompleti",
        description: "Compila tutti i campi obbligatori per continuare",
        variant: "destructive",
      });
      return;
    }

    if (isEditingPeriod && currentPeriod.id) {
      // Update existing period
      setPeriods(periods.map((p) => (p.id === currentPeriod.id ? { ...currentPeriod as Period } : p)));
      toast({
        title: "Periodo aggiornato",
        description: `Il periodo "${currentPeriod.name}" è stato aggiornato con successo.`,
      });
    } else {
      // Create new period
      const newPeriod: Period = {
        id: Date.now().toString(),
        name: currentPeriod.name!,
        startDate: currentPeriod.startDate!,
        endDate: currentPeriod.endDate!,
        classes: currentPeriod.classes || [],
      };
      setPeriods([...periods, newPeriod]);
      toast({
        title: "Periodo creato",
        description: `Il periodo "${newPeriod.name}" è stato creato con successo.`,
      });
    }

    setIsPeriodDialogOpen(false);
    setCurrentPeriod({});
  };

  const handleDeletePeriod = (id: string) => {
    setPeriods(periods.filter((p) => p.id !== id));
    toast({
      title: "Periodo eliminato",
      description: "Il periodo è stato eliminato con successo.",
    });
  };

  const getSchoolYearName = (id: string) => {
    const year = schoolYears.find((y) => y.id === id);
    return year ? year.name : "Anno sconosciuto";
  };

  const getSchoolOrderName = (id: string) => {
    const order = schoolOrders.find((o) => o.id === id);
    return order ? order.name : "Ordine sconosciuto";
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div>
          <CardTitle className="text-xl">Struttura Scolastica</CardTitle>
          <CardDescription>
            Configura la struttura dell'istituto, le classi e i periodi didattici
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList>
            <TabsTrigger value="classes" className="flex items-center">
              <School className="mr-2 h-4 w-4" />
              Gestione Classi
            </TabsTrigger>
            <TabsTrigger value="schools" className="flex items-center">
              <Building className="mr-2 h-4 w-4" />
              Istituzione Scolastica
            </TabsTrigger>
            <TabsTrigger value="periods" className="flex items-center">
              <Calendar className="mr-2 h-4 w-4" />
              Periodi
            </TabsTrigger>
          </TabsList>

          <TabsContent value="classes" className="space-y-4">
            <div className="flex justify-end">
              <Button onClick={() => handleOpenClassDialog()}>
                <Plus className="mr-2 h-4 w-4" />
                Nuova Classe
              </Button>
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Anno Scolastico</TableHead>
                  <TableHead>Ordine di Scuola</TableHead>
                  <TableHead>Classe</TableHead>
                  <TableHead>Sezione</TableHead>
                  <TableHead>Indirizzo</TableHead>
                  <TableHead className="text-right">Azioni</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {classes.map((classItem) => (
                  <TableRow key={classItem.id}>
                    <TableCell>{getSchoolYearName(classItem.year)}</TableCell>
                    <TableCell>{getSchoolOrderName(classItem.order)}</TableCell>
                    <TableCell>{classItem.grade}</TableCell>
                    <TableCell>{classItem.section}</TableCell>
                    <TableCell>{classItem.specialization}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleOpenClassDialog(classItem)}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleDeleteClass(classItem.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TabsContent>

          <TabsContent value="schools" className="space-y-4">
            <div className="flex justify-end">
              <Button onClick={() => handleOpenSchoolDialog()}>
                <Plus className="mr-2 h-4 w-4" />
                Nuovo Istituto
              </Button>
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Codice Ministeriale</TableHead>
                  <TableHead>Descrizione</TableHead>
                  <TableHead>Ordine</TableHead>
                  <TableHead>Codice ISTAT comune</TableHead>
                  <TableHead>Comune</TableHead>
                  <TableHead className="text-right">Azioni</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {schools.map((school) => (
                  <TableRow key={school.id}>
                    <TableCell>{school.code}</TableCell>
                    <TableCell>{school.name}</TableCell>
                    <TableCell>{getSchoolOrderName(school.order)}</TableCell>
                    <TableCell>{school.cityCode}</TableCell>
                    <TableCell>{school.city}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleOpenSchoolDialog(school)}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleDeleteSchool(school.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TabsContent>

          <TabsContent value="periods" className="space-y-4">
            <div className="flex justify-end">
              <Button onClick={() => handleOpenPeriodDialog()}>
                <Plus className="mr-2 h-4 w-4" />
                Nuovo Periodo
              </Button>
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Descrizione</TableHead>
                  <TableHead>Data Inizio</TableHead>
                  <TableHead>Data Fine</TableHead>
                  <TableHead>Classi</TableHead>
                  <TableHead className="text-right">Azioni</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {periods.map((period) => (
                  <TableRow key={period.id}>
                    <TableCell>{period.name}</TableCell>
                    <TableCell>{period.startDate}</TableCell>
                    <TableCell>{period.endDate}</TableCell>
                    <TableCell>{period.classes.length} classi associate</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleOpenPeriodDialog(period)}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleDeletePeriod(period.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TabsContent>
        </Tabs>
      </CardContent>

      {/* Class Dialog */}
      <Dialog open={isClassDialogOpen} onOpenChange={setIsClassDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {isEditingClass ? "Modifica Classe" : "Nuova Classe"}
            </DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="year">Anno Scolastico</Label>
              <Select
                value={currentClass.year}
                onValueChange={(value) =>
                  setCurrentClass({ ...currentClass, year: value })
                }
              >
                <SelectTrigger id="year">
                  <SelectValue placeholder="Seleziona un anno scolastico" />
                </SelectTrigger>
                <SelectContent>
                  {schoolYears.map((year) => (
                    <SelectItem key={year.id} value={year.id}>
                      {year.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="order">Ordine di Scuola</Label>
              <Select
                value={currentClass.order}
                onValueChange={(value) =>
                  setCurrentClass({ ...currentClass, order: value })
                }
              >
                <SelectTrigger id="order">
                  <SelectValue placeholder="Seleziona un ordine di scuola" />
                </SelectTrigger>
                <SelectContent>
                  {schoolOrders.map((order) => (
                    <SelectItem key={order.id} value={order.id}>
                      {order.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="grade">Classe</Label>
              <Input
                id="grade"
                value={currentClass.grade || ""}
                onChange={(e) =>
                  setCurrentClass({ ...currentClass, grade: e.target.value })
                }
                placeholder="Inserisci il numero della classe"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="section">Sezione</Label>
              <Input
                id="section"
                value={currentClass.section || ""}
                onChange={(e) =>
                  setCurrentClass({ ...currentClass, section: e.target.value })
                }
                placeholder="Inserisci la sezione"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="specialization">Indirizzo</Label>
              <Input
                id="specialization"
                value={currentClass.specialization || ""}
                onChange={(e) =>
                  setCurrentClass({ ...currentClass, specialization: e.target.value })
                }
                placeholder="Inserisci l'indirizzo di studio (opzionale)"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsClassDialogOpen(false)}>
              Annulla
            </Button>
            <Button onClick={handleSaveClass}>
              <Save className="mr-2 h-4 w-4" />
              Salva
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* School Dialog */}
      <Dialog open={isSchoolDialogOpen} onOpenChange={setIsSchoolDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {isEditingSchool ? "Modifica Istituto" : "Nuovo Istituto"}
            </DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="code">Codice Ministeriale</Label>
              <Input
                id="code"
                value={currentSchool.code || ""}
                onChange={(e) =>
                  setCurrentSchool({ ...currentSchool, code: e.target.value })
                }
                placeholder="Inserisci il codice ministeriale"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="name">Descrizione</Label>
              <Input
                id="name"
                value={currentSchool.name || ""}
                onChange={(e) =>
                  setCurrentSchool({ ...currentSchool, name: e.target.value })
                }
                placeholder="Inserisci il nome dell'istituto"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="school-order">Ordine</Label>
              <Select
                value={currentSchool.order}
                onValueChange={(value) =>
                  setCurrentSchool({ ...currentSchool, order: value })
                }
              >
                <SelectTrigger id="school-order">
                  <SelectValue placeholder="Seleziona un ordine di scuola" />
                </SelectTrigger>
                <SelectContent>
                  {schoolOrders.map((order) => (
                    <SelectItem key={order.id} value={order.id}>
                      {order.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="cityCode">Codice ISTAT comune</Label>
              <Input
                id="cityCode"
                value={currentSchool.cityCode || ""}
                onChange={(e) =>
                  setCurrentSchool({ ...currentSchool, cityCode: e.target.value })
                }
                placeholder="Inserisci il codice ISTAT del comune"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="city">Comune</Label>
              <Input
                id="city"
                value={currentSchool.city || ""}
                onChange={(e) =>
                  setCurrentSchool({ ...currentSchool, city: e.target.value })
                }
                placeholder="Inserisci il comune"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsSchoolDialogOpen(false)}>
              Annulla
            </Button>
            <Button onClick={handleSaveSchool}>
              <Save className="mr-2 h-4 w-4" />
              Salva
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Period Dialog */}
      <Dialog open={isPeriodDialogOpen} onOpenChange={setIsPeriodDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {isEditingPeriod ? "Modifica Periodo" : "Nuovo Periodo"}
            </DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">Descrizione</Label>
              <Input
                id="name"
                value={currentPeriod.name || ""}
                onChange={(e) =>
                  setCurrentPeriod({ ...currentPeriod, name: e.target.value })
                }
                placeholder="Inserisci il nome del periodo"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="startDate">Data Inizio</Label>
              <Input
                id="startDate"
                type="date"
                value={currentPeriod.startDate || ""}
                onChange={(e) =>
                  setCurrentPeriod({ ...currentPeriod, startDate: e.target.value })
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="endDate">Data Fine</Label>
              <Input
                id="endDate"
                type="date"
                value={currentPeriod.endDate || ""}
                onChange={(e) =>
                  setCurrentPeriod({ ...currentPeriod, endDate: e.target.value })
                }
              />
            </div>

            {/* In a real application, you would have a multi-select component here for classes */}
            <div className="space-y-2">
              <Label>Classi Associate</Label>
              <p className="text-sm text-muted-foreground">
                In una implementazione completa, qui sarebbe possibile selezionare le classi da associare al periodo.
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsPeriodDialogOpen(false)}>
              Annulla
            </Button>
            <Button onClick={handleSavePeriod}>
              <Save className="mr-2 h-4 w-4" />
              Salva
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default ClassesStructure;
