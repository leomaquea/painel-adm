import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Settings } from "lucide-react";

// Mock data - em produção viria de uma API
const mockServices = [
  {
    id: 1,
    name: "Limpeza Residencial Completa",
    description: "Limpeza completa de residências incluindo todos os cômodos",
    category: "Limpeza",
    basePrice: 120,
    status: "active",
    professionalCount: 25
  },
  {
    id: 2,
    name: "Instalação Elétrica",
    description: "Instalação de tomadas, interruptores e pontos de luz",
    category: "Elétrica", 
    basePrice: 150,
    status: "active",
    professionalCount: 18
  },
  {
    id: 3,
    name: "Desentupimento de Pias",
    description: "Desentupimento profissional de pias e ralos",
    category: "Encanamento",
    basePrice: 80,
    status: "active",
    professionalCount: 15
  },
  {
    id: 4,
    name: "Poda de Plantas",
    description: "Poda especializada de plantas e árvores",
    category: "Jardinagem",
    basePrice: 90,
    status: "active",
    professionalCount: 12
  },
  {
    id: 5,
    name: "Pintura de Paredes",
    description: "Pintura profissional de paredes internas e externas",
    category: "Pintura",
    basePrice: 200,
    status: "inactive",
    professionalCount: 8
  },
  {
    id: 6,
    name: "Limpeza Pós-Obra",
    description: "Limpeza especializada após obras e reformas",
    category: "Limpeza",
    basePrice: 180,
    status: "active",
    professionalCount: 10
  }
];

const categories = ["Todos", "Limpeza", "Elétrica", "Encanamento", "Jardinagem", "Pintura"];

export default function AdminServices() {
  const [services, setServices] = useState(mockServices);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Todos");

  const filteredServices = services.filter(service => {
    const matchesSearch = service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         service.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "Todos" || service.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const toggleStatus = (id: number) => {
    setServices(prev =>
      prev.map(service =>
        service.id === id
          ? { ...service, status: service.status === "active" ? "inactive" : "active" }
          : service
      )
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Serviços</h1>
          <p className="text-muted-foreground">Gerencie os serviços oferecidos na plataforma</p>
        </div>
        <Button className="bg-admin hover:bg-admin-hover text-admin-foreground">
          <Plus className="h-4 w-4 mr-2" />
          Adicionar Serviço
        </Button>
      </div>

      <div className="flex items-center space-x-4">
        <Input
          placeholder="Buscar serviços..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Filtrar por categoria" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((category) => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-4">
        {filteredServices.map((service) => (
          <Card key={service.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-lg">{service.name}</CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">
                    {service.description}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant={service.status === "active" ? "default" : "secondary"}>
                    {service.status === "active" ? "Ativo" : "Inativo"}
                  </Badge>
                  <Button variant="outline" size="sm">
                    <Settings className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <h4 className="font-medium text-sm text-muted-foreground mb-1">Categoria</h4>
                  <Badge variant="outline">{service.category}</Badge>
                </div>
                
                <div>
                  <h4 className="font-medium text-sm text-muted-foreground mb-1">Preço Base</h4>
                  <span className="text-lg font-semibold text-foreground">
                    R$ {service.basePrice}
                  </span>
                </div>

                <div>
                  <h4 className="font-medium text-sm text-muted-foreground mb-1">Profissionais</h4>
                  <span className="text-lg font-semibold text-foreground">
                    {service.professionalCount}
                  </span>
                </div>

                <div>
                  <h4 className="font-medium text-sm text-muted-foreground mb-1">Status</h4>
                  <Badge variant={service.status === "active" ? "default" : "secondary"}>
                    {service.status === "active" ? "Disponível" : "Indisponível"}
                  </Badge>
                </div>
              </div>

              <div className="flex justify-end space-x-2 mt-4 pt-4 border-t">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => toggleStatus(service.id)}
                >
                  {service.status === "active" ? "Desativar" : "Ativar"}
                </Button>
                <Button variant="outline" size="sm">
                  Editar
                </Button>
                <Button variant="outline" size="sm">
                  Ver Profissionais
                </Button>
                <Button variant="outline" size="sm">
                  Histórico
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}