
import React, { useState } from "react";
import { format } from "date-fns";
import { it } from "date-fns/locale";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Badge } from "@/components/ui/badge";
import { DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { CalendarIcon, SaveAll } from "lucide-react";
import { classesData, subjectsData } from "../types/lesson";

interface NewLessonFormData {
  title: string;
  subject: string;
  class: string;
  date: string;
  duration: number;
  objectives: string;
  materials: string[];
  activities: string;
  assessment: string;
  notes: string;
}

interface LessonFormProps {
  onCancel: () => void;
  onSave: (lessonData: NewLessonFormData) => void;
}

const LessonForm: React.FC<LessonFormProps> = ({ onCancel, onSave }) => {
  const [formData, setFormData] = useState<NewLessonFormData>({
    title: '',
    subject: '',
    class: '',
    date: format(new Date(), 'yyyy-MM-dd'),
    duration: 60,
    objectives: '',
    materials: [],
    activities: '',
    assessment: '',
    notes: ''
  });
  
  const [newMaterial, setNewMaterial] = useState('');
  
  const handleAddMaterial = () => {
    if (newMaterial.trim()) {
      setFormData({
        ...formData,
        materials: [...formData.materials, newMaterial.trim()]
      });
      setNewMaterial('');
    }
  };
  
  const handleRemoveMaterial = (index: number) => {
    const updatedMaterials = [...formData.materials];
    updatedMaterials.splice(index, 1);
    setFormData({
      ...formData,
      materials: updatedMaterials
    });
  };

  return (
    <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
      <DialogHeader>
        <DialogTitle>Crea un nuovo piano di lezione</DialogTitle>
        <DialogDescription>
          Compila il modulo per creare un nuovo piano di lezione.
        </DialogDescription>
      </DialogHeader>
      
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="title">Titolo</Label>
            <Input
              id="title"
              placeholder="Titolo della lezione"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="date">Data</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left font-normal"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {formData.date ? format(new Date(formData.date), 'd MMMM yyyy', { locale: it }) : "Seleziona una data"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={formData.date ? new Date(formData.date) : undefined}
                  onSelect={(date) => setFormData({ ...formData, date: date ? format(date, 'yyyy-MM-dd') : '' })}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="subject">Materia</Label>
            <Select
              value={formData.subject}
              onValueChange={(value) => setFormData({ ...formData, subject: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Seleziona la materia" />
              </SelectTrigger>
              <SelectContent>
                {subjectsData.map((subject) => (
                  <SelectItem key={subject.id} value={subject.name}>
                    {subject.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="class">Classe</Label>
            <Select
              value={formData.class}
              onValueChange={(value) => setFormData({ ...formData, class: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Seleziona la classe" />
              </SelectTrigger>
              <SelectContent>
                {classesData.map((classItem) => (
                  <SelectItem key={classItem.id} value={classItem.name}>
                    {classItem.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="duration">Durata (minuti)</Label>
            <Input
              id="duration"
              type="number"
              min={15}
              step={15}
              value={formData.duration}
              onChange={(e) => setFormData({ ...formData, duration: parseInt(e.target.value) || 60 })}
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="objectives">Obiettivi</Label>
          <Textarea
            id="objectives"
            placeholder="Obiettivi didattici della lezione"
            value={formData.objectives}
            onChange={(e) => setFormData({ ...formData, objectives: e.target.value })}
            className="min-h-[100px]"
          />
        </div>
        
        <div className="space-y-2">
          <Label>Materiali</Label>
          <div className="flex gap-2">
            <Input
              placeholder="Aggiungi un materiale"
              value={newMaterial}
              onChange={(e) => setNewMaterial(e.target.value)}
            />
            <Button type="button" onClick={handleAddMaterial} variant="outline">
              Aggiungi
            </Button>
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            {formData.materials.map((material, index) => (
              <Badge
                key={index}
                variant="secondary"
                className="flex items-center gap-1 px-3 py-1"
              >
                {material}
                <button
                  onClick={() => handleRemoveMaterial(index)}
                  className="ml-1 text-muted-foreground hover:text-foreground"
                >
                  <span className="sr-only">Remove</span>
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 15 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-3 w-3"
                  >
                    <path
                      d="M11.7816 4.03157C12.0062 3.80702 12.0062 3.44295 11.7816 3.2184C11.5571 2.99385 11.193 2.99385 10.9685 3.2184L7.50005 6.68682L4.03164 3.2184C3.80708 2.99385 3.44301 2.99385 3.21846 3.2184C2.99391 3.44295 2.99391 3.80702 3.21846 4.03157L6.68688 7.49999L3.21846 10.9684C2.99391 11.193 2.99391 11.557 3.21846 11.7816C3.44301 12.0061 3.80708 12.0061 4.03164 11.7816L7.50005 8.31316L10.9685 11.7816C11.193 12.0061 11.5571 12.0061 11.7816 11.7816C12.0062 11.557 12.0062 11.193 11.7816 10.9684L8.31322 7.49999L11.7816 4.03157Z"
                      fill="currentColor"
                    ></path>
                  </svg>
                </button>
              </Badge>
            ))}
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="activities">Attività e Metodologie</Label>
          <Textarea
            id="activities"
            placeholder="Descrivi le attività e le metodologie didattiche"
            value={formData.activities}
            onChange={(e) => setFormData({ ...formData, activities: e.target.value })}
            className="min-h-[100px]"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="assessment">Valutazione</Label>
          <Textarea
            id="assessment"
            placeholder="Metodi di valutazione e verifica dell'apprendimento"
            value={formData.assessment}
            onChange={(e) => setFormData({ ...formData, assessment: e.target.value })}
            className="min-h-[100px]"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="notes">Note Aggiuntive</Label>
          <Textarea
            id="notes"
            placeholder="Note aggiuntive, considerazioni, adattamenti"
            value={formData.notes}
            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
            className="min-h-[100px]"
          />
        </div>
      </div>
      
      <DialogFooter>
        <Button variant="outline" onClick={onCancel}>
          Annulla
        </Button>
        <Button 
          onClick={() => onSave(formData)} 
          disabled={!formData.title || !formData.subject || !formData.class}
        >
          <SaveAll className="mr-2 h-4 w-4" />
          Salva Piano di Lezione
        </Button>
      </DialogFooter>
    </DialogContent>
  );
};

export default LessonForm;
