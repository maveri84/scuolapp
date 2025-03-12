
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Bell, Calendar, Mail, File } from "lucide-react";
import { Separator } from "@/components/ui/separator";

// Mock notifications data
const notifications = [
  {
    id: 1,
    type: "message",
    title: "Nuovo messaggio",
    description: "Maria Bianchi (genitore) ha inviato un nuovo messaggio",
    time: "10 minuti fa",
  },
  {
    id: 2,
    type: "calendar",
    title: "Riunione docenti",
    description: "Riunione di dipartimento programmata per domani alle 15:00",
    time: "30 minuti fa",
  },
  {
    id: 3,
    type: "bell",
    title: "Promemoria",
    description: "Consegna programmazioni didattiche entro venerdì",
    time: "2 ore fa",
  },
  {
    id: 4,
    type: "file",
    title: "Nuovo documento",
    description: "Il dirigente ha caricato una nuova circolare",
    time: "Ieri",
  },
];

const NotificationsCard: React.FC = () => {
  // Function to render the appropriate icon
  const getIcon = (type: string) => {
    switch (type) {
      case "message":
        return <Mail className="h-5 w-5 text-primary" />;
      case "calendar":
        return <Calendar className="h-5 w-5 text-accent" />;
      case "bell":
        return <Bell className="h-5 w-5 text-amber-500" />;
      case "file":
        return <File className="h-5 w-5 text-green-500" />;
      default:
        return <Bell className="h-5 w-5 text-primary" />;
    }
  };

  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl">Notifiche</CardTitle>
        <CardDescription>
          Le tue notifiche recenti
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {notifications.map((notification, index) => (
            <React.Fragment key={notification.id}>
              <div className="flex items-start p-1">
                <div className="h-8 w-8 rounded-full bg-secondary flex items-center justify-center mr-3 mt-0.5">
                  {getIcon(notification.type)}
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-sm">{notification.title}</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    {notification.description}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {notification.time}
                  </p>
                </div>
              </div>
              {index < notifications.length - 1 && (
                <Separator />
              )}
            </React.Fragment>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default NotificationsCard;
