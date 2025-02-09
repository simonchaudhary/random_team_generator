import { supabase } from './supabaseClient';

import { TABLES } from './constant/common';
import { AddPlayerFormData } from '../interfaces/player';

// Fetch all players
export async function fetchPlayers() {
  const { data, error } = await supabase
    .from(TABLES.PLAYERS)
    .select('*')
    .order('created_at', { ascending: true });

  if (error) throw error;

  return data;
}

// Add a player
export async function addPlayerToDB(payload: AddPlayerFormData) {
  const { name, skill } = payload;

  const { data, error } = await supabase
    .from(TABLES.PLAYERS)
    .insert([{ name, skill }])
    .select();

  if (error) throw error;

  return data;
}

export async function updatePlayerToDB(
  id: number,
  updatedData: AddPlayerFormData
) {
  const { data, error } = await supabase
    .from(TABLES.PLAYERS)
    .update(updatedData)
    .eq('id', id)
    .select();
  if (error) throw error;
  return data;
}

export async function deletePlayerFromDB(id: number) {
  const { error } = await supabase.from(TABLES.PLAYERS).delete().eq('id', id);

  if (error) throw error;
}
