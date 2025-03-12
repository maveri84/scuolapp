
import React from "react";
import DashboardLayout from "@/layouts/DashboardLayout";

const Attendance = () => {
  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Gestione Presenze</h1>
        <p className="text-muted-foreground mt-2">
          Gestisci le presenze e le assenze degli studenti
        </p>
      </div>
    </DashboardLayout>
  );
};

export default Attendance;
