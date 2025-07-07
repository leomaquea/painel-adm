import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Plus, Settings, User } from "lucide-react";

// Mock data - em produção viria de uma API
const mockProfessionals = [
  {
    id: 1,
    name: "Maria Silva",
    email: "maria@email.com",
    phone: "(11) 99999-9999",
    categories: ["Limpeza", "Jardinagem"],
    services: ["Limpeza Residencial", "Limpeza Pós-Obra", "Poda de Plantas"],
    status: "active",
    rating: 4.8,
    completedJobs: 156
  },
  {
    id: 2,
    name: "João Santos",
    email: "joao@email.com", 
    phone: "(11) 88888-8888",
    categories: ["Elétrica", "Reparos"],
    services: ["Instalação Elétrica", "Reparo de Tomadas", "Troca de Lâmpadas"],
    status: "active",
    rating: 4.7,
    completedJobs: 203
  },
  {
    id: 3,
    name: "Carlos Oliveira",
    email: "carlos@email.com",
    phone: "(11) 77777-7777", 
    categories: ["Encanamento"],
    services: ["Desentupimento", "Instalação de Torneiras", "Reparo de Vazamentos"],
    status: "inactive",
    rating: 4.5,
    completedJobs: 89
  }
];

export default function AdminProfessionals() {
  const [professionals, setProfessionals] = useState(mockProfessionals);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredProfessionals = professionals.filter(prof =>
    prof.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    prof.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleStatus = (id: number) => {
    setProfessionals(prev =>
      prev.map(prof =>
        prof.id === id
          ? { ...prof, status: prof.status === "active" ? "inactive" : "active" }
          : prof
      )
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Profissionais</h1>
          <p className="text-muted-foreground">Gerencie os prestadores de serviços cadastrados</p>
        </div>
        <Button className="bg-admin hover:bg-admin-hover text-admin-foreground">
          <Plus className="h-4 w-4 mr-2" />
          Adicionar Profissional
        </Button>
      </div>

      <div className="flex items-center space-x-4">
        <Input
          placeholder="Buscar profissionais..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
      </div>

      <div className="grid gap-4">
        {filteredProfessionals.map((professional) => (
          <Card key={professional.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center">
                    <User className="h-5 w-5 text-primary-foreground" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{professional.name}</CardTitle>
                    <p className="text-sm text-muted-foreground">{professional.email}</p>
                    <p className="text-sm text-muted-foreground">{professional.phone}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant={professional.status === "active" ? "default" : "secondary"}>
                    {professional.status === "active" ? "Ativo" : "Inativo"}
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
                  <h4 className="font-medium text-sm text-muted-foreground mb-2">Categorias</h4>
                  <div className="flex flex-wrap gap-1">
                    {professional.categories.map((category) => (
                      <Badge key={category} variant="outline" className="text-xs">
                        {category}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium text-sm text-muted-foreground mb-2">Serviços</h4>
                  <div className="space-y-1">
                    {professional.services.slice(0, 2).map((service) => (
                      <p key={service} className="text-xs text-foreground">{service}</p>
                    ))}
                    {professional.services.length > 2 && (
                      <p className="text-xs text-muted-foreground">
                        +{professional.services.length - 2} mais
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-sm text-muted-foreground mb-2">Avaliação</h4>
                  <div className="flex items-center space-x-1">
                    <span className="text-lg font-semibold text-foreground">{professional.rating}</span>
                    <span className="text-sm text-muted-foreground">/ 5.0</span>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-sm text-muted-foreground mb-2">Trabalhos</h4>
                  <span className="text-lg font-semibold text-foreground">
                    {professional.completedJobs}
                  </span>
                </div>
              </div>

              <div className="flex justify-end space-x-2 mt-4 pt-4 border-t">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => toggleStatus(professional.id)}
                >
                  {professional.status === "active" ? "Desativar" : "Ativar"}
                </Button>
                <Button variant="outline" size="sm">
                  Editar
                </Button>
                <Button variant="outline" size="sm">
                  Ver Detalhes
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}