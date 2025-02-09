import {
  fetchTeams,
  insertTeam,
  updateTeamToDB,
  deleteTeamFromDB
} from '../supabase/team';

// Fetch teams
export async function getTeams() {
  const teams = await fetchTeams();

  return teams;
}

// Add a team
export async function addTeam(name: string) {
  const newTeam = await insertTeam(name);

  return newTeam;
}

// Update a team
export async function updateTeam(data: {
  id: number;
  updatedData: { name: string };
}) {
  const { id, updatedData } = data;

  const updatedTeam = await updateTeamToDB(id, updatedData);
  return updatedTeam;
}

// Delete a team
export async function deleteTeam(id: number) {
  await deleteTeamFromDB(id);
}
