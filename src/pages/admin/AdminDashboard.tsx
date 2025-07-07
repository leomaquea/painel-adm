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
            <CardTitle className="text-sm font-medium">Profissionais Ativos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">156</div>
            <p className="text-xs text-success">+12% em relação ao mês passado</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Representantes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">23</div>
            <p className="text-xs text-success">+3 novos representantes</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Códigos Gerados (24h)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">18</div>
            <p className="text-xs text-warning">7 ainda ativos</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Clicks de Contato</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">1,247</div>
            <p className="text-xs text-success">+23% este mês</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Pendências</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">Avaliações para aprovar</span>
                <span className="text-lg font-bold text-warning">5</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Solicitações de cadastro</span>
                <span className="text-lg font-bold text-info">3</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Códigos expirando hoje</span>
                <span className="text-lg font-bold text-destructive">2</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Top Representantes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">Ana Costa</span>
                <span className="text-sm font-medium">45 indicações</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Roberto Silva</span>
                <span className="text-sm font-medium">32 indicações</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Marina Santos</span>
                <span className="text-sm font-medium">18 indicações</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Categorias Populares</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Limpeza</span>
                  <span>45 profissionais</span>
                </div>
                <div className="w-full bg-secondary rounded-full h-2">
                  <div className="bg-success h-2 rounded-full" style={{ width: '90%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Elétrica</span>
                  <span>32 profissionais</span>
                </div>
                <div className="w-full bg-secondary rounded-full h-2">
                  <div className="bg-primary h-2 rounded-full" style={{ width: '65%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Encanamento</span>
                  <span>28 profissionais</span>
                </div>
                <div className="w-full bg-secondary rounded-full h-2">
                  <div className="bg-info h-2 rounded-full" style={{ width: '55%' }}></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Atividade Recente</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Código de indicação usado</p>
                <p className="text-sm text-muted-foreground">REF-2024-001 - Pedro Almeida (Eletricista)</p>
              </div>
              <span className="text-sm text-muted-foreground">5 min atrás</span>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Avaliação aprovada</p>
                <p className="text-sm text-muted-foreground">João Santos - 4.8 estrelas</p>
              </div>
              <span className="text-sm text-muted-foreground">15 min atrás</span>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Novo representante</p>
                <p className="text-sm text-muted-foreground">Marina Santos - Belo Horizonte</p>
              </div>
              <span className="text-sm text-muted-foreground">1 hora atrás</span>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Solicitação de cadastro</p>
                <p className="text-sm text-muted-foreground">Lucia Santos - Limpeza (pendente)</p>
              </div>
              <span className="text-sm text-muted-foreground">2 horas atrás</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}