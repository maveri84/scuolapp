
import React from "react";
import { Button } from "@/components/ui/button";
import { BookCopy, Plus } from "lucide-react";

interface EmptyStateProps {
  hasFilters: boolean;
  onClearFilters: () => void;
  onCreateLesson: () => void;
}

const EmptyState: React.FC<EmptyStateProps> = ({ 
  hasFilters, 
  onClearFilters, 
  onCreateLesson 
}) => {
  return (
    <div className="text-center py-10">
      <BookCopy className="mx-auto h-12 w-12 text-muted-foreground" />
      <h3 className="mt-2 text-lg font-medium text-gray-900">Nessun piano di lezione trovato</h3>
      <p className="mt-1 text-sm text-muted-foreground">
        {hasFilters
          ? "Prova a modificare i filtri di ricerca."
          : "Inizia creando un nuovo piano di lezione."}
      </p>
      <div className="mt-6">
        {hasFilters ? (
          <Button onClick={onClearFilters}>
            Elimina tutti i filtri
          </Button>
        ) : (
          <Button onClick={onCreateLesson}>
            <Plus className="mr-2 h-4 w-4" />
            Crea il primo piano di lezione
          </Button>
        )}
      </div>
    </div>
  );
};

export default EmptyState;
