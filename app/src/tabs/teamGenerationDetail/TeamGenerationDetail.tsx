import { useParams } from 'react-router-dom';
import LoadingWrapper from '../../components/LoadingWrapper';
import { useFetchEventTeams } from '../../hooks/useTeamGeneration';
import message from '../../languages/en';
import { interpolate } from '../../utils/interpolate';
import ShareableLink from '../../components/ShareableLink';
import { generateShareableLink } from '../../utils/shareLink';
import { ROUTES } from '../../constants/routes';

function TeamGenerationDetail() {
  const { id } = useParams();

  const { data: eventTeams, isLoading } = useFetchEventTeams(id);

  const eventTeam = eventTeams?.[0];

  const teamCount = eventTeam?.teams?.length || 0;

  const playerCount =
    eventTeam?.teams?.flatMap((item) => item.players).length || 0;

  const shareableLink = generateShareableLink(
    [ROUTES.TEAM_GENERATION, ROUTES.ID],
    {
      id: id as string
    }
  );

  return (
    <div className="flex flex-col h-full">
      <div className="border-b border-solid border-gray-200 py-4 px-4">
        <p className="text-sm text-gray-700 font-bold">
          {eventTeam?.eventName}
        </p>

        <p className="text-xs text-gray-600">
          {playerCount} participants in {teamCount} in teams
        </p>
      </div>

      <ShareableLink link={shareableLink} />

      <LoadingWrapper
        loading={isLoading}
        length={eventTeams?.length || 0}
        emptyMessage={interpolate(message.OTHERS.EMPTY_MESSAGE, {
          title: message.TITLE.TEAM
        })}
      >
        <div className="flex gap-4 flex-wrap  overflow-auto mt-4 px-4">
          {eventTeam?.teams?.map((generatedTeam) => (
            <div
              className="flex flex-col bg-gray-50 p-4 rounded flex-1 w-fit"
              key={generatedTeam.id}
            >
              <p className="">{generatedTeam.name}</p>

              <div className="mt-3 flex flex-col gap-y-1">
                {generatedTeam.players.map((player, index) => {
                  return (
                    <div className="flex items-center gap-x-3">
                      <p>{index + 1}</p>
                      <p className="whitespace-nowrap min-w-[128px]">
                        {player.name}
                      </p>
                      <p className="w-6 h-6 bg-blue-400 rounded-md text-white text-center">
                        {player.skill}
                      </p>
                    </div>
                  );
                })}
              </div>

              <p className="text-sm text-gray-700 font-bold mt-4">
                Total Skill: {generatedTeam.totalSkill}
              </p>
            </div>
          ))}
        </div>
      </LoadingWrapper>
    </div>
  );
}

export default TeamGenerationDetail;
