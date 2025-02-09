import { TABLES } from './constant/common';
import { supabase } from './supabaseClient';

// Fetch all teams
export async function fetchTeams() {
  const { data, error } = await supabase
    .from(TABLES.TEAMS)
    .select('*')
    .order('created_at', { ascending: true });

  if (error) throw error;

  return data;
}

// Add a team
export async function insertTeam(name: string) {
  const { data, error } = await supabase
    .from(TABLES.TEAMS)
    .insert([{ name }])
    .select();

  if (error) throw error;

  return data;
}

// Update a team
export async function updateTeamToDB(
  id: number,
  updatedData: { name: string }
) {
  const { data, error } = await supabase
    .from(TABLES.TEAMS)
    .update(updatedData)
    .eq('id', id)
    .select();

  if (error) throw error;

  return data;
}

// Delete a team
export async function deleteTeamFromDB(id: number) {
  const { error } = await supabase.from(TABLES.TEAMS).delete().eq('id', id);

  if (error) throw error;
}
