
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CardTitle, CardDescription } from "@/components/ui/card";
import { Cloud } from "lucide-react";

interface DriveConnectorProps {
  googleDriveConnected: boolean;
  onConnectGoogleDrive: () => void;
}

const DriveConnector: React.FC<DriveConnectorProps> = ({
  googleDriveConnected,
  onConnectGoogleDrive
}) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <CardTitle className="flex items-center">
          <Cloud className="mr-2 h-5 w-5" />
          Materiale Didattico
        </CardTitle>
        <CardDescription>
          Gestisci e organizza il tuo materiale didattico
        </CardDescription>
      </div>
      {!googleDriveConnected ? (
        <Button onClick={onConnectGoogleDrive}>
          <Cloud className="mr-2 h-4 w-4" />
          Connetti Google Drive
        </Button>
      ) : (
        <Badge variant="outline" className="flex items-center gap-1 px-3 py-1">
          <Cloud className="h-4 w-4 text-green-500" />
          Google Drive Connesso
        </Badge>
      )}
    </div>
  );
};

export default DriveConnector;
