
import React from "react";
import CertificateManager from "./certificates/CertificateManager";

// This is a simple wrapper component to maintain compatibility
const CertificateManagerWrapper: React.FC = () => {
  return <CertificateManager />;
};

export default CertificateManagerWrapper;
