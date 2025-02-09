import { MdDelete, MdEdit } from 'react-icons/md';

import IconButton from '../../../components/IconButton';
import SkillInput from '../../../components/SkillInput';
import TableTitle from '../../../components/TableTitle';
import LoadingWrapper from '../../../components/LoadingWrapper';

import { SKILL_RANGE } from '../../../constants/skill';

import { useFetchPlayers } from '../../../hooks/usePlayer';

import { Player } from '../../../interfaces/player';

import message from '../../../languages/en';

import { interpolate } from '../../../utils/interpolate';

interface PlayerListProps {
  onEdit: (player: Player) => void;
  onOpen: (newState?: number) => void;
}

function PlayerList(props: PlayerListProps) {
  const { onEdit, onOpen } = props;

  const { data: players, isLoading } = useFetchPlayers();

  return (
    <>
      <TableTitle
        title={message.TITLE.PLAYER}
        count={players?.length}
        isLoading={isLoading}
      />

      <LoadingWrapper
        loading={isLoading}
        length={players?.length || 0}
        emptyMessage={interpolate(message.OTHERS.EMPTY_MESSAGE, {
          title: message.TITLE.TEAM
        })}
      >
        <div className="flex flex-col flex-1 overflow-y-auto">
          {players?.map((player) => (
            <div
              className="flex items-center gap-x-3 py-2 px-4 hover:bg-gray-50"
              key={player.id}
            >
              <div className="flex items-center gap-x-3 flex-1">
                <p className="min-w-[220px] w- text-base font-medium">
                  {player.name}
                </p>

                <SkillInput
                  options={SKILL_RANGE}
                  selectedValue={player.skill}
                />
              </div>

              <div className="flex items-center gap-x-3">
                <IconButton
                  className="bg-blue-50 hover:bg-blue-100"
                  icon={<MdEdit size={18} className="text-blue-500" />}
                  onClick={() => onEdit(player)}
                />

                <IconButton
                  className="bg-red-50 hover:bg-red-100"
                  icon={<MdDelete size={18} className="text-red-400" />}
                  onClick={() => onOpen(player.id)}
                />
              </div>
            </div>
          ))}
        </div>
      </LoadingWrapper>
    </>
  );
}

export default PlayerList;
