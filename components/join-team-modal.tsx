"use client"

import { useState } from "react"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { mockTeams, mockUsers } from "@/lib/mock-data"
import { X, Users, User, Crown, Search } from "lucide-react"

interface JoinTeamModalProps {
  onClose: () => void
}

export function JoinTeamModal({ onClose }: JoinTeamModalProps) {
  const { user } = useAuth()
  const [searchTerm, setSearchTerm] = useState("")
  const [isJoining, setIsJoining] = useState<string | null>(null)

  // Filter teams that the user is not already part of
  const availableTeams = mockTeams.filter(
    (team) => !team.players.includes(user?.id || "") && team.name.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleJoinTeam = async (teamId: string) => {
    if (!user) return

    setIsJoining(teamId)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Add user to team (in real app, this would be an API call)
    const team = mockTeams.find((t) => t.id === teamId)
    if (team) {
      team.players.push(user.id)
    }

    setIsJoining(null)
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl max-h-[80vh] overflow-hidden">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Users className="h-6 w-6 text-primary" />
              <div>
                <CardTitle>Unirse a un Equipo</CardTitle>
                <CardDescription>Encuentra y únete a equipos disponibles</CardDescription>
              </div>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-3 py-2 border border-border rounded-md bg-input focus:outline-none focus:ring-2 focus:ring-ring"
              placeholder="Buscar equipos..."
            />
          </div>

          {/* Teams List */}
          <div className="max-h-96 overflow-y-auto space-y-3">
            {availableTeams.length > 0 ? (
              availableTeams.map((team) => {
                const coach = mockUsers.find((u) => u.id === team.coachId)
                const isJoiningThis = isJoining === team.id

                return (
                  <div key={team.id} className="flex items-center gap-4 p-4 border border-border rounded-lg">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                      <Users className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold">{team.name}</h3>
                      <p className="text-sm text-muted-foreground">{team.category}</p>
                      <div className="flex items-center gap-4 mt-1 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Crown className="h-3 w-3" />
                          {coach?.name || "Sin entrenador"}
                        </span>
                        <span className="flex items-center gap-1">
                          <User className="h-3 w-3" />
                          {team.players.length} jugadores
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-muted-foreground mb-2">
                        {team.wins}V - {team.losses}D - {team.draws}E
                      </div>
                      <Button
                        size="sm"
                        onClick={() => handleJoinTeam(team.id)}
                        disabled={isJoiningThis}
                        className="min-w-20"
                      >
                        {isJoiningThis ? "Uniéndose..." : "Unirse"}
                      </Button>
                    </div>
                  </div>
                )
              })
            ) : (
              <div className="text-center py-8">
                <Users className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
                <p className="text-muted-foreground">
                  {searchTerm ? "No se encontraron equipos con ese nombre" : "No hay equipos disponibles para unirse"}
                </p>
              </div>
            )}
          </div>

          <div className="flex justify-end pt-4 border-t border-border">
            <Button variant="outline" onClick={onClose} className="bg-transparent">
              Cerrar
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
