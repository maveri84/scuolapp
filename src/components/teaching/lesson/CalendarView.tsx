
import React, { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetFooter } from '@/components/ui/sheet';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { format, isSameDay } from 'date-fns';
import { it } from 'date-fns/locale';
import { CalendarIcon, Video, Plus, Users, Clock, Info, Calendar as CalendarLucide } from 'lucide-react';

// Mock events data
interface CalendarEvent {
  id: string;
  title: string;
  start: Date;
  end: Date;
  type: 'meeting' | 'conference' | 'parentMeeting' | 'videoCall';
  description?: string;
  participants?: string[];
  location?: string;
  isVideoCall?: boolean;
}

const mockEvents: CalendarEvent[] = [
  {
    id: '1',
    title: 'Riunione Dipartimento',
    start: new Date(2024, 3, 15, 14, 30),
    end: new Date(2024, 3, 15, 16, 0),
    type: 'meeting',
    description: 'Discussione programmazione didattica',
    participants: ['Marco Rossi', 'Giulia Bianchi', 'Luca Verdi'],
    location: 'Sala riunioni principale'
  },
  {
    id: '2',
    title: 'Colloquio Genitori',
    start: new Date(2024, 3, 16, 17, 0),
    end: new Date(2024, 3, 16, 17, 30),
    type: 'parentMeeting',
    description: 'Colloquio con i genitori di Sofia Esposito',
    participants: ['Mario Esposito', 'Laura Esposito'],
    isVideoCall: true
  },
  {
    id: '3',
    title: 'Conferenza Didattica Digitale',
    start: new Date(2024, 3, 18, 9, 0),
    end: new Date(2024, 3, 18, 13, 0),
    type: 'conference',
    description: 'Conferenza sulle nuove tecnologie per la didattica',
    location: 'Aula Magna'
  }
];

const CalendarView: React.FC = () => {
  const [events] = useState<CalendarEvent[]>(mockEvents);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [isCreatingEvent, setIsCreatingEvent] = useState(false);
  const [isViewingEventDetails, setIsViewingEventDetails] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);

  // Handler for date selection
  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date);
  };

  // Get events for selected date
  const getEventsForSelectedDate = () => {
    if (!selectedDate) return [];
    return events.filter(event => isSameDay(event.start, selectedDate));
  };

  // Open event creation modal
  const handleCreateEvent = () => {
    setIsCreatingEvent(true);
  };

  // View event details
  const handleViewEvent = (event: CalendarEvent) => {
    setSelectedEvent(event);
    setIsViewingEventDetails(true);
  };

  // Render events for the selected date
  const renderEvents = () => {
    const dayEvents = getEventsForSelectedDate();
    
    if (dayEvents.length === 0) {
      return (
        <div className="text-center py-10">
          <CalendarLucide className="mx-auto h-12 w-12 text-muted-foreground" />
          <h3 className="mt-2 text-lg font-medium text-gray-900">Nessun evento per questa data</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Inizia creando un nuovo evento per questa giornata.
          </p>
          <div className="mt-6">
            <Button onClick={handleCreateEvent}>
              <Plus className="mr-2 h-4 w-4" />
              Crea nuovo evento
            </Button>
          </div>
        </div>
      );
    }

    return (
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-medium">
            Eventi per {selectedDate ? format(selectedDate, 'd MMMM yyyy', { locale: it }) : ''}
          </h3>
          <Button onClick={handleCreateEvent} size="sm">
            <Plus className="mr-2 h-4 w-4" />
            Nuovo
          </Button>
        </div>
        
        <div className="space-y-3">
          {dayEvents.map(event => (
            <div 
              key={event.id} 
              className="p-3 border rounded-md hover:bg-gray-50 cursor-pointer"
              onClick={() => handleViewEvent(event)}
            >
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-medium">{event.title}</h4>
                  <p className="text-sm text-muted-foreground">
                    {format(event.start, 'HH:mm')} - {format(event.end, 'HH:mm')}
                  </p>
                </div>
                <EventTypeBadge type={event.type} />
              </div>
              
              {event.isVideoCall && (
                <div className="mt-2 flex items-center text-sm text-blue-600">
                  <Video className="h-3 w-3 mr-1" />
                  Videochimata disponibile
                </div>
              )}
              
              {event.location && (
                <div className="mt-1 text-sm text-muted-foreground">
                  {event.location}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Custom day content to show event indicators
  const renderDayContent = (day: Date) => {
    const dayEvents = events.filter(event => isSameDay(event.start, day));
    const hasEvents = dayEvents.length > 0;
    
    return (
      <div className="relative h-full w-full p-2">
        <div>{day.getDate()}</div>
        {hasEvents && (
          <div className="absolute bottom-1 left-0 right-0 flex justify-center">
            <div className="h-1 w-1 rounded-full bg-primary"></div>
            {dayEvents.length > 1 && (
              <div className="h-1 w-1 rounded-full bg-primary ml-0.5"></div>
            )}
          </div>
        )}
      </div>
    );
  };

  // Render badge for event type
  const EventTypeBadge = ({ type }: { type: CalendarEvent['type'] }) => {
    switch(type) {
      case 'meeting':
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">Riunione</Badge>;
      case 'conference':
        return <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-200">Conferenza</Badge>;
      case 'parentMeeting':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-200">Colloquio</Badge>;
      case 'videoCall':
        return <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-200">Videochiamata</Badge>;
      default:
        return null;
    }
  };

  // Event creation form
  const EventCreationForm = () => (
    <Sheet open={isCreatingEvent} onOpenChange={setIsCreatingEvent}>
      <SheetContent className="sm:max-w-md">
        <SheetHeader>
          <SheetTitle>Crea nuovo evento</SheetTitle>
          <SheetDescription>
            Inserisci i dettagli per il tuo nuovo evento.
          </SheetDescription>
        </SheetHeader>
        
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="title">Titolo</Label>
            <Input id="title" placeholder="Titolo dell'evento" />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label>Data</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="justify-start text-left">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {selectedDate ? format(selectedDate, 'd MMM yyyy', { locale: it }) : "Seleziona data"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={handleDateSelect}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="type">Tipo</Label>
              <Select defaultValue="meeting">
                <SelectTrigger>
                  <SelectValue placeholder="Seleziona tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="meeting">Riunione</SelectItem>
                  <SelectItem value="conference">Conferenza</SelectItem>
                  <SelectItem value="parentMeeting">Colloquio Genitori</SelectItem>
                  <SelectItem value="videoCall">Videochiamata</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="startTime">Ora inizio</Label>
              <Input id="startTime" type="time" />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="endTime">Ora fine</Label>
              <Input id="endTime" type="time" />
            </div>
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="location">Luogo</Label>
            <Input id="location" placeholder="Luogo dell'evento" />
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="description">Descrizione</Label>
            <Textarea id="description" placeholder="Descrizione dell'evento" rows={3} />
          </div>
          
          <div className="flex items-center space-x-2">
            <Checkbox id="isVideoCall" />
            <Label htmlFor="isVideoCall">Abilita videochiamata</Label>
          </div>
        </div>
        
        <SheetFooter>
          <Button onClick={() => setIsCreatingEvent(false)}>Annulla</Button>
          <Button type="submit">Salva evento</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );

  // Event details view
  const EventDetails = () => {
    if (!selectedEvent) return null;
    
    return (
      <Sheet open={isViewingEventDetails} onOpenChange={setIsViewingEventDetails}>
        <SheetContent className="sm:max-w-md">
          <SheetHeader>
            <SheetTitle>{selectedEvent.title}</SheetTitle>
            <div className="flex items-center space-x-2 mt-1">
              <EventTypeBadge type={selectedEvent.type} />
              <p className="text-sm text-muted-foreground">
                {format(selectedEvent.start, 'd MMMM yyyy', { locale: it })}
              </p>
            </div>
          </SheetHeader>
          
          <div className="py-4 space-y-4">
            <div className="flex items-start space-x-3">
              <Clock className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div>
                <p className="font-medium">Orario</p>
                <p className="text-sm text-muted-foreground">
                  {format(selectedEvent.start, 'HH:mm')} - {format(selectedEvent.end, 'HH:mm')}
                </p>
              </div>
            </div>
            
            {selectedEvent.location && (
              <div className="flex items-start space-x-3">
                <CalendarLucide className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="font-medium">Luogo</p>
                  <p className="text-sm text-muted-foreground">{selectedEvent.location}</p>
                </div>
              </div>
            )}
            
            {selectedEvent.description && (
              <div className="flex items-start space-x-3">
                <Info className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="font-medium">Descrizione</p>
                  <p className="text-sm text-muted-foreground">{selectedEvent.description}</p>
                </div>
              </div>
            )}
            
            {selectedEvent.participants && selectedEvent.participants.length > 0 && (
              <div className="flex items-start space-x-3">
                <Users className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="font-medium">Partecipanti</p>
                  <ul className="text-sm text-muted-foreground">
                    {selectedEvent.participants.map((participant, i) => (
                      <li key={i}>{participant}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
          
          <SheetFooter>
            <div className="flex w-full justify-between">
              <Button variant="outline" onClick={() => setIsViewingEventDetails(false)}>
                Chiudi
              </Button>
              
              {selectedEvent.isVideoCall && (
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <Video className="mr-2 h-4 w-4" />
                  Avvia videochiamata
                </Button>
              )}
            </div>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    );
  };

  return (
    <div className="flex flex-col md:flex-row gap-4">
      <div className="md:w-7/12">
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={handleDateSelect}
          className="border rounded-md p-3"
          showOutsideDays
        />
      </div>
      
      <div className="md:w-5/12 border rounded-md p-4">
        {renderEvents()}
      </div>
      
      <EventCreationForm />
      <EventDetails />
    </div>
  );
};

export default CalendarView;
