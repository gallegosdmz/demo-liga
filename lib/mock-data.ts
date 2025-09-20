// Mock data for the sports tournament application

export interface User {
  id: string
  name: string
  email: string
  type: "coach" | "owner" | "player" | "fan"
  avatar?: string
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

// Mock Users
export const mockUsers: User[] = [
  { id: "1", name: "Carlos Rodríguez", email: "carlos@email.com", type: "coach" },
  { id: "2", name: "María González", email: "maria@email.com", type: "owner" },
  { id: "3", name: "Luis Martínez", email: "luis@email.com", type: "player" },
  { id: "4", name: "Ana López", email: "ana@email.com", type: "fan" },
  { id: "5", name: "Pedro Sánchez", email: "pedro@email.com", type: "player" },
  { id: "6", name: "Laura Torres", email: "laura@email.com", type: "coach" },
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
