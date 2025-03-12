
import React, { useState } from "react";
import DashboardLayout from "@/layouts/DashboardLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Book, ClipboardList, FilePlus, Link, Upload, GraduationCap, Paperclip } from "lucide-react";
import AssignmentList from "@/components/assignments/AssignmentList";
import CreateAssignment from "@/components/assignments/CreateAssignment";

const Assignments = () => {
  const [selectedTab, setSelectedTab] = useState("list");

  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Compiti</h1>
        <p className="text-muted-foreground mt-2">
          Gestisci i compiti da assegnare agli studenti e alle classi
        </p>
      </div>

      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <TabsList>
            <TabsTrigger value="list">
              <ClipboardList className="mr-2 h-4 w-4" />
              Lista Compiti
            </TabsTrigger>
            <TabsTrigger value="create">
              <FilePlus className="mr-2 h-4 w-4" />
              Nuovo Compito
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="list" className="mt-0">
          <Card className="p-0">
            <AssignmentList />
          </Card>
        </TabsContent>

        <TabsContent value="create" className="mt-0">
          <Card>
            <CardContent className="pt-6">
              <CreateAssignment />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
};

export default Assignments;
