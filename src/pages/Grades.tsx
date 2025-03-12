
import React from "react";
import DashboardLayout from "@/layouts/DashboardLayout";

const Grades = () => {
  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Valutazioni</h1>
        <p className="text-muted-foreground mt-2">
          Gestisci le valutazioni e i compiti degli studenti
        </p>
      </div>
    </DashboardLayout>
  );
};

export default Grades;
