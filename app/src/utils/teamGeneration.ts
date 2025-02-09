import { groupBy, map, sumBy } from 'lodash';

import {
  EventTeam,
  EventTeamsPayload,
  EventGroupedData,
  TeamAssignment
} from '../interfaces/teamGeneration';
import { Team } from '../interfaces/team';
import { Player } from '../interfaces/player';
import { MAX_PLAYERS, MIN_TEAMS } from '../constants/skill';
import { interpolate } from './interpolate';
import message from '../languages/en';

/**
 * Generates the event teams payload by distributing players into teams based on skill level.
 *
 * @param {Team[]} teams - An array of teams participating in the event.
 * @param {Player[]} players - An array of players to be assigned to teams.
 * @param {string} eventId - The unique identifier for the event.
 * @returns {EventTeamsPayload[]} - An array of objects representing team assignments for the event.
 *
 * @throws {Error} If fewer than 2 teams are provided.
 * @throws {Error} If the number of players exceeds the total available slots.
 *
 * @description
 * - Ensures at least two teams exist.
 * - Ensures the number of players does not exceed the available slots (7 players per team).
 * - Sorts players by skill level in descending order.
 * - Distributes players fairly among teams, prioritizing balance by assigning the lowest-skilled team first.
 * - Returns an array containing event-team-player mappings.
 */
export function generateEventTeamsPayload(
  teams: Team[],
  players: Player[],
  eventId: string
): EventTeamsPayload[] {
  // Edge case: Less than 2 teams
  if (teams.length < MIN_TEAMS)
    throw new Error(
      interpolate(message.OTHERS.LEAST_TEAMS, { number: MIN_TEAMS })
    );

  // Edge case: No teams or players
  if (!teams.length || !players.length) return [];

  const maxPlayers = MAX_PLAYERS;

  const totalSlots = teams.length * maxPlayers;

  // Edge case: Too many players
  if (players.length > totalSlots) {
    throw new Error(
      `Too many players! Max allowed: ${totalSlots}, but got ${players.length}.`
    );
  }

  // Sort players by skill in descending order
  players.sort((a, b) => b.skill - a.skill);

  // Initialize teams
  const teamAssignments: TeamAssignment[] = teams.map((team) => ({
    eventId: eventId,
    team: { id: team.id, name: team.name },
    players: [],
    totalSkill: 0
  }));

  // Distribute players fairly based on skill
  for (let i = 0; i < players.length; i++) {
    // Find the team with the least total skill
    teamAssignments.sort((a, b) => a.totalSkill - b.totalSkill);

    // Assign player to the team with the least total skill
    const team = teamAssignments[0];
    team.players.push({
      id: players[i].id,
      name: players[i].name,
      skill: players[i].skill
    });
    team.totalSkill += players[i].skill;
  }

  const data = teamAssignments.flatMap((teamData) =>
    teamData.players.map((player) => ({
      event_id: teamData.eventId,
      team_id: teamData.team.id,
      player_id: player.id
    }))
  );

  return data;
}

/**
 * Groups teams by event and structures the data accordingly.
 *
 * @param {EventTeam[]} data - An array of event-team relationships, including event and player details.
 * @returns {EventGroupedData[]} - An array of grouped event data containing teams and players.
 *
 * @description
 * - Groups the input data by `event_id`.
 * - Transforms the grouped data into a structured format with event details.
 * - Groups teams within each event by `team_id`.
 * - Includes player details within each team.
 * - Computes the total skill for each team.
 */
export function groupTeamsByEvent(data: EventTeam[]): EventGroupedData[] {
  const groupedByEvent = groupBy(data, 'event_id');

  // Step 2: Transform into desired structure
  return map(groupedByEvent, (eventData, event_id) => ({
    eventId: event_id,
    eventName: eventData[0]?.events?.name || '',
    teams: map(groupBy(eventData, 'team_id'), (teamData, team_id) => ({
      id: Number(team_id),
      name: teamData[0]?.teams?.name || '',
      players: teamData.map(({ player_id, players }) => ({
        id: player_id,
        name: players.name,
        skill: players.skill
      })),
      totalSkill: sumBy(teamData, 'players.skill') // Calculate total skill
    }))
  }));
}
