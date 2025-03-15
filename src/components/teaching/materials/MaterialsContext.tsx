
import React, { createContext, useContext, useState } from "react";
import { toast } from "sonner";
import { FileItem, mockFiles } from "../types/materials";

interface MaterialsContextType {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedSubject: string;
  setSelectedSubject: (subject: string) => void;
  selectedClass: string;
  setSelectedClass: (classId: string) => void;
  files: FileItem[];
  setFiles: React.Dispatch<React.SetStateAction<FileItem[]>>;
  uploadingFile: boolean;
  setUploadingFile: (uploading: boolean) => void;
  selectedFiles: string[];
  setSelectedFiles: React.Dispatch<React.SetStateAction<string[]>>;
  googleDriveConnected: boolean;
  setGoogleDriveConnected: (connected: boolean) => void;
  filterFiles: () => FileItem[];
}

const MaterialsContext = createContext<MaterialsContextType | undefined>(undefined);

export const MaterialsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSubject, setSelectedSubject] = useState<string>("");
  const [selectedClass, setSelectedClass] = useState<string>("");
  const [files, setFiles] = useState(mockFiles);
  const [uploadingFile, setUploadingFile] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<string[]>([]);
  const [googleDriveConnected, setGoogleDriveConnected] = useState(false);

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

  return (
    <MaterialsContext.Provider value={{
      searchQuery,
      setSearchQuery,
      selectedSubject,
      setSelectedSubject,
      selectedClass,
      setSelectedClass,
      files,
      setFiles,
      uploadingFile,
      setUploadingFile,
      selectedFiles,
      setSelectedFiles,
      googleDriveConnected,
      setGoogleDriveConnected,
      filterFiles
    }}>
      {children}
    </MaterialsContext.Provider>
  );
};

export const useMaterialsContext = () => {
  const context = useContext(MaterialsContext);
  if (context === undefined) {
    throw new Error("useMaterialsContext must be used within a MaterialsProvider");
  }
  return context;
};
