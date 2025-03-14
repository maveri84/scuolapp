
import React from "react";
import CareerTab from "@/components/administration/career/CareerTab";

const Career: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Gestione Carriera</h2>
        <p className="text-muted-foreground">
          Gestisci le progressioni di carriera, ricostruzioni e riconoscimenti secondo la normativa italiana
        </p>
      </div>
      <CareerTab />
    </div>
  );
};

export default Career;
