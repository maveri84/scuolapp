
import React from "react";
import DashboardLayout from "@/layouts/DashboardLayout";
import DatabaseTab from "@/components/administration/DatabaseTab";

const Database = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Database</h1>
        <p className="text-muted-foreground">
          Gestione del database e delle operazioni di backup
        </p>
      </div>
      
      <DatabaseTab />
    </div>
  );
};

export default Database;
