"use client"

import { useState } from "react"
import { useAuth } from "@/contexts/auth-context"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { mockPlayerStats, mockTeams, mockUsers, mockTournaments, mockMatches } from "@/lib/mock-data"
import { Trophy, Target, TrendingUp, Award, User } from "lucide-react"
import { PlayerStatsView } from "./player-stats-view"
import { CoachStatsView } from "./coach-stats-view"
import { LeagueAnalysisView } from "./league-analysis-view"

export function StatsView() {
  const { user } = useAuth()
  const [viewMode, setViewMode] = useState<"overview" | "players" | "teams" | "tournaments">("overview")

  const getTopScorers = () => {
    return mockPlayerStats
      .sort((a, b) => b.goals - a.goals)
      .slice(0, 5)
      .map((stat) => ({
        ...stat,
        player: mockUsers.find((u) => u.id === stat.playerId),
      }))
  }

  const getTopAssists = () => {
    return mockPlayerStats
      .sort((a, b) => b.assists - a.assists)
      .slice(0, 5)
      .map((stat) => ({
        ...stat,
        player: mockUsers.find((u) => u.id === stat.playerId),
      }))
  }

  const getTeamStats = () => {
    return mockTeams
      .map((team) => ({
        ...team,
        totalGames: team.wins + team.losses + team.draws,
        winRate:
          team.wins + team.losses + team.draws > 0 ? (team.wins / (team.wins + team.losses + team.draws)) * 100 : 0,
      }))
      .sort((a, b) => b.winRate - a.winRate)
  }

  const getUserStats = () => {
    if (!user) return null

    if (user.type === "player") {
      return mockPlayerStats.find((stat) => stat.playerId === user.id)
    }

    if (user.type === "coach") {
      const userTeams = mockTeams.filter((team) => team.coachId === user.id)
      const totalWins = userTeams.reduce((sum, team) => sum + team.wins, 0)
      const totalLosses = userTeams.reduce((sum, team) => sum + team.losses, 0)
      const totalDraws = userTeams.reduce((sum, team) => sum + team.draws, 0)
      const totalGames = totalWins + totalLosses + totalDraws

      return {
        teams: userTeams.length,
        totalGames,
        wins: totalWins,
        losses: totalLosses,
        draws: totalDraws,
        winRate: totalGames > 0 ? (totalWins / totalGames) * 100 : 0,
      }
    }

    return null
  }

  const topScorers = getTopScorers()
  const topAssists = getTopAssists()
  const teamStats = getTeamStats()
  const userStats = getUserStats()

  // Si el usuario es un jugador, mostrar las estadísticas detalladas estilo FIFA
  if (user?.type === "player") {
    return <PlayerStatsView />
  }

  // Si el usuario es un entrenador, mostrar las estadísticas avanzadas de entrenador
  if (user?.type === "coach") {
    return <CoachStatsView />
  }

  // Si el usuario es un dueño, mostrar el análisis de liga
  if (user?.type === "owner") {
    return <LeagueAnalysisView />
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Estadísticas</h1>
          <p className="text-muted-foreground">Análisis de rendimiento y estadísticas</p>
        </div>
        <div className="flex gap-2">
          <Button
            variant={viewMode === "overview" ? "default" : "outline"}
            size="sm"
            onClick={() => setViewMode("overview")}
          >
            General
          </Button>
          <Button
            variant={viewMode === "players" ? "default" : "outline"}
            size="sm"
            onClick={() => setViewMode("players")}
          >
            Jugadores
          </Button>
          <Button variant={viewMode === "teams" ? "default" : "outline"} size="sm" onClick={() => setViewMode("teams")}>
            Equipos
          </Button>
        </div>
      </div>

      {/* User Personal Stats */}
      {userStats && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5 text-primary" />
              Mis Estadísticas
            </CardTitle>
          </CardHeader>
          <CardContent>
            {user && user.type === "fan" && typeof userStats === "object" && "teams" in userStats ? (
              <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-primary">{userStats.teams}</p>
                  <p className="text-sm text-muted-foreground">Equipos</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-primary">{userStats.totalGames}</p>
                  <p className="text-sm text-muted-foreground">Partidos</p>
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
                  <p className="text-2xl font-bold text-primary">{Math.round(userStats.winRate)}%</p>
                  <p className="text-sm text-muted-foreground">% Victorias</p>
                </div>
              </div>
            ) : null}
          </CardContent>
        </Card>
      )}

      {/* Overview Stats */}
      {viewMode === "overview" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-muted-foreground">Total Torneos</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-primary">{mockTournaments.length}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-muted-foreground">Total Equipos</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-primary">{mockTeams.length}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-muted-foreground">Total Partidos</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-primary">{mockMatches.length}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-muted-foreground">Jugadores Activos</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-primary">{mockUsers.filter((u) => u.type === "player").length}</p>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Top Scorers & Assists */}
      {(viewMode === "overview" || viewMode === "players") && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5 text-primary" />
                Máximos Goleadores
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {topScorers.map((scorer, index) => (
                  <div key={scorer.playerId} className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                      <span className="text-sm font-bold text-primary">#{index + 1}</span>
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">{scorer.player?.name || "Jugador Desconocido"}</p>
                      <p className="text-sm text-muted-foreground">{scorer.goals} goles</p>
                    </div>
                    <Trophy className="h-5 w-5 text-yellow-500" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5 text-primary" />
                Máximos Asistentes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {topAssists.map((assister, index) => (
                  <div key={assister.playerId} className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                      <span className="text-sm font-bold text-primary">#{index + 1}</span>
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">{assister.player?.name || "Jugador Desconocido"}</p>
                      <p className="text-sm text-muted-foreground">{assister.assists} asistencias</p>
                    </div>
                    <Award className="h-5 w-5 text-blue-500" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Team Rankings */}
      {(viewMode === "overview" || viewMode === "teams") && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              Ranking de Equipos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {teamStats.slice(0, 10).map((team, index) => (
                <div key={team.id} className="flex items-center gap-4 p-3 border border-border rounded-lg">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <span className="font-bold text-primary">#{index + 1}</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold">{team.name}</h3>
                    <p className="text-sm text-muted-foreground">{team.category}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">Partidos</p>
                    <p className="font-semibold">{team.totalGames}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">V-D-E</p>
                    <p className="font-semibold">
                      {team.wins}-{team.losses}-{team.draws}
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">% Victorias</p>
                    <p className="font-semibold text-primary">{Math.round(team.winRate)}%</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
