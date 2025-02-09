import { Controller, SubmitHandler, useForm } from 'react-hook-form';

import message from '../../languages/en';

import Input from '../../components/Input';
import Modal from '../../components/Modal';
import Button from '../../components/Button';
import SkillInput from '../../components/SkillInput';

import { MAX_SKILL, MIN_SKILL, SKILL_RANGE } from '../../constants/skill';

import { Player as PlayerData, PlayerFormData } from '../../interfaces/player';

import { interpolate } from '../../utils/interpolate';

import useOpen from '../../hooks/useOpen';
import {
  useAddPlayer,
  useDeletePlayer,
  useUpdatePlayer
} from '../../hooks/usePlayer';
import PlayerList from './components/PlayerList';

function Player() {
  const { control, handleSubmit, setValue, watch } = useForm<PlayerFormData>();

  const isEdit = watch('id');

  const { isOpen, onClose, onOpen, state: playerId } = useOpen<number>();

  const mutation = useAddPlayer();

  const updateMutation = useUpdatePlayer();

  const deleteMutation = useDeletePlayer();

  const reset = () => {
    setValue('id', null);

    setValue('name', '');

    setValue('skill', null);
  };

  const onSubmit: SubmitHandler<PlayerFormData> = async (
    data: PlayerFormData
  ) => {
    const { id, name, skill } = data;

    if (isEdit && id) {
      await updateMutation.mutate({ id, updatedData: { name, skill } });

      reset();

      return;
    }

    mutation.mutate({ name, skill });

    reset();
  };

  const onDelete = () => {
    if (!playerId) {
      return;
    }

    deleteMutation.mutate(playerId);

    onClose();
  };

  const onEdit = (player: PlayerData) => {
    setValue('id', player.id);
    setValue('name', player.name);
    setValue('skill', player.skill);
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        title={message.MODAL.CONFIRM_DELETE}
      >
        <div className="flex justify-end space-x-4">
          <Button
            label={message.BUTTON.CANCEL}
            type="button"
            onClick={onClose}
            className="bg-gray-200 hover:bg-gray-300 text-gray-700"
          />

          <Button
            label={message.BUTTON.DELETE}
            type="button"
            isLoading={deleteMutation.isPending}
            onClick={onDelete}
            className="bg-red-400 hover:bg-red-500"
          />
        </div>
      </Modal>

      <div className="flex flex-col h-full">
        <PlayerList onEdit={onEdit} onOpen={onOpen} />

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
                  placeholder={message.FORMS.NAME.PLACEHOLDER}
                />
              )}
            />

            <Controller
              control={control}
              name="skill"
              rules={{
                required: message.FORMS.SKILL.RULES.REQUIRED,
                min: {
                  value: MIN_SKILL,
                  message: interpolate(message.FORMS.SKILL.RULES.MIN, {
                    number: MIN_SKILL
                  })
                },
                max: {
                  value: MAX_SKILL,
                  message: interpolate(message.FORMS.SKILL.RULES.MAX, {
                    number: MAX_SKILL
                  })
                }
              }}
              render={({
                field: { onChange, value, name },
                fieldState: { error }
              }) => (
                <SkillInput
                  error={error?.message}
                  name={name}
                  options={SKILL_RANGE}
                  selectedValue={value}
                  onChange={onChange}
                />
              )}
            />
          </div>

          <Button
            label={isEdit ? message.BUTTON.UPDATE : message.BUTTON.ADD_TEAM}
            isLoading={mutation.isPending || updateMutation.isPending}
            type="submit"
          />
        </form>
      </div>
    </>
  );
}

export default Player;
