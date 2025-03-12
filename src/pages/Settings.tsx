
import React, { useState } from "react";
import DashboardLayout from "@/layouts/DashboardLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AlertCircle, Save, Shield, UserCog, ServerCog, Bell, Globe, Palette } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Simulating role-based access control
const userRoles = {
  isAdmin: true, // In a real app, this would come from auth
  isTeacher: true,
  isStudent: false
};

const Settings = () => {
  const { toast } = useToast();
  const [saving, setSaving] = useState(false);

  // Only allow access to admins
  if (!userRoles.isAdmin) {
    return (
      <DashboardLayout>
        <div className="flex flex-col items-center justify-center h-[70vh] text-center">
          <div className="bg-destructive/10 p-4 rounded-full mb-4">
            <AlertCircle className="h-10 w-10 text-destructive" />
          </div>
          <h1 className="text-2xl font-bold mb-2">Accesso non autorizzato</h1>
          <p className="text-muted-foreground max-w-md">
            Non hai i permessi necessari per accedere a questa sezione. Contatta l'amministratore del sistema.
          </p>
        </div>
      </DashboardLayout>
    );
  }

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      toast({
        title: "Impostazioni salvate",
        description: "Le modifiche sono state applicate con successo.",
      });
    }, 1000);
  };

  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Impostazioni</h1>
        <p className="text-muted-foreground mt-2">
          Gestisci e personalizza il registro scolastico
        </p>
      </div>

      <Tabs defaultValue="general" className="space-y-4">
        <TabsList className="bg-muted/50">
          <TabsTrigger value="general">Generali</TabsTrigger>
          <TabsTrigger value="appearance">Aspetto</TabsTrigger>
          <TabsTrigger value="users">Utenti</TabsTrigger>
          <TabsTrigger value="permissions">Permessi</TabsTrigger>
          <TabsTrigger value="notifications">Notifiche</TabsTrigger>
          <TabsTrigger value="system">Sistema</TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>Impostazioni Generali</CardTitle>
              <CardDescription>
                Configura le impostazioni di base del registro scolastico
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="school-name">Nome Istituto</Label>
                <Input id="school-name" defaultValue="Liceo Scientifico A. Einstein" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="academic-year">Anno Accademico</Label>
                <Select defaultValue="2023-2024">
                  <SelectTrigger id="academic-year">
                    <SelectValue placeholder="Seleziona l'anno accademico" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="2023-2024">2023-2024</SelectItem>
                    <SelectItem value="2024-2025">2024-2025</SelectItem>
                    <SelectItem value="2025-2026">2025-2026</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="maintenance-mode">Modalità Manutenzione</Label>
                  <p className="text-sm text-muted-foreground">
                    Limitare l'accesso durante la manutenzione
                  </p>
                </div>
                <Switch id="maintenance-mode" />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="public-access">Accesso Pubblico</Label>
                  <p className="text-sm text-muted-foreground">
                    Permettere la visualizzazione senza autenticazione
                  </p>
                </div>
                <Switch id="public-access" />
              </div>
              
              <Button onClick={handleSave} className="w-full" disabled={saving}>
                {saving ? (
                  <>Salvataggio in corso...</>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Salva Impostazioni
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="appearance">
          <Card>
            <CardHeader>
              <CardTitle>Personalizzazione Aspetto</CardTitle>
              <CardDescription>
                Personalizza il tema e l'aspetto dell'interfaccia
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label>Tema</Label>
                <div className="grid grid-cols-3 gap-2">
                  <div className="border rounded-md p-2 cursor-pointer hover:border-primary flex flex-col items-center border-primary">
                    <div className="w-full h-12 bg-card rounded-md border mb-2"></div>
                    <span className="text-sm font-medium">Chiaro</span>
                  </div>
                  <div className="border rounded-md p-2 cursor-pointer hover:border-primary flex flex-col items-center">
                    <div className="w-full h-12 bg-black rounded-md border mb-2"></div>
                    <span className="text-sm font-medium">Scuro</span>
                  </div>
                  <div className="border rounded-md p-2 cursor-pointer hover:border-primary flex flex-col items-center">
                    <div className="w-full h-12 bg-gradient-to-r from-blue-100 to-white rounded-md border mb-2"></div>
                    <span className="text-sm font-medium">Sistema</span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="primary-color">Colore Primario</Label>
                <div className="grid grid-cols-6 gap-2">
                  {['bg-blue-500', 'bg-green-500', 'bg-purple-500', 'bg-red-500', 'bg-orange-500', 'bg-teal-500'].map((color, index) => (
                    <div key={index} className={`h-10 rounded-md cursor-pointer ${color} ${index === 0 ? 'ring-2 ring-offset-2 ring-blue-500' : ''}`}></div>
                  ))}
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="font-size">Dimensione Font</Label>
                <Select defaultValue="medium">
                  <SelectTrigger id="font-size">
                    <SelectValue placeholder="Seleziona la dimensione" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="small">Piccolo</SelectItem>
                    <SelectItem value="medium">Medio</SelectItem>
                    <SelectItem value="large">Grande</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="animations">Animazioni</Label>
                  <p className="text-sm text-muted-foreground">
                    Abilita le animazioni dell'interfaccia
                  </p>
                </div>
                <Switch id="animations" defaultChecked />
              </div>
              
              <Button onClick={handleSave} className="w-full" disabled={saving}>
                {saving ? (
                  <>Salvataggio in corso...</>
                ) : (
                  <>
                    <Palette className="mr-2 h-4 w-4" />
                    Salva Personalizzazione
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="users">
          <Card>
            <CardHeader>
              <CardTitle>Gestione Utenti</CardTitle>
              <CardDescription>
                Gestisci gli account degli utenti e i ruoli
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="default-role">Ruolo Predefinito</Label>
                <Select defaultValue="student">
                  <SelectTrigger id="default-role">
                    <SelectValue placeholder="Seleziona ruolo predefinito" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="student">Studente</SelectItem>
                    <SelectItem value="parent">Genitore</SelectItem>
                    <SelectItem value="teacher">Docente</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="auto-approve">Approvazione Automatica</Label>
                  <p className="text-sm text-muted-foreground">
                    Approva automaticamente le nuove registrazioni
                  </p>
                </div>
                <Switch id="auto-approve" />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="require-email-verification">Verifica Email</Label>
                  <p className="text-sm text-muted-foreground">
                    Richiedi la verifica dell'email per nuovi account
                  </p>
                </div>
                <Switch id="require-email-verification" defaultChecked />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password-policy">Policy Password</Label>
                <Select defaultValue="strong">
                  <SelectTrigger id="password-policy">
                    <SelectValue placeholder="Seleziona policy password" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="basic">Base (minimo 8 caratteri)</SelectItem>
                    <SelectItem value="medium">Media (lettere, numeri)</SelectItem>
                    <SelectItem value="strong">Forte (lettere, numeri, simboli)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <Button onClick={handleSave} className="w-full" disabled={saving}>
                {saving ? (
                  <>Salvataggio in corso...</>
                ) : (
                  <>
                    <UserCog className="mr-2 h-4 w-4" />
                    Salva Configurazione Utenti
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="permissions">
          <Card>
            <CardHeader>
              <CardTitle>Gestione Permessi</CardTitle>
              <CardDescription>
                Configura i permessi per i diversi ruoli
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Amministratori</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    <div className="flex items-center space-x-2">
                      <Switch id="admin-manage-users" defaultChecked />
                      <Label htmlFor="admin-manage-users">Gestione utenti</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch id="admin-system-settings" defaultChecked />
                      <Label htmlFor="admin-system-settings">Impostazioni sistema</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch id="admin-view-logs" defaultChecked />
                      <Label htmlFor="admin-view-logs">Visualizza log</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch id="admin-backup" defaultChecked />
                      <Label htmlFor="admin-backup">Backup e ripristino</Label>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label>Docenti</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    <div className="flex items-center space-x-2">
                      <Switch id="teacher-grades" defaultChecked />
                      <Label htmlFor="teacher-grades">Inserimento voti</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch id="teacher-attendance" defaultChecked />
                      <Label htmlFor="teacher-attendance">Gestione presenze</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch id="teacher-lessons" defaultChecked />
                      <Label htmlFor="teacher-lessons">Programmazione lezioni</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch id="teacher-communicate" defaultChecked />
                      <Label htmlFor="teacher-communicate">Comunicazioni</Label>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label>Genitori</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    <div className="flex items-center space-x-2">
                      <Switch id="parent-view-grades" defaultChecked />
                      <Label htmlFor="parent-view-grades">Visualizza voti</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch id="parent-justify" defaultChecked />
                      <Label htmlFor="parent-justify">Giustifica assenze</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch id="parent-messages" defaultChecked />
                      <Label htmlFor="parent-messages">Messaggi ai docenti</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch id="parent-authorize" defaultChecked />
                      <Label htmlFor="parent-authorize">Autorizzazioni attività</Label>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label>Studenti</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    <div className="flex items-center space-x-2">
                      <Switch id="student-view-grades" defaultChecked />
                      <Label htmlFor="student-view-grades">Visualizza voti</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch id="student-materials" defaultChecked />
                      <Label htmlFor="student-materials">Accesso materiali</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch id="student-homework" defaultChecked />
                      <Label htmlFor="student-homework">Consegna compiti</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch id="student-forum" defaultChecked />
                      <Label htmlFor="student-forum">Forum classe</Label>
                    </div>
                  </div>
                </div>
              </div>
              
              <Button onClick={handleSave} className="w-full" disabled={saving}>
                {saving ? (
                  <>Salvataggio in corso...</>
                ) : (
                  <>
                    <Shield className="mr-2 h-4 w-4" />
                    Salva Configurazione Permessi
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Impostazioni Notifiche</CardTitle>
              <CardDescription>
                Configura come e quando inviare notifiche
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Notifiche per Docenti</Label>
                  <div className="grid grid-cols-1 gap-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="teacher-assignment-notification">Consegna compiti</Label>
                      <Switch id="teacher-assignment-notification" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="teacher-message-notification">Nuovi messaggi</Label>
                      <Switch id="teacher-message-notification" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="teacher-absence-notification">Assenze prolungate</Label>
                      <Switch id="teacher-absence-notification" defaultChecked />
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label>Notifiche per Genitori</Label>
                  <div className="grid grid-cols-1 gap-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="parent-grade-notification">Nuovi voti</Label>
                      <Switch id="parent-grade-notification" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="parent-absence-notification">Assenze</Label>
                      <Switch id="parent-absence-notification" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="parent-homework-notification">Nuovi compiti</Label>
                      <Switch id="parent-homework-notification" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="parent-message-notification">Comunicazioni scuola</Label>
                      <Switch id="parent-message-notification" defaultChecked />
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label>Canali di Notifica</Label>
                  <div className="grid grid-cols-1 gap-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="email-notification">Email</Label>
                      <Switch id="email-notification" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="sms-notification">SMS</Label>
                      <Switch id="sms-notification" />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="push-notification">Notifiche push</Label>
                      <Switch id="push-notification" defaultChecked />
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="notification-frequency">Frequenza Notifiche</Label>
                  <Select defaultValue="immediate">
                    <SelectTrigger id="notification-frequency">
                      <SelectValue placeholder="Seleziona frequenza" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="immediate">Immediate</SelectItem>
                      <SelectItem value="daily">Riepilogo giornaliero</SelectItem>
                      <SelectItem value="weekly">Riepilogo settimanale</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <Button onClick={handleSave} className="w-full" disabled={saving}>
                {saving ? (
                  <>Salvataggio in corso...</>
                ) : (
                  <>
                    <Bell className="mr-2 h-4 w-4" />
                    Salva Configurazione Notifiche
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="system">
          <Card>
            <CardHeader>
              <CardTitle>Impostazioni Sistema</CardTitle>
              <CardDescription>
                Configura le impostazioni avanzate del sistema
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="language">Lingua Sistema</Label>
                <Select defaultValue="it">
                  <SelectTrigger id="language">
                    <SelectValue placeholder="Seleziona lingua" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="it">Italiano</SelectItem>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="fr">Français</SelectItem>
                    <SelectItem value="de">Deutsch</SelectItem>
                    <SelectItem value="es">Español</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="time-zone">Fuso Orario</Label>
                <Select defaultValue="europe-rome">
                  <SelectTrigger id="time-zone">
                    <SelectValue placeholder="Seleziona fuso orario" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="europe-rome">Europe/Rome (GMT+1)</SelectItem>
                    <SelectItem value="europe-london">Europe/London (GMT+0)</SelectItem>
                    <SelectItem value="america-new_york">America/New_York (GMT-5)</SelectItem>
                    <SelectItem value="asia-tokyo">Asia/Tokyo (GMT+9)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="date-format">Formato Data</Label>
                <Select defaultValue="dd-mm-yyyy">
                  <SelectTrigger id="date-format">
                    <SelectValue placeholder="Seleziona formato data" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="dd-mm-yyyy">DD-MM-YYYY</SelectItem>
                    <SelectItem value="mm-dd-yyyy">MM-DD-YYYY</SelectItem>
                    <SelectItem value="yyyy-mm-dd">YYYY-MM-DD</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="data-backup">Backup Automatico</Label>
                  <p className="text-sm text-muted-foreground">
                    Abilita backup automatici giornalieri
                  </p>
                </div>
                <Switch id="data-backup" defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="activity-logging">Registrazione Attività</Label>
                  <p className="text-sm text-muted-foreground">
                    Traccia tutte le attività degli utenti
                  </p>
                </div>
                <Switch id="activity-logging" defaultChecked />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="session-timeout">Timeout Sessione (minuti)</Label>
                <Select defaultValue="30">
                  <SelectTrigger id="session-timeout">
                    <SelectValue placeholder="Seleziona timeout" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="15">15 minuti</SelectItem>
                    <SelectItem value="30">30 minuti</SelectItem>
                    <SelectItem value="60">60 minuti</SelectItem>
                    <SelectItem value="120">120 minuti</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <Button onClick={handleSave} className="w-full" disabled={saving}>
                {saving ? (
                  <>Salvataggio in corso...</>
                ) : (
                  <>
                    <ServerCog className="mr-2 h-4 w-4" />
                    Salva Configurazione Sistema
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
};

export default Settings;
