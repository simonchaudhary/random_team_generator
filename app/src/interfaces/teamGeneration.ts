import { Player } from './player';
import { Team } from './team';

export interface TeamGenerationFormData {
  name: string;
}

export interface TeamGeneration {
  team: Team;
  players: Player[];
}

export interface AddEventTeam {
  eventId: number;
  teamId: number;
  playerId: number;
}

export interface TeamGeneration {
  team: Team;
  players: Player[];
}

export interface AddEventTeam {
  eventId: number;
  teamId: number;
  playerId: number;
}

export interface GenerateTeamsPayload {
  name: string;
  players: Player[];
  teams: Team[];
}

export interface EventData {
  id: string;
  name: string;
  created_at: string;
  updated_at: null;
  deleted_at: string | null;
}

export interface TeamAssignment {
  eventId: string;
  team: {
    id: number;
    name: string;
  };
  players: { id: number; name: string; skill: number }[];
  totalSkill: number;
}

export interface EventTeamsPayload {
  event_id: string;
  team_id: number;
  player_id: number;
}

export interface EventTeam {
  id: number;
  team_id: number;
  player_id: number;
  created_at: string;
  updated_at: null;
  deleted_at: null;
  event_id: string;
  teams: {
    name: string;
  };
  players: {
    name: string;
    skill: number;
  };
  events: {
    name: string;
  };
}

export interface TeamPlayer extends Team {
  players: Player[];
  totalSkill: number;
}

export interface EventGroupedData {
  eventId: string;
  eventName: string;
  teams: TeamPlayer[];
}
