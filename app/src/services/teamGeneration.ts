import {
  addEventToDB,
  addEventTeamsToDB,
  fetchEventTeamById
} from '../supabase/teamGeneration';

import { GenerateTeamsPayload } from '../interfaces/teamGeneration';

import { generateEventTeamsPayload } from '../utils/teamGeneration';

// Fetch events
export async function getEventTeamById(id: string) {
  const teams = await fetchEventTeamById(id);

  return teams;
}

// Generate a team
export async function generateTeams(payload: GenerateTeamsPayload) {
  const { name, players, teams } = payload;

  const [event] = await addEventToDB(name);

  const data = generateEventTeamsPayload(teams, players, event.id);

  await addEventTeamsToDB(data);

  return event;
}
