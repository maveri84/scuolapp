
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { FilePlus, Edit, Trash2, Search, Eye } from "lucide-react";
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import TemplateEditor from "./TemplateEditor";

const DUMMY_TEMPLATES = [
  { id: 1, name: "Certificato di Iscrizione", type: "Certificato", lastModified: "12/05/2023" },
  { id: 2, name: "Pagella Primo Quadrimestre", type: "Pagella", lastModified: "15/01/2024" },
  { id: 3, name: "Comunicazione ai Genitori", type: "Comunicazione", lastModified: "22/03/2024" },
  { id: 4, name: "Autorizzazione Gita Scolastica", type: "Autorizzazione", lastModified: "05/04/2024" },
];

const DocumentTemplates = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [templates, setTemplates] = useState(DUMMY_TEMPLATES);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<number | null>(null);

  const filteredTemplates = templates.filter(template =>
    template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    template.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEdit = (templateId: number) => {
    setSelectedTemplate(templateId);
    setIsEditorOpen(true);
  };

  const handleDelete = (templateId: number) => {
    setTemplates(templates.filter(t => t.id !== templateId));
  };

  const handleCreateNew = () => {
    setSelectedTemplate(null);
    setIsEditorOpen(true);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Cerca modelli..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <Button onClick={handleCreateNew}>
          <FilePlus className="mr-2 h-4 w-4" />
          Nuovo Modello
        </Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome Modello</TableHead>
              <TableHead>Tipo</TableHead>
              <TableHead>Ultima Modifica</TableHead>
              <TableHead className="text-right">Azioni</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredTemplates.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="h-24 text-center">
                  Nessun modello trovato.
                </TableCell>
              </TableRow>
            ) : (
              filteredTemplates.map((template) => (
                <TableRow key={template.id}>
                  <TableCell className="font-medium">{template.name}</TableCell>
                  <TableCell>{template.type}</TableCell>
                  <TableCell>{template.lastModified}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" size="icon" onClick={() => {}}>
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="icon" onClick={() => handleEdit(template.id)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="icon" onClick={() => handleDelete(template.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <Drawer open={isEditorOpen} onOpenChange={setIsEditorOpen}>
        <DrawerContent className="max-h-[90vh]">
          <DrawerHeader>
            <DrawerTitle>
              {selectedTemplate !== null ? "Modifica Modello" : "Nuovo Modello"}
            </DrawerTitle>
            <DrawerDescription>
              Personalizza il modello di documento secondo le tue esigenze.
            </DrawerDescription>
          </DrawerHeader>
          <div className="px-4 py-2 h-[calc(90vh-10rem)] overflow-auto">
            <TemplateEditor 
              templateId={selectedTemplate}
              onClose={() => setIsEditorOpen(false)}
            />
          </div>
          <DrawerFooter>
            <Button onClick={() => setIsEditorOpen(false)}>Salva Modifiche</Button>
            <DrawerClose asChild>
              <Button variant="outline">Annulla</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default DocumentTemplates;
