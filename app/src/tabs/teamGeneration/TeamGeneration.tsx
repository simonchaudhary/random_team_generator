import { Outlet } from 'react-router-dom';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';

import Input from '../../components/Input';
import Button from '../../components/Button';

import { useFetchTeams } from '../../hooks/useTeam';
import { useFetchPlayers } from '../../hooks/usePlayer';
import { useGenerateTeams } from '../../hooks/useTeamGeneration';

import { TeamGenerationFormData } from '../../interfaces/teamGeneration';

import message from '../../languages/en';
import { errorToast } from '../../utils/toast';
import { ToastMessageType } from '../../enums/toast';

function TeamGeneration() {
  const { control, handleSubmit, setValue } = useForm<TeamGenerationFormData>();

  const { data: players, isLoading: isLoadingPlayers } = useFetchPlayers();

  const { data: teams, isLoading: isLoadingTeams } = useFetchTeams();

  const mutation = useGenerateTeams();

  const onSubmit: SubmitHandler<TeamGenerationFormData> = async (
    data: TeamGenerationFormData
  ) => {
    const { name } = data;

    if (!players || !teams) {
      errorToast({
        title: ToastMessageType.ERROR,
        message: message.OTHERS.NO_PLAYERS_TEAM
      });

      return;
    }

    const payload = {
      name,
      players,
      teams
    };

    mutation.mutate(payload);

    setValue('name', '');
  };

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <Outlet />

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex justify-between gap-x-4 p-4 items-center border-t border-solid border-gray-200 py-4"
      >
        <div className="flex gap-x-4 items-start">
          <Controller
            control={control}
            name="name"
            rules={{ required: message.FORMS.NAME.RULES.REQUIRED }}
            render={({
              field: { onChange, onBlur, value, ref, name },
              fieldState: { error }
            }) => (
              <Input
                ref={ref}
                name={name}
                error={error?.message}
                onChange={onChange}
                onBlur={onBlur}
                type="text"
                value={value}
                showLabel={false}
                placeholder={message.FORMS.TEAM_GENERATION.PLACEHOLDER}
              />
            )}
          />
        </div>

        <Button
          label={message.BUTTON.GENERATE}
          isLoading={mutation.isPending || isLoadingPlayers || isLoadingTeams}
          type="submit"
        />
      </form>
    </div>
  );
}

export default TeamGeneration;
