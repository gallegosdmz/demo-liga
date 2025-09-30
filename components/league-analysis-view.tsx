"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  mockLeagueTable,
  mockLeagueStats,
  mockTeamPerformances,
  mockTournamentBracket,
  type LeagueTable,
  type LeagueStats,
  type TeamPerformance,
  type TournamentBracket 
} from "@/lib/mock-data"
// import Bracket from "react-tournament-bracket" // Librería con problemas de compatibilidad
import { 
  Trophy,
  Target,
  TrendingUp,
  TrendingDown,
  BarChart3,
  Users,
  Calendar,
  Award,
  Star,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Zap,
  Shield,
  Crosshair,
  Activity,
  Clock,
  MapPin,
  Home,
  Plane,
  Crown,
  Flame,
  Snowflake,
  ArrowUp,
  ArrowDown,
  Minus,
  Eye,
  Play
} from "lucide-react"

export function LeagueAnalysisView() {
  const [selectedTab, setSelectedTab] = useState("overview")
  const leagueTable = mockLeagueTable
  const leagueStats = mockLeagueStats
  const teamPerformances = mockTeamPerformances
  const tournamentBracket = mockTournamentBracket

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    })
  }

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString('es-ES', {
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getFormIcon = (result: string) => {
    switch (result) {
      case "W": return <CheckCircle className="h-3 w-3 text-green-500" />
      case "D": return <Minus className="h-3 w-3 text-yellow-500" />
      case "L": return <XCircle className="h-3 w-3 text-red-500" />
      default: return <Activity className="h-3 w-3 text-gray-500" />
    }
  }

  const getCompetitivenessColor = (score: number) => {
    if (score >= 80) return "text-green-600 bg-green-100"
    if (score >= 60) return "text-green-600 bg-green-100"
    if (score >= 40) return "text-yellow-600 bg-yellow-100"
    return "text-red-600 bg-red-100"
  }

  const getCompetitivenessDescription = (score: number) => {
    if (score >= 80) return "Muy competitiva"
    if (score >= 60) return "Competitiva"
    if (score >= 40) return "Moderadamente competitiva"
    return "Poco competitiva"
  }

  const getImportanceColor = (importance: string) => {
    switch (importance) {
      case "high": return "text-red-600 bg-red-100"
      case "medium": return "text-yellow-600 bg-yellow-100"
      case "low": return "text-green-600 bg-green-100"
      default: return "text-gray-600 bg-gray-100"
    }
  }

  const getFormColor = (form: string) => {
    switch (form) {
      case "Excelente": return "text-green-600 bg-green-100"
      case "Buena": return "text-green-600 bg-green-100"
      case "Regular": return "text-yellow-600 bg-yellow-100"
      case "Mala": return "text-red-600 bg-red-100"
      default: return "text-gray-600 bg-gray-100"
    }
  }

  const getMatchStatusColor = (status: string) => {
    switch (status) {
      case "finished": return "text-green-600 bg-green-100"
      case "live": return "text-red-600 bg-red-100"
      case "scheduled": return "text-green-600 bg-green-100"
      default: return "text-gray-600 bg-gray-100"
    }
  }

  const getMatchStatusText = (status: string) => {
    switch (status) {
      case "finished": return "Finalizado"
      case "live": return "En Vivo"
      case "scheduled": return "Programado"
      default: return "Desconocido"
    }
  }


  const renderTournamentBracket = () => {
    const rounds = [
      {
        name: "Octavos de Final",
        matches: [
          { home: "Real Madrid CF", away: "Athletic Club", homeScore: 3, awayScore: 0, winner: "home" },
          { home: "FC Barcelona", away: "Villarreal CF", homeScore: 2, awayScore: 1, winner: "home" },
          { home: "Atlético Madrid", away: "Real Sociedad", homeScore: 1, awayScore: 0, winner: "home" },
          { home: "Valencia CF", away: "Sevilla FC", homeScore: 2, awayScore: 1, winner: "home" }
        ]
      },
      {
        name: "Cuartos de Final",
        matches: [
          { home: "Real Madrid CF", away: "Valencia CF", homeScore: 2, awayScore: 1, winner: "home" },
          { home: "FC Barcelona", away: "Atlético Madrid", homeScore: 1, awayScore: 0, winner: "home" }
        ]
      },
      {
        name: "Semifinales",
        matches: [
          { home: "Real Madrid CF", away: "TBD", homeScore: null, awayScore: null, winner: null },
          { home: "FC Barcelona", away: "TBD", homeScore: null, awayScore: null, winner: null }
        ]
      },
      {
        name: "Final",
        matches: [
          { home: "TBD", away: "TBD", homeScore: null, awayScore: null, winner: null }
        ]
      }
    ]

    return (
      <div className="w-full overflow-x-auto">
        <div className="min-w-max p-6">
          <div className="flex gap-8">
            {rounds.map((round, roundIndex) => (
              <div key={roundIndex} className="flex flex-col items-center space-y-4">
                {/* Header de la ronda */}
                <div className="w-48 text-center">
                  <h3 className="text-lg font-bold text-white mb-2 bg-green-600 px-4 py-2 rounded-lg">
                    {round.name}
                  </h3>
                </div>

                {/* Partidos de la ronda */}
                <div className="space-y-6">
                  {round.matches.map((match, matchIndex) => (
                    <div key={matchIndex} className="relative">
                      {/* Card del partido */}
                      <div className="w-48 bg-white border-2 border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                        {/* Equipo local */}
                        <div className={`p-3 border-b ${match.winner === 'home' ? 'bg-green-50' : match.winner === 'away' ? 'bg-red-50' : 'bg-gray-50'}`}>
                          <div className="flex items-center justify-between">
                            <span className="font-medium text-sm truncate">{match.home}</span>
                            {match.homeScore !== null && (
                              <span className={`text-lg font-bold ${match.winner === 'home' ? 'text-green-600' : 'text-gray-600'}`}>
                                {match.homeScore}
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Separador VS */}
                        <div className="flex items-center justify-center py-2">
                          <div className="w-full h-px bg-gray-200"></div>
                          <span className="px-2 text-xs text-muted-foreground font-bold">VS</span>
                          <div className="w-full h-px bg-gray-200"></div>
                        </div>

                        {/* Equipo visitante */}
                        <div className={`p-3 ${match.winner === 'away' ? 'bg-green-50' : match.winner === 'home' ? 'bg-red-50' : 'bg-gray-50'}`}>
                          <div className="flex items-center justify-between">
                            <span className="font-medium text-sm truncate">{match.away}</span>
                            {match.awayScore !== null && (
                              <span className={`text-lg font-bold ${match.winner === 'away' ? 'text-green-600' : 'text-gray-600'}`}>
                                {match.awayScore}
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Estado del partido */}
                        <div className="px-3 py-2 bg-gray-50 border-t">
                          <div className="flex items-center justify-between text-xs">
                            <Badge className={match.winner ? "bg-green-100 text-green-800" : "bg-green-100 text-green-800"}>
                              {match.winner ? "Finalizado" : "Programado"}
                            </Badge>
                            {match.winner && (
                              <div className="flex items-center gap-1 text-green-600">
                                <Trophy className="h-3 w-3" />
                                <span className="font-medium">Ganador</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Conector hacia la siguiente ronda */}
                      {roundIndex < rounds.length - 1 && (
                        <div className="absolute top-1/2 -right-4 w-8 h-0.5 bg-green-600 transform -translate-y-1/2"></div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  const renderLeagueTable = () => (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b">
            <th className="text-left p-3 font-medium">Pos</th>
            <th className="text-left p-3 font-medium">Equipo</th>
            <th className="text-center p-3 font-medium">PJ</th>
            <th className="text-center p-3 font-medium">G</th>
            <th className="text-center p-3 font-medium">E</th>
            <th className="text-center p-3 font-medium">P</th>
            <th className="text-center p-3 font-medium">GF</th>
            <th className="text-center p-3 font-medium">GC</th>
            <th className="text-center p-3 font-medium">DG</th>
            <th className="text-center p-3 font-medium">Pts</th>
            <th className="text-center p-3 font-medium">Forma</th>
          </tr>
        </thead>
        <tbody>
          {leagueTable.map((team) => (
            <tr key={team.teamId} className="border-b hover:bg-gray-50">
              <td className="p-3">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-lg">{team.position}</span>
                  {team.position <= 3 && <Crown className="h-4 w-4 text-yellow-500" />}
                  {team.position === 4 && <Trophy className="h-4 w-4 text-green-500" />}
                </div>
              </td>
              <td className="p-3">
                <div className="flex items-center gap-3">
                  <img 
                    src={team.teamLogo} 
                    alt={team.teamName}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <span className="font-medium">{team.teamName}</span>
                </div>
              </td>
              <td className="p-3 text-center">{team.matches}</td>
              <td className="p-3 text-center text-green-600 font-medium">{team.wins}</td>
              <td className="p-3 text-center text-yellow-600 font-medium">{team.draws}</td>
              <td className="p-3 text-center text-red-600 font-medium">{team.losses}</td>
              <td className="p-3 text-center font-medium">{team.goalsFor}</td>
              <td className="p-3 text-center font-medium">{team.goalsAgainst}</td>
              <td className="p-3 text-center">
                <span className={`font-medium ${team.goalDifference >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {team.goalDifference > 0 ? '+' : ''}{team.goalDifference}
                </span>
              </td>
              <td className="p-3 text-center">
                <span className="font-bold text-lg">{team.points}</span>
              </td>
              <td className="p-3">
                <div className="flex gap-1">
                  {team.form.slice(0, 5).map((result, index) => (
                    <div key={index}>
                      {getFormIcon(result)}
                    </div>
                  ))}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )

  const renderTeamPerformanceCard = (team: TeamPerformance) => (
    <Card key={team.teamId} className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Trophy className="h-5 w-5 text-primary" />
          {team.teamName}
        </CardTitle>
        <CardDescription>
          Rendimiento general: {team.performance.overall.winRate.toFixed(1)}% victorias
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Estadísticas por ubicación */}
          <div className="grid grid-cols-2 gap-4">
            <div className="p-3 bg-green-50 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Home className="h-4 w-4 text-green-600" />
                <span className="font-medium text-sm">En Casa</span>
              </div>
              <div className="text-2xl font-bold text-green-600">{team.performance.home.points}</div>
              <div className="text-xs text-muted-foreground">
                {team.performance.home.wins}V-{team.performance.home.draws}E-{team.performance.home.losses}P
              </div>
              <div className="text-xs text-muted-foreground">
                {team.performance.home.winRate.toFixed(1)}% victorias
              </div>
            </div>
            
            <div className="p-3 bg-green-50 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Plane className="h-4 w-4 text-green-600" />
                <span className="font-medium text-sm">Fuera</span>
              </div>
              <div className="text-2xl font-bold text-green-600">{team.performance.away.points}</div>
              <div className="text-xs text-muted-foreground">
                {team.performance.away.wins}V-{team.performance.away.draws}E-{team.performance.away.losses}P
              </div>
              <div className="text-xs text-muted-foreground">
                {team.performance.away.winRate.toFixed(1)}% victorias
              </div>
            </div>
          </div>

          {/* Forma y consistencia */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-sm font-medium mb-1">Forma Actual</div>
              <Badge className={getFormColor(team.performance.overall.form)}>
                {team.performance.overall.form}
              </Badge>
            </div>
            <div>
              <div className="text-sm font-medium mb-1">Consistencia</div>
              <div className="flex items-center gap-2">
                <Progress value={team.performance.overall.consistency} className="flex-1 h-2" />
                <span className="text-sm font-medium">{team.performance.overall.consistency}%</span>
              </div>
            </div>
          </div>

          {/* Fortalezas y debilidades */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-sm font-medium text-green-600 mb-2">Fortalezas</div>
              <div className="space-y-1">
                {team.strengths.slice(0, 3).map((strength, index) => (
                  <div key={index} className="text-xs bg-green-50 text-green-700 px-2 py-1 rounded">
                    {strength}
                  </div>
                ))}
              </div>
            </div>
            <div>
              <div className="text-sm font-medium text-red-600 mb-2">Debilidades</div>
              <div className="space-y-1">
                {team.weaknesses.slice(0, 3).map((weakness, index) => (
                  <div key={index} className="text-xs bg-red-50 text-red-700 px-2 py-1 rounded">
                    {weakness}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Jugadores clave */}
          <div>
            <div className="text-sm font-medium mb-2">Jugadores Clave</div>
            <div className="space-y-1">
              {team.keyPlayers.map((player, index) => (
                <div key={index} className="flex items-center justify-between text-xs">
                  <span>{player.playerName} ({player.position})</span>
                  <span className="text-muted-foreground">{player.contribution}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )

  return (
    <div className="space-y-6">
      {/* Header con estadísticas principales */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-primary">{leagueStats.totalTeams}</div>
            <div className="text-sm text-muted-foreground">Equipos</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">{leagueStats.matchesPlayed}</div>
            <div className="text-sm text-muted-foreground">Partidos Jugados</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">{leagueStats.totalGoals}</div>
            <div className="text-sm text-muted-foreground">Goles Totales</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-yellow-600">{leagueStats.averageGoalsPerMatch}</div>
            <div className="text-sm text-muted-foreground">Goles/Partido</div>
          </CardContent>
        </Card>
      </div>

      {/* Competitividad de la liga */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5 text-primary" />
            Análisis de Competitividad
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="font-medium">Nivel de Competitividad</span>
                <Badge className={getCompetitivenessColor(leagueStats.competitiveness.score)}>
                  {leagueStats.competitiveness.score}/100
                </Badge>
              </div>
              <Progress value={leagueStats.competitiveness.score} className="h-3 mb-2" />
              <p className="text-sm text-muted-foreground mb-4">
                {leagueStats.competitiveness.description}
              </p>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="font-medium">Top 4: {leagueStats.competitiveness.top4Points} pts</div>
                  <div className="text-muted-foreground">Puntos totales</div>
                </div>
                <div>
                  <div className="font-medium">Bottom 4: {leagueStats.competitiveness.bottom4Points} pts</div>
                  <div className="text-muted-foreground">Puntos totales</div>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="font-medium mb-3">Mejores Rendimientos</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-2 bg-green-50 rounded">
                  <div>
                    <div className="font-medium text-sm">Máximo Goleador</div>
                    <div className="text-xs text-muted-foreground">{leagueStats.topPerformers.topScorer.playerName} ({leagueStats.topPerformers.topScorer.team})</div>
                  </div>
                  <div className="text-lg font-bold text-green-600">{leagueStats.topPerformers.topScorer.goals}</div>
                </div>
                <div className="flex items-center justify-between p-2 bg-green-50 rounded">
                  <div>
                    <div className="font-medium text-sm">Máximo Asistidor</div>
                    <div className="text-xs text-muted-foreground">{leagueStats.topPerformers.topAssister.playerName} ({leagueStats.topPerformers.topAssister.team})</div>
                  </div>
                  <div className="text-lg font-bold text-green-600">{leagueStats.topPerformers.topAssister.assists}</div>
                </div>
                <div className="flex items-center justify-between p-2 bg-yellow-50 rounded">
                  <div>
                    <div className="font-medium text-sm">Mejor Defensa</div>
                    <div className="text-xs text-muted-foreground">{leagueStats.topPerformers.bestDefense.teamName}</div>
                  </div>
                  <div className="text-lg font-bold text-yellow-600">{leagueStats.topPerformers.bestDefense.goalsConceded}</div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Resumen</TabsTrigger>
          <TabsTrigger value="table">Tabla</TabsTrigger>
          <TabsTrigger value="bracket">Llave del Torneo</TabsTrigger>
          <TabsTrigger value="teams">Equipos</TabsTrigger>
          <TabsTrigger value="upcoming">Próximos Partidos</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Tendencias de la liga */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  Tendencias de la Liga
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded">
                    <div>
                      <div className="font-medium text-sm">Más Victorias</div>
                      <div className="text-xs text-muted-foreground">{leagueStats.trends.mostWins}</div>
                    </div>
                    <Flame className="h-5 w-5 text-green-600" />
                  </div>
                  <div className="flex items-center justify-between p-3 bg-yellow-50 rounded">
                    <div>
                      <div className="font-medium text-sm">Más Empates</div>
                      <div className="text-xs text-muted-foreground">{leagueStats.trends.mostDraws}</div>
                    </div>
                    <Minus className="h-5 w-5 text-yellow-600" />
                  </div>
                  <div className="flex items-center justify-between p-3 bg-red-50 rounded">
                    <div>
                      <div className="font-medium text-sm">Más Derrotas</div>
                      <div className="text-xs text-muted-foreground">{leagueStats.trends.mostLosses}</div>
                    </div>
                    <TrendingDown className="h-5 w-5 text-red-600" />
                  </div>
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded">
                    <div>
                      <div className="font-medium text-sm">Mejor Forma</div>
                      <div className="text-xs text-muted-foreground">{leagueStats.trends.bestForm}</div>
                    </div>
                    <Crown className="h-5 w-5 text-green-600" />
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
                    <div>
                      <div className="font-medium text-sm">Peor Forma</div>
                      <div className="text-xs text-muted-foreground">{leagueStats.trends.worstForm}</div>
                    </div>
                    <Snowflake className="h-5 w-5 text-gray-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Progreso de la temporada */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-primary" />
                  Progreso de la Temporada
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Partidos Jugados</span>
                      <span>{leagueStats.matchesPlayed}/{leagueStats.totalMatches}</span>
                    </div>
                    <Progress value={(leagueStats.matchesPlayed / leagueStats.totalMatches) * 100} className="h-2" />
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div className="p-3 bg-green-50 rounded">
                      <div className="text-2xl font-bold text-green-600">{leagueStats.matchesPlayed}</div>
                      <div className="text-xs text-muted-foreground">Jugados</div>
                    </div>
                    <div className="p-3 bg-gray-50 rounded">
                      <div className="text-2xl font-bold text-gray-600">{leagueStats.matchesRemaining}</div>
                      <div className="text-xs text-muted-foreground">Restantes</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="table" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trophy className="h-5 w-5 text-primary" />
                Tabla de Posiciones
              </CardTitle>
              <CardDescription>
                Temporada {leagueStats.season} - {leagueStats.matchesPlayed} partidos jugados
              </CardDescription>
            </CardHeader>
            <CardContent>
              {renderLeagueTable()}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="bracket" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trophy className="h-5 w-5 text-primary" />
                {tournamentBracket.name}
              </CardTitle>
              <CardDescription>
                Temporada {tournamentBracket.season} - Estado: {tournamentBracket.status === "knockout" ? "Eliminatorias" : tournamentBracket.status}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {renderTournamentBracket()}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="teams" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
            {teamPerformances.map(renderTeamPerformanceCard)}
          </div>
        </TabsContent>

        <TabsContent value="upcoming" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-primary" />
                Próximos Partidos Importantes
              </CardTitle>
              <CardDescription>
                Partidos clave que definirán el final de la temporada
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {leagueStats.upcomingMatches.map((match) => (
                  <div key={match.id} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <div className="text-center">
                          <div className="font-medium">{match.homeTeam}</div>
                          <div className="text-xs text-muted-foreground">Casa</div>
                        </div>
                        <div className="text-2xl font-bold text-muted-foreground">vs</div>
                        <div className="text-center">
                          <div className="font-medium">{match.awayTeam}</div>
                          <div className="text-xs text-muted-foreground">Fuera</div>
                        </div>
                      </div>
                      <Badge className={getImportanceColor(match.importance)}>
                        {match.importance === "high" ? "Alta" : match.importance === "medium" ? "Media" : "Baja"}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {formatDate(match.date)}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {formatTime(match.date)}
                      </div>
                    </div>
                    <div className="mt-2 text-sm text-muted-foreground">
                      {match.description}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
