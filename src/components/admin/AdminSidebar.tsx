import { NavLink, useLocation } from "react-router-dom";
import { 
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar
} from "@/components/ui/sidebar";
import { 
  User,
  Settings,
  Plus,
  Check,
  X
} from "lucide-react";

const adminItems = [
  { 
    title: "Dashboard", 
    url: "/admin", 
    icon: Settings,
    exact: true
  },
  { 
    title: "Profissionais", 
    url: "/admin/professionals", 
    icon: User 
  },
  { 
    title: "Categorias", 
    url: "/admin/categories", 
    icon: Plus 
  },
  { 
    title: "Serviços", 
    url: "/admin/services", 
    icon: Check 
  },
];

export function AdminSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const location = useLocation();
  const currentPath = location.pathname;

  const isActive = (item: typeof adminItems[0]) => {
    if (item.exact) {
      return currentPath === item.url;
    }
    return currentPath.startsWith(item.url);
  };

  const getNavClass = (item: typeof adminItems[0]) => {
    const baseClass = "w-full justify-start transition-colors";
    return isActive(item) 
      ? `${baseClass} bg-admin text-admin-foreground font-medium`
      : `${baseClass} hover:bg-accent hover:text-accent-foreground`;
  };

  return (
    <Sidebar className={collapsed ? "w-16" : "w-64"} collapsible="icon">
      <SidebarContent className="bg-card border-r">
        <div className="p-4">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded bg-admin flex items-center justify-center">
              <span className="text-sm font-bold text-admin-foreground">S</span>
            </div>
            {!collapsed && (
              <div>
                <h2 className="font-semibold text-foreground">ServiConnect</h2>
                <p className="text-xs text-muted-foreground">Admin Panel</p>
              </div>
            )}
          </div>
        </div>

        <SidebarGroup>
          <SidebarGroupLabel>Gerenciamento</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {adminItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink to={item.url} className={getNavClass(item)}>
                      <item.icon className="h-4 w-4" />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}