
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
  GraduationCap,
  School,
  FileText,
  Palette,
  Briefcase,
  Building,
  Award,
  BookText,
  Database,
  FileBox,
  MessageSquare,
  MessageCircle,
  ChevronDown,
  ChevronRight
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
  children?: React.ReactNode;
  hasChildren?: boolean;
}

const userRoles = {
  isAdmin: true,
  isTeacher: true,
  isStudent: false,
  isSecretary: true
};

const SidebarItem: React.FC<SidebarItemProps> = ({ 
  icon, 
  label, 
  to, 
  isAdmin = false, 
  children, 
  hasChildren = false 
}) => {
  const location = useLocation();
  const [expanded, setExpanded] = React.useState(false);
  const isActive = location.pathname === to || (hasChildren && expanded);
  
  const toggleExpand = (e: React.MouseEvent) => {
    if (hasChildren) {
      e.preventDefault();
      setExpanded(!expanded);
    }
  };
  
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
        asChild={!hasChildren}
        onClick={hasChildren ? toggleExpand : undefined}
      >
        {hasChildren ? (
          <div className="flex w-full items-center cursor-pointer">
            <span className="mr-3">{icon}</span>
            <span className="flex-1">{label}</span>
            {expanded ? (
              <ChevronDown className="h-4 w-4" />
            ) : (
              <ChevronRight className="h-4 w-4" />
            )}
          </div>
        ) : (
          <Link to={to}>
            <span className="mr-3">{icon}</span>
            <span>{label}</span>
          </Link>
        )}
      </Button>
      {hasChildren && expanded && children}
    </li>
  );
};

const Sidebar: React.FC<SidebarProps> = ({ open, setOpen }) => {
  const isMobile = useIsMobile();
  const location = useLocation();
  
  // Close sidebar on navigation in mobile view
  React.useEffect(() => {
    if (isMobile && open) {
      setOpen(false);
    }
  }, [location.pathname, isMobile]);
  
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
                
                {userRoles.isTeacher && (
                  <SidebarItem icon={<BookText className="h-5 w-5" />} label="Registro di Classe" to="/class-register" />
                )}
                
                <SidebarItem icon={<UserCheck className="h-5 w-5" />} label="Presenze" to="/attendance" />
                <SidebarItem icon={<ClipboardList className="h-5 w-5" />} label="Valutazioni" to="/grades" />
                <SidebarItem icon={<FilePlus className="h-5 w-5" />} label="Compiti" to="/assignments" />
                <SidebarItem icon={<CalendarDays className="h-5 w-5" />} label="Calendario" to="/calendar" />
                <SidebarItem icon={<Mail className="h-5 w-5" />} label="Comunicazioni" to="/messages" />
                
                {userRoles.isTeacher && (
                  <SidebarItem icon={<MessageCircle className="h-5 w-5" />} label="Richieste Assenze" to="/leave-requests" />
                )}

                {(userRoles.isAdmin || userRoles.isSecretary) && (
                  <SidebarItem 
                    icon={<Building className="h-5 w-5" />} 
                    label="Segreteria" 
                    to="/administration"
                    hasChildren={true}
                  >
                    <ul className="ml-6 mt-1 space-y-1 border-l-2 border-sidebar-border pl-2">
                      <SidebarItem 
                        icon={<GraduationCap className="h-5 w-5" />} 
                        label="Gestione Studenti" 
                        to="/administration" 
                      />
                      <SidebarItem 
                        icon={<Briefcase className="h-5 w-5" />} 
                        label="Gestione Personale" 
                        to="/administration?tab=personnel" 
                      />
                      <SidebarItem 
                        icon={<FileText className="h-5 w-5" />} 
                        label="Certificati" 
                        to="/administration?tab=certificates" 
                      />
                      <SidebarItem 
                        icon={<FileBox className="h-5 w-5" />} 
                        label="Protocollo" 
                        to="/administration?tab=protocol" 
                      />
                      <SidebarItem 
                        icon={<CalendarDays className="h-5 w-5" />} 
                        label="Calendario Scolastico" 
                        to="/administration?tab=calendar" 
                      />
                    </ul>
                  </SidebarItem>
                )}
                
                <SidebarItem icon={<School className="h-5 w-5" />} label="Gestione Classi" to="/classes" />
                
                <SidebarItem icon={<Award className="h-5 w-5" />} label="Carriera" to="/career" />

                <SidebarItem 
                  icon={<Palette className="h-5 w-5" />} 
                  label="Personalizzazione" 
                  to="/customization"
                />
              </ul>
            </nav>
          </div>
          
          <div className="p-4">
            <ul className="space-y-1">
              <SidebarItem 
                icon={<Database className="h-5 w-5" />} 
                label="Database" 
                to="/database" 
                isAdmin={true}
              />
              <SidebarItem 
                icon={<Shield className="h-5 w-5" />} 
                label="Amministrazione" 
                to="/administration" 
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
