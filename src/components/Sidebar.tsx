
import React from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { 
  BookOpen, 
  CalendarDays, 
  ChevronLeft, 
  ClipboardList, 
  FilePlus, 
  HomeIcon, 
  Mail, 
  Settings, 
  UserCheck, 
  Users
} from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

interface SidebarProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ icon, label, active }) => (
  <li>
    <Button
      variant="ghost"
      className={`w-full justify-start px-3 ${
        active 
          ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium" 
          : "text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground"
      }`}
    >
      <span className="mr-3">{icon}</span>
      <span>{label}</span>
    </Button>
  </li>
);

const Sidebar: React.FC<SidebarProps> = ({ open, setOpen }) => {
  const isMobile = useIsMobile();
  
  return (
    <>
      {isMobile && open && (
        <div
          className="fixed inset-0 z-20 bg-black/50 backdrop-blur-sm transition-opacity"
          onClick={() => setOpen(false)}
        />
      )}
      
      <aside
        className={`fixed top-0 left-0 z-30 h-full w-64 bg-sidebar transform transition-transform duration-300 ease-in-out ${
          open ? "translate-x-0" : "-translate-x-full"
        } ${!isMobile && "lg:translate-x-0"}`}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center">
              <div className="h-8 w-8 rounded-md bg-primary flex items-center justify-center text-primary-foreground font-bold mr-2">
                SR
              </div>
              <h2 className="font-semibold text-xl text-sidebar-foreground">Smart Registry</h2>
            </div>
            
            {isMobile && (
              <Button
                variant="ghost"
                size="icon"
                className="text-sidebar-foreground"
                onClick={() => setOpen(false)}
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
            )}
          </div>
          
          <Separator className="bg-sidebar-border" />
          
          <div className="flex-1 overflow-y-auto py-4 px-3">
            <nav>
              <ul className="space-y-1">
                <SidebarItem icon={<HomeIcon className="h-5 w-5" />} label="Dashboard" active />
                <SidebarItem icon={<UserCheck className="h-5 w-5" />} label="Presenze" />
                <SidebarItem icon={<ClipboardList className="h-5 w-5" />} label="Valutazioni" />
                <SidebarItem icon={<BookOpen className="h-5 w-5" />} label="Didattica" />
                <SidebarItem icon={<FilePlus className="h-5 w-5" />} label="Compiti" />
                <SidebarItem icon={<CalendarDays className="h-5 w-5" />} label="Calendario" />
                <SidebarItem icon={<Mail className="h-5 w-5" />} label="Comunicazioni" />
                <SidebarItem icon={<Users className="h-5 w-5" />} label="Classi" />
              </ul>
            </nav>
          </div>
          
          <div className="p-4">
            <Button
              variant="ghost"
              className="w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground"
            >
              <Settings className="h-5 w-5 mr-3" />
              <span>Impostazioni</span>
            </Button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
