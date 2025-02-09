import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { useNavigate } from 'react-router-dom';

import message from '../languages/en';

import { ToastMessageType } from '../enums/toast';

import { success } from '../utils/toast';
import { interpolate } from '../utils/interpolate';
import { groupTeamsByEvent } from '../utils/teamGeneration';

import { GenerateTeamsPayload } from '../interfaces/teamGeneration';

import { generateTeams, getEventTeamById } from '../services/teamGeneration';
import { handleError } from '../utils/errorHandler';

// Fetch events
export const useFetchEventTeams = (id?: string) => {
  return useQuery({
    queryKey: ['events'],

    queryFn: async () => {
      if (id) {
        const response = await getEventTeamById(id);

        const refineResponse = groupTeamsByEvent(response);

        return refineResponse;
      }
    }
  });
};

// Add a event
export const useGenerateTeams = () => {
  const queryClient = useQueryClient();

  const navigate = useNavigate();

  return useMutation({
    mutationFn: (payload: GenerateTeamsPayload) => {
      return generateTeams(payload);
    },

    onSuccess: (newEvent) => {
      queryClient.invalidateQueries({ queryKey: ['events'] });

      success({
        title: ToastMessageType.SUCCESS,
        message: interpolate(message.TOAST.CREATE_DATA, {
          type: message.TITLE.EVENT
        })
      });

      navigate(`/team-generation/${newEvent.id}`);
    },

    onError(error) {
      handleError(error);
    }
  });
};
