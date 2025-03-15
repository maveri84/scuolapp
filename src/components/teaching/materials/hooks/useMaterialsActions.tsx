
import React from "react";
import { toast } from "sonner";
import { useMaterialsContext } from "../MaterialsContext";

export const useMaterialsActions = () => {
  const { 
    files, 
    setFiles, 
    selectedFiles, 
    setSelectedFiles, 
    setUploadingFile,
    setGoogleDriveConnected,
    filterFiles
  } = useMaterialsContext();

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

  return {
    handleFileUpload,
    handleToggleSelect,
    handleSelectAll,
    handleDelete,
    handleConnectGoogleDrive
  };
};
