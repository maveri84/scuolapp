
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { DialogFooter } from "@/components/ui/dialog";
import { FileText } from "lucide-react";
import { Certificate, Person, MOCK_PEOPLE } from "./types";
import { CertificateGenerationValues, certificateGenerationSchema } from "./schemas";

interface CertificateGenerationFormProps {
  onSubmit: (values: CertificateGenerationValues) => void;
  certificates: Certificate[];
  selectedCertificate: Certificate | null;
  signatureData: { name: string; title: string };
  setSignatureData: React.Dispatch<React.SetStateAction<{ name: string; title: string }>>;
}

const CertificateGenerationForm: React.FC<CertificateGenerationFormProps> = ({
  onSubmit,
  certificates,
  selectedCertificate,
  signatureData,
  setSignatureData,
}) => {
  const form = useForm<CertificateGenerationValues>({
    resolver: zodResolver(certificateGenerationSchema),
    defaultValues: {
      templateId: selectedCertificate?.id || "",
      recipientId: "",
      sendEmail: false,
      saveToFile: false,
      signDocument: false,
    },
  });

  // Get filtered recipient options based on selected certificate
  const getRecipientOptions = () => {
    const certificateTemplate = certificates.find(c => c.id === form.watch("templateId"));
    if (!certificateTemplate) return MOCK_PEOPLE;
    
    if (certificateTemplate.target === "studenti") {
      return MOCK_PEOPLE.filter(p => p.type === "studente");
    } else if (certificateTemplate.target === "docenti") {
      return MOCK_PEOPLE.filter(p => p.type === "docente" || p.type === "personale");
    } else {
      return MOCK_PEOPLE;
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="templateId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Modello Certificato</FormLabel>
              <Select 
                onValueChange={field.onChange} 
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleziona un modello" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {certificates.map(cert => (
                    <SelectItem key={cert.id} value={cert.id}>
                      {cert.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="recipientId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Destinatario</FormLabel>
              <Select 
                onValueChange={field.onChange} 
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleziona un destinatario" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {getRecipientOptions().map((person: Person) => (
                    <SelectItem key={person.id} value={person.id}>
                      {person.firstName} {person.lastName} {person.type === "studente" ? `(${person.class})` : ""}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="space-y-2">
          <FormLabel>Operazioni</FormLabel>
          <div className="flex flex-col gap-2 border rounded-md p-3">
            <FormField
              control={form.control}
              name="signDocument"
              render={({ field }) => (
                <FormItem className="flex items-center space-x-2">
                  <FormControl>
                    <Checkbox 
                      checked={field.value} 
                      onCheckedChange={field.onChange} 
                    />
                  </FormControl>
                  <div className="space-y-0.5">
                    <FormLabel className="!mt-0">Firma Digitale</FormLabel>
                    <FormDescription className="text-xs">
                      Applica la firma digitale del dirigente scolastico
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="sendEmail"
              render={({ field }) => (
                <FormItem className="flex items-center space-x-2">
                  <FormControl>
                    <Checkbox 
                      checked={field.value} 
                      onCheckedChange={field.onChange} 
                    />
                  </FormControl>
                  <div className="space-y-0.5">
                    <FormLabel className="!mt-0">Invia Email</FormLabel>
                    <FormDescription className="text-xs">
                      Invia il certificato via email al destinatario
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="saveToFile"
              render={({ field }) => (
                <FormItem className="flex items-center space-x-2">
                  <FormControl>
                    <Checkbox 
                      checked={field.value} 
                      onCheckedChange={field.onChange} 
                    />
                  </FormControl>
                  <div className="space-y-0.5">
                    <FormLabel className="!mt-0">Salva nel Fascicolo</FormLabel>
                    <FormDescription className="text-xs">
                      Salva il certificato nel fascicolo personale
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />
          </div>
        </div>

        {form.watch("signDocument") && (
          <div className="space-y-4">
            <FormLabel>Dati Firma</FormLabel>
            <div className="grid grid-cols-2 gap-4 border rounded-md p-3">
              <div>
                <FormLabel className="text-sm">Nome Firmatario</FormLabel>
                <Input 
                  value={signatureData.name} 
                  onChange={(e) => setSignatureData({...signatureData, name: e.target.value})}
                  placeholder="Inserisci nome"
                />
              </div>
              <div>
                <FormLabel className="text-sm">Titolo</FormLabel>
                <Input 
                  value={signatureData.title} 
                  onChange={(e) => setSignatureData({...signatureData, title: e.target.value})}
                  placeholder="Inserisci titolo"
                />
              </div>
            </div>
          </div>
        )}

        <DialogFooter>
          <Button type="submit" className="w-full sm:w-auto">
            <FileText className="mr-2 h-4 w-4" />
            Genera Certificato
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
};

export default CertificateGenerationForm;
