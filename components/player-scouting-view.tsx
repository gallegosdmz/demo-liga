"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  mockLeaguePlayers,
  type LeaguePlayer 
} from "@/lib/mock-data"
import { 
  Search,
  Filter,
  Star,
  Target,
  Eye,
  Calendar,
  Euro,
  MapPin,
  Clock,
  Trophy,
  Award,
  TrendingUp,
  Users,
  BarChart3,
  Zap,
  Shield,
  Crosshair,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Heart,
  Bookmark,
  Share2
} from "lucide-react"

export function PlayerScoutingView() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedPosition, setSelectedPosition] = useState("all")
  const [selectedInterest, setSelectedInterest] = useState("all")
  const [sortBy, setSortBy] = useState("overall")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

  const positions = [
    { id: "all", label: "Todas", icon: "⚽" },
    { id: "GK", label: "Porteros", icon: "🥅" },
    { id: "DEF", label: "Defensas", icon: "🛡️" },
    { id: "MID", label: "Mediocampistas", icon: "⚡" },
    { id: "FWD", label: "Delanteros", icon: "⚽" }
  ]

  const interestLevels = [
    { id: "all", label: "Todos", color: "bg-gray-100" },
    { id: "very_high", label: "Muy Alto", color: "bg-red-100 text-red-800" },
    { id: "high", label: "Alto", color: "bg-orange-100 text-orange-800" },
    { id: "medium", label: "Medio", color: "bg-yellow-100 text-yellow-800" },
    { id: "low", label: "Bajo", color: "bg-green-100 text-green-800" }
  ]

  const sortOptions = [
    { id: "overall", label: "Overall" },
    { id: "goals", label: "Goles" },
    { id: "assists", label: "Asistencias" },
    { id: "age", label: "Edad" }
  ]

  const filteredPlayers = mockLeaguePlayers
    .filter(player => {
      const matchesSearch = player.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           player.team.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesPosition = selectedPosition === "all" || player.position === selectedPosition
      const matchesInterest = selectedInterest === "all" || player.interestLevel === selectedInterest
      return matchesSearch && matchesPosition && matchesInterest
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "goals":
          return b.goals - a.goals
        case "assists":
          return b.assists - a.assists
        case "age":
          return a.age - b.age
        default:
          return b.overall - a.overall
      }
    })

  const getPositionColor = (position: string) => {
    switch (position) {
      case "GK": return "bg-green-100 text-green-800"
      case "DEF": return "bg-green-100 text-green-800"
      case "MID": return "bg-yellow-100 text-yellow-800"
      case "FWD": return "bg-red-100 text-red-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  const getOverallColor = (overall: number) => {
    if (overall >= 90) return "text-green-600 bg-green-100"
    if (overall >= 85) return "text-green-600 bg-green-100"
    if (overall >= 80) return "text-yellow-600 bg-yellow-100"
    return "text-orange-600 bg-orange-100"
  }

  const getInterestIcon = (level: string) => {
    switch (level) {
      case "very_high": return <Heart className="h-4 w-4 text-red-500" />
      case "high": return <Target className="h-4 w-4 text-orange-500" />
      case "medium": return <Eye className="h-4 w-4 text-yellow-500" />
      case "low": return <Bookmark className="h-4 w-4 text-green-500" />
      default: return <Eye className="h-4 w-4 text-gray-500" />
    }
  }


  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    })
  }

  const renderPlayerCard = (player: LeaguePlayer) => (
    <Card key={player.id} className="hover:shadow-lg transition-all duration-300 group">
      <CardContent className="p-4">
        <div className="flex items-start gap-4 mb-4">
          <div className="relative">
            <img 
              src={player.avatar} 
              alt={player.name}
              className="w-16 h-16 rounded-full object-cover border-2 border-gray-200"
            />
            <div className={`absolute -top-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${getOverallColor(player.overall)}`}>
              {player.overall}
            </div>
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-semibold text-lg truncate">{player.name}</h3>
              {getInterestIcon(player.interestLevel)}
            </div>
            <div className="flex items-center gap-2 mb-2">
              <Badge className={getPositionColor(player.position)}>
                {player.position}
              </Badge>
              <span className="text-sm text-muted-foreground">{player.age} años</span>
              <span className="text-sm text-muted-foreground">•</span>
              <span className="text-sm text-muted-foreground">{player.nationality}</span>
            </div>
            <div className="text-sm text-muted-foreground mb-2">{player.team}</div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground">
                Contrato hasta {formatDate(player.contractUntil)}
              </span>
            </div>
          </div>
        </div>

        {/* Estadísticas principales */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="text-center p-2 bg-gray-50 rounded-lg">
            <div className="text-lg font-bold text-primary">{player.goals}</div>
            <div className="text-xs text-muted-foreground">Goles</div>
          </div>
          <div className="text-center p-2 bg-gray-50 rounded-lg">
            <div className="text-lg font-bold text-primary">{player.assists}</div>
            <div className="text-xs text-muted-foreground">Asistencias</div>
          </div>
          <div className="text-center p-2 bg-gray-50 rounded-lg">
            <div className="text-lg font-bold text-primary">{player.matches}</div>
            <div className="text-xs text-muted-foreground">Partidos</div>
          </div>
          <div className="text-center p-2 bg-gray-50 rounded-lg">
            <div className="text-lg font-bold text-primary">{player.passAccuracy}%</div>
            <div className="text-xs text-muted-foreground">Pases</div>
          </div>
        </div>

        {/* Estadísticas específicas por posición */}
        {player.position === "GK" && (
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="text-center p-2 bg-green-50 rounded-lg">
              <div className="text-lg font-bold text-green-600">{player.saves}</div>
              <div className="text-xs text-muted-foreground">Paradas</div>
            </div>
            <div className="text-center p-2 bg-green-50 rounded-lg">
              <div className="text-lg font-bold text-green-600">{player.cleanSheets}</div>
              <div className="text-xs text-muted-foreground">Portería a cero</div>
            </div>
          </div>
        )}

        {/* Fortalezas y debilidades */}
        <div className="space-y-2 mb-4">
          <div>
            <div className="text-xs font-medium text-green-600 mb-1">Fortalezas</div>
            <div className="flex flex-wrap gap-1">
              {player.strengths.slice(0, 3).map((strength, index) => (
                <Badge key={index} variant="outline" className="text-xs bg-green-50 text-green-700">
                  {strength}
                </Badge>
              ))}
            </div>
          </div>
          <div>
            <div className="text-xs font-medium text-red-600 mb-1">Debilidades</div>
            <div className="flex flex-wrap gap-1">
              {player.weaknesses.slice(0, 2).map((weakness, index) => (
                <Badge key={index} variant="outline" className="text-xs bg-red-50 text-red-700">
                  {weakness}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        {/* Acciones */}
        <div className="flex gap-2">
          <Button size="sm" variant="outline" className="flex-1">
            <Eye className="h-3 w-3 mr-1" />
            Ver Perfil
          </Button>
          <Button size="sm" variant="outline">
            <Share2 className="h-3 w-3" />
          </Button>
          <Button size="sm" variant="outline">
            <Bookmark className="h-3 w-3" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )

  const renderPlayerList = (player: LeaguePlayer) => (
    <Card key={player.id} className="hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="flex items-center gap-4">
          <div className="relative">
            <img 
              src={player.avatar} 
              alt={player.name}
              className="w-12 h-12 rounded-full object-cover border-2 border-gray-200"
            />
            <div className={`absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold ${getOverallColor(player.overall)}`}>
              {player.overall}
            </div>
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-semibold truncate">{player.name}</h3>
              {getInterestIcon(player.interestLevel)}
              <Badge className={getPositionColor(player.position)}>
                {player.position}
              </Badge>
            </div>
            <div className="text-sm text-muted-foreground">{player.team} • {player.age} años • {player.nationality}</div>
          </div>

          <div className="flex items-center gap-6 text-sm">
            <div className="text-center">
              <div className="font-bold text-primary">{player.goals}</div>
              <div className="text-xs text-muted-foreground">Goles</div>
            </div>
            <div className="text-center">
              <div className="font-bold text-primary">{player.assists}</div>
              <div className="text-xs text-muted-foreground">Asistencias</div>
            </div>
            <div className="text-center">
              <div className="font-bold text-primary">{player.matches}</div>
              <div className="text-xs text-muted-foreground">Partidos</div>
            </div>
            <div className="text-center">
              <div className="font-bold text-primary">{player.passAccuracy}%</div>
              <div className="text-xs text-muted-foreground">Pases</div>
            </div>
          </div>

          <div className="flex gap-2">
            <Button size="sm" variant="outline">
              <Eye className="h-3 w-3" />
            </Button>
            <Button size="sm" variant="outline">
              <Bookmark className="h-3 w-3" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Análisis de Jugadores</h1>
          <p className="text-muted-foreground">Scouting y análisis de los mejores jugadores de la liga</p>
        </div>
        <div className="flex gap-2">
          <Button
            variant={viewMode === "grid" ? "default" : "outline"}
            size="sm"
            onClick={() => setViewMode("grid")}
          >
            <BarChart3 className="h-4 w-4 mr-1" />
            Grid
          </Button>
          <Button
            variant={viewMode === "list" ? "default" : "outline"}
            size="sm"
            onClick={() => setViewMode("list")}
          >
            <Users className="h-4 w-4 mr-1" />
            Lista
          </Button>
        </div>
      </div>

      {/* Filtros */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar jugador o equipo..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <div className="flex gap-2">
              <select
                value={selectedPosition}
                onChange={(e) => setSelectedPosition(e.target.value)}
                className="px-3 py-2 border border-input bg-background rounded-md text-sm"
              >
                {positions.map(pos => (
                  <option key={pos.id} value={pos.id}>
                    {pos.icon} {pos.label}
                  </option>
                ))}
              </select>
              
              <select
                value={selectedInterest}
                onChange={(e) => setSelectedInterest(e.target.value)}
                className="px-3 py-2 border border-input bg-background rounded-md text-sm"
              >
                {interestLevels.map(level => (
                  <option key={level.id} value={level.id}>
                    {level.label}
                  </option>
                ))}
              </select>
              
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 border border-input bg-background rounded-md text-sm"
              >
                {sortOptions.map(option => (
                  <option key={option.id} value={option.id}>
                    Ordenar por {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Estadísticas rápidas */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-primary">{filteredPlayers.length}</div>
            <div className="text-sm text-muted-foreground">Jugadores</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">
              {filteredPlayers.filter(p => p.isTarget).length}
            </div>
            <div className="text-sm text-muted-foreground">Objetivos</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">
              {Math.round(filteredPlayers.reduce((acc, p) => acc + p.overall, 0) / filteredPlayers.length) || 0}
            </div>
            <div className="text-sm text-muted-foreground">Overall Promedio</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-yellow-600">
              {Math.round(filteredPlayers.reduce((acc, p) => acc + p.passAccuracy, 0) / filteredPlayers.length) || 0}%
            </div>
            <div className="text-sm text-muted-foreground">Precisión Promedio</div>
          </CardContent>
        </Card>
      </div>

      {/* Lista de jugadores */}
      <div className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" : "space-y-2"}>
        {filteredPlayers.map(viewMode === "grid" ? renderPlayerCard : renderPlayerList)}
      </div>

      {filteredPlayers.length === 0 && (
        <Card>
          <CardContent className="p-8 text-center">
            <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No se encontraron jugadores</h3>
            <p className="text-muted-foreground">Intenta ajustar los filtros de búsqueda</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
