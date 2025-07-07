import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AdminSidebar } from "./AdminSidebar";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AdminSidebar />
        
        <div className="flex-1 flex flex-col">
          <header className="h-16 flex items-center justify-between px-6 border-b bg-card shadow-sm">
            <div className="flex items-center gap-4">
              <SidebarTrigger className="text-foreground" />
              <div>
                <h1 className="text-xl font-semibold text-foreground">Painel Administrativo</h1>
                <p className="text-sm text-muted-foreground">ServiConnect</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-admin flex items-center justify-center">
                <span className="text-sm font-medium text-admin-foreground">A</span>
              </div>
              <span className="text-sm text-foreground">Admin</span>
            </div>
          </header>

          <main className="flex-1 p-6">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}