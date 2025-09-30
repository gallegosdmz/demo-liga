"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  mockBadgeCategories,
  type Badge,
  type BadgeCategory 
} from "@/lib/mock-data"
import { 
  Trophy, 
  Target, 
  Zap, 
  Shield, 
  Star,
  Award,
  Activity,
  BarChart3,
  Calendar,
  Users,
  Lock,
  CheckCircle,
  Clock,
  TrendingUp
} from "lucide-react"

export function PlayerBadgesSystem() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all")

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "common": return "bg-gray-100 text-gray-800 border-gray-300"
      case "rare": return "bg-green-100 text-green-800 border-green-300"
      case "epic": return "bg-purple-100 text-purple-800 border-purple-300"
      case "legendary": return "bg-yellow-100 text-yellow-800 border-yellow-300"
      default: return "bg-gray-100 text-gray-800 border-gray-300"
    }
  }

  const getRarityIcon = (rarity: string) => {
    switch (rarity) {
      case "common": return "🥉"
      case "rare": return "🥈"
      case "epic": return "🥇"
      case "legendary": return "💎"
      default: return "🥉"
    }
  }

  const getCategoryIcon = (categoryId: string) => {
    const category = mockBadgeCategories.find(c => c.id === categoryId)
    return category?.icon || "🏆"
  }

  const getUnlockedBadges = () => {
    return mockBadgeCategories.flatMap(category => 
      category.badges.filter(badge => badge.isUnlocked)
    )
  }

  const getLockedBadges = () => {
    return mockBadgeCategories.flatMap(category => 
      category.badges.filter(badge => !badge.isUnlocked)
    )
  }

  const getProgressPercentage = (badge: Badge) => {
    if (!badge.progress) return 0
    return (badge.progress.current / badge.progress.max) * 100
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    })
  }

  const renderBadgeCard = (badge: Badge) => (
    <Card 
      key={badge.id} 
      className={`relative overflow-hidden transition-all duration-300 ${
        badge.isUnlocked 
          ? 'bg-gradient-to-br from-white to-gray-50 border-2 border-yellow-200 shadow-lg' 
          : 'bg-gray-50 border-gray-200 opacity-60'
      }`}
    >
      <CardContent className="p-3 sm:p-4">
        <div className="flex items-start gap-2 sm:gap-3">
          {/* Icono del Badge */}
          <div className={`text-2xl sm:text-3xl p-1.5 sm:p-2 rounded-full flex-shrink-0 ${
            badge.isUnlocked 
              ? 'bg-gradient-to-br from-yellow-100 to-orange-100' 
              : 'bg-gray-200'
          }`}>
            {badge.isUnlocked ? badge.icon : '🔒'}
          </div>

          {/* Información del Badge */}
          <div className="flex-1 min-w-0">
            <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 mb-1">
              <h3 className={`font-semibold text-xs sm:text-sm ${
                badge.isUnlocked ? 'text-gray-900' : 'text-gray-500'
              }`}>
                {badge.name}
              </h3>
              <Badge className={`text-xs w-fit ${getRarityColor(badge.rarity)}`}>
                {getRarityIcon(badge.rarity)} {badge.rarity.toUpperCase()}
              </Badge>
            </div>
            
            <p className={`text-xs mb-2 ${
              badge.isUnlocked ? 'text-gray-600' : 'text-gray-400'
            }`}>
              {badge.description}
            </p>

            {/* Progreso si está bloqueado */}
            {!badge.isUnlocked && badge.progress && (
              <div className="space-y-1">
                <div className="flex justify-between text-xs text-gray-500">
                  <span>Progreso</span>
                  <span>{badge.progress.current}/{badge.progress.max}</span>
                </div>
                <Progress value={getProgressPercentage(badge)} className="h-1.5 sm:h-2" />
              </div>
            )}

            {/* Fecha de desbloqueo si está desbloqueado */}
            {badge.isUnlocked && badge.unlockedAt && (
              <div className="flex items-center gap-1 text-xs text-green-600">
                <CheckCircle className="h-3 w-3 flex-shrink-0" />
                <span className="truncate">Desbloqueado {formatDate(badge.unlockedAt)}</span>
              </div>
            )}
          </div>

          {/* Estado del Badge */}
          <div className="flex-shrink-0">
            {badge.isUnlocked ? (
              <div className="w-5 h-5 sm:w-6 sm:h-6 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 text-green-600" />
              </div>
            ) : (
              <div className="w-5 h-5 sm:w-6 sm:h-6 bg-gray-100 rounded-full flex items-center justify-center">
                <Lock className="h-3 w-3 sm:h-4 sm:w-4 text-gray-400" />
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )

  const unlockedBadges = getUnlockedBadges()
  const lockedBadges = getLockedBadges()

  return (
    <div className="space-y-6">
      {/* Header con estadísticas */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        <Card>
          <CardContent className="p-3 sm:p-4 text-center">
            <div className="text-xl sm:text-2xl font-bold text-green-600">{unlockedBadges.length}</div>
            <div className="text-xs sm:text-sm text-muted-foreground">Desbloqueados</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-3 sm:p-4 text-center">
            <div className="text-xl sm:text-2xl font-bold text-gray-600">{lockedBadges.length}</div>
            <div className="text-xs sm:text-sm text-muted-foreground">Bloqueados</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-3 sm:p-4 text-center">
            <div className="text-xl sm:text-2xl font-bold text-yellow-600">
              {unlockedBadges.filter(b => b.rarity === "legendary").length}
            </div>
            <div className="text-xs sm:text-sm text-muted-foreground">Legendarios</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-3 sm:p-4 text-center">
            <div className="text-xl sm:text-2xl font-bold text-purple-600">
              {unlockedBadges.filter(b => b.rarity === "epic").length}
            </div>
            <div className="text-xs sm:text-sm text-muted-foreground">Épicos</div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs de Categorías */}
      <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
        <div className="overflow-x-auto">
          <TabsList className="grid w-full grid-cols-4 lg:grid-cols-7 min-w-max">
            <TabsTrigger value="all" className="text-xs sm:text-sm">Todos</TabsTrigger>
            {mockBadgeCategories.map((category) => (
              <TabsTrigger key={category.id} value={category.id} className="flex items-center gap-1 text-xs sm:text-sm">
                <span className="text-sm">{category.icon}</span>
                <span className="hidden sm:inline">{category.name}</span>
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        <TabsContent value="all" className="space-y-4">
          {/* Badges Desbloqueados */}
          <div>
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              Desbloqueados ({unlockedBadges.length})
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
              {unlockedBadges.map(renderBadgeCard)}
            </div>
          </div>

          {/* Badges Bloqueados */}
          <div>
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Lock className="h-5 w-5 text-gray-600" />
              En Progreso ({lockedBadges.length})
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
              {lockedBadges.map(renderBadgeCard)}
            </div>
          </div>
        </TabsContent>

        {/* Tabs por Categoría */}
        {mockBadgeCategories.map((category) => (
          <TabsContent key={category.id} value={category.id} className="space-y-4">
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                <span className="text-2xl">{category.icon}</span>
                {category.name}
              </h3>
              <p className="text-sm text-muted-foreground">{category.description}</p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
              {category.badges.map(renderBadgeCard)}
            </div>
          </TabsContent>
        ))}
      </Tabs>

      {/* Logros Recientes */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="h-5 w-5 text-yellow-500" />
            Logros Recientes
          </CardTitle>
          <CardDescription>
            Tus últimos badges desbloqueados
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {unlockedBadges
              .sort((a, b) => new Date(b.unlockedAt).getTime() - new Date(a.unlockedAt).getTime())
              .slice(0, 5)
              .map((badge) => (
                <div key={badge.id} className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 bg-green-50 rounded-lg">
                  <div className="text-xl sm:text-2xl flex-shrink-0">{badge.icon}</div>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-xs sm:text-sm truncate">{badge.name}</div>
                    <div className="text-xs text-muted-foreground">
                      Desbloqueado {formatDate(badge.unlockedAt)}
                    </div>
                  </div>
                  <Badge className={`text-xs flex-shrink-0 ${getRarityColor(badge.rarity)}`}>
                    {getRarityIcon(badge.rarity)}
                  </Badge>
                </div>
              ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
