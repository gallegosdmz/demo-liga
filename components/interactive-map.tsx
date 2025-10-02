"use client"

import dynamic from "next/dynamic"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin } from "lucide-react"
import { type Court, type Reta } from "@/lib/mock-data"

// Importar dinámicamente el mapa completo para evitar problemas de SSR
const MapComponent = dynamic(
  () => import("./map-component"),
  { 
    ssr: false,
    loading: () => (
      <div className="h-96 bg-muted rounded-lg flex items-center justify-center">
        <div className="text-center space-y-2">
          <MapPin className="h-16 w-16 mx-auto text-muted-foreground animate-pulse" />
          <p className="text-muted-foreground">Cargando mapa...</p>
        </div>
      </div>
    )
  }
)

interface InteractiveMapProps {
  onRetaSelect?: (reta: Reta) => void
  onCourtSelect?: (court: Court) => void
  selectedReta?: Reta | null
  selectedCourt?: Court | null
}


export function InteractiveMap({ onRetaSelect, onCourtSelect, selectedReta, selectedCourt }: InteractiveMapProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MapPin className="h-5 w-5" />
          Mapa de Canchas y Retas
        </CardTitle>
        <CardDescription>
          Haz clic en los marcadores para ver información detallada
        </CardDescription>
      </CardHeader>
      <CardContent>
        <MapComponent 
          onRetaSelect={onRetaSelect}
          onCourtSelect={onCourtSelect}
          selectedReta={selectedReta}
          selectedCourt={selectedCourt}
        />

        {/* Leyenda */}
        <div className="mt-4 flex flex-wrap gap-4 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-green-500 border border-white shadow-sm"></div>
            <span>Canchas</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-red-500 border border-white shadow-sm"></div>
            <span>Retas Activas</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="h-3 w-3 text-gray-500" />
            <span>Haz clic para ver detalles</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
