
import React from "react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import DriveConnector from "./materials/DriveConnector";
import MaterialsFilter from "./materials/MaterialsFilter";
import FileActions from "./materials/FileActions";
import FilesTable from "./materials/FilesTable";
import { MaterialsProvider, useMaterialsContext } from "./materials/MaterialsContext";
import { useMaterialsActions } from "./materials/hooks/useMaterialsActions";

const TeachingMaterialsContent = () => {
  const { 
    filterFiles, 
    uploadingFile, 
    selectedFiles, 
    googleDriveConnected 
  } = useMaterialsContext();
  
  const { 
    handleFileUpload, 
    handleToggleSelect, 
    handleSelectAll, 
    handleDelete,
    handleConnectGoogleDrive 
  } = useMaterialsActions();

  const filteredFiles = filterFiles();

  return (
    <Card>
      <CardHeader>
        <DriveConnector 
          googleDriveConnected={googleDriveConnected}
          onConnectGoogleDrive={handleConnectGoogleDrive}
        />
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <MaterialsFilter />
          
          <Separator />
          
          <FileActions 
            selectedFiles={selectedFiles}
            onFileUpload={handleFileUpload}
            onDelete={handleDelete}
          />
          
          <FilesTable 
            files={filteredFiles}
            selectedFiles={selectedFiles}
            onToggleSelect={handleToggleSelect}
            onSelectAll={handleSelectAll}
          />
        </div>
      </CardContent>
      <CardFooter className="flex justify-between border-t pt-6">
        <div className="text-sm text-muted-foreground">
          {filteredFiles.length} file{filteredFiles.length !== 1 ? "s" : ""}
        </div>
        
        {uploadingFile && (
          <div className="flex items-center gap-2">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
            <span className="text-sm">Caricamento in corso...</span>
          </div>
        )}
      </CardFooter>
    </Card>
  );
};

const TeachingMaterials = () => {
  return (
    <div className="space-y-6">
      <MaterialsProvider>
        <TeachingMaterialsContent />
      </MaterialsProvider>
    </div>
  );
};

export default TeachingMaterials;
