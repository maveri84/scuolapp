
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Upload, Image as ImageIcon, Save, Palette } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const SchoolBranding = () => {
  const { toast } = useToast();
  const [logoPreview, setLogoPreview] = useState<string | null>(null);

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setLogoPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    toast({
      title: "Impostazioni salvate",
      description: "Le impostazioni di personalizzazione sono state salvate con successo",
    });
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue="general" className="w-full">
        <TabsList className="grid grid-cols-3">
          <TabsTrigger value="general">Generale</TabsTrigger>
          <TabsTrigger value="logos">Logo e Immagini</TabsTrigger>
          <TabsTrigger value="colors">Colori e Stile</TabsTrigger>
        </TabsList>
        
        <TabsContent value="general" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="schoolName">Nome Istituto</Label>
                <Input id="schoolName" placeholder="Nome completo dell'istituto" />
              </div>
              
              <div>
                <Label htmlFor="schoolCode">Codice Meccanografico</Label>
                <Input id="schoolCode" placeholder="Es. RMPS29000P" />
              </div>
              
              <div>
                <Label htmlFor="schoolType">Tipologia Istituto</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleziona tipologia" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="primary">Scuola Primaria</SelectItem>
                    <SelectItem value="middle">Scuola Secondaria I Grado</SelectItem>
                    <SelectItem value="high">Scuola Secondaria II Grado</SelectItem>
                    <SelectItem value="comprehensive">Istituto Comprensivo</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="address">Indirizzo</Label>
                <Input id="address" placeholder="Via/Piazza, numero civico" />
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label htmlFor="city">Città</Label>
                  <Input id="city" />
                </div>
                <div>
                  <Label htmlFor="postalCode">CAP</Label>
                  <Input id="postalCode" />
                </div>
              </div>
              
              <div>
                <Label htmlFor="website">Sito Web</Label>
                <Input id="website" placeholder="https://" />
              </div>
              
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" />
              </div>
            </div>
          </div>
          
          <div>
            <Label htmlFor="footer">Testo Piè di Pagina Standard</Label>
            <Textarea 
              id="footer" 
              placeholder="Testo che apparirà in fondo ai documenti ufficiali"
              rows={3}
            />
          </div>
        </TabsContent>
        
        <TabsContent value="logos" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <Label htmlFor="mainLogo">Logo Principale</Label>
                  <div className="border-2 border-dashed rounded-md p-4 text-center">
                    {logoPreview ? (
                      <div className="flex flex-col items-center">
                        <img 
                          src={logoPreview} 
                          alt="Logo anteprima" 
                          className="max-h-40 object-contain mb-2" 
                        />
                        <Button variant="outline" size="sm" onClick={() => setLogoPreview(null)}>
                          Rimuovi
                        </Button>
                      </div>
                    ) : (
                      <div className="py-4">
                        <ImageIcon className="mx-auto h-12 w-12 text-gray-400" />
                        <div className="mt-2">
                          <Label 
                            htmlFor="logo-upload" 
                            className="relative cursor-pointer rounded-md font-medium text-primary hover:text-primary/80"
                          >
                            <span>Carica un logo</span>
                            <Input 
                              id="logo-upload" 
                              type="file" 
                              className="sr-only" 
                              accept="image/*"
                              onChange={handleLogoUpload}
                            />
                          </Label>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">
                          PNG, JPG o SVG (max. 2MB)
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <Label htmlFor="headerImage">Intestazione Documenti</Label>
                  <div className="border-2 border-dashed rounded-md p-4 text-center">
                    <div className="py-4">
                      <ImageIcon className="mx-auto h-12 w-12 text-gray-400" />
                      <div className="mt-2">
                        <Label 
                          htmlFor="header-upload" 
                          className="relative cursor-pointer rounded-md font-medium text-primary hover:text-primary/80"
                        >
                          <span>Carica un'immagine</span>
                          <Input 
                            id="header-upload" 
                            type="file" 
                            className="sr-only" 
                            accept="image/*"
                          />
                        </Label>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        Immagine per l'intestazione dei documenti ufficiali
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div>
            <Label>Anteprima Intestazione Documento</Label>
            <div className="border rounded-md p-4 mt-2">
              <div className="flex items-center">
                {logoPreview && (
                  <img src={logoPreview} alt="Logo scuola" className="h-16 mr-4" />
                )}
                <div>
                  <h3 className="font-semibold text-lg">Nome Istituto</h3>
                  <p className="text-sm text-gray-600">Indirizzo, CAP Città</p>
                  <p className="text-sm text-gray-600">Codice Meccanografico</p>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="colors" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="primaryColor">Colore Primario</Label>
                <div className="flex gap-2">
                  <div className="shrink-0">
                    <Input
                      id="primaryColorPicker"
                      type="color"
                      className="block h-9 w-9 rounded-md p-1"
                      defaultValue="#3b82f6"
                    />
                  </div>
                  <Input
                    id="primaryColor"
                    defaultValue="#3b82f6"
                    className="flex-1"
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="secondaryColor">Colore Secondario</Label>
                <div className="flex gap-2">
                  <div className="shrink-0">
                    <Input
                      id="secondaryColorPicker"
                      type="color"
                      className="block h-9 w-9 rounded-md p-1"
                      defaultValue="#10b981"
                    />
                  </div>
                  <Input
                    id="secondaryColor"
                    defaultValue="#10b981"
                    className="flex-1"
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="fontColor">Colore Testo</Label>
                <div className="flex gap-2">
                  <div className="shrink-0">
                    <Input
                      id="fontColorPicker"
                      type="color"
                      className="block h-9 w-9 rounded-md p-1"
                      defaultValue="#111827"
                    />
                  </div>
                  <Input
                    id="fontColor"
                    defaultValue="#111827"
                    className="flex-1"
                  />
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="documentStyle">Stile Documenti</Label>
                <Select defaultValue="modern">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="classic">Classico</SelectItem>
                    <SelectItem value="modern">Moderno</SelectItem>
                    <SelectItem value="minimal">Minimalista</SelectItem>
                    <SelectItem value="formal">Formale</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="fontFamily">Font Predefinito</Label>
                <Select defaultValue="sans">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sans">Sans-serif (Arial, Helvetica)</SelectItem>
                    <SelectItem value="serif">Serif (Times New Roman)</SelectItem>
                    <SelectItem value="mono">Monospace (Courier)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="fontSize">Dimensione Font Base</Label>
                <Select defaultValue="medium">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="small">Piccolo</SelectItem>
                    <SelectItem value="medium">Medio</SelectItem>
                    <SelectItem value="large">Grande</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          
          <div>
            <Label>Anteprima Stile</Label>
            <Card className="mt-2">
              <CardContent className="pt-6">
                <div className="p-4 border rounded-md">
                  <div className="bg-blue-600 text-white p-4 rounded-t-md">
                    <h3 className="font-bold">Intestazione Documento</h3>
                  </div>
                  <div className="p-4 border-x border-b rounded-b-md">
                    <h4 className="font-semibold text-lg text-blue-600 mb-2">Titolo Documento</h4>
                    <p className="mb-2">Questo è un esempio di come apparirà il testo nei documenti con lo stile selezionato.</p>
                    <p className="mb-4">I colori e i font visualizzati riflettono le tue scelte di personalizzazione.</p>
                    <div className="bg-gray-100 p-2 rounded-md text-sm">
                      Nota: Questa è solo un'anteprima. L'aspetto finale potrebbe variare leggermente.
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
      
      <div className="flex justify-end">
        <Button variant="outline" className="mr-2">
          Annulla
        </Button>
        <Button onClick={handleSave}>
          <Save className="mr-2 h-4 w-4" />
          Salva Modifiche
        </Button>
      </div>
    </div>
  );
};

export default SchoolBranding;
