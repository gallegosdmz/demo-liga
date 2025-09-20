"use client"

import { useState } from "react"
import { Trophy, Users, Calendar, BarChart3, User, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"

interface MobileNavProps {
  currentView: string
  onViewChange: (view: string) => void
}

export function MobileNav({ currentView, onViewChange }: MobileNavProps) {
  const [isOpen, setIsOpen] = useState(false)

  const navItems = [
    { id: "tournaments", label: "Torneos", icon: Trophy },
    { id: "teams", label: "Equipos", icon: Users },
    { id: "calendar", label: "Calendario", icon: Calendar },
    { id: "stats", label: "Estadísticas", icon: BarChart3 },
    { id: "profile", label: "Perfil", icon: User },
  ]

  return (
    <>
      {/* Mobile Header */}
      <header className="md:hidden bg-card border-b border-border sticky top-0 z-50">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-2">
            <Trophy className="h-6 w-6 text-primary" />
            <span className="font-bold text-foreground">SportsTournament</span>
          </div>
          <Button variant="ghost" size="sm" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="md:hidden fixed inset-0 z-40 bg-background/80 backdrop-blur-sm">
          <div className="fixed top-16 left-0 right-0 bg-card border-b border-border p-4">
            <nav className="space-y-2">
              {navItems.map((item) => {
                const Icon = item.icon
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      onViewChange(item.id)
                      setIsOpen(false)
                    }}
                    className={`w-full flex items-center gap-3 p-3 rounded-md text-left transition-colors ${
                      currentView === item.id ? "bg-primary text-primary-foreground" : "hover:bg-muted"
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    {item.label}
                  </button>
                )
              })}
            </nav>
          </div>
        </div>
      )}

      {/* Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-card border-t border-border z-50">
        <div className="flex">
          {navItems.map((item) => {
            const Icon = item.icon
            return (
              <button
                key={item.id}
                onClick={() => onViewChange(item.id)}
                className={`flex-1 flex flex-col items-center gap-1 p-2 transition-colors ${
                  currentView === item.id ? "text-primary" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Icon className="h-5 w-5" />
                <span className="text-xs">{item.label}</span>
              </button>
            )
          })}
        </div>
      </nav>
    </>
  )
}
