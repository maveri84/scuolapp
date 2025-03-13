
import React, { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import DriveConnector from "./materials/DriveConnector";
import MaterialsFilter from "./materials/MaterialsFilter";
import FileActions from "./materials/FileActions";
import FilesTable from "./materials/FilesTable";
import { mockFiles, FileItem } from "./types/materials";

const TeachingMaterials = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSubject, setSelectedSubject] = useState<string>("");
  const [selectedClass, setSelectedClass] = useState<string>("");
  const [files, setFiles] = useState(mockFiles);
  const [uploadingFile, setUploadingFile] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<string[]>([]);
  const [googleDriveConnected, setGoogleDriveConnected] = useState(false);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files?.length) return;
    
    setUploadingFile(true);
    
    // Simulate upload delay
    setTimeout(() => {
      setUploadingFile(false);
      toast.success("File caricato con successo");
      
      // Reset file input
      e.target.value = "";
    }, 1500);
  };

  const filterFiles = () => {
    let filteredFiles = mockFiles;
    
    if (searchQuery) {
      filteredFiles = filteredFiles.filter(file => 
        file.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    if (selectedSubject) {
      filteredFiles = filteredFiles.filter(file => 
        file.subject === selectedSubject
      );
    }
    
    if (selectedClass) {
      filteredFiles = filteredFiles.filter(file => 
        file.class === selectedClass
      );
    }
    
    return filteredFiles;
  };

  const handleToggleSelect = (fileId: string) => {
    if (selectedFiles.includes(fileId)) {
      setSelectedFiles(selectedFiles.filter(id => id !== fileId));
    } else {
      setSelectedFiles([...selectedFiles, fileId]);
    }
  };

  const handleSelectAll = () => {
    const filteredFiles = filterFiles();
    if (selectedFiles.length === filteredFiles.length) {
      setSelectedFiles([]);
    } else {
      setSelectedFiles(filteredFiles.map(file => file.id));
    }
  };

  const handleDelete = () => {
    if (!selectedFiles.length) return;
    
    // In a real application, you'd make an API call to delete the files
    setFiles(files.filter(file => !selectedFiles.includes(file.id)));
    setSelectedFiles([]);
    toast.success(`${selectedFiles.length} file eliminati`);
  };

  const handleConnectGoogleDrive = () => {
    // In a real application, you'd initiate OAuth flow with Google
    setGoogleDriveConnected(true);
    toast.success("Google Drive connesso con successo");
  };

  const filteredFiles = filterFiles();

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <DriveConnector 
            googleDriveConnected={googleDriveConnected}
            onConnectGoogleDrive={handleConnectGoogleDrive}
          />
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <MaterialsFilter 
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              selectedSubject={selectedSubject}
              setSelectedSubject={setSelectedSubject}
              selectedClass={selectedClass}
              setSelectedClass={setSelectedClass}
            />
            
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
            {filteredFiles.length} file{filteredFiles.length !== 1 ? "" : ""}
          </div>
          
          {uploadingFile && (
            <div className="flex items-center gap-2">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
              <span className="text-sm">Caricamento in corso...</span>
            </div>
          )}
        </CardFooter>
      </Card>
    </div>
  );
};

export default TeachingMaterials;
