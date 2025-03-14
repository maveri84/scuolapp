
import React from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Calculator, Download } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface CalculatorFormValues {
  totalYears: number;
  additionalMonths: number;
  additionalDays: number;
  category: "Docente" | "ATA" | "Dirigente";
}

interface CalculatorDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  parameters: {
    firstFourYearsPercentage: number;
    remainingYearsPercentage: number;
  };
  onCalculate: (data: CalculatorFormValues) => void;
  onExport: (id: string) => void;
}

export const CalculatorDialog: React.FC<CalculatorDialogProps> = ({
  open,
  onOpenChange,
  parameters,
  onCalculate,
  onExport
}) => {
  const form = useForm<CalculatorFormValues>({
    defaultValues: {
      totalYears: 0,
      additionalMonths: 0,
      additionalDays: 0,
      category: "Docente"
    }
  });

  const handleCalculate = form.handleSubmit(onCalculate);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Calcolatore Servizio Pre-Ruolo</DialogTitle>
          <DialogDescription>
            Calcola il servizio pre-ruolo secondo la normativa vigente
          </DialogDescription>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={handleCalculate} className="space-y-4 py-4">
            <FormField
              control={form.control}
              name="totalYears"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Anni Totali di Servizio Pre-Ruolo</FormLabel>
                  <FormControl>
                    <Input 
                      type="number"
                      min="0"
                      max="50"
                      placeholder="Inserisci il numero totale di anni"
                      {...field}
                      onChange={e => field.onChange(parseInt(e.target.value) || 0)}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="additionalMonths"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mesi Aggiuntivi</FormLabel>
                  <FormControl>
                    <Input 
                      type="number"
                      min="0"
                      max="11"
                      placeholder="Inserisci eventuali mesi aggiuntivi"
                      {...field}
                      onChange={e => field.onChange(parseInt(e.target.value) || 0)}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="additionalDays"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Giorni Aggiuntivi</FormLabel>
                  <FormControl>
                    <Input 
                      type="number"
                      min="0"
                      max="30"
                      placeholder="Inserisci eventuali giorni aggiuntivi"
                      {...field}
                      onChange={e => field.onChange(parseInt(e.target.value) || 0)}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Categoria</FormLabel>
                  <Select 
                    onValueChange={field.onChange} 
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleziona categoria" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Docente">Docente</SelectItem>
                      <SelectItem value="ATA">ATA</SelectItem>
                      <SelectItem value="Dirigente">Dirigente</SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
            
            <Button type="submit" className="w-full">
              <Calculator className="mr-2 h-4 w-4" />
              Calcola Riconoscimento
            </Button>
          </form>
        </Form>
        
        <div className="bg-gray-50 p-4 rounded-md">
          <h4 className="font-medium text-sm">Risultati calcolo:</h4>
          <div className="mt-2 text-sm">
            <div className="grid grid-cols-2 gap-1">
              <div>Primi 4 anni:</div>
              <div className="font-semibold">{Math.min(form.getValues().totalYears, 4)} anni</div>
              
              <div>Ulteriore servizio (2/3):</div>
              <div className="font-semibold">
                {form.getValues().totalYears > 4 
                  ? ((form.getValues().totalYears - 4) * (parameters.remainingYearsPercentage / 100)).toFixed(2) + ' anni'
                  : '0 anni'
                }
              </div>
              
              <div>Totale riconosciuto:</div>
              <div className="font-semibold text-green-600">
                {form.getValues().totalYears <= 4 
                  ? form.getValues().totalYears
                  : (4 + ((form.getValues().totalYears - 4) * (parameters.remainingYearsPercentage / 100))).toFixed(2)
                } anni
              </div>
            </div>
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Chiudi
          </Button>
          <Button variant="default" onClick={() => onExport("calculator")} title="Esporta in ODT">
            <Download className="mr-2 h-4 w-4" />
            Esporta Calcolo
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
