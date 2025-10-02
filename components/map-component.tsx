"use client"

import { useEffect, useState } from "react"
import dynamic from "next/dynamic"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { 
  MapPin, 
  Clock, 
  Users, 
  Star, 
  DollarSign,
  Calendar,
  UserPlus
} from "lucide-react"
import { mockCourts, mockRetas, type Court, type Reta } from "@/lib/mock-data"

// Importar dinámicamente los componentes de Leaflet
const MapContainer = dynamic(() => import('react-leaflet').then(mod => mod.MapContainer), { ssr: false })
const TileLayer = dynamic(() => import('react-leaflet').then(mod => mod.TileLayer), { ssr: false })
const Marker = dynamic(() => import('react-leaflet').then(mod => mod.Marker), { ssr: false })
const Popup = dynamic(() => import('react-leaflet').then(mod => mod.Popup), { ssr: false })

interface MapComponentProps {
  onRetaSelect?: (reta: Reta) => void
  onCourtSelect?: (court: Court) => void
  selectedReta?: Reta | null
  selectedCourt?: Court | null
}

// Componente para los iconos personalizados de los marcadores
const createCustomIcon = (color: string, icon: string) => {
  if (typeof window === 'undefined') return null
  
  const L = require('leaflet')
  
  return L.divIcon({
    html: `
      <div style="
        background-color: ${color};
        width: 30px;
        height: 30px;
        border-radius: 50% 50% 50% 0;
        transform: rotate(-45deg);
        border: 2px solid white;
        box-shadow: 0 2px 4px rgba(0,0,0,0.3);
        display: flex;
        align-items: center;
        justify-content: center;
      ">
        <div style="
          transform: rotate(45deg);
          color: white;
          font-size: 14px;
          font-weight: bold;
        ">
          ${icon}
        </div>
      </div>
    `,
    className: 'custom-div-icon',
    iconSize: [30, 30],
    iconAnchor: [15, 30],
    popupAnchor: [0, -30]
  })
}

export default function MapComponent({ onRetaSelect, onCourtSelect, selectedReta, selectedCourt }: MapComponentProps) {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

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
    console.log("Unirse a reta:", reta.id)
    alert(`Te has unido exitosamente a "${reta.title}"`)
  }

  if (!isMounted) {
    return (
      <div className="h-96 bg-muted rounded-lg flex items-center justify-center">
        <div className="text-center space-y-2">
          <MapPin className="h-16 w-16 mx-auto text-muted-foreground animate-pulse" />
          <p className="text-muted-foreground">Cargando mapa...</p>
        </div>
      </div>
    )
  }

  // Centro del mapa en Ciudad Victoria, Tamaulipas, México
  const center: [number, number] = [23.7418, -99.1459]
  const zoom = 12

  return (
    <div className="h-96 w-full rounded-lg overflow-hidden">
      <MapContainer
        center={center}
        zoom={zoom}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {/* Marcadores de canchas */}
        {mockCourts.map((court) => {
          const courtIcon = createCustomIcon('#16a34a', '🏟️')
          return (
            <Marker
              key={`court-${court.id}`}
              position={[court.latitude, court.longitude]}
              icon={courtIcon}
              eventHandlers={{
                click: () => onCourtSelect?.(court)
              }}
            >
              <Popup>
                <div className="p-2 min-w-[200px]">
                  <div className="flex items-center gap-2 mb-2">
                    <MapPin className="h-4 w-4 text-green-600" />
                    <h3 className="font-semibold text-sm">{court.name}</h3>
                  </div>
                  <p className="text-xs text-gray-600 mb-2">{court.address}</p>
                  <div className="flex items-center gap-1 mb-2">
                    <Star className="h-3 w-3 text-yellow-500" />
                    <span className="text-xs">{court.rating}/5</span>
                    <span className="text-xs text-gray-500">•</span>
                    <span className="text-xs">{court.type.replace('_', ' ')}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <DollarSign className="h-3 w-3 text-green-600" />
                    <span className="text-xs font-medium">S/ {court.pricePerHour}/hora</span>
                  </div>
                </div>
              </Popup>
            </Marker>
          )
        })}

        {/* Marcadores de retas */}
        {mockRetas.map((reta) => {
          const retaIcon = createCustomIcon('#dc2626', '⚽')
          return (
            <Marker
              key={`reta-${reta.id}`}
              position={[reta.latitude, reta.longitude]}
              icon={retaIcon}
              eventHandlers={{
                click: () => onRetaSelect?.(reta)
              }}
            >
              <Popup>
                <div className="p-3 min-w-[250px]">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <h3 className="font-semibold text-sm mb-1 line-clamp-2">{reta.title}</h3>
                      <p className="text-xs text-gray-600 flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {reta.courtName}
                      </p>
                    </div>
                    <Badge className={`text-xs ${getStatusColor(reta.status)}`}>
                      {getStatusLabel(reta.status)}
                    </Badge>
                  </div>

                  <div className="space-y-1 mb-3">
                    <div className="flex items-center gap-2 text-xs">
                      <Calendar className="h-3 w-3 text-gray-500" />
                      <span>{formatDate(reta.date)}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                      <Clock className="h-3 w-3 text-gray-500" />
                      <span>{reta.startTime} - {reta.endTime}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                      <Users className="h-3 w-3 text-gray-500" />
                      <span>{reta.currentPlayers}/{reta.maxPlayers} jugadores</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                      <DollarSign className="h-3 w-3 text-gray-500" />
                      <span>S/ {reta.price} por jugador</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex items-center gap-1">
                      <Avatar className="h-4 w-4">
                        <AvatarImage src={reta.organizerAvatar} />
                        <AvatarFallback className="text-xs">{reta.organizerName[0]}</AvatarFallback>
                      </Avatar>
                      <span className="text-xs text-gray-600">{reta.organizerName}</span>
                    </div>
                    <Badge className={`text-xs ${getSkillLevelColor(reta.skillLevel)}`}>
                      {getSkillLevelLabel(reta.skillLevel)}
                    </Badge>
                  </div>

                  <p className="text-xs text-gray-600 mb-3 line-clamp-2">
                    {reta.description}
                  </p>

                  <Button 
                    size="sm" 
                    className="w-full text-xs"
                    onClick={() => handleJoinReta(reta)}
                    disabled={reta.status !== "open" || reta.currentPlayers >= reta.maxPlayers}
                  >
                    <UserPlus className="h-3 w-3 mr-1" />
                    {reta.currentPlayers >= reta.maxPlayers ? "Completo" : "Unirse"}
                  </Button>
                </div>
              </Popup>
            </Marker>
          )
        })}
      </MapContainer>
    </div>
  )
}
