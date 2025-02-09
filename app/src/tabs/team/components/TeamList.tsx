import { MdDelete, MdEdit } from 'react-icons/md';

import message from '../../../languages/en';

import { useFetchTeams } from '../../../hooks/useTeam';

import { Team } from '../../../interfaces/team';

import IconButton from '../../../components/IconButton';
import TableTitle from '../../../components/TableTitle';
import LoadingWrapper from '../../../components/LoadingWrapper';

import { interpolate } from '../../../utils/interpolate';

interface TeamListProps {
  onEdit: (team: Team) => void;
  onOpen: (newState?: number) => void;
}

function TeamList(props: TeamListProps) {
  const { onEdit, onOpen } = props;

  const { data: teams, isLoading } = useFetchTeams();

  return (
    <>
      <TableTitle
        title={message.TITLE.TEAM}
        count={teams?.length}
        isLoading={isLoading}
      />

      <LoadingWrapper
        loading={isLoading}
        length={teams?.length || 0}
        emptyMessage={interpolate(message.OTHERS.EMPTY_MESSAGE, {
          title: message.TITLE.TEAM
        })}
      >
        <div className="flex flex-col flex-1 overflow-y-auto">
          {teams?.map((team) => (
            <div
              className="flex items-center gap-x-3 py-2 px-4 hover:bg-gray-50"
              key={team.id}
            >
              <p className="flex-1 text-base font-medium">{team.name}</p>

              <IconButton
                className="bg-blue-50 hover:bg-blue-100"
                icon={<MdEdit size={18} className="text-blue-500" />}
                onClick={() => onEdit(team)}
              />

              <IconButton
                className="bg-red-50 hover:bg-red-100"
                icon={<MdDelete size={18} className="text-red-400" />}
                onClick={() => onOpen(team.id)}
              />
            </div>
          ))}
        </div>
      </LoadingWrapper>
    </>
  );
}

export default TeamList;
