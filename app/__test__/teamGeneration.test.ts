import {
  generateEventTeamsPayload,
  groupTeamsByEvent
} from '../src/utils/teamGeneration';

describe('generateEventTeamsPayload', () => {
  const teams = [
    { id: 'team1', name: 'Team A' },
    { id: 'team2', name: 'Team B' }
  ];

  const players = [
    { id: 'p1', name: 'Player 1', skill: 10 },
    { id: 'p2', name: 'Player 2', skill: 8 },
    { id: 'p3', name: 'Player 3', skill: 6 },
    { id: 'p4', name: 'Player 4', skill: 4 }
  ];

  const eventId = 'event123';

  test('should throw an error if less than 2 teams are provided', () => {
    expect(() =>
      generateEventTeamsPayload(
        [{ id: 'team1', name: 'Team A' }],
        players,
        eventId
      )
    ).toThrow('At least 2 teams are required.');
  });

  test('should return an empty array if no teams or players are provided', () => {
    expect(generateEventTeamsPayload([], players, eventId)).toEqual([]);
    expect(generateEventTeamsPayload(teams, [], eventId)).toEqual([]);
  });

  test('should throw an error if there are more players than available slots', () => {
    const manyPlayers = Array.from({ length: 15 }, (_, i) => ({
      id: `p${i}`,
      name: `Player ${i}`,
      skill: 5
    }));
    expect(() =>
      generateEventTeamsPayload(teams, manyPlayers, eventId)
    ).toThrow('Too many players!');
  });

  test('should distribute players fairly based on skill', () => {
    const result = generateEventTeamsPayload(teams, players, eventId);
    expect(result).toHaveLength(players.length);
    expect(result).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          event_id: eventId,
          team_id: expect.any(String),
          player_id: expect.any(String)
        })
      ])
    );
  });
});

describe('groupTeamsByEvent', () => {
  const eventData = [
    {
      event_id: 'event123',
      team_id: '1',
      player_id: 'p1',
      players: { name: 'Player 1', skill: 10 },
      events: { name: 'Event 1' },
      teams: { name: 'Team A' }
    },
    {
      event_id: 'event123',
      team_id: '1',
      player_id: 'p2',
      players: { name: 'Player 2', skill: 8 },
      events: { name: 'Event 1' },
      teams: { name: 'Team A' }
    },
    {
      event_id: 'event123',
      team_id: '2',
      player_id: 'p3',
      players: { name: 'Player 3', skill: 6 },
      events: { name: 'Event 1' },
      teams: { name: 'Team B' }
    }
  ];

  test('should group teams by event correctly', () => {
    const result = groupTeamsByEvent(eventData);
    expect(result).toHaveLength(1);
    expect(result[0].eventId).toBe('event123');
    expect(result[0].teams).toHaveLength(2);
  });

  test('should calculate total skill for each team', () => {
    const result = groupTeamsByEvent(eventData);
    const teamA = result[0].teams.find((team) => team.id === 1);
    expect(teamA.totalSkill).toBe(18);
  });
});
