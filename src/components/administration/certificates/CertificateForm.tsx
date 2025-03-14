
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { DialogFooter } from "@/components/ui/dialog";
import { Certificate } from "./types";
import { CERTIFICATE_TYPES } from "./types";
import { CertificateFormValues, certificateFormSchema } from "./schemas";

interface CertificateFormProps {
  onSubmit: (values: CertificateFormValues) => void;
  editingCertificate: Certificate | null;
}

const CertificateForm: React.FC<CertificateFormProps> = ({ onSubmit, editingCertificate }) => {
  const form = useForm<CertificateFormValues>({
    resolver: zodResolver(certificateFormSchema),
    defaultValues: {
      name: editingCertificate?.name || "",
      type: editingCertificate?.type || "",
      target: editingCertificate?.target || "studenti",
      description: editingCertificate?.description || "",
      content: editingCertificate?.content || "",
      includeHeader: editingCertificate?.includeHeader !== false,
      includeFooter: editingCertificate?.includeFooter !== false,
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome Certificato</FormLabel>
                <FormControl>
                  <Input placeholder="Es. Certificato di Iscrizione" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tipo Certificato</FormLabel>
                <Select 
                  onValueChange={field.onChange} 
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleziona tipo" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {CERTIFICATE_TYPES.map(type => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
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
            name="target"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Destinato a</FormLabel>
                <Select 
                  onValueChange={field.onChange} 
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleziona destinatari" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="studenti">Studenti</SelectItem>
                    <SelectItem value="docenti">Docenti</SelectItem>
                    <SelectItem value="entrambi">Entrambi</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Descrizione (opzionale)</FormLabel>
                <FormControl>
                  <Input placeholder="Descrivi lo scopo del certificato" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Contenuto del Certificato</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Inserisci qui il contenuto del certificato. Usa {{nome_campo}} per i campi dinamici." 
                  className="min-h-[300px] font-mono"
                  {...field} 
                />
              </FormControl>
              <FormDescription>
                Usa i segnaposto come &#123;&#123;nome_studente&#125;&#125;, &#123;&#123;classe&#125;&#125;, &#123;&#123;data_corrente&#125;&#125; per i dati dinamici.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex items-center space-x-4">
          <FormField
            control={form.control}
            name="includeHeader"
            render={({ field }) => (
              <FormItem className="flex items-center space-x-2">
                <FormControl>
                  <Checkbox 
                    checked={field.value} 
                    onCheckedChange={field.onChange} 
                  />
                </FormControl>
                <FormLabel className="!mt-0">Includi intestazione standard</FormLabel>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="includeFooter"
            render={({ field }) => (
              <FormItem className="flex items-center space-x-2">
                <FormControl>
                  <Checkbox 
                    checked={field.value} 
                    onCheckedChange={field.onChange} 
                  />
                </FormControl>
                <FormLabel className="!mt-0">Includi piè di pagina standard</FormLabel>
              </FormItem>
            )}
          />
        </div>

        <DialogFooter>
          <Button type="submit">
            {editingCertificate ? "Aggiorna Certificato" : "Crea Certificato"}
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
};

export default CertificateForm;
