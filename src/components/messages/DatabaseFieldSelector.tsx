
import React from "react";
import { Plus, User, Calendar, Clock, MapPin, Phone, AtSign, Book, Building, Home, UserCircle, CreditCard } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useToast } from "@/hooks/use-toast";

interface Field {
  name: string;
  label: string;
  icon: React.ReactNode;
}

interface FieldCategory {
  category: string;
  fields: Field[];
}

interface DatabaseFieldSelectorProps {
  onFieldInsert?: (fieldName: string) => void;
}

const DatabaseFieldSelector: React.FC<DatabaseFieldSelectorProps> = ({ onFieldInsert }) => {
  const { toast } = useToast();
  
  const databaseFields: FieldCategory[] = [
    {
      category: "Informazioni Studente",
      fields: [
        { name: "nome_studente", label: "Nome Studente", icon: <User className="h-3 w-3" /> },
        { name: "cognome_studente", label: "Cognome Studente", icon: <User className="h-3 w-3" /> },
        { name: "codice_fiscale", label: "Codice Fiscale", icon: <CreditCard className="h-3 w-3" /> },
        { name: "data_nascita", label: "Data di Nascita", icon: <Calendar className="h-3 w-3" /> },
        { name: "indirizzo", label: "Indirizzo", icon: <Home className="h-3 w-3" /> },
        { name: "email_studente", label: "Email Studente", icon: <AtSign className="h-3 w-3" /> },
        { name: "telefono_studente", label: "Telefono Studente", icon: <Phone className="h-3 w-3" /> }
      ]
    },
    {
      category: "Informazioni Genitori",
      fields: [
        { name: "nome_genitore", label: "Nome Genitore", icon: <UserCircle className="h-3 w-3" /> },
        { name: "cognome_genitore", label: "Cognome Genitore", icon: <UserCircle className="h-3 w-3" /> },
        { name: "email_genitore", label: "Email Genitore", icon: <AtSign className="h-3 w-3" /> },
        { name: "telefono_genitore", label: "Telefono Genitore", icon: <Phone className="h-3 w-3" /> }
      ]
    },
    {
      category: "Informazioni Scuola",
      fields: [
        { name: "nome_scuola", label: "Nome Scuola", icon: <Building className="h-3 w-3" /> },
        { name: "classe", label: "Classe", icon: <Users className="h-3 w-3" /> },
        { name: "sezione", label: "Sezione", icon: <Book className="h-3 w-3" /> },
        { name: "anno_scolastico", label: "Anno Scolastico", icon: <Calendar className="h-3 w-3" /> },
        { name: "indirizzo_scuola", label: "Indirizzo Scuola", icon: <MapPin className="h-3 w-3" /> },
        { name: "nome_insegnante", label: "Nome Insegnante", icon: <UserCircle className="h-3 w-3" /> }
      ]
    },
    {
      category: "Date ed Eventi",
      fields: [
        { name: "data_evento", label: "Data Evento", icon: <Calendar className="h-3 w-3" /> },
        { name: "ora_evento", label: "Ora Evento", icon: <Clock className="h-3 w-3" /> },
        { name: "luogo_evento", label: "Luogo Evento", icon: <MapPin className="h-3 w-3" /> },
        { name: "tipo_evento", label: "Tipo Evento", icon: <FileText className="h-3 w-3" /> }
      ]
    }
  ];

  const handleFieldInsert = (fieldName: string) => {
    console.log(`Inserting field: {{${fieldName}}}`);
    toast({
      title: "Campo inserito",
      description: `Il campo {{${fieldName}}} è stato inserito nel modello`,
    });

    if (onFieldInsert) {
      onFieldInsert(fieldName);
    }
  };

  return (
    <div className="space-y-2">
      <h4 className="text-sm font-medium">Campi Disponibili</h4>
      <Accordion type="single" collapsible className="w-full">
        {databaseFields.map((category, index) => (
          <AccordionItem key={index} value={`category-${index}`}>
            <AccordionTrigger className="text-xs py-2">
              {category.category}
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-1">
                {category.fields.map((field, fieldIndex) => (
                  <div 
                    key={fieldIndex} 
                    className="flex items-center justify-between border px-2 py-1 rounded-md cursor-pointer hover:bg-muted text-xs"
                    onClick={() => handleFieldInsert(field.name)}
                  >
                    <div className="flex items-center">
                      {field.icon}
                      <span className="ml-2">{field.label}</span>
                    </div>
                    <Plus className="h-3 w-3" />
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default DatabaseFieldSelector;
