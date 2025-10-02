"use client"

import { useAuth } from "@/contexts/auth-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  Trophy, 
  Users, 
  Calendar, 
  BarChart3, 
  Clock, 
  Activity,
  FileText,
  Heart,
  Shield,
  Star,
  User,
  CheckCircle,
  AlertCircle,
  Play,
  Map
} from "lucide-react"
import { 
  coachDashboardData, 
  ownerDashboardData, 
  playerDashboardData, 
  fanDashboardData,
  type DashboardStats 
} from "@/lib/mock-data"

const iconMap = {
  Trophy,
  Users,
  Calendar,
  BarChart3,
  Clock,
  Activity,
  FileText,
  Heart,
  Shield,
  Star,
  User,
  CheckCircle,
  AlertCircle,
  Play,
  Map
}

interface DashboardViewProps {
  onViewChange?: (view: string) => void
}

export function DashboardView({ onViewChange }: DashboardViewProps) {
  const { user } = useAuth()

  if (!user) return null

  const getDashboardData = (): DashboardStats => {
    switch (user.type) {
      case "coach":
        return coachDashboardData
      case "owner":
        return ownerDashboardData
      case "player":
        return playerDashboardData
      case "fan":
        return fanDashboardData
      default:
        return coachDashboardData
    }
  }

  const getRoleInfo = () => {
    switch (user.type) {
      case "coach":
        return {
          title: "Panel de Entrenador",
          description: "Gestiona tus equipos y estrategias",
          icon: Shield,
          color: "text-green-600"
        }
      case "owner":
        return {
          title: "Panel de Administrador",
          description: "Administra torneos y coordina la liga",
          icon: Star,
          color: "text-purple-600"
        }
      case "player":
        return {
          title: "Mi Panel",
          description: "Sigue tu progreso y rendimiento",
          icon: User,
          color: "text-green-600"
        }
      case "fan":
        return {
          title: "Panel de Aficionado",
          description: "Sigue a tus equipos favoritos",
          icon: Heart,
          color: "text-red-600"
        }
      default:
        return {
          title: "Dashboard",
          description: "Panel principal",
          icon: Activity,
          color: "text-primary"
        }
    }
  }

  const data = getDashboardData()
  const roleInfo = getRoleInfo()
  const RoleIcon = roleInfo.icon

  const getStatusIcon = (status?: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "upcoming":
        return <Clock className="h-4 w-4 text-green-500" />
      case "live":
        return <Play className="h-4 w-4 text-red-500" />
      default:
        return <Activity className="h-4 w-4 text-gray-500" />
    }
  }

  const getStatusBadge = (status?: string) => {
    switch (status) {
      case "completed":
        return <Badge variant="secondary" className="bg-green-100 text-green-800">Completado</Badge>
      case "upcoming":
        return <Badge variant="secondary" className="bg-green-100 text-green-800">Próximo</Badge>
      case "live":
        return <Badge variant="destructive">En Vivo</Badge>
      default:
        return <Badge variant="outline">General</Badge>
    }
  }

  const formatDate = (timestamp: string) => {
    return new Date(timestamp).toLocaleDateString('es-ES', {
      day: 'numeric',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <div className={`p-3 rounded-lg bg-muted ${roleInfo.color}`}>
          <RoleIcon className="h-8 w-8" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-foreground">{roleInfo.title}</h1>
          <p className="text-muted-foreground">{roleInfo.description}</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Torneos</CardTitle>
            <Trophy className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.totalTournaments}</div>
            <p className="text-xs text-muted-foreground">
              {user.type === "fan" ? "Seguidos" : "Activos"}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Equipos</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.totalTeams}</div>
            <p className="text-xs text-muted-foreground">
              {user.type === "fan" ? "Favoritos" : "Gestionados"}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Partidos</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.totalMatches}</div>
            <p className="text-xs text-muted-foreground">Total jugados</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Próximos</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.upcomingMatches}</div>
            <p className="text-xs text-muted-foreground">Partidos próximos</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              Actividad Reciente
            </CardTitle>
            <CardDescription>
              Últimas actualizaciones y eventos
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {data.recentActivity.map((activity) => {
                const IconComponent = iconMap[activity.type === "match" ? "Calendar" : 
                  activity.type === "tournament" ? "Trophy" : 
                  activity.type === "team" ? "Users" : "User"] as any
                
                return (
                  <div key={activity.id} className="flex items-start gap-3 p-3 rounded-lg border">
                    <div className="flex-shrink-0">
                      <IconComponent className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-medium text-foreground truncate">
                          {activity.title}
                        </h4>
                        {getStatusIcon(activity.status)}
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        {activity.description}
                      </p>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-xs text-muted-foreground">
                          {formatDate(activity.timestamp)}
                        </span>
                        {getStatusBadge(activity.status)}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Acciones Rápidas
            </CardTitle>
            <CardDescription>
              Accesos directos a funciones principales
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-3">
              {data.quickActions.map((action) => {
                const IconComponent = iconMap[action.icon as keyof typeof iconMap] as any
                
                return (
                  <Button
                    key={action.id}
                    variant="outline"
                    className="h-auto p-4 justify-start text-left"
                    onClick={() => {
                      if (onViewChange) {
                        onViewChange(action.action)
                      } else {
                        console.log(`Action: ${action.action}`)
                      }
                    }}
                  >
                    <div className="flex items-start gap-3">
                      <IconComponent className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <div className="flex-1">
                        <div className="font-medium">{action.title}</div>
                        <div className="text-sm text-muted-foreground mt-1">
                          {action.description}
                        </div>
                      </div>
                    </div>
                  </Button>
                )
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
