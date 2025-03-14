
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Plus, Pencil, Save, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface ServiceType {
  id: string;
  name: string;
  category: "teaching" | "administrative" | "support";
  description: string;
}

// Mock initial data
const initialServiceTypes: ServiceType[] = [
  { id: "1", name: "Tempo determinato", category: "teaching", description: "Contratto a tempo determinato per docenti" },
  { id: "2", name: "Tempo indeterminato", category: "teaching", description: "Contratto a tempo indeterminato per docenti" },
  { id: "3", name: "Contratto ATA", category: "administrative", description: "Personale amministrativo, tecnico e ausiliario" },
  { id: "4", name: "Supplenza breve", category: "teaching", description: "Sostituzione temporanea" },
];

const categoryLabels = {
  teaching: "Insegnamento",
  administrative: "Amministrativo",
  support: "Supporto"
};

const ServiceTypes: React.FC = () => {
  const { toast } = useToast();
  const [serviceTypes, setServiceTypes] = useState<ServiceType[]>(initialServiceTypes);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentService, setCurrentService] = useState<Partial<ServiceType>>({});
  const [isEditing, setIsEditing] = useState(false);

  const handleOpenDialog = (serviceType?: ServiceType) => {
    if (serviceType) {
      setCurrentService(serviceType);
      setIsEditing(true);
    } else {
      setCurrentService({ category: "teaching" });
      setIsEditing(false);
    }
    setIsDialogOpen(true);
  };

  const handleSave = () => {
    if (!currentService.name?.trim() || !currentService.category) {
      toast({
        title: "Dati incompleti",
        description: "Inserisci il nome e la categoria del tipo di servizio",
        variant: "destructive",
      });
      return;
    }

    if (isEditing && currentService.id) {
      // Update existing service type
      setServiceTypes(
        serviceTypes.map((s) => (s.id === currentService.id ? { ...currentService as ServiceType } : s))
      );
      toast({
        title: "Tipo di servizio aggiornato",
        description: `Il tipo di servizio "${currentService.name}" è stato aggiornato con successo.`,
      });
    } else {
      // Create new service type
      const newServiceType: ServiceType = {
        id: Date.now().toString(),
        name: currentService.name || "",
        category: currentService.category as "teaching" | "administrative" | "support",
        description: currentService.description || "",
      };
      setServiceTypes([...serviceTypes, newServiceType]);
      toast({
        title: "Tipo di servizio creato",
        description: `Il tipo di servizio "${currentService.name}" è stato creato con successo.`,
      });
    }

    setIsDialogOpen(false);
    setCurrentService({ category: "teaching" });
  };

  const handleDelete = (id: string) => {
    setServiceTypes(serviceTypes.filter((s) => s.id !== id));
    toast({
      title: "Tipo di servizio eliminato",
      description: "Il tipo di servizio è stato eliminato con successo.",
    });
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div>
          <CardTitle className="text-xl">Tipi di Servizio</CardTitle>
          <CardDescription>
            Gestisci i tipi di servizio e contratto per il personale
          </CardDescription>
        </div>
        <Button onClick={() => handleOpenDialog()}>
          <Plus className="mr-2 h-4 w-4" />
          Nuovo Tipo
        </Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>Categoria</TableHead>
              <TableHead>Descrizione</TableHead>
              <TableHead className="text-right">Azioni</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {serviceTypes.map((service) => (
              <TableRow key={service.id}>
                <TableCell className="font-medium">{service.name}</TableCell>
                <TableCell>{categoryLabels[service.category]}</TableCell>
                <TableCell>{service.description}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleOpenDialog(service)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDelete(service.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {isEditing ? "Modifica Tipo di Servizio" : "Nuovo Tipo di Servizio"}
            </DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="serviceName">Nome</Label>
              <Input
                id="serviceName"
                value={currentService.name || ""}
                onChange={(e) =>
                  setCurrentService({ ...currentService, name: e.target.value })
                }
                placeholder="Nome del tipo di servizio"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="serviceCategory">Categoria</Label>
              <Select
                value={currentService.category}
                onValueChange={(value) =>
                  setCurrentService({
                    ...currentService,
                    category: value as "teaching" | "administrative" | "support",
                  })
                }
              >
                <SelectTrigger id="serviceCategory">
                  <SelectValue placeholder="Seleziona una categoria" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="teaching">Insegnamento</SelectItem>
                  <SelectItem value="administrative">Amministrativo</SelectItem>
                  <SelectItem value="support">Supporto</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="serviceDescription">Descrizione</Label>
              <Input
                id="serviceDescription"
                value={currentService.description || ""}
                onChange={(e) =>
                  setCurrentService({ ...currentService, description: e.target.value })
                }
                placeholder="Descrizione opzionale"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Annulla
            </Button>
            <Button onClick={handleSave}>
              <Save className="mr-2 h-4 w-4" />
              Salva
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default ServiceTypes;
