
import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Video, Share2, Upload } from "lucide-react";

interface MultimediaTabProps {
  onUpload: () => void;
}

export const MultimediaTab: React.FC<MultimediaTabProps> = ({ onUpload }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Risorse multimediali</CardTitle>
        <CardDescription>
          Gestisci video, presentazioni e contenuti interattivi
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <VideoCard 
            title="Tutorial laboratorio di chimica" 
            duration="15:30" 
            author="Prof. Neri" 
          />
          
          <VideoCard 
            title="Presentazione storia dell'arte" 
            duration="22:15" 
            author="Prof. Belli" 
          />
          
          <VideoCard 
            title="Guida alla biblioteca digitale" 
            duration="08:45" 
            author="Staff tecnico" 
          />
        </div>
      </CardContent>
      <CardFooter className="flex justify-center">
        <Button onClick={onUpload}>
          <Upload className="mr-2 h-4 w-4" />
          Carica nuovo contenuto
        </Button>
      </CardFooter>
    </Card>
  );
};

interface VideoCardProps {
  title: string;
  duration: string;
  author: string;
}

const VideoCard: React.FC<VideoCardProps> = ({ title, duration, author }) => {
  return (
    <div className="border rounded-lg overflow-hidden">
      <div className="aspect-video bg-muted flex items-center justify-center">
        <Video className="h-8 w-8 text-muted-foreground" />
      </div>
      <div className="p-3">
        <h3 className="font-medium text-sm">{title}</h3>
        <p className="text-xs text-muted-foreground mt-1">Durata: {duration} • {author}</p>
        <div className="flex justify-end mt-2">
          <Button size="sm" variant="ghost" className="h-7 w-7 p-0">
            <Share2 className="h-3 w-3" />
          </Button>
        </div>
      </div>
    </div>
  );
};
