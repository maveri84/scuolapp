
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
  Users,
  Shield,
  GraduationCap
} from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { Link, useLocation } from "react-router-dom";

interface SidebarProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
  to: string;
  isAdmin?: boolean;
}

// Simulating role-based access control
const userRoles = {
  isAdmin: true // In a real app, this would come from auth
};

const SidebarItem: React.FC<SidebarItemProps> = ({ icon, label, to, isAdmin = false }) => {
  const location = useLocation();
  const isActive = location.pathname === to;
  
  // Hide admin-only items if user is not admin
  if (isAdmin && !userRoles.isAdmin) {
    return null;
  }

  return (
    <li>
      <Button
        variant="ghost"
        className={`w-full justify-start px-3 ${
          isActive 
            ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium" 
            : "text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground"
        }`}
        asChild
      >
        <Link to={to}>
          <span className="mr-3">{icon}</span>
          <span>{label}</span>
        </Link>
      </Button>
    </li>
  );
};

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
            <Link to="/" className="flex items-center">
              <div className="h-8 w-8 rounded-md bg-primary flex items-center justify-center text-primary-foreground font-bold mr-2">
                SR
              </div>
              <h2 className="font-semibold text-xl text-sidebar-foreground">Smart Registry</h2>
            </Link>
            
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
                <SidebarItem icon={<HomeIcon className="h-5 w-5" />} label="Dashboard" to="/" />
                <SidebarItem icon={<UserCheck className="h-5 w-5" />} label="Presenze" to="/attendance" />
                <SidebarItem icon={<ClipboardList className="h-5 w-5" />} label="Valutazioni" to="/grades" />
                <SidebarItem icon={<GraduationCap className="h-5 w-5" />} label="Studenti" to="/students" />
                <SidebarItem icon={<FilePlus className="h-5 w-5" />} label="Compiti" to="/assignments" />
                <SidebarItem icon={<CalendarDays className="h-5 w-5" />} label="Calendario" to="/calendar" />
                <SidebarItem icon={<Mail className="h-5 w-5" />} label="Comunicazioni" to="/messages" />
                <SidebarItem icon={<Users className="h-5 w-5" />} label="Classi" to="/classes" />
              </ul>
            </nav>
          </div>
          
          <div className="p-4">
            <ul className="space-y-1">
              <SidebarItem 
                icon={<Shield className="h-5 w-5" />} 
                label="Amministrazione" 
                to="/settings" 
                isAdmin={true}
              />
              <SidebarItem 
                icon={<Settings className="h-5 w-5" />} 
                label="Impostazioni" 
                to="/settings"
              />
            </ul>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
