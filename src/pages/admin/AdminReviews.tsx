import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Star, Check, X, Clock, User } from "lucide-react";

const mockReviews = [
  {
    id: 1,
    clientName: "Maria Silva",
    professionalName: "João Santos - Eletricista",
    service: "Instalação Elétrica",
    ratings: {
      pontualidade: 5,
      primeiraResposta: 4,
      qualidade: 5,
      comunicacao: 4
    },
    comment: "Excelente profissional, muito pontual e trabalho de qualidade!",
    status: "pending",
    createdAt: "2024-01-20T14:30:00",
    reviewedBy: null
  },
  {
    id: 2,
    clientName: "Carlos Oliveira",
    professionalName: "Ana Costa - Limpeza",
    service: "Limpeza Residencial",
    ratings: {
      pontualidade: 5,
      primeiraResposta: 5,
      qualidade: 4,
      comunicacao: 5
    },
    comment: "Serviço impecável, super recomendo!",
    status: "approved",
    createdAt: "2024-01-19T10:15:00",
    reviewedBy: "Admin System"
  },
  {
    id: 3,
    clientName: "Fernanda Lima",
    professionalName: "Roberto Silva - Encanamento",
    service: "Desentupimento",
    ratings: {
      pontualidade: 2,
      primeiraResposta: 2,
      qualidade: 3,
      comunicacao: 1
    },
    comment: "Atrasou muito e não resolveu o problema completamente.",
    status: "rejected",
    createdAt: "2024-01-18T16:45:00",
    reviewedBy: "Ana Costa (Representante)"
  }
];

const statusOptions = ["Todas", "pending", "approved", "rejected"];

export default function AdminReviews() {
  const [reviews, setReviews] = useState(mockReviews);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("Todas");

  const filteredReviews = reviews.filter(review => {
    const matchesSearch = 
      review.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.professionalName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.service.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "Todas" || review.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    const variants = {
      pending: { variant: "outline" as const, text: "Pendente", icon: Clock },
      approved: { variant: "default" as const, text: "Aprovada", icon: Check },
      rejected: { variant: "secondary" as const, text: "Rejeitada", icon: X }
    };
    return variants[status as keyof typeof variants] || variants.pending;
  };

  const approveReview = (id: number) => {
    setReviews(prev =>
      prev.map(review =>
        review.id === id
          ? { ...review, status: "approved", reviewedBy: "Admin System" }
          : review
      )
    );
  };

  const rejectReview = (id: number) => {
    setReviews(prev =>
      prev.map(review =>
        review.id === id
          ? { ...review, status: "rejected", reviewedBy: "Admin System" }
          : review
      )
    );
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${i < rating ? 'fill-warning text-warning' : 'text-muted-foreground'}`}
      />
    ));
  };

  const getAverageRating = (ratings: typeof mockReviews[0]['ratings']) => {
    const values = Object.values(ratings);
    return (values.reduce((a, b) => a + b, 0) / values.length).toFixed(1);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Avaliações</h1>
          <p className="text-muted-foreground">Gerencie e aprove avaliações de clientes sobre profissionais</p>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <Input
          placeholder="Buscar avaliações..."
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
                {status === "Todas" ? "Todas" : 
                 status === "pending" ? "Pendente" : 
                 status === "approved" ? "Aprovada" : "Rejeitada"}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-4">
        {filteredReviews.map((review) => {
          const statusBadge = getStatusBadge(review.status);
          const StatusIcon = statusBadge.icon;
          
          return (
            <Card key={review.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg">{review.professionalName}</CardTitle>
                    <p className="text-sm text-muted-foreground">
                      Serviço: {review.service}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Cliente: {review.clientName}
                    </p>
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
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    <div>
                      <h4 className="font-medium text-sm text-muted-foreground mb-1">Pontualidade</h4>
                      <div className="flex items-center space-x-1">
                        {renderStars(review.ratings.pontualidade)}
                        <span className="text-sm ml-2">{review.ratings.pontualidade}/5</span>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-sm text-muted-foreground mb-1">Primeira Resposta</h4>
                      <div className="flex items-center space-x-1">
                        {renderStars(review.ratings.primeiraResposta)}
                        <span className="text-sm ml-2">{review.ratings.primeiraResposta}/5</span>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium text-sm text-muted-foreground mb-1">Qualidade</h4>
                      <div className="flex items-center space-x-1">
                        {renderStars(review.ratings.qualidade)}
                        <span className="text-sm ml-2">{review.ratings.qualidade}/5</span>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium text-sm text-muted-foreground mb-1">Comunicação</h4>
                      <div className="flex items-center space-x-1">
                        {renderStars(review.ratings.comunicacao)}
                        <span className="text-sm ml-2">{review.ratings.comunicacao}/5</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-sm text-muted-foreground mb-2">Média Geral</h4>
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl font-bold text-foreground">
                        {getAverageRating(review.ratings)}
                      </span>
                      <div className="flex">
                        {renderStars(Math.round(parseFloat(getAverageRating(review.ratings))))}
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-sm text-muted-foreground mb-2">Comentário</h4>
                    <p className="text-sm text-foreground bg-muted p-3 rounded-md">
                      "{review.comment}"
                    </p>
                  </div>

                  <div className="text-xs text-muted-foreground">
                    Enviada em {new Date(review.createdAt).toLocaleString('pt-BR')}
                    {review.reviewedBy && (
                      <span> • Revisada por {review.reviewedBy}</span>
                    )}
                  </div>
                </div>

                {review.status === "pending" && (
                  <div className="flex justify-end space-x-2 mt-4 pt-4 border-t">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => rejectReview(review.id)}
                    >
                      <X className="h-4 w-4 mr-1" />
                      Rejeitar
                    </Button>
                    <Button
                      variant="default"
                      size="sm"
                      onClick={() => approveReview(review.id)}
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