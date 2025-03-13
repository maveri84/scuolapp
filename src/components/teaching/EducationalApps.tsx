
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import {
  AppWindow,
  Search,
  Star,
  Plus,
  ExternalLink,
  Bookmark,
  BookmarkCheck,
  Monitor,
  Smartphone,
  Tablet,
  Laptop,
  Filter
} from "lucide-react";

// Mock data for educational apps
const mockApps = [
  {
    id: '1',
    name: 'GeoGebra',
    description: 'Software interattivo per l\'insegnamento e l\'apprendimento della matematica e della geometria',
    category: 'Matematica',
    platform: ['web', 'tablet', 'smartphone'],
    rating: 4.8,
    url: 'https://www.geogebra.org/',
    imageUrl: 'https://d3b9chj9qjycfs.cloudfront.net/q-iZnb3QmxSxp6S8Pj5fsAKJXJJJ21kH6qCG9TlgqXk.jpeg',
    isFavorite: true
  },
  {
    id: '2',
    name: 'Quizlet',
    description: 'Strumento di apprendimento basato su flashcard per studiare lingue, storia, scienze e altri argomenti',
    category: 'Multidisciplinare',
    platform: ['web', 'tablet', 'smartphone'],
    rating: 4.5,
    url: 'https://quizlet.com/',
    imageUrl: 'https://avatars.githubusercontent.com/u/1042269',
    isFavorite: false
  },
  {
    id: '3',
    name: 'Khan Academy',
    description: 'Piattaforma di apprendimento con lezioni video, esercizi e quiz su matematica, scienze, economia e molto altro',
    category: 'Multidisciplinare',
    platform: ['web', 'tablet', 'smartphone'],
    rating: 4.9,
    url: 'https://www.khanacademy.org/',
    imageUrl: 'https://cdn.kastatic.org/images/khan-logo-vertical-transparent.png',
    isFavorite: true
  },
  {
    id: '4',
    name: 'Kahoot!',
    description: 'Piattaforma di apprendimento basata sul gioco per creare quiz interattivi e coinvolgere gli studenti',
    category: 'Gamification',
    platform: ['web', 'tablet', 'smartphone'],
    rating: 4.7,
    url: 'https://kahoot.com/',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b0/Kahoot%21_logo.svg/1200px-Kahoot%21_logo.svg.png',
    isFavorite: true
  },
  {
    id: '5',
    name: 'Duolingo',
    description: 'App per l\'apprendimento delle lingue con lezioni interattive, esercizi di pronuncia e quiz',
    category: 'Lingue',
    platform: ['web', 'tablet', 'smartphone'],
    rating: 4.6,
    url: 'https://www.duolingo.com/',
    imageUrl: 'https://cdn.duolingo.com/images/facebook/duo-fb.png',
    isFavorite: false
  },
  {
    id: '6',
    name: 'Padlet',
    description: 'Bacheca virtuale per raccogliere, organizzare e condividere contenuti multimediali',
    category: 'Collaborazione',
    platform: ['web', 'tablet', 'smartphone'],
    rating: 4.4,
    url: 'https://padlet.com/',
    imageUrl: 'https://yt3.googleusercontent.com/ytc/AIf8zZT4a-JTKQxDGbMzkfjnw62sQIyjIGmPuJWJeA=s900-c-k-c0x00ffffff-no-rj',
    isFavorite: false
  },
  {
    id: '7',
    name: 'Edmodo',
    description: 'Piattaforma di apprendimento sociale per insegnanti, studenti e genitori',
    category: 'Comunicazione',
    platform: ['web', 'tablet', 'smartphone'],
    rating: 4.3,
    url: 'https://new.edmodo.com/',
    imageUrl: 'https://play-lh.googleusercontent.com/9vQRn9VAIpIxe9MN46YJ6S8ci3PeDNCL_4xGqVV8zqUlZdo_cWAe82QDJYMQyQaiJfc',
    isFavorite: false
  },
  {
    id: '8',
    name: 'Canva for Education',
    description: 'Strumento di design grafico per creare presentazioni, infografiche, poster e altro materiale didattico',
    category: 'Creatività',
    platform: ['web', 'tablet'],
    rating: 4.7,
    url: 'https://www.canva.com/education/',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Canva_icon_2021.svg/2048px-Canva_icon_2021.svg.png',
    isFavorite: true
  },
];

// Categories for filtering
const categories = [
  "Tutte",
  "Matematica",
  "Lingue",
  "Scienze",
  "Storia",
  "Geografia",
  "Arte",
  "Musica",
  "Multidisciplinare",
  "Gamification",
  "Collaborazione",
  "Comunicazione",
  "Creatività"
];

// Platforms for filtering
const platforms = [
  { id: 'web', label: 'Web', icon: <Monitor className="h-4 w-4" /> },
  { id: 'smartphone', label: 'Smartphone', icon: <Smartphone className="h-4 w-4" /> },
  { id: 'tablet', label: 'Tablet', icon: <Tablet className="h-4 w-4" /> },
  { id: 'desktop', label: 'Desktop', icon: <Laptop className="h-4 w-4" /> },
];

const EducationalApps = () => {
  const [apps, setApps] = useState(mockApps);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Tutte");
  const [selectedPlatform, setSelectedPlatform] = useState<string | null>(null);
  const [favoritesOnly, setFavoritesOnly] = useState(false);

  const filterApps = () => {
    let filteredApps = mockApps;
    
    if (searchQuery) {
      filteredApps = filteredApps.filter(app => 
        app.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        app.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    if (selectedCategory !== "Tutte") {
      filteredApps = filteredApps.filter(app => 
        app.category === selectedCategory
      );
    }
    
    if (selectedPlatform) {
      filteredApps = filteredApps.filter(app => 
        app.platform.includes(selectedPlatform)
      );
    }
    
    if (favoritesOnly) {
      filteredApps = filteredApps.filter(app => 
        app.isFavorite
      );
    }
    
    return filteredApps;
  };

  const toggleFavorite = (appId: string) => {
    const updatedApps = apps.map(app => {
      if (app.id === appId) {
        return { ...app, isFavorite: !app.isFavorite };
      }
      return app;
    });
    
    setApps(updatedApps);
    
    const app = apps.find(app => app.id === appId);
    if (app) {
      toast.success(`${app.name} ${app.isFavorite ? 'rimosso dai' : 'aggiunto ai'} preferiti`);
    }
  };

  const openApp = (app: typeof mockApps[0]) => {
    window.open(app.url, '_blank');
    toast.success(`Apertura di ${app.name}`);
  };

  const filteredApps = filterApps();

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCategory("Tutte");
    setSelectedPlatform(null);
    setFavoritesOnly(false);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <AppWindow className="mr-2 h-5 w-5" />
            App Didattiche
          </CardTitle>
          <CardDescription>
            Esplora e utilizza applicazioni educative per arricchire le tue lezioni
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Cerca app didattiche..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <div className="flex gap-2">
                <div className="relative">
                  <Button variant="outline" className="w-full md:w-auto flex gap-2 items-center">
                    <Filter className="h-4 w-4" />
                    Categoria: {selectedCategory}
                  </Button>
                  <div className="absolute z-10 mt-2 w-60 rounded-md bg-white shadow-lg hidden group-hover:block transition-all duration-300 ease-in-out">
                    <div className="rounded-md ring-1 ring-black ring-opacity-5 p-2 max-h-60 overflow-auto">
                      {categories.map((category) => (
                        <button
                          key={category}
                          className={`block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full text-left rounded-md ${selectedCategory === category ? 'bg-gray-100' : ''}`}
                          onClick={() => setSelectedCategory(category)}
                        >
                          {category}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="relative">
                  <Button variant="outline" className="w-full md:w-auto flex gap-2 items-center">
                    <Monitor className="h-4 w-4" />
                    Piattaforma
                  </Button>
                  <div className="absolute z-10 mt-2 w-48 rounded-md bg-white shadow-lg hidden group-hover:block transition-all duration-300 ease-in-out">
                    <div className="rounded-md ring-1 ring-black ring-opacity-5 p-2">
                      {platforms.map((platform) => (
                        <button
                          key={platform.id}
                          className={`block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full text-left rounded-md flex items-center ${selectedPlatform === platform.id ? 'bg-gray-100' : ''}`}
                          onClick={() => setSelectedPlatform(platform.id)}
                        >
                          {platform.icon}
                          <span className="ml-2">{platform.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
                
                <Button
                  variant={favoritesOnly ? "default" : "outline"}
                  className="w-full md:w-auto"
                  onClick={() => setFavoritesOnly(!favoritesOnly)}
                >
                  <Star className={`mr-2 h-4 w-4 ${favoritesOnly ? 'text-yellow-400 fill-yellow-400' : ''}`} />
                  Preferiti
                </Button>
              </div>
            </div>
            
            {(searchQuery || selectedCategory !== "Tutte" || selectedPlatform || favoritesOnly) && (
              <div className="flex items-center justify-between">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="text-sm text-muted-foreground">
                    Filtri attivi:
                  </p>
                  
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
                  
                  {selectedCategory !== "Tutte" && (
                    <Badge variant="secondary" className="flex items-center gap-1">
                      Categoria: {selectedCategory}
                      <button onClick={() => setSelectedCategory("Tutte")} className="ml-1 rounded-full hover:bg-muted p-1">
                        <span className="sr-only">Remove</span>
                        <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-3 w-3">
                          <path d="M11.7816 4.03157C12.0062 3.80702 12.0062 3.44295 11.7816 3.2184C11.5571 2.99385 11.193 2.99385 10.9685 3.2184L7.50005 6.68682L4.03164 3.2184C3.80708 2.99385 3.44301 2.99385 3.21846 3.2184C2.99391 3.44295 2.99391 3.80702 3.21846 4.03157L6.68688 7.49999L3.21846 10.9684C2.99391 11.193 2.99391 11.557 3.21846 11.7816C3.44301 12.0061 3.80708 12.0061 4.03164 11.7816L7.50005 8.31316L10.9685 11.7816C11.193 12.0061 11.5571 12.0061 11.7816 11.7816C12.0062 11.557 12.0062 11.193 11.7816 10.9684L8.31322 7.49999L11.7816 4.03157Z" fill="currentColor"></path>
                        </svg>
                      </button>
                    </Badge>
                  )}
                  
                  {selectedPlatform && (
                    <Badge variant="secondary" className="flex items-center gap-1">
                      Piattaforma: {platforms.find(p => p.id === selectedPlatform)?.label}
                      <button onClick={() => setSelectedPlatform(null)} className="ml-1 rounded-full hover:bg-muted p-1">
                        <span className="sr-only">Remove</span>
                        <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-3 w-3">
                          <path d="M11.7816 4.03157C12.0062 3.80702 12.0062 3.44295 11.7816 3.2184C11.5571 2.99385 11.193 2.99385 10.9685 3.2184L7.50005 6.68682L4.03164 3.2184C3.80708 2.99385 3.44301 2.99385 3.21846 3.2184C2.99391 3.44295 2.99391 3.80702 3.21846 4.03157L6.68688 7.49999L3.21846 10.9684C2.99391 11.193 2.99391 11.557 3.21846 11.7816C3.44301 12.0061 3.80708 12.0061 4.03164 11.7816L7.50005 8.31316L10.9685 11.7816C11.193 12.0061 11.5571 12.0061 11.7816 11.7816C12.0062 11.557 12.0062 11.193 11.7816 10.9684L8.31322 7.49999L11.7816 4.03157Z" fill="currentColor"></path>
                        </svg>
                      </button>
                    </Badge>
                  )}
                  
                  {favoritesOnly && (
                    <Badge variant="secondary" className="flex items-center gap-1">
                      Solo preferiti
                      <button onClick={() => setFavoritesOnly(false)} className="ml-1 rounded-full hover:bg-muted p-1">
                        <span className="sr-only">Remove</span>
                        <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-3 w-3">
                          <path d="M11.7816 4.03157C12.0062 3.80702 12.0062 3.44295 11.7816 3.2184C11.5571 2.99385 11.193 2.99385 10.9685 3.2184L7.50005 6.68682L4.03164 3.2184C3.80708 2.99385 3.44301 2.99385 3.21846 3.2184C2.99391 3.44295 2.99391 3.80702 3.21846 4.03157L6.68688 7.49999L3.21846 10.9684C2.99391 11.193 2.99391 11.557 3.21846 11.7816C3.44301 12.0061 3.80708 12.0061 4.03164 11.7816L7.50005 8.31316L10.9685 11.7816C11.193 12.0061 11.5571 12.0061 11.7816 11.7816C12.0062 11.557 12.0062 11.193 11.7816 10.9684L8.31322 7.49999L11.7816 4.03157Z" fill="currentColor"></path>
                        </svg>
                      </button>
                    </Badge>
                  )}
                </div>
                
                <Button variant="ghost" size="sm" onClick={clearFilters}>
                  Reset filtri
                </Button>
              </div>
            )}
            
            <Separator />
            
            {filteredApps.length === 0 ? (
              <div className="text-center py-10">
                <AppWindow className="mx-auto h-12 w-12 text-muted-foreground" />
                <h3 className="mt-2 text-lg font-medium text-gray-900">Nessuna app trovata</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Prova a modificare i filtri di ricerca.
                </p>
                <div className="mt-6">
                  <Button onClick={clearFilters}>Elimina tutti i filtri</Button>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredApps.map((app) => (
                  <Card key={app.id} className="overflow-hidden">
                    <div className="h-32 bg-muted flex items-center justify-center">
                      <img
                        src={app.imageUrl}
                        alt={app.name}
                        className="h-full w-full object-cover object-center"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = 'https://placehold.co/400x200/9ca3af/ffffff?text=App+Image';
                        }}
                      />
                    </div>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <CardTitle>{app.name}</CardTitle>
                        <button
                          onClick={() => toggleFavorite(app.id)}
                          className="text-gray-400 hover:text-yellow-500 focus:outline-none"
                        >
                          <Star className={`h-5 w-5 ${app.isFavorite ? 'text-yellow-400 fill-yellow-400' : ''}`} />
                        </button>
                      </div>
                      <div className="flex items-center gap-1 mt-1">
                        <Badge variant="secondary">{app.category}</Badge>
                        <div className="flex items-center ml-2">
                          <Star className="h-3 w-3 text-yellow-400 fill-yellow-400" />
                          <span className="text-xs ml-1">{app.rating}</span>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {app.description}
                      </p>
                      <div className="flex items-center gap-1 mt-2">
                        {app.platform.includes('web') && (
                          <Badge variant="outline" className="text-xs p-1">
                            <Monitor className="h-3 w-3 mr-1" />
                            Web
                          </Badge>
                        )}
                        {app.platform.includes('tablet') && (
                          <Badge variant="outline" className="text-xs p-1">
                            <Tablet className="h-3 w-3 mr-1" />
                            Tablet
                          </Badge>
                        )}
                        {app.platform.includes('smartphone') && (
                          <Badge variant="outline" className="text-xs p-1">
                            <Smartphone className="h-3 w-3 mr-1" />
                            Mobile
                          </Badge>
                        )}
                        {app.platform.includes('desktop') && (
                          <Badge variant="outline" className="text-xs p-1">
                            <Laptop className="h-3 w-3 mr-1" />
                            Desktop
                          </Badge>
                        )}
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between pt-2">
                      <Button variant="ghost" size="sm" onClick={() => toggleFavorite(app.id)}>
                        {app.isFavorite ? (
                          <>
                            <BookmarkCheck className="mr-2 h-4 w-4" />
                            Salvato
                          </>
                        ) : (
                          <>
                            <Bookmark className="mr-2 h-4 w-4" />
                            Salva
                          </>
                        )}
                      </Button>
                      <Button size="sm" onClick={() => openApp(app)}>
                        <ExternalLink className="mr-2 h-4 w-4" />
                        Apri
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </CardContent>
        <CardFooter className="border-t pt-6">
          <div className="text-sm text-muted-foreground">
            {filteredApps.length} app{filteredApps.length !== 1 ? "" : ""} {selectedCategory !== "Tutte" ? `in ${selectedCategory}` : ""}
          </div>
          
          <Button variant="outline" size="sm">
            <Plus className="mr-2 h-4 w-4" />
            Suggerisci nuova app
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default EducationalApps;
