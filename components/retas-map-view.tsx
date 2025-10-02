"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { 
  MapPin, 
  Clock, 
  Users, 
  Star, 
  Filter, 
  Search,
  Calendar,
  DollarSign,
  Map,
  List,
  UserPlus,
  Info,
  Zap,
  Target,
  Trophy
} from "lucide-react"
import { mockCourts, mockRetas, type Court, type Reta } from "@/lib/mock-data"
import { InteractiveMap } from "@/components/interactive-map"

export function RetasMapView() {
  const [selectedView, setSelectedView] = useState<"map" | "list">("map")
  const [selectedReta, setSelectedReta] = useState<Reta | null>(null)
  const [filteredRetas, setFilteredRetas] = useState<Reta[]>(mockRetas)
  const [filters, setFilters] = useState({
    skillLevel: "all",
    maxPrice: "all",
    date: "all"
  })
  const [searchTerm, setSearchTerm] = useState("")

  // Filtrar retas basado en los filtros y búsqueda
  useEffect(() => {
    let filtered = mockRetas

    // Filtro por nivel de habilidad
    if (filters.skillLevel !== "all") {
      filtered = filtered.filter(reta => reta.skillLevel === filters.skillLevel)
    }

    // Filtro por precio máximo
    if (filters.maxPrice !== "all") {
      const maxPrice = parseInt(filters.maxPrice)
      filtered = filtered.filter(reta => reta.price <= maxPrice)
    }

    // Filtro por fecha
    if (filters.date !== "all") {
      const today = new Date()
      const tomorrow = new Date(today)
      tomorrow.setDate(tomorrow.getDate() + 1)
      const nextWeek = new Date(today)
      nextWeek.setDate(nextWeek.getDate() + 7)

      filtered = filtered.filter(reta => {
        const retaDate = new Date(reta.date)
        switch (filters.date) {
          case "today":
            return retaDate.toDateString() === today.toDateString()
          case "tomorrow":
            return retaDate.toDateString() === tomorrow.toDateString()
          case "this_week":
            return retaDate >= today && retaDate <= nextWeek
          default:
            return true
        }
      })
    }

    // Filtro por término de búsqueda
    if (searchTerm) {
      filtered = filtered.filter(reta => 
        reta.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        reta.courtName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        reta.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    setFilteredRetas(filtered)
  }, [filters, searchTerm])

  const getSkillLevelColor = (level: string) => {
    switch (level) {
      case "beginner":
        return "bg-green-100 text-green-800"
      case "intermediate":
        return "bg-yellow-100 text-yellow-800"
      case "advanced":
        return "bg-orange-100 text-orange-800"
      case "professional":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getSkillLevelLabel = (level: string) => {
    switch (level) {
      case "beginner":
        return "Principiante"
      case "intermediate":
        return "Intermedio"
      case "advanced":
        return "Avanzado"
      case "professional":
        return "Profesional"
      default:
        return level
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "open":
        return "bg-green-100 text-green-800"
      case "full":
        return "bg-yellow-100 text-yellow-800"
      case "started":
        return "bg-blue-100 text-blue-800"
      case "completed":
        return "bg-gray-100 text-gray-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "open":
        return "Abierto"
      case "full":
        return "Completo"
      case "started":
        return "En curso"
      case "completed":
        return "Finalizado"
      case "cancelled":
        return "Cancelado"
      default:
        return status
    }
  }

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('es-ES', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const handleJoinReta = (reta: Reta) => {
    // Aquí se implementaría la lógica para unirse a la reta
    console.log("Unirse a reta:", reta.id)
    // Simular éxito
    alert(`Te has unido exitosamente a "${reta.title}"`)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <div className="p-3 rounded-lg bg-muted text-green-600">
          <Map className="h-8 w-8" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-foreground">Retas y Canchas</h1>
          <p className="text-muted-foreground">Encuentra partidos amistosos cerca de ti</p>
        </div>
      </div>

      {/* Controles */}
      <div className="flex flex-col md:flex-row gap-4">
        {/* Búsqueda */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Buscar canchas o retas..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Filtros */}
        <div className="flex gap-2">
          <Select value={filters.skillLevel} onValueChange={(value) => setFilters({...filters, skillLevel: value})}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Nivel" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos los niveles</SelectItem>
              <SelectItem value="beginner">Principiante</SelectItem>
              <SelectItem value="intermediate">Intermedio</SelectItem>
              <SelectItem value="advanced">Avanzado</SelectItem>
              <SelectItem value="professional">Profesional</SelectItem>
            </SelectContent>
          </Select>

          <Select value={filters.maxPrice} onValueChange={(value) => setFilters({...filters, maxPrice: value})}>
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Precio" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Cualquier precio</SelectItem>
              <SelectItem value="10">Hasta S/10</SelectItem>
              <SelectItem value="20">Hasta S/20</SelectItem>
              <SelectItem value="30">Hasta S/30</SelectItem>
              <SelectItem value="50">Hasta S/50</SelectItem>
            </SelectContent>
          </Select>

          <Select value={filters.date} onValueChange={(value) => setFilters({...filters, date: value})}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Fecha" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Cualquier fecha</SelectItem>
              <SelectItem value="today">Hoy</SelectItem>
              <SelectItem value="tomorrow">Mañana</SelectItem>
              <SelectItem value="this_week">Esta semana</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Toggle Vista */}
        <div className="flex border rounded-lg">
          <Button
            variant={selectedView === "map" ? "default" : "ghost"}
            size="sm"
            onClick={() => setSelectedView("map")}
            className="rounded-r-none"
          >
            <Map className="h-4 w-4 mr-2" />
            Mapa
          </Button>
          <Button
            variant={selectedView === "list" ? "default" : "ghost"}
            size="sm"
            onClick={() => setSelectedView("list")}
            className="rounded-l-none"
          >
            <List className="h-4 w-4 mr-2" />
            Lista
          </Button>
        </div>
      </div>

      {/* Vista del Mapa */}
      {selectedView === "map" && (
        <div className="space-y-4">
          <InteractiveMap 
            onRetaSelect={setSelectedReta}
            onCourtSelect={(court) => {
              // Aquí podrías mostrar información de la cancha
              console.log("Cancha seleccionada:", court)
            }}
            selectedReta={selectedReta}
          />
        </div>
      )}

      {/* Vista de Lista */}
      {selectedView === "list" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">
              Retas Disponibles ({filteredRetas.length})
            </h2>
            <Badge variant="outline" className="flex items-center gap-1">
              <Filter className="h-3 w-3" />
              Filtros activos
            </Badge>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredRetas.map((reta) => (
              <Card key={reta.id} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg line-clamp-2">{reta.title}</CardTitle>
                      <CardDescription className="flex items-center gap-1 mt-1">
                        <MapPin className="h-3 w-3" />
                        {reta.courtName}
                      </CardDescription>
                    </div>
                    <Badge className={getStatusColor(reta.status)}>
                      {getStatusLabel(reta.status)}
                    </Badge>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  {/* Organizador */}
                  <div className="flex items-center gap-2">
                    <Avatar className="h-6 w-6">
                      <AvatarImage src={reta.organizerAvatar} />
                      <AvatarFallback>{reta.organizerName[0]}</AvatarFallback>
                    </Avatar>
                    <span className="text-sm text-muted-foreground">
                      Organizado por {reta.organizerName}
                    </span>
                  </div>

                  {/* Información del partido */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span>{formatDate(reta.date)}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span>{reta.startTime} - {reta.endTime}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <span>{reta.currentPlayers}/{reta.maxPlayers} jugadores</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <DollarSign className="h-4 w-4 text-muted-foreground" />
                      <span>S/ {reta.price} por jugador</span>
                    </div>
                  </div>

                  {/* Nivel de habilidad */}
                  <Badge className={getSkillLevelColor(reta.skillLevel)}>
                    {getSkillLevelLabel(reta.skillLevel)}
                  </Badge>

                  {/* Descripción */}
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {reta.description}
                  </p>

                  {/* Acciones */}
                  <div className="flex gap-2 pt-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm" className="flex-1">
                          <Info className="h-4 w-4 mr-2" />
                          Ver detalles
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                        <DialogHeader>
                          <DialogTitle>{reta.title}</DialogTitle>
                          <DialogDescription>
                            {reta.courtName} • {reta.courtAddress}
                          </DialogDescription>
                        </DialogHeader>
                        
                        <div className="space-y-4">
                          {/* Información básica */}
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <h4 className="font-medium mb-2">Información del Partido</h4>
                              <div className="space-y-1 text-sm">
                                <div className="flex items-center gap-2">
                                  <Calendar className="h-4 w-4" />
                                  {formatDate(reta.date)}
                                </div>
                                <div className="flex items-center gap-2">
                                  <Clock className="h-4 w-4" />
                                  {reta.startTime} - {reta.endTime}
                                </div>
                                <div className="flex items-center gap-2">
                                  <Users className="h-4 w-4" />
                                  {reta.currentPlayers}/{reta.maxPlayers} jugadores
                                </div>
                                <div className="flex items-center gap-2">
                                  <DollarSign className="h-4 w-4" />
                                  S/ {reta.price} por jugador
                                </div>
                              </div>
                            </div>
                            
                            <div>
                              <h4 className="font-medium mb-2">Organizador</h4>
                              <div className="flex items-center gap-2">
                                <Avatar>
                                  <AvatarImage src={reta.organizerAvatar} />
                                  <AvatarFallback>{reta.organizerName[0]}</AvatarFallback>
                                </Avatar>
                                <span>{reta.organizerName}</span>
                              </div>
                            </div>
                          </div>

                          {/* Jugadores actuales */}
                          <div>
                            <h4 className="font-medium mb-2">Jugadores Inscritos</h4>
                            <div className="grid grid-cols-2 gap-2">
                              {reta.players.map((player) => (
                                <div key={player.id} className="flex items-center gap-2 text-sm">
                                  <Avatar className="h-6 w-6">
                                    <AvatarImage src={player.avatar} />
                                    <AvatarFallback>{player.name[0]}</AvatarFallback>
                                  </Avatar>
                                  <div>
                                    <div className="font-medium">{player.name}</div>
                                    <div className="text-muted-foreground text-xs">
                                      {player.position} • {getSkillLevelLabel(player.skillLevel)}
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Reglas */}
                          <div>
                            <h4 className="font-medium mb-2">Reglas</h4>
                            <ul className="list-disc list-inside text-sm space-y-1">
                              {reta.rules.map((rule, index) => (
                                <li key={index}>{rule}</li>
                              ))}
                            </ul>
                          </div>

                          {/* Equipamiento */}
                          <div>
                            <h4 className="font-medium mb-2">Equipamiento Incluido</h4>
                            <div className="flex flex-wrap gap-1">
                              {reta.equipment.map((item, index) => (
                                <Badge key={index} variant="secondary">
                                  {item}
                                </Badge>
                              ))}
                            </div>
                          </div>

                          {/* Notas */}
                          {reta.notes && (
                            <div>
                              <h4 className="font-medium mb-2">Notas</h4>
                              <p className="text-sm text-muted-foreground">{reta.notes}</p>
                            </div>
                          )}
                        </div>

                        <div className="flex gap-2 pt-4">
                          <Button 
                            onClick={() => handleJoinReta(reta)}
                            disabled={reta.status !== "open" || reta.currentPlayers >= reta.maxPlayers}
                            className="flex-1"
                          >
                            <UserPlus className="h-4 w-4 mr-2" />
                            {reta.currentPlayers >= reta.maxPlayers ? "Completo" : "Unirse"}
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>

                    <Button 
                      size="sm" 
                      onClick={() => handleJoinReta(reta)}
                      disabled={reta.status !== "open" || reta.currentPlayers >= reta.maxPlayers}
                      className="flex-1"
                    >
                      <UserPlus className="h-4 w-4 mr-2" />
                      {reta.currentPlayers >= reta.maxPlayers ? "Completo" : "Unirse"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredRetas.length === 0 && (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <Trophy className="h-16 w-16 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">No se encontraron retas</h3>
                <p className="text-muted-foreground text-center max-w-md">
                  No hay retas que coincidan con tus filtros actuales. 
                  Intenta ajustar los criterios de búsqueda o crear una nueva reta.
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      )}
    </div>
  )
}
