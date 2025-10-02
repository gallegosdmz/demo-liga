// Mock data for the sports tournament application

export interface User {
  id: string
  name: string
  email: string
  type: "coach" | "owner" | "player" | "fan"
  avatar?: string
}

export interface PlayerProfile {
  id: string
  name: string
  position: "GK" | "DEF" | "MID" | "FWD"
  age: number
  nationality: string
  height: number // en cm
  weight: number // en kg
  preferredFoot: "left" | "right" | "both"
  jerseyNumber: number
  team: string
  avatar: string
  // Estadísticas principales (estilo FIFA)
  overall: number
  pace: number
  shooting: number
  passing: number
  dribbling: number
  defending: number
  physical: number
  // Estadísticas de temporada
  goals: number
  assists: number
  matches: number
  minutes: number
  yellowCards: number
  redCards: number
  // Información adicional
  contractUntil: string
  marketValue: number // en millones
  joinedDate: string
}

export interface Badge {
  id: string
  name: string
  description: string
  icon: string
  category: "goals" | "assists" | "defense" | "special" | "achievement" | "milestone"
  rarity: "common" | "rare" | "epic" | "legendary"
  unlockedAt: string
  progress?: {
    current: number
    max: number
  }
  isUnlocked: boolean
}

export interface BadgeCategory {
  id: string
  name: string
  description: string
  icon: string
  color: string
  badges: Badge[]
}

export interface CoachMatch {
  id: string
  coachId: string
  teamId: string
  opponentTeamId: string
  date: string
  competition: string
  venue: "home" | "away"
  result: "W" | "D" | "L"
  teamScore: number
  opponentScore: number
  formation: string
  tactics: {
    possession: number
    pressing: "high" | "medium" | "low"
    tempo: "fast" | "medium" | "slow"
    width: "narrow" | "normal" | "wide"
  }
  substitutions: {
    minute: number
    playerOut: string
    playerIn: string
    reason: "tactical" | "injury" | "performance" | "time_wasting"
  }[]
  cards: {
    minute: number
    playerId: string
    type: "yellow" | "red"
    reason: string
  }[]
  keyMoments: {
    minute: number
    type: "goal" | "assist" | "save" | "miss" | "card" | "substitution"
    description: string
    playerId: string
  }[]
  performance: {
    possession: number
    shots: number
    shotsOnTarget: number
    passes: number
    passAccuracy: number
    tackles: number
    interceptions: number
    fouls: number
  }
  rating: number
}

export interface IdealFormation {
  id: string
  name: string
  formation: string
  players: {
    position: string
    playerId: string
    name: string
    role: string
    instructions: string[]
  }[]
  tactics: {
    style: string
    instructions: string[]
    strengths: string[]
    weaknesses: string[]
  }
  effectiveness: number
  lastUsed: string
}

export interface CoachStats {
  coachId: string
  season: string
  totalMatches: number
  wins: number
  draws: number
  losses: number
  winRate: number
  goalsFor: number
  goalsAgainst: number
  goalDifference: number
  cleanSheets: number
  formations: {
    formation: string
    matches: number
    wins: number
    draws: number
    losses: number
    winRate: number
  }[]
  tacticalChanges: {
    type: "formation" | "substitution" | "tactics"
    matches: number
    successRate: number
    description: string
  }[]
  playerManagement: {
    totalSubstitutions: number
    tacticalSubstitutions: number
    injurySubstitutions: number
    averageSubstitutionMinute: number
  }
  recentForm: ("W" | "D" | "L")[]
  homeRecord: {
    matches: number
    wins: number
    draws: number
    losses: number
  }
  awayRecord: {
    matches: number
    wins: number
    draws: number
    losses: number
  }
}

export interface Team {
  id: string
  name: string
  logo?: string
  coachId: string
  players: string[]
  category: string
  wins: number
  losses: number
  draws: number
}

export interface Tournament {
  id: string
  name: string
  description: string
  startDate: string
  endDate: string
  category: string
  status: "upcoming" | "active" | "completed"
  teams: string[]
  ownerId: string
  maxTeams: number
}

export interface Match {
  id: string
  tournamentId: string
  homeTeamId: string
  awayTeamId: string
  homeScore: number
  awayScore: number
  date: string
  status: "scheduled" | "live" | "completed"
}

export interface PlayerStats {
  playerId: string
  tournamentId: string
  goals: number
  assists: number
  yellowCards: number
  redCards: number
  minutesPlayed: number
}

export interface MatchPerformance {
  id: string
  playerId: string
  matchId: string
  teamId: string
  opponentTeamId: string
  date: string
  // Estadísticas básicas
  goals: number
  assists: number
  yellowCards: number
  redCards: number
  minutesPlayed: number
  // Estadísticas avanzadas
  shots: number
  shotsOnTarget: number
  passes: number
  passesCompleted: number
  keyPasses: number
  crosses: number
  crossesCompleted: number
  tackles: number
  tacklesWon: number
  interceptions: number
  clearances: number
  duels: number
  duelsWon: number
  aerialDuels: number
  aerialDuelsWon: number
  foulsCommitted: number
  foulsWon: number
  offsides: number
  // Calificación FIFA-style (0-10)
  rating: number
  // Posición en el partido
  position: "GK" | "DEF" | "MID" | "FWD"
  // Resultado del partido
  result: "W" | "D" | "L" // Win, Draw, Loss
  teamScore: number
  opponentScore: number
}

export interface PlayerSeasonStats {
  playerId: string
  season: string
  // Estadísticas generales
  totalMatches: number
  totalMinutes: number
  totalGoals: number
  totalAssists: number
  totalYellowCards: number
  totalRedCards: number
  // Promedios por partido
  avgGoals: number
  avgAssists: number
  avgRating: number
  avgMinutes: number
  // Eficiencia
  goalConversionRate: number
  passAccuracy: number
  tackleSuccessRate: number
  duelSuccessRate: number
  // Mejor partido
  bestMatch: MatchPerformance
  // Racha actual
  currentStreak: {
    type: "goals" | "assists" | "clean_sheets" | "wins"
    count: number
  }
}

// Mock Users
export const mockUsers: User[] = [
  { id: "1", name: "Carlos Rodríguez", email: "carlos@email.com", type: "coach" },
  { id: "2", name: "María González", email: "maria@email.com", type: "owner" },
  { id: "3", name: "Luis Martínez", email: "luis@email.com", type: "player" },
  { id: "4", name: "Ana López", email: "ana@email.com", type: "fan" },
  { id: "5", name: "Pedro Sánchez", email: "pedro@email.com", type: "player" },
  { id: "6", name: "Laura Torres", email: "laura@email.com", type: "coach" },
]

// Mock Coach Matches - Últimos 10 partidos del entrenador Carlos Rodríguez (ID: 1)
export const mockCoachMatches: CoachMatch[] = [
  {
    id: "cm1",
    coachId: "1",
    teamId: "1",
    opponentTeamId: "2",
    date: "2024-03-20T15:00:00Z",
    competition: "Copa Primavera 2024",
    venue: "home",
    result: "W",
    teamScore: 2,
    opponentScore: 1,
    formation: "4-3-3",
    tactics: {
      possession: 58,
      pressing: "high",
      tempo: "fast",
      width: "wide"
    },
    substitutions: [
      {
        minute: 65,
        playerOut: "3",
        playerIn: "7",
        reason: "tactical"
      },
      {
        minute: 78,
        playerOut: "8",
        playerIn: "9",
        reason: "tactical"
      }
    ],
    cards: [
      {
        minute: 34,
        playerId: "5",
        type: "yellow",
        reason: "Falta táctica"
      }
    ],
    keyMoments: [
      {
        minute: 23,
        type: "goal",
        description: "Gol de Luis Martínez tras gran jugada colectiva",
        playerId: "3"
      },
      {
        minute: 45,
        type: "goal",
        description: "Gol de Pedro Sánchez de cabeza",
        playerId: "5"
      },
      {
        minute: 67,
        type: "goal",
        description: "Gol del rival tras error defensivo",
        playerId: "opponent"
      }
    ],
    performance: {
      possession: 58,
      shots: 12,
      shotsOnTarget: 6,
      passes: 487,
      passAccuracy: 84,
      tackles: 18,
      interceptions: 12,
      fouls: 8
    },
    rating: 8.2
  },
  {
    id: "cm2",
    coachId: "1",
    teamId: "1",
    opponentTeamId: "3",
    date: "2024-03-15T16:30:00Z",
    competition: "Copa Primavera 2024",
    venue: "away",
    result: "W",
    teamScore: 3,
    opponentScore: 0,
    formation: "4-2-3-1",
    tactics: {
      possession: 62,
      pressing: "medium",
      tempo: "medium",
      width: "normal"
    },
    substitutions: [
      {
        minute: 70,
        playerOut: "3",
        playerIn: "7",
        reason: "tactical"
      }
    ],
    cards: [],
    keyMoments: [
      {
        minute: 15,
        type: "goal",
        description: "Gol temprano de Luis Martínez",
        playerId: "3"
      },
      {
        minute: 42,
        type: "goal",
        description: "Segundo gol de Pedro Sánchez",
        playerId: "5"
      },
      {
        minute: 78,
        type: "goal",
        description: "Gol de Luis Martínez para cerrar el partido",
        playerId: "3"
      }
    ],
    performance: {
      possession: 62,
      shots: 15,
      shotsOnTarget: 8,
      passes: 523,
      passAccuracy: 87,
      tackles: 22,
      interceptions: 15,
      fouls: 6
    },
    rating: 9.1
  },
  {
    id: "cm3",
    coachId: "1",
    teamId: "1",
    opponentTeamId: "4",
    date: "2024-03-10T14:00:00Z",
    competition: "Copa Primavera 2024",
    venue: "home",
    result: "W",
    teamScore: 2,
    opponentScore: 1,
    formation: "4-3-3",
    tactics: {
      possession: 55,
      pressing: "high",
      tempo: "fast",
      width: "wide"
    },
    substitutions: [
      {
        minute: 60,
        playerOut: "8",
        playerIn: "9",
        reason: "tactical"
      },
      {
        minute: 75,
        playerOut: "5",
        playerIn: "10",
        reason: "tactical"
      }
    ],
    cards: [
      {
        minute: 28,
        playerId: "3",
        type: "yellow",
        reason: "Protesta"
      }
    ],
    keyMoments: [
      {
        minute: 33,
        type: "goal",
        description: "Gol de Pedro Sánchez tras asistencia de Luis",
        playerId: "5"
      },
      {
        minute: 67,
        type: "goal",
        description: "Gol del rival en contraataque",
        playerId: "opponent"
      },
      {
        minute: 89,
        type: "goal",
        description: "Gol de Luis Martínez en el último minuto",
        playerId: "3"
      }
    ],
    performance: {
      possession: 55,
      shots: 10,
      shotsOnTarget: 5,
      passes: 456,
      passAccuracy: 82,
      tackles: 20,
      interceptions: 13,
      fouls: 10
    },
    rating: 7.8
  },
  {
    id: "cm4",
    coachId: "1",
    teamId: "1",
    opponentTeamId: "5",
    date: "2024-03-05T18:00:00Z",
    competition: "Copa Primavera 2024",
    venue: "away",
    result: "D",
    teamScore: 1,
    opponentScore: 1,
    formation: "4-4-2",
    tactics: {
      possession: 48,
      pressing: "low",
      tempo: "slow",
      width: "narrow"
    },
    substitutions: [
      {
        minute: 55,
        playerOut: "3",
        playerIn: "7",
        reason: "tactical"
      },
      {
        minute: 70,
        playerOut: "8",
        playerIn: "9",
        reason: "tactical"
      }
    ],
    cards: [
      {
        minute: 45,
        playerId: "5",
        type: "yellow",
        reason: "Falta"
      }
    ],
    keyMoments: [
      {
        minute: 25,
        type: "goal",
        description: "Gol del rival en jugada a balón parado",
        playerId: "opponent"
      },
      {
        minute: 67,
        type: "goal",
        description: "Gol de Pedro Sánchez de penalti",
        playerId: "5"
      }
    ],
    performance: {
      possession: 48,
      shots: 8,
      shotsOnTarget: 3,
      passes: 398,
      passAccuracy: 78,
      tackles: 25,
      interceptions: 18,
      fouls: 12
    },
    rating: 6.5
  },
  {
    id: "cm5",
    coachId: "1",
    teamId: "1",
    opponentTeamId: "6",
    date: "2024-02-28T15:30:00Z",
    competition: "Copa Primavera 2024",
    venue: "home",
    result: "L",
    teamScore: 0,
    opponentScore: 2,
    formation: "4-3-3",
    tactics: {
      possession: 52,
      pressing: "high",
      tempo: "fast",
      width: "wide"
    },
    substitutions: [
      {
        minute: 45,
        playerOut: "8",
        playerIn: "9",
        reason: "tactical"
      },
      {
        minute: 60,
        playerOut: "3",
        playerIn: "7",
        reason: "tactical"
      },
      {
        minute: 75,
        playerOut: "5",
        playerIn: "10",
        reason: "tactical"
      }
    ],
    cards: [
      {
        minute: 34,
        playerId: "3",
        type: "yellow",
        reason: "Falta"
      },
      {
        minute: 67,
        playerId: "8",
        type: "red",
        reason: "Segunda amarilla"
      }
    ],
    keyMoments: [
      {
        minute: 23,
        type: "goal",
        description: "Gol del rival tras error defensivo",
        playerId: "opponent"
      },
      {
        minute: 78,
        type: "goal",
        description: "Segundo gol del rival en contraataque",
        playerId: "opponent"
      }
    ],
    performance: {
      possession: 52,
      shots: 6,
      shotsOnTarget: 2,
      passes: 412,
      passAccuracy: 79,
      tackles: 15,
      interceptions: 8,
      fouls: 14
    },
    rating: 4.2
  },
  {
    id: "cm6",
    coachId: "1",
    teamId: "1",
    opponentTeamId: "7",
    date: "2024-02-22T16:00:00Z",
    competition: "Copa Primavera 2024",
    venue: "away",
    result: "W",
    teamScore: 3,
    opponentScore: 1,
    formation: "4-2-3-1",
    tactics: {
      possession: 60,
      pressing: "medium",
      tempo: "medium",
      width: "normal"
    },
    substitutions: [
      {
        minute: 70,
        playerOut: "3",
        playerIn: "7",
        reason: "tactical"
      }
    ],
    cards: [],
    keyMoments: [
      {
        minute: 12,
        type: "goal",
        description: "Gol temprano de Luis Martínez",
        playerId: "3"
      },
      {
        minute: 45,
        type: "goal",
        description: "Gol de Pedro Sánchez antes del descanso",
        playerId: "5"
      },
      {
        minute: 67,
        type: "goal",
        description: "Gol del rival en jugada a balón parado",
        playerId: "opponent"
      },
      {
        minute: 89,
        type: "goal",
        description: "Gol de Luis Martínez para cerrar el partido",
        playerId: "3"
      }
    ],
    performance: {
      possession: 60,
      shots: 14,
      shotsOnTarget: 7,
      passes: 498,
      passAccuracy: 85,
      tackles: 19,
      interceptions: 11,
      fouls: 7
    },
    rating: 8.7
  },
  {
    id: "cm7",
    coachId: "1",
    teamId: "1",
    opponentTeamId: "8",
    date: "2024-02-18T14:30:00Z",
    competition: "Copa Primavera 2024",
    venue: "home",
    result: "W",
    teamScore: 2,
    opponentScore: 0,
    formation: "4-3-3",
    tactics: {
      possession: 65,
      pressing: "high",
      tempo: "fast",
      width: "wide"
    },
    substitutions: [
      {
        minute: 75,
        playerOut: "3",
        playerIn: "7",
        reason: "tactical"
      }
    ],
    cards: [],
    keyMoments: [
      {
        minute: 34,
        type: "goal",
        description: "Gol de Luis Martínez tras gran jugada",
        playerId: "3"
      },
      {
        minute: 78,
        type: "goal",
        description: "Gol de Pedro Sánchez de cabeza",
        playerId: "5"
      }
    ],
    performance: {
      possession: 65,
      shots: 16,
      shotsOnTarget: 8,
      passes: 567,
      passAccuracy: 88,
      tackles: 21,
      interceptions: 14,
      fouls: 5
    },
    rating: 8.9
  },
  {
    id: "cm8",
    coachId: "1",
    teamId: "1",
    opponentTeamId: "9",
    date: "2024-02-12T17:00:00Z",
    competition: "Copa Primavera 2024",
    venue: "away",
    result: "D",
    teamScore: 1,
    opponentScore: 1,
    formation: "4-4-2",
    tactics: {
      possession: 50,
      pressing: "medium",
      tempo: "medium",
      width: "normal"
    },
    substitutions: [
      {
        minute: 60,
        playerOut: "8",
        playerIn: "9",
        reason: "tactical"
      },
      {
        minute: 75,
        playerOut: "3",
        playerIn: "7",
        reason: "tactical"
      }
    ],
    cards: [
      {
        minute: 45,
        playerId: "5",
        type: "yellow",
        reason: "Falta"
      }
    ],
    keyMoments: [
      {
        minute: 23,
        type: "goal",
        description: "Gol de Luis Martínez tras asistencia",
        playerId: "3"
      },
      {
        minute: 67,
        type: "goal",
        description: "Gol del rival en jugada a balón parado",
        playerId: "opponent"
      }
    ],
    performance: {
      possession: 50,
      shots: 9,
      shotsOnTarget: 4,
      passes: 423,
      passAccuracy: 81,
      tackles: 23,
      interceptions: 16,
      fouls: 9
    },
    rating: 6.8
  },
  {
    id: "cm9",
    coachId: "1",
    teamId: "1",
    opponentTeamId: "10",
    date: "2024-02-08T15:45:00Z",
    competition: "Copa Primavera 2024",
    venue: "home",
    result: "W",
    teamScore: 2,
    opponentScore: 1,
    formation: "4-2-3-1",
    tactics: {
      possession: 58,
      pressing: "high",
      tempo: "fast",
      width: "wide"
    },
    substitutions: [
      {
        minute: 65,
        playerOut: "3",
        playerIn: "7",
        reason: "tactical"
      },
      {
        minute: 80,
        playerOut: "8",
        playerIn: "9",
        reason: "tactical"
      }
    ],
    cards: [
      {
        minute: 34,
        playerId: "8",
        type: "yellow",
        reason: "Falta"
      }
    ],
    keyMoments: [
      {
        minute: 28,
        type: "goal",
        description: "Gol de Luis Martínez tras gran jugada",
        playerId: "3"
      },
      {
        minute: 45,
        type: "goal",
        description: "Gol del rival en contraataque",
        playerId: "opponent"
      },
      {
        minute: 78,
        type: "goal",
        description: "Gol de Pedro Sánchez de penalti",
        playerId: "5"
      }
    ],
    performance: {
      possession: 58,
      shots: 11,
      shotsOnTarget: 6,
      passes: 489,
      passAccuracy: 83,
      tackles: 17,
      interceptions: 12,
      fouls: 8
    },
    rating: 7.9
  },
  {
    id: "cm10",
    coachId: "1",
    teamId: "1",
    opponentTeamId: "11",
    date: "2024-02-03T16:15:00Z",
    competition: "Copa Primavera 2024",
    venue: "away",
    result: "L",
    teamScore: 0,
    opponentScore: 1,
    formation: "4-3-3",
    tactics: {
      possession: 45,
      pressing: "low",
      tempo: "slow",
      width: "narrow"
    },
    substitutions: [
      {
        minute: 55,
        playerOut: "8",
        playerIn: "9",
        reason: "tactical"
      },
      {
        minute: 70,
        playerOut: "3",
        playerIn: "7",
        reason: "tactical"
      },
      {
        minute: 80,
        playerOut: "5",
        playerIn: "10",
        reason: "tactical"
      }
    ],
    cards: [
      {
        minute: 45,
        playerId: "3",
        type: "yellow",
        reason: "Falta"
      }
    ],
    keyMoments: [
      {
        minute: 67,
        type: "goal",
        description: "Gol del rival en jugada a balón parado",
        playerId: "opponent"
      }
    ],
    performance: {
      possession: 45,
      shots: 5,
      shotsOnTarget: 1,
      passes: 356,
      passAccuracy: 76,
      tackles: 28,
      interceptions: 20,
      fouls: 15
    },
    rating: 5.1
  }
]

// Alineación ideal del entrenador Carlos Rodríguez
export const mockIdealFormation: IdealFormation = {
  id: "ideal1",
  name: "Formación Tiki-Taka",
  formation: "4-3-3",
  players: [
    {
      position: "GK",
      playerId: "gk1",
      name: "Miguel Torres",
      role: "Portero",
      instructions: ["Jugar con los pies", "Salir del área", "Distribución corta"]
    },
    {
      position: "LB",
      playerId: "lb1",
      name: "Carlos García",
      role: "Lateral Izquierdo",
      instructions: ["Subir por banda", "Centrar al área", "Presionar alto"]
    },
    {
      position: "CB",
      playerId: "cb1",
      name: "Antonio López",
      role: "Central",
      instructions: ["Jugar con los pies", "Cobertura", "Línea alta"]
    },
    {
      position: "CB",
      playerId: "cb2",
      name: "David Ruiz",
      role: "Central",
      instructions: ["Jugar con los pies", "Cobertura", "Línea alta"]
    },
    {
      position: "RB",
      playerId: "rb1",
      name: "Jorge Martín",
      role: "Lateral Derecho",
      instructions: ["Subir por banda", "Centrar al área", "Presionar alto"]
    },
    {
      position: "CDM",
      playerId: "cdm1",
      name: "Sergio Ramos",
      role: "Pivote",
      instructions: ["Recibir entre líneas", "Distribuir juego", "Cobertura defensiva"]
    },
    {
      position: "CM",
      playerId: "cm1",
      name: "Luis Martínez",
      role: "Mediocentro",
      instructions: ["Crear juego", "Pases verticales", "Llegar al área"]
    },
    {
      position: "CM",
      playerId: "cm2",
      name: "Pedro Sánchez",
      role: "Mediocentro",
      instructions: ["Crear juego", "Pases verticales", "Llegar al área"]
    },
    {
      position: "LW",
      playerId: "lw1",
      name: "Álvaro González",
      role: "Extremo Izquierdo",
      instructions: ["Cortar hacia dentro", "Disparar", "Asistir"]
    },
    {
      position: "ST",
      playerId: "st1",
      name: "Diego Costa",
      role: "Delantero Centro",
      instructions: ["Jugar de espaldas", "Asistir", "Presionar"]
    },
    {
      position: "RW",
      playerId: "rw1",
      name: "Marco Silva",
      role: "Extremo Derecho",
      instructions: ["Cortar hacia dentro", "Disparar", "Asistir"]
    }
  ],
  tactics: {
    style: "Tiki-Taka",
    instructions: [
      "Posesión alta del balón",
      "Presión alta tras pérdida",
      "Juego por bandas",
      "Pases cortos y rápidos",
      "Movimiento constante"
    ],
    strengths: [
      "Control del juego",
      "Presión alta",
      "Juego ofensivo",
      "Posesión del balón"
    ],
    weaknesses: [
      "Vulnerable a contraataques",
      "Requiere mucha condición física",
      "Dependiente de la técnica"
    ]
  },
  effectiveness: 87,
  lastUsed: "2024-03-20T15:00:00Z"
}

// Estadísticas del entrenador Carlos Rodríguez
export const mockCoachStats: CoachStats = {
  coachId: "1",
  season: "2024",
  totalMatches: 10,
  wins: 6,
  draws: 2,
  losses: 2,
  winRate: 60,
  goalsFor: 18,
  goalsAgainst: 9,
  goalDifference: 9,
  cleanSheets: 3,
  formations: [
    {
      formation: "4-3-3",
      matches: 5,
      wins: 3,
      draws: 1,
      losses: 1,
      winRate: 60
    },
    {
      formation: "4-2-3-1",
      matches: 3,
      wins: 2,
      draws: 1,
      losses: 0,
      winRate: 67
    },
    {
      formation: "4-4-2",
      matches: 2,
      wins: 1,
      draws: 0,
      losses: 1,
      winRate: 50
    }
  ],
  tacticalChanges: [
    {
      type: "formation",
      matches: 3,
      successRate: 67,
      description: "Cambio de 4-3-3 a 4-2-3-1 en el segundo tiempo"
    },
    {
      type: "substitution",
      matches: 8,
      successRate: 75,
      description: "Sustituciones tácticas en el minuto 65-75"
    },
    {
      type: "tactics",
      matches: 5,
      successRate: 80,
      description: "Ajuste de presión y ritmo según el rival"
    }
  ],
  playerManagement: {
    totalSubstitutions: 18,
    tacticalSubstitutions: 14,
    injurySubstitutions: 1,
    averageSubstitutionMinute: 68
  },
  recentForm: ["W", "W", "W", "D", "L"],
  homeRecord: {
    matches: 5,
    wins: 4,
    draws: 1,
    losses: 0
  },
  awayRecord: {
    matches: 5,
    wins: 2,
    draws: 1,
    losses: 2
  }
}

// Interfaces para jugadores de la liga
export interface LeaguePlayer {
  id: string
  name: string
  position: "GK" | "DEF" | "MID" | "FWD"
  age: number
  nationality: string
  team: string
  teamId: string
  avatar: string
  overall: number
  // Estadísticas de temporada
  matches: number
  minutes: number
  goals: number
  assists: number
  yellowCards: number
  redCards: number
  // Estadísticas avanzadas
  passAccuracy: number
  tackles: number
  interceptions: number
  shotsOnTarget: number
  saves?: number // Solo para porteros
  cleanSheets?: number // Solo para porteros
  // Información contractual
  contractUntil: string
  // Características especiales
  strengths: string[]
  weaknesses: string[]
  preferredFoot: "left" | "right" | "both"
  height: number
  weight: number
  // Estado de interés
  isTarget: boolean
  interestLevel: "low" | "medium" | "high" | "very_high"
  lastScouted: string
}

// Mock data de jugadores destacados de la liga
export const mockLeaguePlayers: LeaguePlayer[] = [
  {
    id: "lp1",
    name: "Diego Costa",
    position: "FWD",
    age: 28,
    nationality: "España",
    team: "Real Madrid CF",
    teamId: "2",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    overall: 89,
    matches: 15,
    minutes: 1280,
    goals: 12,
    assists: 4,
    yellowCards: 2,
    redCards: 0,
    passAccuracy: 78,
    tackles: 8,
    interceptions: 5,
    shotsOnTarget: 28,
    contractUntil: "2026-06-30",
    strengths: ["Finalización", "Fuerza física", "Juego aéreo", "Presión"],
    weaknesses: ["Velocidad", "Regate", "Disciplina"],
    preferredFoot: "right",
    height: 186,
    weight: 85,
    isTarget: true,
    interestLevel: "very_high",
    lastScouted: "2024-03-18T10:00:00Z"
  },
  {
    id: "lp2",
    name: "Sergio Ramos",
    position: "DEF",
    age: 32,
    nationality: "España",
    team: "FC Barcelona",
    teamId: "3",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    overall: 87,
    matches: 14,
    minutes: 1260,
    goals: 3,
    assists: 2,
    yellowCards: 4,
    redCards: 1,
    passAccuracy: 92,
    tackles: 45,
    interceptions: 38,
    shotsOnTarget: 8,
    contractUntil: "2025-06-30",
    strengths: ["Liderazgo", "Juego aéreo", "Pases largos", "Experiencia"],
    weaknesses: ["Velocidad", "Disciplina", "Edad"],
    preferredFoot: "right",
    height: 184,
    weight: 82,
    isTarget: false,
    interestLevel: "medium",
    lastScouted: "2024-03-15T14:30:00Z"
  },
  {
    id: "lp3",
    name: "Marco Silva",
    position: "MID",
    age: 26,
    nationality: "Brasil",
    team: "Atlético Madrid",
    teamId: "4",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
    overall: 88,
    matches: 16,
    minutes: 1440,
    goals: 8,
    assists: 12,
    yellowCards: 3,
    redCards: 0,
    passAccuracy: 89,
    tackles: 28,
    interceptions: 22,
    shotsOnTarget: 18,
    contractUntil: "2027-06-30",
    strengths: ["Visión de juego", "Pases", "Regate", "Técnica"],
    weaknesses: ["Fuerza física", "Juego aéreo", "Defensa"],
    preferredFoot: "left",
    height: 175,
    weight: 70,
    isTarget: true,
    interestLevel: "high",
    lastScouted: "2024-03-20T16:00:00Z"
  },
  {
    id: "lp4",
    name: "Miguel Torres",
    position: "GK",
    age: 24,
    nationality: "España",
    team: "Valencia CF",
    teamId: "5",
    avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&crop=face",
    overall: 85,
    matches: 15,
    minutes: 1350,
    goals: 0,
    assists: 1,
    yellowCards: 1,
    redCards: 0,
    passAccuracy: 85,
    tackles: 2,
    interceptions: 1,
    shotsOnTarget: 0,
    saves: 67,
    cleanSheets: 8,
    contractUntil: "2026-06-30",
    strengths: ["Reflejos", "Juego con los pies", "Distribución", "Juventud"],
    weaknesses: ["Experiencia", "Juego aéreo", "Comunicación"],
    preferredFoot: "right",
    height: 188,
    weight: 78,
    isTarget: false,
    interestLevel: "low",
    lastScouted: "2024-03-10T12:00:00Z"
  },
  {
    id: "lp5",
    name: "Álvaro González",
    position: "FWD",
    age: 22,
    nationality: "España",
    team: "Sevilla FC",
    teamId: "6",
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&h=150&fit=crop&crop=face",
    overall: 84,
    matches: 14,
    minutes: 1120,
    goals: 9,
    assists: 6,
    yellowCards: 1,
    redCards: 0,
    passAccuracy: 82,
    tackles: 12,
    interceptions: 8,
    shotsOnTarget: 22,
    contractUntil: "2028-06-30",
    strengths: ["Velocidad", "Regate", "Finalización", "Juventud"],
    weaknesses: ["Fuerza física", "Juego aéreo", "Experiencia"],
    preferredFoot: "right",
    height: 178,
    weight: 72,
    isTarget: true,
    interestLevel: "high",
    lastScouted: "2024-03-19T11:30:00Z"
  },
  {
    id: "lp6",
    name: "Carlos García",
    position: "DEF",
    age: 29,
    nationality: "España",
    team: "Real Sociedad",
    teamId: "7",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    overall: 83,
    matches: 15,
    minutes: 1350,
    goals: 1,
    assists: 3,
    yellowCards: 5,
    redCards: 0,
    passAccuracy: 88,
    tackles: 42,
    interceptions: 35,
    shotsOnTarget: 5,
    contractUntil: "2025-06-30",
    strengths: ["Velocidad", "Cruce", "Resistencia", "Versatilidad"],
    weaknesses: ["Juego aéreo", "Finalización", "Disciplina"],
    preferredFoot: "left",
    height: 180,
    weight: 75,
    isTarget: false,
    interestLevel: "low",
    lastScouted: "2024-03-12T15:45:00Z"
  },
  {
    id: "lp7",
    name: "Antonio López",
    position: "DEF",
    age: 31,
    nationality: "España",
    team: "Villarreal CF",
    teamId: "8",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    overall: 86,
    matches: 16,
    minutes: 1440,
    goals: 2,
    assists: 1,
    yellowCards: 3,
    redCards: 0,
    passAccuracy: 91,
    tackles: 48,
    interceptions: 42,
    shotsOnTarget: 6,
    contractUntil: "2026-06-30",
    strengths: ["Liderazgo", "Juego aéreo", "Pases", "Experiencia"],
    weaknesses: ["Velocidad", "Edad", "Flexibilidad"],
    preferredFoot: "right",
    height: 185,
    weight: 83,
    isTarget: true,
    interestLevel: "medium",
    lastScouted: "2024-03-17T09:15:00Z"
  },
  {
    id: "lp8",
    name: "David Ruiz",
    position: "MID",
    age: 27,
    nationality: "España",
    team: "Athletic Club",
    teamId: "9",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
    overall: 85,
    matches: 15,
    minutes: 1350,
    goals: 5,
    assists: 8,
    yellowCards: 4,
    redCards: 0,
    passAccuracy: 87,
    tackles: 35,
    interceptions: 28,
    shotsOnTarget: 15,
    contractUntil: "2027-06-30",
    strengths: ["Resistencia", "Pases", "Técnica", "Versatilidad"],
    weaknesses: ["Velocidad", "Juego aéreo", "Finalización"],
    preferredFoot: "both",
    height: 182,
    weight: 78,
    isTarget: false,
    interestLevel: "medium",
    lastScouted: "2024-03-14T13:20:00Z"
  },
  {
    id: "lp9",
    name: "Jorge Martín",
    position: "DEF",
    age: 25,
    nationality: "España",
    team: "Real Betis",
    teamId: "10",
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&h=150&fit=crop&crop=face",
    overall: 82,
    matches: 14,
    minutes: 1260,
    goals: 0,
    assists: 4,
    yellowCards: 2,
    redCards: 0,
    passAccuracy: 86,
    tackles: 38,
    interceptions: 32,
    shotsOnTarget: 3,
    contractUntil: "2026-06-30",
    strengths: ["Velocidad", "Cruce", "Resistencia", "Juventud"],
    weaknesses: ["Juego aéreo", "Finalización", "Experiencia"],
    preferredFoot: "right",
    height: 179,
    weight: 74,
    isTarget: false,
    interestLevel: "low",
    lastScouted: "2024-03-11T10:30:00Z"
  },
  {
    id: "lp10",
    name: "Pedro Sánchez",
    position: "MID",
    age: 30,
    nationality: "España",
    team: "Getafe CF",
    teamId: "11",
    avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&crop=face",
    overall: 84,
    matches: 16,
    minutes: 1440,
    goals: 6,
    assists: 7,
    yellowCards: 3,
    redCards: 0,
    passAccuracy: 88,
    tackles: 32,
    interceptions: 25,
    shotsOnTarget: 20,
    contractUntil: "2025-06-30",
    strengths: ["Experiencia", "Pases", "Técnica", "Liderazgo"],
    weaknesses: ["Velocidad", "Fuerza física", "Edad"],
    preferredFoot: "right",
    height: 176,
    weight: 73,
    isTarget: true,
    interestLevel: "medium",
    lastScouted: "2024-03-16T14:00:00Z"
  }
]

// Interfaces para análisis de liga
export interface LeagueTable {
  position: number
  teamId: string
  teamName: string
  teamLogo?: string
  matches: number
  wins: number
  draws: number
  losses: number
  goalsFor: number
  goalsAgainst: number
  goalDifference: number
  points: number
  form: ("W" | "D" | "L")[]
  lastMatch: string
}

export interface LeagueStats {
  season: string
  totalTeams: number
  totalMatches: number
  matchesPlayed: number
  matchesRemaining: number
  averageGoalsPerMatch: number
  totalGoals: number
  competitiveness: {
    score: number // 0-100, donde 100 es muy competitivo
    description: string
    top4Points: number
    bottom4Points: number
    pointsDifference: number
  }
  topPerformers: {
    topScorer: {
      playerId: string
      playerName: string
      team: string
      goals: number
    }
    topAssister: {
      playerId: string
      playerName: string
      team: string
      assists: number
    }
    bestDefense: {
      teamId: string
      teamName: string
      goalsConceded: number
    }
    bestAttack: {
      teamId: string
      teamName: string
      goalsScored: number
    }
  }
  trends: {
    mostWins: string
    mostDraws: string
    mostLosses: string
    bestForm: string
    worstForm: string
  }
  upcomingMatches: {
    id: string
    homeTeam: string
    awayTeam: string
    date: string
    importance: "high" | "medium" | "low"
    description: string
  }[]
}

export interface TeamPerformance {
  teamId: string
  teamName: string
  performance: {
    home: {
      matches: number
      wins: number
      draws: number
      losses: number
      points: number
      winRate: number
    }
    away: {
      matches: number
      wins: number
      draws: number
      losses: number
      points: number
      winRate: number
    }
    overall: {
      winRate: number
      goalDifference: number
      form: string
      consistency: number
    }
  }
  strengths: string[]
  weaknesses: string[]
  keyPlayers: {
    playerId: string
    playerName: string
    position: string
    contribution: number
  }[]
}

export interface TournamentBracket {
  id: string
  name: string
  season: string
  status: "group_stage" | "knockout" | "final" | "completed"
  rounds: {
    id: string
    name: string
    type: "group" | "round_16" | "quarter" | "semi" | "final"
    matches: {
      id: string
      homeTeam: string
      awayTeam: string
      homeTeamId: string
      awayTeamId: string
      homeScore?: number
      awayScore?: number
      date: string
      status: "scheduled" | "live" | "finished"
      winner?: string
      winnerId?: string
    }[]
  }[]
}

// Mock data de llave del torneo
export const mockTournamentBracket: TournamentBracket = {
  id: "bracket1",
  name: "Copa Primavera 2024",
  season: "2024",
  status: "knockout",
  rounds: [
    {
      id: "round_16",
      name: "Octavos de Final",
      type: "round_16",
      matches: [
        {
          id: "m1",
          homeTeam: "Real Madrid CF",
          awayTeam: "Getafe CF",
          homeTeamId: "2",
          awayTeamId: "11",
          homeScore: 3,
          awayScore: 0,
          date: "2024-03-15T20:00:00Z",
          status: "finished",
          winner: "Real Madrid CF",
          winnerId: "2"
        },
        {
          id: "m2",
          homeTeam: "FC Barcelona",
          awayTeam: "Real Betis",
          homeTeamId: "3",
          awayTeamId: "10",
          homeScore: 2,
          awayScore: 1,
          date: "2024-03-16T18:30:00Z",
          status: "finished",
          winner: "FC Barcelona",
          winnerId: "3"
        },
        {
          id: "m3",
          homeTeam: "Atlético Madrid",
          awayTeam: "Athletic Club",
          homeTeamId: "4",
          awayTeamId: "9",
          homeScore: 1,
          awayScore: 0,
          date: "2024-03-17T19:00:00Z",
          status: "finished",
          winner: "Atlético Madrid",
          winnerId: "4"
        },
        {
          id: "m4",
          homeTeam: "Valencia CF",
          awayTeam: "Villarreal CF",
          homeTeamId: "5",
          awayTeamId: "8",
          homeScore: 2,
          awayScore: 2,
          date: "2024-03-18T21:00:00Z",
          status: "finished",
          winner: "Valencia CF",
          winnerId: "5"
        },
        {
          id: "m5",
          homeTeam: "Sevilla FC",
          awayTeam: "Real Sociedad",
          homeTeamId: "6",
          awayTeamId: "7",
          homeScore: 1,
          awayScore: 1,
          date: "2024-03-19T20:30:00Z",
          status: "finished",
          winner: "Sevilla FC",
          winnerId: "6"
        }
      ]
    },
    {
      id: "quarter",
      name: "Cuartos de Final",
      type: "quarter",
      matches: [
        {
          id: "q1",
          homeTeam: "Real Madrid CF",
          awayTeam: "Valencia CF",
          homeTeamId: "2",
          awayTeamId: "5",
          homeScore: 2,
          awayScore: 1,
          date: "2024-03-22T20:00:00Z",
          status: "finished",
          winner: "Real Madrid CF",
          winnerId: "2"
        },
        {
          id: "q2",
          homeTeam: "FC Barcelona",
          awayTeam: "Atlético Madrid",
          homeTeamId: "3",
          awayTeamId: "4",
          homeScore: 1,
          awayScore: 0,
          date: "2024-03-23T18:30:00Z",
          status: "finished",
          winner: "FC Barcelona",
          winnerId: "3"
        },
        {
          id: "q3",
          homeTeam: "Sevilla FC",
          awayTeam: "TBD",
          homeTeamId: "6",
          awayTeamId: "tbd",
          date: "2024-03-24T19:00:00Z",
          status: "scheduled"
        }
      ]
    },
    {
      id: "semi",
      name: "Semifinales",
      type: "semi",
      matches: [
        {
          id: "s1",
          homeTeam: "Real Madrid CF",
          awayTeam: "TBD",
          homeTeamId: "2",
          awayTeamId: "tbd",
          date: "2024-03-28T20:00:00Z",
          status: "scheduled"
        },
        {
          id: "s2",
          homeTeam: "FC Barcelona",
          awayTeam: "TBD",
          homeTeamId: "3",
          awayTeamId: "tbd",
          date: "2024-03-29T18:30:00Z",
          status: "scheduled"
        }
      ]
    },
    {
      id: "final",
      name: "Final",
      type: "final",
      matches: [
        {
          id: "f1",
          homeTeam: "TBD",
          awayTeam: "TBD",
          homeTeamId: "tbd",
          awayTeamId: "tbd",
          date: "2024-04-05T20:00:00Z",
          status: "scheduled"
        }
      ]
    }
  ]
}

// Mock data de tabla de posiciones
export const mockLeagueTable: LeagueTable[] = [
  {
    position: 1,
    teamId: "2",
    teamName: "Real Madrid CF",
    teamLogo: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=40&h=40&fit=crop",
    matches: 15,
    wins: 11,
    draws: 2,
    losses: 2,
    goalsFor: 32,
    goalsAgainst: 12,
    goalDifference: 20,
    points: 35,
    form: ["W", "W", "D", "W", "W"],
    lastMatch: "2024-03-20T15:00:00Z"
  },
  {
    position: 2,
    teamId: "3",
    teamName: "FC Barcelona",
    teamLogo: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=40&h=40&fit=crop",
    matches: 15,
    wins: 10,
    draws: 3,
    losses: 2,
    goalsFor: 28,
    goalsAgainst: 14,
    goalDifference: 14,
    points: 33,
    form: ["W", "D", "W", "W", "D"],
    lastMatch: "2024-03-19T16:30:00Z"
  },
  {
    position: 3,
    teamId: "4",
    teamName: "Atlético Madrid",
    teamLogo: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=40&h=40&fit=crop",
    matches: 15,
    wins: 9,
    draws: 4,
    losses: 2,
    goalsFor: 25,
    goalsAgainst: 16,
    goalDifference: 9,
    points: 31,
    form: ["D", "W", "W", "D", "W"],
    lastMatch: "2024-03-18T18:00:00Z"
  },
  {
    position: 4,
    teamId: "5",
    teamName: "Valencia CF",
    teamLogo: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=40&h=40&fit=crop",
    matches: 15,
    wins: 8,
    draws: 5,
    losses: 2,
    goalsFor: 22,
    goalsAgainst: 15,
    goalDifference: 7,
    points: 29,
    form: ["W", "D", "D", "W", "W"],
    lastMatch: "2024-03-17T20:00:00Z"
  },
  {
    position: 5,
    teamId: "6",
    teamName: "Sevilla FC",
    teamLogo: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=40&h=40&fit=crop",
    matches: 15,
    wins: 7,
    draws: 6,
    losses: 2,
    goalsFor: 20,
    goalsAgainst: 18,
    goalDifference: 2,
    points: 27,
    form: ["D", "W", "D", "W", "D"],
    lastMatch: "2024-03-16T17:00:00Z"
  },
  {
    position: 6,
    teamId: "7",
    teamName: "Real Sociedad",
    teamLogo: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=40&h=40&fit=crop",
    matches: 15,
    wins: 6,
    draws: 7,
    losses: 2,
    goalsFor: 18,
    goalsAgainst: 19,
    goalDifference: -1,
    points: 25,
    form: ["D", "D", "W", "D", "L"],
    lastMatch: "2024-03-15T19:30:00Z"
  },
  {
    position: 7,
    teamId: "8",
    teamName: "Villarreal CF",
    teamLogo: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=40&h=40&fit=crop",
    matches: 15,
    wins: 5,
    draws: 8,
    losses: 2,
    goalsFor: 16,
    goalsAgainst: 20,
    goalDifference: -4,
    points: 23,
    form: ["D", "L", "D", "W", "D"],
    lastMatch: "2024-03-14T21:00:00Z"
  },
  {
    position: 8,
    teamId: "9",
    teamName: "Athletic Club",
    teamLogo: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=40&h=40&fit=crop",
    matches: 15,
    wins: 4,
    draws: 9,
    losses: 2,
    goalsFor: 14,
    goalsAgainst: 22,
    goalDifference: -8,
    points: 21,
    form: ["D", "D", "L", "D", "W"],
    lastMatch: "2024-03-13T18:30:00Z"
  },
  {
    position: 9,
    teamId: "10",
    teamName: "Real Betis",
    teamLogo: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=40&h=40&fit=crop",
    matches: 15,
    wins: 3,
    draws: 10,
    losses: 2,
    goalsFor: 12,
    goalsAgainst: 24,
    goalDifference: -12,
    points: 19,
    form: ["D", "L", "D", "D", "L"],
    lastMatch: "2024-03-12T16:00:00Z"
  },
  {
    position: 10,
    teamId: "11",
    teamName: "Getafe CF",
    teamLogo: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=40&h=40&fit=crop",
    matches: 15,
    wins: 2,
    draws: 11,
    losses: 2,
    goalsFor: 10,
    goalsAgainst: 26,
    goalDifference: -16,
    points: 17,
    form: ["D", "L", "D", "L", "D"],
    lastMatch: "2024-03-11T20:30:00Z"
  }
]

// Mock data de estadísticas de liga
export const mockLeagueStats: LeagueStats = {
  season: "2024",
  totalTeams: 10,
  totalMatches: 90,
  matchesPlayed: 75,
  matchesRemaining: 15,
  averageGoalsPerMatch: 2.4,
  totalGoals: 180,
  competitiveness: {
    score: 78,
    description: "Liga muy competitiva con varios equipos luchando por el título",
    top4Points: 128,
    bottom4Points: 80,
    pointsDifference: 48
  },
  topPerformers: {
    topScorer: {
      playerId: "lp1",
      playerName: "Diego Costa",
      team: "Real Madrid CF",
      goals: 12
    },
    topAssister: {
      playerId: "lp3",
      playerName: "Marco Silva",
      team: "Atlético Madrid",
      assists: 12
    },
    bestDefense: {
      teamId: "2",
      teamName: "Real Madrid CF",
      goalsConceded: 12
    },
    bestAttack: {
      teamId: "2",
      teamName: "Real Madrid CF",
      goalsScored: 32
    }
  },
  trends: {
    mostWins: "Real Madrid CF (11 victorias)",
    mostDraws: "Getafe CF (11 empates)",
    mostLosses: "Getafe CF (2 derrotas)",
    bestForm: "Real Madrid CF (4 victorias consecutivas)",
    worstForm: "Real Betis (3 partidos sin ganar)"
  },
  upcomingMatches: [
    {
      id: "um1",
      homeTeam: "Real Madrid CF",
      awayTeam: "FC Barcelona",
      date: "2024-03-25T20:00:00Z",
      importance: "high",
      description: "Clásico - Líder vs Subcampeón"
    },
    {
      id: "um2",
      homeTeam: "Atlético Madrid",
      awayTeam: "Valencia CF",
      date: "2024-03-26T18:30:00Z",
      importance: "high",
      description: "Lucha por el tercer puesto"
    },
    {
      id: "um3",
      homeTeam: "Sevilla FC",
      awayTeam: "Real Sociedad",
      date: "2024-03-27T19:00:00Z",
      importance: "medium",
      description: "Batalla por Europa"
    }
  ]
}

// Mock data de rendimiento de equipos
export const mockTeamPerformances: TeamPerformance[] = [
  {
    teamId: "2",
    teamName: "Real Madrid CF",
    performance: {
      home: {
        matches: 8,
        wins: 7,
        draws: 1,
        losses: 0,
        points: 22,
        winRate: 87.5
      },
      away: {
        matches: 7,
        wins: 4,
        draws: 1,
        losses: 2,
        points: 13,
        winRate: 57.1
      },
      overall: {
        winRate: 73.3,
        goalDifference: 20,
        form: "Excelente",
        consistency: 85
      }
    },
    strengths: ["Ataque letal", "Experiencia", "Liderazgo", "Presión alta"],
    weaknesses: ["Defensa aérea", "Rotaciones", "Lesiones"],
    keyPlayers: [
      { playerId: "lp1", playerName: "Diego Costa", position: "FWD", contribution: 35 },
      { playerId: "lp2", playerName: "Sergio Ramos", position: "DEF", contribution: 25 },
      { playerId: "lp3", playerName: "Marco Silva", position: "MID", contribution: 20 }
    ]
  },
  {
    teamId: "3",
    teamName: "FC Barcelona",
    performance: {
      home: {
        matches: 8,
        wins: 6,
        draws: 2,
        losses: 0,
        points: 20,
        winRate: 75
      },
      away: {
        matches: 7,
        wins: 4,
        draws: 1,
        losses: 2,
        points: 13,
        winRate: 57.1
      },
      overall: {
        winRate: 66.7,
        goalDifference: 14,
        form: "Buena",
        consistency: 78
      }
    },
    strengths: ["Posesión", "Técnica", "Juego colectivo", "Presión"],
    weaknesses: ["Fuerza física", "Defensa", "Dependencia de estrellas"],
    keyPlayers: [
      { playerId: "lp4", playerName: "Miguel Torres", position: "GK", contribution: 30 },
      { playerId: "lp5", playerName: "Álvaro González", position: "FWD", contribution: 28 },
      { playerId: "lp6", playerName: "Carlos García", position: "DEF", contribution: 22 }
    ]
  },
  {
    teamId: "11",
    teamName: "Getafe CF",
    performance: {
      home: {
        matches: 8,
        wins: 1,
        draws: 6,
        losses: 1,
        points: 9,
        winRate: 12.5
      },
      away: {
        matches: 7,
        wins: 1,
        draws: 5,
        losses: 1,
        points: 8,
        winRate: 14.3
      },
      overall: {
        winRate: 13.3,
        goalDifference: -16,
        form: "Mala",
        consistency: 45
      }
    },
    strengths: ["Defensa compacta", "Disciplina", "Trabajo en equipo"],
    weaknesses: ["Ataque", "Creatividad", "Experiencia", "Calidad individual"],
    keyPlayers: [
      { playerId: "lp10", playerName: "Pedro Sánchez", position: "MID", contribution: 40 },
      { playerId: "lp9", playerName: "Jorge Martín", position: "DEF", contribution: 25 },
      { playerId: "lp8", playerName: "David Ruiz", position: "MID", contribution: 20 }
    ]
  }
]

// Mock Player Profile - Luis Martínez
export const mockPlayerProfile: PlayerProfile = {
  id: "3",
  name: "Luis Martínez",
  position: "FWD",
  age: 24,
  nationality: "España",
  height: 178,
  weight: 72,
  preferredFoot: "right",
  jerseyNumber: 9,
  team: "Águilas FC",
  avatar: "/placeholder-user.jpg",
  // Estadísticas FIFA-style
  overall: 82,
  pace: 85,
  shooting: 88,
  passing: 76,
  dribbling: 84,
  defending: 45,
  physical: 78,
  // Estadísticas temporada 2024
  goals: 8,
  assists: 6,
  matches: 10,
  minutes: 878,
  yellowCards: 4,
  redCards: 0,
  // Información adicional
  contractUntil: "2026-06-30",
  marketValue: 15.5,
  joinedDate: "2022-07-01"
}

// Mock Badges
export const mockBadges: Badge[] = [
  // Goles
  {
    id: "b1",
    name: "Hat-Trick Hero",
    description: "Marca 3 goles en un solo partido",
    icon: "🎩",
    category: "goals",
    rarity: "epic",
    unlockedAt: "2024-03-15T16:30:00Z",
    isUnlocked: true
  },
  {
    id: "b2",
    name: "Goleador Nato",
    description: "Marca 10 goles en una temporada",
    icon: "⚽",
    category: "goals",
    rarity: "rare",
    unlockedAt: "2024-03-20T15:00:00Z",
    isUnlocked: true
  },
  {
    id: "b3",
    name: "Chilena Maestra",
    description: "Marca un gol de chilena",
    icon: "🦵",
    category: "goals",
    rarity: "legendary",
    unlockedAt: "2024-02-22T16:00:00Z",
    isUnlocked: true
  },
  {
    id: "b4",
    name: "Gol de Media Distancia",
    description: "Marca desde fuera del área",
    icon: "🎯",
    category: "goals",
    rarity: "common",
    unlockedAt: "2024-03-10T14:00:00Z",
    isUnlocked: true
  },
  {
    id: "b5",
    name: "Centurión",
    description: "Marca 100 goles en tu carrera",
    icon: "💯",
    category: "goals",
    rarity: "legendary",
    unlockedAt: "",
    isUnlocked: false,
    progress: { current: 8, max: 100 }
  },
  
  // Asistencias
  {
    id: "b6",
    name: "Asistente Perfecto",
    description: "Da 5 asistencias en un partido",
    icon: "🎭",
    category: "assists",
    rarity: "epic",
    unlockedAt: "2024-03-10T14:00:00Z",
    isUnlocked: true
  },
  {
    id: "b7",
    name: "Creador de Juego",
    description: "Da 20 asistencias en una temporada",
    icon: "🎨",
    category: "assists",
    rarity: "rare",
    unlockedAt: "",
    isUnlocked: false,
    progress: { current: 6, max: 20 }
  },
  {
    id: "b8",
    name: "Pase de Oro",
    description: "Asistencia con pase de 30+ metros",
    icon: "✨",
    category: "assists",
    rarity: "rare",
    unlockedAt: "2024-03-20T15:00:00Z",
    isUnlocked: true
  },
  
  // Defensa
  {
    id: "b9",
    name: "Muro Infranqueable",
    description: "10 partidos sin recibir goles",
    icon: "🛡️",
    category: "defense",
    rarity: "epic",
    unlockedAt: "",
    isUnlocked: false,
    progress: { current: 3, max: 10 }
  },
  {
    id: "b10",
    name: "Interceptador",
    description: "10 intercepciones en un partido",
    icon: "🕵️",
    category: "defense",
    rarity: "rare",
    unlockedAt: "2024-02-03T16:15:00Z",
    isUnlocked: true
  },
  
  // Especiales
  {
    id: "b11",
    name: "Rabona King",
    description: "Marca un gol de rabona",
    icon: "🦶",
    category: "special",
    rarity: "legendary",
    unlockedAt: "",
    isUnlocked: false
  },
  {
    id: "b12",
    name: "Panenka Master",
    description: "Marca un penalti estilo Panenka",
    icon: "🥅",
    category: "special",
    rarity: "epic",
    unlockedAt: "",
    isUnlocked: false
  },
  {
    id: "b13",
    name: "Bicycle Kick",
    description: "Marca un gol de tijera",
    icon: "🤸",
    category: "special",
    rarity: "legendary",
    unlockedAt: "",
    isUnlocked: false
  },
  
  // Logros
  {
    id: "b14",
    name: "Rookie del Año",
    description: "Mejor jugador joven de la temporada",
    icon: "🌟",
    category: "achievement",
    rarity: "epic",
    unlockedAt: "2023-06-30T23:59:59Z",
    isUnlocked: true
  },
  {
    id: "b15",
    name: "Capitán",
    description: "Lidera tu equipo como capitán",
    icon: "👑",
    category: "achievement",
    rarity: "rare",
    unlockedAt: "",
    isUnlocked: false
  },
  {
    id: "b16",
    name: "MVP del Partido",
    description: "Mejor jugador del partido 5 veces",
    icon: "🏆",
    category: "achievement",
    rarity: "rare",
    unlockedAt: "",
    isUnlocked: false,
    progress: { current: 2, max: 5 }
  },
  
  // Hitos
  {
    id: "b17",
    name: "Primer Gol",
    description: "Marca tu primer gol profesional",
    icon: "🥇",
    category: "milestone",
    rarity: "common",
    unlockedAt: "2022-08-15T18:30:00Z",
    isUnlocked: true
  },
  {
    id: "b18",
    name: "50 Partidos",
    description: "Juega 50 partidos oficiales",
    icon: "📊",
    category: "milestone",
    rarity: "common",
    unlockedAt: "",
    isUnlocked: false,
    progress: { current: 10, max: 50 }
  },
  {
    id: "b19",
    name: "Leyenda del Club",
    description: "Juega 200 partidos con el mismo club",
    icon: "🏛️",
    category: "milestone",
    rarity: "legendary",
    unlockedAt: "",
    isUnlocked: false,
    progress: { current: 45, max: 200 }
  }
]

// Mock Badge Categories
export const mockBadgeCategories: BadgeCategory[] = [
  {
    id: "goals",
    name: "Goles",
    description: "Logros relacionados con anotaciones",
    icon: "⚽",
    color: "text-red-500",
    badges: mockBadges.filter(b => b.category === "goals")
  },
  {
    id: "assists",
    name: "Asistencias",
    description: "Logros de pases y asistencias",
    icon: "🎭",
    color: "text-blue-500",
    badges: mockBadges.filter(b => b.category === "assists")
  },
  {
    id: "defense",
    name: "Defensa",
    description: "Logros defensivos y atajadas",
    icon: "🛡️",
    color: "text-green-500",
    badges: mockBadges.filter(b => b.category === "defense")
  },
  {
    id: "special",
    name: "Especiales",
    description: "Jugadas especiales y técnicas",
    icon: "✨",
    color: "text-purple-500",
    badges: mockBadges.filter(b => b.category === "special")
  },
  {
    id: "achievement",
    name: "Logros",
    description: "Reconocimientos y premios",
    icon: "🏆",
    color: "text-yellow-500",
    badges: mockBadges.filter(b => b.category === "achievement")
  },
  {
    id: "milestone",
    name: "Hitos",
    description: "Marcas personales y de carrera",
    icon: "📈",
    color: "text-orange-500",
    badges: mockBadges.filter(b => b.category === "milestone")
  }
]

// Mock Teams
export const mockTeams: Team[] = [
  {
    id: "1",
    name: "Águilas FC",
    coachId: "1",
    players: ["3", "5"],
    category: "Primera División",
    wins: 8,
    losses: 2,
    draws: 3,
  },
  {
    id: "2",
    name: "Leones United",
    coachId: "6",
    players: ["3"],
    category: "Primera División",
    wins: 6,
    losses: 4,
    draws: 3,
  },
  {
    id: "3",
    name: "Tigres Rojos",
    coachId: "1",
    players: ["5"],
    category: "Segunda División",
    wins: 10,
    losses: 1,
    draws: 2,
  },
]

// Mock Tournaments
export const mockTournaments: Tournament[] = [
  {
    id: "1",
    name: "Copa Primavera 2024",
    description: "Torneo de fútbol amateur más importante de la región",
    startDate: "2024-03-15",
    endDate: "2024-05-20",
    category: "Primera División",
    status: "active",
    teams: ["1", "2"],
    ownerId: "2",
    maxTeams: 16,
  },
  {
    id: "2",
    name: "Liga Juvenil",
    description: "Competencia para equipos sub-21",
    startDate: "2024-04-01",
    endDate: "2024-06-30",
    category: "Segunda División",
    status: "upcoming",
    teams: ["3"],
    ownerId: "2",
    maxTeams: 12,
  },
  {
    id: "3",
    name: "Torneo de Verano",
    description: "Competencia de temporada alta",
    startDate: "2024-01-15",
    endDate: "2024-02-28",
    category: "Primera División",
    status: "completed",
    teams: ["1", "2"],
    ownerId: "2",
    maxTeams: 8,
  },
]

// Mock Matches
export const mockMatches: Match[] = [
  {
    id: "1",
    tournamentId: "1",
    homeTeamId: "1",
    awayTeamId: "2",
    homeScore: 2,
    awayScore: 1,
    date: "2024-03-20T15:00:00Z",
    status: "completed",
  },
  {
    id: "2",
    tournamentId: "1",
    homeTeamId: "2",
    awayTeamId: "1",
    homeScore: 0,
    awayScore: 0,
    date: "2024-04-15T18:00:00Z",
    status: "scheduled",
  },
]

// Mock Player Stats
export const mockPlayerStats: PlayerStats[] = [
  {
    playerId: "3",
    tournamentId: "1",
    goals: 5,
    assists: 3,
    yellowCards: 2,
    redCards: 0,
    minutesPlayed: 450,
  },
  {
    playerId: "5",
    tournamentId: "1",
    goals: 3,
    assists: 2,
    yellowCards: 1,
    redCards: 0,
    minutesPlayed: 380,
  },
]

// Mock Match Performances - Últimos 10 partidos del jugador Luis Martínez (ID: 3)
export const mockMatchPerformances: MatchPerformance[] = [
  {
    id: "mp1",
    playerId: "3",
    matchId: "1",
    teamId: "1",
    opponentTeamId: "2",
    date: "2024-03-20T15:00:00Z",
    goals: 1,
    assists: 1,
    yellowCards: 0,
    redCards: 0,
    minutesPlayed: 90,
    shots: 4,
    shotsOnTarget: 2,
    passes: 45,
    passesCompleted: 38,
    keyPasses: 3,
    crosses: 2,
    crossesCompleted: 1,
    tackles: 2,
    tacklesWon: 1,
    interceptions: 3,
    clearances: 1,
    duels: 8,
    duelsWon: 5,
    aerialDuels: 3,
    aerialDuelsWon: 2,
    foulsCommitted: 1,
    foulsWon: 2,
    offsides: 0,
    rating: 8.2,
    position: "FWD",
    result: "W",
    teamScore: 2,
    opponentScore: 1
  },
  {
    id: "mp2",
    playerId: "3",
    matchId: "2",
    teamId: "1",
    opponentTeamId: "3",
    date: "2024-03-15T16:30:00Z",
    goals: 2,
    assists: 0,
    yellowCards: 1,
    redCards: 0,
    minutesPlayed: 85,
    shots: 6,
    shotsOnTarget: 4,
    passes: 32,
    passesCompleted: 28,
    keyPasses: 2,
    crosses: 1,
    crossesCompleted: 0,
    tackles: 1,
    tacklesWon: 0,
    interceptions: 2,
    clearances: 0,
    duels: 6,
    duelsWon: 4,
    aerialDuels: 2,
    aerialDuelsWon: 1,
    foulsCommitted: 2,
    foulsWon: 1,
    offsides: 1,
    rating: 9.1,
    position: "FWD",
    result: "W",
    teamScore: 3,
    opponentScore: 0
  },
  {
    id: "mp3",
    playerId: "3",
    matchId: "3",
    teamId: "1",
    opponentTeamId: "4",
    date: "2024-03-10T14:00:00Z",
    goals: 0,
    assists: 2,
    yellowCards: 0,
    redCards: 0,
    minutesPlayed: 90,
    shots: 2,
    shotsOnTarget: 1,
    passes: 52,
    passesCompleted: 46,
    keyPasses: 4,
    crosses: 3,
    crossesCompleted: 2,
    tackles: 3,
    tacklesWon: 2,
    interceptions: 4,
    clearances: 1,
    duels: 10,
    duelsWon: 7,
    aerialDuels: 4,
    aerialDuelsWon: 3,
    foulsCommitted: 0,
    foulsWon: 3,
    offsides: 0,
    rating: 7.8,
    position: "FWD",
    result: "W",
    teamScore: 2,
    opponentScore: 1
  },
  {
    id: "mp4",
    playerId: "3",
    matchId: "4",
    teamId: "1",
    opponentTeamId: "5",
    date: "2024-03-05T18:00:00Z",
    goals: 1,
    assists: 0,
    yellowCards: 0,
    redCards: 0,
    minutesPlayed: 90,
    shots: 3,
    shotsOnTarget: 2,
    passes: 38,
    passesCompleted: 32,
    keyPasses: 1,
    crosses: 1,
    crossesCompleted: 0,
    tackles: 2,
    tacklesWon: 1,
    interceptions: 2,
    clearances: 0,
    duels: 7,
    duelsWon: 4,
    aerialDuels: 3,
    aerialDuelsWon: 2,
    foulsCommitted: 1,
    foulsWon: 2,
    offsides: 1,
    rating: 7.5,
    position: "FWD",
    result: "D",
    teamScore: 1,
    opponentScore: 1
  },
  {
    id: "mp5",
    playerId: "3",
    matchId: "5",
    teamId: "1",
    opponentTeamId: "6",
    date: "2024-02-28T15:30:00Z",
    goals: 0,
    assists: 1,
    yellowCards: 1,
    redCards: 0,
    minutesPlayed: 75,
    shots: 1,
    shotsOnTarget: 0,
    passes: 28,
    passesCompleted: 24,
    keyPasses: 2,
    crosses: 2,
    crossesCompleted: 1,
    tackles: 4,
    tacklesWon: 3,
    interceptions: 3,
    clearances: 1,
    duels: 9,
    duelsWon: 6,
    aerialDuels: 2,
    aerialDuelsWon: 1,
    foulsCommitted: 2,
    foulsWon: 1,
    offsides: 0,
    rating: 6.9,
    position: "FWD",
    result: "L",
    teamScore: 0,
    opponentScore: 2
  },
  {
    id: "mp6",
    playerId: "3",
    matchId: "6",
    teamId: "1",
    opponentTeamId: "7",
    date: "2024-02-22T16:00:00Z",
    goals: 2,
    assists: 1,
    yellowCards: 0,
    redCards: 0,
    minutesPlayed: 90,
    shots: 5,
    shotsOnTarget: 3,
    passes: 41,
    passesCompleted: 36,
    keyPasses: 3,
    crosses: 1,
    crossesCompleted: 1,
    tackles: 1,
    tacklesWon: 1,
    interceptions: 2,
    clearances: 0,
    duels: 8,
    duelsWon: 5,
    aerialDuels: 3,
    aerialDuelsWon: 2,
    foulsCommitted: 0,
    foulsWon: 2,
    offsides: 0,
    rating: 8.7,
    position: "FWD",
    result: "W",
    teamScore: 3,
    opponentScore: 1
  },
  {
    id: "mp7",
    playerId: "3",
    matchId: "7",
    teamId: "1",
    opponentTeamId: "8",
    date: "2024-02-18T14:30:00Z",
    goals: 1,
    assists: 0,
    yellowCards: 0,
    redCards: 0,
    minutesPlayed: 88,
    shots: 4,
    shotsOnTarget: 2,
    passes: 35,
    passesCompleted: 30,
    keyPasses: 2,
    crosses: 2,
    crossesCompleted: 1,
    tackles: 2,
    tacklesWon: 1,
    interceptions: 3,
    clearances: 1,
    duels: 6,
    duelsWon: 4,
    aerialDuels: 2,
    aerialDuelsWon: 1,
    foulsCommitted: 1,
    foulsWon: 1,
    offsides: 1,
    rating: 7.3,
    position: "FWD",
    result: "W",
    teamScore: 2,
    opponentScore: 0
  },
  {
    id: "mp8",
    playerId: "3",
    matchId: "8",
    teamId: "1",
    opponentTeamId: "9",
    date: "2024-02-12T17:00:00Z",
    goals: 0,
    assists: 0,
    yellowCards: 1,
    redCards: 0,
    minutesPlayed: 90,
    shots: 2,
    shotsOnTarget: 1,
    passes: 48,
    passesCompleted: 42,
    keyPasses: 1,
    crosses: 3,
    crossesCompleted: 1,
    tackles: 3,
    tacklesWon: 2,
    interceptions: 4,
    clearances: 2,
    duels: 11,
    duelsWon: 7,
    aerialDuels: 5,
    aerialDuelsWon: 3,
    foulsCommitted: 2,
    foulsWon: 2,
    offsides: 0,
    rating: 6.8,
    position: "FWD",
    result: "D",
    teamScore: 1,
    opponentScore: 1
  },
  {
    id: "mp9",
    playerId: "3",
    matchId: "9",
    teamId: "1",
    opponentTeamId: "10",
    date: "2024-02-08T15:45:00Z",
    goals: 1,
    assists: 1,
    yellowCards: 0,
    redCards: 0,
    minutesPlayed: 90,
    shots: 3,
    shotsOnTarget: 2,
    passes: 39,
    passesCompleted: 34,
    keyPasses: 2,
    crosses: 1,
    crossesCompleted: 1,
    tackles: 2,
    tacklesWon: 1,
    interceptions: 2,
    clearances: 0,
    duels: 7,
    duelsWon: 5,
    aerialDuels: 2,
    aerialDuelsWon: 1,
    foulsCommitted: 1,
    foulsWon: 1,
    offsides: 0,
    rating: 7.9,
    position: "FWD",
    result: "W",
    teamScore: 2,
    opponentScore: 1
  },
  {
    id: "mp10",
    playerId: "3",
    matchId: "10",
    teamId: "1",
    opponentTeamId: "11",
    date: "2024-02-03T16:15:00Z",
    goals: 0,
    assists: 0,
    yellowCards: 0,
    redCards: 0,
    minutesPlayed: 90,
    shots: 1,
    shotsOnTarget: 0,
    passes: 44,
    passesCompleted: 38,
    keyPasses: 1,
    crosses: 2,
    crossesCompleted: 0,
    tackles: 4,
    tacklesWon: 3,
    interceptions: 5,
    clearances: 3,
    duels: 12,
    duelsWon: 8,
    aerialDuels: 4,
    aerialDuelsWon: 3,
    foulsCommitted: 1,
    foulsWon: 3,
    offsides: 0,
    rating: 6.5,
    position: "FWD",
    result: "L",
    teamScore: 0,
    opponentScore: 1
  }
]

// Estadísticas de temporada para Luis Martínez
export const mockPlayerSeasonStats: PlayerSeasonStats = {
  playerId: "3",
  season: "2024",
  totalMatches: 10,
  totalMinutes: 878,
  totalGoals: 8,
  totalAssists: 6,
  totalYellowCards: 4,
  totalRedCards: 0,
  avgGoals: 0.8,
  avgAssists: 0.6,
  avgRating: 7.5,
  avgMinutes: 87.8,
  goalConversionRate: 0.25, // 8 goles de 32 tiros
  passAccuracy: 0.84, // 84% de pases completados
  tackleSuccessRate: 0.65, // 65% de tackles exitosos
  duelSuccessRate: 0.61, // 61% de duelos ganados
  bestMatch: {
    id: "mp2",
    playerId: "3",
    matchId: "2",
    teamId: "1",
    opponentTeamId: "3",
    date: "2024-03-15T16:30:00Z",
    goals: 2,
    assists: 0,
    yellowCards: 1,
    redCards: 0,
    minutesPlayed: 85,
    shots: 6,
    shotsOnTarget: 4,
    passes: 32,
    passesCompleted: 28,
    keyPasses: 2,
    crosses: 1,
    crossesCompleted: 0,
    tackles: 1,
    tacklesWon: 0,
    interceptions: 2,
    clearances: 0,
    duels: 6,
    duelsWon: 4,
    aerialDuels: 2,
    aerialDuelsWon: 1,
    foulsCommitted: 2,
    foulsWon: 1,
    offsides: 1,
    rating: 9.1,
    position: "FWD",
    result: "W",
    teamScore: 3,
    opponentScore: 0
  },
  currentStreak: {
    type: "goals",
    count: 2 // Racha de 2 partidos consecutivos marcando
  }
}

// Dashboard Mock Data
export interface DashboardStats {
  totalTournaments: number
  totalTeams: number
  totalMatches: number
  upcomingMatches: number
  recentActivity: Activity[]
  quickActions: QuickAction[]
}

export interface Activity {
  id: string
  type: "match" | "tournament" | "team" | "player"
  title: string
  description: string
  timestamp: string
  status?: "completed" | "upcoming" | "live"
}

export interface QuickAction {
  id: string
  title: string
  description: string
  icon: string
  action: string
}

// Coach Dashboard Data
export const coachDashboardData: DashboardStats = {
  totalTournaments: 3,
  totalTeams: 2,
  totalMatches: 12,
  upcomingMatches: 4,
  recentActivity: [
    {
      id: "1",
      type: "match",
      title: "Águilas FC vs Leones United",
      description: "Partido completado - Victoria 2-1",
      timestamp: "2024-03-20T15:00:00Z",
      status: "completed"
    },
    {
      id: "2",
      type: "player",
      title: "Luis Martínez - Nuevo jugador",
      description: "Se unió al equipo Águilas FC",
      timestamp: "2024-03-18T10:30:00Z",
      status: "completed"
    },
    {
      id: "3",
      type: "match",
      title: "Próximo: Tigres Rojos vs Águilas FC",
      description: "Sábado 25 de Marzo, 16:00",
      timestamp: "2024-03-25T16:00:00Z",
      status: "upcoming"
    }
  ],
  quickActions: [
    {
      id: "1",
      title: "Gestionar Equipos",
      description: "Ver y editar información de equipos",
      icon: "Users",
      action: "teams"
    },
    {
      id: "2",
      title: "Crear Torneo",
      description: "Organizar nueva competencia",
      icon: "Trophy",
      action: "create-tournament"
    },
    {
      id: "3",
      title: "Ver Estadísticas",
      description: "Analizar rendimiento de jugadores",
      icon: "BarChart3",
      action: "stats"
    }
  ]
}

// Owner Dashboard Data
export const ownerDashboardData: DashboardStats = {
  totalTournaments: 5,
  totalTeams: 12,
  totalMatches: 28,
  upcomingMatches: 8,
  recentActivity: [
    {
      id: "1",
      type: "tournament",
      title: "Copa Primavera 2024",
      description: "Torneo activo con 8 equipos participantes",
      timestamp: "2024-03-15T09:00:00Z",
      status: "live"
    },
    {
      id: "2",
      type: "team",
      title: "Leones United",
      description: "Nuevo equipo registrado en Liga Juvenil",
      timestamp: "2024-03-19T14:20:00Z",
      status: "completed"
    },
    {
      id: "3",
      type: "match",
      title: "Final de Copa Primavera",
      description: "Programada para el 20 de Mayo",
      timestamp: "2024-05-20T18:00:00Z",
      status: "upcoming"
    }
  ],
  quickActions: [
    {
      id: "1",
      title: "Gestionar Torneos",
      description: "Crear y administrar competencias",
      icon: "Trophy",
      action: "tournaments"
    },
    {
      id: "2",
      title: "Ver Equipos",
      description: "Administrar equipos registrados",
      icon: "Users",
      action: "teams"
    },
    {
      id: "3",
      title: "Calendario",
      description: "Programar partidos y eventos",
      icon: "Calendar",
      action: "calendar"
    },
    {
      id: "4",
      title: "Reportes",
      description: "Generar reportes de liga",
      icon: "FileText",
      action: "reports"
    }
  ]
}

// Player Dashboard Data
export const playerDashboardData: DashboardStats = {
  totalTournaments: 2,
  totalTeams: 1,
  totalMatches: 8,
  upcomingMatches: 2,
  recentActivity: [
    {
      id: "1",
      type: "match",
      title: "Águilas FC vs Leones United",
      description: "Marcaste 1 gol y 1 asistencia",
      timestamp: "2024-03-20T15:00:00Z",
      status: "completed"
    },
    {
      id: "2",
      type: "tournament",
      title: "Copa Primavera 2024",
      description: "Te uniste al torneo",
      timestamp: "2024-03-15T10:00:00Z",
      status: "live"
    },
    {
      id: "3",
      type: "match",
      title: "Próximo: Tigres Rojos vs Águilas FC",
      description: "Tu próximo partido",
      timestamp: "2024-03-25T16:00:00Z",
      status: "upcoming"
    }
  ],
  quickActions: [
    {
      id: "1",
      title: "Mis Estadísticas",
      description: "Ver mi rendimiento personal",
      icon: "BarChart3",
      action: "stats"
    },
    {
      id: "2",
      title: "Mi Equipo",
      description: "Información de mi equipo",
      icon: "Users",
      action: "my-team"
    },
    {
      id: "3",
      title: "Próximos Partidos",
      description: "Ver calendario de partidos",
      icon: "Calendar",
      action: "calendar"
    },
    {
      id: "4",
      title: "Buscar Retas",
      description: "Encontrar partidos amistosos",
      icon: "Map",
      action: "retas"
    }
  ]
}

// Fan Dashboard Data
export const fanDashboardData: DashboardStats = {
  totalTournaments: 0,
  totalTeams: 3,
  totalMatches: 15,
  upcomingMatches: 5,
  recentActivity: [
    {
      id: "1",
      type: "match",
      title: "Águilas FC vs Leones United",
      description: "Partido finalizado - Águilas FC ganó 2-1",
      timestamp: "2024-03-20T15:00:00Z",
      status: "completed"
    },
    {
      id: "2",
      type: "team",
      title: "Águilas FC",
      description: "Tu equipo favorito ganó el partido",
      timestamp: "2024-03-20T17:00:00Z",
      status: "completed"
    },
    {
      id: "3",
      type: "match",
      title: "Próximo: Tigres Rojos vs Águilas FC",
      description: "No te pierdas este partido",
      timestamp: "2024-03-25T16:00:00Z",
      status: "upcoming"
    }
  ],
  quickActions: [
    {
      id: "1",
      title: "Equipos Favoritos",
      description: "Gestionar equipos seguidos",
      icon: "Heart",
      action: "favorites"
    },
    {
      id: "2",
      title: "Ver Partidos",
      description: "Calendario de partidos",
      icon: "Calendar",
      action: "calendar"
    },
    {
      id: "3",
      title: "Estadísticas",
      description: "Ver estadísticas de liga",
      icon: "BarChart3",
      action: "stats"
    },
    {
      id: "4",
      title: "Buscar Retas",
      description: "Ver partidos amistosos",
      icon: "Map",
      action: "retas"
    }
  ]
}

// Interfaces para canchas y retas
export interface Court {
  id: string
  name: string
  address: string
  latitude: number
  longitude: number
  type: "futbol" | "futbol_5" | "futbol_7" | "futbol_11"
  surface: "cesped_natural" | "cesped_sintetico" | "concreto" | "tierra"
  lights: boolean
  parking: boolean
  pricePerHour: number
  rating: number
  image?: string
  facilities: string[]
  availability: {
    day: string
    timeSlots: {
      start: string
      end: string
      available: boolean
      price?: number
    }[]
  }[]
}

export interface Reta {
  id: string
  courtId: string
  courtName: string
  courtAddress: string
  organizerId: string
  organizerName: string
  organizerAvatar?: string
  title: string
  description: string
  date: string
  startTime: string
  endTime: string
  maxPlayers: number
  currentPlayers: number
  players: {
    id: string
    name: string
    avatar?: string
    position?: "GK" | "DEF" | "MID" | "FWD"
    skillLevel: "beginner" | "intermediate" | "advanced" | "professional"
  }[]
  skillLevel: "beginner" | "intermediate" | "advanced" | "professional"
  price: number
  status: "open" | "full" | "started" | "completed" | "cancelled"
  rules: string[]
  equipment: string[]
  notes?: string
  latitude: number
  longitude: number
}

// Mock data de canchas
export const mockCourts: Court[] = [
  {
    id: "court1",
    name: "Cancha Los Olivos",
    address: "Av. Francisco I. Madero 123, Ciudad Victoria, Tamaulipas",
    latitude: 23.7500,
    longitude: -99.1400,
    type: "futbol_5",
    surface: "cesped_sintetico",
    lights: true,
    parking: true,
    pricePerHour: 80,
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=400&h=300&fit=crop",
    facilities: ["Vestuarios", "Baños", "Estacionamiento", "Tienda"],
    availability: [
      {
        day: "Lunes",
        timeSlots: [
          { start: "08:00", end: "09:00", available: true, price: 80 },
          { start: "09:00", end: "10:00", available: false },
          { start: "10:00", end: "11:00", available: true, price: 80 },
          { start: "11:00", end: "12:00", available: true, price: 80 },
          { start: "12:00", end: "13:00", available: false },
          { start: "13:00", end: "14:00", available: true, price: 80 },
          { start: "14:00", end: "15:00", available: true, price: 80 },
          { start: "15:00", end: "16:00", available: true, price: 80 },
          { start: "16:00", end: "17:00", available: true, price: 80 },
          { start: "17:00", end: "18:00", available: false },
          { start: "18:00", end: "19:00", available: true, price: 100 },
          { start: "19:00", end: "20:00", available: true, price: 100 },
          { start: "20:00", end: "21:00", available: true, price: 100 },
          { start: "21:00", end: "22:00", available: true, price: 100 }
        ]
      },
      {
        day: "Martes",
        timeSlots: [
          { start: "08:00", end: "09:00", available: true, price: 80 },
          { start: "09:00", end: "10:00", available: true, price: 80 },
          { start: "10:00", end: "11:00", available: true, price: 80 },
          { start: "11:00", end: "12:00", available: true, price: 80 },
          { start: "12:00", end: "13:00", available: true, price: 80 },
          { start: "13:00", end: "14:00", available: true, price: 80 },
          { start: "14:00", end: "15:00", available: true, price: 80 },
          { start: "15:00", end: "16:00", available: true, price: 80 },
          { start: "16:00", end: "17:00", available: true, price: 80 },
          { start: "17:00", end: "18:00", available: true, price: 80 },
          { start: "18:00", end: "19:00", available: true, price: 100 },
          { start: "19:00", end: "20:00", available: true, price: 100 },
          { start: "20:00", end: "21:00", available: true, price: 100 },
          { start: "21:00", end: "22:00", available: true, price: 100 }
        ]
      }
    ]
  },
  {
    id: "court2",
    name: "Complejo Deportivo San Miguel",
    address: "Calle Hidalgo 456, Ciudad Victoria, Tamaulipas",
    latitude: 23.7300,
    longitude: -99.1500,
    type: "futbol_7",
    surface: "cesped_natural",
    lights: true,
    parking: true,
    pricePerHour: 120,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1553778263-73a83bab9b0c?w=400&h=300&fit=crop",
    facilities: ["Vestuarios", "Baños", "Estacionamiento", "Restaurante", "Gimnasio"],
    availability: [
      {
        day: "Lunes",
        timeSlots: [
          { start: "08:00", end: "09:00", available: true, price: 120 },
          { start: "09:00", end: "10:00", available: true, price: 120 },
          { start: "10:00", end: "11:00", available: true, price: 120 },
          { start: "11:00", end: "12:00", available: true, price: 120 },
          { start: "12:00", end: "13:00", available: true, price: 120 },
          { start: "13:00", end: "14:00", available: true, price: 120 },
          { start: "14:00", end: "15:00", available: true, price: 120 },
          { start: "15:00", end: "16:00", available: true, price: 120 },
          { start: "16:00", end: "17:00", available: true, price: 120 },
          { start: "17:00", end: "18:00", available: true, price: 120 },
          { start: "18:00", end: "19:00", available: true, price: 150 },
          { start: "19:00", end: "20:00", available: true, price: 150 },
          { start: "20:00", end: "21:00", available: true, price: 150 },
          { start: "21:00", end: "22:00", available: true, price: 150 }
        ]
      }
    ]
  },
  {
    id: "court3",
    name: "Campo Deportivo Miraflores",
    address: "Av. Universidad 789, Ciudad Victoria, Tamaulipas",
    latitude: 23.7200,
    longitude: -99.1300,
    type: "futbol_11",
    surface: "cesped_sintetico",
    lights: true,
    parking: false,
    pricePerHour: 200,
    rating: 4.2,
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop",
    facilities: ["Vestuarios", "Baños", "Tienda"],
    availability: [
      {
        day: "Lunes",
        timeSlots: [
          { start: "08:00", end: "09:00", available: true, price: 200 },
          { start: "09:00", end: "10:00", available: true, price: 200 },
          { start: "10:00", end: "11:00", available: true, price: 200 },
          { start: "11:00", end: "12:00", available: true, price: 200 },
          { start: "12:00", end: "13:00", available: true, price: 200 },
          { start: "13:00", end: "14:00", available: true, price: 200 },
          { start: "14:00", end: "15:00", available: true, price: 200 },
          { start: "15:00", end: "16:00", available: true, price: 200 },
          { start: "16:00", end: "17:00", available: true, price: 200 },
          { start: "17:00", end: "18:00", available: true, price: 200 },
          { start: "18:00", end: "19:00", available: true, price: 250 },
          { start: "19:00", end: "20:00", available: true, price: 250 },
          { start: "20:00", end: "21:00", available: true, price: 250 },
          { start: "21:00", end: "22:00", available: true, price: 250 }
        ]
      }
    ]
  },
  {
    id: "court4",
    name: "Cancha El Prado",
    address: "Calle Morelos 321, Ciudad Victoria, Tamaulipas",
    latitude: 23.7600,
    longitude: -99.1600,
    type: "futbol_5",
    surface: "concreto",
    lights: false,
    parking: true,
    pricePerHour: 50,
    rating: 3.8,
    image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=400&h=300&fit=crop",
    facilities: ["Vestuarios", "Baños", "Estacionamiento"],
    availability: [
      {
        day: "Lunes",
        timeSlots: [
          { start: "08:00", end: "09:00", available: true, price: 50 },
          { start: "09:00", end: "10:00", available: true, price: 50 },
          { start: "10:00", end: "11:00", available: true, price: 50 },
          { start: "11:00", end: "12:00", available: true, price: 50 },
          { start: "12:00", end: "13:00", available: true, price: 50 },
          { start: "13:00", end: "14:00", available: true, price: 50 },
          { start: "14:00", end: "15:00", available: true, price: 50 },
          { start: "15:00", end: "16:00", available: true, price: 50 },
          { start: "16:00", end: "17:00", available: true, price: 50 },
          { start: "17:00", end: "18:00", available: true, price: 50 }
        ]
      }
    ]
  }
]

// Mock data de retas
export const mockRetas: Reta[] = [
  {
    id: "reta1",
    courtId: "court1",
    courtName: "Cancha Los Olivos",
    courtAddress: "Av. Francisco I. Madero 123, Ciudad Victoria, Tamaulipas",
    organizerId: "user1",
    organizerName: "Carlos Rodríguez",
    organizerAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    title: "Reta de Fútbol 5 - Nivel Intermedio",
    description: "Partido amistoso para jugadores de nivel intermedio. Ambiente relajado y buen fútbol.",
    date: "2024-03-22",
    startTime: "19:00",
    endTime: "21:00",
    maxPlayers: 10,
    currentPlayers: 7,
    players: [
      {
        id: "user1",
        name: "Carlos Rodríguez",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
        position: "MID",
        skillLevel: "intermediate"
      },
      {
        id: "user2",
        name: "María González",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
        position: "FWD",
        skillLevel: "intermediate"
      },
      {
        id: "user3",
        name: "Luis Martínez",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
        position: "DEF",
        skillLevel: "intermediate"
      },
      {
        id: "user4",
        name: "Ana López",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
        position: "GK",
        skillLevel: "intermediate"
      },
      {
        id: "user5",
        name: "Pedro Sánchez",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
        position: "MID",
        skillLevel: "intermediate"
      },
      {
        id: "user6",
        name: "Laura Torres",
        avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
        position: "FWD",
        skillLevel: "intermediate"
      },
      {
        id: "user7",
        name: "Diego Ramos",
        avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face",
        position: "DEF",
        skillLevel: "intermediate"
      }
    ],
    skillLevel: "intermediate",
    price: 15,
    status: "open",
    rules: [
      "Respeto entre jugadores",
      "No faltas bruscas",
      "Llegar 10 minutos antes",
      "Traer ropa deportiva"
    ],
    equipment: ["Pelota", "Conos", "Silbato"],
    notes: "Se proporcionará agua y fruta después del partido",
    latitude: 23.7500,
    longitude: -99.1400
  },
  {
    id: "reta2",
    courtId: "court2",
    courtName: "Complejo Deportivo San Miguel",
    courtAddress: "Calle Hidalgo 456, Ciudad Victoria, Tamaulipas",
    organizerId: "user8",
    organizerName: "Miguel Torres",
    organizerAvatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&crop=face",
    title: "Reta Fútbol 7 - Nivel Avanzado",
    description: "Partido para jugadores con experiencia. Intensidad alta y buen nivel técnico.",
    date: "2024-03-23",
    startTime: "18:00",
    endTime: "20:00",
    maxPlayers: 14,
    currentPlayers: 12,
    players: [
      {
        id: "user8",
        name: "Miguel Torres",
        avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&crop=face",
        position: "GK",
        skillLevel: "advanced"
      },
      {
        id: "user9",
        name: "Sofia Morales",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face",
        position: "DEF",
        skillLevel: "advanced"
      },
      {
        id: "user10",
        name: "Roberto Silva",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
        position: "MID",
        skillLevel: "advanced"
      },
      {
        id: "user11",
        name: "Carmen Ruiz",
        avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop&crop=face",
        position: "FWD",
        skillLevel: "advanced"
      },
      {
        id: "user12",
        name: "Fernando López",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
        position: "DEF",
        skillLevel: "advanced"
      },
      {
        id: "user13",
        name: "Patricia Vega",
        avatar: "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=150&h=150&fit=crop&crop=face",
        position: "MID",
        skillLevel: "advanced"
      },
      {
        id: "user14",
        name: "Alejandro Castro",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
        position: "FWD",
        skillLevel: "advanced"
      },
      {
        id: "user15",
        name: "Valeria Herrera",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
        position: "DEF",
        skillLevel: "advanced"
      },
      {
        id: "user16",
        name: "Ricardo Mendez",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
        position: "MID",
        skillLevel: "advanced"
      },
      {
        id: "user17",
        name: "Gabriela Flores",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
        position: "FWD",
        skillLevel: "advanced"
      },
      {
        id: "user18",
        name: "Hector Jimenez",
        avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face",
        position: "DEF",
        skillLevel: "advanced"
      },
      {
        id: "user19",
        name: "Monica Rojas",
        avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
        position: "MID",
        skillLevel: "advanced"
      }
    ],
    skillLevel: "advanced",
    price: 25,
    status: "open",
    rules: [
      "Nivel avanzado requerido",
      "Puntualidad obligatoria",
      "Equipamiento completo",
      "Actitud deportiva"
    ],
    equipment: ["Pelota", "Conos", "Silbato", "Chalecos"],
    notes: "Partido competitivo, se requiere experiencia",
    latitude: 23.7300,
    longitude: -99.1500
  },
  {
    id: "reta3",
    courtId: "court3",
    courtName: "Campo Deportivo Miraflores",
    courtAddress: "Av. Universidad 789, Ciudad Victoria, Tamaulipas",
    organizerId: "user20",
    organizerName: "Javier Mendoza",
    organizerAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    title: "Reta Fútbol 11 - Todos los Niveles",
    description: "Partido inclusivo para jugadores de todos los niveles. Ambiente amigable y divertido.",
    date: "2024-03-24",
    startTime: "16:00",
    endTime: "18:00",
    maxPlayers: 22,
    currentPlayers: 18,
    players: [
      {
        id: "user20",
        name: "Javier Mendoza",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
        position: "GK",
        skillLevel: "intermediate"
      },
      {
        id: "user21",
        name: "Elena Vargas",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
        position: "DEF",
        skillLevel: "beginner"
      },
      {
        id: "user22",
        name: "Oscar Paredes",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
        position: "MID",
        skillLevel: "intermediate"
      },
      {
        id: "user23",
        name: "Rosa Aguilar",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
        position: "FWD",
        skillLevel: "beginner"
      },
      {
        id: "user24",
        name: "Mario Castillo",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
        position: "DEF",
        skillLevel: "advanced"
      },
      {
        id: "user25",
        name: "Isabel Moreno",
        avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
        position: "MID",
        skillLevel: "intermediate"
      },
      {
        id: "user26",
        name: "Cesar Delgado",
        avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face",
        position: "FWD",
        skillLevel: "beginner"
      },
      {
        id: "user27",
        name: "Lucia Espinoza",
        avatar: "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=150&h=150&fit=crop&crop=face",
        position: "DEF",
        skillLevel: "intermediate"
      },
      {
        id: "user28",
        name: "Andres Rios",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
        position: "MID",
        skillLevel: "beginner"
      },
      {
        id: "user29",
        name: "Natalia Chavez",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face",
        position: "FWD",
        skillLevel: "intermediate"
      },
      {
        id: "user30",
        name: "Pablo Gutierrez",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
        position: "DEF",
        skillLevel: "advanced"
      },
      {
        id: "user31",
        name: "Andrea Salazar",
        avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop&crop=face",
        position: "MID",
        skillLevel: "beginner"
      },
      {
        id: "user32",
        name: "Raul Navarro",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
        position: "FWD",
        skillLevel: "intermediate"
      },
      {
        id: "user33",
        name: "Claudia Ramos",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
        position: "DEF",
        skillLevel: "beginner"
      },
      {
        id: "user34",
        name: "Gonzalo Fuentes",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
        position: "MID",
        skillLevel: "advanced"
      },
      {
        id: "user35",
        name: "Paola Medina",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
        position: "FWD",
        skillLevel: "intermediate"
      },
      {
        id: "user36",
        name: "Sebastian Cruz",
        avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face",
        position: "DEF",
        skillLevel: "beginner"
      },
      {
        id: "user37",
        name: "Daniela Ortiz",
        avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
        position: "MID",
        skillLevel: "intermediate"
      }
    ],
    skillLevel: "beginner",
    price: 20,
    status: "open",
    rules: [
      "Todos los niveles bienvenidos",
      "Respeto mutuo",
      "Diversión ante todo",
      "Llegar puntual"
    ],
    equipment: ["Pelota", "Conos", "Silbato", "Chalecos"],
    notes: "Partido amigable, perfecto para principiantes",
    latitude: 23.7200,
    longitude: -99.1300
  },
  {
    id: "reta4",
    courtId: "court4",
    courtName: "Cancha El Prado",
    courtAddress: "Calle Morelos 321, Ciudad Victoria, Tamaulipas",
    organizerId: "user38",
    organizerName: "Teresa Morales",
    organizerAvatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
    title: "Reta Fútbol 5 - Principiantes",
    description: "Ideal para quienes están empezando a jugar fútbol. Ambiente de aprendizaje y diversión.",
    date: "2024-03-25",
    startTime: "15:00",
    endTime: "17:00",
    maxPlayers: 10,
    currentPlayers: 6,
    players: [
      {
        id: "user38",
        name: "Teresa Morales",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
        position: "GK",
        skillLevel: "beginner"
      },
      {
        id: "user39",
        name: "Carlos Huerta",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
        position: "DEF",
        skillLevel: "beginner"
      },
      {
        id: "user40",
        name: "Mariana Silva",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
        position: "MID",
        skillLevel: "beginner"
      },
      {
        id: "user41",
        name: "Jorge Ponce",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
        position: "FWD",
        skillLevel: "beginner"
      },
      {
        id: "user42",
        name: "Silvia Rojas",
        avatar: "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=150&h=150&fit=crop&crop=face",
        position: "DEF",
        skillLevel: "beginner"
      },
      {
        id: "user43",
        name: "Roberto Vega",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
        position: "MID",
        skillLevel: "beginner"
      }
    ],
    skillLevel: "beginner",
    price: 8,
    status: "open",
    rules: [
      "Nivel principiante",
      "Paciencia con todos",
      "Aprender divirtiéndose",
      "No presionar"
    ],
    equipment: ["Pelota", "Conos"],
    notes: "Perfecto para aprender y hacer amigos",
    latitude: 23.7600,
    longitude: -99.1600
  }
]