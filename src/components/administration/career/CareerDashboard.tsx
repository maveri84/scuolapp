
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Award, Briefcase, Calendar, Clock, FileText, GraduationCap, Users } from "lucide-react";
import { mockCareerProgressions, mockCareerRecons, mockLegalRecons, mockPreTenureRecognitions } from "./types";

const CareerDashboard: React.FC = () => {
  // Count items by status
  const pendingProgressions = mockCareerProgressions.filter(p => p.approvalStatus === "pending").length;
  const pendingRecons = mockCareerRecons.filter(r => r.status === "submitted" || r.status === "processing").length;
  const pendingLegal = mockLegalRecons.filter(r => r.status === "submitted" || r.status === "processing").length;
  const pendingPreTenure = mockPreTenureRecognitions.filter(r => r.status === "submitted" || r.status === "processing").length;
  
  const totalPending = pendingProgressions + pendingRecons + pendingLegal + pendingPreTenure;

  // Get recent approved items
  const recentApproved = [
    ...mockCareerProgressions.filter(p => p.approvalStatus === "approved").map(p => ({
      id: p.id,
      name: p.teacherName,
      type: "Progressione",
      date: p.approvalDate || "",
      icon: <Award className="h-4 w-4 text-green-500" />
    })),
    ...mockCareerRecons.filter(r => r.status === "approved").map(r => ({
      id: r.id,
      name: r.teacherName,
      type: "Ricostruzione",
      date: r.approvalDate || "",
      icon: <Briefcase className="h-4 w-4 text-blue-500" />
    })),
    ...mockLegalRecons.filter(r => r.status === "approved").map(r => ({
      id: r.id,
      name: r.teacherName,
      type: "Ricostruzione Legale",
      date: r.approvalDate || "",
      icon: <FileText className="h-4 w-4 text-purple-500" />
    })),
    ...mockPreTenureRecognitions.filter(r => r.status === "approved").map(r => ({
      id: r.id,
      name: r.teacherName,
      type: "Riconoscimento Pre-Ruolo",
      date: r.approvalDate || "",
      icon: <GraduationCap className="h-4 w-4 text-amber-500" />
    }))
  ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 5);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center">
              <Clock className="mr-2 h-4 w-4 text-orange-500" />
              In attesa
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalPending}</div>
            <p className="text-xs text-muted-foreground mt-1">Procedure in attesa di approvazione</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center">
              <Award className="mr-2 h-4 w-4 text-green-500" />
              Progressioni
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockCareerProgressions.length}</div>
            <p className="text-xs text-muted-foreground mt-1">Totali: {mockCareerProgressions.filter(p => p.approvalStatus === "approved").length} approvate</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center">
              <Briefcase className="mr-2 h-4 w-4 text-blue-500" />
              Ricostruzioni
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockCareerRecons.length + mockLegalRecons.length}</div>
            <p className="text-xs text-muted-foreground mt-1">Normali: {mockCareerRecons.length}, Sentenze: {mockLegalRecons.length}</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center">
              <GraduationCap className="mr-2 h-4 w-4 text-amber-500" />
              Pre-Ruolo
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockPreTenureRecognitions.length}</div>
            <p className="text-xs text-muted-foreground mt-1">Riconoscimenti anni servizio pre-ruolo</p>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="text-base">Approvazioni Recenti</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Tipo</TableHead>
                  <TableHead>Dipendente</TableHead>
                  <TableHead>Data</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentApproved.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="flex items-center">
                      {item.icon}
                      <span className="ml-2">{item.type}</span>
                    </TableCell>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{new Date(item.date).toLocaleDateString('it-IT')}</TableCell>
                  </TableRow>
                ))}
                {recentApproved.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={3} className="text-center text-muted-foreground py-4">
                      Nessuna approvazione recente
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Panoramica</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <Users className="h-4 w-4 mr-2 text-blue-500" />
                <span className="text-sm">Personale totale</span>
              </div>
              <Badge variant="outline">250</Badge>
            </div>
            
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <Briefcase className="h-4 w-4 mr-2 text-green-500" />
                <span className="text-sm">Docenti di ruolo</span>
              </div>
              <Badge variant="outline">175</Badge>
            </div>
            
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-2 text-orange-500" />
                <span className="text-sm">Progressioni previste</span>
              </div>
              <Badge variant="outline">15</Badge>
            </div>
            
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <GraduationCap className="h-4 w-4 mr-2 text-purple-500" />
                <span className="text-sm">Nuovi ruoli</span>
              </div>
              <Badge variant="outline">8</Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CareerDashboard;
