
import React from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface AttendancePaginationProps {
  currentPage: number;
  pageCount: number;
  setCurrentPage: (page: number) => void;
}

const AttendancePagination: React.FC<AttendancePaginationProps> = ({
  currentPage,
  pageCount,
  setCurrentPage
}) => {
  if (pageCount <= 1) return null;
  
  return (
    <div className="flex items-center justify-end space-x-2 py-4">
      <Button
        variant="outline"
        size="sm"
        onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>
      <div className="text-sm">
        Pagina {currentPage} di {pageCount}
      </div>
      <Button
        variant="outline"
        size="sm"
        onClick={() => setCurrentPage(Math.min(pageCount, currentPage + 1))}
        disabled={currentPage === pageCount}
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default AttendancePagination;
