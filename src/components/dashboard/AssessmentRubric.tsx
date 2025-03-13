
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { PlusCircle, Download, Upload, Save, Trash2, Copy } from "lucide-react";

const SchoolLevels = [
  { id: "primary", name: "Scuola Primaria" },
  { id: "secondary1", name: "Scuola Secondaria I Grado" },
  { id: "secondary2", name: "Scuola Secondaria II Grado" },
];

// Mock rubric for primary school
const primaryRubric = [
  {
    level: "Avanzato",
    description: "L'alunno porta a termine compiti in situazioni note e non note, mobilitando una varietà di risorse sia fornite dal docente sia reperite altrove, in modo autonomo e con continuità.",
    indicator: "9-10"
  },
  {
    level: "Intermedio",
    description: "L'alunno porta a termine compiti in situazioni note in modo autonomo e continuo; risolve compiti in situazioni non note utilizzando le risorse fornite dal docente o reperite altrove, anche se in modo discontinuo e non del tutto autonomo.",
    indicator: "7-8"
  },
  {
    level: "Base",
    description: "L'alunno porta a termine compiti solo in situazioni note e utilizzando le risorse fornite dal docente, sia in modo autonomo ma discontinuo, sia in modo non autonomo, ma con continuità.",
    indicator: "6"
  },
  {
    level: "In via di prima acquisizione",
    description: "L'alunno porta a termine compiti solo in situazioni note e unicamente con il supporto del docente e di risorse fornite appositamente.",
    indicator: "5"
  }
];

// Mock rubric for lower secondary school
const lowerSecondaryRubric = [
  {
    level: "Eccellente",
    description: "Conoscenze approfondite, articolate e interconnesse. Applica con sicurezza metodi e procedure. Possiede capacità critiche e rielaborative elevate.",
    indicator: "10"
  },
  {
    level: "Ottimo",
    description: "Conoscenze complete e articolate. Applica metodi e procedure con precisione. Rielabora con padronanza e autonomia.",
    indicator: "9"
  },
  {
    level: "Buono",
    description: "Conoscenze complete. Applica correttamente metodi e procedure. Buone capacità di rielaborazione.",
    indicator: "8"
  },
  {
    level: "Discreto",
    description: "Conoscenze adeguate. Applica metodi e procedure in modo generalmente corretto. Rielabora con una certa autonomia.",
    indicator: "7"
  },
  {
    level: "Sufficiente",
    description: "Conoscenze essenziali. Applica metodi e procedure in modo accettabile. Rielabora in modo semplice.",
    indicator: "6"
  },
  {
    level: "Insufficiente",
    description: "Conoscenze parziali. Applica metodi e procedure con incertezze. Rielabora in modo impreciso.",
    indicator: "5"
  },
  {
    level: "Gravemente insufficiente",
    description: "Conoscenze frammentarie. Applica metodi e procedure in modo scorretto. Rielabora in modo confuso.",
    indicator: "4"
  }
];

// Mock rubric for upper secondary school
const upperSecondaryRubric = [
  {
    level: "Eccellente",
    description: "Conoscenze organiche, approfondite e articolate con collegamenti interdisciplinari. Capacità di applicazione, analisi, sintesi e valutazione autonome e originali. Linguaggio ricco e appropriato.",
    indicator: "10"
  },
  {
    level: "Ottimo",
    description: "Conoscenze organiche e articolate con approfondimenti autonomi. Capacità di applicazione, analisi, sintesi e valutazione autonome. Linguaggio accurato e lessico specifico.",
    indicator: "9"
  },
  {
    level: "Buono",
    description: "Conoscenze complete e sistematiche. Capacità di applicazione e analisi corrette. Sintesi e valutazione generalmente autonome. Linguaggio appropriato.",
    indicator: "8"
  },
  {
    level: "Discreto",
    description: "Conoscenze complete ma non sempre approfondite. Capacità di applicazione e analisi corrette. Sintesi e valutazione guidate. Linguaggio appropriato ma semplice.",
    indicator: "7"
  },
  {
    level: "Sufficiente",
    description: "Conoscenze essenziali ma complete. Capacità di applicazione e analisi semplici. Sintesi e valutazione guidate. Linguaggio semplice ma corretto.",
    indicator: "6"
  },
  {
    level: "Insufficiente",
    description: "Conoscenze superficiali e incomplete. Capacità di applicazione e analisi imprecise. Sintesi parziale. Linguaggio impreciso.",
    indicator: "5"
  },
  {
    level: "Gravemente insufficiente",
    description: "Conoscenze frammentarie e gravemente lacunose. Applicazione e analisi con gravi errori. Sintesi incoerente. Linguaggio errato.",
    indicator: "1-4"
  }
];

interface RubricItem {
  level: string;
  description: string;
  indicator: string;
}

const AssessmentRubric: React.FC = () => {
  const [selectedSchoolLevel, setSelectedSchoolLevel] = useState<string>("primary");
  const [editingRubric, setEditingRubric] = useState<boolean>(false);
  const [isCustomRubric, setIsCustomRubric] = useState<boolean>(false);
  const [rubricItems, setRubricItems] = useState<RubricItem[]>(primaryRubric);

  const handleSchoolLevelChange = (value: string) => {
    setSelectedSchoolLevel(value);
    setIsCustomRubric(false);
    
    if (value === "primary") {
      setRubricItems(primaryRubric);
    } else if (value === "secondary1") {
      setRubricItems(lowerSecondaryRubric);
    } else if (value === "secondary2") {
      setRubricItems(upperSecondaryRubric);
    }
  };

  const handleCreateCustomRubric = () => {
    setIsCustomRubric(true);
    setEditingRubric(true);
    // Start with a copy of the current rubric as a base
    setRubricItems([...rubricItems]);
  };

  const addRubricItem = () => {
    setRubricItems([
      ...rubricItems,
      { level: "Nuovo Livello", description: "Descrizione del nuovo livello", indicator: "N/A" }
    ]);
  };

  const updateRubricItem = (index: number, field: keyof RubricItem, value: string) => {
    const updatedItems = [...rubricItems];
    updatedItems[index] = { ...updatedItems[index], [field]: value };
    setRubricItems(updatedItems);
  };

  const removeRubricItem = (index: number) => {
    setRubricItems(rubricItems.filter((_, i) => i !== index));
  };

  const getRubricTitle = () => {
    switch (selectedSchoolLevel) {
      case "primary":
        return "Rubrica di Valutazione - Scuola Primaria (Ordinanza 172/2020 e MIM 2025)";
      case "secondary1":
        return "Rubrica di Valutazione - Scuola Secondaria di I Grado (MIM 2025)";
      case "secondary2":
        return "Rubrica di Valutazione - Scuola Secondaria di II Grado (MIM 2025)";
      default:
        return "Rubrica di Valutazione Personalizzata";
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Griglie di Valutazione</CardTitle>
        <CardDescription>
          Configurazione delle griglie di valutazione secondo le direttive MIM 2025
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row gap-4 items-start">
            <div className="flex-1">
              <label className="text-sm font-medium mb-2 block">Ordine di Scuola</label>
              <Select value={selectedSchoolLevel} onValueChange={handleSchoolLevelChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Seleziona ordine di scuola" />
                </SelectTrigger>
                <SelectContent>
                  {SchoolLevels.map((level) => (
                    <SelectItem key={level.id} value={level.id}>
                      {level.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex gap-2 mt-7">
              <Button variant="outline" onClick={handleCreateCustomRubric}>
                <PlusCircle className="h-4 w-4 mr-2" />
                Personalizza
              </Button>
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Esporta
              </Button>
              <Button variant="outline">
                <Upload className="h-4 w-4 mr-2" />
                Importa
              </Button>
            </div>
          </div>

          <div className="border rounded-md p-4">
            <h3 className="text-lg font-medium mb-4">{getRubricTitle()}</h3>
            {!editingRubric ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[200px]">Livello</TableHead>
                    <TableHead>Descrittore</TableHead>
                    <TableHead className="w-[100px] text-right">Voto/Indic.</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {rubricItems.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{item.level}</TableCell>
                      <TableCell>{item.description}</TableCell>
                      <TableCell className="text-right">{item.indicator}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <div className="space-y-4">
                {rubricItems.map((item, index) => (
                  <div key={index} className="border rounded-md p-4">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-medium">Livello {index + 1}</h4>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm" onClick={() => removeRubricItem(index)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                      <div className="md:col-span-2">
                        <label className="text-sm font-medium mb-1 block">Nome Livello</label>
                        <Input
                          value={item.level}
                          onChange={(e) => updateRubricItem(index, "level", e.target.value)}
                        />
                      </div>
                      <div className="md:col-span-1">
                        <label className="text-sm font-medium mb-1 block">Voto/Indicatore</label>
                        <Input
                          value={item.indicator}
                          onChange={(e) => updateRubricItem(index, "indicator", e.target.value)}
                        />
                      </div>
                      <div className="md:col-span-5">
                        <label className="text-sm font-medium mb-1 block">Descrittore</label>
                        <Textarea
                          value={item.description}
                          onChange={(e) => updateRubricItem(index, "description", e.target.value)}
                          rows={3}
                        />
                      </div>
                    </div>
                  </div>
                ))}
                <Button onClick={addRubricItem} variant="outline" className="w-full">
                  <PlusCircle className="h-4 w-4 mr-2" />
                  Aggiungi Livello
                </Button>
              </div>
            )}
          </div>

          {isCustomRubric && (
            <div className="flex justify-end gap-2">
              {!editingRubric ? (
                <Button onClick={() => setEditingRubric(true)}>Modifica Rubrica</Button>
              ) : (
                <>
                  <Button variant="outline" onClick={() => setEditingRubric(false)}>
                    Annulla
                  </Button>
                  <Button onClick={() => setEditingRubric(false)}>
                    <Save className="h-4 w-4 mr-2" />
                    Salva Modifiche
                  </Button>
                </>
              )}
            </div>
          )}

          <div className="border-t pt-4 mt-6">
            <h3 className="text-lg font-medium mb-3">Note informative</h3>
            <p className="text-sm text-muted-foreground">
              Le griglie di valutazione sono conformi alle direttive MIM 2025 e all'Ordinanza 172/2020 per la scuola primaria.
              Per la scuola secondaria di I e II grado, le valutazioni seguono parametri specifici che considerano conoscenze, 
              abilità e competenze come previsto dalle linee guida ministeriali.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AssessmentRubric;
