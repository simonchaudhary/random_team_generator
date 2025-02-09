import { Controller, SubmitHandler, useForm } from 'react-hook-form';

import Input from '../../components/Input';
import Modal from '../../components/Modal';
import Button from '../../components/Button';
import TeamList from './components/TeamList';

import message from '../../languages/en';

import useOpen from '../../hooks/useOpen';
import { useAddTeam, useDeleteTeam, useUpdateTeam } from '../../hooks/useTeam';

import { Team as TeamData, TeamFormData } from '../../interfaces/team';

function Team() {
  const { control, handleSubmit, setValue, watch } = useForm<TeamFormData>();

  const isEdit = watch('id');

  const { isOpen, onClose, onOpen, state: teamId } = useOpen<number>();

  const mutation = useAddTeam();

  const updateMutation = useUpdateTeam();

  const deleteMutation = useDeleteTeam();

  const reset = () => {
    setValue('id', null);

    setValue('name', '');
  };

  const onSubmit: SubmitHandler<TeamFormData> = async (data: TeamFormData) => {
    const { id, name } = data;

    if (isEdit) {
      await updateMutation.mutate({ id, updatedData: { name } });

      reset();

      return;
    }

    mutation.mutate(name);

    reset();
  };

  const onDelete = () => {
    if (!teamId) {
      return;
    }

    deleteMutation.mutate(teamId);

    onClose();
  };

  const onEdit = (team: TeamData) => {
    setValue('id', team.id);

    setValue('name', team.name);
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
        <TeamList onEdit={onEdit} onOpen={onOpen} />

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
                  placeholder={message.FORMS.TEAM.PLACEHOLDER}
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

export default Team;
