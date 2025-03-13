
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { 
  Cloud, 
  File, 
  FileText, 
  FolderPlus, 
  Upload, 
  Download, 
  Search, 
  Filter, 
  Trash2, 
  Share2, 
  Link,
  RefreshCw
} from "lucide-react";

// Mock data for Google Drive files
const mockFiles = [
  { id: '1', name: 'Lezione_Matematica_1.pdf', type: 'application/pdf', size: '2.4 MB', lastModified: '2024-03-10', subject: 'Matematica', class: '3A' },
  { id: '2', name: 'Dispense_Storia.docx', type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', size: '1.8 MB', lastModified: '2024-03-05', subject: 'Storia', class: '2A' },
  { id: '3', name: 'Esercizi_Grammatica.pdf', type: 'application/pdf', size: '1.2 MB', lastModified: '2024-03-12', subject: 'Italiano', class: '1B' },
  { id: '4', name: 'Slide_Scienze.pptx', type: 'application/vnd.openxmlformats-officedocument.presentationml.presentation', size: '4.6 MB', lastModified: '2024-03-08', subject: 'Scienze', class: '3A' },
  { id: '5', name: 'Verifica_Inglese.docx', type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', size: '0.9 MB', lastModified: '2024-03-11', subject: 'Inglese', class: '2B' },
];

// Mock data for subjects
const subjects = [
  { id: '1', name: 'Matematica' },
  { id: '2', name: 'Storia' },
  { id: '3', name: 'Italiano' },
  { id: '4', name: 'Scienze' },
  { id: '5', name: 'Inglese' },
  { id: '6', name: 'Geografia' },
  { id: '7', name: 'Arte' },
  { id: '8', name: 'Musica' },
  { id: '9', name: 'Tecnologia' },
  { id: '10', name: 'Educazione Fisica' },
];

// Mock data for classes
const classes = [
  { id: '1', name: '1A' },
  { id: '2', name: '1B' },
  { id: '3', name: '2A' },
  { id: '4', name: '2B' },
  { id: '5', name: '3A' },
  { id: '6', name: '3B' },
];

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
    if (selectedFiles.length === files.length) {
      setSelectedFiles([]);
    } else {
      setSelectedFiles(files.map(file => file.id));
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

  const getFileIcon = (type: string) => {
    if (type.includes('pdf')) return <FileText className="h-4 w-4 text-red-500" />;
    if (type.includes('word')) return <FileText className="h-4 w-4 text-blue-500" />;
    if (type.includes('presentation')) return <FileText className="h-4 w-4 text-orange-500" />;
    return <File className="h-4 w-4 text-gray-500" />;
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
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
              <Button onClick={handleConnectGoogleDrive}>
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
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Cerca materiali..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <div className="flex flex-1 gap-2">
                <Select value={selectedSubject} onValueChange={setSelectedSubject}>
                  <SelectTrigger>
                    <SelectValue placeholder="Materia" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Tutte le materie</SelectItem>
                    {subjects.map(subject => (
                      <SelectItem key={subject.id} value={subject.name}>
                        {subject.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                
                <Select value={selectedClass} onValueChange={setSelectedClass}>
                  <SelectTrigger>
                    <SelectValue placeholder="Classe" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Tutte le classi</SelectItem>
                    {classes.map(classItem => (
                      <SelectItem key={classItem.id} value={classItem.name}>
                        {classItem.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" size="sm" onClick={() => {
                setSearchQuery("");
                setSelectedSubject("");
                setSelectedClass("");
              }}>
                <RefreshCw className="mr-2 h-3 w-3" />
                Reset filtri
              </Button>
              
              {searchQuery && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  Ricerca: {searchQuery}
                  <button onClick={() => setSearchQuery("")} className="ml-1 rounded-full hover:bg-muted p-1">
                    <span className="sr-only">Remove</span>
                    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-3 w-3">
                      <path d="M11.7816 4.03157C12.0062 3.80702 12.0062 3.44295 11.7816 3.2184C11.5571 2.99385 11.193 2.99385 10.9685 3.2184L7.50005 6.68682L4.03164 3.2184C3.80708 2.99385 3.44301 2.99385 3.21846 3.2184C2.99391 3.44295 2.99391 3.80702 3.21846 4.03157L6.68688 7.49999L3.21846 10.9684C2.99391 11.193 2.99391 11.557 3.21846 11.7816C3.44301 12.0061 3.80708 12.0061 4.03164 11.7816L7.50005 8.31316L10.9685 11.7816C11.193 12.0061 11.5571 12.0061 11.7816 11.7816C12.0062 11.557 12.0062 11.193 11.7816 10.9684L8.31322 7.49999L11.7816 4.03157Z" fill="currentColor"></path>
                    </svg>
                  </button>
                </Badge>
              )}
              
              {selectedSubject && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  Materia: {selectedSubject}
                  <button onClick={() => setSelectedSubject("")} className="ml-1 rounded-full hover:bg-muted p-1">
                    <span className="sr-only">Remove</span>
                    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-3 w-3">
                      <path d="M11.7816 4.03157C12.0062 3.80702 12.0062 3.44295 11.7816 3.2184C11.5571 2.99385 11.193 2.99385 10.9685 3.2184L7.50005 6.68682L4.03164 3.2184C3.80708 2.99385 3.44301 2.99385 3.21846 3.2184C2.99391 3.44295 2.99391 3.80702 3.21846 4.03157L6.68688 7.49999L3.21846 10.9684C2.99391 11.193 2.99391 11.557 3.21846 11.7816C3.44301 12.0061 3.80708 12.0061 4.03164 11.7816L7.50005 8.31316L10.9685 11.7816C11.193 12.0061 11.5571 12.0061 11.7816 11.7816C12.0062 11.557 12.0062 11.193 11.7816 10.9684L8.31322 7.49999L11.7816 4.03157Z" fill="currentColor"></path>
                    </svg>
                  </button>
                </Badge>
              )}
              
              {selectedClass && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  Classe: {selectedClass}
                  <button onClick={() => setSelectedClass("")} className="ml-1 rounded-full hover:bg-muted p-1">
                    <span className="sr-only">Remove</span>
                    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-3 w-3">
                      <path d="M11.7816 4.03157C12.0062 3.80702 12.0062 3.44295 11.7816 3.2184C11.5571 2.99385 11.193 2.99385 10.9685 3.2184L7.50005 6.68682L4.03164 3.2184C3.80708 2.99385 3.44301 2.99385 3.21846 3.2184C2.99391 3.44295 2.99391 3.80702 3.21846 4.03157L6.68688 7.49999L3.21846 10.9684C2.99391 11.193 2.99391 11.557 3.21846 11.7816C3.44301 12.0061 3.80708 12.0061 4.03164 11.7816L7.50005 8.31316L10.9685 11.7816C11.193 12.0061 11.5571 12.0061 11.7816 11.7816C12.0062 11.557 12.0062 11.193 11.7816 10.9684L8.31322 7.49999L11.7816 4.03157Z" fill="currentColor"></path>
                    </svg>
                  </button>
                </Badge>
              )}
            </div>
            
            <Separator />
            
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  <FolderPlus className="mr-2 h-4 w-4" />
                  Nuova Cartella
                </Button>
                
                <Button
                  variant="outline"
                  size="sm"
                  className="relative"
                  onClick={() => document.getElementById('file-upload')?.click()}
                >
                  <Upload className="mr-2 h-4 w-4" />
                  Carica File
                  <Input
                    id="file-upload"
                    type="file"
                    className="sr-only"
                    onChange={handleFileUpload}
                    multiple
                  />
                </Button>
              </div>
              
              <div className="flex items-center gap-2">
                {selectedFiles.length > 0 && (
                  <>
                    <Button variant="outline" size="sm">
                      <Download className="mr-2 h-4 w-4" />
                      Scarica
                    </Button>
                    
                    <Button variant="outline" size="sm">
                      <Share2 className="mr-2 h-4 w-4" />
                      Condividi
                    </Button>
                    
                    <Button variant="destructive" size="sm" onClick={handleDelete}>
                      <Trash2 className="mr-2 h-4 w-4" />
                      Elimina
                    </Button>
                  </>
                )}
              </div>
            </div>
            
            <div className="border rounded-md">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-12">
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                          checked={selectedFiles.length === filteredFiles.length && filteredFiles.length > 0}
                          onChange={handleSelectAll}
                        />
                      </div>
                    </TableHead>
                    <TableHead>Nome</TableHead>
                    <TableHead>Materia</TableHead>
                    <TableHead>Classe</TableHead>
                    <TableHead>Data Modifica</TableHead>
                    <TableHead>Dimensione</TableHead>
                    <TableHead className="text-right">Azioni</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredFiles.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-6 text-muted-foreground">
                        Nessun file trovato
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredFiles.map((file) => (
                      <TableRow key={file.id}>
                        <TableCell>
                          <div className="flex items-center">
                            <input
                              type="checkbox"
                              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                              checked={selectedFiles.includes(file.id)}
                              onChange={() => handleToggleSelect(file.id)}
                            />
                          </div>
                        </TableCell>
                        <TableCell className="flex items-center gap-2">
                          {getFileIcon(file.type)}
                          {file.name}
                        </TableCell>
                        <TableCell>{file.subject}</TableCell>
                        <TableCell>{file.class}</TableCell>
                        <TableCell>{file.lastModified}</TableCell>
                        <TableCell>{file.size}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="ghost" size="sm">
                              <Download className="h-4 w-4" />
                              <span className="sr-only">Scarica</span>
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Share2 className="h-4 w-4" />
                              <span className="sr-only">Condividi</span>
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
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
