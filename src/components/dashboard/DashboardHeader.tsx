
import React from "react";

const DashboardHeader: React.FC = () => {
  const today = new Date();
  const options: Intl.DateTimeFormatOptions = { 
    weekday: 'long', 
    day: 'numeric', 
    month: 'long', 
    year: 'numeric' 
  };
  const formattedDate = today.toLocaleDateString('it-IT', options);
  const capitalizedDate = formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
  
  return (
    <div className="mb-8 fade-in-section">
      <h1 className="text-3xl font-bold tracking-tight">Buongiorno, Prof. Rossi</h1>
      <p className="text-muted-foreground mt-1">{capitalizedDate}</p>
    </div>
  );
};

export default DashboardHeader;
