import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Check, X, Clock, Play, User, FileText } from "lucide-react";

const mockApprovals = [
  {
    id: 1,
    applicantName: "Pedro Almeida",
    email: "pedro@email.com",
    phone: "(11) 99999-1111",
    category: "Elétrica",
    services: ["Instalação Elétrica", "Reparo de Tomadas"],
    status: "pending",
    submittedAt: "2024-01-20T14:30:00",
    videoUrl: "/video-pedro.mp4",
    formData: {
      experience: "5 anos",
      certifications: "NR-10, Técnico em Elétrica",
      portfolio: "Link para portfolio"
    }
  },
  {
    id: 2,
    applicantName: "Lucia Santos",
    email: "lucia@email.com",
    phone: "(11) 99999-2222",
    category: "Limpeza",
    services: ["Limpeza Residencial", "Limpeza Pós-Obra"],
    status: "approved",
    submittedAt: "2024-01-19T10:15:00",
    videoUrl: "/video-lucia.mp4",
    formData: {
      experience: "3 anos",
      certifications: "Curso de limpeza profissional",
      portfolio: "Fotos de trabalhos anteriores"
    },
    reviewedBy: "Ana Costa (Representante)"
  },
  {
    id: 3,
    applicantName: "Marcos Oliveira",
    email: "marcos@email.com",
    phone: "(11) 99999-3333",
    category: "Encanamento",
    services: ["Desentupimento", "Instalação de Torneiras"],
    status: "rejected",
    submittedAt: "2024-01-18T16:45:00",
    videoUrl: "/video-marcos.mp4",
    formData: {
      experience: "1 ano",
      certifications: "Nenhuma",
      portfolio: "Não informado"
    },
    reviewedBy: "Roberto Silva (Representante)",
    rejectionReason: "Experiência insuficiente e falta de certificações"
  }
];

const statusOptions = ["Todos", "pending", "approved", "rejected"];

export default function AdminApprovals() {
  const [approvals, setApprovals] = useState(mockApprovals);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("Todos");

  const filteredApprovals = approvals.filter(approval => {
    const matchesSearch = 
      approval.applicantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      approval.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      approval.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "Todos" || approval.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    const variants = {
      pending: { variant: "outline" as const, text: "Pendente", icon: Clock },
      approved: { variant: "default" as const, text: "Aprovado", icon: Check },
      rejected: { variant: "secondary" as const, text: "Rejeitado", icon: X }
    };
    return variants[status as keyof typeof variants] || variants.pending;
  };

  const approveApplication = (id: number) => {
    setApprovals(prev =>
      prev.map(approval =>
        approval.id === id
          ? { ...approval, status: "approved", reviewedBy: "Admin System" }
          : approval
      )
    );
  };

  const rejectApplication = (id: number) => {
    const reason = prompt("Motivo da rejeição:");
    if (reason) {
      setApprovals(prev =>
        prev.map(approval =>
          approval.id === id
            ? { 
                ...approval, 
                status: "rejected", 
                reviewedBy: "Admin System",
                rejectionReason: reason 
              }
            : approval
        )
      );
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Aprovações</h1>
          <p className="text-muted-foreground">Gerencie solicitações de cadastro de profissionais sem código de indicação</p>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <Input
          placeholder="Buscar solicitações..."
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
                {status === "Todos" ? "Todos" : 
                 status === "pending" ? "Pendente" : 
                 status === "approved" ? "Aprovado" : "Rejeitado"}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-4">
        {filteredApprovals.map((approval) => {
          const statusBadge = getStatusBadge(approval.status);
          const StatusIcon = statusBadge.icon;
          
          return (
            <Card key={approval.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center">
                      <User className="h-5 w-5 text-primary-foreground" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{approval.applicantName}</CardTitle>
                      <p className="text-sm text-muted-foreground">{approval.email}</p>
                      <p className="text-sm text-muted-foreground">{approval.phone}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant={statusBadge.variant} className="flex items-center gap-1">
                      <StatusIcon className="h-3 w-3" />
                      {statusBadge.text}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-medium text-sm text-muted-foreground mb-2">Categoria</h4>
                      <Badge variant="outline">{approval.category}</Badge>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-sm text-muted-foreground mb-2">Experiência</h4>
                      <p className="text-sm text-foreground">{approval.formData.experience}</p>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-sm text-muted-foreground mb-2">Serviços Oferecidos</h4>
                    <div className="flex flex-wrap gap-1">
                      {approval.services.map((service) => (
                        <Badge key={service} variant="outline" className="text-xs">
                          {service}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-sm text-muted-foreground mb-2">Certificações</h4>
                    <p className="text-sm text-foreground">{approval.formData.certifications}</p>
                  </div>

                  <div>
                    <h4 className="font-medium text-sm text-muted-foreground mb-2">Portfolio</h4>
                    <p className="text-sm text-foreground">{approval.formData.portfolio}</p>
                  </div>

                  <div className="flex items-center space-x-4 p-3 bg-muted rounded-md">
                    <Play className="h-5 w-5 text-primary" />
                    <span className="text-sm font-medium">Vídeo de Apresentação (5min)</span>
                    <Button variant="outline" size="sm">
                      Assistir Vídeo
                    </Button>
                  </div>

                  {approval.rejectionReason && (
                    <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-md">
                      <h4 className="font-medium text-sm text-destructive mb-1">Motivo da Rejeição</h4>
                      <p className="text-sm text-destructive">{approval.rejectionReason}</p>
                    </div>
                  )}

                  <div className="text-xs text-muted-foreground">
                    Enviado em {new Date(approval.submittedAt).toLocaleString('pt-BR')}
                    {approval.reviewedBy && (
                      <span> • Revisado por {approval.reviewedBy}</span>
                    )}
                  </div>
                </div>

                {approval.status === "pending" && (
                  <div className="flex justify-end space-x-2 mt-4 pt-4 border-t">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => rejectApplication(approval.id)}
                    >
                      <X className="h-4 w-4 mr-1" />
                      Rejeitar
                    </Button>
                    <Button
                      variant="default"
                      size="sm"
                      onClick={() => approveApplication(approval.id)}
                      className="bg-success hover:bg-success/90 text-success-foreground"
                    >
                      <Check className="h-4 w-4 mr-1" />
                      Aprovar
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}