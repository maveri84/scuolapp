
import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { FileQuestion } from "lucide-react";
import { Button } from "@/components/ui/button";

const NotFound: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    // Only log errors in development, not in production
    if (process.env.NODE_ENV !== "production") {
      console.error(`404 Error: Accesso a una rotta inesistente: ${location.pathname}`);
    }
  }, [location]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-muted/20 px-4">
      <div className="text-center max-w-md bg-card p-8 rounded-lg shadow-md">
        <div className="flex justify-center mb-4">
          <FileQuestion className="h-20 w-20 text-muted-foreground" />
        </div>
        <h1 className="text-4xl font-bold mb-2">404</h1>
        <h2 className="text-xl font-semibold mb-4">Pagina non trovata</h2>
        <p className="text-muted-foreground mb-6">
          La pagina che stai cercando non esiste o è stata spostata.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild variant="default">
            <a href="/">Torna alla Home</a>
          </Button>
          <Button asChild variant="outline">
            <a href="/dashboard">Dashboard</a>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
