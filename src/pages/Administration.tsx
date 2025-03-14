
import React from "react";
import AdministrationHeader from "@/components/administration/AdministrationHeader";
import AdministrationTabs from "@/components/administration/AdministrationTabs";

const Administration: React.FC = () => {
  return (
    <div className="space-y-6">
      <AdministrationHeader />
      <AdministrationTabs />
    </div>
  );
};

export default Administration;
