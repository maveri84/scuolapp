
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
import { CalendarIcon, Video, Plus, Users, Clock, Info, Calendar as CalendarLucide, School, X } from 'lucide-react';

// Mock events data
interface CalendarEvent {
  id: string;
  title: string;
  start: Date;
  end: Date;
  type: 'meeting' | 'closure' | 'parentMeeting' | 'conference' | 'videoCall';
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
  },
  {
    id: '4',
    title: 'Chiusura per Festività',
    start: new Date(2024, 3, 25, 0, 0),
    end: new Date(2024, 3, 25, 23, 59),
    type: 'closure',
    description: 'Chiusura scuola per festa nazionale'
  }
];

const CalendarView: React.FC = () => {
  const [events, setEvents] = useState<CalendarEvent[]>(mockEvents);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [isCreatingEvent, setIsCreatingEvent] = useState(false);
  const [isViewingEventDetails, setIsViewingEventDetails] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);
  const [newEvent, setNewEvent] = useState<Partial<CalendarEvent>>({
    title: '',
    type: 'meeting',
    start: new Date(),
    end: new Date(),
    description: '',
    location: '',
    isVideoCall: false
  });

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
    if (selectedDate) {
      setNewEvent({
        ...newEvent,
        start: selectedDate,
        end: selectedDate
      });
    }
    setIsCreatingEvent(true);
  };

  // View event details
  const handleViewEvent = (event: CalendarEvent) => {
    setSelectedEvent(event);
    setIsViewingEventDetails(true);
  };

  // Handle save event
  const handleSaveEvent = () => {
    if (!newEvent.title || !newEvent.type) return;
    
    const eventToSave: CalendarEvent = {
      id: Math.random().toString(36).substring(2, 9),
      title: newEvent.title || '',
      type: newEvent.type as CalendarEvent['type'],
      start: newEvent.start || new Date(),
      end: newEvent.end || new Date(),
      description: newEvent.description,
      location: newEvent.location,
      isVideoCall: newEvent.isVideoCall,
      participants: newEvent.participants
    };
    
    setEvents([...events, eventToSave]);
    setIsCreatingEvent(false);
    setNewEvent({
      title: '',
      type: 'meeting',
      start: new Date(),
      end: new Date(),
      description: '',
      location: '',
      isVideoCall: false
    });
  };

  // Handle delete event
  const handleDeleteEvent = (id: string) => {
    setEvents(events.filter(event => event.id !== id));
    setIsViewingEventDetails(false);
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
      case 'closure':
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-200">Chiusura</Badge>;
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
            <Input 
              id="title" 
              placeholder="Titolo dell'evento" 
              value={newEvent.title} 
              onChange={(e) => setNewEvent({...newEvent, title: e.target.value})}
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label>Data</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="justify-start text-left">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {newEvent.start ? format(newEvent.start, 'd MMM yyyy', { locale: it }) : "Seleziona data"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={newEvent.start}
                    onSelect={(date) => setNewEvent({...newEvent, start: date, end: date})}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="type">Tipo</Label>
              <Select 
                defaultValue={newEvent.type} 
                onValueChange={(value) => setNewEvent({...newEvent, type: value as CalendarEvent['type']})}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Seleziona tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="meeting">Riunione</SelectItem>
                  <SelectItem value="conference">Conferenza</SelectItem>
                  <SelectItem value="parentMeeting">Colloquio Genitori</SelectItem>
                  <SelectItem value="videoCall">Videochiamata</SelectItem>
                  <SelectItem value="closure">Chiusura</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="startTime">Ora inizio</Label>
              <Input 
                id="startTime" 
                type="time" 
                onChange={(e) => {
                  if (!newEvent.start) return;
                  const [hours, minutes] = e.target.value.split(':').map(Number);
                  const newDate = new Date(newEvent.start);
                  newDate.setHours(hours);
                  newDate.setMinutes(minutes);
                  setNewEvent({...newEvent, start: newDate});
                }}
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="endTime">Ora fine</Label>
              <Input 
                id="endTime" 
                type="time" 
                onChange={(e) => {
                  if (!newEvent.end) return;
                  const [hours, minutes] = e.target.value.split(':').map(Number);
                  const newDate = new Date(newEvent.end);
                  newDate.setHours(hours);
                  newDate.setMinutes(minutes);
                  setNewEvent({...newEvent, end: newDate});
                }}
              />
            </div>
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="location">Luogo</Label>
            <Input 
              id="location" 
              placeholder="Luogo dell'evento" 
              value={newEvent.location || ''}
              onChange={(e) => setNewEvent({...newEvent, location: e.target.value})}
            />
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="description">Descrizione</Label>
            <Textarea 
              id="description" 
              placeholder="Descrizione dell'evento" 
              rows={3} 
              value={newEvent.description || ''}
              onChange={(e) => setNewEvent({...newEvent, description: e.target.value})}
            />
          </div>
          
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="isVideoCall" 
              checked={newEvent.isVideoCall || false}
              onCheckedChange={(checked) => setNewEvent({...newEvent, isVideoCall: checked === true})}
            />
            <Label htmlFor="isVideoCall">Abilita videochiamata</Label>
          </div>
        </div>
        
        <SheetFooter>
          <Button variant="outline" onClick={() => setIsCreatingEvent(false)}>Annulla</Button>
          <Button type="submit" onClick={handleSaveEvent}>Salva evento</Button>
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

            {selectedEvent.type === 'closure' && (
              <div className="flex items-start space-x-3">
                <School className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="font-medium">Tipo di chiusura</p>
                  <p className="text-sm text-muted-foreground">
                    Istituzione scolastica chiusa per questa data
                  </p>
                </div>
              </div>
            )}
          </div>
          
          <SheetFooter>
            <div className="flex w-full justify-between">
              <Button variant="destructive" onClick={() => handleDeleteEvent(selectedEvent.id)}>
                <X className="mr-2 h-4 w-4" />
                Elimina
              </Button>
              
              <div className="space-x-2">
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
            </div>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    );
  };

  // Custom day renderer to show event indicators
  const renderDayContent = (props: any) => {
    // Get the date from the props
    const date = props.date;
    const dayEvents = events.filter(event => isSameDay(event.start, date));
    const hasEvents = dayEvents.length > 0;
    
    // Check if there's a closure event
    const hasClosure = dayEvents.some(event => event.type === 'closure');
    
    return (
      <div className="relative h-full w-full p-2">
        <div className={`${hasClosure ? 'text-red-500 font-semibold' : ''}`}>
          {date.getDate()}
        </div>
        {hasEvents && (
          <div className="absolute bottom-1 left-0 right-0 flex justify-center">
            {hasClosure ? (
              <div className="h-1 w-1 rounded-full bg-red-500"></div>
            ) : (
              <>
                <div className="h-1 w-1 rounded-full bg-primary"></div>
                {dayEvents.length > 1 && (
                  <div className="h-1 w-1 rounded-full bg-primary ml-0.5"></div>
                )}
              </>
            )}
          </div>
        )}
      </div>
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
          components={{
            DayContent: renderDayContent
          }}
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
