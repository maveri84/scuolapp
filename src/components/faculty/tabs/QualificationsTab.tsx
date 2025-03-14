
import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { PlusCircle, FileUp, GraduationCap, Award } from "lucide-react";
import { Teacher } from "../types";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface QualificationsTabProps {
  teacher: Teacher;
  onChange: (field: keyof Teacher, value: any) => void;
}

const QualificationsTab: React.FC<QualificationsTabProps> = ({ teacher, onChange }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Titoli di Studio e Formazione</CardTitle>
        <CardDescription>
          Gestisci i titoli di studio, le abilitazioni e i corsi di formazione del docente
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="academic">
          <TabsList className="mb-4">
            <TabsTrigger value="academic">
              <GraduationCap className="mr-2 h-4 w-4" />
              Titoli di Studio
            </TabsTrigger>
            <TabsTrigger value="certifications">
              <Award className="mr-2 h-4 w-4" />
              Abilitazioni
            </TabsTrigger>
            <TabsTrigger value="training">
              <FileUp className="mr-2 h-4 w-4" />
              Formazione
            </TabsTrigger>
          </TabsList>
          
          {/* Academic Qualifications Tab */}
          <TabsContent value="academic">
            <div className="flex justify-between mb-4">
              <h3 className="text-lg font-medium">Titoli di Studio</h3>
              <Button>
                <PlusCircle className="mr-2 h-4 w-4" />
                Aggiungi Titolo
              </Button>
            </div>
            
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Titolo</TableHead>
                  <TableHead>Istituzione</TableHead>
                  <TableHead>Anno</TableHead>
                  <TableHead>Voto</TableHead>
                  <TableHead className="text-right">Azioni</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {teacher.academicQualifications.length > 0 ? (
                  teacher.academicQualifications.map((qualification) => (
                    <TableRow key={qualification.id}>
                      <TableCell>{qualification.title}</TableCell>
                      <TableCell>{qualification.institution}</TableCell>
                      <TableCell>{qualification.year}</TableCell>
                      <TableCell>{qualification.grade}</TableCell>
                      <TableCell className="text-right">
                        {/* Actions buttons would go here */}
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-6 text-muted-foreground">
                      Nessun titolo di studio registrato.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TabsContent>
          
          {/* Certifications Tab */}
          <TabsContent value="certifications">
            <div className="flex justify-between mb-4">
              <h3 className="text-lg font-medium">Abilitazioni all'Insegnamento</h3>
              <Button>
                <PlusCircle className="mr-2 h-4 w-4" />
                Aggiungi Abilitazione
              </Button>
            </div>
            
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Abilitazione</TableHead>
                  <TableHead>Ente</TableHead>
                  <TableHead>Anno</TableHead>
                  <TableHead>Risultato</TableHead>
                  <TableHead className="text-right">Azioni</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {teacher.teachingCertifications.length > 0 ? (
                  teacher.teachingCertifications.map((certification) => (
                    <TableRow key={certification.id}>
                      <TableCell>{certification.title}</TableCell>
                      <TableCell>{certification.institution}</TableCell>
                      <TableCell>{certification.year}</TableCell>
                      <TableCell>{certification.grade}</TableCell>
                      <TableCell className="text-right">
                        {/* Actions buttons would go here */}
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-6 text-muted-foreground">
                      Nessuna abilitazione registrata.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TabsContent>
          
          {/* Training Courses Tab */}
          <TabsContent value="training">
            <div className="flex justify-between mb-4">
              <h3 className="text-lg font-medium">Corsi di Formazione</h3>
              <Button>
                <PlusCircle className="mr-2 h-4 w-4" />
                Aggiungi Corso
              </Button>
            </div>
            
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Corso</TableHead>
                  <TableHead>Ente Erogatore</TableHead>
                  <TableHead>Periodo</TableHead>
                  <TableHead>Ore Totali</TableHead>
                  <TableHead className="text-right">Azioni</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {teacher.trainingCourses.length > 0 ? (
                  teacher.trainingCourses.map((course) => (
                    <TableRow key={course.id}>
                      <TableCell>{course.title}</TableCell>
                      <TableCell>{course.provider}</TableCell>
                      <TableCell>
                        {new Date(course.startDate).toLocaleDateString("it-IT")} - 
                        {new Date(course.endDate).toLocaleDateString("it-IT")}
                      </TableCell>
                      <TableCell>{course.totalHours}</TableCell>
                      <TableCell className="text-right">
                        {/* Actions buttons would go here */}
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-6 text-muted-foreground">
                      Nessun corso di formazione registrato.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default QualificationsTab;
