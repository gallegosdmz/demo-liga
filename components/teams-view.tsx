"use client"

import { useState } from "react"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { mockTeams, mockUsers, mockTournaments, type Team } from "@/lib/mock-data"
import { Users, Plus, Trophy, User, UserPlus, Edit, Eye, Crown, Star } from "lucide-react"
import { CreateTeamModal } from "@/components/create-team-modal"
import { JoinTeamModal } from "@/components/join-team-modal"

export function TeamsView() {
  const { user } = useAuth()
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [showJoinModal, setShowJoinModal] = useState(false)
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null)

  const canCreateTeam = user?.type === "coach" || user?.type === "owner"
  const canJoinTeam = user?.type === "player"

  const getUserTeams = () => {
    if (!user) return []
    if (user.type === "coach") {
      return mockTeams.filter((team) => team.coachId === user.id)
    }
    if (user.type === "player") {
      return mockTeams.filter((team) => team.players.includes(user.id))
    }
    return mockTeams
  }

  const userTeams = getUserTeams()
  const availableTeams = mockTeams.filter((team) => !team.players.includes(user?.id || ""))

  if (selectedTeam) {
    return (
      <TeamDetailView
        team={selectedTeam}
        onBack={() => setSelectedTeam(null)}
        canManage={user?.type === "coach" && selectedTeam.coachId === user.id}
      />
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Equipos</h1>
          <p className="text-muted-foreground">Gestiona equipos y jugadores</p>
        </div>
        <div className="flex gap-2">
          {canJoinTeam && (
            <Button variant="outline" onClick={() => setShowJoinModal(true)} className="flex items-center gap-2">
              <UserPlus className="h-4 w-4" />
              Unirse a Equipo
            </Button>
          )}
          {canCreateTeam && (
            <Button onClick={() => setShowCreateModal(true)} className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Crear Equipo
            </Button>
          )}
        </div>
      </div>

      {/* My Teams Section */}
      {userTeams.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-foreground flex items-center gap-2">
            <Star className="h-5 w-5 text-primary" />
            {user?.type === "coach" ? "Mis Equipos" : user?.type === "player" ? "Mis Equipos" : "Todos los Equipos"}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {userTeams.map((team) => (
              <TeamCard
                key={team.id}
                team={team}
                onViewDetails={() => setSelectedTeam(team)}
                isOwned={user?.type === "coach" && team.coachId === user.id}
                isMember={user?.type === "player" && team.players.includes(user.id)}
              />
            ))}
          </div>
        </div>
      )}

      {/* Available Teams Section */}
      {canJoinTeam && availableTeams.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-foreground flex items-center gap-2">
            <Users className="h-5 w-5 text-primary" />
            Equipos Disponibles
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {availableTeams.map((team) => (
              <TeamCard key={team.id} team={team} onViewDetails={() => setSelectedTeam(team)} />
            ))}
          </div>
        </div>
      )}

      {/* All Teams Section for non-players */}
      {!canJoinTeam && userTeams.length === 0 && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-foreground flex items-center gap-2">
            <Users className="h-5 w-5 text-primary" />
            Todos los Equipos
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockTeams.map((team) => (
              <TeamCard key={team.id} team={team} onViewDetails={() => setSelectedTeam(team)} />
            ))}
          </div>
        </div>
      )}

      {/* Empty State */}
      {mockTeams.length === 0 && (
        <div className="text-center py-12">
          <Users className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-foreground mb-2">No hay equipos disponibles</h3>
          <p className="text-muted-foreground mb-4">
            {canCreateTeam
              ? "Crea tu primer equipo para comenzar"
              : "Los equipos aparecerán aquí cuando estén disponibles"}
          </p>
          {canCreateTeam && (
            <Button onClick={() => setShowCreateModal(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Crear Primer Equipo
            </Button>
          )}
        </div>
      )}

      {/* Modals */}
      {showCreateModal && <CreateTeamModal onClose={() => setShowCreateModal(false)} />}
      {showJoinModal && <JoinTeamModal onClose={() => setShowJoinModal(false)} />}
    </div>
  )
}

function TeamCard({
  team,
  onViewDetails,
  isOwned = false,
  isMember = false,
}: {
  team: Team
  onViewDetails: () => void
  isOwned?: boolean
  isMember?: boolean
}) {
  const coach = mockUsers.find((user) => user.id === team.coachId)
  const totalGames = team.wins + team.losses + team.draws
  const winRate = totalGames > 0 ? Math.round((team.wins / totalGames) * 100) : 0

  return (
    <Card className="hover:shadow-lg transition-shadow cursor-pointer group">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
            <Users className="h-6 w-6 text-primary" />
          </div>
          <div className="flex gap-1">
            {isOwned && (
              <Badge className="bg-yellow-100 text-yellow-800 border-yellow-300">
                <Crown className="h-3 w-3 mr-1" />
                Entrenador
              </Badge>
            )}
            {isMember && (
              <Badge className="bg-green-100 text-green-800 border-green-300">
                <User className="h-3 w-3 mr-1" />
                Miembro
              </Badge>
            )}
          </div>
        </div>
        <CardTitle className="text-lg group-hover:text-primary transition-colors">{team.name}</CardTitle>
        <CardDescription>{team.category}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Crown className="h-4 w-4" />
          <span>Entrenador: {coach?.name || "Sin asignar"}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <User className="h-4 w-4" />
          <span>{team.players.length} jugadores</span>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-2 text-center text-sm">
          <div className="bg-green-500/10 rounded-md p-2">
            <p className="font-semibold text-green-600">{team.wins}</p>
            <p className="text-xs text-muted-foreground">Victorias</p>
          </div>
          <div className="bg-red-500/10 rounded-md p-2">
            <p className="font-semibold text-red-600">{team.losses}</p>
            <p className="text-xs text-muted-foreground">Derrotas</p>
          </div>
          <div className="bg-yellow-500/10 rounded-md p-2">
            <p className="font-semibold text-yellow-600">{team.draws}</p>
            <p className="text-xs text-muted-foreground">Empates</p>
          </div>
        </div>

        <div className="flex gap-2 pt-2">
          <Button variant="outline" size="sm" onClick={onViewDetails} className="flex-1 bg-transparent">
            <Eye className="h-4 w-4 mr-1" />
            Ver Detalles
          </Button>
          {isOwned && (
            <Button variant="outline" size="sm">
              <Edit className="h-4 w-4" />
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

function TeamDetailView({ team, onBack, canManage }: { team: Team; onBack: () => void; canManage: boolean }) {
  const coach = mockUsers.find((user) => user.id === team.coachId)
  const players = mockUsers.filter((user) => team.players.includes(user.id))
  const totalGames = team.wins + team.losses + team.draws
  const winRate = totalGames > 0 ? Math.round((team.wins / totalGames) * 100) : 0

  // Find tournaments this team is participating in
  const teamTournaments = mockTournaments.filter((tournament) => tournament.teams.includes(team.id))

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="outline" onClick={onBack}>
          ← Volver
        </Button>
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
              <Users className="h-6 w-6 text-primary" />
            </div>
            <h1 className="text-3xl font-bold text-foreground">{team.name}</h1>
          </div>
          <p className="text-muted-foreground">{team.category}</p>
        </div>
        {canManage && (
          <div className="flex gap-2">
            <Button variant="outline">
              <Edit className="h-4 w-4 mr-2" />
              Editar Equipo
            </Button>
            <Button variant="outline">
              <UserPlus className="h-4 w-4 mr-2" />
              Agregar Jugador
            </Button>
          </div>
        )}
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">Victorias</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-green-600">{team.wins}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">Derrotas</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-red-600">{team.losses}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">Empates</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-yellow-600">{team.draws}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">% Victorias</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-primary">{winRate}%</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Team Info */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Crown className="h-5 w-5 text-primary" />
              Información del Equipo
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground">Entrenador</p>
              <p className="font-medium">{coach?.name || "Sin asignar"}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Categoría</p>
              <p className="font-medium">{team.category}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Jugadores</p>
              <p className="font-medium">{team.players.length} jugadores</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Partidos Jugados</p>
              <p className="font-medium">{totalGames} partidos</p>
            </div>
          </CardContent>
        </Card>

        {/* Players */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5 text-primary" />
              Jugadores ({players.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            {players.length > 0 ? (
              <div className="space-y-3">
                {players.map((player) => (
                  <div key={player.id} className="flex items-center gap-3 p-3 border border-border rounded-lg">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                      <User className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">{player.name}</p>
                      <p className="text-sm text-muted-foreground">{player.email}</p>
                    </div>
                    {canManage && (
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <User className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
                <p className="text-muted-foreground">No hay jugadores en este equipo</p>
                {canManage && (
                  <Button variant="outline" size="sm" className="mt-3 bg-transparent">
                    <UserPlus className="h-4 w-4 mr-2" />
                    Agregar Jugador
                  </Button>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Tournaments */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="h-5 w-5 text-primary" />
            Torneos Participando ({teamTournaments.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {teamTournaments.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {teamTournaments.map((tournament) => (
                <div key={tournament.id} className="flex items-center gap-3 p-3 border border-border rounded-lg">
                  <Trophy className="h-8 w-8 text-primary" />
                  <div className="flex-1">
                    <p className="font-medium">{tournament.name}</p>
                    <p className="text-sm text-muted-foreground">{tournament.category}</p>
                  </div>
                  <Badge
                    className={
                      tournament.status === "active"
                        ? "bg-green-100 text-green-800 border-green-300"
                        : tournament.status === "upcoming"
                          ? "bg-blue-100 text-blue-800 border-blue-300"
                          : "bg-gray-100 text-gray-800 border-gray-300"
                    }
                  >
                    {tournament.status === "active"
                      ? "Activo"
                      : tournament.status === "upcoming"
                        ? "Próximo"
                        : "Finalizado"}
                  </Badge>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <Trophy className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
              <p className="text-muted-foreground">Este equipo no está participando en ningún torneo</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
