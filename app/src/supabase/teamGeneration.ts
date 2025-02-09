import { supabase } from './supabaseClient';

import { TABLES } from './constant/common';

import { EventData, EventTeamsPayload } from '../interfaces/teamGeneration';

// Fetch all players
export async function fetchEventTeamById(event_id: string) {
  const { data, error } = await supabase
    .from(TABLES.EVENT_TEAMS)
    .select(
      `
      *,
      teams!inner(name),
      players!inner(name, skill),
      events!inner(name)
    `
    )
    .eq('event_id', event_id);

  if (error) throw error;
  return data;
}

// Add a event
export async function addEventToDB(name: string): Promise<EventData[]> {
  const { data, error } = await supabase
    .from(TABLES.EVENTS)
    .insert([{ name }])
    .select();

  if (error) throw error;

  return data;
}

// Add event teams
export async function addEventTeamsToDB(eventTeams: EventTeamsPayload[]) {
  const { data, error } = await supabase
    .from(TABLES.EVENT_TEAMS)
    .insert(eventTeams)
    .select();

  if (error) throw error;

  return data;
}
