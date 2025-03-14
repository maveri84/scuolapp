
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/sheet";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { format, addHours } from "date-fns";
import { toast } from "sonner";
import { CalendarIcon, Plus, Video, Users, User, Clock, ExternalLink, MessageSquare } from "lucide-react";

// Mock data for events
type EventType = 'meeting' | 'appointment' | 'conference' | 'videocall';

interface Event {
  id: string;
  title: string;
  date: Date;
  startTime: string;
  endTime: string;
  description: string;
  type: EventType;
  participants?: string[];
  location?: string;
  videoLink?: string;
}

// Sample events
const initialEvents: Event[] = [
  {
    id: '1',
    title: 'Incontro Collegio Docenti',
    date: new Date(2023, 9, 15),
    startTime: '15:00',
    endTime: '17:00',
    description: 'Riunione mensile del collegio docenti',
    type: 'meeting',
    participants: ['Tutti i docenti'],
    location: 'Aula Magna'
  },
  {
    id: '2',
    title: 'Colloquio con i Genitori di Mario Rossi',
    date: new Date(2023, 9, 16),
    startTime: '14:30',
    endTime: '15:00',
    description: 'Discussione sul rendimento scolastico',
    type: 'conference',
    participants: ['Genitori di Mario Rossi']
  },
  {
    id: '3',
    title: 'Videocall Formazione Digitale',
    date: new Date(2023, 9, 17),
    startTime: '16:00',
    endTime: '17:30',
    description: 'Corso di formazione sugli strumenti digitali',
    type: 'videocall',
    videoLink: 'https://meet.google.com/abc-defg-hij'
  }
];

const CalendarView: React.FC = () => {
  const [events, setEvents] = useState<Event[]>(initialEvents);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [openNewEvent, setOpenNewEvent] = useState(false);
  const [calendarView, setCalendarView] = useState<'month' | 'week' | 'day'>('month');
  
  // New event form state
  const [newEvent, setNewEvent] = useState<Omit<Event, 'id'>>({
    title: '',
    date: new Date(),
    startTime: '08:00',
    endTime: '09:00',
    description: '',
    type: 'meeting'
  });
  
  // Handle adding a new event
  const handleAddEvent = () => {
    const eventToAdd: Event = {
      ...newEvent,
      id: Date.now().toString(),
      date: selectedDate || new Date()
    };
    
    setEvents([...events, eventToAdd]);
    setOpenNewEvent(false);
    resetNewEventForm();
    toast.success('Evento aggiunto con successo');
  };
  
  // Reset form after adding event
  const resetNewEventForm = () => {
    setNewEvent({
      title: '',
      date: new Date(),
      startTime: '08:00',
      endTime: '09:00',
      description: '',
      type: 'meeting'
    });
  };
  
  // Handle form field changes
  const handleNewEventChange = (field: keyof Omit<Event, 'id'>, value: any) => {
    setNewEvent({
      ...newEvent,
      [field]: value
    });
  };
  
  // Filter events for the selected date
  const getEventsForSelectedDate = () => {
    if (!selectedDate) return [];
    
    return events.filter(event => {
      const eventDate = new Date(event.date);
      return eventDate.getDate() === selectedDate.getDate() &&
             eventDate.getMonth() === selectedDate.getMonth() &&
             eventDate.getFullYear() === selectedDate.getFullYear();
    });
  };
  
  // Get icon for event type
  const getEventIcon = (type: EventType) => {
    switch (type) {
      case 'meeting':
        return <Users className="h-4 w-4" />;
      case 'appointment':
        return <Clock className="h-4 w-4" />;
      case 'conference':
        return <User className="h-4 w-4" />;
      case 'videocall':
        return <Video className="h-4 w-4" />;
      default:
        return <CalendarIcon className="h-4 w-4" />;
    }
  };
  
  // Get color class for event type
  const getEventColorClass = (type: EventType) => {
    switch (type) {
      case 'meeting':
        return 'bg-blue-100 border-blue-300 text-blue-800';
      case 'appointment':
        return 'bg-purple-100 border-purple-300 text-purple-800';
      case 'conference':
        return 'bg-green-100 border-green-300 text-green-800';
      case 'videocall':
        return 'bg-red-100 border-red-300 text-red-800';
      default:
        return 'bg-gray-100 border-gray-300 text-gray-800';
    }
  };
  
  // Calculate the current date to highlight
  const today = new Date();
  
  // Function to initiate a video call
  const startVideoCall = (event: Event) => {
    if (event.videoLink) {
      window.open(event.videoLink, '_blank');
    } else {
      // For events without a link, we could generate one
      const generatedLink = `https://meet.google.com/generated-${Math.random().toString(36).substring(2, 7)}`;
      
      // Update the event with the new link
      const updatedEvents = events.map(e => 
        e.id === event.id ? { ...e, videoLink: generatedLink } : e
      );
      
      setEvents(updatedEvents);
      window.open(generatedLink, '_blank');
      toast.success('Link per la videochiamata generato e copiato');
    }
  };
  
  // Day cell renderer to show dots for events
  const renderDayContents = (day: Date) => {
    const dayEvents = events.filter(event => {
      const eventDate = new Date(event.date);
      return eventDate.getDate() === day.getDate() &&
             eventDate.getMonth() === day.getMonth() &&
             eventDate.getFullYear() === day.getFullYear();
    });
    
    return dayEvents.length > 0 && (
      <div className="absolute bottom-1 left-0 right-0 flex justify-center">
        <div className={`h-1 w-1 rounded-full ${dayEvents.length > 0 ? 'bg-primary' : 'bg-transparent'}`}></div>
      </div>
    );
  };
  
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="pb-2">
          <div className="flex justify-between items-center">
            <CardTitle>Calendario Scolastico</CardTitle>
            <div className="flex space-x-2">
              <Tabs value={calendarView} onValueChange={(value) => setCalendarView(value as any)}>
                <TabsList>
                  <TabsTrigger value="month">Mese</TabsTrigger>
                  <TabsTrigger value="week">Settimana</TabsTrigger>
                  <TabsTrigger value="day">Giorno</TabsTrigger>
                </TabsList>
              </Tabs>
              
              <Dialog open={openNewEvent} onOpenChange={setOpenNewEvent}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Nuovo Evento
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Crea Nuovo Evento</DialogTitle>
                    <DialogDescription>
                      Inserisci i dettagli per aggiungere un nuovo evento al calendario.
                    </DialogDescription>
                  </DialogHeader>
                  
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <Label htmlFor="event-title">Titolo</Label>
                      <Input 
                        id="event-title" 
                        value={newEvent.title} 
                        onChange={(e) => handleNewEventChange('title', e.target.value)} 
                        placeholder="Titolo dell'evento"
                      />
                    </div>
                    
                    <div className="grid gap-2">
                      <Label htmlFor="event-type">Tipo di Evento</Label>
                      <Select 
                        value={newEvent.type} 
                        onValueChange={(value) => handleNewEventChange('type', value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Seleziona un tipo" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="meeting">Riunione</SelectItem>
                          <SelectItem value="appointment">Appuntamento</SelectItem>
                          <SelectItem value="conference">Colloquio</SelectItem>
                          <SelectItem value="videocall">Videochiamata</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="grid gap-2">
                        <Label htmlFor="start-time">Ora Inizio</Label>
                        <Input 
                          id="start-time" 
                          type="time" 
                          value={newEvent.startTime} 
                          onChange={(e) => handleNewEventChange('startTime', e.target.value)} 
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="end-time">Ora Fine</Label>
                        <Input 
                          id="end-time" 
                          type="time" 
                          value={newEvent.endTime} 
                          onChange={(e) => handleNewEventChange('endTime', e.target.value)} 
                        />
                      </div>
                    </div>
                    
                    {newEvent.type === 'videocall' && (
                      <div className="grid gap-2">
                        <Label htmlFor="video-link">Link Videochiamata (opzionale)</Label>
                        <Input 
                          id="video-link" 
                          value={newEvent.videoLink || ''} 
                          onChange={(e) => handleNewEventChange('videoLink', e.target.value)} 
                          placeholder="https://meet.example.com/..."
                        />
                      </div>
                    )}
                    
                    <div className="grid gap-2">
                      <Label htmlFor="event-desc">Descrizione</Label>
                      <Textarea 
                        id="event-desc" 
                        value={newEvent.description} 
                        onChange={(e) => handleNewEventChange('description', e.target.value)} 
                        placeholder="Descrizione dell'evento..."
                      />
                    </div>
                  </div>
                  
                  <DialogFooter>
                    <Button type="button" variant="outline" onClick={() => setOpenNewEvent(false)}>
                      Annulla
                    </Button>
                    <Button type="button" onClick={handleAddEvent}>
                      Salva Evento
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </CardHeader>
        
        <CardContent>
          <div className="grid md:grid-cols-[300px,1fr] gap-6">
            <div>
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                className="rounded-md border"
                components={{
                  DayContent: (props) => (
                    <div className="relative h-9 w-9 p-0 font-normal flex items-center justify-center">
                      {props.day.getDate()}
                      {renderDayContents(props.day)}
                    </div>
                  ),
                }}
              />
              
              <div className="mt-6">
                <h3 className="font-medium mb-2">Legenda:</h3>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
                    <span className="text-sm">Riunioni</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-purple-500 mr-2"></div>
                    <span className="text-sm">Appuntamenti</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                    <span className="text-sm">Colloqui</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
                    <span className="text-sm">Videochiamate</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <div className="mb-4">
                <h2 className="text-xl font-semibold">
                  {selectedDate ? format(selectedDate, 'EEEE d MMMM yyyy') : 'Seleziona una data'}
                </h2>
              </div>
              
              {getEventsForSelectedDate().length > 0 ? (
                <div className="space-y-4">
                  {getEventsForSelectedDate().map((event) => (
                    <div 
                      key={event.id} 
                      className={`p-4 border rounded-lg ${getEventColorClass(event.type)}`}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="flex items-center">
                            {getEventIcon(event.type)}
                            <h3 className="text-lg font-medium ml-2">{event.title}</h3>
                          </div>
                          <div className="flex items-center text-sm mt-1">
                            <Clock className="h-4 w-4 mr-1" />
                            <span>{event.startTime} - {event.endTime}</span>
                          </div>
                        </div>
                        
                        {event.type === 'videocall' && (
                          <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={() => startVideoCall(event)}
                            className="flex items-center"
                          >
                            <Video className="h-4 w-4 mr-1" />
                            {event.videoLink ? 'Partecipa' : 'Crea Link'}
                          </Button>
                        )}
                      </div>
                      
                      {event.description && (
                        <p className="mt-2 text-sm">{event.description}</p>
                      )}
                      
                      {event.participants && event.participants.length > 0 && (
                        <div className="mt-2 text-sm">
                          <span className="font-medium">Partecipanti:</span> {event.participants.join(', ')}
                        </div>
                      )}
                      
                      {event.location && (
                        <div className="mt-1 text-sm">
                          <span className="font-medium">Luogo:</span> {event.location}
                        </div>
                      )}
                      
                      {event.videoLink && (
                        <div className="mt-1 text-sm">
                          <span className="font-medium">Link:</span>{' '}
                          <a 
                            href={event.videoLink} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline flex items-center inline-flex"
                          >
                            {event.videoLink.substring(0, 30)}...
                            <ExternalLink className="h-3 w-3 ml-1" />
                          </a>
                        </div>
                      )}
                      
                      <div className="mt-4 flex space-x-2">
                        <Button variant="outline" size="sm">
                          <MessageSquare className="h-4 w-4 mr-1" />
                          Invia Promemoria
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-muted/20 rounded-lg border border-dashed">
                  <CalendarIcon className="mx-auto h-12 w-12 text-muted-foreground" />
                  <h3 className="mt-2 text-lg font-medium">Nessun evento per questa data</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Crea un nuovo evento cliccando sul pulsante "Nuovo Evento"
                  </p>
                  <Button 
                    onClick={() => setOpenNewEvent(true)} 
                    variant="outline" 
                    className="mt-4"
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Aggiungi Evento
                  </Button>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CalendarView;
