import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Plus, Settings, User, QrCode } from "lucide-react";

const mockRepresentatives = [
  {
    id: 1,
    name: "Ana Costa",
    email: "ana@serviconnect.com",
    phone: "(11) 99999-0001",
    region: "São Paulo - SP",
    status: "active",
    codesGenerated: 45,
    professionalsReferred: 38,
    joinDate: "2024-01-15"
  },
  {
    id: 2,
    name: "Roberto Silva",
    email: "roberto@serviconnect.com", 
    phone: "(11) 99999-0002",
    region: "Rio de Janeiro - RJ",
    status: "active",
    codesGenerated: 32,
    professionalsReferred: 28,
    joinDate: "2024-02-10"
  },
  {
    id: 3,
    name: "Marina Santos",
    email: "marina@serviconnect.com",
    phone: "(11) 99999-0003",
    region: "Belo Horizonte - MG",
    status: "inactive",
    codesGenerated: 18,
    professionalsReferred: 15,
    joinDate: "2024-03-05"
  }
];

export default function AdminRepresentatives() {
  const [representatives, setRepresentatives] = useState(mockRepresentatives);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredRepresentatives = representatives.filter(rep =>
    rep.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    rep.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    rep.region.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleStatus = (id: number) => {
    setRepresentatives(prev =>
      prev.map(rep =>
        rep.id === id
          ? { ...rep, status: rep.status === "active" ? "inactive" : "active" }
          : rep
      )
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Representantes</h1>
          <p className="text-muted-foreground">Gerencie os representantes autorizados a gerar códigos de indicação</p>
        </div>
        <Button className="bg-admin hover:bg-admin-hover text-admin-foreground">
          <Plus className="h-4 w-4 mr-2" />
          Adicionar Representante
        </Button>
      </div>

      <div className="flex items-center space-x-4">
        <Input
          placeholder="Buscar representantes..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
      </div>

      <div className="grid gap-4">
        {filteredRepresentatives.map((representative) => (
          <Card key={representative.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <div className="h-10 w-10 rounded-full bg-admin flex items-center justify-center">
                    <User className="h-5 w-5 text-admin-foreground" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{representative.name}</CardTitle>
                    <p className="text-sm text-muted-foreground">{representative.email}</p>
                    <p className="text-sm text-muted-foreground">{representative.phone}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant={representative.status === "active" ? "default" : "secondary"}>
                    {representative.status === "active" ? "Ativo" : "Inativo"}
                  </Badge>
                  <Button variant="outline" size="sm">
                    <Settings className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <h4 className="font-medium text-sm text-muted-foreground mb-2">Região</h4>
                  <p className="text-sm text-foreground">{representative.region}</p>
                </div>
                
                <div>
                  <h4 className="font-medium text-sm text-muted-foreground mb-2">Códigos Gerados</h4>
                  <div className="flex items-center space-x-1">
                    <QrCode className="h-4 w-4 text-primary" />
                    <span className="text-lg font-semibold text-foreground">{representative.codesGenerated}</span>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-sm text-muted-foreground mb-2">Profissionais Indicados</h4>
                  <span className="text-lg font-semibold text-success">
                    {representative.professionalsReferred}
                  </span>
                </div>

                <div>
                  <h4 className="font-medium text-sm text-muted-foreground mb-2">Data de Ingresso</h4>
                  <span className="text-sm text-foreground">
                    {new Date(representative.joinDate).toLocaleDateString('pt-BR')}
                  </span>
                </div>
              </div>

              <div className="flex justify-end space-x-2 mt-4 pt-4 border-t">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => toggleStatus(representative.id)}
                >
                  {representative.status === "active" ? "Desativar" : "Ativar"}
                </Button>
                <Button variant="outline" size="sm">
                  <QrCode className="h-4 w-4 mr-1" />
                  Gerar Código
                </Button>
                <Button variant="outline" size="sm">
                  Editar
                </Button>
                <Button variant="outline" size="sm">
                  Ver Indicados
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}