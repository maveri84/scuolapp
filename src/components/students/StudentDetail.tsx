import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { 
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { 
  UserCircle, 
  Users, 
  GraduationCap, 
  FileText, 
  Calendar, 
  Mail, 
  Phone, 
  MapPin, 
  Save,
  UserCog,
  MessageCircle,
  Heart,
  AlertCircle,
  Award
} from "lucide-react";

const mockStudentDetail = {
  id: "1",
  firstName: "Marco",
  lastName: "Rossi",
  studentId: "SR2024001",
  class: "3A",
  dateOfBirth: "15/05/2008",
  placeOfBirth: "Milano",
  address: "Via Roma 123",
  city: "Milano",
  postalCode: "20100",
  email: "marco.rossi@student.example.com",
  phone: "333-1234567",
  
  fatherFirstName: "Giuseppe",
  fatherLastName: "Rossi",
  fatherEmail: "giuseppe.rossi@example.com",
  fatherPhone: "333-7654321",
  fatherOccupation: "Ingegnere",
  
  motherFirstName: "Maria",
  motherLastName: "Rossi",
  motherEmail: "maria.rossi@example.com",
  motherPhone: "333-9876543",
  motherOccupation: "Medico",
  
  enrollmentDate: "01/09/2022",
  previousSchool: "Scuola Media Manzoni",
  academicHistory: [
    { year: "2022-2023", class: "1A", finalGrade: "8/10", notes: "Ottimo rendimento in matematica" },
    { year: "2023-2024", class: "2A", finalGrade: "8.5/10", notes: "Miglioramento nelle lingue straniere" }
  ],
  
  specialNeeds: false,
  accommodations: "",
  
  notes: "Partecipa attivamente alle attività extracurriculari. Rappresentante di classe per l'anno 2023-2024."
};

interface StudentDetailProps {
  studentId: string;
}

const StudentDetail: React.FC<StudentDetailProps> = ({ studentId }) => {
  const student = mockStudentDetail;
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-6">
        <Card className="flex-1">
          <CardHeader className="bg-muted/50">
            <div className="flex items-center">
              <UserCircle className="h-8 w-8 mr-3 text-primary" />
              <div>
                <CardTitle>{student.firstName} {student.lastName}</CardTitle>
                <CardDescription>Matricola: {student.studentId} • Classe: {student.class}</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
              <div>
                <dt className="text-sm font-medium text-muted-foreground">Data di nascita</dt>
                <dd className="mt-1 flex items-center">
                  <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                  {student.dateOfBirth}
                </dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-muted-foreground">Luogo di nascita</dt>
                <dd className="mt-1 flex items-center">
                  <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                  {student.placeOfBirth}
                </dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-muted-foreground">Email</dt>
                <dd className="mt-1 flex items-center">
                  <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                  {student.email}
                </dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-muted-foreground">Telefono</dt>
                <dd className="mt-1 flex items-center">
                  <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                  {student.phone}
                </dd>
              </div>
              <div className="md:col-span-2">
                <dt className="text-sm font-medium text-muted-foreground">Indirizzo</dt>
                <dd className="mt-1 flex items-center">
                  <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                  {student.address}, {student.city}, {student.postalCode}
                </dd>
              </div>
            </dl>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="info" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="info">
            <UserCog className="mr-2 h-4 w-4" />
            Informazioni Personali
          </TabsTrigger>
          <TabsTrigger value="parents">
            <Users className="mr-2 h-4 w-4" />
            Genitori
          </TabsTrigger>
          <TabsTrigger value="academic">
            <GraduationCap className="mr-2 h-4 w-4" />
            Curriculum Scolastico
          </TabsTrigger>
          <TabsTrigger value="special">
            <Heart className="mr-2 h-4 w-4" />
            Particolarità
          </TabsTrigger>
          <TabsTrigger value="communications">
            <MessageCircle className="mr-2 h-4 w-4" />
            Comunicazioni
          </TabsTrigger>
          <TabsTrigger value="documents">
            <FileText className="mr-2 h-4 w-4" />
            Documenti
          </TabsTrigger>
        </TabsList>

        <TabsContent value="info" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Informazioni Personali</CardTitle>
              <CardDescription>Gestisci i dati anagrafici dello studente</CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">Nome</Label>
                    <Input id="firstName" defaultValue={student.firstName} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Cognome</Label>
                    <Input id="lastName" defaultValue={student.lastName} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="dateOfBirth">Data di Nascita</Label>
                    <Input id="dateOfBirth" type="date" defaultValue="2008-05-15" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="placeOfBirth">Luogo di Nascita</Label>
                    <Input id="placeOfBirth" defaultValue={student.placeOfBirth} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" defaultValue={student.email} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Telefono</Label>
                    <Input id="phone" defaultValue={student.phone} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="address">Indirizzo</Label>
                    <Input id="address" defaultValue={student.address} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="city">Città</Label>
                    <Input id="city" defaultValue={student.city} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="postalCode">CAP</Label>
                    <Input id="postalCode" defaultValue={student.postalCode} />
                  </div>
                </div>

                <div className="flex justify-end mt-6">
                  <Button>
                    <Save className="mr-2 h-4 w-4" />
                    Salva Modifiche
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="parents" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Informazioni Genitori</CardTitle>
              <CardDescription>Dati di contatto e informazioni dei genitori o tutori</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-4">Padre</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="fatherFirstName">Nome</Label>
                      <Input id="fatherFirstName" defaultValue={student.fatherFirstName} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="fatherLastName">Cognome</Label>
                      <Input id="fatherLastName" defaultValue={student.fatherLastName} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="fatherEmail">Email</Label>
                      <Input id="fatherEmail" type="email" defaultValue={student.fatherEmail} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="fatherPhone">Telefono</Label>
                      <Input id="fatherPhone" defaultValue={student.fatherPhone} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="fatherOccupation">Occupazione</Label>
                      <Input id="fatherOccupation" defaultValue={student.fatherOccupation} />
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="text-lg font-medium mb-4">Madre</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="motherFirstName">Nome</Label>
                      <Input id="motherFirstName" defaultValue={student.motherFirstName} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="motherLastName">Cognome</Label>
                      <Input id="motherLastName" defaultValue={student.motherLastName} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="motherEmail">Email</Label>
                      <Input id="motherEmail" type="email" defaultValue={student.motherEmail} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="motherPhone">Telefono</Label>
                      <Input id="motherPhone" defaultValue={student.motherPhone} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="motherOccupation">Occupazione</Label>
                      <Input id="motherOccupation" defaultValue={student.motherOccupation} />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end mt-6">
                  <Button>
                    <Save className="mr-2 h-4 w-4" />
                    Salva Modifiche
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="academic" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Curriculum Scolastico</CardTitle>
              <CardDescription>Storia accademica e progressione scolastica</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="enrollmentDate">Data di Iscrizione</Label>
                    <Input id="enrollmentDate" defaultValue={student.enrollmentDate} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="previousSchool">Scuola Precedente</Label>
                    <Input id="previousSchool" defaultValue={student.previousSchool} />
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-4">Storico Accademico</h3>
                  <div className="border rounded-md overflow-hidden">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Anno Scolastico</TableHead>
                          <TableHead>Classe</TableHead>
                          <TableHead>Valutazione Finale</TableHead>
                          <TableHead>Note</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {student.academicHistory.map((record, index) => (
                          <TableRow key={index}>
                            <TableCell>{record.year}</TableCell>
                            <TableCell>{record.class}</TableCell>
                            <TableCell>{record.finalGrade}</TableCell>
                            <TableCell>{record.notes}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="notes">Note Aggiuntive</Label>
                  <textarea 
                    id="notes" 
                    className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    defaultValue={student.notes}
                  />
                </div>

                <div className="flex justify-end mt-6">
                  <Button>
                    <Save className="mr-2 h-4 w-4" />
                    Salva Modifiche
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="special" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Particolarità dello Studente</CardTitle>
              <CardDescription>Informazioni specifiche e bisogni speciali</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card className="border border-muted p-4">
                    <CardHeader className="p-0">
                      <CardTitle className="text-base flex items-center">
                        <AlertCircle className="h-4 w-4 mr-2 text-yellow-500" />
                        Bisogni Educativi Speciali
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-0 pt-4">
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label>Tipologia BES</Label>
                          <Input placeholder="Es: DSA, ADHD, etc." />
                        </div>
                        <div className="space-y-2">
                          <Label>Documentazione</Label>
                          <Input type="file" />
                        </div>
                        <div className="space-y-2">
                          <Label>Note Specifiche</Label>
                          <textarea 
                            className="w-full min-h-[100px] rounded-md border border-input bg-background px-3 py-2 text-sm"
                            placeholder="Inserisci note specifiche..."
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border border-muted p-4">
                    <CardHeader className="p-0">
                      <CardTitle className="text-base flex items-center">
                        <Award className="h-4 w-4 mr-2 text-blue-500" />
                        Talenti e Attitudini
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-0 pt-4">
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label>Aree di Eccellenza</Label>
                          <Input placeholder="Es: Matematica, Arte, Sport" />
                        </div>
                        <div className="space-y-2">
                          <Label>Attività Extracurriculari</Label>
                          <Input placeholder="Es: Teatro, Coro, Sport" />
                        </div>
                        <div className="space-y-2">
                          <Label>Note sui Talenti</Label>
                          <textarea 
                            className="w-full min-h-[100px] rounded-md border border-input bg-background px-3 py-2 text-sm"
                            placeholder="Descrivi i talenti e le attitudini dello studente..."
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Button className="w-full">
                  <Save className="mr-2 h-4 w-4" />
                  Salva Modifiche
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="communications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Comunicazioni Dirette</CardTitle>
              <CardDescription>Gestione delle comunicazioni con la famiglia</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <Button variant="outline">
                    <Mail className="mr-2 h-4 w-4" />
                    Nuova Email
                  </Button>
                  <Button variant="outline">
                    <MessageCircle className="mr-2 h-4 w-4" />
                    Nuovo Messaggio
                  </Button>
                </div>

                <div className="border rounded-lg overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Data</TableHead>
                        <TableHead>Tipo</TableHead>
                        <TableHead>Oggetto</TableHead>
                        <TableHead>Stato</TableHead>
                        <TableHead>Azioni</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell>10/03/2024</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>Convocazione Genitori</TableCell>
                        <TableCell>Inviata</TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm">
                            <FileText className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>05/03/2024</TableCell>
                        <TableCell>Messaggio</TableCell>
                        <TableCell>Autorizzazione Gita</TableCell>
                        <TableCell>Ricevuto</TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm">
                            <FileText className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="documents" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Documenti</CardTitle>
              <CardDescription>Documenti ufficiali e certificati</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex justify-end mb-4">
                  <Button>
                    <FileText className="mr-2 h-4 w-4" />
                    Carica Nuovo Documento
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card className="border border-muted">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">Pagella 2023-2024</CardTitle>
                      <CardDescription>Caricato il 15/06/2024</CardDescription>
                    </CardHeader>
                    <CardContent className="pt-2">
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-muted-foreground">PDF, 1.2 MB</span>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">Visualizza</Button>
                          <Button variant="outline" size="sm">Scarica</Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border border-muted">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">Certificato di Iscrizione</CardTitle>
                      <CardDescription>Caricato il 05/09/2022</CardDescription>
                    </CardHeader>
                    <CardContent className="pt-2">
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-muted-foreground">PDF, 0.8 MB</span>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">Visualizza</Button>
                          <Button variant="outline" size="sm">Scarica</Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default StudentDetail;
