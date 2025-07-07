import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Plus, Settings } from "lucide-react";

// Mock data - em produção viria de uma API
const mockCategories = [
  {
    id: 1,
    name: "Limpeza",
    description: "Serviços de limpeza residencial e comercial",
    emoji: "🧹",
    status: "active",
    serviceCount: 12,
    professionalCount: 45
  },
  {
    id: 2,
    name: "Elétrica",
    description: "Instalações e reparos elétricos",
    emoji: "⚡",
    status: "active",
    serviceCount: 8,
    professionalCount: 32
  },
  {
    id: 3,
    name: "Encanamento",
    description: "Serviços hidráulicos e encanamento",
    emoji: "🚿",
    status: "active",
    serviceCount: 10,
    professionalCount: 28
  },
  {
    id: 4,
    name: "Jardinagem",
    description: "Cuidado de jardins e plantas",
    emoji: "🌱",
    status: "active",
    serviceCount: 6,
    professionalCount: 18
  },
  {
    id: 5,
    name: "Pintura",
    description: "Pintura residencial e comercial",
    emoji: "🎨",
    status: "inactive",
    serviceCount: 4,
    professionalCount: 12
  }
];

export default function AdminCategories() {
  const [categories, setCategories] = useState(mockCategories);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    category.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleStatus = (id: number) => {
    setCategories(prev =>
      prev.map(category =>
        category.id === id
          ? { ...category, status: category.status === "active" ? "inactive" : "active" }
          : category
      )
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Categorias</h1>
          <p className="text-muted-foreground">Gerencie as categorias de serviços</p>
        </div>
        <Button className="bg-admin hover:bg-admin-hover text-admin-foreground">
          <Plus className="h-4 w-4 mr-2" />
          Adicionar Categoria
        </Button>
      </div>

      <div className="flex items-center space-x-4">
        <Input
          placeholder="Buscar categorias..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCategories.map((category) => (
          <Card key={category.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <div className="text-3xl">{category.emoji}</div>
                  <div>
                    <CardTitle className="text-lg">{category.name}</CardTitle>
                    <p className="text-sm text-muted-foreground mt-1">
                      {category.description}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant={category.status === "active" ? "default" : "secondary"}>
                    {category.status === "active" ? "Ativa" : "Inativa"}
                  </Badge>
                  <Button variant="outline" size="sm">
                    <Settings className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-foreground">
                    {category.serviceCount}
                  </div>
                  <p className="text-sm text-muted-foreground">Serviços</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-foreground">
                    {category.professionalCount}
                  </div>
                  <p className="text-sm text-muted-foreground">Profissionais</p>
                </div>
              </div>

              <div className="flex justify-end space-x-2 pt-4 border-t">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => toggleStatus(category.id)}
                >
                  {category.status === "active" ? "Desativar" : "Ativar"}
                </Button>
                <Button variant="outline" size="sm">
                  Editar
                </Button>
                <Button variant="outline" size="sm">
                  Ver Serviços
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}