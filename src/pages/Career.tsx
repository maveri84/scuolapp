
import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import CareerTab from "@/components/administration/career/CareerTab";

const Career: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [loadedParams, setLoadedParams] = useState(false);

  // In questo modo possiamo passare i parametri corretti al componente CareerTab
  // Ad esempio, se accediamo a /career?tab=progressions, questo mostrerà direttamente la scheda progressioni
  useEffect(() => {
    if (!loadedParams) {
      setLoadedParams(true);
    }
  }, [loadedParams]);

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
