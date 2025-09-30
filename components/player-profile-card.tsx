"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { 
  mockPlayerProfile,
  type PlayerProfile 
} from "@/lib/mock-data"
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
  Ruler,
  Weight,
  Footprints,
  Calendar as CalendarIcon
} from "lucide-react"

interface PlayerProfileCardProps {
  profile: PlayerProfile
}

export function PlayerProfileCard({ profile }: PlayerProfileCardProps) {
  const getPositionText = (position: string) => {
    switch (position) {
      case "GK": return "Portero"
      case "DEF": return "Defensa"
      case "MID": return "Mediocampista"
      case "FWD": return "Delantero"
      default: return position
    }
  }

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
    if (overall >= 90) return "text-green-600"
    if (overall >= 80) return "text-green-600"
    if (overall >= 70) return "text-yellow-600"
    return "text-gray-600"
  }

  const getStatColor = (value: number) => {
    if (value >= 85) return "text-green-600"
    if (value >= 75) return "text-green-600"
    if (value >= 65) return "text-yellow-600"
    return "text-gray-600"
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long'
    })
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Card Principal Estilo FIFA */}
      <Card className="relative overflow-hidden bg-gradient-to-br from-green-600 via-green-700 to-green-800 text-white">
        {/* Patrón de fondo - Césped */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-green-400 to-green-600 rounded-full -translate-y-48 translate-x-48"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-green-500 to-green-700 rounded-full translate-y-32 -translate-x-32"></div>
          {/* Líneas del campo */}
          <div className="absolute inset-0">
            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-white/30"></div>
            <div className="absolute top-1/4 left-0 right-0 h-0.5 bg-white/20"></div>
            <div className="absolute top-3/4 left-0 right-0 h-0.5 bg-white/20"></div>
            <div className="absolute top-1/2 left-1/4 w-0.5 h-32 bg-white/20 -translate-y-16"></div>
            <div className="absolute top-1/2 right-1/4 w-0.5 h-32 bg-white/20 -translate-y-16"></div>
          </div>
        </div>

        <CardContent className="relative p-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Información del Jugador */}
            <div className="lg:col-span-1 space-y-6">
              {/* Avatar y Info Básica */}
              <div className="text-center">
                <div className="relative inline-block">
                  <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white/20 shadow-2xl">
                    <img 
                      src={profile.avatar} 
                      alt={profile.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute -top-2 -right-2">
                    <Badge className={`${getPositionColor(profile.position)} text-sm font-bold px-3 py-1`}>
                      #{profile.jerseyNumber}
                    </Badge>
                  </div>
                </div>
                
                <h1 className="text-3xl font-bold mt-4 text-white">{profile.name}</h1>
                <div className="flex items-center justify-center gap-2 mt-2">
                  <Badge className={`${getPositionColor(profile.position)} text-sm`}>
                    {getPositionText(profile.position)}
                  </Badge>
                  <Badge variant="outline" className="text-white border-white/30">
                    {profile.age} años
                  </Badge>
                </div>
              </div>

              {/* Información Personal */}
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm">
                  <MapPin className="h-4 w-4 text-green-400" />
                  <span>{profile.nationality}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Ruler className="h-4 w-4 text-green-400" />
                  <span>{profile.height} cm</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Weight className="h-4 w-4 text-orange-400" />
                  <span>{profile.weight} kg</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Footprints className="h-4 w-4 text-purple-400" />
                  <span>Pie {profile.preferredFoot === "right" ? "Derecho" : profile.preferredFoot === "left" ? "Izquierdo" : "Ambidiestro"}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Users className="h-4 w-4 text-yellow-400" />
                  <span>{profile.team}</span>
                </div>
              </div>

              {/* Información del Contrato */}
              <div className="bg-white/10 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <CalendarIcon className="h-4 w-4 text-green-400" />
                  <span className="text-sm text-white/80">Contrato</span>
                </div>
                <div className="text-sm text-white/90">
                  Hasta {formatDate(profile.contractUntil)}
                </div>
                <div className="text-xs text-white/60 mt-1">
                  Desde {formatDate(profile.joinedDate)}
                </div>
              </div>
            </div>

            {/* Estadísticas FIFA */}
            <div className="lg:col-span-2 space-y-6">
              {/* Overall Rating */}
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 shadow-2xl">
                  <span className={`text-3xl font-bold ${getOverallColor(profile.overall)}`}>
                    {profile.overall}
                  </span>
                </div>
                <div className="text-sm text-white/80 mt-2">Overall Rating</div>
              </div>

              {/* Estadísticas Principales */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Zap className="h-4 w-4 text-yellow-400" />
                      <span className="text-sm">Ritmo</span>
                    </div>
                    <span className={`font-bold ${getStatColor(profile.pace)}`}>{profile.pace}</span>
                  </div>
                  <Progress value={profile.pace} className="h-2" />

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Target className="h-4 w-4 text-red-400" />
                      <span className="text-sm">Disparo</span>
                    </div>
                    <span className={`font-bold ${getStatColor(profile.shooting)}`}>{profile.shooting}</span>
                  </div>
                  <Progress value={profile.shooting} className="h-2" />

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Activity className="h-4 w-4 text-green-400" />
                      <span className="text-sm">Pase</span>
                    </div>
                    <span className={`font-bold ${getStatColor(profile.passing)}`}>{profile.passing}</span>
                  </div>
                  <Progress value={profile.passing} className="h-2" />
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <TrendingUp className="h-4 w-4 text-purple-400" />
                      <span className="text-sm">Regate</span>
                    </div>
                    <span className={`font-bold ${getStatColor(profile.dribbling)}`}>{profile.dribbling}</span>
                  </div>
                  <Progress value={profile.dribbling} className="h-2" />

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Shield className="h-4 w-4 text-green-400" />
                      <span className="text-sm">Defensa</span>
                    </div>
                    <span className={`font-bold ${getStatColor(profile.defending)}`}>{profile.defending}</span>
                  </div>
                  <Progress value={profile.defending} className="h-2" />

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <BarChart3 className="h-4 w-4 text-orange-400" />
                      <span className="text-sm">Físico</span>
                    </div>
                    <span className={`font-bold ${getStatColor(profile.physical)}`}>{profile.physical}</span>
                  </div>
                  <Progress value={profile.physical} className="h-2" />
                </div>
              </div>

              {/* Estadísticas de Temporada */}
              <div className="bg-white/10 rounded-lg p-4">
                <h3 className="text-lg font-semibold mb-4 text-white">Temporada 2024</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-red-400">{profile.goals}</div>
                    <div className="text-xs text-white/80">Goles</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-400">{profile.assists}</div>
                    <div className="text-xs text-white/80">Asistencias</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-400">{profile.matches}</div>
                    <div className="text-xs text-white/80">Partidos</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-yellow-400">{profile.minutes}</div>
                    <div className="text-xs text-white/80">Minutos</div>
                  </div>
                </div>
                
                {/* Tarjetas */}
                <div className="flex justify-center gap-4 mt-4">
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <span className="text-sm text-white/80">{profile.yellowCards}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <span className="text-sm text-white/80">{profile.redCards}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
