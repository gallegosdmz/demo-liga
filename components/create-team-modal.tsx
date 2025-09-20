"use client"

import type React from "react"

import { useState } from "react"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { mockTeams, type Team } from "@/lib/mock-data"
import { X, Users, FileText } from "lucide-react"

interface CreateTeamModalProps {
  onClose: () => void
}

export function CreateTeamModal({ onClose }: CreateTeamModalProps) {
  const { user } = useAuth()
  const [formData, setFormData] = useState({
    name: "",
    category: "Primera División",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const categories = ["Primera División", "Segunda División", "Tercera División", "Juvenil", "Veteranos"]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user) return

    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const newTeam: Team = {
      id: Date.now().toString(),
      name: formData.name,
      coachId: user.id,
      players: [],
      category: formData.category,
      wins: 0,
      losses: 0,
      draws: 0,
    }

    // Add to mock data (in real app, this would be an API call)
    mockTeams.push(newTeam)

    setIsSubmitting(false)
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Users className="h-6 w-6 text-primary" />
              <div>
                <CardTitle>Crear Nuevo Equipo</CardTitle>
                <CardDescription>Configura los detalles de tu equipo</CardDescription>
              </div>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Nombre del Equipo</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 py-2 border border-border rounded-md bg-input focus:outline-none focus:ring-2 focus:ring-ring"
                placeholder="Águilas FC"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Categoría</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-3 py-2 border border-border rounded-md bg-input focus:outline-none focus:ring-2 focus:ring-ring"
                required
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            <div className="bg-muted/50 p-4 rounded-lg">
              <h4 className="font-medium mb-2 flex items-center gap-2">
                <FileText className="h-4 w-4 text-primary" />
                Información
              </h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Serás asignado como entrenador del equipo</li>
                <li>• Podrás agregar jugadores después de crear el equipo</li>
                <li>• El equipo podrá inscribirse en torneos de su categoría</li>
              </ul>
            </div>

            <div className="flex gap-3 pt-4">
              <Button type="button" variant="outline" onClick={onClose} className="flex-1 bg-transparent">
                Cancelar
              </Button>
              <Button type="submit" disabled={isSubmitting} className="flex-1">
                {isSubmitting ? "Creando..." : "Crear Equipo"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
