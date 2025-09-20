"use client"

import { useState } from "react"
import { useAuth } from "@/contexts/auth-context"
import { MobileNav } from "@/components/mobile-nav"
import { TournamentsView } from "@/components/tournaments-view"
import { TeamsView } from "@/components/teams-view"
import { CalendarView } from "@/components/calendar-view"
import { StatsView } from "@/components/stats-view"
import { ProfileView } from "@/components/profile-view"
import { Button } from "@/components/ui/button"
import { Trophy, LogOut } from "lucide-react"

export default function DashboardPage() {
  const { user, logout } = useAuth()
  const [currentView, setCurrentView] = useState("tournaments")

  if (!user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Trophy className="h-16 w-16 text-primary mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">Acceso Requerido</h2>
          <p className="text-muted-foreground mb-4">Debes iniciar sesión para acceder al dashboard</p>
          <Button onClick={() => (window.location.href = "/")}>Ir al Inicio</Button>
        </div>
      </div>
    )
  }

  const renderCurrentView = () => {
    switch (currentView) {
      case "tournaments":
        return <TournamentsView />
      case "teams":
        return <TeamsView />
      case "calendar":
        return <CalendarView />
      case "stats":
        return <StatsView />
      case "profile":
        return <ProfileView />
      default:
        return <TournamentsView />
    }
  }

  return (
    <div className="min-h-screen bg-background pb-16 md:pb-0">
      <MobileNav currentView={currentView} onViewChange={setCurrentView} />

      {/* Desktop Header */}
      <header className="hidden md:block bg-card border-b border-border sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Trophy className="h-8 w-8 text-primary" />
              <h1 className="text-2xl font-bold text-foreground">SportsTournament</h1>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground">
                Bienvenido, <span className="font-medium text-foreground">{user.name}</span>
              </span>
              <Button variant="outline" size="sm" onClick={logout}>
                <LogOut className="h-4 w-4 mr-2" />
                Cerrar Sesión
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Desktop Navigation */}
      <nav className="hidden md:block bg-muted/30 border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex space-x-8">
            {[
              { id: "tournaments", label: "Torneos" },
              { id: "teams", label: "Equipos" },
              { id: "calendar", label: "Calendario" },
              { id: "stats", label: "Estadísticas" },
              { id: "profile", label: "Perfil" },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setCurrentView(item.id)}
                className={`py-4 px-2 border-b-2 transition-colors ${
                  currentView === item.id
                    ? "border-primary text-primary font-medium"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">{renderCurrentView()}</main>
    </div>
  )
}
