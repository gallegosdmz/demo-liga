"use client"

import type React from "react"

import { useState } from "react"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Trophy, Users, Calendar, BarChart3, User, Shield, Star, Heart, Loader2 } from "lucide-react"
import { LigaLogo } from "@/components/liga-logo"
import { useRouter } from "next/navigation"

export default function HomePage() {
  const { user } = useAuth()
  const router = useRouter()
  const [currentView, setCurrentView] = useState<"home" | "login" | "register">("home")

  // Redirect to dashboard if user is logged in
  if (user) {
    router.push("/dashboard")
    return null
  }

  if (currentView === "login") {
    return <LoginView onBack={() => setCurrentView("home")} onRegister={() => setCurrentView("register")} />
  }

  if (currentView === "register") {
    return <RegisterView onBack={() => setCurrentView("home")} onLogin={() => setCurrentView("login")} />
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <LigaLogo size="lg" className="text-primary" />
              <h1 className="text-2xl font-bold text-foreground">LIGA+</h1>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setCurrentView("login")}>
                Iniciar Sesión
              </Button>
              <Button onClick={() => setCurrentView("register")}>Registrarse</Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-12 md:py-20 bg-gradient-to-br from-primary/5 to-accent/5">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-6xl font-bold text-foreground mb-6 text-balance">
            Gestiona Torneos Deportivos
            <span className="text-primary block">Como un Profesional</span>
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto text-pretty">
            La plataforma completa para organizar torneos, gestionar equipos y seguir estadísticas en tiempo real.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" onClick={() => setCurrentView("register")} className="text-lg px-8">
              Comenzar Gratis
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 bg-transparent">
              Ver Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-bold text-center mb-12 text-foreground">
            Todo lo que necesitas para gestionar torneos
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <LigaLogo size="xl" className="text-primary mx-auto mb-4" />
                <CardTitle>Torneos</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>Crea y gestiona torneos con diferentes categorías y formatos</CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <Users className="h-12 w-12 text-primary mx-auto mb-4" />
                <CardTitle>Equipos</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>Administra equipos, jugadores y inscripciones fácilmente</CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <Calendar className="h-12 w-12 text-primary mx-auto mb-4" />
                <CardTitle>Calendario</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>Programa partidos y eventos con calendario integrado</CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <BarChart3 className="h-12 w-12 text-primary mx-auto mb-4" />
                <CardTitle>Estadísticas</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>Analiza rendimiento con estadísticas detalladas</CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* User Roles */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-bold text-center mb-12 text-foreground">Para todos los roles deportivos</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <Shield className="h-12 w-12 text-accent mx-auto mb-4" />
                <CardTitle>Entrenadores</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>Gestiona tu equipo, estrategias y rendimiento de jugadores</CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <Star className="h-12 w-12 text-accent mx-auto mb-4" />
                <CardTitle>Dueños de Liga</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>Administra torneos completos y coordina múltiples equipos</CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <User className="h-12 w-12 text-accent mx-auto mb-4" />
                <CardTitle>Jugadores</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>Únete a equipos, ve tus estadísticas y sigue tu progreso</CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <Heart className="h-12 w-12 text-accent mx-auto mb-4" />
                <CardTitle>Aficionados</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>Sigue tus equipos favoritos y mantente al día con resultados</CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-8">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <LigaLogo size="md" className="text-primary" />
            <span className="text-lg font-semibold text-foreground">LIGA+</span>
          </div>
          <p className="text-muted-foreground">© 2024 LIGA+. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  )
}

function LoginView({ onBack, onRegister }: { onBack: () => void; onRegister: () => void }) {
  const { login, isLoading } = useAuth()
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    const success = await login(email, password)
    if (success) {
      router.push("/dashboard")
    } else {
      setError("Email o contraseña incorrectos")
    }
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <LigaLogo size="lg" className="text-primary" />
            <span className="text-2xl font-bold">LIGA+</span>
          </div>
          <CardTitle>Iniciar Sesión</CardTitle>
          <CardDescription>Accede a tu cuenta para gestionar torneos</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border border-border rounded-md bg-input focus:outline-none focus:ring-2 focus:ring-ring"
                placeholder="tu@email.com"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Contraseña</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border border-border rounded-md bg-input focus:outline-none focus:ring-2 focus:ring-ring"
                placeholder="••••••••"
                required
              />
            </div>
            {error && <p className="text-sm text-destructive">{error}</p>}
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
              Iniciar Sesión
            </Button>
          </form>
          <div className="text-center space-y-2 mt-4">
            <Button variant="ghost" onClick={onRegister} className="text-sm">
              ¿No tienes cuenta? Regístrate
            </Button>
            <Button variant="ghost" onClick={onBack} className="text-sm">
              Volver al inicio
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function RegisterView({ onBack, onLogin }: { onBack: () => void; onLogin: () => void }) {
  const { register, isLoading } = useAuth()
  const router = useRouter()
  const [userType, setUserType] = useState<"coach" | "owner" | "player" | "fan">("player")
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  })
  const [error, setError] = useState("")

  const userTypes = [
    { value: "coach", label: "Entrenador", icon: Shield, description: "Gestiona equipos y jugadores" },
    { value: "owner", label: "Dueño de Liga", icon: Star, description: "Administra torneos completos" },
    { value: "player", label: "Jugador", icon: User, description: "Únete a equipos y compite" },
    { value: "fan", label: "Aficionado", icon: Heart, description: "Sigue tus equipos favoritos" },
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    const success = await register({
      ...formData,
      type: userType,
    })

    if (success) {
      router.push("/dashboard")
    } else {
      setError("El email ya está registrado")
    }
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <LigaLogo size="lg" className="text-primary" />
            <span className="text-2xl font-bold">LIGA+</span>
          </div>
          <CardTitle>Crear Cuenta</CardTitle>
          <CardDescription>Únete a la comunidad deportiva</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Tipo de Usuario</label>
              <div className="grid grid-cols-2 gap-2">
                {userTypes.map((type) => {
                  const Icon = type.icon
                  return (
                    <button
                      key={type.value}
                      type="button"
                      onClick={() => setUserType(type.value as any)}
                      className={`p-3 border rounded-md text-left transition-colors ${
                        userType === type.value
                          ? "border-primary bg-primary/5 text-primary"
                          : "border-border hover:border-primary/50"
                      }`}
                    >
                      <Icon className="h-5 w-5 mb-1" />
                      <div className="text-sm font-medium">{type.label}</div>
                    </button>
                  )
                })}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Nombre Completo</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 py-2 border border-border rounded-md bg-input focus:outline-none focus:ring-2 focus:ring-ring"
                placeholder="Tu nombre completo"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-3 py-2 border border-border rounded-md bg-input focus:outline-none focus:ring-2 focus:ring-ring"
                placeholder="tu@email.com"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Contraseña</label>
              <input
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full px-3 py-2 border border-border rounded-md bg-input focus:outline-none focus:ring-2 focus:ring-ring"
                placeholder="••••••••"
                required
              />
            </div>

            {error && <p className="text-sm text-destructive">{error}</p>}

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
              Crear Cuenta
            </Button>
          </form>

          <div className="text-center space-y-2 mt-4">
            <Button variant="ghost" onClick={onLogin} className="text-sm">
              ¿Ya tienes cuenta? Inicia sesión
            </Button>
            <Button variant="ghost" onClick={onBack} className="text-sm">
              Volver al inicio
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
