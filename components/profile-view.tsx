"use client"

import { useState } from "react"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { mockTeams, mockTournaments, mockPlayerStats } from "@/lib/mock-data"
import { User, Edit, Shield, Star, Heart, Trophy, Users, BarChart3, Settings, LogOut } from "lucide-react"

export function ProfileView() {
  const { user, logout } = useAuth()
  const [isEditing, setIsEditing] = useState(false)

  if (!user) {
    return (
      <div className="text-center py-12">
        <User className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-foreground mb-2">No hay usuario conectado</h3>
        <p className="text-muted-foreground">Inicia sesión para ver tu perfil</p>
      </div>
    )
  }

  const getUserTypeIcon = () => {
    switch (user.type) {
      case "coach":
        return Shield
      case "owner":
        return Star
      case "player":
        return User
      case "fan":
        return Heart
      default:
        return User
    }
  }

  const getUserTypeLabel = () => {
    switch (user.type) {
      case "coach":
        return "Entrenador"
      case "owner":
        return "Dueño de Liga"
      case "player":
        return "Jugador"
      case "fan":
        return "Aficionado"
      default:
        return "Usuario"
    }
  }

  const getUserTypeColor = () => {
    switch (user.type) {
      case "coach":
        return "bg-blue-500/10 text-blue-600 border-blue-200"
      case "owner":
        return "bg-yellow-500/10 text-yellow-600 border-yellow-200"
      case "player":
        return "bg-green-500/10 text-green-600 border-green-200"
      case "fan":
        return "bg-pink-500/10 text-pink-600 border-pink-200"
      default:
        return "bg-gray-500/10 text-gray-600 border-gray-200"
    }
  }

  const getUserStats = () => {
    if (user.type === "coach") {
      const userTeams = mockTeams.filter((team) => team.coachId === user.id)
      const totalWins = userTeams.reduce((sum, team) => sum + team.wins, 0)
      const totalLosses = userTeams.reduce((sum, team) => sum + team.losses, 0)
      const totalDraws = userTeams.reduce((sum, team) => sum + team.draws, 0)

      return {
        teams: userTeams.length,
        wins: totalWins,
        losses: totalLosses,
        draws: totalDraws,
        totalGames: totalWins + totalLosses + totalDraws,
      }
    }

    if (user.type === "player") {
      const playerStats = mockPlayerStats.find((stat) => stat.playerId === user.id)
      const playerTeams = mockTeams.filter((team) => team.players.includes(user.id))

      return {
        teams: playerTeams.length,
        goals: playerStats?.goals || 0,
        assists: playerStats?.assists || 0,
        yellowCards: playerStats?.yellowCards || 0,
        redCards: playerStats?.redCards || 0,
        minutesPlayed: playerStats?.minutesPlayed || 0,
      }
    }

    if (user.type === "owner") {
      const userTournaments = mockTournaments.filter((tournament) => tournament.ownerId === user.id)
      return {
        tournaments: userTournaments.length,
        activeTournaments: userTournaments.filter((t) => t.status === "active").length,
        completedTournaments: userTournaments.filter((t) => t.status === "completed").length,
      }
    }

    return null
  }

  const userStats = getUserStats()
  const UserTypeIcon = getUserTypeIcon()

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Mi Perfil</h1>
          <p className="text-muted-foreground">Gestiona tu información personal y configuración</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setIsEditing(!isEditing)}>
            <Edit className="h-4 w-4 mr-2" />
            {isEditing ? "Cancelar" : "Editar Perfil"}
          </Button>
          <Button variant="outline" onClick={logout}>
            <LogOut className="h-4 w-4 mr-2" />
            Cerrar Sesión
          </Button>
        </div>
      </div>

      {/* Profile Info */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5 text-primary" />
            Información Personal
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-start gap-6">
            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center">
              <UserTypeIcon className="h-10 w-10 text-primary" />
            </div>
            <div className="flex-1 space-y-3">
              <div>
                <h2 className="text-2xl font-bold text-foreground">{user.name}</h2>
                <p className="text-muted-foreground">{user.email}</p>
              </div>
              <Badge className={getUserTypeColor()}>
                <UserTypeIcon className="h-3 w-3 mr-1" />
                {getUserTypeLabel()}
              </Badge>
            </div>
          </div>

          {isEditing && (
            <div className="mt-6 space-y-4 border-t border-border pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Nombre Completo</label>
                  <input
                    type="text"
                    defaultValue={user.name}
                    className="w-full px-3 py-2 border border-border rounded-md bg-input focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Email</label>
                  <input
                    type="email"
                    defaultValue={user.email}
                    className="w-full px-3 py-2 border border-border rounded-md bg-input focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <Button>Guardar Cambios</Button>
                <Button variant="outline" onClick={() => setIsEditing(false)} className="bg-transparent">
                  Cancelar
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* User Stats */}
      {userStats && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-primary" />
              Mis Estadísticas
            </CardTitle>
          </CardHeader>
          <CardContent>
            {user.type === "coach" && "teams" in userStats && (
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-primary">{userStats.teams}</p>
                  <p className="text-sm text-muted-foreground">Equipos</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-green-600">{userStats.wins}</p>
                  <p className="text-sm text-muted-foreground">Victorias</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-red-600">{userStats.losses}</p>
                  <p className="text-sm text-muted-foreground">Derrotas</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-yellow-600">{userStats.draws}</p>
                  <p className="text-sm text-muted-foreground">Empates</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-primary">{userStats.totalGames}</p>
                  <p className="text-sm text-muted-foreground">Total Partidos</p>
                </div>
              </div>
            )}

            {user.type === "player" && "goals" in userStats && (
              <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-primary">{userStats.teams}</p>
                  <p className="text-sm text-muted-foreground">Equipos</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-primary">{userStats.goals}</p>
                  <p className="text-sm text-muted-foreground">Goles</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-primary">{userStats.assists}</p>
                  <p className="text-sm text-muted-foreground">Asistencias</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-yellow-600">{userStats.yellowCards}</p>
                  <p className="text-sm text-muted-foreground">T. Amarillas</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-red-600">{userStats.redCards}</p>
                  <p className="text-sm text-muted-foreground">T. Rojas</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-primary">{userStats.minutesPlayed}</p>
                  <p className="text-sm text-muted-foreground">Minutos</p>
                </div>
              </div>
            )}

            {user.type === "owner" && "tournaments" in userStats && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-primary">{userStats.tournaments}</p>
                  <p className="text-sm text-muted-foreground">Torneos Creados</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-green-600">{userStats.activeTournaments}</p>
                  <p className="text-sm text-muted-foreground">Torneos Activos</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-gray-600">{userStats.completedTournaments}</p>
                  <p className="text-sm text-muted-foreground">Torneos Completados</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5 text-primary" />
            Acciones Rápidas
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {user.type === "coach" && (
              <Button variant="outline" className="h-20 flex-col gap-2 bg-transparent">
                <Users className="h-6 w-6" />
                <span>Gestionar Equipos</span>
              </Button>
            )}
            {user.type === "owner" && (
              <Button variant="outline" className="h-20 flex-col gap-2 bg-transparent">
                <Trophy className="h-6 w-6" />
                <span>Crear Torneo</span>
              </Button>
            )}
            {user.type === "player" && (
              <Button variant="outline" className="h-20 flex-col gap-2 bg-transparent">
                <Users className="h-6 w-6" />
                <span>Buscar Equipos</span>
              </Button>
            )}
            <Button variant="outline" className="h-20 flex-col gap-2 bg-transparent">
              <BarChart3 className="h-6 w-6" />
              <span>Ver Estadísticas</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2 bg-transparent">
              <Settings className="h-6 w-6" />
              <span>Configuración</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
