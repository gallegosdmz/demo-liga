"use client"

import { useState } from "react"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { mockMatches, mockTournaments, mockTeams, type Match } from "@/lib/mock-data"
import { Calendar, Clock, MapPin, Users } from "lucide-react"

export function CalendarView() {
  const { user } = useAuth()
  const [currentDate, setCurrentDate] = useState(new Date())
  const [viewMode, setViewMode] = useState<"month" | "week" | "list">("list")
  const [filterType, setFilterType] = useState<"all" | "my-teams" | "tournaments">("all")

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("es-ES", {
      weekday: "short",
      day: "numeric",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const getStatusColor = (status: Match["status"]) => {
    switch (status) {
      case "scheduled":
        return "bg-blue-100 text-blue-800 border-blue-300"
      case "live":
        return "bg-green-100 text-green-800 border-green-300"
      case "completed":
        return "bg-gray-100 text-gray-800 border-gray-300"
      default:
        return "bg-gray-100 text-gray-800 border-gray-300"
    }
  }

  const getStatusText = (status: Match["status"]) => {
    switch (status) {
      case "scheduled":
        return "Programado"
      case "live":
        return "En Vivo"
      case "completed":
        return "Finalizado"
      default:
        return "Desconocido"
    }
  }

  const getFilteredMatches = () => {
    let filteredMatches = mockMatches

    if (filterType === "my-teams" && user) {
      // Filter matches where user's teams are playing
      const userTeams = mockTeams.filter((team) => team.coachId === user.id || team.players.includes(user.id))
      const userTeamIds = userTeams.map((team) => team.id)
      filteredMatches = mockMatches.filter(
        (match) => userTeamIds.includes(match.homeTeamId) || userTeamIds.includes(match.awayTeamId),
      )
    }

    return filteredMatches.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
  }

  const filteredMatches = getFilteredMatches()

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Calendario</h1>
          <p className="text-muted-foreground">Programa de partidos y eventos</p>
        </div>
        <div className="flex gap-2">
          <Button variant={filterType === "all" ? "default" : "outline"} size="sm" onClick={() => setFilterType("all")}>
            Todos
          </Button>
          <Button
            variant={filterType === "my-teams" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilterType("my-teams")}
          >
            Mis Equipos
          </Button>
        </div>
      </div>

      {/* Upcoming Matches */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-foreground flex items-center gap-2">
          <Clock className="h-5 w-5 text-primary" />
          Próximos Partidos
        </h2>
        <div className="space-y-4">
          {filteredMatches.length > 0 ? (
            filteredMatches.map((match) => {
              const tournament = mockTournaments.find((t) => t.id === match.tournamentId)
              const homeTeam = mockTeams.find((t) => t.id === match.homeTeamId)
              const awayTeam = mockTeams.find((t) => t.id === match.awayTeamId)

              return (
                <Card key={match.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center gap-4">
                      {/* Date & Time */}
                      <div className="flex items-center gap-3 md:w-48">
                        <Calendar className="h-5 w-5 text-primary" />
                        <div>
                          <p className="font-medium">{formatDate(match.date)}</p>
                          <p className="text-sm text-muted-foreground">{tournament?.name}</p>
                        </div>
                      </div>

                      {/* Teams */}
                      <div className="flex-1 flex items-center justify-center gap-4">
                        <div className="text-center">
                          <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-2">
                            <Users className="h-6 w-6 text-primary" />
                          </div>
                          <p className="font-medium">{homeTeam?.name}</p>
                        </div>

                        <div className="text-center">
                          {match.status === "completed" ? (
                            <div className="text-2xl font-bold">
                              {match.homeScore} - {match.awayScore}
                            </div>
                          ) : (
                            <div className="text-lg text-muted-foreground">VS</div>
                          )}
                        </div>

                        <div className="text-center">
                          <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-2">
                            <Users className="h-6 w-6 text-primary" />
                          </div>
                          <p className="font-medium">{awayTeam?.name}</p>
                        </div>
                      </div>

                      {/* Status */}
                      <div className="flex items-center gap-3 md:w-32 justify-end">
                        <Badge className={getStatusColor(match.status)}>{getStatusText(match.status)}</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })
          ) : (
            <div className="text-center py-12">
              <Calendar className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">No hay partidos programados</h3>
              <p className="text-muted-foreground">
                {filterType === "my-teams"
                  ? "No tienes partidos programados próximamente"
                  : "Los partidos aparecerán aquí cuando sean programados"}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Tournament Schedule */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-primary" />
            Torneos Activos
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockTournaments
              .filter((t) => t.status === "active" || t.status === "upcoming")
              .map((tournament) => (
                <div
                  key={tournament.id}
                  className="flex items-center justify-between p-4 border border-border rounded-lg"
                >
                  <div>
                    <h3 className="font-semibold">{tournament.name}</h3>
                    <p className="text-sm text-muted-foreground">{tournament.category}</p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(tournament.startDate).toLocaleDateString("es-ES")} -{" "}
                      {new Date(tournament.endDate).toLocaleDateString("es-ES")}
                    </p>
                  </div>
                  <Badge
                    className={
                      tournament.status === "active"
                        ? "bg-green-100 text-green-800 border-green-300"
                        : "bg-blue-100 text-blue-800 border-blue-300"
                    }
                  >
                    {tournament.status === "active" ? "Activo" : "Próximo"}
                  </Badge>
                </div>
              ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
