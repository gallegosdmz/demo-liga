"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Trophy, 
  Target, 
  Zap, 
  Shield, 
  Clock, 
  TrendingUp,
  Star,
  Award,
  Activity,
  BarChart3,
  Calendar,
  Users,
  Target as TargetIcon,
  Crosshair,
  Footprints,
  Eye,
  CheckCircle,
  AlertTriangle,
  XCircle
} from "lucide-react"
import { 
  mockMatchPerformances, 
  mockPlayerSeasonStats,
  type MatchPerformance,
  type PlayerSeasonStats 
} from "@/lib/mock-data"

export function PlayerStatsView() {
  const [selectedTab, setSelectedTab] = useState("overview")
  const matchPerformances = mockMatchPerformances
  const seasonStats = mockPlayerSeasonStats

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

  const getRatingColor = (rating: number) => {
    if (rating >= 8.5) return "text-green-600 bg-green-100"
    if (rating >= 7.5) return "text-green-600 bg-green-100"
    if (rating >= 6.5) return "text-yellow-600 bg-yellow-100"
    return "text-red-600 bg-red-100"
  }

  const getResultIcon = (result: string) => {
    switch (result) {
      case "W":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "D":
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />
      case "L":
        return <XCircle className="h-4 w-4 text-red-500" />
      default:
        return <Activity className="h-4 w-4 text-gray-500" />
    }
  }

  const getResultText = (result: string) => {
    switch (result) {
      case "W": return "Victoria"
      case "D": return "Empate"
      case "L": return "Derrota"
      default: return "Desconocido"
    }
  }

  const getPositionText = (position: string) => {
    switch (position) {
      case "GK": return "Portero"
      case "DEF": return "Defensa"
      case "MID": return "Mediocampista"
      case "FWD": return "Delantero"
      default: return position
    }
  }

  const getStreakText = (streak: { type: string; count: number }) => {
    switch (streak.type) {
      case "goals": return `${streak.count} partidos consecutivos marcando`
      case "assists": return `${streak.count} partidos consecutivos con asistencias`
      case "clean_sheets": return `${streak.count} partidos consecutivos sin recibir goles`
      case "wins": return `${streak.count} victorias consecutivas`
      default: return "Racha activa"
    }
  }

  return (
    <div className="space-y-6">
      {/* Header con estadísticas principales */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Calificación Promedio</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-primary">{seasonStats.avgRating.toFixed(1)}</div>
            <p className="text-xs text-muted-foreground">de 10.0</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Goles</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-primary">{seasonStats.totalGoals}</div>
            <p className="text-xs text-muted-foreground">{seasonStats.avgGoals.toFixed(1)} por partido</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Asistencias</CardTitle>
            <Zap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-primary">{seasonStats.totalAssists}</div>
            <p className="text-xs text-muted-foreground">{seasonStats.avgAssists.toFixed(1)} por partido</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Partidos</CardTitle>
            <Trophy className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-primary">{seasonStats.totalMatches}</div>
            <p className="text-xs text-muted-foreground">{seasonStats.avgMinutes.toFixed(0)} min promedio</p>
          </CardContent>
        </Card>
      </div>

      {/* Racha actual */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Racha Actual
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Award className="h-6 w-6 text-yellow-500" />
              <span className="font-medium">{getStreakText(seasonStats.currentStreak)}</span>
            </div>
            <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
              En curso
            </Badge>
          </div>
        </CardContent>
      </Card>

      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Resumen</TabsTrigger>
          <TabsTrigger value="matches">Últimos Partidos</TabsTrigger>
          <TabsTrigger value="detailed">Estadísticas Detalladas</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Mejor Partido */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="h-5 w-5 text-yellow-500" />
                  Mejor Partido
                </CardTitle>
                <CardDescription>
                  {formatDate(seasonStats.bestMatch.date)} - Calificación: {seasonStats.bestMatch.rating}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Resultado:</span>
                    <div className="flex items-center gap-2">
                      {getResultIcon(seasonStats.bestMatch.result)}
                      <span className="text-sm">{getResultText(seasonStats.bestMatch.result)}</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Goles:</span>
                    <span className="text-sm font-bold">{seasonStats.bestMatch.goals}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Asistencias:</span>
                    <span className="text-sm font-bold">{seasonStats.bestMatch.assists}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Minutos:</span>
                    <span className="text-sm">{seasonStats.bestMatch.minutesPlayed}'</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Eficiencia */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-green-500" />
                  Eficiencia
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Precisión de Pases</span>
                      <span>{(seasonStats.passAccuracy * 100).toFixed(0)}%</span>
                    </div>
                    <Progress value={seasonStats.passAccuracy * 100} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Conversión de Goles</span>
                      <span>{(seasonStats.goalConversionRate * 100).toFixed(0)}%</span>
                    </div>
                    <Progress value={seasonStats.goalConversionRate * 100} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Éxito en Duelos</span>
                      <span>{(seasonStats.duelSuccessRate * 100).toFixed(0)}%</span>
                    </div>
                    <Progress value={seasonStats.duelSuccessRate * 100} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Éxito en Tackles</span>
                      <span>{(seasonStats.tackleSuccessRate * 100).toFixed(0)}%</span>
                    </div>
                    <Progress value={seasonStats.tackleSuccessRate * 100} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="matches" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Últimos 10 Partidos
              </CardTitle>
              <CardDescription>
                Rendimiento detallado en los últimos encuentros
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {matchPerformances.map((match, index) => (
                  <div key={match.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="text-sm text-muted-foreground w-8">
                        #{matchPerformances.length - index}
                      </div>
                      <div className="flex items-center gap-2">
                        {getResultIcon(match.result)}
                      </div>
                      <div>
                        <div className="font-medium text-sm">
                          {formatDate(match.date)} - {formatTime(match.date)}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {getPositionText(match.position)} • {match.minutesPlayed}' minutos
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-6">
                      <div className="text-center">
                        <div className="text-sm font-medium">{match.goals}</div>
                        <div className="text-xs text-muted-foreground">Goles</div>
                      </div>
                      <div className="text-center">
                        <div className="text-sm font-medium">{match.assists}</div>
                        <div className="text-xs text-muted-foreground">Asistencias</div>
                      </div>
                      <div className="text-center">
                        <div className="text-sm font-medium">{match.shots}</div>
                        <div className="text-xs text-muted-foreground">Tiros</div>
                      </div>
                      <div className="text-center">
                        <div className="text-sm font-medium">{match.passes}</div>
                        <div className="text-xs text-muted-foreground">Pases</div>
                      </div>
                      <div className="text-center">
                        <Badge className={getRatingColor(match.rating)}>
                          {match.rating.toFixed(1)}
                        </Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="detailed" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Estadísticas de Ataque */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-red-500" />
                  Ataque
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {matchPerformances.slice(0, 5).map((match) => (
                    <div key={match.id} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>{formatDate(match.date)}</span>
                        <Badge variant="outline" className={getRatingColor(match.rating)}>
                          {match.rating.toFixed(1)}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-4 gap-2 text-xs">
                        <div className="text-center p-2 bg-muted rounded">
                          <div className="font-bold">{match.goals}</div>
                          <div>Goles</div>
                        </div>
                        <div className="text-center p-2 bg-muted rounded">
                          <div className="font-bold">{match.assists}</div>
                          <div>Asistencias</div>
                        </div>
                        <div className="text-center p-2 bg-muted rounded">
                          <div className="font-bold">{match.shots}</div>
                          <div>Tiros</div>
                        </div>
                        <div className="text-center p-2 bg-muted rounded">
                          <div className="font-bold">{match.shotsOnTarget}</div>
                          <div>Al arco</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Estadísticas de Pases */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-green-500" />
                  Pases
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {matchPerformances.slice(0, 5).map((match) => (
                    <div key={match.id} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>{formatDate(match.date)}</span>
                        <span className="text-muted-foreground">
                          {((match.passesCompleted / match.passes) * 100).toFixed(0)}% precisión
                        </span>
                      </div>
                      <div className="grid grid-cols-4 gap-2 text-xs">
                        <div className="text-center p-2 bg-muted rounded">
                          <div className="font-bold">{match.passes}</div>
                          <div>Total</div>
                        </div>
                        <div className="text-center p-2 bg-muted rounded">
                          <div className="font-bold">{match.passesCompleted}</div>
                          <div>Completados</div>
                        </div>
                        <div className="text-center p-2 bg-muted rounded">
                          <div className="font-bold">{match.keyPasses}</div>
                          <div>Clave</div>
                        </div>
                        <div className="text-center p-2 bg-muted rounded">
                          <div className="font-bold">{match.crosses}</div>
                          <div>Centros</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Estadísticas Defensivas */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-green-500" />
                  Defensa
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {matchPerformances.slice(0, 5).map((match) => (
                    <div key={match.id} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>{formatDate(match.date)}</span>
                        <span className="text-muted-foreground">
                          {((match.tacklesWon / match.tackles) * 100).toFixed(0)}% tackles
                        </span>
                      </div>
                      <div className="grid grid-cols-4 gap-2 text-xs">
                        <div className="text-center p-2 bg-muted rounded">
                          <div className="font-bold">{match.tackles}</div>
                          <div>Tackles</div>
                        </div>
                        <div className="text-center p-2 bg-muted rounded">
                          <div className="font-bold">{match.interceptions}</div>
                          <div>Intercepciones</div>
                        </div>
                        <div className="text-center p-2 bg-muted rounded">
                          <div className="font-bold">{match.clearances}</div>
                          <div>Despejes</div>
                        </div>
                        <div className="text-center p-2 bg-muted rounded">
                          <div className="font-bold">{match.duels}</div>
                          <div>Duelos</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Estadísticas de Disciplina */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-yellow-500" />
                  Disciplina
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {matchPerformances.slice(0, 5).map((match) => (
                    <div key={match.id} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>{formatDate(match.date)}</span>
                        <div className="flex gap-1">
                          {match.yellowCards > 0 && (
                            <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 text-xs">
                              {match.yellowCards} Amarilla{match.yellowCards > 1 ? 's' : ''}
                            </Badge>
                          )}
                          {match.redCards > 0 && (
                            <Badge variant="destructive" className="text-xs">
                              {match.redCards} Roja{match.redCards > 1 ? 's' : ''}
                            </Badge>
                          )}
                        </div>
                      </div>
                      <div className="grid grid-cols-4 gap-2 text-xs">
                        <div className="text-center p-2 bg-muted rounded">
                          <div className="font-bold">{match.foulsCommitted}</div>
                          <div>Faltas</div>
                        </div>
                        <div className="text-center p-2 bg-muted rounded">
                          <div className="font-bold">{match.foulsWon}</div>
                          <div>Recibidas</div>
                        </div>
                        <div className="text-center p-2 bg-muted rounded">
                          <div className="font-bold">{match.offsides}</div>
                          <div>Offsides</div>
                        </div>
                        <div className="text-center p-2 bg-muted rounded">
                          <div className="font-bold">{match.aerialDuels}</div>
                          <div>Aéreas</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
