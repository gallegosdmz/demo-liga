"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  mockCoachMatches,
  mockIdealFormation,
  mockCoachStats,
  type CoachMatch,
  type IdealFormation,
  type CoachStats 
} from "@/lib/mock-data"
import { PlayerScoutingView } from "./player-scouting-view"
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
  MapPin,
  Home,
  Plane,
  RefreshCw,
  Settings,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Play,
  Pause,
  RotateCcw
} from "lucide-react"

export function CoachStatsView() {
  const [selectedTab, setSelectedTab] = useState("overview")
  const coachMatches = mockCoachMatches
  const idealFormation = mockIdealFormation
  const coachStats = mockCoachStats

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

  const getResultColor = (result: string) => {
    switch (result) {
      case "W": return "text-green-600 bg-green-100"
      case "D": return "text-yellow-600 bg-yellow-100"
      case "L": return "text-red-600 bg-red-100"
      default: return "text-gray-600 bg-gray-100"
    }
  }

  const getRatingColor = (rating: number) => {
    if (rating >= 8.5) return "text-green-600 bg-green-100"
    if (rating >= 7.5) return "text-green-600 bg-green-100"
    if (rating >= 6.5) return "text-yellow-600 bg-yellow-100"
    return "text-red-600 bg-red-100"
  }

  const getTacticsColor = (tactic: string) => {
    switch (tactic) {
      case "high": return "text-red-600 bg-red-100"
      case "medium": return "text-yellow-600 bg-yellow-100"
      case "low": return "text-green-600 bg-green-100"
      case "fast": return "text-red-600 bg-red-100"
      case "slow": return "text-green-600 bg-green-100"
      case "wide": return "text-green-600 bg-green-100"
      case "narrow": return "text-purple-600 bg-purple-100"
      default: return "text-gray-600 bg-gray-100"
    }
  }

  const getTacticsText = (tactic: string) => {
    switch (tactic) {
      case "high": return "Alta"
      case "medium": return "Media"
      case "low": return "Baja"
      case "fast": return "Rápido"
      case "slow": return "Lento"
      case "wide": return "Amplio"
      case "narrow": return "Estrecho"
      case "normal": return "Normal"
      default: return tactic
    }
  }

  const renderMatchCard = (match: CoachMatch) => (
    <Card key={match.id} className="hover:shadow-lg transition-shadow">
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-3">
            {getResultIcon(match.result)}
            <div>
              <div className="font-semibold text-sm">
                {formatDate(match.date)} - {formatTime(match.date)}
              </div>
              <div className="text-xs text-muted-foreground">
                {match.competition} • {match.venue === "home" ? "Casa" : "Fuera"}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge className={getResultColor(match.result)}>
              {getResultText(match.result)}
            </Badge>
            <Badge className={getRatingColor(match.rating)}>
              {match.rating.toFixed(1)}
            </Badge>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-3">
          <div className="text-center">
            <div className="text-lg font-bold text-primary">{match.teamScore}</div>
            <div className="text-xs text-muted-foreground">Goles a favor</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-muted-foreground">{match.opponentScore}</div>
            <div className="text-xs text-muted-foreground">Goles en contra</div>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span>Formación:</span>
            <Badge variant="outline">{match.formation}</Badge>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span>Posesión:</span>
            <span>{match.tactics.possession}%</span>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span>Presión:</span>
            <Badge className={getTacticsColor(match.tactics.pressing)}>
              {getTacticsText(match.tactics.pressing)}
            </Badge>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span>Ritmo:</span>
            <Badge className={getTacticsColor(match.tactics.tempo)}>
              {getTacticsText(match.tactics.tempo)}
            </Badge>
          </div>
        </div>

        {match.substitutions.length > 0 && (
          <div className="mt-3 pt-3 border-t">
            <div className="text-xs font-medium mb-2">Sustituciones:</div>
            <div className="space-y-1">
              {match.substitutions.map((sub, index) => (
                <div key={index} className="flex items-center gap-2 text-xs">
                  <Clock className="h-3 w-3 text-muted-foreground" />
                  <span>{sub.minute}'</span>
                  <span className="text-muted-foreground">→</span>
                  <span className="truncate">{sub.reason === "tactical" ? "Táctica" : sub.reason}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )

  const renderFormationField = () => (
    <div className="bg-green-100 rounded-lg p-6 relative overflow-hidden">
      {/* Campo de fútbol */}
      <div className="relative w-full h-96 bg-green-200 rounded-lg border-4 border-white">
        {/* Líneas del campo */}
        <div className="absolute inset-0">
          {/* Línea central */}
          <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-white"></div>
          <div className="absolute top-1/2 left-1/2 w-2 h-2 bg-white rounded-full -translate-x-1 -translate-y-1"></div>
          
          {/* Áreas */}
          <div className="absolute top-0 left-1/4 right-1/4 h-16 border-l-2 border-r-2 border-b-2 border-white"></div>
          <div className="absolute bottom-0 left-1/4 right-1/4 h-16 border-l-2 border-r-2 border-t-2 border-white"></div>
          
          {/* Círculo central */}
          <div className="absolute top-1/2 left-1/2 w-16 h-16 border-2 border-white rounded-full -translate-x-1/2 -translate-y-1/2"></div>
        </div>

        {/* Jugadores */}
        <div className="absolute inset-0 p-4">
          {/* Portero */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
              GK
            </div>
            <div className="text-xs text-center mt-1 font-medium">Miguel</div>
          </div>

          {/* Defensas */}
          <div className="absolute bottom-16 left-8">
            <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
              LB
            </div>
            <div className="text-xs text-center mt-1">Carlos</div>
          </div>
          <div className="absolute bottom-16 left-1/3">
            <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
              CB
            </div>
            <div className="text-xs text-center mt-1">Antonio</div>
          </div>
          <div className="absolute bottom-16 right-1/3">
            <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
              CB
            </div>
            <div className="text-xs text-center mt-1">David</div>
          </div>
          <div className="absolute bottom-16 right-8">
            <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
              RB
            </div>
            <div className="text-xs text-center mt-1">Jorge</div>
          </div>

          {/* Mediocampistas */}
          <div className="absolute bottom-24 left-1/4">
            <div className="w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
              CDM
            </div>
            <div className="text-xs text-center mt-1">Sergio</div>
          </div>
          <div className="absolute bottom-24 left-1/2 -translate-x-1/2">
            <div className="w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
              CM
            </div>
            <div className="text-xs text-center mt-1">Luis</div>
          </div>
          <div className="absolute bottom-24 right-1/4">
            <div className="w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
              CM
            </div>
            <div className="text-xs text-center mt-1">Pedro</div>
          </div>

          {/* Delanteros */}
          <div className="absolute bottom-32 left-1/4">
            <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
              LW
            </div>
            <div className="text-xs text-center mt-1">Álvaro</div>
          </div>
          <div className="absolute bottom-32 left-1/2 -translate-x-1/2">
            <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
              ST
            </div>
            <div className="text-xs text-center mt-1">Diego</div>
          </div>
          <div className="absolute bottom-32 right-1/4">
            <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
              RW
            </div>
            <div className="text-xs text-center mt-1">Marco</div>
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <div className="space-y-6">
      {/* Header con estadísticas principales */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">{coachStats.wins}</div>
            <div className="text-sm text-muted-foreground">Victorias</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-yellow-600">{coachStats.draws}</div>
            <div className="text-sm text-muted-foreground">Empates</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-red-600">{coachStats.losses}</div>
            <div className="text-sm text-muted-foreground">Derrotas</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-primary">{coachStats.winRate}%</div>
            <div className="text-sm text-muted-foreground">% Victorias</div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Resumen</TabsTrigger>
          <TabsTrigger value="matches">Últimos Partidos</TabsTrigger>
          <TabsTrigger value="formation">Alineación Ideal</TabsTrigger>
          <TabsTrigger value="tactics">Tácticas</TabsTrigger>
          <TabsTrigger value="scouting">Análisis de Jugadores</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Estadísticas Generales */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-primary" />
                  Estadísticas Generales
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Partidos Totales</span>
                    <span className="font-bold">{coachStats.totalMatches}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Goles a Favor</span>
                    <span className="font-bold text-green-600">{coachStats.goalsFor}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Goles en Contra</span>
                    <span className="font-bold text-red-600">{coachStats.goalsAgainst}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Diferencia de Goles</span>
                    <span className="font-bold text-primary">{coachStats.goalDifference}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Portería a Cero</span>
                    <span className="font-bold text-green-600">{coachStats.cleanSheets}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Racha Actual */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  Racha Actual
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex gap-2 mb-4">
                  {coachStats.recentForm.map((result, index) => (
                    <div key={index} className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold ${
                      result === "W" ? "bg-green-500" : result === "D" ? "bg-yellow-500" : "bg-red-500"
                    }`}>
                      {result}
                    </div>
                  ))}
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>En Casa:</span>
                    <span>{coachStats.homeRecord.wins}V-{coachStats.homeRecord.draws}E-{coachStats.homeRecord.losses}D</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Fuera:</span>
                    <span>{coachStats.awayRecord.wins}V-{coachStats.awayRecord.draws}E-{coachStats.awayRecord.losses}D</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Formaciones Utilizadas */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5 text-primary" />
                  Formaciones
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {coachStats.formations.map((formation, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">{formation.formation}</div>
                        <div className="text-xs text-muted-foreground">{formation.matches} partidos</div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold">{formation.winRate}%</div>
                        <div className="text-xs text-muted-foreground">
                          {formation.wins}V-{formation.draws}E-{formation.losses}D
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Gestión de Jugadores */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-primary" />
                  Gestión de Jugadores
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Sustituciones Totales</span>
                    <span className="font-bold">{coachStats.playerManagement.totalSubstitutions}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Tácticas</span>
                    <span className="font-bold">{coachStats.playerManagement.tacticalSubstitutions}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Por Lesión</span>
                    <span className="font-bold">{coachStats.playerManagement.injurySubstitutions}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Minuto Promedio</span>
                    <span className="font-bold">{coachStats.playerManagement.averageSubstitutionMinute}'</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="matches" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {coachMatches.map(renderMatchCard)}
          </div>
        </TabsContent>

        <TabsContent value="formation" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trophy className="h-5 w-5 text-primary" />
                {idealFormation.name}
              </CardTitle>
              <CardDescription>
                Formación: {idealFormation.formation} • Efectividad: {idealFormation.effectiveness}%
              </CardDescription>
            </CardHeader>
            <CardContent>
              {renderFormationField()}
              
              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-3">Instrucciones Tácticas</h4>
                  <ul className="space-y-1">
                    {idealFormation.tactics.instructions.map((instruction, index) => (
                      <li key={index} className="text-sm flex items-center gap-2">
                        <CheckCircle className="h-3 w-3 text-green-500" />
                        {instruction}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-3">Fortalezas</h4>
                  <ul className="space-y-1">
                    {idealFormation.tactics.strengths.map((strength, index) => (
                      <li key={index} className="text-sm flex items-center gap-2">
                        <Star className="h-3 w-3 text-yellow-500" />
                        {strength}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tactics" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <RefreshCw className="h-5 w-5 text-primary" />
                  Cambios Tácticos
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {coachStats.tacticalChanges.map((change, index) => (
                    <div key={index} className="p-3 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium capitalize">{change.type}</span>
                        <Badge className="bg-green-100 text-green-800">
                          {change.successRate}% éxito
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{change.description}</p>
                      <div className="text-xs text-muted-foreground">
                        {change.matches} partidos
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-primary" />
                  Análisis de Rendimiento
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Efectividad Táctica</span>
                      <span>75%</span>
                    </div>
                    <Progress value={75} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Gestión de Sustituciones</span>
                      <span>80%</span>
                    </div>
                    <Progress value={80} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Adaptación al Rival</span>
                      <span>70%</span>
                    </div>
                    <Progress value={70} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="scouting" className="space-y-4">
          <PlayerScoutingView />
        </TabsContent>
      </Tabs>
    </div>
  )
}
