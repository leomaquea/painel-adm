import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Copy, Clock, Check, X } from "lucide-react";

const mockReferralCodes = [
  {
    id: 1,
    code: "REF-2024-001",
    generatedBy: "Ana Costa",
    representativeId: 1,
    status: "active",
    createdAt: "2024-01-20T14:30:00",
    expiresAt: "2024-01-21T14:30:00",
    usedBy: null,
    usedAt: null
  },
  {
    id: 2,
    code: "REF-2024-002",
    generatedBy: "Roberto Silva",
    representativeId: 2,
    status: "used",
    createdAt: "2024-01-19T10:15:00",
    expiresAt: "2024-01-20T10:15:00",
    usedBy: "João Santos - Eletricista",
    usedAt: "2024-01-19T15:22:00"
  },
  {
    id: 3,
    code: "REF-2024-003",
    generatedBy: "Ana Costa",
    representativeId: 1,
    status: "expired",
    createdAt: "2024-01-18T09:00:00",
    expiresAt: "2024-01-19T09:00:00",
    usedBy: null,
    usedAt: null
  },
  {
    id: 4,
    code: "REF-2024-004",
    generatedBy: "Marina Santos",
    representativeId: 3,
    status: "active",
    createdAt: "2024-01-20T16:45:00",
    expiresAt: "2024-01-21T16:45:00",
    usedBy: null,
    usedAt: null
  }
];

const statusOptions = ["Todos", "active", "used", "expired"];

export default function AdminReferralCodes() {
  const [codes, setCodes] = useState(mockReferralCodes);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("Todos");

  const filteredCodes = codes.filter(code => {
    const matchesSearch = code.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         code.generatedBy.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (code.usedBy && code.usedBy.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesStatus = statusFilter === "Todos" || code.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    const variants = {
      active: { variant: "default" as const, text: "Ativo" },
      used: { variant: "secondary" as const, text: "Usado" },
      expired: { variant: "outline" as const, text: "Expirado" }
    };
    return variants[status as keyof typeof variants] || variants.active;
  };

  const copyToClipboard = (code: string) => {
    navigator.clipboard.writeText(code);
    // Toast notification would go here
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('pt-BR');
  };

  const getTimeRemaining = (expiresAt: string) => {
    const now = new Date();
    const expiration = new Date(expiresAt);
    const diff = expiration.getTime() - now.getTime();
    
    if (diff <= 0) return "Expirado";
    
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
    return `${hours}h ${minutes}m`;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Códigos de Indicação</h1>
          <p className="text-muted-foreground">Gerencie os códigos de indicação para cadastro de profissionais</p>
        </div>
        <Button className="bg-admin hover:bg-admin-hover text-admin-foreground">
          <Plus className="h-4 w-4 mr-2" />
          Gerar Novo Código
        </Button>
      </div>

      <div className="flex items-center space-x-4">
        <Input
          placeholder="Buscar códigos..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Filtrar por status" />
          </SelectTrigger>
          <SelectContent>
            {statusOptions.map((status) => (
              <SelectItem key={status} value={status}>
                {status === "Todos" ? "Todos" : status === "active" ? "Ativo" : status === "used" ? "Usado" : "Expirado"}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-4">
        {filteredCodes.map((code) => {
          const statusBadge = getStatusBadge(code.status);
          return (
            <Card key={code.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <span className="font-mono">{code.code}</span>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => copyToClipboard(code.code)}
                        className="h-6 w-6 p-0"
                      >
                        <Copy className="h-3 w-3" />
                      </Button>
                    </CardTitle>
                    <p className="text-sm text-muted-foreground">
                      Gerado por: {code.generatedBy}
                    </p>
                  </div>
                  <Badge variant={statusBadge.variant}>
                    {statusBadge.text}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div>
                    <h4 className="font-medium text-sm text-muted-foreground mb-1">Criado em</h4>
                    <p className="text-sm text-foreground">{formatDate(code.createdAt)}</p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-sm text-muted-foreground mb-1">Expira em</h4>
                    <p className="text-sm text-foreground">{formatDate(code.expiresAt)}</p>
                  </div>

                  <div>
                    <h4 className="font-medium text-sm text-muted-foreground mb-1">Tempo Restante</h4>
                    <div className="flex items-center space-x-1">
                      <Clock className="h-4 w-4 text-warning" />
                      <span className="text-sm font-medium text-foreground">
                        {getTimeRemaining(code.expiresAt)}
                      </span>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-sm text-muted-foreground mb-1">Usado por</h4>
                    <p className="text-sm text-foreground">
                      {code.usedBy || "Não utilizado"}
                    </p>
                    {code.usedAt && (
                      <p className="text-xs text-muted-foreground">
                        em {formatDate(code.usedAt)}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex justify-end space-x-2 mt-4 pt-4 border-t">
                  <Button variant="outline" size="sm">
                    Ver Detalhes
                  </Button>
                  {code.status === "active" && (
                    <Button variant="outline" size="sm">
                      <X className="h-4 w-4 mr-1" />
                      Expirar
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}