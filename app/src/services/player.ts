import {
  fetchPlayers,
  addPlayerToDB,
  updatePlayerToDB,
  deletePlayerFromDB
} from '../supabase/player';

import { AddPlayerFormData } from '../interfaces/player';

// Fetch players
export async function getPlayers() {
  const players = await fetchPlayers();

  return players;
}

// Add a players
export async function addPlayer(payload: AddPlayerFormData) {
  const newPlayer = await addPlayerToDB(payload);

  return newPlayer;
}

// Update a players
export async function updatePlayer(data: {
  id: number;
  updatedData: AddPlayerFormData;
}) {
  const { id, updatedData } = data;

  const updatedPlayer = await updatePlayerToDB(id, updatedData);

  return updatedPlayer;
}

// Delete a players
export async function deletePlayer(id: number) {
  await deletePlayerFromDB(id);
}
