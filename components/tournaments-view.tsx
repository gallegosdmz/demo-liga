"use client"

import { useState } from "react"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { mockTournaments, mockTeams, mockUsers, type Tournament } from "@/lib/mock-data"
import { Trophy, Plus, Calendar, Users, MapPin, Clock, Eye, Edit, Trash2 } from "lucide-react"
import { CreateTournamentModal } from "@/components/create-tournament-modal"

export function TournamentsView() {
  const { user } = useAuth()
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [selectedTournament, setSelectedTournament] = useState<Tournament | null>(null)

  const getStatusColor = (status: Tournament["status"]) => {
    switch (status) {
      case "upcoming":
        return "bg-blue-100 text-blue-800 border-blue-300"
      case "active":
        return "bg-green-100 text-green-800 border-green-300"
      case "completed":
        return "bg-gray-100 text-gray-800 border-gray-300"
      default:
        return "bg-gray-100 text-gray-800 border-gray-300"
    }
  }

  const getStatusText = (status: Tournament["status"]) => {
    switch (status) {
      case "upcoming":
        return "Próximo"
      case "active":
        return "Activo"
      case "completed":
        return "Finalizado"
      default:
        return "Desconocido"
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("es-ES", {
      day: "numeric",
      month: "short",
      year: "numeric",
    })
  }

  const canCreateTournament = user?.type === "owner"
  const canManageTournament = (tournament: Tournament) => {
    return user?.type === "owner" && tournament.ownerId === user.id
  }

  if (selectedTournament) {
    return (
      <TournamentDetailView
        tournament={selectedTournament}
        onBack={() => setSelectedTournament(null)}
        canManage={canManageTournament(selectedTournament)}
      />
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Torneos</h1>
          <p className="text-muted-foreground">Gestiona y participa en torneos deportivos</p>
        </div>
        {canCreateTournament && (
          <Button onClick={() => setShowCreateModal(true)} className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Crear Torneo
          </Button>
        )}
      </div>

      {/* Tournament Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockTournaments.map((tournament) => (
          <Card key={tournament.id} className="hover:shadow-lg transition-shadow cursor-pointer group">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <Trophy className="h-8 w-8 text-primary flex-shrink-0" />
                <Badge className={getStatusColor(tournament.status)}>{getStatusText(tournament.status)}</Badge>
              </div>
              <CardTitle className="text-lg group-hover:text-primary transition-colors">{tournament.name}</CardTitle>
              <CardDescription className="text-sm">{tournament.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="h-4 w-4" />
                <span>
                  {formatDate(tournament.startDate)} - {formatDate(tournament.endDate)}
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Users className="h-4 w-4" />
                <span>
                  {tournament.teams.length}/{tournament.maxTeams} equipos
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span>{tournament.category}</span>
              </div>

              <div className="flex gap-2 pt-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSelectedTournament(tournament)}
                  className="flex-1"
                >
                  <Eye className="h-4 w-4 mr-1" />
                  Ver Detalles
                </Button>
                {canManageTournament(tournament) && (
                  <Button variant="outline" size="sm">
                    <Edit className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {mockTournaments.length === 0 && (
        <div className="text-center py-12">
          <Trophy className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-foreground mb-2">No hay torneos disponibles</h3>
          <p className="text-muted-foreground mb-4">
            {canCreateTournament
              ? "Crea tu primer torneo para comenzar"
              : "Los torneos aparecerán aquí cuando estén disponibles"}
          </p>
          {canCreateTournament && (
            <Button onClick={() => setShowCreateModal(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Crear Primer Torneo
            </Button>
          )}
        </div>
      )}

      {/* Create Tournament Modal */}
      {showCreateModal && <CreateTournamentModal onClose={() => setShowCreateModal(false)} />}
    </div>
  )
}

function TournamentDetailView({
  tournament,
  onBack,
  canManage,
}: {
  tournament: Tournament
  onBack: () => void
  canManage: boolean
}) {
  const tournamentTeams = mockTeams.filter((team) => tournament.teams.includes(team.id))
  const owner = mockUsers.find((user) => user.id === tournament.ownerId)

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("es-ES", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    })
  }

  const getStatusColor = (status: Tournament["status"]) => {
    switch (status) {
      case "upcoming":
        return "bg-blue-100 text-blue-800 border-blue-300"
      case "active":
        return "bg-green-100 text-green-800 border-green-300"
      case "completed":
        return "bg-gray-100 text-gray-800 border-gray-300"
      default:
        return "bg-gray-100 text-gray-800 border-gray-300"
    }
  }

  const getStatusText = (status: Tournament["status"]) => {
    switch (status) {
      case "upcoming":
        return "Próximo"
      case "active":
        return "Activo"
      case "completed":
        return "Finalizado"
      default:
        return "Desconocido"
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="outline" onClick={onBack}>
          ← Volver
        </Button>
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <Trophy className="h-8 w-8 text-primary" />
            <h1 className="text-3xl font-bold text-foreground">{tournament.name}</h1>
            <Badge className={getStatusColor(tournament.status)}>{getStatusText(tournament.status)}</Badge>
          </div>
          <p className="text-muted-foreground">{tournament.description}</p>
        </div>
        {canManage && (
          <div className="flex gap-2">
            <Button variant="outline">
              <Edit className="h-4 w-4 mr-2" />
              Editar
            </Button>
            <Button variant="outline">
              <Trash2 className="h-4 w-4 mr-2" />
              Eliminar
            </Button>
          </div>
        )}
      </div>

      {/* Tournament Info */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Calendar className="h-5 w-5 text-primary" />
              Fechas
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div>
              <p className="text-sm text-muted-foreground">Inicio</p>
              <p className="font-medium">{formatDate(tournament.startDate)}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Fin</p>
              <p className="font-medium">{formatDate(tournament.endDate)}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              Participación
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div>
              <p className="text-sm text-muted-foreground">Equipos Inscritos</p>
              <p className="font-medium">
                {tournament.teams.length} de {tournament.maxTeams}
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Categoría</p>
              <p className="font-medium">{tournament.category}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Clock className="h-5 w-5 text-primary" />
              Organización
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div>
              <p className="text-sm text-muted-foreground">Organizador</p>
              <p className="font-medium">{owner?.name || "Desconocido"}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Estado</p>
              <p className="font-medium">{getStatusText(tournament.status)}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Teams */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5 text-primary" />
            Equipos Participantes
          </CardTitle>
        </CardHeader>
        <CardContent>
          {tournamentTeams.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {tournamentTeams.map((team) => (
                <div key={team.id} className="flex items-center gap-3 p-3 border border-border rounded-lg">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <Users className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{team.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {team.wins}V - {team.losses}D - {team.draws}E
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <Users className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
              <p className="text-muted-foreground">No hay equipos inscritos aún</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
