
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookText, CheckCircle, UserCheck, Clock, CalendarDays, FileText, MessageSquare } from "lucide-react";
import DashboardLayout from "@/layouts/DashboardLayout";
import AttendanceRegister from "@/components/attendance/AttendanceRegister";

// Import our refactored components
import SignRegisterTab from "@/components/class-register/SignRegisterTab";
import NotesTab from "@/components/class-register/NotesTab";
import TopicsTab from "@/components/class-register/TopicsTab";
import ScheduleTab from "@/components/class-register/ScheduleTab";
import { classRegisterData } from "@/components/class-register/data";

const ClassRegister = () => {
  const { classes, subjects, students, teacherSchedule } = classRegisterData;

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Registro di Classe</h1>
        <p className="text-muted-foreground mt-2">
          Gestisci le attività didattiche, presenze e annotazioni per la classe
        </p>
      </div>

      <Tabs defaultValue="sign" className="space-y-4">
        <TabsList className="flex-wrap">
          <TabsTrigger value="sign">
            <CheckCircle className="mr-2 h-4 w-4" />
            Firma Registro
          </TabsTrigger>
          <TabsTrigger value="attendance">
            <UserCheck className="mr-2 h-4 w-4" />
            Presenze
          </TabsTrigger>
          <TabsTrigger value="notes">
            <MessageSquare className="mr-2 h-4 w-4" />
            Note Disciplinari
          </TabsTrigger>
          <TabsTrigger value="topics">
            <BookText className="mr-2 h-4 w-4" />
            Argomenti
          </TabsTrigger>
          <TabsTrigger value="schedule">
            <CalendarDays className="mr-2 h-4 w-4" />
            Orario
          </TabsTrigger>
        </TabsList>

        <TabsContent value="sign" className="space-y-4">
          <SignRegisterTab classes={classes} subjects={subjects} />
        </TabsContent>

        <TabsContent value="attendance" className="space-y-4">
          <AttendanceRegister />
        </TabsContent>

        <TabsContent value="notes" className="space-y-4">
          <NotesTab classes={classes} students={students} />
        </TabsContent>

        <TabsContent value="topics" className="space-y-4">
          <TopicsTab classes={classes} subjects={subjects} />
        </TabsContent>

        <TabsContent value="schedule" className="space-y-4">
          <ScheduleTab teacherSchedule={teacherSchedule} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ClassRegister;
