import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Settings, User, Check, Plus } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold">ServiConnect</h1>
              <p className="text-primary-foreground/80">Plataforma de Serviços</p>
            </div>
            <Link to="/admin">
              <Button variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
                <Settings className="h-4 w-4 mr-2" />
                Painel Admin
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Encontre os Melhores Profissionais
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Conectamos você aos melhores prestadores de serviços qualificados da sua região. 
            Rápido, seguro e confiável.
          </p>
        </div>

        {/* Quick Access Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <Link to="/admin">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader className="text-center">
                <Settings className="h-8 w-8 mx-auto text-admin mb-2" />
                <CardTitle>Dashboard</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground text-center">
                  Visão geral do sistema
                </p>
              </CardContent>
            </Card>
          </Link>

          <Link to="/admin/professionals">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader className="text-center">
                <User className="h-8 w-8 mx-auto text-primary mb-2" />
                <CardTitle>Profissionais</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground text-center">
                  Gerencie prestadores
                </p>
              </CardContent>
            </Card>
          </Link>

          <Link to="/admin/categories">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader className="text-center">
                <Plus className="h-8 w-8 mx-auto text-success mb-2" />
                <CardTitle>Categorias</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground text-center">
                  Gerencie categorias
                </p>
              </CardContent>
            </Card>
          </Link>

          <Link to="/admin/services">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader className="text-center">
                <Check className="h-8 w-8 mx-auto text-info mb-2" />
                <CardTitle>Serviços</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground text-center">
                  Gerencie serviços
                </p>
              </CardContent>
            </Card>
          </Link>
        </div>

        {/* Features Section */}
        <div className="bg-card rounded-lg p-8">
          <h3 className="text-2xl font-bold text-center mb-8">Funcionalidades do Painel</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-lg font-semibold mb-2">CRUD Completo</h4>
              <p className="text-muted-foreground">
                Crie, visualize, edite e exclua profissionais, categorias e serviços com facilidade.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-2">Ativação/Desativação</h4>
              <p className="text-muted-foreground">
                Controle total sobre o status de todos os elementos da plataforma.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-2">Vinculação</h4>
              <p className="text-muted-foreground">
                Associe categorias e serviços aos profissionais de forma intuitiva.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-2">Dashboard</h4>
              <p className="text-muted-foreground">
                Visualize estatísticas e métricas importantes do sistema.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
