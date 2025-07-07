import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground">Visão geral do sistema ServiConnect</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Profissionais</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">156</div>
            <p className="text-xs text-success">+12% em relação ao mês passado</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Categorias Ativas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">8</div>
            <p className="text-xs text-muted-foreground">+2 novas categorias</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Serviços Cadastrados</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">324</div>
            <p className="text-xs text-success">+8% este mês</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Serviços Solicitados</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">2,847</div>
            <p className="text-xs text-success">+23% este mês</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Atividade Recente</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Novo profissional cadastrado</p>
                  <p className="text-sm text-muted-foreground">João Silva - Eletricista</p>
                </div>
                <span className="text-sm text-muted-foreground">2 min atrás</span>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Categoria atualizada</p>
                  <p className="text-sm text-muted-foreground">Encanamento - Novos serviços adicionados</p>
                </div>
                <span className="text-sm text-muted-foreground">15 min atrás</span>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Serviço aprovado</p>
                  <p className="text-sm text-muted-foreground">Instalação de torneiras - Maria Santos</p>
                </div>
                <span className="text-sm text-muted-foreground">1 hora atrás</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Estatísticas Rápidas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm">
                  <span>Profissionais Ativos</span>
                  <span>87%</span>
                </div>
                <div className="w-full bg-secondary rounded-full h-2 mt-1">
                  <div className="bg-success h-2 rounded-full" style={{ width: '87%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm">
                  <span>Categorias Populares</span>
                  <span>65%</span>
                </div>
                <div className="w-full bg-secondary rounded-full h-2 mt-1">
                  <div className="bg-primary h-2 rounded-full" style={{ width: '65%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm">
                  <span>Satisfação dos Clientes</span>
                  <span>94%</span>
                </div>
                <div className="w-full bg-secondary rounded-full h-2 mt-1">
                  <div className="bg-success h-2 rounded-full" style={{ width: '94%' }}></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}